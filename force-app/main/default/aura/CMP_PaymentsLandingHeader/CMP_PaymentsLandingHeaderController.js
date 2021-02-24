({
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Select Sigle tab
    History
    <Date>			<Author>			<Description>
	28/05/2020		Shahad Naji   		Initial version
    */
	selectSigleTab : function(component, event, helper) {
		component.set('v.isSingleTabSelected', true);
	},
    
        /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Select Multiple tab
    History
    <Date>			<Author>			<Description>
	28/05/2020		Shahad Naji   		Initial version
    */    
    selectMultipleTab : function(component, event, helper) {
		component.set('v.isSingleTabSelected', false);
    },
    
      /*
	Author:        	Beatrice Hill
    Company:        Deloitte
	Description:    Method to display payment methods modal (CMP_PaymentsMethodModal)
    History
    <Date>			<Author>			<Description>
	15/06/2020		Beatrice Hill       Initial version
    26/06/2020		Shahad Naji			Hide page scroll
    */
    openMethodModal : function(component, event, helper) {
        //page name body class: comm-page-custom-landing-payments
        document.querySelector(".comm-page-custom-landing-payments").style.overflow = 'hidden';
        component.set('v.showMethodModal', true);
    },

})