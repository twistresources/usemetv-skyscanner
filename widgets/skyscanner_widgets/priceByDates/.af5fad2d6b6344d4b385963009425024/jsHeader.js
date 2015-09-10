var PricesByDate = (function() {
    
    // variables
    var BAR_WIDTH = 20;
    
    // In Singapore
    /*
    var market = 'SG';
    var currency = 'SGD';
    var locale = 'en-GB';
    var originPlace = 'SIN';
    */

    // In the office
    var market = 'PH';
    var currency = 'USD';
    var locale = 'en-GB';
    var originPlace = 'MNL';

    
    //    var destinationPlace = 'SYD';
    var outboundPartialDate = '2015-07';
    var inboundPartialDate = '2015-07';
    var apiKey = 'us946858489256834188944854188586';
    


  // object
  return {
    init: function() {
      //alert("init()");
    },
      
	setDestination: function(destinationPlace, description) {
        
        // Show the image (if there is one)
        $('.usemetv-destination').fadeOut(2000);
        
        var selector = '.usemetv-destination[data-airportCode="' + destinationPlace + '"]';
        //alert('selector is ' + selector)
        $(selector).fadeIn(2000); 
        
        $('#skyscanner-flight-label').html(description)

    //        var URL = 'http://partners.api.skyscanner.net/apiservices/browsedates/v1.0'
        var URL = '/apiservices/browsedates/v1.0'
            + '/' + market
            + '/' + currency
            + '/' + locale
            + '/' + originPlace
            + '/' + destinationPlace
            + '/' + outboundPartialDate
            + '/' + inboundPartialDate
            + '?apiKey=' + apiKey;

        $.ajax({ // ajax call starts
          url: URL,
    //      data: 'button=' + $(this).val(), // Send value of the clicked button
    //            dataType: 'json',
            contentType: "application/json; charset=utf-8",
    //            crossDomain: true,
            dataType: 'json',
            success: function(data){
    //                console.log('\n\n\nall good', data)
                var thisMonthOutbound = PricesByDate.preparePrices(data.Dates.OutboundDates);
                var thisMonthInbound = PricesByDate.preparePrices(data.Dates.InboundDates);

                // Find the maximum price
                var maxPrice = 100;
                var inboundMinPrice = 999999;
                var outboundMinPrice = 999999;
                $.each(thisMonthOutbound, function(index, price){
                    if (price && price > maxPrice) maxPrice = price;
                    if (price && price < outboundMinPrice) outboundMinPrice = price;
                });
                $.each(thisMonthInbound, function(index, price){
                    if (price && price > maxPrice) maxPrice = price;
                    if (price && price < inboundMinPrice) inboundMinPrice = price;
                });
    //alert('inboundMinPrice=' + inboundMinPrice);
    //inboundMinPrice = 270;
                maxPrice *= 1.3;
    //                alert('Maximum price is ' + maxPrice)
                PricesByDate.displayGraph('#skyscanner-outbound-graph', 'skyscanner-out', thisMonthOutbound, thisMonthOutbound, outboundMinPrice);                                        
                PricesByDate.animateBars('#skyscanner-outbound-graph', 'skyscanner-out', thisMonthOutbound, thisMonthOutbound, maxPrice, 1);

                PricesByDate.displayGraph('#skyscanner-inbound-graph',  'skyscanner-in', thisMonthInbound, thisMonthInbound, inboundMinPrice);
                PricesByDate.animateBars('#skyscanner-inbound-graph',  'skyscanner-in', thisMonthInbound, thisMonthInbound, maxPrice, 1);

                PricesByDate.addLabels('#skyscanner-outbound-graph', maxPrice);
                PricesByDate.addLabels('#skyscanner-inbound-graph', maxPrice);

                PricesByDate.addMinimum('#skyscanner-outbound-graph', outboundMinPrice, maxPrice);
                PricesByDate.addMinimum('#skyscanner-inbound-graph', inboundMinPrice, maxPrice);
                
                // Set the labels
                var destLabel = PricesByDate.airportName(data, destinationPlace) + ' (' + destinationPlace + ')';
                var originLabel = PricesByDate.airportName(data, originPlace) + ' (' + originPlace + ')';
                var label = originLabel + ' to <span class="highlight">' + destLabel + '</span>';
                $('#skyscanner-outbound-label').html(label);
                var label = '<span class="highlight">' + destLabel + '</span> to ' + originLabel;
                $('#skyscanner-inbound-label').html(label);
            },
            error: function(e1, e2, e3){
                //alert('Broken');
                console.log('error:', e1, e2, e3)
            }
        });
        
//        .done(function(data) {
//            alert('all good');
//            console.log('reply is ', data)
//        });
//        //        
    },

     

    /**
     * Convert prices over a range of dates into an array.
     * This 'priceData' is one the series returned by the
     * SkyScanner browsedates/v1.0 API.
     * 
     * 		data.Dates.OutboundDates
     * 		data.Dates.InboundDates 
     */
    preparePrices: function(priceData) {
        var prices = [ ];
        
        for (var i = 0; i < priceData.length; i++) {
            var d = priceData[i];
            
            var partialDate = d.PartialDate;
            var price = d.Price;
//            console.log('On ' + partialDate + ' the price is ' + price)
            try {
                var day = partialDate.substring(8);
//                console.log('day is ' + day)
                var dy = parseInt(day);
//                console.log('And dy is ' + dy + ', ' + typeof(dy))
                prices[dy] = price;
            } catch (e) { /* do nothing */ }
        }
        /*
        for (var i = 0; i < 31; i++) {
            var price = prices[i];
            
            if (price) {
                console.log('-- ' + i + ': ' + price)
            } else {

                console.log('-- ' + i + ': unknown');          
            }
        }
        */
        return prices;
    },

    
    /**
     * Display a graph of prices for the next 30 days.
     * Parameters are a selector for where to place the content, and
     * an array of prices for the current and the next calendar month.
     */
    displayGraph: function(selector, prefix, thisMonth, nextMonth, minPrice){
        
        var $div = $(selector);
        
        html = '';
        for (var i = 1; i <= 28; i++) {
            
            var id = prefix + i;
            var left = (i * BAR_WIDTH) - (BAR_WIDTH + 2);
            var price = thisMonth[i];
            html += '<div class="skyscanner-outerBar">';
            if (price) {
                extraClass = (price == minPrice) ? 'skyscanner-lowest' : '';
				html += '<div id="'+id+'" class="skyscanner-bar ' + extraClass + '">' + price + '</div>';
            } else {
				html += '<div id="'+id+'" class="skyscanner-bar-na"></div>';
            }
            html += '<div class="skyscanner-dateLabel">' + i + '</div>';
            html += '</div>';
        }
//console.log('html=' + html);
        $div.html(html);        
    },

    animateBars: function(selector, prefix, thisMonth, nextMonth, maxPrice, index) {
        
        if (index >= 31)
            return;
        var chartHeight = $(selector).height();
        var id = prefix + index;

        // Start the animations
        var price = thisMonth[index];
        if (price) {
            var height = chartHeight * (price / maxPrice);

        } else {
            var height = 15;
        }
        $('#'+id).animate({ height: height}, 1800);
    
    	// Wait a bit, then animate the next bar
        setTimeout(function(){
            PricesByDate.animateBars(selector, prefix, thisMonth, nextMonth, maxPrice, index + 1);
        }, 100);                
    },
      
    
    addLabels: function(selector, maxPrice) {
//        alert('addLabels')
		$chartDiv = $(selector);
        var chartHeight = $chartDiv.height();
//        $chartDiv.html('')
//        $chartDiv.prepend($('<div>HERE IS MY STUFF</div>'));
//        $chartDiv.html('yarp')
//        return;

        var interval;
        if (maxPrice < 300)
            interval = 50;
        else if (maxPrice < 600)
            interval = 100;
        else if (maxPrice < 1200)
            interval = 200;
        else if (maxPrice < 3000)
            interval = 500;
        else if (maxPrice < 6000)
            interval = 1000;
        else if (maxPrice < 12000)
            interval = 2000;
        else if (maxPrice < 3000)
            interval = 5000;
        else if (maxPrice < 60000)
            interval = 10000;
        else if (maxPrice < 120000)
            interval = 20000;
        else if (maxPrice < 300000)
            interval = 50000;
        
        for (var i = interval; i < maxPrice; i += interval) {
            var top = chartHeight - (chartHeight * (i / maxPrice));
//console.log('\nadd label at ' + top)            
            var $div = $('<div class="skyscanner-yaxis" style="top:'+top+'px;"><span>$' + i + '</span></div>');
            $chartDiv.prepend($div);
        }        
    },

    addMinimum: function(selector, minPrice, maxPrice) {
        setTimeout(function(){
            var html = ''
            html += '<div class="skyscanner-minPrice-bar" style="top:0px;">';
            html += '<span>$' + minPrice + '</span></div>';
            var $div = $(html);
            
            $chartDiv = $(selector);
            var chartHeight = $chartDiv.height();
            var chartWidth = $chartDiv.width();
            $div.css('width', chartWidth + 50)
            $chartDiv.prepend($div);

            var top = chartHeight - (chartHeight * (minPrice / maxPrice)) - 1;
	        $div.animate({ top: top }, 2000)
        }, 4000)
        
    },
      
    airportName: function(data, airportCode) {
        for (var i = 0; i < data.Places.length; i++){
//console.log(airportCode, data.Places[i]);
            if (data.Places[i].IataCode == airportCode)
                return data.Places[i].CityName;
        }
        return airportCode;
    },

    //--------
    nocomma: null
  };
}());

// Init after the page has loaded
jQuery(PricesByDate.init);





    
    
    function rotateBody() {
        var $body = $('body');
        $body.toggleClass('rotate-body');
    }
