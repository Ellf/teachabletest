$(window).on("load", function() {

	var uipanel;
	var sectionTitleFontSize = $(".section-title").css('font-size');
	console.log(sectionTitleFontSize); // 22px

	uipanel = '<div class="test-div"><h3>Teachable Stylist v0.0.5</h3><div class="ui-wrapper"><div id="slider1"></div></div></div>';


	$('.body-content-view').prepend(uipanel);


	$( "#slider1" ).slider({
  		animate: "fast",
  		max: 60,
  		min: 8,
  		slide: function(event, ui) {
  			var selection = $('#slider1').slider('value');
  			$('.section-title').css('font-size', selection + 'px');
  			console.log(selection + 'px');
  		}
	});
	
});