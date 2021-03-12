import { LightningElement, api } from 'lwc';
import { loadStyle,loadScript  } from 'lightning/platformResourceLoader';

//import SheetJS from '@salesforce/resourceUrl/SheetJS';
import SheetJSIntegra from '@salesforce/resourceUrl/SheetJSIntegra';

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

import Country from '@salesforce/label/c.Country';
import currency from '@salesforce/label/c.currency';
import Corporate from '@salesforce/label/c.Corporate';

export default class lwc_downloadAccountsLu extends LightningElement {
    label = {
        Country,
        currency,
        Corporate
    };

    @api sortselected //Accounts display order
    @api consolidationcurrency //Selected option from the dropdown
    @api accountcountrylist //Each register of this list contains two attributes --> Key: Country and Value: List of Accounts
    @api accountcurrencylist //Each register of this list contains two attributes --> Key: Currency and Value: List of Accounts
    @api accountsubsidiarylist //Each register of this list contains two attributes --> Key: Susidiary and Value: Lsit of Accounts
    @api exchangeratesstring //Contains the string of the exchange rates
    @api countrymap //contains the list of countries with their names
    @api seedcountrymap //contains the list of countries with their names
    @api currenciesexchange //contains the exchange of currencies
    @api globalbookbalance = '0.0'; //The sum of book balance value of all accounts
    @api globalavailablebalance = '0.0'; //The sum of available balance value of all accounts

    renderedCallback(){
        //loadScript(this, SheetJS + '/SheetJS.js');
        loadScript(this, SheetJSIntegra);
        //loadScript(this, SheetJS);
        loadStyle(this, santanderStyle + '/style.css');

    }

    connectedCallback(){ 
    }

    @api
    downloadAccounts() {
        var selectedOrdering = this.sortselected;
        var accountsByCountry = this.accountcountrylist;
        var accountsByCurrency = this.accountcurrencylist;
        var accountsBySubsidiary = this.accountsubsidiarylist;
        
        switch(selectedOrdering)
        {
            case (this.label.Country):
                this.template.querySelector("c-lwc_service-component").onCallApexD({
                    callercomponent: 'callService',
                    controllermethod: 'downloadAccountsController',
                    actionparameters: {
                        actualData : JSON.stringify(accountsByCountry), 
                        actualGrouping : selectedOrdering, 
                        consolidationcurrency : this.consolidationcurrency, 
                        tiposDeCambio : this.currenciesexchange
                    }
                  });
                break;
            case (this.label.currency):
                this.template.querySelector("c-lwc_service-component").onCallApexD({
                    callercomponent: 'callService',
                    controllermethod: 'downloadAccountsController',
                    actionparameters: {
                        actualData : JSON.stringify(accountsByCurrency), 
                        actualGrouping : selectedOrdering, 
                        consolidationcurrency : this.consolidationcurrency, 
                        tiposDeCambio : this.currenciesexchange
                    }
                  });
                break;
            case (this.label.Corporate):
                this.template.querySelector("c-lwc_service-component").onCallApexD({
                    callercomponent: 'callService',
                    controllermethod: 'downloadAccountsController',
                    actionparameters: {
                        actualData : JSON.stringify(accountsBySubsidiary), 
                        actualGrouping : selectedOrdering, 
                        consolidationcurrency : this.consolidationcurrency, 
                        tiposDeCambio : this.currenciesexchange
                    }
                  });
                break;
        }
    }
        
    successcallback(event) {
		console.log('on successcallback');
		if(event.detail.callercomponent === 'callService'){
            console.log(event.detail);
            this.handleData(event.detail.value);
		}
    }
    
