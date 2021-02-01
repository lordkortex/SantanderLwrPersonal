({
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get the user name
    History
    <Date>			<Author>		<Description>
    27/02/2020		R. Alexander Cervino     Initial version*/

    doInit : function(component, event, helper) {
        helper.getUserInfo(component, event, helper);
    },

    /*Author:       Adrian Muñio
    Company:        Deloitte
    Description:    Method to call the goTo Helper Method
    History
    <Date>			<Author>		<Description>
    17/06/2020		Adrian Muñio     Initial version*/

    openPaymentUETRTrack : function(component, event, helper){
        helper.goTo(component, event,"payment-uetr-track");
    }
})