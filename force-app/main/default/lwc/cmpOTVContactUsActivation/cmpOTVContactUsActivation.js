import { LightningElement,api}       from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// importing Resources
import { loadStyle }                    from 'lightning/platformResourceLoader';
import Santander_Icons                  from '@salesforce/resourceUrl/Santander_Icons';
import images                           from '@salesforce/resourceUrl/Images';

import { NavigationMixin }              from 'lightning/navigation';
import createCase                       from '@salesforce/apex/CNT_OTV_CaseManagement.createCase';

// importing Custom Label
import cmpOTVContactUsActivation_1     from '@salesforce/label/c.cmpOTVContactUsActivation_1';
import cmpOTVContactUsActivation_2     from '@salesforce/label/c.cmpOTVContactUsActivation_2';
import cmpOTVContactUsActivation_3     from '@salesforce/label/c.cmpOTVContactUsActivation_3';
import cmpOTVContactUsActivation_4     from '@salesforce/label/c.cmpOTVContactUsActivation_4';
import cmpOTVContactUsActivation_5     from '@salesforce/label/c.cmpOTVContactUsActivation_5';
import cmpOTVContactUsActivation_6     from '@salesforce/label/c.cmpOTVContactUsActivation_6';
import cmpOTVContactUsActivation_7     from '@salesforce/label/c.cmpOTVContactUsActivation_7';
import cmpOTVContactUsActivation_8     from '@salesforce/label/c.cmpOTVContactUsActivation_8';
import cmpOTVContactUsActivation_9     from '@salesforce/label/c.cmpOTVContactUsActivation_9';
import cmpOTVContactUsActivation_10     from '@salesforce/label/c.cmpOTVContactUsActivation_10';
import cmpOTVContactUsActivation_11     from '@salesforce/label/c.cmpOTVContactUsActivation_11';
import cmpOTVContactUsActivation_12     from '@salesforce/label/c.cmpOTVContactUsActivation_12';
import cmpOTVContactUsActivation_13     from '@salesforce/label/c.cmpOTVContactUsActivation_13';
import cmpOTVContactUsActivation_14     from '@salesforce/label/c.cmpOTVContactUsActivation_14';
import cmpOTVContactUsActivation_15     from '@salesforce/label/c.cmpOTVContactUsActivation_15';
import cmpOTVContactUsActivation_16     from '@salesforce/label/c.cmpOTVContactUsActivation_16';
import cmpOTVContactUsActivation_17     from '@salesforce/label/c.cmpOTVContactUsActivation_17';
import cmpOTVContactUsActivation_18     from '@salesforce/label/c.cmpOTVContactUsActivation_18';
import cmpOTVContactUsActivation_19     from '@salesforce/label/c.cmpOTVContactUsActivation_19';
import cmpOTVContactUsActivation_20     from '@salesforce/label/c.cmpOTVContactUsActivation_20';
import cmpOTVContactUsActivation_21     from '@salesforce/label/c.cmpOTVContactUsActivation_21';
import cmpOTVContactUsActivation_22     from '@salesforce/label/c.cmpOTVContactUsActivation_22';
import cmpOTVContactUsActivation_23     from '@salesforce/label/c.cmpOTVContactUsActivation_23';
import cmpOTVContactUsActivation_24     from '@salesforce/label/c.cmpOTVContactUsActivation_24';
import cmpOTVContactUsActivation_25     from '@salesforce/label/c.cmpOTVContactUsActivation_25';
import cmpOTVContactUsActivation_26     from '@salesforce/label/c.cmpOTVContactUsActivation_26';
import cmpOTVContactUsActivation_27     from '@salesforce/label/c.cmpOTVContactUsActivation_27';
import Show_More                        from '@salesforce/label/c.Show_More';

