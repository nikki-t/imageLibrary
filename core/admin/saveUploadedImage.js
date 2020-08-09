/* Local modules */
import { getTags, removeImage } from '../../utilities/adminUtilities.js'
import { parse } from 'exifr';
import { mapImageDataRecord } from '../../utilities/display.js';
import { getImageModel } from '../../db/imageModel.js';
const Image = getImageModel();

/* Built-in or third party modules */
import Client from '@googlemaps/google-maps-services-js';

/*
Formats and returns date object.

Parameters:
    exifDate : str
        String that represents the date the image was taken
Return:  
    date : date object
*/
async function getDate(exifDate) {
    
    const date = new Date(exifDate);
    
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    }
}

/*
Formats and returns time object.

Parameters:
    exifDate : str
        String that represents the date the image was taken
Return:  
    time : time object
*/
async function getTime(exifDate) {
    
    const date = new Date(exifDate);
    
    return {
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
    }
}

/*
Tests for properly defined width and height data and returns a resolution 
object.

Parameters:
    exifData : object
        Object of exif data
Return:  
    resolution : resolution object
*/
async function getResolution(exifData) {

    let resolution;

    // Test if resolution data was parsed from EXIF data
    if ((typeof exifData.ImageWidth == 'undefined') || 
        (typeof exifData.ImageHeight == 'undefined')) {

            resolution = {
                width: 0,
                height: 0
            }
    } else {

        resolution = {
            width: exifData.ImageWidth,
            height: exifData.ImageHeight
        }
    }

    return resolution;
}

/*
Requests GPS location data and returns object of data if found.

Parameters:
    gps : object
        Object with longitude and latitude parameters
Return:  
    location: object
        Object with city, state, and country parameters
*/
async function getGpsData(gps) {

    // Create a string that contains latitude and longitude coordinates
    const gpsString = gps.latitude.toString() + ',' + gps.longitude.toString();
    
    // Create a new client to search for a location
    const client = new Client.Client({});

    // Attempt to find location based on latitude and longitude
    let response;
    try {
        response = await client.reverseGeocode({
            params: {
                latlng: gpsString,
                key: process.env.MAP_API_KEY
            },
            timeout: 1000
        })
    } catch(err) {
        console.log(err);
        response = {};
    }

    // Determine city, state, and country from location request
    const locationData = response.data.results[0].address_components;
    const city = locationData[2].long_name;
    const state = locationData[4].long_name;
    const country = locationData[5].long_name;

    // Return location object
    return {
        city: city,
        state: state,
        country: country
    }

}

/*
Updates image attributes with body attributes.

Parameters:
    body : object
        HTTP request body parameters
    file: object
        HTTP request file object from multer middleware
    exifData : object
Return:  
    image : image object
*/
async function createImage(body, file, exifData) {

    // Parse exif data if it is available
    let date;
    let time;
    let camera;
    let resolution;
    let aperture;
    let exposure;
    let iso;
    let focalLength;
    let gpsAvailable;
    let exifAvailable;
    let gps;
    // If exif data does not exist
    if (Object.entries(exifData).length === 0) {
        date = {year: 0, month: 0, day: 0};
        time = {hour: 0, minute: 0, second: 0};
        camera = {make: 'not available', model: 'not available'};
        resolution = {width: 0, height: 0};
        aperture = 0;
        exposure = 0;
        iso = 0;
        focalLength = 0;
        gpsAvailable = false;
        exifAvailable = false;
    } else {
        // Obtain image exif data
        date = await getDate(exifData.DateTimeOriginal);
        time = await getTime(exifData.DateTimeOriginal);
        camera = {make: exifData.Make, model: exifData.Model};
        resolution = await getResolution(exifData);
        aperture = exifData.FNumber;
        exposure = exifData.ExposureTime;
        iso = exifData.ISO;
        focalLength = exifData.FocalLengthIn35mmFormat;
        gpsAvailable = Boolean(exifData.latitude);
        exifAvailable = true;
    }
    // If GPS data is not available
    let location;
    if (gpsAvailable == false) {
        location = {
            city: '', 
            state: '', 
            country: ''
        };
    } else {
        // Obtain GPS location data
        gps = {latitude : exifData.latitude, longitude: exifData.longitude};
        location = await getGpsData(gps);
    }    

    // Return object of image data
    return {
        title: body.title,
        date: date,
        time: time,
        creator: {first: body.firstName, last: body.lastName},
        category: body.category,
        tags: await getTags(body.tags),
        description: body.description,
        camera: camera,
        resolution: resolution,
        aperture: aperture,
        exposure: exposure,
        iso: iso,
        focalLength: focalLength,
        gpsAvailable: gpsAvailable,
        exifAvailable: exifAvailable,
        gps: {city: location.city, state: location.state, country: location.country},
        fileName: file.filename,
        imagePath: '/images/catalog/'
    }
}

/*
Saves image data to database passed to function via request body from upload 
form.

Parameters:
    req : request
        HTTP request
    res : response
        HTTP response
    next : next  
        Middleware next function
Return:  
    render of 'user/recordView[Vertical or Horizontal]'
*/
export async function saveUploadedImage(req, res, next) {

    // Check that file was submitted
    if (typeof req.file === 'undefined') {
        // File not uploaded; render error back to form
        let errors = [
            {
                msg: 'File not uploaded.'
            }
        ];
        res.render('admin/uploadForm', {errors: errors});

    } else {
        // Check for errors in submission; Re-render upload form if errors present
        const errors = req.sanitizeErrors;
        
        if (errors.length !== 0) {
            // Remove uploaded image
            const imageFile = '/' + req.file.path;
            try {
                removeImage(imageFile);
                // Render errors and image data back to form
                res.render('admin/uploadForm', {errors: errors, image: req.body});
            } catch(err) {
                console.log(err);
                const message = 'Could not remove image from file system. ' 
                    + 'Some manual clean up is neccesary.';
                res.render('error', {message: message});
            }
            
        } else {
            // No errors were found; Locate image file
            const imageFile = 'public/images/catalog/' + req.file.filename;

            // Try to parse image file for exif data
            let exifData;
            try {
                exifData = await parse(imageFile);
            } catch (err) {
                // No exif data available
                console.log('No EXIF data available.');
                console.log(`Error: ${err}`);
                exifData = {};
            }

            // Create an image object
            const imageData = await createImage(req.body, req.file, exifData);
            let image = await new Image(imageData);

            // Save image to database
            try {
                await image.save();
            } catch (err) {
                const message = 'Could not save image.';
                res.render('error', {message: message});
                return;
            }

            // Render record view
            const imageRecord = await mapImageDataRecord(image);
            // Horizontal
            if (image.resolution.width > image.resolution.height) {
                res.render('user/recordViewHorizontal', {image: imageRecord});
            // Vertical
            } else {
                res.render('user/recordViewVertical', {image: imageRecord});
            }
        }
    }
    
}