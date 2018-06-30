var https = require("https");
const axios = require("axios");
var bodyParser = require("body-parser");
const express = require("express");
var path = require('path');

// ADD HUBSPOT

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/public'))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

class SingleSite {
  constructor(site) {

    this.site = site;
    this.sf = false;
    this.marketo = false;
    this.actOn = false;
    this.clickDimensions = false;
    this.pardot = false;
    this.google = false;
    this.hubspot = false;

    // API call to load website and then run script checks
    this.loadSite = axios.get(site)
      .then(response => {
        var data = response;
        this.checkSF(data);
        this.checkMarketo(data);
        this.CheckActon(data);
        this.checkClickDimensions(data);
        this.checkPardot(data);
        this.checkGoogle(data);
        this.checkHubspot(data);
      })
      .catch(error => {
        console.log(error);
      });

    // Check for Salesfusion tracking script
    this.checkSF = function(res) {
      var data = res.data;
      console.log("SF Check running...");
      if (data.indexOf("sf_config") != -1 || data.indexOf("frt(") != -1) {
        this.sf = true;
      }
    }

    this.checkHubspot = function(res) {
      var data = res.data;
      console.log("Hubspot Check running...");
      if (data.indexOf("hs-scripts.com") != -1) {
        this.hubspot = true;
      }
    }

    // Check for Marketo Tracking script
    this.checkMarketo = function(res) {
      var data = res.data;
      console.log("Marketo check running...");
      if (data.indexOf('munchkin') != -1) {
        this.marketo = true;
      }
    }

    // Check for Acton Tracking Script
    this.CheckActon = function(res) {
      var data = res.data;
      console.log("ActOn check running...");
      if (data.indexOf('acton') != -1) {
        this.actOn = true;
      }
    }

    // Check for ClickDimensions Scripts
    this.checkClickDimensions = function(res) {
      var data = res.data;
      console.log("Click Dimensions check running...");
      if (data.indexOf('clickdimensions') != -1) {
        this.clickDimensions = true;
      }
    }

    // Check for pardot tracking scripts
    this.checkPardot = function(res) {
      var data = res.data;
      console.log("Pardot check running...");
      if (data.indexOf('pardot') != -1) {
        this.pardot = true;
      }
    }

    // Check for google analytics
    this.checkGoogle = function(res) {
      var data = res.data;
      console.log("Google check running...");
      if (data.indexOf('GoogleAnalytics') != -1) {
        this.google = true;
      }
    }

    // end cass
  }
}

// rewrite this so that it takes the domain as a URL parmeter instead of a hard defined variable called domain
app.post("/single-domain", function(req, res) {
  let domain = req.body.domain;
  var singleSite = new SingleSite(domain);
  new Promise(function(resolve, reject) {
    var load = singleSite.loadSite
    resolve(load);
  }).then(function() {
    res.send(singleSite)
  })
})



app.listen(process.env.PORT || 5000)
