// ********************************
// CCS (VERSION 4)
// ********************************

// External dependencies
const express = require('express');
const { DateTime } = require("luxon");
const router = express.Router();

// API
const axios = require('axios');

// ************
// SOLICITED
// ************

router.post('/v4/solicited/start-page', function (req, res) {

    res.redirect('/v4/solicited/which-service');

})

router.post('/v4/solicited/which-service', function (req, res) {

    var whichService = req.session.data['which-service'];

    if (whichService) {
        res.redirect('/v4/solicited/reference-number');
    } else {
        res.redirect('/v4/solicited/which-service');
    }

})

router.post('/v4/solicited/reference-number', function (req, res) {

    var referenceNumber = req.session.data['reference-number'];

    if (referenceNumber) {
        res.redirect('/v4/solicited/name');
    } else {
        res.redirect('/v4/solicited/reference-number');
    }

})

router.post('/v4/solicited/name', function (req, res) {

    var firstName = req.session.data['firstName'];
    var lastName = req.session.data['lastName'];

    if (firstName && lastName) {
        res.redirect('/v4/solicited/date-of-birth');
    } else {
        res.redirect('/v4/solicited/name');

    }

})

router.post('/v4/solicited/date-of-birth', function (req, res) {

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
  
        res.redirect('/v4/solicited/find-address')
      } else {
        res.redirect('/v4/solicited/date-of-birth')
      }
  
    } catch (err) {
  
      res.redirect('/v4/solicited/date-of-birth')
  
    }
  
  })

// Find your address

router.get('/v4/solicited/find-address', function (req, res) {

var postcodeLookup = req.session.data['postcode']

const regex = RegExp('^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$');

if (postcodeLookup) {

    if (regex.test(postcodeLookup) === true) {

        axios.get("https://api.os.uk/search/places/v1/postcode?postcode=" + postcodeLookup + "&key="+ process.env.POSTCODEAPIKEY)
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
            res.redirect('/v4/solicited/select-address')
        })
        .catch(error => {
            console.log(error);
            res.redirect('/v4/solicited/no-address-found')
        });

    }

} else {
    res.redirect('/v4/solicited/find-address')
}

})

router.post('/v4/solicited/address', function (req, res) {

var addressLine1 = req.session.data['address-line-1'];
var townOrCity = req.session.data['address-level2'];
var postcodeManual = req.session.data['address-postcode'];


if (addressLine1 && townOrCity && postcodeManual) {
    res.redirect('/v4/solicited/check-answers');
} else {
    res.redirect('/v4/solicited/address');
}

})

router.post('/v4/solicited/select-address', function (req, res) {

    var address = req.session.data['address'];

    if (address) {
        res.redirect('/v4/solicited/upload-document');
    } else {
        res.redirect('/v4/solicited/select-address');
    }

})

router.post('/v4/solicited/upload-document', function (req, res) {

res.redirect('/v4/solicited/documents-added');

})

router.post('/v4/solicited/documents-added', function (req, res) {

    res.redirect('/v4/solicited/check-your-answers');
    
})

router.post('/v4/solicited/check-your-answers', function (req, res) {

    res.redirect('/v4/solicited/confirmation-successful');
    
})


// ************
// UNSOLICITED
// ************

router.post('/v4/unsolicited/start-page', function (req, res) {

    res.redirect('/v4/unsolicited/which-service');

})

router.post('/v4/unsolicited/which-service', function (req, res) {

    var whichService = req.session.data['which-service'];

    if (whichService) {
        
        if (whichService == "Check if you have an NHS exemption") {
            res.redirect('/v4/unsolicited/nhs-exemptions');
        } else if (whichService == "Get help with NHS costs (including prescription prepayment certificates)") {
            res.redirect('/v4/unsolicited/help-with-nhs-costs');
        } else if (whichService == "NHS Student Services") {
            res.redirect('/v4/unsolicited/nhs-student-services');
        } else if (whichService == "NHS Pensions") {
            res.redirect('/v4/unsolicited/nhs-pensions');
        } else {
            res.redirect('/v4/unsolicited/query-type');
        }


    } else {
        res.redirect('/v4/unsolicited/which-service');
    }

})

