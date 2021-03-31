({
   
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    clear method
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/
    clear : function(component, event, helper) {
        component.set("v.settledFrom","");
        component.set("v.settledTo","");
        helper.refreshInput(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Show method
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/
    show : function(component, event, helper) {
        $A.util.toggleClass(component.find("button"),"slds-hide");
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Apply method
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/
    apply : function(component, event, helper) {
        helper.validateSettled(component, event, helper);
    }
})