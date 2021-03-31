({
	/*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to get the URL params that is sended from the History movement component.
    History
    <Date>			<Author>			<Description>
	26/12/2019		Pablo Tejedor   	Initial version
	*/
	doInit : function(component, event, helper) {
		helper.getURLParams(component,event,helper);

	},

	      /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to show component results not found when the service doesn't send any result.
    History
    <Date>			<Author>			<Description>
	26/12/2019		 Pablo Tejedor   	Initial version
	*/
	displayNoResultsFound : function(component, event){
        component.set("v.displayNoResultsMessage", true);
	},

		      /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Method for redirect to global balance or Movemnt historic page, whit breadcrumbs.
    History
    <Date>			<Author>			<Description>
	26/12/2019		 Pablo Tejedor   	Initial version
	*/
	gobackPage : function(component, event, helper){
	
		var params = event.getParams();
		var fuente = params.sourceBreadCrumb;
		
	

		if(params.isbackGlobalbalance && (fuente == 'historyofextracts' || fuente == 'globalBalance')){
	
			component.find("Service").redirect("home","");
			
		}

		if(params.isbackHistoric  && (fuente == 'historyofextracts' || fuente == 'dropdownMenu')){

			
			var url =  "c__subsidiaryName="+component.get("v.accountName")+   
            "&c__accountNumber="+component.get("v.accountNumberAndEntity")+
            "&c__bank="+component.get("v.accountNumberBank")+
            "&c__source="+params.sourceBreadCrumb+
			"&c__lastUpdateAvailableBalance="+component.get("v.dates")+
			"&c__selectedAccountSearch="+component.get("v.SelectedAccount")+
			"&c__dateFrom="+component.get("v.dateFrom")+
			"&c__dateTo="+component.get("v.dateTo")+
			"&c__availableBalanceParam="+component.get("v.availableBalanceParam")+
			"&c__bookBalanceParam="+component.get("v.bookBalanceParam");
			
			
			component.find("Service").redirect("movement-history",url);

		}

	}

	


})