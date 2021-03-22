import { LightningElement, track } from 'lwc';
//Labels
import Loading from '@salesforce/label/c.Loading';
import sortBy from '@salesforce/label/c.sortBy';
import status from '@salesforce/label/c.status';
import sortedAscending from '@salesforce/label/c.sortedAscending';
import statusUpdate from '@salesforce/label/c.statusUpdate';
import orderingAccount from '@salesforce/label/c.orderingAccount';
import valueDate from '@salesforce/label/c.valueDate';
import sortByValueDate from '@salesforce/label/c.sortByValueDate';
import beneficiaryName from '@salesforce/label/c.beneficiaryName';
import beneficiaryBIC from '@salesforce/label/c.beneficiaryBIC';
import sortBySettledAmount from '@salesforce/label/c.sortBySettledAmount';
import settledAmount from '@salesforce/label/c.settledAmount';
import actions from '@salesforce/label/c.actions';
import noData from '@salesforce/label/c.noData';

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
//Apex Class
// import getFilteredData from '@salesforce/apex/CNT_MRTrackerSearch.getFilteredData';
// import encryptData from '@salesforce/apex/CNT_MRTrackerSearch.encryptData';

//Navegación
import { NavigationMixin } from 'lightning/navigation';

export default class Lwc_backfrontGPITracker extends LightningElement {

    @track filters = "";
    @track showTable = true;
    @track ready = false;
    @track isuetrsearch = false;
    @track uetr = "";

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }

    getFilters(event) {

        var filters=event.detail.filters;
        this.filters = filters;
        this.isuetrsearch = event.detail.isuetrsearch;
        this.uetr = event.detail.uetr;
        //var table = this.template.querySelector('[data-id="table"]');
        if(filters==undefined || filters==null || filters==""){
            // $A.util.addClass(component.find("table"),"hidden");
            //this.template.querySelector('[data-id="table"]').classList.add("hidden");
       }else{
            this.ready = true;
            //$A.util.removeClass(component.find("table"),"hidden");
            //this.template.querySelector('[data-id="table"]').classList.remove("hidden");
        }
    
        //if($A.util.hasClass(component.find("table"),"hidden")==true){
        // if(this.template.querySelector('[data-id="table"]').classList.contains("hidden")==true){
        //     this.showTable = false;
        // }else{
        //     this.showTable = true;
        // }
    }
}