import { LightningElement,api } from 'lwc';

import { loadStyle } from 'lightning/platformResourceLoader';
import Santander_Icons from '@salesforce/resourceUrl/Santander_Icons';

// importing Custom Label
import cmpOTVPaginationModal_1 from '@salesforce/label/c.cmpOTVPaginationModal';
import cmpOTVPaginationModal_2 from '@salesforce/label/c.cmpOTVPaginationModal_2';
import cmpOTVPaginationModal_3 from '@salesforce/label/c.cmpOTVPaginationModal_3';
import cmpOTVPaginationModal_4 from '@salesforce/label/c.cmpOTVPaginationModal_4';
import cmpOTVPaginationModal_to from '@salesforce/label/c.cmpOTVPaginationModal_to';
import cmpOTVPaginationModal_of from '@salesforce/label/c.cmpOTVPaginationModal_of';


export default class CmpOTVPaginationUsersLanding extends LightningElement {

    label = {
        cmpOTVPaginationModal_1,
        cmpOTVPaginationModal_2,
        cmpOTVPaginationModal_3,
        cmpOTVPaginationModal_4,
        cmpOTVPaginationModal_to,
        cmpOTVPaginationModal_of
    }

    @api lstusers;
    lstPages = [];
    //DROPDOWN ATTRIBUTES
    values = ['1','2','3'];
    selectedValue = '1';
    selectedPage = '1';
    helpTextDropdown = "Show More";
    @api actualPage=1;
    @api numpages;
    @api items;
    @api lastpage;
 
    connectedCallback(){
        
        this.resetActivePage();
        Promise.all([
            loadStyle(this, Santander_Icons + '/style.css'),
        ])
        
    }

    conditions(event){
        if (event.target.getAttribute("data-item") == this.selectedValue){
            this.selectedClass = 'slds-dropdown__item slds-is-selected';
        }else{
            this.selectedValue =  event.target.getAttribute("data-item");
            this.selectedClass = 'slds-dropdown__item';
            this.items = this.lstusers.length;
        } 
        
        const returnValues = new CustomEvent('returnvalues', {detail: {selectedPage : this.selectedPage,
                                                                       selectedValue : this.selectedValue}});
        this.dispatchEvent(returnValues);
    }

    clickPage(event){
         this.pageClicked =event.target.getAttribute("data-item");
        if(this.pageClicked != this.actualPage){
            this.actualPage = this.pageClicked;
            this.resetActivePage();
            event.target.className="active";
            const returnPage = new CustomEvent('returnpageselected', {detail: {actualPage : this.actualPage}});
            this.dispatchEvent(returnPage);
        }
    }

    prevPage(event){
        if(this.actualPage != 1){
            this.actualPage--;
            this.resetActivePage();
            const returnPage = new CustomEvent('returnpageselected', {detail: {actualPage : this.actualPage}});
            this.dispatchEvent(returnPage);
        }
    }

    nextPage(event){
        if(this.actualPage != this.lastpage){
            this.actualPage++;
            this.resetActivePage();
            const returnPage = new CustomEvent('returnpageselected', {detail: {actualPage : this.actualPage}});
            this.dispatchEvent(returnPage);
        }
    }

    resetActivePage(){
        this.template.querySelectorAll('[data-id =paginacion]').forEach(element => {
            if(element.className == "active"){
                element.className =""; 
            }
            console.log(this.actualPage);
            if(element.dataset.item == this.actualPage){
                element.className ="active"; 
            }
                
        })
    }
}