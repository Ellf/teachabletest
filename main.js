$(window).on("load", function() {

	var uipanel;
	var sectionTitleFontSize = $("h2.section-title").css('font-size');
	console.log(sectionTitleFontSize); // 22px

	uipanel = '<div class="test-div"><h3>Test Div</h3><div class="ui-wrapper"><div id="slider1"></div></div></div>';


	$('.body-content-view').prepend(uipanel);


	$( "#slider1" ).slider({
  		animate: "fast",
  		max: 60,
  		min: 8,
  		slide: function(event, ui) {
  			$('#slider1').val(sectionTitleFontSize + 'px');
  		}
	});
	$('#slider1').val(sectionTitleFontSize + 'px');
});