({

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to refresh the pills information
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    refreshPills : function(component, event, helper) {
        try {
            //Get all the pills to show
            var thatContains=component.get("v.thatContains");
            var beneficiaryAccount= component.get("v.beneficiaryAccount");
            var currency= component.get("v.selectedCurrency");
            var settledFrom=component.get("v.settledFrom");
            var settledTo=component.get("v.settledTo");
            var dateFrom=component.get("v.dateFrom");
            var dateTo=component.get("v.dateTo");
            var selectedStatus=component.get("v.selectedStatus");
            var country=component.get("v.selectedCountry");
            var account=component.get("v.selectedAccount");
            
            var filter='{"searchData": {"latestPaymentsFlag": "NO","_limit": "1000","_offset": "0", "inOutIndicator" : "' + component.get("v.inOutIndicator") + '",';
            var count=0;
            //Set the pills array and the filters String
            if(settledFrom!=null && settledFrom!="" && (settledTo==null || settledTo=="")){
                filter+='"amountFrom":"'+settledFrom+'",';
                filter+='"amountTo":"999999999999999999",';
                count+=1;
            }
            if(settledTo!=null && settledTo!="" && (settledFrom==null || settledFrom=="")){
                filter+='"amountTo":"'+settledTo+'",';
                filter+='"amountFrom":"0",';
                count+=1;
            }
            if(settledTo!=null && settledTo!="" && settledFrom!=null && settledFrom!=""){
                filter+='"amountTo":"'+settledTo+'",';
                filter+='"amountFrom":"'+settledFrom+'",';
                count+=1;

            }
            if(dateFrom!=null && dateFrom!="" && dateFrom!= $A.get("$Label.c.from") && (dateTo==null || dateTo=="" || dateTo== $A.get("$Label.c.to"))){

                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth()+1).padStart(2, '0'); //As January is 0.
                var yyyy = today.getFullYear();
                today = yyyy+'-'+mm+'-'+dd;

                filter+='"valueDateFrom":"'+dateFrom+'",';
                filter+='"valueDateTo":"'+today+'",';
                count+=1;

            }
            if(dateTo!=null && dateTo!="" && dateTo!= $A.get("$Label.c.to") && (dateFrom==null || dateFrom=="" || dateFrom== $A.get("$Label.c.from"))){
                filter+='"valueDateTo":"'+dateTo+'",';
                var e = new Date(dateTo);
                e.setMonth(e.getMonth()-25);
                var dd = String(e.getDate()).padStart(2, '0');
                var mm = String(e.getMonth()+1).padStart(2, '0'); //As January is 0.
                var yyyy = e.getFullYear();
                var date = yyyy+'-'+mm+'-'+dd;

                filter+='"valueDateFrom":"'+date+'",';
                count+=1;

            }

            if(dateTo!=null && dateTo!="" && dateTo!= $A.get("$Label.c.to") && dateFrom!=null && dateFrom!="" && dateFrom!= $A.get("$Label.c.from")){
                filter+='"valueDateTo":"'+dateTo+'",';
                filter+='"valueDateFrom":"'+dateFrom+'",';
                count+=1;

            }

            if(thatContains!=null && thatContains!=""){
                filter+='"searchText":"'+thatContains+'",';
                count+=1;

            }

            if(beneficiaryAccount!=null && beneficiaryAccount!=""){
                if(component.get("v.inOutIndicator") == "OUT")
                {
                    filter +='"beneficiaryAccountList": [{';
                }
                else
                {
                    filter +='"originatorAccountList": [{';
                }
                
                filter +='"bankId":"",  "account":{"idType":"", "accountId" :"' + beneficiaryAccount + '"}}],';
                
                count+=1;

            }

            if(currency!=null && currency!=""  && currency!=$A.get("$Label.c.singleChoice")){
                filter+='"currency":"'+currency+'",';
                count+=1;

            }
            if(JSON.stringify(account)!=null && JSON.stringify(account)!=""  && JSON.stringify(account)!=$A.get("$Label.c.singleChoice") && account.length > 0){
                if(component.get("v.inOutIndicator") == "OUT") {
                    filter+='"originatorAccountList":[';

                } else {
                    filter+='"beneficiaryAccountList":[';
                }
                for (var i in account){
                    var accountName=account[i].split('-')[0];
                    var data=helper.findAccountAgent(component, event, helper, accountName);
                    filter+='{"bankId":"'+data.bic+'","account":{"idType":"'+data.idType+'","accountId":"'+accountName+'"}},';
                }
                filter=filter.slice(0,-1)+"],";
                count+=1;
            } else {
                if(component.get("v.inOutIndicator") == "OUT") {
                    filter+='"originatorAccountList":[';

                } else {
                    filter+='"beneficiaryAccountList":[';
                }
                var allAccounts = component.get("v.accountList");
                for (var i in allAccounts) {
                    filter+='{"bankId":"'+allAccounts[i].bic+'","account":{"idType":"'+allAccounts[i].id_type+'","accountId":"'+allAccounts[i].account+'"}}';
                }
                filter = filter.replaceAll('}{', '},{');
                filter+='],';
            }
			// AB - 27-11-2020 - OriginatorCountry
            if(country!=null && country!=""  && country!=$A.get("$Label.c.singleChoice")){
                 if(component.get("v.inOutIndicator") == "OUT"){
                	filter+='"beneficiaryCountry":"'+country.substring(0,2)+'",';
                    count+=1;
                 }else{
                    filter+='"originatorCountry":"'+country.substring(0,2)+'",';    
                    count+=1;
                 }
            }
            if(selectedStatus!=null && selectedStatus!=undefined && selectedStatus.length!=0){

                if(component.get("v.fromDetail") == component.get("v.isDetail")) {
                    filter+='"paymentStatusList":[';
                    for (var i in selectedStatus){
                        var data=helper.findStatus(component, event, helper, selectedStatus[i]);
                        if(selectedStatus[i]==$A.get("$Label.c.payment_statusThree") || selectedStatus[i]==$A.get("$Label.c.payment_statusFour") || selectedStatus[i]==$A.get("$Label.c.payment_statusTwo")){
                            for(var j in data){
                                filter+='{"status":"'+data[j].status+'","reason":"'+data[j].reason+'"},';
                            }
    
                        }else{
                            filter+='{"status":"'+data.status+'","reason":"'+data.reason+'"},';
                        }
                    }
                } else {
                    filter+='"paymentStatusList":'
                    filter+=JSON.stringify(selectedStatus);
                    var stringList = JSON.stringify(selectedStatus);
                    var newList = [];
                        
                    if(stringList.includes('{"status":"ACSC","reason":""},{"status":"ACCC","reason":""}') == true){
                        newList.push($A.get("$Label.c.payment_statusTwo")); 
                    }
                    //Rejected
                    if(stringList.includes('{"status":"RJCT","reason":""}') == true){
                        newList.push($A.get("$Label.c.payment_statusOne"));
                    }
                    //On hold
                    if(stringList.includes('{"status":"ACSP","reason":"G002"},{"status":"ACSP","reason":"G003"},{"status":"ACSP","reason":"G004"}') == true){
                        newList.push($A.get("$Label.c.payment_statusFour"));
                    }
                    //In progress
                    if(stringList.includes('{"status":"ACSP","reason":"G000"},{"status":"ACSP","reason":"G001"}') == true){
                        newList.push($A.get("$Label.c.payment_statusThree"));
                    }
                    
                    component.set("v.isDetail", true);
                    component.set("v.selectedStatus", newList);
                }
                
                filter=filter.slice(0,-1)+"],";
                count+=1;

            }
			
            /*var incoming;
            if(component.get("v.inOutIndicator") == "IN") {
                incoming = filter.replace("originatorAccountList", "beneficiaryAccountList");
                filter = incoming;
            }*/
            
            component.set("v.count",count);
            filter=filter.slice(0,-1)+"}}";
            if(filter!=""){
               component.set("v.filters",filter);

            }

        } catch (e) {
            // Handle error
            console.error(e);
        } 
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method get the Countries ISO2
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    getCountries : function(component, event, helper){
        try {
            var action = component.get("c.getISO2Values");
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.countryList",response.getReturnValue().sort());
                }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
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

        } catch (e) {
            console.log(e);
        }
    },
    
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method get the Statuses
    History
    <Date>			<Author>		<Description>
    12/02/2020		R. Alexander Cervino     Initial version*/

    getStatuses : function(component, event, helper){
        try {
            var action = component.get("c.getStatus");
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.statusList",response.getReturnValue());
                }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
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

        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to open the search filters
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    openSearch : function(component, event, helper) {
        try{
            var searchArea = component.find("searchArea");
            var searchAreaTitle = component.find("searchAreaTitle");
            if(searchArea !=undefined && searchArea!=null){
                $A.util.toggleClass(searchArea,"hidden");
                $A.util.toggleClass(searchAreaTitle,"hidden");
                $A.util.toggleClass(component.find("searchIcon"),"button-search-open");
            }
        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to clear all filters
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    clear : function(component, event, helper) {
        try {
            component.set("v.pillsContainer",[]);
            component.set("v.thatContains",null);
            component.set("v.beneficiaryAccount","");
            component.set("v.settledFrom","");
            component.set("v.settledTo","");
            //AB - 13/11/2020 - INC793
            //component.set("v.dateFrom","");
            //component.set("v.dateTo","");

            helper.validateDate(component, event, helper);

            helper.clearStatus(component, event, helper);
            helper.clearCurrency(component, event, helper);
            helper.clearAccount(component, event, helper);
            helper.clearCountry(component, event, helper);
            //helper.filterData(component, event, helper);

        } catch (e) {
            console.log(e);
        }
    },

 
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to clear the status
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    clearStatus : function(component, event, helper, clear){
        try{
            var selectedStatus=component.get("v.selectedStatus");

            if(selectedStatus!=undefined && selectedStatus!=null){
                component.set("v.selectedStatus",[]);
                component.set("v.selectedStatusLabel",$A.get("$Label.c.multipleChoice"));
                component.find("statusDropdown").updateSelection(selectedStatus);
            }
        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to clear the currency
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    clearCurrency : function(component, event, helper){
        try{
            if(component.get("v.selectedCurrency") != $A.get("$Label.c.singleChoice")){
                component.set("v.selectedCurrency",$A.get("$Label.c.singleChoice"));
            }
        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to clear the account
    History
    <Date>			<Author>		<Description>
    22/01/2020		R. Alexander Cervino     Initial version*/

    clearAccount : function(component, event, helper){
        try{
            var selectedStatus=component.get("v.selectedAccount");

            if(selectedStatus!=undefined && selectedStatus!=null){
                component.set("v.selectedAccount",[]);
                component.set("v.selectedAccountLabel",$A.get("$Label.c.multipleChoice"));
                component.find("accountDropdown").updateSelection(selectedStatus);
            }
        } catch (e) {
            console.log(e);
        }
    },


    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to clear the country
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    clearCountry : function(component, event, helper){
        try{
            if(component.get("v.selectedCountry") != $A.get("$Label.c.singleChoice")){
                component.set("v.selectedCountry",$A.get("$Label.c.singleChoice"));
            }
        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to apply search filters
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    apply : function(component, event, helper){
        component.set("v.isDetail", false);
        component.set("v.fromDetail", false);
        helper.changeTo(component, event, helper);
        helper.changeFrom(component, event, helper);
        helper.changeAccount(component, event, helper);
        helper.changeCurrency(component, event, helper);
        if(component.get("v.settledErrorTo")=='' && component.get("v.datesValidity")==true){
            component.set("v.isOpen",false);
            helper.filterData(component, event, helper);
        }
            
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to validate settled amounts
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    validateSettled : function(component, event, helper) {
        try{
            var error="ok";
            var settledFrom=component.get("v.settledFrom");
            var settledTo=component.get("v.settledTo");
            if(settledFrom!=null && settledFrom !=undefined && settledFrom != ""){
                if(parseInt(settledFrom)<0){
                    component.set("v.settledFrom","");
                }
            }

            if(settledTo!=null && settledTo !=undefined && settledTo != ""){
                if(parseInt(settledTo)<0){
                    component.set("v.settledTo","");
                }
            }

            if(settledTo!=null && settledTo !=undefined && settledTo != "" && settledFrom!=null && settledFrom !=undefined && settledFrom != ""){
                if(parseInt(settledTo)<parseInt(settledFrom)){
                    $A.util.removeClass(component.find("settledErrorTo"),"hidden");
                    $A.util.addClass(component.find("settledTo"),"inputShadowError");
                    $A.util.removeClass(component.find("settledErrorFrom"),"hidden");
                    $A.util.addClass(component.find("settledFrom"),"inputShadowError");
                    component.set("v.settledErrorTo",$A.get("$Label.c.toAmountLowerThanFrom"));
                    error="error";
                }else{
                    $A.util.addClass(component.find("settledErrorTo"),"hidden");
                    $A.util.removeClass(component.find("settledTo"),"inputShadowError");
                    $A.util.addClass(component.find("settledErrorFrom"),"hidden");
                    $A.util.removeClass(component.find("settledFrom"),"inputShadowError");
                    component.set("v.settledErrorTo","");
                }
            
            }else{
                $A.util.addClass(component.find("settledErrorTo"),"hidden");
                $A.util.removeClass(component.find("settledTo"),"inputShadowError");
                $A.util.addClass(component.find("settledErrorFrom"),"hidden");
                $A.util.removeClass(component.find("settledFrom"),"inputShadowError");
                component.set("v.settledErrorTo","");

            }

            if(error=="ok"){
                helper.refreshPills(component, event, helper);
            }
        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to validate dates
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    validateDate : function(component, event, helper) {
        try{
            var error="ok";
            var dateFrom=component.get("v.dateFrom");
            var dateTo=component.get("v.dateTo");

            if(dateTo!=null && dateTo !=undefined && dateTo != "" && dateFrom!=null && dateFrom !=undefined && dateFrom != ""){
                if(dateTo<dateFrom){
                    component.set("v.dateErrorTo","dd/mm/yyyy");
                    component.set("v.dateTo","");
                    error="error";
                }
            }

            if(error=="ok"){
                helper.refreshPills(component, event, helper);
            }
        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to  filter data
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    filterData : function(component, event, helper){
        try{

            if(component.get("v.filters")!=null && component.get("v.filters")!=undefined){
                var cmpEvent = component.getEvent("getFilter"); 
                cmpEvent.setParams({filters:component.get("v.filters"), count: component.get("v.count")});
                cmpEvent.fire(); 
            }     
        } catch (e) {
            console.log(e);
        }    
    },
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method get the Countries ISO2
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    getAccounts : function(component, event, helper){
        try {

            var accountList=component.get("v.accountList");
            if(accountList.length>0){
                var accountsToDisplay=[];
                for(var i in accountList){
                    accountsToDisplay.push(accountList[i].account);
                }
                component.set("v.accountListToDisplay",accountsToDisplay);

                component.set("v.ready",true);
            }

        } catch (e) {
            console.log(e);
        }
    },
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to  filter data
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    findAccountAgent : function(component, event, helper,account){
        try{
            var accounts=component.get("v.accountList");

            for(var i in accounts ){
                if(accounts[i].account==account){
                    return {'bic':accounts[i].bic,'idType':accounts[i].id_type};
                }
            }   
        } catch (e) {
            console.log(e);
        }    
    },
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to  filter data
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    findStatus : function(component, event, helper,status){
        try{
            //Completed
            if(status==$A.get("$Label.c.payment_statusTwo")){
                return [{'status':'ACSC','reason':''},{'status':'ACCC','reason':''}];
                //Rejected
            }else if(status==$A.get("$Label.c.payment_statusOne")){
                return {'status':'RJCT','reason':''};
                //On hold
            }else if(status==$A.get("$Label.c.payment_statusFour")){
                return [{'status':'ACSP','reason':'G002'},{'status':'ACSP','reason':'G003'},{'status':'ACSP','reason':'G004'}];
                //In progress
            }else if(status==$A.get("$Label.c.payment_statusThree")){
                return [{'status':'ACSP','reason':'G000'},{'status':'ACSP','reason':'G001'}];
            }
            
                 
        } catch (e) {
            console.log(e);
        }    
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to  handler change of attribute
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/
    changeFrom : function(component, event, helper) {
        var cmpEvent = component.getEvent("updateFilter"); 
        cmpEvent.setParams({filter:"settledFrom",value:component.get("v.settledFrom")});
        cmpEvent.fire(); 
        helper.refreshPills(component,event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to  handler change of attribute
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/
    changeTo : function(component, event, helper) {
        var cmpEvent = component.getEvent("updateFilter"); 
        cmpEvent.setParams({filter:"settledTo",value:component.get("v.settledTo")});
        cmpEvent.fire();
        helper.refreshPills(component,event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to  handler change of attribute
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/
    changeAccount : function(component, event, helper) {
        var cmpEvent = component.getEvent("updateFilter"); 

        cmpEvent.setParams({filter:"account",value:component.get("v.selectedAccount")});
        cmpEvent.fire();
        helper.refreshPills(component,event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to  handler change of attribute
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/
    changeCurrency : function(component, event, helper) {
        var cmpEvent = component.getEvent("updateFilter"); 

        cmpEvent.setParams({filter:"currency",value:component.get("v.selectedCurrency")});
        cmpEvent.fire();
        helper.refreshPills(component,event, helper);
    }
})