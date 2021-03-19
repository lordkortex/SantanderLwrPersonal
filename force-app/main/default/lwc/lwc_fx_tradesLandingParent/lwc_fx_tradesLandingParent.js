import { LightningElement, api, track } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";
//Import styles
import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";

//Import labels
import PAY_fileDownloaded from "@salesforce/label/c.PAY_fileDownloaded";
import PAY_downloadSuccessful from "@salesforce/label/c.PAY_downloadSuccessful";
import B2B_Error_Check_Connection from "@salesforce/label/c.B2B_Error_Check_Connection";
import download from "@salesforce/label/c.download";
import B2B_Error_Problem_Loading from "@salesforce/label/c.B2B_Error_Problem_Loading";
import domainCashNexus from "@salesforce/label/c.domainCashNexus";

export default class Lwc_fx_tradesLandingParent extends LightningElement {
  //Labels
  label = {
    B2B_Error_Check_Connection,
    B2B_Error_Problem_Loading,
    PAY_fileDownloaded,
    PAY_downloadSuccessful,
    download,
    domainCashNexus
  };

  // @track showdownloadmodal = false;
  // @track selectedrows = [];
  // @track filtercounter = 0;
  // @track isallselected = false;
  // @track tradeslist=[];
  // @track reload = false;
  // @track showSpinner = false;
  // filters = '{}';
  // docId = '';
  // @track columns;
  // @track rows;

  connectedCallback() {
    loadStyle(this, santanderStyle + "/style.css");
    //this.getTradesHandler();
  }
  // getTradesHandler() {
  //     var jsonFilter = this.filters;
  //     searchFIlterTrades({'parameters' : jsonFilter}).then(result => {
  //         console.log('afer');
  //         this.tradeslist = result;
  //     }).catch(error => {
  //         this.error = error;
  //     });
  // }

  // handleDownload(event) {
  //     this.showdownloadmodal = false;
  //     this.showSpinner = true;
  //     let params = event.detail;

  //      let fileFormat = "";
  //      if (params) {
  //          fileFormat = params;
  //      }
  //      this.getDocumentId(fileFormat)
  //      .then((documentId) => {
  //         this.docId = documentId;
  //         this.downloadFile(event, documentId);
  //      })
  //      .catch((error) => {
  //         this.showToast(error.title, error.body, error.noReload);
  //     })
  //     .finally(() => this.removeDocument(this.docId));
  //     // .then((documentId) => {

  //      //})
  //  }

  //  getDocumentId(fileFormat) {
  //     return new Promise((resolve, reject) => {
  //     var errorLoading = this.label.B2B_Error_Problem_Loading;
  //     var errorCheckConnection = this.label.B2B_Error_Check_Connection;
  //     downloadOTFXTrades({
  //         fileFormat: fileFormat,
  //         params: this.filters}).then(response => {
  //            if (response.success) {
  //                 if (response.value) {
  //                     if (response.value.output) {
  //                         if (response.value.output.documentId) {
  //                             var documentId = '';
  //                             documentId = response.value.output.documentId;
  //                             var fileName = '';
  //                             if (response.value.output.fileName) {
  //                                 fileName = response.value.output.fileName;
  //                             }
  //                             var toastText = this.label.PAY_fileDownloaded;
  //                             toastText = toastText.replace("{0}", fileName);
  //                             //this.showSuccessToast(this.label.PAY_downloadSuccessful, toastText);
  //                             resolve(documentId);
  //                         }else {
  //                             reject({
  //                                 'title': errorLoading,
  //                                 'body': errorCheckConnection,
  //                                 'noReload': true
  //                             });
  //                         }
  //                     } else {
  //                         reject({
  //                             'title': errorLoading,
  //                             'body': errorCheckConnection,
  //                             'noReload': true
  //                         });
  //                     }
  //                 } else {
  //                     reject({
  //                         'title': errorLoading,
  //                         'body': errorCheckConnection,
  //                         'noReload': true
  //                     });
  //                 }

  //             } else {
  //                 reject({
  //                     'title': errorLoading,
  //                     'body': errorCheckConnection,
  //                     'noReload': true
  //                 });
  //             }
  //     }).catch(error => {
  //         this.showSpinner = false;
  //         if (error) {
  //             if (error[0] && error[0].message) {
  //                 console.log('Error message: ' + error[0].message);
  //             }
  //         }
  //     });
  //     }, this);
  // }

