({
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Save data on input blur
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    saveData : function(component, event, helper) {
        component.set("v.groupName", event.currentTarget.value);
    }
})