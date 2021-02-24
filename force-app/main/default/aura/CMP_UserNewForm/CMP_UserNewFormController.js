({
  /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method to handle component init
    History
    <Date>          <Author>            <Description>
    18/02/2020      Joaquin Vera        Initial version
    */
    doInit : function(component, event, helper) {
        component.set("v.typesList", ['Functional', 'Advisory', 'Administrator']);
        component.set("v.statesList",[ "Enabled", "Disabled", "Pending"]);
        component.set("v.languagesList", ['English', 'Español', 'Français', 'Italiano', 'Porguguês']);
        component.set("v.TimeZoneList", ['GMT-1', 'GMT-2','GMT-3','GMT-4','GMT-5','GMT-6','GMT-7','GMT-8','GMT-9','GMT-10','GMT-11','GMT-12',
                                        'GMT+1','GMT+2','GMT+3','GMT+4','GMT+5','GMT+6','GMT+7','GMT+8','GMT+9','GMT+10','GMT+11','GMT+12']);

        component.set("v.NumberFormatList", ['###.###.###.##', '###,###,###,##', '#########.##', '#########,##']);
        component.set("v.dateFormatList", ['dd/MM/yyyy', 'MM/dd/yyyy']);
        component.set("v.typeAndNumberList", ['Physical', 'Virtual']);

        if(component.get("v.userInfo.tieneVasco")  == null || component.get("v.userInfo.tieneVasco") == undefined ) {
            component.set("v.userInfo.tieneVasco", "N");
            component.set("v.userInfo.tipoVasco","Physical");
        } if(component.get("v.userInfo.mobileApp") == null || component.get("v.userInfo.mobileApp") == undefined ) {
            component.set("v.userInfo.mobileApp", "N");
        }
        if(component.get("v.userInfo.State") == null || component.get("v.userInfo.mobileApp") == undefined ) {
            component.set("v.userInfo.State", "Enabled");
        }
        if(component.get("v.userInfo.type_Z") == null || component.get("v.userInfo.mobileApp") == undefined ) {
            component.set("v.userInfo.type_Z", "Functional");
        }

    },
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    This method fires when data is updated and saves it into the component
    History
    <Date>          <Author>            <Description>
    18/02/2020      Joaquin Vera        Initial version
    */
    updateData : function(component, event, helper) {
        var id = event.currentTarget.id;
        var value = event.currentTarget.value;
        switch(id) {
            case "inputId":
                component.set("v.userInfo.userId", value);
                break;

            case "inputName":
                component.set("v.userInfo.userName", value);
                break;

            case "inputSurname":
                component.set("v.userInfo.userSurname", value);
                break;
                
            case "inputEmail":
                component.set("v.userInfo.Email", value);
                break;

            case "inputPhone":
                component.set("v.userInfo.Phone", value);
                break;

            case "inputAddress":
                component.set("v.userInfo.Address", value);
                break;
        }

    },

    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    This mehod fires when radio buttons data are changed.
    History
    <Date>          <Author>            <Description>
    18/02/2020      Joaquin Vera        Initial version
    */
    updateRadios : function (component, event, helper) {
        var id = event.currentTarget.id;

        switch(id) {
            case "mobileYes":
                component.set("v.userInfo.mobileApp", "Y");
                break;

            case "mobileFalse":
                component.set("v.userInfo.mobileApp", "N");
                break;

            case "cryptoYes":
                component.set("v.userInfo.tieneVasco", "Y");
                break;
                
            case "cryptoNo":
                component.set("v.userInfo.tieneVasco", "N");
                break;
        }
    },
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method to handle data change.
    History
    <Date>          <Author>            <Description>
    18/02/2020      Joaquin Vera        Initial version
    */
    dataChange : function (component, event, helper) {
        let userInfo = component.get("v.userInfo");
        
        if (userInfo.type_Z == 'Functional' &&  userInfo.State == 'Enabled') 
        {
            component.set("v.renderCrypto", true);
            component.set("v.renderMobile", true);
            component.set("v.renderCorporates", true);
        }
        
        else if (userInfo.type_Z == 'Functional' &&  (userInfo.State == 'Disabled' || userInfo.State == 'Pending' ) ) 
        {
            component.set("v.renderCrypto", false);
            component.set("v.renderMobile", true);
            component.set("v.renderCorporates", true);
        }

        else if (userInfo.type_Z == 'Advisory' &&  (userInfo.State == 'Enabled' || userInfo.State == 'Disabled' || userInfo.State == 'Pending' )) 
        {
            component.set("v.renderCrypto", false);
            component.set("v.renderMobile", true);
            component.set("v.renderCorporates", true);
        }

         else if (userInfo.type_Z == 'Administrator' &&  (userInfo.State == 'Enabled' || userInfo.State == 'Disabled' || userInfo.State == 'Pending' )) 
        {
            component.set("v.renderCrypto", false);
            component.set("v.renderMobile", false);
            component.set("v.renderCorporates", false);
        }

        if(userInfo.tipoVasco == 'Virtual')
        {
            component.set("v.userInfo.VascoNumber", "");
        } 
    },


    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method that fires when obtain crypto button is clicked
    History
    <Date>          <Author>            <Description>
    18/02/2020      Joaquin Vera        Initial version
    */
    obtainCrypto : function(component,event, helper) {
        //Sets a default value.
        component.set("v.userInfo.VascoNumber", "FDT9097674");
    }

    


})