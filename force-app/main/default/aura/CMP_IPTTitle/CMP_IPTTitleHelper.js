({
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get user info
    History
    <Date>			<Author>		<Description>
    27/02/2020		R. Alexander Cervino     Initial version*/

    getUserInfo : function(component, data){
        try {
            var action = component.get("c.getUserInformation");

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
                if(response.getReturnValue()!=''){
                    component.set("v.firstname",' '+response.getReturnValue());
                }
            }
            });
            $A.enqueueAction(action);

        } catch(e) {
            console.error(e);
        }
    },

    /*Author:       Adrian Muñio
    Company:        Deloitte
    Description:    Method to go to Payment-UETR-Track page
    History
    <Date>			<Author>		<Description>
    17/06/2020		Adrian Muñio     Initial version*/

    goTo : function (component, event, page){
        try{
            var url = "c__comesFromTracker=true";
            this.encrypt(component, url).then(function(results){
                let navService = component.find("navService");
                let pageReference={};
                     
                pageReference = {
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

        } catch (e) {
            console.log(e);
        }
    },

    /*Author:       Adrian Muñio
    Company:        Deloitte
    Description:    Method to encrypt the data
    History
    <Date>			<Author>		<Description>
    17/06/2020		Adrian Muñio     Initial version*/

    encrypt : function(component, data){
        try{
            var result="null";
            var action = component.get("c.encryptData");
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
        } catch (e) { 
            console.log(e);
        }   
    },
})