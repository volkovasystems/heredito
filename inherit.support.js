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
              			"eMail": "richeve.bebedor@gmail.com",
              			"contributors": [
              				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>",
              				"Vinse Vinalon <vinsevinalon@gmail.com>"
              			],
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
              */var _create = require("babel-runtime/core-js/object/create");var _create2 = _interopRequireDefault(_create);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var clazof = require("clazof");
var falzy = require("falzy");
var kein = require("kein");
var metod = require("metod");
var protype = require("protype");

var inherit = function inherit(child, parent, connector) {
	/*;
                                                          	@meta-configuration:
                                                          		{
                                                          			"child:required": "function",
                                                          			"parent:required": "function",
                                                          			"connector:required": "function"
                                                          		}
                                                          	@end-meta-configuration
                                                          */

	if (falzy(child) || !protype(child, FUNCTION)) {
		throw new Error("invalid child");
	}

	if (falzy(parent) || !protype(parent, FUNCTION)) {
		throw new Error("invalid parent");
	}

	if (falzy(connector) ||
	!protype(connector, FUNCTION) ||
	!clazof(connector, "Connector"))
	{
		throw new Error("invalid connector");
	}

	if (kein("connector", parent) && clazof(parent.connector, "Connector")) {
		parent.connector.flush();
	}

	if (kein("connector", child) && clazof(child.connector, "Connector")) {
		connector = child.connector;

		connector.reset();
	}

	/*;
   	@note:
   		Inherit the parent to the connector.
   	@end-note
   */
	connector.prototype = (0, _create2.default)(parent.prototype, {
		"constructor": {
			"value": parent,
			"enumerable": false,
			"writable": true,
			"configurable": true } });



	/*;
                              	@note:
                              		Attach the parent to the connector.
                              	@end-note
                              */
	connector.prototype.parent = parent;

	var cache = [];
	metod(child.prototype).forEach(function (method) {return cache.push(method);});

	/*;
                                                                                 	@note:
                                                                                 		Inherit from the connector. This will override the prototype.
                                                                                 	@end-note
                                                                                 */
	child.prototype = (0, _create2.default)(connector.prototype, {
		"constructor": {
			"value": child,
			"enumerable": false,
			"writable": true,
			"configurable": true } });



	/*;
                              	@note:
                              		Transfer the cached properties back to the child.
                              	@end-note
                              */
	cache.forEach(function (method) {return child.prototype[method.name] = method;});

	child.connector = connector;
	child.parent = parent;

	connector.register(child).push(parent).trace(parent);

	return child;
};

