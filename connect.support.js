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
              			"transpher": "transpher",
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
var transpher = require("transpher");
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

		transpher(this, child, true);

		ngrave(CHILD, this, child);

		return this;
	});

	return Connector;
};

module.exports = connect;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbm5lY3Quc3VwcG9ydC5qcyJdLCJuYW1lcyI6WyJjbGF6b2YiLCJyZXF1aXJlIiwiZGlhdG9tIiwiZWVuIiwiZXJvZGUiLCJmYWx6eSIsImtlaW4iLCJtZXRvbiIsIm5ncmF2ZSIsIm50cnBydCIsInByb3R5cGUiLCJzdGF0aXMiLCJ0cmFuc3BoZXIiLCJ0cnVseSIsIklOSEVSSVRBTkNFIiwiQ0hJTEQiLCJjb25uZWN0IiwiQ29ubmVjdG9yIiwiYXR0YWNoIiwiaW1wbGVtZW50IiwiZmx1c2giLCJpbmhlcml0YW5jZSIsImxlbmd0aCIsInBvcCIsInJlc2V0IiwicHJvdG90eXBlIiwiZm9yRWFjaCIsIm1ldGhvZCIsInB1c2giLCJwYXJlbnQiLCJGVU5DVElPTiIsIkVycm9yIiwidHJhY2UiLCJjb25uZWN0b3IiLCJhbmNlc3RvciIsInJlZ2lzdGVyIiwiY2hpbGQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvRUEsSUFBTUEsU0FBU0MsUUFBUyxRQUFULENBQWY7QUFDQSxJQUFNQyxTQUFTRCxRQUFTLFFBQVQsQ0FBZjtBQUNBLElBQU1FLE1BQU1GLFFBQVMsS0FBVCxDQUFaO0FBQ0EsSUFBTUcsUUFBUUgsUUFBUyxPQUFULENBQWQ7QUFDQSxJQUFNSSxRQUFRSixRQUFTLE9BQVQsQ0FBZDtBQUNBLElBQU1LLE9BQU9MLFFBQVMsTUFBVCxDQUFiO0FBQ0EsSUFBTU0sUUFBUU4sUUFBUyxPQUFULENBQWQ7QUFDQSxJQUFNTyxTQUFTUCxRQUFTLFFBQVQsQ0FBZjtBQUNBLElBQU1RLFNBQVNSLFFBQVMsUUFBVCxDQUFmO0FBQ0EsSUFBTVMsVUFBVVQsUUFBUyxTQUFULENBQWhCO0FBQ0EsSUFBTVUsU0FBU1YsUUFBUyxRQUFULENBQWY7QUFDQSxJQUFNVyxZQUFZWCxRQUFTLFdBQVQsQ0FBbEI7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RDs7QUFvR0FvQixPQUFPQyxPQUFQLEdBQWlCdEIsT0FBakIiLCJmaWxlIjoiY29ubmVjdC5zdXBwb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qO1xuXHRAc3VibW9kdWxlLWxpY2Vuc2U6XG5cdFx0VGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cdFx0QG1pdC1saWNlbnNlXG5cblx0XHRDb3B5cmlnaHQgKEBjKSAyMDE3IFJpY2hldmUgU2lvZGluYSBCZWJlZG9yXG5cdFx0QGVtYWlsOiByaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXG5cblx0XHRQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5cdFx0b2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuXHRcdGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcblx0XHR0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5cdFx0Y29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5cdFx0ZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuXHRcdFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuXHRcdGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblx0XHRUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5cdFx0SU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5cdFx0RklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5cdFx0QVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuXHRcdExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5cdFx0T1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblx0XHRTT0ZUV0FSRS5cblx0QGVuZC1zdWJtb2R1bGUtbGljZW5zZVxuXG5cdEBzdWJtb2R1bGUtY29uZmlndXJhdGlvbjpcblx0XHR7XG5cdFx0XHRcInBhY2thZ2VcIjogXCJoZXJlZGl0b1wiLFxuXHRcdFx0XCJwYXRoXCI6IFwiaGVyZWRpdG8vY29ubmVjdC5qc1wiLFxuXHRcdFx0XCJmaWxlXCI6IFwiY29ubmVjdC5qc1wiLFxuXHRcdFx0XCJtb2R1bGVcIjogXCJoZXJlZGl0b1wiLFxuXHRcdFx0XCJhdXRob3JcIjogXCJSaWNoZXZlIFMuIEJlYmVkb3JcIixcblx0XHRcdFwiY29udHJpYnV0b3JzXCI6IFtcblx0XHRcdFx0XCJKb2huIExlbm9uIE1hZ2hhbm95IDxqb2hubGVub25tYWdoYW5veUBnbWFpbC5jb20+XCJcblx0XHRcdF0sXG5cdFx0XHRcImVNYWlsXCI6IFwicmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVwiLFxuXHRcdFx0XCJyZXBvc2l0b3J5XCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3ZvbGtvdmFzeXN0ZW1zL2hlcmVkaXRvLmdpdFwiLFxuXHRcdFx0XCJ0ZXN0XCI6IFwiaGVyZWRpdG8tdGVzdC5qc1wiLFxuXHRcdFx0XCJnbG9iYWxcIjogZmFsc2UsXG5cdFx0XHRcImludGVybmFsXCI6IHRydWVcblx0XHR9XG5cdEBlbmQtc3VibW9kdWxlLWNvbmZpZ3VyYXRpb25cblxuXHRAc3VibW9kdWxlLWRvY3VtZW50YXRpb246XG5cdFx0Q29ubmVjdG9yIGNsYXNzIGZhY3RvcnkuXG5cdEBlbmQtc3VibW9kdWxlLWRvY3VtZW50YXRpb25cblxuXHRAaW5jbHVkZTpcblx0XHR7XG5cdFx0XHRcImNsYXpvZlwiOiBcImNsYXpvZlwiLFxuXHRcdFx0XCJkaWF0b21cIjogXCJkaWF0b21cIixcblx0XHRcdFwiZWVuXCI6IFwiZWVuXCIsXG5cdFx0XHRcImVyb2RlXCI6IFwiZXJvZGVcIixcblx0XHRcdFwiZmFsenlcIjogXCJmYWx6eVwiLFxuXHRcdFx0XCJrZWluXCI6IFwia2VpblwiLFxuXHRcdFx0XCJtZXRvblwiOiBcIm1ldG9uXCIsXG5cdFx0XHRcIm5ncmF2ZVwiOiBcIm5ncmF2ZVwiLFxuXHRcdFx0XCJudHJwcnRcIjogXCJudHJwcnRcIixcblx0XHRcdFwicHJvdHlwZVwiOiBcInByb3R5cGVcIixcblx0XHRcdFwic3RhdGlzXCI6IFwic3RhdGlzXCIsXG5cdFx0XHRcInRyYW5zcGhlclwiOiBcInRyYW5zcGhlclwiLFxuXHRcdFx0XCJ0cnVseVwiOiBcInRydWx5XCJcblx0XHR9XG5cdEBlbmQtaW5jbHVkZVxuKi9cblxuY29uc3QgY2xhem9mID0gcmVxdWlyZSggXCJjbGF6b2ZcIiApO1xuY29uc3QgZGlhdG9tID0gcmVxdWlyZSggXCJkaWF0b21cIiApO1xuY29uc3QgZWVuID0gcmVxdWlyZSggXCJlZW5cIiApO1xuY29uc3QgZXJvZGUgPSByZXF1aXJlKCBcImVyb2RlXCIgKTtcbmNvbnN0IGZhbHp5ID0gcmVxdWlyZSggXCJmYWx6eVwiICk7XG5jb25zdCBrZWluID0gcmVxdWlyZSggXCJrZWluXCIgKTtcbmNvbnN0IG1ldG9uID0gcmVxdWlyZSggXCJtZXRvblwiICk7XG5jb25zdCBuZ3JhdmUgPSByZXF1aXJlKCBcIm5ncmF2ZVwiICk7XG5jb25zdCBudHJwcnQgPSByZXF1aXJlKCBcIm50cnBydFwiICk7XG5jb25zdCBwcm90eXBlID0gcmVxdWlyZSggXCJwcm90eXBlXCIgKTtcbmNvbnN0IHN0YXRpcyA9IHJlcXVpcmUoIFwic3RhdGlzXCIgKTtcbmNvbnN0IHRyYW5zcGhlciA9IHJlcXVpcmUoIFwidHJhbnNwaGVyXCIgKTtcbmNvbnN0IHRydWx5ID0gcmVxdWlyZSggXCJ0cnVseVwiICk7XG5cbmNvbnN0IElOSEVSSVRBTkNFID0gU3ltYm9sKCBcImluaGVyaXRhbmNlXCIgKTtcbmNvbnN0IENISUxEID0gU3ltYm9sKCBcImNoaWxkXCIgKTtcblxuY29uc3QgY29ubmVjdCA9IGZ1bmN0aW9uIGNvbm5lY3QoICl7XG5cdGxldCBDb25uZWN0b3IgPSBkaWF0b20oIFwiQ29ubmVjdG9yXCIgKTtcblxuXHRzdGF0aXMoIENvbm5lY3RvciApXG5cblx0XHQuYXR0YWNoKCBJTkhFUklUQU5DRSwgWyBdIClcblxuXHRcdC5pbXBsZW1lbnQoIFwiZmx1c2hcIiwgZnVuY3Rpb24gZmx1c2goICl7XG5cdFx0XHRsZXQgaW5oZXJpdGFuY2UgPSBudHJwcnQoIElOSEVSSVRBTkNFLCB0aGlzICk7XG5cblx0XHRcdHdoaWxlKCBpbmhlcml0YW5jZS5sZW5ndGggKXtcblx0XHRcdFx0aW5oZXJpdGFuY2UucG9wKCApO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9IClcblxuXHRcdC5pbXBsZW1lbnQoIFwicmVzZXRcIiwgZnVuY3Rpb24gcmVzZXQoICl7XG5cdFx0XHRtZXRvbiggdGhpcy5wcm90b3R5cGUgKS5mb3JFYWNoKCAoIG1ldGhvZCApID0+ICggZGVsZXRlIHRoaXMucHJvdG90eXBlWyBtZXRob2QgXSApIClcblxuXHRcdFx0dGhpcy5mbHVzaCggKTtcblxuXHRcdFx0ZXJvZGUoIENISUxELCB0aGlzICk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0gKVxuXG5cdFx0LmltcGxlbWVudCggXCJwdXNoXCIsIGZ1bmN0aW9uIHB1c2goIHBhcmVudCApe1xuXHRcdFx0Lyo7XG5cdFx0XHRcdEBtZXRhLWNvbmZpZ3VyYXRpb246XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XCJwYXJlbnQ6cmVxdWlyZWRcIjogXCJmdW5jdGlvblwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxuXHRcdFx0Ki9cblxuXHRcdFx0aWYoIGZhbHp5KCBwYXJlbnQgKSB8fCAhcHJvdHlwZSggcGFyZW50LCBGVU5DVElPTiApICl7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvciggXCJpbnZhbGlkIHBhcmVudCBjbGFzc1wiICk7XG5cdFx0XHR9XG5cblx0XHRcdGxldCBpbmhlcml0YW5jZSA9IG50cnBydCggSU5IRVJJVEFOQ0UsIHRoaXMgKTtcblxuXHRcdFx0Lyo7XG5cdFx0XHRcdEBub3RlOlxuXHRcdFx0XHRcdEFjY3VtdWxhdGUgcGFyZW50IHRvIHRoZSBjb25uZWN0b3IuXG5cdFx0XHRcdEBlbmQtbm90ZVxuXHRcdFx0Ki9cblx0XHRcdGRve1xuXHRcdFx0XHRpZiggIWVlbiggaW5oZXJpdGFuY2UsIHBhcmVudCApICl7XG5cdFx0XHRcdFx0aW5oZXJpdGFuY2UucHVzaCggcGFyZW50ICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fXdoaWxlKCB0cnVseSggcGFyZW50ID0gcGFyZW50LnByb3RvdHlwZS5wYXJlbnQgKSApO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9IClcblxuXHRcdC5pbXBsZW1lbnQoIFwidHJhY2VcIiwgZnVuY3Rpb24gdHJhY2UoIHBhcmVudCApe1xuXHRcdFx0Lyo7XG5cdFx0XHRcdEBtZXRhLWNvbmZpZ3VyYXRpb246XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XCJwYXJlbnQ6cmVxdWlyZWRcIjogXCJmdW5jdGlvblwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxuXHRcdFx0Ki9cblxuXHRcdFx0aWYoIGZhbHp5KCBwYXJlbnQgKSB8fCAhcHJvdHlwZSggcGFyZW50LCBGVU5DVElPTiApICl7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvciggXCJpbnZhbGlkIHBhcmVudCBjbGFzc1wiICk7XG5cdFx0XHR9XG5cblx0XHRcdGlmKCBrZWluKCBcImNvbm5lY3RvclwiLCBwYXJlbnQgKSAmJiBjbGF6b2YoIHBhcmVudC5jb25uZWN0b3IsIFwiQ29ubmVjdG9yXCIgKSApe1xuXHRcdFx0XHRudHJwcnQoIElOSEVSSVRBTkNFLCBwYXJlbnQuY29ubmVjdG9yICkuZm9yRWFjaCggKCBhbmNlc3RvciApID0+IHRoaXMucHVzaCggYW5jZXN0b3IgKSApO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9IClcblxuXHRcdC5pbXBsZW1lbnQoIFwicmVnaXN0ZXJcIiwgZnVuY3Rpb24gcmVnaXN0ZXIoIGNoaWxkICl7XG5cdFx0XHQvKjtcblx0XHRcdFx0QG1ldGEtY29uZmlndXJhdGlvbjpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcImNoaWxkOnJlcXVpcmVkXCI6IFwiZnVuY3Rpb25cIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0QGVuZC1tZXRhLWNvbmZpZ3VyYXRpb25cblx0XHRcdCovXG5cblx0XHRcdGlmKCBmYWx6eSggY2hpbGQgKSB8fCAhcHJvdHlwZSggY2hpbGQsIEZVTkNUSU9OICkgKXtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCBcImludmFsaWQgY2hpbGQgY2xhc3NcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHR0cmFuc3BoZXIoIHRoaXMsIGNoaWxkLCB0cnVlICk7XG5cblx0XHRcdG5ncmF2ZSggQ0hJTEQsIHRoaXMsIGNoaWxkICk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0gKTtcblxuXHRyZXR1cm4gQ29ubmVjdG9yO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb25uZWN0O1xuIl19
//# sourceMappingURL=connect.support.js.map
