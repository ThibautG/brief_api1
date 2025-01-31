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

// POST /produits => permet d'ajouter un élément dans un objet
app.post("/produits", (req, res) => {
    const newProduits = req.body;

   if (!newProduits || !newProduits.id || !newProduits.nom) {
        return res.status(400).json({ message: 'Invalid produit data' });
    }

    produits.push(newProduits);
    res.status(201).json(produits);
});

// PUT /produits/:id => permet de mettre à jour un objet
app.put('/produits/:id', (req, res) => {
    const id = parseInt(req.params.id);
    //remplacé req.params.id par req.body.id car je ne comprenait pas comment utiliser params
    let produit = produits.find(p => p.id === id);

    if (!produit) {
        return res.status(404).json({ message: 'Produit not found' });
    }

    const { nom, prix, quantite } = req.body;

    if (!nom || !prix || !quantite) {
        return res.status(400).json({ message: 'Invalid produit data' });
    }

    produit.nom = nom;
    produit.prix = prix;
    produit.quantite = quantite;

    res.status(200).json(produit);
});

// DELETE /produits:id => supprimer un produit avec son id
app.delete('/produits/:id', (req, res) => {
    const id = parseInt(req.params.id);// j'ai viré le paramètre radix et tout fonctionne => merci Sacha !
    const produitIndex = produits.findIndex(p => p.id === id);

    if (produitIndex === -1) {
        return res.status(404).json({ message: 'Produit not found' });
    }

    produits.splice(produitIndex, 1);
    res.status(200).json({ message: 'Produit deleted successfully' });
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`le serveur est démarré sur http://localhost:${port}`);
})