module.exports = inherit;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaGVyaXQuc3VwcG9ydC5qcyJdLCJuYW1lcyI6WyJjbGF6b2YiLCJyZXF1aXJlIiwiZmFsenkiLCJrZWluIiwibWV0b2QiLCJwcm90eXBlIiwiaW5oZXJpdCIsImNoaWxkIiwicGFyZW50IiwiY29ubmVjdG9yIiwiRlVOQ1RJT04iLCJFcnJvciIsImZsdXNoIiwicmVzZXQiLCJwcm90b3R5cGUiLCJjYWNoZSIsImZvckVhY2giLCJtZXRob2QiLCJwdXNoIiwibmFtZSIsInJlZ2lzdGVyIiwidHJhY2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZEQSxJQUFNQSxTQUFTQyxRQUFTLFFBQVQsQ0FBZjtBQUNBLElBQU1DLFFBQVFELFFBQVMsT0FBVCxDQUFkO0FBQ0EsSUFBTUUsT0FBT0YsUUFBUyxNQUFULENBQWI7QUFDQSxJQUFNRyxRQUFRSCxRQUFTLE9BQVQsQ0FBZDtBQUNBLElBQU1JLFVBQVVKLFFBQVMsU0FBVCxDQUFoQjs7QUFFQSxJQUFNSyxVQUFVLFNBQVNBLE9BQVQsQ0FBa0JDLEtBQWxCLEVBQXlCQyxNQUF6QixFQUFpQ0MsU0FBakMsRUFBNEM7QUFDM0Q7Ozs7Ozs7Ozs7QUFVQSxLQUFJUCxNQUFPSyxLQUFQLEtBQWtCLENBQUNGLFFBQVNFLEtBQVQsRUFBZ0JHLFFBQWhCLENBQXZCLEVBQW1EO0FBQ2xELFFBQU0sSUFBSUMsS0FBSixDQUFXLGVBQVgsQ0FBTjtBQUNBOztBQUVELEtBQUlULE1BQU9NLE1BQVAsS0FBbUIsQ0FBQ0gsUUFBU0csTUFBVCxFQUFpQkUsUUFBakIsQ0FBeEIsRUFBcUQ7QUFDcEQsUUFBTSxJQUFJQyxLQUFKLENBQVcsZ0JBQVgsQ0FBTjtBQUNBOztBQUVELEtBQUlULE1BQU9PLFNBQVA7QUFDSCxFQUFDSixRQUFTSSxTQUFULEVBQW9CQyxRQUFwQixDQURFO0FBRUgsRUFBQ1YsT0FBUVMsU0FBUixFQUFtQixXQUFuQixDQUZGO0FBR0E7QUFDQyxRQUFNLElBQUlFLEtBQUosQ0FBVyxtQkFBWCxDQUFOO0FBQ0E7O0FBRUQsS0FBSVIsS0FBTSxXQUFOLEVBQW1CSyxNQUFuQixLQUErQlIsT0FBUVEsT0FBT0MsU0FBZixFQUEwQixXQUExQixDQUFuQyxFQUE0RTtBQUMzRUQsU0FBT0MsU0FBUCxDQUFpQkcsS0FBakI7QUFDQTs7QUFFRCxLQUFJVCxLQUFNLFdBQU4sRUFBbUJJLEtBQW5CLEtBQThCUCxPQUFRTyxNQUFNRSxTQUFkLEVBQXlCLFdBQXpCLENBQWxDLEVBQTBFO0FBQ3pFQSxjQUFZRixNQUFNRSxTQUFsQjs7QUFFQUEsWUFBVUksS0FBVjtBQUNBOztBQUVEOzs7OztBQUtBSixXQUFVSyxTQUFWLEdBQXNCLHNCQUFlTixPQUFPTSxTQUF0QixFQUFpQztBQUN0RCxpQkFBZTtBQUNkLFlBQVNOLE1BREs7QUFFZCxpQkFBYyxLQUZBO0FBR2QsZUFBWSxJQUhFO0FBSWQsbUJBQWdCLElBSkYsRUFEdUMsRUFBakMsQ0FBdEI7Ozs7QUFTQTs7Ozs7QUFLQUMsV0FBVUssU0FBVixDQUFvQk4sTUFBcEIsR0FBNkJBLE1BQTdCOztBQUVBLEtBQUlPLFFBQVEsRUFBWjtBQUNBWCxPQUFPRyxNQUFNTyxTQUFiLEVBQXlCRSxPQUF6QixDQUFrQyxVQUFFQyxNQUFGLFVBQWNGLE1BQU1HLElBQU4sQ0FBWUQsTUFBWixDQUFkLEVBQWxDOztBQUVBOzs7OztBQUtBVixPQUFNTyxTQUFOLEdBQWtCLHNCQUFlTCxVQUFVSyxTQUF6QixFQUFvQztBQUNyRCxpQkFBZTtBQUNkLFlBQVNQLEtBREs7QUFFZCxpQkFBYyxLQUZBO0FBR2QsZUFBWSxJQUhFO0FBSWQsbUJBQWdCLElBSkYsRUFEc0MsRUFBcEMsQ0FBbEI7Ozs7QUFTQTs7Ozs7QUFLQVEsT0FBTUMsT0FBTixDQUFlLFVBQUVDLE1BQUYsVUFBZ0JWLE1BQU1PLFNBQU4sQ0FBaUJHLE9BQU9FLElBQXhCLElBQWlDRixNQUFqRCxFQUFmOztBQUVBVixPQUFNRSxTQUFOLEdBQWtCQSxTQUFsQjtBQUNBRixPQUFNQyxNQUFOLEdBQWVBLE1BQWY7O0FBRUFDLFdBQVVXLFFBQVYsQ0FBb0JiLEtBQXBCLEVBQTRCVyxJQUE1QixDQUFrQ1YsTUFBbEMsRUFBMkNhLEtBQTNDLENBQWtEYixNQUFsRDs7QUFFQSxRQUFPRCxLQUFQO0FBQ0EsQ0F2RkQ7O0FBeUZBZSxPQUFPQyxPQUFQLEdBQWlCakIsT0FBakIiLCJmaWxlIjoiaW5oZXJpdC5zdXBwb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qO1xuXHRAc3VibW9kdWxlLWxpY2Vuc2U6XG5cdFx0VGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cdFx0QG1pdC1saWNlbnNlXG5cblx0XHRDb3B5cmlnaHQgKEBjKSAyMDE3IFJpY2hldmUgU2lvZGluYSBCZWJlZG9yXG5cdFx0QGVtYWlsOiByaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXG5cblx0XHRQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5cdFx0b2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuXHRcdGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcblx0XHR0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5cdFx0Y29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5cdFx0ZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuXHRcdFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuXHRcdGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblx0XHRUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5cdFx0SU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5cdFx0RklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5cdFx0QVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuXHRcdExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5cdFx0T1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblx0XHRTT0ZUV0FSRS5cblx0QGVuZC1zdWJtb2R1bGUtbGljZW5zZVxuXG5cdEBzdWJtb2R1bGUtY29uZmlndXJhdGlvbjpcblx0XHR7XG5cdFx0XHRcInBhY2thZ2VcIjogXCJoZXJlZGl0b1wiLFxuXHRcdFx0XCJwYXRoXCI6IFwiaGVyZWRpdG8vaW5oZXJpdC5qc1wiLFxuXHRcdFx0XCJmaWxlXCI6IFwiaW5oZXJpdC5qc1wiLFxuXHRcdFx0XCJtb2R1bGVcIjogXCJoZXJlZGl0b1wiLFxuXHRcdFx0XCJhdXRob3JcIjogXCJSaWNoZXZlIFMuIEJlYmVkb3JcIixcblx0XHRcdFwiZU1haWxcIjogXCJyaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXCIsXG5cdFx0XHRcImNvbnRyaWJ1dG9yc1wiOiBbXG5cdFx0XHRcdFwiSm9obiBMZW5vbiBNYWdoYW5veSA8am9obmxlbm9ubWFnaGFub3lAZ21haWwuY29tPlwiLFxuXHRcdFx0XHRcIlZpbnNlIFZpbmFsb24gPHZpbnNldmluYWxvbkBnbWFpbC5jb20+XCJcblx0XHRcdF0sXG5cdFx0XHRcInJlcG9zaXRvcnlcIjogXCJodHRwczovL2dpdGh1Yi5jb20vdm9sa292YXN5c3RlbXMvaGVyZWRpdG8uZ2l0XCIsXG5cdFx0XHRcInRlc3RcIjogXCJoZXJlZGl0by10ZXN0LmpzXCIsXG5cdFx0XHRcImdsb2JhbFwiOiBmYWxzZSxcblx0XHRcdFwiaW50ZXJuYWxcIjogdHJ1ZVxuXHRcdH1cblx0QGVuZC1zdWJtb2R1bGUtY29uZmlndXJhdGlvblxuXG5cdEBzdWJtb2R1bGUtZG9jdW1lbnRhdGlvbjpcblx0XHRJbmhlcml0YW5jZSBwcm9jZWR1cmUuXG5cdEBlbmQtc3VibW9kdWxlLWRvY3VtZW50YXRpb25cblxuXHRAaW5jbHVkZTpcblx0XHR7XG5cdFx0XHRcImNsYXpvZlwiOiBcImNsYXpvZlwiLFxuXHRcdFx0XCJmYWx6eVwiOiBcImZhbHp5XCIsXG5cdFx0XHRcImtlaW5cIjogXCJrZWluXCIsXG5cdFx0XHRcIm1ldG9kXCI6IFwibWV0b2RcIixcblx0XHRcdFwicHJvdHlwZVwiOiBcInByb3R5cGVcIlxuXHRcdH1cblx0QGVuZC1pbmNsdWRlXG4qL1xuXG5jb25zdCBjbGF6b2YgPSByZXF1aXJlKCBcImNsYXpvZlwiICk7XG5jb25zdCBmYWx6eSA9IHJlcXVpcmUoIFwiZmFsenlcIiApO1xuY29uc3Qga2VpbiA9IHJlcXVpcmUoIFwia2VpblwiICk7XG5jb25zdCBtZXRvZCA9IHJlcXVpcmUoIFwibWV0b2RcIiApO1xuY29uc3QgcHJvdHlwZSA9IHJlcXVpcmUoIFwicHJvdHlwZVwiICk7XG5cbmNvbnN0IGluaGVyaXQgPSBmdW5jdGlvbiBpbmhlcml0KCBjaGlsZCwgcGFyZW50LCBjb25uZWN0b3IgKXtcblx0Lyo7XG5cdFx0QG1ldGEtY29uZmlndXJhdGlvbjpcblx0XHRcdHtcblx0XHRcdFx0XCJjaGlsZDpyZXF1aXJlZFwiOiBcImZ1bmN0aW9uXCIsXG5cdFx0XHRcdFwicGFyZW50OnJlcXVpcmVkXCI6IFwiZnVuY3Rpb25cIixcblx0XHRcdFx0XCJjb25uZWN0b3I6cmVxdWlyZWRcIjogXCJmdW5jdGlvblwiXG5cdFx0XHR9XG5cdFx0QGVuZC1tZXRhLWNvbmZpZ3VyYXRpb25cblx0Ki9cblxuXHRpZiggZmFsenkoIGNoaWxkICkgfHwgIXByb3R5cGUoIGNoaWxkLCBGVU5DVElPTiApICl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImludmFsaWQgY2hpbGRcIiApO1xuXHR9XG5cblx0aWYoIGZhbHp5KCBwYXJlbnQgKSB8fCAhcHJvdHlwZSggcGFyZW50LCBGVU5DVElPTiApICl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImludmFsaWQgcGFyZW50XCIgKTtcblx0fVxuXG5cdGlmKCBmYWx6eSggY29ubmVjdG9yICkgfHxcblx0XHQhcHJvdHlwZSggY29ubmVjdG9yLCBGVU5DVElPTiApIHx8XG5cdFx0IWNsYXpvZiggY29ubmVjdG9yLCBcIkNvbm5lY3RvclwiICkgKVxuXHR7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImludmFsaWQgY29ubmVjdG9yXCIgKTtcblx0fVxuXG5cdGlmKCBrZWluKCBcImNvbm5lY3RvclwiLCBwYXJlbnQgKSAmJiBjbGF6b2YoIHBhcmVudC5jb25uZWN0b3IsIFwiQ29ubmVjdG9yXCIgKSApe1xuXHRcdHBhcmVudC5jb25uZWN0b3IuZmx1c2goICk7XG5cdH1cblxuXHRpZigga2VpbiggXCJjb25uZWN0b3JcIiwgY2hpbGQgKSAmJiBjbGF6b2YoIGNoaWxkLmNvbm5lY3RvciwgXCJDb25uZWN0b3JcIiApICl7XG5cdFx0Y29ubmVjdG9yID0gY2hpbGQuY29ubmVjdG9yO1xuXG5cdFx0Y29ubmVjdG9yLnJlc2V0KCApO1xuXHR9XG5cblx0Lyo7XG5cdFx0QG5vdGU6XG5cdFx0XHRJbmhlcml0IHRoZSBwYXJlbnQgdG8gdGhlIGNvbm5lY3Rvci5cblx0XHRAZW5kLW5vdGVcblx0Ki9cblx0Y29ubmVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIHBhcmVudC5wcm90b3R5cGUsIHtcblx0XHRcImNvbnN0cnVjdG9yXCI6IHtcblx0XHRcdFwidmFsdWVcIjogcGFyZW50LFxuXHRcdFx0XCJlbnVtZXJhYmxlXCI6IGZhbHNlLFxuXHRcdFx0XCJ3cml0YWJsZVwiOiB0cnVlLFxuXHRcdFx0XCJjb25maWd1cmFibGVcIjogdHJ1ZVxuXHRcdH1cblx0fSApO1xuXG5cdC8qO1xuXHRcdEBub3RlOlxuXHRcdFx0QXR0YWNoIHRoZSBwYXJlbnQgdG8gdGhlIGNvbm5lY3Rvci5cblx0XHRAZW5kLW5vdGVcblx0Ki9cblx0Y29ubmVjdG9yLnByb3RvdHlwZS5wYXJlbnQgPSBwYXJlbnQ7XG5cblx0bGV0IGNhY2hlID0gWyBdO1xuXHRtZXRvZCggY2hpbGQucHJvdG90eXBlICkuZm9yRWFjaCggKCBtZXRob2QgKSA9PiBjYWNoZS5wdXNoKCBtZXRob2QgKSApO1xuXG5cdC8qO1xuXHRcdEBub3RlOlxuXHRcdFx0SW5oZXJpdCBmcm9tIHRoZSBjb25uZWN0b3IuIFRoaXMgd2lsbCBvdmVycmlkZSB0aGUgcHJvdG90eXBlLlxuXHRcdEBlbmQtbm90ZVxuXHQqL1xuXHRjaGlsZC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBjb25uZWN0b3IucHJvdG90eXBlLCB7XG5cdFx0XCJjb25zdHJ1Y3RvclwiOiB7XG5cdFx0XHRcInZhbHVlXCI6IGNoaWxkLFxuXHRcdFx0XCJlbnVtZXJhYmxlXCI6IGZhbHNlLFxuXHRcdFx0XCJ3cml0YWJsZVwiOiB0cnVlLFxuXHRcdFx0XCJjb25maWd1cmFibGVcIjogdHJ1ZVxuXHRcdH1cblx0fSApO1xuXG5cdC8qO1xuXHRcdEBub3RlOlxuXHRcdFx0VHJhbnNmZXIgdGhlIGNhY2hlZCBwcm9wZXJ0aWVzIGJhY2sgdG8gdGhlIGNoaWxkLlxuXHRcdEBlbmQtbm90ZVxuXHQqL1xuXHRjYWNoZS5mb3JFYWNoKCAoIG1ldGhvZCApID0+ICggY2hpbGQucHJvdG90eXBlWyBtZXRob2QubmFtZSBdID0gbWV0aG9kICkgKTtcblxuXHRjaGlsZC5jb25uZWN0b3IgPSBjb25uZWN0b3I7XG5cdGNoaWxkLnBhcmVudCA9IHBhcmVudDtcblxuXHRjb25uZWN0b3IucmVnaXN0ZXIoIGNoaWxkICkucHVzaCggcGFyZW50ICkudHJhY2UoIHBhcmVudCApO1xuXG5cdHJldHVybiBjaGlsZDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaW5oZXJpdDtcbiJdfQ==
//# sourceMappingURL=inherit.support.js.map
