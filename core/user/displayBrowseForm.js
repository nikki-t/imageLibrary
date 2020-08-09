/* Local modules */
import { findImage } from '../../db/imageQueries.js';

/*
Retrieves an array of categories present in the database and renders them to
the browseForm view.

Parameters:
    req : request
        HTTP request
    res : response
        HTTP response
    next : next  
        Middleware next function
Return:  
    render of 'user/browseForm' with array of categories
*/
export async function displayBrowseForm(req, res, next) {
    
    // Find all categories present in the database
    let categoryDocuments = await findImage({}, 'category');
    
    if (categoryDocuments.length === 0) {
       
        const message = 'No categories to browse were found.';
        console.log(`Error: ${message}`);
        res.render('error', {message: message});
    
    } else {

        // Map categories from image data to an array
        let categories = categoryDocuments.map((doc) => doc.category);

        // Remove duplicate categories
        categories = new Set(categories);

        // Store categories in array
        categories = [...categories];

        // Render browse form with category data
        res.render('user/browseForm', {categories: categories});
    }
};