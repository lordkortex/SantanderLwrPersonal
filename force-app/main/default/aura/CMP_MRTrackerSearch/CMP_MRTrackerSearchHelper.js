({

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to refresh the pills information
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    refreshPills : function(component, event, helper) {
        try {
            var pills=[];

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

            var filter="";

            //Set the pills array and the filters String
            
            if(settledFrom!=null && settledFrom!="" && (settledTo==null || settledTo=="")){
                pills.push(["settledFrom=",$A.get("$Label.c.from")+" "+ settledFrom]);
                filter+="&"+"settledFrom="+ settledFrom;
            }else if(settledTo!=null && settledTo!="" && (settledFrom==null || settledFrom=="")){
                pills.push(["settledTo=",$A.get("$Label.c.to")+" "+ settledTo]);
                filter+="&"+"settledTo="+ settledTo;
            }else if(settledTo!=null && settledTo!="" && settledFrom!=null && settledFrom!=""){
                pills.push(["settled=",settledFrom+" - "+ settledTo]);
                filter+="&"+"settled="+ settledFrom+" - "+ settledTo;
            }

            if(dateFrom!=null && dateFrom!="" && (dateTo==null || dateTo=="")){
                pills.push(["dateFrom=",$A.get("$Label.c.from")+" "+  $A.localizationService.formatDate(dateFrom, "dd/MM/yyyy")]);
                filter+="&"+"dateFrom="+ dateFrom;
            }else if(dateTo!=null && dateTo!="" && (dateFrom==null || dateFrom=="")){
                pills.push(["dateTo=",$A.get("$Label.c.to")+" "+  $A.localizationService.formatDate(dateTo, "dd/MM/yyyy")]);
                filter+="&"+"dateTo="+ dateTo;
            }else if(dateTo!=null && dateTo!="" && dateFrom!=null && dateFrom!=""){
                pills.push(["date=", $A.localizationService.formatDate(dateFrom, "dd/MM/yyyy")+" - "+  $A.localizationService.formatDate(dateTo, "dd/MM/yyyy")]);
                filter+="&"+"date="+ dateFrom+" - "+ dateTo;
            }

            if(thatContains!=null && thatContains!=""){
                pills.push(["thatContains=",thatContains]);
                filter+="&"+"thatContains="+thatContains;
            }

            if(beneficiaryAccount!=null && beneficiaryAccount!=""){
                pills.push(["beneficiaryAccount=",beneficiaryAccount]);
                filter+="&"+"beneficiaryAccount="+beneficiaryAccount;
            }

            if(currency!=null && currency!=""  && currency!=$A.get("$Label.c.selectOne")){
                pills.push(["currency=",currency]);
                filter+="&"+"currency="+currency;
            }

            if(account!=null && account!=""  && account!=$A.get("$Label.c.selectOne")){
                pills.push(["account=",account]);
                filter+="&"+"account="+account;
            }
            if(country!=null && country!=""  && country!=$A.get("$Label.c.selectOne")){
                pills.push(["country=",country]);
                filter+="&"+"country="+country;
            }
            if(selectedStatus!=null && selectedStatus!=undefined && selectedStatus.length!=0){            
                if(selectedStatus.length>=3){
                    component.set("v.selectedStatusLabel",selectedStatus.length +" "+$A.get("$Label.c.statusesSelected"));

                    var statusList=component.get("v.statusList");
                    var limit =statusList.length;
                  
                    if(selectedStatus.length!=limit){
                        pills.push(["statusall=",selectedStatus.length +" "+$A.get("$Label.c.statusesSelected") ]);
                    }else{
                        pills.push(["statusall=",selectedStatus.length-1 +" "+$A.get("$Label.c.statusesSelected") ]);
                    }
                }else{

                    if(selectedStatus.length==1 && selectedStatus[0]==$A.get("$Label.c.allStatuses")){
                        for(var i=0;i<statusList.length;i++){
                            selectedStatus.push(statusList[i]);
                        }
                    }
                    
                    for(var i=0;i<selectedStatus.length;i++){
                        pills.push(["status="+selectedStatus[i],selectedStatus[i]]);
                        component.set("v.selectedStatusLabel",selectedStatus[i]);
                    }

                    if(selectedStatus.length==2){
                        component.set("v.selectedStatusLabel",selectedStatus.length +" "+$A.get("$Label.c.statusesSelected"));
                    }
                }

                filter+="&"+"status=";
                if(selectedStatus.length==1){
                    filter+=selectedStatus[0];
                }else{
                    for(var i =0;i<selectedStatus.length;i++){
                        filter+=selectedStatus[i]+" ";
                    }
                }
            }else{
                component.set("v.selectedStatusLabel",$A.get("$Label.c.multipleChoice"));
            }
            if(filter!=""){
                component.set("v.filters",filter.substring(1));
            }else{

                if($A.util.hasClass(component.find("searchArea"),'hidden')==true){
                    helper.openSearch(component, event, helper);
                }
                component.set("v.filters",filter);
            }

            component.set("v.pillsContainer",pills);

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
                    component.set("v.countryList",response.getReturnValue());
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
            component.set("v.thatContains","");
            component.set("v.beneficiaryAccount","");
            component.set("v.settledFrom","");
            component.set("v.settledTo","");
            component.set("v.dateFrom","");
            component.set("v.dateTo","");

            helper.validateSettled(component, event, helper);
            helper.validateDate(component, event, helper);

            helper.clearStatus(component, event, helper,"all");
            helper.clearCurrency(component, event, helper);
            helper.clearAccount(component, event, helper);
            helper.clearCountry(component, event, helper);
            helper.filterData(component, event, helper);

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
    21/01/2020		R. Alexander Cervino     Initial version*/

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
    Description:    Method to clear the account
    History
    <Date>			<Author>		<Description>
    22/01/2020		R. Alexander Cervino     Initial version*/

    clearAccount : function(component, event, helper){
        try{
            if(component.get("v.selectedAccount") != $A.get("$Label.c.selectOne")){
                component.set("v.selectedAccount",$A.get("$Label.c.selectOne"));
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
            if(component.get("v.selectedCountry") != $A.get("$Label.c.selectOne")){
                component.set("v.selectedCountry",$A.get("$Label.c.selectOne"));
            }
        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to remove a single pill
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    removePill : function(component, event, helper){
        try{
            var currentPill=event.getParam('currentPill');

            if(currentPill!= null & currentPill!="" && currentPill!=undefined){
                switch(currentPill.substring(0,currentPill.length-1)){
                    case "beneficiaryAccount":
                        component.set("v.beneficiaryAccount","");
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
                    case "account":
                        helper.clearAccount(component, event, helper);
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
                helper.filterData(component, event, helper);
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
        if(component.get("v.pillsContainer")!=undefined){
            if(component.get("v.pillsContainer").length>0){
                if(component.get("v.showTable")==false){
                    helper.openSearch(component, event, helper);
                }
                helper.filterData(component, event, helper);
            }
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
                cmpEvent.setParams({filters:component.get("v.filters")});
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
            var action = component.get("c.getAccounts");
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var res =response.getReturnValue();
                    if(res!=null && res!=undefined && res!=""){
                        component.set("v.accountList",JSON.parse(res));
                        $A.util.addClass(component.find("spinner"), "slds-hide");
                        $A.util.removeClass(component.find("headerSection"), "hidden");
                    }
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
            $A.util.addClass(component.find("spinner"), "slds-hide");   

            $A.enqueueAction(action);

        } catch (e) {
            console.log(e);
        }
    }
})