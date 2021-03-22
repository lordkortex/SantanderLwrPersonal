import { LightningElement,track, api} from 'lwc';


import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { loadStyle } from 'lightning/platformResourceLoader';

import Displaying from '@salesforce/label/c.Displaying';
import PAY_payments from '@salesforce/label/c.PAY_payments';
import PAY_accordingTo from '@salesforce/label/c.PAY_accordingTo';
import PAY_selectedFilters from '@salesforce/label/c.PAY_selectedFilters';
import PAY_last from '@salesforce/label/c.PAY_last';
import Show_More from '@salesforce/label/c.Show_More';
import ClientReference from '@salesforce/label/c.ClientReference';
import status from '@salesforce/label/c.status';
import B2B_Source_account from '@salesforce/label/c.B2B_Source_account';
import beneficiaryAccount from '@salesforce/label/c.beneficiaryAccount';
import amount from '@salesforce/label/c.amount';
import currency from '@salesforce/label/c.currency';
import valueDate from '@salesforce/label/c.valueDate';
import Search_NoPaymentsFound from '@salesforce/label/c.Search_NoPaymentsFound';
import PAY_noResultsWithSearchTerm from '@salesforce/label/c.PAY_noResultsWithSearchTerm';
import PAY_noResultsWithFilters from '@salesforce/label/c.PAY_noResultsWithFilters';
import PAY_didNotFindPayments from '@salesforce/label/c.PAY_didNotFindPayments';
import PAY_checkConnectionRefresh from '@salesforce/label/c.PAY_checkConnectionRefresh';
import B2B_Items_displayed from '@salesforce/label/c.B2B_Items_displayed';
import toMinus from '@salesforce/label/c.toMinus';
import of from '@salesforce/label/c.of';
import B2B_Items from '@salesforce/label/c.B2B_Items';
import B2B_PREV from '@salesforce/label/c.B2B_PREV';
import B2B_NEXT from '@salesforce/label/c.B2B_NEXT';
import ERROR_NOT_RETRIEVED from '@salesforce/label/c.ERROR_NOT_RETRIEVED';


export default class Lwc_fx_blottertable extends LightningElement {

    label = {
        Displaying,
        PAY_payments,
        PAY_accordingTo,
        PAY_selectedFilters,
        PAY_last,
        Show_More,
        ClientReference,
        status,
        B2B_Source_account,
        beneficiaryAccount,
        amount,
        currency,
        valueDate,
        Search_NoPaymentsFound,
        PAY_noResultsWithSearchTerm,
        PAY_noResultsWithFilters,
        PAY_didNotFindPayments,
        PAY_checkConnectionRefresh,
        B2B_Items_displayed,
        toMinus,
        of,
        B2B_Items,
        B2B_PREV,
        B2B_NEXT,
        ERROR_NOT_RETRIEVED
    }; 

    @track resultInfo;
    @track recordRetrieved;
    @api tradeslist;
    tardaesFakes;
    error;

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        //this.getTradesHandler();
    }



}