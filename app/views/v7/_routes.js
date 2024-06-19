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
        res.redirect('query-type');
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
            res.redirect('general/name');
        } else if (queryType == "Change of name, date of birth or address") {
            res.redirect('change/type-of-change');
        } else if (queryType == "Upload a document or evidence") {
            res.redirect('reference-number');
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

// *******
// GENERAL
// *******

router.post('/general/name', function (req, res) {

    var firstName = req.session.data['firstName'];
    var lastName = req.session.data['lastName'];

    if (firstName && lastName) {
        res.redirect('general/date-of-birth');
    } else {
        res.redirect('general/name');

    }

})

router.post('/general/date-of-birth', function (req, res) {

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

            res.redirect('general/find-address')
        } else {
            res.redirect('general/date-of-birth')
        }

    } catch (err) {

        res.redirect('general/date-of-birth')

    }

})

// Find your address

router.get('/general/find-address', function (req, res) {

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

                    res.redirect('general/select-address')
                })
                .catch(error => {
                    console.log(error);
                    res.redirect('general/no-address-found')
                });

        }

    } else {
        res.redirect('general/find-address')
    }

})

router.post('/general/address', function (req, res) {

    var addressLine1 = req.session.data['address-line-1'];
    var townOrCity = req.session.data['address-town'];
    var postcodeManual = req.session.data['address-postcode'];


    if (addressLine1 && townOrCity && postcodeManual) {
        res.redirect('general/how-can-we-help');
    } else {
        res.redirect('general/address');
    }

})

router.post('/general/select-address', function (req, res) {

    var address = req.session.data['address'];

    if (address) {
        res.redirect('general/how-can-we-help');
    } else {
        res.redirect('general/select-address');
    }

})

router.post('/general/how-can-we-help', function (req, res) {

    var howCanWeHelp = req.session.data['how-can-we-help'];

    if (howCanWeHelp) {
        res.redirect('general/check-your-answers');
    } else {
        res.redirect('general/how-can-we-help');
    }

})

router.post('/general/check-your-answers', function (req, res) {
    res.redirect('general/confirmation-successful');
})

// ******
// CHANGE
// ******

router.post('/change/type-of-change', function (req, res) {

    var typeOfChange = req.session.data['type-of-change'];
    var whichService = req.session.data['which-service'];
    var nhsExpemptions = req.session.data['select-your-query-NHS-exemption'];
    var helpWithNHSCosts = req.session.data['select-your-query-help-with-health-costs'];
    var nhsStudentServices = req.session.data['select-your-query-student-services'];

    if (typeOfChange) {

        if (typeOfChange == "Name") {
            res.redirect('change/name/previous-name');
        } else if (typeOfChange == "Address") {
            res.redirect('change/address/name');
        } else if (typeOfChange == "Date of birth") {
            res.redirect('change/date-of-birth/name');
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


// NAME

router.post('/change/name/previous-name', function (req, res) {

    var previousFirstName = req.session.data['previousFirstName'];
    var previousLastName = req.session.data['previousLastName'];

    if (previousFirstName && previousLastName) {
        res.redirect('change/name/date-of-birth');
    } else {
        res.redirect('change/name/previous-name');

    }

})

router.post('/change/name/date-of-birth', function (req, res) {

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

            res.redirect('change/name/find-address')
        } else {
            res.redirect('change/name/date-of-birth')
        }

    } catch (err) {

        res.redirect('change/name/date-of-birth')

    }

})

// Find your address

router.get('/change/name/find-address', function (req, res) {

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

                    res.redirect('change/name/select-address')
                })
                .catch(error => {
                    console.log(error);
                    res.redirect('change/name/no-address-found')
                });

        }

    } else {
        res.redirect('change/name/find-address')
    }

})

router.post('/change/name/address', function (req, res) {

    var addressLine1 = req.session.data['address-line-1'];
    var townOrCity = req.session.data['address-town'];
    var postcodeManual = req.session.data['address-postcode'];


    if (addressLine1 && townOrCity && postcodeManual) {
        res.redirect('change/name/new-name');
    } else {
        res.redirect('change/name/address');
    }

})

router.post('/change/name/select-address', function (req, res) {

    var address = req.session.data['address'];

    if (address) {
        res.redirect('change/name/new-name');
    } else {
        res.redirect('change/name/select-address');
    }

})

