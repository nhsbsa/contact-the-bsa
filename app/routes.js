// External dependencies
const express = require('express');

const router = express.Router();

// Add your routes here - above the module.exports line

// ****************************************
// Route File Versions
// ****************************************

router.use('/v3', require('./views/v3/_routes'));
router.use('/v2', require('./views/v2/_routes'));
router.use('/v1', require('./views/v1/_routes'));

module.exports = router;
