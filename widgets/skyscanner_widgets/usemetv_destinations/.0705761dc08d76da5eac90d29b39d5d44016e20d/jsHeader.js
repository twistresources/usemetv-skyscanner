// Initialize the UseMe display
$(document).ready(function() {

    var duration = 1000;
    
    // Get the controls for the page
    var homePage = '/';    
    var controls = [ ];
    
    // Add the destinations first
    $('.usemetv-destination').each(function(index, dst){
        var $dst = $(dst);
        var airportCode = $dst.attr('data-airportCode');
        var description = $dst.attr('data-description');
        controls.push({
            label: description,
            onClick: function(){
                PricesByDate.setDestination(airportCode, description)
            }
        });
        
        if (index == 0) PricesByDate.setDestination(airportCode, description);
    });
    
    // Now add the regular buttons
    var $buttons = $(".usemetv-button");
    $buttons.each(function(index, button){
        var $button = $(button)
        var label = $button.attr('data-label');
        var ref = $button.attr('data-ref');
        var home = $button.attr('data-home');
        if (home) {
            
            // Remember this as the home page
            homePage = ref;
        } else {
            
            // Add as a Button on the Remote
            controls.push({
                label: label,
                onClick: ref
            });            
        }
        
    });
console.log('controls=', controls)    
    
    // Initialize Useme.tv
	var config = {
		wallKey: USEMETV_WALLKEY,
		menuLabel: 'Types of Travel',
		home: homePage,
		controls: controls,
		shywallHost: USEMETV_HOST,
		shywallPort: USEMETV_PORT
	};
    
    /*
    // Add controls defined by the page
    var $buttons = $(".usemetv-button");
    $buttons.each(function(index, button){
        var $button = $(button)
        var label = $button.attr('data-label');
        var ref = $button.attr('data-ref');
        config.controls.push({
            label: label,
            onClick: ref
        });
    });
    
    // Add a back button
    config.controls.push({
        label: 'Back',
        onClick: backPage
    });
    */
    
    Shywall.shywall(config);

});
