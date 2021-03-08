import { LightningElement, api, track } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
//Import Apex method
import downloadOTFXTrades from '@salesforce/apex/CNT_LWC_FX_TradesLandingParent.downloadOTFXTrades';
import searchFIlterTrades from '@salesforce/apex/CNT_LWC_FX_TradesLandingParent.searchFIlterTrades';    
import removeFile from '@salesforce/apex/CNT_LWC_FX_TradesLandingParent.removeFile';
//Import labels
import PAY_fileDownloaded from '@salesforce/label/c.PAY_fileDownloaded';
import PAY_downloadSuccessful from '@salesforce/label/c.PAY_downloadSuccessful';
import B2B_Error_Check_Connection from '@salesforce/label/c.B2B_Error_Check_Connection';
import download from '@salesforce/label/c.download';
import B2B_Error_Problem_Loading from '@salesforce/label/c.B2B_Error_Problem_Loading';
import domainCashNexus from '@salesforce/label/c.domainCashNexus';

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

    @track showdownloadmodal = false;
    @track selectedrows = [];
    @track filtercounter = 0;
    @track isallselected = false;
    tradeslist;
    @track reload = false;
    @track showSpinner = false;
    filters = '{"tradeId": "1234", "counterpartyList": [{"counterparty": "008FYA"}]}';
    docId = '';
    @track columns;
    @track rows;

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
       
        this.columns = [
                        {order: "1",
                        styleColumn: "button-orderRight icon-arrowDown color:white",
                        value: "TRANSACTION #",
                        sortable: false,
                        sortOrder: "desc"},
                        {order: "2",
                        styleColumn: "button-orderRight icon-arrowDown color:white",
                        value: "STATUS",
                        sortable: true,
                        sortOrder: "desc"},
                        {order: "3",
                        styleColumn: "button-orderRight icon-arrowDown color:white",
                        value: "PRODUCT",
                        sortable: true,
                        sortOrder: "desc"},
                        {order: "4",
                        styleColumn: "button-orderRight icon-arrowDown color:white",
                        value: "TRADE DATE",
                        sortable: true,
                        sortOrder: "desc"},
                        {order: "5",
                        styleColumn: "button-orderRight icon-arrowDown color:white",
                        value: "SETT DATE",
                        sortable: true,
                        sortOrder: "desc"},
                        {order: "6",
                        styleColumn: "button-orderRight icon-arrowDown color:white",
                        value: "AMOUNT",
                        sortable: true,
                        sortOrder: "desc"},
                        {order: "7",
                        styleColumn: "button-orderRight icon-arrowDown color:white",
                        value: "COUNTER AMT",
                        sortable: true,
                        sortOrder: "desc"},
                        {order: "8",
                        styleColumn: "button-orderRight icon-arrowDown color:white",
                        value: "RATE",
                        sortable: true,
                        sortOrder: "desc"},
                        {order: "9",
                        styleColumn: "button-orderRight icon-arrowDown color:white",
                        value: "TARGET ACCOUNT",
                        sortable: true,
                        sortOrder: "desc"},
            ];
            this.rows = [
            {orderScore: "1",
            columnas : [
                        {order: "1",
                        type: "standard",
                        value: "row1"},
                        {order: "2",
                        type: "status",
                        value: "Draft",
                        status: "001"},
                        {order: "3",
                        type: "standard",
                        value: "row3"},
                        {order: "4",
                        type: "date",
                        value: "2021-02-01T16:23:23.123+0000"},
                        {order: "5",
                        type: "date",
                        value: "2021-02-01T16:23:23.123+0000"},
                        {order: "6",
                        type: "amount",
                        value: "50355",
                        currency: "EUR",
                        side:   "Sell"},
                        {order: "7",
                        type: "amount",
                        value: "13035",
                        currency: "USD",
                        side:   "Buy"},
                        {order: "8",
                        type: "standard",
                        value: "row8"},
                        {order: "9",
                        type: "standard",
                        value: "row9"}
                    ]
            },
            {orderScore: "2",
            columnas : [
                        {order: "1",
                        type: "standard",
                        value: "row1"},
                        {order: "2",
                        type: "status",
                        value: "Pending",
                        status: "002"},
                        {order: "3",
                        type: "standard",
                        value: "row3"},
                        {order: "4",
                        type: "date",
                        value: "2021-02-01T16:23:23.123+0000"},
                        {order: "5",
                        type: "date",
                        value: "2021-02-01T16:23:23.123+0000"},
                        {order: "6",
                        type: "amount",
                        value: "50355",
                        currency: "EUR",
                        side:   "Sell"},
                        {order: "7",
                        type: "amount",
                        value: "13035",
                        currency: "USD",
                        side:   "Buy"},
                        {order: "8",
                        type: "standard",
                        value: "row8"},
                        {order: "9",
                        type: "standard",
                        value: "row9"}
                    ]
            },
        ];
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
            if(documentId!=null && documentId!='' && documentId!=undefined){
                window.location.href = 'https://lwr-santanderonetrade.cs109.force.com/otfx/sfsites/c/sfc/servlet.shepherd/document/download/' + documentId;
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
        //console.log('Recomendador 5.1');
        this.sortData(event.detail.columnName, event.detail.columnOrder);
      }
    sortData(fieldname, direction) {
        //console.log('Recomendador 5.2');
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
            if(column.order==columnId){
                if(column.styleColumn == "button-orderRight icon-arrowDown color:white" || 
                    column.styleColumn == "button-orderRight icon-arrowUp color:white button-orderOpacity"){
                    column.styleColumn="button-orderRight icon-arrowDown color:white button-orderOpacity";
                    column.sortOrder = 'desc';
                }else {
                    column.styleColumn="button-orderRight icon-arrowUp color:white button-orderOpacity";
                    column.sortOrder = 'asc';
                }
                this.sortData(column.value,column.sortOrder);
            } else {
                column.styleColumn="button-orderRight icon-arrowDown color:white";
            }
        })
    }
    get hasNext() {
        //console.log('Recomendador A4.1');
        return this.page < this.pages.length;
    }


}