// ********************************
// CCS (VERSION 5)
// ********************************

// External dependencies
const express = require('express');
const { DateTime } = require("luxon");
const router = express.Router();

// API
const axios = require('axios');

// Routes

// Start Page

router.post('/start', function (req, res) {

    req.session.destroy()
 
    res.redirect('which-service');

})

// Which of our services are you contacting us about? (radios)

router.post('/which-service', function (req, res) {

    var whichService = req.session.data['which-service'];

    if (whichService) {

        if (whichService == "NHS Jobs") {
            res.redirect('select-your-query-nhs-jobs');
        } else if (whichService == "My NHS Pension portal") {
            res.redirect('/mvp/nhs-pension-number');
        } else if (whichService == "NHS Pension Scheme") {
            res.redirect('/mvp/nhs-pension-number');
        } else if (whichService == "Total Reward Statement") {
            res.redirect('/mvp/nhs-pension-number');
        } else {
            res.redirect('/mvp/reference-number');
        }


    } else {
        res.redirect('which-service');
    }

})


router.post('/nhs-jobs-problem-logging-in', function (req, res) {

    res.redirect('reference-number');

})
router.post('/help-with-the-nhs-jobs-website', function (req, res) {

    res.redirect('reference-number');

})

// Do you have a reference number?

router.post('/reference-number', function (req, res) {

    var referenceNumberQuestion = req.session.data['reference-number'];

    if (referenceNumberQuestion == "Yes") {
        res.redirect('enter-reference-number');
    } else if (referenceNumberQuestion == "No") {
        res.redirect('enter-your-name');
    } else {
        res.redirect('reference-number');

    }

})

// What is your reference number?

router.post('/enter-reference-number', function (req, res) {

    var whichService = req.session.data['which-service'];

    var referenceNumber = req.session.data['enter-reference-number'].trim();

    const dynamicsRegex = /^NHS-\d{7}-[A-Za-z]{3}$/;

    if (referenceNumber) {

        if (whichService == "My NHS Pension portal" || 
        whichService == "NHS Pension Scheme" || 
        whichService == "Total Reward Statement") {

            if (dynamicsRegex.test(referenceNumber)) {
                res.redirect('enter-your-name');
            } else {
                res.redirect('enter-reference-number');
            }

        } else if (whichService) {
            res.redirect('enter-your-name');
        }

    } else {
        res.redirect('enter-reference-number');
    }

})

// What is your name?

router.post('/enter-your-name', function (req, res) {

    var firstName = req.session.data['firstName'];
    var lastName = req.session.data['lastName'];
    var whichService = req.session.data['which-service'];
    var pensionNumber = req.session.data['pension-number'];

    if (firstName && lastName) {
        if (whichService == "NHS Jobs") {
            res.redirect('enter-your-email');
        } else if (
            (whichService == "My NHS Pension portal" || whichService == "NHS Pension Scheme" || whichService == "Total Reward Statement") &&
            (pensionNumber == "No, I do not know my NHS Pension number" || pensionNumber == "I'm not sure")
        ) {
            res.redirect('enter-your-national-insurance-number');
        } else {
            res.redirect('enter-date-of-birth');
        }
    } else {
        res.redirect('enter-your-name');
    }

});


// What is your email?

router.post('/enter-your-email', function (req, res) {

    var emailAddress = req.session.data['emailAddress'];

    if (emailAddress) {
        res.redirect('enter-your-phone-number');
    } else {
        res.redirect('enter-your-email');

    }

})

// What is your phone number?

router.post('/enter-your-phone-number', function (req, res) {

    var nhsJobs = req.session.data['which-service'];

    if (nhsJobs == "NHS Jobs") {
        res.redirect('enter-additional-information');
    } else {
        res.redirect('document');
    }

})

// Enter additional information

router.post('/enter-additional-information', function (req, res) {

    var additionalInfo = req.session.data['additionalInfo'];

    if (additionalInfo) {

        if (additionalInfo.length > 4000) {
            res.redirect('enter-additional-information');
        } else {
            res.redirect('check-your-answers');
        }

    } else {
        res.redirect('enter-additional-information');
    }

})

// Check your answers

router.post('/check-your-answers', function (req, res) {

    res.redirect('your-query-has-been-received');

})

// End Routes

module.exports = router;