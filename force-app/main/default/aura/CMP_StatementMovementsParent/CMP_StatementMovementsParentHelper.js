({
	/*
	Author:         Joaquin Vera
    Company:        Deloitte
	Description:    Method to handle the do init
    History
    <Date>			<Author>			<Description>
	13/04/2020		Joaquin Vera   	Initial version
	*/
    handleDoInit : function(component,event,helper) {
        component.set("v.loading", true);
        var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
        if(sPageURLMain != "" && sPageURLMain.includes("params"))
        {
            component.find("Service").dataDecryption(component,helper, sPageURLMain, this.handleParams);

        }
        else
        {
            console.log('pasa');
            var bodyParams = helper.getBodyParamsDummy(component,helper, null, 1);

            //Call apex to retrieve the movements from apex
            component.find("Service").callApex2(
                component, 
                helper, 
                "c.getPaginatedMovements",
                {
                    bodyParams : JSON.stringify(bodyParams)
                },
                helper.setMovementList
            );
        }
    },


    handleParams: function(component, helper, response) {
        if(response != "") {
            var sParameterName;
            var accountInfo = {};
            var userInfo = {};
            for(var i = 0; i < response.length ; i++) {
                sParameterName = response[i].split("="); 
                
                switch(sParameterName[0]) {
                    
                    case("c__acountCode"):
                        sParameterName[1] === undefined ? 'Not found' : accountInfo.accountCode = sParameterName[1];
                        break;
                    case("c__acountName"):
                        sParameterName[1] === undefined ? 'Not found' :accountInfo.accountName = sParameterName[1];
                        break;
                    case("c__bankName"):
                        sParameterName[1] === undefined ? accountInfo.bankName = "" : accountInfo.bankName = sParameterName[1];
                        break;
                    case("c__subsidiaryName"):
                        sParameterName[1] === undefined ? accountInfo.subsidiaryName = "" : accountInfo.subsidiaryName = sParameterName[1];                    
                        break;
                    case("c__accountNumber"):
                        sParameterName[1] === undefined ? 'Not found' : accountInfo.accountNumber= sParameterName[1];
                        break;
                    case("c__accountCountry"):
                        sParameterName[1] === undefined ? 'Not found' : accountInfo.accountCountry = sParameterName[1];
                        break;
                    case("c__accountCurrency"):
                        sParameterName[1] === undefined ? 'Not found' : accountInfo.accountCurrency = sParameterName[1];
                        break;
                    case("c__valueDate"):
                        sParameterName[1] === undefined ? 'Not found' : component.set("v.extractDate", sParameterName[1]);
                        break;
                    case("c__userNumberFormat"):
                        sParameterName[1] === undefined ? 'Not found' :userInfo.userNumberFormat = sParameterName[1];
                        break;
                    case("c__userDateFormat"):
                        sParameterName[1] === undefined ? 'Not found' :userInfo.userDateFormat = sParameterName[1];
                        break;
                    case("c__bookBalance"):
                        sParameterName[1] === undefined ? 'Not found' : component.set("v.closeringBalance_Formatted", sParameterName[1]);
                        break;
                    case("c__valueBalance"):
                        sParameterName[1] === undefined ? 'Not found' : component.set("v.openingBalance_Formatted", sParameterName[1]);
                        break;
                }
                
            }
            
            component.set("v.accountInfo", accountInfo);
            component.set("v.userInfo", userInfo);

            //Get the body params
            var bodyParams = helper.setBodyParams(component, helper,component.get("v.accountInfo"), 1);
            
            //Call apex to retrieve the movements from apex
            component.find("Service").callApex2(
                                            component, 
                                            helper, 
                                            "c.getPaginatedMovements",
                                            {
                                                bodyParams : JSON.stringify(bodyParams)
                                            },
                                            helper.setMovementList
            );

            //component.find("Service").callApex2(component, helper, "c.searchMovements", {accountCode:component.get("v.accountInfo").accountCode, dateToSearch : component.get("v.extractDate")}, helper.setMovementList);

        }
    },

    setMovementList : function (component, helper, response)
    {
        component.set("v.totalMovements", response.balances.transactions.totalRegistros);
        var actualMovementList = component.get("v.movementsList");

        //if the movements list is undefined, instances it, if not, stays as it is
        movementsList = movementsList == undefined ? [] : movementsList;

        //Adding the response movements to the component movement list
        movementsList.push(response.balances.transactions.listaObtTransacciones[0]);
        
        //Setting data
        component.set("v.movementsList", movementsList);    
        component.set("v.loading", false);
    },

    setBodyParams : function ( component, helper, accountInfo, newPage)
    {
        const DEFAULT_SORTING = "+date";
        const MOVEMENTS_PER_PAGINATION = "50";

        let bodyRequest = {
            search_data : {
                account_list : [{
                    country: accountInfo.accountCountry,
                account: {
                    idType : "",
                    accountId: accountInfo.accountNumber.replace(/\s/g, '')
                }
            }],
            fromProcessedDate: component.get("v.extractDate") + "T00:00:00.000Z",
            toProcessedDate: component.get("v.extractDate") + "T23:59:59.000Z",
            latestMovementsFlag: true,
            allTransactionsFlag: true,
            _sort: DEFAULT_SORTING,
            _offset: (newPage -1),
            _limit: MOVEMENTS_PER_PAGINATION

            }
        };

        return bodyRequest;
    },

    getBodyParamsDummy: function ( component, helper, accountInfo, newPage)
    {
        
           return {
            "search_data": {
                "_limit": 50,
                "_offset": (newPage -1),
                "_sort": "-date",
                "accountList": [
                    {
                        "account": {
                            "accountId": "10006129796",
                            "idType": ""
                        },
                        "bankId": "BSCHKYK0",
                        "country": "KY",
                        "currency": "USD"
                    }
                ],  
                "latestMovementsFlag": false,
                "allTransactionsFlag": true
            }
        };
        
    },

    handlePageChanged : function ( component,event,helper)
    {
        if(event.getParam("currentPage") > component.get("v.highestPage"))
        {
            component.set("v.highestPage", event.getParam("currentPage"));

            var bodyParams = helper.setBodyParams(component, helper,component.get("v.accountInfo"), event.getParam("currentPage"));
            component.find("Service").callApex2(
                component, 
                helper, 
                "c.getPaginatedMovements",
                {
                    bodyParams : JSON.stringify(bodyParams)
                },
                helper.setMovementList
            );
        }
    },
})