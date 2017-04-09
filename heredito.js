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
			"protype": "protype",
			"wichevr": "wichevr"
		}
	@end-include
*/

const ate = require( "ate" );
const een = require( "een" );
const harden = require( "harden" );
const protype = require( "protype" );
const wichevr = require( "wichevr" );

const connect = require( "./connect.js" );
const PUSH = Symbol.for( "push" );

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



	let connector = wichevr( child.connector, connect( ) );

	/*;
		@note:
			Rename the connector to make it look like the child.
		@end-note
	*/
	if( connector.name !== child.name ){
		ate( "name", child.name, connector );
	}

	/*;
		@note:
			Inherit the parent to the connector.
		@end-note
	*/
	connector.prototype = Object.create( parent.prototype, {
		"constructor": {
			"value": parent,
			"enumerable": false,
			"writable": true,
			"configurable": false
		}
	} );

	/*;
		@note:
			Attach the parent to the connector.
		@end-note
	*/
	connector.prototype.parent = parent;

	let cache = { };
	Object.getOwnPropertyNames( child.prototype ).forEach( ( property ) => {
		/*;
			@note:
				We will not cache constants, and non-functions.
			@end-note
		*/
		if( !( /^[A-Z_][A-Z0-9_]+$/ ).test( property ) &&
			protype( child.prototype[ property ], FUNCTION ) )
		{
			/*;
				@note:
					We need to do this because we don't want to override the child prototype.
				@end-note
			*/
			cache[ property ] = child.prototype[ property ];
		}
	} );

	/*;
		@note:
			Inherit from the connector. This will override the prototype.
		@end-note
	*/
	child.prototype = Object.create( connector.prototype, {
		"constructor": {
			"value": child,
			"enumerable": false,
			"writable": true,
			"configurable": false
		}
	} );

	/*;
		@note:
			Transfer the cached properties back to the child.
		@end-note
	*/
	Object.getOwnPropertyNames( cache ).forEach( ( property ) => {
		child.prototype[ property ] = cache[ property ];
	} );

	harden( "connector", connector, child );
	let inheritance = connector.inheritance = wichevr( connector.inheritance, [ ] );
	if( !een( inheritance, parent ) ){
		connector.inheritance.push( parent );
	}

	return child;
};

module.exports = heredito;
