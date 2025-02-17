// ********************************
// CCS (VERSION 7)
// ********************************

// External dependencies
const express = require('express');
const { DateTime } = require("luxon");
const router = express.Router();

// API
const axios = require('axios');

router.post('/start', function (req, res) {

    res.redirect('which-service');

})

router.post('/which-service', function (req, res) {

    var whichService = req.session.data['which-service'];

    if (whichService) {

        if (whichService == "Check if you have an exemption from paying NHS costs") {
            res.redirect('select-your-query-NHS-exemption');
        } else if (whichService == "NHS Help with Health Costs (including prescription prepayment certificates)") {
            res.redirect('select-your-query-help-with-health-costs');
        } else if (whichService == "Student Services") {
            res.redirect('select-your-query-student-services');
        } else if (whichService == "NHS Pensions") {
            res.redirect('select-your-query-nhs-pension');
        } else {
            res.redirect('query-type');
        }


    } else {
        res.redirect('which-service');
    }

})

router.post('/select-your-query-NHS-exemption', function (req, res) {

    var nhsExpemptions = req.session.data['select-your-query-NHS-exemption'];

    if (nhsExpemptions == "Dental exemption") {
        res.redirect('query-type');
    } else if (nhsExpemptions == "Prescription exemption") {
        res.redirect('query-type');
    } else {
        res.redirect('select-your-query-NHS-exemption');
    }

})
 
router.post('/select-your-query-help-with-health-costs', function (req, res) {

    var helpWithNHSCosts = req.session.data['select-your-query-help-with-health-costs'];

    if (helpWithNHSCosts == "NHS Low Income Scheme") {
        res.redirect('query-type');
    } else if (helpWithNHSCosts == "NHS Prescription Prepayment Certificate (PPC)") {
        res.redirect('ppc/contact-nhs-prescription-prepayment-certificate');
    } else if (helpWithNHSCosts == "Maternity exemption certificate") {
        res.redirect('query-type');
    } else if (helpWithNHSCosts == "Medical exemption certificate") {
        res.redirect('query-type');
    } else if (helpWithNHSCosts == "NHS Tax Credit Exemption Certificate") {
        res.redirect('query-type');
    } else {
        res.redirect('select-your-query-help-with-health-costs');
    }

})

router.post('/select-your-query-student-services', function (req, res) {

    var nhsStudentServices = req.session.data['select-your-query-student-services'];

    if (nhsStudentServices == "NHS Bursary") {
        res.redirect('query-type');
    } else if (nhsStudentServices == "Social Work Bursary") {
        res.redirect('query-type');
    } else if (nhsStudentServices == "NHS Learning Support Fund") {
        res.redirect('query-type');
    } else {
        res.redirect('select-your-query-student-services');
    }

})

router.post('/select-your-query-nhs-pension', function (req, res) {

    var nhsPensions = req.session.data['select-your-query-nhs-pension'];

    if (nhsPensions == "Employer query") {
        res.redirect('query-type');
    } else if (nhsPensions == "Member query") {
        res.redirect('query-type');
    } else if (nhsPensions == "Pensioner query") {
        res.redirect('query-type');
    } else if (nhsPensions == "Payroll query") {
        res.redirect('query-type');
    } else {
        res.redirect('select-your-query-nhs-pension');
    }

})

