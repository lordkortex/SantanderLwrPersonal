({
	onCallApex : function(component, event, helper) {
        //get the method parameters
        var params = event.getParams().arguments;
        var callerComponent = params.component;
        var controllerMethod = params.controllerMethod;
        var actionParameters = params.actionParameters;
        var successCallback = params.successCallback;
        helper.callApex(callerComponent,controllerMethod, actionParameters, successCallback);
        },
        
        onCallApex2 : function(component, event, helper) {
                //get the method parameters
                var params = event.getParams().arguments;
                var callerComponent = params.component;
                var callerHelper = params.helper;
                var controllerMethod = params.controllerMethod;
                var actionParameters = params.actionParameters;
                var successCallback = params.successCallback;
                helper.callApex2(callerComponent, callerHelper,controllerMethod, actionParameters, successCallback);
        },


        redirect : function(component, event, helper) {
                
                var params = event.getParams().arguments;
                var page = params.page;
                var urlParams = params.urlParams;
                helper.handleRedirection(component, helper, page, urlParams);
        },

        dataDecryption : function(component, event, helper) {
                
                var params = event.getParams().arguments;
                var callerComponent = params.component;
                var callerHelper = params.helper;
                var controllerMethod = params.controllerMethod;

                var dataURI = params.dataURI;
                helper.handleDecrypt(component, helper, callerComponent, callerHelper, dataURI, controllerMethod);
        },

        /*
        Author:         Guillermo Giral
        Company:        Deloitte
        Description:    Method to encrypt data and save it to the cache
        History
        <Date>		<Author>	    <Description>
        03/06/2020	Guillermo Giral     Initial version
        */
        saveToCache : function(component, event, helper) {
                
                let params = event.getParams().arguments;
                let key = params.key;
                let data = params.data;

                helper.handleSaveToCache(component, helper, key, data);
        },

        /*
        Author:         Guillermo Giral
        Company:        Deloitte
        Description:    Method to encrypt data and save it to the cache
        History
        <Date>		<Author>	    <Description>
        03/06/2020	Guillermo Giral     Initial version
        */
        retrieveFromCache : function(component, event, helper) {
                
                let params = event.getParams().arguments;
                let key = params.key;
                let callerComponent = params.component;
                var callerHelper = params.helper;
                let successCallback = params.successCallback;

                helper.handleRetrieveFromCache(component, callerHelper, callerComponent, key, successCallback);
        }
})