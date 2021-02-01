({
        /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Encrypt data before moving to another page
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    encrypt : function(component, data){  
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
                                
                                reject(response.getError()[0]);
                        }
                        }
                }else if (state === "SUCCESS") {
                        result = response.getReturnValue();
                }
                        resolve(result);
                });
                $A.enqueueAction(action);
        });
    }
})