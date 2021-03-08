import { LightningElement, track, api } from 'lwc';

export default class Lwc_trycalendar extends LightningElement {

    @api sysId = '202';
    theIframe;

    get fullUrl() {

    return `https://lwr-santanderonetrade.cs109.force.com/otfx/s/tauracalendar`;
    }

    @api isReloaded = false;


renderedCallback() {
    console.log('rendred callback called' + this.theIframe);
        if(this.theIframe==undefined){
            this.theIframe =  this.template.querySelector('iframe');
            this.theIframe.onload = ()=>{
                console.log('Onload called'+this.isReloaded);

                if(!this.isReloaded){
                    this.isReloaded = true;
                    this.theIframe.src = this.theIframe.src ;

                }
            }
        }   

    }
}