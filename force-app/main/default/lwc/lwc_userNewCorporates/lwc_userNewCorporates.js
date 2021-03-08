import { LightningElement, track, api } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

import Corporate from '@salesforce/label/c.Corporate';
import LogAdmin_SelectOne from '@salesforce/label/c.LogAdmin_SelectOne';
import add from '@salesforce/label/c.add';
import CorporateName from '@salesforce/label/c.CorporateName';
import GroupNew_NoData from '@salesforce/label/c.GroupNew_NoData';
import T_Delete from '@salesforce/label/c.T_Delete';



export default class Lwc_userNewCorporates extends LightningElement {

    Label = {
        Corporate,
        LogAdmin_SelectOne,
        add,     
        CorporateName,
        GroupNew_NoData,
        T_Delete
    }

    @api corporateslistback;
    @api corporateslistfront = [];
    @api showmodal;
    @api selectedcorporates = [];

    @track selectedValues;
    @track showDropdown = true;
    @track helpTextDropdown = "Show More";
    @track modalToShow = "ConfirmCreation";
    @track corporateClicked = "";

    @track issimpledropdown = false;
    

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }

    get selectedCorporatesEq0(){
        return selectedCorporates.length == 0;
    }
    get isShowingDelete(){
        return this.showModal && this.modalToShow == 'DeleteCorporate';
    }

    addValue() 
    {
        var selectedValues = this.selectedValues;

        if(selectedValues.includes("All")) 
        {
            this.showDropdown = false;
            this.selectedValues = [];
            this.corporatesListFront = [];
            this.selectedCorporates = this.corporatesListBack;
        } 
        else if(selectedValues != [] && selectedValues != null && selectedValues != undefined) 
        {
            
            var firstSelected = this.selectedCorporates;
            var finalSelected = selectedValues.concat(firstSelected);

            this.selectedCorporates = finalSelected;
            
            const finalDropdown = this.corporatesListBack.filter(e => !finalSelected.includes(e));
            
            this.corporatesListFront = finalDropdown;

            if(finalDropdown.length == 0) 
            {
                this.showDropdown = false;
            }
        }
        this.selectedValues = [];
        
    }

    deleteItem(event) 
    {
        var id = event.currentTarget.id;
        this.showModal = true;
        this.modalToShow = "DeleteCorporate";
        this.corporateClicked = id;
    }

    deletionConfirmed(event) 
    {   
        let id = event.getSource().getLocalId();
        this.showModal = false;
        this.modalToShow = "ConfirmCreation";
        if(event.getParam("isDeleting") && id == "DeleteCorporateModal") 
        {
            var a = this.corporateClicked;
            var front = this.corporatesListFront;
            front = front.concat(a);
            this.corporatesListFront = front;
            var filteredData= this.selectedCorporates.filter(dato => dato != a);
            this.selectedCorporates = filteredData;
            this.showDropdown = true;
        }
    }    
}