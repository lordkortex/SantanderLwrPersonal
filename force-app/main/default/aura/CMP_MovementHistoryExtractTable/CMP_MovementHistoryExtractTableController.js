({
    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to get the data table about extracts.
    History
    <Date>			<Author>			<Description>
	26/12/2019		Pablo Tejedor   	Initial version
	*/
	doInit : function(component, event, helper) {
		helper.getExtractDataTable(component, event, helper);
    },
    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to sort the columns of the extract table.
    History
    <Date>			<Author>			<Description>
	26/12/2019		Pablo Tejedor   	Initial version
	*/
	sortBy : function(component, event, helper) {

        try {
            //Retrieve the field to sort by
            if(event.target.id != null && event.target.id != "" && event.target.id != undefined){
        
				var sortItem = "v.sort" + event.target.id;
                var sorted =helper.sortBy(component,sortItem,helper, event.target.id);
        
                if (sorted != undefined && sorted !=null){
        
                    component.set("v.dataExtract",sorted);
        
                    //Update the sort order
                    if( component.get(sortItem) == 'asc'){
                        component.set(sortItem,'desc');
                    }else{
                        component.set(sortItem,'asc');
                    }
                    component.set("v.currentPage",1);

                    component.find("pagination").buildData(component.get("v.currentPage"));
                }
            }
        } catch (e) {
            console.error(e);
        }
    
    },
    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function use in the pagination for the extract table.
    History
    <Date>			<Author>			<Description>
	26/12/2019		Pablo Tejedor   	Initial version
	*/
    buildTableData : function(component, event, helper){
        try {
            var json = component.get("v.dataExtract");
            var currentPage = event.getParam("currentPage");
            var oldPage = component.get("v.oldPage");
            var perPage = component.get("v.paymentsPerPage");
            var start = component.get("v.start");
            

            if (currentPage != null && currentPage != undefined && currentPage != '' && oldPage!=currentPage){
                //Update the index of dataset to display
                if(currentPage >oldPage && currentPage!=1){
                    component.set("v.start",perPage*currentPage-perPage);
                    if(Math.ceil(json.length/currentPage) >= perPage){
                        component.set("v.end",perPage*currentPage);
                    }else{
                        component.set("v.end",json.length);
                    }
                }else{
                    component.set("v.end",start);
                    if(currentPage==1){ 
                        component.set("v.start",0);
                        component.set("v.end",perPage);

                    }else{
                        component.set("v.start",start-perPage);
                    }
                }
                component.set("v.oldPage",currentPage);

                //Update a set of the paginated data
                var paginatedValues=[];
                for(var i= component.get("v.start");i<=component.get("v.end");i++){
                    paginatedValues.push(json[i]);
                }

                component.set("v.paginatedHistoryExtract",paginatedValues);
            }
        } catch(e) {
            console.error(e);
        }
    },

     /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to refresh the data of the table
                    when a new search is performed
    History
    <Date>			<Author>			<Description>
	31/12/2019		Pablo Tejedor   	Initial version
	*/
    fireNewSearch : function(component, event, helper){
        console.log("FIRE NEW SEARCH");
        var params = event.getParams();
        //console.log("PARAMS:" + JSON.stringify(params));
        if(params.accountNumber != null && params.dateTo != null ){
            component.set("v.displayDownloadIcon", true);
            helper.refreshTableData(component, params, helper);
         
        }else{
            component.set("v.displayNoResultsMessage", true);
            component.set("v.displayDownloadIcon", false);
        }
       
    }

})