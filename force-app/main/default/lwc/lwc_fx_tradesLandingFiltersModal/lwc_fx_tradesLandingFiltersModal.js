import { LightningElement, track, api } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

import close from '@salesforce/label/c.close';
import AllFilters from '@salesforce/label/c.AllFilters';
import AllFilters_Subtitle from '@salesforce/label/c.AllFilters_Subtitle';
import Accounts from '@salesforce/label/c.Accounts';
import PAY_Source from '@salesforce/label/c.PAY_Source';
import B2B_Clear_text_input from '@salesforce/label/c.B2B_Clear_text_input';
import amount from '@salesforce/label/c.amount';
import currency from '@salesforce/label/c.currency';
import from from '@salesforce/label/c.from';
import PAY_ErrorFromAmount from '@salesforce/label/c.PAY_ErrorFromAmount';
import to from '@salesforce/label/c.to';
import PAY_ErrorToAmount from '@salesforce/label/c.PAY_ErrorToAmount';
import Show_More from '@salesforce/label/c.Show_More';
import IncorrectInputFormat from '@salesforce/label/c.IncorrectInputFormat';
import PaymentDetails from '@salesforce/label/c.PaymentDetails';
import status from '@salesforce/label/c.status';
import PAY_PaymentType from '@salesforce/label/c.PAY_PaymentType';
import ClientReference from '@salesforce/label/c.ClientReference';
import destinationCountry from '@salesforce/label/c.destinationCountry';
import valueDateFrom from '@salesforce/label/c.valueDateFrom';
import PAY_ErrorFromDate from '@salesforce/label/c.PAY_ErrorFromDate';
import PAY_SelectCalendarDate from '@salesforce/label/c.PAY_SelectCalendarDate';
import valueDateTo from '@salesforce/label/c.valueDateTo';
import apply from '@salesforce/label/c.apply';
import clearAll from '@salesforce/label/c.clearAll';
import B2B_No_suggestions_for from '@salesforce/label/c.B2B_No_suggestions_for';
import B2B_Suggestions_for from '@salesforce/label/c.B2B_Suggestions_for';
import results_lowercase from '@salesforce/label/c.results_lowercase';
import PAY_Beneficiary from '@salesforce/label/c.PAY_Beneficiary';
import B2B_Error_Problem_Loading from '@salesforce/label/c.B2B_Error_Problem_Loading';
import B2B_Error_Check_Connection from '@salesforce/label/c.B2B_Error_Check_Connection';
import PAY_Status_PendingOne from '@salesforce/label/c.PAY_Status_PendingOne';
import PAY_Status_PendingTwo from '@salesforce/label/c.PAY_Status_PendingTwo';
import PAY_Status_InReviewOne from '@salesforce/label/c.PAY_Status_InReviewOne';
import PAY_Status_ScheduledOne from '@salesforce/label/c.PAY_Status_ScheduledOne';
import PAY_Status_CompletedOne from '@salesforce/label/c.PAY_Status_CompletedOne';
import PAY_Status_RejectedOne from '@salesforce/label/c.PAY_Status_RejectedOne';
import B2B_Error_Invalid_Input from '@salesforce/label/c.B2B_Error_Invalid_Input';
import B2B_Source_account from '@salesforce/label/c.B2B_Source_account';


export default class Lwc_fx_tradesLandingFiltersModal extends LightningElement {

    label = {
        close,
        AllFilters,
        AllFilters_Subtitle,
        Accounts,
        PAY_Source,
        PAY_ErrorFromDate,
        amount,
        currency,
        from,
        PAY_ErrorFromAmount,
        to,
        B2B_Clear_text_input,
        PAY_ErrorToAmount,
        Show_More,
        IncorrectInputFormat,
        PaymentDetails,
        status,
        PAY_PaymentType,
        ClientReference,
        destinationCountry,
        valueDateFrom,
        PAY_SelectCalendarDate,
        valueDateTo,
        apply,
        clearAll,
        B2B_No_suggestions_for,
        B2B_Suggestions_for,
        results_lowercase,
        PAY_Beneficiary,
        B2B_Error_Problem_Loading,
        B2B_Error_Check_Connection,
        PAY_Status_PendingOne,
        PAY_Status_PendingTwo,
        PAY_Status_InReviewOne,
        PAY_Status_ScheduledOne,
        PAY_Status_CompletedOne,
        PAY_Status_RejectedOne,
        B2B_Error_Invalid_Input,
        B2B_Source_account
    };

    @api showfiltermodal = false;//	"Boolean to show or hide advanced filter modat (CMP_PaymentsLandingFilterModal)"
    @api currentuser;// "Current user data"/> 
    @api resetsearch;// "Flag to clear or not all filters"/>
    @api filtercounter = 0;// 	"Counts the number of types of filers selected (source account, amount, currency, status, payment method, client reference, destination country, date)"/>
    
    //<!--FROM-->
    @api fromdecimal = '';//"Search information placed in the From Amount search input."/>
    @track showfromminilabel = false;// "Control to show mini label." />
    @track isfromdisabled = false;// 	"Control to disable From Amount input"/>
    @track erroramount = false;// "Show error text and styles in From Amount"/>
    
    //<!--TO-->
    @api todecimal = '';//	"Search information placed in the To Amount search input."/>
    @track showtominilabel = false;// 	"Control to show mini label." />
    @track istodisabled = false;// 	"Control to disable To Amount input"/>    
    
    //<!--CURRENCY-->
    @api currencydropdownlist = [];// 	"List of currencies that are displayed in the dropdown"/>
    @api selectedcurrencies = [];// 	"List of selected currencies." />
    @api iscurrencydisabled = false;//	"Control to disable payment method dropdown"/>	
    @api clearcurrencydropdown = false;// "Flag to clear or not the dropdown"/>


