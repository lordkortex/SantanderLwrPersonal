({
    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to get the URL params that is sended from the global balance component.
    History
    <Date>			<Author>			<Description>
	26/12/2019		Pablo Tejedor   	Initial version
	*/
    getURLParams : function(component,event,helper) {

        try{
            var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
            var sURLVariablesMain = sPageURLMain.split('&')[0].split("="); 
            var sParameterName;
            
            var sPageURL;

            if (sURLVariablesMain[0] == 'params') {
                this.decrypt(component,sURLVariablesMain[1]).then(function(results){
                    sURLVariablesMain[1] === undefined ? 'Not found' : sPageURL = results;

                    var sURLVariables=sPageURL.split('&');

                    for ( var i = 0; i < sURLVariables.length; i++ ) {
                        sParameterName = sURLVariables[i].split('=');      
                        //añadir paramatros en caso de que falten.
                        if (sParameterName[0] === 'c__subsidiaryName') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.accountName",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__accountNumber') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.accountNumberAndEntity",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__bank') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.accountNumberBank",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__source') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.sourceMovementHistory",sParameterName[1]); 
                          
                        }else if (sParameterName[0] === 'c__lastUpdateAvailableBalance') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.dateParam",sParameterName[1]);
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.finalAvailableDate",sParameterName[1].split(',')[0]);
                        }else if (sParameterName[0] === 'c__availableAmount') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.availableBalanceParam",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__mainAmount') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.bookBalanceParam",sParameterName[1]);
                        } else if(sParameterName[0] === 'c__currentCurrency') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.currencyTable",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__dateFrom') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.dateFrom",sParameterName[1]);
                             if(sParameterName[1].includes('-')){
                                var splitDateTo = sParameterName[1];

                                if(splitDateTo.includes('undefined')){
                                    do{
                                        splitDateTo = splitDateTo.replace('undefined/','');
                                    } while (splitDateTo.includes('undefined'));

                                    component.set("v.dateFrom",splitDateTo.split('-')[2]+'/'+splitDateTo.split('-')[1]+'/'+splitDateTo.split('-')[0]);
                                }
                           
                            }     
                            
						}else if (sParameterName[0] === 'c__dateTo') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.dateTo",sParameterName[1]);
                           
                            if(sParameterName[1].includes('-')){
                                var splitDateTo = sParameterName[1];

                                if(splitDateTo.includes('undefined')){
                                    do{
                                        splitDateTo = splitDateTo.replace('undefined/','');
                                    } while (splitDateTo.includes('undefined'));
                                         
                                }

                                component.set("v.dateParam",splitDateTo.split('-')[2]+'/'+splitDateTo.split('-')[1]+'/'+splitDateTo.split('-')[0]);
                            }else{
                                component.set("v.dateParam",sParameterName[1].split('/')[2]+'/'+sParameterName[1].split('/')[1]+'/'+sParameterName[1].split('/')[0]);
                            }
                           
						}else if (sParameterName[0] === 'c__selectedAccountSearch') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.SelectedAccount",sParameterName[1]);
                            var selectedToSplit = component.get("v.SelectedAccount");
                            
                            component.set("v.currencyTable",selectedToSplit.split('-')[0]);
                            component.set("v.accountNumberAndEntity",selectedToSplit.split('-')[1]);
                         
						}else if (sParameterName[0] === 'c__bookBalanceParam') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.bookBalanceParam",sParameterName[1]);
                           
						}else if (sParameterName[0] === 'c__availableBalanceParam') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.availableBalanceParam",sParameterName[1]);
                            component.set("v.isSearched",true);
                            
						}
                    }
                    
                    var source = component.get("v.sourceMovementHistory");
                    // If the movement history is accessed from the global balance screen
                    if(source == 'globalBalance' || source == 'historyofextracts'  || component.get("v.isSearched") ){
                        if(component.get("v.SelectedAccount") == null || component.get("v.SelectedAccount") == undefined){
                            component.set("v.SelectedAccount", component.get("v.currencyTable") + ' - ' + component.get("v.accountNumberAndEntity"));
                        }
                      
                        component.set("v.currentNavigation", [$A.get("$Label.c.International_Treasury_Management"), $A.get("$Label.c.MovementHistory_Extract")]);
                    }
                    
                    component.set("v.ready",true);
                    helper.getAccountDataDropdown(component,event,helper);
                });
              
            }else{
                helper.getAccountDataDropdown(component,event,helper);
            }
 
        } catch (e) {
            console.log('entra en el catch');
            helper.getAccountDataDropdown(component,event,helper);
            console.log(e);
        }
    },

    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to get the avaible accounts for the user .
    History
    <Date>			<Author>			<Description>
	16/01/2020		Pablo Tejedor   	Initial version
    */
    
    getAccountDataDropdown : function(component,event,helper){
        component.find("Service").callApex2(component, helper,"c.getAccountsAvaibleData", {}, this.getAccountData);      
    },

    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to get the avaible accounts for the user .
    History
    <Date>			<Author>			<Description>
	16/01/2020		Pablo Tejedor   	Initial version
    */

    getAccountData: function(component,helper,response){
        var listData = [];
        for(var a=0; a<response.accountList.length ;a++){
            var dropDownList = response.accountList[a].currencyCodeAvailableBalance + ' - ' + response.accountList[a].displayNumber;
            listData.push(dropDownList);   
            if(component.get("v.accountNumberAndEntity") != null && component.get("v.accountNumberAndEntity") == response.accountList[a].displayNumber){
                //component.set("v.SelectedAccount",response.accountList[a].currencyCodeAvailableBalance + ' - ' + response.accountList[a].displayNumber );
                //component.set("v.currencyTable",response.accountList[a].currencyCodeAvailableBalance);
                component.set("v.availableBalanceParam",response.accountList[a].amountAvailableBalance);
                component.set("v.bookBalanceParam",response.accountList[a].amountMainBalance);
                var bookdateAux = response.accountList[a].lastUpdateAvailableBalance;
                component.set("v.dateParam",bookdateAux.split(',')[0]);
            } 
        }
        if(component.get("v.sourceMovementHistory") =='globalBalance' || component.get("v.sourceMovementHistory")== 'historyofextracts'){
            component.set("v.tablecomprobation", true);
        }

        component.set("v.accountInfoDataSearch",response.accountList );
        component.set("v.AccountList", listData.sort() );
        component.set("v.doneRenderingParent", true);
        
        if(component.get("v.sourceMovementHistory") == undefined || component.get("v.sourceMovementHistory") == null || component.get("v.sourceMovementHistory") == ''){     
            var sourceAux = 'dropdownMenu';
            component.set("v.sourceMovementHistory",sourceAux);
          
        }
       
    },

    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to decypt the URL params that is sended from the global balance component.
    History
    <Date>			<Author>			<Description>
	26/12/2019		Pablo Tejedor   	Initial version
	*/
    decrypt : function(component, data){
        try {
            var result="null";
            var action = component.get("c.decryptData");
    
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

        } catch(e) {
            console.error(e);
        }
    }		
})