/* Local modules */
import { findImage } from '../../db/imageQueries.js';
import { mapImageDataGallery } from '../../utilities/display.js';

/*
Retrieves either request body or request parameter data for category.

Parameters:
    req : request
        HTTP request
Return:  
    category : request body or request parameter
*/
function getCategoryReqData(req) {
    // Retrieve POST data or request parameter data
    let category = '';
    if (req.body.category) {
        category = req.body.category;
    } 
    if (req.params['category']) {
        category = req.params['category'];
    }
    return category;
}

/*
Retrieves all images that pertain to a specific category and renders an object 
that contains the following attributes to galleryView:
    id, image, title, creator, date, vertical

Parameters:
    req : request
        HTTP request
    res : response
        HTTP response
    next : next  
        Middleware next function
Return:  
    render of 'user/galleryView' with array image objects
*/
export async function displayByCategory(req, res, next) {

    const category = getCategoryReqData(req);

    // Retrieve image data from database
    const selection = {category: category};
    const imageData = await findImage(selection);

    // Map image data to an array of image objects
    let images = await mapImageDataGallery(imageData);

    // Render view based on data available in array of image objects
    if (images.length === 0) {
        const message = `No images found for category: ${category}.`;
        console.log(`Error: ${message}`);
        res.render('error', {message: message});
    } else {
        // Render gallery with image data
        res.render('user/galleryView', {title: `${category}.`, images: images});
    }
};