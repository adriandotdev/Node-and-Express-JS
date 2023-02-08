const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();

// Connection URI
const dbURI = 'mongodb+srv://Lauriano_112300:lauriano_112300-expressjs@cluster0.2j2v3.mongodb.net/express-practice?retryWrites=true&w=majority';

// Connect to the database
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('connected to db');
        app.listen(3001, () => console.log("Express server listening to port 3001"));
    })
    .catch(err => console.log(err));
// register view engine

// USE THIS IF THE DEFAULT NAME OF FOLDER OF ALL TEMPLATES ARE 'views'
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
// WHILE USE THIS IF YOU WANT SPECIFIED NAME OF FOLDER
// app.set('views', 'myviews');

app.get('/', (req, res) => {

    res.redirect('/blogs');
});

app.get('/blogs', (req, res) => {

    Blog.find().sort({ createdAt: -1 }).then(result => {

        res.render('index', { title: 'Blogs', blogs: result}); // provide only the file withouth the extension.
    }).catch(err => console.log(err));
});

app.post('/blogs', (req, res) => {

    const blog = new Blog(req.body);

    blog.save()
        .then(result => { 
            
            console.log("Saved");
            res.redirect('/blogs');
        })
        .catch(err => console.log("Error while saving occur"));
});

app.get('/about', (req, res) => {

    res.render('about', { title: 'About'});
});

app.get('/create', (req, res) => {
    res.render('create-blog', {title: 'Create'})
});

app.use((req, res) => {

    res.status(404).render('404', {title: 'Site Not Found'});
});

