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
              			"protype": "protype",
              			"raze": "raze"
              		}
              	@end-include
              */

//: @support-module:
//: @reference: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/create
var _getOwnPropertyNames = require("babel-runtime/core-js/object/get-own-property-names");var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);var _defineProperties = require("babel-runtime/core-js/object/define-properties");var _defineProperties2 = _interopRequireDefault(_defineProperties);var _create = require("babel-runtime/core-js/object/create");var _create2 = _interopRequireDefault(_create);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}"function" != typeof _create2.default && (Object.create = function (t) {var e = function e() {};
	return function (n, r) {if (n !== Object(n) && null !== n) throw TypeError("Argument must be an object, or null");
		e.prototype = n || {};var o = new e();return e.prototype = null, r !== t && (0, _defineProperties2.default)(o, r),
		null === n && (o.__proto__ = null), o;};}());
//: @end-support-module

var ate = require("ate");
var protype = require("protype");
var raze = require("raze");

var heredito = function heredito(child, parent) {
	/*;
                                                 	@meta-configuration:
                                                 		{
                                                 			"child:required": "function",
                                                 			"parent:required": "function"
                                                 		}
                                                 	@end-meta-configuration
                                                 */

	if (!protype(child, FUNCTION)) {
		throw new Error("invalid child");
	}

	if (!protype(parent, FUNCTION)) {
		throw new Error("invalid parent");
	}

	if (!protype(child.prototype, OBJECT)) {
		throw new Error("child must have a prototype");
	}

	if (!protype(parent.prototype, OBJECT)) {
		throw new Error("parent must have a prototype");
	}

	var connector = function connector() {};
	//: Rename the connector to make it look like the child.
	ate("name", child.name, connector);

	//: Inherit the parent.
	connector.prototype = (0, _create2.default)(parent.prototype, {
		"constructor": {
			"value": parent,
			"enumerable": false,
			"writable": true,
			"configurable": false } });



	//: Attach the parent to the connector.
	connector.prototype.parent = parent;

	var childCache = {};
	var childProperty = (0, _getOwnPropertyNames2.default)(child.prototype);
	var childPropertyLength = childProperty.length;
	for (var index = 0; index < childPropertyLength; index++) {
		var property = childProperty[index];

		/*;
                                       	@note:
                                       		We will not cache constants, and non-functions.
                                       	@end-note
                                       */
		if (!/^[A-Z_][A-Z0-9_]+$/.test(property) &&
		protype(child.prototype[property], FUNCTION) &&
		child.prototype.hasOwnProperty(property))
		{
			/*;
   	@note:
   		We need to do this because we don't want to override the child prototype.
   	@end-note
   */
			childCache[property] = child.prototype[property];
		}
	}

	child.prototype = (0, _create2.default)(connector.prototype, {
		"constructor": {
			"value": child,
			"enumerable": false,
			"writable": true,
			"configurable": false } });



	//: Transfer the cached properties back to the child.
	for (var _property in childCache) {
		child.prototype[_property] = childCache[_property];
	}

	child.prototype.root = function root(depth) {
		var ancestor = [];

		var parent = this.constructor.prototype.parent;
		while (parent) {
			ancestor.push(parent);

			parent = parent.prototype.parent;
		}

		if (depth >= ancestor.length || depth < 0) {
			throw new Error("root overflow");
		}

		ancestor = ancestor.reverse()[depth];

		var scope = {};
		var ancestorProperty = (0, _getOwnPropertyNames2.default)(ancestor.prototype);
		ancestorProperty.forEach(function onEachProperty(method) {
			if (method != "constructor" &&
			method != "parent" &&
			method != "level" &&
			protype(ancestor.prototype[method], FUNCTION))
			{
				var procedure = ancestor.prototype[method];

				var delegate = function delegate() {
					var result = procedure.apply(this, raze(arguments));

					if (result !== this) {
						return result;
					}

					return this;
				}.bind(this);

				ate("name", method, delegate);

				scope[method] = delegate;
			}
		}.bind(this));

		return scope;
	};

	child.prototype.level = function level(depth) {
		var ancestor = parent;

		if (depth < 0) {
			throw new Error("invalid level");

		} else if (depth == 0) {
			return this;

		} else {
			for (var _index = 1; _index < depth; _index++) {
				if (ancestor.prototype.parent) {
					ancestor = ancestor.prototype.parent;

				} else {
					throw new Error("level overflow");
				}
			}
		}

		var scope = {};
		var ancestorProperty = (0, _getOwnPropertyNames2.default)(ancestor.prototype);
		ancestorProperty.forEach(function onEachProperty(method) {
			if (method != "constructor" &&
			method != "parent" &&
			method != "level" &&
			protype(ancestor.prototype[method], FUNCTION))
			{
				var procedure = ancestor.prototype[method];

				var delegate = function delegate() {
					var result = procedure.apply(this, raze(arguments));

					if (result !== this) {
						return result;
					}

					return this;
				}.bind(this);

				ate("name", method, delegate);

				scope[method] = delegate;
			}
		}.bind(this));

		return scope;
	};

	return child;
};

module.exports = heredito;

//# sourceMappingURL=heredito.support.js.map