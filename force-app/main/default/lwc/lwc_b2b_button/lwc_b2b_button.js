import { LightningElement, track, api } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
// Import styles
import santanderStyle from '@salesforce/resourceUrl/Santander_Icons';

export default class lwc_b2b_button extends LightningElement {

    @api label;
    @api icon;

    @track iconclass = 'icon';


    connectedCallback() {
		loadStyle(this, santanderStyle + '/style.css');
		this.iconclass = this.iconclass + this.icon;
    }
  
    handleClick() {
      this.dispatchEvent(new CustomEvent('clickbutton'));
    } 

}