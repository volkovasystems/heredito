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
			"falzy": "falzy",
			"protype": "protype"
		}
	@end-include
*/

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

	child.connector = connector;
	child.parent = parent;

	child.connector.push( parent );

	return child;
};

module.exports = inherit;
