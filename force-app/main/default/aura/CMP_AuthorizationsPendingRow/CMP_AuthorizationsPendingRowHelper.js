/* Author:       	 Diego Asis
     Company:        Deloitte
     Description:    Function to display only the necessary rows in the tables
     History
     <Date>			<Author>			<Description>
 	 11/02/2020		Diego Asis		     Initial version
*/
({
    //The following method sets up the community pages navigation
	goTo : function (component, event, page, url){
        this.encrypt(component, url).then(function(results){
            let navService = component.find("navService");
            let pageReference = {
                type: "comm__namedPage", 
                attributes: {
                    pageName: page
                },
                state: {
                    params : results
                }
            }
            navService.navigate(pageReference); 
        });
    },
    
    //The following method encryots the data
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
    }
})