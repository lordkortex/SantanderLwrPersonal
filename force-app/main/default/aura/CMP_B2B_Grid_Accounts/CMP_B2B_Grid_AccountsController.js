({
    init: function (component, event, helper) {
        helper.setPaginations(component, event, helper);
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
            helper.nextPage(component, helper);
        }
    },

    changePagination: function (component, event, helper) {
        helper.setPaginations(component, helper);
    },

    changePage: function (component, event, helper) {
        helper.selectPage(component, helper);
    },
})