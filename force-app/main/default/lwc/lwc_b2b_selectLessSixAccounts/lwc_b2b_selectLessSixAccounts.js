import {LightningElement,api,track} from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import labels
import All_my_accounts from '@salesforce/label/c.All_my_accounts';
import B2B_Not_informed_account from '@salesforce/label/c.B2B_Not_informed_account';

export default class lwc_b2b_selectLessSixAccounts extends LightningElement {

    label = {
        All_my_accounts,
        B2B_Not_informed_account
    }

    @api account //Selected account
    @api accountlist //List of accounts
    @api accountdata //Account data
    @api beneficiarydetails = false; //Show beneficiary details
    @api ismodified //Indicates if the input data has been modified
    @api userdata //User data

    _accountlist;
    
    falseValue = false;

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
    }

      
    get accountlist(){
        return this._accountlist;
    }

    set accountlist(accountlist){
        if(accountlist){
            this._accountlist = accountlist;
            this.setAccountListItems();
        }
    }

    setAccountListItems(){
        //if(this.accountlist){
            var listAux = JSON.parse(JSON.stringify(this._accountlist));
            Object.keys(listAux).forEach(key => {
                listAux[key].index = key;
                listAux[key].displaySelected = listAux[key].displayNumber == this.account.displayNumber ? true : false;
            });
            this._accountlist = listAux;
        //}
    }

    isEqualDisplayNumber() {
        return item.displayNumber == this.account.displayNumber;
    }

    get isAccountEmpty(){
        return this.account ? true : false;
    }

    areAccountsLESix(){
        return this.accountlist.length <= 6;
    }

    handleSelectedAccount(event) {
        this.selectedAccount(event.detail.account);
        this.ismodified = true;
    }

    selectedAccount(account) {
        if (account) {
            this.account = account;
            let shownCards = this.template.querySelector('shownCards');
            if (shownCards) {
                for (let i = 0; i < shownCards.length; i++) {
                    if (shownCards[i].account.displayNumber.localeCompare(account.displayNumber) == 0) {
                        shownCards[i].selected = true;
                    } else {
                        shownCards[i].selected = false;
                    }
                }
            }
            this.fireAccountData();
        } else {
            var msg = this.label.B2B_Not_informed_account;
            toast().error('', msg);
        }
    }

    fireAccountData(){
        const accountdataevent = new CustomEvent('accountdata', {
            detail : {account : this.account}  
        });
        this.dispatchEvent(accountdataevent);
    }

    handleSelectedAccount(event){
        var accountList = this._accountlist;
        if(accountList){
            if(accountList.length <= 6){
                this.errormsg = '';
                var selectedAccount = event.detail.account;
                if(selectedAccount){                    
                    this.account = selectedAccount;
                    this.searchedstring = selectedAccount.displayNumber;
                    this.ismodified = true;
                    let shownCards = this.template.querySelectorAll('c-lwc_b2b_card-account');
                    if (typeof shownCards != "undefined" && shownCards != null) {                        
                        for (let i = 0; i < shownCards.length; i++) {
                            if (shownCards[i].account.displayNumber.localeCompare(selectedAccount.displayNumber) == 0) {
                                shownCards[i].selected = true;
                            } else {
                                shownCards[i].selected = false;
                            }
                        }
                    }
                    this.fireAccountData();
                }else{
                    this.error = true;
                    var msg = this.Label.B2B_Not_informed_account;
                }
            }   
        }
    }
}