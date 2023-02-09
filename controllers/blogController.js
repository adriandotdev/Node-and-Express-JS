const Blog = require('../models/blog');

const get_blogs = (req, res) => {

    Blog.find().sort({ createdAt: -1 }).then(result => {

        res.render('index', { title: 'Blogs', blogs: result}); // provide only the file withouth the extension.

    }).catch(err => console.log(err));
}

const post_blog = (req, res) => {

    const blog = new Blog(req.body);

    blog.save()
        .then(result => { 
            
            console.log("Saved");
            res.redirect('/blogs');
        })
        .catch(err => console.log("Error while saving occur"));
}

const get_blog = (req, res) => {

    Blog.findById(req.params.id)
    .then(result => {

        res.render('blog', { title: 'Blog', blog: result });
    })
    .catch(err => {

        res.redirect('/404');
    })
}

const delete_blog = (req, res) => {

    Blog.findByIdAndDelete(req.params.id)
    .then(result => {

        res.redirect('/blogs');
    })
    .catch(err => {

        res.redirect('/404');
    })
}

const get_blog_to_update = (req, res) => {

    Blog.findById(req.params.id)
    .then(result => {

        res.render('update-blog.ejs', {title: 'Update Blog', blog: result});
    })
    .catch(err => {
        res.redirect('/404');
    })
}

const update_blog = (req, res) => {

    const blogToUpdate = req.body;

    Blog.findByIdAndUpdate(req.params.id, { title: blogToUpdate.title, snippet: blogToUpdate.snippet, content: blogToUpdate.content })
        .then((result) => {

            res.json({redirect: '/blogs'})
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = {
    get_blogs,
    post_blog,
    get_blog,
    delete_blog,
    get_blog_to_update,
    update_blog
}