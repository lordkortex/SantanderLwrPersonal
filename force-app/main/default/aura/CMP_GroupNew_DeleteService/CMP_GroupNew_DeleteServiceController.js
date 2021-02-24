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
        }
    })