({
    

    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Launches when the save button is clicked
    History
    <Date>          <Author>            <Description>
    03/03/2020      Joaquin Vera        Initial version
    */
    saveEditClicked : function (component, event, helper) 
    { 
        helper.handleSave(component,event,helper);
        
    },

    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Launches when the cancel button is clicked
    History
    <Date>          <Author>            <Description>
    03/03/2020      Joaquin Vera        Initial version
    */
   cancelEditClicked : function (component, event, helper) 
   {
       helper.handleCancel(component,helper);
       
   }
})