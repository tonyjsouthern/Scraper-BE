# Scraper BE
This is a node.js application that checks domains for tracking scripts present from the following companies:

It allows a user to input a web-address and runs a check to see if tracking scripts from any of the following companies are present:  

* Marketo
* ActOn
* Salesfusion
* Google
* ClickDimensions
* Pardot

The live URL for this site can be found at:  
https://powerful-island-56445.herokuapp.com/

## Routes

##### Base URL:
https://powerful-island-56445.herokuapp.com/

##### /single-domain
Takes a single domain with the http:// or https:// prefix and checks for the above tracking scipts. Returns an object with True of False values. The submission object must have "domain".

Ex:
```
{
	"domain" : "http://iheartcamo.com"
}
```

## Improvements
I will be adding Hubspot to the list of tracking scripts that will be checked.
