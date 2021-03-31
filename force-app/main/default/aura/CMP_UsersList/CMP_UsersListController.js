({
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Function to show the required batch of rows in the table
    History
    <Date>			<Author>			<Description>
    16/01/2020		Joaquin Vera     Initial version
    */

    buildTablePage : function(component, event, helper){
        try {
            var json = component.get("v.usersList");
            var currentPage = event.getParam("currentPage");
            var oldPage = component.get("v.oldPage");
            var perPage = component.get("v.usersPerPage");
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

                component.set("v.paginatedUsers",paginatedValues);
            }
        } catch(e) {
            console.error(e);
        }
    },

        /*
	Author:         Joaquin Vera Valles
    Company:        Deloitte
    Description:    Function to sort the columns of the extract table.
    History
    <Date>			<Author>			    <Description>
	16/01/2020		Joaquin Vera Valles   	Initial version
	*/
	sort : function(component, event, helper) {

        try {
            //Retrieve the field to sort by
            if(event.target.id != null && event.target.id != "" && event.target.id != undefined){
				var sortItem = "v.sort" + event.target.id;
                var sorted =helper.sortBy(component,sortItem,helper, event.target.id);
        
                if (sorted != undefined && sorted !=null){
        
                    component.set("v.usersList",sorted);
        
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
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method that launches everytime the pagination is changed
    History
    <Date>          <Author>            <Description>
    20/01/2019      Joaquin Vera        Initial version
    */
    paginationChange : function(component, event, helper) {

        helper.buildPagination(component,event,helper);
    },

	/*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    When a row button is clicked, this method is triggerd
    History
    <Date>          <Author>            <Description>
    22/01/2019      Joaquin Vera        Initial version
    */
   handleButtonClick : function(component, event, helper) {
    var whichButton = event.currentTarget.id;
    var index = parseInt(whichButton.split('-')[1]);
    console.log(index);
    var profileButtonClicked = whichButton.includes("profileButton");
    var modifyButtonClicked = whichButton.includes("modifyButton");
    var viewButtonClicked = whichButton.includes("viewButton");
    var regeneratePasswordButtonClicked = whichButton.includes("regeneratePasswordButton");
    var deleteButtonClicked = whichButton.includes("deleteButton");

    var buttonClickedEvent = component.getEvent("ListClickedEvent");
    if(buttonClickedEvent){
        buttonClickedEvent.setParams({
                                        "profileButtonClicked" : profileButtonClicked,
                                        "modifyButtonClicked" : modifyButtonClicked,
                                        "viewButtonClicked" : viewButtonClicked,
                                        "regeneratePasswordButtonClicked" : regeneratePasswordButtonClicked,
                                        "deleteButtonClicked" : deleteButtonClicked,
                                        "userInteraction" : component.get("v.usersList")[index]
                                    });
        buttonClickedEvent.fire();
    }
}
    
})