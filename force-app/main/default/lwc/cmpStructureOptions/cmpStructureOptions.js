import { LightningElement, wire, api } from 'lwc';

//Labels
import close from '@salesforce/label/c.close';
import STR_Limits from '@salesforce/label/c.STR_Limits';
import STR_Signatures from '@salesforce/label/c.STR_Signatures';
import STR_Structures from '@salesforce/label/c.STR_Structures';

//Apex
import retrieveLimits  from '@salesforce/apex/STR_ControllerStructurals.retrieveLimits';
import retrieveRules  from '@salesforce/apex/STR_ControllerStructurals.retrieveRules';

export default class ModalPopupLWC extends LightningElement {
    @api isLoading = false;

    // Expose the labels to use in the template.
    label = {
        close,
        STR_Limits,
        STR_Signatures,
        STR_Structures
    };

    //url parameters
    parameters = {};

    //Apex
    @wire(retrieveLimits) apexMethod;
    @wire(retrieveRules) apexMethod;

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

    updateLimits(event) {
        this.isLoading = true;
        retrieveLimits({accountId: this.parameters.c__accountId})
        .then(result => {
            let self = this;
            if(result.success == true){
                if(result.value != null && result.value.companyId != null){
                    self.goToCompany(event, result.value.companyId);
                }else{
                    this.isLoading = false;
                    self.showToast(event, 'error', this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection);
                }
            }
            else {
                this.isLoading = false;
                self.showToast(event, 'error', 'Something went wrong.', result.msg)
            }
        })
        .catch(error => {
            this.isLoading = false;
            this.showToast(event, 'error', this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection);
        });
    }

    updateSignatures(event) {
        this.isLoading = true;
        retrieveRules({accountId: this.parameters.c__accountId})
        .then(result => {
            let self = this;
            if(result.success == true){
                if(result.value != null && result.value.companyId != null){
                    self.goToCompany(event, result.value.companyId);
                }else{
                    this.isLoading = false;
                    self.showToast(event, 'error', this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection);
                }
            }
            else {
                this.isLoading = false;
                self.showToast(event, 'error', 'Something went wrong.', result.msg)
            }
        })
        .catch(error => {
            this.isLoading = false;
            this.showToast(event, 'error', this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection);
        });
    }

    closeModal(event) {
        event.preventDefault();
        const selectEvent = new CustomEvent('closetab', {
            detail :{ recordId: this.parameters.c__accountId
        }});
        this.dispatchEvent(selectEvent);
    }

    goToCompany(event, companyId) {
        event.preventDefault();
        const selectEvent = new CustomEvent('closetab', {
            detail :{ recordId: companyId
        }});
        this.dispatchEvent(selectEvent);
    }

    showModal(event, mode, title, body) {
        event.preventDefault();
        const selectEvent = new CustomEvent('closetab', {detail :{
            'mode':mode, 
            'title': title,
            'body': body
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