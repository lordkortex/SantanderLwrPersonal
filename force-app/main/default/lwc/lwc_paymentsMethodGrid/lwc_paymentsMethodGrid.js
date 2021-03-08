import { LightningElement, api, track } from 'lwc';

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { loadStyle } from 'lightning/platformResourceLoader';

//Labels
import instantTransfer from '@salesforce/label/c.instantTransfer';
import PAY_betweenMyAccounts from '@salesforce/label/c.PAY_betweenMyAccounts';
import PAY_Type_Single from '@salesforce/label/c.PAY_Type_Single';
import PAY_DomesticTransfer from '@salesforce/label/c.PAY_DomesticTransfer';
import PAY_toThirdParties from '@salesforce/label/c.PAY_toThirdParties';
import PAY_Type_Multiple from '@salesforce/label/c.PAY_Type_Multiple';
import PAY_InternationalTransfer from '@salesforce/label/c.PAY_InternationalTransfer';
import PAY_OtherPayments from '@salesforce/label/c.PAY_OtherPayments';
import Show_More from '@salesforce/label/c.Show_More';
import Country from '@salesforce/label/c.Country';
import IncorrectInputFormat from '@salesforce/label/c.IncorrectInputFormat';
import PTT_instant_transfer from '@salesforce/label/c.PTT_instant_transfer';
import B2B_no_Origin_Accounts from '@salesforce/label/c.B2B_no_Origin_Accounts';
import PTT_international_transfer_multiple from '@salesforce/label/c.PTT_international_transfer_multiple';
import PTT_international_transfer_single from '@salesforce/label/c.PTT_international_transfer_single';

//Import Apex
//import encryptData from '@salesforce/apex/CNT_PaymentsMethod.encryptData';
import checkTypeAvailable from '@salesforce/apex/CNT_PaymentsMethod.checkTypeAvailable';

//Import Navigation
import { NavigationMixin } from 'lightning/navigation';

export default class Lwc_paymentsMethodGrid extends NavigationMixin(LightningElement) {
    label = {
        instantTransfer,
        PAY_betweenMyAccounts,
        PAY_Type_Single,
        PAY_DomesticTransfer,
        PAY_toThirdParties,
        PAY_Type_Multiple,
        PAY_InternationalTransfer,
        PAY_OtherPayments,
        Show_More,
        Country,
        IncorrectInputFormat,
        PTT_instant_transfer,
        B2B_no_Origin_Accounts,
        PTT_international_transfer_multiple,
        PTT_international_transfer_single,


    };

    @api countrydropdownlist = []; //List of values to populate the dropdown
    @api showtoast; //Indicates if the toast is shown.
    selectedCountry = ''; //Selected option from the dropdown
    helpTextDropdown = 'Show More'; //Dropdown help text
    bookToBookPage = 'payments-b2b';
    singlePage = 'payments-single';

    @track issimpledropdown = true;
    @track isdisabled = false;
    
    @api userdata = {};
    @api transfertypeparams// = {};
    @api spinner = false;   


    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        this.checkTypeAvailable();
    }

    checkTypeAvailable(){
        let transferTypeParams = this.transfertypeparams;
        //if (transferTypeParams != null && transferTypeParams != undefined && transferTypeParams != {}) {}
        if (transferTypeParams) {}
        else {
            this.spinner = true;
            let userData = this.userdata;
            checkTypeAvailable({
                'userData': userData
            })
            .then ( (result) => {
                if (result.success) {
                    this.transfertypeparams = result.value;
                } else {
                    console.log('checkTypeAvailable_KO');
                }
                this.spinner = false;

            })
            .catch( (errors) => {
                console.log('### lwc_paymentsMethodGrid ### checkTypeAvailable() ::: Catch error: ' + JSON.stringify(errors));
                this.spinner = false;
            })
        }
    }

    goToBooktoBook() {
        this.spinner = true;
        const transferTypeParams = this.transferTypeParams;
        const instant_transfer =this.label.PTT_instant_transfer;
        if(transferTypeParams && transferTypeParams.instant_transfer){
            this.getAccountsToB2BOrigin(this.userData, instant_transfer)
            .then( (value) => {
                return this.handleAccountsToB2BOrigin(value);
            })
            .then( (value) => { 
                return this.goToURL(transferTypeParams.instant_transfer, true);
            })
            .catch ((error) => {
                this.spinner = false;
                console.log(error);
                this.showToast(this.label.B2B_no_Origin_Accounts, null, true, 'error');
               /* if (error.title != undefined) {
                    this.showToast(, error.title, error.body, error.noReload, 'error');
                } else {
                    this.showToast(, this.label.B2B_no_Origin_Accounts, true, 'error');
                }*/
            });
        }else{
            this.spinner = false;
            this.showtoast = true;
        }   
       
    }

    goToSingleDomestic() {
        const transferTypeParams = this.transferTypeParams;
        if (transferTypeParams.domestic_transfer_single) {
            this.goToURL(transferTypeParams.domestic_transfer_single, true);
        } else {
            this.showToast = true;
        }
    }

    goToMultipleDomestic() {
        const transferTypeParams = this.transferTypeParams;
        if (transferTypeParams.domestic_transfer_multiple) {
            this.goToURL(transferTypeParams.domestic_transfer_multiple, false);
        } else {
            this.showToast = true;
        }
    }

    goToSingleInternational() {
        this.spinner = true;
        const transferTypeParams = this.transferTypeParams;
        const international_transfer_single = this.label.PTT_international_transfer_single;
        if(transferTypeParams.international_transfer_single){
            this.getAccountsToB2BOrigin(this.userData, international_transfer_single)
            .then( (value) => {
                return this.handleAccountsToB2BOrigin(value);
            })
            .then( () => { 
                return this.goToURL(transferTypeParams.international_transfer_single, true);
            })
            .catch( (error) => {
                this.spinner = false;
                console.log(error);
                this.showToast(this.label.B2B_no_Origin_Accounts, null, true, 'error');
              
            });
        }else{
            this.spinner = false;
            this.showToast = true;
        }  
    }

    goToMultipleInternational() {
        this.spinner = true;
        const transferTypeParams = this.transferTypeParams;
        const international_transfer_multiple = this.label.PTT_international_transfer_multiple;
        if (transferTypeParams.international_transfer_multiple) {
            this.goToURL(transferTypeParams.international_transfer_multiple, false);
        } else {
            this.spinner = false;
            this.showToast = true;
        }
       
    }

    goToURL(params, single) {
        return new Promise( (resolve) => {
            let page = 'payments-b2b';
            if (single) {}
            else{
                // TO-DO
            }
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    pageName: page
                },
                state: {
                    params: params
                }
            });
            resolve('goToURL_OK');
        })         
    }
     
    handleAccountsToB2BOrigin(value) {
        var title = this.label.B2B_no_Origin_Accounts;
        return new Promise( (resolve, reject) => {
            if (value) {
                resolve('handleAccountsToB2BOrigin_OK');
            } else {
                reject({
                    'title': title,
                    'noReload': true
                });
            }
        }, this);
    }
    
    showToast(title, body, noReload, mode) {
        var errorToast = this.template.querySelector('c-lwc_b2b_toast');
        if (errorToast) {
            if (mode == 'error') {
                errorToast.openToast(false, false, title,  body, 'Error', warning, 'warning', noReload);
            }
            if (mode == 'success') {
                errorToast.openToast(true, false, title,  body,  'Success', success, 'success', noReload);
            }
        }
    }

}