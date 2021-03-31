import { LightningElement } from 'lwc';

// Import custom labels
import changeYourBrowser from '@salesforce/label/c.changeYourBrowser';
import ieBrowser from '@salesforce/label/c.IEBrowser';

export default class cmpIptBrowserMessage extends LightningElement {

changeYourBrowser = changeYourBrowser;
ieBrowser = ieBrowser;
    /* Expose the labels to use in the template.
    label = {
        changeYourBrowser,
        ieBrowser
    };*/

}