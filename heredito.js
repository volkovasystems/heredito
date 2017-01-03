"use strict";

/*;
	@module-license:
		The MIT License (MIT)

		Copyright (@c) 2017 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"package": "heredito",
			"path": "heredito/heredito.js",
			"file": "heredito.js",
			"module": "heredito",
			"author": "Richeve S. Bebedor",
			"contributors": [
				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>"
			],
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "git@github.com:volkovasystems/heredito.git",
			"test": "heredito-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Extensive inheritance.
	@end-module-documentation

	@include:
		{
			"ate": "ate",
			"een": "een",
			"harden": "harden",
			"protype": "protype"
		}
	@end-include
*/

//: @support-module:
	//: @reference: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/create
	if(typeof Object.create!="function"){Object.create=(function module(){function Temp(){}
	let hasOwn=Object.prototype.hasOwnProperty;return function module(O){if(typeof O!="object"){
	throw TypeError("Object prototype may only be an Object or null")}
	Temp.prototype=O;let obj=new Temp();Temp.prototype=null;if(arguments.length>1){
	let Properties=Object(arguments[1]);for(let prop in Properties){
	if(hasOwn.call(Properties,prop)){obj[prop]=Properties[prop]}}}return obj}})()}
//: @end-support-module

const ate = require( "ate" );
const een = require( "een" );
const harden = require( "harden" );
const protype = require( "protype" );

const heredito = function heredito( child, parent ){
	/*;
		@meta-configuration:
			{
				"child:required": "function",
				"parent:required": "function"
			}
		@end-meta-configuration
	*/

	if( !protype( child, FUNCTION ) ){
		throw new Error( "invalid child" );
	}

	if( !protype( parent, FUNCTION ) ){
		throw new Error( "invalid parent" );
	}

	if( !protype( child.prototype, OBJECT ) ){
		throw new Error( "child must have a prototype" );
	}

	if( !protype( parent.prototype, OBJECT ) ){
		throw new Error( "parent must have a prototype" );
	}

	let connector = parent.connector || function connector( ){ };

	//: @note: Rename the connector to make it look like the child.
	ate( "name", child.name, connector );

	//: Inherit the parent to the connector.
	connector.prototype = Object.create( parent.prototype, {
		"constructor": {
			"value": parent,
			"enumerable": false,
			"writable": true,
			"configurable": false
		}
	} );

	//: @note: Attach the parent to the connector.
	connector.prototype.parent = parent;

	let cache = { };
	let list = Object.getOwnPropertyNames( child.prototype );
	let length = list.length;
	for( let index = 0; index < length; index++ ){
		let property = list[ index ];

		if( child.prototype.hasOwnProperty( property ) ){
			/*;
				@note:
					We need to do this because we don't want to override the child prototype.
				@end-note
			*/
			cache[ property ] = child.prototype[ property ];
		}
	}

	//: @note: Inherit from the connector. This will override the prototype.
	child.prototype = Object.create( connector.prototype, {
		"constructor": {
			"value": child,
			"enumerable": false,
			"writable": true,
			"configurable": false
		}
	} );

	//: @note: Transfer the cached properties back to the child.
	for( let property in cache ){
		child.prototype[ property ] = cache[ property ];
	}

	harden( "connector", connector, child );
	let inheritance = connector.inheritance = connector.inheritance || [ ];
	if( !een( inheritance, child ) ){
		connector.inheritance.push( child );
	}

	return child;
};

module.exports = heredito;
