
app.factory('invocationManager', ['DeviceManager', 'messagesProvider', function invocationManager(DeviceManager, messagesProvider){
    var invocationHelper = {};

    invocationHelper.invokeAdaptherMethod = function (invocationData, successFunction, errorFunction) {
        WL.Client.invokeProcedure(invocationData, {
            onSuccess : function (data) {
                invocationHelper.defaultSuccessCallback(data, successFunction);
            },
            onFailure : function (data) {
                invocationHelper.defaultErrorCallback(data, errorFunction);
            },
            timeout : messagesProvider.timeoutConnectionAdapter,
            onConnectionFailure : function (data) {
                invocationHelper.connectionErrorCallback(data, errorFunction);
            }
        });
    };

    invocationHelper.defaultSuccessCallback = function (data, successCallback){
        successCallback(data);
    };

    invocationHelper.defaultErrorCallback = function (error, errorCallback){
        errorCallback(error);
    };
    
    invocationHelper.connectionErrorCallback = function (data, errorCallback){
        errorCallback(data);
    };

    invocationHelper.getInvocationData = function (procedureName, params) {

        var invocationData = {},
        deviceInfo = '';

        //Default value for params when passing null
        params = params || [];

        //Adding device info to every HTTP call.
        deviceInfo = String(DeviceManager.getDeviceInfo());
        params.push(deviceInfo);

        invocationData = {
                adapter : messagesProvider.adapterHelm,
                procedure : procedureName,
                parameters : params,
                compressResponse : true
        };

        return invocationData;
    };

    return invocationHelper;
}]);