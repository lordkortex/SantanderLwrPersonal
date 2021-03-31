({
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get filters
    History
    <Date>			<Author>		<Description>
    22/01/2019		R. Alexander Cervino     Initial version*/

    getFilters : function(component, event, helper) {
        var filters=event.getParam('filters');
        component.set("v.filters",filters);
        if(filters==undefined || filters==null || filters==""){
            $A.util.addClass(component.find("table"),"hidden");
        }else{
            $A.util.removeClass(component.find("table"),"hidden");
        }

        if($A.util.hasClass(component.find("table"),"hidden")==true){
            component.set("v.showTable",false);
        }else{
            component.set("v.showTable",true);
        }
    }

})