import { LightningElement, wire } from 'lwc';

// Import current user info
import uId from '@salesforce/user/Id';

export default class CallService extends LightningElement {
	userId = '0050Q000004iqydQAA';
	handleClick() {
		this.template.querySelector("c-lwc_service-component").onCallApex({callercomponent:'callService',controllermethod:'getUserDateFormat',actionparameters:{userId:this.userId}});
	}
	successcallback(event) {
		console.log('on successcallback');
		if(event.detail.callercomponent === 'callService'){
			console.log(event.detail);
		}
	}
}