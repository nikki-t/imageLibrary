/*
Renders upload form.

Parameters:
    req : request
        HTTP request
    res : response
        HTTP response
    next : next  
        Middleware next function
Return:  
    render of 'admin/uploadForm'
*/

export async function displayUploadForm(req, res, next) {
    res.render('admin/uploadForm');
}