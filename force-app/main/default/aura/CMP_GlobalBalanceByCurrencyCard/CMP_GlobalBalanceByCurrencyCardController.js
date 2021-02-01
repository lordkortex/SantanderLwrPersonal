({
    navigateToAccounts : function(component, event, helper) {
        var aux = "GlobalPosition";
        var name = $A.get("$Label.c.currency");
        var url="c__tabs="+component.get("v.lastUpdateSelected");
        var selection = '{"value":"'+event.currentTarget.dataset.id+'","name": "'+name+'", "type":"checkbox"}';
        url+="&c__filters="+selection+"&c__consolidationCurrency="+component.get("v.selectedCurrency");
        url+="&c__accountGrouping="+component.get("v.cardGrouping");
        url+="&c__source="+aux;
        component.find("Service").redirect("accounts", url);
    }
})