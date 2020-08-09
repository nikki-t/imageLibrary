/* Built-in or third party modules */
import filterAPIs from 'express-validator';
import validationResult from 'express-validator';

// Store body function from express validator
const { body } = filterAPIs;

/*
Exports three functions that serve to sanitize post data via the express validator.
Also validates title and creator name as required fields.

Parameters:
    req : request
        HTTP request
    res : response
        HTTP response
    next : next  
        Middleware next function
Return:  
    sanitize : 
        Function that sanitizes post data
    sanitizationRules :
        Function that returns sanitization rules in an array
*/
// Upload sanitize rules
export function sanitizationRulesUpload() {
    return [
        body('title')
            .trim()
            .escape()
            .isLength({min: 1})
            .withMessage('Title not submitted.'),
        body('firstName')
            .trim()
            .escape()
            .isLength({min: 1})
            .withMessage('First name not submitted.'),
        body('lastName')
            .trim()
            .escape()
            .isLength({min: 1})
            .withMessage('Last name not submitted.'),
        body('category')
            .trim()
            .escape(),
        body('tags')
            .trim()
            .escape(),
        body('description')
            .trim()
            .escape()
    ]
}

// Edit sanitize rules
export function sanitizationRulesEdit() {
    return [
        body('title')
            .trim()
            .escape()
            .isLength({min: 1})
            .withMessage('Title not submitted.'),
        body('firstName')
            .trim()
            .escape()
            .isLength({min: 1})
            .withMessage('First name not submitted.'),
        body('lastName')
            .trim()
            .escape()
            .isLength({min: 1})
            .withMessage('Last name not submitted.'),
        body('year')
            .trim()
            .escape()
            .isInt().withMessage('Year is not an integer.')
            .isLength({min: 4, max: 4}).withMessage('Invalid year.'),
        body('month')
            .trim()
            .escape()
            .isLength({min: 0, max: 2}).withMessage('Month has more than 2 digits.')
            .custom(value => {
                if (value == '') {
                    return true;
                } else if (!isNaN(value)) {
                    if (value >= 0 && value < 13) {
                        return true;
                    } else {
                        throw new Error('Month is not in the range of 1-12.');
                    }
                } else {
                    throw new Error('Month is a not a number.');
                }}),
        body('day')
            .trim()
            .escape()
            .isLength({min: 0, max: 2}).withMessage('Day has more than 2 digits.')
            .custom(value => {
                if (value == '') {
                    return true;
                } else if (!isNaN(value)) {
                    if (value >= 0 && value < 32) {
                        return true;
                    } else {
                        throw new Error('Day is not in the range of 1-31.');
                    }
                } else {
                    throw new Error('Day is not a number.');
                }}),
        body('hour')
            .trim()
            .escape()
            .isLength({min: 0, max: 2}).withMessage('Hours entered have more than 2 digits.')
            .custom(value => {
                if (value == '') {
                    return true;
                } else if (!isNaN(value)) {
                    if (value >= 0 && value < 60) {
                        return true;
                    } else {
                        throw new Error('Hours are not in the range of 1-60.');
                    }
                } else {
                    throw new Error('Hours entered is not a number.');
                }}),
        body('minute')
            .trim()
            .escape()
            .isLength({min: 0, max: 2}).withMessage('Hours entered have more than 2 digits.')
            .custom(value => {
                if (value == '') {
                    return true;
                } else if (!isNaN(value)) {
                    if (value >= 0 && value < 60) {
                        return true;
                    } else {
                        throw new Error('Minutes are not in the range of 1-60.');
                    }
                } else {
                    throw new Error('Minutes entered is not a number.');
                }}),
        body('second')
            .trim()
            .isLength({min: 0, max: 2}).withMessage('Hours entered have more than 2 digits.')
            .custom(value => {
                if (value == '') {
                    return true;
                } else if (!isNaN(value)) {
                    if (value >= 0 && value < 60) {
                        return true;
                    } else {
                        throw new Error('Seconds are not in the range of 1-60.');
                    }
                } else {
                    throw new Error('Seconds entered is not a number.');
                }}),
        body('category')
            .trim()
            .escape(),
        body('tags')
            .trim()
            .escape(),
        body('description')
            .trim()
            .escape(),
        body('city')
            .trim()
            .escape(),
        body('state')
            .trim()
            .escape(),
        body('country')
            .trim()
            .escape(),
    ]
}

// Date Form sanitize rules
export function sanitizationRulesDate() {
    return [
        body('year')
            .trim()
            .escape()
            .isInt().withMessage('Year is not an integer.')
            .isLength({min: 4, max: 4}).withMessage('Invalid year.'),
        body('month')
            .trim()
            .escape()
            .isLength({min: 0, max: 2}).withMessage('Month has more than 2 digits.')
            .custom(value => {
                if (value == '') {
                    return true;
                } else if (!isNaN(value)) {
                    if (value >= 0 && value < 13) {
                        return true;
                    } else {
                        throw new Error('Month is not in the range of 1-12.');
                    }
                } else {
                    throw new Error('Month is a not a number.');
                }}),
        body('day')
            .trim()
            .escape()
            .isLength({min: 0, max: 2}).withMessage('Day has more than 2 digits.')
            .custom(value => {
                if (value == '') {
                    return true;
                } else if (!isNaN(value)) {
                    if (value >= 0 && value < 32) {
                        return true;
                    } else {
                        throw new Error('Day is not in the range of 1-31.');
                    }
                } else {
                    throw new Error('Day is not a number.');
                }})
    ]
}

// Middleware
export function sanitizeMiddleware(req, res, next) {
    const errorResult = validationResult.validationResult(req);
    const errors = errorResult.errors;

    if (!errors) {
        return next()
    } else {
        req.sanitizeErrors = errors;
        return next();
    }
}

