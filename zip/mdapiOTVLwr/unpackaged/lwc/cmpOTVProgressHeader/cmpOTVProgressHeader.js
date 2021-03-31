import { LightningElement }         from 'lwc';

import { loadStyle }                from 'lightning/platformResourceLoader';
import Santander_Icons              from '@salesforce/resourceUrl/Santander_Icons';
import lwc_modal_progress_header       from '@salesforce/resourceUrl/lwc_modal_progress_header';
import { NavigationMixin }          from 'lightning/navigation';
import Images                       from '@salesforce/resourceUrl/Images';
// importing Custom Label
import back                         from '@salesforce/label/c.back';
import cmpOTVTalkWithAnExpert_Error from '@salesforce/label/c.cmpOTVTalkWithAnExpert_Error';
import cmpOTVTalkWithAnExpert_Clear from '@salesforce/label/c.cmpOTVTalkWithAnExpert_Clear';
import cmpOTVTalkWithAnExpert_1     from '@salesforce/label/c.cmpOTVTalkWithAnExpert_1';
import cmpOTVTalkWithAnExpert_2     from '@salesforce/label/c.cmpOTVTalkWithAnExpert_2';
import cmpOTVTalkWithAnExpert_3     from '@salesforce/label/c.cmpOTVTalkWithAnExpert_3';
import cmpOTVTalkWithAnExpert_4     from '@salesforce/label/c.cmpOTVTalkWithAnExpert_4';
import cmpOTVTalkWithAnExpert_5     from '@salesforce/label/c.cmpOTVTalkWithAnExpert_5';
import cmpOTVTalkWithAnExpert_6     from '@salesforce/label/c.cmpOTVTalkWithAnExpert_6';
import cmpOTVTalkWithAnExpert_7     from '@salesforce/label/c.cmpOTVTalkWithAnExpert_7';
import cmpOTVTalkWithAnExpert_8     from '@salesforce/label/c.cmpOTVTalkWithAnExpert_8';
import cmpOTVTalkWithAnExpert_9     from '@salesforce/label/c.cmpOTVTalkWithAnExpert_9';
import cmpOTVTalkWithAnExpert_10    from '@salesforce/label/c.cmpOTVTalkWithAnExpert_10';
import cmpOTVTalkWithAnExpert_11    from '@salesforce/label/c.cmpOTVTalkWithAnExpert_11';
import cmpOTVTalkWithAnExpert_12    from '@salesforce/label/c.cmpOTVTalkWithAnExpert_12';
import cmpOTVTalkWithAnExpert_13    from '@salesforce/label/c.cmpOTVTalkWithAnExpert_13';
import cmpOTVTalkWithAnExpert_14    from '@salesforce/label/c.cmpOTVTalkWithAnExpert_14';
import cmpOTVTalkWithAnExpert_15    from '@salesforce/label/c.cmpOTVTalkWithAnExpert_15';
import cmpOTVTalkWithAnExpert_16    from '@salesforce/label/c.cmpOTVTalkWithAnExpert_16';
import cmpOTVTalkWithAnExpert_17    from '@salesforce/label/c.cmpOTVTalkWithAnExpert_17';
import cmpOTVTalkWithAnExpert_18    from '@salesforce/label/c.cmpOTVTalkWithAnExpert_18';

export default class CmpOTVProgressHeader extends NavigationMixin(LightningElement) {
    label = {
        back,
        cmpOTVTalkWithAnExpert_Error,
        cmpOTVTalkWithAnExpert_Clear,
        cmpOTVTalkWithAnExpert_1,
        cmpOTVTalkWithAnExpert_2,
        cmpOTVTalkWithAnExpert_3,
        cmpOTVTalkWithAnExpert_4,
        cmpOTVTalkWithAnExpert_5,
        cmpOTVTalkWithAnExpert_6,
        cmpOTVTalkWithAnExpert_7,
        cmpOTVTalkWithAnExpert_8,
        cmpOTVTalkWithAnExpert_9,
        cmpOTVTalkWithAnExpert_10,
        cmpOTVTalkWithAnExpert_11,
        cmpOTVTalkWithAnExpert_12,
        cmpOTVTalkWithAnExpert_13,
        cmpOTVTalkWithAnExpert_14,
        cmpOTVTalkWithAnExpert_15,
        cmpOTVTalkWithAnExpert_16,
        cmpOTVTalkWithAnExpert_17,
        cmpOTVTalkWithAnExpert_18
    }
    logo = Images + '/logo_symbol_red.svg';
    
    renderedCallback(){
        loadStyle(this,lwc_modal_progress_header)
    }

    goBack(){ 
        try {
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    name: "Home"
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}