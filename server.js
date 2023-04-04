const express = require("express")
const app = express()
const pokemon = require("./models/pokemon.js")
const port = 3000
const methodOverride = require('method-override');


app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"));
app.use("/public",express.static("public"));



//Index 
app.get("/pokemon/", (req,res) => {
    res.render("index.ejs",{allpokemon:pokemon})
})

app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs');
  });

app.post("/pokemon", (req, res) => {
    pokemon.push({
      name: req.body.name,
      img: req.body.img,
      types: req.body.type,
      hp: req.body.hp,
      attack: req.body.attack,
      defense: req.body.defense,
    })
    res.redirect("/pokemon")
  })
  
app.get("/pokemon/:indexOfpokemonArray/edit", (req, res) => {
    res.render("edit.ejs", { pokemon: pokemon[req.params.indexOfpokemonArray], indexOfpokemonArray: req.params.indexOfpokemonArray });
  });
  

app.get("/pokemon/:indexOfpokemonArray", (req, res) => {
    res.render("show.ejs",{pokemon: pokemon [req.params.indexOfpokemonArray]})
  })


app.put("/pokemon/:indexOfpokemonArray", (req, res) => {
    pokemon[req.params.indexOfpokemonArray] = {
      name: req.body.name,
      img: req.body.img,
      types: req.body.type,
      hp: req.body.hp,
      attack: req.body.attack,
      defense: req.body.defense,
      id: req.params.indexOfpokemonArray
    };
    res.redirect("/pokemon");
  });
  
  
  
app.delete("/pokemon/:indexOfpokemonArray", (req, res) => {
    pokemon.splice(req.params.indexOfpokemonArray, 1);
    res.redirect("/pokemon");
  });
  
app.listen(port, () => {
    console.log(`catch them all on ${port}`);
})