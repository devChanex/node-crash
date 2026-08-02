
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Post');

const blog_create_post = async (req, res) => {
    const { content, photo, video, attachment } = req.body;

    try {
        const decodedToken = jwt.decode(req.cookies.jwt);
        const user = decodedToken ? await User.findById(decodedToken.id) : null;
        const author = user?.email ? user.email.split('@')[0] : 'Anonymous';

        await Post.create({
            content,
            author,
            photo: photo || '',
            video: video || '',
            attachment: attachment || ''
        });

        res.redirect('/blogs');
    } catch (error) {
        console.log(error);
        res.status(400).send('Unable to create post');
    }
};

const blog_get_all = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.render('blog', { posts });
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
    }
};

const blog_delete_post = async (req, res) => {
    try {
        const decodedToken = jwt.decode(req.cookies.jwt);
        const user = decodedToken ? await User.findById(decodedToken.id) : null;
        const currentAuthor = user?.email ? user.email.split('@')[0] : null;
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).send('Post not found');
        }

        if (post.author !== currentAuthor) {
            return res.status(403).send('You can only delete your own post');
        }

        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/blogs');
    } catch (error) {
        console.log(error);
        res.status(400).send('Unable to delete post');
    }
};

module.exports = {
    blog_create_post,
    blog_get_all,
    blog_delete_post
};