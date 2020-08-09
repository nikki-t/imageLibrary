/* Local modules */
import { getTags } from '../../utilities/adminUtilities.js'
import { findByIDImage } from '../../db/imageQueries.js';
import { mapImageDataRecord } from '../../utilities/display.js';
import { validateDate, validateTime, getMonthDayError } from '../../utilities/validation.js';

/*
Creates an image object with POST data to render back to view.

Parameters:
    imageFile : str
        String that represents path to image file
    body : request object
        Body object of the request object
*/
async function createImageFromBody(imageFile, body) {
    return {
        image: imageFile,
        id: body.id,
        title: body.title,
        date: {year: body.year, month: body.month, day: body.day},
        time: {hour: body.hour, minute: body.minute, second: body.second},
        firstName: body.firstName,
        lastName: body.lastName,
        category: body.category,
        tags: body.tags,
        description: body.description,
        camera: body.camera,
        resolution: body.resolution,
        aperture: body.aperture,
        exposure: body.exposure,
        iso: body.iso,
        focalLength: body.focalLength,
        gpsAvailable: body.gpsAvailable,
        exifAvailable: (body.exifAvailable === "true") ? true: false,
        city: body.city,
        state: body.state,
        country: body.country,
        fileName: body.fileName,
        imagePath: body.imagePath
    }
}

/*
Formats and returns a camera object.

Parameters:
    cameraString : str
        String that represents a camera object
Return:  
    camera object
*/
async function formatCamera(cameraString) {

    // Split by space
    const camera = cameraString.split(' ');

    // Return camera object
    return {make: camera[0], model: camera[1]};

}

/*
Formats and returns a resolution object.

Parameters:
    resolutionString : str
        String that represents a resolution object
Return:  
    resolution object
*/
async function formatResolution(resolutionString) {

    // Split by x
    const resolution = resolutionString.split(' x ');

    // Return camera object
    return {width: resolution[0], height: resolution[1]};

}
/*
Updates image attributes with body attributes.

Parameters:
    body : object
        HTTP request body parameters
    image : object
Return:  
    image : image object
*/
async function updateImage(body, image) {

    // Format body attributes and update image object
    image.title = body.title;
    image.date = await validateDate({year: body.year, 
                                    month: body.month, 
                                    day: body.day});
    image.time= await validateTime({hour: body.hour, 
                                    minute: body.minute, 
                                    second: body.second});
    image.creator = {first: body.firstName, last: body.lastName};
    image.category = body.category;
    image.tags = await getTags(body.tags);
    image.description = body.description;
    image.camera = await formatCamera(body.camera);
    image.resolution = await formatResolution(body.resolution);
    image.aperture = Number(body.aperture);
    image. exposure = body.exposure;
    image.iso = Number(body.iso);
    image.focalLength = Number(body.focalLength);
    image.exifAvailable = (body.exifAvailable === "true") ? true: false;
    
    // Handle editing and/or addition of gps info
    if (body.city != '' || body.state != '' || body.country != '') {
        image.gpsAvailable = true;
        image.gps = {
            city: body.city, 
            state: body.state, 
            country: body.country
        };
    } else {
        image.gpsAvailable = false;
        image.gps = {
            city: '', 
            state: '', 
            country: ''
        };
    }
    
    image.fileName = body.fileName;
    image.imagePath = body.imagePath;

    return image;
}

/*
Saves image data to database passed to function via request body from edit form.

Parameters:
    req : request
        HTTP request
    res : response
        HTTP response
    next : next  
        Middleware next function
Return:  
    render of 'user/recordView[Horizontal or Vertical]'
*/
export async function saveEditedImage(req, res, next) {

    // Check for errors in submission and render errors back to form if present
    let errors = req.sanitizeErrors;

    // Check for month and day error
    errors = await getMonthDayError(errors, req.body);

    if (errors.length !== 0) {
        // Obtain image data
        const imageFile = req.body.imagePath + req.body.fileName;
        let imageData = await createImageFromBody(imageFile, req.body);
        
        // Render view based on image orientation
        const resolution = await formatResolution(req.body.resolution);
        // Horizontal
        if (Number(resolution.width) > Number(resolution.height)) {
            res.render('admin/editFormHorizontal', {errors: errors, image: imageData});
        // Vertical image display
        } else {
            res.render('admin/editFormVertical', {errors: errors, image: imageData});
        }
    
    } else {
        // Get image id from path parameter
        const id = req.body.id;

        // Search for image by id
        let image;
        try {
            image = await findByIDImage(id);
        } catch(err) {
            console.log(err);
            image = {};
        }

        // Check that the query actually returned data
        if ((image === null) || (Object.entries(image).length === 0)) {
            const message = `No images found with an ID of: ${id}`;
            console.log(message);
            res.render('error', {message: message});
        
        } else {
            // Update image attributes with body attributes
            image = await updateImage(req.body, image);

            // Try to save image to database
            try {
                await image.save();
            } catch(err) {
                console.log(err);
                res.render('error', {message: 'Error saving image to database.'});
                return;
            }

            // Get image data to render record view
            const imageData = await mapImageDataRecord(image);
            
            // Horizontal image display
            if (image.resolution.width > image.resolution.height) {
                res.render('user/recordViewHorizontal', {image: imageData});
            // Vertical image display
            } else {
                res.render('user/recordViewVertical', {image: imageData});
            }
        }
    }
};