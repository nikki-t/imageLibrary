/* Local modules */
import { findImage } from '../../db/imageQueries.js';
import { mapImageDataGallery } from '../../utilities/display.js';

/*
Retrieves all images and renders an object that contains the following 
attributes to galleryView:
    id, image, title, creator, date, vertical

Parameters:
    req : request
        HTTP request
    res : response
        HTTP response
    next : next  
        Middleware next function
Return:  
    render of 'public/galleryView' with array image objects
*/
export async function displayAdminHome(req, res, next) {

    // Retrieve image data from database
    let imageData = await findImage({});

    // Map image data to an array of image objects
    const images = await mapImageDataGallery(imageData);

    // Render view based on data available in array of image objects
    if (images.length === 0) {
        const message = 'No images found.';
        console.log(`Error: ${message}`);
        res.render('error', {message: message});
    } else {
        // Render gallery with image data
        res.render('admin/adminHomeView', {title: 'all images.', images: images});
    }
};