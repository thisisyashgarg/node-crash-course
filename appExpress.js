const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogs');

const { result } = require('lodash');


//express app
const app = express();

//

//connect to mongoDB
const mongoURI = 'mongodb+srv://yashgarg:admin123@node.5e1qq6c.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI)
.then((result) => app.listen(3000))
.catch((error) => console.log('error'));

//registering view engine
app.set('view engine', 'ejs');

//invoke morgan and static files
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true})); //for middleware post req


//sending data through mongoose

//invoke static files by express
app.use(express.static('public'));


//blog routes
app.use(blogRoutes);

//middleware
app.use((req, res, next) =>{
    console.log('new request made:');
    console.log('host:', req.hostname);
    console.log('path:', req.path);
    console.log('method:', req.method);
    next();
});

app.use((req, res, next) =>{
    console.log('NEXT MIDDLEWARE');
    next();
});


//rendering views by ejs
app.get('/',(req, res) => {
    res.redirect('/blogs');
});

app.get('/about',(req, res) => {
    res.render('about', { title : 'About'});
});

app.get('/add-blog', (req,res) => {
    const blog = new Blog({
        title: 'New Blog 2',
        snippet: 'About my new blog',
        body: 'more about my new blog'
    });

    blog.save()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
        console.log(error);
    });

});

app.get('/all-blogs', (req,res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((error) => {
        console.log(error);
    });
});

app.get('/single-blog', (req,res) => {
    Blog.findById('63465f9c7d2cd1c3bd938832')
    .then((result) => {
        res.send(result);
    })
    .catch((error) => {
        console.log(error);
    });
});





app.use((req, res) => {
    res.status(404).render('404', { title : '404'});
});













//sending requests

// app.get('/',(req, res) => {
//     // res.send('<p>Welcome<p>');
//     res.sendFile('./views/index.html', {root : __dirname});
// });

// app.get('/about',(req, res) => {
//     // res.send('<p>About<p>');
//     res.sendFile('./views/about.html', {root : __dirname});
// });




//redirects

app.get('/about-you',(req, res) => {
    res.redirect('/about');
});




//404 error, runs at the last if none of the above run
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', {root : __dirname})
});


