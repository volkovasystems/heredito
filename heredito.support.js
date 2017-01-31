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

var _getOwnPropertyNames = require("babel-runtime/core-js/object/get-own-property-names");

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _defineProperties = require("babel-runtime/core-js/object/define-properties");

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

"function" != typeof _create2.default && (Object.create = function (t) {
	var e = function e() {};
	return function (n, r) {
		if (n !== Object(n) && null !== n) throw TypeError("Argument must be an object, or null");
		e.prototype = n || {};var o = new e();return e.prototype = null, r !== t && (0, _defineProperties2.default)(o, r), null === n && (o.__proto__ = null), o;
	};
}());
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

		/*;
  	@note:
  		We will not cache constants, and non-functions.
  	@end-note
  */
		if (!/^[A-Z_][A-Z0-9_]+$/.test(property) && protype(child.prototype[property], FUNCTION) && child.prototype.hasOwnProperty(property)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlcmVkaXRvLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImNyZWF0ZSIsInQiLCJlIiwibiIsInIiLCJUeXBlRXJyb3IiLCJwcm90b3R5cGUiLCJvIiwiX19wcm90b19fIiwiYXRlIiwicmVxdWlyZSIsInByb3R5cGUiLCJyYXplIiwiaGVyZWRpdG8iLCJjaGlsZCIsInBhcmVudCIsIkZVTkNUSU9OIiwiRXJyb3IiLCJPQkpFQ1QiLCJjb25uZWN0b3IiLCJuYW1lIiwiY2hpbGRDYWNoZSIsImNoaWxkUHJvcGVydHkiLCJjaGlsZFByb3BlcnR5TGVuZ3RoIiwibGVuZ3RoIiwiaW5kZXgiLCJwcm9wZXJ0eSIsInRlc3QiLCJoYXNPd25Qcm9wZXJ0eSIsInJvb3QiLCJkZXB0aCIsImFuY2VzdG9yIiwiY29uc3RydWN0b3IiLCJwdXNoIiwicmV2ZXJzZSIsInNjb3BlIiwiYW5jZXN0b3JQcm9wZXJ0eSIsImZvckVhY2giLCJvbkVhY2hQcm9wZXJ0eSIsIm1ldGhvZCIsInByb2NlZHVyZSIsImRlbGVnYXRlIiwicmVzdWx0IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJiaW5kIiwibGV2ZWwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0VBO0FBQ0M7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxjQUFZLHVCQUFaLEtBQW1DQSxPQUFPQyxNQUFQLEdBQWMsVUFBU0MsQ0FBVCxFQUFXO0FBQUMsS0FBSUMsSUFBRSxTQUFGQSxDQUFFLEdBQVUsQ0FBRSxDQUFsQjtBQUM3RCxRQUFPLFVBQVNDLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUMsTUFBR0QsTUFBSUosT0FBT0ksQ0FBUCxDQUFKLElBQWUsU0FBT0EsQ0FBekIsRUFBMkIsTUFBTUUsVUFBVSxxQ0FBVixDQUFOO0FBQ2hESCxJQUFFSSxTQUFGLEdBQVlILEtBQUcsRUFB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QjtBQUNwQyxVQUFJQyxTQUFTRixVQUFVRyxLQUFWLENBQWlCLElBQWpCLEVBQXVCL0IsS0FBTWdDLFNBQU4sQ0FBdkIsQ0FBYjs7QUFFQSxVQUFJRixXQUFXLElBQWYsRUFBcUI7QUFDcEIsY0FBT0EsTUFBUDtBQUNBOztBQUVELGFBQU8sSUFBUDtBQUNBLE1BUmMsQ0FRWEcsSUFSVyxRQUFmOztBQVVBcEMsU0FBSyxNQUFMLEVBQWE4QixNQUFiLEVBQXFCRSxRQUFyQjs7QUFFQU4sV0FBT0ksTUFBUCxJQUFrQkUsUUFBbEI7QUFmRDtBQWdCQztBQUNELEdBdEJ5QixDQXNCdEJJLElBdEJzQixDQXNCaEIsSUF0QmdCLENBQTFCOztBQXdCQSxTQUFPVixLQUFQO0FBQ0EsRUEvQ0Q7O0FBaURBLFFBQU9yQixLQUFQO0FBQ0EsQ0FoTEQ7O0FBa0xBaUMsT0FBT0MsT0FBUCxHQUFpQm5DLFFBQWpCIiwiZmlsZSI6ImhlcmVkaXRvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qO1xuXHRAbW9kdWxlLWxpY2Vuc2U6XG5cdFx0VGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cblx0XHRDb3B5cmlnaHQgKEBjKSAyMDE3IFJpY2hldmUgU2lvZGluYSBCZWJlZG9yXG5cdFx0QGVtYWlsOiByaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXG5cblx0XHRQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5cdFx0b2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuXHRcdGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcblx0XHR0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5cdFx0Y29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5cdFx0ZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuXHRcdFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuXHRcdGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblx0XHRUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5cdFx0SU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5cdFx0RklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5cdFx0QVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuXHRcdExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5cdFx0T1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblx0XHRTT0ZUV0FSRS5cblx0QGVuZC1tb2R1bGUtbGljZW5zZVxuXG5cdEBtb2R1bGUtY29uZmlndXJhdGlvbjpcblx0XHR7XG5cdFx0XHRcInBhY2thZ2VcIjogXCJoZXJlZGl0b1wiLFxuXHRcdFx0XCJwYXRoXCI6IFwiaGVyZWRpdG8vaGVyZWRpdG8uanNcIixcblx0XHRcdFwiZmlsZVwiOiBcImhlcmVkaXRvLmpzXCIsXG5cdFx0XHRcIm1vZHVsZVwiOiBcImhlcmVkaXRvXCIsXG5cdFx0XHRcImF1dGhvclwiOiBcIlJpY2hldmUgUy4gQmViZWRvclwiLFxuXHRcdFx0XCJjb250cmlidXRvcnNcIjogW1xuXHRcdFx0XHRcIkpvaG4gTGVub24gTWFnaGFub3kgPGpvaG5sZW5vbm1hZ2hhbm95QGdtYWlsLmNvbT5cIlxuXHRcdFx0XSxcblx0XHRcdFwiZU1haWxcIjogXCJyaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXCIsXG5cdFx0XHRcInJlcG9zaXRvcnlcIjogXCJnaXRAZ2l0aHViLmNvbTp2b2xrb3Zhc3lzdGVtcy9oZXJlZGl0by5naXRcIixcblx0XHRcdFwidGVzdFwiOiBcImhlcmVkaXRvLXRlc3QuanNcIixcblx0XHRcdFwiZ2xvYmFsXCI6IHRydWVcblx0XHR9XG5cdEBlbmQtbW9kdWxlLWNvbmZpZ3VyYXRpb25cblxuXHRAbW9kdWxlLWRvY3VtZW50YXRpb246XG5cdFx0VGhpcyBpcyBqdXN0IGEgY29weSBvZiBOb2RlSlMgdXRpbC5oZXJlZGl0byBtZXRob2QuXG5cblx0XHRXaXRoIGFkZGl0aW9uYWwgZW5oYW5jZW1lbnRzLlxuXHRcdFx0MS4gVXNlIHBhcmVudCBpbnN0ZWFkIG9mIHN1cGVyIHJlc2VydmVkIHdvcmQgZm9yIGJldHRlciB1c2FnZS5cblx0XHRcdDIuIEhhcyBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LlxuXHRcdFx0My4gQSBkdW1teSBjbGFzcyBpcyBpbnNlcnRlZCBiZXR3ZWVuIGNoaWxkIGFuZCBwYXJlbnQuXG5cdFx0XHRcdDMuMS4gUHJvdG90eXBlIHByb3BlcnRpZXMgY2FuIGJlIHNoYXJlZCBldmVuIGJlZm9yZSBkZWNsYXJhdGlvbi5cblx0XHRcdFx0My4yLiBQcm90b3R5cGUgcHJvcGVydGllcyBpcyBvdmVycmlkZW4gdGhyb3VnaCBkdW1teSBjbGFzcy5cblxuXHRcdFBsZWFzZSByZWZlciB0byB0aGVpciBkb2N1bWVudGF0aW9uLlxuXHRcdEBsaW5rOmh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvdXRpbC5odG1sI3V0aWxfdXRpbF9pbmhlcml0c19jb25zdHJ1Y3Rvcl9zdXBlcmNvbnN0cnVjdG9yXG5cdEBlbmQtbW9kdWxlLWRvY3VtZW50YXRpb25cblxuXHRAaW5jbHVkZTpcblx0XHR7XG5cdFx0XHRcImF0ZVwiOiBcImF0ZVwiLFxuXHRcdFx0XCJwcm90eXBlXCI6IFwicHJvdHlwZVwiLFxuXHRcdFx0XCJyYXplXCI6IFwicmF6ZVwiXG5cdFx0fVxuXHRAZW5kLWluY2x1ZGVcbiovXG5cbi8vOiBAc3VwcG9ydC1tb2R1bGU6XG5cdC8vOiBAcmVmZXJlbmNlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvY3JlYXRlXG5cdFwiZnVuY3Rpb25cIiE9dHlwZW9mIE9iamVjdC5jcmVhdGUmJihPYmplY3QuY3JlYXRlPWZ1bmN0aW9uKHQpe3ZhciBlPWZ1bmN0aW9uKCl7fTtcblx0cmV0dXJuIGZ1bmN0aW9uKG4scil7aWYobiE9PU9iamVjdChuKSYmbnVsbCE9PW4pdGhyb3cgVHlwZUVycm9yKFwiQXJndW1lbnQgbXVzdCBiZSBhbiBvYmplY3QsIG9yIG51bGxcIik7XG5cdGUucHJvdG90eXBlPW58fHt9O3ZhciBvPW5ldyBlO3JldHVybiBlLnByb3RvdHlwZT1udWxsLHIhPT10JiZPYmplY3QuZGVmaW5lUHJvcGVydGllcyhvLHIpLFxuXHRudWxsPT09biYmKG8uX19wcm90b19fPW51bGwpLG99fSgpKTtcbi8vOiBAZW5kLXN1cHBvcnQtbW9kdWxlXG5cbmNvbnN0IGF0ZSA9IHJlcXVpcmUoIFwiYXRlXCIgKTtcbmNvbnN0IHByb3R5cGUgPSByZXF1aXJlKCBcInByb3R5cGVcIiApXG5jb25zdCByYXplID0gcmVxdWlyZSggXCJyYXplXCIgKTtcblxuY29uc3QgaGVyZWRpdG8gPSBmdW5jdGlvbiBoZXJlZGl0byggY2hpbGQsIHBhcmVudCApe1xuXHQvKjtcblx0XHRAbWV0YS1jb25maWd1cmF0aW9uOlxuXHRcdFx0e1xuXHRcdFx0XHRcImNoaWxkOnJlcXVpcmVkXCI6IFwiZnVuY3Rpb25cIixcblx0XHRcdFx0XCJwYXJlbnQ6cmVxdWlyZWRcIjogXCJmdW5jdGlvblwiXG5cdFx0XHR9XG5cdFx0QGVuZC1tZXRhLWNvbmZpZ3VyYXRpb25cblx0Ki9cblxuXHRpZiggIXByb3R5cGUoIGNoaWxkLCBGVU5DVElPTiApICl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImludmFsaWQgY2hpbGRcIiApO1xuXHR9XG5cblx0aWYoICFwcm90eXBlKCBwYXJlbnQsIEZVTkNUSU9OICkgKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiaW52YWxpZCBwYXJlbnRcIiApO1xuXHR9XG5cblx0aWYoICFwcm90eXBlKCBjaGlsZC5wcm90b3R5cGUsIE9CSkVDVCApICl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImNoaWxkIG11c3QgaGF2ZSBhIHByb3RvdHlwZVwiICk7XG5cdH1cblxuXHRpZiggIXByb3R5cGUoIHBhcmVudC5wcm90b3R5cGUsIE9CSkVDVCApICl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcInBhcmVudCBtdXN0IGhhdmUgYSBwcm90b3R5cGVcIiApO1xuXHR9XG5cblx0bGV0IGNvbm5lY3RvciA9IGZ1bmN0aW9uIGNvbm5lY3RvciggKXsgfTtcblx0Ly86IFJlbmFtZSB0aGUgY29ubmVjdG9yIHRvIG1ha2UgaXQgbG9vayBsaWtlIHRoZSBjaGlsZC5cblx0YXRlKCBcIm5hbWVcIiwgY2hpbGQubmFtZSwgY29ubmVjdG9yICk7XG5cblx0Ly86IEluaGVyaXQgdGhlIHBhcmVudC5cblx0Y29ubmVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIHBhcmVudC5wcm90b3R5cGUsIHtcblx0XHRcImNvbnN0cnVjdG9yXCI6IHtcblx0XHRcdFwidmFsdWVcIjogcGFyZW50LFxuXHRcdFx0XCJlbnVtZXJhYmxlXCI6IGZhbHNlLFxuXHRcdFx0XCJ3cml0YWJsZVwiOiB0cnVlLFxuXHRcdFx0XCJjb25maWd1cmFibGVcIjogZmFsc2Vcblx0XHR9XG5cdH0gKTtcblxuXHQvLzogQXR0YWNoIHRoZSBwYXJlbnQgdG8gdGhlIGNvbm5lY3Rvci5cblx0Y29ubmVjdG9yLnByb3RvdHlwZS5wYXJlbnQgPSBwYXJlbnQ7XG5cblx0bGV0IGNoaWxkQ2FjaGUgPSB7IH07XG5cdGxldCBjaGlsZFByb3BlcnR5ID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoIGNoaWxkLnByb3RvdHlwZSApO1xuXHRsZXQgY2hpbGRQcm9wZXJ0eUxlbmd0aCA9IGNoaWxkUHJvcGVydHkubGVuZ3RoO1xuXHRmb3IoIGxldCBpbmRleCA9IDA7IGluZGV4IDwgY2hpbGRQcm9wZXJ0eUxlbmd0aDsgaW5kZXgrKyApe1xuXHRcdGxldCBwcm9wZXJ0eSA9IGNoaWxkUHJvcGVydHlbIGluZGV4IF07XG5cblx0XHQvKjtcblx0XHRcdEBub3RlOlxuXHRcdFx0XHRXZSB3aWxsIG5vdCBjYWNoZSBjb25zdGFudHMsIGFuZCBub24tZnVuY3Rpb25zLlxuXHRcdFx0QGVuZC1ub3RlXG5cdFx0Ki9cblx0XHRpZiggISggL15bQS1aX11bQS1aMC05X10rJC8gKS50ZXN0KCBwcm9wZXJ0eSApICYmXG5cdFx0XHRwcm90eXBlKCBjaGlsZC5wcm90b3R5cGVbIHByb3BlcnR5IF0sIEZVTkNUSU9OICkgJiZcblx0XHRcdGNoaWxkLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSggcHJvcGVydHkgKSApXG5cdFx0e1xuXHRcdFx0Lyo7XG5cdFx0XHRcdEBub3RlOlxuXHRcdFx0XHRcdFdlIG5lZWQgdG8gZG8gdGhpcyBiZWNhdXNlIHdlIGRvbid0IHdhbnQgdG8gb3ZlcnJpZGUgdGhlIGNoaWxkIHByb3RvdHlwZS5cblx0XHRcdFx0QGVuZC1ub3RlXG5cdFx0XHQqL1xuXHRcdFx0Y2hpbGRDYWNoZVsgcHJvcGVydHkgXSA9IGNoaWxkLnByb3RvdHlwZVsgcHJvcGVydHkgXTtcblx0XHR9XG5cdH1cblxuXHRjaGlsZC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBjb25uZWN0b3IucHJvdG90eXBlLCB7XG5cdFx0XCJjb25zdHJ1Y3RvclwiOiB7XG5cdFx0XHRcInZhbHVlXCI6IGNoaWxkLFxuXHRcdFx0XCJlbnVtZXJhYmxlXCI6IGZhbHNlLFxuXHRcdFx0XCJ3cml0YWJsZVwiOiB0cnVlLFxuXHRcdFx0XCJjb25maWd1cmFibGVcIjogZmFsc2Vcblx0XHR9XG5cdH0gKTtcblxuXHQvLzogVHJhbnNmZXIgdGhlIGNhY2hlZCBwcm9wZXJ0aWVzIGJhY2sgdG8gdGhlIGNoaWxkLlxuXHRmb3IoIGxldCBwcm9wZXJ0eSBpbiBjaGlsZENhY2hlICl7XG5cdFx0Y2hpbGQucHJvdG90eXBlWyBwcm9wZXJ0eSBdID0gY2hpbGRDYWNoZVsgcHJvcGVydHkgXTtcblx0fVxuXG5cdGNoaWxkLnByb3RvdHlwZS5yb290ID0gZnVuY3Rpb24gcm9vdCggZGVwdGggKXtcblx0XHRsZXQgYW5jZXN0b3IgPSBbIF07XG5cblx0XHRsZXQgcGFyZW50ID0gdGhpcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUucGFyZW50O1xuXHRcdHdoaWxlKCBwYXJlbnQgKXtcblx0XHRcdGFuY2VzdG9yLnB1c2goIHBhcmVudCApO1xuXG5cdFx0XHRwYXJlbnQgPSBwYXJlbnQucHJvdG90eXBlLnBhcmVudDtcblx0XHR9XG5cblx0XHRpZiggZGVwdGggPj0gYW5jZXN0b3IubGVuZ3RoIHx8IGRlcHRoIDwgMCApe1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCBcInJvb3Qgb3ZlcmZsb3dcIiApO1xuXHRcdH1cblxuXHRcdGFuY2VzdG9yID0gYW5jZXN0b3IucmV2ZXJzZSggKVsgZGVwdGggXTtcblxuXHRcdGxldCBzY29wZSA9IHsgfTtcblx0XHRsZXQgYW5jZXN0b3JQcm9wZXJ0eSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKCBhbmNlc3Rvci5wcm90b3R5cGUgKTtcblx0XHRhbmNlc3RvclByb3BlcnR5LmZvckVhY2goICggZnVuY3Rpb24gb25FYWNoUHJvcGVydHkoIG1ldGhvZCApe1xuXHRcdFx0aWYoIG1ldGhvZCAhPSBcImNvbnN0cnVjdG9yXCIgJiZcblx0XHRcdFx0bWV0aG9kICE9IFwicGFyZW50XCIgJiZcblx0XHRcdFx0bWV0aG9kICE9IFwibGV2ZWxcIiAmJlxuXHRcdFx0XHRwcm90eXBlKCBhbmNlc3Rvci5wcm90b3R5cGVbIG1ldGhvZCBdLCBGVU5DVElPTiApIClcblx0XHRcdHtcblx0XHRcdFx0bGV0IHByb2NlZHVyZSA9IGFuY2VzdG9yLnByb3RvdHlwZVsgbWV0aG9kIF07XG5cblx0XHRcdFx0bGV0IGRlbGVnYXRlID0gKCBmdW5jdGlvbiBkZWxlZ2F0ZSggKXtcblx0XHRcdFx0XHRsZXQgcmVzdWx0ID0gcHJvY2VkdXJlLmFwcGx5KCB0aGlzLCByYXplKCBhcmd1bWVudHMgKSApO1xuXG5cdFx0XHRcdFx0aWYoIHJlc3VsdCAhPT0gdGhpcyApe1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fSApLmJpbmQoIHRoaXMgKTtcblxuXHRcdFx0XHRhdGUoIFwibmFtZVwiLCBtZXRob2QsIGRlbGVnYXRlICk7XG5cblx0XHRcdFx0c2NvcGVbIG1ldGhvZCBdID0gZGVsZWdhdGU7XG5cdFx0XHR9XG5cdFx0fSApLmJpbmQoIHRoaXMgKSApO1xuXG5cdFx0cmV0dXJuIHNjb3BlO1xuXHR9O1xuXG5cdGNoaWxkLnByb3RvdHlwZS5sZXZlbCA9IGZ1bmN0aW9uIGxldmVsKCBkZXB0aCApe1xuXHRcdGxldCBhbmNlc3RvciA9IHBhcmVudDtcblxuXHRcdGlmKCBkZXB0aCA8IDAgKXtcblx0XHRcdHRocm93IG5ldyBFcnJvciggXCJpbnZhbGlkIGxldmVsXCIgKTtcblxuXHRcdH1lbHNlIGlmKCBkZXB0aCA9PSAwICl7XG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH1lbHNle1xuXHRcdFx0Zm9yKCBsZXQgaW5kZXggPSAxOyBpbmRleCA8IGRlcHRoOyBpbmRleCsrICl7XG5cdFx0XHRcdGlmKCBhbmNlc3Rvci5wcm90b3R5cGUucGFyZW50ICl7XG5cdFx0XHRcdFx0YW5jZXN0b3IgPSBhbmNlc3Rvci5wcm90b3R5cGUucGFyZW50O1xuXG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvciggXCJsZXZlbCBvdmVyZmxvd1wiICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRsZXQgc2NvcGUgPSB7IH07XG5cdFx0bGV0IGFuY2VzdG9yUHJvcGVydHkgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyggYW5jZXN0b3IucHJvdG90eXBlICk7XG5cdFx0YW5jZXN0b3JQcm9wZXJ0eS5mb3JFYWNoKCAoIGZ1bmN0aW9uIG9uRWFjaFByb3BlcnR5KCBtZXRob2QgKXtcblx0XHRcdGlmKCBtZXRob2QgIT0gXCJjb25zdHJ1Y3RvclwiICYmXG5cdFx0XHRcdG1ldGhvZCAhPSBcInBhcmVudFwiICYmXG5cdFx0XHRcdG1ldGhvZCAhPSBcImxldmVsXCIgJiZcblx0XHRcdFx0cHJvdHlwZSggYW5jZXN0b3IucHJvdG90eXBlWyBtZXRob2QgXSwgRlVOQ1RJT04gKSApXG5cdFx0XHR7XG5cdFx0XHRcdGxldCBwcm9jZWR1cmUgPSBhbmNlc3Rvci5wcm90b3R5cGVbIG1ldGhvZCBdO1xuXG5cdFx0XHRcdGxldCBkZWxlZ2F0ZSA9ICggZnVuY3Rpb24gZGVsZWdhdGUoICl7XG5cdFx0XHRcdFx0bGV0IHJlc3VsdCA9IHByb2NlZHVyZS5hcHBseSggdGhpcywgcmF6ZSggYXJndW1lbnRzICkgKTtcblxuXHRcdFx0XHRcdGlmKCByZXN1bHQgIT09IHRoaXMgKXtcblx0XHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH0gKS5iaW5kKCB0aGlzICk7XG5cblx0XHRcdFx0YXRlKCBcIm5hbWVcIiwgbWV0aG9kLCBkZWxlZ2F0ZSApO1xuXG5cdFx0XHRcdHNjb3BlWyBtZXRob2QgXSA9IGRlbGVnYXRlO1xuXHRcdFx0fVxuXHRcdH0gKS5iaW5kKCB0aGlzICkgKTtcblxuXHRcdHJldHVybiBzY29wZTtcblx0fTtcblxuXHRyZXR1cm4gY2hpbGQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGhlcmVkaXRvO1xuIl19
