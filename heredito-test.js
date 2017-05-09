
const clazof = require( "clazof" );
const heredito = require( "./heredito.js" );
const util = require( "util" );
const wauker = require( "wauker" );

let ClassA = function ClassA( ){ };
ClassA.prototype.setA = function setA( ){
	console.log( "set A" );

	return this;
};

let ClassB = function ClassB( ){ };
ClassB.prototype.setB = function setB( ){
	console.log( "set B" );

	return this;
};

let ClassC = function ClassC( ){ };
ClassC.prototype.setC = function setC( ){
	console.log( "set C" );

	return this;
};

let ClassD = function ClassD( ){ };
ClassD.prototype.setD = function setD( ){
	console.log( "set D" );

	return this;
};

ClassA = heredito( ClassA, ClassB );
console.log( clazof( ClassA( ), ClassD ) );

ClassC = heredito( ClassC, ClassD );
console.log( clazof( ClassC( ), ClassD ) );

ClassA( ).setA( );
ClassA( ).setB( );

ClassA = heredito( ClassA, ClassC );
ClassA( ).setA( );
ClassA( ).setB( );
ClassA( ).setC( );
ClassA( ).setD( );
console.log( clazof( ClassA( ), ClassD ) );

ClassC = heredito( ClassC, ClassA, ClassB, ClassD );
ClassC( ).setA( );
console.log( clazof( ClassC( ), ClassD ) );

console.log( ClassC );
