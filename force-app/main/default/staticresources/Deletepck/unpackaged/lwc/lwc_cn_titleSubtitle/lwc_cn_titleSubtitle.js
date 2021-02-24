import { LightningElement, api } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';


// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
//mport NavigationMixin from 'lightning/navigation'

export default class Lwc_cn_titleSubtitle extends LightningElement {
    @api title;
    @api subtitle;
    @api fireNavigationEvent = false;

    connectedCallback() {
		  loadStyle(this, santanderStyle + '/style.css');
    }

    goBack(){
      if(this.fireNavigationEvent){
        const navigatebackevent = new CustomEvent('navigateback')
        this.dispatchEvent(navigatebackevent)
      } else {
          window.history.back();
      }
    }
}