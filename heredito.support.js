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
              			"budge": "budge",
              			"dictate": "dictate",
              			"falzy": "falzy",
              			"firs": "firs",
              			"leveld": "leveld",
              			"protype": "protype",
              			"rder": "rder",
              			"reclas": "reclas",
              			"sepby": "sepby",
              			"wauker": "wauker",
              			"x10cv": "x10cv"
              		}
              	@end-include
              */

var apiqe = require("apiqe");
var budge = require("budge");
var dictate = require("dictate");
var falzy = require("falzy");
var firs = require("firs");
var leveld = require("leveld");
var protype = require("protype");
var rder = require("rder");
var reclas = require("reclas");
var sepby = require("sepby");
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

	parent = budge(arguments).filter(function (parameter) {return protype(parameter, FUNCTION);});

	var order = rder(parent, "name");

	parent = leveld(parent.map(wauker)).map(function (blueprint) {return reclas(blueprint);});

	child = wauker(child).map(function (blueprint) {return reclas(blueprint);});

	parent = dictate(parent.concat(budge(child)), order, "name");

	var tree = apiqe(firs(child), parent).reverse();

	return sepby(tree, function (blueprint) {return x10cv(blueprint);}).
	reduce(function (parent, child) {return inherit(child, parent, connect());});
};

