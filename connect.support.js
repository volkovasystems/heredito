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
              			"path": "heredito/connect.js",
              			"file": "connect.js",
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
              		Connector class factory.
              	@end-submodule-documentation
              
              	@include:
              		{
              			"clazof": "clazof",
              			"diatom": "diatom",
              			"een": "een",
              			"erode": "erode",
              			"falzy": "falzy",
              			"kein": "kein",
              			"meton": "meton",
              			"ngrave": "ngrave",
              			"ntrprt": "ntrprt",
              			"protype": "protype",
              			"statis": "statis",
              			"truly": "truly"
              		}
              	@end-include
              */var _symbol = require("babel-runtime/core-js/symbol");var _symbol2 = _interopRequireDefault(_symbol);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var clazof = require("clazof");
var diatom = require("diatom");
var een = require("een");
var erode = require("erode");
var falzy = require("falzy");
var kein = require("kein");
var meton = require("meton");
var ngrave = require("ngrave");
var ntrprt = require("ntrprt");
var protype = require("protype");
var statis = require("statis");
var truly = require("truly");

var INHERITANCE = (0, _symbol2.default)("inheritance");
var CHILD = (0, _symbol2.default)("child");

var connect = function connect() {
	var Connector = diatom("Connector");

	statis(Connector).

	attach(INHERITANCE, []).

	implement("flush", function flush() {
		var inheritance = ntrprt(INHERITANCE, this);

		while (inheritance.length) {
			inheritance.pop();
		}

		return this;
	}).

	implement("reset", function reset() {var _this = this;
		meton(this.prototype).forEach(function (method) {return delete _this.prototype[method];});

		this.flush();

		erode(CHILD, this);

		return this;
	}).

	implement("push", function push(parent) {
		/*;
                                          	@meta-configuration:
                                          		{
                                          			"parent:required": "function"
                                          		}
                                          	@end-meta-configuration
                                          */

		if (falzy(parent) || !protype(parent, FUNCTION)) {
			throw new Error("invalid parent class");
		}

		var inheritance = ntrprt(INHERITANCE, this);

		/*;
                                               	@note:
                                               		Accumulate parent to the connector.
                                               	@end-note
                                               */
		do {
			if (!een(inheritance, parent)) {
				inheritance.push(parent);
			}

		} while (truly(parent = parent.prototype.parent));

		return this;
	}).

	implement("trace", function trace(parent) {var _this2 = this;
		/*;
                                                               	@meta-configuration:
                                                               		{
                                                               			"parent:required": "function"
                                                               		}
                                                               	@end-meta-configuration
                                                               */

		if (falzy(parent) || !protype(parent, FUNCTION)) {
			throw new Error("invalid parent class");
		}

		if (kein("connector", parent) && clazof(parent.connector, "Connector")) {
			ntrprt(INHERITANCE, parent.connector).forEach(function (ancestor) {return _this2.push(ancestor);});
		}

		return this;
	}).

	implement("register", function register(child) {
		/*;
                                                 	@meta-configuration:
                                                 		{
                                                 			"child:required": "function"
                                                 		}
                                                 	@end-meta-configuration
                                                 */

		if (falzy(child) || !protype(child, FUNCTION)) {
			throw new Error("invalid child class");
		}

		ngrave(CHILD, this, child);

		return this;
	});

	return Connector;
};

