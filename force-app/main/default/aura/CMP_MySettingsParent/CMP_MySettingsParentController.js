({
             /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method to handle component init
    History
    <Date>          <Author>            <Description>
    03/03/2020      Joaquin Vera        Initial version
    */
    doInit : function(component, event, helper) {

        helper.handleDoInit(component,event,helper);
    },

    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Launches when the edit button is clicked
    History
    <Date>          <Author>            <Description>
    03/03/2020      Joaquin Vera        Initial version
    */
    editButtonClicked : function (component, event, helper) {
        component.set("v.isEditing", true);
    },

          /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Launches when the change password button is clicked
    History
    <Date>          <Author>            <Description>
    03/03/2020      Joaquin Vera        Initial version
    */
    changePasswordButtonClicked : function (component, event, helper) {
        component.set("v.isChangingPassword", true);
    },

    


})