'use strict'
const http = require("http");
const data = require("./data"); 
const allAuthors = data.getAll();

const express = require("express");
const bodyParser = require("body-parser")

const app = express();
const exphbs = require("express-handlebars"); // should be at top of module 
app.engine('handlebars', exphbs({defaultLayout: false}));
app.set("view engine", "handlebars");


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

// send dynamic home file
app.get('/', (req, res) => {
    res.render(
        'layouts/home.handlebars',
        {authors: allAuthors}
        ); 
   });

// query and respond with detail called from index in the data file...handler; with for loop
app.get('/detail', (req,res) => {
    let authorLastName = req.query.item
    let author; 
    for(let i = 0; i < allAuthors.length; i++) {
        author = allAuthors[i];
        if(author.lastName == authorLastName) {
            break;
        }
    }
//connect to mongo db....
// app.get('/', (req, res, next) => {
//     Book.find({}, (err, items) => {
//         if (err) return next(err);
//         console.log(items);
//         res.render('home', {books: items }); 
//     });
//     });
      
// render detail page with author information into html
    res.render(
        'layouts/detail.handlebars',
        {author: author}
        );
   });


// send plain text response
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

   

