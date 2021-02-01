({
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to init the pages number
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/
    
    initPagination : function(component, event, helper) {
        helper.setPagesNumber(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to implement the next page action
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

    nextPage : function(component,event,helper){
        helper.nextPage(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to implement the previous page action
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

    previousPage : function(component,event,helper){
        helper.previousPage(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to display the sorted/filtered/paginated data values
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

    buildData : function(component, event, helper){
        helper.buildData(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to select currentPage
    History
    <Date>			<Author>		<Description>
    19/12/2019		R. Alexander Cervino     Initial version*/

    selectedCurrentPage : function(component, event, helper){
        helper.selectedCurrentPage(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to reinit the pagination
    History
    <Date>			<Author>		<Description>
    09/01/2020		R. Alexander Cervino     Initial version*/

    reInitPagination : function (component, event, helper){
        helper.reInitPagination(component, event, helper);
    }
})