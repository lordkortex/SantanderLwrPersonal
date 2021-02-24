({
	/*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to get the URL params that is sended from global balance or transacition detail page.
    History
    <Date>			<Author>			<Description>
	18/02/2020		Pablo Tejedor   	Initial version
	*/
	doInit : function(component, event, helper) {
		helper.getURLParams(component,event,helper);
	
	},
    /*openCloseForm : function(component, event, helper) {
    	helper.openCloseForm(component, event, helper);
       
	}*/
 
	/*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function go back global balance page.
    History
    <Date>			<Author>			<Description>
	18/02/2020		Pablo Tejedor   	Initial version
	*/
	gobackPage : function(component, event, helper) {
	
		component.find("Service").redirect("home","");
			
		var params = event.getParams();
		var fuente = params.sourceBreadCrumb;
		console.log(fuente);

		if(params.isbackGlobalbalance && fuente=='transactionGlobalBalance' ){
			console.log('entra para home');
		component.find("Service").redirect("home","");
			
        }
    
	},
 
	/*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to show the search menu or hide.
    History
    <Date>			<Author>			<Description>
	18/02/2020		Pablo Tejedor   	Initial version
	*/
	showSearch : function(component, event, helper) {
		component.set("v.isSearching",!component.get("v.isSearching"));
	},
	loadData : function(component, event, helper) {
		console.log('test launch mthod');
		component.set("v.backTodetail", 'launchmethod');
	}
	
})