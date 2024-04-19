// External dependencies
const express = require('express');
const router = express.Router();

// Add your routes here - above the module.exports line

// CLEAR DATA
router.post('/clear-data', function (req, res) {
    req.session.destroy()
    res.redirect('/')
})

// ****************************************
// Route File Versions
// ****************************************

router.use('/v6', require('./views/v6/_routes'));

router.use('/v5', require('./views/v5/_routes'));

router.use('/v4', require('./views/v4/_routes'));
router.use('/v4/general', require('./views/v4/_routes'));
router.use('/v4/change', require('./views/v4/_routes'));
router.use('/v4/change/name', require('./views/v4/_routes'));
router.use('/v4/change/address', require('./views/v4/_routes'));
router.use('/v4/change/date-of-birth', require('./views/v4/_routes'));
router.use('/v4/upload', require('./views/v4/_routes'));

router.use('/v3/solicited', require('./views/v3/_routes'));
router.use('/v3/unsolicited', require('./views/v3/_routes'));

router.use('/v2/solicited', require('./views/v2/_routes'));
router.use('/v2/unsolicited', require('./views/v2/_routes'));

router.use('/v1', require('./views/v1/_routes'));

module.exports = router;
