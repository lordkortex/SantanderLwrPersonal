import {LightningElement,api} from 'lwc';

//Import labels
import T_Delete from '@salesforce/label/c.T_Delete';

export default class lwc_administracionRolesTableRow extends LightningElement{

    @api rowdata = {};
    //Labels
    label = {
        T_Delete
    }

    existsRolAlias(){
        return this.rowdata.rolAlias != '';
    }

    clearRolAlias(){
        this.rowdata.rolAlias = '';
    }

    updateRowData(event){
       this.rowdata.rolAlias = event.currentTarget.value;
    }
}