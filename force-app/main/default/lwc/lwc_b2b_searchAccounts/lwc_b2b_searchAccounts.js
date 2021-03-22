import { LightningElement, track, api } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
// Import styles
import santanderStyle from '@salesforce/resourceUrl/Santander_Icons';

import B2B_Payment_Header from '@salesforce/label/c.B2B_Payment_Header';


export default class Lwc_b2b_search_accounts extends LightningElement {


    Label ={
        B2B_Payment_Header
    }

    @api steps;
    @api accountlist;
    @api headerlabel = this.Label.B2B_Payment_Header;
    @api userdata;
    @api isforexpenses;

    @track showmodal;
    @track accountsFiltered;
    @track resetSearch;
    @track filters = [];

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        
    }

    get showModalEQTrue(){
        return this.showmodal == true;
    }

    @api
    openModal() {
        let accountList = this.accountlist;
        this.accountsFiltered = accountList;
        this.showModal();
    }

    handleBack () {
        this.hideModal();
    }

    handleCancel () {
        alert('Cancelar.');
    }

    handleSelectedCard (event) {
        let account = event.detail.account;
        let isForExpenses = this.isforexpenses;
        if (account) {
            this.hideModal();
            const selectedAccountEvent = new CustomEvent('selectedaccount',
                { detail:{ account: account, isForExpenses: isForExpenses}}
            );
            this.dispatchEvent(selectedAccountEvent);
        }
    }

    showModal () {
        this.showmodal = true;
    }

    hideModal () {
        this.showmodal = false;
    }

    handleSelectedAccount(event){
        const selectedaccountevent = new CustomEvent('selectedaccount', {detail : event.detail});
        this.dispatchEvent(selectedaccountevent);
    }

    handleAccountsFiltered(event){
        if(event.detail){
            this.accountsFiltered = event.detail.accountsFiltered;
        }
    }
}