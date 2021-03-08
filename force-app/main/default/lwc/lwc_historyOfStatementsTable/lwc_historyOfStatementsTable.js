import { LightningElement, track, api } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';


import Extracts from '@salesforce/label/c.Extracts';
import bookDate from '@salesforce/label/c.bookDate';
import valueDate from '@salesforce/label/c.valueDate';
import Available_Balance from '@salesforce/label/c.Available_Balance';
import Book_Balance from '@salesforce/label/c.Book_Balance';
import actions from '@salesforce/label/c.actions';
import viewStatement from '@salesforce/label/c.viewStatement';


export default class Lwc_historyOfStatementsTable extends LightningElement {


    Label = {
        Extracts,
        bookDate,
        valueDate,
        Available_Balance,
        Book_Balance,
        actions,
        viewStatement
    }

    
    @api selectedaccountobject;
    @api userdateformat;
    @api usernumberformat;
    @api accountcurrency;
    @api statementslist;

    @track divisaPrincipal;
    @track transactionsPerPage = 50;
    @track currentPage = 1;
    @track oldPage = 1;
    @track start = 0;
    @track end;
    @track paginatedTransactions;
    @track _statementslist;
    @track toDisplay;
    @track isFirstTime = true;

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        this.buildPagination();
        this.isFirstTime = false;
    }

    get statementslist(){
        return this._statementslist;
    }

    set statementslist(statementslist){
        if(statementslist){
            this._statementslist = statementslist;
            if(!this.isFirstTime){
                this.buildPagination();
            }
        }
    }

    get statementsresultsNotNull(){
        return this._statementslist == null || this._statementslist === '' || !(this._statementslist.length > 0);
    }

    get statementsListEmpty(){
        return JSON.stringify(this._statementslist) == JSON.stringify({}) || this.statementslist == undefined || !(this._statementslist.length > 0);
    }
    
    /*get iterationStatementsList(){
        if(this.statementslist){
            var items = new Array();
            var aux = this.statementslist.slice(this.start,this.end + 1);
            for(var i=0; i<aux.length; i++){
                var item = new Object();
                item.value = aux[i];
                item.showfirstpoints = false;
                item.showlastpoints = false;
                if (i == this.start){
                    item.show = true;
                } else if (i == this.end - 1){
                    item.show = true;
                } else if (i == this.start + 1 && this.currentPage == this.start + 2){
                    item.show = true;
                }else if (i >= this.end - 3 && this.currentPage >= this.end - 3){
                    if (i == this.end - 3 && this.currentPage > this.end - 3){
                        item.showfirstpoints = true;
                        item.showlastpoints = false;
                    }
                    item.show = true;
                } else if (i >= this.currentPage - 1 && i <= this.currentPage + 1){
                    item.show = true;
                    if (i == this.currentPage - 1  && this.currentPage <= this.end - 3){
                        item.showfirstpoints = true;
                    } else if (i == this.currentPage + 1){
                        item.showlastpoints = true;
                    }
                }
                if (i === this.currentPage-1){
                    item.iscurrerntpage = true;
                } else {
                    item.iscurrerntpage = false;
                }
                items.push(item);
            }    
            return items;
        }
    }*/


    get statementsListFromStartToEnd(){
        var listaAux = JSON.parse(JSON.stringify(this._statementslist)).slice(this.start, this.end);
        Object.keys(listaAux).forEach(key => {
            listaAux[key].index = key;
            listaAux[key].valueBalance_Formatted = listaAux[key].saldo.valueBalance_Formatted  + ' ' + this.accountcurrency;
            listaAux[key].bookBalance_Formatted = listaAux[key].saldo.bookBalance_Formatted + ' ' +  this.accountcurrency;
        })
        return listaAux;
    }


    buildTablePage(event){
        try {
            var json = this._statementslist;
            var currentPage = event.detail.currentPage;
            var oldPage = this.oldPage;
            var perPage = this.transactionsPerPage;
            var start = this.start;

            if (currentPage != null && currentPage != undefined && currentPage != '' && oldPage!=currentPage){
                //Update the index of dataset to display
                if(currentPage >oldPage && currentPage!=1){
                    this.start = perPage*currentPage-perPage;
                    if(Math.ceil(json.length/currentPage) >= perPage){
                        this.end = perPage*currentPage;
                    }else{
                        this.end = json.length;
                    }
                }else{
                    this.end = start;
                    if(currentPage==1){ 
                        this.start = 0;
                        this.end = perPage;

                    }else{
                        this.start = start-perPage;
                    }
                }
                this.oldPage = currentPage;

                //Update a set of the paginated data
                var paginatedValues=[];
                for(var i= this.start;i<=this.end;i++){
                    paginatedValues.push(json[i]);
                }

                this.paginatedTransactions = paginatedValues;
            }
        } catch(e) {
            console.error(e);
        }
    }

    navigateToMovements(event) {

        var selectedExtract = this._statementslist[event.currentTarget.dataset.id].saldo;
        var account = this.selectedaccountobject[0];

        //Acount params
        var url = "c__acountCode=" + account.codigoCuenta 
        + "&c__acountName=" + account.alias
        + "&c__bankName=" + account.bankName
        + "&c__accountCountry=" + account.country
        + "&c__subsidiaryName=" + account.subsidiaryName
        + "&c__accountNumber=" + account.displayNumber
        + "&c__accountCurrency=" + account.currencyCodeAvailableBalance
        + "&c__bookBalance=" + selectedExtract.bookBalance_Formatted
        + "&c__valueBalance=" + selectedExtract.valueBalance_Formatted;

        //Extract params
        url += "&c__valueDate=" + selectedExtract.valueDate;

        //User params
        url += "&c__userNumberFormat=" + this.usernumberformat
        + "&c__userDateFormat=" + this.userdateformat;

        var data = {page : "statement-movement",
                    urlParams : url};
        //this.template.querySelector('c-lwc_service-component').redirect("statement-movement", url);
        this.template.querySelector('c-lwc_service-component').redirect(data);

    }

    buildPagination(){
		// Build pagination
		var end;
		var response = this._statementslist;
		
		if(response.length < this.transactionsPerPage){
			end = response.length;
		}else{
			end = this.transactionsPerPage;
		}

		this.end = end;

		var paginatedValues=[];

		for(var i = this.start; i <= this.end; i++){
			paginatedValues.push(response[i]);
		}

		this.paginatedTransactions = paginatedValues;

		var toDisplay=[];
		var finish = response.length;

		if(response.length>1000){
			//Max logs to retrieve
			finish=1000;
		}

		for(var i = 0; i < finish; i++){
			toDisplay.push(response[i]);
		}
        //this.toDisplay = toDisplay;
        this.toDisplay = toDisplay.length;
		//this.template.querySelector('c-lwc_cn_pagination').setPagesNumber(toDisplay); 		
	}
}