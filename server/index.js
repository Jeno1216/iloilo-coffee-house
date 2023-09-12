// Importing the Express framework to create a web application.
const express = require('express');

// Importing Mongoose, an Object Data Modeling (ODM) library for MongoDB, to interact with the database.
const mongoose = require('mongoose');

// Importing the CORS middleware to enable Cross-Origin Resource Sharing, allowing different origins to make requests to the server.
const cors = require('cors');

// Importing the bcrypt library to hash passwords securely.
const bcrypt = require('bcrypt');

// Importing the JSON Web Token (JWT) library to handle user authentication and authorization using tokens.
const jwt = require('jsonwebtoken');

// Importing the cookie-parser middleware to parse cookies in HTTP requests.
const cookieParser = require('cookie-parser');

// Importing the multer middleware for handling file uploads.
const multer = require('multer');

// Importing the path module for working with file and directory paths.
const path = require('path');

// Create an instance of the Express app
const app = express();

// Database Models
const UserModel = require('./models/UserModel')
const ProductModel = require('./models/ProductModel')
const RatingModel = require('./models/RatingModel')

// Enable JSON request and response handling
app.use(express.json());

// Enable JSON request and response handling
app.use(express.static('dist'));

// Parse cookies in incoming requests
app.use(cookieParser());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Connect to the MongoDB database at the specified URL
mongoose.connect('mongodb+srv://ich:QE9TfuuR5lXF46eC@ich.vdsul1c.mongodb.net/?retryWrites=true&w=majority')

// APIs

// API to check if an email exists
app.get('/api/check-email/:email', (req, res) => {
    const emailToCheck = req.params.email;

    // Look for a user with the provided email in the database
    UserModel.findOne({ email: emailToCheck })
        .then(existingUser => {
            if (existingUser) {
                return res.json({ exists: true });
            } else {
                return res.json({ exists: false });
            }
        })
        .catch(err => {
            return res.status(500).json({ error: 'An error occurred' });
        });
});


// API for Registering a User, Posting a User
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;

    // Hash the password and create the user
    bcrypt.hash(password, 10)
        .then(hash => {
            UserModel.create({ username, email, password: hash })
                .then(user => res.json(user))
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
});

//API for Login, Fetching User Information
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign(
                            { _id: user._id, email: user.email, username: user.username },
                            'jwt-secret-key',
                            { expiresIn: '1d' }
                        );
                        res.cookie('token', token);
                        return res.json("Success");
                    } else {
                        return res.json('Password incorrect');
                    }
                });
            } else {
                res.json('User Not Found');
            }
        });
});

// verify whether the user is currently logged in or not
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json('The token is missing');
    } else {
        jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
            if (err) {
                return res.json('The token is wrong');
            } else {
                req._id = decoded._id; // Include _id in req object
                req.email = decoded.email;
                req.username = decoded.username;
                next();
            }
        });
    }
};

app.get('/api', verifyUser, (req, res) => {
    return res.json({ _id: req._id, email: req.email, username: req.username });
});

// Logout API
app.get('/api/logout', (req, res) => {
    res.clearCookie('token') // clear cookie, means user is logged out
    return res.json('Success')
})

// Posting Products.
// We call verifyUser to check if admin is logged in or not
// after that, we upload the file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images') // Create a folder under server 
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

app.post('/api/createproducts', verifyUser, upload.single('file') , (req, res) => { // upload.single allows only single file
    ProductModel.create({
        author_id: req.body.author_id,
        title: req.body.title, 
        description: req.body.description, 
        file: req.file.filename})
        .then(result => res.json("Success"))
        .catch(err => res.json(err))
});

// fetch products as well as their ratings
app.get('/api/fetchproducts', (req, res) => {
    // Use the aggregate method on the ProductModel to perform an aggregation pipeline
    // bali since ang 'ratings' collection ta is need nya ang product id sang products
    // para ma determine diin nga ratings ang belong to product. we need to reference the product id to the 
    // RatingModel.js as product_id
    ProductModel.aggregate([
        {
            // Use the $lookup stage to perform a left outer join from the products collection to the ratings collection
            $lookup: {
                from: 'ratings', // Specify the name of the ratings collection
                localField: '_id', // Specify the field from the products collection to join on
                foreignField: 'product_id', // Specify the field from the ratings collection to join on
                as: 'ratings' // Specify the name of the output array field that will contain the joined ratings
            }
        },
        {
            // Use the $  to add a new field to each product document  
            // kumbaga mapasa sya data as averageRating. concole.log kay para mabal an mo
            $addFields: {
                averageRating: { $avg: '$ratings.rating' }, // Calculate the average of the rating values in the ratings array
                numberOfRatings: { $size: '$ratings' } // Calculate the size of the ratings array
            }
        }
    ])
    .then(products => {
        res.json(products); // Send the products array as a JSON response to the client
    })
    .catch(err => res.json(err)) // If an error occurs, send the error as a JSON response to the client
})


