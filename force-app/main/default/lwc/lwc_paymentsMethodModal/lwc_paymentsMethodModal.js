import { LightningElement, api, track } from 'lwc';

//Labels
import PAY_workingOnNewService from '@salesforce/label/c.PAY_workingOnNewService';
import PAY_availableNearFuture from '@salesforce/label/c.PAY_availableNearFuture';
import close from '@salesforce/label/c.close';
import NewPayment from '@salesforce/label/c.NewPayment';
import PAY_IntInstantTransfers_Info from '@salesforce/label/c.PAY_IntInstantTransfers_Info';
import PAY_IntInstantTransfers from '@salesforce/label/c.PAY_IntInstantTransfers';
//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

export default class Lwc_paymentsMethodModal extends LightningElement {

    label = {
        PAY_workingOnNewService,
        PAY_availableNearFuture,
        close,
        NewPayment,
        PAY_IntInstantTransfers_Info,
        PAY_IntInstantTransfers
    };

    @api userdata = {};
    @track transferTypeParams = {};
    //@api showmethodmodal;// = false;        //Controls whether the Payment Methods modal is open or not
    //_showmethodmodal;
    _countrydropdownlist;
    @api countrydropdownlist;       //List of countries received ?????? Quitar tras pruebas
    @track countryDropdownListSorted = [];  //List of countries that are displayed in the dropdown"
    @track toastTitle = this.label.PAY_workingOnNewService;
    @track toastText  = this.label.PAY_availableNearFuture;
    @track toastType  = 'Information';     //Controls the style in toast component
    @api showtoast  = false;             //Indicates if the toast is shown.
    @track noReload   = true;             //Controls whether the toast has a reload button and icon.        

    @track falseValue = false;
    @track trueValue = true;

    /*
    get showmethodmodal(){
        return this._showmethodmodal;
    }

    set showmethodmodal(showmethodmodal){
        if (showmethodmodal){
            this._showmethodmodal = showmethodmodal;
        }
    }
    */

    get showtoast(){
        return this._showtoast;
    }

    set showtoast(showtoast){
        if (showtoast){
            this._showtoast = showtoast;
        }
    }

    get countrydropdownlist(){
        return this._countrydropdownlist;
    }

    set countrydropdownlist(countrydropdownlist){
        if (countrydropdownlist){
            this._countrydropdownlist = countrydropdownlist;
        }
    }
  
    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        this.noReload = true;
        //Quitar tras probar
        // this.countrydropdownlist = [
        //      {"countryName": "España"},
        //     {"countryName": "Andorra"}];
        // this._showmethodmodal = true;
        // this._showtoast = true;
        // this.toastTitle = 'Pruebas';
        // this.toastType = 'Error';
        //***** 
        this.doInit();
    }

    doInit () {
        this.setDropdownList();
    }

    closeMethodModal () {
        //this.template.querySelector(".comm-page-custom-landing-payments").style.overflow = 'auto';
        //this._showmethodmodal = false;
        const showmodalevent = new CustomEvent('closemodal');
        this.dispatchEvent(showmodalevent);  
    }

    /*
    openWebsite() {
        var urlEvent = new CustomEvent('openwebsite', {
            url: 'https://www.google.com'
        });
        this.dispatchEvent(urlEvent);
    }
    */

    setDropdownList () {
        let rCountryList = this._countrydropdownlist;
        let countryList = [];
        let countryListAux = [];

        if(rCountryList){
            for (let i = 0; i < rCountryList.length; i++){
                let country = rCountryList[i].countryName;
                if (country) {
                    if (!countryListAux.includes(country)) {
                        countryListAux.push(country);
                        
                        countryList.push({
                            'label' : rCountryList[i].parsedCountryName,
                            'value' : 'chk_' + country
                        });
                    }
                }
            }
        }
        var sortCountryList = this.sortList(countryList);
        this.countryDropdownListSorted = sortCountryList;
    }

    sortList (list) {
        var sort;
        var data = list;
        sort = data.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
        return sort;
    }

}