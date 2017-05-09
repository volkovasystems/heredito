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
              			"falzy": "falzy",
              			"leveld": "leveld",
              			"protype": "protype",
              			"reclas": "reclas",
              			"sepby": "sepby",
              			"wauker": "wauker",
              			"x10cv": "x10cv"
              		}
              	@end-include
              */

var apiqe = require("apiqe");
var budge = require("budge");
var falzy = require("falzy");
var leveld = require("leveld");
var protype = require("protype");
var reclas = require("reclas");
var sepby = require("sepby");
var wauker = require("wauker");
var x10cv = require("x10cv");

var connect = require("./connect.js");
var inherit = require("./inherit.js");

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

	parent = leveld(budge(arguments).
	filter(function (parameter) {return protype(parameter, FUNCTION);}).map(wauker)).
	map(function (blueprint) {return reclas(blueprint);});

	child = wauker(child).map(function (blueprint) {return reclas(blueprint);});

	var tree = apiqe([child[0]], parent.concat(budge(child))).reverse();

	console.log(tree);

	return sepby(tree, function (blueprint) {return x10cv(blueprint);}).
	reduce(function (parent, child) {return inherit(child, parent, connect());});
};

module.exports = heredito;

//# sourceMappingURL=heredito.support.js.map