router.post('/v4/unsolicited/nhs-exemptions', function (req, res) {

    var nhsExpemptions = req.session.data['nhs-exemptions'];

    if (nhsExpemptions == "Dental exemption") {
        res.redirect('/v4/unsolicited/query-type');
    } else if (nhsExpemptions == "Prescription exemption") {
        res.redirect('/v4/unsolicited/query-type');
    } else {
        res.redirect('/v4/unsolicited/nhs-exemptions');
    }

})

router.post('/v4/unsolicited/help-with-nhs-costs', function (req, res) {

    var helpWithNHSCosts = req.session.data['help-with-nhs-costs'];

    if (helpWithNHSCosts == "Low income scheme") {
        res.redirect('/v4/unsolicited/query-type');
    } else if (helpWithNHSCosts == "Maternity exemptions") {
        res.redirect('/v4/unsolicited/query-type');
    } else if (helpWithNHSCosts == "Medical exemptions") {
        res.redirect('/v4/unsolicited/query-type');
    } else if (helpWithNHSCosts == "Prescription prepayment certificate") {
        res.redirect('/v4/unsolicited/query-type');
    } else if (helpWithNHSCosts == "Tax Credit exemptions") {
        res.redirect('/v4/unsolicited/query-type');
    } else {
        res.redirect('/v4/unsolicited/help-with-nhs-costs');
    }

})

router.post('/v4/unsolicited/nhs-student-services', function (req, res) {

    var nhsStudentServices = req.session.data['nhs-student-services'];

    if (nhsStudentServices == "NHS Student Bursary") {
        res.redirect('/v4/unsolicited/query-type');
    } else if (nhsStudentServices == "Social Work Bursary") {
        res.redirect('/v4/unsolicited/query-type');
    } else if (nhsStudentServices == "Learning Support Fund") {
        res.redirect('/v4/unsolicited/query-type');
    } else {
        res.redirect('/v4/unsolicited/nhs-student-services');
    }

})

router.post('/v4/unsolicited/nhs-pensions', function (req, res) {

    var nhsPensions = req.session.data['nhs-pensions'];

    if (nhsPensions == "Employer") {
        res.redirect('/v4/unsolicited/query-type');
    } else if (nhsPensions == "Member") {
        res.redirect('/v4/unsolicited/query-type');
    } else if (nhsPensions == "Payroll") {
        res.redirect('/v4/unsolicited/query-type');
    } else {
        res.redirect('/v4/unsolicited/nhs-pensions');
    }

})

router.post('/v4/unsolicited/query-type', function (req, res) {

    var queryType = req.session.data['query-type'];
    var whichService = req.session.data['which-service'];
    var nhsExpemptions = req.session.data['nhs-exemptions'];
    var helpWithNHSCosts = req.session.data['help-with-nhs-costs'];
    var nhsStudentServices = req.session.data['nhs-student-services'];

    if (queryType) {

        if (queryType == "General query") {
            res.redirect('/v4/unsolicited/general/name');
        } else if (queryType == "Change of name, date of birth or address") {
            res.redirect('/v4/unsolicited/change/type-of-change');
        } else if (queryType == "Upload a document or evidence") {
            res.redirect('/v4/unsolicited/upload/reference-number-question');
        } else if (queryType == "None of the above") {

            if (whichService == "Apply for a job in the NHS (NHS Jobs)") {
                res.redirect('/v4/unsolicited/errors/nhs-jobs/contact-us');
            } else if (whichService == "Check if you have an NHS exemption") {

                if (nhsExpemptions == "Dental exemption") {
                    res.redirect('/v4/unsolicited/errors/decs/contact-us');
                } else if (nhsExpemptions == "Prescription exemption") {
                    res.redirect('/v4/unsolicited/errors/pecs/contact-us');
                } else {
                    res.redirect('/v4/unsolicited/errors/general');
                }

            } else if (whichService == "Get help to buy healthy food and milk (Healthy Start)") {
                res.redirect('/v4/unsolicited/errors/healthy-start/contact-us');
            } else if (whichService == "Get help with NHS costs (including prescription prepayment certificates)") {

                if (helpWithNHSCosts == "Low income scheme") {
                    res.redirect('/v4/unsolicited/errors/lis/contact-us');
                } else if (helpWithNHSCosts == "Maternity exemptions") {
                    res.redirect('/v4/unsolicited/errors/matex/contact-us');
                } else if (helpWithNHSCosts == "Medical exemptions") {
                    res.redirect('/v4/unsolicited/errors/medex/contact-us');
                } else if (helpWithNHSCosts == "Prescription prepayment certificate") {
                    res.redirect('/v4/unsolicited/errors/ppc/contact-us');
                } else if (helpWithNHSCosts == "Tax Credit exemptions") {
                    res.redirect('/v4/unsolicited/errors/tax-credits/contact-us');
                } else {
                    res.redirect('/v4/unsolicited/errors/general');
                }

            } else if (whichService == "NHS Student Services") {

                if (nhsStudentServices == "NHS Student Bursary") {
                    res.redirect('/v4/unsolicited/errors/sb/contact-us');
                } else if (nhsStudentServices == "Social Work Bursary") {
                    res.redirect('/v4/unsolicited/errors/swb/contact-us');
                } else if (nhsStudentServices == "Learning Support Fund") {
                    res.redirect('/v4/unsolicited/errors/lsf/contact-us');
                } else {
                    res.redirect('/v4/unsolicited/errors/general');
                }

            } else if (whichService == "NHS Pensions") {
                res.redirect('/v4/unsolicited/errors/pension/contact-us');
            } else if (whichService == "NHS Prescription Services (for healthcare professionals)") {
                res.redirect('/v4/unsolicited/errors/prescription-services/contact-us');
            } else if (whichService == "NHS Dental Services (for healthcare professionals)") {
                res.redirect('/v4/unsolicited/errors/dental-services/contact-us');
            } else {
                res.redirect('/v4/unsolicited/errors/general');
            }

        } else {
            res.redirect('/v4/unsolicited/query-type');
        }

    } else {
        res.redirect('/v4/unsolicited/query-type');
    }

})

