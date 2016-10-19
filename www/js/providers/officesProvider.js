app.service('officesProvider', function() {
	
	
	var offices = {},
		comeToListOffices = false,
		parametersFilterOffices = null,
		citiesAndAreas = null;
	
		
	this.setCitiesAndAreas = function(citiesAreas) {
		citiesAndAreas = citiesAreas;
	};
	
	this.getCitiesAndAreas = function() {
		return citiesAndAreas;
	};
		
	/**
	 * Para compartir las oficinas entre sucursales y la lista
	 */	
	this.setOffices = function(eOffices) {
		offices = eOffices;
	};
	
	this.getOffices = function() {
		return offices;
	};
	
	/**
	 * Para mostrar las tabs y la vista de filtro cuando regreso de la lista
	 */
	
	this.setShowTabandFilter = function(listOffice) {
		comeToListOffices = listOffice;
	};
	
	this.getShowTabandFilter = function() {
		return comeToListOffices;
	};
	
	/**
	 * se guardan los parametros del formulario del filtro de oficina
	 */
	this.setParametersFilterOffice = function(parameters) {
		parametersFilterOffices = parameters;
	};
	
	this.getParametersFilterOffice = function() {
		return parametersFilterOffices;
	};
});