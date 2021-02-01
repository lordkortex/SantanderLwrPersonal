({
    doInit : function(component, event, helper) {
        helper.handleDoInit(component,event,helper);
    },

    handleButtonClicked : function(component, event, helper) {
        helper.handleSearch(component,event,helper);
    },

    filterTableData : function(component,event,helper)
    {
        helper.handleSearch(component,event,helper);

    }
})