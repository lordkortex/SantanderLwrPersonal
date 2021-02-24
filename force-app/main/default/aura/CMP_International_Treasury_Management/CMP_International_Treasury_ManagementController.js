({
    /*
	Author:         Shahad
    Company:        Deloitte
    Description:    This method is to populate the component data on its initialization
    History
    <Date>			<Author>			<Description>
	28/10/2019		Shahad Naji     	Initial version
	*/
    doInit : function(component, event, helper) {        
        helper.initData(component, event, "LastUpdateTab");
        helper.getUserInfo(component, event);
        helper.getIsCashNexus(component, event);
    },
    /*
	Author:         Shahad
    Company:        Deloitte
    Description:    Currency Exchanger
    History
    <Date>			<Author>			<Description>
	28/10/2019		Shahad Naji     	Initial version
	*/
    exchangeCurrency : function(component, event, helper) {
        helper.exchangeCurrency(component, event);
    },
    /*
	Author:         Shahad
    Company:        Deloitte
    Description:    This method changes the displaying order of the accounts
    History
    <Date>			<Author>			<Description>
	28/10/2019		Shahad Naji     	Initial version
	*/
    doSort : function(component, event, helper){
        helper.sortAccount(component, event);       
    },
    /*
	Author:         Shahad
    Company:        Deloitte
    Description:    This method expands or collapses the different sections
    History
    <Date>			<Author>			<Description>
	20/01/2020		Shahad Naji     	Initial version
	*/
    showHideContent : function(component, event, helper){
        $A.util.removeClass(component.find("spinner"), "slds-hide");
        $A.util.addClass(component.find("spinner"), "slds-show");
        var oldSelectedTab = component.get("v.tabSelected");
        var newSelectedTab = event.getParam("activateTabId");
        var deactivateTabs = event.getParam("deactivateTabs");
        
        if(oldSelectedTab != newSelectedTab){
            component.set("v.tabSelected", newSelectedTab);
            var activeTabContent = component.find(newSelectedTab+"Content");            
            $A.util.addClass(activeTabContent, 'slds-show');
            $A.util.removeClass(activeTabContent, 'slds-hide');            
            for(var i in deactivateTabs){
                var deactivateTabContent = component.find(deactivateTabs[i]+"Content");
                $A.util.removeClass(deactivateTabContent, 'slds-show');
                $A.util.addClass(deactivateTabContent, 'slds-hide');
            }
            
            if(newSelectedTab == "EndOfDayTab"){
                var tGlobalBalance = component.get("v.tGlobalBalance");
                if(tGlobalBalance == null){
                    helper.initData(component, event, "EndOfDayTab");
                } else{
                    $A.util.addClass(component.find("spinner"), "slds-hide");
                    $A.util.removeClass(component.find("spinner"), "slds-show");
                }               
            }
            else{
                helper.initData(component, event, "LastUpdateTab"); 
            }       
            
        }
        else{
            $A.util.addClass(component.find("spinner"), "slds-hide");
            $A.util.removeClass(component.find("spinner"), "slds-show");
        }
    },
      /*
	Author:         Shahad
    Company:        Deloitte
    Description:    This method downloads Global Balance content 
    History
    <Date>			<Author>			<Description>
	20/01/2020		Shahad Naji     	Initial version
	*/
    download : function(component, event, helper){
        var isDownload = event.getParam("isDownload");
        if(isDownload){
            helper.download(component, event);

           
        }
    },
    
    checkTerms : function(component, event, helper){
        var isChecked = event.getParam("isChecked");
        
        component.set("v.agreedTerms", isChecked);
    }
})