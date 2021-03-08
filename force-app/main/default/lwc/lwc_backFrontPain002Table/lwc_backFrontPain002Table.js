import { LightningElement, api, track } from 'lwc';
import {loadStyle, loadScript } from 'lightning/platformResourceLoader';

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import santanderFont from '@salesforce/resourceUrl/Santander_Fonts'; // Cambiar por Lwc_Santander_Fonts ?

// Import labels
import Loading from '@salesforce/label/c.Loading';
import Account from '@salesforce/label/c.Account';
import bic from '@salesforce/label/c.bic';
import channel from '@salesforce/label/c.channel';
import noData from '@salesforce/label/c.noData';

// Import apex class
import getFilteredData from '@salesforce/apex/CNT_BackFrontPain002Table.getFilteredData';

export default class Lwc_backFrontPain002Table extends LightningElement {
   
    label = {
        Loading,
        Account,
        bic,
        channel,
        noData
    }

    @api filters;

    @track paymentsPerPage = 50;
    @track currentPage = 1;
    @track oldPage = 1;
    @track start = 0;
    @track receivedList;
    @track end;
    @track paginationReceivedList;
    @track jsonArray;
    @track paginatedPayments;
    @track sortsettledAmount = 'desc';
    @track sortvalueDate = 'desc';
    @track sortinstructed = 'desc';
    @track toDelete = {account: '',bic: ''};
    isDelete;
    isOpen;

    _filters;
    _isDelete;
    _isOpen;

    get filters(){
        return this._filters;
    }
    set filters(filters){
        if(filters){
            this._filters = filters;
            this.doGetData();
        }
    }

    @api
    get isDelete(){
        return this._isDelete;
    }
    set isDelete(isDelete){
        if(isDelete){
            this._isDelete = isDelete;
            this.updateList();
        }
    }

    @api
    get isOpen(){
        return this._isOpen;
    }
    set isOpen(isOpen){
        if(isOpen){
            this._isOpen = isOpen;
            this.updateList();
        }
    }

    get loadingLabel(){
        return this.label.Loading + '...';
    }

    get jsonArrayNotEmpty(){
        if(this.jsonArray){
            return this.jsonArray.length > 0;
        }
        else{
            return false;
        }
    }


    get jsonArrayFromStartToEnd(){
        var listaAux = this.jsonArray.slice(this.start, this.end);
        Object.keys(listaAux).forEach(key => {
            listaAux[key].index = key;
        })
        return listaAux;
    }



    connectedCallback(){
        loadStyle(this, santanderStyle +'/style.css');
        loadStyle(this, santanderFont + '/FONTS/SantanderTextW05-Bold.ttf');
        this.doInit();
    }

    doInit() {
        this.getData(this._filters);
    }

    doGetData() {
        try{
            this.update()
            this.template.querySelector("[data-id='spinner']").classList.remove("slds-hide");
            var filters = this._filters;
            //component.set("v.filters", filters);
            this.getData(filters);

            this.currentPage = 1;
            this.template.querySelector("c-lwc_pagination").buildData({currentPageAux: this.currentPage}); 
        } catch (e) {
            console.log(e);
        }
    }

    deletePain002(event) {
        this.toDelete = event.detail.toDelete;
    }

    updateList() {
        if(!this._isOpen && !this._isDelete){
            this.update();
        }
    }

    getData(filters) {
        try {      
            getFilteredData({pain: true, filters: filters})
            .then( result => {
                this.jsonArray = [];
                console.log("entro1");
                var res = result;
                console.log(res.length);

                if( res != undefined && res != '""' && res.length > 0){
                    console.log("pdiaodb");
                    var end;
                    var parseJSON = JSON.parse(res).accountPain002List;
                    this.jsonArray = parseJSON;

                    if(parseJSON.length < this.paymentsPerPage){
                        end = parseJSON.length;
                    }else{
                        end = this.paymentsPerPage;
                    }

                    this.end = end;
                    var paginatedValues=[];

                    for(var i = this.start; i <= this.end; i++){
                        paginatedValues.push(parseJSON[i]);
                    }

                    this.paginatedPayments = paginatedValues;

                    var toDisplay=[];
                    var finish=parseJSON.length;

                    if(parseJSON.length > 1000){
                        //Max payments to retrieve
                        finish = 1000;
                    }

                    for(var i= 0; i < finish; i++){
                        toDisplay.push(parseJSON[i]);
                    }
                    this.template.querySelector("c-lwc_pagination").initPagination({currentPageAux: toDisplay});
                }
            })
            .catch( error => {
                if (error) {
                    console.log("Error message: " + error);
                } else {
                    console.log("Unknown error");
                }
            })
            .finally( () => {
                if(this.template.querySelector("[data-id='spinner']")){
                    this.template.querySelector("[data-id='spinner']").classList.add("slds-hide");
                }
            });   
        } catch (e) {
            console.log(e);
        }
    }

    buildData(event){

        try {
            var json = this.jsonArray;
            var currentPage = event.detail.currentPage;
            var oldPage = this.oldPage;
            var perPage = this.paymentsPerPage;
            var end = this.end;
            var start = this.start;

            if (currentPage != undefined && currentPage != '' && oldPage != currentPage){
                //Update the index of dataset to display
                if(currentPage > oldPage && currentPage != 1){
                    this.start = perPage*currentPage-perPage;
                    if(Math.ceil(json.length/currentPage) >= perPage){
                        this.end = perPage*currentPage;
                    }else{
                        this.end = json.length;
                    }
                }else{
                    this.end = start;
                    if(currentPage == 1){ 
                        this.start = 0;
                        this.end = perPage;

                    }else{
                        this.start = start-perPage;
                    }
                }
                this.oldPage = currentPage;

                //Update a set of the paginated data
                var paginatedValues=[];
                for(var i= this.start; i <= this.end; i++){
                    paginatedValues.push(json[i]);
                }
                this.paginatedPayments = paginatedValues;
            }
        } catch(e) {
            console.error(e);
        }  
    }

    openAddModal() {
        this._isOpen = true;
    }

    update() {
        try{
            this.template.querySelector("[data-id='spinner']").classList.remove("slds-hide");
            var filters = this._filters;
            //component.set("v.filters", filters);
            this.getData(filters);

            this.currentPage = 1;
            this.template.querySelector("c-lwc_pagination").buildData({currentPageAux: this.currentPage}); 
        } catch (e) {
            console.log(e);
        }
    }

    handleCreatePainEvent(event){
        this._isOpen = event.detail.isOpen;
        this.updateList();
    }
}