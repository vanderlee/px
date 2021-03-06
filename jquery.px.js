/*jslint devel: true, bitwise: true, regexp: true, browser: true, confusion: true, unparam: true, eqeq: true, white: true, nomen: true, plusplus: true, maxerr: 50, indent: 4 */
/*globals jQuery */

/*! px
 * Copyright (c) 2011-215 Martijn W. van der Lee
 * Licensed under the MIT.
 */
/* Measure an amount of CSS3 units in pixels, relative to a specified context if available.
 * Based on http://www.filamentgroup.com/lab/update_jquery_plugin_for_retaining_scalable_interfaces_with_pixel_to_em_con/
 */

(function($, undefined){
	$.fn.px = function(size) {
		var element = $('<div style="display:none;height:100in;border:0;margin:0;padding:0"></div>').appendTo('body'),
			inch	= element.height() / 100.;
		element.remove();
		
		var win = $(window);
	
		function _measureFontSize(name, context) {
			var element = $('<div style="display:none;font-size:'+name+';border:0;margin:0;padding:0"><div style="display:none;height:1em;border:0;margin:0;padding:0"></div></div>').appendTo(context),
				width	= $('div', element).height();
			element.remove();
			return width;
		}	
	
		function _measureRelativeUnit(unit, context) {
			var element = $('<div style="display:none;height:100'+unit+';margin:0;padding:0;border:0;"></div>').appendTo(context),
				px		= element.height() / 100.;
			element.remove();
			return px;
		}
		
		function _measureBorderWidth(width) {
			var element = $('<div style="display:none;border:'+width+' solid transparent;height:0;margin:0;padding:0"></div>').appendTo('body'),
				width = element.outerHeight() / 2.;
			element.remove();
			return width;
		}		
	
		var m		= /^([-+]?\d*\.?\d*)(\D*)$/i.exec(size),
			length	= (size && m != null && m[1])? m[1] : 1,
			unit	= (size && m != null && m[2])? m[2] : 'em',
			px		= 0;

		switch (unit) {
		// absolute units
			case 'px':	px = 1;				break;			
			case 'in':	px = inch;			break;
			case 'cm':	px = inch / 2.54;	break;
			case 'mm':	px = inch / 25.4;	break;
			case 'pt':	px = inch / 72;		break;
			case 'pc':	px = inch / 6;		break;

		// relative units
			case 'em':
			case 'ex':
			case 'rem':
			case 'ch':
				px = _measureRelativeUnit(unit, this.first());
				break;
				
		// viewport dimensions
			case 'vw':
				px = win.width() / 100.;
				break;
			case 'vh':
				px = win.height() / 100.;
				break;
			case 'vm':
			case 'vmin':
				px = Math.min(win.width(), win.height()) / 100.;
				break;
			case 'vd':	// non-CSS3!
				var w = win.width();
				var h = win.height();
				px = Math.sqrt((w * w) + (h * h)) / 100.;
				break;
			case 'vmax':	// Not supported on IE
				px = Math.max(win.width(), win.height()) / 100.;
				break;
				
		// border - plain name
			case 'thin':
			case 'thick':
				px = _measureBorderWidth(unit);
				break;
				
		// border - "border-" prefix
			case 'border-thin':
			case 'border-medium':
			case 'border-thick':
				px = _measureBorderWidth(unit.substr(7));
				break;
				
		// font-size - percentage
			case '%':
				px = _measureRelativeUnit('em', this.first()) / 100.;	// 1/100th of 1em
				break;
				
		// font-size - plain names (no context)
			case 'xx-small':
			case 'x-small':
			case 'small':
			case 'medium':
			case 'large':
			case 'x-large':
			case 'xx-large':
		// font-size - plain names (uses context)
			case 'smaller':
			case 'larger':
			case 'initial':
				px = _measureFontSize(unit, this.first());
				break;
				
		// unknown unit
			default:	
				throw 'Unknown unit "'+unit+'"'; 
				break;
		}
		
		return length * px;
	};
	
	$.px = function(size) {
		return $('body').px(size);
	};
})(jQuery);