// fetch product by id with its ratings
app.get('/api/fetchproductbyid/:id',verifyUser, (req, res) => {
    const id = req.params.id;
    ProductModel.findById({_id: id})
    .then(product => {
        RatingModel.find({product_id: id})
        .populate('author_id') // Populate the user_id field with user data
        .then(ratings => {
            res.json({product, ratings})
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err)) 
})

// API for Posting User Rating and Review
app.post('/api/ratingreview', (req, res) => {
    const { product_id, author_id, rating, review } = req.body;
  
    // Check if a document with the same product_id and author_id already exists
    RatingModel.findOne({ product_id, author_id })
      .then(existingRating => {
        if (existingRating) {
          // A document with the same product_id and author_id already exists
          res.status(400).json({ error: 'You have already reviewed and rated this product' });
        } else {
          // No existing document found, create a new document
          RatingModel.create({ product_id, author_id, rating, review })
            .then(result => res.json(result))
            .catch(err => res.json(err));
        }
      })
      .catch(err => res.json(err));
  });
  
  // API for Fetching all Ratings of a Specific Product
  app.get('/api/fetchproductaverage/:id', (req, res) => {
    const product_id  = req.params.id;
  
    // Query the database to retrieve the rating data for the specified product
    RatingModel.find({ product_id: product_id })
      .then(ratings => {
      // Calculate the average rating
      let sum = 0;
      ratings.forEach(rating => {
        sum += rating.rating;
      });
      const avg = sum / ratings.length;
      
      // Send the average rating to the frontend
      res.json({ average: avg, rating_length: ratings.length});
      
      })
      .catch(err => res.status(500).json(err));
  });

  // Profile.jsx
  app.get('/api/getuserandrating', verifyUser, async (req, res) => {
    try {
      // Query the database for the user's ratings
      let ratings = await RatingModel.find({ author_id: req._id }).exec();
  
      // Calculate the count of ratings
      const numberOfRatings = ratings.length;
  
      // Calculate the count of reviews
      const numberOfReviews = ratings.filter(rating => rating.review).length;
  
        // Populate the ratings with product and author data
        ratings = await RatingModel.populate(ratings, [
            { path: 'product_id' },
            { path: 'author_id' },
        ]);
  
      // Include the populated ratings and the counts in the response
      res.json({
        _id: req._id,
        email: req.email,
        username: req.username,
        ratings: ratings,
        numberOfRatings: numberOfRatings,
        numberOfReviews: numberOfReviews,
      });
    } catch (err) {
      // Handle error
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
  app.put('/api/editprofile', upload.single('file'), (req, res) => {
    const id = req.body.id;
    const update = {};
    if (req.body.username) update.username = req.body.username;
    if (req.body.facebook) update.facebook = req.body.facebook;
    if (req.file) update.file = req.file.filename;
  
    UserModel.findByIdAndUpdate(
      { _id: id },
      update
    )
      .then((result) => {
        // Create a new token with the updated username
        const newToken = jwt.sign(
          { _id: result._id, email: result.email, username: req.body.username || result.username },
          'jwt-secret-key'
        );
  
        // Send the new token back to the client
        res.json({ result, newToken });
      })
      .catch((err) => res.json(err));
  });
  
  
// Fetch/Get User Data
app.get('/api/getuserdata', (req, res) => {
    // retrieve user_id from the request query parameters
    const user_id = req.query.user_id;

    // find the user in the database using the user_id
    UserModel.findById({ _id: user_id })
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
});

// search for users and as well as their number of ratings and reviews
app.get('/api/search', async (req, res) => {
    try {
        const users = await UserModel.aggregate([
            { $match: { username: { $regex: req.query.name, $options: 'i' } } },
            {
                $lookup: {
                    from: 'ratings', // replace with your RatingModel collection name
                    localField: '_id',
                    foreignField: 'author_id', // replace with the field in RatingModel that references UserModel
                    as: 'userRatings'
                }
            },
            {
                $addFields: {
                    numRatings: { $size: '$userRatings' }, // we can access this now in frontend
                    numReviews: {// we can access this now in frontend
                        $size: {
                            $filter: {
                                input: '$userRatings',
                                as: 'rating',
                                cond: { $ne: ['$$rating.text', ''] } // replace 'text' with your review text field in RatingModel
                            }
                        }
                    }
                }
            },
            { $project: { userRatings: 0 } } // exclude userRatings from the final result
        ]);

        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// fetch product by id with its ratings
app.get('/api/fetchuserbyid/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Find the user by ID
        const user = await UserModel.findById({_id: id});

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find ratings by author_id
        const ratings = await RatingModel.find({ author_id: id })
            .populate('author_id')
            .populate('product_id');

        // Calculate the number of ratings
        const numRatings = ratings.length;

        // Find reviews by author_id
        const reviews = await RatingModel.find({ author_id: id, review: { $exists: true } });

        // Calculate the number of reviews
        const numReviews = reviews.length;

        res.json({ user, numRatings, numReviews, ratings });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.listen(3001, () => {
    console.log('Server running on port 3001')
    
})