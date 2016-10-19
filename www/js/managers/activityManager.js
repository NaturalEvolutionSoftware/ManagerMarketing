/**
 * HU-19 cerrar sesion por inactividad HU-20 Cierre de sesion parametrizado
 * 
 * @author hernan.giraldo
 * @since 14/08/2015
 */

app.service('activityManager', [ 'messagesProvider', 'ConnectionManager', 'MessageManager', 'userState', '$rootScope',
	function(messagesProvider, ConnectionManager, MessageManager, userState, $rootScope) {
		
		var ms = this;
	
	    document.getElementById('appContainer').onclick = function() {
	    	var paginaActual = location.hash;
	    	if (/private/.test(paginaActual)) {
	    		$rootScope.logout.inactivityTime = new Date().addSeconds(messagesProvider.idleTime);
			}
	    };
	    
	   this.startInterval = function() {
		   timer = setInterval(function() {
				var paginaActual = location.hash;
				if (/private/.test(paginaActual)) {
					var date = new Date();
					if($rootScope.logout.inactivityTime <= date || $rootScope.logout.maxTime <= date) {
						if($rootScope.logout.session) {
							$rootScope.logout.session = false;
							ms.closeSession();
						}
					}
				}
		    }, 10000);
	   }
	   
	    
	   this.closeSession = function() {
	    	userState.logoutCore().then(function(){
	    		ms.clearIntervalTimeOut();
	    		MessageManager.showMessage(messagesProvider.closeSessionMessage);
	    		
	    		$rootScope.logout = {};
				
				$rootScope.showTabMenu = true
				
				location.hash = messagesProvider.loginPage;
				location.href;
				MessageManager.hideLoading();
			});
	    }
	   
	   this.clearIntervalTimeOut = function() {
		   clearInterval(timer);
	   }
	    
	    Date.prototype.addSeconds = function(seconds){
	        this.setSeconds(this.getSeconds() + seconds);
	        return this;
	    }
	}]);
