({
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to getURLParams
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

    getURLParams : function(component,event,helper) {
        try{
            var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
            var sURLVariablesMain = sPageURLMain.split('&')[0].split("="); 
            var sParameterName;

            var sPageURL;

            if (sURLVariablesMain[0] == 'params') {
                this.decrypt(component,sURLVariablesMain[1]).then(function(results){
                    sURLVariablesMain[1] === undefined ? 'Not found' : sPageURL = results;

                    var sURLVariables=sPageURL.split('&');
                    for ( var i = 0; i < sURLVariables.length; i++ ) {
                        sParameterName = sURLVariables[i].split('=');      

                        if (sParameterName[0] === 'c__accountNumber') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.accountNumber",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__bank') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.bank",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__mainAmount') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.mainAmount",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__availableAmount') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.availableAmount",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__currentCurrency') {
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.currentCurrency",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__subsidiaryName') {
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.subsidiaryName",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__agent') {
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.agent",sParameterName[1]);
                        }
                    }
                    component.set("v.filters","latest_payments_flag=NO&account_Id="+component.get("v.accountNumber")+'&originator_agent='+component.get("v.agent"));
                    component.set("v.ready",true);


                });
            }
        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to decrypt data
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

    decrypt : function(component, data){
        try {
            var result="null";
            var action = component.get("c.decryptData");
    
            action.setParams({ str : data }); 
            
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