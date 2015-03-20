
(function($) {
	
	 $.fn.simpleTags = function(options,data) {

		options = options !== undefined ? options : {};
				 
			 if (typeof(options) === 'object') {
				 				 
				 if (undefined === $(this).data('simpleTags')) {
					 var plugin = new $.simpleTags(this, options);
					 $(this).data('simpleTags', plugin);
				 }
			 } else if ($(this).data('simpleTags')[options]) {				
				return $(this).data('simpleTags')[options].apply($(this), [data]);
			 } else {
				 $.error('Method ' + options + ' does not exist in $.simpleTags');
			 }
		 
		 
	 };
	
	$.simpleTags = function (element, options) {
		
		var defaults = {
			prefix: 'simpleTags_',
			minchars: 3,
			maxchars: 20,
			tokens: undefined
		};

		var plugin = this;	
		var $source_element = $(element);
		var $container_element = null;	
		var tags = [];
			
		plugin.init = function () {
			
			plugin.settings = $.extend({}, defaults, options);
			
			$container_element = $("<div/>")
								.addClass("simpleTags")
								.prop("tabindex",1);
			
								
			if ($source_element.attr('id') !== undefined) {
				$container_element.attr('id', plugin.settings.prefix + $source_element.attr('id'));
			}			
						
			$source_element.after($container_element);
			$source_element.hide();			
			$container_element.focus();			
			
			if (plugin.settings.tokens !== undefined){
				addTokens(plugin.settings.tokens);
			}
							
			$container_element.on('keypress', function( event ) {
						
				var $textbox = $container_element.find("#textinput");						
				if ($textbox.length == 0)
				{
					$textbox = $("<input/>")
								.prop("id","textinput")
								.addClass("simpleTags_InputBox")
								.appendTo($container_element);
					
					$textbox.focusout(function() {
						$textbox.remove();
					});				
				}	

				$textbox.focus();
				
				if (event.keyCode == 13 &&  $textbox.val().length < plugin.settings.minchars  ){
					event.preventDefault();
				}
				else if (event.keyCode == 13 && $textbox.val().length >=  plugin.settings.minchars
					&& $textbox.val().length <= plugin.settings.maxchars ){
					addToken ($textbox.val());
					$textbox.remove();		
					$container_element.focus();	
				}
				else if ($textbox.val().length <= plugin.settings.maxchars ){							
					$textbox.append (event);			
				}

			});
		};
				
		plugin.get = function() {       
			return tags;
        };
		
		plugin.addTokens = function(pData) {       
			addTokens(pData);
        };
		
		plugin.clear = function(pValue) {       			
			$container_element.empty();		
			tags = [];
        };
		
		plugin.minchars = function(pValue) {       			
			plugin.settings.minchars = pValue;			
        };
		
		plugin.maxchars = function(pValue) {       			
			plugin.settings.maxchars = pValue;			
        };
		
		function addTokens (pTokens)
		{
			for (k = 0; k < pTokens.length; k++){				
				addToken(pTokens[k]);				
			}
		}
				
		function addToken (pTokenText)
		{
			storeData(pTokenText);
						
			var $token = $("<div/>")
				.addClass("simpleTags_Tag")				
				.appendTo($container_element);
				
			var $label = $("<div/>")
				.addClass("simpleTags_Tag_title")
				.html(pTokenText)
				.appendTo($token);
										
			var $removebutton = $("<div/>")
				.addClass('simpleTags_Tag_remove')
				.html('X')				
				.appendTo($token);
				
			$removebutton.on('mousedown', 
					function(e) {						
						var $parent = $(this).parent();			
						removeData($parent.index());				
						$parent.remove();	
						$container_element.focus();				
						});
																	
		}		
		
		function storeData(pText)
		{			
			tags.push(pText);	
		}
		
		function removeData(pPos)
		{
			tags.splice(pPos,1);
		}
			
		// Initialize plugin
		plugin.init();
					
};




}(jQuery));
