(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

$(document).ready(function(){
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top-15
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});

});

// var Jquery = require('jquery');

// DBA NAME GOES HERE
$('.dba').text('Wholesome Cream');

// TERMS GO HERE, PLEASE ONLY USE SINGLE QUOTES INSIDE, NO DOUBLE QUOTES
$('.terms').html("");

// INGREDIENTS LIST GOES HERE
$('.ingredients').text('PRODUCT INGREDIENTS: ' + 'Water, Cetearyl Alcohol, Tryglycerides, Glycerin, Shea butter, Dimethicone, Deanol, Palmitoyl Oligopeptide, Palmitoyl Tripeptide-7, Porphyridium Cruentum Extract, Hydrolyzed Marin Collagen, Silantriol, Polysorbate 20, Glutamylamidoethyl Imidazole, Magnesium Ascorbyl Phosphate, Ascorbic Acid (Vitamin C), Retinol Palmitate, Xanthan Gum, Reservatol, Inositol Hexaphosphate, Inositol, Phytic Acid, Fragrance, Potassium Sorbate, Hexylene Glycol');

// STREET ADDRESS GOES HERE
$('.street').text('1234 Some Street');

// CITY GOES HERE
$('.city').text('Indianapolis' + ',');

// STATE GOES HERE
$('.state').text('IN');

//  ZIP CODE GOES HERE
$('.zip').text('46250');

// EMAIL ADDRESS GOES HERE
$('.email').text('gwen@trivasconsulting.com');

// PHONE NUMBER GOES HERE
$('.number').text('617-768-7933');

},{}]},{},[1])