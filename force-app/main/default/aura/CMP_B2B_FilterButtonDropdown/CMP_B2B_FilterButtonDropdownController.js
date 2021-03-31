({
    init: function (component, event, helper) {
        console.log('init CMP_B2B_FilterButtonsDrowpdown.');
    },

    handleDropdownButton: function (component, event, helper) {
        helper.showDropdown(component, helper);
    },

    handlerApplyFilters: function (component, event, helper) {
        helper.saveFilters(component, helper);
    },

    handlerClearFilters: function (component, event, helper) {
        helper.removeFilters(component, helper);
    },
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Clears dropdown to reset filter options
    History
    <Date>			<Author>			<Description>
	15/06/2020		Shahad Naji   		Initial version
    */
    handleClearDropdown : function (component, event, helper) {
        var clear = component.get('v.clearDropdown');
        if(clear){
            helper.removeFilters(component, helper); 
        } 
    },
    handleSetLabel : function(component, event, helper){
        helper.setSelectedLabel(component, helper);
    }
})