// *******
// GENERAL
// *******

router.post('/v4/unsolicited/general/name', function (req, res) {

    var firstName = req.session.data['firstName'];
    var lastName = req.session.data['lastName'];

    if (firstName && lastName) {
        res.redirect('/v4/unsolicited/general/date-of-birth');
    } else {
        res.redirect('/v4/unsolicited/general/name');

    }

})

router.post('/v4/unsolicited/general/date-of-birth', function (req, res) {

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
  
        res.redirect('/v4/unsolicited/general/find-address')
      } else {
        res.redirect('/v4/unsolicited/general/date-of-birth')
      }
  
    } catch (err) {
  
      res.redirect('/v4/unsolicited/general/date-of-birth')
  
    }
  
  })

// Find your address

router.get('/v4/unsolicited/general/find-address', function (req, res) {

var postcodeLookup = req.session.data['postcode']

const regex = RegExp('^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$');

if (postcodeLookup) {

    if (regex.test(postcodeLookup) === true) {

        axios.get("https://api.os.uk/search/places/v1/postcode?postcode=" + postcodeLookup + "&key="+ process.env.POSTCODEAPIKEY)
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
            
            res.redirect('/v4/unsolicited/general/select-address')
        })
        .catch(error => {
            console.log(error);
            res.redirect('/v4/unsolicited/general/no-address-found')
        });

    }

} else {
    res.redirect('/v4/unsolicited/general/find-address')
}

})

router.post('/v4/unsolicited/general/address', function (req, res) {

var addressLine1 = req.session.data['address-line-1'];
var townOrCity = req.session.data['address-level2'];
var postcodeManual = req.session.data['address-postcode'];


if (addressLine1 && townOrCity && postcodeManual) {
    res.redirect('/v4/unsolicited/general/how-can-we-help');
} else {
    res.redirect('/v4/unsolicited/general/address');
}

})

router.post('/v4/unsolicited/general/select-address', function (req, res) {

    var address = req.session.data['address'];

    if (address) {
        res.redirect('/v4/unsolicited/general/how-can-we-help');
    } else {
        res.redirect('/v4/unsolicited/general/select-address');
    }

})

router.post('/v4/unsolicited/general/how-can-we-help', function (req, res) {

    var howCanWeHelp = req.session.data['how-can-we-help'];

    if (howCanWeHelp) {
        res.redirect('/v4/unsolicited/general/confirmation-successful');
    } else {
        res.redirect('/v4/unsolicited/general/how-can-we-help');
    }
    
})

