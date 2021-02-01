({
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Contracts the data
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    contract : function(component, event, helper) {
        component.set("v.isExpanded" , false);
    },
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Expands the data
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    expand : function(component, event, helper){
        component.set("v.isExpanded" , true);
    },
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Collapses or expands the row data
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    collapseOrExpandData : function (component,event,helper) {
        component.set("v.valuesExpanded", !component.get("v.valuesExpanded"));
    }
})