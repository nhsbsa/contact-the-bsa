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

        if (whichService == "Support with Healthcare Costs") {
            res.redirect('/iteration-1/select-your-query-healthcare-costs');
        } else if (whichService == "Support with Medical Exemptions and Penalty Charges") {
            res.redirect('/iteration-1/select-your-query-exemptions-charges');
        } else if (whichService == "Support for Students and Healthcare Professionals") {
            res.redirect('/iteration-1/select-your-query-students-healthcare-professionals');
        } else if (whichService == "Pensions and Employee Benefits") {
            res.redirect('/iteration-1/select-your-query-pensions-employee-benefits');
        } else if (whichService == "NHS Jobs") {
            res.redirect('select-your-query-nhs-jobs');
        } else {
            res.redirect('/iteration-1/reference-number');
        }


    } else {
        res.redirect('which-service');
    }

})

router.post('/select-your-query-nhs-jobs', function (req, res) {

    var nhsJobs = req.session.data['select-your-query-nhs-jobs'];

    if (nhsJobs) {
        if (nhsJobs == "Applicant") {
            res.redirect('nhs-jobs-applicant');
        } else if (nhsJobs == "Employer") {
            res.redirect('nhs-jobs-employer');
        } 
    } else {
        res.redirect('select-your-query-nhs-jobs');
    }

})

// Account access and management

router.post('/account-access-and-management', function (req, res) {

    res.redirect('reference-number');

})

// Job search and alerts
router.post('/job-search-and-alerts', function (req, res) {

    res.redirect('reference-number');

})

// Application and submissions
router.post('/application-and-submissions', function (req, res) {

    res.redirect('job-reference-number');

})


// Post application actions
router.post('/post-application-actions', function (req, res) {

    res.redirect('job-reference-number');

})

// System support and data requests
router.post('/system-support-and-data-requests', function (req, res) {

    res.redirect('reference-number');

})

// Do you have a job reference number?

router.post('/job-reference-number', function (req, res) {

    var jobReferenceQuestion = req.session.data['job-reference-number'];

    if (jobReferenceQuestion == "Yes") {
        res.redirect('enter-job-reference-number');
    } else if (jobReferenceQuestion == "No") {
        res.redirect('application-support-email');
    } else {
        res.redirect('job-reference-number');

    }

})

// Enter job reference number
router.post('/enter-job-reference-number', function (req, res) {

    res.redirect('application-support-email');

})

// Settings and permissions management
router.post('/settings-and-permissions-management', function (req, res) {

    res.redirect('employer-code');

})
// applicant and interview management
router.post('/applicant-interview-management', function (req, res) {

    res.redirect('employer-code');

})
// Post-interview actions
router.post('/post-interview-actions', function (req, res) {

    res.redirect('employer-code');

})

// Do you have an account number?

router.post('/employer-code', function (req, res) {

    var accountNumberQuestion = req.session.data['employer-code'];

    if (accountNumberQuestion == "Yes") {
        res.redirect('enter-employer-code');
    } else if (accountNumberQuestion == "No") {
        res.redirect('reference-number');
    } else {
        res.redirect('employer-code');

    }

})

// Enter your account number
router.post('/enter-employer-code', function (req, res) {

    res.redirect('reference-number');

})

// Job Listing Management
router.post('/job-listing-management', function (req, res) {

    res.redirect('enter-job-listing-reference-number');

})

// Job listing reference number
router.post('/enter-job-listing-reference-number', function (req, res) {

    res.redirect('employer-code');

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