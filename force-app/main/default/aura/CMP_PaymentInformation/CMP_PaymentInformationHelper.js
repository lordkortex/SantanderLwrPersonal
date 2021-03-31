({
    createCase : function(component, event, helper) {
        var obj = component.get('v.paymentObj');
        if(obj != null && obj != undefined){
            
           // var action = component.get("c.createCase");
            var action = component.get("c.createCase");
            action.setParams({ 
                payment : JSON.stringify(obj)
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    
                   var result = response.getReturnValue();
                    // var result = returnValue.value;
                    if(result.success){
                        helper.openRecord(component, event, helper, result.value.output.Id);
                        helper.showSuccessToast(component, event, helper, result.value.output.CaseNumber);
                        component.set('v.showSpinner', false); 
                    }else{
                        helper.openRecord(component, event, helper, result.value.output.Id);
                        helper.showInfoToast(component, event, helper, result.value.output.CaseNumber);
                        component.set('v.showSpinner', false); 
                    }

                    
                }
                else if (state === "INCOMPLETE") {
                    // do something
                    
                }
                    else if (state === "ERROR") {
                        var errors = response.getError(component, event, helper);
                        helper.showErrorToast();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                            errors[0].message);
                            }
                        } else {
                            console.log("Unknown error");
                        }
                        
                    }else{
                        // do something
                    }
            });        
            $A.enqueueAction(action); 
        }
    },
    //$Label.c.Toast_Success
    //$Label.c.CASE_NewCase
    showSuccessToast : function(component, event, helper, caseNumber) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : $A.get("$Label.c.Toast_Success"),
            message:  $A.get("$Label.c.CASE_NewCase") + ' ' + caseNumber,//'Case '+ caseNumber +' was created.',           
            duration:' 5000',
            key: 'info_alt',
            type: 'success',
            mode: 'pester'
        });
        toastEvent.fire();
    },
    //$Label.c.Toast_Success
    //$Label.c.CASE_OldCase
    showInfoToast : function(component, event, helper, caseNumber) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : $A.get("$Label.c.Toast_Success"),
            message: $A.get("$Label.c.CASE_OldCase") + ' ' + caseNumber,
            duration:' 5000',
            key: 'info_alt',
            type: 'info',
            mode: 'pester'
        });
        toastEvent.fire();
    },
   // $Label.c.ERROR
    showErrorToast : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : $A.get("$Label.c.ERROR"),
            message:'Mode is pester ,duration is 5sec and Message is not overrriden because messageTemplateData is not specified',            
            duration:' 5000',
            key: 'info_alt',
            type: 'error',
            mode: 'pester'
        });
        toastEvent.fire();
    },

    openRecord : function (component, event, helper, objId) {
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
          "recordId": objId
        });
        navEvt.fire();
    },
     /*getData : function(component, event, helper, filters) {
        try {
            var action = component.get("c.getFilteredData");
            component.set("v.jsonArray",[]);

            action.setParams({filters: filters});
            action.setCallback(this, function(response) {
            var state = response.getState();
                if (state == "ERROR") {
                    var errors = response.getError();
                    console.log(errors);
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }else if (state == "SUCCESS") {

                    //DO NOT REMOVE
                    var res = response.getReturnValue();
                    console.log(res);
                    if(res != null && res != undefined  && Object.keys(res).length>0){
                        component.set("v.jsonArray",res.paymentList);

                        //IF IT COMES FROM UETR BUTTOM AND IS NOT INGESTED.
                        if(component.get("v.jsonArray").length == 0 && component.get("v.isUETRSearch")){
                            helper.goToDetails(component, event, helper);
                        }
                    }
                }

            });
            $A.enqueueAction(action);
        } catch (e) {
            console.log(e);
        }
    },*/
     goToDetails : function(component, event, helper){
        console.log('>>> Open Payment Details');
        var url='c__paymentId='+component.get("v.uetr")+'&c__comesFromUETRSearch=true';
        try{
            this.encrypt(component, url).then(function(results){
                let navService = component.find("navService");
                console.log(navService);
                let pageReference={};
                pageReference= {
                    type: "standard__component",
                    attributes: {
                        "componentName":"c__CMP_BackFrontGPITrackerPaymentDetail",
                        "actionName":"view"
                    },
                    state: {c__params:results}
                };
                console.log(pageReference);
                navService.navigate(pageReference);  
            });

        } catch (e) {
            console.log(e);
        }
    },
    encrypt : function(component, data){
        try{
            var result="null";
            var action = component.get("c.encryptData");
            action.setParams({ str : data });
            return new Promise(function (resolve, reject) {
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "ERROR") {
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + errors[0].message);
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
        } catch (e) { 
            console.log(e);
        }   
    },
    calculateListDocument : function(component,event, helper){
		var paymentObjDocument = component.get('v.paymentObj.documents');
        var ids=new Array();
        for (var i= 0 ; i < paymentObjDocument.length ; i++){
            ids.push(paymentObjDocument[i]);
        }
        if(ids.length == 1){
        	//component.set("v.hasModalOpen" , true);
        	//component.set("v.selectedDocumentId",paymentObjDocument[0].contentDocumentId);
        	helper.openDocument(component,event, helper,paymentObjDocument[0].contentDocumentId);
    	}
        else{
        var idListJSON=JSON.stringify(ids);
        var action = component.get("c.fetchContentDocument");
            action.setParams({ 
                    ccvList : idListJSON
                });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set('v.lstContentDoc', response.getReturnValue());
                    component.set("v.hasModalTable" , true);
                }
            });
        $A.enqueueAction(action); 
        }
    },
    viewMT103 : function(component,event, helper){
		var paymentId = component.get('v.paymentObj.paymentId');
        var action = component.get("c.viewMT103");
            action.setParams({ 
                    paymentId : paymentId
                });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    if(response.getReturnValue() != '')
                    	helper.openDocument(component,event, helper,response.getReturnValue());
                }
            });
        $A.enqueueAction(action);
        //helper.openDocument(component,event, helper,'0691j000000OsD9AAK');
    },
 	openDocument :function(component,event, helper,documentId){
		component.set("v.hasModalOpen" , true);
		component.set("v.selectedDocumentId",documentId);
        component.set("v.hasModalTable" , false);
 	}
})