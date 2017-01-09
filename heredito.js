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
		This is just a copy of NodeJS util.heredito method.

		With additional enhancements.
			1. Use parent instead of super reserved word for better usage.
			2. Has backward compatibility.
			3. A dummy class is inserted between child and parent.
				3.1. Prototype properties can be shared even before declaration.
				3.2. Prototype properties is overriden through dummy class.

		Please refer to their documentation.
		@link:https://nodejs.org/api/util.html#util_util_inherits_constructor_superconstructor
	@end-module-documentation

	@include:
		{
			"ate": "ate",
			"harden": "harden",
			"protype": "protype",
			"raze": "raze"
		}
	@end-include
*/

//: @support-module:
	//: @reference: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/create
	"function"!=typeof Object.create&&(Object.create=function(t){var e=function(){};
	return function(n,r){if(n!==Object(n)&&null!==n)throw TypeError("Argument must be an object, or null");
	e.prototype=n||{};var o=new e;return e.prototype=null,r!==t&&Object.defineProperties(o,r),
	null===n&&(o.__proto__=null),o}}());
//: @end-support-module

const ate = require( "ate" );
const harden = require( "harden" );
const protype = require( "protype" )
const raze = require( "raze" );

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

	let connector = function connector( ){ };
	//: Rename the connector to make it look like the child.
	ate( "name", child.name, connector );

	//: Inherit the parent.
	connector.prototype = Object.create( parent.prototype, {
		"constructor": {
			"value": parent,
			"enumerable": false,
			"writable": true,
			"configurable": false
		}
	} );

	//: Attach the parent to the connector.
	connector.prototype.parent = parent;

	let childCache = { };
	let childProperty = Object.getOwnPropertyNames( child.prototype );
	let childPropertyLength = childProperty.length;
	for( let index = 0; index < childPropertyLength; index++ ){
		let property = childProperty[ index ];

		/*;
			@note:
				We will not cache constants, and non-functions.
			@end-note
		*/
		if( !( /^[A-Z_][A-Z0-9_]+$/ ).test( property ) &&
			protype( child.prototype[ property ], FUNCTION ) &&
			child.prototype.hasOwnProperty( property ) )
		{
			/*;
				@note:
					We need to do this because we don't want to override the child prototype.
				@end-note
			*/
			childCache[ property ] = child.prototype[ property ];
		}
	}

	child.prototype = Object.create( connector.prototype, {
		"constructor": {
			"value": child,
			"enumerable": false,
			"writable": true,
			"configurable": false
		}
	} );

	//: Transfer the cached properties back to the child.
	for( let property in childCache ){
		child.prototype[ property ] = childCache[ property ];
	}

	child.prototype.root = function root( depth ){
		let ancestor = [ ];

		let parent = this.constructor.prototype.parent;
		while( parent ){
			ancestor.push( parent );

			parent = parent.prototype.parent;
		}

		if( depth >= ancestor.length || depth < 0 ){
			throw new Error( "root overflow" );
		}

		ancestor = ancestor.reverse( )[ depth ];

		let scope = { };
		let ancestorProperty = Object.getOwnPropertyNames( ancestor.prototype );
		ancestorProperty.forEach( ( function onEachProperty( method ){
			if( method != "constructor" &&
				method != "parent" &&
				method != "level" &&
				protype( ancestor.prototype[ method ], FUNCTION ) )
			{
				let procedure = ancestor.prototype[ method ];

				let delegate = ( function delegate( ){
					let result = procedure.apply( this, raze( arguments ) );

					if( result !== this ){
						return result;
					}

					return this;
				} ).bind( this );

				ate( "name", method, delegate );

				scope[ method ] = delegate;
			}
		} ).bind( this ) );

		return scope;
	};

	child.prototype.level = function level( depth ){
		let ancestor = parent;

		if( depth < 0 ){
			throw new Error( "invalid level" );

		}else if( depth == 0 ){
			return this;

		}else{
			for( let index = 1; index < depth; index++ ){
				if( ancestor.prototype.parent ){
					ancestor = ancestor.prototype.parent;

				}else{
					throw new Error( "level overflow" );
				}
			}
		}

		let scope = { };
		let ancestorProperty = Object.getOwnPropertyNames( ancestor.prototype );
		ancestorProperty.forEach( ( function onEachProperty( method ){
			if( method != "constructor" &&
				method != "parent" &&
				method != "level" &&
				protype( ancestor.prototype[ method ], FUNCTION ) )
			{
				let procedure = ancestor.prototype[ method ];

				let delegate = ( function delegate( ){
					let result = procedure.apply( this, raze( arguments ) );

					if( result !== this ){
						return result;
					}

					return this;
				} ).bind( this );

				ate( "name", method, delegate );

				scope[ method ] = delegate;
			}
		} ).bind( this ) );

		return scope;
	};

	return child;
};

module.exports = heredito;
