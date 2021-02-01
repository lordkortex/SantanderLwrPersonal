({
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function used to collapse or expand all the rows in the profiling table
    History
    <Date>			<Author>			<Description>
	27/01/2020  	Guillermo Giral   	Initial version
	*/
    expandOrCollapseData : function(component, event, helper) {
        component.set("v.dataExpanded" , !component.get("v.dataExpanded"));
        var event = $A.get("e.c:EVT_ServiceProfilingDisplayTableChange");
        event.fire();
    },

    /*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function used to remove all data in the profiling tables
    History
    <Date>			<Author>			<Description>
	18/02/2020  	Guillermo Giral   	Initial version
	*/
    removeAllData : function(component, event, helper) {
        component.set("v.dataExpanded" , false);
        var event = $A.get("e.c:EVT_ServiceProfilingDisplayTableChange");
        event.setParam("removeAllData", true);
        event.fire();
    }
})