import { LightningElement,api}         from 'lwc';
import { ShowToastEvent }           from 'lightning/platformShowToastEvent';

import { loadStyle }                from 'lightning/platformResourceLoader';
import Santander_Icons              from '@salesforce/resourceUrl/Santander_Icons';
import Images                       from '@salesforce/resourceUrl/Images';
import lwc_talk_with_expert         from '@salesforce/resourceUrl/lwc_talk_with_expert';
import { NavigationMixin }          from 'lightning/navigation';

import talkWithExpert               from '@salesforce/apex/CNT_OTV_TalkWithAnExpert.talkWithExpert';
import getUserName                  from '@salesforce/apex/CNT_OTV_TalkWithAnExpert.getUserName';
import getUserInfo                  from '@salesforce/apex/CNT_OTV_TalkWithAnExpert.getUserInfo';

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
import cmpOTVTalkWithAnExpert_15    from '@salesforce/label/c.cmpOTVTalkWithAnExpert_15';
import cmpOTVTalkWithAnExpert_16    from '@salesforce/label/c.cmpOTVTalkWithAnExpert_16';
import cmpOTVTalkWithAnExpert_17    from '@salesforce/label/c.cmpOTVTalkWithAnExpert_17';
import cmpOTVTalkWithAnExpert_18    from '@salesforce/label/c.cmpOTVTalkWithAnExpert_18';

export default class CmpOTVTalkWithAnExpert extends NavigationMixin(LightningElement) {
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
        cmpOTVTalkWithAnExpert_14,
        cmpOTVTalkWithAnExpert_15,
        cmpOTVTalkWithAnExpert_16,
        cmpOTVTalkWithAnExpert_17,
        cmpOTVTalkWithAnExpert_18
    }
    @api user;
    valueName = '';
    valueEmail = '';
    valuePhone = '';
    valueCompany = '';
    valueCountry = '';
    checkboxList = [];
    countriesLst = [];
    placeholder = cmpOTVTalkWithAnExpert_15;
    title;
    countrySelected;
    sign = false;
    error;
    isLoading = true;

    morning   = [{label: cmpOTVTalkWithAnExpert_10, value: 'morning'}];
    weekdays  = [{label: cmpOTVTalkWithAnExpert_11, value: 'Weekdays'}];
    afternoon = [{label: cmpOTVTalkWithAnExpert_12, value: 'Afternoon'}];
    weekend   = [{label: cmpOTVTalkWithAnExpert_13, value: 'Weekend'}];
    dataPolicyOptions = [{value: 'true'}];
    // Expose URL of assets included inside an archive file
    logo = Images + '/logo_symbol_red.svg';
    talkWithExpert = Images + '/illustration-talk-with-an-expert@3x.png';

    connectedCallback() {
        Promise.all([
            loadStyle(this, Santander_Icons + '/style.css'),
        ])
        getUserInfo().then((results)=>{
            this.user = results;
            console.log('getUserInfo: ');
            this.valueName      = this.user.Name;
            this.valueCountry   = this.user.Country;
            this.valueCompany   = this.user.Company;
            this.valueEmail     = this.user.Email;
            this.valuePhone     = this.user.Phone;
        
        }).catch(error => {
            console.log(error);
        }).finally(() =>{
            this.isLoading = false;
        });
        console.log('usuario');
        console.log(this.user);
    }

    renderedCallback(){
        loadStyle(this,lwc_talk_with_expert)
    }

    handleEmail(event) {
        this.valueEmail = event.target.value;
    }
    handlePhone(event) {
        this.valuePhone = event.target.value;
    }
    handleCompany(event) {
        this.valueCompany = event.target.value;
    }
    handleCountry(event) {
        this.valueCountry = event.target.value;
    }

    clearEmail(){
        this.valueEmail = '';
    }
    clearPhone(){
        this.valuePhone = '';
    }
    clearCompany(){
        this.valueCompany = '';
    }
    clearCountry(){
        this.valueCountry = '';
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

    changeOption(event){
        this.countrySelected = event.detail.country;
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
            talkWithExpert({valueName: this.valueName, 
                            valueEmail: this.valueEmail, 
                            valuePhone: this.valuePhone, 
                            valueCompany: this.valueCompany, 
                            valueCountry: this.valueCountry, 
                            timeList: this.checkboxList})
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
                console.log(error);
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

    changeDataPolicy(event){
        this.sign = !this.sign;
    }

    get nameNull(){
        console.log('Llegaw');
        console.log('Llega' + this.user.Name);
        if(this.user.Name == '' || this.user.Name == null){
            return true;
        }else{
            return false;
        }
    }
    get emailNull(){
        if(this.user.Email == '' || this.user.Email == null){
            return true;
        }else{
            return false;
        }
    }
    get phoneNull(){
        if(this.user.Phone == '' || this.user.Phone == null){
            return true;
        }else{
            return false;
        }
    }
    get companyNull(){
        if(this.user.Company == '' || this.user.Company == null){
            return true;
        }else{
            return false;
        }
    }
    get countryNull(){
        if(this.user.Country == '' || this.user.Country == null){
            return true;
        }else{
            return false;
        }
    }
}