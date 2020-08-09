/*
Serves to map image object data to XML key/value pairs.

Parameters:
    image : object
Return:  
    xml : str
        String that represents image object data in XML form
*/
export function generateXml(image) {
    const xml = `  <image>`
        + `    <id>${image._id}</id>`
        + `    <title>${image.title}</title>`
        + `    <date>${image.date.month}/${image.date.day}/${image.date.year}</date>`
        + `    <time>${image.time.hour}:${image.time.minute}:${image.time.second}</time>`
        + `    <creator>${image.creator.first} ${image.creator.last}</creator>`
        + `    <category>${image.category}</category>`
        + `    <tags>${image.getTags()}</tags>`
        + `    <description>${image.description}</description>`
        + `    <camera>${image.getCamera()}</camera>`
        + `    <resolution>${image.getResolution()}</resolution>`
        + `    <aperture>${image.aperture}</aperture>`
        + `    <exposure>${image.exposure}</exposure>`
        + `    <iso>${image.iso}</iso>`
        + `    <focalLength>${image.focalLength}</focalLength>`
        + `    <city>${image.gps.city}</city>`
        + `    <state>${image.gps.state}</state>`
        + `    <country>${image.gps.country}</country>`
        + `    <filename>${image.fileName}</filename>`
        + `    <filepath>${image.imagePath}</filepath>`
        + `  </image>`

        return xml;
}

