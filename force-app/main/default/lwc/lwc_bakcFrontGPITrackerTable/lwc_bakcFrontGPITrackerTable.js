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
import payment_statusOne from '@salesforce/label/c.payment_statusOne';
import payment_statusTwo from '@salesforce/label/c.payment_statusTwo';
import payment_statusThree from '@salesforce/label/c.payment_statusThree';
import payment_statusFour from '@salesforce/label/c.payment_statusFour';
import trackingDetails from '@salesforce/label/c.trackingDetails';
import beneficiaryAccount from '@salesforce/label/c.beneficiaryAccount';
import beneficiaryEntityName from '@salesforce/label/c.beneficiaryEntityName';
import beneficiaryCountry from '@salesforce/label/c.beneficiaryCountry';
import reasonForRejection from '@salesforce/label/c.reasonForRejection';
import document from '@salesforce/label/c.document';
import downloadMT103 from '@salesforce/label/c.downloadMT103';
import domain from '@salesforce/label/c.domain';
import domainBackfront from '@salesforce/label/c.domainBackfront';

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
        noData,
        payment_statusOne,
        payment_statusTwo,
        payment_statusThree,
        payment_statusFour,
        trackingDetails,
        beneficiaryAccount,
        beneficiaryEntityName,
        beneficiaryCountry,
        reasonForRejection,
        document,
        downloadMT103,
        domain,
        domainBackfront
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
     //Nuevo 
     @track statusClass = "icon-circle__red";
     @track statusLabel = this.label.payment_statusOne;
     @api item;
     @track showDetail = false;


     get getCircleClass(){
        
        console.log(this.jsonArray[0].paymentDetail.transactionStatus.status);

        var status =this.jsonArray[0].paymentDetail.transactionStatus.status;
        var reason =this.jsonArray[0].paymentDetail.transactionStatus.reason;
        if(status=='RJCT'){
            this.statusLabel = this.label.payment_statusOne;
            this.statusClass = "icon-circle__red";
        }
        if(status=='ACSC' || status=='ACCC'){
            //this.statusLabel = this.label.payment_statusTwo;
            this.statusClass = "icon-circle__green";
        }
        if(status=='ACSP'){
            if(reason=='G000' || reason =='G001' || reason==null || reason=='null'){
                //this.statusLabel = this.label.payment_statusThree;
                this.statusClass = "icon-circle__blue";
            }
            if(reason=='G002' || reason =='G003' || reason =='G004'){
                //this.statusLabel = this.label.payment_statusFour;
                this.statusClass = "icon-circle__orange";
            }
        }
        return 'circle '+this.statusClass;
    }
    
    get getStatusLabel(){
        var status =this.jsonArray[0].paymentDetail.transactionStatus.status;
        if(status=='RJCT'){
            this.statusLabel = this.label.payment_statusOne;
            //this.statusClass = "icon-circle__red";
        }
        if(status=='ACSC' || status=='ACCC'){
            this.statusLabel = this.label.payment_statusTwo;
            //this.statusClass = "icon-circle__green";
        }
        if(status=='ACSP'){
            if(reason=='G000' || reason =='G001' || reason==null || reason=='null'){
                this.statusLabel = this.label.payment_statusThree;
                //this.statusClass = "icon-circle__blue";
            }
            if(reason=='G002' || reason =='G003' || reason =='G004'){
                this.statusLabel = this.label.payment_statusFour;
                //this.statusClass = "icon-circle__orange";
            }
        }
        return this.statusLabel;
    }

    get getNumberFormat(){
        return this.jsonArray[0].paymentDetail.paymentAmount.numberFormat;
    }

    get getAmount(){
        return this.jsonArray[0].paymentDetail.paymentAmount.amount;
    }
    
    get gettcurrency(){
        return this.jsonArray[0].paymentDetail.paymentAmount.tcurrency;     
    }
    //Fin gets
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
        var counter = 0;
        Object.keys(listaAux).forEach(key => {
            //listaAux[key].index = key;
            listaAux[key].index = counter;
            counter += 1;
        })
        return listaAux;
    }

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        this.doInit();
    }

    renderedCallback(){
        console.log("*****  renderedCallback lwc_bakcFrontGPITrackerTable");
        this.template.querySelectorAll('tr').forEach(element => {
            if(element.innerHTML.includes('c-lwc_swift-payment-table-row')){
                element.remove();
            }
        });
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
                    //var parseJSON=res.paymentList;
                    //var parseJSONString="[{\"links\": {},\"paymentDetail\": {\"account\": {},\"beneficiaryData\": {\"beneficiaryName\": \"BENEFICIAR\",\"creditorAgent\":{\"agentCode\":\"BSCHBRS0XXX\",\"agentCountry\":\"BR\",\"agentLocation\":\"04543-011SAOPAULO\",\"agentName\":\"BANCOSANTANDER(BRASIL)S.A.\"},\"creditorCreditAccount\":{\"accountId\":\"ES1000490072012110458432\",\"idType\":\"IBA\"}},\"cancellationStatus\":{},\"issueDate\":\"2020-05-08\",\"originatorAgent\":{\"agentCode\":\"BSCHESM0XXX\",\"agentCountry\":\"ES\",\"agentLocation\":\"28660MADRID\",\"agentName\":\"BANCOSANTANDERS.ACIUDADGRUPOSANTANDER.EDF.PAMPA\"},\"originatorData\":{\"originatorAccount\":{\"accountId\":\"ES8100490075473000562155\",\"idType\":\"IBA\"},\"originatorName\":\"SUPERPAGAMENTOS,MEIOS0\"},\"paymentAmount\":{\"amount\":\"20\",\"currency_X\":\"EUR\",\"paymentAmount_FormattedDecimalPart\":\",00\",\"paymentAmount_FormattedEntirePart\":\"20\",\"paymentAmount_FormattedWholeNumber\":\"20,00\",\"tcurrency\":\"EUR\"},\"paymentId\":\"071a3dcc-9102-41ea-957c-3158a35a255d\",\"statusDate\":\"01/06/2020-10:08:37\",\"transactionStatus\":{\"status\":\"ACCC\"},\"valueDate\":\"08/05/2020\"}}]";
                    var parseJSONString="[{ \"links\": {}, \"paymentDetail\": {\"account\": {},\"beneficiaryData\": { \"beneficiaryName\": \"BENEFICIAR\", \"creditorAgent\": {\"agentCode\": \"BSCHBRS0XXX\",\"agentCountry\": \"BR\",\"agentLocation\": \"04543-011 SAO PAULO\",\"agentName\": \"BANCO SANTANDER (BRASIL) S.A.\" }, \"creditorCreditAccount\": {\"accountId\": \"ES1000490072012110458432\",\"idType\": \"IBA\" }},\"cancellationStatus\": {},\"issueDate\": \"2020-05-08\",\"originatorAgent\": { \"agentCode\": \"BSCHESM0XXX\", \"agentCountry\": \"ES\", \"agentLocation\": \"28660 MADRID\", \"agentName\": \"BANCO SANTANDER S.A CIUDAD GRUPO SANTANDER.EDF.PAMPA\"},\"originatorData\": { \"originatorAccount\": {\"accountId\": \"ES8100490075473000562155\",\"idType\": \"IBA\" }, \"originatorName\": \"SUPER PAGAMENTOS ,MEIOS 0\"},\"paymentAmount\": { \"amount\": \"40\", \"currency_X\": \"EUR\", \"paymentAmount_FormattedDecimalPart\": \",00\", \"paymentAmount_FormattedEntirePart\": \"80\", \"paymentAmount_FormattedWholeNumber\": \"20,00\", \"tcurrency\": \"EUR\"},\"paymentId\": \"071a3dcc-9102-41ea-957c-3158a35a255d\",\"statusDate\": \"01/06/2020 - 10:08:37\",\"transactionStatus\": { \"status\": \"ACCC\"},\"valueDate\": \"08/05/2020\" }},{ \"links\": {}, \"paymentDetail\": {\"account\": {},\"beneficiaryData\": { \"beneficiaryName\": \"BENEFICIAR\", \"creditorAgent\": {\"agentCode\": \"BSCHBRS0XXX\",\"agentCountry\": \"BR\",\"agentLocation\": \"04543-011 SAO PAULO\",\"agentName\": \"BANCO SANTANDER (BRASIL) S.A.\" }, \"creditorCreditAccount\": {\"accountId\": \"ES1000490072012110458432\",\"idType\": \"IBA\" }},\"cancellationStatus\": {},\"issueDate\": \"2020-05-08\",\"originatorAgent\": { \"agentCode\": \"BSCHESM0XXX\", \"agentCountry\": \"ES\", \"agentLocation\": \"28660 MADRID\", \"agentName\": \"BANCO SANTANDER S.A CIUDAD GRUPO SANTANDER.EDF.PAMPA\"},\"originatorData\": { \"originatorAccount\": {\"accountId\": \"ES8100490075473000562155\",\"idType\": \"IBA\" }, \"originatorName\": \"SUPER PAGAMENTOS ,MEIOS 0\"},\"paymentAmount\": { \"amount\": \"130\", \"currency_X\": \"EUR\", \"paymentAmount_FormattedDecimalPart\": \",00\", \"paymentAmount_FormattedEntirePart\": \"50\", \"paymentAmount_FormattedWholeNumber\": \"20,00\", \"tcurrency\": \"EUR\"},\"paymentId\": \"071a3dcc-9102-41ea-957c-3158a35a255d\",\"statusDate\": \"01/06/2020 - 10:08:37\",\"transactionStatus\": { \"status\": \"ACCC\"},\"valueDate\": \"08/05/2020\" }},{ \"links\": {}, \"paymentDetail\": {\"account\": {},\"beneficiaryData\": { \"beneficiaryName\": \"BENEFICIAR\", \"creditorAgent\": {\"agentCode\": \"BSCHBRS0XXX\",\"agentCountry\": \"BR\",\"agentLocation\": \"04543-011 SAO PAULO\",\"agentName\": \"BANCO SANTANDER (BRASIL) S.A.\" }, \"creditorCreditAccount\": {\"accountId\": \"ES1000490072012110458432\",\"idType\": \"IBA\" }},\"cancellationStatus\": {},\"issueDate\": \"2020-05-08\",\"originatorAgent\": { \"agentCode\": \"BSCHESM0XXX\", \"agentCountry\": \"ES\", \"agentLocation\": \"28660 MADRID\", \"agentName\": \"BANCO SANTANDER S.A CIUDAD GRUPO SANTANDER.EDF.PAMPA\"},\"originatorData\": { \"originatorAccount\": {\"accountId\": \"ES8100490075473000562155\",\"idType\": \"IBA\" }, \"originatorName\": \"SUPER PAGAMENTOS ,MEIOS 0\"},\"paymentAmount\": { \"amount\": \"320\", \"currency_X\": \"EUR\", \"paymentAmount_FormattedDecimalPart\": \",00\", \"paymentAmount_FormattedEntirePart\": \"20\", \"paymentAmount_FormattedWholeNumber\": \"20,00\", \"tcurrency\": \"EUR\"},\"paymentId\": \"071a3dcc-9102-41ea-957c-3158a35a255d\",\"statusDate\": \"01/06/2020 - 10:08:37\",\"transactionStatus\": { \"status\": \"ACCC\"},\"valueDate\": \"08/05/2020\" }} ]";
                    var parseJSON = JSON.parse(parseJSONString);

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

    //Implementación Rows
    showHideDetails (event) {
        this.showDetail = true;
        console.log('***Showdetail');

        var eventId = event.currentTarget.dataset.uniqueId;

        this.template.querySelectorAll('[data-id="details"][data-unique-id="' + eventId + '"]').forEach(element => {
            if(element.getAttribute("data-unique-id") === eventId){
                if(element.getAttribute("class") === "hidden"){
                    element.classList.remove("hidden");
                }else{
                    element.classList.add("hidden");
                }
            }
        });

        this.template.querySelectorAll('[data-id="parentDetails"][data-unique-id="' + eventId + '"]').forEach(element => {
            element.classList.toggle("noInferiorBorder");
        });
        
        this.template.querySelectorAll('[data-id="icon"][data-unique-id="' + eventId + '"]').forEach(element => {
            element.classList.toggle("icon-arrowDown_big");
            element.classList.toggle("icon-arrowUp_big");
            console.log("toggle arrow");
        });

        //this.showHideDetailsHelper();
    }

    showHideDetailsHelper () {
        try{
            //var cmp = component.find("details");
            var cmp = this.template.querySelector('[data-id="details"]');
            //var cmpParent = component.find("parentDetails");
            var cmpParent = this.template.querySelector('[data-id="parentDetails"]');
            //var cmptable = component.find("datailsTable");
            var cmptable = this.template.querySelector('[data-id="datailsTable"]');
            // var icon = component.find("icon");
            var icon = this.template.querySelector('[data-id="icon"]');
            var pos = this.itemposition;
    
            if(cmp!=undefined){
                cmp.classList.toggle("hidden");
            }
    
            if(pos != undefined && pos!=null){
                if(this.itemposition%2!=0){
                    cmptable.classList.add("evenBackground");
                }
            }
    
            if(icon!=undefined){
                icon.classList.toggle("icon-arrowDown_small")
                icon.classList.toggle("icon-arrowUp_small")
            }
    
            if(cmpParent!=undefined){
                cmpParent.classList.toggle("noInferiorBorder")
            }
            
        } catch (e) {
            console.log(e);
        }
    }
    //Fin de implementar Rows
}