router.post('/query-type', function (req, res) {

    var queryType = req.session.data['query-type'];
    var whichService = req.session.data['which-service'];
    var nhsExpemptions = req.session.data['select-your-query-NHS-exemption'];
    var helpWithNHSCosts = req.session.data['select-your-query-help-with-health-costs'];
    var nhsStudentServices = req.session.data['select-your-query-student-services'];

    if (queryType) {

        if (queryType == "General query") {
            res.redirect('general/enter-your-name');
        } else if (queryType == "Change of name, date of birth or address") {
            res.redirect('change/type-of-change');
        } else if (queryType == "Upload a document or evidence") {
            res.redirect('upload/reference-number');
        } else if (queryType == "None of the above") {

            if (whichService == "NHS Jobs") {
                res.redirect('errors/nhs-jobs/contact-us');
            } else if (whichService == "Check if you have an exemption from paying NHS costs") {

                if (nhsExpemptions == "Dental exemption") {
                    res.redirect('errors/decs/contact-us');
                } else if (nhsExpemptions == "Prescription exemption") {
                    res.redirect('errors/pecs/contact-us');
                } else {
                    res.redirect('errors/general');
                }

            } else if (whichService == "Get help to buy food and milk (Healthy Start)") {
                res.redirect('errors/healthy-start/contact-us');

            } else if (whichService == "NHS Help with Health Costs (including prescription prepayment certificates)") {

                if (helpWithNHSCosts == "Low income scheme") {
                    res.redirect('errors/lis/contact-us');
                } else if (helpWithNHSCosts == "Maternity exemptions") {
                    res.redirect('errors/matex/contact-us');
                } else if (helpWithNHSCosts == "Medical exemptions") {
                    res.redirect('errors/medex/contact-us');
                } else if (helpWithNHSCosts == "Prescription prepayment certificate") {
                    res.redirect('errors/ppc/contact-us');
                } else if (helpWithNHSCosts == "Tax Credit exemptions") {
                    res.redirect('errors/tax-credits/contact-us');
                } else {
                    res.redirect('errors/general');
                }

            } else if (whichService == "Student Services") {

                if (nhsStudentServices == "NHS Bursary") {
                    res.redirect('errors/sb/contact-us');
                } else if (nhsStudentServices == "Social Work Bursary") {
                    res.redirect('errors/swb/contact-us');
                } else if (nhsStudentServices == "NHS Learning Support Fund") {
                    res.redirect('errors/lsf/contact-us');
                } else {
                    res.redirect('errors/general');
                }

            } else if (whichService == "NHS Pensions") {
                res.redirect('errors/pension/contact-us');
            } else if (whichService == "Total Reward Statements") {
                res.redirect('errors/trs/contact-us');
            } else if (whichService == "NHS Prescription Services") {
                res.redirect('errors/prescription-services/contact-us');
            } else if (whichService == "NHS Dental Services (for healthcare professionals)") {
                res.redirect('errors/dental-services/contact-us');
            } else {
                res.redirect('errors/general');
            }

        } else {
            res.redirect('query-type');
        }

    } else {
        res.redirect('query-type');
    }

})

// *************************
// GENERAL & UPLOAD & CHANGE
// *************************

// NAME - General / Upload / Change Address

router.post('/enter-your-name', function (req, res) {

    var firstName = req.session.data['firstName'];
    var lastName = req.session.data['lastName'];

    if (firstName && lastName) {
        res.redirect('enter-date-of-birth');
    } else {
        res.redirect('enter-your-name');

    }

})

// DATE OF BIRTH - General / Upload / Change Name 

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

// FIND YOUR ADDRESS - General / Upload / Change Name / Change Date of Birth

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

                    return res.redirect('select-your-address')
                })
                .catch(error => {
                    console.log(error);
                    return res.redirect('no-address-found')
                });

        }

    } else {
        return res.redirect('find-your-address')
    }

})

router.post('/no-address-found', function (req, res) {

    res.redirect('find-your-address');

})

// *******
// GENERAL
// *******

router.post('/general/enter-your-address', function (req, res) {

    var addressLine1 = req.session.data['address-line-1'];
    var townOrCity = req.session.data['address-town'];
    var postcodeManual = req.session.data['address-postcode'];


    if (addressLine1 && townOrCity && postcodeManual) {
        res.redirect('how-can-we-help');
    } else {
        res.redirect('enter-your-address');
    }

})

router.post('/general/select-your-address', function (req, res) {

    var address = req.session.data['address'];

    if (address) {
        res.redirect('how-can-we-help');
    } else {
        res.redirect('select-your-address');
    }

})

router.post('/how-can-we-help', function (req, res) {

    var howCanWeHelp = req.session.data['how-can-we-help'];

    if (howCanWeHelp) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('how-can-we-help');
    }

})

router.post('/general/check-your-answers', function (req, res) {
    res.redirect('your-query-has-been-submitted');
})

// ****
// PPC
// ****

