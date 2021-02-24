/*Author:       Diego Asis
    Company:        Deloitte
    Description:    Function to display only the necessary rows in the tables
    History
    <Date>			<Author>			<Description>
	29/01/2020		Diego Asis		     Initial version
	*/

({ 
    //The following method shows the modal
	showModal: function (component, helper) {
		component.set('v.showModal', true);
	},

    //The following method hides the modal
	hideModal: function (component, helper) {
		component.set('v.showModal', false);
	}
})