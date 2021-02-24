({
    /*
	Author:         Shahad
    Company:        Deloitte
    Description:    This returns dummy data to test CMP_PaymentDetailParent
    History
    <Date>			<Author>			<Description>
	27/02/2020		Shahad Naji     	Initial version
	*/
    getDataObject : function(component, event) {
        try{

            var params=component.get("v.sendObject");
            var action = component.get("c.generateObject");

            action.setParams({url:params});
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var iReturn = response.getReturnValue();
                    if(iReturn != null && iReturn != undefined && Object.keys(iReturn).length != 0)
                    {
                        component.set("v.iObject", iReturn);                    
                    var lgt = iReturn.stepList.length;
                    var i = 0;
                    var ok = false;
                    if(iReturn.status != 'ACCC'){
                        while(i < lgt && !ok){
                            if(iReturn.stepList[i].departureDate == ""){
                                ok = true;
                                component.set("v.iObject.currentBank", iReturn.stepList[i].bank);
                            }
                            i++;
                        }
                        
                    }
                    else{
                        component.set("v.currentBank", iReturn.stepList[lgt-1].bank);
                    }

                    }
                    else
                    {
                        component.set("v.iObject", {});
                    }
                    
                }
                else{
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                        component.set("v.showError", true);
                    } else {
                        component.set("v.showError", true);
                        console.log("Unknown error");
                    }
                }
            });
            $A.enqueueAction(action);
        }catch(e){
            component.set("v.showError", true);
            console.log("CMP_IPTDetailParent / getDummyData : " + e);
        }
    },

    /*
	Author:         Adrian Muñio
    Company:        Deloitte
    Description:    Method to set the iObj with the UETR Search data.
    History
    <Date>			<Author>			<Description>
	27/02/2020		Adrian Muñio     	Initial version
    */        
   setiObj:  function(component, event, helper, UETRSearchResult, isIngested){
       try {
            if(isIngested){
                if(component.get("v.comesFromTracker") == true) {
                    
                    UETRSearchResult.paymentDetail.paymentId                                        === undefined ? 'Not found' : component.set("v.iObject.uetr", UETRSearchResult.paymentDetail.paymentId);              
                    UETRSearchResult.paymentDetail.transactionStatus.reason                         === undefined ? 'Not found' : component.set("v.iObject.reason", UETRSearchResult.paymentDetail.transactionStatus.reason);              
                    UETRSearchResult.paymentDetail.transactionStatus.status                         === undefined ? 'Not found' : component.set("v.iObject.status", UETRSearchResult.paymentDetail.transactionStatus.status);              
                    UETRSearchResult.paymentDetail.originatorData.originatorAccount.accountId       === undefined ? 'Not found' : component.set("v.iObject.originAccountNumber", UETRSearchResult.paymentDetail.originatorData.originatorAccount.accountId);              
                    UETRSearchResult.paymentDetail.originatorData.originatorName                    === undefined ? 'Not found' : component.set("v.iObject.originAccountName", UETRSearchResult.paymentDetail.originatorData.originatorName);              
                    UETRSearchResult.paymentDetail.originatorAgent.agentName                        === undefined ? 'Not found' : component.set("v.iObject.originAccountBank", UETRSearchResult.paymentDetail.originatorAgent.agentName);              
                    UETRSearchResult.paymentDetail.originatorAgent.agentCode                        === undefined ? 'Not found' : component.set("v.iObject.originAccountBic", UETRSearchResult.paymentDetail.originatorAgent.agentCode);              
                    UETRSearchResult.paymentDetail.beneficiaryData.creditorCreditAccount.accountId  === undefined ? 'Not found' : component.set("v.iObject.beneficiaryAccountNumber", UETRSearchResult.paymentDetail.beneficiaryData.creditorCreditAccount.accountId);
                    UETRSearchResult.paymentDetail.beneficiaryData.beneficiaryName                  === undefined ? 'Not found' : component.set("v.iObject.beneficiaryAccountName", UETRSearchResult.paymentDetail.beneficiaryData.beneficiaryName);              
                    UETRSearchResult.paymentDetail.beneficiaryData.creditorAgent.agentName          === undefined ? 'Not found' : component.set("v.iObject.beneficiaryAccountBank", UETRSearchResult.paymentDetail.beneficiaryData.creditorAgent.agentName);              
                    UETRSearchResult.paymentDetail.beneficiaryData.creditorAgent.agentCode          === undefined ? 'Not found' : component.set("v.iObject.beneficiaryAccountBic", UETRSearchResult.paymentDetail.beneficiaryData.creditorAgent.agentCode);              
                
                    /*if (sParameterName[0] === 'c__totalAmount') { 
                        sParameterName[1] === undefined ? 'Not found' : component.set("v.iObject.totalAmount",sParameterName[1]);              
                    }*/
                    
                    UETRSearchResult.paymentDetail.paymentAmount.tcurrency                          === undefined ? 'Not found' : component.set("v.iObject.currencyAux",UETRSearchResult.paymentDetail.paymentAmount.tcurrency);              
                    UETRSearchResult.paymentDetail.valueDate                                        === undefined ? 'Not found' : component.set("v.iObject.valueDate", UETRSearchResult.paymentDetail.valueDate);              
                    UETRSearchResult.paymentDetail.paymentAmount.amount                             === undefined ? 'Not found' : component.set("v.iObject.amount", UETRSearchResult.paymentDetail.paymentAmount.amount);              
                    UETRSearchResult.paymentDetail.beneficiaryData.creditorAgent.agentLocation      === undefined ? 'Not found' : component.set("v.iObject.beneficiaryCity", UETRSearchResult.paymentDetail.beneficiaryData.creditorAgent.agentLocation);              
                    UETRSearchResult.paymentDetail.beneficiaryData.creditorAgent.agentCountry       === undefined ? 'Not found' : component.set("v.iObject.beneficiaryCountry", UETRSearchResult.paymentDetail.beneficiaryData.creditorAgent.agentCountry);
                
                } else{
                    
                    UETRSearchResult.paymentId                                          === undefined ? 'Not found' : component.set("v.iObject.uetr", UETRSearchResult.paymentId);              
                    UETRSearchResult.transactionStatus.reason                           === undefined ? 'Not found' : component.set("v.iObject.reason", UETRSearchResult.transactionStatus.reason);
                    UETRSearchResult.transactionStatus.status                           === undefined ? 'Not found' : component.set("v.iObject.status", UETRSearchResult.transactionStatus.status);              
                    //UETRSearchResult.paymentDetail.originatorData.originatorAccount.accountId       === undefined ? 'Not found' : component.set("v.iObject.originAccountNumber", UETRSearchResult.paymentDetail.originatorData.originatorAccount.accountId);              
                    //UETRSearchResult.paymentDetail.originatorData.originatorName                    === undefined ? 'Not found' : component.set("v.iObject.originAccountName", UETRSearchResult.paymentDetail.originatorData.originatorName);              
                    UETRSearchResult.debtorAgent.agentName                              === undefined ? 'Not found' : component.set("v.iObject.originAccountBank", UETRSearchResult.debtorAgent.agentName);              
                    UETRSearchResult.debtorAgent.agentCode                              === undefined ? 'Not found' : component.set("v.iObject.originAccountBic", UETRSearchResult.debtorAgent.agentCode);              
                    //UETRSearchResult.paymentDetail.beneficiaryData.creditorCreditAccount.accountId  === undefined ? 'Not found' : component.set("v.iObject.beneficiaryAccountNumber", UETRSearchResult.paymentDetail.beneficiaryData.creditorCreditAccount.accountId);
                    //UETRSearchResult.paymentDetail.beneficiaryData.beneficiaryName                  === undefined ? 'Not found' : component.set("v.iObject.beneficiaryAccountName", UETRSearchResult.paymentDetail.beneficiaryData.beneficiaryName);              
                    UETRSearchResult.creditorAgent.agentName                            === undefined ? 'Not found' : component.set("v.iObject.beneficiaryAccountBank", UETRSearchResult.creditorAgent.agentName);              
                    UETRSearchResult.creditorAgent.agentCode                            === undefined ? 'Not found' : component.set("v.iObject.beneficiaryAccountBic", UETRSearchResult.creditorAgent.agentCode);

                    /*for(var i = 0; i < UETRSearchResult.paymentEventsArray.length; i ++) {
                        UETRSearchResult.paymentEventsArray[i].instructedAmount.tcurrency     === undefined ? 'Not found' : component.set("v.iObject.currencyAux",UETRSearchResult.paymentEventsArray[i].instructedAmount.tcurrency);                            
                        UETRSearchResult.paymentEventsArray[i].instructedAmount.amount        === undefined ? 'Not found' : component.set("v.iObject.amount", UETRSearchResult.paymentEventsArray[i].instructedAmount.amount);
                    }*/
                    
                    UETRSearchResult.paymentEventsArray[UETRSearchResult.paymentEventsArray.length-1].instructedAmount.tcurrency     === undefined ? 'Not found' : component.set("v.iObject.currencyAux",UETRSearchResult.paymentEventsArray[UETRSearchResult.paymentEventsArray.length-1].instructedAmount.tcurrency);                            
                    UETRSearchResult.paymentEventsArray[UETRSearchResult.paymentEventsArray.length-1].instructedAmount.amount        === undefined ? 'Not found' : component.set("v.iObject.amount", UETRSearchResult.paymentEventsArray[UETRSearchResult.paymentEventsArray.length-1].instructedAmount.amount);
                    UETRSearchResult.initiationTime                  === undefined ? 'Not found' : component.set("v.iObject.valueDate", UETRSearchResult.initiationTime);
                    UETRSearchResult.creditorAgent.agentLocation                         === undefined ? 'Not found' : component.set("v.iObject.beneficiaryCity", UETRSearchResult.creditorAgent.agentLocation);              
                    UETRSearchResult.creditorAgent.agentCountry                          === undefined ? 'Not found' : component.set("v.iObject.beneficiaryCountry", UETRSearchResult.creditorAgent.agentCountry);
                }              
            
                if(component.get("v.iObject.originAccountBic") != null && component.get("v.iObject.originAccountBic") != undefined && component.get("v.iObject.originAccountBic") !=''){
                    for(var i in component.get("v.BICList")){
                        if(component.get("v.BICList")[i][0] == component.get("v.iObject.originAccountBic")){
                            
                            //AM - 05/11/2020 - Portugal SSO Tracker
                            if(component.get("v.comesFromSSO")){
                                helper.getShowFee(component, event, i);
                                break;
                            }else{
                                //For UETR Search will always show Partial Bics, showing only the total Amount and Fee.
                                component.set("v.showFee","1");
                                break;
                            }
                        }
                    }
                }
            }else{
                component.set("v.iObject.uetr", UETRSearchResult.uetrCode);
            }
            //if(component.get("v.comesFromTracker") == true) {
                helper.getDataSteps(component,event,helper);
            //}


            if(component.get("v.backfront")){
                workspaceAPI.setTabLabel({
                    tabId: caseTabId,
                    label: $A.get("$Label.c.trackingDetails")
                });

                workspaceAPI.setTabIcon({
                    tabId: caseTabId,
                    icon: "utility:moneybag"
                });

                setTimeout(function(){
                    workspaceAPI.closeTab({
                        tabId: caseTabId,
                    });                
                }, 90000);
            }
        } catch(e){
            
            setTimeout(function(){
                $A.util.addClass(component.find("spinnerCreate"), "slds-hide");
                component.set("v.fakeError", true);   
            }, 30000);
        }
    },

    /*
	Author:         R. Cervino
    Company:        Deloitte
    Description:    Method to decrypturl
    History
    <Date>			<Author>		<Description>
    27/02/2020		R. Cervino     	Initial version
    19/06/2020      Adrian Muñio    Condition to take the variables from the search of CMP_IPTTrackUETRParent.
    */        
   getURLParams:  function(component, event, helper){
                
        //Only if it comes from CMP_IPTTrackUETRParent will has the attribute filled.
        if(component.get("v.comesFromUETRSearch")){
            var UETRSearchResult = component.get("v.UETRSearchResult");
            var isIngested = component.get("v.isPaymentIngested");
            helper.setiObj(component, event, helper, UETRSearchResult, isIngested);

        }else{
            var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
            var sURLVariablesMain = sPageURLMain.split('&')[0].split("="); 
            var sParameterName = "";
            var sPageURL = "";
            var results="";
            var workspaceAPI = component.find("workspace");
            var caseTabId = component.get("v.caseTabId");

            if (sURLVariablesMain[0] == 'params' || sURLVariablesMain[0] == 'c__params') {
                component.set("v.urlOK",true);
                helper.decrypt(component,sURLVariablesMain[1]).then(function(results){
                    sURLVariablesMain[1] === undefined ? 'Not found' : sPageURL = results;

                    var sURLVariables=sPageURL.split('&');
    
                    for ( var i = 0; i < sURLVariables.length; i++ ) {
                        sParameterName = sURLVariables[i].split('=');                      
                        if (sParameterName[0] === 'c__paymentId') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.iObject.uetr",sParameterName[1]);              
                        }
                        if (sParameterName[0] === 'c__reason') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.iObject.reason",sParameterName[1]);              
                        }
                        if (sParameterName[0] === 'c__status') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.iObject.status",sParameterName[1]);              
                        }
                        if (sParameterName[0] === 'c__orderingAccount') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.iObject.originAccountNumber",sParameterName[1]);              
                        }
                        if (sParameterName[0] === 'c__orderingName') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.iObject.originAccountName",sParameterName[1]);              
                        }
                        if (sParameterName[0] === 'c__orderingBank') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.iObject.originAccountBank",sParameterName[1]);              
                        }
                        if (sParameterName[0] === 'c__orderingBIC') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.iObject.originAccountBic",sParameterName[1]);              
                        }
                        if (sParameterName[0] === 'c__beneficiaryAccount') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.iObject.beneficiaryAccountNumber",sParameterName[1]);              
                        }
                        if (sParameterName[0] === 'c__beneficiaryName') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.iObject.beneficiaryAccountName",sParameterName[1]);              
                        }
                        if (sParameterName[0] === 'c__beneficiaryBank') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.iObject.beneficiaryAccountBank",sParameterName[1]);              
                        }
                        if (sParameterName[0] === 'c__beneficiaryBIC') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.iObject.beneficiaryAccountBic",sParameterName[1]);              
                        }
                        if (sParameterName[0] === 'c__totalAmount') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.iObject.totalAmount",sParameterName[1]);              
                        }
                        if (sParameterName[0] === 'c__currency') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.iObject.currencyAux",sParameterName[1]);              
                        }
                        if (sParameterName[0] === 'c__valueDate') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.iObject.valueDate",sParameterName[1]);              
                        }
                        if (sParameterName[0] === 'c__amount') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.iObject.amount",sParameterName[1]);              
                        }
                        if (sParameterName[0] === 'c__beneficiaryCity') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.iObject.beneficiaryCity",sParameterName[1]);              
                        }
                        if (sParameterName[0] === 'c__beneficiaryCountry') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.iObject.beneficiaryCountry",sParameterName[1]);              
                        }
                        if (sParameterName[0] === 'c__filters') { 
                            sParameterName[1] === undefined ? component.set("v.filters", []) : component.set("v.filters",sParameterName[1]);	
                        }
                        if (sParameterName[0] === 'c__allAccounts') { 
                            sParameterName[1] === undefined ? component.set("v.fullAccountList", []) : component.set("v.fullAccountList",sParameterName[1]);	
                        }
                        /*if (sParameterName[0] === 'c__beneficiaryCountryName') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.iObject.beneficiaryCountryName",sParameterName[1]);              
                        }*/
                        
                    }

                    if(component.get("v.iObject.originAccountBic") != null && component.get("v.iObject.originAccountBic") != undefined && component.get("v.iObject.originAccountBic") !=''){
                        for(var i in component.get("v.BICList")){
                            if(component.get("v.BICList")[i][0] == component.get("v.iObject.originAccountBic")){
                                helper.getShowFee(component, event, i);
                                break;
                            }
                        }
                    }

                    helper.getDataSteps(component,event,helper);
                });

                if(component.get("v.backfront")){
                    workspaceAPI.setTabLabel({
                        tabId: caseTabId,
                        label: $A.get("$Label.c.trackingDetails")
                    });

                    workspaceAPI.setTabIcon({
                        tabId: caseTabId,
                        icon: "utility:moneybag"
                    });

                    setTimeout(function(){
                        workspaceAPI.closeTab({
                            tabId: caseTabId,
                        });                
                    }, 90000);
                }
                
                
            } else{
            //caseTabId is the source Tab Id
                workspaceAPI.refreshTab({
                    tabId:caseTabId 
                }).catch(function(error) {
                    console.log(error);
                });
            }
        }    
    },

    /*
	Author:         Adrian Muñio
    Company:        Deloitte
    Description:    Method to get the segment related with the origin account.
    History
    <Date>			<Author>			<Description>
	27/02/2020		Adrian Muñio    	Initial version
	*/
    getShowFee : function(component, event, i) {
        try{
            var action = component.get("c.getShowFeeValue");
            var params=component.get("v.iObject.originAccountBic");
            
            action.setParams({bic:params});
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    
                    var showFee = response.getReturnValue();
                    if(showFee != undefined && showFee != null){
                        if(showFee == $A.get('$Label.c.Full')){
                            showFee = '2';
                        }else if (showFee == $A.get('$Label.c.Partial')){
                            showFee = '1';
                        }else{
                            showFee = '0';
                        }
                        component.set("v.showFee", showFee);
                    }else{
                        component.set("v.showFee",component.get("v.BICList")[i][1]);
                    }

                }
                else{
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                            errors[0].message);
                        }
                        component.set("v.showError", true);
                    } else {
                        component.set("v.showError", true);
                        console.log("Unknown error");
                    }
                }
            });
            $A.enqueueAction(action);
        }catch(e){
            component.set("v.showError", true);
            console.log("CMP_IPTDetailParent / getSegment : " + e);
        }
    },

    

    /*
	Author:         R. Cervino
    Company:        Deloitte
    Description:    Method to decrypturl
    History
    <Date>			<Author>			<Description>
	27/02/2020		R. Cervino     	Initial version
    */        
   getBicListFull:  function(component, event, helper){

        helper.getBICS(component).then(function(){
            helper.getURLParams(component, event,helper);
        });            
    },
    
    /*
	Author:         R. Cervino
    Company:        Deloitte
    Description:    Method to decrypt data
    History
    <Date>			<Author>			<Description>
	27/02/2020		R. Cervino     	Initial version
    */    
    decrypt : function(component, data){
        try {
            var result="null";
            var action = component.get("c.decryptData");
            
            action.setParams({ "str" : data }); 
            
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
    },



    /*
	Author:         R. Cervino
    Company:        Deloitte
    Description:    Method to decrypt data
    History
    <Date>			<Author>			<Description>
	14/05/2020		R. Cervino     	Initial version
    */    
   getBICS : function(component){
    try {
        var result="null";
        var action = component.get("c.getBICList");
                
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

                    if(result!=null && result!=undefined){
                        var bics =[];
                        for(var i in result){
                            var format = '1';
                            if(result[i].Fee_format__c==$A.get('$Label.c.Full')){
                                format='2';
                            }else if (result[i].Fee_format__c==$A.get('$Label.c.Partial')){
                                format='1';
                            }else{
                                format='0';
                            }

                            bics.push([result[i].Label,format]);                            
                        }
                         component.set("v.BICList",bics);
                         console.log(bics);
                    }
                }
                resolve();
                });
                $A.enqueueAction(action);
            });
            
        } catch(e) {
            console.error(e);
        }
    },
        /*
	Author:         R. Cervino
    Company:        Deloitte
    Description:    Method to get payment steps
    History
    <Date>			<Author>			<Description>
	27/02/2020		R. Cervino     	Initial version
    */    
    getDataSteps : function(component,event,helper){
        try {
            var action = component.get("c.getSteps");

            action.setParams({ "str" : component.get("v.iObject.uetr") }); 
            
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "ERROR") {
                    
                    if(component.get("v.comesFromUETRSearch")){
                        component.set("v.UETRSearchResult", null);
                    }
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                                        reject(response.getError()[0]);
                                        component.set("v.ready",true);
                                        $A.util.addClass(component.find("spinnerCreate"), "slds-hide");   		
                                        component.set("v.showError", true);

                        }
                    } else {
                        console.log("Unknown error");
                        component.set("v.showError", true);
                    }
                }else if (state === "SUCCESS") {

                    var res = response.getReturnValue();
                    console.log(res);

                    if(res!='' && res!=undefined && res!=null){
                        //var res = JSON.parse(result)

                        var iobj= component.get("v.iObject");
                        component.set("v.iObject.lastUpdate", res.lastUpdateTime);
                        component.set("v.iObject.hasForeignExchange", res.hasForeignExchange);
                        component.set("v.iObject.instructedAmount", res.instructedAmount);
                        component.set("v.iObject.confirmedAmount", res.confirmedAmount);
						
                        console.log('InstructedAmount en steps');
                        var tempLog = component.get("v.iObject");
                        console.log(tempLog);
                                    
                        component.set("v.iObject.lastUpdateTime", res.lastUpdateTime);
                        component.set("v.iObject.reason", res.transactionStatus.reason);
                        component.set("v.iObject.status", res.transactionStatus.status);
                        component.set("v.totalElapsedTime", res.totalElapsedTime);

                        if(component.get("v.comesFromUETRSearch") && !component.get("v.isPaymentIngested") && res.creditorAgent != null){
                            iobj.beneficiaryAccountBic = res.creditorAgent.agentCode;
                            iobj.beneficiaryCountry = res.creditorAgent.agentCountry;
                            iobj.beneficiaryCountryName = res.creditorAgent.agentCountryName;
                            iobj.beneficiaryAccountBank = res.creditorAgent.agentName;
                            iobj.beneficiaryCity = res.creditorAgent.agentLocation;
                        }
                        
                        var stepList=[];
                        var steps=res.paymentEventsArray;
						
                        if(steps.length>0){
                            var fees = [];

                            var currencies = [];
                            for(var i in steps){


                                
                                var step = [];
                                step.bank=steps[i].toAgent.agentName;
                                step.bic=steps[i].toAgent.agentCode;
                                step.country=steps[i].toAgent.agentCountry;
                                step.countryName=steps[i].toAgent.agentCountryName;
                                step.city=steps[i].toAgent.agentLocation;
                                step.arrival=steps[i].receivedDate;
                                step.departure=steps[i].senderAcknowledgementReceipt;
                                step.foreignExchangeDetails=steps[i].foreignExchangeDetails;
								
                                //if(steps[i].receivedDate==''){
                                    component.set("v.iObject.currentBank", step.bank);
                                //}
                                if(steps[i].chargeAmountSingle!=undefined){
                                    if(steps[i].chargeAmountSingle.amount!=null && steps[i].chargeAmountSingle.amount!=0.0){
                                        step.feeApplied=true;
                                        step.stepFee=steps[i].chargeAmountSingle.amount;
                                        step.stepFeeCurrency=steps[i].chargeAmountSingle.tcurrency;
                                        if(!currencies.includes(steps[i].chargeAmountSingle.tcurrency)){
                                            currencies.push(steps[i].chargeAmountSingle.tcurrency);
                                        }
                                        fees.push([steps[i].chargeAmountSingle.tcurrency,(steps[i].chargeAmountSingle.amount)]);
                                        step.feeApplied=true;
                                    }else{
                                        step.feeApplied=false;
                                    }
                                }
                                if(steps[i].chargeBearer=='SHAR'){
                                    step.charges=$A.get("$Label.c.shared");
                                    iobj.charges=$A.get("$Label.c.shared");
                                }
                                if(steps[i].chargeBearer=='DEBT'){
                                    step.charges=$A.get("$Label.c.borneByDebitor");
                                    iobj.charges=$A.get("$Label.c.borneByDebitor");
                                }
                                if(steps[i].chargeBearer=='CRED'){
                                    step.charges=$A.get("$Label.c.borneByCreditor");
                                    iobj.charges=$A.get("$Label.c.borneByCreditor");
                                }
                               
                                stepList.push(step);

                                
                            }   

                            if((iobj.status=='ACSP' || iobj.status=='RJCT') && iobj.beneficiaryAccountBic!=stepList[stepList.length-1].bic){
                                //if(component.get("v.isPaymentIngested")){
                                    var step = [];
                                    step.bank=iobj.beneficiaryAccountBank;
                                    step.bic=iobj.beneficiaryAccountBic;
                                    step.country=iobj.beneficiaryCountry
                                    step.countryName=iobj.beneficiaryCountryName;
                                    step.city=iobj.beneficiaryCity;
                                    step.arrival='';
                                    step.departure='';
                                    if(iobj.status=='RJCT'){
                                        stepList[stepList.length-1].lastStep=true;
                                        step.lastStep2=true;
                                    }
                                    stepList.push(step);
                                //}
                        	}else  if(iobj.status=='ACSP' && iobj.beneficiaryAccountBic==stepList[stepList.length-1].bic  && stepList[stepList.length-1].arrival!=null){
                                if (stepList.length>1){
                                    stepList[stepList.length-2].lastStep=true;
                                    stepList[stepList.length-1].lastStep2=true;
                                }
                            }

                            if(fees.length>0){
                                var auxFees = [];
                                for(var c in currencies){
                                    var amount =0;
                                    for(var f in fees){
                                        console.log(f);
                                        if(fees[f][0]== currencies[c]){
                                            amount+=fees[f][1];
                                        }
                                    }
                                    auxFees.push([currencies[c],amount]);
                                }
                                fees=auxFees;
                            }

                            iobj.stepList=stepList;
                            iobj.fees=fees;
                            console.log(iobj.fees);

                            //resolve(iobj);
                        }
                    }
                }else{
                    console.log("recibimos lista vacia");
                }
                console.log("lista final");
                console.log(iobj.stepList);
                console.log("v.iObject");
                component.set("v.ready",true);
                $A.util.addClass(component.find("spinnerCreate"), "slds-hide");
            });
            helper.getReason(component,event, helper)
            $A.enqueueAction(action);
        } catch(e) {
            component.set("v.showError", true);
            console.error(e);
        }
    },
    /*
	Author:         R. Cervino
    Company:        Deloitte
    Description:    Method to get data according to user locale
    History
    <Date>			<Author>			<Description>
	27/02/2020		R. Cervino     	Initial version
    
    getDateTime: function(component, event, helper){
        try{
            helper.getDataSteps(component,event, helper).then(function(results){
                var action = component.get("c.getDateAndTime");
                if(component.get("v.iObject.status")=='ACSC' || component.get("v.iObject.lastUpdate")=='ACCC'){
                    action.setParams({arrival:component.get("v.iObject.initiationTime"),departure:component.get("v.iObject.completionTime")});
                }else{
                    action.setParams({arrival:component.get("v.iObject.initiationTime"),departure:component.get("v.iObject.lastUpdateTime")});

                }
                
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        var res = response.getReturnValue(); 
                        //results.lastUpdate=res.substring(8,10) +"/"+res.substring(5,7)+"/"+res.substring(0,4) +" | "+res.substring(11)  ;
                        		

                        component.set("v.iObject",results);
                    }
                    else{
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
                    component.set("v.ready",true);
                    $A.util.addClass(component.find("spinnerCreate"), "slds-hide");   


                });
                $A.enqueueAction(action);
            });
        }catch(e){
            console.log("CMP_IPTDetailParent / getDummyData : " + e);
        }
    },*/
    /*
	Author:         R. Cervino
    Company:        Deloitte
    Description:    Method to get the reason step description
    History
    <Date>			<Author>			<Description>
	27/02/2020		R. Cervino     	Initial version
    */    
    getReason: function(component, event, helper){
        try{

            if(component.get("v.iObject.status")=='RJCT'){
                var action = component.get("c.getReason");
                action.setParams({iReason:component.get("v.iObject.reason")});
                
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        var res = response.getReturnValue(); 
                        component.set("v.iObject.reason2",res);
                    }
                    else{
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
            }

        }catch(e){
            console.log("CMP_IPTDetailParent / getDummyData : " + e);
        }
    }
})