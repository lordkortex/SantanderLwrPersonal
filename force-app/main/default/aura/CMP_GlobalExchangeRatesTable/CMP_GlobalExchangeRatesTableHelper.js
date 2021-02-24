({
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to format date
    History
    <Date>			<Author>			<Description>
	19/04/2020		Guillermo Giral   	Initial version
    22/04/2020		Shahad Naji 		Format date in Helper instead on in Contoroller
    */
    formatDate: function(component, event){
        var lmdate = component.get("v.eRatesLastModifiedDate");
        var lmdateMain = component.get("v.eRatesLastModifiedDateMain");
        if(lmdate != undefined && lmdate != ''){
            //component.set("v.upToDate", new Date(lmdate.split(' ')[0]).toISOString());
            component.set("v.upToDate", lmdateMain);
            component.set("v.upToHour", lmdate.split(' ')[1].substring(0,5));
        }
    }
})