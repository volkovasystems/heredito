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
              		Extensive inheritance.
              	@end-module-documentation
              
              	@include:
              		{
              			"apiqe": "apiqe",
              			"dictate": "dictate",
              			"falzy": "falzy",
              			"firs": "firs",
              			"leveld": "leveld",
              			"protype": "protype",
              			"rder": "rder",
              			"reclas": "reclas",
              			"sepby": "sepby",
              			"shft": "shft",
              			"wauker": "wauker",
              			"x10cv": "x10cv"
              		}
              	@end-include
              */

var apiqe = require("apiqe");
var dictate = require("dictate");
var falzy = require("falzy");
var firs = require("firs");
var leveld = require("leveld");
var protype = require("protype");
var rder = require("rder");
var reclas = require("reclas");
var sepby = require("sepby");
var shft = require("shft");
var wauker = require("wauker");
var x10cv = require("x10cv");



//: @client:
var connect = require("./connect.support.js");
var inherit = require("./inherit.support.js");
//: @end-client

var heredito = function heredito(child, parent) {
	/*;
                                                 	@meta-configuration:
                                                 		{
                                                 			"child:required": "function",
                                                 			"parent:required": [
                                                 				"function",
                                                 				"[function]",
                                                 				"...function"
                                                 			]
                                                 		}
                                                 	@end-meta-configuration
                                                 */

	if (falzy(child) || !protype(child, FUNCTION)) {
		throw new Error("invalid child");
	}

	if (falzy(parent) || !protype(parent, FUNCTION)) {
		throw new Error("invalid parent");
	}

	parent = shft(arguments).filter(function (parameter) {return protype(parameter, FUNCTION);});

	var order = rder(parent, "name");

	parent = leveld(parent.map(wauker)).map(function (blueprint) {return reclas(blueprint);});

	child = wauker(child).map(function (blueprint) {return reclas(blueprint);});

	parent = dictate(parent.concat(shft(child)), order, "name");

	var tree = apiqe(firs(child), parent).reverse();

	return sepby(tree, function (blueprint) {return x10cv(blueprint);}).
	reduce(function (parent, child) {return inherit(child, parent, connect());});
};

