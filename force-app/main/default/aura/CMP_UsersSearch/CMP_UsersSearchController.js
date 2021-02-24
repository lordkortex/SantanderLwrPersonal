({
    
     /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method to handle the component init.
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
   doInit : function(component, event, helper) 
   {
        helper.handleInit(component, event, helper) ;
       
   },


    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Saving data on blur in any input field
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    saveData : function(component, event, helper) 
    {
        var id = event.currentTarget.id;
        var value = event.currentTarget.value;
        if(id == 'inputUserId') 
        {
            component.set("v.inputId", value);
        } else if( id == 'inputName') 
        {
            component.set("v.inputName", value);
        } else if( id == 'inputSurname')
        {
            component.set("v.inputSurname", value);
        }
        if(value != "" && value != " ") {
            helper.refreshPills(component, event, helper, id , value);
        } else{
            helper.removePill(component, event, helper, id);
        }
        
    },
    
        /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    CLears variables when clear button is clcked
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    clear : function (component, event, helper) 
    {
        component.set("v.inputId" , "");
        component.set("v.inputName", "");
        component.set("v.inputSurname", "");

        component.set("v.selectedState" , null);
        component.set("v.selectedRole", null);
        component.set("v.selectedGroup", null);
        component.set("v.selectedTypeOfUser" , null);
        component.set("v.pillsContainer", []);
    },


        /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Launches the event for filtering the data.
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    filter : function(component, event, helper) {

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
    },

        /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    This method is fired when a dropdown changed a value.
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    DropdownValueChanged : function(component, event, helper) {
        var dropdown = event.getSource().getLocalId();
        var value = event.getParam("selectedValues")[0];
        if(value != null) {
            if(!value.includes($A.get("$Label.c.selectOne"))){
                helper.refreshPills(component, event, helper, dropdown, value);
            } else{
                helper.removePill(component, event, helper, dropdown);
            }
        }
    },

    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    This method is fired when a pill is removed.
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    removePill : function(component, event, helper) {
        var oldList = component.get("v.pillsContainer");
        var newList = [];
        var pillToDelete = event.getParam("currentPill");


        for(var item in oldList){
            var actualItem = oldList[item];
            if(actualItem != undefined) {
                if(pillToDelete == actualItem.key) {
                    newList.push(undefined);
                } else{
                    newList.push(actualItem);
                } 
            } else{
                newList.push(undefined);
            }
            
        }
        component.set("v.pillsContainer", newList);

        helper.removePill(component, event, helper, pillToDelete);

    }






})