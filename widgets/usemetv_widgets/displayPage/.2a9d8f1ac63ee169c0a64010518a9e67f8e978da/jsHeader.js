// Initialize the UseMe display
$(document).ready(function() {

    var duration = 1000;
    
    var homePage = $('#usemetv-idlePage').val();
    var backPage = $('#usemetv-backPage').val();

	var config = {
		wallKey: USEMETV_WALLKEY,
		menuLabel: 'Types of Travel',
		home: homePage,
		controls: [
			/*
			{
				label: 'Price',
				onClick: function() {
//                    alert('overview');
                    $('#detail-div').hide();
                    $('#specs-div').hide();
                    $('.product-details').fadeIn(duration);
                }
			},
			{
				label: 'Description',
				onClick: function() {
//                    alert('details');
                    $('.product-details').hide();
                    $('#detail-div').fadeIn(duration);
                    $('#specs-div').hide();
                }
			},
			{
				label: 'Technical Specs',
				onClick: function() {
//                    alert('tech specs');
                    $('.product-details').hide();
                    $('#detail-div').hide();
                    $('#specs-div').fadeIn(duration);
                }
			},
			{
				label: 'Beaches',
				onClick: '/ttsvr/n/ZOUSAZUB-7'
			},
			{
				label: 'Adventure',
				onClick: '/ttsvr/n/ZOUSAZUB-5'
			},
			{
				label: 'Sight Seeing',
				onClick: '/ttsvr/n/ZOUSAZUB-4'
			},
			{
				label: 'Casinos',
				onClick: '/ttsvr/n/ZOUSAZUB-6'
			},
			{
				label: 'Back',
				onClick: backPage
			},
            */
		],
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
    
//    for (var i = 0; i < data-ref="/ttsvr/n/ZOUSAZUB-7" data-label="Beaches 2"></div>

    // Add a back button
    config.controls.push({
        label: 'Back',
        onClick: backPage
    });
    
    Shywall.shywall(config);

});
