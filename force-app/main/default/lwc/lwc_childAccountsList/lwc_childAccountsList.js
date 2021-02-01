import { LightningElement, api } from 'lwc';

export default class Lwc_childAccountsList extends LightningElement {

    @api iregister;
    @api ikey;
    @api icurrency;
    @api isortselected;
    @api itabselected;
    @api index;
    @api tabschange;
    @api firstaccountcountrylist;
    @api islastupdate;
    @api filters;
    @api source;
    @api icurrencylist;
    @api userpreferreddateformat;
    @api userpreferrednumberformat;
    @api isloading;
    @api isonetrade;


    connectedCallback(){
        console.log('ENTRA EN lwc_childAccountsList');
    }

    get itemValueLengthGTzero(){
        return (this.iregister.value.length > 0);
    }

    @api
    handleExpand(){
        this.template.querySelector("c-lwc_accounts-card").handleExpand();
    }

    @api
    handleCollapse(){
        this.template.querySelector("c-lwc_accounts-card").handleCollapse();
    }

    @api
    setShowCards(show){
        this.template.querySelector('c-lwc_accounts-card').setShowCards(show);
    }
}