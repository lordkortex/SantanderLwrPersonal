import { LightningElement,api } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import { NavigationMixin } from 'lightning/navigation';
import Santander_Icons from '@salesforce/resourceUrl/Santander_Icons';
import images from '@salesforce/resourceUrl/Images';

import getUserRole  from '@salesforce/apex/CNT_OTV_UserInfo.getUserRole';
import bannerAccess from '@salesforce/resourceUrl/lwc_banner_access_otv';
import cmpOTVBannerAccess_1 from '@salesforce/label/c.cmpOTVBannerAccess_1';
import cmpOTVBannerAccess_2 from '@salesforce/label/c.cmpOTVBannerAccess_2';
import cmpOTVBannerAccess_3 from '@salesforce/label/c.cmpOTVBannerAccess_3';
import cmpOTVBannerAccess_4 from '@salesforce/label/c.cmpOTVBannerAccess_4';


export default class CmpOTVBannerAccess extends NavigationMixin(LightningElement) {

    label = {
        cmpOTVBannerAccess_1,
        cmpOTVBannerAccess_2,
        cmpOTVBannerAccess_3,
        cmpOTVBannerAccess_4
    }


     bgSmall = images +'/background-common-small.svg';
     bgLarge = images +'/background-common-large.svg';
     ebroker = images +'/ebroker.png';
     manTyping = images + '/man-typing.png';
     earthClouds = images + '/earth-clouds.png';

     @api type1 = false;
     @api type2 = false;
     @api type3 = false;

    connectedCallback() {
        loadStyle(this, Santander_Icons + '/style.css'),
        loadStyle(this, bannerAccess);
        
    }
    
    checkRole(){
        getUserRole().then((userRole)=>{
            if(userRole == 'Activator'){
                console.log('is activator');
                window.location.replace("/s/");
            }else{
                console.log('is not activator');
                this[NavigationMixin.Navigate]({
                    type: 'comm__namedPage',
                    attributes: {
                        name: "Home"
                    }
                })
            }
        })
    }
}