import { LightningElement, track, api } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import santanderStyle from '@salesforce/resourceUrl/Santander_Icons';
import GlobalBalanceByCurr from '@salesforce/label/c.GlobalBalanceByCurr';

export default class Lwc_globalBalanceByCurrencyTable extends LightningElement {
    @api currenciesexchange;
    @api selectedcurrency;
    @api lastupdateselected;
    @api cardgrouping;
    @api userpreferrednumberformat;
    // Changed from 6 to 12 because pagination is not working
    @track rowsPerPage = 12;
    @track pages;
    start;
    end;

    _currenciesexchange
    
    label = {
        GlobalBalanceByCurr
    };

    get currenciesexchange(){
        return this._currenciesexchange;
    }

    set currenciesexchange(currenciesexchange){
        if(currenciesexchange){
            this._currenciesexchange = currenciesexchange;
            this.updateCarousel();
        }
    }

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }
    
    changePage(event){
        var element = event.currentTarget.id;
        if(element.includes('carousel'))
        {
            var element = event.currentTarget.id.replace('carousel', '');
            this.start = (parseInt(element) -1 ) * this.rowsPerPage;
            this.end = (start + this.rowsPerPage) - 1; 
        }
        else if(element.includes('previous'))
        {
            var start = this.start;
            if(start != 0)
            {
                this.start = start - this.rowsPerPage;
                this.end = this.end - this.rowsPerPage;
            }
        }
        else
        {
            var start = this.start;
            if(start != (this.pages-1) * this.rowsPerPage)
            {
                this.start = start + this.rowsPerPage;
                this.end =  this.end + this.rowsPerPage;
            }
        }
    }

    @api
    updateCarousel(){
        var listExchange = this._currenciesexchange;
        if(listExchange != null)
        {
            var rowsPerPage = this.rowsPerPage;
            var data = this._currenciesexchange;
            if(data.length < rowsPerPage)
            {
                this.pages = [1];
                this.start = 0;
                this.end = data.length;
            }
            else
            {
                var totalPages = data.length / rowsPerPage;
                var pages = [];
                for (var i = 1; i <= totalPages; i++) {
                    pages.push(i);
                }
                this.pages = pages;
                this.start = 0;
                this.end = rowsPerPage - 1;
            }
        }
    }
}