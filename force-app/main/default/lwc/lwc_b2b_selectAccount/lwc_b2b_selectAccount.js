import { LightningElement, api, track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

// Import labels
import B2B_Payment_Header from '@salesforce/label/c.B2B_Payment_Header';
import B2B_Step_1_Header from '@salesforce/label/c.B2B_Step_1_Header';
import All_my_accounts from '@salesforce/label/c.All_my_accounts';
import B2B_Expenses_Question from '@salesforce/label/c.B2B_Expenses_Question';
import B2B_Expenses_Account from '@salesforce/label/c.B2B_Expenses_Account';
import B2B_Not_informed_account from '@salesforce/label/c.B2B_Not_informed_account';
import CNF_ExpensesCountries from '@salesforce/label/c.CNF_ExpensesCountries';
import Yes from '@salesforce/label/c.Yes';
import No from '@salesforce/label/c.No';


export default class Lwc_b2b_selectAccount extends LightningElement {
    
    Label = {
        B2B_Payment_Header,
        B2B_Step_1_Header,
        All_my_accounts,
        B2B_Expenses_Question,
        B2B_Expenses_Account,
        B2B_Not_informed_account,
        CNF_ExpensesCountries,
        Yes,
        No
    }

    @api account;
    @api expensesaccount;
    @api accountlist;
    @api searchedstring;
    @api beneficiarydetails;
    @api headercard;
    @api headerlabel = this.Label.B2B_Payment_Header;
    @api label;
    @api placeholder;
    @api steps;
    @api errormsg;
    @api userdata;
    @api ismodified;
    @api isediting;
    @api checkedyes;
    @api accountdata;
    @api errorMSGExpenses

    _isediting;
    _accountlist;
   


    @track searchedStringExpenses;
    @track spinner;
    @track error;
    @track showDropdown;

    @track enableBrowseAccount
    @track canCreateBeneficiaries
    @track canSelectExpenses
    @track enableExpensesSelect
    @track expensesAccountList = [];

    // Variables que no se está utilizando actualmente en el componente Aura   
    // @track expensesSearchedString;

  
  
    get accountlist(){
        return this._accountlist;
    }

    set accountlist(accountlist){
        if(accountlist){
            this._accountlist = accountlist;
            this.setAccountListItems();
        }
    }

    get isediting(){
        return this._isediting;
    }

    set isediting(isediting){
        if(isediting){
            this._isediting  = isediting;
            this.controlIsModified();
        }
    }

    get beneficiaryDetailsEqFalse(){
        if(this._accountlist){
            return (!this.beneficiarydetails && this._accountlist.length <= 6) ? true : false;
        }
    }

    get accountlistLeSix(){
        return (this._accountlist.length <= 6) ? true : false;
    }

    get accountlistGeOne(){
        return (this._accountlist.length >= 1) ? true : false;
    }
    
    get accountInfoClass(){
        return 'accountInformation' + (this._accountlist.length <= 6 ? ' sixAccounts' : '');
    }

    get isCountryClOrPl(){
        return (this.account && (this.account.country == 'CL' || this.account.country == 'PL'));
    }

    get notCheckedYES(){
        return !this.checkedyes;
    }

    get isAccountEmpty(){
        return this.account ? true : false;
    }

    connectedCallback(){
            loadStyle(this, santanderStyle + '/style.css');
            this.initComponent();
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

    initComponent(){
        var steps = this.steps;
        var focusStep = steps.focusStep;
        var lastModifiedStep = steps.lastModifiedStep;
        if (focusStep == 1 && lastModifiedStep == 1) {
            this.clearInput();
        }
    }

    clearInput(isForExpenses) {
        if (!isForExpenses) { // En actualización no está este if
            this.account = {};
            this.searchedstring = '';
            this.showDropdown = false;
            this.checkedyes = false;
        }
        this.expensesaccount = {};
        //this.expensesSearchedString = '';
        //this.showDropdownExpenses = false;
        this.errormsg = '';
        this.ismodified = true;

        this.searchedStringExpenses = '';
        this.errorMSGExpenses = '';
    }

    controlIsModified() {
        /*METODO COMENTADO EN EL COMPONENTE AURA*/

        // let isEditing = this.isEditing');
        // if (isEditing == true) {
        //     this.isModified', false);
        // }
    }

    handleRadioYESChecked() {
        this.checkedyes = true;
        this.ismodified = true;

        this.removeAccountFromList(this.account, this.accountList, (newList) => {
            this.expensesAccountList = newList; 
        });
    }

    handleRadioNOChecked() {
        //this.clearInput(component, helper, true);
        this.checkedyes = false;
        this.expensesaccount = {};
        this.searchedStringExpenses = '';
        this.ismodified = true;
        this.expensesAccountList = [];
    }


    /******** ACTUALIZACIÓN DESPLIEGUE 25-02-2021 INICIO (NO EXISTE) ********/

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

    /******** ACTUALIZACIÓN DESPLIEGUE 25-02-2021 FIN (NO EXISTE) ********/

    /******** ACTUALIZACIÓN DESPLIEGUE 25-02-2021 INICIO ********/

    changeAccount() {
        let canSelectExpenses = this.canSelectExpenses;
        if (canSelectExpenses === true) {
            let newAccount = this.account;
            let enableExpensesSelect = false;
            if (newAccount && newAccount.country) {
                const CNF_EXPENSESCOUNTRIES = this.Label.CNF_ExpensesCountries;
                let arrCountries = [];
                if (CNF_EXPENSESCOUNTRIES) {
                    arrCountries = CNF_EXPENSESCOUNTRIES.split(';');
                }
                if (arrCountries.includes(newAccount.country)) {
                    enableExpensesSelect = true;
                }
            }
            if (enableExpensesSelect == false) {
                this.checkedYES = false;
                this.expensesAccountList = [];
                this.expensesAccount = {};
                this.searchedStringExpenses = '';
            } else {
                let accountList = this.accountList;
                this.removeAccountFromList(newAccount, accountList, (newList) => {
                    this.expensesAccountList = newList;
                    this.expensesAccount = {};
                    this.searchedStringExpenses = '';
                });
            }
            this.enableExpensesSelect = enableExpensesSelect;   
        }
    }

    /******** ACTUALIZACIÓN DESPLIEGUE 25-02-2021 FIN ********/

    fireAccountData(){
        const accountdataevent = new CustomEvent('accountdata', {
            detail : {account : this.account}  
        });
        this.dispatchEvent(accountdataevent);
    }

    removeAccountFromList(account, accountList, callback) {
        let newList = [];
        if (accountList) {
            if (account && account.displayNumber) {
                for (let i = 0; i < accountList.length; i++) {
                    if (accountList[i].displayNumber.localeCompare(account.displayNumber) != 0) {
                        newList.push(accountList[i]);
                    }
                }
            } else {
                newList.push(...accountList);
            }
        }
        if (callback) {
            callback(newList);
        }
    }
}