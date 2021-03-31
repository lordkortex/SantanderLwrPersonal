({
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method get the Countries ISO2
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    getAccounts : function(component, event, helper){
        try {
            var action = component.get("c.getAccounts");
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var res =response.getReturnValue();
                    if(res!=null && res!=undefined && res!=""){
                        var resJSON =JSON.parse(res);
                        var accounts=[];
                        for(var i in resJSON){
                            accounts.push({'account':resJSON[i].accounts[0].displayNumber,'bic':resJSON[i].accounts[0].agent,'id_type':resJSON[i].accounts[0].id_type});
                        }
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
            });

            $A.enqueueAction(action);

        } catch (e) {
            console.log(e);
        }
    }
})