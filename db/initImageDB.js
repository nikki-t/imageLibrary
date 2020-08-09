/* Local modules */
import { getImageModel } from './imageModel.js';
const Image = getImageModel();

Image.deleteMany({}, async (err) => {
    if (!err) {
        let image = new Image({
            title: 'Las Vegas',
            date: {year: 2019, month: 12, day: 30},
            time: {hour: 9, minute: 56, second: 15},
            creator: {first: 'Nikki', last: 'Tebaldi'},
            category: 'travel',
            tags: ['Las Vegas', 'road trip'],
            description: 'Palazzo building surrounded by palm trees and light fixtures.',
            camera: {make: 'samsung', model: 'SM-G955U'},
            resolution: {width: 1000, height: 486},
            aperture: 1.7,
            exposure: 0.000739,
            iso: 50,
            focalLength: 4.2,
            gpsAvailable: true,
            exifAvailable: true,
            gps: {city: 'Las Vegas', state: 'Nevada', country: 'United States'},
            fileName: 'tebaldi-20191230-95615.jpg',
            imagePath: '/images/catalog/'
        });
        await image.save();
        console.log('Image saved.');

        image = new Image({
            title: 'Mountain Prairie',
            date: {year: 2019, month: 12, day: 30},
            time: {hour: 16, minute: 37, second: 14},
            creator: {first: 'Nikki', last: 'Tebaldi'},
            category: 'travel',
            tags: ['Colorado', 'road trip'],
            description: 'Prairie streched before mountains in Colorado.',
            camera: {make: 'samsung', model: 'SM-G955U'},
            resolution: {width: 1000, height: 486},
            aperture: 1.7,
            exposure: 0.003649,
            iso: 50,
            focalLength: 4.2,
            gpsAvailable: true,
            exifAvailable: true,
            gps: {city: '', state: 'Colorado', country: 'United States'},
            fileName: 'tebaldi-20191230-163714.jpg',
            imagePath: '/images/catalog/'
        });
        await image.save();
        console.log('Image saved.')

        image = new Image({
            title: 'Golden Gate Bridge',
            date: {year: 2019, month: 12, day: 29},
            time: {hour: 11, minute: 59, second: 1},
            creator: {first: 'Nikki', last: 'Tebaldi'},
            category: 'travel',
            tags: ['San Francisco', 'road trip'],
            description: 'Rainy view of the Golden Gate Bridge.',
            camera: {make: 'samsung', model: 'SM-G955U'},
            resolution: {width: 1000, height: 486},
            aperture: 1.7,
            exposure: 0.000549,
            iso: 50,
            focalLength: 4.2,
            gpsAvailable: true,
            exifAvailable: true,
            gps: {city: 'San Francisco', state: 'California', country: 'United States'},
            fileName: 'tebaldi-20191229-115901.jpg',
            imagePath: '/images/catalog/'
        });
        await image.save();
        console.log('Image saved.')

        image = new Image({
            title: 'Olive',
            date: {year: 2020, month: 2, day: 17},
            time: {hour: 10, minute: 1, second: 16},
            creator: {first: 'Nikki', last: 'Tebaldi'},
            category: 'pets',
            tags: ['pets', 'family', 'Olive'],
            description: 'Small Olive feet.',
            camera: {make: 'samsung', model: 'SM-G955U'},
            resolution: {width: 2024, height: 4167},
            aperture: 1.7,
            exposure: 0.000739,
            iso: 50,
            focalLength: 4.2,
            gpsAvailable: true,
            exifAvailable: true,
            gps: {city: 'Greenfield', state: 'Massachusetts', country: 'United States'},
            fileName: 'tebaldi-2020217-100116.jpg',
            imagePath: '/images/catalog/'
        });
        await image.save();
        console.log('Image saved.');

        image = new Image({
            title: 'Sea Coast',
            date: {year: 2019, month: 12, day: 27},
            time: {hour: 18, minute: 46, second: 20},
            creator: {first: 'Nikki', last: 'Tebaldi'},
            category: 'travel',
            tags: ['Oregon Coast', 'sea', 'waves', 'rocks'],
            description: 'Oregon coast at sun set.',
            camera: {make: 'SONY', model: 'ILCE-7RM2'},
            resolution: {width: 1000, height: 667},
            aperture: 16,
            exposure: 0.005,
            iso: 400,
            focalLength: 50,
            gpsAvailable: false,
            exifAvailable: true,
            gps: {city: 'not available', state: 'not available', country: 'not available'},
            fileName: 'tebaldi-20191227-184620.jpg',
            imagePath: '/images/catalog/'
        });
        await image.save();
        console.log('Image saved.');

        image = new Image({
            title: 'Arizona Canyon',
            date: {year: 2019, month: 12, day: 30},
            time: {hour: 15, minute: 15, second: 24},
            creator: {first: 'Nikki', last: 'Tebaldi'},
            category: 'travel',
            tags: ['Canyon', 'desert', 'rocks'],
            description: 'Unknown Arizona Canyon.',
            camera: {make: 'SONY', model: 'ILCE-7RM2'},
            resolution: {width: 1000, height: 667},
            aperture: 16,
            exposure: 0.02,
            iso: 100,
            focalLength: 50,
            gpsAvailable: false,
            exifAvailable: true,
            gps: {city: 'not available', state: 'not available', country: 'not available'},
            fileName: 'tebaldi-20191230-151524.jpg',
            imagePath: '/images/catalog/'
        });
        await image.save();
        console.log('Image saved.');

        image = new Image({
            title: 'Redwood',
            date: {year: 2019, month: 12, day: 28},
            time: {hour: 16, minute: 7, second: 7},
            creator: {first: 'Nikki', last: 'Tebaldi'},
            category: 'travel',
            tags: ['Redwood', 'tree', 'forest'],
            description: 'California Redwood tree.',
            camera: {make: 'SONY', model: 'ILCE-7RM2'},
            resolution: {width: 445, height: 667},
            aperture: 8,
            exposure: 0.01,
            iso: 6400,
            focalLength: 50,
            gpsAvailable: false,
            exifAvailable: true,
            gps: {city: 'not available', state: 'not available', country: 'not available'},
            fileName: 'tebaldi-20191228-160707.jpg',
            imagePath: '/images/catalog/'
        });
        await image.save();
        console.log('Image saved.');

        image = new Image({
            title: 'The Lost Coast',
            date: {year: 2019, month: 12, day: 28},
            time: {hour: 14, minute: 14, second: 34},
            creator: {first: 'Nikki', last: 'Tebaldi'},
            category: 'travel',
            tags: ['sea', 'bridge', 'coast'],
            description: 'The Loast Coast in California.',
            camera: {make: 'SONY', model: 'ILCE-7RM2'},
            resolution: {width: 1000, height: 667},
            aperture: 18,
            exposure: 0.003125,
            iso: 200,
            focalLength: 50,
            gpsAvailable: false,
            exifAvailable: true,
            gps: {city: 'not available', state: 'not available', country: 'not available'},
            fileName: 'tebaldi-20191228-141434.jpg',
            imagePath: '/images/catalog/'
        });
        await image.save();
        console.log('Image saved.');


        // Exit program
        process.exit();
    } else {
        console.log(`Error: ${err}`);
    }
});