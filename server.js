const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const app = express();
app.use(express.static('public')); // assuming index.html is inside /public


app.use(session({
    secret: 'your-secret-key', // Replace with a secure secret in production
    resave: false,
    saveUninitialized: false,
}));

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');  // Import the User model


const PORT = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

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
        console.log(    "User registered successfully:", newUser);
        res.redirect('/login');  // Redirect to login page after successful registration
    } catch (err) {
        console.error('Error saving user:', err);
        res.render('register', { error: 'Error occurred while registering.' });
    }
});
app.get('/forhim', (req, res) => {
    const products = [
        {
            link: '/product1',
            image: '/images/product1.jpg',
            name: 'T-Shirt',
            price: '$20'
        },
        {
            link: '/product2',
            image: '/images/product2.jpg',
            name: 'Jeans',
            price: '$40'
        }
    ];

    res.render('forhim', { products });
});


// Route to render the login page
app.get('/login', (req, res) => {
    res.render('login');
});

// POST route to handle login form submission
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.render('login', { error: 'No user found with that email' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.render('login', { error: 'Incorrect password' });
        }

        // Store user session
        req.session.user = { id: user._id, username: user.username };

        console.log("Login successful! Redirecting to home...");
        res.redirect(`/?username=${encodeURIComponent(user.username)}`);
        // res.redirect("/");

    } catch (err) {
        console.error("Login error:", err);
        res.render('login', { error: 'An error occurred, please try again.' });
    }
});


// Route to render the home page
app.get('/', (req, res) => {
    res.render('index');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/forher', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'forher.html'));
});
app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cart.html'));
});
app.get('/forhim', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'forhim.html'));
});
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
}   );
app.get('/sales', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'sales.html'));
});
app.get('/purchase', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'purchase.html'));
});
app.get('/order-history', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'order-history.html'));
});
app.get('/shop', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'shop.html'));
});
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});
app.get('/shopm1', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'shopm1.html'));
});
app.get('/shopm3', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'shopm3.html'));

});
app.get('/shopm2', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'shopm2.html'));
});
app.get('shop3', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'shop3.html'));
});
app.get('/shop4', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'shop4.html'));
});
app.get('/profile', (req, res) => { 
    res.render('profile');
});