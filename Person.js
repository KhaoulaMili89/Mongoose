const Schema = mongoose.Schema;
const personSchema = new Schema({
 firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model("Person", personSchema);