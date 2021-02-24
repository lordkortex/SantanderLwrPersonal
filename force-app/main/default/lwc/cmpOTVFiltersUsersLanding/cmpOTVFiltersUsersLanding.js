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
    busqueda;
    filtroStatus = [{ label: 'Select a Status' , value: ''},
                    { label: 'Active', value: 'true' },
                    {  label: 'Inactive', value: 'false' },
                   ];
    filtroTypeUser = [{ label: 'Select a type of user' , value: ''},
                   { label: 'Administrator', value: 'one_trade_v_m_global_administration' },
                   {  label: 'Operator', value: 'one_trade_v_m_global_operator' },
                  ];
    selectedRole;
    selectedStatus;
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
        console.log('buscar');
        this.busqueda = this.template.querySelector('.slds-input').value;
       // this.busqueda = this.busqueda.uppercase();
       this.goTable();
    }
    changeStatus(event){
        console.log('changeStatus');
        this.selectedStatus = event.target.value;
        this.goTable();
    }

    changeRole(event){
        console.log('changeRole');
        this.selectedRole = event.target.value;
        this.goTable();
    }

    goTable(){
        console.log('busqueda :' + this.busqueda);
        console.log('busqueda :' + this.selectedRole);
        console.log('busqueda :' + this.selectedStatus);
        const returnFiltros = new CustomEvent('returnfiltros', {detail: {busqueda : this.busqueda,
                                                                         selectedRole :this.selectedRole,
                                                                         selectedStatus : this.selectedStatus}});
        this.dispatchEvent(returnFiltros);
    }
}