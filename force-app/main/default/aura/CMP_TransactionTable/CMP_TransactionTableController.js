({
  /*
	Author:       Guillermo Giral
    Company:        Deloitte
    Description:    Function to load table if it's comes from transaction details
    History
    <Date>			<Author>			<Description>
	17/02/2020		Guillermo Giral     Initial version
	*/
    doInit: function(component, event, helper) {
      
            helper.globalBalanceInit(component,event, helper);
     
      
    },
 /*
	Author:       Guillermo Giral
    Company:        Deloitte
    Description:    Function to load data table.
    History
    <Date>			<Author>			<Description>
	17/02/2020		Guillermo Giral     Initial version
	*/
	retrieveTransactionData : function(component, event, helper) {
        helper.getTransactionData(component, helper, []);
 
	},

	/*
	Author:       Guillermo Giral
    Company:        Deloitte
    Description:    Function to show the required batch of rows in the table
    History
    <Date>			<Author>			<Description>
	17/02/2020		Guillermo Giral     Initial version
	*/

    buildTableData : function(component, event, helper){
        try {
            var json = component.get("v.transactionResults");
            var currentPage = event.getParam("currentPage");
            var oldPage = component.get("v.oldPage");
            var perPage = component.get("v.transactionsPerPage");
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

                component.set("v.paginatedTransactions",paginatedValues);
            }
        } catch(e) {
            console.error(e);
        }
        
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
     //console.log('shortbyMehtod');
        try {
            //Retrieve the field to sort by
            if(event.target.id != null && event.target.id != "" && event.target.id != undefined){
        
                var sortItem =  "v.sort" + event.target.id;
               // console.log(sortItem);
                var sorted =helper.sortBy(component,sortItem,helper, event.target.id);
        
                if (sorted != undefined && sorted !=null){
        
                    component.set("v.transactionResults.movements",sorted);
        
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
    
    populateTable : function(component, event, helper) {
            var params = event.getParam('arguments');
            if (params) {
                var accNumber = params.accountNumber;
                var accbookdate= params.bookDate;
                helper.getTransactionData(component, helper,'');
            }
        },

        /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method that launches everytime the pagination is changed
    History
    <Date>          <Author>            <Description>
    20/01/2019      Joaquin Vera        Initial version
    */
    paginationChange : function(component, event, helper) {

        helper.buildPagination(component,event,helper);
    }
    
})