import { LightningElement, track, api } from 'lwc';

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import {loadStyle, loadScript} from 'lightning/platformResourceLoader';

import ORDER_INFORMATION from '@salesforce/label/c.orderInformation';
import UNDEFINED from '@salesforce/label/c.undefined';
import ACCOUNT from '@salesforce/label/c.Account';
import BANK from '@salesforce/label/c.Bank';
import BIC from '@salesforce/label/c.bic';
import BENEFICIARY_INFORMATION from '@salesforce/label/c.beneficiaryInformation';
import NAME from '@salesforce/label/c.name';

export default class Lwc_ipt_detailMoreInfo extends LightningElement {
    @api iobject;
    label = {
        BENEFICIARY_INFORMATION,
        ORDER_INFORMATION,
        UNDEFINED,
        ACCOUNT,
        BANK,
        NAME,
        BIC
    };

    get isBlankOriginAccountName() {
        return (!this.iobject || !this.iobject.originAccountName);
    }
    get isBlankOriginAccountNumber() {
        //return (!this.iobject || isNaN(this.iobject.originAccountNumber));
        return (!this.iobject || (!this.iobject.originAccountNumber && isNaN(this.iobject.originAccountNumber)));
    }
    get isBlanckOriginAccountBank() {
        return (!this.iobject || isNaN(this.iobject.originAccountBank));
    }
    get isBlankOriginAccountBic() {
        return (!this.iobject || !this.iobject.originAccountBic);
    }
    get isBlankBeneficiaryAccountName() {
        return  (!this.iobject || !this.iobject.beneficiaryAccountName);
    }
    get isBlankBeneficiaryAccountNumber() {
        //return (!this.iobject || isNaN(this.iobject.beneficiaryAccountNumber));
        return (!this.iobject || (!this.iobject.beneficiaryAccountNumber && isNaN(this.iobject.beneficiaryAccountNumber)));
    }
    get isBlankBeneficiaryAccountBank() {
        return (!this.iobject || !this.iobject.beneficiaryAccountBank);
    }
    get isBlankbeneficiaryAccountBic() {
        return (!this.iobject || isNaN(this.iobject.beneficiaryAccountBic));
    }

    get originAccountName() {
        return (this.iobject ? this.iobject.originAccountName : '')
    }
    get originAccountNumber() {
        return (this.iobject ? this.iobject.originAccountNumber : '')
    }
    get originAccountBank() {
        return (this.iobject ? this.iobject.originAccountBank : '')
    }
    get originAccountBic() {
        return (this.iobject ? this.iobject.originAccountBic : '')
    }
    get beneficiaryAccountName() {
        return (this.iobject ? this.iobject.beneficiaryAccountName : '')
    }
    get beneficiaryAccountNumber() {
        return (this.iobject ? this.iobject.beneficiaryAccountNumber : '')
    }
    get beneficiaryAccountBank() {
        return (this.iobject ? this.iobject.beneficiaryAccountBank : '')
    }
    get beneficiaryAccountBic() {
        return (this.iobject ? this.iobject.beneficiaryAccountBic : '')
    }
    renderedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }
}