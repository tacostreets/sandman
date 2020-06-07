const express = require('express')
const router = express.Router()
const authorsDB = require("../models/authors");

//query DB for specific author or all authors 
// http://localhost:3000/api
// e.g.  http://localhost:3000/api/?lastName=Simmons
function get_author(req, res) {
    res.type('text/plain')
    if(req.query.lastName) {
        let author = authorsDB.findOne(
            { "lastName": req.query.lastName}).lean()
        author.then((data) => {
            res.json(data);
            })
    } else {
        let authors = authorsDB.find({}).lean()
        authors.then((data) => {
            res.json(data);
        })
        
    }

    if(req.query.lastName) {
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
    } else {
        let 
    }
}




router.get('/', get_author)
router.post('/', get_author)

module.exports = router 