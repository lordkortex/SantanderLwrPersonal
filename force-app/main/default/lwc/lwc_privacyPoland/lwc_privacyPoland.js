import { LightningElement } from 'lwc';

import privacyPolandTitle from '@salesforce/label/c.privacyPolandTitle';
import policyPolandIntro from '@salesforce/label/c.policyPolandIntro';
import privacyPoland1 from '@salesforce/label/c.privacyPoland1';
import privacyPoland1_1 from '@salesforce/label/c.privacyPoland1_1';
import privacyPoland1_2 from '@salesforce/label/c.privacyPoland1_2';
import privacyPoland1_3 from '@salesforce/label/c.privacyPoland1_3';
import privacyPoland1_4 from '@salesforce/label/c.privacyPoland1_4';
import privacyPoland1_5 from '@salesforce/label/c.privacyPoland1_5';
import privacyPoland1_6 from '@salesforce/label/c.privacyPoland1_6';
import privacyPoland2 from '@salesforce/label/c.privacyPoland2';
import privacyPoland2_1 from '@salesforce/label/c.privacyPoland2_1';
import privacyPoland2_2 from '@salesforce/label/c.privacyPoland2_2';
import privacyPoland2_3 from '@salesforce/label/c.privacyPoland2_3';
import privacyPoland2_4 from '@salesforce/label/c.privacyPoland2_4';
import privacyPoland2_5 from '@salesforce/label/c.privacyPoland2_5';
import privacyPoland2_6 from '@salesforce/label/c.privacyPoland2_6';
import privacyPoland2_7 from '@salesforce/label/c.privacyPoland2_7';
import privacyPoland2_8 from '@salesforce/label/c.privacyPoland2_8';
import privacyPoland2_9 from '@salesforce/label/c.privacyPoland2_9';
import privacyPoland2_10 from '@salesforce/label/c.privacyPoland2_10';
import privacyPoland2_11 from '@salesforce/label/c.privacyPoland2_11';
import privacyPoland2_12 from '@salesforce/label/c.privacyPoland2_12';
import privacyPoland2_13 from '@salesforce/label/c.privacyPoland2_13';
import privacyPoland2_14 from '@salesforce/label/c.privacyPoland2_14';
import privacyPoland3 from '@salesforce/label/c.privacyPoland3';
import privacyPoland3_1 from '@salesforce/label/c.privacyPoland3_1';
import privacyPoland3_2 from '@salesforce/label/c.privacyPoland3_2';
import privacyPoland3_3 from '@salesforce/label/c.privacyPoland3_3';
import privacyPoland4 from '@salesforce/label/c.privacyPoland4';
import privacyPoland4_1 from '@salesforce/label/c.privacyPoland4_1';
import privacyPoland4_2 from '@salesforce/label/c.privacyPoland4_2';
import privacyPoland4_3 from '@salesforce/label/c.privacyPoland4_3';
import privacyPoland4_4 from '@salesforce/label/c.privacyPoland4_4';
import privacyPoland5 from '@salesforce/label/c.privacyPoland5';
import privacyPoland5_1 from '@salesforce/label/c.privacyPoland5_1';
import privacyPoland5_2 from '@salesforce/label/c.privacyPoland5_2';
import privacyPoland5_3 from '@salesforce/label/c.privacyPoland5_3';
import privacyPoland5_4 from '@salesforce/label/c.privacyPoland5_4';
import privacyPoland5_5 from '@salesforce/label/c.privacyPoland5_5';
import privacyPoland6 from '@salesforce/label/c.privacyPoland6';
import privacyPoland6_1 from '@salesforce/label/c.privacyPoland6_1';
import privacyPoland6_2 from '@salesforce/label/c.privacyPoland6_2';
import privacyPoland6_3 from '@salesforce/label/c.privacyPoland6_3';
import privacyPoland6_4 from '@salesforce/label/c.privacyPoland6_4';
import privacyPoland6_5 from '@salesforce/label/c.privacyPoland6_5';
import privacyPoland6_6 from '@salesforce/label/c.privacyPoland6_6';
import privacyPoland6_7 from '@salesforce/label/c.privacyPoland6_7';
import privacyPoland6_8 from '@salesforce/label/c.privacyPoland6_8';
import privacyPoland6_9 from '@salesforce/label/c.privacyPoland6_9';
import privacyPoland6_10 from '@salesforce/label/c.privacyPoland6_10';
import privacyPoland6_11 from '@salesforce/label/c.privacyPoland6_11';
import privacyPoland7 from '@salesforce/label/c.privacyPoland7';
import privacyPoland7_1 from '@salesforce/label/c.privacyPoland7_1';
import privacyPoland8 from '@salesforce/label/c.privacyPoland8';
import privacyPoland8_1 from '@salesforce/label/c.privacyPoland8_1';
import privacyPoland8_2 from '@salesforce/label/c.privacyPoland8_2';
import privacyPoland8_3 from '@salesforce/label/c.privacyPoland8_3';
import privacyPoland8_4 from '@salesforce/label/c.privacyPoland8_4';
import privacyPoland9 from '@salesforce/label/c.privacyPoland9';
import privacyPoland9_1 from '@salesforce/label/c.privacyPoland9_1';
import privacyPoland9_2 from '@salesforce/label/c.privacyPoland9_2';
import privacyPoland9_3 from '@salesforce/label/c.privacyPoland9_3';
import privacyPoland9_4 from '@salesforce/label/c.privacyPoland9_4';
import privacyPoland9_5 from '@salesforce/label/c.privacyPoland9_5';
import privacyPoland9_6 from '@salesforce/label/c.privacyPoland9_6';
import privacyPoland10 from '@salesforce/label/c.privacyPoland10';
import privacyPoland10_1 from '@salesforce/label/c.privacyPoland10_1';
import privacyPoland10_2 from '@salesforce/label/c.privacyPoland10_2';
import privacyPoland10_3 from '@salesforce/label/c.privacyPoland10_3';
import privacyPoland10_4 from '@salesforce/label/c.privacyPoland10_4';
import privacyPoland10_5 from '@salesforce/label/c.privacyPoland10_5';
import privacyPoland10_6 from '@salesforce/label/c.privacyPoland10_6';
import privacyPoland10_7 from '@salesforce/label/c.privacyPoland10_7';
import privacyPoland10_8 from '@salesforce/label/c.privacyPoland10_8';
import privacyPoland10_9 from '@salesforce/label/c.privacyPoland10_9';
import privacyPoland10_10 from '@salesforce/label/c.privacyPoland10_10';
import privacyPoland10_11 from '@salesforce/label/c.privacyPoland10_11';
import privacyPoland10_12 from '@salesforce/label/c.privacyPoland10_12';
import privacyPoland10_13 from '@salesforce/label/c.privacyPoland10_13';
import privacyPoland10_14 from '@salesforce/label/c.privacyPoland10_14';
import privacyPoland10_15 from '@salesforce/label/c.privacyPoland10_15';
import privacyPoland10_16 from '@salesforce/label/c.privacyPoland10_16';
import privacyPoland10_17 from '@salesforce/label/c.privacyPoland10_17';
import privacyPoland10_18 from '@salesforce/label/c.privacyPoland10_18';
import privacyPoland10_19 from '@salesforce/label/c.privacyPoland10_19';
import privacyPoland10_20 from '@salesforce/label/c.privacyPoland10_20';
import privacyPoland10_21 from '@salesforce/label/c.privacyPoland10_21';
import privacyPoland10_22 from '@salesforce/label/c.privacyPoland10_22';