    //STATUS
    @api selectedpaymentstatusbox = '';// 	"Selected payment status"/>    
    @api statusdropdownlist = [];// 	"List of statuses that are displayed in the dropdown"/>
    @api selectedstatuses = [];// "List of selected statuses." />
    @api clearstatusdropdown = false;// "Flag to clear or not the dropdown"/>
    @api statusfilter =[];
    @api currencypairfilter=[];
    @api sidefilter =[];
    
    //PAYMENT METHODS
    @api paymentmethoddropdownlist =[];// "List of payment methods that are displayed in the dropdown in Single tab"/>
    @api selectedmethod ='';//"Payment method selected"/>
    @api ismethoddisabled = false;//	"Control to disable payment method dropdown"/>
    @api clearmethoddropdown = false;// "Flag to clear or not the dropdown"/>
    
    //ACCOUNTS DROPDOWN
    @api account ={};//   "Selected account." />
    @api accountlist = [];//    "List of accounts" />
    @api searchedsourceaccount ='';//   "Search information placed in the source account search input." />
    @api selectedsourceaccount = {};//    "Account selected from search dropdown." />
    @api searcheddestinationaccount = '';//    "Search information placed in the destination account search input." />
    @track accountsuggestions = [];//    "List of retrieved accounts that match the searched criteria." />
    @api accountssourceplaceholder = this.label.PAY_Source;//    "Label pf the account searcher input text." />
    @api accountdestinationplaceholder = this.label.PAY_Beneficiary;// "Label pf the account searcher input text." />
    @track showsourceaccountminilabel = false;// "Control to show the source account mini label." />
    @track showdestinationaccountminilabel = false;//  "Control to show the destination account mini label." />
    @track showdropdown = false;//     "Indicates if the dropdown must be visible." />
    @api disabled = false;// "Indicates if the search input is read only." />
    @api errormsg =''; //"Indicates the error when clicked on continue." />
    @api ismodified;// 	"Indicates if the input data has been modified." />
    
    //CLIENT REFERENCE
    @api searchedstring = '';// 	"Search information placed in the payment search input." />
    @api clientreference;// User input for client reference filter." />
    @track showclientreferenceminilabel = false;// 	"Control to show mini label." />
    @track isclientreferencedisabled = false;// 	"Control to disable payment reference input"/>
    
    //DESTINATION COUNTRY
    @api destinationcountrystring = '';// 	"Search information placed in the country search input."/>
    @api showdestinationminilabel = false;// 	"Control to show mini label."/>
    @api isdestinationcountrydisabled = false;// 	"Control to disable destination country input"/>
    @api countrydropdownlist =[];// 	"List of countries that are displayed in the dropdown in Single tab"/>
    @api selectedcountry ='';// 	"Country selected from dropdown." />
    @api clearcountrydropdown = false;// 	"Flag to clear or not the dropdown"/>
    
    //DATES 
    @api dates = ['', ''];// 	"List containing the selected dates" />
    @track datesplaceholders = ['', ''];// 	"List containing the selected dates, or if they are empty, the placeholder for the field" />
    @track fromdateformat = false;// 	"Show error text and styles in  Date when incorrect format input"/>
    @track todateformat = false;// 	"Show error text and styles in  Date when incorrect format input"/>
    
    
    //VALUE DATE FROM
    @api datefromminilabel = false;// 	"Control to show mini label."/>
    @api isdatefromdisabled = false;// "Control to disable value date from input"/>
    @track errordate = false;// "Show error text and styles in  Date"/>
    
    //VALUE DATE TO
    @api datetominilabel = false;// 	"Control to show mini label."/>
    @api isdatetodisabled = false;// 	"Control to disable value date to input"/>
    
    
    @track ismodaldataloaded = '';//	"Attribute which detemines wheather single data tab has been loaded or not"/>
    @api isloading = false;//	"Control to show spinner when loading records"/>
    
    //NUMBER FORMATTING
    @api locale;
    @api decimalseparator;
    @api thousandsseparator;     
    @api formattedvalufrom;
    @api formattedvalueto;
    @api userinputfrom = '';
    @api userinputto = '';
    
    //TOAST
    @api toasttext = this.label.B2B_Error_Problem_Loading;
    @api toasttitle = this.label.B2B_Error_Check_Connection;
    @api toasttype = 'Warning';// "Controls the style in toast component"/>
    @api showtoast = false;// "Indicates if the toast is shown after searching for accounts." />
    @api noreload = false;// "Controls whether the toast has a reload button and icon." />
    @api reloadaccounts;//  description="Retry the call to retrieve list of accounts." />
    
    
    @api applyisclicked = false;
       
    //TEMPORARY FILTER VALUES TO REVERT TO ON CLOSING THE MODAL WITHOUT APPLYING CHANGES-->
    @track appliedsourceaccount = {};//   "Source account filter that has been applied." />
    @track appliedformattedvaluefrom;//   "From amount filter that has been applied."/>
    @track appliedformattedvalueto;//   "To amount filter that has been applied."/>
    @track appliedfromdecimal = '';//	"Decimal from amount that has been applied."/>
    @track appliedtodecimal = '';//	"Decimal to amount that has been applied."/>
    @track applieduserinputfrom = '';//   "User input from amount that has been applied."/>
    @track applieduserinputto = '';//     "User input to amount that has been applied."/>
    @track appliedselectedcurrencies = [];// 	"List of selected currencies that have been applied."/>
    @track appliedselectedstatuses = [];// 	"List of selected statuses that have been applied."/>
    @track appliedselectedmethod = '';//	"Payment method filter that has been applied."/>
    @track appliedclientrefrence = '';// 	"Client reference filter that has been applied." />    
    @track appliedselectedcountry = '';// 	"Country that has been applied as a filter." />
    @track applieddates = ['', ''];// "List containing the selected dates that have been applied" />

    @track showMore = false;
    @track isSimpleDropdown = false;
    @track isDisabledDropdown = false;
    @track isSimpleDropdownTrue = true;

