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
			"path": "heredito/connect.js",
			"file": "connect.js",
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
		Connector class factory.
	@end-submodule-documentation

	@include:
		{
			"diatom": "diatom",
			"een": "een",
			"falzy": "falzy",
			"protype": "protype",
			"statis": "statis"
		}
	@end-include
*/

const diatom = require( "diatom" );
const een = require( "een" );
const falzy = require( "falzy" );
const protype = require( "protype" );
const statis = require( "statis" );

const INHERITANCE = Symbol( "inheritance" );

const connect = function connect( ){
	let Connector = diatom( "Connector" );

	statis( Connector )
		.attach( INHERITANCE, [ ] )
		.attach( "push", function push( parent ){
			/*;
				@meta-configuration:
					{
						"parent:required": "function"
					}
				@end-meta-configuration
			*/
			if( falzy( parent ) || !protype( parent, FUNCTION ) ){
				throw new Error( "invalid parent class" );
			}

			if( !een( Connector[ INHERITANCE ], parent ) ){
				Connector[ INHERITANCE ].push( parent );
			}

			/*;
				@note:
					Accumulate parent to the connector.
				@end-note
			*/
			while( truly( parent = parent.prototype.parent ) ){
				Connector.push( parent );
			}

			return Connector;
		} );

	return Connector;
};

module.exports = connect;
