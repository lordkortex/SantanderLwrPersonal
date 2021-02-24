({
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to handle selection
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/
    selectOption : function(component, event, helper,clear) {
        if(component.get("v.isSimpleDropdown")){
            if(clear==false){
                if(event.getSource().get("v.id")!=component.get("v.selectedValue")){
                    component.set("v.selectedValue",event.getSource().get("v.id"));
                }
            }
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to apply filters
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/
    apply : function(component, event, helper,clear) {
        if(component.get("v.isSimpleDropdown")){
            var cmpEvent = component.getEvent("updateFilterDropdown"); 
            cmpEvent.setParams({filter:component.get("v.valuePlaceholder"),value:component.get("v.selectedValue")});
            cmpEvent.fire(); 
        }else{
            var cmpEvent = component.getEvent("updateFilterDropdown"); 
            cmpEvent.setParams({filter:component.get("v.valuePlaceholder"),value:component.get("v.selectedValues")});
            cmpEvent.fire(); 
        }
    }
})