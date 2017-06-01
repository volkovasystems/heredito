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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaGVyaXQuc3VwcG9ydC5qcyJdLCJuYW1lcyI6WyJjbGF6b2YiLCJyZXF1aXJlIiwiZmFsenkiLCJrZWluIiwibWV0b2QiLCJwcm90eXBlIiwiaW5oZXJpdCIsImNoaWxkIiwicGFyZW50IiwiY29ubmVjdG9yIiwiRlVOQ1RJT04iLCJFcnJvciIsImZsdXNoIiwicmVzZXQiLCJwcm90b3R5cGUiLCJjYWNoZSIsImZvckVhY2giLCJtZXRob2QiLCJwdXNoIiwibmFtZSIsInJlZ2lzdGVyIiwidHJhY2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNERBLElBQU1BLFNBQVNDLFFBQVMsUUFBVCxDQUFmO0FBQ0EsSUFBTUMsUUFBUUQsUUFBUyxPQUFULENBQWQ7QUFDQSxJQUFNRSxPQUFPRixRQUFTLE1BQVQsQ0FBYjtBQUNBLElBQU1HLFFBQVFILFFBQVMsT0FBVCxDQUFkO0FBQ0EsSUFBTUksVUFBVUosUUFBUyxTQUFULENBQWhCOztBQUVBLElBQU1LLFVBQVUsU0FBU0EsT0FBVCxDQUFrQkMsS0FBbEIsRUFBeUJDLE1BQXpCLEVBQWlDQyxTQUFqQyxFQUE0QztBQUMzRDs7Ozs7Ozs7OztBQVVBLEtBQUlQLE1BQU9LLEtBQVAsS0FBa0IsQ0FBQ0YsUUFBU0UsS0FBVCxFQUFnQkcsUUFBaEIsQ0FBdkIsRUFBbUQ7QUFDbEQsUUFBTSxJQUFJQyxLQUFKLENBQVcsZUFBWCxDQUFOO0FBQ0E7O0FBRUQsS0FBSVQsTUFBT00sTUFBUCxLQUFtQixDQUFDSCxRQUFTRyxNQUFULEVBQWlCRSxRQUFqQixDQUF4QixFQUFxRDtBQUNwRCxRQUFNLElBQUlDLEtBQUosQ0FBVyxnQkFBWCxDQUFOO0FBQ0E7O0FBRUQsS0FBSVQsTUFBT08sU0FBUDtBQUNILEVBQUNKLFFBQVNJLFNBQVQsRUFBb0JDLFFBQXBCLENBREU7QUFFSCxFQUFDVixPQUFRUyxTQUFSLEVBQW1CLFdBQW5CLENBRkY7QUFHQTtBQUNDLFFBQU0sSUFBSUUsS0FBSixDQUFXLG1CQUFYLENBQU47QUFDQTs7QUFFRCxLQUFJUixLQUFNLFdBQU4sRUFBbUJLLE1BQW5CLEtBQStCUixPQUFRUSxPQUFPQyxTQUFmLEVBQTBCLFdBQTFCLENBQW5DLEVBQTRFO0FBQzNFRCxTQUFPQyxTQUFQLENBQWlCRyxLQUFqQjtBQUNBOztBQUVELEtBQUlULEtBQU0sV0FBTixFQUFtQkksS0FBbkIsS0FBOEJQLE9BQVFPLE1BQU1FLFNBQWQsRUFBeUIsV0FBekIsQ0FBbEMsRUFBMEU7QUFDekVBLGNBQVlGLE1BQU1FLFNBQWxCOztBQUVBQSxZQUFVSSxLQUFWO0FBQ0E7O0FBRUQ7Ozs7O0FBS0FKLFdBQVVLLFNBQVYsR0FBc0Isc0JBQWVOLE9BQU9NLFNBQXRCLEVBQWlDO0FBQ3RELGlCQUFlO0FBQ2QsWUFBU04sTUFESztBQUVkLGlCQUFjLEtBRkE7QUFHZCxlQUFZLElBSEU7QUFJZCxtQkFBZ0IsSUFKRixFQUR1QyxFQUFqQyxDQUF0Qjs7OztBQVNBOzs7OztBQUtBQyxXQUFVSyxTQUFWLENBQW9CTixNQUFwQixHQUE2QkEsTUFBN0I7O0FBRUEsS0FBSU8sUUFBUSxFQUFaO0FBQ0FYLE9BQU9HLE1BQU1PLFNBQWIsRUFBeUJFLE9BQXpCLENBQWtDLFVBQUVDLE1BQUYsVUFBY0YsTUFBTUcsSUFBTixDQUFZRCxNQUFaLENBQWQsRUFBbEM7O0FBRUE7Ozs7O0FBS0FWLE9BQU1PLFNBQU4sR0FBa0Isc0JBQWVMLFVBQVVLLFNBQXpCLEVBQW9DO0FBQ3JELGlCQUFlO0FBQ2QsWUFBU1AsS0FESztBQUVkLGlCQUFjLEtBRkE7QUFHZCxlQUFZLElBSEU7QUFJZCxtQkFBZ0IsSUFKRixFQURzQyxFQUFwQyxDQUFsQjs7OztBQVNBOzs7OztBQUtBUSxPQUFNQyxPQUFOLENBQWUsVUFBRUMsTUFBRixVQUFnQlYsTUFBTU8sU0FBTixDQUFpQkcsT0FBT0UsSUFBeEIsSUFBaUNGLE1BQWpELEVBQWY7O0FBRUFWLE9BQU1FLFNBQU4sR0FBa0JBLFNBQWxCO0FBQ0FGLE9BQU1DLE1BQU4sR0FBZUEsTUFBZjs7QUFFQUMsV0FBVVcsUUFBVixDQUFvQmIsS0FBcEIsRUFBNEJXLElBQTVCLENBQWtDVixNQUFsQyxFQUEyQ2EsS0FBM0MsQ0FBa0RiLE1BQWxEOztBQUVBLFFBQU9ELEtBQVA7QUFDQSxDQXZGRDs7QUF5RkFlLE9BQU9DLE9BQVAsR0FBaUJqQixPQUFqQiIsImZpbGUiOiJpbmhlcml0LnN1cHBvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLyo7XG5cdEBzdWJtb2R1bGUtbGljZW5zZTpcblx0XHRUaGUgTUlUIExpY2Vuc2UgKE1JVClcblx0XHRAbWl0LWxpY2Vuc2VcblxuXHRcdENvcHlyaWdodCAoQGMpIDIwMTcgUmljaGV2ZSBTaW9kaW5hIEJlYmVkb3Jcblx0XHRAZW1haWw6IHJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cblxuXHRcdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcblx0XHRvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5cdFx0aW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuXHRcdHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcblx0XHRjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcblx0XHRmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5cdFx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5cdFx0Y29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuXHRcdFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcblx0XHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcblx0XHRGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcblx0XHRBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5cdFx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcblx0XHRPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuXHRcdFNPRlRXQVJFLlxuXHRAZW5kLXN1Ym1vZHVsZS1saWNlbnNlXG5cblx0QHN1Ym1vZHVsZS1jb25maWd1cmF0aW9uOlxuXHRcdHtcblx0XHRcdFwicGFja2FnZVwiOiBcImhlcmVkaXRvXCIsXG5cdFx0XHRcInBhdGhcIjogXCJoZXJlZGl0by9pbmhlcml0LmpzXCIsXG5cdFx0XHRcImZpbGVcIjogXCJpbmhlcml0LmpzXCIsXG5cdFx0XHRcIm1vZHVsZVwiOiBcImhlcmVkaXRvXCIsXG5cdFx0XHRcImF1dGhvclwiOiBcIlJpY2hldmUgUy4gQmViZWRvclwiLFxuXHRcdFx0XCJjb250cmlidXRvcnNcIjogW1xuXHRcdFx0XHRcIkpvaG4gTGVub24gTWFnaGFub3kgPGpvaG5sZW5vbm1hZ2hhbm95QGdtYWlsLmNvbT5cIlxuXHRcdFx0XSxcblx0XHRcdFwiZU1haWxcIjogXCJyaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXCIsXG5cdFx0XHRcInJlcG9zaXRvcnlcIjogXCJodHRwczovL2dpdGh1Yi5jb20vdm9sa292YXN5c3RlbXMvaGVyZWRpdG8uZ2l0XCIsXG5cdFx0XHRcInRlc3RcIjogXCJoZXJlZGl0by10ZXN0LmpzXCIsXG5cdFx0XHRcImdsb2JhbFwiOiBmYWxzZSxcblx0XHRcdFwiaW50ZXJuYWxcIjogdHJ1ZVxuXHRcdH1cblx0QGVuZC1zdWJtb2R1bGUtY29uZmlndXJhdGlvblxuXG5cdEBzdWJtb2R1bGUtZG9jdW1lbnRhdGlvbjpcblx0XHRJbmhlcml0YW5jZSBwcm9jZWR1cmUuXG5cdEBlbmQtc3VibW9kdWxlLWRvY3VtZW50YXRpb25cblxuXHRAaW5jbHVkZTpcblx0XHR7XG5cdFx0XHRcImNsYXpvZlwiOiBcImNsYXpvZlwiLFxuXHRcdFx0XCJmYWx6eVwiOiBcImZhbHp5XCIsXG5cdFx0XHRcImtlaW5cIjogXCJrZWluXCIsXG5cdFx0XHRcIm1ldG9kXCI6IFwibWV0b2RcIixcblx0XHRcdFwicHJvdHlwZVwiOiBcInByb3R5cGVcIlxuXHRcdH1cblx0QGVuZC1pbmNsdWRlXG4qL1xuXG5jb25zdCBjbGF6b2YgPSByZXF1aXJlKCBcImNsYXpvZlwiICk7XG5jb25zdCBmYWx6eSA9IHJlcXVpcmUoIFwiZmFsenlcIiApO1xuY29uc3Qga2VpbiA9IHJlcXVpcmUoIFwia2VpblwiICk7XG5jb25zdCBtZXRvZCA9IHJlcXVpcmUoIFwibWV0b2RcIiApO1xuY29uc3QgcHJvdHlwZSA9IHJlcXVpcmUoIFwicHJvdHlwZVwiICk7XG5cbmNvbnN0IGluaGVyaXQgPSBmdW5jdGlvbiBpbmhlcml0KCBjaGlsZCwgcGFyZW50LCBjb25uZWN0b3IgKXtcblx0Lyo7XG5cdFx0QG1ldGEtY29uZmlndXJhdGlvbjpcblx0XHRcdHtcblx0XHRcdFx0XCJjaGlsZDpyZXF1aXJlZFwiOiBcImZ1bmN0aW9uXCIsXG5cdFx0XHRcdFwicGFyZW50OnJlcXVpcmVkXCI6IFwiZnVuY3Rpb25cIixcblx0XHRcdFx0XCJjb25uZWN0b3I6cmVxdWlyZWRcIjogXCJmdW5jdGlvblwiXG5cdFx0XHR9XG5cdFx0QGVuZC1tZXRhLWNvbmZpZ3VyYXRpb25cblx0Ki9cblxuXHRpZiggZmFsenkoIGNoaWxkICkgfHwgIXByb3R5cGUoIGNoaWxkLCBGVU5DVElPTiApICl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImludmFsaWQgY2hpbGRcIiApO1xuXHR9XG5cblx0aWYoIGZhbHp5KCBwYXJlbnQgKSB8fCAhcHJvdHlwZSggcGFyZW50LCBGVU5DVElPTiApICl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImludmFsaWQgcGFyZW50XCIgKTtcblx0fVxuXG5cdGlmKCBmYWx6eSggY29ubmVjdG9yICkgfHxcblx0XHQhcHJvdHlwZSggY29ubmVjdG9yLCBGVU5DVElPTiApIHx8XG5cdFx0IWNsYXpvZiggY29ubmVjdG9yLCBcIkNvbm5lY3RvclwiICkgKVxuXHR7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImludmFsaWQgY29ubmVjdG9yXCIgKTtcblx0fVxuXG5cdGlmKCBrZWluKCBcImNvbm5lY3RvclwiLCBwYXJlbnQgKSAmJiBjbGF6b2YoIHBhcmVudC5jb25uZWN0b3IsIFwiQ29ubmVjdG9yXCIgKSApe1xuXHRcdHBhcmVudC5jb25uZWN0b3IuZmx1c2goICk7XG5cdH1cblxuXHRpZigga2VpbiggXCJjb25uZWN0b3JcIiwgY2hpbGQgKSAmJiBjbGF6b2YoIGNoaWxkLmNvbm5lY3RvciwgXCJDb25uZWN0b3JcIiApICl7XG5cdFx0Y29ubmVjdG9yID0gY2hpbGQuY29ubmVjdG9yO1xuXG5cdFx0Y29ubmVjdG9yLnJlc2V0KCApO1xuXHR9XG5cblx0Lyo7XG5cdFx0QG5vdGU6XG5cdFx0XHRJbmhlcml0IHRoZSBwYXJlbnQgdG8gdGhlIGNvbm5lY3Rvci5cblx0XHRAZW5kLW5vdGVcblx0Ki9cblx0Y29ubmVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIHBhcmVudC5wcm90b3R5cGUsIHtcblx0XHRcImNvbnN0cnVjdG9yXCI6IHtcblx0XHRcdFwidmFsdWVcIjogcGFyZW50LFxuXHRcdFx0XCJlbnVtZXJhYmxlXCI6IGZhbHNlLFxuXHRcdFx0XCJ3cml0YWJsZVwiOiB0cnVlLFxuXHRcdFx0XCJjb25maWd1cmFibGVcIjogdHJ1ZVxuXHRcdH1cblx0fSApO1xuXG5cdC8qO1xuXHRcdEBub3RlOlxuXHRcdFx0QXR0YWNoIHRoZSBwYXJlbnQgdG8gdGhlIGNvbm5lY3Rvci5cblx0XHRAZW5kLW5vdGVcblx0Ki9cblx0Y29ubmVjdG9yLnByb3RvdHlwZS5wYXJlbnQgPSBwYXJlbnQ7XG5cblx0bGV0IGNhY2hlID0gWyBdO1xuXHRtZXRvZCggY2hpbGQucHJvdG90eXBlICkuZm9yRWFjaCggKCBtZXRob2QgKSA9PiBjYWNoZS5wdXNoKCBtZXRob2QgKSApO1xuXG5cdC8qO1xuXHRcdEBub3RlOlxuXHRcdFx0SW5oZXJpdCBmcm9tIHRoZSBjb25uZWN0b3IuIFRoaXMgd2lsbCBvdmVycmlkZSB0aGUgcHJvdG90eXBlLlxuXHRcdEBlbmQtbm90ZVxuXHQqL1xuXHRjaGlsZC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBjb25uZWN0b3IucHJvdG90eXBlLCB7XG5cdFx0XCJjb25zdHJ1Y3RvclwiOiB7XG5cdFx0XHRcInZhbHVlXCI6IGNoaWxkLFxuXHRcdFx0XCJlbnVtZXJhYmxlXCI6IGZhbHNlLFxuXHRcdFx0XCJ3cml0YWJsZVwiOiB0cnVlLFxuXHRcdFx0XCJjb25maWd1cmFibGVcIjogdHJ1ZVxuXHRcdH1cblx0fSApO1xuXG5cdC8qO1xuXHRcdEBub3RlOlxuXHRcdFx0VHJhbnNmZXIgdGhlIGNhY2hlZCBwcm9wZXJ0aWVzIGJhY2sgdG8gdGhlIGNoaWxkLlxuXHRcdEBlbmQtbm90ZVxuXHQqL1xuXHRjYWNoZS5mb3JFYWNoKCAoIG1ldGhvZCApID0+ICggY2hpbGQucHJvdG90eXBlWyBtZXRob2QubmFtZSBdID0gbWV0aG9kICkgKTtcblxuXHRjaGlsZC5jb25uZWN0b3IgPSBjb25uZWN0b3I7XG5cdGNoaWxkLnBhcmVudCA9IHBhcmVudDtcblxuXHRjb25uZWN0b3IucmVnaXN0ZXIoIGNoaWxkICkucHVzaCggcGFyZW50ICkudHJhY2UoIHBhcmVudCApO1xuXG5cdHJldHVybiBjaGlsZDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaW5oZXJpdDtcbiJdfQ==
//# sourceMappingURL=inherit.support.js.map
