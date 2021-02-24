({
    /*
    Author:         Teresa Santos
    Company:        Deloitte
    Description:    Function to collapse the data
    History
    <Date>          <Author>            <Description>
    16/01/2019      Teresa Santos        Initial version
    */

    collapse : function(component, event, helper) {
        component.set("v.copyIsExpanded", false);
    },
    /*
    Author:         Teresa Santos
    Company:        Deloitte
    Description:    Function to expand the data
    History
    <Date>          <Author>            <Description>
    16/01/2019      Teresa Santos        Initial version
    */
    expand : function(component, event, helper) {
        component.set("v.copyIsExpanded", true);
    },
    /*
    Author:         Teresa Santos
    Company:        Deloitte
    Description:    Function to set an item as selected
    History
    <Date>          <Author>            <Description>
    16/01/2019      Teresa Santos        Initial version
    */
    selectItem : function(component,event,helper){
        var id = event.currentTarget.id;
        component.set("v.selectedValue", id);
    },


    /*
    Author:         Joaquín Vera
    Company:        Deloitte
    Description:    Method to handle the changes on dropdowns
    History
    <Date>          <Author>            <Description>
    16/01/2020      Joaquin Vera        Initial version
    */
    dropdownValueChange : function(component,event,helper) {
        
        console.log(event.getSource().getLocalId());

        if(event.getParam("selectedValues")[0] == "Select One" && event.getSource().getLocalId() == "rolesDropdown") {
            component.set("v.selectedValueRol" , null );
        }
        if(event.getParam("selectedValues")[0] == "Select One" && event.getSource().getLocalId() == "groupsDropdown") {
            component.set("v.selectedValueGroup" , null );
        }
    }
})