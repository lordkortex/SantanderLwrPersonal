import { LightningElement, wire, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

//Labels
import TRS_Authorize from '@salesforce/label/c.TRS_Authorize';
import TRS_Reject from '@salesforce/label/c.TRS_Reject';
import success from '@salesforce/label/c.success';
import B2B_Error_Problem_Loading from '@salesforce/label/c.B2B_Error_Problem_Loading';
import B2B_Error_Check_Connection from '@salesforce/label/c.B2B_Error_Check_Connection';


//Apex
import reject  from '@salesforce/apex/TRS_ControllerFunding.reject';
import authorize  from '@salesforce/apex/TRS_ControllerFunding.authorize';
import createOperation  from '@salesforce/apex/TRS_ControllerFunding.createOperation';
import relateSettlementWithPayment  from '@salesforce/apex/TRS_ControllerFunding.relateSettlementWithPayment';
import execute  from '@salesforce/apex/TRS_ControllerFunding.execute';


export default class FundButtons extends LightningElement {
    // Expose the labels to use in the template.
    label = {
        TRS_Authorize,
        TRS_Reject,
        success,
        B2B_Error_Problem_Loading,
        B2B_Error_Check_Connection
    };

    @api recordId;

    handleReject(event) {
        reject({caseId: this.recordId})
            .then(result => {
                let self = this;
                if(result.success == true){
                    //self.showToast(event, 'success', this.label.success, result.msg);
                }
                else {
                    //self.showToast(event, 'error', 'Something went wrong', result.msg)
                }
            })
            .catch(error => {
                //this.showToast(event, 'error', this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection);
            });
    }

    handleAuthorize(event) {
        authorize({caseId: this.recordId})
            .then(result => {
                let self = this;
                if(result.success == true) {
                    createOperation({caseId: this.recordId})
                    .then(result => {
                        if(result.success == true) {
                            relateSettlementWithPayment({caseId: this.recordId})
                            .then(result => {
                                if(result.success == true) {
                                    execute({caseId: this.recordId})
                                    .then(result => {
                                        if(result.success == true) {
                                            //TODO OK
                                        }
                                        else {
                                            //sendFunding Error: self.showToast(event, 'error', 'Something went wrong', result.msg)
                                        }
                                    })
                                } 
                                else {
                                    //relateSettlementWithPayment Error: self.showToast(event, 'error', 'Something went wrong', result.msg)
                                }
                            })
                        }
                        else {
                             //createOperation Error: self.showToast(event, 'error', 'Something went wrong', result.msg)
                        }
                    })
                }
                else {
                    this.showToast(result.msg, 'error');
                }
            })
            .catch(error => {
                //this.showToast(event, 'error', this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection);
            });
    }

    showToast(msg, mode) {
        const event = new ShowToastEvent({
            title: 'Something went wrong :) ',
            message: msg,
            mode: 'sticky',
            variant: mode
        });
        this.dispatchEvent(event);
    }
}