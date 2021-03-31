({
	doInit: function (component, event, helper) {
        new Promise($A.getCallback(function (resolve, reject) {
            component.set('v.showSpinner', true);
            resolve('Ok');
        })).then($A.getCallback(function (value) {
            return helper.manageURL(component, event, helper);
        })).then($A.getCallback(function (value) {
            return helper.getUserData(component, helper);
        })).then($A.getCallback(function (value) {
            return helper.getPriorityValues(component, event, helper);
        })).then($A.getCallback(function (value) {
            return helper.getVAMDetail(component, event, helper);
        })).catch($A.getCallback(function (error) {
            console.log(error);
        })).finally($A.getCallback(function () {
            component.set('v.showSpinner', false);
        }));      
    },
    
    getVAMDetailController: function (component, event, helper) {
    	helper.getVAMDetail(component, event, helper);
    },
    
    closeModal: function (component, event, helper) {
		helper.closeModal(component, event, helper);
    },
    
    handleBlurAmount: function (component, event, helper) {
    	helper.handleBlurAmount(component, event, helper);
    },
    
    handleNewCase: function (component, event, helper) {
    	helper.handleNewCase(component, event, helper);
    },
    handleEditCase: function (component, event, helper) {
    	helper.handleEditCase(component, event, helper);
    },
    
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
    }
})