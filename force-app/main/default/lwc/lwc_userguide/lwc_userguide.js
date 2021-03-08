import { LightningElement } from 'lwc';

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import {loadStyle} from 'lightning/platformResourceLoader';

import Userguide1 from '@salesforce/label/c.Userguide1';
import Userguide2 from '@salesforce/label/c.Userguide2';
import Userguide3 from '@salesforce/label/c.Userguide3';
import Userguide4 from '@salesforce/label/c.Userguide4';
import Userguide_Title from '@salesforce/label/c.Userguide_Title';
import Userguide_Subtitle from '@salesforce/label/c.Userguide_Subtitle';


export default class Lwc_userguide extends LightningElement {

    label ={
        Userguide1,
        Userguide2,
        Userguide3,
        Userguide4,
        Userguide_Title,
        Userguide_Subtitle
    };

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
    }
}