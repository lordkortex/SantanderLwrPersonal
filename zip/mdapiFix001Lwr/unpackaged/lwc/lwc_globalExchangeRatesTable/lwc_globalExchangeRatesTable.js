import { LightningElement, api, track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

// Import labels
import consolidationExchangeRates from '@salesforce/label/c.consolidationExchangeRates';
import currencyExchangeSourceBCE from '@salesforce/label/c.currencyExchangeSourceBCE';


export default class Lwc_globalExchangeRatesTable extends LightningElement {

    label = {
        consolidationExchangeRates,
        currencyExchangeSourceBCE
    }

    arrow = {
        previous: "previous",
        next: "next"
    }

    @api selectedcurrency;
    @api exchangerates;
    @api erateslastmodifieddate;
    @api userpreferrednumberformat;
    @api userpreferreddateformat;
    @api erateslastmodifieddatemain;

    @track upToDate;
    @track upToHour;
    // Changed from 6 to 12 because pagination is not working
    @track rowsPerPage = 12;
    @track start;
    @track end;
    @track pages = [];

    _exchangerates;
    _erateslastmodifieddate;

    get exchangerates() {
        return this._exchangerates;        
    }

    set exchangerates(exchangerates) {
        if(exchangerates){
            this._exchangerates = exchangerates;
            this.updateCarousel();
        }
    }

    get erateslastmodifieddate() {
        return this._erateslastmodifieddate;
    }

    set erateslastmodifieddate(erateslastmodifieddate) {
        if(erateslastmodifieddate){
            this._erateslastmodifieddate = erateslastmodifieddate;
            this.formatDate();
        }
    }

    get isUpToDateHour(){
        return (this.upToDate != '') && (this.upToHour != '');
    }

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        this.formatDate();
    }

    formatDate(){
        var lmdate = this._erateslastmodifieddate;
        var lmdateMain = this.erateslastmodifieddatemain;
        if(lmdate){
            this.upToDate = lmdateMain;
            this.upToHour = lmdate.split(' ')[1].substring(0,5);
        }
    }

    updateCarousel() {
        console.log('entra updateCarousel');
        var listExchange = this._exchangerates;
        if(listExchange != null)
        {
            var rowsPerPage = this.rowsPerPage;
            var data = this._exchangerates;
            if(data.length < rowsPerPage)
            {
                this.pages = [1];
                this.start = 0;
                this.end = 0;
            }
            else
            {
                var totalPages = data.length / rowsPerPage;
                var pages = [];
                for (var i = 0; i <= totalPages; i++) {
                    pages.push(i);
                }
                this.pages = pages;
                this.start = 0;
                this.end = rowsPerPage - 1;
            }
        }
    }

    changePage(event) {
        var element = event.currentTarget.id;

        if(element.includes('carousel')) {
            var element = event.currentTarget.id.replace('carousel', '');
            var start = (parseInt(element) -1 ) * this.rowsPerPage;
            var end = (start + this.rowsPerPage) - 1; 
            this.start = start;
            this.end = end;
        }
        else if(element.includes('previous')) {
            var start = this.start;
            if(start != 0) {
                this.start = start - this.rowsPerPage;
                this.end = this.end - this.rowsPerPage;
            }
        }
        else {
            var start = this.start;
            if(start != (this.pages[0].pageNum-1) * this.rowsPerPage) {
                this.start = start + this.rowsPerPage;
                this.end = this.end + this.rowsPerPage;
            }
        }
    }
    @api
	updateExchageRates(e){
		if(this.template.querySelector("c-lwc_global-exchange-rates-single") != null) {
            this.template.querySelector("c-lwc_global-exchange-rates-single").updateExchageRates({
                _exchangerates: e._exchangerates
            });
        }
	}
}