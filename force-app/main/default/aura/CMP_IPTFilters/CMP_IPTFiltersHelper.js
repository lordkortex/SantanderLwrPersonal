({
    
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method get the Countries ISO2
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    getAccounts : function(component, event, helper){
        try {

            var accountList=component.get("v.accountList");
            if(accountList.length>0){
                var filter='{"searchData":{';
                var filterAccount='"originatorAccountList":[';
                var accountsToDisplay=[];
                for(var i in accountList){
                    accountsToDisplay.push(accountList[i].account);
                    filterAccount+='{"bankId":"'+accountList[i].bic+'","account":{"idType":"'+accountList[i].id_type+'","accountId":"'+accountList[i].account+'"}},';
                }
                component.set("v.accountListToDisplay",accountsToDisplay);
                /* CAMBIOS AM TRACKER NEXUS
                //01/04/2020 - Account Payments Tracker
                if(component.get("v.isAccountFilter")){
                    component.set("v.selectedAccounts",accountsToDisplay);
                }*/

                component.set("v.ready",true);

                filterAccount=filterAccount.slice(0,-1)+']';
                component.set("v.accountFilter",filterAccount);
                filter+=filterAccount+',"latestPaymentsFlag": "YES","_offset": "0","_limit": "1000", "inOutIndicator": "OUT"}}';

                component.set("v.filters",filter);
                var cmpEvent = component.getEvent("getFilterParent"); 
                cmpEvent.setParams({filters: filter});
                cmpEvent.fire(); 
            }
            

        } catch (e) {
            console.log(e);
        }
    },
    


    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to download
    History
    <Date>			<Author>		<Description>
    12/12/2019		R. Alexander Cervino     Initial version*/

    download : function(component, event, helper){
        //First retrieve the doc and the remove it
        try{            
            this.retrieveList(component, event, helper).then(function(results){
                if(results!=null && results!='' && results!=undefined){
                    var domain=$A.get('$Label.c.domain');
					
					if(component.get("v.isOneTrade")==false){										 
						if(component.get("v.fromCashNexus")==true){
							domain=$A.get('$Label.c.domainCashNexus');
						}
						if(component.get("v.backfront")==true){
							domain=$A.get('$Label.c.domainBackfront');
						}
					}
                    window.location.href = domain+'/sfc/servlet.shepherd/document/download/'+results+'?operationContext=S1';

                    setTimeout(function(){
                        helper.removeFile(component, event, helper, results);
                    }, 80000);
                }
            });

        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to remove the downloaded
    History
    <Date>			<Author>		<Description>
    17/12/2019		R. Alexander Cervino     Initial version*/

    removeFile : function(component, event, helper, ID){

        try{
            var action = component.get("c.removeFile");
            //Send the payment ID
            action.setParams({id:ID});
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
                }
            });
            $A.enqueueAction(action);

        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to retieve the file id
    History
    <Date>			<Author>		<Description>
    16/12/2019		R. Alexander Cervino     Initial version*/

    retrieveList : function(component, event, helper){
        try{

            var action = component.get("c.downloadAll");
            //Send the payment ID
            console.log("download");
            console.log(component.get("v.filters"));
            action.setParams({body:component.get("v.filters")});
            return new Promise(function (resolve, reject) {
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "ERROR") {
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                            errors[0].message);
                                reject(errors);
                            }
                        } else {
                            console.log("Unknown error");
                        }
                    }else if (state === "SUCCESS") {

                        resolve(response.getReturnValue());
                    }
                });
                $A.enqueueAction(action);
            });

        } catch (e) {
            console.log(e);
        }
    }

})