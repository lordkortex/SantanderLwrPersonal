({
    init: function (component, event, helper) {
        let accountList = component.get('v.accountList');
        component.set('v.accountsFiltered', accountList);
        helper.setListFilters(component, helper);
    },

    handleFilter: function (component, event, helper) {
        var eventDropdown = event.getParam('showDropdown');
        var eventName = event.getParam('name');
        var eventAction = event.getParam('action');
        if (!$A.util.isEmpty(eventAction)) {
            helper.applyFilters(component, helper, eventAction);
        }
        if (eventDropdown) {
            let filters = component.find('filter');
            for (let i = 0; i < filters.length; i++) {
                if (filters[i].get('v.name') == eventName) {
                    filters[i].set('v.showDropdown', true);
                } else {
                    filters[i].set('v.showDropdown', false);
                }
            }
        }
    },

    handleInputSearch: function (component, event, helper) {
        let inputValue = event.target.value;
        let searchedString = component.get('v.searchedString');
        if (searchedString == null || searchedString == undefined) {
            searchedString = '';
        }
        if (!$A.util.isEmpty(inputValue)) {
            component.set('v.searchedString', inputValue);
            if (inputValue.length >= 4) {
                if (inputValue.length > searchedString.length) {
                    helper.applyFilters(component, helper, 'apply');
                } else {
                    helper.applyFilters(component, helper, 'clear');
                }
            } else if (inputValue.length == 3 && searchedString.length == 4) {
                helper.applyFilters(component, helper, 'clear');
            }
        } else {
            component.set('v.searchedString', '');
            helper.applyFilters(component, helper, 'clear');
        }
    },

    handleClearInput: function (component, event, helper) {
        component.set('v.searchedString', '');
        helper.applyFilters(component, helper, 'clear');
    },
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Reset filter options
    History
    <Date>			<Author>			<Description>
	15/06/2020		Shahad Naji   		Initial version
    */
    handleResetSearch : function(component, event, helper){
        console.log("Shahad estas aqui");
        var clear = component.get('v.resetSearch');
        if(clear){
			helper.resetSearch(component, event, helper);
        }

    }
})