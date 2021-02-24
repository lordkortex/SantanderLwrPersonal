import { LightningElement, api } from 'lwc';


export default class Lwc_pay_filterDropdownCheckbox extends LightningElement {
    @api checkid = '';               //Id of the checkbox
    @api checkvalue ='';             //Value of the checkbox
    @api ischecked = false;          //Flag to check and uncheck the component
    @api checklabel ='';             //Label of the checkbox quitar despues de pruebas

    _ischecked;

    get ischecked(){
        return this._ischecked;
    }

    set ischecked(ischecked){
        this._ischecked = ischecked;
    }

    get checkvalue(){
        return this.checkvalue;
    }

    get checkid(){
        return this.checkid;
    }

    get checklabel(){
        return this.checklabel;
    }



    handleCheckbox (event) {
        // component.set('v.isChecked', event.target.checked);
        this._ischecked = event.target.checked;
     
        // var evt = component.getEvent('selectValue');
        // evt.setParams({
        //     'selectedValue' : event.currentTarget.id,
        //     'isChecked' : event.target.checked
        // });
        // evt.fire();

        const selectedevent = new CustomEvent('selectvalue', {
            //Revisar en integración ya que por defecto añade '-12' por si se espera otro tipo de información
            detail : {  selectedValue : event.target.id.split('-')[0],
                        ischecked : event.target.checked}
        });
        this.dispatchEvent(selectedevent);   
	}
}