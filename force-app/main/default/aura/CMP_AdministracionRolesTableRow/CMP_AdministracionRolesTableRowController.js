({
	/*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to clear the value of the rol alias input
    History
    <Date>			<Author>			<Description>
	09/02/2020		Guillermo Giral   	Initial version
	*/
	clearRolAlias : function(component){
		component.set("v.rowData.rolAlias", "");
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to update the table data with the rol alias value
    History
    <Date>			<Author>			<Description>
	09/02/2020		Guillermo Giral   	Initial version
	*/
	updateRowData : function(component, event){
		component.set("v.rowData.rolAlias", event.currentTarget.value);
	}
})