// ******
// CHANGE
// ******

router.post('/v4/unsolicited/change/type-of-change', function (req, res) {

    var typeOfChange = req.session.data['type-of-change'];
    var whichService = req.session.data['which-service'];
    var nhsExpemptions = req.session.data['nhs-exemptions'];
    var helpWithNHSCosts = req.session.data['help-with-nhs-costs'];
    var nhsStudentServices = req.session.data['nhs-student-services'];

    if (typeOfChange) {

        if (typeOfChange == "Name") {
            res.redirect('/v4/unsolicited/change/name/previous-name');
        } else if (typeOfChange == "Address") {
            res.redirect('/v4/unsolicited/change/address/name');
        } else if (typeOfChange == "Date of birth") {
            res.redirect('/v4/unsolicited/change/date-of-birth/name');
        } else if (typeOfChange == "None of the above") {

            if (whichService == "Apply for a job in the NHS (NHS Jobs)") {
                res.redirect('/v4/unsolicited/errors/nhs-jobs/contact-us');
            } else if (whichService == "Check if you have an NHS exemption") {

                if (nhsExpemptions == "Dental exemption") {
                    res.redirect('/v4/unsolicited/errors/decs/contact-us');
                } else if (nhsExpemptions == "Prescription exemption") {
                    res.redirect('/v4/unsolicited/errors/pecs/contact-us');
                } else {
                    res.redirect('/v4/unsolicited/errors/general');
                }

            } else if (whichService == "Get help to buy healthy food and milk (Healthy Start)") {
                res.redirect('/v4/unsolicited/errors/healthy-start/contact-us');
            } else if (whichService == "Get help with NHS costs (including prescription prepayment certificates)") {

                if (helpWithNHSCosts == "Low income scheme") {
                    res.redirect('/v4/unsolicited/errors/lis/contact-us');
                } else if (helpWithNHSCosts == "Maternity exemptions") {
                    res.redirect('/v4/unsolicited/errors/matex/contact-us');
                } else if (helpWithNHSCosts == "Medical exemptions") {
                    res.redirect('/v4/unsolicited/errors/medex/contact-us');
                } else if (helpWithNHSCosts == "Prescription prepayment certificate") {
                    res.redirect('/v4/unsolicited/errors/ppc/contact-us');
                } else if (helpWithNHSCosts == "Tax Credit exemptions") {
                    res.redirect('/v4/unsolicited/errors/tax-credits/contact-us');
                } else {
                    res.redirect('/v4/unsolicited/errors/general');
                }

            } else if (whichService == "NHS Student Services") {

                if (nhsStudentServices == "NHS Student Bursary") {
                    res.redirect('/v4/unsolicited/errors/sb/contact-us');
                } else if (nhsStudentServices == "Social Work Bursary") {
                    res.redirect('/v4/unsolicited/errors/swb/contact-us');
                } else if (nhsStudentServices == "Learning Support Fund") {
                    res.redirect('/v4/unsolicited/errors/lsf/contact-us');
                } else {
                    res.redirect('/v4/unsolicited/errors/general');
                }

            } else if (whichService == "NHS Pensions") {
                res.redirect('/v4/unsolicited/errors/pension/contact-us');
            } else if (whichService == "NHS Prescription Services (for healthcare professionals)") {
                res.redirect('/v4/unsolicited/errors/prescription-services/contact-us');
            } else if (whichService == "NHS Dental Services (for healthcare professionals)") {
                res.redirect('/v4/unsolicited/errors/dental-services/contact-us');
            } else {
                res.redirect('/v4/unsolicited/errors/general');
            }

        } else {
            res.redirect('/v4/unsolicited/query-type');
        }

    } else {
        res.redirect('/v4/unsolicited/query-type');
    }

})


// NAME

router.post('/v4/unsolicited/change/name/previous-name', function (req, res) {

    var previousFirstName = req.session.data['previousFirstName'];
    var previousLastName = req.session.data['previousLastName'];

    if (previousFirstName && previousLastName) {
        res.redirect('/v4/unsolicited/change/name/date-of-birth');
    } else {
        res.redirect('/v4/unsolicited/change/name/previous-name');

    }

})

