
(function() {
      angular.element(document).ready(function() {
        angular.bootstrap(document, [ 'App' ]);
        location.hash = "login";
    });

    //getDevice();
})();

function getDevice() {
    var addMeta = document.createElement('meta');
    addMeta.setAttribute('name', 'viewport');
    if (WL.StaticAppProps.ENVIRONMENT.match(/(iphone)/)) {
        addMeta.setAttribute('content', 'width=device-width,height=device-height , initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0, target-densityDpi=device-dpi');
    } else {
        addMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0');
    }
    document.getElementsByTagName('head')[0].appendChild(addMeta);
};
