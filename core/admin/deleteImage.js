/* Local modules */
import { findByIDImage } from '../../db/imageQueries.js';
import { removeImage } from '../../utilities/adminUtilities.js'

/*
Deletes an image document based on POST data id value and renders admin home 
view.

Parameters:
    req : request
        HTTP request
    res : response
        HTTP response
    next : next  
        Middleware next function
Return:  
    render of 'admin/'
*/
export async function deleteImage(req, res, next) {
    // Get employee id from POST body
    const id = req.body.id;

    // Search for image by id
    let image;
    try {
        image = await findByIDImage(id);
    } catch(err) {
        console.log(err)
        image = {}
    }

    // Check that the query actually returned data
    if (Object.entries(image).length === 0) {
        const message = `No images found with an ID of: ${id}`;
        console.log(message);
        res.render('error', {message: message});
    
    } else {
        // Image was found try to remove the collection from the database
        try {
            await image.remove();
        } catch(err) {
            console.log(`Error removing image: ${err}`);
            const message = 'Could not remove image from database.';
            res.render('error', {message: message});
            return;
        }

        // Image was removed from collection, delete image from file system
        const imageFile = '/public' + image.getImage();
        try {
            await removeImage(imageFile);
            // Redirect to admin page
            res.redirect('/admin/view');
        } catch(err) {
            // Image could not be removed from file system
            console.log(err);
            const message = 'Could not remove image from file system. ' 
                + 'Some manual clean up is neccesary.';
            res.render('error', {message: message});
        }
        
    }
    
};