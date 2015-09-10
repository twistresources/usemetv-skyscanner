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


	// Register with Shywall
console.log('Server: ' + USEMETV_HOST + ':' + USEMETV_PORT);
console.log('Wall key: ' + USEMETV_WALLKEY);
	Shywall.shywall({
		wallKey: USEMETV_WALLKEY,
		menuLabel: 'Nutra Organics', // Should this come from the registration DB?
		disconnectRemotes: true,
		home: true,
		controls: [
		],
//		onRemoteConnect: 'http://dev3:38380/ttsvr/n/metrosix-webdesign-3',
//		onRemoteDisconnect: 'http://dev3:38380/ttsvr/n/metrosix-webdesign-2',
		onRemoteConnect: '/ttsvr/n/ZOUSAZUB-2',
		onRemoteDisconnect: '/ttsvr/n/ZOUSAZUB-1',
		qrcodeElement: 'usemetv-qrcode',
		qrcodeSize: 4,
        pinElement: 'usemetv-pin',
		shywallHost: USEMETV_HOST,
		shywallPort: USEMETV_PORT
	});
});
