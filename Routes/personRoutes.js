const express = require("express");
const router = express.Router();
const Person = require("../Models/personSchema");
//add user @Post
router.post("/newPerson", (req, res) => {
  let newPerson = new Person(req.body);
  newPerson.save((err, data) => {
    err ? console.log(err) : res.send(data);
  });
});
//get user @get
router.get("/", (req, res) => {
  Person.find({}, (err, data) => {
    err ? console.log(err) : res.json(data);
  });
});
//get user by id @get
router.get("/:id", (req, res) => {
  Person.find({ _id: req.params.id }, (err, data) => {
    err ? console.log(err) : res.json(data);
  });
});
//delete user by id @delete
router.delete("/:id", (req, res) => {
  Person.findByIdAndDelete({ _id: req.params.id }, (err, msg) => {
    err ? console.log(err) : res.json({ msg: "Person was deleted" });
  });
});
//update user by id @put
router.put("/:id", (req, res) => {
  Person.findByIdAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    (err, data) => {
      err ? console.log(err) : res.json({ msg: "Person was updated" });
    }
  );
});
/** Create many People with Model.create() */
var arrayOfPeople = [
  { firstName: "Asma", lastName: "Tounsi", age: 2
  0, favoriteFoods: ["pizza"] },
  {
    firstName: "Toto",
    lastName: "emy",
    age: 76,
    favoriteFoods: ["roast chicken", "burritos"],
  },
  {
    firstName: "Soso",
    lastName: "rayhan",
    age: 78,
    favoriteFoods: ["hamburger"],
  },
  {
    firstName: "Khadija",
    lastName: "meryam",
    age: 55,
    favoriteFoods: ["spaghetti", "burritos"],
  },
];
router.post("/many", (req, res) => {
  Person.create(arrayOfPeople, (err, data) => {
    err ? console.log(err) : res.json(data);
  });
});
/** FindOne by favoritefoods People */
router.get("/Foods/:favoriteFoods", (req, res) => {
  Person.findOne({ favoriteFoods: req.params.favoriteFoods }, (err, data) => {
    err ? console.log(err) : res.json(data);
  });
});
/* Update person adding hamburger */
router.get("/hamburger/:id", (req, res) => {
  Person.findById({ _id: req.params.id }, (err, data) => {
    data.favoriteFoods.push("hamburger");
    data.save(err ? console.log(err) : res.json({ data }));
  });
});
//update age's person to 20 by name
router.put("/name/:firstName", (req, res) => {
  Person.findOneAndUpdate(
    { firstName: req.params.firstName },
    { age: 20 },
    (err, data) => {
      err ? console.log(err) : res.json({ data });
    }
  );
});

//delete Marry
router.delete("/Mary/:name", (req, res) => {
  Person.remove({ firstName: "Mary" }, (err, data) => {
    err ? console.log(err) : res.json({ data });
  });
});

// Find 2 people like borritos
router.get("/burritos/:favoriteFoods", (req, res) => {
  Person.find({ favoriteFoods: "burritos" })
    .sort({ name: "desc" })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      err ? console.log(err) : res.json(data);
    });
});

module.exports = router;