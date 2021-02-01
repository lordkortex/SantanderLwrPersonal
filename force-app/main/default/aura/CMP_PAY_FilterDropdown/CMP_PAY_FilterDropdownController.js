({
    doInit :  function(component, event, helper) {
        var isSimpleDropdown = component.get('v.isSimpleDropdown');
        if(!isSimpleDropdown){           
            helper.setCheckboxes(component, event, helper);
        }else{
            var params = event.getParam('arguments');
            if (params) {
                var items = params.auxiliarList;
				helper.setSelection(component, event, helper, items); 
            } 
        }
    },
    selectOption : function(component, event, helper) {
        var item = event.currentTarget.id;
        var items = [];
        if(item){
            items.push(item);
            helper.handleSelection(component, event, helper, items);  
        } 
    },
    handleCheckbox : function(component, event, helper) {
        var item = event.currentTarget.id;
        var checked = event.target.checked;
		 var items = [];
        if(item){
            items.push(item);
            helper.handleMultiSelection(component, event, helper,  items, checked);
        }        
    },
    
    handleReset : function(component, event, helper) {
         var reset = component.get('v.clearDropdown');
        if(reset != undefined && reset != null){
            if(reset){
                helper.reset(component, event, helper);
            }
        }
        
    },
    handleSelectValue : function(component, event, helper) {        
        var item = event.getParam('selectedValue');
        var isChecked = event.getParam('isChecked');
        var items = [];
        items.push(item);
        helper.handleMultiSelection(component, event, helper,  items, isChecked);
    }
   
})