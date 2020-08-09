/* Built-in or third party modules */
import fs from 'fs';

/*
Formats and returns an array of tags.

Parameters:
    tagString : str
        String that represents a list of tags
Return:  
    An array of tags
*/
export async function getTags(tagString) {

    // Split by comma
    const tags = tagString.split(';');

    // Trim any whitespace
    return tags.map(tag => tag.trim());

}

/*
Deletes an image document based on POST data id value and renders admin home 
view.

Parameters:
    imageFile : str
        String that represents path to image file
*/
export function removeImage(imageFile) {
    
    // Get current working directory and preprend it to imageFile string
    const cwd = process.cwd()
    imageFile = cwd + imageFile;

    // Remove file from file system
    try {
        fs.unlinkSync(imageFile);
        console.log(`Successully deleted: ${imageFile}`);
    } catch(err) {
        throw err;
    }
}