import {LightningElement, api} from 'lwc';

//Style
import {loadStyle} from 'lightning/platformResourceLoader';
import style from '@salesforce/resourceUrl/Santander_Icons';

export default class CmpPaySixaccountsItem extends LightningElement {
    @api accountSelected;
    @api accountItem;
    @api accountData;
    @api beneficiaryDetails;
    @api userData;

    renderedCallback() {
        loadStyle(this, style + '/style.css')
        .then(() => {
            console.log('¡Style loaded!');
        }).catch(error => {
            console.log('Error ' + error.body.message);
        });
    }

    get isAccountSelected () {
        let isAccountSelected = false;
        if (this.accountSelected.displayNumber) {
            if (this.accountSelected.displayNumber == this.accountItem.displayNumber) {
                isAccountSelected = true;
            }
        }
        return isAccountSelected;
    }
}