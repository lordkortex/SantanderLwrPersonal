({
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to get the URL params that is sended from the global balance component.
    History
    <Date>			<Author>			<Description>
	31/01/2020		Guillermo Giral  	Initial version
	*/
    getURLParams : function(component, event, helper) {

        try{
            var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
            var sURLVariablesMain = sPageURLMain.split('&')[0].split("="); 
            var sParameterName;
            
            var sPageURL;
           

            if (sURLVariablesMain[0] == 'params') {
                this.decrypt(component,sURLVariablesMain[1]).then(function(results){
                    sURLVariablesMain[1] === undefined ? 'Not found' : sPageURL = results;

                    var sURLVariables=sPageURL.split('&');
                    //console.log("Received data: " + sURLVariables);
        
                    for ( var i = 0; i < sURLVariables.length; i++ ) {
                        sParameterName = sURLVariables[i].split('=');      
                        if(sParameterName[0] === 'c__source') {
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.source",sParameterName[1]);
                            console.log('SOURCE');
                            console.log(component.get("v.source"));
                        }else if (sParameterName[0] === 'c__account') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.transactionDetails.account",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__valueDate') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.transactionDetails.valueDate",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__clientRef') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.transactionDetails.clientRef",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__bankRef') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.transactionDetails.bankRef",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__bookDate') {
                            if(sParameterName[1].includes('undefined')){
                               do{
                                sParameterName[1] = sParameterName[1].replace('undefined/','');
                               } while (sParameterName[1].includes('undefined'));
                               
                            }
                            var bookdate;
                            sParameterName[1] === undefined ? 'Not found' : bookdate = sParameterName[1];
                            if(bookdate.includes('/')){
                                var lenghtPositionOne = bookdate.split('/')[0];
                                if(lenghtPositionOne.length == 4){
                                    bookdate = bookdate.split('/')[2] +'/'+ bookdate.split('/')[1] +'/'+  bookdate.split('/')[0];
                                    component.set("v.transactionDetails.bookDate",bookdate);
                                }else{
                                    component.set("v.transactionDetails.bookDate",bookdate);
                                }
       
                            }else{

                                    if(bookdate.includes('-')){
                                        bookdate = bookdate.split('-');
                                        bookdate = bookdate[2] +'/'+ bookdate[1] +'/'+ bookdate[0];
                                        component.set("v.transactionDetails.bookDate",bookdate); 
                                    }else{
                                    bookdate = bookdate.substring(6,8)+'/'+bookdate.substring(4,6)+'/'+bookdate.substring(0,4);
                                    component.set("v.transactionDetails.bookDate",bookdate); 
                                }
                            }
                        
                        }else if(sParameterName[0] === 'c__category'){
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.transactionDetails.category",sParameterName[1]);                            sParameterName[1] === undefined ? 'Not found' : component.set("v.availableBalanceParam",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__amount') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.transactionDetails.amount",sParameterName[1]);
                        } else if(sParameterName[0] === 'c__description') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.transactionDetails.description",sParameterName[1]);
                        }else if(sParameterName[0] === 'c__accountBank') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.accountNumberBank",sParameterName[1]);
                        }else if(sParameterName[0] === 'c__selectedAccount') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.SelectedAccount",sParameterName[1]);
                        }else if(sParameterName[0] === 'c__subsidiaryName') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.accountName",sParameterName[1]);
                        }else if(sParameterName[0] === 'c__currencyTable') { 
                                sParameterName[1] === undefined ? 'Not found' : component.set("v.currencyTable",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__dateTo') { 
                                sParameterName[1] === undefined ? 'Not found' : component.set("v.dateTo",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__dateFrom') { 
                                sParameterName[1] === undefined ? 'Not found' : component.set("v.dateFrom",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__bookBalanceParam') { 
                                sParameterName[1] === undefined ? 'Not found' : component.set("v.bookBalanceParam",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__availableBalanceParam') { 
                                sParameterName[1] === undefined ? 'Not found' : component.set("v.availableBalanceParam",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__accountNumberTransaction') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.accountNumber",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__showPills') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.showPills",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__pills') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.pills",JSON.parse(sParameterName[1]));	           
                        }else if (sParameterName[0] === 'c__isSearching') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.isSearching",sParameterName[1]);	           
                        }
                   }
                   // console.log("TRANSACTION DETAILS: " + JSON.stringify(component.get("v.transactionDetails")));
                });
            }

 
        } catch (e) {
            console.log(e);
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