    handleData(response){
        var sheetName = "Accounts by " + this.sortselected;
        let wb = XLSX.utils.book_new();
        wb.Props = {
            Title: sheetName,
            Subject: "Test file",
            Author: "Banco Santander",
            CreatedDate: new Date()
        };
        wb.SheetNames.push(sheetName);
        var wsContent = [{}];
        
        var centeredCellB =  this.createCell(this.consolidationcurrency, false);
        
        centeredCellB.s.alignment = {horizontal : "center"};
        
        //Filling initial data
        wsContent.push({A: this.createCell("Consolidation Currency", true),
                        B: centeredCellB,  
                        C: this.createCell("Book Balance", true),
                        D: this.createCell(this.globalbookbalance, false),
                        E: this.createCell("Available Balance", true),
                        F: this.createCell(this.globalavailablebalance, false),
                        
                        });
        wsContent.push({});
        //wsContent.push({ A:"", B:this.consolidationcurrency"), C:"Book Balance", D:this.globalbookbalance"), E:"Available Balance", F:this.globalavailablebalance") });
        wsContent.push({A: {t:'s', v:this.exchangeratesstring}
                        });
        
        //wsContent.push({A: this.exchangeratesstring")});
        
        wsContent.push({A: this.createCell("Account", true),
                        B: this.createCell("Currency", true),  
                        C: this.createCell("Bank", true),
                        D: this.createCell("Bo. Date", true),
                        E: this.createCell("Book Balance", true),
                        F: this.createCell("Value Balance", true),
                        });
        
        // wsContent.push({A:"Account", B:"Currency" , C:"Bank", D:"Bo. Date" , E:"Book Balance", F:"Value Balance"});
        
        var mapaDat = new Map(Object.entries(response));
        var actualParent;

        this.countrymap = this.seedcountrymap;

        for (let [key, value] of mapaDat) {
            if((this.sortselected == this.label.currency && Object.keys(value.childList).length > 0) || this.sortselected != this.label.currency) {
                actualParent = key;
                if(this.sortselected == this.label.Country) {
                    actualParent = this.countrymap.filter(data => data.split(" - ")[0] == actualParent )[0].split(" - ")[1];
                }
                
                if(this.sortselected == this.label.currency) {
                    centeredCellB =  this.createCell(key, false);
                    centeredCellB.s.alignment = {horizontal : "center"};
                }
                
                wsContent.push({A: this.createCell(actualParent, true),
                                B: centeredCellB,  
                                C: this.createCell("", false),
                                D: this.createCell("", false),
                                E: this.createCell((value.totalBalance != undefined  ? value.totalBalance.wholeNumber_Formatted : 0), false),
                                F: this.createCell((value.availableBalance != undefined  ? value.availableBalance.wholeNumber_Formatted : 0), false),
                                });
                
                var subGrouping = new Map(Object.entries(value.childList));
                for (let [key2, value2] of subGrouping) {
                    if(this.sortselected == this.label.currency && key2 != null) {
                        key2 = this.countrymap.filter(data => data.split(" - ")[0] == key2 )[0].split(" - ")[1];
                    }
                    
                    wsContent.push({A: this.createCell("   " + (key2 == 'null' ? 'N/A' : key2), false),
                                    B: this.createCell("", false),  
                                    C: this.createCell("", false),
                                    D: this.createCell("", false),
                                    E: this.createCell((value2.totalBalance != undefined  ? value2.totalBalance.wholeNumber_Formatted : 0), false),
                                    F: this.createCell((value2.availableBalance != undefined  ? value2.availableBalance.wholeNumber_Formatted : 0), false),
                                    });
                    
                    for (var i = 0; i < value2.accountList.length; i++) {
                        var singleAcc = value2.accountList[i];
                        var valueDateMovement = new Date(singleAcc.valueDate);
                        
                        var dd = valueDateMovement.getDate();
                        var mm = valueDateMovement.getMonth()+1; 
                        var yyyy = valueDateMovement.getFullYear() - 2000;
                        if(dd<10) {
                            dd='0'+dd;
                        } 
                        if(mm<10) {
                            mm='0'+mm;
                        } 
                        var fullDate = dd + "/" + mm + "/" + yyyy;
                        if(isNaN(valueDateMovement.getDate())){
                            fullDate = "";
                        }
                        wsContent.push({A: this.createCell("      " + singleAcc.displayNumber + ' - ' + singleAcc.subsidiaryName, false),
                                        B: this.createCell("", false),  
                                        C: this.createCell(singleAcc.codigoBic + " - " + singleAcc.bankName, false),
                                        D: this.createCell(fullDate, false),
                                        E: this.createCell((singleAcc.amountMainBalance_Formatted != undefined ? singleAcc.amountMainBalance_Formatted.wholeNumber_Formatted : 0), false),
                                        F: this.createCell((singleAcc.amountAvailableBalance_Formatted  != undefined ? singleAcc.amountAvailableBalance_Formatted.wholeNumber_Formatted : 0), false),
                                        });
                    }
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
    }
        
    groupBy(list, keyGetter) {
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
    }
        
    createCell(cellText, isBold) {
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
}