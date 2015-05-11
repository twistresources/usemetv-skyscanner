// Initialize the UseMe display
$(document).ready(function() {

    var duration = 1000;
    
    var homePage = $('#usemetv-idlePage').val();
    var backPage = $('#usemetv-backPage').val();

	var config = {
		wallKey: '12345',
		menuLabel: 'Types of Travel',
		home: homePage,
		controls: [ ],
		shywallHost: USEMETV_HOST,
		shywallPort: USEMETV_PORT
	};
    
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
    
    // Find the destinations
    $('.usemetv-destination').each(function(index, dst){
        var $dst = $(dst);
        var airportCode = $dst.attr('data-airportCode');
        var description = $dst.attr('data-description');
        config.controls.push({
            label: description,
            onClick: function(){
                PricesByDate.setDestination(airportCode, description)
            }
        });
        
        if (index == 0) PricesByDate.setDestination(airportCode, description);
    });
    
    // Add a back button
    config.controls.push({
        label: 'Back',
        onClick: backPage
    });
    
    Shywall.shywall(config);

});
