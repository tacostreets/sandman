'use strict'
const http = require("http");
http.METHODS // removes eslint error in bash
// const data = require("./data"); 
// const allAuthors = data.getAll();
const authorsDB = require("./models/authors");

const express = require("express");
const bodyParser = require("body-parser")

const app = express();
const exphbs = require("express-handlebars"); // should be at top of module 
app.engine('handlebars', exphbs({defaultLayout: false}));
app.set("view engine", "handlebars");


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

//connect to mongo db....
app.get('/', (req, res) => {
    authorsDB.find({}).lean()
    .then((allAuthors) =>{
        res.render(
            'layouts/home.handlebars',
            {authors: allAuthors}
        ); 
    })
    .catch(err => next(err));
   });
//connect to mongo db....
// app.get('/', (req, res, next) => {
//     authorsDB.find({}, (err, items) => {
//         if (err) return next(err);
//         console.log(items);
//         res.render('layouts/home.handlebars', {authors: items }); 
//     });
    // });

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
// api version
app.get('/api/detail', (req, res, next) => {
    let authorLastName = req.query.item
    authorsDB.findOne({ "lastName": authorLastName }).lean()
         .then((author) => {
           res.json(author); 
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

       
// query and respond with detail called from index in the data file...handler; with for loop
// app.get('/detail', (req,res) => {
//     let authorLastName = req.query.item
//     let author; 
//     for(let i = 0; i < allAuthors.length; i++) {
//         author = allAuthors[i];
//         if(author.lastName == authorLastName) {
//             break;
//         }
//     }

// // render detail page with author information into html
//     res.render(
//         'layouts/detail.handlebars',
//         {author: author}
//         );
//    });
  

