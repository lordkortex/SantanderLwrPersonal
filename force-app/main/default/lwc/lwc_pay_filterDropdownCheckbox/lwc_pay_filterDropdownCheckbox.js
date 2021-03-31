import { LightningElement, api } from 'lwc';


export default class Lwc_pay_filterDropdownCheckbox extends LightningElement {
    @api checkid = '';               //Id of the checkbox
    @api checkvalue ='';             //Value of the checkbox
    @api ischecked = false;          //Flag to check and uncheck the component
    @api checklabel ='';             //Label of the checkbox quitar despues de pruebas

  
 
    handleCheckbox (event) {
      
        this.ischecked = event.target.checked;    

        const selectedevent = new CustomEvent('selectvalue', {
            //Revisar en integración ya que por defecto añade '-12' por si se espera otro tipo de información
            detail : {  selectedValue : event.target.id.split('-')[0],
                        ischecked : event.target.checked}
        });
        this.dispatchEvent(selectedevent);   
	}
}