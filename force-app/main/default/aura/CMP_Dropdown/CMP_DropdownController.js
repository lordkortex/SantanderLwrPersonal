({    
    doInit : function(component, event, helper){
       /* if(!component.get("v.isSimpleDropdown") && component.get("v.selectAllValues") != null && component.get("v.values") != null){
            var values = component.get("v.values");
            if(values.indexOf(component.get("v.selectAllValues")) == -1){
                values.unshift(component.get("v.selectAllValues"));
            }
            // if(!component.get("v.isHiddenValueDropdown")){
            //     if(values.indexOf(component.get("v.selectAllValues")) == -1){
            //         values.unshift(component.get("v.selectAllValues"));
            //     }
            // } else {
            //     let valueCodes = [];
            //     values.forEach(v => {
            //         valueCodes.push(values.value);
            //     });
            //     if(!valueCodes.includes(component.get("v.selectAllValues"))){
            //         values.unshift({
            //             "value" : component.get("v.selectAllValues"),
            //             "displayValue" : component.get("v.selectAllValues")
            //         });
            //     }
            // }
            component.set("v.values", values);
        }*/
    },

    selectOption : function(component, event, helper){
        var item = event.currentTarget.id;
        if(item){
            var items = [];
            let isObject = component.get("v.isHiddenValueDropdown");
            item = isObject ? {"value" : item, "displayValue" : event.currentTarget.name} : item;
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
    }
})