router.post('/v4/unsolicited/change/name/date-of-birth', function (req, res) {

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
  
        res.redirect('/v4/unsolicited/change/name/find-address')
      } else {
        res.redirect('/v4/unsolicited/change/name/date-of-birth')
      }
  
    } catch (err) {
  
      res.redirect('/v4/unsolicited/change/name/date-of-birth')
  
    }
  
  })

// Find your address

router.get('/v4/unsolicited/change/name/find-address', function (req, res) {

var postcodeLookup = req.session.data['postcode']

const regex = RegExp('^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$');

if (postcodeLookup) {

    if (regex.test(postcodeLookup) === true) {

        axios.get("https://api.os.uk/search/places/v1/postcode?postcode=" + postcodeLookup + "&key="+ process.env.POSTCODEAPIKEY)
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
            
            res.redirect('/v4/unsolicited/change/name/select-address')
        })
        .catch(error => {
            console.log(error);
            res.redirect('/v4/unsolicited/change/name/no-address-found')
        });

    }

} else {
    res.redirect('/v4/unsolicited/change/name/find-address')
}

})

router.post('/v4/unsolicited/change/name/address', function (req, res) {

var addressLine1 = req.session.data['address-line-1'];
var townOrCity = req.session.data['address-level2'];
var postcodeManual = req.session.data['address-postcode'];


if (addressLine1 && townOrCity && postcodeManual) {
    res.redirect('/v4/unsolicited/change/name/new-name');
} else {
    res.redirect('/v4/unsolicited/change/name/address');
}

})

router.post('/v4/unsolicited/change/name/select-address', function (req, res) {

    var address = req.session.data['address'];

    if (address) {
        res.redirect('/v4/unsolicited/change/name/new-name');
    } else {
        res.redirect('/v4/unsolicited/change/name/select-address');
    }

})

router.post('/v4/unsolicited/change/name/new-name', function (req, res) {

    var newFirstName = req.session.data['newFirstName'];
    var newLastName = req.session.data['newLastName'];

    if (newFirstName && newLastName) {
        res.redirect('/v4/unsolicited/change/name/confirm');
    } else {
        res.redirect('/v4/unsolicited/change/name/new-name');

    }

})

router.post('/v4/unsolicited/change/name/confirm', function (req, res) {
    res.redirect('/v4/unsolicited/change/name/confirmation-successful');
})

// DATE OF BIRTH

router.post('/v4/unsolicited/change/date-of-birth/name', function (req, res) {

    var firstName = req.session.data['firstName'];
    var lastName = req.session.data['lastName'];

    if (firstName && lastName) {
        res.redirect('/v4/unsolicited/change/date-of-birth/previous-date-of-birth');
    } else {
        res.redirect('/v4/unsolicited/change/date-of-birth/previous-name');
    }

})

router.post('/v4/unsolicited/change/date-of-birth/previous-date-of-birth', function (req, res) {

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
  
        res.redirect('/v4/unsolicited/change/date-of-birth/find-address')
      } else {
        res.redirect('/v4/unsolicited/change/date-of-birth/previous-date-of-birth')
      }
  
    } catch (err) {
  
      res.redirect('/v4/unsolicited/change/date-of-birth/previous-date-of-birth')
  
    }
  
  })

// Find your address

router.get('/v4/unsolicited/change/date-of-birth/find-address', function (req, res) {

var postcodeLookup = req.session.data['postcode']

const regex = RegExp('^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$');

if (postcodeLookup) {

    if (regex.test(postcodeLookup) === true) {

        axios.get("https://api.os.uk/search/places/v1/postcode?postcode=" + postcodeLookup + "&key="+ process.env.POSTCODEAPIKEY)
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

            res.redirect('/v4/unsolicited/change/date-of-birth/select-address')
        })
        .catch(error => {
            console.log(error);
            res.redirect('/v4/unsolicited/change/date-of-birth/no-address-found')
        });

    }

} else {
    res.redirect('/v4/unsolicited/change/date-of-birth/find-address')
}

})

router.post('/v4/unsolicited/change/date-of-birth/address', function (req, res) {

var addressLine1 = req.session.data['address-line-1'];
var townOrCity = req.session.data['address-level2'];
var postcodeManual = req.session.data['address-postcode'];


if (addressLine1 && townOrCity && postcodeManual) {
    res.redirect('/v4/unsolicited/change/date-of-birth/new-date-of-birth');
} else {
    res.redirect('/v4/unsolicited/change/date-of-birth/address');
}

})

