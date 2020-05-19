const mongoose = require("mongoose");

// remote db connection settings. For security, connectionString should be in a separate file not committed to git
const connectionString = "mongodb+srv://dbuser:tacotaco@cluster0-e5ikk.mongodb.net/test?retryWrites=true&w=majority"


mongoose.connect(connectionString, { dbName: "sccprojects", useNewUrlParser: true }); 

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define Book model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = mongoose.Schema({
 lastName: { type: String, required: true },
 firstName: String,
 favOne: String,
 favTwo: String
}); 

module.exports = mongoose.model('Book', mySchema);
