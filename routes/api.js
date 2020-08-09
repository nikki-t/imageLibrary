/* Controller module for api paths that routes specific requests to callbacks 
functions in core directory. */

/* Local modules */
import { getImages } from '../core/api/getImages.js';
import { getRecord } from '../core/api/getRecord.js';
import { getImagesByCategory } from '../core/api/getImagesByCategory.js';
import { getImagesByYear } from '../core/api/getImagesByYear.js';

/* Built-in or third party modules */
import express from 'express';
const apiRouter = express.Router();

// API Routes
apiRouter.get('/images', getImages);

apiRouter.get('/images/:id', getRecord);

apiRouter.get('/search/year/:year', getImagesByYear);

apiRouter.get('/search/category/:category', getImagesByCategory);

apiRouter.use( (req, res) => {
    res.status(404);
    res.format({
        'application/json': () => {
            res.json({error: '404'});
        },
        'application/xml': () => {
            let errorXml = '<?xml version="1.0">' 
                + '  <error>' 
                + '    <message>404</message>'
                + '  </error>';
            res.type('application/xml');
            res.send(errorXml);
        }
    })
});

// Export router
export { apiRouter };