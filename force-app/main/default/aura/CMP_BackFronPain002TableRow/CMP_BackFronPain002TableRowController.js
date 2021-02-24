({
    modify : function(component, event, helper) {
        if(component.get("v.isModify")==true){
            component.set("v.isModify",false);
        }else{
            component.set("v.isModify",true);
        }
    },

    delete : function(component, event, helper) {
        component.set("v.isDelete",true);
        component.set("v.toDelete.account",component.get("v.item.accountId"));
        component.set("v.toDelete.bic",component.get("v.item.agentId"));

        var cmpEvent = component.getEvent("deletePain");
        cmpEvent.setParam("toDelete", component.get("v.toDelete"));
		cmpEvent.fire();
    },

    save : function(component, event, helper) {
        if(component.get("v.selectedPeriodicity")!=null && component.get("v.selectedPeriodicity") != undefined && component.get("v.selectedPeriodicity") != $A.get("$Label.c.selectOne")){
            component.set("v.periodicity",component.get("v.selectedPeriodicity"));
            component.set("v.isModify",false);
        }
    },

})