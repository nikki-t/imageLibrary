/* Controller module for admin paths that routes specific requests to callbacks 
functions in core directory. */

/* Local modules */
import { initPassport } from '../utilities/initPassport.js';
import { upload } from '../utilities/initMulter.js'
import { sanitizationRulesUpload, sanitizationRulesEdit, sanitizeMiddleware } from '../middleware/sanitizeMiddleware.js';
import { displayAdminLoginForm } from '../core/admin/displayLoginAdminForm.js';
import { adminLogout } from '../core/admin/adminLogout.js';
import { displayAdminHome } from  '../core/admin/displayAdminHome.js';
import { displayUploadForm } from '../core/admin/displayUploadForm.js';
import { saveUploadedImage } from '../core/admin/saveUploadedImage.js';
import { saveEditedImage } from '../core/admin/saveEditedImage.js';
import { displayEditForm } from '../core/admin/displayEditForm.js';
import { deleteImage } from '../core/admin/deleteImage.js';
import { displayDeleteConfirmation } from '../core/admin/displayDeleteConfirmation.js';

/* Built-in or third party modules */
import express from 'express';
import filterAPIs from 'express-validator';
import passport from 'passport';

// Set up admin router
const adminRouter = express.Router();

// Set up express validator to deal with parameters
const { body, param } = filterAPIs;

// Configure passport
adminRouter.use(passport.initialize());
adminRouter.use(passport.session());
initPassport();

// Admin Routes
adminRouter.get('/', displayAdminLoginForm);

// Admin login
adminRouter.get('/login', displayAdminLoginForm);

// Admin login post
adminRouter.post('/login',
    passport.authenticate('local', { 
        successRedirect: '/admin/view', 
        failureRedirect: '/admin/login',
        failureFlash: true
    })
);

// Admin logout
adminRouter.get('/logout', adminLogout);

// Admin gallery view
adminRouter.get('/view', passport.authenticationMiddleware(), displayAdminHome);

// Upload
adminRouter.get('/upload', passport.authenticationMiddleware(), displayUploadForm);
adminRouter.post('/upload', upload.single('image'), 
    sanitizationRulesUpload(), 
    sanitizeMiddleware, 
    saveUploadedImage);

// Edit
adminRouter.get('/edit/id/:id', passport.authenticationMiddleware(), [param('id').trim().escape()], displayEditForm);
// Post with sanitized data
adminRouter.post('/edit', 
    sanitizationRulesEdit(), 
    sanitizeMiddleware, 
    saveEditedImage);

// Delete
adminRouter.get('/delete/id/:id', passport.authenticationMiddleware(), displayDeleteConfirmation);
adminRouter.post('/delete', [body('id').trim().escape()], deleteImage);

// Export router
export { adminRouter };