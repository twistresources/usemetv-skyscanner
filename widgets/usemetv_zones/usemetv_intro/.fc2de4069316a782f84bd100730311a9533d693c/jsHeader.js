// Initialize the UseMe display
$(document).ready(function() {

	// Register with Shywall
console.log('Server: ' + USEMETV_HOST + ':' + USEMETV_PORT);
	Shywall.shywall({
		wallKey: '12345',
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
