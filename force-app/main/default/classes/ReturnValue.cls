global with sharing class ReturnValue {

    @AuraEnabled
    global Boolean success {get;set;}

    @AuraEnabled
    global String msg {get;set;}

    @AuraEnabled
    global Map<String, Object> value {get;set;}

    global ReturnValue (Boolean success) {
        this.success = success;
        this.msg = '';
        this.value = new Map<String, Object>();
    }

    global ReturnValue (Boolean success, String msg) {
        this(success, msg, new Map<String, Object>());
    }

    global ReturnValue (Boolean success, Map<String, Object> value) {
        this(success, value, '');
    }

    global ReturnValue (Boolean success, String msg, Map<String, Object> value) {
        this.success = success;
        this.msg = msg;
        this.value = value;
    }
    global ReturnValue (Boolean success, Map<String, Object> value, String msg) {
        this.success = success;
        this.value = value;
        this.msg = msg;
    }
}