    get getlookupClass(){
        //!(and(not(empty(v.errorMSG)), empty(v.account)) ? 'error' : '') + ' slds-form-element inputLookup__single'
        var ret = 'slds-form-element inputLookup__single ';
        if((this.errormsg != undefined && this.errormsg != null && this.errormsg != '') && (this.account == undefined || this.account == null || this.account == '')){
            ret = ret + 'error';
        }
        return ret;
    }

    get showMiniLabelORsearchSourceNE(){
        //!or(v.showSourceAccountMiniLabel eq true, not(empty(v.searchedSourceAccount)))    
        return (this.showsourceaccountminilabel || (this.searchedsourceaccount != undefined && this.searchedsourceaccount != null && this.searchedsourceaccount != ''));
    }

    get showDropdownClass(){
        //!(v.showDropdown eq true ? 'slds-is-open' : '')+' slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click'   
        var ret = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click ';
        if(this.showdropdown){
            ret = ret + 'slds-is-open';
        }
        return ret;
    }

    get accountSourceValue(){
        //!(empty(v.account) ? v.searchedSourceAccount : v.account.displayNumber+' - '+v.account.alias)  
        var ret = '';            
        if (this.account == undefined || this.account == null || this.account == ''){
            ret = this.searchedsourceaccount;
        }else{
            ret = this.account.displayNumber +' - '+ this.account.alias;
        }
        return ret;
    }

    get searchedsourceaccountORaccountNE(){
        //!or(!empty(v.account), !empty(v.searchedSourceAccount)) 
        return ((this.searchedsourceaccount != undefined && this.searchedsourceaccount != null && this.searchedsourceaccount != '') || (this.account != undefined && this.account != null && this.account != ''));
    }

    get errormsgEmptyAccount(){
        //!and(!empty(v.errorMSG), empty(v.account))   
        return (this.errormsg && (this.account == undefined || this.account == null || this.account == ''));
    }
    get isEmptyAccountSuggestions(){
        //{!(empty(v.accountSuggestions) ? $Label.c.B2B_No_suggestions_for : $Label.c.B2B_Suggestions_for)}
        var ret = this.label.B2B_No_suggestions_for;
        if(this.accountsuggestions){
            ret = this.label.B2B_Suggestions_for;
        }
        return ret;
    }

    get isEmptyAccountSuggestions2(){
    //{!(empty(v.accountSuggestions) ? '.&nbsp;' + $Label.c.B2B_Search_new : '')}
        var ret= '';
        if(this.accountsuggestions == undefined || this.accountsuggestions == null || this.accountsuggestions == ''){
            ret = '.&nbsp;' + this.label.B2B_Search_new;
        }
        return ret;
    }      

    get errorAmountClass(){
        ////'slds-form-element input' + (v.errorAmount eq true ? ' error':'')  
        var ret = 'slds-form-element input ';
        if(this.erroramount){
            ret = ret + 'error';
        }
        return ret;
    }
    
    get showFromMiniLabelORformattedValueFromNE(){
        //!or(v.showFromMiniLabel eq true, not(empty(v.formattedValueFrom)))
        return (this.showfromminilabel || (this.formattedvaluefrom != undefined && this.formattedvaluefrom != null && this.formattedvaluefrom != ''));
    }

    get isUserInputFromNE(){
        //!not(empty(v.userInputFrom))
        return this.userinputfrom;
    }

    get showToMiniLabelORformattedValueToNE(){
        //!or(v.showToMiniLabel eq true, not(empty(v.formattedValueTo)))
        return (this.showtominilabel || (this.formattedvalueto != undefined && this.formattedvalueto != null && this.formattedvalueto != ''));
    }

    get isUserInputToNE(){
        //!not(empty(v.userInputTo))
        return this.userinputto;
    }

    get showCRMiniLabelORclientReferenceNE(){
        //!or(v.showClientReferenceMiniLabel eq true, not(empty(v.clientReference)))
        return (this.showclientreferenceminilabel || (this.clientreference != undefined && this.clientreference != null && this.clientreference != ''));
    }
    get isClientReferenceNE(){
        //!not(empty(v.clientReference))
        return this.clientreference;
    }
    get errorDateFromClass(){
    //!'slds-form-element slds-dropdown-trigger slds-dropdown-trigger_click' + ((v.errorDate eq true || v.fromDateFormat eq true) ? ' error':'')
        var ret = 'slds-form-element slds-dropdown-trigger slds-dropdown-trigger_click ';
        if(this.errordate || this.fromdateformat){
            ret = ret + 'error';
        }
        return ret;
    }
    get datesPlaceholdersZeroNEvdFrom(){
        //datesPlaceholders[0] != $Label.c.valueDateFrom
        return this.datesplaceholders && this.datesplaceholders[0] != this.label.valueDateFrom;
    }

    get datesplaceholdersZero(){
        return this.datesplaceholders && this.datesplaceholders[0];
    }

    get datesplaceholdersOne(){
        return this.datesplaceholders && this.datesplaceholders[1];
    }

    /*get fromDateToDateFalse(){
    //!and(v.fromDateFormat == false, v.toDateFormat == false)
        return (this.fromdateformat == false && todateformat == false);
    }*/
    /*get errorDateToClass(){
        //!'slds-form-element slds-dropdown-trigger slds-dropdown-trigger_click' + (or(v.errorDate eq true, v.toDateFormat eq true) ? ' error':'')
        var ret = 'slds-form-element slds-dropdown-trigger slds-dropdown-trigger_click ';
        if(this.errordate || this.todateformat){
            ret = ret + 'error';
        }
        return ret;
    }*/

