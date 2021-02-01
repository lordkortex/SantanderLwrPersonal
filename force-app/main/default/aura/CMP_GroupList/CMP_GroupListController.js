({
    /*Author:       Guillermo Giral
    Company:        Deloitte
    Description:    Function to display the pagination properly
    History
    <Date>			<Author>			<Description>
	10/01/2020		Guillermo Giral     Initial version
	*/
    paginationChange : function(component, event, helper) {
        // Build pagination
        var end;
        var response = component.get("v.groupList");
                
        if(response.length<component.get("v.groupsPerPage")){
            end=response.length;
        }else{
            end=component.get("v.groupsPerPage");
        }

        component.set("v.end",end);

        var paginatedValues=[];

        for(var i= component.get("v.start");i<=component.get("v.end");i++){
            console.log(response[i]);
            paginatedValues.push(response[i]);
        }

        component.set("v.paginatedGroups",paginatedValues);

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

    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to show the required batch of rows in the table
    History
    <Date>			<Author>			<Description>
    10/01/2019		Guillermo Giral     Initial version
    */

    buildTablePage : function(component, event, helper){
        try {
            var json = component.get("v.groupList");
            var currentPage = event.getParam("currentPage");
            var oldPage = component.get("v.oldPage");
            var perPage = component.get("v.groupsPerPage");
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

                component.set("v.paginatedGroups",paginatedValues);
                console.log(JSON.stringify(component.get("v.paginatedGroups")));
            }
        } catch(e) {
            console.error(e);
        }
    }
})