/**
 * HU-58 Actualizar listados, solo cuando se hace un pago se deben actualizar los saldos
 * @author glondono
 * @since 21/01/2015
 */
app.service('ReloadServices', [ 'messagesProvider', function(messagesProvider) {
    
    var reloadServicesHelper = {};

    reloadServicesHelper.loadSaldos = true;
    reloadServicesHelper.productosSaldos = {};

    reloadServicesHelper.setLoadSaldos = function (value) {
        reloadServicesHelper.loadSaldos = value;  
    };

    reloadServicesHelper.getLoadSaldos = function (value) {
        return reloadServicesHelper.loadSaldos;  
    };
    
    reloadServicesHelper.getProductosSaldos = function() {
        return reloadServicesHelper.productosSaldos;
    };
    
    reloadServicesHelper.setProductosSaldos = function(value) {
        reloadServicesHelper.productosSaldos = value;
    };
    
    reloadServicesHelper.clearAll = function(){
    	reloadServicesHelper.loadSaldos = true;
    	reloadServicesHelper.productosSaldos = {};
    };
    
    
    return reloadServicesHelper;

} ]);