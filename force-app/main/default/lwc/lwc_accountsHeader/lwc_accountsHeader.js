import { LightningElement, api, track } from 'lwc';

//Labels
import Country from '@salesforce/label/c.Country';
import Account from '@salesforce/label/c.Account';
import Alias from '@salesforce/label/c.Alias';
import Subsidiary from '@salesforce/label/c.Subsidiary';
import Bank from '@salesforce/label/c.Bank';
import Updated from '@salesforce/label/c.Updated';
import currency from '@salesforce/label/c.currency';
import Available_Balance from '@salesforce/label/c.Available_Balance';
import Book_Balance from '@salesforce/label/c.Book_Balance';
import T_ExpandAll from '@salesforce/label/c.T_ExpandAll';
import T_CollapseAll from '@salesforce/label/c.T_CollapseAll';
//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

export default class Lwc_accountsHeader extends LightningElement {
    
    label ={
        Country,
        Account,
        Alias,
        Subsidiary,
        Bank,
        Updated,
        currency,
        Available_Balance,
        Book_Balance,
        T_ExpandAll,
        T_CollapseAll
    }

    @api islastupdate;
    _islastupdate;
    @api sortselected = this.label.Country;
    _sortselected;
    @api isloading;
    _isloading;

    @track itabSelected = 'LastUpdateTab';

    get isloading(){
        return this._isloading;
    }

    set isloading (isloading){
        if(this.isloading){
            this._isloading = isloading;
        }
    }

    get islastupdate(){
        return this._islastupdate;
    }

    set islastupdate (islastupdate){
        if(this.islastupdate){
            this._islastupdate = islastupdate;
            this.collapseAll();
        }
    }

    get sortselected(){
        return this._sortselected;
    }

    set sortselected (sortselected){
        if(this.sortselected){
            this._sortselected = sortselected;
            this.collapse();
        }
    }

    get thisExpandClass (){
        return (this.itabSelected+'_iAll button-arrow icon-expand slds-show');
    }

    get thisCollapseClass (){
        return (this.itabSelected+'_iAll button-arrow icon-collapse slds-hide');
    }

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        this.islastupdate = true;
        console.log('connectdCallback');
    }

    expandAll(){   
        this.showHideAll();
        const expandall = new CustomEvent('expandall');
        this.dispatchEvent(expandall);  
    }

    collapseAll(){
        this.showHideAll();
        const collapseall = new CustomEvent('collapseall');
        this.dispatchEvent(collapseall);
    }

    showHideAll (){
        var tab = this.itabSelected;
        var icmp = this.template.querySelectorAll("."+tab+"_iAll");        
        icmp.forEach(function(el){
            el.classList.toggle("slds-show");
            el.classList.toggle("slds-hide"); 
        });
    }

    @api
    showHide(){
        var tab = this.itabSelected;
        var icmp = this.template.querySelectorAll("."+tab+"_iAll");  
        if(icmp[0].classList.contains("slds-hide") && icmp[1].classList.contains("slds-show")){      
            icmp.forEach(function(el){
                el.classList.toggle("slds-show");
                el.classList.toggle("slds-hide");       
            });
        }
    }   
    /*showHideIcons (iElements){
        var nElements = iElements.length/2;
        var nExpanded = 0;
        var nCollaped = 0;
        iElements.forEach(function(element) {
            if(element.classList.contains("icon") && element.classList.contains("expand") && element.classList.contains("slds-show")){
                nCollaped++;
            }
            if(element.classList.contains("icon") && element.classList.contains("collapse") && element.classList.contains("slds-show")){
                nExpanded++;
            }

        });
        var tab = component.get("v.itabSelected");
        var icmp = document.querySelectorAll("."+tab+"_iAll");
        if(nExpanded == nElements){
            
            icmp.forEach(function(element){
                if(element.classList.contains("icon-expand") && element.classList.contains("slds-show")){
                    element.classList.remove("slds-show");
                    element.classList.add("slds-hide"); 
                } 
                if(element.classList.contains("icon-collapse") && element.classList.contains("slds-hide")){
                    element.classList.add("slds-show");
                    element.classList.remove("slds-hide")
                } 
            });
            
        }
        if(nCollaped == nElements){
            icmp.forEach(function(element){
                if(element.classList.contains("icon-collapse") && element.classList.contains("slds-show")){
                    element.classList.remove("slds-show");
                    element.classList.add("slds-hide"); 
                }  
                if(element.classList.contains("icon-expand") && element.classList.contains("slds-hide")){
                    element.classList.add("slds-show");
                    element.classList.remove("slds-hide"); 
                }
            });
        }
    }*/
}