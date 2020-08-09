/* Local modules */
import { findImage } from '../../db/imageQueries.js';
import { generateXml } from '../../utilities/generateXml.js'

/*
Retrieves all images and renders either a JSON or XML response.

Parameters:
    req : request
        HTTP request
    res : response
        HTTP response
    next : next  
        Middleware next function
Return:  
    render of 'application/json' or 'application/xml'
*/
export async function getImages(req, res, next) {
    
    // Retrieve image data from database
    const imageData = await findImage({});

    // Test if query returned results
    const emptyImageData = Object.entries(imageData).length === 0;

    // Return output based on Accept HTTP header
    res.format({
        // JSON
        'application/json': () => {
            
            if (emptyImageData) {
                res.json({error: 'No image data found.'});
            } else {
                res.json(imageData);
            }
            
        },
        // XML
        'application/xml': () => {

            let imagesXML;
            if (emptyImageData) {
                imagesXML = '<?xml version="1.0">'
                    + '  <errors>'
                    + '    <error>No data available</error>'
                    + '  </errors>'
            } else {
                
                imagesXML = '<?xml version="1.0">'
                + '  <images>'
                + `${imageData.map( (image) => generateXml(image)).join('')}`
                + '  </images>'

            }
            
            res.type('application/xml');
            res.send(imagesXML);
        }
    })
};