const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const User = require('./models/User');
const Post = require('./models/Post');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = "mongodb://chanex_user:password20267@ac-gaam6wk-shard-00-00.bkl8wy1.mongodb.net:27017,ac-gaam6wk-shard-00-01.bkl8wy1.mongodb.net:27017,ac-gaam6wk-shard-00-02.bkl8wy1.mongodb.net:27017/node-crash?ssl=true&replicaSet=atlas-zun71i-shard-0&authSource=admin&appName=node-crash";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
mongoose.connect(dbURI, clientOptions)
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// routes
app.get('*', checkUser);
app.use('/blogs', blogRoutes);
app.get('/', blogRoutes);
app.get('/trackers', requireAuth, (req, res) => res.render('tracker'));
app.use(authRoutes);
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});