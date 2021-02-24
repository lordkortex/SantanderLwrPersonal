({
    doInit : function(component, event, helper) {
        helper.getData(component, event, helper)
    },
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Get data (filtered or not)
    History
    <Date>			<Author>		<Description>
    11/12/2019		R. Alexander Cervino     Initial version*/

    getData : function(component, event, helper) {
        try{
            $A.util.removeClass(component.find("spinner"), "slds-hide");   
            var filters=component.get("v.filters");
            //component.set("v.filters", filters);
            helper.getData(component, event, helper,filters);

            component.set("v.currentPage",1);
            component.find("pagination").buildData(component.get("v.currentPage")); 
        } catch (e) {
            console.log(e);
        }

    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to sort the data table
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

    sortBy : function(component, event, helper) {

        try {
            //Retrieve the field to sort by
            if(event.target.id != null && event.target.id != "" && event.target.id != undefined){
                var sortItem = "v.sort"+event.target.id;
                var sorted =helper.sortBy(component,sortItem,helper, event.target.id);
        
                if (sorted != undefined && sorted !=null){
        
                    component.set("v.jsonArray",sorted);
        
                    //Update the sort order
                    if( component.get(sortItem) == 'asc'){
                        component.set(sortItem,'desc');
                    }else{
                        component.set(sortItem,'asc');
                    }
                    component.set("v.currentPage",1);
                    component.find("pagination").buildData('1');
                }
            }

        } catch (e) {
            console.error(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to display the sorted/filtered/paginated data values
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

    buildData : function(component, event, helper){
        helper.buildData(component, event, helper);
    }

})