const express = require('express');
const app = express();
const port = 3000;

// Middleware d'analyse du JSON les requêtes
app.use(express.json());

// Données
let produits = [
    {id: 1, nom: "Thé Vert Matcha", prix: 12.99, quantite: 10 },
    {id: 2, nom: "Café Arabica", prix: 8.99, quantite: 20 },
];

// Routes

// GET /produits
// liste des produits
app.get("/produits", (req, res) => {
    res.json(produits);
})

// POST /produits
app.post("/produits", (req, res) => {
    const newProduits = req.body;

   if (!newProduits || !newProduits.id || !newProduits.name) {
        return res.status(400).json({ message: 'Invalid produit data' });
    }

    produits.push(newProduits);
    res.status(201).json(produits);
});


// Démarrage du serveur
app.listen(port, () => {
    console.log(`le serveur est démarré sur http://localhost:${port}`);
})