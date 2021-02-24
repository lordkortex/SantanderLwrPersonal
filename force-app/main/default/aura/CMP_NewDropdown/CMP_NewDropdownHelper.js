({
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to handle selection
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/
    handleSelection : function(component, event, items){  
        component.set("v.selectedValue", items[0]);
        var selectedValues = [];

        if(component.get("v.isSimpleDropdown")) {
            selectedValues.push(items[0]);
        } else {
            var selectedValuesList = component.get("v.selectedValues");
            var item_aux=[]

            for(var item in items){
                item_aux.push(items[item]);
            }

            // If the element selected is All, then select / deselect all options
            for(var item in item_aux){
                if(!item_aux[item].get("v.checked")){
                    selectedValuesList.splice(selectedValuesList.indexOf(item_aux[item].get("v.id")),1);
                }else{
                    selectedValuesList.push(item_aux[item].get("v.id"));

                }
                
                component.set("v.allValuesSelected", false);
                
            }

            component.set("v.selectedValues",selectedValuesList);
            selectedValues = selectedValuesList;        
        }
        
        // Fire event with the selected values info
        var dEvent = component.getEvent("dropdownValueSelected");
        dEvent.setParams({
            "selectedValues" : selectedValues
        });
        dEvent.fire();
        var cEvent = component.getEvent("dropdownExchangeCurrency");
        cEvent.setParams({
            "selectedValues" : selectedValues
        });
        cEvent.fire();
    }
})