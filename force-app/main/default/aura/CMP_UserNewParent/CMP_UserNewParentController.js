({
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method that launches when the component starts.
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    doInit : function(component, event, helper) 
    {
        var data = ['Coca Cola','Inditex','Apple','Amazon','HP'];
       component.set("v.corporatesListFront", data);
       component.set("v.corporatesListBack", data);
        helper.handleDoInit(component,event,helper);
    },

    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method that launches when a button is clicked.
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    buttonClicked : function(component, event, helper) 
    {
        var bt = event.getParam("buttonClicked");
        if(bt == "SaveButton") 
        {
            helper.checkFields(component,event,helper);

        }
    },
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method that launches when a button is clicked in the confirm modal
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    deletionConfirmed : function(component, event, helper) 
    {

        if(event.getSource().getLocalId() == "ConfirmCreationModal")
        {
            var bt = event.getParam("isDeleting");

            component.set("v.showModal", false);
            var url =  "c__showToast=true";
            //console.log(component.get("v.userIdInput"));
            if(bt) 
            {
                if(component.get("v.userIdInput") == undefined ){
                    url = 'c__userId=' + component.get("v.userInfo.userId") + 
                    '&c__userName=' + component.get("v.userInfo.userName") + 
                    '&c__comesFrom=' + 'Creation';
                    component.find("Service").redirect("profile-user", url);
                    
                }else{
                    component.find("Service").redirect("users", url);
                }
               
            } 
        }
        
    }
    
})