module.exports = heredito;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlcmVkaXRvLnN1cHBvcnQuanMiXSwibmFtZXMiOlsiYXBpcWUiLCJyZXF1aXJlIiwiZGljdGF0ZSIsImZhbHp5IiwiZmlycyIsImxldmVsZCIsInByb3R5cGUiLCJyZGVyIiwicmVjbGFzIiwic2VwYnkiLCJzaGZ0Iiwid2F1a2VyIiwieDEwY3YiLCJjb25uZWN0IiwiaW5oZXJpdCIsImhlcmVkaXRvIiwiY2hpbGQiLCJwYXJlbnQiLCJGVU5DVElPTiIsIkVycm9yIiwiYXJndW1lbnRzIiwiZmlsdGVyIiwicGFyYW1ldGVyIiwib3JkZXIiLCJtYXAiLCJibHVlcHJpbnQiLCJjb25jYXQiLCJ0cmVlIiwicmV2ZXJzZSIsInJlZHVjZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlFQSxJQUFNQSxRQUFRQyxRQUFTLE9BQVQsQ0FBZDtBQUNBLElBQU1DLFVBQVVELFFBQVMsU0FBVCxDQUFoQjtBQUNBLElBQU1FLFFBQVFGLFFBQVMsT0FBVCxDQUFkO0FBQ0EsSUFBTUcsT0FBT0gsUUFBUyxNQUFULENBQWI7QUFDQSxJQUFNSSxTQUFTSixRQUFTLFFBQVQsQ0FBZjtBQUNBLElBQU1LLFVBQVVMLFFBQVMsU0FBVCxDQUFoQjtBQUNBLElBQU1NLE9BQU9OLFFBQVMsTUFBVCxDQUFiO0FBQ0EsSUFBTU8sU0FBU1AsUUFBUyxRQUFULENBQWY7QUFDQSxJQUFNUSxRQUFRUixRQUFTLE9BQVQsQ0FBZDtBQUNBLElBQU1TLE9BQU9ULFFBQVMsTUFBVCxDQUFiO0FBQ0EsSUFBTVUsU0FBU1YsUUFBUyxRQUFULENBQWY7QUFDQSxJQUFNVyxRQUFRWCxRQUFTLE9BQVQsQ0FBZDs7OztBQUlBO0FBQ0EsSUFBTVksVUFBVVosUUFBUyxzQkFBVCxDQUFoQjtBQUNBLElBQU1hLFVBQVViLFFBQVMsc0JBQVQsQ0FBaEI7QUFDQTs7QUFFQSxJQUFNYyxXQUFXLFNBQVNBLFFBQVQsQ0FBbUJDLEtBQW5CLEVBQTBCQyxNQUExQixFQUFrQztBQUNsRDs7Ozs7Ozs7Ozs7OztBQWFBLEtBQUlkLE1BQU9hLEtBQVAsS0FBa0IsQ0FBQ1YsUUFBU1UsS0FBVCxFQUFnQkUsUUFBaEIsQ0FBdkIsRUFBbUQ7QUFDbEQsUUFBTSxJQUFJQyxLQUFKLENBQVcsZUFBWCxDQUFOO0FBQ0E7O0FBRUQsS0FBSWhCLE1BQU9jLE1BQVAsS0FBbUIsQ0FBQ1gsUUFBU1csTUFBVCxFQUFpQkMsUUFBakIsQ0FBeEIsRUFBcUQ7QUFDcEQsUUFBTSxJQUFJQyxLQUFKLENBQVcsZ0JBQVgsQ0FBTjtBQUNBOztBQUVERixVQUFTUCxLQUFNVSxTQUFOLEVBQWtCQyxNQUFsQixDQUEwQixVQUFFQyxTQUFGLFVBQWlCaEIsUUFBU2dCLFNBQVQsRUFBb0JKLFFBQXBCLENBQWpCLEVBQTFCLENBQVQ7O0FBRUEsS0FBSUssUUFBUWhCLEtBQU1VLE1BQU4sRUFBYyxNQUFkLENBQVo7O0FBRUFBLFVBQVNaLE9BQVFZLE9BQU9PLEdBQVAsQ0FBWWIsTUFBWixDQUFSLEVBQStCYSxHQUEvQixDQUFvQyxVQUFFQyxTQUFGLFVBQWlCakIsT0FBUWlCLFNBQVIsQ0FBakIsRUFBcEMsQ0FBVDs7QUFFQVQsU0FBUUwsT0FBUUssS0FBUixFQUFnQlEsR0FBaEIsQ0FBcUIsVUFBRUMsU0FBRixVQUFpQmpCLE9BQVFpQixTQUFSLENBQWpCLEVBQXJCLENBQVI7O0FBRUFSLFVBQVNmLFFBQVNlLE9BQU9TLE1BQVAsQ0FBZWhCLEtBQU1NLEtBQU4sQ0FBZixDQUFULEVBQXlDTyxLQUF6QyxFQUFnRCxNQUFoRCxDQUFUOztBQUVBLEtBQUlJLE9BQU8zQixNQUFPSSxLQUFNWSxLQUFOLENBQVAsRUFBc0JDLE1BQXRCLEVBQStCVyxPQUEvQixFQUFYOztBQUVBLFFBQU9uQixNQUFPa0IsSUFBUCxFQUFhLFVBQUVGLFNBQUYsVUFBaUJiLE1BQU9hLFNBQVAsQ0FBakIsRUFBYjtBQUNMSSxPQURLLENBQ0csVUFBRVosTUFBRixFQUFVRCxLQUFWLFVBQXFCRixRQUFTRSxLQUFULEVBQWdCQyxNQUFoQixFQUF3QkosU0FBeEIsQ0FBckIsRUFESCxDQUFQO0FBRUEsQ0FwQ0Q7O0FBc0NBaUIsT0FBT0MsT0FBUCxHQUFpQmhCLFFBQWpCIiwiZmlsZSI6ImhlcmVkaXRvLnN1cHBvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLyo7XG5cdEBtb2R1bGUtbGljZW5zZTpcblx0XHRUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuXHRcdENvcHlyaWdodCAoQGMpIDIwMTcgUmljaGV2ZSBTaW9kaW5hIEJlYmVkb3Jcblx0XHRAZW1haWw6IHJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cblxuXHRcdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcblx0XHRvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5cdFx0aW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuXHRcdHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcblx0XHRjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcblx0XHRmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5cdFx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5cdFx0Y29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuXHRcdFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcblx0XHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcblx0XHRGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcblx0XHRBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5cdFx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcblx0XHRPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuXHRcdFNPRlRXQVJFLlxuXHRAZW5kLW1vZHVsZS1saWNlbnNlXG5cblx0QG1vZHVsZS1jb25maWd1cmF0aW9uOlxuXHRcdHtcblx0XHRcdFwicGFja2FnZVwiOiBcImhlcmVkaXRvXCIsXG5cdFx0XHRcInBhdGhcIjogXCJoZXJlZGl0by9oZXJlZGl0by5qc1wiLFxuXHRcdFx0XCJmaWxlXCI6IFwiaGVyZWRpdG8uanNcIixcblx0XHRcdFwibW9kdWxlXCI6IFwiaGVyZWRpdG9cIixcblx0XHRcdFwiYXV0aG9yXCI6IFwiUmljaGV2ZSBTLiBCZWJlZG9yXCIsXG5cdFx0XHRcImNvbnRyaWJ1dG9yc1wiOiBbXG5cdFx0XHRcdFwiSm9obiBMZW5vbiBNYWdoYW5veSA8am9obmxlbm9ubWFnaGFub3lAZ21haWwuY29tPlwiXG5cdFx0XHRdLFxuXHRcdFx0XCJlTWFpbFwiOiBcInJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cIixcblx0XHRcdFwicmVwb3NpdG9yeVwiOiBcImdpdEBnaXRodWIuY29tOnZvbGtvdmFzeXN0ZW1zL2hlcmVkaXRvLmdpdFwiLFxuXHRcdFx0XCJ0ZXN0XCI6IFwiaGVyZWRpdG8tdGVzdC5qc1wiLFxuXHRcdFx0XCJnbG9iYWxcIjogdHJ1ZVxuXHRcdH1cblx0QGVuZC1tb2R1bGUtY29uZmlndXJhdGlvblxuXG5cdEBtb2R1bGUtZG9jdW1lbnRhdGlvbjpcblx0XHRFeHRlbnNpdmUgaW5oZXJpdGFuY2UuXG5cdEBlbmQtbW9kdWxlLWRvY3VtZW50YXRpb25cblxuXHRAaW5jbHVkZTpcblx0XHR7XG5cdFx0XHRcImFwaXFlXCI6IFwiYXBpcWVcIixcblx0XHRcdFwiZGljdGF0ZVwiOiBcImRpY3RhdGVcIixcblx0XHRcdFwiZmFsenlcIjogXCJmYWx6eVwiLFxuXHRcdFx0XCJmaXJzXCI6IFwiZmlyc1wiLFxuXHRcdFx0XCJsZXZlbGRcIjogXCJsZXZlbGRcIixcblx0XHRcdFwicHJvdHlwZVwiOiBcInByb3R5cGVcIixcblx0XHRcdFwicmRlclwiOiBcInJkZXJcIixcblx0XHRcdFwicmVjbGFzXCI6IFwicmVjbGFzXCIsXG5cdFx0XHRcInNlcGJ5XCI6IFwic2VwYnlcIixcblx0XHRcdFwic2hmdFwiOiBcInNoZnRcIixcblx0XHRcdFwid2F1a2VyXCI6IFwid2F1a2VyXCIsXG5cdFx0XHRcIngxMGN2XCI6IFwieDEwY3ZcIlxuXHRcdH1cblx0QGVuZC1pbmNsdWRlXG4qL1xuXG5jb25zdCBhcGlxZSA9IHJlcXVpcmUoIFwiYXBpcWVcIiApO1xuY29uc3QgZGljdGF0ZSA9IHJlcXVpcmUoIFwiZGljdGF0ZVwiICk7XG5jb25zdCBmYWx6eSA9IHJlcXVpcmUoIFwiZmFsenlcIiApO1xuY29uc3QgZmlycyA9IHJlcXVpcmUoIFwiZmlyc1wiICk7XG5jb25zdCBsZXZlbGQgPSByZXF1aXJlKCBcImxldmVsZFwiICk7XG5jb25zdCBwcm90eXBlID0gcmVxdWlyZSggXCJwcm90eXBlXCIgKTtcbmNvbnN0IHJkZXIgPSByZXF1aXJlKCBcInJkZXJcIiApO1xuY29uc3QgcmVjbGFzID0gcmVxdWlyZSggXCJyZWNsYXNcIiApO1xuY29uc3Qgc2VwYnkgPSByZXF1aXJlKCBcInNlcGJ5XCIgKTtcbmNvbnN0IHNoZnQgPSByZXF1aXJlKCBcInNoZnRcIiApO1xuY29uc3Qgd2F1a2VyID0gcmVxdWlyZSggXCJ3YXVrZXJcIiApO1xuY29uc3QgeDEwY3YgPSByZXF1aXJlKCBcIngxMGN2XCIgKTtcblxuXG5cbi8vOiBAY2xpZW50OlxuY29uc3QgY29ubmVjdCA9IHJlcXVpcmUoIFwiLi9jb25uZWN0LnN1cHBvcnQuanNcIiApO1xuY29uc3QgaW5oZXJpdCA9IHJlcXVpcmUoIFwiLi9pbmhlcml0LnN1cHBvcnQuanNcIiApO1xuLy86IEBlbmQtY2xpZW50XG5cbmNvbnN0IGhlcmVkaXRvID0gZnVuY3Rpb24gaGVyZWRpdG8oIGNoaWxkLCBwYXJlbnQgKXtcblx0Lyo7XG5cdFx0QG1ldGEtY29uZmlndXJhdGlvbjpcblx0XHRcdHtcblx0XHRcdFx0XCJjaGlsZDpyZXF1aXJlZFwiOiBcImZ1bmN0aW9uXCIsXG5cdFx0XHRcdFwicGFyZW50OnJlcXVpcmVkXCI6IFtcblx0XHRcdFx0XHRcImZ1bmN0aW9uXCIsXG5cdFx0XHRcdFx0XCJbZnVuY3Rpb25dXCIsXG5cdFx0XHRcdFx0XCIuLi5mdW5jdGlvblwiXG5cdFx0XHRcdF1cblx0XHRcdH1cblx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxuXHQqL1xuXG5cdGlmKCBmYWx6eSggY2hpbGQgKSB8fCAhcHJvdHlwZSggY2hpbGQsIEZVTkNUSU9OICkgKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiaW52YWxpZCBjaGlsZFwiICk7XG5cdH1cblxuXHRpZiggZmFsenkoIHBhcmVudCApIHx8ICFwcm90eXBlKCBwYXJlbnQsIEZVTkNUSU9OICkgKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiaW52YWxpZCBwYXJlbnRcIiApO1xuXHR9XG5cblx0cGFyZW50ID0gc2hmdCggYXJndW1lbnRzICkuZmlsdGVyKCAoIHBhcmFtZXRlciApID0+IHByb3R5cGUoIHBhcmFtZXRlciwgRlVOQ1RJT04gKSApO1xuXG5cdGxldCBvcmRlciA9IHJkZXIoIHBhcmVudCwgXCJuYW1lXCIgKTtcblxuXHRwYXJlbnQgPSBsZXZlbGQoIHBhcmVudC5tYXAoIHdhdWtlciApICkubWFwKCAoIGJsdWVwcmludCApID0+IHJlY2xhcyggYmx1ZXByaW50ICkgKTtcblxuXHRjaGlsZCA9IHdhdWtlciggY2hpbGQgKS5tYXAoICggYmx1ZXByaW50ICkgPT4gcmVjbGFzKCBibHVlcHJpbnQgKSApO1xuXG5cdHBhcmVudCA9IGRpY3RhdGUoIHBhcmVudC5jb25jYXQoIHNoZnQoIGNoaWxkICkgKSwgb3JkZXIsIFwibmFtZVwiICk7XG5cblx0bGV0IHRyZWUgPSBhcGlxZSggZmlycyggY2hpbGQgKSwgcGFyZW50ICkucmV2ZXJzZSggKTtcblxuXHRyZXR1cm4gc2VwYnkoIHRyZWUsICggYmx1ZXByaW50ICkgPT4geDEwY3YoIGJsdWVwcmludCApIClcblx0XHQucmVkdWNlKCAoIHBhcmVudCwgY2hpbGQgKSA9PiBpbmhlcml0KCBjaGlsZCwgcGFyZW50LCBjb25uZWN0KCApICkgKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaGVyZWRpdG87XG4iXX0=
//# sourceMappingURL=heredito.support.js.map
