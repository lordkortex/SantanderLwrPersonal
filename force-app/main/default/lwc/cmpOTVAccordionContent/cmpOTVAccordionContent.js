import { LightningElement } from 'lwc';

import { loadStyle } from 'lightning/platformResourceLoader';
import Santander_Icons from '@salesforce/resourceUrl/Santander_Icons';
import custom_css_LWC from '@salesforce/resourceUrl/lwc_detail_accordion_content';

import cmpOTVHelpAndContact_1   from '@salesforce/label/c.cmpOTVHelpAndContact_1';
import cmpOTVHelpAndContact_2   from '@salesforce/label/c.cmpOTVHelpAndContact_2';
import cmpOTVHelpAndContact_3   from '@salesforce/label/c.cmpOTVHelpAndContact_3';
import cmpOTVHelpAndContact_3_1 from '@salesforce/label/c.cmpOTVHelpAndContact_3_1';
import cmpOTVHelpAndContact_4   from '@salesforce/label/c.cmpOTVHelpAndContact_4';
import cmpOTVHelpAndContact_4_1 from '@salesforce/label/c.cmpOTVHelpAndContact_4_1';
import cmpOTVHelpAndContact_5   from '@salesforce/label/c.cmpOTVHelpAndContact_5';
import cmpOTVHelpAndContact_5_1 from '@salesforce/label/c.cmpOTVHelpAndContact_5_1';
import cmpOTVHelpAndContact_6   from '@salesforce/label/c.cmpOTVHelpAndContact_6';
import cmpOTVHelpAndContact_6_1 from '@salesforce/label/c.cmpOTVHelpAndContact_6_1';
import cmpOTVHelpAndContact_6_2 from '@salesforce/label/c.cmpOTVHelpAndContact_6_2';
import cmpOTVHelpAndContact_6_3 from '@salesforce/label/c.cmpOTVHelpAndContact_6_3';
import cmpOTVHelpAndContact_6_4 from '@salesforce/label/c.cmpOTVHelpAndContact_6_4';
import cmpOTVHelpAndContact_7   from '@salesforce/label/c.cmpOTVHelpAndContact_7';
import cmpOTVHelpAndContact_7_1 from '@salesforce/label/c.cmpOTVHelpAndContact_7_1';
import cmpOTVHelpAndContact_8   from '@salesforce/label/c.cmpOTVHelpAndContact_8';
import cmpOTVHelpAndContact_8_1 from '@salesforce/label/c.cmpOTVHelpAndContact_8_1';
import cmpOTVHelpAndContact_9   from '@salesforce/label/c.cmpOTVHelpAndContact_9';
import cmpOTVHelpAndContact_9_1 from '@salesforce/label/c.cmpOTVHelpAndContact_9_1';
import cmpOTVHelpAndContact_10  from '@salesforce/label/c.cmpOTVHelpAndContact_10';

export default class CmpOTVAccordionContent extends LightningElement {

    label = {
        cmpOTVHelpAndContact_1,
        cmpOTVHelpAndContact_2,
        cmpOTVHelpAndContact_3,
        cmpOTVHelpAndContact_3_1,
        cmpOTVHelpAndContact_4,
        cmpOTVHelpAndContact_4_1,
        cmpOTVHelpAndContact_5,
        cmpOTVHelpAndContact_5_1,
        cmpOTVHelpAndContact_6,
        cmpOTVHelpAndContact_6_1,
        cmpOTVHelpAndContact_6_2,
        cmpOTVHelpAndContact_6_3,
        cmpOTVHelpAndContact_6_4,
        cmpOTVHelpAndContact_7,
        cmpOTVHelpAndContact_7_1,
        cmpOTVHelpAndContact_8,
        cmpOTVHelpAndContact_8_1,
        cmpOTVHelpAndContact_9,
        cmpOTVHelpAndContact_9_1
    }

    connectedCallback() {
        loadStyle(this, Santander_Icons + '/style.css'),
        loadStyle(this, custom_css_LWC);
    } 
}