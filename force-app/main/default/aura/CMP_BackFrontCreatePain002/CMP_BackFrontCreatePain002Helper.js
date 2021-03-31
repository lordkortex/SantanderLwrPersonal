({
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method get the Countries ISO2
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    getAccounts : function(component, event, helper){
        try {
            var action = component.get("c.getDeactivatedPain002");
        
            action.setParams({filters: component.get("v.entity")});;
            action.setCallback(this, function(response) {
                var state = response.getState();
                component.set("v.accountList",[]);

                if (state === "SUCCESS") {
                    var res =response.getReturnValue();
                    console.log(res);
                    if(res!=null && res!=undefined && res!="" && res!=[] && res!='""'){
                        console.log(res);
                        var resJSON =JSON.parse(res).accountListResponse;

                        var accounts=[];
                        var accountListToDisplay=[];
                        for(var i in resJSON){
                            accountListToDisplay.push(resJSON[i].iban);

                            accounts.push({'account':resJSON[i].iban,'bic':resJSON[i].agent, 'currency' : resJSON[i].currencyCodeMainBalance});
                        }
                        console.log(accountListToDisplay);
                        component.set("v.accountListToDisplay",accountListToDisplay);
                        component.set("v.accountList",accounts);

                        component.set("v.ready",true);
                    }
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
                $A.util.addClass(component.find("spinnerCreate"),"slds-hide");
            });


            $A.enqueueAction(action);

        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method get the Countries ISO2
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    add : function(component, event, helper){
        try {
            if(component.get("v.selectedAccount")!='' && component.get("v.selectedChannel")!=''){
                var bic='';
                var currency = '';
                var accountList=component.get("v.accountList");
                if(accountList.length>0){
                    for(var i in accountList){
                        if(accountList[i].account==component.get("v.selectedAccount")){
                            bic=accountList[i].bic;
                            currency = accountList[i].currency;
                        }
                    }
                }
                if(currency == null)
                {
                	currency = '';    
                }
                var body='{"accountPain002Insert": {"currencyCode": "'+currency+'","companyGlobalId": "'+component.get("v.entity")+'","accountId": "'+component.get("v.selectedAccount")+'","bankId": "'+bic+'","channel": "'+component.get("v.selectedChannel")+'","periodicity": "daily"}}';
                var action = component.get("c.activePain002");
            
                action.setParams({body:body});;
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        component.set("v.isOpen",false);
                        component.set("v.toastType","success");
                        component.set("v.toastMessage",$A.get("$Label.c.painActivatedCorrectly"));
                        component.set("v.showToast",true);
                    }
                    else if (state === "ERROR") {
                        component.set("v.toastType","error");
                        component.set("v.toastMessage",$A.get("$Label.c.painNotActivatedCorrectly"));
                        component.set("v.showToast",true);
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

                $A.enqueueAction(action);
            }

        } catch (e) {
            console.log(e);
        }
    }
})