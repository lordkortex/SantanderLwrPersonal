import { LightningElement, api, track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

// Import labels
import B2B_Clear_text_input from '@salesforce/label/c.B2B_Clear_text_input';
import B2B_Alias_AccNo_Iban from '@salesforce/label/c.B2B_Alias_AccNo_Iban';
import B2B_Suggestions_for from '@salesforce/label/c.B2B_Suggestions_for';
import B2B_No_suggestions_for from '@salesforce/label/c.B2B_No_suggestions_for';
import results_lowercase from '@salesforce/label/c.results_lowercase';
import B2B_Search_new from '@salesforce/label/c.B2B_Search_new';
import B2B_Browse_accounts from '@salesforce/label/c.B2B_Browse_accounts';
import B2B_Not_informed_account from '@salesforce/label/c.B2B_Not_informed_account';
import B2B_No_accounts_registered_for from '@salesforce/label/c.B2B_No_accounts_registered_for';
import BrowseAccounts from '@salesforce/label/c.BrowseAccounts';
import PAY_LastBeneficiariesUsed from '@salesforce/label/c.PAY_LastBeneficiariesUsed';



export default class Lwc_b2b_selectIndividualAccountHelper extends LightningElement {

    Label = {
        B2B_Clear_text_input,
        B2B_Alias_AccNo_Iban,
        B2B_Suggestions_for,
        B2B_No_suggestions_for,
        results_lowercase,
        B2B_Search_new,
        B2B_Browse_accounts,
        B2B_Not_informed_account,
        PAY_LastBeneficiariesUsed,
        B2B_No_accounts_registered_for,
        BrowseAccounts
    }

    @api label;
    @api account;
    @api searchedstring;
    @api errormsg;
    @api steps;
    @api headercard;
    @api headerlabel;
    @api placeholder;
    @api ismodified;
    @api accountlist;
    @api isediting;
    @api userdata;
    @api accountdata;
    @api beneficiarydetails;
    @api enablebrowseaccount;
    @api cancreatebeneficiaries;

    @track accountSuggestions;
    @track showDropdown;


    // Variables que no existen en el componente Aura
    @track showMiniLabel;
    @track isForExpenses;
    @track error;

    /******** ACTUALIZACIÓN DESPLIEGUE 25-02-2021 INICIO ********/

    @track beneficiaryDetails;
    @track charactersBeforeSuggestions = 4;   
    @track maxSuggestions = 10;
    @track showAccountsBeforeSearch;
    @track lastBeneficiariesMessage = "";
    @track registeredMarker;

    /******** ACTUALIZACIÓN DESPLIEGUE 25-02-2021 FIN ********/



    get errorMsgClass(){
        return (this.errormsg ? 'error' : '') + ' slds-form-element inputLookup';
    }

    get isShowMiniLabel(){
        return (this.showMiniLabel || this.searchedstring) ? true : false;
    }

    get comboboxClass(){
        return (this.showDropdown  ? 'slds-is-open' : '') + ' slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
    }

    get inputId(){
        return this.beneficiarydetails ? 'beneficiaryInput' : 'sourceInput';
    }

    get inputValue(){
        let accountEmpty = JSON.stringify(this.account) == JSON.stringify({});
        return !accountEmpty ? this.account.displayNumber : this.searchedstring;
    }

    get isAccountEmpty(){
        let accountEmpty = JSON.stringify(this.account) == JSON.stringify({});
        return !accountEmpty ? true : false; 
    }

    get isAccountOrSearchedStringEmpty(){
        return (this.account || this.searchedstring) ? true : false;
    }
    
    get isSearchedStrAccErrorEmpty(){
        return (!this.searchedstring && !this.account && !this.errormsg) ? true : false;
    }

    get isErrorMsg(){
        return this.errormsg ? true : false;
    }

    get suggestionsLabel(){
        return this.accountSuggestions ? this.Label.B2B_Suggestions_for : this.Label.B2B_No_suggestions_for;
    }

    get accountsRegisteredLabel(){
        return !this.accountSuggestions ? this.Label.B2B_No_accounts_registered_for : this.Label.B2B_Suggestions_for
    }

    get accountSuggestionsLabel(){
        if(this.accountSuggestions){
            return this.accountSuggestions.length + ' ' + this.Label.results_lowercase;
        }
    }

    get accountSuggestionsLabel2(){
        return this.accountSuggestions ?  '' : '. ' + this.Label.B2B_Search_new;
    }

    get lastBeneficiariesMessageNotEmpty(){
        return this.lastBeneficiariesMessage != '';
    }

    

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        this.initComponent(); //ACTUALIZACIÓN DESPLIEGUE 25-02-2021
    }

    
    initComponent() {
        
        var steps = this.steps;
        var focusStep = steps.focusStep;
        var lastModifiedStep = steps.lastModifiedStep;
                
        if (focusStep == 1 && lastModifiedStep == 1) {
            this.clearInput();
        } 
        /******** ACTUALIZACIÓN DESPLIEGUE 25-02-2021 INICIO ********/
        /*else {
            this.loadAccountData();
        }*/

        let canCreateBeneficiaries = this.canCreateBeneficiaries;	
        if (canCreateBeneficiaries === true) {	
            this.charactersBeforeSuggestions = 4;	
            this.registeredMarker = true;	
            this.showAccountsBeforeSearch = true;	
        }

        /******** ACTUALIZACIÓN DESPLIEGUE 25-02-2021 FIN ********/
    }

    clearInput() {
        this.searchedstring = '';
        this.showDropdown = false;
        this.account = {};
        this.accountSuggestions = [];
        this.errormsg = '';
        this.ismodified = true;
        this.isediting = false;
    }

    handleInputSearch(event) {
        this.activateDropdown(event.target.value);
    }

    handleFocusSearch(event) {
        this.showMiniLabel = true;
        this.activateDropdown(event.target.value);
    }

    handleBlurSearch() {
        this.showMiniLabel = false;
        setTimeout( () => {
            this.showDropdown = false;
        }, 250);
    }

    handleClearInput() {
        this.clearInput();
    }

    activateDropdown(inputLookupValue) {
        let showDropdown = false;
        let accountEmpty = JSON.stringify(this.account) == JSON.stringify({});
        let lastBeneficiaries = '';

        /******** ACTUALIZACIÓN DESPLIEGUE 25-02-2021 INICIO ********/

        let account = this.account;
        let minChars = this.charactersBeforeSuggestions;
        let showBeforeSearch = this.showAccountsBeforeSearch;
        if (accountEmpty) {
            if (inputLookupValue != "") {
                if (showBeforeSearch) {
                    let accountList = this.accountList;
                    let maxLength = this.maxSuggestions;
                    let accountSuggestions = [];
                    if (accountList.length) {
                        for (let i = 0; i < accountList.length && accountSuggestions.length < maxLength; i++) {
                            let account = accountList[i];
                            accountSuggestions.push(account);
                        }
                    }
                    this.accountSuggestions = accountSuggestions;
                    let length = accountSuggestions.length;
                    lastBeneficiaries = this.Label.PAY_LastBeneficiariesUsed;
                    lastBeneficiaries = lastBeneficiaries.replace('{0}', length);
                    showDropdown = true;

                    /******** ACTUALIZACIÓN DESPLIEGUE 25-02-2021 FIN ********/

                }else if (inputLookupValue.length >= minChars){
                    this.searchAccounts(inputLookupValue);
                    showDropdown = true;
                }
            }
            this.searchedstring = inputLookupValue;
            this.showDropdown = showDropdown;
        }
        this.lastBeneficiariesMessage = lastBeneficiaries; // ACTUALIZACIÓN DESPLIEGUE 25-02-2021
    }

    searchAccounts(searchedString) {
        let accountList = this.accountlist;
        let accountSuggestions = [];
        let maxLength = this.maxSuggestions; // ACTUALIZACIÓN DESPLIEGUE 25-02-2021
        if (accountList && searchedString) {
            searchedString = searchedString.toLowerCase();
            for (let i = 0; i < accountList.length && accountSuggestions.length < maxLength; i++) {
                let coincidencia = false;
                let account = accountList[i];
                let displayNumber = account.displayNumber;
                let alias = account.alias;
                if (displayNumber) {
                    displayNumber = displayNumber.toLowerCase();
                    if (displayNumber.includes(searchedString)) {
                        coincidencia = true;
                    }
                }
                if (alias) {
                    alias = alias.toLowerCase();
                    if (alias.includes(searchedString)) {
                        coincidencia = true;
                    }
                }
                if (coincidencia == true) {
                    accountSuggestions.push(account);
                }
            }
        }
        this.accountSuggestions = accountSuggestions;
    }

    handleSelectedAccount(event) {
        this.selectedAccount(event.detail.account);
    }

    selectedAccount(account) {
        let country = '';
        var accountList = this.accountlist;
        if (account) {
            this.errormsg = '';  
            this.account = account;
            this.searchedstring = account.displayNumber;
            country = account.country;

            /******** ACTUALIZACIÓN DESPLIEGUE 25-02-2021 INICIO ********/

            /*if(accountList.length <= 6) {
                let shownCards = this.template.querySelectorAll('c-lwc_b2b_card-account'); // PUEDE QUE HAYA QUE BUSCARLO EN EL HTML DE OTRO LWC
                // let shownCards = component.find('shownCards'); NO EXISTE ESTE IDENTIFICADOR EN EL MARKUP DE ESTE CMP
                if (typeof shownCards != "undefined" && shownCards != null) {
                    for (let i = 0; i < shownCards.length; i++) {
                        if (shownCards[i].account.displayNumber.localeCompare(account.displayNumber) == 0) {
                                shownCards[i].selected = true;
                            } else {
                                shownCards[i].selected = false;
                            }
                    }
                }
            }  */
            /******** ACTUALIZACIÓN DESPLIEGUE 25-02-2021 FIN ********/
        } else {
            //this.error = true;
            var msg = this.Label.B2B_Not_informed_account;
            //toast().error('', msg);
        }
        /******** ACTUALIZACIÓN DESPLIEGUE 25-02-2021 INICIO ********/
        const action = new CustomEvent ('selectedaccount', { details : {country: country}})
        this.dispatchEvent(action);
        /******** ACTUALIZACIÓN DESPLIEGUE 25-02-2021 FIN ********/
    }

    handleSearchAccounts() {
        this.openSearchAccounts();
    }

    handleClickSuggestion(event) {
        this.selectedAccount(event.detail.account);
        this.showDropdown = false;
    }

    openSearchAccounts() {
        var searchAccounts = this.template.querySelector('c-lwc_b2b_search-accounts');
        if (searchAccounts) {
            searchAccounts.openModal();
        }
    }
}