({

/*
	Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Function to populate the component data on its initialization
    History
    <Date>			<Author>			<Description>
	22/04/2020		Joaquin Vera   	Initial version
	*/
    doInit : function(component,event,helper)
    {
        helper.handleDoInit(component, event, helper);
    },



	/*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to populate the component data on its initialization
    History
    <Date>			<Author>			<Description>
	26/12/2019		Guillermo Giral   	Initial version
	*/
	searchLogs : function(component, event, helper) {		

		//$A.util.removeClass(component.find("spinner"), "slds-hide");  
		component.set("v.userId", document.getElementById("text-input-id-1").value);
		component.set("v.keyWords", document.getElementById("text-input-id-2").value);

		var data = {
			"userid" : component.get("v.userId"),
			"keywords" : component.get("v.keyWords"),
			"typelogs" : component.get("v.selectedLog"),
            "dates" : component.get("v.dates"),
            "dateFrom" : component.get("v.dateFrom"),
            "dateTo" : component.get("v.dateTo")
		};

		component.set("v.searchData", data);

		helper.getLogsData(component, helper, data);
	},

	/*Author:       Guillermo Giral
    Company:        Deloitte
    Description:    Function to show the required batch of rows in the table
    History
    <Date>			<Author>			<Description>
    09/01/2019		Guillermo Giral     Initial version*/

    buildTableData : function(component, event, helper){
        try {
            var json = component.get("v.tableData");
            var currentPage = event.getParam("currentPage");
            var oldPage = component.get("v.oldPage");
            var perPage = component.get("v.logsPerPage");
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

                component.set("v.paginatedLogs",paginatedValues);
            }
        } catch(e) {
            console.error(e);
        }
    }
})