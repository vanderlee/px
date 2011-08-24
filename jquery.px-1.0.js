/* px v1.0
 * https://github.com/vanderlee/px
 *
 * Copyright (c) 2011 Martijn W. van der Lee
 * Licensed under the MIT.
 *
 * Measure an amount of CSS3 units in pixels, relative to a specified context if available.
 * Based on http://www.filamentgroup.com/lab/update_jquery_plugin_for_retaining_scalable_interfaces_with_pixel_to_em_con/
 */

//TODO Limit context to one element
//TODO Cache results
//TODO Lazy on the inches, etc.
 
(function( $ ){
	$.fn.px = function(size) {
		var element = $('<div style="display:none;height:10in;border:0;margin:0;padding:0"></div>').appendTo('body');
		var inch = element.height() / 10.;
		element.remove();
		
		var win = $(window);
	
		function _measureFontSize(name, context) {
			var element = $('<div style="display:none;font-size:'+name+';border:0;margin:0;padding:0"><div style="display:none;height:1em;border:0;margin:0;padding:0"></div></div>').appendTo(context);
			var width = $('div', element).height();
			//element.remove();
			return width;
		}	
	
		function _measureRelativeUnit(unit, context) {
			var element = jQuery('<div style="display:none;height:10'+unit+';margin:0;padding:0;border:0;"></div>').appendTo(context);
			var px = element.height() / 10.;
			element.remove();
			return px;
		}
		
		function _measureBorderWidth(width) {
			var element = $('<div style="display:none;border:'+width+' solid transparent;height:0;margin:0;padding:0"></div>').appendTo('body');
			var width = element.outerHeight() / 2.;
			element.remove();
			return width;
		}		
		
		var re = /^([-+]?\d*\.?\d*)(\D*)$/i;
		var m = re.exec(size);	
		var length	= (size && m != null && m[1])? m[1] : 1;
		var unit	= (size && m != null && m[2])? m[2] : 'em';		

		var px = 0;
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
				px = _measureRelativeUnit(unit, this.first());
				break;
				
		// viewport dimensions
			case 'vw':
				px = win.width() / 100.;
				break;
			case 'vh':
				px = win.width() / 100.;
				break;
			case 'vm':
				px = Math.min(win.width(), win.height()) / 100.;
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
})( jQuery );