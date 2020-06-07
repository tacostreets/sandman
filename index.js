'use strict'
const http = require("http");
http.METHODS // removes eslint error in bash
// const data = require("./data"); 
// const allAuthors = data.getAll();
const authorsDB = require("./models/authors");

const express = require("express");
const bodyParser = require("body-parser")
// const authorAPI = require('./routes/api.js');


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
            'layouts/home.handlebars',
            {authors: allAuthors}
        ); 
    })
    .catch(err => next(err));
   });

// api version of get all using routes folder
// app.use('/api', authorAPI);


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


app.get('/api/detail', (req, res) => {
    let authorLastName = req.query.item
    authorsDB.findOne({ "lastName": authorLastName }).lean()
         .then((author) => {
           res.json();
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
//api delete version
app.get('/api/delete', (req, res) => {
    let deleteItem = req.query.item;
    authorsDB.deleteOne({ "lastName": deleteItem }).lean()
        .then(() => {
           res.json();
        } else {
            return res.status(500).send('Error occurred: databes error.');
        })
.catch(err => next(err));
});

//api add version
// e.g.  http://localhost:3000/api/add?lastName=Simmons&firstName=Dan&favOne=Hyperion&favTwo=TheFallOfHyperion
app.get('/api/add', (req, res) => {
    let firstName = req.query.firstName;
    let lastName = req.query.lastName;
    let favOne = req.query.favOne;
    let favTwo = req.query.favTwo;
    let result = authorsDB.insertMany(
        [{ firstName : firstName, 
          lastName : lastName, 
          favOne : favOne, 
          favTwo : favTwo }]
        )
    res.type("text/plain");
    res.send(result);
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
  

