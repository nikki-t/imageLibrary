/* Local modules */
import { findImage } from '../../db/imageQueries.js';
import { mapImageDataGallery } from '../../utilities/display.js';
import { validateDate, getMonthDayError } from '../../utilities/validation.js';

/*
Retrieves either request body or request parameter data for date and returns
and object that represents paramater values pulled from request.

Parameters:
    req : request
        HTTP request
Return:  
    date : Object with year, month, and day attributes
*/
async function getDateReqData(req) {
    // Retrieve POST data or request parameter data
    let date = {
        year: 0,
        month: 0,
        day: 0
    };

    let year = 0;
    let month = 0;
    let day = 0;

    // Test for and retrieve body data
    if (req.body.year || req.body.month || req.body.day) {
        year = req.body.year;
        month = req.body.month;
        day = req.body.day;
    }

    // Test for and retreive parameter data
    if (req.params['year'] || req.params['month'] || req.params['day']) {
        year = req.params['year'];
        month = req.params['month'];
        day = req.params['day']
    }

    // Convert request data to a Number and return date object
    return await validateDate({year: year, month: month, day: day});
}

/*
Determines appropriate date selection based on parameter date object values.

Parameters:
    date: Object
        Object with year, month, and day attributes 
Return:  
    selection: Object
        Object that contains selection for Mongoose query
*/
async function getSelection(date) {
    let selection;
    if ((date.year > 0) && (date.month <= 0) && (date.day <= 0)) {
        selection = {'date.year': date.year};
    } else if ((date.year > 0) && (date.month > 0) && (date.day <= 0)) {
        selection = {'date.year': date.year, 'date.month': date.month};
    } else if ((date.year > 0) && (date.month > 0) && (date.day > 0)) {
        selection = {'date.year': date.year, 'date.month': date.month, 
            'date.day': date.day};
    } else {
        selection = "";
    }
    return selection;
}

/*
Retrieves all images that pertain to a specific date and renders an object 
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
export async function displayByDate(req, res, next) {

    // Check for errors in submission; Re-render upload form if errors present
    let errors = req.sanitizeErrors;

    // Check for month and day error
    errors = await getMonthDayError(errors, req.body);

    // Render any error messages back to form including any POST data
    if (errors.length !== 0) {
        const date = {
            year: req.body.year,
            month: req.body.month,
            day: req.body.day
        }
        res.render('user/searchForm', {errors: errors, date: date } );
    } else {
        // No post errors found; Get request data
        const date = await getDateReqData(req);

        // Determine what date combination to search by
        const selection = await getSelection(date);

        // Check if query has a value
        if (typeof(selection) === 'undefined') {
            const message = 'Date could not be determined.';
            res.render('error', {message: message});
        // Query does have a value
        } else {
            // Retrieve image data
            const imageData = await findImage(selection);

            // Map image data to an array of image objects
            let images = await mapImageDataGallery(imageData);

            // Render view based on data available in array of image objects
            if (images.length === 0) {
                const message = `No images found for date with `
                    + `year of ${date.year}, `
                    + `month of ${date.month}, `
                    + `or day of ${date.day}.`;
                console.log(`Error: ${message}`);
                res.render('error', {message: message});
            } else {
                // Determine title and then render gallery with image data
                let title;
                if (date.year) title = `${date.year}.`;
                if (date.year && date.month) title = `${date.month} / ${date.year}.`;
                if (date.year && date.month && date.day) {
                    title = `${date.month} / ${date.day} / ${date.year}.`;
                }
                res.render('user/galleryView', {title: title, images: images});
            }
        }
    }
};