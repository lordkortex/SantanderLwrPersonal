({
    /*
	Author:         Antonio Duarte
    Company:        Deloitte
    Description:    This method decrypts the URL
    History
    <Date>			<Author>			<Description>
	10/08/2020		Antonio Duarte     	Initial version
	*/       
    getURLParams:  function(component, event, helper){
        
        
        
        var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
        var sURLVariablesMain = sPageURLMain.split('&');
        var sParameterName = "";
        
        for ( var i = 0; i < sURLVariablesMain.length; i++ ) {
            sParameterName = sURLVariablesMain[i].split('=');
            if (sParameterName[0] === 'ErrorCode') { 
                sParameterName[1] === undefined ? 'Not found' : component.set("v.errorCode",sParameterName[1]);              
            }
        }
        
        //Set the current language to the navigator language
        if(navigator.language != null && component.get("v.errorCode") == 'Session_Ended')
        {
            var language = navigator.language.substring(0,2).toUpperCase();
            
            if(language == 'ES' || language == 'PT' || language == 'EN' || language == 'PL')
            {
                if(navigator.language == 'pt-BR')
                {
                    component.set("v.language", 'BR');
                }
                else
                {
                    component.set("v.language", language);
                    
                }
            }
        }
        
        component.find("service").callApex2(component, helper,"c.getErrorMessage", {"errorCode":component.get("v.errorCode"), "language":component.get("v.language")}, helper.setErrorMessage);
    },
    
    
    /*
	Author:         Antonio Duarte
    Company:        Deloitte
    Description:    This method sets the error message
    History
    <Date>			<Author>			<Description>
	19/08/2020		Antonio Duarte     	Initial version
	*/       
    setErrorMessage:  function(component, helper, response){
        component.set("v.errorMessage", response);
        component.set("v.msgReady", true);
    }
    
})