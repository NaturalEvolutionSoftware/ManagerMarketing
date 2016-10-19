app.service('DeviceManager', [ 'messagesProvider', function(messagesProvider) {

    this.setDeviceInfo = function() {
        this.getDeviceID();
        this.getIPAddress();
        this.getDeviceModel();
        this.getDeviceOS();
        this.getDeviceVersion();
    };

    /**
     * 
     * 
     */

    this.getDeviceID = function() {
        var string = 'No device';
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
            string = deviceID;
            app.userDevice.id = string;
        } else {
            this.getDeviceIdError();
        }

    };

    this.getIPAddress = function() {
        var ip = '127.0.0.1';
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
            WL.Device.getNetworkInfo(function(networkInfo) {
                app.userDevice.ipAddress = networkInfo.ipAddress;
                ip = networkInfo.ipAddress;
            });
        }
        return ip;
    };

    this.getDeviceIdSuccess = function(data) {
        var string = 'No device';
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
            string = deviceID;
        }
        app.userDevice.id = string;
    };

    this.getDeviceIdError = function(data) {
        app.userDevice.id = 'No device';
    };

    this.getDeviceModel = function() {
        var string = 'No device';
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
            string = device.model;
        }
        app.userDevice.model = string;
    };

    this.getDeviceOS = function() {
        var string = 'No device';
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
            string = device.platform;
        }
        app.userDevice.os = string;
    };

    this.getDeviceVersion = function() {
        var string = 'No device';
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
            string = device.version;
        }
        app.userDevice.osversion = string;
    };

    this.getDeviceInfo = function() {
        var deviceInfo;
        this.setDeviceInfo();
        deviceInfo = 'deviceId=' + app.userDevice.id + '||ipAddress=' + app.userDevice.ipAddress + '||deviceModel=' + app.userDevice.model + '||os=' + app.userDevice.os
        + '||osVersion=' + app.userDevice.osversion;
        return deviceInfo;
    };

} ]);
