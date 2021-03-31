import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import createCase from '@salesforce/apex/CNT_OTV_NewCase.createCase';

export default class CmpOTVNewCase extends LightningElement {
    valueTopic = '';
    description = '';
    valueIssue = '';
    uploadedFiles = [];
    uploadedFileNames = '';
    showModal = true;

    get optionsTopic() {
        return [
            { label: 'Subsidiaries issues', value: 'Subsidiaries issues' },
            { label: 'Test', value: 'Test' },
            { label: 'Test 2', value: 'Test 2' },
        ];
    }

    get optionsIssue() {
        return [
            { label: 'Wrong subsidirary', value: 'Wrong subsidirary' },
            { label: 'Test 3', value: 'Test 3' },
            { label: 'Test 4', value: 'Test 4' },
        ];
    }

    handleTopic(event) {
        this.valueTopic = event.detail.value;
    }
    handleIssue(event) {
        this.valueIssue = event.detail.value;
    }
    handleDescription(event) {
        this.description = event.detail.value;
    }

    submitCase(){
        createCase({valueTopic: this.valueTopic, valueIssue: this.valueIssue, description: this.description, uploadedFiles: this.uploadedFiles})
        .catch(error => {
            this.error = error;
            console.log(error);
        });
        this.showModal = false;
    }

    @api recordId;
    get acceptedFormats() {
        return ['.pdf', '.png','.jpg','.jpeg', '.log', '.txt', '.xml', '.docx'];
    }
    handleUploadFinished(event) {
        // Get the list of uploaded files
        this.uploadedFiles = event.detail.files;
        let toastMessage = '';

        for(let i = 0; i < this.uploadedFiles.length; i++) {
            i != (this.uploadedFiles.length - 1) ? this.uploadedFileNames += this.uploadedFiles[i].name + ', ' : this.uploadedFileNames += this.uploadedFiles[i].name + '.';
        }

        this.uploadedFiles.length > 1 ? toastMessage = ' Files uploaded successfully: ' : toastMessage = ' File uploaded successfully: ';

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: this.uploadedFiles.length + toastMessage + this.uploadedFileNames,
                variant: 'success',
            }),
        );
    }
}