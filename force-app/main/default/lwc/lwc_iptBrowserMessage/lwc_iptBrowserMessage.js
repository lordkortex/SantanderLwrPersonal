import { LightningElement } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import custom labels
import changeYourBrowser from '@salesforce/label/c.changeYourBrowser';
import IEBrowser from '@salesforce/label/c.IEBrowser';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';


export default class LWC_IPTBrowserMessage extends LightningElement {
	// Expose the labels to use in the template.
    label = {
        changeYourBrowser,
        IEBrowser,
	};
	connectedCallback() {
		loadStyle(this, santanderStyle + '/style.css');
	}
}