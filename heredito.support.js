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
              			"eMail": "richeve.bebedor@gmail.com",
              			"contributors": [
              				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>",
              				"Vinse Vinalon <vinsevinalon@gmail.com>"
              			],
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlcmVkaXRvLnN1cHBvcnQuanMiXSwibmFtZXMiOlsiYXBpcWUiLCJyZXF1aXJlIiwiZGljdGF0ZSIsImZhbHp5IiwiZmlycyIsImxldmVsZCIsInByb3R5cGUiLCJyZGVyIiwicmVjbGFzIiwic2VwYnkiLCJzaGZ0Iiwid2F1a2VyIiwieDEwY3YiLCJjb25uZWN0IiwiaW5oZXJpdCIsImhlcmVkaXRvIiwiY2hpbGQiLCJwYXJlbnQiLCJGVU5DVElPTiIsIkVycm9yIiwiYXJndW1lbnRzIiwiZmlsdGVyIiwicGFyYW1ldGVyIiwib3JkZXIiLCJtYXAiLCJibHVlcHJpbnQiLCJjb25jYXQiLCJ0cmVlIiwicmV2ZXJzZSIsInJlZHVjZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrRUEsSUFBTUEsUUFBUUMsUUFBUyxPQUFULENBQWQ7QUFDQSxJQUFNQyxVQUFVRCxRQUFTLFNBQVQsQ0FBaEI7QUFDQSxJQUFNRSxRQUFRRixRQUFTLE9BQVQsQ0FBZDtBQUNBLElBQU1HLE9BQU9ILFFBQVMsTUFBVCxDQUFiO0FBQ0EsSUFBTUksU0FBU0osUUFBUyxRQUFULENBQWY7QUFDQSxJQUFNSyxVQUFVTCxRQUFTLFNBQVQsQ0FBaEI7QUFDQSxJQUFNTSxPQUFPTixRQUFTLE1BQVQsQ0FBYjtBQUNBLElBQU1PLFNBQVNQLFFBQVMsUUFBVCxDQUFmO0FBQ0EsSUFBTVEsUUFBUVIsUUFBUyxPQUFULENBQWQ7QUFDQSxJQUFNUyxPQUFPVCxRQUFTLE1BQVQsQ0FBYjtBQUNBLElBQU1VLFNBQVNWLFFBQVMsUUFBVCxDQUFmO0FBQ0EsSUFBTVcsUUFBUVgsUUFBUyxPQUFULENBQWQ7Ozs7QUFJQTtBQUNBLElBQU1ZLFVBQVVaLFFBQVMsc0JBQVQsQ0FBaEI7QUFDQSxJQUFNYSxVQUFVYixRQUFTLHNCQUFULENBQWhCO0FBQ0E7O0FBRUEsSUFBTWMsV0FBVyxTQUFTQSxRQUFULENBQW1CQyxLQUFuQixFQUEwQkMsTUFBMUIsRUFBa0M7QUFDbEQ7Ozs7Ozs7Ozs7Ozs7QUFhQSxLQUFJZCxNQUFPYSxLQUFQLEtBQWtCLENBQUNWLFFBQVNVLEtBQVQsRUFBZ0JFLFFBQWhCLENBQXZCLEVBQW1EO0FBQ2xELFFBQU0sSUFBSUMsS0FBSixDQUFXLGVBQVgsQ0FBTjtBQUNBOztBQUVELEtBQUloQixNQUFPYyxNQUFQLEtBQW1CLENBQUNYLFFBQVNXLE1BQVQsRUFBaUJDLFFBQWpCLENBQXhCLEVBQXFEO0FBQ3BELFFBQU0sSUFBSUMsS0FBSixDQUFXLGdCQUFYLENBQU47QUFDQTs7QUFFREYsVUFBU1AsS0FBTVUsU0FBTixFQUFrQkMsTUFBbEIsQ0FBMEIsVUFBRUMsU0FBRixVQUFpQmhCLFFBQVNnQixTQUFULEVBQW9CSixRQUFwQixDQUFqQixFQUExQixDQUFUOztBQUVBLEtBQUlLLFFBQVFoQixLQUFNVSxNQUFOLEVBQWMsTUFBZCxDQUFaOztBQUVBQSxVQUFTWixPQUFRWSxPQUFPTyxHQUFQLENBQVliLE1BQVosQ0FBUixFQUErQmEsR0FBL0IsQ0FBb0MsVUFBRUMsU0FBRixVQUFpQmpCLE9BQVFpQixTQUFSLENBQWpCLEVBQXBDLENBQVQ7O0FBRUFULFNBQVFMLE9BQVFLLEtBQVIsRUFBZ0JRLEdBQWhCLENBQXFCLFVBQUVDLFNBQUYsVUFBaUJqQixPQUFRaUIsU0FBUixDQUFqQixFQUFyQixDQUFSOztBQUVBUixVQUFTZixRQUFTZSxPQUFPUyxNQUFQLENBQWVoQixLQUFNTSxLQUFOLENBQWYsQ0FBVCxFQUF5Q08sS0FBekMsRUFBZ0QsTUFBaEQsQ0FBVDs7QUFFQSxLQUFJSSxPQUFPM0IsTUFBT0ksS0FBTVksS0FBTixDQUFQLEVBQXNCQyxNQUF0QixFQUErQlcsT0FBL0IsRUFBWDs7QUFFQSxRQUFPbkIsTUFBT2tCLElBQVAsRUFBYSxVQUFFRixTQUFGLFVBQWlCYixNQUFPYSxTQUFQLENBQWpCLEVBQWI7QUFDTEksT0FESyxDQUNHLFVBQUVaLE1BQUYsRUFBVUQsS0FBVixVQUFxQkYsUUFBU0UsS0FBVCxFQUFnQkMsTUFBaEIsRUFBd0JKLFNBQXhCLENBQXJCLEVBREgsQ0FBUDtBQUVBLENBcENEOztBQXNDQWlCLE9BQU9DLE9BQVAsR0FBaUJoQixRQUFqQiIsImZpbGUiOiJoZXJlZGl0by5zdXBwb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qO1xuXHRAbW9kdWxlLWxpY2Vuc2U6XG5cdFx0VGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cblx0XHRDb3B5cmlnaHQgKEBjKSAyMDE3IFJpY2hldmUgU2lvZGluYSBCZWJlZG9yXG5cdFx0QGVtYWlsOiByaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXG5cblx0XHRQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5cdFx0b2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuXHRcdGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcblx0XHR0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5cdFx0Y29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5cdFx0ZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuXHRcdFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuXHRcdGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblx0XHRUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5cdFx0SU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5cdFx0RklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5cdFx0QVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuXHRcdExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5cdFx0T1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblx0XHRTT0ZUV0FSRS5cblx0QGVuZC1tb2R1bGUtbGljZW5zZVxuXG5cdEBtb2R1bGUtY29uZmlndXJhdGlvbjpcblx0XHR7XG5cdFx0XHRcInBhY2thZ2VcIjogXCJoZXJlZGl0b1wiLFxuXHRcdFx0XCJwYXRoXCI6IFwiaGVyZWRpdG8vaGVyZWRpdG8uanNcIixcblx0XHRcdFwiZmlsZVwiOiBcImhlcmVkaXRvLmpzXCIsXG5cdFx0XHRcIm1vZHVsZVwiOiBcImhlcmVkaXRvXCIsXG5cdFx0XHRcImF1dGhvclwiOiBcIlJpY2hldmUgUy4gQmViZWRvclwiLFxuXHRcdFx0XCJlTWFpbFwiOiBcInJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cIixcblx0XHRcdFwiY29udHJpYnV0b3JzXCI6IFtcblx0XHRcdFx0XCJKb2huIExlbm9uIE1hZ2hhbm95IDxqb2hubGVub25tYWdoYW5veUBnbWFpbC5jb20+XCIsXG5cdFx0XHRcdFwiVmluc2UgVmluYWxvbiA8dmluc2V2aW5hbG9uQGdtYWlsLmNvbT5cIlxuXHRcdFx0XSxcblx0XHRcdFwicmVwb3NpdG9yeVwiOiBcImdpdEBnaXRodWIuY29tOnZvbGtvdmFzeXN0ZW1zL2hlcmVkaXRvLmdpdFwiLFxuXHRcdFx0XCJ0ZXN0XCI6IFwiaGVyZWRpdG8tdGVzdC5qc1wiLFxuXHRcdFx0XCJnbG9iYWxcIjogdHJ1ZVxuXHRcdH1cblx0QGVuZC1tb2R1bGUtY29uZmlndXJhdGlvblxuXG5cdEBtb2R1bGUtZG9jdW1lbnRhdGlvbjpcblx0XHRFeHRlbnNpdmUgaW5oZXJpdGFuY2UuXG5cdEBlbmQtbW9kdWxlLWRvY3VtZW50YXRpb25cblxuXHRAaW5jbHVkZTpcblx0XHR7XG5cdFx0XHRcImFwaXFlXCI6IFwiYXBpcWVcIixcblx0XHRcdFwiZGljdGF0ZVwiOiBcImRpY3RhdGVcIixcblx0XHRcdFwiZmFsenlcIjogXCJmYWx6eVwiLFxuXHRcdFx0XCJmaXJzXCI6IFwiZmlyc1wiLFxuXHRcdFx0XCJsZXZlbGRcIjogXCJsZXZlbGRcIixcblx0XHRcdFwicHJvdHlwZVwiOiBcInByb3R5cGVcIixcblx0XHRcdFwicmRlclwiOiBcInJkZXJcIixcblx0XHRcdFwicmVjbGFzXCI6IFwicmVjbGFzXCIsXG5cdFx0XHRcInNlcGJ5XCI6IFwic2VwYnlcIixcblx0XHRcdFwic2hmdFwiOiBcInNoZnRcIixcblx0XHRcdFwid2F1a2VyXCI6IFwid2F1a2VyXCIsXG5cdFx0XHRcIngxMGN2XCI6IFwieDEwY3ZcIlxuXHRcdH1cblx0QGVuZC1pbmNsdWRlXG4qL1xuXG5jb25zdCBhcGlxZSA9IHJlcXVpcmUoIFwiYXBpcWVcIiApO1xuY29uc3QgZGljdGF0ZSA9IHJlcXVpcmUoIFwiZGljdGF0ZVwiICk7XG5jb25zdCBmYWx6eSA9IHJlcXVpcmUoIFwiZmFsenlcIiApO1xuY29uc3QgZmlycyA9IHJlcXVpcmUoIFwiZmlyc1wiICk7XG5jb25zdCBsZXZlbGQgPSByZXF1aXJlKCBcImxldmVsZFwiICk7XG5jb25zdCBwcm90eXBlID0gcmVxdWlyZSggXCJwcm90eXBlXCIgKTtcbmNvbnN0IHJkZXIgPSByZXF1aXJlKCBcInJkZXJcIiApO1xuY29uc3QgcmVjbGFzID0gcmVxdWlyZSggXCJyZWNsYXNcIiApO1xuY29uc3Qgc2VwYnkgPSByZXF1aXJlKCBcInNlcGJ5XCIgKTtcbmNvbnN0IHNoZnQgPSByZXF1aXJlKCBcInNoZnRcIiApO1xuY29uc3Qgd2F1a2VyID0gcmVxdWlyZSggXCJ3YXVrZXJcIiApO1xuY29uc3QgeDEwY3YgPSByZXF1aXJlKCBcIngxMGN2XCIgKTtcblxuXG5cbi8vOiBAY2xpZW50OlxuY29uc3QgY29ubmVjdCA9IHJlcXVpcmUoIFwiLi9jb25uZWN0LnN1cHBvcnQuanNcIiApO1xuY29uc3QgaW5oZXJpdCA9IHJlcXVpcmUoIFwiLi9pbmhlcml0LnN1cHBvcnQuanNcIiApO1xuLy86IEBlbmQtY2xpZW50XG5cbmNvbnN0IGhlcmVkaXRvID0gZnVuY3Rpb24gaGVyZWRpdG8oIGNoaWxkLCBwYXJlbnQgKXtcblx0Lyo7XG5cdFx0QG1ldGEtY29uZmlndXJhdGlvbjpcblx0XHRcdHtcblx0XHRcdFx0XCJjaGlsZDpyZXF1aXJlZFwiOiBcImZ1bmN0aW9uXCIsXG5cdFx0XHRcdFwicGFyZW50OnJlcXVpcmVkXCI6IFtcblx0XHRcdFx0XHRcImZ1bmN0aW9uXCIsXG5cdFx0XHRcdFx0XCJbZnVuY3Rpb25dXCIsXG5cdFx0XHRcdFx0XCIuLi5mdW5jdGlvblwiXG5cdFx0XHRcdF1cblx0XHRcdH1cblx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxuXHQqL1xuXG5cdGlmKCBmYWx6eSggY2hpbGQgKSB8fCAhcHJvdHlwZSggY2hpbGQsIEZVTkNUSU9OICkgKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiaW52YWxpZCBjaGlsZFwiICk7XG5cdH1cblxuXHRpZiggZmFsenkoIHBhcmVudCApIHx8ICFwcm90eXBlKCBwYXJlbnQsIEZVTkNUSU9OICkgKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiaW52YWxpZCBwYXJlbnRcIiApO1xuXHR9XG5cblx0cGFyZW50ID0gc2hmdCggYXJndW1lbnRzICkuZmlsdGVyKCAoIHBhcmFtZXRlciApID0+IHByb3R5cGUoIHBhcmFtZXRlciwgRlVOQ1RJT04gKSApO1xuXG5cdGxldCBvcmRlciA9IHJkZXIoIHBhcmVudCwgXCJuYW1lXCIgKTtcblxuXHRwYXJlbnQgPSBsZXZlbGQoIHBhcmVudC5tYXAoIHdhdWtlciApICkubWFwKCAoIGJsdWVwcmludCApID0+IHJlY2xhcyggYmx1ZXByaW50ICkgKTtcblxuXHRjaGlsZCA9IHdhdWtlciggY2hpbGQgKS5tYXAoICggYmx1ZXByaW50ICkgPT4gcmVjbGFzKCBibHVlcHJpbnQgKSApO1xuXG5cdHBhcmVudCA9IGRpY3RhdGUoIHBhcmVudC5jb25jYXQoIHNoZnQoIGNoaWxkICkgKSwgb3JkZXIsIFwibmFtZVwiICk7XG5cblx0bGV0IHRyZWUgPSBhcGlxZSggZmlycyggY2hpbGQgKSwgcGFyZW50ICkucmV2ZXJzZSggKTtcblxuXHRyZXR1cm4gc2VwYnkoIHRyZWUsICggYmx1ZXByaW50ICkgPT4geDEwY3YoIGJsdWVwcmludCApIClcblx0XHQucmVkdWNlKCAoIHBhcmVudCwgY2hpbGQgKSA9PiBpbmhlcml0KCBjaGlsZCwgcGFyZW50LCBjb25uZWN0KCApICkgKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaGVyZWRpdG87XG4iXX0=
//# sourceMappingURL=heredito.support.js.map
