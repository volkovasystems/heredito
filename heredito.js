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
			"apiqe": "apiqe",
			"budge": "budge",
			"dictate": "dictate",
			"falzy": "falzy",
			"firs": "firs",
			"leveld": "leveld",
			"protype": "protype",
			"rder": "rder",
			"reclas": "reclas",
			"sepby": "sepby",
			"wauker": "wauker",
			"x10cv": "x10cv"
		}
	@end-include
*/

const apiqe = require( "apiqe" );
const budge = require( "budge" );
const dictate = require( "dictate" );
const falzy = require( "falzy" );
const firs = require( "firs" );
const leveld = require( "leveld" );
const protype = require( "protype" );
const rder = require( "rder" );
const reclas = require( "reclas" );
const sepby = require( "sepby" );
const wauker = require( "wauker" );
const x10cv = require( "x10cv" );

const connect = require( "./connect.js" );
const inherit = require( "./inherit.js" );

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

	parent = budge( arguments ).filter( ( parameter ) => protype( parameter, FUNCTION ) );

	let order = rder( parent, "name" );

	parent = leveld( parent.map( wauker ) ).map( ( blueprint ) => reclas( blueprint ) );

	child = wauker( child ).map( ( blueprint ) => reclas( blueprint ) );

	parent = dictate( parent.concat( budge( child ) ), order, "name" );

	let tree = apiqe( firs( child ), parent ).reverse( );

	return sepby( tree, ( blueprint ) => x10cv( blueprint ) )
		.reduce( ( parent, child ) => inherit( child, parent, connect( ) ) );
};

module.exports = heredito;
