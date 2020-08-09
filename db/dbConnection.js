/* Built-in or third party modules */
import mongoose from 'mongoose';
import { dbCredentials } from './dbCredentials.js';

// Set up Mongoose to use new topology engine
mongoose.set('useUnifiedTopology', true);

// Set up database address
const dbUrl = 'mongodb://' + dbCredentials.username 
	+ ':' + dbCredentials.password 
	+ '@' + dbCredentials.host 
	+ ':' + dbCredentials.port 
    + '/' + dbCredentials.database;
    
// Define constant to hold connection object
let connection = null;

// Create a connection object if it doesn't exist and export it
export function getConnection() {
    if (connection == null) {
        console.log("Creating connection...");
        connection = mongoose.createConnection(dbUrl, 
            {useNewUrlParser: true});
    }
    return connection;
}