router.post('/change/name/new-name', function (req, res) {

    var newFirstName = req.session.data['newFirstName'];
    var newLastName = req.session.data['newLastName'];

    if (newFirstName && newLastName) {
        res.redirect('change/name/confirm');
    } else {
        res.redirect('change/name/new-name');
    }

})

router.post('/change/name/confirm', function (req, res) {

    var confirmName = req.session.data['confirm-name'];

    if (confirmName == "Yes") {
        res.redirect('change/name/check-your-answers');
    } else if (confirmName == "No") {
        res.redirect('query-type');
    } else {
        res.redirect('change/name/confirm');
    }

})

router.post('/change/name/check-your-answers', function (req, res) {
    res.redirect('change/name/confirmation-successful');
})

// DATE OF BIRTH

router.post('/change/date-of-birth/name', function (req, res) {

    var firstName = req.session.data['firstName'];
    var lastName = req.session.data['lastName'];

    if (firstName && lastName) {
        res.redirect('change/date-of-birth/previous-date-of-birth');
    } else {
        res.redirect('change/date-of-birth/previous-name');
    }

})

router.post('/change/date-of-birth/previous-date-of-birth', function (req, res) {

    var previousDateOfBirthDay = req.session.data['previous-date-of-birth-day'];
    var previousDateOfBirthMonth = req.session.data['previous-date-of-birth-month'];
    var previousDateOfBirthYear = req.session.data['previous-date-of-birth-year'];

    try {

        if (/^\d+$/.test(previousDateOfBirthDay) && /^\d+$/.test(previousDateOfBirthMonth) && /^\d+$/.test(previousDateOfBirthYear)) {

            req.session.data['previous-date-of-birth'] = DateTime.fromObject({
                day: previousDateOfBirthDay,
                month: previousDateOfBirthMonth,
                year: previousDateOfBirthYear
            }).toFormat("d MMMM yyyy");

            res.redirect('change/date-of-birth/find-address')
        } else {
            res.redirect('change/date-of-birth/previous-date-of-birth')
        }

    } catch (err) {

        res.redirect('change/date-of-birth/previous-date-of-birth')

    }

})

// Find your address

router.get('/change/date-of-birth/find-address', function (req, res) {

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

                    res.redirect('change/date-of-birth/select-address')
                })
                .catch(error => {
                    console.log(error);
                    res.redirect('change/date-of-birth/no-address-found')
                });

        }

    } else {
        res.redirect('change/date-of-birth/find-address')
    }

})

router.post('/change/date-of-birth/address', function (req, res) {

    var addressLine1 = req.session.data['address-line-1'];
    var townOrCity = req.session.data['address-town'];
    var postcodeManual = req.session.data['address-postcode'];


    if (addressLine1 && townOrCity && postcodeManual) {
        res.redirect('change/date-of-birth/new-date-of-birth');
    } else {
        res.redirect('change/date-of-birth/address');
    }

})

router.post('/change/date-of-birth/select-address', function (req, res) {

    var address = req.session.data['address'];

    if (address) {
        res.redirect('change/date-of-birth/new-date-of-birth');
    } else {
        res.redirect('change/date-of-birth/select-address');
    }

})

router.post('/change/date-of-birth/new-date-of-birth', function (req, res) {

    var newDateOfBirthDay = req.session.data['new-date-of-birth-day'];
    var newDateOfBirthMonth = req.session.data['new-date-of-birth-month'];
    var newDateOfBirthYear = req.session.data['new-date-of-birth-year'];

    try {

        if (/^\d+$/.test(newDateOfBirthDay) && /^\d+$/.test(newDateOfBirthMonth) && /^\d+$/.test(newDateOfBirthYear)) {

            req.session.data['new-date-of-birth'] = DateTime.fromObject({
                day: newDateOfBirthDay,
                month: newDateOfBirthMonth,
                year: newDateOfBirthYear
            }).toFormat("d MMMM yyyy");

            res.redirect('change/date-of-birth/confirm')
        } else {
            res.redirect('change/date-of-birth/new-date-of-birth')
        }

    } catch (err) {

        res.redirect('change/date-of-birth/new-date-of-birth')

    }

})

