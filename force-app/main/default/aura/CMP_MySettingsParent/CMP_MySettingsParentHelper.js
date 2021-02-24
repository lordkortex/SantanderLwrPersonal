({
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method to handle component init 
    History
    <Date>          <Author>            <Description>
    03/03/2020      Joaquin Vera        Initial version
    21/05/2020      Shahad Naji         Store wheather user infomation has been updated or not
    */
    handleDoInit : function(component, event, helper) {
       /* var isUserInformationUpdated = window.localStorage.getItem('isUserInformationUpdated');
        if(isUserInformationUpdated != null && isUserInformationUpdated != undefined){
            window.localStorage.removeItem('isUserInformationUpdated');
            window.localStorage.setItem('isUserInformationUpdated', false);           
        }
        else{
            window.localStorage.setItem('isUserInformationUpdated', false);
        }*/
        component.find("Service").callApex2(component, helper, "c.getPicklistValues", {}, helper.setPicklistValues);
        component.find("Service").callApex2(component, helper, "c.getUserSettings", {}, helper.retrieveUserInfo);
        
    },

    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method to set the user info into the component
    History
    <Date>          <Author>            <Description>
    03/03/2020      Joaquin Vera        Initial version
    */
    retrieveUserInfo : function(component, helper, response) {
        console.log(JSON.stringify(response));
        component.set("v.UserInfo", response);
        component.set("v.UserInfoEdit", response);
    },

    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method to set the picklist values into the component.
    History
    <Date>          <Author>            <Description>
    03/03/2020      Joaquin Vera        Initial version
    */
    setPicklistValues : function(component, helper, response) {

        if(response != null) 
        {
            
            let responseParsed = JSON.parse(response);

            var timeZonesList = [];
            var languagesList = [];
            var CurrenciesList = [];
            var numberFormatList = [];
            var dateFormatList = [];

            let data = component.get("v.UserPicklistValues");

            data = responseParsed;

            responseParsed.TimeZoneList.forEach(element => timeZonesList.push(element.label));
            responseParsed.LanguageList.forEach(element => languagesList.push(element.label));
            responseParsed.CurrencyList.forEach(element => CurrenciesList.push(element.label));
            responseParsed.NumberFormatList.forEach(element => numberFormatList.push(element.label));
            responseParsed.DateFormatList.forEach(element => dateFormatList.push(element.label));

            data.TimeZoneListLabel = timeZonesList;
            data.languagesListLabel = languagesList;
            data.datesListLabel = dateFormatList;
            data.numbersListLabel = numberFormatList;
            data.CurrenciesListLabel = CurrenciesList;

            

            component.set("v.UserPicklistValues", data);
        }

    }
})