/*
Validates function parameter date object as a number. Converts date object 
attribute values to numbers if possible.

Parameters:
    date: Object
Return:  
    date : Object with year, month, and day attributes
*/
export async function validateDate(date) {
    
    // Convert date attributes to a Number
    date.year = Number(date.year);
    date.month = Number(date.month);
    date.day = Number(date.day);

    // Test for NaN and if true assign value of 0
    if (isNaN(date.year)) date.year = 0;
    if (isNaN(date.month)) date.month = 0;
    if (isNaN(date.day)) date.day = 0;

    return date;
};

/*
Validates function parameter time object as a number. Converts time object 
attribute values to numbers if possible.

Parameters:
    time: Object
Return:  
    time : Object with hour, minute, and second attributes
*/
export async function validateTime(time) {
    
    // Convert time attributes to a Number
    time.hour = Number(time.hour);
    time.minute = Number(time.minute);
    time.second = Number(time.second);

    // Test for NaN and if true assign value of 0
    if (isNaN(time.hour)) time.hour = 0;
    if (isNaN(time.minute)) time.minute = 0;
    if (isNaN(time.second)) time.second = 0;

    return time;
};

/*
Tests POST data to see if day was submitted without month

The user can search by year, year and month, or year, month and day.

Parameters:
    errors : array 
        Error objects present in request object
    body : 
        request object body attribute
Return:  
    errors : array 
        Error objects present in request object
*/
export async function getMonthDayError(errors, body) {

    if (body.day && !body.month) {
        errors.push({
            value: body.month,
            msg: 'A day was entered but not a month.',
            param: 'month',
            location: 'body'
        });
    }

    return errors;
    
}