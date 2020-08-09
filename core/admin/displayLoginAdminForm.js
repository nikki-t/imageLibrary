/*
Renders admin login form.

Parameters:
    req : request
        HTTP request
    res : response
        HTTP response
    next : next  
        Middleware next function
Return:  
    render of 'admin/adminLoginForm'
*/
export async function displayAdminLoginForm(req, res, next) {
    // Test for and render any error messages to the login form
    let error = req.flash().error;
    let error_message = new Object();
    if (error) {
        if (error[0] == 'Missing credentials') {
            error_message.missing = error[0];
        } else if (error[0] == 'Incorrect username') {
            error_message.username = error[0];
        } else if (error[0] == 'Incorrect password') {
            error_message.password = error[0];
        }
    } else {
        error_message = {};
    }

    // Render login form with any errors
    res.render('admin/adminLoginForm', { error: error_message });
};