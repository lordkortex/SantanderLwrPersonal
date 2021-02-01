({

    /*Author:       R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to remove a single pill
    History
    <Date>			<Author>				 <Description>
    11/12/2019		R. Alexander Cervino     Initial version*/

    removePill : function(component, event, helper) {
        try{
            var cmpEvent = component.getEvent("clearConcretePill"); 
            cmpEvent.setParams({
                currentPill: event.currentTarget.id
            });
            cmpEvent.fire();
        } catch (e) {
            console.log(e);
        } 
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to fire event to clear all filters
    History
    <Date>			<Author>				 <Description>
    11/12/2019		R. Alexander Cervino     Initial version*/

    clearSearch : function(component, event, helper){
        try{
            var cmpEvent = component.getEvent("clearSearch"); 
            cmpEvent.fire(); 
        } catch (e) {
            console.log(e);
        }
    }
})