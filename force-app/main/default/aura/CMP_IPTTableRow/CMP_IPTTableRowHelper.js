({
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to navigate to page
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/
    
    goTo : function (component, event, page, url){
        try{
            this.encrypt(component, url).then(function(results){
                let navService = component.find("navService");
                let pageReference={};
                     
                pageReference = {
                    type: "comm__namedPage", 
                    attributes: {
                        pageName: page
                    },
                    state: {
                        params : results
                    }
                }
                navService.navigate(pageReference); 
                
            });

        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to cipher data
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

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
        } catch (e) { 
            console.log(e);
        }   
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to download the MT103
    History
    <Date>			<Author>		<Description>
    12/12/2019		R. Alexander Cervino     Initial version*/

    downloadMT103 : function(component, event, helper){
        //First retrieve the doc and the remove it
        try{            
            this.retrieveMT103(component, event, helper).then(function(results){
                if(results!=null && results!='' && results!=undefined){
                    
                    var domain=$A.get('$Label.c.domain');
                    if(component.get("v.fromCashNexus")==true){
                        domain=$A.get('$Label.c.domainCashNexus');
                    }
                    if(component.get("v.backfront")==true){
                        domain=$A.get('$Label.c.domainBackfront');
                    }

                    window.location.href = domain+'/sfc/servlet.shepherd/document/download/'+results+'?operationContext=S1';

                    setTimeout(function(){
                        helper.removeMT103(component, event, helper, results);
                    }, 80000);
                }
            });

        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to remove the downloaded MT103
    History
    <Date>			<Author>		<Description>
    17/12/2019		R. Alexander Cervino     Initial version*/

    removeMT103 : function(component, event, helper, ID){

        try{
            var action = component.get("c.removeMT103");
            //Send the payment ID
            action.setParams({id:ID});
            action.setCallback(this, function(response) {
                var state = response.getState();

                if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }else if (state === "SUCCESS") {
                }
            });
            $A.enqueueAction(action);

        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to retieve the MT103
    History
    <Date>			<Author>		<Description>
    16/12/2019		R. Alexander Cervino     Initial version*/

    retrieveMT103 : function(component, event, helper){
        try{
            var action = component.get("c.downloadMT103Doc");
            //Send the payment ID
            action.setParams({str:component.get("v.item.paymentDetail.paymentId")});
            return new Promise(function (resolve, reject) {
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "ERROR") {
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                            errors[0].message);
                                reject(errors);
                            }
                        } else {
                            console.log("Unknown error");
                        }
                    }else if (state === "SUCCESS") {
                        resolve(response.getReturnValue());
                    }
                });
                $A.enqueueAction(action);
            });

        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get date by user locale
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/

    getDateTime: function(component, event, helper){
        try{
            if(component.get("v.item.paymentDetail.statusDate")!=undefined){
                
                var action = component.get("c.getDateAndTime");
                action.setParams({dateT:component.get("v.item.paymentDetail.statusDate")});
                
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        var res = response.getReturnValue(); 
                        var results=res.substring(8,10) +"/"+res.substring(5,7)+"/"+res.substring(0,4) +" | "+res.substring(11);
                        component.set("v.item.paymentDetail.statusDate",results);
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