({
    doInit : function(component, event, helper) {
        helper.getStatuses(component, event, helper);
        helper.getCountries(component, event, helper);
        helper.getAccounts(component, event, helper);

    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get the selected status
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    selectedStatus : function(component, event, helper) {
        helper.selectedStatus(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get the selected currency
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    selectedCurrency : function(component, event, helper) {
        helper.selectedCurrency(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get the selected Country
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    selectedCountry : function(component, event, helper) {
        helper.selectedCountry(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to clear the filters
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    clear : function(component, event, helper) {
        helper.clear(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to apply the filters
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    apply : function(component, event, helper) {
        helper.apply(component,event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to refresh the pills
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    refreshPills : function(component, event, helper) {
        helper.refreshPills(component,event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to open the search filters
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    openSearch : function(component, event, helper) {
        helper.openSearch(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to validate the dates
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    validateDate : function(component, event, helper) {    
        helper.validateDate(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Methos to remove a single pill
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    removePill : function(component, event, helper) {
        helper.removePill(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to validate the settled amounts
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    validateSettled : function(component, event, helper) {
        helper.validateSettled(component, event, helper);
    }
})