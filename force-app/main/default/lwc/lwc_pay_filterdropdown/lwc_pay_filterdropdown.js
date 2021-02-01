import { LightningElement,api,track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

import option from '@salesforce/label/c.option';
import incorrectinputformat from '@salesforce/label/c.IncorrectInputFormat';

export default class Lwc_pay_filterdropdown extends LightningElement {

label = {
    option,
    incorrectinputformat
}

    @api values; //"List of values to populate the dropdown" 
    @track valuesAux = [];

    @api selectedvalue;													//description="Selected option from the dropdown" />
    @api selectedvalues;  													//description="Selected option from the dropdown" />
    @api selectedvaluestext;  												//description="Selected values String"/>
    @api helptextdropdown;  	//default="{!$Label.c.Show_More}" 			description="Dropdown help text" /> 
    @api issimpledropdown;  	//default="true" 								description="Flag to switch between simple and multiselect dropdown"/>
    @api labelvar;  				//default="" 									description="Dropdown label"/>
    @api isdisabled;  			//default="false" 							description="Attribute to indicate if the dropdown is disabled" />
    @api valuesplaceholder; 	//default=""									description="Placeholder value when values are selected"/>
    @api errortext;	           // default="{!$Label.c.IncorrectInputFormat}" 	description="Text to show when an error ocurred"/>
    @api cleardropdown; //		//default="false" 							description="Flag to clear or not the dropdown"/>

    _cleardropdown;
    
    get cleardropdown(){
        return this._cleardropdown;
    }
 
    set cleardropdown(cleardropdown){
        if (cleardropdown){
            this._cleardropdown= cleardropdown;
        }
        this.handleReset();
    }

    handleReset() {
        var reset = this._cleardropdown;
       if(reset != undefined && reset != null){
           if(reset){
               this.reset();
           }
       }   
   }

   reset (){
    var isSimple = this.issimpledropdown;
     if(isSimple){
         this.selectedvalue = '';
         this.selectedvaluestext = '';
     }else{
       
         var myValues = this.values;
         let checkboxes = this.template.querySelector('[data-id="PAY_Checkbox"]')
   
         for(var j=0; j<checkboxes.length;j++){                
             checkboxes[j].ischecked = false;  
         }
         this.selectedvalues= [];
         this.selectedvaluestext ='';
     }
     this.cleardropdown=false;
 }
    
    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');

        this.errortext = label.incorrectinputformat;

        var valuesAux = JSON.parse(JSON.stringify(this.values));
        Object.keys(valuesAux).forEach(key => {
            valuesAux[key].class1 = item[key].label == this.selectedvalue ? 'slds-dropdown__item slds-is-selected' : 'slds-dropdown__item';
            valuesAux[key].value = item[key].value;
            valuesAux[key].label = item[key].label;
            valuesAux[key].valuecheckid = 'OPT_'+item[key].value;
        });
        this.values = valuesAux;
    }

    @api
    setselectedvalues(auxiliarlist,event){
        var isSimpleDropdown = this.issimpledropdown;
        if(!isSimpleDropdown){           
            this.setCheckboxes();
        }else{
            if (auxiliarlist) {
                var items = auxiliarlist;
				this.setSelection(items); 
            } 
        }
    }

    setCheckboxes(){
        let selectedValues = this.selectedvalues;
        let checkboxes = this.template.querySelector('[data-id=""]');//PAY_Checkbox

        for(let i = 0; i < selectedValues.length; i++){
            for(let j=0; j<checkboxes.length;j++){
                if(selectedValues[i] == checkboxes[j].checkvalue){
                    var item = 'OPT_'+selectedValues[i];
                    var items = [];
                    items.push(item);
                    checkboxes[j].ischecked= true;
                    this.handleMultiSelection(items, true);
                }
            }
        } 
    }

    handleMultiSelection(items,checkedvar) {
        var isSimpleDropdown = issimpledropdown;
        if(!isSimpleDropdown){
            var selected = items[0];      
            var objArray = values;
            var obj = objArray.find(obj => 'OPT_'+obj.value == selected);
            var values = selectedvalues;
            if(values !=  null && values != undefined){
                if(checkedvar == true){
                    if(!values.includes(obj.value)){
                        values.push(obj.value);
                    }
                }else{
                    if(values.includes(obj.value)){
                        var i = values.indexOf(obj.value);
                        if ( i !== -1 ) {
                            values.splice( i, 1 );
                        }
                    }
                }
                var text = '';
                for(let i=0; i< values.length; i++){
                    for(let j=0; j< objArray.length; j++){
                        if(values[i] == objArray[j].value){
                            text = text + objArray[j].label;
                            if(i != values.length-1){
                                text = text + ', '
                            }
                        }
                    }
                    
                }
                this.selectedvalues = values;
                this.selectedvaluestext = text;
                
            }
            
        }
    }

    setSelection(items) {
        var isSimpleDropdown = this.issimpledropdown;
        if(isSimpleDropdown){
            var selected = items[0];
            var objArray = this,values;
            var obj = objArray.find(obj => obj.value == selected);
            var value = this.selectedvalue;
            if(value !=  null && value != undefined){
                
                this.selectedvalue = selected;
                this.selectedvaluestext = obj.label;
                
            }
        }  
    }

    selectOption(event){
        var item = event.currentTarget.id;
        var items = [];
        if(item){
            items.push(item);
            this.handleSelection(items);  
        } 
    }

    handleSelection (items) {
        var isSimpleDropdown = this.issimpledropdown;
        if(isSimpleDropdown){
            var selected = items[0];
            var objArray = this.values;
            var obj = objArray.find(obj => obj.value == selected);
            var value = this.selectedvalue;
            if(value !=  null && value != undefined){
                if(value == selected){
                    this.selectedvalue=''; 
                }else{
                    this.selectedvalue = selected;
                    this.selectedvaluestext = obj.label;
                }
            }
        }  
    }

    handleSelectValue(event) {        
        var item = event.detail.selectedvalue;
        var isChecked = event.detail.ischecked;
        var items = [];
        items.push(item);
        this.handleMultiSelection( items, isChecked);
    }

    get valueIsNotEmpty(){								
        if(this.selectedvalue != null && this.selectedvalue != ''){
            return true;
        }
          return false;
    }

    get valuesTextIsNotEmpty(){								
        if(this.selectedvaluestext != null && this.selectedvaluestext != ''){
            return true;
        }
          return false;
    }

}