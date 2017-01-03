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

//: @submodule:
/*;
	This is taken from
	https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/create
	I just modified the code formats to my liking.
*/

var _getOwnPropertyNames = require("babel-runtime/core-js/object/get-own-property-names");

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof _create2.default != "function") {
	// Production steps of ECMA-262, Edition 5, 15.2.3.5
	// Reference: http://es5.github.io/#x15.2.3.5
	Object.create = function module() {
		// To save on memory, use a shared constructor
		function Temp() {}

		// make a safe reference to Object.prototype.hasOwnProperty
		var hasOwn = Object.prototype.hasOwnProperty;

		return function module(O) {
			// 1. If Type(O) is not Object or Null throw a TypeError exception.
			if ((typeof O === "undefined" ? "undefined" : (0, _typeof3.default)(O)) != "object") {
				throw TypeError("Object prototype may only be an Object or null");
			}

			// 2. Let obj be the result of creating a new object as if by the
			//    expression new Object() where Object is the standard built-in
			//    constructor with that name
			// 3. Set the [[Prototype]] internal property of obj to O.
			Temp.prototype = O;
			var obj = new Temp();
			Temp.prototype = null; // Let's not keep a stray reference to O...

			// 4. If the argument Properties is present and not undefined, add
			//    own properties to obj as if by calling the standard built-in
			//    function Object.defineProperties with arguments obj and
			//    Properties.
			if (arguments.length > 1) {
				// Object.defineProperties does ToObject on its first argument.
				var Properties = Object(arguments[1]);
				for (var prop in Properties) {
					if (hasOwn.call(Properties, prop)) {
						obj[prop] = Properties[prop];
					}
				}
			}

			// 5. Return obj
			return obj;
		};
	}();
}
//: @end-submodule

var ate = require("ate");
var harden = require("harden");
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
			"configurable": false
		}
	});

	//: Attach the parent to the connector.
	connector.prototype.parent = parent;

	var childCache = {};
	var childProperty = (0, _getOwnPropertyNames2.default)(child.prototype);
	var childPropertyLength = childProperty.length;
	for (var index = 0; index < childPropertyLength; index++) {
		var property = childProperty[index];

		if (child.prototype.hasOwnProperty(property)) {
			/*;
   	We need to do this because
   		we don't want to override the child prototype.
   */
			childCache[property] = child.prototype[property];
		}
	}

	child.prototype = (0, _create2.default)(connector.prototype, {
		"constructor": {
			"value": child,
			"enumerable": false,
			"writable": true,
			"configurable": false
		}
	});

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
			var _this = this;

			if (method != "constructor" && method != "parent" && method != "level" && protype(ancestor.prototype[method], FUNCTION)) {
				(function () {
					var procedure = ancestor.prototype[method];

					var delegate = function delegate() {
						var result = procedure.apply(this, raze(arguments));

						if (result !== this) {
							return result;
						}

						return this;
					}.bind(_this);

					ate("name", method, delegate);

					scope[method] = delegate;
				})();
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
			var _this2 = this;

			if (method != "constructor" && method != "parent" && method != "level" && protype(ancestor.prototype[method], FUNCTION)) {
				(function () {
					var procedure = ancestor.prototype[method];

					var delegate = function delegate() {
						var result = procedure.apply(this, raze(arguments));

						if (result !== this) {
							return result;
						}

						return this;
					}.bind(_this2);

					ate("name", method, delegate);

					scope[method] = delegate;
				})();
			}
		}.bind(this));

		return scope;
	};

	return child;
};

