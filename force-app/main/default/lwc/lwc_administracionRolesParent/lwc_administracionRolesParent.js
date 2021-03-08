import {LightningElement,api,track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

//Import labels
import AdminRoles_Roles from '@salesforce/label/c.AdminRoles_Roles';
import AdminRoles_RoleSuccess from '@salesforce/label/c.AdminRoles_RoleSuccess';
import AdminRoles_RolesList from '@salesforce/label/c.AdminRoles_RolesList';
import AdminRoles_Cancel from '@salesforce/label/c.AdminRoles_Cancel';
import AdminRoles_Save from '@salesforce/label/c.AdminRoles_Save';

export default class lwc_administracionRolesParent extends NavigationMixin(LightningElement){

    //Labels
    label = {
        AdminRoles_Roles,
        AdminRoles_RoleSuccess,
        AdminRoles_RolesList,
        AdminRoles_Cancel,
        AdminRoles_Save
    }

    @track data = []; //Data displayed in the roles table
    @track dataSaveSuccess = false; //Flag to display the toast message on save success

    sendRoleData(){
        console.log("Saved data: " + JSON.stringify(this.data));
        this.dataSaveSuccess = true;
    }
    
    clearToast(){
        this.dataSaveSuccess = false;
    }
   
    resetValues(){
        this.template.querySelector('[data-id="rolesTable"]').refreshTable();
    }
}