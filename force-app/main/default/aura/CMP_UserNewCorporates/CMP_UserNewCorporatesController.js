({

/*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method to handle component init.
    History
    <Date>          <Author>            <Description>
    22/01/2019      Joaquin Vera        Initial version
    */
   doInit : function(component, event, helper) 
   {
       
   },

    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Launches when you add a value to the corporate table
    History
    <Date>          <Author>            <Description>
    22/01/2019      Joaquin Vera        Initial version
    */
    addValue : function(component, event, helper) 
    {
        var selectedValues = component.get("v.selectedValues");

        if(selectedValues.includes("All")) 
        {
            component.set("v.showDropdown", false);
            component.set("v.selectedValues", []);
            component.set("v.corporatesListFront", []);
            component.set("v.selectedCorporates", component.get("v.corporatesListBack"));
        } 
        else if(selectedValues != [] && selectedValues != null && selectedValues != undefined) 
        {
            
            var firstSelected = component.get("v.selectedCorporates");
            var finalSelected = selectedValues.concat(firstSelected);

            component.set("v.selectedCorporates", finalSelected);
            
            const finalDropdown = component.get("v.corporatesListBack").filter(e => !finalSelected.includes(e));
            
            component.set("v.corporatesListFront", finalDropdown);

            if(finalDropdown.length == 0) 
            {
                component.set("v.showDropdown", false);
            }
        }
        component.set("v.selectedValues", []);
        
    },

    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Launches when you click the delete button in a corporate row.
    History
    <Date>          <Author>            <Description>
    22/01/2019      Joaquin Vera        Initial version
    */
    deleteItem : function(component,event,helper) 
    {
        var id = event.currentTarget.id;
        component.set("v.showModal", true);
        component.set("v.modalToShow", "DeleteCorporate");
        component.set("v.corporateClicked", id);
    },

    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Launches when a button is clicked
    History
    <Date>          <Author>            <Description>
    22/01/2019      Joaquin Vera        Initial version
    */
   deletionConfirmed : function(component,event, helper) 
    {   
        let id = event.getSource().getLocalId();
        component.set("v.showModal", false);
        component.set("v.modalToShow", "ConfirmCreation");
        if(event.getParam("isDeleting") && id == "DeleteCorporateModal") 
        {
            var a = component.get("v.corporateClicked");
            var front = component.get("v.corporatesListFront");
            front = front.concat(a);
            component.set("v.corporatesListFront", front);
            var filteredData= component.get("v.selectedCorporates").filter(dato => dato != a);
            component.set("v.selectedCorporates", filteredData);
            component.set("v.showDropdown", true);
        }
    }    
})