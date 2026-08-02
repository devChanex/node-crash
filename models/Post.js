const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Post content is required'],
        trim: true,
        maxlength: [500, 'Post content must be 500 characters or less']
    },
    author: {
        type: String,
        default: 'Anonymous'
    },
    photo: {
        type: String,
        default: ''
    },
    video: {
        type: String,
        default: ''
    },
    attachment: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

const Post = mongoose.model('post', postSchema);

module.exports = Post;
