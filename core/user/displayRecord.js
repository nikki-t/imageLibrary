/* Local modules */
import { findByIDImage } from '../../db/imageQueries.js';
import { mapImageDataRecord } from '../../utilities/display.js';

/*
Retrieves an image document and renders an object with that documents's columns 
to recordView[Vertical or Horizontal].

Parameters:
    req : request
        HTTP request
    res : response
        HTTP response
    next : next  
        Middleware next function
Return:  
    render of 'user/recordView[Vertical or Horizontal]' with image object
*/
export async function displayRecord(req, res, next) {
    
    // Get image id from path parameter
    const id = req.params.id;

    // Search for image by id
    let imageQuery;
    try {
        imageQuery = await findByIDImage(id);
    } catch(err) {
        console.log(err);
        imageQuery = {};
    }

    // Check that the query actually returned data
    if (imageQuery === null || Object.entries(imageQuery).length === 0) {
        const message = `No images found with an ID of: ${id}`;
        console.log(message);
        res.render('error', {message: message});
    
    } else {
        // Render view passing image data
        const image = await mapImageDataRecord(imageQuery);

        // Horizontal image display
        if (imageQuery.resolution.width > imageQuery.resolution.height) {
            res.render('user/recordViewHorizontal', {image: image});
        // Vertical image display
        } else {
            res.render('user/recordViewVertical', {image: image});
        }
    }
};