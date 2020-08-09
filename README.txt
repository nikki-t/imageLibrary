Project Name: imageLibrary
Author: Nikki Tebaldi
Date: 2020/02/02

What follows is a description of the project structure, how to initialize the
application, future release features, and resources referenced for each project
component.

Please note this project is using ES Modules to support the Exifr module for
parsing image metadata.

Test image data to upload is located inside of the imageLibrary directory,
in a directory labelled: test_images

Please note that the web application logs all caught errors and the exif-r
library does throw an error if exif data is not found; there does not seem
to be a way to test for exif data so I have gracefully handled the caught error.

Project structure
-----------------

Main entry point: app.js

Components: user (public interface), admin (admin interface), api (api interface)

Controller:
routes/
    - Contains all application routes which import and make use of callback
    functions in the core directory.
core/
    - Route callback functions organized by user, admin, and api

Model:
db/
    - Contains database connection, models, and queries
    - Also includes test files for initializing the Image and User databases

View:
views/
    - Contains application views organized by user and admin with the main
    view layout in layouts/
    - Also includes templates for 404 status and error messages

Utility modules
utilities/
    - Includes utilities used by all components (user, admin, and api)

Middleware modules
middleware/
    - Includes modules that export middleware functions to be used with routes

Public resources
public/
    - The image library is located in images/catalog/
    - Includes client-side JavaScript and CSS

How to initialize the application
----------------------------------

1. Install all third-party modules via: npm install

2. Initialize the images database: node db/initImageDB.js

3. Initialize the user database: node db/initUserDB.js

4. You can now run the application: node app.js

5. You will need a username and password to log into the admin side of the web
    interface:
        username: libraryUser
        password: ssZZre567urT

6a. To test uploads with location data, fill out the upload form and upload
    the image titled: locationData.jpg

6b. To test uploads without location data but with EXIF data, fill out the 
    upload form and upload the image titled: noLocationData.jpg

6c. To test uploads without EXIF data, fill out the upload form and upload
    the image titled: noExif.png

Future releases
---------------

- Client-side validation of form data
- Mobile responsiveness and accessibility of bootstrap grid
- Display of location data when one or more attributes are not present
- Display of error messaging in both user and admin interfaces
- Display of date and time if not available
- User authentication with JSON Web Tokens (JWT)
- Crop images upon upload to create thumbnail and full sized images

Resources referenced
--------------------

EXIF data:
- npm: https://www.npmjs.com/package/exifr
- GitHub: https://github.com/MikeKovarik/exifr

Goolge Maps Services
- npm: https://www.npmjs.com/package/@googlemaps/google-maps-services-js
- GitHub: https://github.com/googlemaps/google-maps-services-js
- Google Documentation: https://developers.google.com/maps/documentation/geocoding/intro
- dotenv (to hide API key): https://www.npmjs.com/package/dotenv

Multer
- npm:https://www.npmjs.com/package/multer
- github:https://github.com/expressjs/multer#readme

Express-validator
- npm:https://www.npmjs.com/package/express-validator
- GitHub:https://github.com/express-validator/express-validator
- Documentation:https://express-validator.github.io/docs/

Passport
- npm https://www.npmjs.com/package/passport
- GitHub: https://github.com/jaredhanson/passport
- Passport documentation: http://www.passportjs.org/
- RisingStack tutorial:https://github.com/RisingStack/nodehero-authentication/blob/master/app/
- bcrypt (for salting and hashing passwords): https://www.npmjs.com/package/bcrypt
