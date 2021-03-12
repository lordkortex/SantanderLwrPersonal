({
	callApex: function(component, controllerMethod, actionParameters, successCallback) {
        // create a one-time use instance of the serverEcho action
        // in the server-side controller
        var action = component.get(controllerMethod);
        action.setParams(actionParameters);
        console.log("yyyy");
        
        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log("state: "+state);
            if (state === "SUCCESS") {
                //->HERE WE CALL THE CALLBACK RATHER PROCESS THE RESPONSE
                successCallback(component, response.getReturnValue());
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
                }
        });
        
        // optionally set storable, abortable, background flag here
        // A client-side action could cause multiple events, 
        // which could trigger other events and 
        // other server-side action calls.
        
        // $A.enqueueAction adds the server-side action to the queue.
        $A.enqueueAction(action);
    },

        callApex2: function(component,helper, controllerMethod, actionParameters, successCallback) {
            // create a one-time use instance of the serverEcho action
            // in the server-side controller
            var action = component.get(controllerMethod);
            action.setParams(actionParameters);
            console.log("yyyy");
            
            // Create a callback that is executed after 
            // the server-side action returns
            action.setCallback(this, function(response) {
                var state = response.getState();
                console.log("state: "+state);
                if (state === "SUCCESS") {
                    //->HERE WE CALL THE CALLBACK RATHER PROCESS THE RESPONSE
                    successCallback(component,helper, response.getReturnValue());
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
                    }
            });
            
            // optionally set storable, abortable, background flag here
            // A client-side action could cause multiple events, 
            // which could trigger other events and 
            // other server-side action calls.
            
            // $A.enqueueAction adds the server-side action to the queue.
            $A.enqueueAction(action);
        },

/*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method to redirect to another page
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
   handleRedirection : function(component, helper, page, url) 
   {

        helper.encrypt(component, url).then(function(results)
        {
            let navService = component.find("navService");

            let pageReference = 
            {
                type: "comm__namedPage",
                attributes: 
                {
                    pageName: page
                },
                state: 
                {
                    params : results
                }
            }

            component.set("v.pageReference", pageReference);
            navService.navigate(pageReference); 
        });
    },
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Encrypts the data
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    encrypt : function(component, data)
    {  
        var result="null";
        var action = component.get("c.encryptData");
        action.setParams({ str : data });
        // Create a callback that is executed after 
        // the server-side action returns
        return new Promise(function (resolve, reject) {
            action.setCallback(this, function(response) {
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
            $A.enqueueAction(action);
        });
    },

    handleDecrypt: function(component, helper, callerComponent, callerHelper, dataURI, controllerMethod) 
    {

        var sURLVariablesMain = dataURI.split('&')[0].split("="); 
        var sParameterName;
        var sPageURL;
        var variables = [];

        if (sURLVariablesMain[0] == 'params') {
            helper.decrypt(component,sURLVariablesMain[1]).then(function(results){
                variables = results.split('&');
               controllerMethod(callerComponent, callerHelper, variables);
            });
        }
    },

    	/*
	Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Function to decypt the URL params that is sended from the users component.
    History
    <Date>			<Author>			<Description>
	26/12/2019		Joaquin Vera      	Initial version
	*/
    decrypt : function(component, data){
        try {
            var result="null";
            var action = component.get("c.decryptData");
            action.setParams({ str : data }); 
            
            return new Promise(function (resolve, reject) {
                
                action.setCallback(this, function(response) {

                var state = response.getState();
                console.log(state);
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
                $A.enqueueAction(action);
            });

        } catch(e) {
            console.error(e);
        }
    },

        
    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method to encrypt data and save it to the cache
    History
    <Date>		    <Author>		<Description>
    03/06/2020	    Guillermo Giral     Initial version
    */
    handleSaveToCache : function(component, helper, key, data) {
                
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );
        try{
            var result="null";
            var action = component.get("c.encryptData");

            action.setParams({ str : JSON.stringify(data)});
                action.setCallback(this, function(response) {
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
                            return {key : data};
                        }
                    }
                    return null;
                });
                $A.enqueueAction(action);
        } catch (e) { 
            console.log(e);
        }
    },
    
    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method to encrypt data and save it to the cache
    History
    <Date>		    <Author>		<Description>
    03/06/2020	    Guillermo Giral     Initial version
    */
    handleRetrieveFromCache : function(component, helper, callerComponent, key, successCallback) {
                
        try {
            var result="null";
            var action = component.get("c.decryptData");
            var userId = $A.get( "$SObjectType.CurrentUser.Id" );
            
            let data = window.localStorage.getItem(userId + '_' + key);
            let timestamp = window.localStorage.getItem(userId + '_' + key + '_timestamp');
            if(key == "balanceEODGP"){
                timestamp = window.localStorage.getItem(userId + '_balanceEODTimestampGP');
            }
            let isFreshData = timestamp != 'null' && timestamp != undefined && ((new Date() - new Date(Date.parse(timestamp))) < parseInt($A.get("$Label.c.refreshBalanceCollout"))*60000); 
            if(data != undefined && data != "undefined" && isFreshData){
                action.setParams({ str : data });    
                action.setCallback(this, function(response) {
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
                        successCallback(callerComponent, helper, "ERROR");
                    }else if (state === "SUCCESS") {
                        result = response.getReturnValue();
                        if(result!=null && result !=undefined && result!='null'){
                            successCallback(callerComponent, helper, result);	   
                        } else {
                            successCallback(callerComponent, helper, "RESPONSE ERROR");
                        }
                    }
                });
                $A.enqueueAction(action);
            } else {
                successCallback(callerComponent, helper, undefined); 
            }
        } catch(e) {
            console.error(e);
        }
    }

        

            
})