'use strict'
const http = require("http");
http.METHODS // removes eslint error in bash
// const data = require("./data"); 
// const allAuthors = data.getAll();
const authorsDB = require("./models/authors");

const express = require("express");
const bodyParser = require("body-parser")
// authorAPI is equal to the require routes in api.js
const authorAPI = require('./routes/api.js');


const app = express();
const exphbs = require("express-handlebars"); // should be at top of module 
app.engine('handlebars', exphbs({defaultLayout: false}));
app.set("view engine", "handlebars");


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions
app.use('/api', require('cors')()); // set Access-Control-Allow-Origin header for api route


//connect to mongo db....
app.get('/', (req, res) => {
    authorsDB.find({}).lean()
    .then((allAuthors) =>{
        res.render(
            'layouts/home_react.handlebars',
            {authors: JSON.stringify(allAuthors)}
        ); 
    })
    .catch(err => next(err));
   });

// api using routes folder and all subroutes listed in api.js (attaches onto the end of /api )
app.use('/api', authorAPI);


app.get('/detail', (req, res, next) => {
    let authorLastName = req.query.item
    authorsDB.findOne({ "lastName": authorLastName }).lean()
         .then((author) => {
           res.render(
            'layouts/detail.handlebars',
            {author: author});  
})
.catch(err => next(err));
});

// delete method here
app.get('/delete', (req, res) => {
    let deleteItem = req.query.item;
    authorsDB.deleteOne({ "lastName": deleteItem }).lean()
         .then(() => {
           res.render(
            'layouts/delete.handlebars',
           {author: deleteItem});           
})
.catch(err => next(err));
});



// send plain text response about
app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('My name is Annette Ringe and I am in the Web Dev Cert program.');
   }); 


   //  404 handler
app.use( (req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
   });


   app.listen(app.get('port'), () => {
    
   });
