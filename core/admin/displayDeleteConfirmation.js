/* Local modules */
import { findByIDImage } from '../../db/imageQueries.js';

/*
Retrieves an image document and renders an object with that document's columns 
to deleteForm view.

Parameters:
    req : request
        HTTP request
    res : response
        HTTP response
    next : next  
        Middleware next function
Return:  
    render of 'admin/deleteForm' with image object
*/
export async function displayDeleteConfirmation(req, res, next) {
    
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
    let imageData = {
        id: image._id,
        image: image.getImage(),
        title: image.title,
        creator: image.getCreatorName(),
        date: image.getDateTime(),
        category: image.category,
        tags: image.getTags(),
        description: image.description,
        vertical: image.resolution.width < image.resolution.height
    };

    res.render('admin/deleteForm', {image: imageData});

};