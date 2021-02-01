({
    handleDoInit : function(component,event,helper) {
        component.set("v.loading", true);
        var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
        if(sPageURLMain != "")
        {
            component.find("Service").dataDecryption(component,helper, sPageURLMain, this.handleParams);

        }
    },


    handleParams: function(component, helper, response) {
        console.log(response);
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
                    console.log(sParameterName[1]);
                        sParameterName[1] === undefined ? accountInfo.subsidiaryName = "" : accountInfo.subsidiaryName = sParameterName[1];                    
                        break;
                    case("c__accountNumber"):
                        sParameterName[1] === undefined ? 'Not found' : accountInfo.accountNumber= sParameterName[1];
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
            
            component.find("Service").callApex2(component, helper, "c.searchMovements", {accountCode:component.get("v.accountInfo").accountCode, dateToSearch : component.get("v.extractDate")}, helper.setMovementList);

        }
    },

    setMovementList : function (component, helper, response)
    {
        console.log('respuesta:');
        console.log(response);
        component.set("v.totalMovements", response.balances.transactions.totalRegistros);
        console.log(component.get("v.totalMovements") + "aa");
        component.set("v.balanceDebits", response.balances.transactions.totalDebits_Formatted);
        component.set("v.balanceCredits", response.balances.transactions.totalCredits_Formatted);
        component.set("v.totalDebits", response.balances.transactions.numberDebits);
        component.set("v.totalCredits", response.balances.transactions.numberCredits);
        component.set("v.movementsList", response.balances.transactions.listaObtTransacciones[0]);    
        

        // component.set("v.closeringBalance_Formatted", response.balances.transactions.closeringBalance_Formatted);
        // component.set("v.closeringBalanceDecimals_Formatted", response.balances.transactions.closeringBalanceDecimals_Formatted);
        // component.set("v.openingBalance_Formatted", response.balances.transactions.openingBalance_Formatted);
        // component.set("v.openingBalanceDecimals_Formatted", response.balances.transactions.openingBalanceDecimals_Formatted);

        component.set("v.loading", false);
    }

})