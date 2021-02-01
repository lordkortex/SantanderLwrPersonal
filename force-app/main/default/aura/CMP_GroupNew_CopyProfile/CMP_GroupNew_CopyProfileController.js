({
    /*
    Author:         Joaquín Vera
    Company:        Deloitte
    Description:    Method to handle do init
    History
    <Date>          <Author>            <Description>
    24/01/2019      Joaquín Vera        Initial version
    */
    doInit : function(component,event,helper) {
        helper.handleDoInit(component,event,helper);
    },
    
    
    /*
    Author:         Teresa Santos
    Company:        Deloitte
    Description:    Method to handle component init
    History
    <Date>          <Author>            <Description>
    24/01/2019      Teresa Santos        Initial version
    */
    optionGroup : function(component,event,helper){
        helper.changeValuesGroup(component,event,helper);
    },
    
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Function to collapse the data
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    
    collapse : function(component, event, helper) {
        component.set("v.copyIsExpanded", false);
    },
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Function to expand the data
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    expand : function(component, event, helper) {
        component.set("v.copyIsExpanded", true);
    },
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Function to set an item as selected
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    selectItem : function(component,event,helper){
        var id = event.currentTarget.id;
        component.set("v.selectedValue", id);
    },
    /*
    Author:         Teresa Santos
    Company:        Deloitte
    Description:    Function to set an item as selected
    History
    <Date>          <Author>            <Description>
    24/01/2019      Teresa Santos        Initial version
    */
    optionGroup : function(component,event,helper){
        helper.changeValuesGroup(component,event,helper);
    },   
    /*
    Author:         Joaquín Vera
    Company:        Deloitte
    Description:    Set an user as selected
    History
    <Date>          <Author>            <Description>
    24/01/2019      Joaquín Vera        Initial version
    */
    optionUser: function(component,event,helper){
        helper.changeValuesUser(component,event,helper);
    },   
    
    /*
    Author:         Joaquín Vera
    Company:        Deloitte
    Description:    Method to handle Dropdown value changed
    History
    <Date>          <Author>            <Description>
    24/01/2019      Joaquín Vera        Initial version
    */
    dropdownValueChange : function(component,event,helper) {
        if(event.getParam("selectedValues")[0] == $A.get("$Label.c.selectOne") && event.getSource().getLocalId() == "userDropdown") {
            component.set("v.selectedValueUser" , null );
        }
        if(event.getParam("selectedValues")[0] == $A.get("$Label.c.selectOne") && event.getSource().getLocalId() == "groupDropdown") {
            component.set("v.selectedValueGroup" , null );
        }
    }
    
})