import { LightningElement, api, track } from 'lwc';
import {loadStyle, loadScript } from 'lightning/platformResourceLoader';

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

// Import labels
import fillCompanyId from '@salesforce/label/c.fillCompanyId';
import company from '@salesforce/label/c.company';
import companyID from '@salesforce/label/c.companyID';
import clear from '@salesforce/label/c.clear';
import apply from '@salesforce/label/c.apply';

// Import apex class
import getCompanyID from '@salesforce/apex/CNT_BackFrontPain002Search.getCompanyID';

export default class Lwc_pain002Search extends LightningElement {

    label = {
        fillCompanyId,
        company,
        companyID,
        clear,
        apply
    }

    @api showtable;

    @track pillsContainer;
    @track filters;

    entityID;
    selectedLookUpRecord;

    @track _entityID;
    @track _selectedLookUpRecord = {};

    @track dynamicClass = "button-search-open button-search icon-search";

    @api
    get entityID(){
        return this._entityID;
    }

    set entityID(entityID){
        if(entityID){
            this._entityID = entityID;
            this.refreshPills();
        }
    }

    @api
    get selectedLookUpRecord(){
        return this._selectedLookUpRecord;
    }

    set selectedLookUpRecord(selectedLookUpRecord){
        if(selectedLookUpRecord){
            this._selectedLookUpRecord = selectedLookUpRecord;
            this.getAccountData();
        }
    }

    get inputClass(){
        return "slds-input inputShadow inputLarge lwc_input";
    }

    connectedCallback(){
        loadStyle(this, santanderStyle +'/style.css');
    }

    refreshPills() {
        try {
            //Get all the pills to show
            var entityID = this._entityID;
            var entity = this._selectedLookUpRecord;
            // console.log(entity.Name);
            // console.log(entity.ACC_TXT_CompanyId__c);

            var filter="";

            //Set the pills array and the filters String

            if(entityID != null && entityID != ""){
                filter += entityID;
            }

           /* if(entity.Name!=null && entity.Name!="" && entity.Name!=undefined && entity!={}){
                pills.push(["entity=",entity.Name]);
                filter+="&"+"entity="+entity.Name;
            }*/
            if(filter != ""){
                this.filters = filter;
            }else{
                if(this.template.querySelector("[data-id='searchArea']").classList.contains('hidden')){
                    this.openSearch();
                }
                this.filters = filter;
            }
        } catch (e) {
            // Handle error
            console.error(e);
        } 
    }

    openSearch() {
        try{
            var searchArea = this.template.querySelector("[data-id='searchArea']");
            var searchAreaTitle = this.template.querySelector("[data-id='searchAreaTitle']");
            //var searchIcon = this.template.querySelector("[data-id='searchIcon']");
            if(searchArea){
                searchArea.classList.toggle("hidden");
                searchAreaTitle.classList.toggle("hidden");
                if(this.dynamicClass.includes("button-search-open")){
                    this.dynamicClass = "button-search icon-search";
                }
                else {
                    this.dynamicClass = "button-search icon-search " + "button-search-open";
                }
                
                // if(searchIcon){
                //     searchIcon.classList.toggle("button-search-open");
                // }
            }
        } catch (e) {
            console.log(e);
        }
    }

    clear() {
        try {
            this._selectedLookUpRecord = undefined;
            this._entityID = "";

            this.filterData();
        } catch (e) {
            console.log(e);
        }
    }

    removePill(event){
        try{
            var currentPill = event.detail.currentPill;

            if(currentPill != undefined & currentPill != ""){
                switch(currentPill.substring(0,currentPill.length-1)){
                    case "entityID":
                        this._entityID = "";
                    break;

                    case "entity":
                        this._selectedLookUpRecord = undefined;
                    break;
                }
                
                //Refresh the pill information and filter the data
                this.refreshPills();
                this.filterData();
            }
        } catch (e) {
            console.log(e);
        }
    }

    apply (){
        if(this.filters != ''){
            if(!this.showtable){
                this.openSearch();
            }
            this.filterData();
        }
    }

    filterData(){
        try{
            if(this.filters != undefined){
                const getFilterEvent = new CustomEvent("getfilter", {
                    detail: {filters: this.filters}
                });
                this.dispatchEvent(getFilterEvent);
            }     
        } catch (e) {
            console.log(e);
        }    
    }

    openAddModal() {
        this.isOpen = true; 
    }

    getAccountData() {
        try{
            getCompanyID({name: this._selectedLookUpRecord.Name})
            .then( result => {
                this._entityID = result;
                this.refreshPills();
            })
            .catch( error => {
                if (error) {
                    console.log("Error message: " + error);
                } else {
                    console.log("Unknown error");
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    handleValueSelected(event){
        this._selectedLookUpRecord = event.detail.selectedValue;
        this.getAccountData();
    }
}