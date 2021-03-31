import { LightningElement, api, wire} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import encryptData from '@salesforce/apex/Global_Utilities.encryptData';
import decryptData from '@salesforce/apex/Global_Utilities.decryptData';

export default class cmpServiceComponent extends NavigationMixin(LightningElement) {

    url;

    @wire(encryptData) encrypt;
    @wire(decryptData) decrypt;

	@api
    callApex () {
        //get the method parameters
        var params = event.getParams().arguments;
        var callerComponent = params.component;
        var controllerMethod = params.controllerMethod;
        var actionParameters = params.actionParameters;
        var successCallback = params.successCallback;

        this.callApexhelper(callerComponent,controllerMethod, actionParameters, successCallback);
        }

        
    @api
    callApex2 () {
        //get the method parameters
        var params = event.getParams().arguments;
        var callerComponent = params.component;
        var callerHelper = params.helper;
        var controllerMethod = params.controllerMethod;
        var actionParameters = params.actionParameters;
        var successCallback = params.successCallback;

        this.callApex2helper(callerComponent, callerHelper,controllerMethod, actionParameters, successCallback);
    }



    @api
    redirect () {
        var params = event.getParams().arguments;
        var page = params.page;
        var urlParams = params.urlParams;

        this.handleRedirectionhelper(page, urlParams);
    }


    @api
    decryption () {
        var params = event.getParams().arguments;
        var callerComponent = params.component;
        var callerHelper = params.helper;
        var controllerMethod = params.controllerMethod;
        var dataURI = params.dataURI;

        this.handleDecrypthelper(callerComponent, callerHelper, dataURI, controllerMethod);
    }

    @api
    saveToCache () {
        let params = event.getParams().arguments;
        let key = params.key;
        let data = params.data;

        this.handleSaveToCachehelper(key, data);
    }

    @api
    retrieveFromCache () {
        let params = event.getParams().arguments;
        let key = params.key;
        let callerComponent = params.component;
        var callerHelper = params.helper;
        let successCallback = params.successCallback;

        this.handleRetrieveFromCachehelper(callerHelper, callerComponent, key, successCallback);
    }


    callApexhelper(controllerMethod, actionParameters, successCallback) {
        // create a one-time use instance of the serverEcho action
        // in the server-side controller
        var action = controllerMethod;
        action.setParams(actionParameters);

        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, (response) =>{
            var state = response.getState();
            if (state === "SUCCESS") {
                //->HERE WE CALL THE CALLBACK RATHER PROCESS THE RESPONSE
                successCallback( response.getReturnValue());
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                    successCallback('ERROR');
                }
        });

        // optionally set storable, abortable, background flag here
        // A client-side action could cause multiple events, 
        // which could trigger other events and 
        // other server-side action calls.