router.post('/v4/unsolicited/change/date-of-birth/select-address', function (req, res) {

    var address = req.session.data['address'];

    if (address) {
        res.redirect('/v4/unsolicited/change/date-of-birth/new-date-of-birth');
    } else {
        res.redirect('/v4/unsolicited/change/date-of-birth/select-address');
    }

})

router.post('/v4/unsolicited/change/date-of-birth/new-date-of-birth', function (req, res) {

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
  
        res.redirect('/v4/unsolicited/change/date-of-birth/confirm')
      } else {
        res.redirect('/v4/unsolicited/change/date-of-birth/new-date-of-birth')
      }
  
    } catch (err) {
  
      res.redirect('/v4/unsolicited/change/date-of-birth/new-date-of-birth')
  
    }
  
  })


router.post('/v4/unsolicited/change/date-of-birth/confirm', function (req, res) {
    res.redirect('/v4/unsolicited/change/date-of-birth/confirmation-successful');
})

// ADDRESS

router.post('/v4/unsolicited/change/address/name', function (req, res) {

    var firstName = req.session.data['firstName'];
    var lastName = req.session.data['lastName'];

    if (firstName && lastName) {
        res.redirect('/v4/unsolicited/change/address/date-of-birth');
    } else {
        res.redirect('/v4/unsolicited/change/address/name');

    }

})

router.post('/v4/unsolicited/change/address/date-of-birth', function (req, res) {

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
  
        res.redirect('/v4/unsolicited/change/address/find-previous-address')
      } else {
        res.redirect('/v4/unsolicited/change/address/date-of-birth')
      }
  
    } catch (err) {
  
      res.redirect('/v4/unsolicited/change/address/date-of-birth')
  
    }
  
  })

// Find your previous address

router.get('/v4/unsolicited/change/address/find-previous-address', function (req, res) {

var postcodeLookupPrevious = req.session.data['postcodePrevious']

const regex = RegExp('^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$');

if (postcodeLookupPrevious) {

    if (regex.test(postcodeLookupPrevious) === true) {

        axios.get("https://api.os.uk/search/places/v1/postcode?postcode=" + postcodeLookupPrevious + "&key="+ process.env.POSTCODEAPIKEY)
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

            res.redirect('/v4/unsolicited/change/address/select-previous-address')
        })
        .catch(error => {
            console.log(error);
            res.redirect('/v4/unsolicited/change/address/no-previous-address-found')
        });

    }

} else {
    res.redirect('/v4/unsolicited/change/address/find-previous-address')
}

})

router.post('/v4/unsolicited/change/address/previous-address', function (req, res) {

var previousAddressLine1 = req.session.data['previous-address-line-1'];
var previousTownOrCity = req.session.data['previous-address-level2'];
var previousPostcodeManual = req.session.data['previous-address-postcode'];


if (previousAddressLine1 && previousTownOrCity && previousPostcodeManual) {
    res.redirect('/v4/unsolicited/change/address/name');
} else {
    res.redirect('/v4/unsolicited/change/address/previous-address');
}

})

router.post('/v4/unsolicited/change/address/select-previous-address', function (req, res) {

    var previousAddress = req.session.data['previousAddress'];

    if (previousAddress) {
        res.redirect('/v4/unsolicited/change/address/find-new-address');
    } else {
        res.redirect('/v4/unsolicited/change/address/select-previous-address');
    }

})

// Find your new address

