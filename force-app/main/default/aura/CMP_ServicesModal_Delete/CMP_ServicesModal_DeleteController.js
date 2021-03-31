/*Author:       Teresa Santos
    Company:        Deloitte
    Description:    Function to display only the necessary rows in the tables
    History
    <Date>			<Author>			<Description>
	29/01/2020		Teresa Santos		     Initial version
	*/

    ({          
        closeButton: function (component, event, helper) {
            helper.hideDelete(component, helper);
        },
        
        noButton: function (component, event, helper) {
            helper.hideDelete(component, helper);
        },
        
        yesButton: function (component, event, helper) {
            helper.hideDelete(component, helper);
        },

        /*
    Author:         Teresa Santos
    Company:        Deloitte
    Description:    Function to delete a value
    History
    <Date>          <Author>            <Description>
    10/01/2019      Teresa Santos        Initial version
    */
    deleteService : function(component, event, helper) {
        var report = component.get("v.selectedValue");			
    
        component.set("v.servicesList", []);
        component.set("v.selectedValue", '');
        component.set("v.hasProfile", false);

        helper.hideDelete(component, helper);
        },
    })