// Initialize the UseMe display
$(document).ready(function() {
    
    // Check that Shywall got loaded.
    // If not, wait a while and reload the page
    if (typeof(Shywall) == 'undefined') {
        console.log('Could not load Shywall');
        var waitTime = 20 * 1000;
        setTimeout(function() {
              window.location.reload();
            }, waitTime);
        return;
    }

    // Get the controls for the page
    var homePage = '/';    
    var controls = [ ];
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
console.log('controls:', controls);    

    // Initialize Useme.tv
	var config = {
		wallKey: USEMETV_WALLKEY,
		menuLabel: 'Types of Travel',
		home: homePage,
		controls: controls,
		shywallHost: USEMETV_HOST,
		shywallPort: USEMETV_PORT
	};
console.log('config:', config);
    Shywall.shywall(config);

});