router.get('/v4/unsolicited/change/address/find-new-address', function (req, res) {

    var postcodeLookupNew = req.session.data['postcodeNew']
    
    const regex = RegExp('^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$');
    
    if (postcodeLookupNew) {
    
        if (regex.test(postcodeLookupNew) === true) {
    
            axios.get("https://api.os.uk/search/places/v1/postcode?postcode=" + postcodeLookupNew + "&key="+ process.env.POSTCODEAPIKEY)
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

                res.redirect('/v4/unsolicited/change/address/select-new-address')
            })
            .catch(error => {
                console.log(error);
                res.redirect('/v4/unsolicited/change/address/no-new-address-found')
            });
    
        }
    
    } else {
        res.redirect('/v4/unsolicited/change/address/find-new-address')
    }
    
    })
    
    router.post('/v4/unsolicited/change/address/new-address', function (req, res) {
    
    var newAddressLine1 = req.session.data['new-address-line-1'];
    var newTownOrCity = req.session.data['new-address-level2'];
    var newPostcodeManual = req.session.data['new-address-postcode'];
    
    
    if (newAddressLine1 && newTownOrCity && newPostcodeManual) {
        res.redirect('/v4/unsolicited/change/address/name');
    } else {
        res.redirect('/v4/unsolicited/change/address/new-address');
    }
    
    })
    
    router.post('/v4/unsolicited/change/address/select-new-address', function (req, res) {
    
        var newAddress = req.session.data['newAddress'];
    
        if (newAddress) {
            res.redirect('/v4/unsolicited/change/address/confirm');
        } else {
            res.redirect('/v4/unsolicited/change/address/select-new-address');
        }
    
    })

router.post('/v4/unsolicited/change/address/confirm', function (req, res) {
    res.redirect('/v4/unsolicited/change/address/confirmation-successful');
})

// UPLOAD

router.post('/v4/unsolicited/upload/reference-number-question', function (req, res) {

    var referenceNumberQuestion = req.session.data['reference-number-question'];

    if (referenceNumberQuestion == "Yes") {
        res.redirect('/v4/unsolicited/upload/reference-number');
    } else if (referenceNumberQuestion == "No") {
        res.redirect('/v4/unsolicited/upload/name');
    } else {
        res.redirect('/v4/unsolicited/upload/reference-number-question');

    }

})

router.post('/v4/unsolicited/upload/reference-number', function (req, res) {

    var referenceNumber = req.session.data['reference-number'];

    if (referenceNumber) {
        res.redirect('/v4/unsolicited/upload/name');
    } else {
        res.redirect('/v4/unsolicited/upload/reference-number');
    }

})

router.post('/v4/unsolicited/upload/name', function (req, res) {

    var firstName = req.session.data['firstName'];
    var lastName = req.session.data['lastName'];

    if (firstName && lastName) {
        res.redirect('/v4/unsolicited/upload/date-of-birth');
    } else {
        res.redirect('/v4/unsolicited/upload/name');

    }

})

router.post('/v4/unsolicited/upload/date-of-birth', function (req, res) {

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
  
        res.redirect('/v4/unsolicited/upload/find-address')
      } else {
        res.redirect('/v4/unsolicited/upload/date-of-birth')
      }
  
    } catch (err) {
  
      res.redirect('/v4/unsolicited/upload/date-of-birth')
  
    }
  
  })

// Find your address

router.get('/v4/unsolicited/upload/find-address', function (req, res) {

var postcodeLookup = req.session.data['postcode']

const regex = RegExp('^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$');

if (postcodeLookup) {

    if (regex.test(postcodeLookup) === true) {

        axios.get("https://api.os.uk/search/places/v1/postcode?postcode=" + postcodeLookup + "&key="+ process.env.POSTCODEAPIKEY)
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

            res.redirect('/v4/unsolicited/upload/select-address')
        })
        .catch(error => {
            console.log(error);
            res.redirect('/v4/unsolicited/upload/no-address-found')
        });

    }

} else {
    res.redirect('/v4/unsolicited/upload/find-address')
}

})

router.post('/v4/unsolicited/upload/address', function (req, res) {

var addressLine1 = req.session.data['address-line-1'];
var townOrCity = req.session.data['address-level2'];
var postcodeManual = req.session.data['address-postcode'];


if (addressLine1 && townOrCity && postcodeManual) {
    res.redirect('/v4/unsolicited/upload/check-answers');
} else {
    res.redirect('/v4/unsolicited/upload/address');
}

})

router.post('/v4/unsolicited/upload/select-address', function (req, res) {

    var address = req.session.data['address'];

    if (address) {
        res.redirect('/v4/unsolicited/upload/upload-document');
    } else {
        res.redirect('/v4/unsolicited/upload/select-address');
    }

})

router.post('/v4/unsolicited/upload/upload-document', function (req, res) {

res.redirect('/v4/unsolicited/upload/documents-added');

})

router.post('/v4/unsolicited/upload/documents-added', function (req, res) {

    res.redirect('/v4/unsolicited/upload/confirmation-successful');
    
})



module.exports = router;