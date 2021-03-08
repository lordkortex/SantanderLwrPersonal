import { LightningElement, api } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Labels
import AdminRoles_Order from '@salesforce/label/c.AdminRoles_Order';
import AdminRoles_RolName from '@salesforce/label/c.AdminRoles_RolName';
import AdminRoles_RolAlias from '@salesforce/label/c.AdminRoles_RolAlias';

export default class lwc_administracionRolesTable extends LightningElement {

    label={
        AdminRoles_Order,
        AdminRoles_RolName,
        AdminRoles_RolAlias,
    }

    @api tabledata = []; 

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        //this.fillTableData();
    }
    
    fillTableData() {
        this.template.querySelector("c-lwc_service-component").onCallApex({callercomponent: "lwc_administracionRolesTable", controllermethod: "getAdministracionRolesData", actionparameters: {}});
	}
    
    successcallback(event){
        console.log('OK successcallback');
        if(event.detail.callercomponent === 'lwc_administracionRolesTable'){
            console.log('Event details: ' + JSON.stringify(event.detail));
            this.getDataTable(event.detail.value);
        }
    }

	getDataTable(response){
		console.log(JSON.stringify(response));
		this.tabledata = response;
	}
}