module.exports = heredito;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlcmVkaXRvLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImNyZWF0ZSIsIm1vZHVsZSIsIlRlbXAiLCJoYXNPd24iLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsIk8iLCJUeXBlRXJyb3IiLCJvYmoiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJQcm9wZXJ0aWVzIiwicHJvcCIsImNhbGwiLCJhdGUiLCJyZXF1aXJlIiwiaGFyZGVuIiwicHJvdHlwZSIsInJhemUiLCJoZXJlZGl0byIsImNoaWxkIiwicGFyZW50IiwiRlVOQ1RJT04iLCJFcnJvciIsIk9CSkVDVCIsImNvbm5lY3RvciIsIm5hbWUiLCJjaGlsZENhY2hlIiwiY2hpbGRQcm9wZXJ0eSIsImNoaWxkUHJvcGVydHlMZW5ndGgiLCJpbmRleCIsInByb3BlcnR5Iiwicm9vdCIsImRlcHRoIiwiYW5jZXN0b3IiLCJjb25zdHJ1Y3RvciIsInB1c2giLCJyZXZlcnNlIiwic2NvcGUiLCJhbmNlc3RvclByb3BlcnR5IiwiZm9yRWFjaCIsIm9uRWFjaFByb3BlcnR5IiwibWV0aG9kIiwicHJvY2VkdXJlIiwiZGVsZWdhdGUiLCJyZXN1bHQiLCJhcHBseSIsImJpbmQiLCJsZXZlbCIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0EsSUFBSSwyQkFBd0IsVUFBNUIsRUFBd0M7QUFDdkM7QUFDQTtBQUNBQSxRQUFPQyxNQUFQLEdBQWtCLFNBQVNDLE1BQVQsR0FBa0I7QUFDbkM7QUFDQSxXQUFTQyxJQUFULEdBQWlCLENBQUc7O0FBRXBCO0FBQ0EsTUFBSUMsU0FBU0osT0FBT0ssU0FBUCxDQUFpQkMsY0FBOUI7O0FBRUEsU0FBTyxTQUFTSixNQUFULENBQWlCSyxDQUFqQixFQUFvQjtBQUMxQjtBQUNBLE9BQUks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QyxjQUFULENBQXlCQyxNQUF6QixFQUFpQztBQUFBOztBQUM1RCxPQUFJQSxVQUFVLGFBQVYsSUFDSEEsVUFBVSxRQURQLElBRUhBLFVBQVUsT0FGUCxJQUdIekIsUUFBU2lCLFNBQVM5QixTQUFULENBQW9Cc0MsTUFBcEIsQ0FBVCxFQUF1Q3BCLFFBQXZDLENBSEQsRUFJQTtBQUFBO0FBQ0MsU0FBSXFCLFlBQVlULFNBQVM5QixTQUFULENBQW9Cc0MsTUFBcEIsQ0FBaEI7O0FBRUEsU0FBSUUsV0FBYSxTQUFTQSxRQUFULEdBQW9CO0FBQ3BDLFVBQUlDLFNBQVNGLFVBQVVHLEtBQVYsQ0FBaUIsSUFBakIsRUFBdUI1QixLQUFNVCxTQUFOLENBQXZCLENBQWI7O0FBRUEsVUFBSW9DLFdBQVcsSUFBZixFQUFxQjtBQUNwQixjQUFPQSxNQUFQO0FBQ0E7O0FBRUQsYUFBTyxJQUFQO0FBQ0EsTUFSYyxDQVFYRSxJQVJXLFFBQWY7O0FBVUFqQyxTQUFLLE1BQUwsRUFBYTRCLE1BQWIsRUFBcUJFLFFBQXJCOztBQUVBTixXQUFPSSxNQUFQLElBQWtCRSxRQUFsQjtBQWZEO0FBZ0JDO0FBQ0QsR0F0QnlCLENBc0J0QkcsSUF0QnNCLENBc0JoQixJQXRCZ0IsQ0FBMUI7O0FBd0JBLFNBQU9ULEtBQVA7QUFDQSxFQS9DRDs7QUFpREEsUUFBT2xCLEtBQVA7QUFDQSxDQXZLRDs7QUF5S0FuQixPQUFPZ0QsT0FBUCxHQUFpQjlCLFFBQWpCIiwiZmlsZSI6ImhlcmVkaXRvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qO1xuXHRAbW9kdWxlLWxpY2Vuc2U6XG5cdFx0VGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cblx0XHRDb3B5cmlnaHQgKEBjKSAyMDE3IFJpY2hldmUgU2lvZGluYSBCZWJlZG9yXG5cdFx0QGVtYWlsOiByaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXG5cblx0XHRQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5cdFx0b2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuXHRcdGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcblx0XHR0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5cdFx0Y29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5cdFx0ZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuXHRcdFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuXHRcdGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblx0XHRUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5cdFx0SU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5cdFx0RklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5cdFx0QVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuXHRcdExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5cdFx0T1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblx0XHRTT0ZUV0FSRS5cblx0QGVuZC1tb2R1bGUtbGljZW5zZVxuXG5cdEBtb2R1bGUtY29uZmlndXJhdGlvbjpcblx0XHR7XG5cdFx0XHRcInBhY2thZ2VcIjogXCJoZXJlZGl0b1wiLFxuXHRcdFx0XCJwYXRoXCI6IFwiaGVyZWRpdG8vaGVyZWRpdG8uanNcIixcblx0XHRcdFwiZmlsZVwiOiBcImhlcmVkaXRvLmpzXCIsXG5cdFx0XHRcIm1vZHVsZVwiOiBcImhlcmVkaXRvXCIsXG5cdFx0XHRcImF1dGhvclwiOiBcIlJpY2hldmUgUy4gQmViZWRvclwiLFxuXHRcdFx0XCJjb250cmlidXRvcnNcIjogW1xuXHRcdFx0XHRcIkpvaG4gTGVub24gTWFnaGFub3kgPGpvaG5sZW5vbm1hZ2hhbm95QGdtYWlsLmNvbT5cIlxuXHRcdFx0XSxcblx0XHRcdFwiZU1haWxcIjogXCJyaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXCIsXG5cdFx0XHRcInJlcG9zaXRvcnlcIjogXCJnaXRAZ2l0aHViLmNvbTp2b2xrb3Zhc3lzdGVtcy9oZXJlZGl0by5naXRcIixcblx0XHRcdFwidGVzdFwiOiBcImhlcmVkaXRvLXRlc3QuanNcIixcblx0XHRcdFwiZ2xvYmFsXCI6IHRydWVcblx0XHR9XG5cdEBlbmQtbW9kdWxlLWNvbmZpZ3VyYXRpb25cblxuXHRAbW9kdWxlLWRvY3VtZW50YXRpb246XG5cdFx0VGhpcyBpcyBqdXN0IGEgY29weSBvZiBOb2RlSlMgdXRpbC5oZXJlZGl0byBtZXRob2QuXG5cblx0XHRXaXRoIGFkZGl0aW9uYWwgZW5oYW5jZW1lbnRzLlxuXHRcdFx0MS4gVXNlIHBhcmVudCBpbnN0ZWFkIG9mIHN1cGVyIHJlc2VydmVkIHdvcmQgZm9yIGJldHRlciB1c2FnZS5cblx0XHRcdDIuIEhhcyBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LlxuXHRcdFx0My4gQSBkdW1teSBjbGFzcyBpcyBpbnNlcnRlZCBiZXR3ZWVuIGNoaWxkIGFuZCBwYXJlbnQuXG5cdFx0XHRcdDMuMS4gUHJvdG90eXBlIHByb3BlcnRpZXMgY2FuIGJlIHNoYXJlZCBldmVuIGJlZm9yZSBkZWNsYXJhdGlvbi5cblx0XHRcdFx0My4yLiBQcm90b3R5cGUgcHJvcGVydGllcyBpcyBvdmVycmlkZW4gdGhyb3VnaCBkdW1teSBjbGFzcy5cblxuXHRcdFBsZWFzZSByZWZlciB0byB0aGVpciBkb2N1bWVudGF0aW9uLlxuXHRcdEBsaW5rOmh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvdXRpbC5odG1sI3V0aWxfdXRpbF9pbmhlcml0c19jb25zdHJ1Y3Rvcl9zdXBlcmNvbnN0cnVjdG9yXG5cdEBlbmQtbW9kdWxlLWRvY3VtZW50YXRpb25cblxuXHRAaW5jbHVkZTpcblx0XHR7XG5cdFx0XHRcImF0ZVwiOiBcImF0ZVwiLFxuXHRcdFx0XCJoYXJkZW5cIjogXCJoYXJkZW5cIixcblx0XHRcdFwicHJvdHlwZVwiOiBcInByb3R5cGVcIixcblx0XHRcdFwicmF6ZVwiOiBcInJhemVcIlxuXHRcdH1cblx0QGVuZC1pbmNsdWRlXG4qL1xuXG4vLzogQHN1Ym1vZHVsZTpcbi8qO1xuXHRUaGlzIGlzIHRha2VuIGZyb21cblx0aHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2NyZWF0ZVxuXHRJIGp1c3QgbW9kaWZpZWQgdGhlIGNvZGUgZm9ybWF0cyB0byBteSBsaWtpbmcuXG4qL1xuaWYoIHR5cGVvZiBPYmplY3QuY3JlYXRlICE9IFwiZnVuY3Rpb25cIiApe1xuXHQvLyBQcm9kdWN0aW9uIHN0ZXBzIG9mIEVDTUEtMjYyLCBFZGl0aW9uIDUsIDE1LjIuMy41XG5cdC8vIFJlZmVyZW5jZTogaHR0cDovL2VzNS5naXRodWIuaW8vI3gxNS4yLjMuNVxuXHRPYmplY3QuY3JlYXRlID0gKCBmdW5jdGlvbiBtb2R1bGUoICl7XG5cdFx0Ly8gVG8gc2F2ZSBvbiBtZW1vcnksIHVzZSBhIHNoYXJlZCBjb25zdHJ1Y3RvclxuXHRcdGZ1bmN0aW9uIFRlbXAoICkgeyB9XG5cblx0XHQvLyBtYWtlIGEgc2FmZSByZWZlcmVuY2UgdG8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuXHRcdGxldCBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIG1vZHVsZSggTyApe1xuXHRcdFx0Ly8gMS4gSWYgVHlwZShPKSBpcyBub3QgT2JqZWN0IG9yIE51bGwgdGhyb3cgYSBUeXBlRXJyb3IgZXhjZXB0aW9uLlxuXHRcdFx0aWYoIHR5cGVvZiBPICE9IFwib2JqZWN0XCIgKXtcblx0XHRcdFx0dGhyb3cgVHlwZUVycm9yKCBcIk9iamVjdCBwcm90b3R5cGUgbWF5IG9ubHkgYmUgYW4gT2JqZWN0IG9yIG51bGxcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyAyLiBMZXQgb2JqIGJlIHRoZSByZXN1bHQgb2YgY3JlYXRpbmcgYSBuZXcgb2JqZWN0IGFzIGlmIGJ5IHRoZVxuXHRcdFx0Ly8gICAgZXhwcmVzc2lvbiBuZXcgT2JqZWN0KCkgd2hlcmUgT2JqZWN0IGlzIHRoZSBzdGFuZGFyZCBidWlsdC1pblxuXHRcdFx0Ly8gICAgY29uc3RydWN0b3Igd2l0aCB0aGF0IG5hbWVcblx0XHRcdC8vIDMuIFNldCB0aGUgW1tQcm90b3R5cGVdXSBpbnRlcm5hbCBwcm9wZXJ0eSBvZiBvYmogdG8gTy5cblx0XHRcdFRlbXAucHJvdG90eXBlID0gTztcblx0XHRcdGxldCBvYmogPSBuZXcgVGVtcCggKTtcblx0XHRcdFRlbXAucHJvdG90eXBlID0gbnVsbDsgLy8gTGV0J3Mgbm90IGtlZXAgYSBzdHJheSByZWZlcmVuY2UgdG8gTy4uLlxuXG5cdFx0XHQvLyA0LiBJZiB0aGUgYXJndW1lbnQgUHJvcGVydGllcyBpcyBwcmVzZW50IGFuZCBub3QgdW5kZWZpbmVkLCBhZGRcblx0XHRcdC8vICAgIG93biBwcm9wZXJ0aWVzIHRvIG9iaiBhcyBpZiBieSBjYWxsaW5nIHRoZSBzdGFuZGFyZCBidWlsdC1pblxuXHRcdFx0Ly8gICAgZnVuY3Rpb24gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgd2l0aCBhcmd1bWVudHMgb2JqIGFuZFxuXHRcdFx0Ly8gICAgUHJvcGVydGllcy5cblx0XHRcdGlmKCBhcmd1bWVudHMubGVuZ3RoID4gMSApe1xuXHRcdFx0XHQvLyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyBkb2VzIFRvT2JqZWN0IG9uIGl0cyBmaXJzdCBhcmd1bWVudC5cblx0XHRcdFx0bGV0IFByb3BlcnRpZXMgPSBPYmplY3QoIGFyZ3VtZW50c1sgMSBdICk7XG5cdFx0XHRcdGZvciggbGV0IHByb3AgaW4gUHJvcGVydGllcyApe1xuXHRcdFx0XHRcdGlmKCBoYXNPd24uY2FsbCggUHJvcGVydGllcywgcHJvcCApICl7XG5cdFx0XHRcdFx0XHRvYmpbIHByb3AgXSA9IFByb3BlcnRpZXNbIHByb3AgXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gNS4gUmV0dXJuIG9ialxuXHRcdFx0cmV0dXJuIG9iajtcblx0XHR9O1xuXHR9ICkoICk7XG59XG4vLzogQGVuZC1zdWJtb2R1bGVcblxuY29uc3QgYXRlID0gcmVxdWlyZSggXCJhdGVcIiApO1xuY29uc3QgaGFyZGVuID0gcmVxdWlyZSggXCJoYXJkZW5cIiApO1xuY29uc3QgcHJvdHlwZSA9IHJlcXVpcmUoIFwicHJvdHlwZVwiIClcbmNvbnN0IHJhemUgPSByZXF1aXJlKCBcInJhemVcIiApO1xuXG5jb25zdCBoZXJlZGl0byA9IGZ1bmN0aW9uIGhlcmVkaXRvKCBjaGlsZCwgcGFyZW50ICl7XG5cdC8qO1xuXHRcdEBtZXRhLWNvbmZpZ3VyYXRpb246XG5cdFx0XHR7XG5cdFx0XHRcdFwiY2hpbGQ6cmVxdWlyZWRcIjogXCJmdW5jdGlvblwiLFxuXHRcdFx0XHRcInBhcmVudDpyZXF1aXJlZFwiOiBcImZ1bmN0aW9uXCJcblx0XHRcdH1cblx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxuXHQqL1xuXG5cdGlmKCAhcHJvdHlwZSggY2hpbGQsIEZVTkNUSU9OICkgKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiaW52YWxpZCBjaGlsZFwiICk7XG5cdH1cblxuXHRpZiggIXByb3R5cGUoIHBhcmVudCwgRlVOQ1RJT04gKSApe1xuXHRcdHRocm93IG5ldyBFcnJvciggXCJpbnZhbGlkIHBhcmVudFwiICk7XG5cdH1cblxuXHRpZiggIXByb3R5cGUoIGNoaWxkLnByb3RvdHlwZSwgT0JKRUNUICkgKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiY2hpbGQgbXVzdCBoYXZlIGEgcHJvdG90eXBlXCIgKTtcblx0fVxuXG5cdGlmKCAhcHJvdHlwZSggcGFyZW50LnByb3RvdHlwZSwgT0JKRUNUICkgKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIFwicGFyZW50IG11c3QgaGF2ZSBhIHByb3RvdHlwZVwiICk7XG5cdH1cblxuXHRsZXQgY29ubmVjdG9yID0gZnVuY3Rpb24gY29ubmVjdG9yKCApeyB9O1xuXHQvLzogUmVuYW1lIHRoZSBjb25uZWN0b3IgdG8gbWFrZSBpdCBsb29rIGxpa2UgdGhlIGNoaWxkLlxuXHRhdGUoIFwibmFtZVwiLCBjaGlsZC5uYW1lLCBjb25uZWN0b3IgKTtcblxuXHQvLzogSW5oZXJpdCB0aGUgcGFyZW50LlxuXHRjb25uZWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggcGFyZW50LnByb3RvdHlwZSwge1xuXHRcdFwiY29uc3RydWN0b3JcIjoge1xuXHRcdFx0XCJ2YWx1ZVwiOiBwYXJlbnQsXG5cdFx0XHRcImVudW1lcmFibGVcIjogZmFsc2UsXG5cdFx0XHRcIndyaXRhYmxlXCI6IHRydWUsXG5cdFx0XHRcImNvbmZpZ3VyYWJsZVwiOiBmYWxzZVxuXHRcdH1cblx0fSApO1xuXG5cdC8vOiBBdHRhY2ggdGhlIHBhcmVudCB0byB0aGUgY29ubmVjdG9yLlxuXHRjb25uZWN0b3IucHJvdG90eXBlLnBhcmVudCA9IHBhcmVudDtcblxuXHRsZXQgY2hpbGRDYWNoZSA9IHsgfTtcblx0bGV0IGNoaWxkUHJvcGVydHkgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyggY2hpbGQucHJvdG90eXBlICk7XG5cdGxldCBjaGlsZFByb3BlcnR5TGVuZ3RoID0gY2hpbGRQcm9wZXJ0eS5sZW5ndGg7XG5cdGZvciggbGV0IGluZGV4ID0gMDsgaW5kZXggPCBjaGlsZFByb3BlcnR5TGVuZ3RoOyBpbmRleCsrICl7XG5cdFx0bGV0IHByb3BlcnR5ID0gY2hpbGRQcm9wZXJ0eVsgaW5kZXggXTtcblxuXHRcdGlmKCBjaGlsZC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkoIHByb3BlcnR5ICkgKXtcblx0XHRcdC8qO1xuXHRcdFx0XHRXZSBuZWVkIHRvIGRvIHRoaXMgYmVjYXVzZVxuXHRcdFx0XHRcdHdlIGRvbid0IHdhbnQgdG8gb3ZlcnJpZGUgdGhlIGNoaWxkIHByb3RvdHlwZS5cblx0XHRcdCovXG5cdFx0XHRjaGlsZENhY2hlWyBwcm9wZXJ0eSBdID0gY2hpbGQucHJvdG90eXBlWyBwcm9wZXJ0eSBdO1xuXHRcdH1cblx0fVxuXG5cdGNoaWxkLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIGNvbm5lY3Rvci5wcm90b3R5cGUsIHtcblx0XHRcImNvbnN0cnVjdG9yXCI6IHtcblx0XHRcdFwidmFsdWVcIjogY2hpbGQsXG5cdFx0XHRcImVudW1lcmFibGVcIjogZmFsc2UsXG5cdFx0XHRcIndyaXRhYmxlXCI6IHRydWUsXG5cdFx0XHRcImNvbmZpZ3VyYWJsZVwiOiBmYWxzZVxuXHRcdH1cblx0fSApO1xuXG5cdC8vOiBUcmFuc2ZlciB0aGUgY2FjaGVkIHByb3BlcnRpZXMgYmFjayB0byB0aGUgY2hpbGQuXG5cdGZvciggbGV0IHByb3BlcnR5IGluIGNoaWxkQ2FjaGUgKXtcblx0XHRjaGlsZC5wcm90b3R5cGVbIHByb3BlcnR5IF0gPSBjaGlsZENhY2hlWyBwcm9wZXJ0eSBdO1xuXHR9XG5cblx0Y2hpbGQucHJvdG90eXBlLnJvb3QgPSBmdW5jdGlvbiByb290KCBkZXB0aCApe1xuXHRcdGxldCBhbmNlc3RvciA9IFsgXTtcblxuXHRcdGxldCBwYXJlbnQgPSB0aGlzLmNvbnN0cnVjdG9yLnByb3RvdHlwZS5wYXJlbnQ7XG5cdFx0d2hpbGUoIHBhcmVudCApe1xuXHRcdFx0YW5jZXN0b3IucHVzaCggcGFyZW50ICk7XG5cblx0XHRcdHBhcmVudCA9IHBhcmVudC5wcm90b3R5cGUucGFyZW50O1xuXHRcdH1cblxuXHRcdGlmKCBkZXB0aCA+PSBhbmNlc3Rvci5sZW5ndGggfHwgZGVwdGggPCAwICl7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoIFwicm9vdCBvdmVyZmxvd1wiICk7XG5cdFx0fVxuXG5cdFx0YW5jZXN0b3IgPSBhbmNlc3Rvci5yZXZlcnNlKCApWyBkZXB0aCBdO1xuXG5cdFx0bGV0IHNjb3BlID0geyB9O1xuXHRcdGxldCBhbmNlc3RvclByb3BlcnR5ID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoIGFuY2VzdG9yLnByb3RvdHlwZSApO1xuXHRcdGFuY2VzdG9yUHJvcGVydHkuZm9yRWFjaCggKCBmdW5jdGlvbiBvbkVhY2hQcm9wZXJ0eSggbWV0aG9kICl7XG5cdFx0XHRpZiggbWV0aG9kICE9IFwiY29uc3RydWN0b3JcIiAmJlxuXHRcdFx0XHRtZXRob2QgIT0gXCJwYXJlbnRcIiAmJlxuXHRcdFx0XHRtZXRob2QgIT0gXCJsZXZlbFwiICYmXG5cdFx0XHRcdHByb3R5cGUoIGFuY2VzdG9yLnByb3RvdHlwZVsgbWV0aG9kIF0sIEZVTkNUSU9OICkgKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgcHJvY2VkdXJlID0gYW5jZXN0b3IucHJvdG90eXBlWyBtZXRob2QgXTtcblxuXHRcdFx0XHRsZXQgZGVsZWdhdGUgPSAoIGZ1bmN0aW9uIGRlbGVnYXRlKCApe1xuXHRcdFx0XHRcdGxldCByZXN1bHQgPSBwcm9jZWR1cmUuYXBwbHkoIHRoaXMsIHJhemUoIGFyZ3VtZW50cyApICk7XG5cblx0XHRcdFx0XHRpZiggcmVzdWx0ICE9PSB0aGlzICl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9ICkuYmluZCggdGhpcyApO1xuXG5cdFx0XHRcdGF0ZSggXCJuYW1lXCIsIG1ldGhvZCwgZGVsZWdhdGUgKTtcblxuXHRcdFx0XHRzY29wZVsgbWV0aG9kIF0gPSBkZWxlZ2F0ZTtcblx0XHRcdH1cblx0XHR9ICkuYmluZCggdGhpcyApICk7XG5cblx0XHRyZXR1cm4gc2NvcGU7XG5cdH07XG5cblx0Y2hpbGQucHJvdG90eXBlLmxldmVsID0gZnVuY3Rpb24gbGV2ZWwoIGRlcHRoICl7XG5cdFx0bGV0IGFuY2VzdG9yID0gcGFyZW50O1xuXG5cdFx0aWYoIGRlcHRoIDwgMCApe1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCBcImludmFsaWQgbGV2ZWxcIiApO1xuXG5cdFx0fWVsc2UgaWYoIGRlcHRoID09IDAgKXtcblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fWVsc2V7XG5cdFx0XHRmb3IoIGxldCBpbmRleCA9IDE7IGluZGV4IDwgZGVwdGg7IGluZGV4KysgKXtcblx0XHRcdFx0aWYoIGFuY2VzdG9yLnByb3RvdHlwZS5wYXJlbnQgKXtcblx0XHRcdFx0XHRhbmNlc3RvciA9IGFuY2VzdG9yLnByb3RvdHlwZS5wYXJlbnQ7XG5cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCBcImxldmVsIG92ZXJmbG93XCIgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGxldCBzY29wZSA9IHsgfTtcblx0XHRsZXQgYW5jZXN0b3JQcm9wZXJ0eSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKCBhbmNlc3Rvci5wcm90b3R5cGUgKTtcblx0XHRhbmNlc3RvclByb3BlcnR5LmZvckVhY2goICggZnVuY3Rpb24gb25FYWNoUHJvcGVydHkoIG1ldGhvZCApe1xuXHRcdFx0aWYoIG1ldGhvZCAhPSBcImNvbnN0cnVjdG9yXCIgJiZcblx0XHRcdFx0bWV0aG9kICE9IFwicGFyZW50XCIgJiZcblx0XHRcdFx0bWV0aG9kICE9IFwibGV2ZWxcIiAmJlxuXHRcdFx0XHRwcm90eXBlKCBhbmNlc3Rvci5wcm90b3R5cGVbIG1ldGhvZCBdLCBGVU5DVElPTiApIClcblx0XHRcdHtcblx0XHRcdFx0bGV0IHByb2NlZHVyZSA9IGFuY2VzdG9yLnByb3RvdHlwZVsgbWV0aG9kIF07XG5cblx0XHRcdFx0bGV0IGRlbGVnYXRlID0gKCBmdW5jdGlvbiBkZWxlZ2F0ZSggKXtcblx0XHRcdFx0XHRsZXQgcmVzdWx0ID0gcHJvY2VkdXJlLmFwcGx5KCB0aGlzLCByYXplKCBhcmd1bWVudHMgKSApO1xuXG5cdFx0XHRcdFx0aWYoIHJlc3VsdCAhPT0gdGhpcyApe1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fSApLmJpbmQoIHRoaXMgKTtcblxuXHRcdFx0XHRhdGUoIFwibmFtZVwiLCBtZXRob2QsIGRlbGVnYXRlICk7XG5cblx0XHRcdFx0c2NvcGVbIG1ldGhvZCBdID0gZGVsZWdhdGU7XG5cdFx0XHR9XG5cdFx0fSApLmJpbmQoIHRoaXMgKSApO1xuXG5cdFx0cmV0dXJuIHNjb3BlO1xuXHR9O1xuXG5cdHJldHVybiBjaGlsZDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaGVyZWRpdG87XG4iXX0=
