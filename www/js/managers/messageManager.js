/**
 * HU-56 Bloqueo de doble solicitud - Se debe presentar feedback al usuario de
 * que se está realizando una accion.
 * 
 * @author glondono
 * @since 02/12/2014
 */
app.service('MessageManager', [ 'messagesProvider', 'busyIndicator', function(messagesProvider, busyIndicator) {

    var messageHelper = {};

    /**
     * Muestra el mensaje que se envia como parametro
     * 
     * @param String
     *                mensaje
     */
    this.showMessage = function(message) {
        if (busyIndicator.isVisible()) {
            busyIndicator.hide();
        }
        WL.SimpleDialog.show(messagesProvider.titleApp, message, [ {
            text : messagesProvider.ok
        } ])
    };

    /**
     * Muestra el mensaje de cargando al usuario
     */
    this.showLoading = function() {
        if (!busyIndicator.isVisible()) {
            busyIndicator = new WL.BusyIndicator('content', {
                text : messagesProvider.loading,
                fullScreen : true
            });
            busyIndicator.show();
        }
    };

    /**
     * Esconde el mensaje de cargando al usuario
     */
    this.hideLoading = function() {
        if (busyIndicator.isVisible()) {
            busyIndicator.hide();
        }
    };
} ]);