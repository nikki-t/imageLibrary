/* Controller module for user paths that routes specific requests to callbacks 
functions in core directory. */

/* Local modules */
import { sanitizationRulesDate, sanitizeMiddleware } from '../middleware/sanitizeMiddleware.js';
import { displayImages } from '../core/user/displayImages.js';
import { displayRecord } from '../core/user/displayRecord.js';
import { displayBrowseForm } from '../core/user/displayBrowseForm.js';
import { displayByCategory } from '../core/user/displayByCategory.js';
import { displaySearchForm } from '../core/user/displaySearchForm.js';
import { displayByDate } from '../core/user/displayByDate.js';

/* Built-in or third party modules */
import express from 'express';

// Set up user router
const userRouter = express.Router();

// User routes
userRouter.get('/', displayImages);
userRouter.get('/id/:id', displayRecord);

// Browse
userRouter.get('/browse', displayBrowseForm);
userRouter.post('/browse', displayByCategory);
userRouter.get('/browse/category/:category', displayByCategory);

// Search
userRouter.get('/search', displaySearchForm);
userRouter.post('/search', 
    sanitizationRulesDate(), 
    sanitizeMiddleware, 
    displayByDate);

// Export router
export { userRouter };