/*
IMAGE LIBRARY APPLICATION
CS 602 Term Project
Author: Nikki Tebaldi
Date: 2020/02/28
*/

/* Built-in or third party modules */
import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import flash from 'connect-flash';
import handlebars from 'express-handlebars';
import path from 'path';

// Set up express
const app = express();

// Set up handlebars view engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set up static resource usage
const __dirname = path.resolve();
app.use(express.static(__dirname + '/public'));

// Set up sesssions
app.use(session({
    'secret': 'imageLibrarySessionSecret',
    saveUninitialized: false,
    resave: false
}))

// Set up flash messages
app.use(flash());

// Set up parse of post request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Import Google API key
import dotenv from 'dotenv';
dotenv.config();

// Routing
app.get('/', (req, res, next) => {
    res.redirect('/images');
});

// User routes
import { userRouter } from './routes/user.js';
app.use('/images', userRouter);

// Admin routes
import { adminRouter } from './routes/admin.js';
app.use('/admin', adminRouter);

// Api routes
import { apiRouter } from './routes/api.js';
app.use('/api', apiRouter);

// Error handling
app.use( (req, res) => {
    res.status(404);
    res.render('404')
});

// Bind and listen to connections on port 3000
app.listen(3000, () => {
    console.log('http://localhost:3000');
});