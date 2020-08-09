/* Built-in or third party modules */
import multer from 'multer';

/*
Configures storage and exports Multer object.

Parameters:

Return:  
    upload : Object
        Multer object configured with storage attributes
*/

// Confiugre Multer storage options
const storage = multer.diskStorage({ 
    destination: 'public/images/catalog/',
    filename: (req, file, cb) => {
        const date = new Date();
        const extension = file.originalname.split('.')[1];
        const fileName = req.body.lastName.toLowerCase() + '-' 
            + date.getFullYear() 
            + (date.getMonth() + 1) 
            + date.getDate() + '-' 
            + Math.round(Math.random() * 1E6) + '.' 
            + extension;    
        cb(null, fileName);
    }
});

export const upload = multer({ storage: storage });