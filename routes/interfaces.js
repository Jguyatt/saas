const express = require('express');
const Interface = require('../models/Interface');
const router = express.Router();

// Get all interfaces
router.get('/', async (req, res) => {
  try {
    const interfaces = await Interface.find();
    res.json(interfaces);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch interfaces' });
  }
});

// Get interface by ID
router.get('/:id', async (req, res) => {
  try {
    const iface = await Interface.findById(req.params.id);
    if (!iface) return res.status(404).json({ error: 'Interface not found' });
    res.json(iface);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch interface' });
  }
});

// Create new interface
router.post('/', async (req, res) => {
  try {
    const iface = new Interface(req.body);
    await iface.save();
    res.status(201).json(iface);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update interface
router.put('/:id', async (req, res) => {
  try {
    const iface = await Interface.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!iface) return res.status(404).json({ error: 'Interface not found' });
    res.json(iface);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete interface
router.delete('/:id', async (req, res) => {
  try {
    const iface = await Interface.findByIdAndDelete(req.params.id);
    if (!iface) return res.status(404).json({ error: 'Interface not found' });
    res.json({ message: 'Interface deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete interface' });
  }
});

module.exports = router; 