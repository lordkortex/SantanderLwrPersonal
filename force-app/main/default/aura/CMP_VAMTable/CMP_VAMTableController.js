({
	sortBy : function(component, event, helper) {
        helper.sortHelper(component, event, helper);
	},
    
    changeVAM : function(component, event, helper) {
        helper.setPaginations(component, event, helper);
    },
    
    goToDetail : function(component, event, helper) {
        component.set("v.selectedVAMAccount", event.target.id);
        component.set("v.showDetail", true);
    },    
    handlePreviousPage: function (component, event, helper) {
        var currentPage = component.get('v.currentPage');
        if (currentPage > 1) {
            helper.previousPage(component, helper);
        }
    },
    
    handleNextPage: function (component, event, helper) {
        var currentPage = component.get('v.currentPage');
        var pages = component.get('v.pagesNumbers');
        var lastPage = pages[pages.length - 1];
        if (currentPage < lastPage) {
            helper.nextPage(component, event, helper);
        }
    },

    onChangeSelect: function (component, event, helper) {
        component.set('v.selectedValue', component.find('select').get('v.value'));
        helper.setPaginations(component, event, helper);
    }
})