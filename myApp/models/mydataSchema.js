const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const articleSchema = new Schema({
    userName : String
})

// Create a model based on that schema
const myData = mongoose.model("myDataa" , articleSchema)

// export the model pour les utiliser dans app.js 
module.exports = myData