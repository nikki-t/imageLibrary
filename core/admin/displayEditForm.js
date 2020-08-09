/* Local modules */
import { findByIDImage } from '../../db/imageQueries.js';
import { mapImageDataEdit } from '../../utilities/display.js';

/*
Retrieves an image document and renders an object with that documents's columns 
to editForm[Vertical or Horizontal].

Parameters:
    req : request
        HTTP request
    res : response
        HTTP response
    next : next  
        Middleware next function
Return:  
    render of 'admin/editForm[Vertical or Horizontal]' with image object
*/
export async function displayEditForm(req, res, next) {
    
    // Get image id from path parameter
    const id = req.params.id;

    // Search for image by id
    let image;
    try {
        image = await findByIDImage(id);
    } catch(err) {
        console.log(err);
        let message = "Could not locate image.";
        res.render('error', {message: message});
        return;
    }

    // Render view passing image data
    let imageData = await mapImageDataEdit(image);

    // Horizontal image display
    if (image.resolution.width > image.resolution.height) {
        res.render('admin/editFormHorizontal', {image: imageData});
    // Vertical image display
    } else {
        res.render('admin/editFormVertical', {image: imageData});
    }
};