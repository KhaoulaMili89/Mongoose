const mongoose= require('mongoose')
const Schema=mongoose.Schema
const PersonSchema= new Schema({
    firstName:String,
    lastName:String,
    age: Number,
    favoriteFoods: [String],
})
module.exports=mongoose.model('person', PersonSchema)