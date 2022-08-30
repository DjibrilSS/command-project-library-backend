const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
    nameGenre: String,
    descriptionGenre: String,
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre