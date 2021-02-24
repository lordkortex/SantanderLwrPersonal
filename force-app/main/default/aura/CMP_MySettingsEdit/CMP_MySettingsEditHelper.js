({
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Launches when the save button is clicked
    History
    <Date>          <Author>            <Description>
    03/03/2020      Joaquin Vera        Initial version
    */
    handleSave : function (component, event, helper) 
    { 
        component.find('Service').callApex2(component, helper, "c.saveData", {'userInfoCmp' : component.get("v.UserInfoEdit") }, helper.getCachedInfo);
        
    },
    
    
    /*
    Author:         Antonio Duarte
    Company:        Deloitte
    Description:    Gets the cached information
    History
    <Date>          <Author>            <Description>
    12/08/2020      Antonio Duarte        Initial version
    */
    getCachedInfo : function (component, helper, response){
        component.find("Service").retrieveFromCache(component, helper, 'balanceEODGP', helper.saveDataToCacheEOD);
        component.find("Service").retrieveFromCache(component, helper, 'balanceGP', helper.saveDataToCacheLU);
    },
    
    /*
    Author:         Antonio Duarte
    Company:        Deloitte
    Description:    Saves the new user information to cache
    History
    <Date>          <Author>            <Description>
    12/08/2020      Antonio Duarte        Initial version
    */
   saveDataToCacheEOD : function (component, helper, response) 
   {
       console.log(component.get('v.UserInfoEdit.DateFormat'));
       console.log(component.get('v.UserInfoEdit.NumberFormat'));
       
       var parsedResponse;
       if(response != null){
           parsedResponse = JSON.parse(response);
           console.log(parsedResponse);
           if(parsedResponse != null && parsedResponse.mapUserFormats != null){
                parsedResponse.mapUserFormats.dateFormat = component.get('v.UserInfoEdit.DateFormat');
                parsedResponse.mapUserFormats.numberFormat = component.get('v.UserInfoEdit.NumberFormat');

                //AB - 20/11/2020 - INC773
                if(parsedResponse.responseGP != null && parsedResponse.responseGP.mapUserFormats != null){
                    parsedResponse.responseGP.mapUserFormats.dateFormat = component.get('v.UserInfoEdit.DateFormat');
                    parsedResponse.responseGP.mapUserFormats.numberFormat = component.get('v.UserInfoEdit.NumberFormat');
                }
                if(parsedResponse.responseAcc != null && parsedResponse.responseAcc.mapUserFormats != null){
                    parsedResponse.responseAcc.mapUserFormats.dateFormat = component.get('v.UserInfoEdit.DateFormat');
                    parsedResponse.responseAcc.mapUserFormats.numberFormat = component.get('v.UserInfoEdit.NumberFormat');
                }


               component.find("Service").saveToCache('balanceEODGP', parsedResponse);
           }
       }
       
       setTimeout(function(){
           helper.handleCancel(component, helper, true);
       }, 1000);
   },

    /*
    Author:         Antonio Duarte
    Company:        Deloitte
    Description:    Saves the new user information to cache
    History
    <Date>          <Author>            <Description>
    12/08/2020      Antonio Duarte        Initial version
    */
    saveDataToCacheLU : function (component, helper, response) 
    {
        console.log(component.get('v.UserInfoEdit.DateFormat'));
        console.log(component.get('v.UserInfoEdit.NumberFormat'));
        
        var parsedResponse;
        if(response != null){
            parsedResponse = JSON.parse(response);
            console.log(parsedResponse);
           
            if(parsedResponse != null && parsedResponse.mapUserFormats != null){
                parsedResponse.mapUserFormats.dateFormat = component.get('v.UserInfoEdit.DateFormat');
                parsedResponse.mapUserFormats.numberFormat = component.get('v.UserInfoEdit.NumberFormat');

                //AB - 20/11/2020 - INC773
                if(parsedResponse.responseGP != null && parsedResponse.responseGP.mapUserFormats != null){
                    parsedResponse.responseGP.mapUserFormats.dateFormat = component.get('v.UserInfoEdit.DateFormat');
                    parsedResponse.responseGP.mapUserFormats.numberFormat = component.get('v.UserInfoEdit.NumberFormat');
                }
                if(parsedResponse.responseAcc != null && parsedResponse.responseAcc.mapUserFormats != null){
                    parsedResponse.responseAcc.mapUserFormats.dateFormat = component.get('v.UserInfoEdit.DateFormat');
                    parsedResponse.responseAcc.mapUserFormats.numberFormat = component.get('v.UserInfoEdit.NumberFormat');
                }


               component.find("Service").saveToCache('balanceGP', parsedResponse);
           }
        }
        
        setTimeout(function(){
    		helper.handleCancel(component, helper, true);
		}, 1000);
    },
    
    
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Launches when the cancel button is clicked
    History
    <Date>          <Author>            <Description>
    03/03/2020      Joaquin Vera        Initial version
    21/05/2020      Shahad Naji         Store wheather user infomation has been updated or not
    */
    handleCancel : function (component, helper, response) 
    { 
        component.set("v.isEditing", false);
        if(response != null);
        if(response == true) {
            location.reload();
        }
    }
})