const express = require('express');
const app = express();
const PORT = 3000
const methodOverride = require('method-override');
const Pokemon = require('./models/pokemon.js');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false}))
app.use(methodOverride("_method"));

// Serve static assets from the public directory
app.use("/public",express.static("public"))


// INDEX
app.get('/pokemon', (req, res) => {
  res.render('index.ejs', { allpokemon: Pokemon });
});

    
// NEW
app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs');
  });

  // CREATE
  app.post('/pokemon', (req, res) => {
    Pokemon.push(req.body)
    res.redirect("/pokemon")
  });
  
  // EDIT
  app.get('/pokemon/:id/edit', (req, res) => {
    res.render('edit.ejs', { data: pokemon[req.params.id] , });
  });
  
  
 // UPDATE - Update an existing Pokémon
app.put('/pokemon/:id', (req, res) => {
  Pokemon[req.params.id] = req.body;
  res.redirect('/pokemon');
});

  
// DELETE - Delete an existing Pokémon
app.delete('/pokemon/:id', (req, res) => {
  Pokemon.splice(req.params.id, 1);
  res.redirect('/pokemon');
});
    
    // SHOW
    app.get('/pokemon/:id', (req, res) => {
      const id = req.params.id;
      const pokemon = Pokemon[id];
      res.render('show', { data: pokemon [req.params.id]});
  });
  

    // Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
