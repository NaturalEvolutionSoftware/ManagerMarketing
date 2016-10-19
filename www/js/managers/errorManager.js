/**
 * Encargado del control de errores
 * 
 * @author glondono
 * @since 28/10/2014
 */
app.service('errorManager', [ 'messagesProvider', 'NavigationManager', function(messagesProvider, NavigationManager) {
    // Un dato es valido cuanto esta definido es diferente de null o no es una
    // cadena en blanco

    this.errorAplication = {
            code : '',
            title : '',
            message : '',
            href : ''
    };
    /**
     * Validación que hace parte del esquema de manejo de excepciones a nivel de
     * front.
     * 
     * @author glondono
     * @param value
     * @returns {Boolean}
     */
    this.checkValue = function(value) {
        if (value !== undefined && typeof value !== "undefined" && value !== null && value !== "") {
            return true;
        }
        return false;
    };
    this.sendError = function(errorCode, fromUrl, toUrl, message) {

        this.actionError(errorCode, fromUrl, toUrl, message);
        if (/private/.test(fromUrl)) {
            NavigationManager.goTo(messagesProvider.errorPrivatePage);
        } else {
            NavigationManager.goTo(messagesProvider.errorPage);
        }
    };

    this.actionError = function(errorCode, fromUrl, toUrl, message) {
        switch (errorCode) {
        /* Error de conexion, fallo en el adpatador */
        case messagesProvider.errorProcedimientoAdpater:
            this.errorAplication = {
                code : messagesProvider.errorCodeConnectionAdapter,
                title : messagesProvider.connectionError,
                message : messagesProvider.connectionServerErrorMessage,
                href : toUrl
        };
            break;
            /* Error de conexion, El dispositivo no posee internet */
        case messagesProvider.errorNoInternet:
            this.errorAplication = {
                code : messagesProvider.errorCodeConnectionAdapter,
                title : messagesProvider.connectionError,
                message : messagesProvider.connectionErrorMessage,
                href : toUrl
        };
            break;
            /*
             * Error de conexion inesperado, desde el dispositivo no se llega hasta
             * el adaptador
             */
        case messagesProvider.errorUnexpected:
            this.errorAplication = {
                code : messagesProvider.errorCodeUnexpected,
                title : messagesProvider.connectionError,
                message : messagesProvider.unexpectedErrorMessage,
                href : toUrl
        };
            break;
            /*
             * Error de timeout de conexion con el servidor worklight, desde el
             * dispositivo no se llega hasta el adaptador
             */
        case messagesProvider.errorRequestTimeout:
            this.errorAplication = {
                code : messagesProvider.errorRequestTimeoutCode,
                title : messagesProvider.connectionError,
                message : messagesProvider.errorRequestTimeoutMessage,
                href : toUrl
        };
            break;
            /*
             * Error de validacion del token caracteres especiales o cantidad de
             * caracteres
             */
        case messagesProvider.errorTokenFieldCode:
            this.errorAplication = {
                code : messagesProvider.errorTokenFieldCode,
                title : messagesProvider.errorTokenTitle,
                message : messagesProvider.errorTokenFieldMessage,
                href : fromUrl
        };
            break;

            /**
             * HU-60 Validación de token Error de validacion del token: Token
             * invalido
             */
        case messagesProvider.errorTokenInvalidCode:
            this.errorAplication = {
                code : messagesProvider.errorTokenInvalidCode,
                title : messagesProvider.errorTokenInvalidTitle,
                message : messagesProvider.errorTokenInvalidMessage,
                href : toUrl
        };
            break;
            /* Error de validacion del token: Token invalido */
        case messagesProvider.errorBatchDetailCode:
            this.errorAplication = {
                code : messagesProvider.errorBatchDetailCode,
                title : messagesProvider.errorBatchDetailTitle,
                message : message,
                href : toUrl
        };
            break;

        case messagesProvider.errorLoginCode:
            this.errorAplication = {
                code : messagesProvider.errorLoginCode,
                title : messagesProvider.errorLoginTitle,
                message : message,
                href: messagesProvider.loginPage
        };
            break;

            /* Error de validacion de lote no existente */
        case messagesProvider.errorBatchDetailNotExist:
            this.errorAplication = {
                code : errorCode,
                title : messagesProvider.errorBatchDetailTitle,
                href : messagesProvider.lotesPage
        };
            break;

        default:
            this.errorAplication = {
                code : errorCode,
                title : messagesProvider.errorGeneralTitle,
                message : messagesProvider.errorGeneral,
                href : fromUrl
        };
        break;
        }
        if (message) {
            this.errorAplication.message = message;
        }
    };

} ]);