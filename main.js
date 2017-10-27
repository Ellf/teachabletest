$(window).on("load", function() {

	var uipanel;
	var sectionTitleFontSize = $("h2.section-title").css('font-size');
	console.log(sectionTitleFontSize);

	uipanel = '<div class="test-div"><h3>Test Div</h3><div class="ui-wrapper"><div class="slider"></div></div></div>';


	$('.body-content-view').prepend(uipanel);


	$( ".slider" ).slider({
  		animate: "fast",
  		range: true,
  		max: 60,
  		min: 8,
  		value: sectionTitleFontSize
	});

});