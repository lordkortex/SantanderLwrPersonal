({
	/*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to get call getDataContacUs method to the apex controller
    History
    <Date>			<Author>			<Description>
	17/02/2020		Pablo Tejedor   	Initial version
	*/
	getDataCS : function(component, event, helper) {
		component.find("Service").callApex2(component, helper, "c.getDataContacUs", {}, this.getDataCustomSeting);
	},


		/*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:   	method to get the values of the custom setting ContactUsPhoneMail__c.
    History
    <Date>			<Author>			<Description>
	17/02/2020		Pablo Tejedor   	Initial version
	*/
	getDataCustomSeting: function(component, helper, response) {
		if(response != null){
			component.set("v.phoneContactUs", response.phoneNumberContacUs__c );
			component.set("v.mailContactUs", response.contactUsMail__c );

		}
	}
})