module.exports = heredito;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlcmVkaXRvLnN1cHBvcnQuanMiXSwibmFtZXMiOlsiYXBpcWUiLCJyZXF1aXJlIiwiYnVkZ2UiLCJkaWN0YXRlIiwiZmFsenkiLCJmaXJzIiwibGV2ZWxkIiwicHJvdHlwZSIsInJkZXIiLCJyZWNsYXMiLCJzZXBieSIsIndhdWtlciIsIngxMGN2IiwiY29ubmVjdCIsImluaGVyaXQiLCJoZXJlZGl0byIsImNoaWxkIiwicGFyZW50IiwiRlVOQ1RJT04iLCJFcnJvciIsImFyZ3VtZW50cyIsImZpbHRlciIsInBhcmFtZXRlciIsIm9yZGVyIiwibWFwIiwiYmx1ZXByaW50IiwiY29uY2F0IiwidHJlZSIsInJldmVyc2UiLCJyZWR1Y2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpRUEsSUFBTUEsUUFBUUMsUUFBUyxPQUFULENBQWQ7QUFDQSxJQUFNQyxRQUFRRCxRQUFTLE9BQVQsQ0FBZDtBQUNBLElBQU1FLFVBQVVGLFFBQVMsU0FBVCxDQUFoQjtBQUNBLElBQU1HLFFBQVFILFFBQVMsT0FBVCxDQUFkO0FBQ0EsSUFBTUksT0FBT0osUUFBUyxNQUFULENBQWI7QUFDQSxJQUFNSyxTQUFTTCxRQUFTLFFBQVQsQ0FBZjtBQUNBLElBQU1NLFVBQVVOLFFBQVMsU0FBVCxDQUFoQjtBQUNBLElBQU1PLE9BQU9QLFFBQVMsTUFBVCxDQUFiO0FBQ0EsSUFBTVEsU0FBU1IsUUFBUyxRQUFULENBQWY7QUFDQSxJQUFNUyxRQUFRVCxRQUFTLE9BQVQsQ0FBZDtBQUNBLElBQU1VLFNBQVNWLFFBQVMsUUFBVCxDQUFmO0FBQ0EsSUFBTVcsUUFBUVgsUUFBUyxPQUFULENBQWQ7Ozs7QUFJQTtBQUNBLElBQU1ZLFVBQVVaLFFBQVMsc0JBQVQsQ0FBaEI7QUFDQSxJQUFNYSxVQUFVYixRQUFTLHNCQUFULENBQWhCO0FBQ0E7O0FBRUEsSUFBTWMsV0FBVyxTQUFTQSxRQUFULENBQW1CQyxLQUFuQixFQUEwQkMsTUFBMUIsRUFBa0M7QUFDbEQ7Ozs7Ozs7Ozs7Ozs7QUFhQSxLQUFJYixNQUFPWSxLQUFQLEtBQWtCLENBQUNULFFBQVNTLEtBQVQsRUFBZ0JFLFFBQWhCLENBQXZCLEVBQW1EO0FBQ2xELFFBQU0sSUFBSUMsS0FBSixDQUFXLGVBQVgsQ0FBTjtBQUNBOztBQUVELEtBQUlmLE1BQU9hLE1BQVAsS0FBbUIsQ0FBQ1YsUUFBU1UsTUFBVCxFQUFpQkMsUUFBakIsQ0FBeEIsRUFBcUQ7QUFDcEQsUUFBTSxJQUFJQyxLQUFKLENBQVcsZ0JBQVgsQ0FBTjtBQUNBOztBQUVERixVQUFTZixNQUFPa0IsU0FBUCxFQUFtQkMsTUFBbkIsQ0FBMkIsVUFBRUMsU0FBRixVQUFpQmYsUUFBU2UsU0FBVCxFQUFvQkosUUFBcEIsQ0FBakIsRUFBM0IsQ0FBVDs7QUFFQSxLQUFJSyxRQUFRZixLQUFNUyxNQUFOLEVBQWMsTUFBZCxDQUFaOztBQUVBQSxVQUFTWCxPQUFRVyxPQUFPTyxHQUFQLENBQVliLE1BQVosQ0FBUixFQUErQmEsR0FBL0IsQ0FBb0MsVUFBRUMsU0FBRixVQUFpQmhCLE9BQVFnQixTQUFSLENBQWpCLEVBQXBDLENBQVQ7O0FBRUFULFNBQVFMLE9BQVFLLEtBQVIsRUFBZ0JRLEdBQWhCLENBQXFCLFVBQUVDLFNBQUYsVUFBaUJoQixPQUFRZ0IsU0FBUixDQUFqQixFQUFyQixDQUFSOztBQUVBUixVQUFTZCxRQUFTYyxPQUFPUyxNQUFQLENBQWV4QixNQUFPYyxLQUFQLENBQWYsQ0FBVCxFQUEwQ08sS0FBMUMsRUFBaUQsTUFBakQsQ0FBVDs7QUFFQSxLQUFJSSxPQUFPM0IsTUFBT0ssS0FBTVcsS0FBTixDQUFQLEVBQXNCQyxNQUF0QixFQUErQlcsT0FBL0IsRUFBWDs7QUFFQSxRQUFPbEIsTUFBT2lCLElBQVAsRUFBYSxVQUFFRixTQUFGLFVBQWlCYixNQUFPYSxTQUFQLENBQWpCLEVBQWI7QUFDTEksT0FESyxDQUNHLFVBQUVaLE1BQUYsRUFBVUQsS0FBVixVQUFxQkYsUUFBU0UsS0FBVCxFQUFnQkMsTUFBaEIsRUFBd0JKLFNBQXhCLENBQXJCLEVBREgsQ0FBUDtBQUVBLENBcENEOztBQXNDQWlCLE9BQU9DLE9BQVAsR0FBaUJoQixRQUFqQiIsImZpbGUiOiJoZXJlZGl0by5zdXBwb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qO1xuXHRAbW9kdWxlLWxpY2Vuc2U6XG5cdFx0VGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cblx0XHRDb3B5cmlnaHQgKEBjKSAyMDE3IFJpY2hldmUgU2lvZGluYSBCZWJlZG9yXG5cdFx0QGVtYWlsOiByaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXG5cblx0XHRQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5cdFx0b2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuXHRcdGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcblx0XHR0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5cdFx0Y29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5cdFx0ZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuXHRcdFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuXHRcdGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblx0XHRUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5cdFx0SU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5cdFx0RklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5cdFx0QVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuXHRcdExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5cdFx0T1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblx0XHRTT0ZUV0FSRS5cblx0QGVuZC1tb2R1bGUtbGljZW5zZVxuXG5cdEBtb2R1bGUtY29uZmlndXJhdGlvbjpcblx0XHR7XG5cdFx0XHRcInBhY2thZ2VcIjogXCJoZXJlZGl0b1wiLFxuXHRcdFx0XCJwYXRoXCI6IFwiaGVyZWRpdG8vaGVyZWRpdG8uanNcIixcblx0XHRcdFwiZmlsZVwiOiBcImhlcmVkaXRvLmpzXCIsXG5cdFx0XHRcIm1vZHVsZVwiOiBcImhlcmVkaXRvXCIsXG5cdFx0XHRcImF1dGhvclwiOiBcIlJpY2hldmUgUy4gQmViZWRvclwiLFxuXHRcdFx0XCJjb250cmlidXRvcnNcIjogW1xuXHRcdFx0XHRcIkpvaG4gTGVub24gTWFnaGFub3kgPGpvaG5sZW5vbm1hZ2hhbm95QGdtYWlsLmNvbT5cIlxuXHRcdFx0XSxcblx0XHRcdFwiZU1haWxcIjogXCJyaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXCIsXG5cdFx0XHRcInJlcG9zaXRvcnlcIjogXCJnaXRAZ2l0aHViLmNvbTp2b2xrb3Zhc3lzdGVtcy9oZXJlZGl0by5naXRcIixcblx0XHRcdFwidGVzdFwiOiBcImhlcmVkaXRvLXRlc3QuanNcIixcblx0XHRcdFwiZ2xvYmFsXCI6IHRydWVcblx0XHR9XG5cdEBlbmQtbW9kdWxlLWNvbmZpZ3VyYXRpb25cblxuXHRAbW9kdWxlLWRvY3VtZW50YXRpb246XG5cdFx0RXh0ZW5zaXZlIGluaGVyaXRhbmNlLlxuXHRAZW5kLW1vZHVsZS1kb2N1bWVudGF0aW9uXG5cblx0QGluY2x1ZGU6XG5cdFx0e1xuXHRcdFx0XCJhcGlxZVwiOiBcImFwaXFlXCIsXG5cdFx0XHRcImJ1ZGdlXCI6IFwiYnVkZ2VcIixcblx0XHRcdFwiZGljdGF0ZVwiOiBcImRpY3RhdGVcIixcblx0XHRcdFwiZmFsenlcIjogXCJmYWx6eVwiLFxuXHRcdFx0XCJmaXJzXCI6IFwiZmlyc1wiLFxuXHRcdFx0XCJsZXZlbGRcIjogXCJsZXZlbGRcIixcblx0XHRcdFwicHJvdHlwZVwiOiBcInByb3R5cGVcIixcblx0XHRcdFwicmRlclwiOiBcInJkZXJcIixcblx0XHRcdFwicmVjbGFzXCI6IFwicmVjbGFzXCIsXG5cdFx0XHRcInNlcGJ5XCI6IFwic2VwYnlcIixcblx0XHRcdFwid2F1a2VyXCI6IFwid2F1a2VyXCIsXG5cdFx0XHRcIngxMGN2XCI6IFwieDEwY3ZcIlxuXHRcdH1cblx0QGVuZC1pbmNsdWRlXG4qL1xuXG5jb25zdCBhcGlxZSA9IHJlcXVpcmUoIFwiYXBpcWVcIiApO1xuY29uc3QgYnVkZ2UgPSByZXF1aXJlKCBcImJ1ZGdlXCIgKTtcbmNvbnN0IGRpY3RhdGUgPSByZXF1aXJlKCBcImRpY3RhdGVcIiApO1xuY29uc3QgZmFsenkgPSByZXF1aXJlKCBcImZhbHp5XCIgKTtcbmNvbnN0IGZpcnMgPSByZXF1aXJlKCBcImZpcnNcIiApO1xuY29uc3QgbGV2ZWxkID0gcmVxdWlyZSggXCJsZXZlbGRcIiApO1xuY29uc3QgcHJvdHlwZSA9IHJlcXVpcmUoIFwicHJvdHlwZVwiICk7XG5jb25zdCByZGVyID0gcmVxdWlyZSggXCJyZGVyXCIgKTtcbmNvbnN0IHJlY2xhcyA9IHJlcXVpcmUoIFwicmVjbGFzXCIgKTtcbmNvbnN0IHNlcGJ5ID0gcmVxdWlyZSggXCJzZXBieVwiICk7XG5jb25zdCB3YXVrZXIgPSByZXF1aXJlKCBcIndhdWtlclwiICk7XG5jb25zdCB4MTBjdiA9IHJlcXVpcmUoIFwieDEwY3ZcIiApO1xuXG5cblxuLy86IEBjbGllbnQ6XG5jb25zdCBjb25uZWN0ID0gcmVxdWlyZSggXCIuL2Nvbm5lY3Quc3VwcG9ydC5qc1wiICk7XG5jb25zdCBpbmhlcml0ID0gcmVxdWlyZSggXCIuL2luaGVyaXQuc3VwcG9ydC5qc1wiICk7XG4vLzogQGVuZC1jbGllbnRcblxuY29uc3QgaGVyZWRpdG8gPSBmdW5jdGlvbiBoZXJlZGl0byggY2hpbGQsIHBhcmVudCApe1xuXHQvKjtcblx0XHRAbWV0YS1jb25maWd1cmF0aW9uOlxuXHRcdFx0e1xuXHRcdFx0XHRcImNoaWxkOnJlcXVpcmVkXCI6IFwiZnVuY3Rpb25cIixcblx0XHRcdFx0XCJwYXJlbnQ6cmVxdWlyZWRcIjogW1xuXHRcdFx0XHRcdFwiZnVuY3Rpb25cIixcblx0XHRcdFx0XHRcIltmdW5jdGlvbl1cIixcblx0XHRcdFx0XHRcIi4uLmZ1bmN0aW9uXCJcblx0XHRcdFx0XVxuXHRcdFx0fVxuXHRcdEBlbmQtbWV0YS1jb25maWd1cmF0aW9uXG5cdCovXG5cblx0aWYoIGZhbHp5KCBjaGlsZCApIHx8ICFwcm90eXBlKCBjaGlsZCwgRlVOQ1RJT04gKSApe1xuXHRcdHRocm93IG5ldyBFcnJvciggXCJpbnZhbGlkIGNoaWxkXCIgKTtcblx0fVxuXG5cdGlmKCBmYWx6eSggcGFyZW50ICkgfHwgIXByb3R5cGUoIHBhcmVudCwgRlVOQ1RJT04gKSApe1xuXHRcdHRocm93IG5ldyBFcnJvciggXCJpbnZhbGlkIHBhcmVudFwiICk7XG5cdH1cblxuXHRwYXJlbnQgPSBidWRnZSggYXJndW1lbnRzICkuZmlsdGVyKCAoIHBhcmFtZXRlciApID0+IHByb3R5cGUoIHBhcmFtZXRlciwgRlVOQ1RJT04gKSApO1xuXG5cdGxldCBvcmRlciA9IHJkZXIoIHBhcmVudCwgXCJuYW1lXCIgKTtcblxuXHRwYXJlbnQgPSBsZXZlbGQoIHBhcmVudC5tYXAoIHdhdWtlciApICkubWFwKCAoIGJsdWVwcmludCApID0+IHJlY2xhcyggYmx1ZXByaW50ICkgKTtcblxuXHRjaGlsZCA9IHdhdWtlciggY2hpbGQgKS5tYXAoICggYmx1ZXByaW50ICkgPT4gcmVjbGFzKCBibHVlcHJpbnQgKSApO1xuXG5cdHBhcmVudCA9IGRpY3RhdGUoIHBhcmVudC5jb25jYXQoIGJ1ZGdlKCBjaGlsZCApICksIG9yZGVyLCBcIm5hbWVcIiApO1xuXG5cdGxldCB0cmVlID0gYXBpcWUoIGZpcnMoIGNoaWxkICksIHBhcmVudCApLnJldmVyc2UoICk7XG5cblx0cmV0dXJuIHNlcGJ5KCB0cmVlLCAoIGJsdWVwcmludCApID0+IHgxMGN2KCBibHVlcHJpbnQgKSApXG5cdFx0LnJlZHVjZSggKCBwYXJlbnQsIGNoaWxkICkgPT4gaW5oZXJpdCggY2hpbGQsIHBhcmVudCwgY29ubmVjdCggKSApICk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGhlcmVkaXRvO1xuIl19
//# sourceMappingURL=heredito.support.js.map
