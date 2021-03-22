import { LightningElement, api, track } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
//Import Apex method
// import searchFIlterTrades from '@salesforce/apex/CNT_LWC_FX_TradesLandingParent.searchFIlterTrades';
import downloadOTFXTrades from '@salesforce/apex/CNT_LWC_FX_TradesLandingParent.downloadOTFXTrades';
import removeFile from '@salesforce/apex/CNT_LWC_FX_TradesLandingParent.removeFile';

import getStatus from '@salesforce/apex/CNT_LWC_FX_TradesLandingParent.getStatus';
import getUserData from '@salesforce/apex/CNT_PaymentsLandingParent.getUserData';
import searchFIlterTradesColumns from '@salesforce/apex/CNT_LWC_FX_TradesLandingParent.searchFIlterTradesColumns';
//Import labels
import PAY_fileDownloaded from '@salesforce/label/c.PAY_fileDownloaded';
import PAY_downloadSuccessful from '@salesforce/label/c.PAY_downloadSuccessful';
import B2B_Error_Check_Connection from '@salesforce/label/c.B2B_Error_Check_Connection';
import download from '@salesforce/label/c.download';
import B2B_Error_Problem_Loading from '@salesforce/label/c.B2B_Error_Problem_Loading';
import domainCashNexus from '@salesforce/label/c.domainCashNexus';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Lwc_containerTable extends LightningElement {
    //Labels
    label = {
        B2B_Error_Check_Connection,
        B2B_Error_Problem_Loading,
        PAY_fileDownloaded,
        PAY_downloadSuccessful,
        download,
        domainCashNexus,
    }

    @track currentUser = {};
    @track showdownloadmodal = false;
    @track selectedrows = [];
    @track filtercounter = 0;
    @track isallselected = false;
    @track tradeslist;
    @track reload = false;
    @track showSpinner = false;
    filters = '{"tradeId": "1234","counterpartyList": ["008FYA", "008FYB"]}' //Variable para descargas
    emptyFilters = '{"counterpartyList": ["008FYB"]}';
    docId = '';
    @track columns;
    @track rows;
    @track statusValues = [];

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        this.getCurrentUserData();
        this.getTradesHandler();
        var context = 'FX';
        this.getFilterStatusValues(context);
    }

    getTradesHandler(jsonFilter) {
        if(jsonFilter == null){
            jsonFilter = this.emptyFilters;
        }
        
        searchFIlterTradesColumns({'parameters' : jsonFilter}).then(result => {
            console.log(JSON.stringify(result));
            if(JSON.stringify(result)=='{}'){
                const evt = new ShowToastEvent({
                    title: "No results from server",
                    message: "No results from server"
                });
                this.dispatchEvent(evt);
            }
                this.columns = result.headers;
                this.rows = result.data;
            
            
        }).catch(error => { 
            this.error = error;
            console.log('ERROR');
            console.log(this.error);
            const evt = new ShowToastEvent({
                title: "Server Error",
                message: this.error
            });
            this.dispatchEvent(evt);
        }); 
    }

    handleDownload(event) {
        this.showdownloadmodal = false;
        this.showSpinner = true;
        let params = event.detail;
         let fileFormat = "";
         if (params) {
             fileFormat = params;
         }
         this.getDocumentId(fileFormat)
         .then((documentId) => {
            this.docId = documentId;
            this.downloadFile(event, documentId);
         })
         .catch((error) => {
            this.showToast(error.title, error.body, error.noReload);
        })
        .finally(() => this.removeDocument(this.docId));
        // .then((documentId) => {    
        
         //})
     }

     getDocumentId(fileFormat) {
        return new Promise((resolve, reject) => {
        var errorLoading = this.label.B2B_Error_Problem_Loading;
        var errorCheckConnection = this.label.B2B_Error_Check_Connection;
        downloadOTFXTrades({
            fileFormat: fileFormat,
            params: this.filters}).then(response => {
               if (response.success) {
                    if (response.value) {
                        if (response.value.output) {
                            if (response.value.output.documentId) {
                                var documentId = '';    
                                documentId = response.value.output.documentId;
                                var fileName = '';  
                                if (response.value.output.fileName) {
                                    fileName = response.value.output.fileName;
                                }
                                var toastText = this.label.PAY_fileDownloaded;
                                toastText = toastText.replace("{0}", fileName);
                                const evt = new ShowToastEvent({
                                    title: "Download in progress",
                                    message: toastText
                                });
                                this.dispatchEvent(evt);
                                //this.showSuccessToast(this.label.PAY_downloadSuccessful, toastText);
                                resolve(documentId);
                            }else {
                                reject({
                                    'title': errorLoading,
                                    'body': errorCheckConnection,
                                    'noReload': true
                                });
                            }
                        } else {
                            reject({
                                'title': errorLoading,
                                'body': errorCheckConnection,
                                'noReload': true
                            });
                        }
                    } else {
                        reject({
                            'title': errorLoading,
                            'body': errorCheckConnection,
                            'noReload': true
                        });
                    }
                    
                } else {
                    reject({
                        'title': errorLoading,
                        'body': errorCheckConnection,
                        'noReload': true
                    });
                }
        }).catch(error => {
            this.showSpinner = false;
            this.showToast(error.title, error.body, error.noReload);
            if (error) {
                if (error[0] && error[0].message) {
                    console.log('Error message: ' + error[0].message);
                }
            }
        });
        }, this);
    }
    
    getCurrentUserData() {
        var errorLoading = this.label.B2B_Error_Problem_Loading;
        var errorCheckConnection = this.label.B2B_Error_Check_Connection;
        return new Promise( function(resolve, reject) {
            getUserData()
            .then((result) => {
                var currentUser = {};
                //console.log('GAA getCurrentUserData result: ' + JSON.stringify(result.value.userData));
                if (result.success) {
                    if(result.value){
                        if(result.value.userData){
                            currentUser = JSON.parse((JSON.stringify(result.value.userData)));//result.value.userData;
                            this.currentUser = currentUser;
                            resolve(result.value.userData);
                            //resolve(result.value.userData);
                        }else{
                            reject({
                                'title': errorLoading,
                                'body': errorCheckConnection,
                                'noReload': false
                            });
                        }
                    }else{
                        reject({
                            'title': errorLoading,
                            'body': errorCheckConnection,
                            'noReload': false
                        });
                    }                       
                    
                } else {
                    reject({
                        'title': errorLoading,
                        'body': errorCheckConnection,
                        'noReload': false
                    });
                }
            })
            .catch((errors) => {
                console.log('### lwc_paymentsLandingParent ### getCurrentUserData() ::: Catch Error: ' + errors);
                reject({
                    'title': errorLoading,
                    'body': errorCheckConnection,
                    'noReload': false
                });
            })
        }.bind(this)); 
    }

    getFilterStatusValues(context){
        getStatus({'context' : context}).then(response => {
            if (response) {
                for(let index in response){
                    this.statusValues.push(response[index].Status_Label__c);
                }               
            }
        }).finally(() => {
            this.template.querySelector('c-lwc_fx_trades-landing-filters').setFilters();
        }).catch(error => {
            this.error = error;
        }); 
    }

    removeDocument(ID){
        try{
            removeFile({
                id:ID
            })
            .then(result => {
                this.showSpinner = false
            })
            .catch(errors => {
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("### lwc_paymentsLandingParent ### removeFile(event, ID) ::: Catch Error: " + errors);
                }
            })                       
        } catch (e) {
            console.log('### lwc_paymentsLandingParent ### removeFile(event, ID) ::: Catch error: ' + e);
        }
    }
    
    downloadFile(event, documentId) {
        var errorLoading = this.label.B2B_Error_Problem_Loading;
        var errorCheckConnection = this.label.B2B_Error_Check_Connection;
        return new Promise(function(resolve, reject) {
            var baseURL = window.location.origin;
            if(documentId!=null && documentId!='' && documentId!=undefined){
                var downloadURL = baseURL + '/otfx/sfsites/c/sfc/servlet.shepherd/document/download/' + documentId;
                window.location.href = downloadURL;
                //window.location.href = 'https://lwr-santanderonetrade.cs109.force.com/otfx/sfsites/c/sfc/servlet.shepherd/document/download/' + documentId;
                resolve(documentId);
            } else {
                reject({
                    'title': errorLoading,
                    'body': errorCheckConnection,
                    'noReload': true
                });
            }
        },this); 
    }

    showToast(title, body, noReload) {
        this.template.querySelector('c-lwc_b2b_toast').openToast(false, false, title,  body, 'Error', 'warning', 'warning', noReload, true);
    }
    
    showSuccessToast(title, body) {
       this.template.querySelector('c-lwc_b2b_toast').openToast(false, false, title,  body, 'Success', 'success', 'success', true, true);
    }
    
    openDownloadModal() {
            this.showdownloadmodal = true;
    }

    closeModal(){
        this.showdownloadmodal = false;
    }

   
    handleProgressValueChange(event) {
        this.sortData(event.detail.columnName, event.detail.columnOrder);
    
    }
    
    sortData(fieldname, direction) {
        let parseData = JSON.parse(JSON.stringify(this.accountData));
    
        let keyValue = (a) => {
          return a[fieldname];
        };
        let isReverse = direction === "asc" ? 1 : -1;
    
        parseData.sort((x, y) => {
          x = keyValue(x) ? keyValue(x) : "";
          y = keyValue(y) ? keyValue(y) : "";
    
          return isReverse * ((x > y) - (y > x));
        });
    
        this.accountData = parseData;
      }



      handleOrderValueChange(event) {
        //atencion fallo a partir de 11 columnas
        //var columnId = event.target.id.charAt(0);

        const columnId = event.detail.columnId;
        this.columns.forEach (function (column) {
            console.log("id pulsado: "+columnId);
            console.log("id actual: "+column.order);
            console.log("id actual: "+column.key);
            if(column.key==columnId){
                if(column.styleColumn == "button-orderRight icon-arrowDown color:white" || 
                    column.styleColumn == "button-orderRight icon-arrowUp color:white button-orderOpacity"){
                    column.styleColumn="button-orderRight icon-arrowDown color:white button-orderOpacity";
                    column.sortOrder = 'desc';
                }else {
                    column.styleColumn="button-orderRight icon-arrowUp color:white button-orderOpacity";
                    column.sortOrder = 'asc';
                }
                //this.sortData(column.value,column.sortOrder);
            } else {
                column.styleColumn="button-orderRight icon-arrowDown color:white";
            }
        })
    }
    /*get hasNext() {
        
        return this.page < this.pages.length;
    }*/

    getSelectedFilters(event) {   
        console.log('GET SELECTED FILTERS');
        console.log(JSON.stringify(event.detail));
        if(event.detail.filters != null){
            var filterStructure = {
                // "searchId":"",
                // "tradeId":"",
                "status":event.detail.filters.statusSelected, 
                // "counterpartyList":"",
                // "counterparty":"",
                // "productName":"",
                // "fromAmount":"",
                // "toAmount":"",
                // "currency":"",
                "direction":event.detail.filters.directionSelected,
                // "targetAccount":"",
                "currencyPair":event.detail.filters.currencyPairSelected,
                // "fromDateSettlement":"",
                // "toDateSettlement":"",
                // "fromDateCreated":"",
                // "toDateCreated":"",
                // "fromRate":"",
                // "toRate":""
            }

            this.getTradesHandler(JSON.stringify(filterStructure));
        }else{
            const evt = new ShowToastEvent({
                title: "Error on Filters",
                message: 'Event.Detail is undefined'
            });
            this.dispatchEvent(evt);
        }
    console.log(JSON.stringify(filterStructure));
    }

}