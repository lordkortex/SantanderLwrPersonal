({
	getURLParams : function(component, event,  helper) {

        /*var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
        component.find("Service").dataDecryption(component,helper, sPageURLMain, this.handleParams);*/
        
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
                        if (sParameterName[0] === 'c__country') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.country",sParameterName[1]);
                        }
                        if (sParameterName[0] === 'c__language') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.language",sParameterName[1]);
                        }
                    }

                    console.log(component.get("v.language"));
                });
            }
            
        } catch (e) {
            
            console.log(e);
        }
    },

    handleParams : function (component, helper, response){
		/*var userId = $A.get( "$SObjectType.CurrentUser.Id" );
		var sParameterName;
		if(response != "") {
			for(var i = 0; i < response.length ; i++) {
				sParameterName = response[i].split("="); 
				switch(sParameterName[0]) {
					case("c__country"):
						sParameterName[1] === undefined ? 'Not found' : component.set("v.country",sParameterName[1]);
                        break;
                    case("c__language"):
                    sParameterName[1] === undefined ? 'Not found' : component.set("v.language",sParameterName[1]);
                    break;
				}
			}
        }*/
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