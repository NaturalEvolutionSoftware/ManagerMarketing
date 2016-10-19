app.service('ConnectionManager', [ '$rootScope','$q' ,'messagesProvider', 'MessageManager', function($rootScope, $q,  messagesProvider, MessageManager) {

    var connectionHelper = {};

    /*
     * var invocationHelper = {}; function ConnectionManager() {
     * this.connectionStatus = false;
     * 
     * this.checkConnection = function() {
     * 
     * WL.Client.connect({ onSuccess : this.successConnection, onFailure :
     * this.errorConnection, timeout : 10000 }); };
     * 
     * this.successConnection = function(response) { connectionStatus = true; };
     * 
     * this.errorConnection = function(response) {
     * 
     * connectionStatus = false; }; };
     */

    /**
     * Accion para cerrar session
     */

    this.checkOnline = function(){
        var def = $q.defer();
        WL.Client.connect({
            onSuccess: function(){
                console.log("** User is online!");
                def.resolve(true);
            },
            onFailure: function(){
                console.log("** User is offline!");
                def.resolve(false);
            },
            timeout: 10000
        });
        return def.promise;
    };


    this.closeSession = function() {
        this.clearSession();
        connectionHelper.closeHelmSession();
        MessageManager.hideLoading();
        $rootScope.showTabMenu = true;
        location.hash = messagesProvider.loginPage;
        location.href;
    };

    /**
     * Borrado de datos de session
     */
    this.clearSession = function() {
        app.loggedUser = {};
        app.userDevice = {
                id : '',
                ipAddress : '127.0.0.1',
                model : '',
                os : '',
                osversion : ''
        };
        app.batchInCourse = {};
    };

    
    this.getNetworkInfo = function(networkInfoCallback) {
    	
    	if (typeof WL !== 'undefined' && WL && typeof WL.Device.getNetworkInfo !== 'undefined' && WL.Device.getNetworkInfo) {
    		WL.Device.getNetworkInfo(function (networkInfo) {
    			if (typeof networkInfo === 'undefined' || !networkInfo.hasOwnProperty('isNetworkConnected')) {
    				networkInfo.isNetworkConnected = 'true';
				}
    			networkInfoCallback(networkInfo);
    		});
		}
    	
    };
    
    /**
     * HU-21 Llamado al metodo de cerrado de sesion en el core de helm
     * 
     * @author glondono
     * @since 07/11/2014
     */
    connectionHelper.closeHelmSession = function() {
        var optionData = connectionHelper.getInvocationData(messagesProvider.procedureCloseHelmSession, null);
        connectionHelper.invokeAdaptherMethod(optionData, connectionHelper.closeHelmSessionSuccess, connectionHelper.closeHelmSessionError);
    };

    /**
     * Respuesta exitosa al llamado al metodo de cerrado de sesion en el core de
     * helm
     * 
     * @author glondono
     * @since 07/11/2014
     */
    connectionHelper.closeHelmSessionSuccess = function(response) {
        console.log('Helm session close success...');
        console.log(response);
        MessageManager.hideLoading();
    };

    /**
     * Respuesta de error al llamado al metodo de cerrado de sesion en el core
     * de helm
     * 
     * @author glondono
     * @since 07/11/2014
     */
    connectionHelper.closeHelmSessionError = function(response) {
        console.log('Helm session close error...');
        console.log(response);
        MessageManager.hideLoading();
    };

    connectionHelper.getInvocationData = function(procedureName, params) {

        var invocationData = {
                adapter : messagesProvider.adapterHelm,
                procedure : procedureName,
                parameters : params,
                compressResponse : true
        };

        return invocationData;
    };

    connectionHelper.invokeAdaptherMethod = function(invocationData, successFunction, errorFunction) {
        WL.Client.invokeProcedure(invocationData, {
            onSuccess : function(data) {
                connectionHelper.defaultSuccessCallback(data, successFunction);
            },
            onFailure : function(data) {
                connectionHelper.defaultErrorCallback(data, errorFunction);
            },
            timeout : messagesProvider.timeoutConnectionAdapter
        });
    };

    connectionHelper.defaultSuccessCallback = function(data, successCallback) {
        successCallback(data);
    };

    connectionHelper.defaultErrorCallback = function(error, errorCallback) {
        errorCallback(error);
    };

} ]);