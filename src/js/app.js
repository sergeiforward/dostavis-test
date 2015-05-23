'use strict';
$(document).ready(function () {

	var app = new function () {

		var scope = {};

		this.init = function () {
			
			scope.$delBloc = $('.js-text-del-wr');

			this.prepareText();
			
			var self = this;
			$('.js-del').click(function () {
				self.removeWord(this);
			});
			

		}

		this.prepareText = function () {

			scope.$delBloc.each(function (index) {
	
				var splittedText = $(this).html().split(' '),
		        	spLength = splittedText.length,
		        	res = []; 

			    for( var i = 0; i < spLength; i++ ) {
			    	res[i] = '<span class="js-del">' + splittedText[i] + '</span>';
			    }

			    $(this).html(res.join(' '));
			
			})
				
		}

		this.removeWord = function (el) {
			$(el).remove();
		}

		this.init();

	}

	app;

});