const express = require('express')
const router = express.Router()
const authorsDB = require("../models/authors");

//query DB for specific author 

// e.g.  http://localhost:3000/api/author?lastName=LeGuin
function get_author(req, res) {
    res.type('text/plain')
    if(req.query.lastName) {
        let author = authorsDB.findOne({ "lastName": req.query.lastName}).lean()
        author.then((data) => {
            res.json(data);
            })
    } else {
        return res.status(500).send('Error occurred: No author specified.');
    }
}
//query for all authors
// http://localhost:3000/api/authors
function get_authors(req, res) {
    res.type('text/plain')
    let authors = authorsDB.find({}).lean()
    authors.then((data) => {
        res.json(data);
    })
        
}


//api add author
// e.g.  http://localhost:3000/api/add?lastName=Simmons&firstName=Dan&favOne=Hyperion&favTwo=TheFallOfHyperion
function add_author(req,res)  {
    res.type('text/plain')  
    if(req.query.lastName && req.query.firstName && req.query.favOne && req.query.favTwo) {
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
            res.send(result);
    } else { //if any parameter not provided send error mssg
        return res.status(500).send('Error occurred: missing item.');
    }
}
// api delete author
// http://localhost:3000/api/delete?lastName=Simmons

function delete_author(req, res) {
    res.type('text/plain')
    if(req.query.lastName) {  //find out if lastName is provided
        let authors = authorsDB.deleteMany({ lastName: req.query.lastName }).lean()  //if lastName in database delete entry
        authors.then((data) => {
            res.json(data);
            })
    } else {  //if lastName is not provided give error message
        return res.status(500).send('Error occurred: No author specified.');
    }
}

// get author route
router.get('/author/', get_author)
//get all authors route
router.get('/authors/', get_authors)
// add author route
router.get('/add/', add_author)
router.post('/add/', add_author)
// delete author route
router.get('/delete/', delete_author)
// setting exports equal to router
module.exports = router 