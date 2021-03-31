({
    downloadAccounts : function(component, event, helper) 
    {
        var selectedOrdering = component.get("v.sortSelected");
        var accountsByCountry = component.get("v.accountCountryList");
        var accountsByCurrency = component.get("v.accountCurrencyList");
        var accountsBySubsidiary = component.get("v.accountSubsidiaryList");

        switch(selectedOrdering)
        {
            case $A.get("$Label.c.Country"):
                component.find("Service").callApex2(component, helper, "c.downloadAccountsController", {actualData : JSON.stringify(accountsByCountry) , actualGrouping : selectedOrdering, consolidationCurrency : component.get("v.consolidationCurrency"), tiposDeCambio : component.get("v.currenciesExchange")}, this.handleData);
                break;
            case $A.get("$Label.c.currency"):
                component.find("Service").callApex2(component, helper, "c.downloadAccountsController", {actualData : JSON.stringify(accountsByCurrency) , actualGrouping : selectedOrdering, consolidationCurrency : component.get("v.consolidationCurrency"), tiposDeCambio : component.get("v.currenciesExchange")}, this.handleData);
                break;
            case $A.get("$Label.c.Corporate"):
                component.find("Service").callApex2(component, helper, "c.downloadAccountsController", {actualData : JSON.stringify(accountsBySubsidiary) , actualGrouping : selectedOrdering, consolidationCurrency : component.get("v.consolidationCurrency"), tiposDeCambio : component.get("v.currenciesExchange")}, this.handleData);
                break;
        }

    },

    handleData : function(component,helper, response)
    {
        var sheetName = "Accounts by " + component.get("v.sortSelected");
        let wb = XLSX.utils.book_new();
        wb.Props = {
            Title:sheetName,
            Subject: "Test file",
            Author: "Banco Santander",
            CreatedDate: new Date()
        };
        wb.SheetNames.push(sheetName);
        var wsContent = [{}];
        
        var centeredCellB =  helper.createCell(component.get("v.consolidationCurrency"), false);
            
        centeredCellB.s.alignment = {horizontal : "center"};

        //Filling initial data
        wsContent.push({A: helper.createCell("Consolidation Currency", true),
                        B: centeredCellB,  
                        C: helper.createCell("Book Balance", true),
                        D: helper.createCell(component.get("v.globalBookBalance"), false),
                        E: helper.createCell("Available Balance", true),
                        F: helper.createCell(component.get("v.globalAvailableBalance"), false),

                    });
        wsContent.push({});
        //wsContent.push({ A:"", B:component.get("v.consolidationCurrency"), C:"Book Balance", D:component.get("v.globalBookBalance"), E:"Available Balance", F:component.get("v.globalAvailableBalance") });
        wsContent.push({A: {t:'s', v:component.get("v.exchangeRatesString") }
                });
        
        //wsContent.push({A: component.get("v.exchangeRatesString")});

        wsContent.push({A: helper.createCell("Account", true),
                        B: helper.createCell("Currency", true),  
                        C: helper.createCell("Bank", true),
                        D: helper.createCell("Bo. Date", true),
                        E: helper.createCell("Book Balance", true),
                        F: helper.createCell("Value Balance", true),
                    });

       // wsContent.push({A:"Account", B:"Currency" , C:"Bank", D:"Bo. Date" , E:"Book Balance", F:"Value Balance"});


        var mapaDat = new Map(Object.entries(response));
        var actualParent;

        for (let [key, value] of mapaDat) {
            actualParent = key;
            if(component.get("v.sortSelected") == $A.get("$Label.c.Country"))
            {
                actualParent = component.get("v.countryMap").filter(data => data.split(" - ")[0] == actualParent )[0].split(" - ")[1];
            }

            if(component.get("v.sortSelected") == $A.get("$Label.c.currency"))
            {
                centeredCellB =  helper.createCell(key, false);
                centeredCellB.s.alignment = {horizontal : "center"};
            }   
             


        	wsContent.push({A: helper.createCell(actualParent, true),
                            B: centeredCellB,  
                            C: helper.createCell("", false),
                            D: helper.createCell("", false),
                            E: helper.createCell((value.totalBalance != undefined  ? value.totalBalance.wholeNumber_Formatted : 0), false),
                            F: helper.createCell((value.availableBalance != undefined  ? value.availableBalance.wholeNumber_Formatted : 0), false),
                        });
            //wsContent.push({A: {t:'s', v: actualParent, s:{bold:true} }, B:component.get("v.consolidationCurrency"), C:"", D:"", E:(value.totalBalance != undefined  ? value.totalBalance.wholeNumber_Formatted : 0), F:(value.availableBalance != undefined  ?value.availableBalance.wholeNumber_Formatted : 0)});

            var subGrouping = new Map(Object.entries(value.childList));
            for (let [key2, value2] of subGrouping)
            {
                if(component.get("v.sortSelected") == $A.get("$Label.c.currency") && key2 != null)
                {
                    key2 = component.get("v.countryMap").filter(data => data.split(" - ")[0] == key2 )[0].split(" - ")[1];
                }
                
                wsContent.push({A: helper.createCell("   " + (key2 == 'null' ? 'N/A' : key2), false),
                                B: helper.createCell("", false),  
                                C: helper.createCell("", false),
                                D: helper.createCell("", false),
                                E: helper.createCell((value2.totalBalance != undefined  ? value2.totalBalance.wholeNumber_Formatted : 0), false),
                                F: helper.createCell((value2.availableBalance != undefined  ? value2.availableBalance.wholeNumber_Formatted : 0), false),
                            });
                //wsContent.push({A:"   " + (key2 == 'null' ? 'N/A' : key2), B:"", C:"", D:"", E:(value2.totalBalance != undefined  ? value2.totalBalance.wholeNumber_Formatted : 0), F:(value2.availableBalance != undefined  ?value2.availableBalance.wholeNumber_Formatted : 0)});
                
                for (var i = 0; i < value2.accountList.length; i++) 
                {
                    var singleAcc = value2.accountList[i];
                    var valueDateMovement = new Date(singleAcc.valueDate);
                   
                    var dd = valueDateMovement.getDate();
                    var mm = valueDateMovement.getMonth()+1; 
                    var yyyy = valueDateMovement.getFullYear() - 2000;
                    if(dd<10) 
                    {
                        dd='0'+dd;
                    } 

                    if(mm<10) 
                    {
                        mm='0'+mm;
                    } 
                    
                    var fullDate = dd + "/" + mm + "/" + yyyy;
                    //AB - 12/11/2020 - INC773
                    var cDate = component.get("v.userPreferredDateFormat");
                    if(cDate == 'MM/dd/yyyy'){
                        fullDate = mm + "/" + dd + "/" + yyyy;
                    }
                    
                    if(isNaN(valueDateMovement.getDate()))
                    {
                        fullDate = "";
                    }
                    wsContent.push({A: helper.createCell("      " + singleAcc.displayNumber.replace(/\s+$/, '')+ ' - ' + singleAcc.subsidiaryName, false),
                                    B: helper.createCell("", false),  
                                    C: helper.createCell(singleAcc.codigoBic + " - " + singleAcc.bankName, false),
                                    D: helper.createCell(fullDate, false),
                                    E: helper.createCell((singleAcc.amountMainBalance_Formatted != undefined ? singleAcc.amountMainBalance_Formatted.wholeNumber_Formatted : 0), false),
                                    F: helper.createCell((singleAcc.amountAvailableBalance_Formatted  != undefined ? singleAcc.amountAvailableBalance_Formatted.wholeNumber_Formatted : 0), false),
                                });

                    //wsContent.push({A:"      " + singleAcc.displayNumber + ' - ' + singleAcc.subsidiaryName, B:"", C: singleAcc.codigoBic + " - " + singleAcc.bankName, D: fullDate, E: (singleAcc.amountMainBalance_Formatted != undefined ? singleAcc.amountMainBalance_Formatted.wholeNumber_Formatted : 0), F: (singleAcc.amountAvailableBalance_Formatted  != undefined ? singleAcc.amountAvailableBalance_Formatted.wholeNumber_Formatted : 0)});
                }
               
            }
        }

        
       let ws = XLSX.utils.json_to_sheet(wsContent, {header:["A","B","C","D","E","F"], skipHeader:true});
       //let ws = XLSX.utils.table_to_sheet(wsContent, {header:["A","B","C","D","E","F"], skipHeader:true});

        ws["!ref"] = "A1:F" + wsContent.length;
        ws["!merges"] = [
            {s:{r:3,c:0},e:{r:3,c:5}} /* B1:B6 */
        ];
        
        //Setting all columns to auto-fit width
        if(!ws['!cols']) ws['!cols'] = [];
        ws['!cols'][0] = { auto: 1 };  
        ws['!cols'][1] = { auto: 1 };
        ws['!cols'][2] = { auto: 1 };
        ws['!cols'][3] = { auto: 1 };
        ws['!cols'][4] = { auto: 1 };
        ws['!cols'][5] = { auto: 1 };
        
        ws["!gridlines"] = false; // disable gridlines
        
        wb.Sheets[sheetName] = ws;
        
         
        let bDate = new Date(Date.now());
    	let fileName = "genExcelBalances_" + bDate.getFullYear() + "" +  (bDate.getMonth() < 10 ? "0" + (bDate.getMonth()+1) : (bDate.getMonth())+1) + "" +  (bDate.getDate() < 10 ? "0" + bDate.getDate() :bDate.getDate())  + "_" + bDate.getHours() +bDate.getMinutes() + bDate.getSeconds() + ".xlsx";
        XLSX.writeFile(wb, fileName, {cellStyles: true});

    },

    groupBy : function(list, keyGetter) {
        const map = new Map();
        list.forEach((item) => {
             const key = keyGetter(item);
             const collection = map.get(key);
             if (!collection) {
                 map.set(key, [item]);
             } else {
                 collection.push(item);
             }
        });
        return map;
    },
    
    
    createCell : function (cellText, isBold)
	{
        //Creating the object
        var objReturn = {s : {}};

        //Filling borders
        objReturn.s.top = { style: "thin" }; //Top border thin
        objReturn.s.bottom = { style: "thin" }; //Bottom border thin
        objReturn.s.left = { style: "thin" }; // Left border thin
        objReturn.s.right = { style: "thin" }; // Right border thin

        //Putting the type of cell to text
        objReturn.t = 's';
        
        //filling cell text
        objReturn.v = cellText;

        //filling bold cell
        objReturn.s.bold = isBold;

        return objReturn;
	}
})