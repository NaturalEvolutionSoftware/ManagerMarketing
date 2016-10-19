app.directive('addClassLogin', ['$timeout' ,function($timeout) {
	return {
		restrict: 'A',
		link: function addClassLogin(scope, element, attrs) {
				element.addClass('displayLoginContent');
				$timeout(function() {
					element.removeClass('displayLoginContent');
					element.addClass('hideLoginContent');
					scope.$apply();
				}, 250);
			}
		};
}]);