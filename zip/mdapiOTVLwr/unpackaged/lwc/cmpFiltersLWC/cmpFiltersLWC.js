import { LightningElement,api,track } from 'lwc';

import { loadScript, loadStyle }from 'lightning/platformResourceLoader';
import Icons                    from '@salesforce/resourceUrl/Santander_Icons';
import Tokens                   from '@salesforce/resourceUrl/DesignSystem';
import Images                   from '@salesforce/resourceUrl/Images';

// import custom_css_LWC from '@salesforce/resourceUrl/custom_css_LWC';
import filters_LWC              from '@salesforce/resourceUrl/filters_LWC';

export default class CmpFiltersLWC extends LightningElement {
    
    @api arrayoptions;
    @api title;
    @api value;
    checked;
    
    connectedCallback() {
        loadStyle(this, Icons + '/style.css'),
        loadStyle(this, Tokens),
        loadStyle(this, filters_LWC);
    }

    openDropdown(event){
        this.template.querySelectorAll('[data-id =dropdown]').forEach(element => {
            if(element.className == "slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open"){
                element.className ="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click"; 
            }else if(element.className == "slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click"){
                element.className = "slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open";
            }
        })
    }

    handleOnChange(event) {
        // this.template.querySelectorAll('[data-id =dropdown]').forEach(element => {
        //     element.className ="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click"; 
        // })
        this.value = event.target.value;
        this.goBack();
    }

    clearFilter(event){
        this.template.querySelectorAll('[data-id =filter]').forEach(element => {
                element.value = null; 
        })
        console.log('entra?');
        this.value = null;
        this.goBack();
    }
    goBack(){
        const returnFiltros = new CustomEvent('changefilter', {detail: {selectedValue : this.value}});
        this.dispatchEvent(returnFiltros);
    }
}