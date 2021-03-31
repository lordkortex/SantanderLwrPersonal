import { LightningElement } from 'lwc';

import { loadStyle } from 'lightning/platformResourceLoader';
import Santander_Icons from '@salesforce/resourceUrl/Santander_Icons';

// importing Custom Label
import cmpOTVFiltersUsersLanding_1 from '@salesforce/label/c.cmpOTVFiltersUsersLanding_1';
import cmpOTVFiltersUsersLanding_2 from '@salesforce/label/c.cmpOTVFiltersUsersLanding_2';
import cmpOTVFiltersUsersLanding_3 from '@salesforce/label/c.cmpOTVFiltersUsersLanding_3';
import cmpOTVFiltersUsersLanding_4 from '@salesforce/label/c.cmpOTVFiltersUsersLanding_4';
import cmpOTVFiltersUsersLanding_5 from '@salesforce/label/c.cmpOTVFiltersUsersLanding_5';
import cmpOTVFiltersUsersLanding_6 from '@salesforce/label/c.cmpOTVFiltersUsersLanding_6';
import updatePaymentStatusReason from '@salesforce/apex/CNT_PaymentsPaymentDetail.updatePaymentStatusReason';

export default class CmpOTVFiltersUsersLanding extends LightningElement {

    label = {
        cmpOTVFiltersUsersLanding_1,
        cmpOTVFiltersUsersLanding_2,
        cmpOTVFiltersUsersLanding_3,
        cmpOTVFiltersUsersLanding_4,
        cmpOTVFiltersUsersLanding_5,
        cmpOTVFiltersUsersLanding_6
    }
    
    filtroStatus = [{ label: 'Active', value: 'true' , checked: true},
                    {  label: 'Inactive', value: 'false' , checked: false}
                   ];
    filtroTypeUser = [{ label: 'Administrator', value: 'one_trade_view_m_administration', checked: false},
                      {label: 'Operator', value: 'one_trade_view_m_operation', checked: false}
                     ];
    busqueda = null;
    selectedRole = null;
    selectedStatus = null;
    selectedvalue;

    renderedCallback() {
        Promise.all([
            loadStyle(this, Santander_Icons + '/style.css'),
        ])
    }
    borrar(){
        console.log('entra en borrar');
        this.template.querySelector('.slds-input').value = '';
        this.busqueda = this.template.querySelector('.slds-input').value;
        this.goTable();
    }
    buscar(event){
        this.busqueda = null;
        console.log('buscar');
        this.busqueda = this.template.querySelector('.slds-input').value;
       // this.busqueda = this.busqueda.uppercase();
       this.goTable();
    }
    changeStatus(event){
        this.selectedStatus = null;
        console.log('changeStatus');
        if(event.detail.selectedValue == 'true'){
            this.selectedStatus = true;
        }else if(event.detail.selectedValue == 'false'){
            this.selectedStatus = false;
        }
        console.log('selectedStatus :' + this.selectedStatus);
        //this.selectedStatus = event.target.value;
        this.goTable();
    }

    changeRole(event){
        this.selectedRole = null;
        console.log('changeRole');
        this.selectedRole = event.detail.selectedValue;
        this.goTable();
    }

    goTable(){
        console.log('busqueda :' + this.busqueda);
        console.log('selectedRole :' + this.selectedRole);
        console.log('selectedStatus :' + this.selectedStatus);
        const returnFiltros = new CustomEvent('returnfiltros', {detail: {busqueda : this.busqueda,
                                                                         selectedRole :this.selectedRole,
                                                                         selectedStatus : this.selectedStatus}});
        this.dispatchEvent(returnFiltros);
    }
    changefilter(event){
        this.selectedStatus = null;
        console.log('changeStatus' + event.detail.selectedValue);
        if(event.detail.selectedValue != null){
            if(event.detail.selectedValue == 'true'){
                this.selectedStatus = true;
            }else if(event.detail.selectedValue == 'false'){
                this.selectedStatus = false;
            }else{
                this.selectedRole = event.detail.selectedValue;
            }
        }
        console.log('selectedStatus :' + this.selectedStatus);
        console.log('selectedRole :' + this.selectedRole);
        //this.selectedStatus = event.target.value;
        this.goTable();
    }
}