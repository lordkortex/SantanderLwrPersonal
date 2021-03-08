import { LightningElement,api} from 'lwc';

import T_Copy from '@salesforce/label/c.T_Copy';
import T_Download from '@salesforce/label/c.T_Download';

export default class Lwc_card extends LightningElement {

    label = {
        T_Copy,
        T_Download
    }

    @api title;
    @api subtitle;

}