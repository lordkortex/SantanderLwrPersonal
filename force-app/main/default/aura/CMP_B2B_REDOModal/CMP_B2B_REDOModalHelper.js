({
    /*
 Author:        	Shahad Naji
 Company:        Deloitte
 Description:    Close Modal and show page scroll
 History
 <Date>			<Author>			<Description>	    
 26/06/2020		Shahad Naji			Initial version
 */
 closeModal : function (component, helper) {
     component.set("v.showRedo",false);
     var div = document.querySelector(".comm-page-custom-landing-payment-details");
     if(!$A.util.isEmpty(div)){
         document.querySelector(".comm-page-custom-landing-payment-details").style.overflow = 'auto';
     }
     
 },
 
 /*
 Author:        	Guillermo Giral
 Company:        Deloitte
 Description:    Sends the payment to review status
 History
 <Date>			<Author>			    <Description>	    
 28/07/2020		Guillermo Giral			Initial version
 12/11/2020      Julian Hoyos            Change name of method and values of reject atributes
 */
 updatePaymentData : function (component, event, helper) {
     return new Promise($A.getCallback(function (resolve, reject) {
         var action = component.get("c.tracking");
         let params;
         if(component.get("v.action") == "Reject"){
             params = {
                 "paymentId" : component.get("v.payment.paymentId"),
                 "status" : "997",
                 "reason" : "001",
                 "subject" : component.get("v.subject"),
                 "description" : component.get("v.description")
             };
         }
         else{
             params = {
                 "paymentId" : component.get("v.payment.paymentId"),
                 "status" : "003",
                 "reason" : "001",
                 "subject" : component.get("v.subject"),
                 "description" : component.get("v.description")
             };
         }
         action.setParams(params);
         action.setCallback(this, function(response) {
             var state = response.getState();
             if (state === "SUCCESS") {
                 var  output = response.getReturnValue();
                 if(output.success){
                     resolve("ok");
                 }else{
                     reject({
                         'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                         'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                         'noReload': false
                     });
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
                 reject({
                     'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                     'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                     'noReload': false
                 });
             }else{
                 console.log("Another error");
                 reject({
                     'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                     'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                     'noReload': false
                 });
             }
         });       
         $A.enqueueAction(action);
     }), this);
 },
 
 /*
 Author:        	Guillermo Giral
 Company:        Deloitte
 Description:    Handles the response of the payment status udpate
 History
 <Date>			<Author>			    <Description>	    
23/11/2020		Shahad Naji				Initial version that subtitute 'handleSendResponse' deprecated method
 */
    sendNotification : function (component, event, helper){
        return new Promise($A.getCallback(function (resolve, reject) {
            var buttonSelected = component.get("v.action");
            var notificationType = '';
            if(!$A.util.isEmpty(buttonSelected)){
                if(buttonSelected == "Reject"){
                    notificationType = "Reject";
                }else{
                    notificationType = "Review";
                }
            }
            var paymentObj = component.get('v.payment');
            var paymentId = '';
            var clientReference = '';
            var paymentCreator = '';
            if(!$A.util.isEmpty(paymentObj)){
                paymentId = paymentObj.paymentId;
            }
            if(!$A.util.isEmpty(notificationType) && !$A.util.isEmpty(paymentId)){
                var action = component.get("c.sendNotification");
                action.setParams({ 
                    'notificationType' : notificationType,
                    'paymentId' : paymentId
                });
                
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        resolve('OK');
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
                        reject({
                            'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                            'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                            'noReload': false
                        });
                    }else{
                        console.log("Another error");
                        reject({
                            'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                            'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                            'noReload': false
                        });
                    }
                });       
                $A.enqueueAction(action);
                
            }else{
                reject('KO');
            }            
        }), this);
    },
    
    /*
 Author:        	Shahad Naji
 Company:        Deloitte
 Description:    Makes the callout to ancel a previously validated transaction, 
                 which removes it from transactional counters for accumulated limits
 History
 <Date>			<Author>			    <Description>	    
 16/09/2020		Shahad Naji				Initial version
 12/11/2020     Julian Hoyos            Change the values of reject atributes
 */    
    reverseLimits : function (component, event, helper){
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get("c.reverseLimits");    
            var paymentObj = component.get("v.payment");  
            action.setParams({ 
                paymentData : paymentObj
            }); action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var  output = response.getReturnValue();
                    if (output.success) { 
                        if(!$A.util.isEmpty(output.value)){
                            if (returnValue.value.limitsResult.toLowerCase() != ok.toLowerCase()) { 
                                resolve('ok'); 
                            }else{
                                reject({
                                    'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                                    'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                                    'noReload': false
                                });
                            }
                        }else{
                            resolve('ok'); 
                        }                    
                    } else {
                        reject({
                            'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                            'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                            'noReload': false
                        });
                        
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
                    reject({
                        'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                        'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                        'noReload': false
                    });
                }else{
                    console.log("Another error");
                    reject({
                        'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                        'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                        'noReload': false
                    });
                }
            });       
            $A.enqueueAction(action);
        }), this);
    },
 
 /*
 Author:        	R. Alex Cerviño
 Company:        Deloitte
 Description:    Send to review
 History
 <Date>			<Author>			<Description>
 18/06/2020		Bea Hill   		    Initial version
 16/09/2020		Shahad Naji			Moves the method from this component controller to this component helper
                                     to be used from 'sendProcess' method
 12/11/2020      Julian Hoyos        Change the name of Method and change the attributes of reject case.                              
 */
 validateInput: function (component, event, helper) {
     return new Promise($A.getCallback(function (resolve, reject) {

         let subject = component.get('v.subject');
         let description = component.get('v.description');
         let maxCharsDescription = component.get('v.charactersMax');
         let maxCharsSubject = component.get('v.charactersMaxSubject');
         if (!$A.util.isEmpty(subject)) {
            
             if (description.length < maxCharsDescription && subject.length < maxCharsSubject) {
                 resolve("ok");
             }
             else if (subject.length > maxCharsSubject){//meter mensaje de caracteres en lugar del actual
               // var msg = $A.get('$Label.c.B2B_Error_Enter_Input');//please enter
                //component.set('v.errorSubject', msg.replace('{0}', $A.get("$Label.c.Subject")));
                let length = subject.length;
			    maxCharsSubject = maxCharsSubject - length;
                var substraction = maxCharsSubject * -1;
                var msg = $A.get("$Label.c.PAY_ErrorCharacters");
                if(msg != undefined && msg != null){
                    msg  = msg.replace("{0}", substraction);
                }
                component.set('v.errorSubject', msg);
                reject({
                    'title': null,
                    'body': null,
                    'noReload': null
                });  
             } else{
                let length = description.length;
                maxCharsDescription = maxCharsDescription - length;
                var substraction = maxCharsDescription * -1;
                var msg = $A.get("$Label.c.PAY_ErrorCharacters");
                if(msg != undefined && msg != null){
                    msg  = msg.replace("{0}", substraction);
                }
                component.set('v.errorDescription', msg);
                reject({
                    'title': null,
                    'body': null,
                    'noReload': null
                }); 
             }
         } else {
             var msg = $A.get('$Label.c.B2B_Error_Enter_Input');
             component.set('v.errorSubject', msg.replace('{0}', $A.get("$Label.c.Subject")));
             reject({
                 'title': null,
                 'body': null,
                 'noReload': null
             });          
           }
     }), this);
 },

 /*
 Author:        	Julian Hoyos MArtinez
 Company:        Deloitte
 Description:    Show Toast
 History
 <Date>			<Author>			<Description>
 12/11/2020      Julian Hoyos        Initial Version
 */
 showToast: function (component, event, helper, title, body, noReload) {
     var errorToast = component.find('toast');
     if (!$A.util.isEmpty(errorToast)) {
         errorToast.openToast(false, false, title, body, 'Error', 'warning', 'warning', noReload, false);
     }
 },

