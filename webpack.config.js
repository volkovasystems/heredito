const webpack = require( "webpack" );
const ResolverPlugin = webpack.ResolverPlugin;
const DirectoryDescriptionFilePlugin = ResolverPlugin.DirectoryDescriptionFilePlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
	"entry": "./heredito.support.js",
	"resolve": {
		"modulesDirectories": [ "bower_components", "node_modules" ]
	},
	"module": {
		"preLoaders": [
			{
				"test": /\.support\.js$/,
				"loader": "source-map-loader"
			}
		]
	},
	"output": {
		"library": "heredito",
		"libraryTarget": "umd",
		"filename": "heredito.deploy.js"
	},
	"plugins": [
		new ResolverPlugin( new DirectoryDescriptionFilePlugin( "bower.json", [ "support" ] ) ),
		new ResolverPlugin( new DirectoryDescriptionFilePlugin( ".bower.json", [ "main" ] ) ),
		new UglifyJsPlugin( {
			"compress": { "warnings": false },
			"comments": false,
			"sourceMap": true,
			"mangle": false
		} )
	],
	"devtool": "#inline-source-map"
};
