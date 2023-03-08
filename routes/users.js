var express = require('express');
var router = express.Router();

const fs = require("fs");

router.use(express.json())

/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile("recipe.json", function(err, data) { // för att öppna recipe.json
    if (err) {
      console.log(err);
    }
    const recipes = JSON.parse(data)
    res.send(recipes) // skicka recipe tillbaka i anropet
    return;
  });
});


router.post('/add', function(req, res, next) {
  console.log(req.body);

  fs.readFile("recipe.json", function(err, data) {
    if (err) {
      console.log(err);

      if (err.code == "EN0ENT") {
        console.log("filen finns inte!");

        let recipes = [
          {        
          "recipeName": "Pasta med ketchup",
          "description": "En snabb och härlig lunch!",
          "ingredients": ["Pasta", "Ketchup"],
          "prepTime": 30
      }]

      fs.writeFile("recipe.json", JSON.stringify(recipes, null, 2), function(err, data) {
        if (err) {
          console.log(err)
        }
      });
      res.send("Fil skapad och ny recept sparad")
      return;
    
    }
    res.send("404 - Nått gick fel!");
  }

  const recipes = JSON.parse(data);

  let newRecipe = {"recipeName": req.body.recipeName, "description": req.body.description, "ingredients": req.body.ingredients, "prepTime": req.body.prepTime}
  recipes.push(newRecipe);

  fs.writeFile("recipe.json", JSON.stringify(recipes, null, 2), function (err,data) {
    if (err) {
      console.log(err);
    }
  });

  res.send("ok");

  });  
});

module.exports = router;