module.exports = connect;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbm5lY3Quc3VwcG9ydC5qcyJdLCJuYW1lcyI6WyJjbGF6b2YiLCJyZXF1aXJlIiwiZGlhdG9tIiwiZWVuIiwiZXJvZGUiLCJmYWx6eSIsImtlaW4iLCJtZXRvbiIsIm5ncmF2ZSIsIm50cnBydCIsInByb3R5cGUiLCJzdGF0aXMiLCJ0cnVseSIsIklOSEVSSVRBTkNFIiwiQ0hJTEQiLCJjb25uZWN0IiwiQ29ubmVjdG9yIiwiYXR0YWNoIiwiaW1wbGVtZW50IiwiZmx1c2giLCJpbmhlcml0YW5jZSIsImxlbmd0aCIsInBvcCIsInJlc2V0IiwicHJvdG90eXBlIiwiZm9yRWFjaCIsIm1ldGhvZCIsInB1c2giLCJwYXJlbnQiLCJGVU5DVElPTiIsIkVycm9yIiwidHJhY2UiLCJjb25uZWN0b3IiLCJhbmNlc3RvciIsInJlZ2lzdGVyIiwiY2hpbGQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvRUEsSUFBTUEsU0FBU0MsUUFBUyxRQUFULENBQWY7QUFDQSxJQUFNQyxTQUFTRCxRQUFTLFFBQVQsQ0FBZjtBQUNBLElBQU1FLE1BQU1GLFFBQVMsS0FBVCxDQUFaO0FBQ0EsSUFBTUcsUUFBUUgsUUFBUyxPQUFULENBQWQ7QUFDQSxJQUFNSSxRQUFRSixRQUFTLE9BQVQsQ0FBZDtBQUNBLElBQU1LLE9BQU9MLFFBQVMsTUFBVCxDQUFiO0FBQ0EsSUFBTU0sUUFBUU4sUUFBUyxPQUFULENBQWQ7QUFDQSxJQUFNTyxTQUFTUCxRQUFTLFFBQVQsQ0FBZjtBQUNBLElBQU1RLFNBQVNSLFFBQVMsUUFBVCxDQUFmO0FBQ0EsSUFBTVMsVUFBVVQsUUFBUyxTQUFULENBQWhCO0FBQ0EsSUFBTVUsU0FBU1YsUUFBUyxRQUFULENBQWY7QUFDQSxJQUFNVyxRQUFRWCxRQUFTLE9BQVQsQ0FBZDs7QUFFQSxJQUFNWSxj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c3RyaWN0XCI7XG5cbi8qO1xuXHRAc3VibW9kdWxlLWxpY2Vuc2U6XG5cdFx0VGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cdFx0QG1pdC1saWNlbnNlXG5cblx0XHRDb3B5cmlnaHQgKEBjKSAyMDE3IFJpY2hldmUgU2lvZGluYSBCZWJlZG9yXG5cdFx0QGVtYWlsOiByaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXG5cblx0XHRQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5cdFx0b2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuXHRcdGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcblx0XHR0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5cdFx0Y29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5cdFx0ZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuXHRcdFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuXHRcdGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblx0XHRUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5cdFx0SU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5cdFx0RklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5cdFx0QVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuXHRcdExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5cdFx0T1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblx0XHRTT0ZUV0FSRS5cblx0QGVuZC1zdWJtb2R1bGUtbGljZW5zZVxuXG5cdEBzdWJtb2R1bGUtY29uZmlndXJhdGlvbjpcblx0XHR7XG5cdFx0XHRcInBhY2thZ2VcIjogXCJoZXJlZGl0b1wiLFxuXHRcdFx0XCJwYXRoXCI6IFwiaGVyZWRpdG8vY29ubmVjdC5qc1wiLFxuXHRcdFx0XCJmaWxlXCI6IFwiY29ubmVjdC5qc1wiLFxuXHRcdFx0XCJtb2R1bGVcIjogXCJoZXJlZGl0b1wiLFxuXHRcdFx0XCJhdXRob3JcIjogXCJSaWNoZXZlIFMuIEJlYmVkb3JcIixcblx0XHRcdFwiZU1haWxcIjogXCJyaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXCIsXG5cdFx0XHRcImNvbnRyaWJ1dG9yc1wiOiBbXG5cdFx0XHRcdFwiSm9obiBMZW5vbiBNYWdoYW5veSA8am9obmxlbm9ubWFnaGFub3lAZ21haWwuY29tPlwiLFxuXHRcdFx0XHRcIlZpbnNlIFZpbmFsb24gPHZpbnNldmluYWxvbkBnbWFpbC5jb20+XCJcblx0XHRcdF0sXG5cdFx0XHRcInJlcG9zaXRvcnlcIjogXCJodHRwczovL2dpdGh1Yi5jb20vdm9sa292YXN5c3RlbXMvaGVyZWRpdG8uZ2l0XCIsXG5cdFx0XHRcInRlc3RcIjogXCJoZXJlZGl0by10ZXN0LmpzXCIsXG5cdFx0XHRcImdsb2JhbFwiOiBmYWxzZSxcblx0XHRcdFwiaW50ZXJuYWxcIjogdHJ1ZVxuXHRcdH1cblx0QGVuZC1zdWJtb2R1bGUtY29uZmlndXJhdGlvblxuXG5cdEBzdWJtb2R1bGUtZG9jdW1lbnRhdGlvbjpcblx0XHRDb25uZWN0b3IgY2xhc3MgZmFjdG9yeS5cblx0QGVuZC1zdWJtb2R1bGUtZG9jdW1lbnRhdGlvblxuXG5cdEBpbmNsdWRlOlxuXHRcdHtcblx0XHRcdFwiY2xhem9mXCI6IFwiY2xhem9mXCIsXG5cdFx0XHRcImRpYXRvbVwiOiBcImRpYXRvbVwiLFxuXHRcdFx0XCJlZW5cIjogXCJlZW5cIixcblx0XHRcdFwiZXJvZGVcIjogXCJlcm9kZVwiLFxuXHRcdFx0XCJmYWx6eVwiOiBcImZhbHp5XCIsXG5cdFx0XHRcImtlaW5cIjogXCJrZWluXCIsXG5cdFx0XHRcIm1ldG9uXCI6IFwibWV0b25cIixcblx0XHRcdFwibmdyYXZlXCI6IFwibmdyYXZlXCIsXG5cdFx0XHRcIm50cnBydFwiOiBcIm50cnBydFwiLFxuXHRcdFx0XCJwcm90eXBlXCI6IFwicHJvdHlwZVwiLFxuXHRcdFx0XCJzdGF0aXNcIjogXCJzdGF0aXNcIixcblx0XHRcdFwidHJ1bHlcIjogXCJ0cnVseVwiXG5cdFx0fVxuXHRAZW5kLWluY2x1ZGVcbiovXG5cbmNvbnN0IGNsYXpvZiA9IHJlcXVpcmUoIFwiY2xhem9mXCIgKTtcbmNvbnN0IGRpYXRvbSA9IHJlcXVpcmUoIFwiZGlhdG9tXCIgKTtcbmNvbnN0IGVlbiA9IHJlcXVpcmUoIFwiZWVuXCIgKTtcbmNvbnN0IGVyb2RlID0gcmVxdWlyZSggXCJlcm9kZVwiICk7XG5jb25zdCBmYWx6eSA9IHJlcXVpcmUoIFwiZmFsenlcIiApO1xuY29uc3Qga2VpbiA9IHJlcXVpcmUoIFwia2VpblwiICk7XG5jb25zdCBtZXRvbiA9IHJlcXVpcmUoIFwibWV0b25cIiApO1xuY29uc3QgbmdyYXZlID0gcmVxdWlyZSggXCJuZ3JhdmVcIiApO1xuY29uc3QgbnRycHJ0ID0gcmVxdWlyZSggXCJudHJwcnRcIiApO1xuY29uc3QgcHJvdHlwZSA9IHJlcXVpcmUoIFwicHJvdHlwZVwiICk7XG5jb25zdCBzdGF0aXMgPSByZXF1aXJlKCBcInN0YXRpc1wiICk7XG5jb25zdCB0cnVseSA9IHJlcXVpcmUoIFwidHJ1bHlcIiApO1xuXG5jb25zdCBJTkhFUklUQU5DRSA9IFN5bWJvbCggXCJpbmhlcml0YW5jZVwiICk7XG5jb25zdCBDSElMRCA9IFN5bWJvbCggXCJjaGlsZFwiICk7XG5cbmNvbnN0IGNvbm5lY3QgPSBmdW5jdGlvbiBjb25uZWN0KCApe1xuXHRsZXQgQ29ubmVjdG9yID0gZGlhdG9tKCBcIkNvbm5lY3RvclwiICk7XG5cblx0c3RhdGlzKCBDb25uZWN0b3IgKVxuXG5cdFx0LmF0dGFjaCggSU5IRVJJVEFOQ0UsIFsgXSApXG5cblx0XHQuaW1wbGVtZW50KCBcImZsdXNoXCIsIGZ1bmN0aW9uIGZsdXNoKCApe1xuXHRcdFx0bGV0IGluaGVyaXRhbmNlID0gbnRycHJ0KCBJTkhFUklUQU5DRSwgdGhpcyApO1xuXG5cdFx0XHR3aGlsZSggaW5oZXJpdGFuY2UubGVuZ3RoICl7XG5cdFx0XHRcdGluaGVyaXRhbmNlLnBvcCggKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSApXG5cblx0XHQuaW1wbGVtZW50KCBcInJlc2V0XCIsIGZ1bmN0aW9uIHJlc2V0KCApe1xuXHRcdFx0bWV0b24oIHRoaXMucHJvdG90eXBlICkuZm9yRWFjaCggKCBtZXRob2QgKSA9PiAoIGRlbGV0ZSB0aGlzLnByb3RvdHlwZVsgbWV0aG9kIF0gKSApXG5cblx0XHRcdHRoaXMuZmx1c2goICk7XG5cblx0XHRcdGVyb2RlKCBDSElMRCwgdGhpcyApO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9IClcblxuXHRcdC5pbXBsZW1lbnQoIFwicHVzaFwiLCBmdW5jdGlvbiBwdXNoKCBwYXJlbnQgKXtcblx0XHRcdC8qO1xuXHRcdFx0XHRAbWV0YS1jb25maWd1cmF0aW9uOlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFwicGFyZW50OnJlcXVpcmVkXCI6IFwiZnVuY3Rpb25cIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0QGVuZC1tZXRhLWNvbmZpZ3VyYXRpb25cblx0XHRcdCovXG5cblx0XHRcdGlmKCBmYWx6eSggcGFyZW50ICkgfHwgIXByb3R5cGUoIHBhcmVudCwgRlVOQ1RJT04gKSApe1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiaW52YWxpZCBwYXJlbnQgY2xhc3NcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgaW5oZXJpdGFuY2UgPSBudHJwcnQoIElOSEVSSVRBTkNFLCB0aGlzICk7XG5cblx0XHRcdC8qO1xuXHRcdFx0XHRAbm90ZTpcblx0XHRcdFx0XHRBY2N1bXVsYXRlIHBhcmVudCB0byB0aGUgY29ubmVjdG9yLlxuXHRcdFx0XHRAZW5kLW5vdGVcblx0XHRcdCovXG5cdFx0XHRkb3tcblx0XHRcdFx0aWYoICFlZW4oIGluaGVyaXRhbmNlLCBwYXJlbnQgKSApe1xuXHRcdFx0XHRcdGluaGVyaXRhbmNlLnB1c2goIHBhcmVudCApO1xuXHRcdFx0XHR9XG5cblx0XHRcdH13aGlsZSggdHJ1bHkoIHBhcmVudCA9IHBhcmVudC5wcm90b3R5cGUucGFyZW50ICkgKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSApXG5cblx0XHQuaW1wbGVtZW50KCBcInRyYWNlXCIsIGZ1bmN0aW9uIHRyYWNlKCBwYXJlbnQgKXtcblx0XHRcdC8qO1xuXHRcdFx0XHRAbWV0YS1jb25maWd1cmF0aW9uOlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFwicGFyZW50OnJlcXVpcmVkXCI6IFwiZnVuY3Rpb25cIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0QGVuZC1tZXRhLWNvbmZpZ3VyYXRpb25cblx0XHRcdCovXG5cblx0XHRcdGlmKCBmYWx6eSggcGFyZW50ICkgfHwgIXByb3R5cGUoIHBhcmVudCwgRlVOQ1RJT04gKSApe1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiaW52YWxpZCBwYXJlbnQgY2xhc3NcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHRpZigga2VpbiggXCJjb25uZWN0b3JcIiwgcGFyZW50ICkgJiYgY2xhem9mKCBwYXJlbnQuY29ubmVjdG9yLCBcIkNvbm5lY3RvclwiICkgKXtcblx0XHRcdFx0bnRycHJ0KCBJTkhFUklUQU5DRSwgcGFyZW50LmNvbm5lY3RvciApLmZvckVhY2goICggYW5jZXN0b3IgKSA9PiB0aGlzLnB1c2goIGFuY2VzdG9yICkgKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSApXG5cblx0XHQuaW1wbGVtZW50KCBcInJlZ2lzdGVyXCIsIGZ1bmN0aW9uIHJlZ2lzdGVyKCBjaGlsZCApe1xuXHRcdFx0Lyo7XG5cdFx0XHRcdEBtZXRhLWNvbmZpZ3VyYXRpb246XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XCJjaGlsZDpyZXF1aXJlZFwiOiBcImZ1bmN0aW9uXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdEBlbmQtbWV0YS1jb25maWd1cmF0aW9uXG5cdFx0XHQqL1xuXG5cdFx0XHRpZiggZmFsenkoIGNoaWxkICkgfHwgIXByb3R5cGUoIGNoaWxkLCBGVU5DVElPTiApICl7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvciggXCJpbnZhbGlkIGNoaWxkIGNsYXNzXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0bmdyYXZlKCBDSElMRCwgdGhpcywgY2hpbGQgKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSApO1xuXG5cdHJldHVybiBDb25uZWN0b3I7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbm5lY3Q7XG4iXX0=
//# sourceMappingURL=connect.support.js.map
