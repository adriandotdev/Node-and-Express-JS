const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const test = require('dotenv').config();

const app = express();

mongoose.set('strictQuery', false);

// Connect to the database
mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('connected to db');
        app.listen(process.env.PORT || 3001, () => console.log("Express server listening to port 3001"));
    })
    .catch(err => console.log(err));
// register view engine

// USE THIS IF THE DEFAULT NAME OF FOLDER OF ALL TEMPLATES ARE 'views'
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// WHILE USE THIS IF YOU WANT SPECIFIED NAME OF FOLDER
// app.set('views', 'myviews');

app.get('/', (req, res) => {

    res.redirect('/blogs');
});

app.get('/about', (req, res) => {

    res.render('about', { title: 'About'});
});

app.get('/create', (req, res) => {
    res.render('create-blog', {title: 'Create'})
});

app.use('/blogs', blogRoutes);

// RENDER 404 PAGE
app.use((req, res) => {

    res.status(404).render('404', {title: 'Site Not Found'});
});

