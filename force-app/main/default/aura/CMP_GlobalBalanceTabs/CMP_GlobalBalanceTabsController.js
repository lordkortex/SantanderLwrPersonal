({
    /*
	Author:         Shahad
    Company:        Deloitte
    Description:    This method is to select "LastUpdateTab" tab
    History
    <Date>			<Author>			<Description>
	23/12/2019		Shahad Naji     	Initial version
	*/
    LastUpdateTab : function(component, event, helper){
        helper.selectTab(component, "LastUpdateTab", "EndOfDayTab");
    },
    /*
	Author:         Shahad
    Company:        Deloitte
    Description:    This method is to select "EndOfDayTab" tab
    History
    <Date>			<Author>			<Description>
	23/12/2019		Shahad Naji     	Initial version
	*/
    EndOfDayTab : function(component, event, helper){            
        helper.selectTab(component, "EndOfDayTab", "LastUpdateTab");  
    }
})