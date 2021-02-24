({
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to set the pages number
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

    setPagesNumber : function(component, event, helper) {

        try {
            var totalPages = event.getParam('arguments').allDataReceived;
            var oldCurrentPage = component.get("v.currentPage");
            var oldCurrentPageInt = component.get("v.currentPageInt");

            if(totalPages != null && totalPages != '' && totalPages != undefined){
                if(component.get("v.maximumRecords")==0){
                    component.set("v.totalRetrieved",totalPages.length);
                }else{
                    component.set("v.totalRetrieved",component.get("v.maximumRecords"));

                }
                var pageList = [];
                var pages =Math.ceil(totalPages.length/component.get("v.paymentsPerPage"));
                if(pages > 1){
                for( var i =1;i<=pages;i++){
                        pageList.push(i.toString());
                }
                }else{
                    pageList.push('1');
                }
                //Obtain the number of pages
                component.set("v.pageList", pageList);
        
                //Set the index of pages to display
                if(pages <= component.get("v.pagesToShow")){
                    component.set("v.end",component.get("v.pagesToShow"));
                }else{
                    component.set("v.end",pages);
                }
                
                //Configure the number of records displayed per page
                if(component.get("v.totalRetrieved")<=component.get("v.paymentsPerPage")){
                    component.set("v.retrievedSeen",component.get("v.totalRetrieved"));
                }else if(parseInt(component.get("v.currentPage"))!=component.get("v.pageList").length){
                    component.set("v.retrievedSeen",component.get("v.paymentsPerPage"));
                }else{
                    component.set("v.retrievedSeen",component.get("v.totalRetrieved")-component.get("v.paymentsPerPage")*(parseInt(component.get("v.currentPage"))-1));
                }
                
                if(component.get("v.isIAM")){
                    if(component.get("v.isFirstLoad")){
                        component.set("v.currentPage",'1');
                        component.set("v.currentPageInt",1);
                        component.set("v.isFirstLoad", false);

                    }else{
                        
                        if(oldCurrentPageInt <= pages){
                            component.set("v.dropdownCurrentPage",  (oldCurrentPageInt - 1).toString());
                            component.set("v.currentPage",          null);
                            component.set("v.currentPage",          (oldCurrentPageInt - 1).toString());
                            component.set("v.currentPageInt",        oldCurrentPageInt - 1);
                            this.nextPage(component, event, helper);
                        }
                    }

                }else{
                    if(!component.get("v.setCurrentPageNumber")){
                        component.set("v.currentPage",'1');
                        component.set("v.currentPageInt",1);
                    }
                }
            }
        } catch (e) {
            console.error(e);
        }
    },

     /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to configure the communication with SwitPaymentTable CMP
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

    buildData : function (component, event, helper){

        try {
            var currentPage;
            var currentPageInitial=component.get("v.currentPage");

            if(event.getParam('arguments')!=undefined){
                currentPage=event.getParam('arguments').currentPage;
                component.set("v.currentPage",currentPage.toString());
                component.set("v.currentPageInt",currentPage);
            }else{
                currentPage=component.get("v.currentPage");
            }
            
            component.set("v.currentPageInt",parseInt(component.get("v.currentPage")));

            //Configure the number of records displayed per page
            if(component.get("v.totalRetrieved")<=component.get("v.paymentsPerPage")){
                component.set("v.retrievedSeen",component.get("v.totalRetrieved"));
            }else if(parseInt(component.get("v.currentPage"))!=component.get("v.pageList").length){
                component.set("v.retrievedSeen",component.get("v.paymentsPerPage"));
            }else{
                component.set("v.retrievedSeen",component.get("v.totalRetrieved")-component.get("v.paymentsPerPage")*(component.get("v.currentPage")-1));
            }
            
            
            //Call the event to send the current page number to the SwiftPaymentTable CMP
            var cmpEvent = component.getEvent("getPageEvent"); 
            //Set event attribute value
            cmpEvent.setParams({
                "currentPage" : parseInt(component.get("v.currentPage"))
            }); 
            //If max number of records are showed --> 1000 records = 20 pages
            if(component.get("v.currentPage") != '20'){
                cmpEvent.fire();
            }  
            

            /*if(currentPage=='1'){
                component.set("v.start",0);
                if(component.get("v.pageList").length>component.get("v.pagesToShow")){
                    component.set("v.end",component.get("v.pagesToShow"));
                }else{
                    component.set("v.end",component.get("v.pageList").length);
                }
                //component.find("paginationDropdown").updateSelection([currentPageInitial]);
            }*/
        } catch (e) {
            console.error(e);
        }
        
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to implement the previous page action
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

    previousPage : function(component,event,helper){

        try {
            var currentPage=parseInt(component.get("v.currentPage"));
            var pages=component.get("v.pageList").length; 
    
            if(component.get("v.pagesToShow")!=pages){
                var start=component.get("v.start");
                var end=component.get("v.end");
                if(start>0){
                    component.set("v.start",start-1);
                    component.set("v.end",end-1);
                }
            }
    
            //Set the new pages index
            if(currentPage>1){
                component.set("v.currentPage",(currentPage-1).toString());                  
            }
            console.log(component.get("v.currentPage"));   
        } catch(e) {
            console.error(e);
        }
       
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to implement the next page action
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

    nextPage : function(component,event,helper){

        try {
            var currentPage=parseInt(component.get("v.currentPage"));
            var pages=component.get("v.pageList").length;
    
            if(component.get("v.pagesToShow")!=pages){
                var start=component.get("v.start");
                var end=component.get("v.end");
                if(end!=pages){
                    component.set("v.start",start+1);
                    component.set("v.end",end+1);
                }
            }
    
            //Set the new pages index
            if(currentPage<pages){
                component.set("v.currentPage",(currentPage+1).toString());  
            }
            
            var start=component.get("v.start");
            var end=component.get("v.end");
            console.log(component.get("v.currentPage"));
        } catch(e){
            console.error(e);
        } 
    },
    
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get the selected current page
    History
    <Date>			<Author>		<Description>
    19/12/2019		R. Alexander Cervino     Initial version*/

    selectedCurrentPage : function(component, event, helper) {
        try{
            var recId = component.get("v.dropdownCurrentPage");

            if(recId!=undefined){

                component.set("v.currentPage",recId);
                var pages=component.get("v.pageList").length;
                
                if(component.get("v.pagesToShow")!=pages){
                    if(parseInt(recId)!=pages){
                        if(parseInt(recId)>=pages-component.get("v.pagesToShow")+1){
                            component.set("v.start",pages-component.get("v.pagesToShow")+1-1);
                            component.set("v.end",pages);
                        }else{
                            component.set("v.start",parseInt(recId)-1);
                            component.set("v.end",parseInt(recId)+2);
                        }
                    }else{
                        component.set("v.start",parseInt(recId)-component.get("v.pagesToShow"));
                        component.set("v.end",parseInt(recId));
                    }
                }
            }

        } catch (e) {
            console.log(e);
        }
    },

    
     /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to reinit the pagination
    History
    <Date>			<Author>		<Description>
    09/01/2020		R. Alexander Cervino     Initial version*/

    reInitPagination : function (component, event, helper){

        try {
            var currentPage;
            var currentPageInitial=component.get("v.currentPage");

            if(event.getParam('arguments')!=undefined){
                currentPage=event.getParam('arguments').currentPage;
            }

            component.set("v.currentPage",currentPage);
            
        } catch (e) {
            console.error(e);
        }
        
    },
})