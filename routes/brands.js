const express = require('express');
const Brand = require("../models/Brand");
const router = express.Router();

// GET /brands Retourner la liste des marques
router.get('/', async (req, res) => {
  // #swagger.summary = 'Get all brands'
  // #swagger.description = 'Get all brands with name and logo'
  const brands = await Brand.find();
  res.json(brands);
});

// POST /brands Créer une nouvelle marque
router.post('/', async (req, res) => {
  try {
    const brand = await Brand.create(req.body);
    res.status(201).json(brand);
  } catch (e) {
    res.status(400).json(e);
  }
});

// GET /brands/1 Récupérer les données d'une marque
router.get('/:id', async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if(brand) {
    res.json(brand);
  } else {
    res.status(404).json({ 'error': 'Can\'t find brand' });
  }
});

// PUT /brands/1 Mettre à jour une marque
router.put('/:id', async (req, res) => {
  const {name, logo} = req.body;
  let brand = await Brand.findById(req.params.id);
  brand.name = name;
  brand.logo = logo;
  try {
    await brand.save();
    res.status(200).json(brand);
  } catch (e) {
    res.status(400).json(e);
  }
});

// PATCH /brands/1 Mettre à jour une marque partiellement
router.patch('/:id', async (req, res) => {
  let brand = await Brand.findById(req.params.id);
  Object.assign(brand, req.body);
  try {
    await brand.save();
    res.status(200).json(brand);
  } catch (e) {
    res.status(400).json(e);
  }
});

// DELETE /brands/1 Supprimer une marque
router.delete('/:id', async (req, res) => {
  let brand = await Brand.findByIdAndDelete(req.params.id);
  if (brand) {
    res.status(204).json({ message: 'Brand successfully deleted!' });
  } else {
    res.status(404).json({ error: 'Brand not found!' });
  }
});

module.exports = router;
