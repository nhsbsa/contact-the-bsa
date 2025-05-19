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
 
    res.redirect('which-service');

})

// Which of our services are you contacting us about? (radios)

router.post('/which-service', function (req, res) {

    var whichService = req.session.data['which-service'];

    if (whichService) {

        if (whichService == "NHS Jobs") {
            res.redirect('select-your-query-nhs-jobs');
        } else if (whichService == "My NHS Pension Portal Support") {
            res.redirect('nhs-pension-number');
        } else if (whichService == "My NHS Pension Registration") {
            res.redirect('nhs-pension-number');
        } else if (whichService == "TRS Employer") {
            res.redirect('nhs-pension-number');
        } else {
            res.redirect('reference-number');
        }


    } else {
        res.redirect('which-service');
    }

})

router.post('/select-your-query-nhs-jobs', function (req, res) {

    var nhsJobs = req.session.data['select-your-query-nhs-jobs'];

    if (nhsJobs == "General query") {
        res.redirect('reference-number');
    } else if (nhsJobs == "Technical query") {
        res.redirect('reference-number');
    } else if (nhsJobs == "Upload a CV") {
        res.redirect('upload-a-cv');
    } else {
        res.redirect('select-your-query-nhs-jobs');
    }
})

// Do you have a nhs pension number?

router.post('/nhs-pension-number', function (req, res) {

    var pensionsNum = req.session.data['pension-number'];

    if (pensionsNum == "Yes, I know my NHS Pension number") {
        var pensionNumber = req.session.data['sdNumber'];
        const regex = RegExp('^\\s*SD\\s*\\d\\s*\\d\\s*\\d\\s*\\d\\s*\\d\\s*\\d\\s*\\d\\s*\\d\\s*$', 'i');

        if (pensionNumber){
            if (regex.test(pensionNumber) === true){
                res.redirect('reference-number');
            } else {
                res.redirect('nhs-pension-number');
            }
        } else {
            res.redirect('nhs-pension-number');
        }
    } else if (pensionsNum == "No, I do not know my NHS Pension number") {
        res.redirect('reference-number');
    } else if (pensionsNum == "I'm not sure") {
        res.redirect('reference-number');
    } else {
        res.redirect('nhs-pension-number');
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

    var whichService = req.session.data['which-service'];

    var referenceNumber = req.session.data['enter-reference-number'].trim();

    const dynamicsRegex = /^NHS-\d{7}-[A-Za-z]{3}$/;

    if (referenceNumber) {

        if (whichService == "My NHS Pension Portal Support" || 
        whichService == "My NHS Pension Registration" || 
        whichService == "TRS Employer") {

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
    var nhsJobs = req.session.data['which-service'];
    var pensionNumber = req.session.data['pension-number'];

    if (firstName && lastName) {
        if (nhsJobs == "NHS Jobs") {
        res.redirect('enter-your-email');
        } else if (pensionNumber == "No, I do not know my NHS Pension number" || pensionNumber == "I'm not sure") {
            res.redirect('enter-your-national-insurance-number');
        } else {
        res.redirect('enter-date-of-birth');
        }
    } else {
        res.redirect('enter-your-name');

    }

})

// What is your national insurance number?

router.post('/enter-your-national-insurance-number', function (req, res) {

    let nino = req.session.data['nationalInsuranceNumber'];

    // Remove all spaces and normalize to uppercase
    nino = (nino || '').replace(/\s+/g, '').toUpperCase();

    const regex = new RegExp('^(?!BG|GB|KN|NK|NT|TN|ZZ)[A-CEGHJ-PR-TW-Z]{2}\\d{6}[A-D]$');

    if (nino) {
        if (regex.test(nino)|| nino === 'QQ123456C') {
            res.redirect('enter-date-of-birth');  // Valid National Insurance Number
        } else {
            res.redirect('enter-your-national-insurance-number');  // Invalid format
        }
    } else {
        res.redirect('enter-your-national-insurance-number');  // Field is empty
    }
});


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

    var nhsJobs = req.session.data['which-service'];

    if (nhsJobs == "NHS Jobs") {
        res.redirect('enter-additional-information');
    } else {
        res.redirect('document');
    }

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