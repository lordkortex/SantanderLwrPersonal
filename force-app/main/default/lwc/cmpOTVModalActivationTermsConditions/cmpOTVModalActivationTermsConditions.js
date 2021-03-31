import { LightningElement } from 'lwc';

import { loadStyle } from 'lightning/platformResourceLoader';
import Santander_Icons from '@salesforce/resourceUrl/Santander_Icons';
import images from '@salesforce/resourceUrl/Images';
import OTVTermsAndConditionsPDF from '@salesforce/resourceUrl/OTVTermsAndConditionsPDF_OldVersions';

export default class CmpOTVModalActivationTermsConditions extends LightningElement {


    // Expose URL of assets included inside an archive file
    logoSymbolRed = images + '/logo_symbol_red.svg';
    id  = images + '/i-d.jpg';
    alert = images + '/alert.svg';
    download = OTVTermsAndConditionsPDF;

    renderedCallback() {
        Promise.all([
            loadStyle(this, Santander_Icons + '/style.css'),
        ])
    }

    downloadPDF(){
        let downloadElement = document.createElement('a');
        downloadElement.href = this.download;
        downloadElement.setAttribute("download","TermsAndConditions.pdf");
        downloadElement.download = 'TermsAndConditions.pdf';
        downloadElement.click(); 
    }
        
}