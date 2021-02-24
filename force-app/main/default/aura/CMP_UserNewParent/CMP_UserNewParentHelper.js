({
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Launches when a button is clicked
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    handleDoInit : function(component,event,helper) {
       
            var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
            component.find("Service").dataDecryption(component,helper, sPageURLMain, this.handleParams);
    },

    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Controls the data from the user,
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
   handleParams : function (component, helper, response) 
   {
       console.log(response);
       var userInfo = component.get("v.userInfo");
       var temp;
       for(var i = 0; i < response.length ; i++) {
           
           temp = response[i].split("=");
           switch(temp[0]) {
               case("c__userId"):
                   component.set("v.userIdInput", temp[1]);
                   console.log('llega');
                   component.find("Service").callApex2(component, helper, "c.getUserInfo", {userId : temp[1]}, helper.retrieveUserInfo);
                   break;
           }
       }
       component.set("v.userInfo", userInfo);



   },
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Gets the user information and sets it into the component.
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    retrieveUserInfo : function (component, helper, response) {
        console.log("entra 2");
        console.log(JSON.stringify(response));
        component.set("v.userInfo", response);
    },
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Gets the user information and sets it into the component.
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
   checkFields : function (component, helper, response) {
        var isCorrect = true;
        var isFormFillCorrect = true;
        var userIdLengthValidation = true;
        console.log('longitud corporates list');
        console.log(component.get("v.selectedCorporates").length);
        // if(component.get("v.userInfo.userId").length < 5)
        // {
        //     isCorrect = false
        // }
        if(
            component.get("v.userInfo.userId") == null || component.get("v.userInfo.userId") == '' || component.get("v.userInfo.userId") == undefined ||
            component.get("v.userInfo.userName") == null || component.get("v.userInfo.userName") == '' || component.get("v.userInfo.userName") == undefined ||
            component.get("v.userInfo.userSurname") == null || component.get("v.userInfo.userSurname") == '' || component.get("v.userInfo.userSurname") == undefined  ||
            component.get("v.userInfo.type_Z") == null || component.get("v.userInfo.type_Z") == '' || component.get("v.userInfo.type_Z") == undefined ||
            component.get("v.userInfo.State") == null || component.get("v.userInfo.State") == '' || component.get("v.userInfo.State") == undefined ||
            component.get("v.userInfo.Language") == null || component.get("v.userInfo.Language") == '' ||  component.get("v.userInfo.Language") ==  undefined ||
            component.get("v.userInfo.NumberFormat") == null || component.get("v.userInfo.NumberFormat") == '' || component.get("v.userInfo.NumberFormat") == undefined ||
            component.get("v.userInfo.TimeZone") == null || component.get("v.userInfo.TimeZone") == ''  || component.get("v.userInfo.TimeZone") == undefined ||
            component.get("v.userInfo.dateFormat") == null || component.get("v.userInfo.dateFormat") == '' || component.get("v.userInfo.dateFormat") == undefined ||
            component.get("v.userInfo.Email") == null || component.get("v.userInfo.Email") == ''  || component.get("v.userInfo.Email") == undefined){
                component.set("v.showToast", true);
                component.set("v.typeToast", 'warning'); 
                component.set("v.messageToast",  $A.get("$Label.c.ToastReviewMandatoryFields"));
                isCorrect = false;
                isFormFillCorrect = false;
                userIdLengthValidation = false;
                console.log('Faltan campos por rellenar');
                
            }

        
        if(
            (component.get("v.userInfo.userId") != null && component.get("v.userInfo.userId") != '' 
            && component.get("v.userInfo.userId") != undefined) &&
            (component.get("v.userInfo.type_Z") != null && component.get("v.userInfo.type_Z") != '' 
            && component.get("v.userInfo.type_Z") != undefined) && userIdLengthValidation && 
            (component.get("v.userInfo.userId").length < 5 || component.get("v.userInfo.userId").length >15)){
                        component.set("v.showToast", true);
                        component.set("v.typeToast", 'warning');
                        component.set("v.messageToast", $A.get("$Label.c.UserNewUserIdValidation"));
                        isCorrect = false;
                        isFormFillCorrect = false;
            }

         // SOLO APLICA PARA TIPO FUNCIONAL Y ADVISORY
         if( component.get("v.selectedCorporates").length == 0 &&
             isFormFillCorrect && userIdLengthValidation && 
             (component.get("v.userInfo.type_Z") == 'Functional' || component.get("v.userInfo.type_Z") == 'Advisory')){
                component.set("v.showToast", true);
                component.set("v.typeToast", 'warning');
                component.set("v.messageToast",  $A.get("$Label.c.UserNewLeastOneCorporate"));
                isCorrect = false;
        }

        if(isCorrect) 
        {
            var url =  'c__showToast='+component.get("v.userInfo.type_Z");
            // component.set("v.showModal", true);
            // component.set("v.modalToShow", "ConfirmCreation" );
            if(component.get("v.userIdInput") == undefined )
            {
                url = 'c__userId=' + component.get("v.userInfo.userId") + 
                '&c__userName=' + component.get("v.userInfo.userName") + 
                '&c__comesFrom=' + 'Creation';
                component.find("Service").redirect("profile-user", url);
                
            }else
            {
                component.find("Service").redirect("users", url);
            }
        }
    }
    
})