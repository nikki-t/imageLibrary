/* Local modules */
import { getUserModel } from './userModel.js';
const User = getUserModel();

// Import password
import { userCredentials } from './userCredentials.js';

// Import bcrypt
import bcrypt from 'bcrypt';
const saltRounds = 10;
const password = userCredentials.password;

// Generate a salt and hash for the password
bcrypt.hash(password, saltRounds, (err, hash) => {
    if (!err) {
        User.deleteMany({}, async (err) => {
            let user = new User({
                username: 'libraryUser',
                password: hash
            })
            await user.save();
            console.log('User saved.');
            process.exit();
        })
    } else {
        console.log(`Error: ${err}`);
    }
});