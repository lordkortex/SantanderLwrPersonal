({
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method to handle the component initialize.
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
   handleInit : function(component, event, helper) {
        var statesList = [ "Enabled", "Disabled", "Deleted", "Pending"];
        var rolesList = [ "Sales Manager", "Sales Director", "Service Representative", "B2B Representative", "Customer"];
        var groupsList = [ "B2B", "Sales", "Marketing", "Service"];
        var typeOfUserList = [ "Functional", "Administrator", "Advisory"];
        component.set("v.statesList " , statesList );
        component.set("v.rolesList " ,  rolesList);
        component.set("v.groupsList " ,  groupsList);
        component.set("v.typeOfUserList " ,  typeOfUserList);
   },
    
    
    
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method fired to refresh the pills.
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
   refreshPills : function(component, event, helper, id, value) {
    
        var pillsContainer = component.get("v.pillsContainer");
        
        var data = {
            key: id,
            value : value
        }

        switch(id) {
            case("inputUserId"):
                pillsContainer[0] = data;
            break;

            case("inputName"):
                pillsContainer[1] = data;
            break;

            case("inputSurname"):
                pillsContainer[2] = data;
            break;

            case("StatesDropdown"):
                pillsContainer[3] = data;
            break;

            case("RolesDropdown"):
                pillsContainer[4] = data;
            break;

            case("GroupsDropdown"):
                pillsContainer[5] = data;
            break;

            case("TypeOfUserDropdown"):
                pillsContainer[6] = data;
            break;
        }
        
        component.set("v.pillsContainer", pillsContainer); 

        if(pillsContainer.filter(dato => dato != undefined).length != 0) {
            component.set("v.showPillsArea", true);
        }
    },

    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method to delete a pill
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    removePill : function(component, event, helper, pillToRemove) {
        var pillsContainer = component.get("v.pillsContainer");

        switch(pillToRemove) {
            case("inputUserId"):
                component.set("v.inputId ", "" );
                pillsContainer[0] = undefined;
                
            break;

            case("inputName"):
                component.set("v.inputName ", "" );
                pillsContainer[1] = undefined;
            break;

            case("inputSurname"):
                component.set("v.inputSurname ", "" );
                pillsContainer[2] = undefined;
            break;

            case("StatesDropdown"):
                component.set("v.selectedState ", null );
                pillsContainer[3] = undefined;
            break;

            case("RolesDropdown"):
                component.set("v.selectedRole ", null );
                pillsContainer[4] = undefined;
            break;

            case("GroupsDropdown"):
                component.set("v.selectedGroup ", null );
                pillsContainer[5] = undefined;
            break;

            case("TypeOfUserDropdown"):
                component.set("v.selectedTypeOfUser ", null );
                pillsContainer[6] = undefined;
            break;
        }

        component.set("v.pillsContainer", pillsContainer);    
        if(!component.get("v.isSearching")){
            helper.filterData(component,event,helper);
        }

        
        if(!component.get("v.isSearching") && pillsContainer.filter(dato => dato != undefined).length == 0) {
            component.set("v.isSearching", true);
        }

        if(pillsContainer.filter(dato => dato != undefined).length == 0) {
            component.set("v.showPillsArea", false);
        }


    },
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method fired when apply button is clicked.
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    filterData : function(component, event, helper) {
    var applyClickedEvent = component.getEvent("searchUser");
    var inputId = component.get("v.inputId");
    var inputName = component.get("v.inputName");
    var inputSurname = component.get("v.inputSurname");
    var selectedState = component.get("v.selectedState");
    var selectedRole = component.get("v.selectedRole");
    var selectedGroup = component.get("v.selectedGroup");
    var selectedTypeOfUser = component.get("v.selectedTypeOfUser");

    if(applyClickedEvent){
        applyClickedEvent.setParams({
                                        "inputId" : inputId,
                                        "inputName" : inputName,
                                        "inputSurname" : inputSurname,
                                        "selectedState" : selectedState,
                                        "selectedRole" : selectedRole,
                                        "selectedGroup" : selectedGroup,
                                        "selectedTypeOfUser" : selectedTypeOfUser
                                    });
        applyClickedEvent.fire();
    }
}

    
})