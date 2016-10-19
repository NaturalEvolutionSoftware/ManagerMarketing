/**
 * Provider para centralizar el manejo de los spin para indicar procesamiento
 * 
 */
app.factory('busyIndicator', function() {
	var busyIndicator = new WL.BusyIndicator('content');
	return busyIndicator;
});