({
	getCountryName : function(component, event) {
        var icountry =  component.get("v.item").country;
        var action = component.get("c.getCountryName");
        action.setParams({
            "ISOCode" : icountry
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.countryName", response.getReturnValue());
            }
            else{
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
})