export default class Lwc_privacyPoland extends LightningElement {

    label = {
        privacyPolandTitle, 
        policyPolandIntro,  
        privacyPoland1,     
        privacyPoland1_1,   
        privacyPoland1_2,   
        privacyPoland1_3,   
        privacyPoland1_4,   
        privacyPoland1_5,   
        privacyPoland1_6,   
        privacyPoland2,     
        privacyPoland2_1,   
        privacyPoland2_2,   
        privacyPoland2_3,   
        privacyPoland2_4,   
        privacyPoland2_5,   
        privacyPoland2_6,   
        privacyPoland2_7,   
        privacyPoland2_8,   
        privacyPoland2_9,   
        privacyPoland2_10,  
        privacyPoland2_11,  
        privacyPoland2_12,  
        privacyPoland2_13,  
        privacyPoland2_14,  
        privacyPoland3,     
        privacyPoland3_1,   
        privacyPoland3_2,   
        privacyPoland3_3,   
        privacyPoland4,     
        privacyPoland4_1,   
        privacyPoland4_2,   
        privacyPoland4_3,   
        privacyPoland4_4,   
        privacyPoland5,     
        privacyPoland5_1,   
        privacyPoland5_2,   
        privacyPoland5_3,   
        privacyPoland5_4,   
        privacyPoland5_5,   
        privacyPoland6,     
        privacyPoland6_1,  
        privacyPoland6_2,  
        privacyPoland6_3,  
        privacyPoland6_4,  
        privacyPoland6_5,  
        privacyPoland6_6,  
        privacyPoland6_7,  
        privacyPoland6_8,  
        privacyPoland6_9,  
        privacyPoland6_10,  
        privacyPoland6_11,  
        privacyPoland7,     
        privacyPoland7_1,   
        privacyPoland8,     
        privacyPoland8_1,   
        privacyPoland8_2,   
        privacyPoland8_3,   
        privacyPoland8_4,   
        privacyPoland9,     
        privacyPoland9_1,   
        privacyPoland9_2,   
        privacyPoland9_3,   
        privacyPoland9_4,   
        privacyPoland9_5,   
        privacyPoland9_6,   
        privacyPoland10,    
        privacyPoland10_1,  
        privacyPoland10_2,  
        privacyPoland10_3,  
        privacyPoland10_4,  
        privacyPoland10_5,  
        privacyPoland10_6,  
        privacyPoland10_7,  
        privacyPoland10_8,  
        privacyPoland10_9,  
        privacyPoland10_10, 
        privacyPoland10_11, 
        privacyPoland10_12, 
        privacyPoland10_13, 
        privacyPoland10_14, 
        privacyPoland10_15, 
        privacyPoland10_16, 
        privacyPoland10_17, 
        privacyPoland10_18, 
        privacyPoland10_19, 
        privacyPoland10_20, 
        privacyPoland10_21, 
        privacyPoland10_22 
    };
}