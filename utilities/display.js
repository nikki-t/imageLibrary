/*
Map image data to an array of image objects with the following attributes:
    id, image, title, creator, date, vertical

Parameters:
    imageData : Mongoose Query
        Result of Mongoose find query for ImageModel 
Return:  
    images : Array
        Array of image objects
*/
export async function mapImageDataGallery(imageData) {
    let images;
    // Test if imageData is empty and return empty array
    if (imageData.length === 0) {
        images = [];
    } else {
        // Map image objects to an array
        images = imageData.map((image) => {
            return {
                id: image._id,
                image: image.getImage(),
                title: image.title,
                creator: image.getCreatorName(),
                date: image.getDateTime(),
                vertical: image.resolution.width < image.resolution.height,
                gpsAvailable: image. gpsAvailable,
                exifAvailable: image.exifAvailable
            }
        });
    }
    return images;
}

/*
Map image data to an image object defined by ImageModel for record view.

Parameters:
    image: Mongoose Query
        Result of Mongoose findByID query for ImageModel 
Return:  
    image object
*/
export async function mapImageDataRecord(image) {
    // Return object of record image data
    return {
        id: image._id,
        image: image.getImage(),
        title: image.title,
        creator: image.getCreatorName(),
        date: image.getDateTime(),
        category: image.category,
        tags: image.getTags(),
        description: image.description,
        camera: image.getCamera(),
        aperture: image.aperture,
        exposure: image.exposure,
        iso: image.iso,
        focalLength: image.focalLength,
        resolution: image.getResolution(),
        gps: image.gps,
        gpsAvailable: image. gpsAvailable,
        exifAvailable: image.exifAvailable
    };
}

/*
Map image data to an image object defined by ImageModel for edit form.

Parameters:
    image: Mongoose Query
        Result of Mongoose findByID query for ImageModel 
Return:  
    image object
*/
export async function mapImageDataEdit(image) {
    // Return object of image data
    return {
        image: image.getImage(),
        id: image._id,
        title: image.title,
        date: image.date,
        time: image.time,
        firstName: image.creator.first,
        lastName: image.creator.last,
        category: image.category,
        tags: image.getTags(),
        description: image.description,
        camera: image.getCamera(),
        resolution: image.getResolution(),
        aperture: image.aperture,
        exposure: image.exposure,
        iso: image.iso,
        focalLength: image.focalLength,
        gpsAvailable: image.gpsAvailable,
        exifAvailable: image.exifAvailable,
        city: image.gps.city,
        state: image.gps.state,
        country: image.gps.country,
        fileName: image.fileName,
        imagePath: image.imagePath
    };
}