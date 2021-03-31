/*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Function to Go to a page
    History
    <Date>			<Author>		<Description>
    15/01/2020		R. Alexander Cervino     Initial version
    */
({
    goTo : function (component, page, url){
        this.encrypt(component, url).then(function(results){
            console.log(page);
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
    
    getIsCashNexus :  function (component, event){
        try{
            var action = component.get("c.getIsCashNexus");
            
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var iReturn = response.getReturnValue();
                    for ( var key in iReturn ) {
                        if(key == "isCashNexusUser"){
                            component.set("v.isCashNexus", iReturn[key]);
                        }
                        if(key == "BIC"){
                            component.set("v.isBIC", iReturn[key]);
                        }
                        if(key == "ES"){
                            component.set("v.isES", iReturn[key]);
                        }
                        if(key == "GB"){
                            component.set("v.isGB", iReturn[key]);
                        }
                        if(key == "PL"){
                            component.set("v.isPL", iReturn[key]);
                        }
                        if(key == "CL"){
                            component.set("v.isCL", iReturn[key]);
                        }
                        if(key == "MX"){
                            component.set("v.isMX", iReturn[key]);
                        }
                        if(key == "Other"){
                            component.set("v.isOther", iReturn[key]);
                        }
                        if(key == "polish"){
                            if(iReturn[key] == true){
                                component.set("v.language", "polish");
                            }
                        }
                    }
                    
                    var nexus = component.get("v.isCashNexus");
                    var gb = component.get("v.isGB");
                    var es = component.get("v.isES");
                    var pl = component.get("v.isPL");
                    var cl = component.get("v.isCL");
                    var mx = component.get("v.isMX");
                    var other = component.get("v.isOther");
                    
                    if(gb == true) {
                        component.set("v.country", "GB");
                    }
                    if(es == true) {
                        component.set("v.country", "ES");
                    }
                    if(pl == true) {
                        component.set("v.country", "PL");
                    }
                    if(cl == true) {
                        component.set("v.country", "CL");
                    }
                    if(mx == true) {
                        component.set("v.country", "MX");
                    }
                    if(other == true) {
                        component.set("v.country", "Other");
                    }
                    if(nexus == true) {
                        component.set("v.country", "CN");
                    }
                    
                    /*var country = component.get("v.country");
        			var url = "c__country="+country;
        
        			this.goTo(component,"terms-and-conditions", url);*/
                }
                else {
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
    },
    
    //The following method encryots the data
    encrypt : function(component, data){ 
        //Encrypt data
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