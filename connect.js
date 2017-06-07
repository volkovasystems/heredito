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
			"clazof": "clazof",
			"diatom": "diatom",
			"een": "een",
			"erode": "erode",
			"falzy": "falzy",
			"kein": "kein",
			"meton": "meton",
			"ngrave": "ngrave",
			"ntrprt": "ntrprt",
			"protype": "protype",
			"statis": "statis",
			"truly": "truly"
		}
	@end-include
*/

const clazof = require( "clazof" );
const diatom = require( "diatom" );
const een = require( "een" );
const erode = require( "erode" );
const falzy = require( "falzy" );
const kein = require( "kein" );
const meton = require( "meton" );
const ngrave = require( "ngrave" );
const ntrprt = require( "ntrprt" );
const protype = require( "protype" );
const statis = require( "statis" );
const truly = require( "truly" );

const INHERITANCE = Symbol( "inheritance" );
const CHILD = Symbol( "child" );

const connect = function connect( ){
	let Connector = diatom( "Connector" );

	statis( Connector )

		.attach( INHERITANCE, [ ] )

		.implement( "flush", function flush( ){
			let inheritance = ntrprt( INHERITANCE, this );

			while( inheritance.length ){
				inheritance.pop( );
			}

			return this;
		} )

		.implement( "reset", function reset( ){
			meton( this.prototype ).forEach( ( method ) => ( delete this.prototype[ method ] ) )

			this.flush( );

			erode( CHILD, this );

			return this;
		} )

		.implement( "push", function push( parent ){
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

			let inheritance = ntrprt( INHERITANCE, this );

			/*;
				@note:
					Accumulate parent to the connector.
				@end-note
			*/
			do{
				if( !een( inheritance, parent ) ){
					inheritance.push( parent );
				}

			}while( truly( parent = parent.prototype.parent ) );

			return this;
		} )

		.implement( "trace", function trace( parent ){
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

			if( kein( "connector", parent ) && clazof( parent.connector, "Connector" ) ){
				ntrprt( INHERITANCE, parent.connector ).forEach( ( ancestor ) => this.push( ancestor ) );
			}

			return this;
		} )

		.implement( "register", function register( child ){
			/*;
				@meta-configuration:
					{
						"child:required": "function"
					}
				@end-meta-configuration
			*/

			if( falzy( child ) || !protype( child, FUNCTION ) ){
				throw new Error( "invalid child class" );
			}

			ngrave( CHILD, this, child );

			return this;
		} );

	return Connector;
};

module.exports = connect;
