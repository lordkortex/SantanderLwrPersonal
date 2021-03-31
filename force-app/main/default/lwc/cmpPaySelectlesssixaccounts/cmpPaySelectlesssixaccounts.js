import {LightningElement, api} from 'lwc';

//Style
import {loadStyle} from 'lightning/platformResourceLoader';
import style from '@salesforce/resourceUrl/Santander_Icons';

import All_my_accounts from '@salesforce/label/c.All_my_accounts';

export default class CmpPaySelectlesssixaccounts extends LightningElement {

    @api accountSelected;
    @api accountList;
    @api accountData;
    @api beneficiaryDetails;
    @api isModified;
    @api userData;

    label = {
        All_my_accounts
    }

    renderedCallback() {
        loadStyle(this, style + '/style.css')
        .then(() => {
            console.log('¡Style loaded!');
        }).catch(error => {
            console.log('Error ' + error.body.message);
        });
    }

    handleSelectedAccount (event) {
        // TO-DO
    }
}