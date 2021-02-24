/* Author:       	 Diego Asis
     Company:        Deloitte
     Description:    Function to display only the necessary rows in the tables
     History
     <Date>			<Author>			<Description>
 	 30/01/2020		Diego Asis		     Initial version
*/
({
    //The following method sets the component attributes with the values of the event attributes to open the delete authorization modal
    modalDelete : function(component, event, helper) {
        var params = event.getParams();
        
        if(params.showDeletePopup == true){
            component.set("v.title", params.title);
            component.set("v.firstDescription", params.firstDescription);
            component.set("v.secondDescription", params.secondDescription);
            component.set("v.showDeletePopup", params.showDeletePopup);
        }
    },
    
    //The following method builds the pagination
    paginationChange : function(component, event, helper) {
        var end;
        var response = component.get("v.requestAuthorizations");
        
        if(response.length<component.get("v.authsPerPage")){
            end=response.length;
        }else{
            end=component.get("v.authsPerPage");
        }
        
        component.set("v.end",end);
        
        var paginatedValues=[];
        
        for(var i= component.get("v.start");i<=component.get("v.end");i++){
            console.log(response[i]);
            paginatedValues.push(response[i]);
        }
        
        component.set("v.paginatedAuths",paginatedValues);
        
        var toDisplay=[];
        var finish=response.length;
        
        if(response.length>1000){
            //Max logs to retrieve
            finish=1000;
        }
        
        for(var i= 0;i<finish;i++){
            toDisplay.push(response[i]);
        }
        component.find("pagination").initPagination(toDisplay);
    },
    
    //The following method builds the table page
    buildTableData : function(component, event, helper){
        try {
            var json = component.get("v.requestAuthorizations");
            var currentPage = event.getParam("currentPage");
            var oldPage = component.get("v.oldPage");
            var perPage = component.get("v.authsPerPage");
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
                
                component.set("v.paginatedAuths",paginatedValues);
            }
        } catch(e) {
            console.error(e);
        }
    }
})