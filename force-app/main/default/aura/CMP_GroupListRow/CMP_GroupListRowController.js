({
    navigateToProfile : function(component, event, helper) {
        var url = "c__groupName="+component.get("v.dataObject.nomgruus")+
        "&c__comesFrom="+"Groups"+
        "&c__groupId="+component.get("v.dataObject.codgrupr")+
        "&c__groupAuth="+component.get("v.dataObject.idauth")+
        "&c__hasProfiling=" + "true";
        helper.encrypt(component, url).then(function(results)
        {
            let navService = component.find("navService");

            let pageReference = 
            {
                type: "comm__namedPage",
                attributes: 
                {
                    pageName: "new-group"
                },
                state: 
                {
                    params : results
                }
            }

            component.set("v.pageReference", pageReference);
            navService.navigate(pageReference); 
        });

    },
    navigateToView : function(component, event, helper) {

        var url = "c__userGroup="+component.get("v.dataObject.nomgruus")+
        "&c__comesFrom="+"Groups";
        helper.encrypt(component, url).then(function(results)
        {
            let navService = component.find("navService");

            let pageReference = 
            {
                type: "comm__namedPage",
                attributes: 
                {
                    pageName: "user-group-profile-summary"
                },
                state: 
                {
                    params : results
                }
            }

            component.set("v.pageReference", pageReference);
            navService.navigate(pageReference); 
        });
    },
    deleteGroup : function(component, event, helper) {
        var title = $A.get("$Label.c.GroupNew_DeleteTitle");
        var secondDescription = $A.get("$Label.c.GroupNew_GrDescription");
        var eventDelete = component.getEvent("groupNewDelete");

        eventDelete.setParams({
                titleDelete : title,
                secondDescriptionDelete : secondDescription.replace('{NOMBRE DEL GRUPO}',component.get("v.dataObject.nomgruus")),
                firstDescriptionDelete : component.get("v.dataObject.nomgruus"),
                showDeletePopup : true
        })
        
        eventDelete.fire();
    }

})