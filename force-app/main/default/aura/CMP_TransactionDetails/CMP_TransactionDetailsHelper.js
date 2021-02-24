({
    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to get the URL params that is sended from global balance or transacition detail page.
    History
    <Date>			<Author>			<Description>
	18/02/2020		Pablo Tejedor   	Initial version
	*/
    getURLParams : function(component, event,  helper) {
        
        try{
          
            var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
            var sURLVariablesMain = sPageURLMain.split('&')[0].split("="); 
            var sParameterName;
            
            var sPageURL;
            if (sURLVariablesMain[0] == 'params') {
                  console.log('entra en el try getURLparams');
                this.decrypt(component,sURLVariablesMain[1]).then(function(results){
                    sURLVariablesMain[1] === undefined ? 'Not found' : sPageURL = results;
                    
                    var sURLVariables=sPageURL.split('&');
                    
                    for ( var i = 0; i < sURLVariables.length; i++ ) {
                        sParameterName = sURLVariables[i].split('=');  
                        if (sParameterName[0] === 'c__source') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.sourcePage",sParameterName[1]);
                            if(component.get("v.sourcePage") == 'globalBalance'){
                                component.set("v.isSearching",false);
                            }
                            if(component.get("v.sourcePage") != 'globalBalance'){
                                component.set("v.showResults",true);
                            }
                        }
                        if (sParameterName[0] === 'c__subsidiaryName') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.accountName",sParameterName[1]);
                        }
                        if (sParameterName[0] === 'c__accountNumber') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.accountNumber",sParameterName[1]);
                        }
                        if (sParameterName[0] === 'c__bank') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.bank",sParameterName[1]);
                        }
                        if (sParameterName[0] === 'c__mainAmount') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.availableBalance",sParameterName[1]);
                        }
                        if (sParameterName[0] === 'c__availableAmount') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.bookBalance",sParameterName[1]);
                        }
                        if (sParameterName[0] === 'c__currentCurrency') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.accountCurrency",sParameterName[1]);
                        }
                        if (sParameterName[0] === 'c__showPills') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.showPills",sParameterName[1]);
                            if(component.get("v.isSearching")){
                                component.set("v.hiddeAccountInfo", false);
                            }
                        }
                        if (sParameterName[0] === 'c__pills') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.pills",JSON.parse(sParameterName[1]));    
                        }
                        if (sParameterName[0] === 'c__comeFrom') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.backTodetail",sParameterName[1]);    
                        }
                        
                        if (sParameterName[0] === 'c__isSearching') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.isSearching",sParameterName[1]);
                        
                        }
                        
                    }
                    
                });

                
                   
               
               // component.find("transactionTable").loadData('','');
        
              
            }

            if(component.get("v.sourcePage") != 'globalBalance'){
                component.set("v.isSearching",true);
            }

        } catch (e) {
            console.log(e);
            
        }
       
    },


    
    
 
   
/*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function decrypt the url params.
    History
    <Date>			<Author>			<Description>
	18/02/2020		Pablo Tejedor   	Initial version
	*/
        //The following method decrypts data received within an URL
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
    
    doInit : function(component, event,  helper) {
        /*try{
            var action = component.get("c.initClass");
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") { 
                    var iReturn = response.getReturnValue();
                    component.set("v.formValues", iReturn);
                }
                else{
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " +  errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
            });
            $A.enqueueAction(action); 
        }catch(e){
            console.log(e);
        }*/
    }/*,
    openCloseForm : function(component, event,  helper) {
        try{
            var searchArea = component.find("searchForm");
            if(searchArea !=undefined && searchArea!=null){
                $A.util.toggleClass(searchArea,"slds-hide");
            }
        } catch (e) {
            console.log(e);
        }
    }*/
})