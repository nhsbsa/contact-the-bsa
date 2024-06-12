// External dependencies
const express = require('express');
const router = express.Router();

// Add your routes here - above the module.exports line

// CLEAR DATA
router.post('/clear-data', function (req, res) {
    req.session.destroy()
    res.redirect('/')
})

// log stuff - thanks Craig Abbott!

router.use((req, res, next) => {
    const log = {
        method: req.method,
        url: req.originalUrl, //URL of page
        data: req.session.data //all data held
    }
    console.log(JSON.stringify(log, null, 2)) // show all data as a dump in terminal
    next() // continue to next action
})

// GET FOLDER NAME - useful for relative templates
router.use('/', (req, res, next) => {
    req.folder = req.originalUrl.split('/')[1]; //folder, e.g. 'current'
    req.subfolder = req.originalUrl.split('/')[2]; //sub-folder e.g. 'service'
    res.locals.folder = req.folder; // what folder the url is
    res.locals.subfolder = req.subfolder; // what subfolder the URL is in
    console.log('folder : ' + res.locals.folder + ', subfolder : ' + res.locals.subfolder);
    next();
});

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
