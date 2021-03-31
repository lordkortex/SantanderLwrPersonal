import { api, LightningElement } from 'lwc';

//Apex
import releatedFiles from '@salesforce/apex/CNT_FilesUtilities.releatedFiles';

//Labels
import document from '@salesforce/label/c.document';
import PAY_PaymentSummary_upDoc from '@salesforce/label/c.PAY_PaymentSummary_upDoc';
import download from '@salesforce/label/c.download';

export default class CmpDetailUploadedDoc extends LightningElement {

    // Expose the labels to use in the template.
  label = {
    document,
    PAY_PaymentSummary_upDoc,
    download
  };

    //List with retrieved uploaded documents
  @api uploadedDocuments = ['pera','manzana'];
  @api paymentId = '0681j000001SPRGAA4';

  getRelatedFiles() {
    releatedFiles({idParent: this.paymentId})
    .then(data => {
        console.log(data);
        this.uploadedDocuments = data;
    })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error!!',
                    message: error.message,
                    variant: 'error',
                }),
            );
        });
    }

}