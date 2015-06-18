jQuery.px
=========
Version 1.2

Copyright (c) 2011-2015 Martijn W. van der Lee
Licensed under the MIT.

Measure an amount of CSS3 units in pixels, relative to a specified context if available.
Based on http://www.filamentgroup.com/lab/update_jquery_plugin_for_retaining_scalable_interfaces_with_pixel_to_em_con/

Syntax
------
*	`$(<context>).px(<size>);`
*	`$.px(<size>);`
    
Arguments
---------
### context (optional)
The DOM tree node in which to measure. Some units like 'em' and '%' are relative to the current font size.
If not specified, 'body' will be used for units that require a context.

### size (optional)
A number and CSS3 unit or constant that should be measured.
The number can be integer or floating point and may be preceded by a sign (-/+).
The unit can be any of the following:

*	px, in, cm, mm, pt, pc                      (no context)
*	em, ex, rem, ch                             (uses context)
*	vw, vh, vm, vmin, vmax                      (no context)
*	vd											(no context, not a CSS3 unit; hypothenuse of vw and vh)
*	thin, thick                                 (border widths)
*	border-thin, border-medium, border-thick    (alternative names for border widths)
*	%                                           (relative to current font-size, uses context)
*	xx-small, x-small, small, medium,
*	 large, x-large, xx-large                   (font-size names, no context)
*	initial										(initial font-size)
*	smaller, larger                             (relative font-size names, uses context)

Both the number and unit/constant are optional; number will default to '1', unit will default to 'em'.
    
Return
------
The measured size in pixel units.
If the unit is specified but not recognized, an error will be thrown.

Examples
--------
*	Current font-size (1em) set in <body>, measured in pixels: `$.px();`
*	"thin" border-width, measured in pixels: `$.px('thin');`
*	"small" font-size, measured in pixels: `$.px('small');`
*	Pixels in 2 inches: `$.px('2in');`
*	Pixels in a font-size 200%: `$.px('200%');`
*	Font-size 200%, within context of the element with id "here": `$('#here').px('200%');`
*	Pixels in an inch. Within a context, but context has no influence: `$('#here').px('in');