/*
Logs user out of image library application and returns them to the public facing
home page.

Parameters:
    req : request
        HTTP request
    res : response
        HTTP response
    next : next  
        Middleware next function
Return:  
    render of '/'
*/
export function adminLogout(req, res, next) {
    req.logout();
    res.redirect('/');
}