  // removeDocument(ID){
  //     try{
  //         removeFile({
  //             id:ID
  //         })
  //         .then(result => {
  //             this.showSpinner = false
  //         })
  //         .catch(errors => {
  //             if (errors) {
  //                 if (errors[0] && errors[0].message) {
  //                     console.log("Error message: " + errors[0].message);
  //                 }
  //             } else {
  //                 console.log("### lwc_paymentsLandingParent ### removeFile(event, ID) ::: Catch Error: " + errors);
  //             }
  //         })
  //     } catch (e) {
  //         console.log('### lwc_paymentsLandingParent ### removeFile(event, ID) ::: Catch error: ' + e);
  //     }
  // }

  // downloadFile(event, documentId) {
  //     var errorLoading = this.label.B2B_Error_Problem_Loading;
  //     var errorCheckConnection = this.label.B2B_Error_Check_Connection;
  //     return new Promise(function(resolve, reject) {
  //         if(documentId!=null && documentId!='' && documentId!=undefined){
  //             window.location.href = 'https://lwr-santanderonetrade.cs109.force.com/otfx/sfsites/c/sfc/servlet.shepherd/document/download/' + documentId;
  //             resolve(documentId);
  //         } else {
  //             reject({
  //                 'title': errorLoading,
  //                 'body': errorCheckConnection,
  //                 'noReload': true
  //             });
  //         }
  //     },this);
  // }

  // showToast(title, body, noReload) {
  //     this.template.querySelector('c-lwc_b2b_toast').openToast(false, false, title,  body, 'Error', 'warning', 'warning', noReload, true);
  // }

  // showSuccessToast(title, body) {
  //    this.template.querySelector('c-lwc_b2b_toast').openToast(false, false, title,  body, 'Success', 'success', 'success', true, true);
  // }

  // openDownloadModal() {
  //         this.showdownloadmodal = true;
  // }

  // closeModal(){
  //     this.showdownloadmodal = false;
  // }

  // handleProgressValueChange(event) {
  //     //console.log('Recomendador 5.1');
  //     this.sortData(event.detail.columnName, event.detail.columnOrder);
  //   }
  // sortData(fieldname, direction) {
  //     //console.log('Recomendador 5.2');
  //     let parseData = JSON.parse(JSON.stringify(this.accountData));

  //     let keyValue = (a) => {
  //       return a[fieldname];
  //     };
  //     let isReverse = direction === "asc" ? 1 : -1;

  //     parseData.sort((x, y) => {
  //       x = keyValue(x) ? keyValue(x) : "";
  //       y = keyValue(y) ? keyValue(y) : "";

  //       return isReverse * ((x > y) - (y > x));
  //     });

  //     this.accountData = parseData;
  //   }

  //   handleOrderValueChange(event) {
  //     //atencion fallo a partir de 11 columnas
  //     //var columnId = event.target.id.charAt(0);

  //     const columnId = event.detail.columnId;
  //     console.log('//////' + columnId);
  //     console.log('//////' + JSON.stringify(this.columns));
  //     this.columns.forEach (function (column) {
  //         console.log('\\\\\\' + column.order);
  //         if(column.order==columnId){
  //             console.log('coincidencia1 '+columnId);
  //             console.log('coincidencia2 '+column.order);
  //             if(column.styleColumn == "button-orderRight icon-arrowDown color:white" ||
  //                 column.styleColumn == "button-orderRight icon-arrowUp color:white button-orderOpacity"){
  //                 column.styleColumn="button-orderRight icon-arrowDown color:white button-orderOpacity";
  //                 column.sortOrder = 'desc';
  //             }else {
  //                 column.styleColumn="button-orderRight icon-arrowUp color:white button-orderOpacity";
  //                 column.sortOrder = 'asc';
  //             }
  //             /*var columnNameInput = column.value;
  //             var columnOrderInput = column.sortOrder;

  //             const selectedEvent = new CustomEvent("progressvaluechange", {
  //                 detail: {
  //                   columnName: columnNameInput , columnOrder: columnOrderInput
  //                 }
  //             });

  //             this.dispatchEvent(selectedEvent);*/
  //         } else {
  //             column.styleColumn="button-orderRight icon-arrowDown color:white";
  //         }
  //     })
  //     console.log('//////after' + JSON.stringify(this.columns));
  // }
}
