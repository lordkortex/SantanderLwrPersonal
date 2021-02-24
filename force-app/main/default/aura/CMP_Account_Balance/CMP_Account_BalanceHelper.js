({
        getCmpId : function(component, event) {
        var country = component.get("v.country");
        var currency = component.get("v.currency");
        var accountId = component.get("v.accountItem.accountId");
        country = country.replace(/\s/g,""); 
        currency = currency.replace(/\s/g,"");
        accountId = accountId.replace(/\s/g,"");
        var res = "";
        res = country.concat("_");
        res = res.concat(currency);
        res = res.concat("_");
        res = res.concat(accountId);
        component.set("v.cmpId", res);
        },

        goToSwiftTracking : function (component, event, helper){

                var url ="c__accountNumber="+component.get("v.accountItem.displayNumber")+"&c__bank="+component.get("v.accountItem.bankName")+"&c__mainAmount="+component.get("v.accountItem.amountMainBalance")+"&c__availableAmount="+component.get("v.accountItem.amountAvailableBalance")+"&c__currentCurrency="+component.get("v.currency");
                helper.encrypt(component, url).then(function(results){
                        let navService = component.find("navService");

                        let pageReference = {
                                type: "comm__namedPage", 
                                attributes: {
                                        pageName: 'swifttracking'
                                },
                                state: {
                                        params : results
                                }
                        }
                        navService.navigate(pageReference); 
                });
        },

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

        }


})