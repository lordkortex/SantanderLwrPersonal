({
    handleSelection : function(component, event, helper, items) {
        var isSimpleDropdown = component.get('v.isSimpleDropdown');
        var deselectOption = component.get('v.deselectOption');
        if(isSimpleDropdown){
            var selected = items[0];
            var objArray = component.get('v.values');
            var obj = objArray.find(obj => obj.value == selected);
            var value = component.get('v.selectedValue');
            if(value !=  null && value != undefined){
                if(value == selected && deselectOption){
                    component.set('v.selectedValue',''); 
                }else{
                    component.set('v.selectedValue',selected);
                    component.set('v.selectedValuesText', obj.label);
                }
            }
        }  
    },
    handleMultiSelection : function(component, event, helper,  items, checked) {
        var isSimpleDropdown = component.get('v.isSimpleDropdown');
        if(!isSimpleDropdown){
            var selected = items[0];      
            var objArray = component.get('v.values');
            var obj = objArray.find(obj => 'OPT_'+obj.value == selected);
            var values = component.get('v.selectedValues');
            if(values !=  null && values != undefined){
                if(checked == true){
                    if(!values.includes(obj.value)){
                        values.push(obj.value);
                    }
                }else{
                    if(values.includes(obj.value)){
                        var i = values.indexOf(obj.value);
                        if ( i !== -1 ) {
                            values.splice( i, 1 );
                        }
                    }
                }
                var text = '';
                for(let i=0; i< values.length; i++){
                    for(let j=0; j< objArray.length; j++){
                        if(values[i] == objArray[j].value){
                            text = text + objArray[j].label;
                            if(i != values.length-1){
                                text = text + ', '
                            }
                        }
                    }
                    
                }
                component.set('v.selectedValues', values);
                component.set('v.selectedValuesText',text );
                
            }
            
        }
    },
    reset : function (component, event, helper){
       var isSimple = component.get('v.isSimpleDropdown');
        if(isSimple){
            component.set('v.selectedValue', '');
            component.set('v.selectedValuesText', '');
        }else{
          
            var myValues = component.get('v.values');
            let checkboxes = component.find('PAY_Checkbox');
      
            for(var j=0; j<checkboxes.length;j++){                
                checkboxes[j].set('v.isChecked', false);  
            }
            component.set('v.selectedValues', []);
            component.set('v.selectedValuesText','' );
        }
        component.set('v.clearDropdown', false);
    },
    setCheckboxes : function(component, event, helper){
        let selectedValues = component.get('v.selectedValues');
        let checkboxes = component.find('PAY_Checkbox');
        for(let i = 0; i < selectedValues.length; i++){
            for(let j=0; j<checkboxes.length;j++){
                if(selectedValues[i] == checkboxes[j].get('v.checkValue')){
                    var item = 'OPT_'+selectedValues[i];
                    var items = [];
                    items.push(item);
                    checkboxes[j].set('v.isChecked', true);
                    helper.handleMultiSelection(component, event, helper,  items, true);
                }
            }
        } 
    },
    setSelection : function(component, event, helper, items) {
        var isSimpleDropdown = component.get('v.isSimpleDropdown');
        if(isSimpleDropdown){
            var selected = items[0];
            var objArray = component.get('v.values');
            var obj = objArray.find(obj => obj.value == selected);
            var value = component.get('v.selectedValue');
            if(value !=  null && value != undefined){
                
                component.set('v.selectedValue',selected);
               component.set('v.selectedValuesText', obj.label);
                
            }
        }  
    },
})