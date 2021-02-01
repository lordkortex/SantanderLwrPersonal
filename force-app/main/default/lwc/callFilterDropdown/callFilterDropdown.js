import { LightningElement } from 'lwc';

export default class CallFilterDropdown extends LightningElement {
	updatefilterdropdownhandler(event) {
		console.log('updatefilterdropdownhandler executed: '+event.detail.value);
		console.log('updatefilterdropdownhandler executed: '+event.detail.filter);
	}
}