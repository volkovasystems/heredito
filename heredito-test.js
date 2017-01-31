"use strict";

const heredito = require( "./heredito.js" );

const Sms = function getAvailableTemplate( ){

	console.log( "sms template" );

};

const Email = function getAvailableTemplate( ){

	console.log( "email template" );

};

heredito( Sms, Email );
