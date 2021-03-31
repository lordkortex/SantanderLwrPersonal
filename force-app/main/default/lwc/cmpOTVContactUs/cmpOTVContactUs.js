import { LightningElement,api } from 'lwc';

import { loadStyle }                   from 'lightning/platformResourceLoader';
import { ShowToastEvent }              from 'lightning/platformShowToastEvent';
import Santander_Icons                 from '@salesforce/resourceUrl/Santander_Icons';
import custom_css_LWC                  from '@salesforce/resourceUrl/lwc_activation_contactus';

import createCase                      from '@salesforce/apex/CNT_OTV_CaseManagement.createCase';
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
import cmpOTVContactUsActivation_10    from '@salesforce/label/c.cmpOTVContactUsActivation_10';
import cmpOTVContactUsActivation_11    from '@salesforce/label/c.cmpOTVContactUsActivation_11';
import cmpOTVContactUsActivation_12    from '@salesforce/label/c.cmpOTVContactUsActivation_12';
import cmpOTVContactUsActivation_13    from '@salesforce/label/c.cmpOTVContactUsActivation_13';
import cmpOTVContactUsActivation_14    from '@salesforce/label/c.cmpOTVContactUsActivation_14';
import cmpOTVContactUsActivation_15    from '@salesforce/label/c.cmpOTVContactUsActivation_15';
import cmpOTVContactUsActivation_16    from '@salesforce/label/c.cmpOTVContactUsActivation_16';
import cmpOTVContactUsActivation_17    from '@salesforce/label/c.cmpOTVContactUsActivation_17';
import cmpOTVContactUsActivation_18    from '@salesforce/label/c.cmpOTVContactUsActivation_18';
import cmpOTVContactUsActivation_19    from '@salesforce/label/c.cmpOTVContactUsActivation_19';
import cmpOTVContactUsActivation_20    from '@salesforce/label/c.cmpOTVContactUsActivation_20';
import cmpOTVContactUsActivation_21    from '@salesforce/label/c.cmpOTVContactUsActivation_21';
import cmpOTVContactUsActivation_22    from '@salesforce/label/c.cmpOTVContactUsActivation_22';
import cmpOTVContactUsActivation_23    from '@salesforce/label/c.cmpOTVContactUsActivation_23';
import cmpOTVContactUsActivation_24    from '@salesforce/label/c.cmpOTVContactUsActivation_24';
import cmpOTVContactUsActivation_25    from '@salesforce/label/c.cmpOTVContactUsActivation_25';
import cmpOTVContactUsActivation_26    from '@salesforce/label/c.cmpOTVContactUsActivation_26';
import cmpOTVContactUsActivation_27    from '@salesforce/label/c.cmpOTVContactUsActivation_27';
import Show_More                       from '@salesforce/label/c.Show_More';

export default class CmpOTVContactUs extends LightningElement {

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
    arrayOptionsTopic = [{ label: this.label.cmpOTVContactUsActivation_5,  value: this.label.cmpOTVContactUsActivation_5},
                         { label: this.label.cmpOTVContactUsActivation_23, value: this.label.cmpOTVContactUsActivation_23},
                         { label: this.label.cmpOTVContactUsActivation_24, value: this.label.cmpOTVContactUsActivation_24}
                        ];
    arrayOptionsDetail = [{ label: this.label.cmpOTVContactUsActivation_8,  value: this.label.cmpOTVContactUsActivation_8},
                          { label: this.label.cmpOTVContactUsActivation_25, value: this.label.cmpOTVContactUsActivation_25},
                          { label: this.label.cmpOTVContactUsActivation_26, value: this.label.cmpOTVContactUsActivation_26},
                          { label: this.label.cmpOTVContactUsActivation_27, value: this.label.cmpOTVContactUsActivation_27}
                         ];
    title = cmpOTVContactUsActivation_2;
    subtitle = cmpOTVContactUsActivation_2;
    topicPlaceholder = cmpOTVContactUsActivation_4;
    detailPlaceholder = cmpOTVContactUsActivation_7;
    titleTopic;
    titleDetail;
    termsAccepted = false;
    selectedTopic;
    selectedIssue;
    description;
    name;
    dataFile;
    loading = false;
    variant= 'label-hidden';
    isTopicSelected = false;
    isIssueSelected = false;
    
    connectedCallback() {
        loadStyle(this, Santander_Icons + '/style.css'),
        loadStyle(this, custom_css_LWC);
    } 

    changeTopic(event){
        this.titleTopic = this.topicPlaceholder;
        this.variant = null;
        this.isTopicSelected = true;
        this.selectedTopic = event.detail.selectedValue;
        this.checkInputs();
    }

    changeDetail(event){
        this.titleDetail = this.detailPlaceholder;
        this.variant = null;
        this.isIssueSelected = true;
        this.selectedIssue = event.detail.selectedValue;
        this.checkInputs();
    }

    changeDescription(event){
        console.log('llega ' + event.detail.description);
        this.description = event.detail.description;
        this.checkInputs();
    }

    checkInputs(){
        //TOPIC
        this.template.querySelectorAll('[data-id =topic]').forEach(element => {
            if(this.selectedTopic == null || this.selectedTopic == ''){
                element.className ="dropdown_single small sky error";
            }else{
                element.className ="dropdown_single small sky";
            }
        }) 
        //ISSUE DETAIL
        this.template.querySelectorAll('[data-id =detail]').forEach(element => {
            if(this.selectedIssue == null || this.selectedIssue == ''){
                element.className ="dropdown_single small sky error";
            }else{
                element.className ="dropdown_single small sky";
            }
        }) 
        //DESCRIPTION
        this.template.querySelectorAll('[data-id =description]').forEach(element => {
            if(this.description == null || this.description == ''){
                element.className ="sky error";
            }else{
                element.className ="sky";
            }
        })
    }

    changeFiles(event){
        this.dataFile = event.detail.dataFile;
    }

    submitCase(){
        this.checkInputs();
        console.log(this.selectedTopic);
        console.log(this.selectedIssue);
        console.log(this.description);
        if((this.selectedTopic != null && this.selectedIssue != null) && this.description){
            if(this.fileData != undefined) {
                console.log(this.fileData.filename);
                console.log(this.fileData.base64);
                // console.log(this.fileData.recordId);

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
                }).finally(()=>{
                    this.goBack();
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
                }).finally(()=>{
                    this.goBack();
                });
            }
            
        }
    }

    goBack(){
        try {
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    name: "Home"
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}