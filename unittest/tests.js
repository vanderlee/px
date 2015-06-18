/*jslint devel: true, bitwise: true, regexp: true, browser: true, confusion: true, unparam: true, eqeq: true, white: true, nomen: true, plusplus: true, maxerr: 50, indent: 4 */
/*globals $, QUnit */

/*
 * Note that results depend on browser default stylesheet.
 * Tests developed on Google Chrome 43.0.2357.124 m
 */

QUnit.module("px");

QUnit.test("no context", function(assert) {
	var width = $(window).width(),
		height = $(window).height();
	
	assert.equal($.px("px"), 1, 'px');
	assert.equal($.px("%"), 0.16, '%');
	assert.equal($.px("em"), 16, 'em');
	//assert.equal($.px("ex"), 7.16, 'ex'); depends on previous test
	assert.equal($.px("rem"), 16, 'rem');
	assert.equal($.px("ch"), 8, 'ch');
	assert.equal($.px("mm"), 3.7795275590551185, 'mm');
	assert.equal($.px("cm"), 37.79527559055118, 'cm');
	assert.equal($.px("in"), 96, 'in');
	assert.equal($.px("pt"), 1.3333333333333333, 'pt');
	assert.equal($.px("pc"), 16, 'pc');
	assert.equal($.px("vw"), width / 100, 'vw');
	assert.equal($.px("vh"), height / 100, 'vh');
	assert.equal($.px("vm"), Math.min(width, height) / 100, 'vm');
	assert.equal($.px("vd"), Math.sqrt((width * width) + (height * height)) / 100., 'vd');
	assert.equal($.px("vmin"), Math.min(width, height) / 100, 'vmin');
	assert.equal($.px("vmax"), Math.max(width, height) / 100, 'vmax');
	assert.equal($.px("thin"), 1, 'thin');
	assert.equal($.px("thick"), 5, 'thick');
	assert.equal($.px("border-thick"), 5, 'border-thick');
	assert.equal($.px("border-medium"), 3, 'border-medium');
	assert.equal($.px("larger"), 19.2000007629395, 'larger');
	assert.equal($.px("medium"), 16, 'medium');
	assert.equal($.px("initial"), 16, 'initial');
});

QUnit.test("10px context", function(assert) {
	var context = $('<span style="font-size:10px"/>').appendTo('#qunit-fixture'),
		width = $(window).width(),
		height = $(window).height();
	
	assert.equal(context.px("px"), 1, 'px');
	assert.equal(context.px("%"), 0.1, '%');
	assert.equal(context.px("em"), 10, 'em');
	assert.equal(context.px("ex"), 4.47, 'ex');
	assert.equal(context.px("rem"), 16, 'rem');
	assert.equal(context.px("ch"), 5, 'ch');
	assert.equal(context.px("mm"), 3.7795275590551185, 'mm');
	assert.equal(context.px("cm"), 37.79527559055118, 'cm');
	assert.equal(context.px("in"), 96, 'in');
	assert.equal(context.px("pt"), 1.3333333333333333, 'pt');
	assert.equal(context.px("pc"), 16, 'pc');
	assert.equal(context.px("vw"), width / 100, 'vw');
	assert.equal(context.px("vh"), height / 100, 'vh');
	assert.equal(context.px("vm"), Math.min(width, height) / 100, 'vm');
	assert.equal(context.px("vd"), Math.sqrt((width * width) + (height * height)) / 100., 'vd');
	assert.equal(context.px("vmin"), Math.min(width, height) / 100, 'vmin');
	assert.equal(context.px("vmax"), Math.max(width, height) / 100, 'vmax');
	assert.equal(context.px("thin"), 1, 'thin');
	assert.equal(context.px("thick"), 5, 'thick');
	assert.equal(context.px("border-thick"), 5, 'border-thick');
	assert.equal(context.px("border-medium"), 3, 'border-medium');
	assert.equal(context.px("larger"), 12, 'larger');
	assert.equal(context.px("medium"), 16, 'medium');
	assert.equal(context.px("initial"), 16, 'initial');
});

QUnit.test("100px context", function(assert) {
	var context = $('<span style="font-size:100px"/>').appendTo('#qunit-fixture'),
		width = $(window).width(),
		height = $(window).height();
	
	assert.equal(context.px("px"), 1, 'px');
	assert.equal(context.px("%"), 1, '%');
	assert.equal(context.px("em"), 100, 'em');
	assert.equal(context.px("ex"), 44.73, 'ex');
	assert.equal(context.px("rem"), 16, 'rem');
	assert.equal(context.px("ch"), 50, 'ch');
	assert.equal(context.px("mm"), 3.7795275590551185, 'mm');
	assert.equal(context.px("cm"), 37.79527559055118, 'cm');
	assert.equal(context.px("in"), 96, 'in');
	assert.equal(context.px("pt"), 1.3333333333333333, 'pt');
	assert.equal(context.px("pc"), 16, 'pc');
	assert.equal(context.px("vw"), width / 100, 'vw');
	assert.equal(context.px("vh"), height / 100, 'vh');
	assert.equal(context.px("vm"), Math.min(width, height) / 100, 'vm');
	assert.equal(context.px("vd"), Math.sqrt((width * width) + (height * height)) / 100., 'vd');
	assert.equal(context.px("vmin"), Math.min(width, height) / 100, 'vmin');
	assert.equal(context.px("vmax"), Math.max(width, height) / 100, 'vmax');
	assert.equal(context.px("thin"), 1, 'thin');
	assert.equal(context.px("thick"), 5, 'thick');
	assert.equal(context.px("border-thick"), 5, 'border-thick');
	assert.equal(context.px("border-medium"), 3, 'border-medium');
	assert.equal(context.px("larger"), 120, 'larger');
	assert.equal(context.px("medium"), 16, 'medium');
	assert.equal(context.px("initial"), 16, 'initial');
});

QUnit.test("quantities", function(assert) {
	assert.equal($.px("em"), 16, 'px');
	assert.equal($.px("1em"), 16, 'px');
	assert.equal($.px("2em"), 32, 'px');
	assert.equal($.px("0.2em"), 3.2, 'px');
	assert.equal($.px("2.2em"), 35.2, 'px');
	assert.equal($.px("2.22em"), 35.52, 'px');
	assert.equal($.px("2.222em"), 35.552, 'px');
	assert.equal($.px("2.2222em"), 35.5552, 'px');
	assert.equal($.px("0em"), 0, 'px');
	assert.equal($.px("-1em"), -16, 'px');
	assert.equal($.px("-2em"), -32, 'px');
	assert.equal($.px("-0.2em"), -3.2, 'px');
	assert.equal($.px("-2.2em"), -35.2, 'px');
	assert.equal($.px("1.em"), 16, 'px');
	assert.equal($.px("1.0em"), 16, 'px');
	assert.equal($.px(".1em"), 1.6, 'px');
	assert.equal($.px("0.1em"), 1.6, 'px');
});