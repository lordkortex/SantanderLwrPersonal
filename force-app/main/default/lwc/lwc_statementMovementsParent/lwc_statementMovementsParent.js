import { LightningElement, track } from 'lwc';

//Labels
import Loading from '@salesforce/label/c.Loading';
import History_of_statements from '@salesforce/label/c.History_of_statements';
import Statement from '@salesforce/label/c.Statement';

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
//Apex Class
import decryptData from '@salesforce/apex/Global_Utilities.decryptData';
import searchMovements from '@salesforce/apex/CNT_StatementHistoryController.searchMovements';

export default class Lwc_statementMovementsParent extends LightningElement {

    label = {
        Loading,
        History_of_statements,
        Statement
    }

    //Global information
    @track userInfo = {};                               //description="Contains the user info"

    //Account and header attributes
    @track accountinfo ={};                             //description="Contains the data of the account"
    @track closeringBalance_Formatted = '0.0';          //description="Contains the closing balance"
    @track closeringBalanceDecimals_Formatted = '0.0';  //description="Contains the closing balance decimals"
    @track openingBalance_Formatted = '0.0';            //description="Contains the opening balance"
    @track openingBalanceDecimals_Formatted = '0.0';    //description="Contains the opening balance decimals"
    @track extractDate = '';                            //description="Contains the date of the extract"

    //Information bar attributes
    @track totalDebits;                                //description="Contains the number of total debits"
    @track totalCredits;                               //description="Contains the number of total debits"
    
    @track balanceDebits;                              //description="Contains the balance of the debits" 
    @track balanceCredits;                             //description="Contains the balance of the credits"

    //Table data
    @track movementslist;                              //description="Contains the list of movements"
    @track totalmovements;                             //description="Contains the total movements"
    
    //SPINNER ATTRIBUTE
    @track loading;                                  //description="Indicates when the URL params have been parsed, to load the rest of components"
    doInitDone = false;
    comesfromtracker = false;

    get getTitleSpiner(){
        return (this.label.Loading + '...')
    }
    
    connectedCallback(){
        //if (!this.doInitDone){
            this.loading = true;
            loadStyle(this, santanderStyle + '/style.css');
            console.log('Inicio StatementMovementsParent');
            console.log('Loading '+Loading );
            console.log('History_of_statements '+History_of_statements );
            console.log('Statement '+Statement );
            this.doInit();
    }

    doInit () {
        this.handleDoInit();
    }

    
    handleDoInit () {
        var data;
        this.loading = true;
        console.log('xx-->'+window.location.search.substring(1));
        var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
        console.log('sPageURLMain-->'+sPageURLMain);
        if(sPageURLMain != "")
        {
		    var sURLVariablesMain = sPageURLMain.split('&')[0].split("="); 
            console.log('++++'+sPageURLMain);
            this.decrypt(sURLVariablesMain[1]);
        }
    }

    handleSuccessCallback (event){
        if(event.detail.callercomponent == "apexDataDecryption"){
            this.handleParams(event.detail.value);
        }
        else if(event.detail.callercomponent == "searchMovements"){
            this.setMovementList(event.detail.value);
        }
    }
    
    handleParams(response) {
        if(response != "") {
            var sParameterName;
            var accountinfo = {};
            var userInfo = {};
            for(var i = 0; i < response.length ; i++) {
                sParameterName = response[i].split("="); 
                    
                switch(sParameterName[0]) {
                        
                    case("c__acountCode"):
                        sParameterName[1] === undefined ? 'Not found' : accountinfo.accountCode = sParameterName[1];
                        break;
                    case("c__acountName"):
                        sParameterName[1] === undefined ? 'Not found' :accountinfo.accountName = sParameterName[1];
                        break;
                    case("c__bankName"):
                        sParameterName[1] === undefined ? accountinfo.bankName = "" : accountinfo.bankName = sParameterName[1];
                        break;
                    case("c__subsidiaryName"):
                        console.log(sParameterName[1]);
                        sParameterName[1] === undefined ? accountinfo.subsidiaryName = "" : accountinfo.subsidiaryName = sParameterName[1];                    
                        break;
                    case("c__accountNumber"):
                        sParameterName[1] === undefined ? 'Not found' : accountinfo.accountNumber= sParameterName[1];
                        break;
                    case("c__accountCurrency"):
                        sParameterName[1] === undefined ? 'Not found' : accountinfo.accountCurrency = sParameterName[1];
                        break;
                    case("c__valueDate"):
                        sParameterName[1] === undefined ? 'Not found' : this.extractDate = sParameterName[1];
                        break;
                    case("c__userNumberFormat"):
                        sParameterName[1] === undefined ? 'Not found' :userInfo.userNumberFormat = sParameterName[1];
                        break;
                    case("c__userDateFormat"):
                        sParameterName[1] === undefined ? 'Not found' :userInfo.userDateFormat = sParameterName[1];
                        break;
                    case("c__bookBalance"):
                        sParameterName[1] === undefined ? 'Not found' : this.closeringBalance_Formatted = sParameterName[1];
                        break;
                    case("c__valueBalance"):
                        sParameterName[1] === undefined ? 'Not found' : this.openingBalance_Formatted = sParameterName[1];
                        break;
                }
                    
            }
                
            this.accountinfo = accountinfo;
            this.userInfo = userInfo;
            this.movements();
        }
    }
    
    setMovementList (response)
    {
        console.log(response);
        console.log(this.totalmovements + "aa");
        this.totalmovements = response.balances.transactions.totalRegistros;
        this.balancedebits = response.balances.transactions.totalDebits_Formatted;
        this.balanceCredits = response.balances.transactions.totalCredits_Formatted;
        this.totalDebits = response.balances.transactions.numberDebits;
        this.totalCredits = response.balances.transactions.numberCredits;
        this.movementslist = response.balances.transactions.listaObtTransacciones[0];    

        this.loading = false;
    }

    decrypt (data){
        
        decryptData({str : data})
			.then(value => {
				//result = value;
                if (value){
                    var paramsUrl = value.split('&');
                    this.handleParams(paramsUrl);
                }
			})
			.catch((error) => {
				console.log(error); // TestError
			});
		//return result;
    }

    movements (){
        var accountCode = this.accountinfo.accountCode;
        var extracDate = this.extractDate;
        searchMovements({accountCode : accountCode, 
                        dateToSearch : extracDate})
            .then(result => {
			    console.log('OK');
			    console.log(result);
                this.setMovementList(result);
			})
            .catch(error => {
			console.log('KO '+ JSON.stringify(error));
            });
	}
}