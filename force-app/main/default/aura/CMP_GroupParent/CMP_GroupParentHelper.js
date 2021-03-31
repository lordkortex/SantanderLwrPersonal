({
        /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Calls to apex to get the data
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    handleDoInitCache : function(component, helper, response) {
        //component.find("Service").callApex(component, "c.getData", {}, this.setData);
        component.set("v.loadingUserInfo", true);
        let params = {
                codGrupoEmp : JSON.parse(response).inicio.profiled.codigoGrupo ,
                userId: $A.get( "$SObjectType.CurrentUser.Id" )    
        };
        component.find("Service").callApex2(component, helper, "c.getData", params, helper.setData);
    },

    handleDoInit : function(component, helper, response) {
        //component.find("Service").callApex(component, "c.getData", {}, this.setData);
        component.set("v.loadingUserInfo", true);
        let params = {
                codGrupoEmp : response.inicio.profiled.codigoGrupo ,
                userId: $A.get( "$SObjectType.CurrentUser.Id" )    
        };
        component.find("Service").callApex2(component, helper, "c.getData", params, helper.setData);
        component.find("Service").saveToCache("profileInfo", response.inicio);
    },

    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Sets the data returned from the apex controller
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    setData : function(component, helper, response) {
        //Unparse the return
        component.set("v.groupList", response.administration[0].grupoUsuarios);
        component.set("v.loadingUserInfo", false);
    },
    
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method to encrypt the data before navigating to another page.
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    encrypt : function(component, data){  
        var result="null";
        var action = component.get("c.encryptData");
        action.setParams({ str : data });
        // Create a callback that is executed after 
        // the server-side action returns
        return new Promise(function (resolve, reject) {
                action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "ERROR") {
                        var errors = response.getError();
                        if (errors) {
                        if (errors[0] && errors[0].message) {
                               
                                reject(response.getError()[0]);
                        }
                        } 
                }else if (state === "SUCCESS") {
                        result = response.getReturnValue();
                }
                        resolve(result);
                });
                $A.enqueueAction(action);
        });
    },

})