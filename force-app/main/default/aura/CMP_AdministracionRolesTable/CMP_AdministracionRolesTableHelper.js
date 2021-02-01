({
	/*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to fetch the data from the server
    History
    <Date>			<Author>			<Description>
	26/12/2020		Pablo Tejedor   	Initial version
	*/
	fillTableData : function(component, event, helper) {
		
		component.find("Service").callApex2(component, helper,"c.getAdministracionRolesData", {}, this.getDataTable);
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to set the table component with the fetched data
    History
    <Date>			<Author>			<Description>
	09/02/2020		Guillermo Giral   	Initial version
	*/
	getDataTable: function(component, event, response){
		console.log(JSON.stringify(response));
		component.set("v.tableData", response);
	}
})