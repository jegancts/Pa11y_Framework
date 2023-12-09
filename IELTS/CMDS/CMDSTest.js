// An example of executing some actions before Pa11y runs.
// This example logs in to a fictional site then waits
// until the account page has loaded before running Pa11y
'use strict';

const pa11y = require('../../lib/pa11y');
const htmlReporter = require('pa11y-reporter-html');

runCMDSLoginPage();

// Async function required for us to use await
async function runCMDSLoginPage() {
	const htmlReporter = require('pa11y-reporter-html');
	
	var propertiesReader = require('properties-reader');
    var properties = propertiesReader('./test.properties');

	const loginUrl = properties.get('CMDSLoginpage.loginUrl');

	try {
        		// Test http://example.com/
		const result = await pa11y(loginUrl, {
			actions: [
				'screen capture TestReports/LoginPage.png'
			],

			// Log what's happening to the console
	/*		log: {
				debug: console.log,
				error: console.error,
				info: console.log
			}  */
			
		});

		// Output the raw result object
			
		const html = await htmlReporter.results(result, loginUrl);
		console.log(html);

	} catch (error) {

		// Output an error if it occurred
		console.error(error.message);

	}
	
}

runCMDSHomePage();
// Async function required for us to use await
async function runCMDSHomePage() {
	const htmlReporter = require('pa11y-reporter-html');
	var propertiesReader = require('properties-reader');
    var properties = propertiesReader('./test.properties');

	const loginUrl = properties.get('CMDSLoginpage.loginUrl');
	const uName = properties.get('CMDSHomepage.username');
	const pWord = properties.get('CMDSHomepage.password');
	const homeUrl = properties.get('CMDSHomepage.homeUrl');
	try {
		// Test http://example.com/
		const result = await pa11y(loginUrl, {
			
			// Run some actions before the tests
			actions: [
			//	'screen capture TestReports/LoginPage.png',
				'set field #email to ' +uName,
				'set field #password to ' +pWord,
				"screen capture TestReports/LoginPagewithData.png",
				'click element #btn-login',
				'wait for element #manageUserDetailsContainer to be visible',
				"screen capture TestReports/HomePage.png"
			],

			// Log what's happening to the console
		/*	log: {
			//	debug: console.log,
			//	error: console.error,
				info: console.log
			} */

		});

		// Output the raw result object
	//	console.log(result);
		const html = await htmlReporter.results(result, homeUrl);
		console.log(html);
	//	console.log(uName);
	//	console.log(pWord);

	} catch (error) {

		// Output an error if it occurred
		console.error(error.message);

	}

runCMDSManageTT();
// Async function required for us to use await
async function runCMDSManageTT() {
	const htmlReporter = require('pa11y-reporter-html');
	var propertiesReader = require('properties-reader');
    var properties = propertiesReader('./test.properties');

	const loginUrl = properties.get('CMDSLoginpage.loginUrl');
	const uName = properties.get('CMDSHomepage.username');
	const pWord = properties.get('CMDSHomepage.password');
	const manageTTUrl = properties.get('CMDSHomepage.ManageTTUrl');
	try {
		// Test http://example.com/
		const result = await pa11y(loginUrl, {
			
			// Run some actions before the tests
			actions: [
			//	'screen capture TestReports/before-login.png',
				'set field #email to ' +uName,
			    'set field #password to ' +pWord,
				'click element #btn-login',
				'wait for element #manageTestTakerContainer to be visible',
				'click element #manageTestTakerContainer',
				'wait for element #title to be visible',
				'screen capture TestReports/TestTakerPage.png'
			],

			// Log what's happening to the console
		/*	log: {
			//	debug: console.log,
			//	error: console.error,
				info: console.log
			} */

		});

		// Output the raw result object
	//	console.log(result);
		const html = await htmlReporter.results(result, manageTTUrl);
		console.log(html);
	//	console.log(uName);
	//	console.log(pWord);

	} catch (error) {

		// Output an error if it occurred
		console.error(error.message);

	}
}

	
}