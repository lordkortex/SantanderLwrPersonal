/*Author:           Teresa Santos
    Company:        Deloitte
    Description:    Function to display only the necessary rows in the tables
    History
    <Date>			<Author>			<Description>
	29/01/2020		Teresa Santos		     Initial version
	*/


    ({ 
        hideDelete: function (component, helper) {
            component.set('v.modalDeleteInfo.showDeleteModal', false);
        }
    })