({
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method to handle do init
    History
    <Date>          <Author>            <Description>
    28/09/2020      Joaquin Vera        Initial version
    */
    handleDoInit : function(component, event, helper) 
    {
        var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
        
        if(sPageURLMain != "" && sPageURLMain.includes("params")){
            component.find("Service").dataDecryption(component,helper, sPageURLMain, this.handleParams);
        
        //AM - 25/11/2020 - Nexus Tracker
        } else if(window.location.pathname.includes('cashnexus')){
            component.set("v.comesFromTracker", true);
            component.set("v.showBackButton", false);
        } else {
            helper.changeCommunityLanguage(component, helper, sPageURLMain);
        }
    },
    
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Receives the decrypted params and
                    sets the screen data
    History
    <Date>          <Author>            <Description>
    28/09/2020      Joaquin Vera        Initial version
    */
    handleParams : function (component, helper, response)
    {
        if(response != "") {
            var sParameterName;
            var accountDetails = [];
            for(var i = 0; i < response.length ; i++) {
                sParameterName = response[i].split("="); 
                
                switch(sParameterName[0]) {
                    case("c__comesFromTracker"):
                        sParameterName[1] === undefined ? 'Not found' : component.set("v.showBackButton", true);
                        component.set("v.comesFromTracker", true);
                        break;
                    //AM - 05/11/2020 - Portugal SSO Tracker
                    case("c__uetr"):
                        sParameterName[1] === undefined ? 'Not found' : component.set("v.searchValue", sParameterName[1]);
                        component.set("v.comesFromSSO", true);
                        break;
                }
            }
        }
        else {
            helper.changeCommunityLanguage(component, helper);
        }
    },
    
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Changes community language depending
    				on navigator language.
    History
    <Date>          <Author>            <Description>
    28/09/2020      Joaquin Vera        Initial version
    */
    changeCommunityLanguage : function (component, helper, url)
    {
        //Variables
        var navigatorLanguage = navigator.language;
        const searchHeader = "?language=";
        
        //Getting first 2 characters of browser language
        if(navigatorLanguage.length >=2){
            navigatorLanguage = navigatorLanguage.substring(0, 2);
        }
        
        if(window.location.search.includes("uetr") && !window.location.search.includes("language")) {
            console.log("HAS UETR");

            if(navigatorLanguage === "es") {   
                window.location.search += "&language=es";  
    
            } else if (navigatorLanguage === "pt") {            
                window.location.search += "&language=pt_BR";
    
            } else if (navigatorLanguage === "pl") {
                window.location.search += "&language=pl";;
    
            } else {
                window.location.search += "&language=en_us"; 
            }

        } else if (!window.location.search.includes("uetr")){
            if(navigatorLanguage === "es") {   
                (window.location.search != searchHeader + "es" ? window.location.search = searchHeader + "es" : "");  
    
            } else if (navigatorLanguage === "pt") {            
                (window.location.search != searchHeader + "pt_BR" ? window.location.search = searchHeader + "pt_BR" : "");
    
            } else if (navigatorLanguage === "pl") {
                (window.location.search != searchHeader + "pl" ? window.location.search = searchHeader + "pl" : "");
    
            } else {
                (window.location.search != searchHeader + "en_US" ? window.location.search = searchHeader + "en_US" : ""); 
    
            }
        }

        if(window.location.search != "" && window.location.search.includes("uetr")) {
            var lastEqual = window.location.search.lastIndexOf("=");
            var uetr = window.location.search.substring(lastEqual+1);

            component.set("v.uetr", uetr);
        }
    }
})