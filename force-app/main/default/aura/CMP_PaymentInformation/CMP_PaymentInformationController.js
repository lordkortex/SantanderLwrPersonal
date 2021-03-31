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
    },
     handleGTITracker : function(component, event, helper) {
         var paymentObj = component.get('v.paymentObj');
         var uetrCode = paymentObj.operationStep2Data.uetr;
         try {
			var filter = "{\"searchData\": {\"latestPaymentsFlag\": \"NO\",\"_limit\":\"1000\",\"_offset\":\"0\",\"paymentId\":\"" + uetrCode + "\",\"inOutIndicator\":\"OUT\"}}";
            component.set("v.uetr", uetrCode);
            component.set("v.filters", filter);
            component.set("v.isUETRSearch", true);
            component.set("v.displayGPITracker", true);
            helper.goToDetails(component, event, helper);
         } catch (e) {
             console.log(e);
         }
	},
    
    //MAHR
    handleDocument : function(component,event,helper){
		helper.calculateListDocument(component, event, helper);
    },
    closeModel2: function(component, event, helper) {
        // for Close Model, set the "hasModalOpen" attribute to "FALSE"  
        component.set("v.hasModalOpen", false);
        component.set("v.selectedDocumentId" , null); 
    },
    /*getSelected : function(component,event,helper){
        // display modle and set seletedDocumentId attribute with selected record Id   
        helper.openDocument(component,event, helper,event.currentTarget.getAttribute("data-Id"));
    },*/
    getSelected : function(component,event,helper){
        // display modle and set seletedDocumentId attribute with selected record Id   
        helper.openDocument(component,event, helper,event.getParam('value'));
    },
    handleMT103 : function(component, event, helper) {
		helper.viewMT103(component,event, helper);
	}
})