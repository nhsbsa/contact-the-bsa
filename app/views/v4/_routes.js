// ********************************
// CCS (VERSION 4)
// ********************************

// External dependencies
const express = require('express');
const { DateTime } = require("luxon");
const router = express.Router();

// API
const axios = require('axios');

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
            req.session.data['addresses'] = addresses;
            console.log(addresses);
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

router.post('/v4/solicited/upload-document', function (req, res) {

res.redirect('/v4/solicited/upload-document');

})

module.exports = router;