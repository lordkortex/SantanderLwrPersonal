({
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to getURLParams
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

    doInit : function(component, event, helper) {
  		helper.getURLParams(component,event,helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get filters
    History
    <Date>			<Author>		<Description>
    22/01/2019		R. Alexander Cervino     Initial version*/

    getFilters : function(component, event, helper) {
        component.set("v.filters",event.getParam('filters'));
    }
})