router.post('/certificate-number', function (req, res) {

    var certificateNumberQuestion = req.session.data['certificate-number'];

    if (certificateNumberQuestion == "Yes") {
        res.redirect('enter-your-certificate-number');
    } else if (certificateNumberQuestion == "No") {
        res.redirect('../change/type-of-change');
    } else {
        res.redirect('certificate-number');

    }

})

router.post('/enter-your-certificate-number', function (req, res) {

    res.redirect('change/type-of-change');

})

router.post('/replacement/certificate-number', function (req, res) {

    var certificateNumberQuestion = req.session.data['certificate-number'];

    if (certificateNumberQuestion == "Yes") {
        res.redirect('enter-your-certificate-number');
    } else if (certificateNumberQuestion == "No") {
        res.redirect('enter-your-name');
    } else {
        res.redirect('certificate-number');

    }

})

router.post('/replacement/enter-your-certificate-number', function (req, res) {

    res.redirect('enter-your-name');

})

router.post('/replacement/enter-your-address', function (req, res) {

    var addressLine1 = req.session.data['address-line-1'];
    var townOrCity = req.session.data['address-town'];
    var postcodeManual = req.session.data['address-postcode'];


    if (addressLine1 && townOrCity && postcodeManual) {
        res.redirect('ppc-replacement-record-found');
    } else {
        res.redirect('enter-your-address');
    }

})

router.post('/replacement/select-your-address', function (req, res) {

    var address = req.session.data['address'];

    if (address) {
        res.redirect('ppc-replacement-record-found');
    } else {
        res.redirect('select-your-address');
    }
})

router.post('/ppc-replacement-record-found', function (req, res) {

    res.redirect('ppc-replacement-request-confirmation');

})

router.post('/ppc-replacement-record-not-found', function (req, res) {

    res.redirect('enter-your-query');

})

router.post('/enter-your-query', function (req, res) {

    res.redirect('enter-your-email-address');

})

router.post('/enter-your-email-address', function (req, res) {

    res.redirect('check-your-answers');

})

router.post('/replacement/check-your-answers', function (req, res) {

    res.redirect('query-successfully-submitted');

})


// ******
// CHANGE
// ******

router.post('/type-of-change', function (req, res) {

    var typeOfChange = req.session.data['type-of-change'];
    var whichService = req.session.data['which-service'];
    var nhsExpemptions = req.session.data['select-your-query-NHS-exemption'];
    var helpWithNHSCosts = req.session.data['select-your-query-help-with-health-costs'];
    var nhsStudentServices = req.session.data['select-your-query-student-services'];

    if (typeOfChange) {

        if (typeOfChange == "Name") {
            res.redirect('name/enter-your-previous-name');
        } else if (typeOfChange == "Address") {
            res.redirect('address/enter-your-name');
        } else if (typeOfChange == "Date of birth") {
            res.redirect('date-of-birth/enter-your-name');
        } else if (typeOfChange == "None of the above") {

            if (whichService == "Apply for a job in the NHS (NHS Jobs)") {
                res.redirect('errors/nhs-jobs/contact-us');
            } else if (whichService == "Check if you have an NHS exemption") {

                if (nhsExpemptions == "Dental exemption") {
                    res.redirect('errors/decs/contact-us');
                } else if (nhsExpemptions == "Prescription exemption") {
                    res.redirect('errors/pecs/contact-us');
                } else {
                    res.redirect('errors/general');
                }

            } else if (whichService == "Get help to buy healthy food and milk (Healthy Start)") {
                res.redirect('errors/healthy-start/contact-us');
            } else if (whichService == "Get help with NHS costs (including prescription prepayment certificates)") {

                if (helpWithNHSCosts == "Low income scheme") {
                    res.redirect('errors/lis/contact-us');
                } else if (helpWithNHSCosts == "Maternity exemptions") {
                    res.redirect('errors/matex/contact-us');
                } else if (helpWithNHSCosts == "Medical exemptions") {
                    res.redirect('errors/medex/contact-us');
                } else if (helpWithNHSCosts == "Prescription prepayment certificate") {
                    res.redirect('errors/ppc/contact-us');
                } else if (helpWithNHSCosts == "Tax Credit exemptions") {
                    res.redirect('errors/tax-credits/contact-us');
                } else {
                    res.redirect('errors/general');
                }

            } else if (whichService == "NHS Student Services") {

                if (nhsStudentServices == "NHS Bursary") {
                    res.redirect('errors/sb/contact-us');
                } else if (nhsStudentServices == "Social Work Bursary") {
                    res.redirect('errors/swb/contact-us');
                } else if (nhsStudentServices == "NHS Learning Support Fund") {
                    res.redirect('errors/lsf/contact-us');
                } else {
                    res.redirect('errors/general');
                }

            } else if (whichService == "NHS Pensions") {
                res.redirect('errors/pension/contact-us');
            } else if (whichService == "NHS Prescription Services (for healthcare professionals)") {
                res.redirect('errors/prescription-services/contact-us');
            } else if (whichService == "NHS Dental Services (for healthcare professionals)") {
                res.redirect('errors/dental-services/contact-us');
            } else {
                res.redirect('errors/general');
            }

        } else {
            res.redirect('query-type');
        }

    } else {
        res.redirect('query-type');
    }

})


