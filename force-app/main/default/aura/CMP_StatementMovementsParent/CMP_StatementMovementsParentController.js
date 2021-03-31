({
    doInit : function(component, event, helper) {
        helper.handleDoInit(component,event,helper);

        var currentPage = event.getParam("currentPage");
        component.set("v.currentPage", currentPage);
    },

    pageChanged : function ( component,event,helper)
    {
        helper.handlePageChanged(component,event,helper);
    }
})