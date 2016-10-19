app.service('ConfirmPayProvider', ['$rootScope', 'MessageManager', 'ReloadServices', 'messagesProvider', 'errorManager', 'activityManager', 'invocationManager',
                                  function($rootScope, MessageManager, ReloadServices, messagesProvider, errorManager, activityManager, invocationManager) {
	var vm = this;
	
	function successGetAproveReject(response) {
        var respuesta = response.invocationResult;
        $rootScope.aceptarClicked = true;
        if (respuesta.error === null) {
            MessageManager.hideLoading();
            $rootScope.confirmBatchs = $rootScope.appModel.batch.batchInCourse;
            $rootScope.confirmBatchs.transactionDate = respuesta.batchs.transactionDate;
            $rootScope.confirmBatchs.batchState = respuesta.batchs.batchState;
            $rootScope.confirmBatchs.appliedSignatures = respuesta.batchs.appliedSignatures;
            $rootScope.aceptarClicked = false;
            ReloadServices.setLoadSaldos(true);
            $rootScope.$apply();
        	location.hash = messagesProvider.payConfirmPage;
        	location.href;
        } else if(response.invocationResult.error.errorId === messagesProvider.errorNoSession){
        	activityManager.closeSession();
        } else {
        	MessageManager.hideLoading();
            var toUrl = messagesProvider.lotesPage;
            var fromUrl = messagesProvider.lotesPage;
            var errorCode = response.invocationResult.error.errorId;
            var errorMessage = response.invocationResult.error.errorMessage;
            $rootScope.aceptarClicked = false;
            errorManager.sendError(errorCode, fromUrl, toUrl, errorMessage);
        }
    };
    
    function errorGetAproveReject(response) {
    	MessageManager.hideLoading();
        var errorCode = response.errorCode;
        var fromUrl = messagesProvider.lotesPage;
        var toUrl = messagesProvider.lotesPage;
        errorManager.sendError(errorCode, fromUrl, toUrl, null);
    };

    
    vm.requestPayOrRejectBatch = function() {
        var parametros = [];
        $rootScope.aceptarClicked = true;
        parametros.push($rootScope.appModel.batch.batchInCourse.depCode);
        parametros.push(String($rootScope.appModel.batch.batchInCourse.batchId));
        parametros.push(String($rootScope.appModel.batch.approveOrRejectBatch));

        var options = invocationManager.getInvocationData(messagesProvider.getAproveRejectBatchById, parametros);
        invocationManager.invokeAdaptherMethod(options, successGetAproveReject, errorGetAproveReject);
    };
	
}]);