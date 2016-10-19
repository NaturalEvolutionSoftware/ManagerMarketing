app.service('BatchDetailProvider', ['$rootScope', 'MessageManager', 'messagesProvider', 'invocationManager', 'activityManager', 'errorManager',
                                   function($rootScope, MessageManager, messagesProvider, invocationManager, activityManager, errorManager) {
	var vm = this;
	
	function successGetBatch(response) {
        var respuesta = {};
        if (response.invocationResult.error == null) {
            respuesta = response.invocationResult;

            /**
             * HU-80 Ver lote por aprobar
             */
            if (respuesta.batchs.closedCycleMark == true) {
                $rootScope.cycleMark = messagesProvider.si;
            } else {
                $rootScope.cycleMark = messagesProvider.no;
            }
            $rootScope.batchs = angular.copy(respuesta.batchs);
            
            /**
             * HU-78 Ver lote por aprobar - Validar funcionamiento según
             * criterios de aceptación
             */
            $rootScope.appModel.batch.batchInCourse = $rootScope.batchs;
            if (typeof $rootScope.batchs.warnMessage !== "undefined") {
                $rootScope.hasPenalty = true;
            }
            $rootScope.$apply();
            location.hash = messagesProvider.batchDetailPage + $rootScope.paramDepCode + '/' + $rootScope.paramId;
            MessageManager.hideLoading();
        } else if(response.invocationResult.error.errorId === messagesProvider.errorNoSession){
        	activityManager.closeSession();
        } else {
            var toUrl = messagesProvider.lotesPage;
            var fromUrl = messagesProvider.lotesPage;
            var errorCode = response.invocationResult.error.errorId;
            var errorMessage = response.invocationResult.error.errorMessage;
            MessageManager.hideLoading();
            errorManager.sendError(errorCode, fromUrl, toUrl, errorMessage);
        }

    }
	
	function errorGetBatch(response) {
        MessageManager.hideLoading();
        var errorCode = response.errorCode;
        var fromUrl = messagesProvider.lotesPage;
        var toUrl = messagesProvider.lotesPage;
        errorManager.sendError(errorCode, fromUrl, toUrl, null);
    };
	
	vm.getBatchDetail = function(depCode, batchId) {
		var parametros = [],
			options;

		$rootScope.paramId = batchId;
		$rootScope.paramDepCode = depCode,
        	
        
		MessageManager.showLoading();
        
        parametros.push(String($rootScope.paramDepCode));
        parametros.push(String($rootScope.paramId));

        $rootScope.ipUserAddress = app.userDevice.ipAddress;
        
        options = invocationManager.getInvocationData(messagesProvider.procedureGetSingleBatch, parametros);
        invocationManager.invokeAdaptherMethod(options, successGetBatch, errorGetBatch);
    };
	
}]);