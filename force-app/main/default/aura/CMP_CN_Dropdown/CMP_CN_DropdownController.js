({    
    doInit : function(component, event, helper){
        if(!component.get("v.isSimpleDropdown") && component.get("v.selectAllValues") != null && component.get("v.values") != null){
            var values = component.get("v.values");
            if(values.indexOf(component.get("v.selectAllValues")) == -1){
                values.unshift(component.get("v.selectAllValues"));
                component.set("v.values", values);
            }
        }
    },

    selectOption : function(component, event, helper){
        var item = event.currentTarget.id;
        if(item){
            var items = [];
            items.push(item); 
            helper.handleSelection(component, event, items);
        }
    },

    onSelectionUpdate: function(component, event, helper){
        var args = event.getParam("arguments");
        if(args){
            var items = args.changedValues;
            helper.handleSelection(component, event, items);
        }
    },
    show : function(component, event, helper) {
        $A.util.toggleClass(component.find("button"),"slds-hide");
    },

    keepSelected : function(component, event, helper) {
        var args = event.getParam("arguments");
        if(args){
            var items = args.valueToKeep;
            helper.keepSelection(component, event, items);
        }
    },

})