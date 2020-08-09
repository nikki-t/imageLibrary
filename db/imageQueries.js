/* Local modules */
import { getImageModel } from './imageModel.js';
const Image = getImageModel();

/*
Retrieve image data from database and return the query object.    

Parameters:
    query : Object
        Object that represents a query to be passed to model's find method  
Return:  
    imageData : Mongoose Query
        Result of Mongoose find query for ImageModel
Raises:
    err : Error object
*/
export async function findImage(query, column='') {

    let imageData;
    // Search for image data based on query parameter
    try {
        imageData = await Image.find(query, column);
    } catch(err) {
       console.log(err);
       imageData = [];
    }
    return imageData;
  
};

/*
Return one image document based on parameter id.

Parameters:
    id : str
        Image identifier
Return:  
    image : object
        Image object
*/
export async function findByIDImage(id) {
    // Search for image by id
    let image;
    try {
        image = await Image.findById(id);
    } catch(err) {
        image = {};
    }
    return image;
}