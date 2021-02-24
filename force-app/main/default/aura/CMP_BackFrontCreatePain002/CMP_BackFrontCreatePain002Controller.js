({
    openModel: function(component, event, helper) {
       // for Display Model,set the "isOpen" attribute to "true"
       component.set("v.isOpen", true);
    },
  
    closeModel: function(component, event, helper) {
       // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
       component.set("v.isOpen", false);
    },
  
    doInit: function(component, event, helper) {
       if(component.get("v.isOpen")){
         component.set("v.selectedChannel",'');
         component.set("v.error","");

         component.set("v.selectedAccount",'');
         helper.getAccounts(component, event, helper);
       }
    },
  
    add: function(component, event, helper) {
       console.log("create");
       if(component.get("v.selectedAccount")=='' || component.get("v.selectedChannel")== ""){
          console.log("entro");
          component.set("v.error",$A.get("$Label.c.fillAllFields"));
       }else{
         component.set("v.error","");
         helper.add(component, event, helper);
       }
    },
    
    accountSelected : function ( component,event,helper)
    {
        var currency = '';
                var accountList=component.get("v.accountList");
                if(accountList.length>0){
                    for(var i in accountList){
                        if(accountList[i].account==component.get("v.selectedAccount")){
                            currency = accountList[i].currency;
                        }
                    }
                }
		component.set("v.selectedAccountCurrency",currency);
    }
	
 })