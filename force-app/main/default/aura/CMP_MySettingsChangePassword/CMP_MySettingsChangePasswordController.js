({
          /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method that launches when the save button is clicked
    History
    <Date>          <Author>            <Description>
    03/03/2020      Joaquin Vera        Initial version
    */
    saveChangePassword : function (component, event, helper) {
        helper.handleSave(component,event,helper);

    },
          /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method that launches when the cancel button is clicked
    History
    <Date>          <Author>            <Description>
    03/03/2020      Joaquin Vera        Initial version
    */
    cancelChangePassword : function (component, event, helper) {
        component.set("v.isChangingPassword", false);
    },
})