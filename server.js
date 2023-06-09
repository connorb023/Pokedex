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
    res.render("index.ejs",{pokemon:pokemon})
})

// New
app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs');
  });

//Delete 
app.delete("/pokemon/:id",(req, res) => {
    pokemon.splice(req.params.id,1)
    res.redirect("/pokemon") 
});


// (req, res) => {
//   pokemon.splice(req.params.id,) /
//   res.redirect("/pokemon") 
// })

//Update
app.put("/pokemon/:id/", (req, res) => {
  pokemon[req.params.id] = req.body 
  res.redirect("/pokemon") 
})

//Create
app.post("/pokemon", (req, res) => {
    pokemon.push(req.body)
    res.redirect("/pokemon")
  })
  
 //Edit 
 app.get("/pokemon/:id/edit", (req,res) => {
  res.render("edit.ejs", {
  
pokemon: pokemon[req.params.id], 
index: req.params.id, 
}
)})

//Show

app.get("/pokemon/:id", (req,res) => {
  res.render("show.ejs", { pokemon:pokemon[req.params.id]})
});

  

app.listen(port, () => {
    console.log(`catch them all on ${port}`);
})