router.post('/change/date-of-birth/confirm', function (req, res) {

    var confirmDateOfBirth = req.session.data['confirm-date-of-birth'];

    if (confirmDateOfBirth == "Yes") {
        res.redirect('change/date-of-birth/check-your-answers');
    } else if (confirmDateOfBirth == "No") {
        res.redirect('query-type');
    } else {
        res.redirect('change/date-of-birth/confirm');
    }

})

router.post('/change/date-of-birth/check-your-answers', function (req, res) {
    res.redirect('change/date-of-birth/confirmation-successful');
})

// ADDRESS

router.post('/change/address/name', function (req, res) {

    var firstName = req.session.data['firstName'];
    var lastName = req.session.data['lastName'];

    if (firstName && lastName) {
        res.redirect('change/address/date-of-birth');
    } else {
        res.redirect('change/address/name');

    }

})

router.post('/change/address/date-of-birth', function (req, res) {

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

            res.redirect('change/address/find-previous-address')
        } else {
            res.redirect('change/address/date-of-birth')
        }

    } catch (err) {

        res.redirect('change/address/date-of-birth')

    }

})

// Find your previous address

router.get('/change/address/find-previous-address', function (req, res) {

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

                    res.redirect('change/address/select-previous-address')
                })
                .catch(error => {
                    console.log(error);
                    res.redirect('change/address/no-previous-address-found')
                });

        }

    } else {
        res.redirect('change/address/find-previous-address')
    }

})

router.post('/change/address/previous-address', function (req, res) {

    var previousAddressLine1 = req.session.data['previous-address-line-1'];
    var previousTownOrCity = req.session.data['previous-address-town'];
    var previousPostcodeManual = req.session.data['previous-address-postcode'];


    if (previousAddressLine1 && previousTownOrCity && previousPostcodeManual) {
        res.redirect('change/address/find-new-address');
    } else {
        res.redirect('change/address/previous-address');
    }

})

router.post('/change/address/select-previous-address', function (req, res) {

    var previousAddress = req.session.data['previousAddress'];

    if (previousAddress) {
        res.redirect('change/address/find-new-address');
    } else {
        res.redirect('change/address/select-previous-address');
    }

})

// Find your new address

router.get('/change/address/find-new-address', function (req, res) {

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

                    res.redirect('change/address/select-new-address')
                })
                .catch(error => {
                    console.log(error);
                    res.redirect('change/address/no-new-address-found')
                });

        }

    } else {
        res.redirect('change/address/find-new-address')
    }

})

router.post('/change/address/new-address', function (req, res) {

    var newAddressLine1 = req.session.data['new-address-line-1'];
    var newTownOrCity = req.session.data['new-address-town'];
    var newPostcodeManual = req.session.data['new-address-postcode'];


    if (newAddressLine1 && newTownOrCity && newPostcodeManual) {
        res.redirect('change/address/confirm');
    } else {
        res.redirect('change/address/new-address');
    }

})

router.post('/change/address/select-new-address', function (req, res) {

    var newAddress = req.session.data['newAddress'];

    if (newAddress) {
        res.redirect('change/address/confirm');
    } else {
        res.redirect('change/address/select-new-address');
    }

})

router.post('/change/address/confirm', function (req, res) {

    var confirmAddress = req.session.data['confirm-address'];

    if (confirmAddress == "Yes") {
        res.redirect('change/address/check-your-answers');
    } else if (confirmAddress == "No") {
        res.redirect('query-type');
    } else {
        res.redirect('change/address/confirm');
    }

})

router.post('/change/address/check-your-answers', function (req, res) {
    res.redirect('change/address/confirmation-successful');
})

// UPLOAD

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

router.post('/enter-your-name', function (req, res) {

    var firstName = req.session.data['firstName'];
    var lastName = req.session.data['lastName'];

    if (firstName && lastName) {
        res.redirect('enter-date-of-birth');
    } else {
        res.redirect('enter-your-name');

    }

})

router.post('/enter-date-of-birth', function (req, res) {

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

            res.redirect('find-your-address')
        } else {
            res.redirect('enter-date-of-birth')
        }

    } catch (err) {

        res.redirect('date-of-birth')

    }

})

// Find your address

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

router.post('/no-address-found', function (req, res) {

    res.redirect('find-your-address');

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