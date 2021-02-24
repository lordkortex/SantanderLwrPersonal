({
   
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
    Description:    Methos to remove a single pill
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    removePill : function(component, event, helper) {
        helper.removePill(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Methos to remove a single pill
    History
    <Date>			<Author>		<Description>
    24/01/2020		R. Alexander Cervino     Initial version*/

    openAddModal : function(component, event, helper) {
        helper.openAddModal(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    getAccoutnData
    History
    <Date>			<Author>		<Description>
    10/03/2020		R. Alexander Cervino     Initial version*/

    getAccountData : function(component, event, helper) {
        helper.getAccountData(component, event, helper);
    }
})