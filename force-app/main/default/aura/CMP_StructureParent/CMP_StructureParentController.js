({
	 closeTab : function (component, event, helper){
        var workspaceAPI = component.find("workspace");
        if(workspaceAPI != null){
            workspaceAPI.getFocusedTabInfo().then(function(response) {
                var focusedTabId = response.tabId;
                workspaceAPI.closeTab({tabId: focusedTabId});
            })
            .catch(function(error) {
                console.log(error);
            });
        }
         window.location = $A.get('$Label.c.domainBackfront')+'/'+ event.getParam('recordId');   
     },
    
     showToast: function (component,event, helper) {
        var errorToast = component.find('errorToast');
        if (!$A.util.isEmpty(errorToast)) {
            var mode = event.getParam('mode');
            var title = event.getParam('title');
            var body = event.getParam('body');
            
            if (mode == 'error') {
                errorToast.openToast(false, false, title,  body, 'Error', 'warning', 'warning', true);
            }
            if (mode == 'success') {
                errorToast.openToast(true, false, title,  body,  'Success', 'success', 'success', true);
            }
        }
    }
})