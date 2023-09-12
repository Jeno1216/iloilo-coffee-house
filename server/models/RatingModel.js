const mongoose = require('mongoose')

// Define a custom function to calculate the current time in the Philippines (PHT)
function getCurrentPhTime() {
    const now = new Date();
    const phTime = new Date(now.getTime() + 8 * 60 * 60 * 1000); // Add 8 hours in milliseconds
    return phTime;
}
const RatingSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }, // need ta ni e reference sa _id ddto sang products kay kun indi, mabudlayan ta kuha data about ratings sang isa ka product
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ich_users'
    },
    rating: Number,
    review: String,
    createdAt: {
        type: Date,
        default: getCurrentPhTime // This sets the default value to the current date and time in PH
    }

})

const RatingModel = mongoose.model('rating', RatingSchema)

module.exports = RatingModel;

// 'rating' is the table name