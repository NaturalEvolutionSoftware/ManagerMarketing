function modalForm($ionicModal, $scope, url) {

    this.submitted = false;
    this.val = {};
    var that = this;
    this.open = openM;
    this.close = closeM;
    this.data = {};

    $ionicModal.fromTemplateUrl(url, function (modal) {
        that.modal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    function openM() {
        that.modal.show();
    };
    
    function closeM() {
        that.modal.hide();
        that.val = {};
        that.submitted = false;
    };
}