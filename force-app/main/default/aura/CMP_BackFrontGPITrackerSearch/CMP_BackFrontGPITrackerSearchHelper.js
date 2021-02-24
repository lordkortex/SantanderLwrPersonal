({

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to refresh the pills information
    History
    <Date>			<Author>		<Description>
    11/12/2019		R. Alexander Cervino     Initial version*/

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
            //AB - 27/11/2020 - OriginatorCountry
            var country=component.get("v.selectedCountry");
            var originCountry=component.get("v.originCountry");
            var account=component.get("v.selectedOrderingAccount");
            var accountBIC=component.get("v.selectedOrderingBIC");
            var beneficiaryBIC=component.get("v.beneficiaryBIC");
            var uetr=component.get("v.selectedUERT").toLowerCase();
            var selectedType = component.get("v.typeValue");
            console.log("uetr: "+uetr);
            var filter='{"searchData": {"latestPaymentsFlag": "NO","_limit":"1000","_offset":"0",';


           //Set the pills array and the filters String
           if(settledFrom!=null && settledFrom!="" && (settledTo==null || settledTo=="")){
            filter+='"amountFrom":"'+settledFrom+'",';
            filter+='"amountTo":"999999999999999999",';
            }
            if(settledTo!=null && settledTo!="" && (settledFrom==null || settledFrom=="")){
                filter+='"amountTo":"'+settledTo+'",';
                filter+='"amountFrom":"0",';
            }
            if(settledTo!=null && settledTo!="" && settledFrom!=null && settledFrom!=""){
                filter+='"amountTo":"'+settledTo+'",';
                filter+='"amountFrom":"'+settledFrom+'",';
            }

            if(dateFrom!=null && dateFrom!="" && (dateTo==null || dateTo=="")){

                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth()+1).padStart(2, '0'); //As January is 0.
                var yyyy = today.getFullYear();
                today = yyyy+'-'+mm+'-'+dd;

                filter+='"valueDateFrom":"'+dateFrom+'",';
                filter+='"valueDateTo":"'+today+'",';
            }
            if(dateTo!=null && dateTo!="" && (dateFrom==null || dateFrom=="") && dateTo!=$A.get("$Label.c.from") && dateFrom!=$A.get("$Label.c.from")){
                filter+='"valueDateTo":"'+dateTo+'",';
                var e = new Date(dateTo);
                e.setMonth(e.getMonth()-25);
                var dd = String(e.getDate()).padStart(2, '0');
                var mm = String(e.getMonth()+1).padStart(2, '0'); //As January is 0.
                var yyyy = e.getFullYear();
                var date = yyyy+'-'+mm+'-'+dd;

                filter+='"valueDateFrom":"'+date+'",';
            }

            if(dateTo!=null && dateTo!="" && dateFrom!=null && dateFrom!="" && dateTo!=$A.get("$Label.c.from") && dateFrom!=$A.get("$Label.c.from")){
                filter+='"valueDateTo":"'+dateTo+'",';
                filter+='"valueDateFrom":"'+dateFrom+'",';
            }

            if(thatContains!=null && thatContains!=""){
                filter+='"searchText":"'+thatContains+'",';
            }
            if(uetr!=null && uetr!=""){
                filter+='"paymentId":"'+uetr+'",';
            }
            
            if(currency!=null && currency!=""  && currency!=$A.get("$Label.c.selectOne")){
                filter+='"currency":"'+currency+'",';
            }
            if(account!=null && account!=""  && accountBIC!=null && accountBIC!="") {
                filter+='"originatorAccountList":[';
                    filter+='{"bankId":"'+accountBIC+'","account":{"idType":"","accountId":"'+account+'"}},';
                filter=filter.slice(0,-1)+"],";
            }

            if(beneficiaryAccount!=null && beneficiaryAccount!=""/*  && beneficiaryBIC!=null && beneficiaryBIC!=""*/) {
                filter+='"beneficiaryAccountList":[';
                    filter+='{"bankId":"'+beneficiaryBIC+'","account":{"idType":"","accountId":"'+beneficiaryAccount+'"}},';
                filter=filter.slice(0,-1)+"],";
            }
			
            // AB - 27/11/2020 - OriginatorCountry
            if(country!=null && country!=""  && country!=$A.get("$Label.c.selectOne")){
                filter+='"beneficiaryCountry":"'+country.substring(0,2)+'",';
            }
			
            if(originCountry!=null && originCountry!=""  && originCountry!=$A.get("$Label.c.selectOne")){
                filter+='"originatorCountry":"'+originCountry.substring(0,2)+'",';
            }

            if(selectedType!=null && selectedType!=""){
                filter+='"inOutIndicator":"'+selectedType+'",';
            }

            if(selectedStatus!=null && selectedStatus!=undefined && selectedStatus.length!=0){   
                filter+='"paymentStatusList":[';
                for (var i in selectedStatus){
                    if(selectedStatus[i]!=$A.get("$Label.c.allStatuses")){
                        var data=helper.findStatus(component, event, helper, selectedStatus[i]);
                        if(selectedStatus[i]==$A.get("$Label.c.payment_statusThree") || selectedStatus[i]==$A.get("$Label.c.payment_statusFour")|| selectedStatus[i]==$A.get("$Label.c.payment_statusTwo")){
                            for(var j in data){
                                filter+='{"status":"'+data[j].status+'","reason":"'+data[j].reason+'"},';
                            }
    
                        }else{
                            filter+='{"paymentStatus":{"status":"'+data.status+'","reason":"'+data.reason+'"}},';
                        }
                    }                }
                filter=filter.slice(0,-1)+"],";

            }
            console.log(filter);
            filter=filter.slice(0,-1)+"}}";
            if(filter!=""){
                component.set("v.filters",filter);
            }else{

                if($A.util.hasClass(component.find("GPISearch"),'slds-hide')==true){
                    helper.openSearch(component, event, helper);
                }
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
    11/12/2019		R. Alexander Cervino     Initial version*/

    getCountries : function(component, event, helper){
        try {
            var action = component.get("c.getISO2Values");
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.countryList",response.getReturnValue().sort());
                    
                    setTimeout(function() {
                        $A.util.addClass(component.find("spinner"), "slds-hide");   
                        $A.util.removeClass(component.find("headerSection"), "slds-hide");
                    }, 2000); 
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
    11/12/2019		R. Alexander Cervino     Initial version*/

    openSearch : function(component, event, helper) {
        try{
            var searchArea = component.find("GPISearch");

            if(searchArea !=undefined && searchArea!=null){
                $A.util.toggleClass(searchArea,"slds-hide");
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
    11/12/2019		R. Alexander Cervino     Initial version*/

    clear : function(component, event, helper) {
        try {
            component.set("v.selectedOrderingAccount","");
            component.set("v.thatContains","");

            component.set("v.beneficiaryAccount","");
            component.set("v.settledFrom","");
            component.set("v.settledTo","");
            component.set("v.dateFrom","");
            component.set("v.dateTo","");
            component.set("v.selectedUERT","");
            component.set("v.selectedOrderingBIC","");
            component.set("v.beneficiaryBIC","");


            helper.validateSettled(component, event, helper);
            helper.validateDate(component, event, helper);

            helper.clearStatus(component, event, helper,"all");
            helper.clearCurrency(component, event, helper);
            helper.clearCountry(component, event, helper);

           
        } catch (e) {
            console.log(e);
        }
    },

 
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to clear the status
    History
    <Date>			<Author>		<Description>
    11/12/2019		R. Alexander Cervino     Initial version*/

    clearStatus : function(component, event, helper, clear){
        try{
            var selectedStatus=component.get("v.selectedStatus");

            if(selectedStatus!=undefined && selectedStatus!=null){

                if(clear.includes("all")){

                    component.set("v.selectedStatus",[]);
                    component.set("v.selectedStatusLabel",$A.get("$Label.c.multipleChoice"));

                    component.find("statusDropdown").updateSelection(selectedStatus);
                }else{
                    selectedStatus.splice(selectedStatus.indexOf(clear),1);

                    component.set("v.selectedStatus",selectedStatus);

                    if(selectedStatus.length==0){
                        component.set("v.selectedStatusLabel",$A.get("$Label.c.multipleChoice"));
                    }

                    component.find("statusDropdown").updateSelection([clear]);
                }
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
    11/12/2019		R. Alexander Cervino     Initial version*/

    clearCurrency : function(component, event, helper){
        try{
            if(component.get("v.selectedCurrency") != $A.get("$Label.c.selectOne")){
                component.set("v.selectedCurrency",$A.get("$Label.c.selectOne"));
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
    11/12/2019		R. Alexander Cervino     Initial version*/

    clearCountry : function(component, event, helper){
        try{
            if(component.get("v.selectedCountry") != $A.get("$Label.c.selectOne")){
                component.set("v.selectedCountry",$A.get("$Label.c.selectOne"));
            } /*else if(component.get("v.originCountry") != $A.get("$Label.c.selectOne")){
                component.set("v.originCountry",$A.get("$Label.c.selectOne"));
            }*/
        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to remove a single pill
    History
    <Date>			<Author>		<Description>
    11/12/2019		R. Alexander Cervino     Initial version*/

    removePill : function(component, event, helper){
        try{
            var currentPill=event.getParam('currentPill');

            if(currentPill!= null & currentPill!="" && currentPill!=undefined){
                switch(currentPill.substring(0,currentPill.length-1)){
                    case "beneficiaryAccount":
                        component.set("v.beneficiaryAccount","");
                        break;
                    case "orderingAccount":
                        component.set("v.selectedOrderingAccount","");
                        break;
                    case "orderingAccount":
                        component.set("v.beneficiaryAccount","");
                        break;
                    case "uert":
                        component.set("v.selectedUERT","");
                        break;
                    case "orderingBIC":
                        component.set("v.selectedOrderingBIC","");
                        break;
                    case "beneficiaryBIC":
                        component.set("v.beneficiary","");
                        break;
                    case "settledFrom":
                        component.set("v.settledFrom","");
                        break;
                    case "settledTo":
                        component.set("v.settledTo","");
                        break;
                    case "settled":
                        component.set("v.settledFrom","");
                        component.set("v.settledTo","");
                        helper.validateSettled(component, event, helper);
                        break;
                    case "dateFrom":
                        component.set("v.dateFrom",null);
                        break;
                    case "dateTo":
                        component.set("v.dateTo",null);
                        break;
                    case "date":
                        component.set("v.dateFrom",null);
                        component.set("v.dateTo",null);
                        helper.validateDate(component, event, helper);
                        break;
                    case "thatContains":
                        component.set("v.thatContains","");
                        break;
                    case "currency":
                        helper.clearCurrency(component, event, helper);
                        break;
                    case "country":
                        helper.clearCountry(component, event, helper);
                        break;
                    case "statusall":
                        helper.clearStatus(component, event, helper,"all");
                        break;
                    default:
                        helper.clearStatus(component, event, helper,currentPill.substring(7));
                        break;
                }
                
                //Refresh the pill information and filter the data
                helper.refreshPills(component, event, helper);

                if($A.util.hasClass(component.find("GPISearch"),'slds-hide')==true){
                    helper.filterData(component, event, helper);
                }
                
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
    11/12/2019		R. Alexander Cervino     Initial version*/

    apply : function(component, event, helper){
        //helper.validateAccountFields(component, event, helper);
        helper.validateAccountFields(component, event, helper);
        console.log("validid");
        console.log(component.get("v.datesValidity"));
        if(component.get("v.datesValidity")==true && component.get("v.settledErrorTo")=='' && $A.util.hasClass(component.find("mandatoryFields"),'slds-hide') && $A.util.hasClass(component.find("mandatoryBic"),'slds-hide')){
            if(component.get("v.showTable")==false){
                helper.openSearch(component, event, helper);
            }
            console.log(component.get("v.filters"));

            //RESET ATTRIBUTE IN CASE WE DO SEVERAL SEARCHES WITHOUT CLEAN.
            component.set("v.isUETRSearch", false);
            
            helper.filterData(component, event, helper);
        }  
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to validate settled amounts
    History
    <Date>			<Author>		<Description>
    11/12/2019		R. Alexander Cervino     Initial version*/

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
                    $A.util.removeClass(component.find("settledErrorTo"),"slds-hide");
                    $A.util.addClass(component.find("settledTo"),"inputShadowError");
                    $A.util.removeClass(component.find("settledErrorFrom"),"slds-hide");
                    $A.util.addClass(component.find("settledFrom"),"inputShadowError");
                    component.set("v.settledErrorTo",$A.get("$Label.c.toAmountLowerThanFrom"));
                    error="error";
                }else{
                    $A.util.addClass(component.find("settledErrorTo"),"slds-hide");
                    $A.util.removeClass(component.find("settledTo"),"inputShadowError");
                    $A.util.addClass(component.find("settledErrorFrom"),"slds-hide");
                    $A.util.removeClass(component.find("settledFrom"),"inputShadowError");
                    component.set("v.settledErrorTo","");
                }
            
            }else{
                $A.util.addClass(component.find("settledErrorTo"),"slds-hide");
                $A.util.removeClass(component.find("settledTo"),"inputShadowError");
                $A.util.addClass(component.find("settledErrorFrom"),"slds-hide");
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
    11/12/2019		R. Alexander Cervino     Initial version*/

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
            var cmpEvent = component.getEvent("getFilter");
            var checkFilters = component.get("v.filters"); 
            cmpEvent.setParams({filters:component.get("v.filters")});
            cmpEvent.fire(); 
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
    Description:    Method get the Countries ISO2
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    getAccounts : function(component, event, helper){
        try {
            var accountList=component.get("v.accountList");
            if(accountList.length>0){
                var filter='{"searchData":{';
                var filterAccount='"accountList":[';
                for(var i in accountList){
                    filterAccount+='{"originatorAgent":"'+accountList[i].bic+'","account":{"idType":"'+accountList[i].id_type+'","accountId":"'+accountList[i].account+'"}},';
                }

                component.set("v.ready",true);

                filterAccount=filterAccount.slice(0,-1)+']';
                component.set("v.accountFilter",filterAccount);
                filter+=filterAccount+',"latestPaymentsFlag": "NO","_offset": "0","_limit": "1000"}}';

                component.set("v.filters",filter);
                helper.filterData(component, event, helper);
            }

        } catch (e) {
            console.log(e);
        }
    },

    getUserData : function(component, event, helper) {
		
		try {
            var action = component.get("c.getUserData");
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.userData",response.getReturnValue());
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

    validateAccountFields: function(component, event, helper){
		if(component.get("v.userData") != null && component.get("v.userData") != undefined && Object.keys(component.get("v.userData")).length != 0)
        {
            var userData = component.get("v.userData");
        var userProfile = userData[0];
        var userCountry = userData[1].substring(0, 2);
        var originBic = component.get("v.selectedOrderingBIC").substring(4, 6);
        var beneficiaryBic = component.get("v.beneficiaryBIC").substring(4, 6);
        var paymentType = component.get("v.typeValue");

        if(component.get("v.selectedUERT")==''){
            $A.util.addClass(component.find("uetrError"),'slds-hide');

            if((component.get("v.selectedOrderingAccount")=='' || component.get("v.selectedOrderingBIC")=='') && (component.get("v.beneficiaryccount")=='' || component.get("v.beneficiaryBIC")=='')){
                $A.util.removeClass(component.find("mandatoryFields"),'slds-hide');
                $A.util.addClass(component.find("mandatoryBic"),'slds-hide');                
            }else{
                if(userProfile == "Local Support") {
                    if(paymentType == "OUT") {
                        if(userCountry != originBic) {
                            if((userCountry == "BR" || userCountry == "KY" || userCountry == "LU") && (originBic == "BR" || originBic == "KY" || originBic == "LU")) {
                                $A.util.addClass(component.find("mandatoryBic"),'slds-hide');
                                $A.util.addClass(component.find("mandatoryFields"),'slds-hide');
                            } else {
                                $A.util.removeClass(component.find("mandatoryBic"),'slds-hide');
                                $A.util.addClass(component.find("mandatoryFields"),'slds-hide');
                            }
                        } else{
                            $A.util.addClass(component.find("mandatoryFields"),'slds-hide');
                            $A.util.addClass(component.find("mandatoryBic"),'slds-hide');
                            helper.refreshPills(component, event, helper);
                        }
                    } else {
                        if(userCountry != beneficiaryBic) {
                            if((userCountry == "BR" || userCountry == "KY" || userCountry == "LU") && (beneficiaryBic == "BR" || beneficiaryBic == "KY" || beneficiaryBic == "LU")) {
                                $A.util.addClass(component.find("mandatoryBic"),'slds-hide');
                                $A.util.addClass(component.find("mandatoryFields"),'slds-hide');
                            } else {
                                $A.util.removeClass(component.find("mandatoryBic"),'slds-hide');
                                $A.util.addClass(component.find("mandatoryFields"),'slds-hide');
                            }
                        } else{
                            $A.util.addClass(component.find("mandatoryFields"),'slds-hide');
                            $A.util.addClass(component.find("mandatoryBic"),'slds-hide');
                            helper.refreshPills(component, event, helper);
                        }
                    }
                    
                } else{
                    
                    $A.util.addClass(component.find("mandatoryFields"),'slds-hide');
                    $A.util.addClass(component.find("mandatoryBic"),'slds-hide');
                    helper.refreshPills(component, event, helper);
                }
            }
        }else{
            let re = "^([a-f0-9]{8})-([a-f0-9]{4})-4([a-f0-9]{3})-([89ab])([a-f0-9]{3})-([a-f0-9]{12})$";
            let inputUETR = component.get("v.selectedUERT").toLowerCase();
            console.log("inputUETR: "+inputUETR);
            let found = inputUETR.match(re);
            //let found = component.get("v.selectedUERT").match(re);
            if(component.get("v.selectedUERT").length!=36 || found==null){
                
                $A.util.removeClass(component.find("uetrError"),'slds-hide');
            }else{
                $A.util.addClass(component.find("uetrError"),'slds-hide');

                $A.util.addClass(component.find("mandatoryFields"),'slds-hide');
                helper.refreshPills(component, event, helper);
            }
            
        }
        }
        
    }
    ,

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get the accounts
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/

    getCurrency : function(component, event, helper){
        try {
            var action = component.get("c.getCurrencies");
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var res =response.getReturnValue();
                    if(res!=null && res!=undefined && res!=""){
                       
                        component.set("v.currencyList",res);
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

        } catch (e) {
            console.log(e);
        }
    },
    
    searchUETR : function(component, event, helper, uetrCode){
    	try {
			var filter = "{\"searchData\": {\"latestPaymentsFlag\": \"NO\",\"_limit\":\"1000\",\"_offset\":\"0\",\"paymentId\":\"" + uetrCode + "\",\"inOutIndicator\":\"OUT\"}}";
            component.set("v.filters", filter);
            component.set("v.isUETRSearch", true);
            helper.filterData(component, event, helper);
         } catch (e) {
             console.log(e);
         }
	}
    
    
})