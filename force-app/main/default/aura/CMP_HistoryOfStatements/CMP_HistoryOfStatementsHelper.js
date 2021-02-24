({
    handleDoInit : function(component,event,helper) {

        var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
        if(sPageURLMain == "" || !sPageURLMain.includes("params"))
        {
            var userId = $A.get( "$SObjectType.CurrentUser.Id" );
            component.find("Service").retrieveFromCache(component, helper, 'balanceEODGP', helper.populateServiceProfiling);
            // component.find("Service").callApex2(component, helper, "c.retrieveInitialData", {userId: $A.get( "$SObjectType.CurrentUser.Id" )}, this.setData);
        }
        else
        {
            component.find("Service").dataDecryption(component,helper, sPageURLMain, this.handleParams);

        }

    },

    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Receives the decrypted params and
                    sets the screen data
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
   handleParams : function (component, helper, response){
        if(response != "") {
            var sParameterName;
            var accountDetails = [];
            for(var i = 0; i < response.length ; i++) {
                sParameterName = response[i].split("="); 
                
                switch(sParameterName[0]) {
                    case("c__comesFrom"):
                        sParameterName[1] === undefined ? 'Not found' : component.set("v.comesFrom", sParameterName[1]);
                        var listObject = [];
                        listObject.push({});
                        if(component.get("v.dates") != undefined){
                            listObject[0].data = component.get("v.dates");
                        }
                        listObject[0].name = 'Book date';
                        listObject[0].type = 'dates';
                        listObject[0].displayFilter = true;
                        component.set("v.filters", listObject);

                        break;  
                    case("c__accountName"):
                        sParameterName[1] === undefined ? 'Not found' :  component.set("v.accountName", sParameterName[1]);
                        break;
                    case("c__currentCurrency"):
                        sParameterName[1] === undefined ? 'Not found' : component.set("v.accountCurrency", sParameterName[1]);
                        break;
                    case("c__accountNumber"):
                        sParameterName[1] === undefined ? 'Not found' : component.set("v.accountNumber", sParameterName[1]);
                        break;
                    case("c__bankName"):
                        sParameterName[1] === undefined ? component.set("v.bankName", "") : component.set("v.bankName", sParameterName[1]);
                        break;
                    case("c__accountCode"):
                        sParameterName[1] === undefined ? 'Not found' :component.set("v.accountCode", sParameterName[1]);
                        break;
                    case("c__subsidiaryName"):
                    sParameterName[1] === undefined ? component.set("v.subsidiaryName", "") : component.set("v.subsidiaryName", sParameterName[1]);
                        break;
                }
            }  
        }
        if(component.get("v.comesFrom") == "Accounts")
        {
            accountDetails[0] = new Object();
            accountDetails[0].codigoCuenta = component.get("v.accountCode");
            accountDetails[0].alias = component.get("v.accountName");
            accountDetails[0].bankName = component.get("v.bankName");
            accountDetails[0].subsidiaryName = component.get("v.subsidiaryName");
            accountDetails[0].displayNumber = component.get("v.accountNumber");
            accountDetails[0].currencyCodeAvailableBalance = component.get("v.accountCurrency");
            component.set("v.selectedAccountObject", accountDetails);
            var dates = helper.checkDates(component, helper);
            helper.getISOStringFromDateString(component,dates,helper, component.get("v.accountCode"));
        }
    
    },

    setData : function(component,helper, response) {

        var codes=  response.responseAcc.accountList.map(function(item) {
            if(item['currencyCodeAvailableBalance'] != undefined)
            {
                return item['currencyCodeAvailableBalance'] + ' - ' +  item['displayNumber'];
            }
            else
            {
                return item['displayNumber'];
            }
            
          });

        component.set("v.accountsListString", codes);
        component.set("v.accountsList",  response.responseAcc.accountList);

        component.set("v.tableData", response.responseAcc.accountList);
        component.set("v.userDateFormat", response.mapUserFormats.dateFormat);
        component.set("v.userNumberFormat", response.mapUserFormats.numberFormat);
        component.set("v.loading", false);

        component.find("Service").saveToCache('balanceEODGP', response);
        
        		
    },

    handleSearch : function(component,helper)
    {
        var that = this;
        component.set("v.loading", true);
        if(component.get("v.comesFrom") != "Accounts")
        {
            var selectedAccount = (component.get("v.selectedAccount").includes('-') ? component.get("v.selectedAccount").split('- ')[1] : component.get("v.selectedAccount"));
    
            var matchingAccount = component.get("v.accountsList").filter( data => data['displayNumber'] == selectedAccount);
            component.set("v.selectedAccountObject", matchingAccount);
            var dates = component.get("v.dates");
            
            component.set("v.accountCurrency", (component.get("v.selectedAccount").includes('-') ? component.get("v.selectedAccount").split('- ')[0] :""));
            that.getISOStringFromDateString(component,dates,helper, matchingAccount[0].codigoCuenta);


        }
        else
        {
            var datesOK = this.validateDates(component,event,helper);
            if(datesOK)
            {
                var dates = this.checkDates(component, helper);

                var selectedAccount = component.get("v.accountNumber");
                if(component.get("v.selectedAccountObject") == null || component.get("v.selectedAccountObject") == undefined)
                {
                    var selectedAccountObject = {};
                    selectedAccountObject.accountCode = component.get("v.accountCode");
                    selectedAccountObject.accountNumber = selectedAccount;
                    selectedAccountObject.bankName = component.get("v.bankName");
                    selectedAccountObject.subsidiaryName = component.get("v.subsidiaryName");
                    selectedAccountObject.accountCurrency = component.get("v.accountCurrency");
                    component.set("v.selectedAccountObject", selectedAccountObject);
                }
                
                this.getISOStringFromDateString(component,dates,helper, component.get("v.accountCode"));
            }
            else{
                component.set("v.loading", false); 
            }
            
        }

    },


    setHistoryList : function(component,helper,response)
    {
        if(response == null)
        {
            component.set("v.tableData", []);
            component.set("v.loading", false);

        }
        else
        {
            component.set("v.tableData", response.listaSaldos);
            component.set("v.loading", false);


        }
        component.set("v.hasSearched", true);
    },

    checkDates: function (component, helper){
        
        var dates = component.get("v.dates");
        // Only To date is filled, then fill From with -25 months
		if(dates[0] == undefined && dates[1] != undefined){
			var toDate = new Date(Date.parse(dates[1]));
			var fromDate = new Date(toDate.setMonth(toDate.getMonth() - 25));
			var finalDate = "";
			var aux = toDate.getMonth() + 1;
			finalDate = fromDate.getFullYear() + "-" + aux + "-" + fromDate.getDate();
			dates[0] = finalDate;
			component.set("v.dates", dates);
		// Only From date is filled, then fill until today
		} if(dates[1] == undefined && dates[0] != undefined || dates[0] > dates[1]){

			var toDate = new Date(Date.now());
			var fromDate = new Date(Date.parse(dates[0]));
			var finalDate = "";
			if(fromDate >= toDate){
				toDate.setMonth(fromDate.getMonth() + 25);
			}
			var aux = toDate.getMonth() + 1;
			finalDate = toDate.getFullYear() + "-" + aux + "-" + (toDate.getDate()-1);
			dates[1] = finalDate;
			component.set("v.dates", dates);
        }
        if(dates[0] == undefined && dates[1] == undefined)
		{
			var toDate = new Date(Date.now());
			toDate.setDate(toDate.getDate() -1);

			var fromDate = new Date(toDate.setMonth(toDate.getMonth() - 25));

			var toDate2 = new Date(Date.now());
			toDate2.setDate(toDate2.getDate() -1);

			var toDateFinal = toDate2.getFullYear() + "-" + (toDate2.getMonth() +1) + "-" + toDate2.getDate();
			var fromDateFinal = fromDate.getFullYear() + "-" + (fromDate.getMonth() + 1) + "-" + fromDate.getDate();

			dates[0] = fromDateFinal;
            dates[1] = toDateFinal;
			 //component.set("v.dates", dates);
            component.set("v.dates", []);
        }
        
        return dates;
    },

    validateDates : function (component,event,helper)
    {
        var datesOK = true;
        var dates = component.get("v.dates");
        if(dates[0] != undefined && dates[1] != undefined)
		{
			var dateFromCheck = new Date(dates[0] + 'T00:00:00.000Z');
			var dateToCheck = new Date(dates[1] + 'T00:00:00.000Z');

			var toDate = new Date(Date.now());
			toDate.setDate(toDate.getDate() -2);

			var fromDate = new Date(toDate.setMonth(toDate.getMonth() - 25));

			var toDate2 = new Date(Date.now());
			toDate2.setDate(toDate2.getDate() -1);
			




			if(dateFromCheck.getTime() > dateToCheck.getTime())
			{
				component.set("v.errorMessageTo", 'From date cannot be higher than to date');
				datesOK = false;
			} 
        }
        return datesOK;
    },

    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to convert an string date (2019-04-15 or 2019-4-15)
                    to ISO date (2019-04-15T00:00:00.000Z) from the user's timezone
                    to GMT 0
    History
    <Date>          <Author>           	   <Description>
    18/04/2020      Guillermo Giral        Initial version
    22/04/2020      R. Cervino             Fix
    27/04/2020      Guillermo Giral        Rework of funnctionality so the user's
                                           timezone is taken into account
    */
   getISOStringFromDateString : function (component, dateString, helper, codCuenta){
        var action = component.get("c.getCurrentUserTimezoneOffSetInMiliseconds");
        action.setParams({ dateInput : [dateString[0],dateString[1]] }); 
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var res =response.getReturnValue();
                if(res!=null && res!=undefined && res!=""){
                    var from = this.formatDateGMT(component, dateString[0],res[dateString[0]], true);
                    var to = this.formatDateGMT(component, dateString[1],res[dateString[1]], false);
                    var dates = [];
                    dates[0] = from;
                    dates[1] = to;
                    component.find("Service").callApex2(component, helper, "c.searchExtracts", {
                        accountCode: codCuenta,
                        dateFrom : dates[0],
                        dateTo : dates[1]
            
                    }, this.setHistoryList);
                }
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    component.set("v.errorAccount",true);
                    
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        
        $A.enqueueAction(action);
    },



    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to convert an string date (2019-04-15 or 2019-4-15)
                    to ISO date (2019-04-15T00:00:00.000Z) from the user's timezone
                    to GMT 0
    History
    <Date>          <Author>           	   <Description>
    18/04/2020      Guillermo Giral        Initial version
    22/04/2020      R. Cervino             Fix
    27/04/2020      Guillermo Giral        Rework of funnctionality so the user's
                                        timezone is taken into account
    */
    formatDateGMT : function (component, dateString, res, beginningOfDay){
        
        
        var timeZoneOffsetInMs = res;
        var MS_PER_HOUR = 3600000;
        var MS_PER_MIN = 60000;
        // Get the date and format it in a proper way
        var dateChunks = dateString.split('-');
        var monthChunk = dateChunks[1];
        var dayChunk = dateChunks[2];
        if(dateChunks[1].length < 2){
            monthChunk = "0" + dateChunks[1];
        }
        if(dateChunks[2].length < 2){
            dayChunk = "0" + dateChunks[2];
        }
        dateString = dateChunks[0] + '-' + monthChunk + '-' + dayChunk;
        // We have the user's locale timezone from Salesforce and a date created with the browser's timezone
        // So first we need to adapt both values
        var timezoneOffsetDate = new Date();
        
        var localTimezoneOffSet = timezoneOffsetDate.getTimezoneOffset()*MS_PER_MIN;
        //GET DATESTRING NO GMT
        
        var x = new Date(Date.parse(dateString));
        
        const getUTC = x.getTime();
        const offset = x.getTimezoneOffset() * 60000;
        var xx = new Date(getUTC+offset).toString();
        var newDate; 
        newDate = new Date(Date.parse(xx) - timeZoneOffsetInMs );
        
        
        if(!beginningOfDay){
            newDate.setTime(newDate.getTime() +  (MS_PER_HOUR*24));
            newDate.setTime(newDate.getTime() - 1);
        }
        var month = parseInt(newDate.getMonth())+1;
        if(month < 10){
            month = '0' + month;
        }
        var day = newDate.getDate();
        var hour=newDate.getHours();
        
        var mins = newDate.getMinutes();
        var secs = newDate.getSeconds();
        var msecs = newDate.getMilliseconds();
        if(hour < 10){
            hour = '0' + hour;
        }
        if(day < 10){
            day = '0' + day;
        }
        if(mins < 10){
            mins = '0' + mins;
        }
        if(secs < 10){
            secs = '0' + secs;
        }
        if(msecs > 9 && msecs < 100){
            msecs = '0' + msecs;
        } else if(msecs < 10){
            msecs = '00' + msecs;
        }
        var finalDate = newDate.getFullYear() + '-' + month + '-' + day +'T' + hour + ':' + mins + ':' + secs + '.' + msecs + 'Z';
        if(beginningOfDay){
            component.set("v.fromDate",finalDate);
        }else{
            component.set("v.toDate",finalDate);
        }
        
        return finalDate;
        
    },

    populateServiceProfiling : function(component,helper, response)
    {
        var responseParsed;
        if(response)
        {
            responseParsed = JSON.parse(response);

 
        }
        else
        {
            component.find("Service").callApex2(component, helper, "c.retrieveInitialData", {userId: $A.get( "$SObjectType.CurrentUser.Id" )}, helper.setData);

        }

        if(responseParsed != undefined)
        {
            var codes=  responseParsed.responseAcc.accountList.map(function(item) {
                if(item['currencyCodeAvailableBalance'] != undefined)
                {
                    return item['currencyCodeAvailableBalance'] + ' - ' +  item['displayNumber'];
                }
                else
                {
                    return item['displayNumber'];
                }
                
              });

            component.set("v.accountsListString", codes);
            component.set("v.accountsList",  responseParsed.responseAcc.accountList);
            component.set("v.tableData", responseParsed.responseAcc.accountList);
            component.set("v.userDateFormat", responseParsed.mapUserFormats.dateFormat);
            component.set("v.userNumberFormat", responseParsed.mapUserFormats.numberFormat);
            component.set("v.loading", false);
        }

    }





})