    /*get datesPlaceholdersOneNEvdTo(){
        //datesPlaceholders[1] != $Label.c.valueDateTo
        return this.datesplaceholders && this.datesplaceholders[1] != this.label.valueDateTo;
    }

    get isAccountNE(){
        //!not(empty(v.account))
        return this.account;
    }*/

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        console.log("sidelist: "+JSON.stringify(this.sidefilter));
        console.log("sidelist2: "+JSON.stringify(this.currencypairfilter));
        console.log("sidelist3: "+JSON.stringify(this.statusfilter));
        /*this.initNumberFormat();
        this.setFilter();
        var isOpen = this.showfiltermodal;
        if(isOpen){
            //document.querySelector(".comm-page-custom-landing-payments").style.overflow = 'hidden';
            //this.template.querySelector(".comm-page-custom-landing-payments").style.overflow = 'hidden'; 
            this.handleChangeDates();

        }
        
        let accountList = this.accountlist;
        if (accountList == undefined || accountList == null) {
            this.showToast = true;
        }
        console.log('current user:', JSON.stringify(this.currentuser));*/
    }

         
    closeFilterModal () {
        //this.revertAppliedFilters();
        this.closeModal();
    }
    
    clearAll () {
        this.clearFilterModal();
    }
    
    
    applyFilterModal () {
        const applyModalFilters = new CustomEvent('onbuttonapply',{});
        this.dispatchEvent(applyModalFilters);

        /*this.checkValidDates();
        this.validateInput();
        this.checkValidAccount();
        let errorDate = this.errordate;
        let errorFromDateFormat = this.fromdateformat;
        let errorToDateFormat = this.todateformat;
        let errorAmount= this.erroramount;
        let errorAccount= this.errormsg;
        if (errorDate != true && errorToDateFormat!= true && errorFromDateFormat != true && errorAmount != true && errorAccount == '') {
            this.clearSelectedPaymentStatusBox();
            this.closeModal();
            this.applyisclicked = true;
        }*/
    }
    
    setClientReference (event){        
        var isDisabled = this.isclientreferencedisabled;
        if(!isDisabled){
            this.showclientreferenceminilabel = true;
            let clientRef = this.clientreference;
            if (event.target.value != undefined) {
                var value = event.target.value;
                let regExp = new RegExp('^[0-9a-zA-Z\s]{0,16}$');
                let isInputValid = regExp.test(value);
                if (isInputValid == true) {
                    clientRef = value;
                }
            }
            event.target.value = clientRef;
            this.clientreference = clientRef;
        }        
    }
      
    handleFocusClientReference (){
        this.showclientreferenceminilabel = true;  
    }

    handleBlurClientReference (){
        this.showclientreferenceminilabel = false;  
    }
    
    setDestinationCountry (event){        
        var isDisabled = this.isdestinationcountrydisabled;
        if(!isDisabled){
            this.showdestinationminilabel = true;
            var value = event.currentTarget.value;
            this.destinationcountrystring = value;
        }        
    }
       
    handleFocusDestinationCountry (){
        this.showdestinationminilabel = true;  
    }
        
    handleBlurDestinationCountry(){
        this.showdestinationminilabel = false;  
    }
    
    handleSourceInputSearch(event) {
        this.activateDropdown(event.target.value);
    }

    handleSourceFocusSearch(event) {
        this.showsourceaccountminilabel = true;
        this.activateDropdown(event.target.value);
    }

    handleSourceBlurSearch() {
        this.showsourceaccountminilabel = false;
        setTimeout((function () {
            this.showdropdown = false;
        }), 250);
    }
    handleClearInput () {
        this.clearInput();
    }
    handleClickSuggestion (event) {
        this.selectedAccount(event.getParam('account'));
        this.showdropdown = false;
        
    }
    handleSelectedAccount (event) {
        this.selectedAccount(event.getParam('account'));
    }

    handleSourceClickSuggestion(event) {
        this.selectedAccount(event.getParam('account'));
        this.showdropdown = false;
    }

    handleDestinationInputSearch(event) {
        this.searcheddestinationaccount = event.target.value;
        this.showdestinationaccountminilabel = true;
    }

    handleDestinationFocusSearch(event) {
        this.showdestinationaccountminilabel = true;
        this.activateDropdown(event.target.value);
    }

    handleDestinationBlurSearch() {
        this.showdestinationaccountminilabel = false;       
    }

    handleDestinationClickSuggestion(event) {
        this.selectedAccount(event.getParam('account'));
        this.showdropdown = false;
    }

    handleFocusFromDate(){
        this.datefromminilabel = true;  
    }

    handleBlurFromDate(){
        this.datefromminilabel = false;  
    }

    handleChangeDate(){
        this.checkValidDates();
    }

    handleFocusToDate(){
        this.datetominilabel = true;  
    }

    handleBlurToDate(){
        this.datetominilabel = false;  
    }
    
    handleInputAmount(event) {
        let thousandsSeparator = this.thousandsseparator;
        let decimalSeparator = this.decimalseparator;
        let inputValue;
        let inputId;
        if (event && event.currentTarget && event.currentTarget.value){
            inputValue = event.currentTarget.value;
        }
        if (event && event.currentTarget && event.currentTarget.id){
            inputId = event.currentTarget.id;
        }
        let validUserInput = '';
        if (inputValue != undefined && inputValue != null) {
            if (inputId != undefined && inputId != null) {
                if(validUserInput!=undefined ){
                    if(inputId == 'fromAmount'){
                        validUserInput = this.userinputfrom;
                    }
                    if(inputId == 'toAmount'){
                        validUserInput = this.userinputto;
                    }
                }

                let validRegExp = new RegExp('^[0-9][0-9' + thousandsSeparator + ']*[' + decimalSeparator + ']?[0-9]{0,2}$');
                let isInputValid = validRegExp.test(inputValue);

                if (isInputValid == true && inputValue.length < 18) {
                    validUserInput = inputValue;
                    if(validUserInput!=undefined ){
                        if(event.currentTarget.id == 'fromAmount'){
                            this.userinputfrom = validUserInput;
                        }
                        if(event.currentTarget.id == 'toAmount'){
                            this.userinputto = validUserInput;
                        }
                    }
        
                }

                //let input = document.getElementById(inputId);
                let input = this.template.querySelector('#inputId');
                if (input != null && input != undefined) {
                    input.value = validUserInput;
                }
            }  
            
            
            let thousandsRegExp = new RegExp('['+thousandsSeparator+']','g');
            let valueWithoutThousand = validUserInput.replace(thousandsRegExp, '');
            let valueWithDecimal = valueWithoutThousand.replace(decimalSeparator, '.');

            if(parseFloat(valueWithDecimal)!=undefined && Number.isNaN(parseFloat(valueWithDecimal))==false){
                if(event.currentTarget.id == 'fromAmount'){
                    this.fromdecimal = parseFloat(valueWithDecimal);
                }
                if(event.currentTarget.id == 'toAmount'){
                    this.todecimal = parseFloat(valueWithDecimal);
                }
            }

            if(event.currentTarget.id == 'fromAmount'){
                this.formattedvaluefrom = validUserInput;
            }
            if(event.currentTarget.id == 'toAmount'){
                this.formattedvalueto = validUserInput;
            }
        }else{
            if(event.currentTarget.id == 'fromAmount'){
                this.fromdecimal = '';
                this.formattedvaluefrom = '';
                this.userinputfrom = '';

            }
            if(event.currentTarget.id == 'toAmount'){
                this.todecimal = '';
                this.formattedvalueto = '';
                this.userinputto = '';

            }
        }
        
    }

    handleFocusAmount(event) {
        let value = '';  
        let inputId = event.currentTarget.id;
        if (inputId != undefined && inputId != null) {
            if(inputId == 'fromAmount'){
                if(this.userinputfrom != undefined && this.userinputfrom != null && this.userinputfrom != ''){
                    value = this.userinputfrom;
                }
                this.showfromminilabel = true;
            }
            if(inputId == 'toAmount'){
                if(this.userinputto != undefined && this.userinputto != null && this.userinputto != ''){
                    value = this.userinputto;
                }
                this.showtominilabel = true;            
            }
            //let input = document.getElementById(inputId);
            let input = this.template.querySelector('#inputId');
            if (input != null && input != undefined) {
                input.value = value
            }
        }
    }


    handleBlurAmount(event) {
        let formattedValue = '';
        let inputId = event.currentTarget.id;

        if(inputId == 'fromAmount') {
            this.showfromminilabel = false;    
            if(this.formattedvaluefrom !='' && this.formattedvaluefrom !=null){
                formattedValue = this.formattedvaluefrom;
            }
        }
            
        if(inputId == 'toAmount') {
            this.showtominilabel = false; 
            if(this.formattedvalueTo !='' && this.formattedvalueto !=null){
                formattedValue = this.formattedvalueto;
            }
        } 

        if (inputId != undefined && inputId != null) {
            //let input = document.getElementById(inputId);
            let input = this.template.querySelector('#inputId');
            if (input != null && input != undefined) {
                input.value = formattedValue;
            }
        }
    }
    
    valueChanges(event) {
        let inputId = '';
        let value = '';
        inputId = event.currentTarget.id;
        value = event.currentTarget.value; 

        if(inputId == 'fromAmount'){
            value = this.fromdecimal;
        }
        if(inputId == 'toAmount'){ 
            value = this.todecimal;
        }

        if (value != undefined && value != null) {   
                        
            if (inputId != undefined && inputId != null) {
                let locale = this.locale;
                var formatValue = '';
                formatValue = Intl.NumberFormat(locale).format(value);
                if(inputId == 'fromAmount'){
                    this.formattedvaluefrom = formatValue;
                }
                if(inputId == 'toAmount'){
                    this.formattedvalueto = formatValue;
                }


                //let input = document.getElementById(inputId);
                let input = this.template.querySelector('#inputId');
                if (input != null && input != undefined) {
                    input.value = formatValue;
                }

            }
        } else {
            if(inputId == 'fromAmount'){
                this.fromdecimal = '';
                this.formattedvaluefrom = '';
                this.userinputfrom = '';
            }
            if(inputId == 'toAmount'){
                this.todecimal = '';
                this.formattedvalueto = '';
                this.userinputto = '';
            }
        }       
        this.validateInput();
    }
    
    handleClearClientReference() {
        this.clearClientReference();       
    }
    handleClearAmountFrom() {
        this.clearAmountFrom();          
    }
    handleClearAmountTo() {
        this.clearAmountTo();          
    }
    handleClearDateFrom() {
        this.clearDateFrom();           
    }
    handleClearDateTo() {
        this.clearDateTo();       
    }

    handleChangeDates () {
        this.handleChangeDates();
    }

    handleChangeDatesInternal () {
        this.handleChangeDatesInternal(); 
    }

    
    activateDropdown( inputLookupValue) {
        let showDropdown = false;
        let account = this.account;
        let disabled = this.disabled;
        if (disabled == false && (account == undefined || account == null)) {
            if (inputLookupValue != undefined && inputLookupValue != null) {
                if (inputLookupValue.length >= 4) {
                    this.searchAccounts(inputLookupValue);
                    showDropdown = true;
                }
            }
            this.searchedsourceaccount = inputLookupValue;
        }
        this.showdropdown = showdropdown;
    }

    searchAccounts( searchedString) {
        let accountList = this.accountlist;
        let accountSuggestions = [];
        
        if (accountList != undefined && accountList != null  && searchedString != undefined && searchedString != null) {
            searchedString = searchedString.toLowerCase();
            for (let i = 0; i < accountList.length && accountSuggestions.length < 5; i++) {
                let coincidencia = false;
                let account = accountList[i];
                let displayNumber = account.displayNumber;
                let alias = account.alias;
                if (displayNumber != undefined && displayNumber != null) {
                    displayNumber = displayNumber.toLowerCase();
                    if (displayNumber.includes(searchedString)) {
                        coincidencia = true;
                    }
                }
                if (alias != undefined && alias != null) {
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
        this.accountsuggestions = accountSuggestions;
    }
        
    selectedAccount( account) {
        if (account != undefined && account != null) {
            this.account = account;
        }
    }
    
    clearInput () {
        this.showDropdown = false;
        this.account = {};
        this.accountsuggestions = [];
        this.searchedsourceaccount = '';
        this.errormsg = '';
        this.ismodified = true;
        this.errordate = false;
        this.fromdateformat = false; 
        this.todateformat = false; 
        this.erroramount = false;
    }
        
         
    clearFilterModal () {           
        var emptyLst = [];
        //Accounts
        this.searchedsourceaccount = '';
        this.searchedDestinationAccount = '';
        this.account = {};
        this.clearInput();
        
        //Amount       
        this.clearAmountFrom();          
        this.clearAmountTo();          

        //Currency
        this.clearcurrencydropdown = true;
        
        //Payment status
        this.clearstatusdropdown = true;
        this.selectedpaymentstatusbox = '';

        //Payment method
        this.clearmethoddropdown = true;

        //Client reference
        this.clearClientReference();  

        //Dates
        this.clearDateFrom(); 
        this.clearDateTo(); 

        //Country
        this.clearcountrydropdown = true;
    }

    initNumberFormat() {
        var currentUser = this.currentuser;
        var numberFormat = currentUser.numberFormat;
        var decimalSeparator = '.';
        var thousandsSeparator = ',';
        if(numberFormat == '###.###.###,##'){
            decimalSeparator = ',';
            thousandsSeparator = '.';
            this.locale = 'de-DE';
        }else{
            decimalSeparator = '.';
            thousandsSeparator = ',';
            this.locale = 'en';
        }
        this.decimalseparator =  decimalSeparator;
        this.thousandsseparator = thousandsSeparator;      
    }

    validateInput() {

        if(this.fromDecimal !='' && this.fromdecimal !=null && this.todecimal !='' && this.todecimal !=null){
            if(this.fromdecimal > this.todecimal){                
                this.erroramount = true;                
            }else{
                this.erroramount = false;
            }
        }else{
            this.erroramount = false;

        }
    }
    
    //$Label.c.PAY_Status_PendingOne
    //$Label.c.PAY_Status_PendingTwo
    //$Label.c.PAY_Status_InReviewOne
    //$Label.c.PAY_Status_ScheduledOne
    //$Label.c.PAY_Status_CompletedOne
    //$Label.c.PAY_Status_RejectedOne
    setFilter () {
        var selectedBox = this.selectedpaymentstatusbox;
        var selectedStatus = [];
        var statusList = this.statusdropdownlist;
        if(selectedBox != undefined && selectedBox != null){
            if(selectedBox.parsedStatusDescription == this.label.PAY_Status_PendingOne){
                var aux = '';
                if(selectedBox.statusName != undefined && selectedBox.statusName != null){
                    if(selectedBox.statusName.includes('true_')){
                        aux = selectedBox.statusName.split('_');
                    }
                    
                    var obj = statusList.find(obj => obj.value == 'chk_'+aux[1]);
                    selectedStatus.push(obj.value);
                    this.selectedstatuses = selectedStatus; 
                }

            }else if(selectedBox.parsedStatusDescription == this.label.PAY_Status_PendingTwo){
                var aux = '';
                if(selectedBox.statusName != undefined && selectedBox.statusName != null){ 
                        if(selectedBox.statusName.includes('false_')){
                        aux = selectedBox.statusName.split('_');
                    }
                    var obj = statusList.find(obj => obj.value == 'chk_'+aux[1]);
                    selectedStatus.push(obj.value);
                    this.selectedstatuses = selectedStatus;
                }
                

            }else if(selectedBox.parsedStatusDescription == this.label.PAY_Status_InReviewOne){
            
                var obj = statusList.find(obj => obj.value == 'chk_'+selectedBox.statusName);
                selectedStatus.push(obj.value);
                this.selectedstatuses = selectedStatus;


            }else if(selectedBox.parsedStatusDescription == this.label.PAY_Status_ScheduledOne){
        
                var obj = statusList.find(obj => obj.value == 'chk_'+selectedBox.statusName);
                selectedStatus.push(obj.value);
                this.selectedstatuses = selectedStatus;

                var d = [];
                // Curent date
                var currentDate = new Date();
                var currentMonth = currentDate.getMonth()+1;
                currentMonth = ("0" + currentMonth).slice(-2);

                var currentDay = currentDate.getDate();
                currentDay = ("0" + currentDay).slice(-2);

                var iToday = currentDate.getFullYear() + "-" + currentMonth + "-" + currentDay;
                d.push(iToday);
                var toDate = new Date();
                toDate.setDate(toDate.getDate() + 7);

                var toDay = toDate.getDate();
                toDay = ("0" + toDay).slice(-2);

                var toMonth = toDate.getMonth()+1;
                toMonth = ("0" + toMonth).slice(-2);

                var nextWeek = toDate.getFullYear() + "-" + toMonth + "-" + toDate.getDate();	
                d.push(nextWeek);
                    
                this.dates = d;		

            }else if(selectedBox.parsedStatusDescription == this.label.PAY_Status_CompletedOne){

                var obj = statusList.find(obj => obj.value == 'chk_'+selectedBox.statusName);
                selectedStatus.push(obj.value);
                this.selectedstatuses = selectedStatus;

                var d = [];
                // Curent date
                var currentDate = new Date();
                var currentMonth = currentDate.getMonth()+1;
                currentMonth = ("0" + currentMonth).slice(-2);

                var currentDay = currentDate.getDate();
                currentDay = ("0" + currentDay).slice(-2);

                var iToday = currentDate.getFullYear() + "-" + currentMonth + "-" + currentDay;
                
                var toDate = new Date();
                toDate.setDate(toDate.getDate() - 7);

                var toDay = toDate.getDate();
                toDay = ("0" + toDay).slice(-2);

                var toMonth = toDate.getMonth()+1;
                toMonth = ("0" + toMonth).slice(-2);

                var nextWeek = toDate.getFullYear() + "-" + toMonth + "-" + toDay;	
                d.push(nextWeek);
                    d.push(iToday);
                this.dates = d;


            }else if(selectedBox.parsedStatusDescription == this.label.PAY_Status_RejectedOne){
                
                var obj = statusList.find(obj => obj.value == 'chk_'+selectedBox.statusName);
                selectedStatus.push(obj.value);
                this.selectedstatuses = selectedStatus;
                var d = [];
                // Curent date
                var currentDate = new Date();
                var currentMonth = currentDate.getMonth()+1;
                currentMonth = ("0" + currentMonth).slice(-2);

                var currentDay = currentDate.getDate();
                currentDay = ("0" + currentDay).slice(-2);

                var iToday = currentDate.getFullYear() + "-" + currentMonth + "-" + currentDay;
                
                var toDate = new Date();
                toDate.setDate(toDate.getDate() - 7);

                var toDay = toDate.getDate();
                toDay = ("0" + toDay).slice(-2);

                var toMonth = toDate.getMonth()+1;
                toMonth = ("0" + toMonth).slice(-2);

                var nextWeek = toDate.getFullYear() + "-" + toMonth + "-" + toDay;	
                d.push(nextWeek);
                d.push(iToday);
                this.dates = d;

            }
            this.template.querySelector('[data-id="statusDropdownModal"]').setSelectedValues(this.selectedstatuses); //setSelectedValues metodo @api
        }else{
            var selectedCurrencies = this.selectedcurrencies;
            if(selectedCurrencies != undefined && selectedCurrencies != null){
                this.template.querySelector('[data-id="currencyDropdownModal"]').setSelectedValues(this.selectedcurrencies);
            }
            var selectedStatuses = this.selectedstatuses;
                if(selectedStatuses != undefined && selectedStatuses != null){
                    this.template.querySelector('[data-id="statusDropdownModal"]').setSelectedValues(this.selectedstatuses);
            }
            
            var selectedCountry = this.selectedcountry;
            if(selectedCountry != undefined && selectedCountry != null){                
                var items = [];
                items.push(selectedCountry);
                this.template.querySelector('[data-id="countryDropdownModal"]').setSelectedValues(items);
            } 
            var selectedMethod = this.selectedmethod;
            if(selectedMethod != undefined && selectedMethod != null){                
                var items = [];
                items.push(selectedMethod);
                this.template.querySelector('[data-id="methodDropdownModal"]').setSelectedValues(items);
            } 
            var fromDecimal = this.fromdecimal;
            if(fromDecimal != undefined && fromDecimal != null){
                this.setValue(fromDecimal, 'fromAmount');
            }
            var toDecimal = this.todecimal;
            if(toDecimal != undefined && toDecimal != null){
                this.setValue(toDecimal, 'toAmount');
            }
        }
        this.setAppliedFilters();
        
    }
        
        
    setAppliedFilters(){
        var sourceAccount = this.account;
        if (sourceAccount != undefined && sourceAccount != null) {
            this.appliedsourceaccount = this.account;
        } else {
            this.appliedsourceaccount = {};
        }
        this.appliedformattedvaluefrom = this.formattedvaluefrom;
        this.appliedformattedvalueto =  this.formattedvalueto;
        this.appliedfromdecimal = this.fromdecimal;
        this.appliedtodecimal = this.toDecimal;
        this.applieduserinputfrom = this.userinputfrom;
        this.applieduserinputto = this.userinputto;
        this.appliedselectedcurrencies = this.selectedcurrencies;
        this.appliedselectedstatuses = this.selectedstatuses;        
        this.appliedselectedmethod = this.selectedmethod;
        this.appliedclientreference = this.clientreference;
        this.appliedselectedcountry = this.selectedcountry;

        this.applieddates = this.dates;
    }

    setValue(value, inputId){
        
        if (value != undefined && value != null) {   
                        
            if (inputId != undefined && inputId != null) {            
                
                let locale = this.locale;
                var formatValue = '';
                formatValue = Intl.NumberFormat(locale).format(value);
                if(inputId == 'fromAmount'){
                    this.formattedvaluefrom = formatValue;
                    this.userinputfrom = formatvalue;
                }
                if(inputId == 'toAmount'){
                    this.formattedvalueto = formatvalue;
                    this.userinputto = formatvalue;
                }
            }
        }
        // helper.validateInput(component, event, helper);
    }
    
    clearSelectedPaymentStatusBox (){
        this.selectedpaymentstatusbox = '';
        
    }
          
    closeModal (){
        //document.querySelector(".comm-page-custom-landing-payments").style.overflow = 'auto';
        const closeModalFilters = new CustomEvent('buttonclose',{close: false});
        this.dispatchEvent(closeModalFilters);        
    }
           
    revertAppliedFilters(){
        this.searchedsourceaccount = '';
        this.account = this.appliedsourceaccount;
        this.formattedvaluefrom = this.appliedformattedvaluefrom;
        this.formattedvalueto = this.appliedformattedvalueto;    
        this.fromdecimal = this.appliedfromdecimal;
        this.todecimal = this.appliedtodecimal;
        this.userinputfrom = this.applieduserinputfrom;
        this.userinputto = this.applieduserinputto;
        this.selectedcurrencies = this.appliedselectedcurrencies;
        this.selectedstatuses = this.appliedselectedstatuses;
        this.selectedmethod = this.appliedselectedmethod;
        this.clientreference =  this.appliedclientreference;
        this.selectedcountry = this.appliedselectedcountry;

        this.dates = this.applieddates;
    }


    checkValidDates(){
        var from;
        var to;
        if(this.dates){
            from = this.dates[0];
            to = this.dates[1];
        }

        if(from != undefined && from != null  && to != undefined && to != null){
            if(from > to){
                this.errordate = true;
            }
            if(from <= to){
                this.errordate = false;
            }
        }else{
            this.errordate = false;
        }   
    }

    clearClientReference() {
        this.clientreference = '';        
    }
    clearAmountFrom() {
        this.fromdecimal = '';
        this.formattedvaluefrom = '';
        this.userinputfrom = '';
        this.errorsmount = false;        
    }
    clearAmountTo() {
        this.todecimal = '';
        this.formattedvalueto = '';
        this.userinputto = '';
        this.erroramount = false;        
    }
    clearDateFrom() {
        let dates = this.dates;
        dates[0] = '';
        this.dates = dates;
        let placeholders = this.datesplaceholders;
        placeholders[0] = this.label.valueDateFrom;
        this.datesplaceholders = placeholders;
        this.errordate = false;
        this.fromdateformat = false;
    }
    clearDateTo() {
        let dates = this.dates;
        dates[1] = '';
        this.dates = dates;
        let placeholders = this.datesplaceholders;
        placeholders[1] = this.label.valueDateTo;
        this.datesplaceholders = placeholders;
        this.errordate = false;   
        this.todateformat = false;   
    }
        
           
    showToast() {
        //var errorToast = component.find('accountsErrorToast');
        var errorToast = this.template.querySelector('accountsErrorToast');
        if (errorToast != undefined && errorToast != null) {
            //errorToast.showToast(action, static, notificationTitle, bodyText, functionTypeText, functionTypeClass, functionTypeClassIcon, noReload)
            //errorToast.showToast(false, false, $A.get('$Label.c.B2B_Error_Problem_Loading'),  $A.get('$Label.c.B2B_Error_Check_Connection'), 'Error', 'Warning', 'Warning', false);
            
            //showToast @api method ?
            errorToast.showToast(false, false, this.label.B2B_Error_Problem_Loading,  this.label.B2B_Error_Check_Connection, 'Error', 'Warning', 'Warning', false);
        }
    }
       
    checkValidAccount () {
        var searchedAccount = this.searchedsourceaccount;
        var selectedAccount = this.account;
        if (searchedAccount != undefined && searchedAccount != null ) {
            if (selectedAccount == undefined || selectedAccount == null) {
                var msg = this.label.B2B_Error_Invalid_Input;
                var msg_parameter = this.label.B2B_Source_account;
                var full_msg = msg.replace('{0}', msg_parameter);
                this.errormsg = full_msg;
            } else {
                this.errormsg = '';
            }
        } else {
            this.errormsg = '';
        }
    }

        
    handleChangeDates () {
        let hasChanged = false;
        let dates = this.dates;
        let placeholders = this.datesplaceholders;
        var auxPlaceholders =this.datesplaceholders;
        let fromPlaceholder = this.label.valuedatefrom;
        let toPlaceholder = this.label.valuedateto;
        if (dates[0] == undefined || dates[0] == null) {
            if (placeholders[0] != fromPlaceholder){
                placeholders[0] = fromPlaceholder;
                hasChanged = true;
            }
        } else {
            if (placeholders[0] != dates[0]){
                placeholders[0] = dates[0];
                hasChanged = true;
            }
        }
        if (dates[1] == undefined || dates[1] == null) {
            if (placeholders[1] != toPlaceholder){
                placeholders[1] = toPlaceholder;
                hasChanged = true;
            }
        } else {
            if (placeholders[1] != dates[1]){
                placeholders[1] = dates[1];
                hasChanged = true;
            }
        }
        if (hasChanged) {
            this.datesplaceholders = placeholders;
        }
    }
        
    handleChangeDatesInternal () {
        let hasChanged = false;
        let dates = this.dates;
        let placeholders = this.datesplaceholders;
        let fromPlaceholder = this.label.valueDateFrom;
        let toPlaceholder = this.label.valueDateTo;
        if (placeholders[0] == fromPlaceholder) {
            this.fromdateformat = false;
            if (dates[0] != ''){
                dates[0] = '';
                hasChanged = true;
            }
        } else {
            if (this.checkDateFormat(placeholders[0])) { //has valid format
                this.fromdateformat = false;
                if (dates[0] != placeholders[0]){
                    dates[0] = placeholders[0];
                    hasChanged = true;
                }
            } else {
                this.fromdateformat = true;
            } 
            
        }
        if (placeholders[1] == toPlaceholder) {
            this.todateformat = false;
            if (dates[1] != ''){
                dates[1] = '';
                hasChanged = true;
            }
        } else {
            if (this.checkDateFormat(placeholders[1])) {
                this.todateformat = false;
                if (dates[1] != placeholders[1]){
                    dates[1] = placeholders[1];
                    hasChanged = true;
                }
            } else {
                this.todateformat = true;
            }  
        }
        if (hasChanged) {
            this.dates = dates;
            this.checkValidDates();
        }
    }

    checkDateFormat(inputDate) {
        var isValid = false;

        let validRegExp = new RegExp('^(19|20)[0-9][0-9][-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$');
            isValid = validRegExp.test(inputDate);

        // var user = component.get('v.currentUser');
        // var format = user.dateFormat;
        // if (format = "dd/MM/yyyy") {
        //     let validRegExp = new RegExp('^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$');
        //     isValid = validRegExp.test(inputDate);

        // } else if (format = "MM/dd/yyyy") {
        //     let validRegExp = new RegExp('^(0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])[/](19|20)\d\d$');
        //     isValid = validRegExp.test(inputDate);
        // }

        return isValid;

    }
        

}