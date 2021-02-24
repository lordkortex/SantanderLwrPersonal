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
    }

})