// ************
// CHANGE NAME
// ************

router.post('/name/enter-your-previous-name', function (req, res) {

    var previousFirstName = req.session.data['previousFirstName'];
    var previousLastName = req.session.data['previousLastName'];

    if (previousFirstName && previousLastName) {
        res.redirect('enter-date-of-birth');
    } else {
        res.redirect('enter-your-previous-name');

    }

})

router.post('/name/enter-your-address', function (req, res) {

    var addressLine1 = req.session.data['address-line-1'];
    var townOrCity = req.session.data['address-town'];
    var postcodeManual = req.session.data['address-postcode'];


    if (addressLine1 && townOrCity && postcodeManual) {
        res.redirect('enter-your-new-name');
    } else {
        res.redirect('enter-your-address');
    }

})

router.post('/name/select-your-address', function (req, res) {

    var address = req.session.data['address'];

    if (address) {
        res.redirect('enter-your-new-name');
    } else {
        res.redirect('select-your-address');
    }

})

router.post('/name/enter-your-new-name', function (req, res) {

    var newFirstName = req.session.data['newFirstName'];
    var newLastName = req.session.data['newLastName'];

    if (newFirstName && newLastName) {
        res.redirect('confirm-your-new-name');
    } else {
        res.redirect('enter-your-new-name');
    }

})

router.post('/name/confirm-your-new-name', function (req, res) {

    var confirmName = req.session.data['confirm-name'];

    if (confirmName == "Yes") {
        res.redirect('check-your-answers');
    } else if (confirmName == "No") {
        res.redirect('../../query-type');
    } else {
        res.redirect('confirm-your-new-name');
    }

})

router.post('/name/check-your-answers', function (req, res) {
    res.redirect('your-name-has-been-updated');
})

// ********************
// CHANGE DATE OF BIRTH
// ********************

router.post('/date-of-birth/enter-your-name', function (req, res) {

    var firstName = req.session.data['firstName'];
    var lastName = req.session.data['lastName'];

    if (firstName && lastName) {
        res.redirect('enter-previous-date-of-birth');
    } else {
        res.redirect('enter-your-name');
    }

})

router.post('/date-of-birth/enter-previous-date-of-birth', function (req, res) {

    var previousDateOfBirthDay = req.session.data['previous-date-of-birth[day]'];
    var previousDateOfBirthMonth = req.session.data['previous-date-of-birth[month]'];
    var previousDateOfBirthYear = req.session.data['previous-date-of-birth[year]'];

    try {

        if (/^\d+$/.test(previousDateOfBirthDay) && /^\d+$/.test(previousDateOfBirthMonth) && /^\d+$/.test(previousDateOfBirthYear)) {

            req.session.data['previous-date-of-birth'] = DateTime.fromObject({
                day: previousDateOfBirthDay,
                month: previousDateOfBirthMonth,
                year: previousDateOfBirthYear
            }).toFormat("d MMMM yyyy");

            res.redirect('find-your-address')
        } else {
            res.redirect('enter-previous-date-of-birth')
        }

    } catch (err) {

        res.redirect('enter-previous-date-of-birth')

    }

})

