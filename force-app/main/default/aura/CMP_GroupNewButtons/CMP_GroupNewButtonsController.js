({
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Advance to next step
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    nextStep : function(component, event, helper) {
        console.log("Current stage number: " + component.get("v.currentStageNumber"));
        if(component.get("v.currentStageNumber")  == 2 ){
            let navService = component.find("navService");

            let pageReference = {
                type: "comm__namedPage",
                attributes: {
                    pageName: "groups"
                }
            }
            
            helper.saveData(component,event,helper);

            component.set("v.pageReference", pageReference);
            navService.navigate(pageReference);
        } else {
            component.set("v.currentStageNumber", 2);
            component.set("v.stage1Finished", true); 
        }
    },
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Go to previous step
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    backStep : function(component, event, helper) {
        component.set("v.currentStageNumber", 1);
    },
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Navigation to the groups main page
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    navigateToDetailsComponent : function(component, event, helper) {

       /*var url= "";

        helper.encrypt(component, url).then(function(results){
            let navService = component.find("navService");

            let pageReference = {
                type: "comm__namedPage",
                attributes: {
                    pageName: "groups"
                },
                state: {
                    params : results
                }
            }

            component.set("v.pageReference", pageReference);
            navService.navigate(pageReference); 
        });*/
        component.set("v.showModal", true);

    },
/*
    Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Navigation to the Summary user profile  page
    History
    <Date>          <Author>            <Description>
    16/01/2019      Teresa Santos        Initial version
    */
   goToSummaryPage : function(component, event, helper){
        
    var url =
    "&c__userGroup="+component.get("v.groupName") +
    "&c__comesFrom=" + "Profile-Group"
    "&c__hasData=" + component.get("v.hasProfile");
    helper.encrypt(component, url).then(function(results){
        let navService = component.find("navService");

        let pageReference = {
            type: "comm__namedPage",
            attributes: {
                pageName: "user-group-profile-summary"
            },
            state: {
                params : results
            }
        }

        component.set("v.pageReference", pageReference);
        navService.navigate(pageReference); 
    });
   }


})