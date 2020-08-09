/* Local modules */
import { getConnection } from './dbConnection.js';

/* Built-in or third party modules */
import mongoose from 'mongoose';

// Define image schema
const Schema = mongoose.Schema;

// Image properties
const imageSchema = new Schema({
    title: String,
    date: {year: Number, month: Number, day: Number},
    time: {hour: Number, minute: Number, second: Number},
    creator: {first: String, last: String},
    category: String,
    tags: [String],
    description: String,
    camera: {make: String, model: String},
    resolution: {width: Number, height: Number},
    aperture: Number,
    exposure: Number,
    iso: Number,
    focalLength: Number,
    gpsAvailable: Boolean,
    exifAvailable: Boolean,
    gps: {city: String, state: String, country: String},
    fileName: String,
    imagePath: String
}, {
    collection: 'images'
});

// Image methods

// Return string form of creator's name
imageSchema.methods.getCreatorName = function() {
    return this.creator.first + ' ' + this.creator.last;
};

// Return string list of tags
imageSchema.methods.getTags = function() {
    return this.tags.join(', ');
};

// Return string form of date
imageSchema.methods.getDateTime = function() {
    // Display month name
    const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'];
    const monthIndex = this.date.month - 1;

    // Determine date to display based on vales of attributes
    let day, month, year;
    if (this.date.year === 0) {
        year = '';
    } else {
        year = this.date.year;
    }

    if (this.date.month === 0) {
        month = '';
    } else {
        month = months[monthIndex];
    }

    if (this.date.day === 0) {
        day = '';
    } else {
        day = this.date.day;
    }
    
    // Determine time to display based on vales of attributes
    let hour, minute, second;
    if (this.time.hour === 0) {
        hour = '';
    } else {
        hour = this.time.hour;
    }

    if (this.time.minute === 0) {
        minute = '';
    } else {
        minute = this.time.minute;
    }

    if (this.time.second === 0) {
        second = '';
    } else {
        second = this.time.second;
    }

    // Return string that contains date and time
    if (year == '' && month == '' && day == '' && hour == '' && minute == '' 
        && second == '') {
            // Return false if no data is present
            return false;
    } else if (hour == '' && minute == '' && second == '') {
        // Return just the date
        return `${month} ${day} ${year} `;
    } else {
        // Return the date and time
        return `${month} ${day} ${year} ` 
            + `${hour}:${minute}:${second}`;
    }
};

// Return string form of camera make and model
imageSchema.methods.getCamera = function() {
    return this.camera.make + ' ' + this.camera.model;
};

// Return string form of image width by height
imageSchema.methods.getResolution = function() {
    return this.resolution.width + ' x ' + this.resolution.height;
};

// Return full image path and image file
imageSchema.methods.getImage = function() {
    return this.imagePath + this.fileName;
};

// Connect model to database and export model
let model = getConnection().model('ImageModel', imageSchema);
export function getImageModel() {
    console.log('Exporting image model...')
    return model;
}