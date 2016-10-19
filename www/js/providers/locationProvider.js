/**
 * 
 */
app.factory('locationProvider', ['geolocation', function (geolocation){
	this.geolocationOptions = { enableHighAccuracy : true,
			timeout : 20000 }; //Timeout por defecto. Se debe actualizar con el parametrizado.
	
	this.setGeolocationTimeout = function(timeout) {
		this.geolocationOptions.timeout = timeout;
	};
	
	this.enableHighAccuracy = function(enableHighAccuracy) {
		this.geolocationOptions.enableHighAccuracy = enableHighAccuracy;
	};
	
	this.acquirePosition = function(onLocationSuccessCallback, onLocationErrorCallback){
		
		if (typeof WL.Device.Geo !== 'undefined' && WL.Device.Geo) {
			navigator.geolocation.getCurrentPosition(onLocationSuccessCallback, onLocationErrorCallback, this.geolocationOptions);
		} else {
			geolocation.getLocation().then(function(position){
				onLocationSuccessCallback(position);
			});
			
			// TODO hay que mirar como se llama el callback de error en este caso.
//			$scope.$on('error', function(errorCode){
//				var error = {errorCode: errorCode};
//				onLocationErrorCallback(error);
//			});
		}
		
	};
	
	return this;
}]);