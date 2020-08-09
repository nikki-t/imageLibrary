/*
Renders search form.

Parameters:
    req : request
        HTTP request
    res : response
        HTTP response
    next : next  
        Middleware next function
Return:  
    render of 'user/searchForm'
*/
export function displaySearchForm(req, res, next) {
    // Render search form
    res.render('user/searchForm');
};