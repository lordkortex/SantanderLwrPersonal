({
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Function to select a value
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    selectValue : function(component, event, helper) {
        var id = event.currentTarget.id;
        component.set("v.selectedValue", id);
    }
})