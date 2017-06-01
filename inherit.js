"use strict";

/*;
	@submodule-license:
		The MIT License (MIT)
		@mit-license

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
	@end-submodule-license

	@submodule-configuration:
		{
			"package": "heredito",
			"path": "heredito/inherit.js",
			"file": "inherit.js",
			"module": "heredito",
			"author": "Richeve S. Bebedor",
			"contributors": [
				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>"
			],
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/heredito.git",
			"test": "heredito-test.js",
			"global": false,
			"internal": true
		}
	@end-submodule-configuration

	@submodule-documentation:
		Inheritance procedure.
	@end-submodule-documentation

	@include:
		{
			"clazof": "clazof",
			"falzy": "falzy",
			"kein": "kein",
			"metod": "metod",
			"protype": "protype"
		}
	@end-include
*/

const clazof = require( "clazof" );
const falzy = require( "falzy" );
const kein = require( "kein" );
const metod = require( "metod" );
const protype = require( "protype" );

const inherit = function inherit( child, parent, connector ){
	/*;
		@meta-configuration:
			{
				"child:required": "function",
				"parent:required": "function",
				"connector:required": "function"
			}
		@end-meta-configuration
	*/

	if( falzy( child ) || !protype( child, FUNCTION ) ){
		throw new Error( "invalid child" );
	}

	if( falzy( parent ) || !protype( parent, FUNCTION ) ){
		throw new Error( "invalid parent" );
	}

	if( falzy( connector ) ||
		!protype( connector, FUNCTION ) ||
		!clazof( connector, "Connector" ) )
	{
		throw new Error( "invalid connector" );
	}

	if( kein( "connector", parent ) && clazof( parent.connector, "Connector" ) ){
		parent.connector.flush( );
	}

	if( kein( "connector", child ) && clazof( child.connector, "Connector" ) ){
		connector = child.connector;

		connector.reset( );
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
			"configurable": true
		}
	} );

	/*;
		@note:
			Attach the parent to the connector.
		@end-note
	*/
	connector.prototype.parent = parent;

	let cache = [ ];
	metod( child.prototype ).forEach( ( method ) => cache.push( method ) );

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
			"configurable": true
		}
	} );

	/*;
		@note:
			Transfer the cached properties back to the child.
		@end-note
	*/
	cache.forEach( ( method ) => ( child.prototype[ method.name ] = method ) );

	child.connector = connector;
	child.parent = parent;

	connector.register( child ).push( parent ).trace( parent );

	return child;
};

module.exports = inherit;
