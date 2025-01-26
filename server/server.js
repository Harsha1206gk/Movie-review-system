require('dotenv').config();  // Ensure this is at the top of the server.js file
console.log("MongoDB URI:", process.env.MONGO_URI);

process.on('uncaughtException', (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  process.exit(1); // Exit the process after logging the error
});

const express = require('express');
const app = express(); // Only one instance of express

const connectDB = require('./config/dbConfig');
connectDB();  // Connect to MongoDB

// Create default admin user if not exists
const createDefaultAdmin = async () => {
  try {
    const defaultAdmin = await User.findOne({ email: 'admin@example.com' });

    if (!defaultAdmin) {
      const admin = new User({
        username: 'admin',
        email: 'admin@example.com',
        password: 'adminpassword',  // Use hashed password, never store plain text passwords
        isAdmin: true,
      });

      await admin.save();
      console.log('Default admin user created');
    }
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
};

// Call the function to create the default admin user
createDefaultAdmin();

// Middleware and routes
app.use(express.json());


console.log("JWT KEy", process.env.JWT_SECRET); // Print JWT key to verify

app.use(express.json()); // Middleware to parse JSON requests

const cors = require("cors");
app.use(cors({ origin: 'http://localhost:3000' }));  // Allow requests from your frontend

// Import Routes
const usersRoute = require('./routes/usersRoute');
const artistsRoute = require('./routes/artistsRoute');
const imagesRoute = require('./routes/imagesRoute');
const moviesRoute = require('./routes/moviesRoute');
const reviewsRoute = require('./routes/reviewsRoute');
const filtersRoute = require('./routes/filtersRoute');

// Use Routes
app.use('/api/users', usersRoute);
app.use('/api/artists', artistsRoute);
app.use('/api/images', imagesRoute);
app.use('/api/movies', moviesRoute);
app.use('/api/reviews', reviewsRoute);
app.use('/api/filters', filtersRoute);

const port = process.env.PORT || 5000;  // Ensure the correct port is being used

app.get("/test", (req, res) => {
  res.send("Server is working!");
});

// Serve static files in production
const path = require("path");
__dirname = path.resolve();  // Ensure __dirname points to the correct path
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build"))); // Ensure it points to "build"
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// Start the server (only once)
app.listen(port, () => console.log(`Server running on port ${port}`));