export default class CmpOTVContactUsActivation extends NavigationMixin(LightningElement) {
    label = {
        Show_More,
        cmpOTVContactUsActivation_1,
        cmpOTVContactUsActivation_2,
        cmpOTVContactUsActivation_3,
        cmpOTVContactUsActivation_4,
        cmpOTVContactUsActivation_5,
        cmpOTVContactUsActivation_6,
        cmpOTVContactUsActivation_7,
        cmpOTVContactUsActivation_8,
        cmpOTVContactUsActivation_9,
        cmpOTVContactUsActivation_10,
        cmpOTVContactUsActivation_11,
        cmpOTVContactUsActivation_12,
        cmpOTVContactUsActivation_13,
        cmpOTVContactUsActivation_14,
        cmpOTVContactUsActivation_15,
        cmpOTVContactUsActivation_16,
        cmpOTVContactUsActivation_17,
        cmpOTVContactUsActivation_18,
        cmpOTVContactUsActivation_19,
        cmpOTVContactUsActivation_20,
        cmpOTVContactUsActivation_21,
        cmpOTVContactUsActivation_22,
        cmpOTVContactUsActivation_23,
        cmpOTVContactUsActivation_24,
        cmpOTVContactUsActivation_25,
        cmpOTVContactUsActivation_26,
        cmpOTVContactUsActivation_27
    };
    // Expose URL of assets included inside an archive file
    loader = images + '/BS_s-loader.gif';
    //DROPDOWN ATTRIBUTES
    value = [cmpOTVContactUsActivation_5,cmpOTVContactUsActivation_23,cmpOTVContactUsActivation_24];
    values2 = [cmpOTVContactUsActivation_8,cmpOTVContactUsActivation_25,cmpOTVContactUsActivation_26,cmpOTVContactUsActivation_27];
    selectedTopic;
    selectedIssue;
    description = '';
    selectedFiles = [];
    helpTextDropdown = Show_More;
    showModal = true;
    @api fromStep;

    //ATTACHMENT ATTRIBUTES
    uploadedFile = cmpOTVContactUsActivation_16;

    renderedCallback() {
        Promise.all([
            loadStyle(this, Santander_Icons + '/style.css'),
        ])
    }
    /*get condition(){
        var x = this.template.querySelector('[data-id="slds-dropdown__item"]');
        console.log(x.id);
        if(x.id != "slds-dropdown__item"){
            x.className = "slds-dropdown__item slds-is-selected"
        }
        return true;
        //item == v.selectedValue ? 'slds-dropdown__item ' :
    }*/

    selectTopic (event) {
        console.log(event.target.outerText);
        this.selectedTopic = event.target.outerText;
    }

    selectIssue (event) {
        console.log(event.target.outerText);
        this.selectedIssue = event.target.outerText;
    }

    handleDescription(event) {
        this.description = event.target.value;
    }

    attachFile() {
        this.template.querySelector('[data-id="real-file"]').click();
    }

    @api recordId;
    fileData
    uploadedFiles(event) {
        this.uploadedFile = event.target.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
        console.log(this.uploadedFile);

        const file = event.target.files[0]
        var reader = new FileReader()
        reader.onload = () => {
            var base64 = reader.result.split(',')[1]
            this.fileData = {
                'filename': file.name,
                'base64': base64
            }
            console.log(this.fileData)
        }
        reader.readAsDataURL(file)
    }

    submitCase(){
        if(this.fileData != undefined) {
            console.log(this.fileData.filename);
            console.log(this.fileData.base64);
            console.log(this.fileData.recordId);

            createCase({valueTopic: this.selectedTopic, valueIssue: this.selectedIssue, description: this.description, fileName: this.fileData.filename, base64: this.fileData.base64})
            .then(result => {
                this.result = result;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Your petition was sent succesfully',
                        variant: 'success',
                    }),
                );

                const changeStepEvent = new CustomEvent('changestep', {detail: {step : this.fromStep}});
                this.dispatchEvent(changeStepEvent);
            })
            .catch(error => {
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: error.body.pageErrors[0].message,
                        variant: 'error',
                    }),
                );
            });
        } else {
            createCase({valueTopic: this.selectedTopic, valueIssue: this.selectedIssue, description: this.description})
            .then(result => {
                this.result = result;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Your petition was sent succesfully',
                        variant: 'success',
                    }),
                );

                const changeStepEvent = new CustomEvent('changestep', {detail: {step : this.fromStep}});
                this.dispatchEvent(changeStepEvent);
            })
            .catch(error => {
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: error.body.pageErrors[0].message,
                        variant: 'error',
                    }),
                );
            });
        }
    }

    closeModal(){
        const changeStepEvent = new CustomEvent('changestep', {detail: {step : this.fromStep}});
        this.dispatchEvent(changeStepEvent);
    }
    
}