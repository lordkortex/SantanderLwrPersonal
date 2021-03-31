({
    //$Label.c.PAY_OptionsSelected
    doInitHelper : function(component) {
        $A.util.toggleClass(component.find('resultsDiv'),'slds-is-open');
        var value = component.get('v.value');
        var values = component.get('v.values');
		if( !$A.util.isEmpty(value) || !$A.util.isEmpty(values) ) {
            var searchString;
        	var count = 0;
            var multiSelect = component.get('v.multiSelect');
			var options = component.get('v.options');
            options.forEach( function(element, index) {
                if(multiSelect) {
                    if(values.includes(element.value)) {
                        element.selected = true;
                        count++;
                    }  
                } else {
                    if(element.value == value) {
                        searchString = element.label;
                    }
                }
            });
            
            if(multiSelect && count != 0){
                if(count==1){
                    component.set('v.searchString', values[0]);
    
                }else if(count==2){
                component.set('v.searchString', values[0]+', '+values[1]);
                
                }else if(count>2){
                    component.set('v.searchString', count + ' ' + $A.get("$Label.c.PAY_OptionsSelected"));
                }
    
            }else{
                component.set('v.searchString', searchString);
            }
            component.set('v.options', options);
		}
    },
    //$Label.c.B2B_No_suggestions_for
    filterOptionsHelper : function(component) {
        component.set("v.message", '');
        var searchText = component.get('v.searchString');
		var options = component.get("v.options");
		var minChar = component.get('v.minChar');
		if(searchText.length >= minChar) {
            var flag = true;
			options.forEach( function(element,index) {
                if(element.label.toLowerCase().trim().startsWith(searchText.toLowerCase().trim())) {
					element.isVisible = true;
                    flag = false;
                } else {
					element.isVisible = false;
                }
			});
			component.set("v.options",options);
            if(flag) {
                var msg = $A.get("$Label.c.B2B_No_suggestions_for");
                component.set("v.message", msg + " '" + searchText + "'");
            }
		}
        $A.util.addClass(component.find('resultsDiv'),'slds-is-open');
	},
    
    selectItemHelper : function(component, event) {
        var options = component.get('v.options');
        var multiSelect = component.get('v.multiSelect');
        var searchString = component.get('v.searchString');
        var values = component.get('v.values') || [];
        var value;
        var count = 0;
        options.forEach( function(element, index) {
            if(element.value === event.currentTarget.id) {
                if(multiSelect) {
                    if(values.includes(element.value)) {
                        values.splice(values.indexOf(element.value), 1);
                    } else {
                        values.push(element.value);
                    }
                    element.selected = element.selected ? false : true;   
                } else {
                    if(component.get('v.value') ==element.value){
                        value = '';
                        searchString = '';
                        element.selected = false;
                    }else{
                        value = element.value;
                        searchString = element.label;
                        element.selected = true;
                    }

                }
            }else{
                if(!multiSelect){
                    element.selected = false;
                }
            }
            if(element.selected) {
                count++;
            }
        });
        component.set('v.value', value);
        component.set('v.values', values);
        component.set('v.options', options);
        if(multiSelect && count != 0){
        	if(count==1){
                component.set('v.searchString', values[0]);

        	}else if(count==2){
                component.set('v.searchString', values[0]+', '+values[1]);
                
        	}else if(count>2){
                component.set('v.searchString', count + ' ' + $A.get("$Label.c.PAY_OptionsSelected"));
        	}

        }else{
            component.set('v.searchString', searchString);
        }

        $A.util.removeClass(component.find('resultsDiv'),'slds-is-open');
    },
    
    removePillHelper : function(component, event) {
        var value = event.getSource().get('v.name');
        var multiSelect = component.get('v.multiSelect');
        var count = 0;
        var options = component.get("v.options");
        var values = component.get('v.values') || [];
        options.forEach( function(element, index) {
            if(element.value === value) {
                element.selected = false;
                values.splice(values.indexOf(element.value), 1);
            }
            if(element.selected) {
                count++;
            }
        });
       if(multiSelect && count != 0){
        	if(count==1){
                component.set('v.searchString', values[0]);

        	}else if(count==2){
                component.set('v.searchString', values[0]+', '+values[1]);
                
        	}else if(count>2){
                component.set('v.searchString', count + ' ' + $A.get("$Label.c.PAY_OptionsSelected"));
        	}
        }
        component.set('v.values', values)
        component.set("v.options", options);
    },
    
    blurEventHelper : function(component, event) {
        var selectedValue = component.get('v.value');
        var multiSelect = component.get('v.multiSelect');
        var previousLabel;
        var count = 0;
        var options = component.get("v.options");
        options.forEach( function(element, index) {
            if(element.value === selectedValue) {
                previousLabel = element.label;
            }
            if(element.selected) {
                count++;
            }

        });
        if(multiSelect && count != 0){
            var values = component.get("v.values");
        	if(count==1){
                component.set('v.searchString', values[0]);
        	}else if(count==2){
                component.set('v.searchString', values[0]+', '+values[1]);
                
        	}else if(count>2){
                component.set('v.searchString', count + ' ' + $A.get("$Label.c.PAY_OptionsSelected"));
        	}

        }else{
            component.set('v.searchString', previousLabel);
        }

    	if(multiSelect)
            event.preventDefault();
        else
            $A.util.removeClass(component.find('resultsDiv'),'slds-is-open');
           // event.preventDefault();
        $A.util.removeClass(component.find('resultsDiv'),'slds-is-open');
    },
    
    resetHelper : function(component) {
        var value = component.get('v.value');
        var values = component.get('v.values');
        
        var searchString;
        //var count = 0;
        var multiSelect = component.get('v.multiSelect');
        var options = component.get('v.options');
        options.forEach( function(element, index) {
            if(multiSelect) {
                //if(values.includes(element.value)) {
                    element.selected = false;
                   // count++;
               // }  
            } else {
                //if(element.value == value) {
                    searchString = '';
                    element.selected = false;
               // }
            }
        });
        component.set('v.searchString', '');
        component.set('v.options', options);
        component.set('v.resetForm', false);
        
    },
})