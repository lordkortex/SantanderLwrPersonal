({
    /*
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Function to Go to Legal Information
    History
    <Date>			<Author>		<Description>
    15/01/2020		R. Alexander Cervino     Initial version*/
     doInit : function(component, event, helper) {
        helper.getIsCashNexus(component, event);
    },
    
    goToLegalInformation : function(component, event, helper) {

        var country = component.get("v.country");
        var language = component.get("v.language");
        var url = "c__country="+country+"&c__language="+language;
    
        helper.goTo(component,"legal-information", url);
    },

    /*
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Function to Go to Legal Information
    History
    <Date>			<Author>		<Description>
    22/01/2020		R. Alexander Cervino     Initial version*/
    goToPrivacy : function(component, event, helper) {

        var country = component.get("v.country");
        var url = "c__country="+country;

        helper.goTo(component,"privacy", url);
    },
    
    /*
    Author:         Diego Asis
    Company:        Deloitte
    Description:    Function to Go to Legal Information
    History
    <Date>			<Author>		<Description>
    26/03/2020		Diego Asis     	Initial version*/
    goToTerms : function(component, event, helper) {
        
        var country = component.get("v.country");
        var language = component.get("v.language");
        var url = "c__country="+country+"&c__language="+language;
        
        helper.goTo(component,"terms-and-conditions", url);
    }
})