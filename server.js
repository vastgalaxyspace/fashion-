const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');  // Import the User model

const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to MongoDB locally ✅');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Route to render the register page
app.get('/register', (req, res) => {
    res.render('register');
});

// POST route to handle register form submission
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.render('register', { error: 'Email is already registered' });
    }

    const newUser = new User({ username, email, password });
    
    try {
        await newUser.save();
        res.redirect('/login');  // Redirect to login page after successful registration
    } catch (err) {
        console.error('Error saving user:', err);
        res.render('register', { error: 'Error occurred while registering.' });
    }
});

// Route to render the login page
app.get('/login', (req, res) => {
    res.render('login');
});

// POST route to handle login form submission
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.render('login', { error: 'No user found with that email' });
    }

    // Compare the entered password with the stored password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.render('login', { error: 'Incorrect password' });
    }

    // If successful login, redirect to the home page
    res.redirect('file:///C:/Users/91986/OneDrive/Desktop/HARSHAD/sustainable%20fashion%20website/sales.html');  // Redirect to the root route
});

// Route to render the home page
app.get('/', (req, res) => {
    res.render('index');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
