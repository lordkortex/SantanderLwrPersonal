({
    showDropdown: function (component, helper) {
        if (component.get('v.showDropdown') == true) {
            component.set('v.showDropdown', false);
        } else {
            component.set('v.showDropdown', true);
            helper.setCheckboxes(component, helper);
        }
        helper.callEventSave(component, helper, null);
    },

    hideDropdown: function (component, helper) {
        component.set('v.showDropdown', false);
    },

    saveFilters: function (component, helper) {
        let selectedFilters = [];
        let currentlySelected = helper.getChecked(component, helper);
        for (let i = 0; i < currentlySelected.length; i++) {
            selectedFilters.push(currentlySelected[i]);
        }
        component.set('v.selectedFilters', selectedFilters);
        helper.hideDropdown(component, helper);
        //helper.setSelectedLabel(component, helper); //SNJ - 11/6/20 - set selected item
        if (!$A.util.isEmpty(selectedFilters)) {
            helper.callEventSave(component, helper, 'apply');
        } else {
            helper.removeFilters(component, helper);
        }
    },

    removeFilters: function (component, helper) {
        let checkboxes = helper.getCheckBoxes(component, helper);
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].set('v.isChecked', false);
        }
        component.set('v.selectedFilters', []);
        helper.hideDropdown(component, helper);
        helper.setSelectedLabel(component, helper); //SNJ - 11/6/20 - set selected item
        helper.callEventSave(component, helper, 'clear');
    },

    getChecked: function (component, helper) {
        let checkboxes = helper.getCheckBoxes(component, helper);
        let checked = [];
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].get('v.isChecked')) {
                checked.push(checkboxes[i].get('v.value'));
            }
        }
        return checked;
    },

    setCheckboxes: function (component, helper) {
        let selectedFilters = component.get('v.selectedFilters');
        let checkboxes = helper.getCheckBoxes(component, helper);
        for (let i = 0; i < selectedFilters.length; i++) {
            for (let j = 0; j < checkboxes.length; j++) {
                let value = checkboxes[j].get('v.value');
                let label = checkboxes[j].get('v.label');
                if (selectedFilters[i] == value) {
                    checkboxes[j].set('v.isChecked', true);
                }
            }
        }
    },

    getCheckBoxes: function (component, helper) {
        let checkboxes = component.find('checkboxes');
        if (!$A.util.isEmpty(checkboxes)) {
            if ($A.util.isEmpty(checkboxes.length)) {
                let copia = checkboxes;
                checkboxes = [];
                checkboxes.push(copia);
            }
        } else {
            checkboxes = [];
        }
        return checkboxes;
    },

    callEventSave: function (component, helper, action) {
        var saveFilters = component.getEvent('saveFilters');
        saveFilters.setParams({
            'showDropdown': component.get('v.showDropdown'),
            'name': component.get('v.name'),
            'action': action
        });
        saveFilters.fire();
    },
    
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Set selectedLabel only if the user selects one of the options
    History
    <Date>			<Author>			<Description>
	11/06/2020		Shahad Naji   		Initial version
    */
    setSelectedLabel : function(component, helper){
        var selectedFilters =  component.get('v.selectedFilters');
        if(selectedFilters != null && selectedFilters != undefined){
            if(selectedFilters.length == 1){
                var obj = helper.getCheckboxObject(component, helper, selectedFilters[0]);
                if(obj != null){
                    component.set('v.selectedLabel', obj.label);
                }else{
                    component.set('v.selectedLabel', '');  
                }
            }else{
                component.set('v.selectedLabel', '');
            }
        }
    },
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Returns the checkbox object of a certain value
    History
    <Date>			<Author>			<Description>
	11/06/2020		Shahad Naji   		Initial version
    */
    getCheckboxObject : function(component, helper, value){
        var filterList = component.get('v.filterList');
        if(filterList != null && filterList != undefined){
           var obj = filterList.find(obj => obj.value == value);
            if(obj != null && obj != undefined){
                return obj;
            }
        }
       return null; 
    }
})