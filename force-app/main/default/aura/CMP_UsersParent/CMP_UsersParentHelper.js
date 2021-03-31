({


    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Calls to apex to get the data
    History
    <Date>          <Author>            <Description>
    10/01/2020      Joaquin Vera        Initial version
    */
   handleDoInit : function(component, helper, response) 
   {

        $A.util.removeClass(component.find("spinner"), "slds-hide"); 
        var userValues = JSON.parse(response);
        component.set("v.cdemgr", userValues.inicio.user.codigoCliente.toString());
        component.set("v.nombreCliente", userValues.inicio.user.nombreCliente.toString());

        var sPageURLMain = decodeURIComponent(window.location.search.substring(1));

        component.find("Service").dataDecryption(component,helper, sPageURLMain, helper.handleParams);
        component.find("Service").callApex2(component, helper, "c.getUsersInfo", {}, helper.setData);
   },

   /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Controls the data from the user,
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
   handleParams : function (component, helper, response){
       
        if(response != "") {
            var temp;
            for(var i = 0; i < response.length ; i++) {
                temp = response[i].split("="); 
                switch(temp[0]) {
                    case("c__showToast"):
                        component.set("v.toShow", true);
                        if(temp[1] == 'Functional' || temp[1] == 'Advisory'){
                            component.set("v.message", $A.get("$Label.c.UseryModifiedFunctionalAdvisory")); 
                        }else if(temp[1] == 'Administrator' ){
                            component.set("v.message", $A.get("$Label.c.UseryModifiedAdministrator")); 
                        } 
                       
                        break;
                    case("c__isNewUser"):
                        if(temp[1] == "true") {
                            component.set("v.toShow", true);  
                            component.set("v.message", $A.get("$Label.c.UserSuccessfullyCreated"));				 
                        }
                        break;
                }
            }
	    }
   },



  

    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Sets the data returned from the apex controller
    History
    <Date>          <Author>            <Description>
    10/01/2020      Joaquin Vera        Initial version
    */
    setData : function(component,helper, response) 
    {
        //Unparse the return
        console.log('devuelve');
        console.log(response);
        component.set("v.usersList", response);
        component.set("v.usersFilter", response);
        $A.util.addClass(component.find("spinner"), "slds-hide");   

        var userId;
        var whereComesFrom;
        
        try
        {
            var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
            var sURLVariablesMain = sPageURLMain.split('&')[0].split("="); 
            var sParameterName;
            var sPageURL;
    
            if (sURLVariablesMain[0] == 'params') 
            {
                helper.decrypt(component,sURLVariablesMain[1]).then(function(results){
                    sURLVariablesMain[1] === undefined ? 'Not found' : sPageURL = results;
                    var sURLVariables=sPageURL.split('&');
    
                    for ( var i = 0; i < sURLVariables.length; i++ ) 
                    {
                        sParameterName = sURLVariables[i].split('=');   
                        if (sParameterName[0] === 'c__userId') 
                        { 
                            sParameterName[1] === undefined ? 'Not found' : userId = sParameterName[1];
                        }else if (sParameterName[0] === 'c__comesFrom') 
                        {   
                            sParameterName[1] === undefined ?  'Not found' : whereComesFrom = sParameterName[1];
                        }
                    }
                    if(whereComesFrom == "Profiling") 
                    {
                        console.log('[CMP_UsersParentHelper.setData]: ' + 'Comes here');
                        var user = component.get("v.usersList").filter(data => data.userId == userId)[0];
                        if(user != null) 
                        {
                            component.set("v.toastText", $A.get("$Label.c.Users_ConfirmProfiled").replace("{}", (user.userName + user.userSurname)));
                            component.set("v.showToast", true);
                        }
                        
                    }
                });
            }
        } catch (e) 
        {
            console.log('entra en el catch');
            console.log(e);
        }

    },

    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Regenerates the password on apex
    History
    <Date>          <Author>            <Description>
    16/01/2020      Joaquin Vera        Initial version
    */
   regeneratePassword : function(component, event, helper)
   {  
           var userIdEvent = event.getParam("userInteraction").userId;
        component.find("Service").callApex(component, "c.regeneratePassword", {userId : userIdEvent}, this.showToast);
    },

    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Regenerates the password on apex
    History
    <Date>          <Author>            <Description>
    16/01/2020      Joaquin Vera        Initial version
    */
   showToast : function(component, helper, response)
   {  
        component.set("v.showToast", true);
    }, 
    
    /*
	Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Function to decypt the URL params that is sended from the users component.
    History
    <Date>			<Author>			<Description>
	26/12/2019		Joaquin Vera      	Initial version
	*/
    decrypt : function(component, data)
    {
        try 
        {
            var result="null";
            var action = component.get("c.decryptData");
    
            action.setParams({ str : data }); 
            
            return new Promise(function (resolve, reject) {
                action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                        errors[0].message);
                                reject(response.getError()[0]);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }else if (state === "SUCCESS") {
                    result = response.getReturnValue();
                }
                    resolve(result);
                });
                $A.enqueueAction(action);
            });

        } catch(e) {
            console.error(e);
        }
    }


})