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

router.post('/accessing-an-account', function (req, res) {

    var employerApplicant = req.session.data['select-your-query-nhs-jobs'];

    if (employerApplicant) {
        if (employerApplicant == "Applicant") {
            res.redirect('reference-number');
        } else if (employerApplicant == "Employer") {
            res.redirect('enter-organisation-name');
        } 
    } else {
        res.redirect('accessing-an-account');
    }

})

// Searching for a job
router.post('/searching-for-a-job', function (req, res) {

    res.redirect('reference-number');

})

// Completing an application
router.post('/completing-an-application', function (req, res) {

    res.redirect('application-reference');

})


// Managing a job offer
router.post('/managing-a-job-offer', function (req, res) {

    res.redirect('application-reference');

})

// Problem on the website
router.post('/nhs-jobs-website-support', function (req, res) {

    var employerApplicant = req.session.data['select-your-query-nhs-jobs'];

    if (employerApplicant) {
        if (employerApplicant == "Applicant") {
            res.redirect('reference-number');
        } else if (employerApplicant == "Employer") {
            res.redirect('enter-organisation-name');
        } 
    } else {
        res.redirect('nhs-jobs-website-support');
    }

})

// Do you have an application reference number?
router.post('/application-reference', function (req, res) {

    var applicationReferenceQuestion = req.session.data['application-reference'];

    if (applicationReferenceQuestion == "Yes") {
        res.redirect('enter-application-reference');
    } else if (applicationReferenceQuestion == "No") {
        res.redirect('job-reference-number');
    } else {
        res.redirect('application-reference');

    }

})

// Enter application reference number
router.post('/enter-application-reference', function (req, res) {

    var applicationRef = req.session.data['enter-application-reference'];

    if (applicationRef) {
        res.redirect('job-reference-number');
    } else {
        res.redirect('enter-application-reference');
    }

})

router.post('/job-reference-number', function (req, res) {

    var jobReferenceQuestion = req.session.data['job-reference-number'];

    if (jobReferenceQuestion == "Yes") {
        res.redirect('enter-job-reference-number');
    } else if (jobReferenceQuestion == "No") {
        res.redirect('reference-number');
    } else {
        res.redirect('job-reference-number');

    }

})

// Enter job reference number
router.post('/enter-job-reference-number', function (req, res) {

    var jobRef = req.session.data['enter-job-reference-number'];

    if (jobRef) {
        res.redirect('reference-number');
    } else {
        res.redirect('enter-job-reference-number');
    }

})

// Stakeholder Engagement Team
router.post('/stakeholder-engagement-team', function (req, res) {

    res.redirect('enter-organisation-name');

})
// applicant and interview management
router.post('/applicant-interview-management', function (req, res) {

    res.redirect('applicant-reference');

})

// Managing Job Offers, pre-employment checks and contracts
router.post('/job-offers-pre-employment-checks-contracts', function (req, res) {

    res.redirect('applicant-reference');

})

// Do you have an applicant reference number?
router.post('/applicant-reference', function (req, res) {

    var applicantReference = req.session.data['applicant-reference'];

    if (applicantReference == "Yes") {
        res.redirect('enter-applicant-reference');
    } else if (applicantReference == "No") {
        res.redirect('job-listing-reference');
    } else {
        res.redirect('job-listing-reference');

    }

})

// Applicant reference number
router.post('/enter-applicant-reference', function (req, res) {

    var applicantRef = req.session.data['enter-applicant-reference'];

    if (applicantRef) {
        res.redirect('job-listing-reference');
    } else {
        res.redirect('enter-applicant-reference');
    }

})

// Do you have a job listing reference number?
router.post('/job-listing-reference', function (req, res) {

    var listingReference = req.session.data['job-listing-reference'];

    if (listingReference == "Yes") {
        res.redirect('enter-job-listing-reference-number');
    } else if (listingReference == "No") {
        res.redirect('enter-organisation-name');
    } else {
        res.redirect('enter-organisation-name');

    }

})

// Job listing reference number
router.post('/enter-job-listing-reference-number', function (req, res) {

    var jobListingRef = req.session.data['enter-job-listing-reference-number'];

    if (jobListingRef) {
        res.redirect('enter-organisation-name');
    } else {
        res.redirect('enter-job-listing-reference-number');
    }

})

// Enter your organisation name
router.post('/enter-organisation-name', function (req, res) {

    var organisationName = req.session.data['enter-organisation-name'];

    if (organisationName) {
        res.redirect('reference-number');
    } else {
        res.redirect('enter-organisation-name');
    }

})

// Have you contacted us before?

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

    var referenceNumber = req.session.data['enter-reference-number'].trim();

    const dynamicsRegex = /^NHS-\d{7}-[A-Za-z]{3}$/;

    if (dynamicsRegex.test(referenceNumber)) {
            res.redirect('enter-your-name');
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