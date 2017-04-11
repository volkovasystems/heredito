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
const harden = require( "harden" );
const protype = require( "protype" );
const wichevr = require( "wichevr" );

const connect = require( "./connect.js" );
const inherit = require( "./inherit.js" );

const METHOD_CACHE = Symbol( "method-cache" );

const cacheMethod = function cacheMethod( blueprint ){
	/*;
		@meta-configuration:
			{
				"blueprint:required": "function"
			}
		@end-meta-configuration
	*/

	if( falzy( blueprint ) || !protype( blueprint, FUNCTION ) ){
		throw new Error( "invalid blueprint" );
	}

	let cache = wichis( blueprint[ METHOD_CACHE ], [ ] );
	harden( METHOD_CACHE, cache, blueprint );

	if( arid( cache ) ){
		metis( blueprint.prototype ).forEach( ( method ) => nsrt( cache, method ) );
	}

	Object.getOwnPropertyNames( blueprint.prototype )
		.forEach( ( property ) => ( !( /^[A-Z_][A-Z0-9_]+$/ ).test( property ) &&
			protype( blueprint.prototype[ property ], FUNCTION ) &&
			nsrt( cache, blueprint.prototype[ property ] ) ) );

	return blueprint;
};

const heredito = function heredito( child, parent ){
	/*;
		@meta-configuration:
			{
				"child:required": "function",
				"parent:required": [
					"function",
					"[function]",
					"...function"
				]
			}
		@end-meta-configuration
	*/

	if( falzy( child ) || !protype( child, FUNCTION ) ){
		throw new Error( "invalid child" );
	}

	if( falzy( parent ) || !protype( parent, FUNCTION ) ){
		throw new Error( "invalid parent" );
	}

	if( falzy( child.prototype ) || !protype( child.prototype, OBJECT ) ){
		throw new Error( "child must have a prototype" );
	}

	if( falzy( parent.prototype ) || !protype( parent.prototype, OBJECT ) ){
		throw new Error( "parent must have a prototype" );
	}

	cacheMethod( child );
	cacheMethod( parent );

	let childTree = wauker( child );
	let parentTree = wauker( parent );

	inherit( child, parent, connect( ) );

	return child;
};

module.exports = heredito;
