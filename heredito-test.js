
const assert = require( "assert" );
const heredito = require( "./heredito.js" );

let ClassA = function ClassA( ){ };
ClassA.prototype.testA = function testA( ){
	return `test A, ${ this.constructor.name }`;
};

let ClassB = function ClassB( ){ };
ClassB.prototype.testB = function testB( ){
	return `test B, ${ this.constructor.name }`;
};

let ClassC = function ClassC( ){ };
ClassC.prototype.testC = function testC( ){
	return `test C, ${ this.constructor.name }`;
};

let ClassD = function ClassD( ){ };
ClassD.prototype.testD = function testD( ){
	return `test D, ${ this.constructor.name }`;
};

ClassA = heredito( ClassA, ClassB );

assert.equal( ClassA instanceof ClassB, true, "should be true" );

assert.equal( ClassA( ) instanceof ClassB, true, "should be true" );

assert.equal( ClassA( ).testB( ), "test B, ClassA", "should be equal" );

ClassC = heredito( ClassC, ClassD );

assert.equal( ClassC instanceof ClassC, true, "should be true" );

assert.equal( ClassC( ) instanceof ClassC, true, "should be true" );

assert.equal( ClassC( ).testD( ), "test D, ClassC", "should be equal" );

ClassB = heredito( ClassB, ClassD );

ClassC = heredito( ClassC, ClassA, ClassB, ClassD );

assert.equal( ClassC instanceof ClassA, true, "should be true" );

assert.equal( ClassC instanceof ClassB, true, "should be true" );

assert.equal( ClassC instanceof ClassD, true, "should be true" );

assert.equal( ClassC instanceof ClassC, true, "should be true" );

assert.equal( ClassC( ) instanceof ClassA, true, "should be true" );

assert.equal( ClassC( ) instanceof ClassB, true, "should be true" );

assert.equal( ClassC( ) instanceof ClassD, true, "should be true" );

assert.equal( ClassC( ) instanceof ClassC, true, "should be true" );

console.log( "ok" );
