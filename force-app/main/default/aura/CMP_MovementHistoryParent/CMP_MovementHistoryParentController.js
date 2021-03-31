({
    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to get the URL params that is sended from the global balance component.
    History
    <Date>			<Author>			<Description>
	26/12/2019		Pablo Tejedor   	Initial version
	*/
    doInit : function(component, event, helper) {
        helper.getURLParams(component,event,helper);

    },
        /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to show component results not found when the service doesn't send any result.
    History
    <Date>			<Author>			<Description>
	26/12/2019		Guillermo Giral   	Initial version
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
		console.log('recogemos evento para volver atras');
		var params = event.getParams();
		var fuente = params.sourceBreadCrumb;


		if(params.isbackGlobalbalance && fuente == 'historyofextracts' ){
		
			component.find("Service").redirect("home","");
			
        }
    }

})