router.post('/date-of-birth/enter-your-address', function (req, res) {

    var addressLine1 = req.session.data['address-line-1'];
    var townOrCity = req.session.data['address-town'];
    var postcodeManual = req.session.data['address-postcode'];


    if (addressLine1 && townOrCity && postcodeManual) {
        res.redirect('enter-new-date-of-birth');
    } else {
        res.redirect('enter-your-address');
    }

})

router.post('/date-of-birth/select-your-address', function (req, res) {

    var address = req.session.data['address'];

    if (address) {
        res.redirect('enter-new-date-of-birth');
    } else {
        res.redirect('select-your-address');
    }

})

router.post('/date-of-birth/enter-new-date-of-birth', function (req, res) {

    var newDateOfBirthDay = req.session.data['new-date-of-birth[day]'];
    var newDateOfBirthMonth = req.session.data['new-date-of-birth[month]'];
    var newDateOfBirthYear = req.session.data['new-date-of-birth[year]'];

    try {

        if (/^\d+$/.test(newDateOfBirthDay) && /^\d+$/.test(newDateOfBirthMonth) && /^\d+$/.test(newDateOfBirthYear)) {

            req.session.data['new-date-of-birth'] = DateTime.fromObject({
                day: newDateOfBirthDay,
                month: newDateOfBirthMonth,
                year: newDateOfBirthYear
            }).toFormat("d MMMM yyyy");

            res.redirect('confirm-new-date-of-birth')
        } else {
            res.redirect('enter-new-date-of-birth')
        }

    } catch (err) {

        res.redirect('enter-new-date-of-birth')

    }

})

router.post('/date-of-birth/confirm-new-date-of-birth', function (req, res) {

    var confirmDateOfBirth = req.session.data['confirm-date-of-birth'];

    if (confirmDateOfBirth == "Yes") {
        res.redirect('check-your-answers');
    } else if (confirmDateOfBirth == "No") {
        res.redirect('query-type');
    } else {
        res.redirect('confirm-new-date-of-birth');
    }

})

router.post('/date-of-birth/check-your-answers', function (req, res) {
    res.redirect('your-date-of-birth-updated');
})

// **************
// CHANGE ADDRESS
// **************

router.post('/address/enter-date-of-birth', function (req, res) {

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

            res.redirect('find-your-previous-address')
        } else {
            res.redirect('enter-date-of-birth')
        }

    } catch (err) {

        res.redirect('enter-date-of-birth')

    }

})

// Find your previous address

router.post('/address/find-your-previous-address', function (req, res) {

    var postcodeLookupPrevious = req.session.data['postcodePrevious']

    const regex = RegExp('^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$');

    if (postcodeLookupPrevious) {

        if (regex.test(postcodeLookupPrevious) === true) {

            axios.get("https://api.os.uk/search/places/v1/postcode?postcode=" + postcodeLookupPrevious + "&key=" + process.env.POSTCODEAPIKEY)
                .then(response => {
                    var previousAddresses = response.data.results.map(result => result.DPA.ADDRESS);

                    const previoustitleCaseAddresses = previousAddresses.map(previousAddresses => {
                        const previousparts = previousAddresses.split(', ');
                        const previousformattedParts = previousparts.map((part, index) => {
                            if (index === previousparts.length - 1) {
                                // Preserve postcode (DL14 0DX) in uppercase
                                return part.toUpperCase();
                            }
                            return part
                                .split(' ')
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                .join(' ');
                        });
                        return previousformattedParts.join(', ');
                    });

                    req.session.data['previousAddresses'] = previoustitleCaseAddresses;

                    res.redirect('select-your-previous-address')
                })
                .catch(error => {
                    console.log(error);
                    res.redirect('no-previous-address-found')
                });

        }

    } else {
        res.redirect('find-your-previous-address')
    }

})

router.post('/address/enter-your-previous-address', function (req, res) {

    var previousAddressLine1 = req.session.data['previous-address-line-1'];
    var previousTownOrCity = req.session.data['previous-address-town'];
    var previousPostcodeManual = req.session.data['previous-address-postcode'];


    if (previousAddressLine1 && previousTownOrCity && previousPostcodeManual) {
        res.redirect('find-your-new-address');
    } else {
        res.redirect('enter-your-previous-address');
    }

})

