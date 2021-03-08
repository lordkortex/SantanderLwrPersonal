import { LightningElement, api, track } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
//Import Apex method
import downloadOTFXTrades from '@salesforce/apex/CNT_LWC_FX_TradesLandingParent.downloadOTFXTrades';
import removeFile from '@salesforce/apex/CNT_LWC_FX_TradesLandingParent.removeFile';
//Import labels
import PAY_fileDownloaded from '@salesforce/label/c.PAY_fileDownloaded';
import PAY_downloadSuccessful from '@salesforce/label/c.PAY_downloadSuccessful';
import B2B_Error_Check_Connection from '@salesforce/label/c.B2B_Error_Check_Connection';
import download from '@salesforce/label/c.download';
import B2B_Error_Problem_Loading from '@salesforce/label/c.B2B_Error_Problem_Loading';
import domainCashNexus from '@salesforce/label/c.domainCashNexus';

export default class Lwc_fx_tradesLandingParent extends LightningElement {
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
    @track tradeslist = [];
    @track reload = false;
    @track showSpinner = false;
    filters = '[{"field": "","operator": "","value": ""}]';
    docId = '';

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
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
                    if (response.values) {
                        if (response.value.output) {
                            if (response.value.output.documentId) {
                                var documentId = '';    
                                documentId = response.value.output.documentId;
                                var fileName = '';
                                //throw exception;  
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

    generateObject(){
        var objList = [];
        
    }
}