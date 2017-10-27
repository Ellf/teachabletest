$(window).on("load", function() {
	$('.body-content-view').prepend('<div class="test-div"><h3>Test Div</h3><div class="slider"></div></div>');

	$( ".slider" ).slider({
  		animate: "fast"
	});
});