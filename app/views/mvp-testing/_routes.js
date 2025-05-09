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
 
    res.redirect('which-service-search');

})

// Which of our services are you contacting us about? (radios)

router.post('/which-service', function (req, res) {

    var whichService = req.session.data['which-service'];

    if (whichService) {

        if (whichService == "NHS Help with Health Costs") {
            res.redirect('select-your-query-help-with-health-costs');
        } else if (whichService == "Student Services") {
            res.redirect('select-your-query-student-services');
        } else if (whichService == "NHS Pensions") {
            res.redirect('select-your-query-nhs-pension');
        } else if (whichService == "NHS Healthcare Professionals") {
            res.redirect('select-your-query-healthcare-professionals');
        } else if (whichService == "None of the above") {
            res.redirect('unable-to-help-online');
        } else {
            res.redirect('reference-number');
        }


    } else {
        res.redirect('which-service');
    }

})

// Which of our services are you contacting us about? (autocomplete)

router.post('/which-service-search', function (req, res) {
    const validServices = [
        "Apply for a job in the NHS (NHS Jobs)",
        "Check if you have a dental exemption from paying NHS costs",
        "Check if you have a prescription exemption from paying NHS costs",
        "Get help to buy food and milk (Healthy Start)",
        "Help with health costs for people on a low income",
        "Save money on NHS prescriptions by prepaying for them",
        "Help with health costs for people who are pregnant or have given birth in the last 12 months",
        "Help with health costs for people who have certain medical conditions",
        "Help with health costs for some people getting Child Tax Credit or Working Tax Credit",
        "Funding for nursing, midwifery and Allied Health Professional students",
        "Funding for students studying to become a doctor or dentist",
        "Funding for social work students",
        "Help for active or deferred members of the NHS Pension Scheme",
        "Help for NHS employers of the NHS Pension Scheme",
        "Help for pensioners, surviving spouses, partners, or dependants of the NHS Pension Scheme",
        "Payroll queries from finance staff about the NHS Pension Scheme",
        "Help and support for NHS staff with their remuneration and benefits",
        "Prescribing and dispensing information for healthcare professionals",
        "Help and support for dental professionals"
    ];

    var serviceName = req.session.data['input-autocomplete'];

    if (validServices.includes(serviceName)) {
        res.redirect('reference-number');
    } else {
        res.redirect('which-service-search');
    }

})

router.post('/select-your-query-NHS-exemption', function (req, res) {

    var nhsExpemptions = req.session.data['select-your-query-NHS-exemption'];

    if (nhsExpemptions == "Dental exemption") {
        res.redirect('reference-number');
    } else if (nhsExpemptions == "Prescription exemption") {
        res.redirect('reference-number');
    } else {
        res.redirect('select-your-query-NHS-exemption');
    }
})

router.post('/select-your-query-help-with-health-costs', function (req, res) {

    var helpWithNHSCosts = req.session.data['select-your-query-help-with-health-costs'];

    if (helpWithNHSCosts == "NHS Low Income Scheme") {
        res.redirect('reference-number');
    } else if (helpWithNHSCosts == "NHS Prescription Prepayment Certificate (PPC)") {
        res.redirect('reference-number');
    } else if (helpWithNHSCosts == "Maternity exemption certificate") {
        res.redirect('reference-number');
    } else if (helpWithNHSCosts == "Medical exemption certificate") {
        res.redirect('medical-exemption-certificate-entitlement');
    } else if (helpWithNHSCosts == "NHS Tax Credit Exemption Certificate") {
        res.redirect('reference-number');
    } else if (helpWithNHSCosts == "NHS penalty charges and enquiry letters") {
        res.redirect('select-your-query-NHS-exemption');
    } else {
        res.redirect('select-your-query-help-with-health-costs');
    }

})

router.post('/select-your-query-student-services', function (req, res) {

    var nhsStudentServices = req.session.data['select-your-query-student-services'];

    if (nhsStudentServices == "NHS Bursary") {
        res.redirect('reference-number');
    } else if (nhsStudentServices == "Social Work Bursary") {
        res.redirect('reference-number');
    } else if (nhsStudentServices == "NHS Learning Support Fund") {
        res.redirect('reference-number');
    } else {
        res.redirect('select-your-query-student-services');
    }

})

