/**
 * Directiva que inyecta el tap to refresh en las paginas donde se invoque
 */

app.directive('tapToRefresh', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/transversal/directiveTapToRefresh.html',
		link: function(scope, elem, attr) {
			angular.element(elem.css('height','100%'));
			elem.bind('click', function() {
				var divNoInternet = document.getElementsByClassName('imgContentNoInternet'),
					idDirective = parseInt(attr.pos);
		    	divNoInternet[idDirective].style.backgroundImage = 'url("images/error/errorLoadActive.png")';
		    	setTimeout(function() {
		    		divNoInternet[idDirective].style.backgroundImage = 'url("images/error/errorLoad.png")';
		    	}, 200);
			});
			scope.topRefresh = attr.paddingtop;
		}
	};
});