/**
 * Off Canvas jQuery Plugin
 *
 * Provides functionality to hide and show navigation which is UX friendly for small
 * and mobile screen sizes.
 *
 * Public plugin, please use for any project.
 *
 * @author Richard McCartney <richard.mccartney@me.com / twitter - @Rich_McCartney>
 *
 * Updated 16/06/2013
 *
 */

jQuery(document).ready(function($) {

	// Set JS class
	$('.no-js').removeClass('no-js').addClass('js');

	// Elements
	var reveal = $('.reveal'),
		hide = $('.hide'),
		navi = $('.navigation'),
		wrap = $('.inner-wrap'),
		open = false,
		speed = 350,
		slide = '70%',
		pos = 'relative',
		mobile = false,
		deviceWidth = window.screen.width;

	/**
	 * isMobile function checks weather the user is on a mobile device. This is determined by device width.
	 * If so the mobile variable will either be set to false or true. This will effect
	 * how the off canvas navigation is animated.
	 *
	 */

	function isMobile() {

		if(deviceWidth < 1024) {

            mobile = true;

            /**
             * Adds a class to the inner wrapper. This will have the webkit animation styles
             * which are only used for mobile devices.
             *
             */

			wrap.addClass('mobile-animate');

        } else {

        	/**
             * If its not a mobile device set the function to false and remove any wrapper
             * styles.
             *
             */

        	mobile = false;

			wrap.removeClass('mobile-animate');
        };
	};

	/**
	 * Run isMobile function
	 *
	 */

	isMobile();

	/**
	 * The reveal navigation function. This function shall set the open state to true
	 * and animate the canvas & show the hidden navigation.
	 *
	 */

	var revealNavi = function() {

		open = true;

		// Set position to fixed
		slide = '70%';

		if (mobile == false) {

			// Desktop animation
			wrap.animate({
				left : slide
			}, speed);

			navi.show(100);

		} else if (mobile == true) {

			// Mobile animation
			wrap.css({
				left : slide
			});

			navi.show();
		};

	};

	/**
	 * The hidden function. This function will set the open state to false
	 * and animate the canvas close and hide the navigation.
	 *
	 */

	var hidden = function() {

		open = false;

		// Set side amount to 0 and position relative
		slide = '0%';

		// Hide animation
		if (mobile == false) {

			// Desktop animation
			navi.hide(100);

			wrap.animate({
				left : slide
			}, speed);

		} else if (mobile == true) {

			// Mobile animation
			navi.hide();

			wrap.css({
				left : slide
			});

		};

	};

	/**
	 * Navigation hide function. On the click of the navigation close (x) icon
	 * will close the open off canvas navigation.
	 */

	hide.on('click', function() {
		hidden();
	});

	/**
	 * Navigation open/close function. On the click of the navigation icon
	 * will run the relevant function to show or hide the navigation.
	 */

	reveal.on('click', function() {
		if (open == true) {
			hidden();
		} else {
			revealNavi();
		}
	});

	/**
	 * This bind will act when a swipe left effect has been used.
	 * This will mimic more popular 'Apps' in closing navigation on
	 * various swipes.
	 *
	 */

	wrap.bind('swipeleft', function(){
		if (open == true) {
			hidden();
		};
	});

	/**
	 * Window resize function when the navigaation is open or closed
	 */

	$(window).resize(function() {

		var length = $(window).width();

		/**
		 * These two if statements will detect one if the navigation slider is open on
		 * browser resize. If so and the window is greater than 768 the hidden function
		 * will run and then show the navigation back in its original state.
		 *
		 */

		if (length >= 768 && open == true) {
			hidden();
			navi.show();
		};

		/**
		 * This secondary if statement will check just based on window size weather to
		 * show or hide the navigation. This will only apply when the slide in navigation
		 * has NOT be activated. This is a failsafe as well if the slider has been run as
		 * the Hide/Show functions will apply CSS of { Display : none; } on the navigation
		 * this is to resasure they are correctly hidden or visible.
		 *
		 */

		if (length >= 768 && open == false) {
			navi.show();
		} else if (length < 768 && open == false) {
			navi.hide();
		}

	});

});