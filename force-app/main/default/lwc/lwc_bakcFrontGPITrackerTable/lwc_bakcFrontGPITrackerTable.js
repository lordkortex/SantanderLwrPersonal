import { LightningElement, api, track } from 'lwc';
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
import getFilteredData from '@salesforce/apex/CNT_SwiftPaymentTable.getFilteredData';
import encryptData from '@salesforce/apex/CNT_SwiftPaymentTable.encryptData';

//Navegación
import { NavigationMixin } from 'lightning/navigation';

export default class Lwc_bakcFrontGPITrackerTable extends NavigationMixin(LightningElement) {

    label = {
        Loading,
        sortBy,
        status,
        sortedAscending,
        statusUpdate,
        orderingAccount,
        valueDate,
        sortByValueDate,
        beneficiaryName,
        beneficiaryBIC,
        sortBySettledAmount,
        settledAmount,
        actions,
        noData
    }

     @track paymentsPerPage = 50;
     @track currentPage =1; 
     @track oldPage = 1;
     @track start = 0;                         //description="Object Counter"
     @track receivedList;                      //description="A list of accounts provided by parent component"
     @track end;
     @track paginationReceivedList;            //description="A list of accounts provided by parent component"
     @track jsonArray;
     @track paginatedPayments;
     @track sortsettledAmount = 'desc';
     @track sortvalueDate = 'desc';
     @track sortinstructed = 'desc';
     @track mrTracker =false;
     @api filters;
     _filters = '';
     @api isuetrsearch =false;
     @track isIngested = true;
     @api uetr ="uetr searched and used to call the service to optain 'not ingested' records";

     get filters (){
         return this._filters;
     }
     set filters (filters){
         if (filters){
            this._filters = filters;
            //this.getData();
         }
     }
     get loading(){
         return (this.label.Loading+ '...');
     }

     get sortvalueDateDesc(){
         return (this.sortvalueDate=='desc');
     }

     get sortsettledAmountDesc(){
        return (this.sortsettledAmount=='desc');
    }

    get jsonArrayGreater0(){
        if(this.jsonArray){
            return (this.isIngested || this.jsonArray.length > 0);
        }
        else {
            return false;
        }
    }

    get jsonArrayBetweenStartToEnd(){
        var listaAux = this.jsonArray.slice(this.start, this.end);
        Object.keys(listaAux).forEach(key => {
            listaAux[key].index = key;
        })
        return listaAux;
    }
     
     connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        this.doInit();
    }

    doInit () {
        this.getDataAction(this.filters);
    }

    getData () {
        try{
            //$A.util.removeClass(component.find("spinner"), "slds-hide");   
            //var spinner = this.template.querySelector('[data-id="spinner"]');
            //spinner.classList.remove("slds-hide");


            //var filters=component.get("v.filters");
            var filters=this.filters;
            //component.set("v.filters", filters);
            this.getDataAction(filters);

            this.currentPage = 1;

            ///Diferenciar entre paginaciones ....
            //component.find("pagination").buildData(component.get("v.currentPage")); 
            this.template.querySelector('[data-id="pagination"]').buildData(this.currentPage);
        } catch (e) {
            console.log(e);
        }
    }

    sortBy (event) {
        try {
            //Retrieve the field to sort by
            if(event.target.id != null && event.target.id != "" && event.target.id != undefined){
                var sortItem = "v.sort"+event.target.id;
                var sorted = this.sortByHelper(component,sortItem,helper, event.target.id);
        
                if (sorted != undefined && sorted !=null){
        
                    this.jsonArray = sorted;
        
                    //Update the sort order
                    ////?????????????????????
                    if( component.get(sortItem) == 'asc'){
                        component.set(sortItem,'desc');
                    }else{
                        component.set(sortItem,'asc');
                    }
                    this.currentPage = 1;
                    //component.find("pagination").buildData('1');
                    //****************Revisar ya que hay 2 paginationid*****************
                    this.template.querySelector('[data-id]="pagination"]').buildData('1');
                }
            }

        } catch (e) {
            console.error(e);
        }
    }
    
    getDataAction (filters) {
        try {
            //var action = component.get("c.getFilteredData");
            //component.set("v.jsonArray",[]);

            //action.setParams({filters: filters});
            this.jsonArray = [];

            getFilteredData({filters: filters})
            .then(result => {
				console.log('Ok');
                var res = result;
                console.log(res);
                if(res != null && res != undefined  && Object.keys(res).length>0){
                    this.isIngested = true;

                    var end;
                    var parseJSON=res.paymentList;

                    this.jsonArray = parseJSON;
                        
                    if(parseJSON.length<this.paymentsPerPage){
                        end=parseJSON.length;
                    }else{
                        end=this.paymentsPerPage;
                    }

                    this.end = end;

                    var paginatedValues=[];

                    for(var i= this.start;i<=this.end;i++){
                        paginatedValues.push(parseJSON[i]);
                    }

                    this.paginatedPayments = paginatedValues;

                    var toDisplay=[];
                    var finish=parseJSON.length;

                    if(parseJSON.length>1000){
                        //Max payments to retrieve
                        finish=1000;
                    }

                    for(var i= 0;i<finish;i++){
                        toDisplay.push(parseJSON[i]);
                    }
                    //component.find("pagination").initPagination(toDisplay);
                    //this.template.querySelector('[data-id="pagination"]').initPagination(toDisplay);
                    //????this.template.querySelector("c-lwc_pagination").initPagination({currentPageAux: toDisplay});
                        
                    //IF IT COMES FROM UETR BUTTOM AND IS NOT INGESTED.
                    if(this.jsonArray.length == 0 && this.isuetrsearch){
                        this.goToDetails();
                    }else{
                        this.isIngested = false;
                    }
                }
                // $A.util.addClass(component.find("spinner"), "slds-hide");   
                this.template.querySelector('[data-id="spinner"]').classList.add("slds-hide");
            })
            .catch(error => {
				var errors = error;
                console.log(errors);
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            });
        } catch (e) {
            console.log(e);
        }         
    }

    goToDetails (){
        console.log('>>> Open Payment Details');
        //var url='c__paymentId='+component.get("v.uetr")+'&c__comesFromUETRSearch=true';
        var url='c__paymentId='+this.uetr+'&c__comesFromUETRSearch=true';

        try{
            this.encrypt(url).then((results)=>{
                this[NavigationMixin.Navigate]({
                    type: "standard__component", 
                    attributes: {
                        "componentName":"c__CMP_BackFrontGPITrackerPaymentDetail",
                        "actionName":"view"
                    },
                    state: {
                        c__params:results
                    } 
                });
            });
        } catch (e) {
            console.log(e);
        }
    }

    encrypt (data){
        try{
            var result="null";
            return new Promise((resolve, reject) => {
                encryptData({ str : data })
                .then(value => {
				    console.log('Ok');
                    result = value;
                    resolve(result);
                })
                .catch(error => {
				    errors = error;
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                    errors[0].message);
                            reject(response.getError()[0]);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                });
            });
        } catch (e) { 
            console.log(e);
        }   
    }

    sortByHelper (sortItem, sortBy){
        try {
            var order=component.get(sortItem);
            if(order !='' && order != null && order !=undefined){
    
                var data = this.jsonArray;
    
                if(data != null && data != undefined){
                    let sort;
                    if(order=='desc'){
                        if(sortBy == 'settledAmount'){
                            sort = data.sort((a, b) => parseFloat(b.paymentDetail.paymentAmount.amount) - parseFloat(a.paymentDetail.paymentAmount.amount));
                        }else if(sortBy == 'valueDate'){
                            sort = data.sort((a, b) => new Date(this.formatDate(b.paymentDetail.valueDate)).getTime() - new Date(this.formatDate(a.paymentDetail.valueDate)).getTime());
                        }
                    }else{
                        if(sortBy == 'settledAmount'){
                            sort = data.sort((a, b) => parseFloat(a.paymentDetail.paymentAmount.amount) - parseFloat(b.paymentDetail.paymentAmount.amount));
                        }else if(sortBy == 'valueDate'){
                            sort = data.sort((a, b) => new Date(this.formatDate(a.paymentDetail.valueDate)).getTime() - new Date(this.formatDate(b.paymentDetail.valueDate)).getTime());
                        }
                    }
                    return sort;
                }
            }
        } catch(e) {
            console.error(e);
        }
    }

    formatDate (date){
        if(date!='' && date.length==10){
            var res= date.slice(6,10)+"/"+date.slice(3,5)+"/"+date.slice(0,2);
            return res;
        }
    }

    buildData (event){

        try {
            var json = this.jsonArray;
            var currentPage=event.getParam("currentPage");
            var oldPage=this.oldPage;
            var perPage=this.paymentsPerPage;
            var end = this.end;
            var start = this.start;

            if (currentPage != null && currentPage != undefined && currentPage != '' && oldPage!=currentPage){
                //Update the index of dataset to display
                if(currentPage >oldPage && currentPage!=1){
                    this.start = perPage*currentPage-perPage;
                    if(Math.ceil(json.length/currentPage) >= perPage){
                        this.end = perPage*currentPage;
                    }else{
                        this.end = json.length;
                    }
                }else{
                    this.end = start;
                    if(currentPage==1){ 
                        this.start = 0;
                        this.end = perPage;

                    }else{
                        this.start = start-perPage;
                    }
                }
                this.oldPage = currentPage;

                //Update a set of the paginated data
                var paginatedValues=[];
                for(var i= this.start;i<=this.end;i++){
                    paginatedValues.push(json[i]);
                }

                this.paginatedPayments = paginatedValues;
            }
        } catch(e) {
            console.error(e);
        }  
    }

}