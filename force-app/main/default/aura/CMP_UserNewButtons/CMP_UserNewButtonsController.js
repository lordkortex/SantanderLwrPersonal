({
    /*
    Author:         Teresa Santos
    Company:        Deloitte
    Description:    Advance to next step
    History
    <Date>          <Author>            <Description>
    16/01/2019      Teresa Santos       Initial version
    */
    nextStep : function(component, event, helper) {
        component.set("v.currentStageNumber", 2);
        component.set("v.stage1Finished", true);
    },

    nextStep2 : function(component, event, helper) {
        component.set("v.currentStageNumber", 3);
        component.set("v.stage2Finished", true);
    },
    /*
    Author:         Teresa Santos
    Company:        Deloitte
    Description:    Go to previous step
    History
    <Date>          <Author>            <Description>
    16/01/2019      Teresa Santos        Initial version
    */
    backStep : function(component, event, helper) {
        component.set("v.currentStageNumber", 1);
    },

    backStep2 : function(component, event, helper) {
        component.set("v.currentStageNumber", 2);
    },
    /*
    Author:         Teresa Santos
    Company:        Deloitte
    Description:    Navigation to the groups main page
    History
    <Date>          <Author>            <Description>
    16/01/2019      Teresa Santos        Initial version
    */
    navigateToDetailsComponent : function(component, event, helper) {

       //component.set("v.isCancelling", true);
       component.find("Service").redirect("users", "");

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
        
     //AÑADIR PARAMETROS EN CASO DE QUE FUERA NECESARIO
     console.log("tiene Datos::::: " + component.get("v.hasData"));
        var url =
        "c__userId="+component.get("v.userId")+
        "&c__userName="+component.get("v.userName")+
        "&c__userRol="+component.get("v.selectedValueRol")+
        "&c__userGroup="+component.get("v.selectedValueGroup") +
        "&c__hasData="+component.get("v.hasData") +
        "&c__comesFrom=" + "Profile-User";
        
        component.find("Service").redirect("user-group-profile-summary", url);
    },

        /*
    Author:         Joaquin Vera 
    Company:        Deloitte
    Description:    End of the navigation
    History
    <Date>          <Author>            <Description>
    30/01/2019      Joaquin Vera        Initial version
    */
    finishStepsButtons : function(component,event,helper) {
        var url = "c__userId="+component.get("v.userId")+
        "&c__isNewUser="+component.get("v.isNewUser")+
        "&c__comesFrom="+"Profiling";
        console.log('sacamos url');
        console.log(url);
        component.find("Service").redirect("users", url);
    },

    /*
    Author:         Joaquin Vera 
    Company:        Deloitte
    Description:    End of the user creation
    History
    <Date>          <Author>            <Description>
    30/01/2019      Joaquin Vera        Initial version
    */
   cancelCreation : function(component,event,helper) {
        component.find("Service").redirect("users", "");
    },

/*
    Author:         Joaquin Vera 
    Company:        Deloitte
    Description:    End of the user creation
    History
    <Date>          <Author>            <Description>
    30/01/2019      Joaquin Vera        Initial version
    */
   showSaveModal : function(component,event,helper) {
        var cmpEvent = component.getEvent("UserButtonClicked"); 
        cmpEvent.setParams({
            buttonClicked : "SaveButton"
        });
        cmpEvent.fire(); 
},

    
})