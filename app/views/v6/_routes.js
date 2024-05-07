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

router.post('/v6/start-page', function (req, res) {

    res.redirect('/v6/which-service');

})

// Which of our services are you contacting us about?

router.post('/v6/which-service', function (req, res) {

    var whichService = req.session.data['which-service'];

    if (whichService) {

        if (whichService == "Check if you have an exemption from paying NHS costs") {
            res.redirect('/v6/nhs-exemptions');
        } else if (whichService == "NHS Help with Health Costs (including prescription prepayment certificates)") {
            res.redirect('/v6/help-with-nhs-costs');
        } else if (whichService == "Student Services") {
            res.redirect('/v6/nhs-student-services');
        } else if (whichService == "NHS Pensions") {
            res.redirect('/v6/nhs-pensions');
        } else {
            res.redirect('/v6/reference-number-question');
        }


    } else {
        res.redirect('/v6/which-service');
    }

})

router.post('/v6/nhs-exemptions', function (req, res) {

    var nhsExpemptions = req.session.data['nhs-exemptions'];

    if (nhsExpemptions == "Dental exemption") {
        res.redirect('/v6/reference-number-question');
    } else if (nhsExpemptions == "Prescription exemption") {
        res.redirect('/v6/reference-number-question');
    } else {
        res.redirect('/v6/nhs-exemptions');
    }
})

router.post('/v6/help-with-nhs-costs', function (req, res) {

    var helpWithNHSCosts = req.session.data['help-with-nhs-costs'];

    if (helpWithNHSCosts == "NHS Low Income Scheme") {
        res.redirect('/v6/reference-number-question');
    } else if (helpWithNHSCosts == "NHS Prescription Prepayment Certificate (PPC)") {
        res.redirect('/v6/reference-number-question');
    } else if (helpWithNHSCosts == "Maternity exemption certificate") {
        res.redirect('/v6/reference-number-question');
    } else if (helpWithNHSCosts == "Medical exemption certificate") {
        res.redirect('/v6/reference-number-question');
    } else if (helpWithNHSCosts == "NHS Tax Credit Exemption Certificate") {
        res.redirect('/v6/reference-number-question');
    } else {
        res.redirect('/v6/help-with-nhs-costs');
    }

})

router.post('/v6/nhs-student-services', function (req, res) {

    var nhsStudentServices = req.session.data['nhs-student-services'];

    if (nhsStudentServices == "NHS Bursary") {
        res.redirect('/v6/reference-number-question');
    } else if (nhsStudentServices == "Social Work Bursary") {
        res.redirect('/v6/reference-number-question');
    } else if (nhsStudentServices == "NHS Learning Support Fund") {
        res.redirect('/v6/reference-number-question');
    } else {
        res.redirect('/v6/nhs-student-services');
    }

})

router.post('/v6/nhs-pensions', function (req, res) {

    var nhsPensions = req.session.data['nhs-pensions'];

    if (nhsPensions == "Employer query") {
        res.redirect('/v6/reference-number-question');
    } else if (nhsPensions == "Member query") {
        res.redirect('/v6/reference-number-question');
    } else if (nhsPensions == "Pensioner query") {
        res.redirect('/v6/reference-number-question');
    } else if (nhsPensions == "Payroll query") {
        res.redirect('/v6/reference-number-question');
    } else {
        res.redirect('/v6/nhs-pensions');
    }

})

// Do you have a reference number?

router.post('/v6/reference-number-question', function (req, res) {

    var referenceNumberQuestion = req.session.data['reference-number-question'];

    if (referenceNumberQuestion == "Yes") {
        res.redirect('/v6/reference-number');
    } else if (referenceNumberQuestion == "No") {
        res.redirect('/v6/name');
    } else {
        res.redirect('/v6/reference-number-question');

    }

})

// What is your reference number?

router.post('/v6/reference-number', function (req, res) {

    res.redirect('/v6/name');

})

// What is your name?

router.post('/v6/name', function (req, res) {

    var firstName = req.session.data['firstName'];
    var lastName = req.session.data['lastName'];

    if (firstName && lastName) {
        res.redirect('/v6/date-of-birth');
    } else {
        res.redirect('/v6/name');

    }

})

// What is your date of birth?

router.post('/v6/date-of-birth', function (req, res) {

    var dateOfBirthDay = req.session.data['date-of-birth-day'];
    var dateOfBirthMonth = req.session.data['date-of-birth-month'];
    var dateOfBirthYear = req.session.data['date-of-birth-year'];

    try {

        if (/^\d+$/.test(dateOfBirthDay) && /^\d+$/.test(dateOfBirthMonth) && /^\d+$/.test(dateOfBirthYear)) {

            req.session.data['date-of-birth'] = DateTime.fromObject({
                day: dateOfBirthDay,
                month: dateOfBirthMonth,
                year: dateOfBirthYear
            }).toFormat("d MMMM yyyy");

            res.redirect('/v6/find-address')
        } else {
            res.redirect('/v6/date-of-birth')
        }

    } catch (err) {

        res.redirect('/v6/date-of-birth')

    }
})

// Find your Address

router.get('/v6/find-address', function (req, res) {

    var postcodeLookup = req.session.data['postcode']

    const regex = RegExp('^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$');

    if (postcodeLookup) {

        if (regex.test(postcodeLookup) === true) {

            axios.get("https://api.os.uk/search/places/v1/postcode?postcode=" + postcodeLookup + "&key=" + process.env.POSTCODEAPIKEY)
                .then(response => {
                    var addresses = response.data.results.map(result => result.DPA.ADDRESS);

                    const titleCaseAddresses = addresses.map(address => {
                        const parts = address.split(', ');
                        const formattedParts = parts.map((part, index) => {
                            if (index === parts.length - 1) {
                                // Preserve postcode (DL14 0DX) in uppercase
                                return part.toUpperCase();
                            }
                            return part
                                .split(' ')
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                .join(' ');
                        });
                        return formattedParts.join(', ');
                    });

                    req.session.data['addresses'] = titleCaseAddresses;

                    res.redirect('/v6/select-address')
                })
                .catch(error => {
                    console.log(error);
                    res.redirect('/v6/no-address-found')
                });

        }

    } else {
        res.redirect('/v6/find-address')
    }

})

router.post('/v6/address', function (req, res) {

    var addressLine1 = req.session.data['address-line-1'];
    var townOrCity = req.session.data['address-town'];
    var postcodeManual = req.session.data['address-postcode'];


    if (addressLine1 && townOrCity && postcodeManual) {
        res.redirect('/v6/upload-document');
    } else {
        res.redirect('/v6/address');
    }

})

router.post('/v6/select-address', function (req, res) {

    var address = req.session.data['address'];

    if (address) {
        res.redirect('/v6/upload-document');
    } else {
        res.redirect('/v6/select-address');
    }

})

router.post('/v6/upload-document', function (req, res) {

    res.redirect('/v6/documents-added');

})

router.post('/v6/remove-document', function (req, res) {

    res.redirect('/v6/upload-document');

})

router.post('/v6/documents-added', function (req, res) {

    res.redirect('/v6/preferred-method-of-contact');

})

router.post('/v6/preferred-method-of-contact', function (req, res) {

    res.redirect('/v6/check-your-answers');

})

router.post('/v6/check-your-answers', function (req, res) {

    res.redirect('/v6/confirmation-successful');

})

// End Routes

module.exports = router;