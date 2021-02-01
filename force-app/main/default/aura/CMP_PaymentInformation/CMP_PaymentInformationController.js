({
	handleNewCase : function(component, event, helper) {
        component.set('v.showSpinner', true);
		helper.createCase(component, event, helper);
	},
    closeModel : function(component, event, helper) {
		component.set('v.isOpen', false);
        component.set('v.paymentObj', null);
	},
  
    // common reusable function for toggle sections
    toggleSection : function(component, event, helper) {
        // dynamically get aura:id name from 'data-auraId' attribute
        var sectionAuraId = event.target.getAttribute("data-auraId");
        // get section Div element using aura:id
        var sectionDiv = component.find(sectionAuraId).getElement();
        /* The search() method searches for 'slds-is-open' class, and returns the position of the match.
         * This method returns -1 if no match is found.
        */
        var sectionState = sectionDiv.getAttribute('class').search('slds-is-open'); 
        
        // -1 if 'slds-is-open' class is missing...then set 'slds-is-open' class else set slds-is-close class to element
        if(sectionState == -1){
            sectionDiv.setAttribute('class' , 'slds-section slds-is-open');
        }else{
            sectionDiv.setAttribute('class' , 'slds-section slds-is-close');
        }
    },
    handleMyCase : function(component, event, helper) {
         var obj = component.get('v.paymentObj');
        if(obj != null && obj != undefined){
            
            var action = component.get("c.myCase");
            action.setParams({ 
                payment : JSON.stringify(obj)
              //  paymentCountry : obj.destinationCountry
              });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    
                    var result = response.getReturnValue();
                    console.log('RES:  ' +  result);
                    //helper.createRecord(component, event, helper, result.Id);
                    //helper.showSuccessToast(component, event, helper, result.CaseNumber);
                   // component.set('v.showSpinner', false);
                    
                }
                else if (state === "INCOMPLETE") {
                    // do something
                    
                }
                    else if (state === "ERROR") {
                        var errors = response.getError(component, event, helper);
                        helper.showErrorToast();
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
    }
})