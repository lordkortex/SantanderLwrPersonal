({
     /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method that launches when component is loaded
    History
    <Date>          <Author>            <Description>
    15/01/2020      Joaquin Vera        Initial version
    */
   doInit : function(component, event, helper) 
   {

    component.find("Service").retrieveFromCache(component, helper,"profileInfo", helper.handleDoInit);
    },
   

    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method to handle the title buttons 
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
   handleComponentEvent : function(component, event, helper) 
   {
    if(event.getParam("addClicked") == true) 
    {
        
        
        component.find("Service").redirect("new-user","");
    } else if(event.getParam("searchClicked") == true){
        component.set("v.isSearching", !component.get('v.isSearching'));
    }

},
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Filters the data for the table.
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    searchUser : function (component,event,helper) 
    {

        var isFilteringById = event.getParam("inputId") != "";
        var isFilteringByName = event.getParam("inputName") != "";
        var isFilteringBySurname = event.getParam("inputSurname") != "";

        var isFilteringByState= event.getParam("selectedState") != null;
        var isFilteringByRole = event.getParam("selectedRole") != null;
        var isFilteringByGroup = event.getParam("selectedGroup") !=null;
        var isFilteringByTypeOfUser = event.getParam("selectedTypeOfUser") != null;

        var finalData = component.get("v.usersList");

        if(isFilteringById) 
        {
            finalData = finalData.filter(dato => dato.userId.includes(event.getParam("inputId")));

        }
        
        if(isFilteringByName) 
        {
            finalData = finalData.filter(dato => dato.userName.includes( event.getParam("inputName")));
        }
        
        if(isFilteringBySurname) 
        {
               finalData = finalData.filter(dato => dato.userSurname.includes( event.getParam("inputSurname")));
        }
        
        if(isFilteringByState) 
        {
            finalData = finalData.filter(dato => dato.state == event.getParam("selectedState"));
        } 
        
        if(isFilteringByRole) 
        {
            finalData = finalData.filter(dato => dato.role == event.getParam("selectedRole"));
        } 

        if(isFilteringByGroup) 
        {
            finalData = finalData.filter(dato => dato.groupName == event.getParam("selectedGroup"));
        } 
        
        if(isFilteringByTypeOfUser) 
        {
            finalData = finalData.filter(dato => dato.type_Z == event.getParam("selectedTypeOfUser"));
        }

        //Set the data into the component
        component.set("v.usersFilter", finalData);
        component.set("v.isSearching", false);
        component.set("v.hasSearched", true);
    },

      /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Launches when a button is clicked
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
   rowButtonClicked : function (component,event,helper) 
   {
        component.set("v.clickedUser", event.getParam("userInteraction"));

        var profileButtonClicked = event.getParam("profileButtonClicked");
        var modifyButtonClicked = event.getParam("modifyButtonClicked");
        var viewButtonClicked = event.getParam("viewButtonClicked");
        var regeneratePasswordButtonClicked = event.getParam("regeneratePasswordButtonClicked");
        var deleteButtonClicked = event.getParam("deleteButtonClicked");

        //NOT MULESOFT ACTIONS //
        if(profileButtonClicked)
        {
            
            component.set("v.toastText", $A.get("$Label.c.Users_GeneratePassword"));
            var grupo =  (event.getParam("userInteraction").groupName  != undefined ? event.getParam("userInteraction").groupName: " ");

            
            console.log(JSON.stringify(event.getParam("userInteraction")));
            var url = "c__userId="+event.getParam("userInteraction").userId+
            "&c__userName="+event.getParam("userInteraction").userName;

                url += "&c__selectedValueGroup=" +  (event.getParam("userInteraction").groupName  != undefined ? event.getParam("userInteraction").groupName: " ");
                url += "&c__selectedValueRol=" +  (event.getParam("userInteraction").role  != undefined ? event.getParam("userInteraction").role: " ");

            component.find("Service").redirect("profile-user",url);
        }

        if(modifyButtonClicked)
        {

            url = "c__userId="+event.getParam("userInteraction").userId +
            "&c__userName=" + event.getParam("userInteraction").userName +
            "&c__userSurname=" + event.getParam("userInteraction").userSurname +
            "&c__userType=" + event.getParam("userInteraction").type_Z +
            "&c__userState=" + event.getParam("userInteraction").state;
            //Redirect to another page
            component.find("Service").redirect("new-user", url);
        }
        if(viewButtonClicked)
        {

            
            var url = "c__userId="+event.getParam("userInteraction").userId +
            "&c__userName="   + event.getParam("userInteraction").userName +
            "&c__userGroup=" + (event.getParam("userInteraction").groupName  != undefined ? event.getParam("userInteraction").groupName: " ")+ 
            "&c__userRol=" + (event.getParam("userInteraction").role  != undefined ? event.getParam("userInteraction").role: " ")+ 
            "&c__comesFrom=Users";

            component.find("Service").redirect("user-group-profile-summary",url);
        }


        //MULESOFT DEPENDENT ACTIONS //
        if(regeneratePasswordButtonClicked) {
            component.set("v.toastText", $A.get("$Label.c.Users_GeneratePassword"));
            helper.regeneratePassword(component,event,helper);
        }

        if(deleteButtonClicked) 
        {

                component.set("v.showDeleteBox", true);
                component.set("v.showToast", false);
        }

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
        component.set("v.showDeleteBox", false);
        if(event.getParam("isDeleting") == true) 
        {

        }
    }
})