router.post('/address/select-your-previous-address', function (req, res) {

    var previousAddress = req.session.data['previousAddress'];

    if (previousAddress) {
        res.redirect('find-your-new-address');
    } else {
        res.redirect('select-your-previous-address');
    }

})

router.post('/address/no-previous-address-found', function (req, res) {
    res.redirect('find-your-previous-address');
})

// Find your new address

router.post('/address/find-your-new-address', function (req, res) {

    var postcodeLookupNew = req.session.data['postcodeNew']

    const regex = RegExp('^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$');

    if (postcodeLookupNew) {

        if (regex.test(postcodeLookupNew) === true) {

            axios.get("https://api.os.uk/search/places/v1/postcode?postcode=" + postcodeLookupNew + "&key=" + process.env.POSTCODEAPIKEY)
                .then(response => {
                    var newAddresses = response.data.results.map(result => result.DPA.ADDRESS);

                    const newtitleCaseAddresses = newAddresses.map(newAddresses => {
                        const newparts = newAddresses.split(', ');
                        const newformattedParts = newparts.map((part, index) => {
                            if (index === newparts.length - 1) {
                                // Preserve postcode (DL14 0DX) in uppercase
                                return part.toUpperCase();
                            }
                            return part
                                .split(' ')
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                .join(' ');
                        });
                        return newformattedParts.join(', ');
                    });

                    req.session.data['newAddresses'] = newtitleCaseAddresses;

                    res.redirect('select-your-new-address')
                })
                .catch(error => {
                    console.log(error);
                    res.redirect('no-new-address-found')
                });

        }

    } else {
        res.redirect('find-your-new-address')
    }

})

router.post('/address/enter-your-new-address', function (req, res) {

    var newAddressLine1 = req.session.data['new-address-line-1'];
    var newTownOrCity = req.session.data['new-address-town'];
    var newPostcodeManual = req.session.data['new-address-postcode'];


    if (newAddressLine1 && newTownOrCity && newPostcodeManual) {
        res.redirect('confirm-change-of-address');
    } else {
        res.redirect('enter-your-new-address');
    }

})

router.post('/address/select-your-new-address', function (req, res) {

    var newAddress = req.session.data['newAddress'];

    if (newAddress) {
        res.redirect('confirm-change-of-address');
    } else {
        res.redirect('select-your-new-address');
    }

})

router.post('/address/no-new-address-found', function (req, res) {
    res.redirect('find-your-new-address');
})

router.post('/address/confirm-change-of-address', function (req, res) {

    var confirmAddress = req.session.data['confirm-address'];

    if (confirmAddress == "Yes") {
        res.redirect('check-your-answers');
    } else if (confirmAddress == "No") {
        res.redirect('query-type');
    } else {
        res.redirect('confirm-change-of-address');
    }

})

router.post('/address/check-your-answers', function (req, res) {
    res.redirect('your-address-has-been-updated');
})


// *******
// UPLOAD
// *******

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

router.post('/enter-reference-number', function (req, res) {

    var referenceNumber = req.session.data['enter-reference-number'];

    if (referenceNumber) {
        res.redirect('enter-your-name');
    } else {
        res.redirect('enter-reference-number');
    }

})

router.post('/enter-your-address', function (req, res) {

    var addressLine1 = req.session.data['address-line-1'];
    var townOrCity = req.session.data['address-town'];
    var postcodeManual = req.session.data['address-postcode'];


    if (addressLine1 && townOrCity && postcodeManual) {
        res.redirect('upload-your-document');
    } else {
        res.redirect('enter-your-address');
    }

})

router.post('/select-your-address', function (req, res) {

    var address = req.session.data['address'];

    if (address) {
        res.redirect('upload-your-document');
    } else {
        res.redirect('select-your-address');
    }

})

router.post('/upload-your-document', function (req, res) {

    res.redirect('your-uploaded-documents');

})

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

router.post('/your-uploaded-documents', function (req, res) {

    res.redirect('check-your-answers');

})

router.post('/check-your-answers', function (req, res) {

    res.redirect('your-documents-were-submitted');

})



module.exports = router;