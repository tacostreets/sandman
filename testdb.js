const Book = require("./models/authors");

// return all records
Book.find({}, (err, items) => {
  if (err) return next(err);
  console.log(items.length);
  // other code here
});