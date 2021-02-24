import { LightningElement } from 'lwc';

import { loadStyle } from 'lightning/platformResourceLoader';
import Santander_Icons from '@salesforce/resourceUrl/Santander_Icons';
import images from '@salesforce/resourceUrl/Images';

import OTV_One_Trade_Legal_Information_PDF from '@salesforce/resourceUrl/OTV_One_Trade_Legal_Information_PDF';
import OTV_One_Trade_Privacy_PDF from '@salesforce/resourceUrl/OTV_One_Trade_Privacy_PDF';

// importing Custom Label
import cmpOTVFooter_1 from '@salesforce/label/c.cmpOTVFooter_1';
import cmpOTVFooter_2 from '@salesforce/label/c.cmpOTVFooter_2';
import cmpOTVFooter_3 from '@salesforce/label/c.cmpOTVFooter_3';

export default class CmpOTVFooter extends LightningElement {

    label = {
        cmpOTVFooter_1,
        cmpOTVFooter_2,
        cmpOTVFooter_3
    }
    // Expose URL of assets included inside an archive file
    logoOneTrade = images + '/logo-santander-one-trade.svg';

    downloadlegalInformationPDF(){
        let downloadElement = document.createElement('a');
        downloadElement.href = OTV_One_Trade_Legal_Information_PDF;
        downloadElement.setAttribute("download","LegalInformation.pdf");
        downloadElement.download = 'LegalInformation.pdf';
        downloadElement.click(); 
    }

    downloadprivacyPDF(){
        let downloadElement = document.createElement('a');
        downloadElement.href = OTV_One_Trade_Privacy_PDF;
        downloadElement.setAttribute("download","Privacy.pdf");
        downloadElement.download = 'Privacy.pdf';
        downloadElement.click(); 
    }
 
    renderedCallback() {
        Promise.all([
            loadStyle(this, Santander_Icons + '/style.css'),
        ])
    }

}