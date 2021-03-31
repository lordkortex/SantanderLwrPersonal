({
    /*Author:       Adrian Muñio
    Company:        Deloitte
    Description:    Init method.
    <Date>			<Author>		<Description>
	26/06/2020		Adrian Muñio    Initial version*/
    doInit : function(component, event, helper) {
        helper.getCurrency(component,event,helper);
    },

	/*Author:       Adrian Muñio
    Company:        Deloitte
    Description:    Method to clear the fields.
    <Date>			<Author>		<Description>
	26/06/2020		Adrian Muñio    Initial version*/
    clearButton : function(component, event, helper) {
        helper.clear(component, event, helper);
    },
    
	/*Author:       Adrian Muñio
    Company:        Deloitte
    Description:    Method to search the conversion.
    <Date>			<Author>		<Description>
	26/06/2020		Adrian Muñio    Initial version*/
	searchButton : function(component, event, helper) {
        
        //MESSAGE CLEAN
        helper.showHideMessage(component, helper, 'errorText', null);
        helper.showHideMessage(component, helper, 'successText', null);

        //SAVE FIELD VALUES
        helper.saveValues(component, event, helper);
        
        //VALIDATIONS
        helper.validateValues(component, event, helper, false);

        //CALL FUNCTION
        if(component.get("v.validValues")){
            helper.search(component, event, helper);
        }
    },
    
    /*Author:       Adrian Muñio
    Company:        Deloitte
    Description:    Method to create the conversion.
    <Date>			<Author>		<Description>
	26/06/2020		Adrian Muñio    Initial version*/
    createButton : function(component, event, helper) {
        
        //MESSAGE CLEAN
        helper.showHideMessage(component, helper, 'errorText', null);
        helper.showHideMessage(component, helper, 'successText', null);

        //SAVE FIELD VALUES
        helper.saveValues(component, event, helper);
        
        //VALIDATIONS
        helper.validateValues(component, event, helper, true);

        //CALL FUNCTION
        if(component.get("v.validValues")){
            helper.create(component, event, helper);
        }
    },
    
	/*Author:       Adrian Muñio
    Company:        Deloitte
    Description:    Method to update the conversion.
    <Date>			<Author>		<Description>
	26/06/2020		Adrian Muñio    Initial version*/
    updateButton : function(component, event, helper) {
        
        //MESSAGE CLEAN
        helper.showHideMessage(component, helper, 'errorText', null);
        helper.showHideMessage(component, helper, 'successText', null);

        //SAVE FIELD VALUES
        helper.saveValues(component, event, helper);
        
        //VALIDATIONS
        helper.validateValues(component, event, helper, false);

        //CALL FUNCTION
        if(component.get("v.validValues")){
            helper.update(component, event, helper);
        }
	},
	
	/*Author:       Adrian Muñio
    Company:        Deloitte
    Description:    Method to delete the conversion.
    <Date>			<Author>		<Description>
	26/06/2020		Adrian Muñio    Initial version*/
    deleteButton : function(component, event, helper) {
       
        //MESSAGE CLEAN
       helper.showHideMessage(component, helper, 'errorText', null);
       helper.showHideMessage(component, helper, 'successText', null);

       //SAVE FIELD VALUES
       helper.saveValues(component, event, helper);
       
       //VALIDATIONS
       helper.validateValues(component, event, helper, false);

       //CALL FUNCTION
        if(component.get("v.validValues")){
            helper.delete(component, event, helper);
        }
	}
})