showSuccessToast: function(component, event, helper, title, body, method) {
    var toast = component.find('toast');
    if (!$A.util.isEmpty(toast)) {
        toast.openToast(true, false, title, body, 'Success', 'success', 'success', false,false , method);
    }
},
 /*
	Author:        	Beatrice Hill
    Company:        Deloitte
	Description:    Encryption for page navigation
    History
    <Date>			<Author>			<Description>
    18/11/2020      Beatrice Hill       Adapted from CMP_AccountsCardRow
    */

   goTo : function (component, event, page, url){
    let navService = component.find("navService");

    if(url!=''){
        
        this.encrypt(component, url).then(function(results){

                let pageReference = {
                        type: "comm__namedPage", 
                        attributes: {
                                pageName : page
                        },
                        state: {
                                params : results
                        }
                }
                navService.navigate(pageReference); 
        });
    }else{
        let pageReference = {
            type: "comm__namedPage", 
            attributes: {
                    pageName: page
            },
            state: {
                    params : ''
            }
        }
        navService.navigate(pageReference); 

    }

},

/*
Author:        	Beatrice Hill
Company:        Deloitte
Description:    Encryption for page navigation
History
<Date>			<Author>			<Description>
18/11/2020      Beatrice Hill       Initial version
*/

encrypt : function(component, data){  
    var result="null";
    var action = component.get("c.encryptData");
    action.setParams({ str : data });
    // Create a callback that is executed after 
    // the server-side action returns
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
  
},
/*
 Author:        	Julian Hoyos MArtinez
 Company:        Deloitte
 Description:    Go to landing
 History
 <Date>			<Author>			<Description>
 14/01/2021      Julian Hoyos        Initial Version
 */
sendToLanding: function (component, event, helper, variable, signed) {
    let navService = component.find('navService');
    var url = '';
    if (variable === 'review'){
         url = 'c__review=' + signed;
    } else if (variable === 'reject'){
         url = 'c__reject=' + signed;
    }
    this.encrypt(component, url)
    .then($A.getCallback(function (results) {
        let pageReference = {
            'type': 'comm__namedPage',
            'attributes': {
                'pageName': component.get('v.handleCancel')
            },
            'state': {
                'params': results
            }
        }
        navService.navigate(pageReference);
    }));
}

 
})