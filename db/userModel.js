/* Local Modules */
import { getConnection } from './dbConnection.js';

/* Built-in or third party modules */
import mongoose from 'mongoose';

// Define user schema
const Schema = mongoose.Schema;

// User properties
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    }

}, { collection: 'users'} );

// Connect model to database and export model
let userModel = getConnection().model('UserModel', userSchema);
export function getUserModel() {
    console.log('Exporting user model...')
    return userModel;
}