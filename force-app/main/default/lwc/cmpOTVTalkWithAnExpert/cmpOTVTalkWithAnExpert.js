import { LightningElement }         from 'lwc';
import { ShowToastEvent }           from 'lightning/platformShowToastEvent';

import { loadStyle }                from 'lightning/platformResourceLoader';
import Santander_Icons              from '@salesforce/resourceUrl/Santander_Icons';
import Images                       from '@salesforce/resourceUrl/Images';
import { NavigationMixin }          from 'lightning/navigation';

import talkWithExpert               from '@salesforce/apex/CNT_OTV_NewCase.talkWithExpert';
import getUserName                  from '@salesforce/apex/CNT_OTV_NewCase.getUserName';

// importing Custom Label
import back                         from '@salesforce/label/c.back';
import cmpOTVTalkWithAnExpert_Error from '@salesforce/label/c.cmpOTVTalkWithAnExpert_Error';
import cmpOTVTalkWithAnExpert_Clear from '@salesforce/label/c.cmpOTVTalkWithAnExpert_Clear';
import cmpOTVTalkWithAnExpert_1     from '@salesforce/label/c.cmpOTVTalkWithAnExpert_1';
import cmpOTVTalkWithAnExpert_2     from '@salesforce/label/c.cmpOTVTalkWithAnExpert_2';
import cmpOTVTalkWithAnExpert_3     from '@salesforce/label/c.cmpOTVTalkWithAnExpert_3';
import cmpOTVTalkWithAnExpert_4     from '@salesforce/label/c.cmpOTVTalkWithAnExpert_4';
import cmpOTVTalkWithAnExpert_5     from '@salesforce/label/c.cmpOTVTalkWithAnExpert_5';
import cmpOTVTalkWithAnExpert_6     from '@salesforce/label/c.cmpOTVTalkWithAnExpert_6';
import cmpOTVTalkWithAnExpert_7     from '@salesforce/label/c.cmpOTVTalkWithAnExpert_7';
import cmpOTVTalkWithAnExpert_8     from '@salesforce/label/c.cmpOTVTalkWithAnExpert_8';
import cmpOTVTalkWithAnExpert_9     from '@salesforce/label/c.cmpOTVTalkWithAnExpert_9';
import cmpOTVTalkWithAnExpert_10    from '@salesforce/label/c.cmpOTVTalkWithAnExpert_10';
import cmpOTVTalkWithAnExpert_11    from '@salesforce/label/c.cmpOTVTalkWithAnExpert_11';
import cmpOTVTalkWithAnExpert_12    from '@salesforce/label/c.cmpOTVTalkWithAnExpert_12';
import cmpOTVTalkWithAnExpert_13    from '@salesforce/label/c.cmpOTVTalkWithAnExpert_13';
import cmpOTVTalkWithAnExpert_14    from '@salesforce/label/c.cmpOTVTalkWithAnExpert_14';

export default class CmpOTVTalkWithAnExpert extends NavigationMixin(LightningElement) {
    valueName = '';
    valueEmail = '';
    valuePhone = '';
    checkboxList = [];

    label = {
        back,
        cmpOTVTalkWithAnExpert_Error,
        cmpOTVTalkWithAnExpert_Clear,
        cmpOTVTalkWithAnExpert_1,
        cmpOTVTalkWithAnExpert_2,
        cmpOTVTalkWithAnExpert_3,
        cmpOTVTalkWithAnExpert_4,
        cmpOTVTalkWithAnExpert_5,
        cmpOTVTalkWithAnExpert_6,
        cmpOTVTalkWithAnExpert_7,
        cmpOTVTalkWithAnExpert_8,
        cmpOTVTalkWithAnExpert_9,
        cmpOTVTalkWithAnExpert_10,
        cmpOTVTalkWithAnExpert_11,
        cmpOTVTalkWithAnExpert_12,
        cmpOTVTalkWithAnExpert_13,
        cmpOTVTalkWithAnExpert_14
    }

    // Expose URL of assets included inside an archive file
    logo = Images + '/logo_symbol_red.svg';
    talkWithExpert = Images + '/illustration-talk-with-an-expert@3x.png';

    renderedCallback() {
        Promise.all([
            loadStyle(this, Santander_Icons + '/style.css'),
        ])


    }

    connectedCallback() {
        getUserName().then((results)=>{
            this.valueName = results;
            console.log('MatrixOwnerName: ' + this.valueName);
        })
    }

    handleEmail(event) {
        this.valueEmail = event.target.value;
    }
    handlePhone(event) {
        this.valuePhone = event.target.value;
    }

    clearEmail(){
        this.valueEmail = '';
    }
    clearPhone(){
        this.valuePhone = '';
    }

    handleCheckbox(event) {
        let newList = this.checkboxList;

        if(event.target.value == "Morning") {
            if(event.target.checked == true) {
                newList.push("Morning");
            } else {
                let index = newList.indexOf("Morning");
                if(index > -1) {
                    newList.splice(index, 1);
                }
            }
        } else if(event.target.value == "Weekdays") {
            if(event.target.checked == true) {
                newList.push("Weekdays");
            } else {
                let index = newList.indexOf("Weekdays");
                if(index > -1) {
                    newList.splice(index, 1);
                }
            }
        } else if(event.target.value == "Afternoon") {
            if(event.target.checked == true) {
                newList.push("Afternoon");
            } else {
                let index = newList.indexOf("Afternoon");
                if(index > -1) {
                    newList.splice(index, 1);
                }
            }
        } else {
            if(event.target.checked == true) {
                newList.push("Weekend");
            } else {
                let index = newList.indexOf("Weekend");
                if(index > -1) {
                    newList.splice(index, 1);
                }
            }
        }

        this.checkboxList = newList;
        console.log(this.checkboxList);
    }

    sendInfo(){
        if (this.valueName == '' || this.valueEmail == '' || this.checkboxList.length == 0) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Name, Email and Reach Time are mandatory fields. Thank you',
                    variant: 'error',
                }),
            );

        } else {
            talkWithExpert({valueName: this.valueName, valueEmail: this.valueEmail, valuePhone: this.valuePhone, timeList: this.checkboxList})
            .then(result => {
                this.result = result;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Your petition was sent succesfully',
                        variant: 'success',
                    }),
                );
                
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

    goBack(){ 
        /*const changeStepEvent = new CustomEvent('changestep', {detail: {step : 0}});
        this.dispatchEvent(changeStepEvent);*/
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