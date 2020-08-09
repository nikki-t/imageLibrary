/*
Exports a function that serves as passport middleware authenticator.

Parameters:
    req : request
        HTTP request
    res : response
        HTTP response
    next : next  
        Middleware next function
Return:  
    If user is authenticated, returns next route otherwise redirects to login
*/
export function authenticationMiddleware() {
    // Proceed to next route if user is authenticated
    return (req, res, next) => {
        if(req.isAuthenticated()) {
            return next()
        }
        res.redirect('/admin/login')
    }
}
