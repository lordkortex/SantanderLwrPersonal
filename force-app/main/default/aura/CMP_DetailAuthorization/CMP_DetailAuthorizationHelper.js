/* Author:       	 Diego Asis
     Company:        Deloitte
     Description:    Function to display only the necessary rows in the tables
     History
     <Date>			<Author>			<Description>
 	 05/02/2020		Diego Asis		     Initial version
*/
({
    //The following method sets the component attribute values with the data received within an URL
    getURLParams : function(component, event,  helper) {
        try{
            
            var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
            var sURLVariablesMain = sPageURLMain.split('&')[0].split("="); 
            var sParameterName;
            
            var sPageURL;
            if (sURLVariablesMain[0] == 'params') {
                console.log('entra en el try getURLparams');
                this.decrypt(component,sURLVariablesMain[1]).then(function(results){
                    sURLVariablesMain[1] === undefined ? 'Not found' : sPageURL = results;
                    
                    var sURLVariables=sPageURL.split('&');
                    
                    for ( var i = 0; i < sURLVariables.length; i++ ) {
                        sParameterName = sURLVariables[i].split('=');  
                        if (sParameterName[0] === 'c__requestDate') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.requestDate",sParameterName[1]);
                        } 
                        if (sParameterName[0] === 'c__authorizeAction') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.authorizeAction",sParameterName[1]);
                        } 
                        if (sParameterName[0] === 'c__state') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.status",sParameterName[1]);
                        } 
                        if (sParameterName[0] === 'c__approver') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.approver",sParameterName[1]);
                        } 
                        if (sParameterName[0] === 'c__approvalDate') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.approvalDate",sParameterName[1]);
                        } 
                        if (sParameterName[0] === 'c__comment') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.comments",sParameterName[1]);
                        } 
                    }
                });
            }
            
        } catch (e) {
            
            console.log(e);
        }
    },
   
    //The following method decrypts data received within an URL
    decrypt : function(component, data){
        try {
            var result="null";
            var action = component.get("c.decryptData");
            
            action.setParams({ "str" : data }); 
            
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
            
        } catch(e) {
            console.error(e);
        }
    }
})