router.post('/select-your-query-nhs-pension', function (req, res) {

    var nhsPensions = req.session.data['select-your-query-nhs-pension'];

    if (nhsPensions == "Employer query") {
        res.redirect('reference-number');
    } else if (nhsPensions == "Member query") {
        res.redirect('reference-number');
    } else if (nhsPensions == "Pensioner query") {
        res.redirect('reference-number');
    } else if (nhsPensions == "Payroll query") {
        res.redirect('reference-number');
    } else if (nhsPensions == "Total Reward Statements") {
        res.redirect('reference-number');
    } else {
        res.redirect('select-your-query-nhs-pension');
    }

})

router.post('/select-your-query-healthcare-professionals', function (req, res) {

    var nhsStudentServices = req.session.data['select-your-query-healthcare-professionals'];

    if (nhsStudentServices == "NHS Prescription Services") {
        res.redirect('reference-number');
    } else if (nhsStudentServices == "NHS Dental Services") {
        res.redirect('reference-number');
    } else {
        res.redirect('select-your-query-healthcare-professionals');
    }

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

    res.redirect('enter-your-name');

})

// What is your name?

router.post('/enter-your-name', function (req, res) {

    var firstName = req.session.data['firstName'];
    var lastName = req.session.data['lastName'];

    if (firstName && lastName) {
        res.redirect('enter-date-of-birth');
    } else {
        res.redirect('enter-your-name');

    }

})

// What is your date of birth?

router.post('/enter-date-of-birth', function (req, res) {

    var dateOfBirthDay = req.session.data['date-of-birth']?.day;
    var dateOfBirthMonth = req.session.data['date-of-birth']?.month;
    var dateOfBirthYear = req.session.data['date-of-birth']?.year;

    try {

        if (/^\d+$/.test(dateOfBirthDay) && /^\d+$/.test(dateOfBirthMonth) && /^\d+$/.test(dateOfBirthYear)) {

            req.session.data['date-of-birth'] = DateTime.fromObject({
                day: dateOfBirthDay,
                month: dateOfBirthMonth,
                year: dateOfBirthYear
            }).toFormat("d MMMM yyyy");

            res.redirect('find-your-address')
        } else {
            res.redirect('enter-date-of-birth')
        }

    } catch (err) {

        res.redirect('enter-date-of-birth')

    }
})

// Find your Address

router.post('/find-your-address', function (req, res) {

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

                    res.redirect('select-your-address')
                })
                .catch(error => {
                    console.log(error);
                    res.redirect('no-address-found')
                });

        }

    } else {
        res.redirect('find-your-address')
    }

})

router.post('/enter-your-address', function (req, res) {

    var addressLine1 = req.session.data['address-line-1'];
    var townOrCity = req.session.data['address-town'];
    var postcodeManual = req.session.data['address-postcode'];


    if (addressLine1 && townOrCity && postcodeManual) {
        res.redirect('enter-your-email');
    } else {
        res.redirect('enter-your-address');
    }

})

router.post('/select-your-address', function (req, res) {

    var address = req.session.data['address'];

    if (address) {
        res.redirect('enter-your-email');
    } else {
        res.redirect('select-your-address');
    }

})

router.post('/no-address-found', function (req, res) {

    res.redirect('find-your-address');

})


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

    res.redirect('document');

})

// Do you have a document to upload?

router.post('/document', function (req, res) {

    var documentYesNo = req.session.data['document-yes-no'];

    if (documentYesNo == "Yes") {
        res.redirect('upload-your-document');
    } else if (documentYesNo == "No") {
        res.redirect('enter-additional-information');
    } else {
        res.redirect('upload-your-document');
    }

})

// Upload your documents

router.post('/upload-your-document', function (req, res) {

    res.redirect('your-uploaded-documents');

})

// Delete your document

router.post('/delete-your-document', function (req, res) {

    var deleteYourDocument = req.session.data['delete-your-document'];

    if (deleteYourDocument == "yes") {
        res.redirect('upload-your-document');
    } else if (deleteYourDocument == "no") {
        res.redirect('your-uploaded-documents');
    } else {
        res.redirect('upload-your-document');
    }

})

// Your uploaded documents

router.post('/your-uploaded-documents', function (req, res) {

    res.redirect('enter-additional-information');

})

// Enter additional information

router.post('/enter-additional-information', function (req, res) {

    res.redirect('check-your-answers');

})

// Check your answers

router.post('/check-your-answers', function (req, res) {

    res.redirect('your-query-has-been-received');

})

// End Routes

module.exports = router;