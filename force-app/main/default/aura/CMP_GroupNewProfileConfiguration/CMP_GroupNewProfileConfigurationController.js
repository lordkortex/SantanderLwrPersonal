({
	/*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function use to collapse the section
    History
    <Date>			<Author>			<Description>
	27/01/2020  	Guillermo Giral   	Initial version
	*/
	collapseSection : function(component, event, helper) {
		component.set("v.isExpandedSection", false);
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function use to expand the section
    History
    <Date>			<Author>			<Description>
	27/01/2020  	Guillermo Giral   	Initial version
	*/
	expandSection : function(component, event, helper) {
		component.set("v.isExpandedSection", true);
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function used to insert the value "All countries" to the picklist
					so the filter can be undone
    History
    <Date>			<Author>			<Description>
	30/01/2020  	Guillermo Giral   	Initial version
	*/
	addBlankCountry : function(component, event, helper){
		var countries = component.get("v.countries");
		if(!countries.includes($A.get("$Label.c.ServiceProfiling_AllCountries"))){
			countries.unshift($A.get("$Label.c.ServiceProfiling_AllCountries"));
			component.set("v.countries", countries);
		}
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function used to filter the accounts shown in the 
					multiselect picklist (acc + ent)
    History
    <Date>			<Author>			<Description>
	30/01/2020  	Guillermo Giral   	Initial version
	*/
	filterAccountsByCountry : function(component, event, helper){
		var countryFilter = component.get("v.filterCountry");
		var evt = $A.get("e.c:EVT_ServiceProfilingFilter");
		if(evt){
			evt.setParams({
							"filterByCountry" : countryFilter,
							"filterDataTable" : false
							});
			evt.fire();
		}
	}
})