        // $A.enqueueAction adds the server-side action to the queue.
        this.enqueueAction(action);
    }


    callApex2helper(controllerMethod, actionParameters, successCallback) {
        // create a one-time use instance of the serverEcho action
        // in the server-side controller
        var action = controllerMethod;
        action.setParams(actionParameters);            
        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, (response) =>{
            var state = response.getState();
            if (state === "SUCCESS") {
                //->HERE WE CALL THE CALLBACK RATHER PROCESS THE RESPONSE
                successCallback( response.getReturnValue());
            }
            else if (state === "INCOMPLETE") {
                // do something
                
            }else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                    
                    
                }
        });

        // optionally set storable, abortable, background flag here
        // A client-side action could cause multiple events, 
        // which could trigger other events and 
        // other server-side action calls.
        
        // $A.enqueueAction adds the server-side action to the queue.
        this.enqueueAction(action);
    }

    handleRedirectionhelper(page, url) 
    {

    this.encrypt(encryptData, {str: url}).then((results)=>{

        this.pageReference = {
            type: "comm__namedPage",
            attributes: 
            {
                pageName: page
            },
            state: 
            {
                params : results
            }
        };

        this[NavigationMixin.Navigate](this.pageReference).then(url => this.url = url);

    });
    }

    handleClick(evt) {
        // Stop the event's default behavior.
        // Stop the event from bubbling up in the DOM.
        evt.preventDefault();
        evt.stopPropagation();
        // Navigate to the Account Home page.
        this[NavigationMixin.Navigate](this.pageReference);
    }


    encrypthelper(data){  
        var result="null";
        var action = this.encrypt;
        action.setParams({ str : data });

        // Create a callback that is executed after 
        // the server-side action returns
        return new Promise((resolve, reject) =>{
            action.setCallback(this, (response) =>{
                var state = response.getState();
                if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                            reject(response.getError()[0]);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }else if (state === "SUCCESS") {
                    result = response.getReturnValue();
                }
                resolve(result);
            });
            this.enqueueAction(action);
        });
    }


    handleDecrypthelper(callerComponent, callerHelper, dataURI, controllerMethod) {
        var sURLVariablesMain = dataURI.split('&')[0].split("="); 
        var sParameterName;
        var sPageURL;
        var variables = [];

        if (sURLVariablesMain[0] == 'params') {
            this.decrypt(decryptData, {str: sURLVariablesMain[1]}).then((results) =>{
                variables = results.split('&');
                controllerMethod(callerComponent, callerHelper, variables);
            });
        }
    }

    decrypthelper(data){
        try {
            var result="null";
            var action = this.decrypt;
            action.setParams({ str : data }); 
            
            return new Promise((resolve, reject) =>{
                
                action.setCallback(this, (response) =>{

                var state = response.getState();
                if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                        errors[0].message);
                                reject(response.getError()[0]);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }else if (state === "SUCCESS") {
                    result = response.getReturnValue();
                    
                }
                    resolve(result);
                });
                this.enqueueAction(action);
            });

        } catch(e) {
            console.error(e);
        }
    }

    handleSaveToCachehelper( key, data) {
            
        var userId = this.get( "$SObjectType.CurrentUser.Id" );
        try{
            var result="null";
            var action = this.encrypt;

            action.setParams({ str : JSON.stringify(data)});
                action.setCallback(this, (response) =>{
                    var state = response.getState();
                    if (state === "ERROR") {
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                            errors[0].message);
                            }
                        } else {
                            console.log("Unknown error");
                        }
                    }else if (state === "SUCCESS") {
                        result = response.getReturnValue();
                        if(result!='null' && result!=undefined && result!=null){
                            window.localStorage.setItem(userId + '_' + key, result);
                            window.localStorage.setItem(userId + '_' + key + '_timestamp', new Date());
                            if(key == "balanceEODGP"){
                                window.localStorage.setItem(userId + '_balanceEODTimestampGP', new Date());
                            }
                            else if(key == "balanceGP"){
                                window.localStorage.setItem(userId + '_balanceTimestampGP', new Date());
                            }
                            return {key : data};
                        }
                    }
                    return null;
                });
                this.enqueueAction(action);
        } catch (e) { 
            console.log(e);
        }
    }

    handleRetrieveFromCachehelper( callerComponent, key, successCallback) {
            
        try {
            var result="null";
            var action = this.decrypt;
            var userId = this.get( "$SObjectType.CurrentUser.Id" );
            
            let data = window.localStorage.getItem(userId + '_' + key);
            let timestamp = window.localStorage.getItem(userId + '_' + key + '_timestamp');
            if(key == "balanceEODGP"){
                timestamp = window.localStorage.getItem(userId + '_balanceEODTimestampGP');
            }
            else if(key == "balanceGP"){
                timestamp = window.localStorage.getItem(userId + '_balanceTimestampGP');
            }
            let isFreshData = timestamp != 'null' && timestamp != undefined && ((new Date() - new Date(Date.parse(timestamp))) < parseInt(this.get("$Label.c.refreshBalanceCollout"))*60000); 
            if(data != undefined && data != "undefined" && isFreshData){
                action.setParams({ str : data });    
                action.setCallback(this, (response) =>{
                    var state = response.getState();
                    if (state === "ERROR") {
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                    console.log("Error message: " + 
                                            errors[0].message);    
                                        }
                        } else {
                            console.log("Unknown error");
                        }
                        successCallback(callerComponent, "ERROR");
                    }else if (state === "SUCCESS") {
                        result = response.getReturnValue();
                        if(result!=null && result !=undefined && result!='null'){
                            successCallback(callerComponent, result);	   
                        } else {
                            successCallback(callerComponent, "RESPONSE ERROR");
                        }
                    }
                });
                this.enqueueAction(action);
            } else {
                successCallback(callerComponent, undefined); 
            }
        } catch(e) {
            console.error(e);
        }
    }

}