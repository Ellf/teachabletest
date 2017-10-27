$(window).on("load", function() {
	var uipanel;
	uipanel = '<div class="test-div"><h3>Test Div</h3><div class="ui-wrapper"><div class="slider"></div></div></div>';



	$('.body-content-view').prepend(uipanel);


	$( ".slider" ).slider({
  		animate: "fast"
	});
});