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

    get itemValueLengthGTzero(){
        return (this.iregister.value.length > 0);
    }

}