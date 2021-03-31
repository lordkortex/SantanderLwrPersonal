({
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to set the pages number
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

    setPagesNumber : function(component, event, helper) {
        var totalPages = event.getParam('arguments').allDataReceived;

        if(totalPages != null && totalPages != '' && totalPages != undefined){
            var pageList = [];
            component.set("v.totalRetrieved",totalPages.length);
            var pages =Math.ceil(totalPages.length/component.get("v.paymentsPerPage"));
            if(pages > 1){
               for( var i =1;i<=pages;i++){
                    pageList.push(i);
               }
            }else{
                pageList.push(1);
            }
            //Obtain the number of pages
            component.set("v.pageList", pageList);
    
            //Set the index of pages to display
            if(pages >= component.get("v.pagesToShow")){
                component.set("v.end",component.get("v.pagesToShow"));
            }else{
                component.set("v.end",pages);
            }
            
            //Configure the number of records displayed per page
            if(component.get("v.totalRetrieved")<=component.get("v.paymentsPerPage")){
                component.set("v.retrievedSeen",component.get("v.totalRetrieved"));
            }else if(component.get("v.currentPage")!=component.get("v.pageList").length){
                component.set("v.retrievedSeen",component.get("v.paymentsPerPage"));
            }else{
                component.set("v.retrievedSeen",component.get("v.totalRetrieved")-component.get("v.paymentsPerPage")*(component.get("v.currentPage")-1));
            }
        }
    },

     /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to configure the communication with SwitPaymentTable CMP
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

    buildData : function (component, event, helper){

        //Configure the number of records displayed per page
        if(component.get("v.totalRetrieved")<=component.get("v.paymentsPerPage")){
            component.set("v.retrievedSeen",component.get("v.totalRetrieved"));
        }else if(component.get("v.currentPage")!=component.get("v.pageList").length){
            component.set("v.retrievedSeen",component.get("v.paymentsPerPage"));
        }else{
            component.set("v.retrievedSeen",component.get("v.totalRetrieved")-component.get("v.paymentsPerPage")*(component.get("v.currentPage")-1));
        }

        //Call the event to send the current page number to the SwiftPaymentTable CMP
        var cmpEvent = component.getEvent("getPageEvent"); 
        //Set event attribute value
        cmpEvent.setParams({
            "currentPage" : component.get("v.currentPage")
        }); 
        cmpEvent.fire(); 
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to implement the previous page action
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

    previousPage : function(component,event,helper){

        var currentPage=component.get("v.currentPage");
        var pages=component.get("v.pageList").length;

        //Set the new pages index
        if(currentPage>1){
            component.set("v.currentPage",currentPage-1);                  
        }

        if(component.get("v.pagesToShow")!=pages){
            var start=component.get("v.start");
            var end=component.get("v.end");
            if(start>0){
                component.set("v.start",start-1);
                component.set("v.end",end-1);
            }
        }
        //Alert the new current page
        helper.buildData(component, event, helper);

    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to implement the next page action
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

    nextPage : function(component,event,helper){

        var currentPage=component.get("v.currentPage");
        var pages=component.get("v.pageList").length;
        
        //Set the new pages index
        if(currentPage<pages){
            component.set("v.currentPage",currentPage+1);                  
        }
        if(component.get("v.pagesToShow")!=pages){
            var start=component.get("v.start");
            var end=component.get("v.end");
            if(end!=pages){
                component.set("v.start",start+1);
                component.set("v.end",end+1);
            }
        }
        //Alert the new current page
        helper.buildData(component, event, helper);

    }
})