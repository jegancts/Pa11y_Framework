// An example of executing some actions before Pa11y runs.
// This example logs in to a fictional site then waits
// until the account page has loaded before running Pa11y
'use strict';

const pa11y = require('../..');
const htmlReporter = require('pa11y-reporter-html');

runMadisonLoginPage();


// Async function required for us to use await
async function runMadisonLoginPage() {
	const htmlReporter = require('pa11y-reporter-html');
	
	var propertiesReader = require('properties-reader');
    var properties = propertiesReader('./test.properties');

	const url = properties.get('Loginpage.loginUrl');

	try {
        		// Test http://example.com/
		const result = await pa11y(url, {

			// Log what's happening to the console
			log: {
				debug: console.log,
				error: console.error,
				info: console.log
			}
			
		});

		// Output the raw result object
			
		const html = await htmlReporter.results(result, url);
		console.log(html);
	} catch (error) {

		// Output an error if it occurred
		console.error(error.message);

	}
	
}

runMadisonHomePage();
// Async function required for us to use await
async function runMadisonHomePage() {
	const htmlReporter = require('pa11y-reporter-html');
	var propertiesReader = require('properties-reader');
    var properties = propertiesReader('./test.properties');

	const loginurl = properties.get('Loginpage.loginUrl');
	const uName = properties.get('Homepage.username');
	const pWord = properties.get('Homepage.password');
	const url = properties.get('Homepage.homeUrl');
	try {
		// Test http://example.com/
		const result = await pa11y(loginurl, {
			
			// Run some actions before the tests
			actions: [
				'screen capture TestReports/before-login.png',
				'set field #email to ' +uName,
			//	'set field #email to admin@gmail.com',
			    'set field #pass to ' +pWord,
			//	'set field #pass to adminsat',/
				'click element #send2',
				"screen capture TestReports/after-login.png",
				'wait for url to be ' +url
			//	'wait for url to be http://demo-store.seleniumacademy.com/customer/account/'
			],

			// Log what's happening to the console
			log: {
				debug: console.log,
				error: console.error,
				info: console.log
			}

		});

		// Output the raw result object
		console.log(result);
		const html = await htmlReporter.results(result, url);
		console.log(html);
		console.log(uName);
		console.log(pWord);

	} catch (error) {

		// Output an error if it occurred
		console.error(error.message);

	}

	
}