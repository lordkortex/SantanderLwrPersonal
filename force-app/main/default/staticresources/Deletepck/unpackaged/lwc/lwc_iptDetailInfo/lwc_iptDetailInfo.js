import { LightningElement, track, api } from 'lwc';
import { loadStyle } from'lightning/platformResourceLoader';

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

import MOVEMENT_HISTORY_VALUEDATE from '@salesforce/label/c.MovementHistory_ValueDate';
import TOTAL_ELAPSED_TIME from '@salesforce/label/c.totalElapsedTime';
import CHARGES from '@salesforce/label/c.charges';
import UERT from '@salesforce/label/c.uert';
import LESS_DETAIL from '@salesforce/label/c.LessDetail';
import MORE_DETAIL from '@salesforce/label/c.MoreDetail';

export default class Lwc_ipt_detailInfo extends LightningElement {
    
    @api iobject;
    @api totalelapsedtime;
    @api uetrsearchresult;
    @api comesfromtracker;

    @track isExpanded = false;
    @track valueDate;

    label = {
        MOVEMENT_HISTORY_VALUEDATE,
        TOTAL_ELAPSED_TIME,
        LESS_DETAIL,
        MORE_DETAIL,
        CHARGES,
        UERT
    }
    get isBlankValueDate() {
        //return (isNan(this.valueDate));
        return typeof this.valueDate === 'number';
    }
    get isBlankTotalelapsedtime() {
        //return (isNan(this.totalelapsedtime));
        return typeof this.totalelapsedtime === 'number';
    }
    get isBlankIobjectCharges() {
        console.log(this.iobject);
        return (!this.iobject || !this.iobject.charges);
    }
    get isBlankIobjectValueDate() {
        return (!this.iobject || !this.iobject.valueDate);
    }
    get isBlankUetrsearchresult() {
        //return (isNan(this.uetrsearchresult));
        console.log('isBlankUetrSearchREsult');
        var ret = false;
        if (this.uetrsearchresult){
            ret = true
        }
        //return typeof this.uetrsearchresult === 'number';
        return ret;
    }

    get iObjectCharges() {
        return (this.iobject && this.iobject.charges ? this.iobject.charges : '');
    }
    get iObjectUetr() {
        return (this.iobject && this.iobject.uetr ? this.iobject.uetr : '');
    }

    connectedCallback() {
        //loadStyle(santanderStyle);
        loadStyle(this, santanderStyle + '/style.css');
        this.doInit();
    }

    moreInfoSection() {
        this.isExpanded = !this.isExpanded
    }

    doInit() {
        var check = this.iobject;
        var originalDate = check.valueDate;
        //Commented from original because no test needed this workaronund
        /*if(!this.comesfromtracker) {
            this.valueDate = originalDate.substring(8, 10)+"/"+originalDate.substring(5, 7)+"/"+originalDate.substring(0, 4);
        } else{
            this.valueDate = originalDate;
        }*/
        this.valueDate = originalDate;
    }
}