({
    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to get the data talbe for the History of extracts.
    History
    <Date>			<Author>			<Description>
	26/12/2019		Pablo Tejedor   	Initial version
	*/
    doInit : function(component, event, helper) {
        /*
        setTimeout(function() {
			helper.getTableDataHelper(component,event,helper);
		}, 1000); */
        helper.getTableDataHelper(component, event, helper);
    },

    /*Author:       Pablo Tejedor
    Company:        Deloitte
    Description:    Function to show the required batch of rows in the table
    History
    <Date>			<Author>			<Description>
    09/01/2019		Pablo Tejedor     Initial version*/
    buildTableData : function(component, event, helper){
        try {
            var json = component.get("v.dataMovementHistory");
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

                component.set("v.paginatedHistory",paginatedValues);
            }
        } catch(e) {
            console.error(e);
        }
    },

    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to refresh the data of the table
                    when a new search is performed
    History
    <Date>			<Author>			<Description>
	31/12/2019		Guillermo Giral   	Initial version
	*/
    fireNewSearch : function(component, event, helper){
        console.log("FIRE NEW SEARCH");
        var params = event.getParams();
       // console.log("PARAMS:" + JSON.stringify(params));
        if(params.accountNumber != null && params.dateTo != null && params.dateFrom != null){
            component.set("v.displayDownloadIcon", true);
        helper.refreshTableData(component, params, helper);
        }else{
            component.set("v.displayNoResultsMessage", true);
            component.set("v.displayDownloadIcon", false);
        }
    }
})