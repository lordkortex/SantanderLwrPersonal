import { LightningElement, wire, api } from 'lwc';

//Labels
import close from '@salesforce/label/c.close';
import yes from '@salesforce/label/c.Yes';
import no from '@salesforce/label/c.No';
import STR_CommitText from '@salesforce/label/c.STR_CommitText';
import STR_DiscardText from '@salesforce/label/c.STR_DiscardText';
import B2B_Error_Problem_Loading from '@salesforce/label/c.B2B_Error_Problem_Loading';
import B2B_Error_Check_Connection from '@salesforce/label/c.B2B_Error_Check_Connection';
import success from '@salesforce/label/c.success';
import cmpOTVParentUsersLanding_2 from '@salesforce/label/c.cmpOTVParentUsersLanding_2';

//Apex
import commitChanges  from '@salesforce/apex/STR_ControllerStructurals.commitChanges';
import discardChanges  from '@salesforce/apex/STR_ControllerStructurals.discardChanges';

export default class CmpCompanyOptions extends LightningElement {
    @api isLoading = false;

    // Expose the labels to use in the template.
    label = {
        close,
        yes,
        no,
        STR_CommitText,
        STR_DiscardText,
        success,
        cmpOTVParentUsersLanding_2,
        B2B_Error_Problem_Loading,
        B2B_Error_Check_Connection
    };

    //Apex
    @wire(commitChanges) apexMethod;
    @wire(discardChanges) apexMethod;

    handleCommit(event) {
        this.isLoading = true;
        commitChanges({companyId: this.parameters.c__companyId})
            .then(result => {
                let self = this;
                if(result.success == true){
                    self.showToast(event, 'success', this.label.success, result.msg);
                    setTimeout(function(){ self.closeModalAndTab(event); }, 1000);
                }
                else {
                    this.isLoading = false;
                    self.showToast(event, 'error', 'Something went wrong', result.msg)
                }
            })
            .catch(error => {
                this.isLoading = false;
                this.showToast(event, 'error', this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection);
            });
    }

    handleDiscard(event) {
        this.isLoading = true;
        discardChanges({companyId: this.parameters.c__companyId})
            .then(result => {
                let self = this;
                if(result.success == true){
                    self.showToast(event, 'success', this.label.success, result.msg);
                    setTimeout(function(){ self.closeModalAndTab(event); }, 1000);
                }
                else {
                    this.isLoading = false;
                    self.showToast(event, 'error', 'Something went wrong', result.msg)
                }
            })
            .catch(error => {
                this.isLoading = false;
                this.showToast(event, 'error', this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection);
            });
    }

    //url parameters
    parameters = {};

    connectedCallback() {
        this.parameters = this.getQueryParameters();
    }

    getQueryParameters() {

        var params = {};
        var search = location.search.substring(1);

        if (search) {
            params = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', (key, value) => {
                return key === "" ? value : decodeURIComponent(value)
            });
        }

        return params;
    }
  
    closeModal(event) {
        event.preventDefault();
        const selectEvent = new CustomEvent('closetab', {
            detail :{ recordId: this.parameters.c__companyId
        }});
        this.dispatchEvent(selectEvent);
    }

    closeModalAndTab(event) {
        event.preventDefault();
        const selectEvent = new CustomEvent('closemaintab', {
            detail :{ recordId: this.parameters.c__companyId
        }});
        this.dispatchEvent(selectEvent);
    }

    showToast(event, mode, title, body) {
        event.preventDefault();
        const selectEvent = new CustomEvent('showtoast', { detail :{
            'mode':mode, 
            'title': title,
            'body': body
        }});
        this.dispatchEvent(selectEvent);
    }
}