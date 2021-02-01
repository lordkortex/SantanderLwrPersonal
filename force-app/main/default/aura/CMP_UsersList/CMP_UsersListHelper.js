({
        /*
	Author:         Joaquin Vera Valles
    Company:        Deloitte
    Description:    Function to sort the columns of the users page.
    History
    <Date>			<Author>			<Description>
	16/01/2019		Joaquin Vera Valles   	Initial version
	*/
	sortBy : function(component,sortItem, helper, sortBy){
        try {
            var order = component.get(sortItem);
            if(order !='' && order != null && order !=undefined){
				var data = component.get("v.usersList");
                if(data != null && data != undefined){
					var sort;
					//SORT by DESC
                    if(order=='desc'){
						//For sort by userId colum
                        if(sortBy == 'UserId'){				 
							sort = data.sort((a,b) => (a.userId > b.userId) ? 1 : ((b.userId > a.userId) ? -1 : 0));
						}//For sort by type colum
						else if(sortBy == 'Type'){
							sort = data.sort((a,b) => (a.type_Z > b.type_Z) ? 1 : ((b.type_Z > a.type_Z) ? -1 : 0));
						}//For sort by state colum
						else if(sortBy == 'State'){
							sort = data.sort((a,b) => (a.state > b.state) ? 1 : ((b.state > a.state) ? -1 : 0));
                        }
					}//SORT by ASC
					else{
						//For sort by userId colum
                        if(sortBy == 'UserId'){
							sort = data.sort((a,b) => (a.userId < b.userId) ? 1 : ((b.userId < a.userId) ? -1 : 0));	
						}//For sort by type colum
						else if(sortBy == 'Type'){
							sort = data.sort((a,b) => (a.type_Z < b.type_Z) ? 1 : ((b.type_Z < a.type_Z) ? -1 : 0));	
						}//For sort by state colum
						else if(sortBy == 'State'){
							sort = data.sort((a,b) => (a.state < b.state) ? 1 : ((b.state < a.state) ? -1 : 0));	
                        }
                    }
                    return sort;
                }
            }
        } catch(e) {
            console.error(e);
        }
    },
    /*Author:       Joaquin Vera
    Company:        Deloitte
    Description:    Function to display the pagination properly
    History
    <Date>			<Author>			<Description>
	15/01/2020		Joaquin Vera     Initial version
	*/
    buildPagination : function(component, event, helper) {
        // Build pagination
        var end;
        var response = component.get("v.usersList");
                
        if(response.length<component.get("v.usersPerPage")){
            end=response.length;
        }else{
            end=component.get("v.usersPerPage");
        }

        component.set("v.end",end);

        var paginatedValues=[];

        for(var i= component.get("v.start");i<=component.get("v.end");i++){
            paginatedValues.push(response[i]);
        }

        component.set("v.paginatedUsers",paginatedValues);

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
    }
})