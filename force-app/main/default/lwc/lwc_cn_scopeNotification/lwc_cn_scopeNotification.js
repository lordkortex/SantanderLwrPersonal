import {LightningElement,api,track} from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
export default class Lwc_cn_scopeNotification extends LightningElement {
	@api notificationclass = 'slds-scoped-notification_error';
	@api title = 'title';
	@api notificationtitle = 'notificationTitle';
	@api notificationbody = 'notificationBody';
	@api notificationicon = 'icon-close_emptyCircle';
	// local vars
	@track notificationclass2 = 'slds-scoped-notification slds-media slds-media_center ';
	@track notificationicon2 = 'slds-icon_container slds-icon-utility-error slds-no-flex slds-align-top button-selected ';
	// connectedCallback lifeCycle.
	connectedCallback() {
		loadStyle(this, santanderStyle + '/style.css');
		this.notificationclass2 = this.notificationclass2 + this.notificationclass;
		this.notificationicon2 = this.notificationicon2 + this.notificationicon;
	}
}