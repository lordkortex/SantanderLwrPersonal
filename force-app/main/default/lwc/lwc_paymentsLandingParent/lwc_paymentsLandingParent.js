import {LightningElement,api,track} from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import Apex method
import searchPaymentsInformation from '@salesforce/apex/CNT_PaymentsLandingParent.searchPaymentsInformation';
import getPaymentsInformation from '@salesforce/apex/CNT_PaymentsLandingParent.getPaymentsInformation';
import getPaymentsStatuses from '@salesforce/apex/CNT_PaymentsLandingParent.getPaymentsStatuses';
import getAccountData from '@salesforce/apex/CNT_PaymentsLandingParent.getAccountData';
import getUserData from '@salesforce/apex/CNT_PaymentsLandingParent.getUserData';
import decryptData from '@salesforce/apex/CNT_PaymentsLandingParent.decryptData';
import removeFile from '@salesforce/apex/CNT_PaymentsLandingParent.removeFile';
import downloadPayments from '@salesforce/apex/CNT_PaymentsLandingParent.downloadPayments';
import callToAccountsWithoutAttributions from '@salesforce/apex/CNT_PaymentsLoadUserAccounts.callToAccountsWithoutAttributions';
import discardAccountsByCountry from '@salesforce/apex/CNT_PaymentsLoadUserAccounts.discardAccountsByCountry';
import encryptAccountsData from '@salesforce/apex/CNT_PaymentsLoadUserAccounts.encryptAccountsData';
import decryptAccountsData from '@salesforce/apex/CNT_PaymentsLoadUserAccounts.decryptAccountsData';

//Import labels
import B2B_Error_Problem_Loading from '@salesforce/label/c.B2B_Error_Problem_Loading';
import B2B_Error_Check_Connection from '@salesforce/label/c.B2B_Error_Check_Connection';
import ERROR_NOT_RETRIEVED from '@salesforce/label/c.ERROR_NOT_RETRIEVED';
import PAY_fileDownloaded from '@salesforce/label/c.PAY_fileDownloaded';
import PAY_downloadSuccessful from '@salesforce/label/c.PAY_downloadSuccessful';
import domainCashNexus from '@salesforce/label/c.domainCashNexus';
import success from '@salesforce/label/c.success';
import authorizeSuccess from '@salesforce/label/c.authorizeSuccess';
import FCCError from '@salesforce/label/c.FCCError';
import FCCErrorDescription from '@salesforce/label/c.FCCErrorDescription';
import PAY_AccountsCache from '@salesforce/label/c.PAY_AccountsCache';
import refreshBalanceCollout from '@salesforce/label/c.refreshBalanceCollout';



export default class lwc_paymentsLandingParent extends LightningElement{

    //Labels
    label = {
		B2B_Error_Problem_Loading,
		B2B_Error_Check_Connection,
		ERROR_NOT_RETRIEVED,
		PAY_fileDownloaded,
		PAY_downloadSuccessful,
		domainCashNexus,
		success,
		authorizeSuccess,
		FCCError,
        FCCErrorDescription,
        PAY_AccountsCache,
        refreshBalanceCollout,

    }

    @track currentUser = {}; //Current user data
    @track accountData  //Current account data
    @track transferTypeParams = {}; 
    @track singleNumRecords = 0; //Number of records in Single tab
    @track multipleNumRecords = 0; //Number of records in Multiple tab
    @track isSingleTabSelected = true; //Attribute which detemines which tab is selected
    @track singlePaymentStatusBoxes = []; //A collection that contains the number of records of each payment status of Single tab
    @track selectedPaymentStatusBox = '';//Selected payment status
    @track initialSinglePaymentList = []; //List of single tab payments that are displayed in the table
    @track singlePaymentList = []; //List of single tab payments that are displayed in the table
    @track isSingleDataLoaded //Attribute which detemines wheather single data tab has been loaded or not
    @track showDownloadModal = false; //Boolean to show or hide download modal (lwc_paymentsLandingDownloadModal)
    @track showFilterModal = false; //Boolean to show or hide advanced filter modat (lwc_paymentsLandingFilterModal)
    @track accounts = []; //List of accounts
    @track hasSearched = false; //Controls wheather the user has made a search or not
    @track isLoading = false; //Controls whether the spinner shows when records are loading
    @track showMethodModal = false; //Controls whether the Payment Methods modal is open or not
    @track resetSearch = false; //Reset search when the button is clicked.
    @track reload = false; //Indicates if the conection with the service should be retried.
    @track noService = false; //No service so show empty table without spinner or error message if no payments.
    @track singleCurrencyDropdownList = []; //List of currencies that are displayed in the dropdown in Single tab
    @track singleStatusDropdownList = []; //List of statuses that are displayed in the dropdown in Single tab
    @track singlePaymentMethodDropdownList = []; //List of payment methods that are displayed in the dropdown in Single tab
    @track singleCountryDropdownList = []; //List of countries that are displayed in the dropdown in Single tab
    @track simpleCountryDropdownList = []; //List of countries displayed in Payment Method Modal dropdown
    @track availableStatuses = []; //List of status-reason pairs visible to front-end user
    @track searchedString = ''; //Search information placed in the account search input.
    @track selectedStatuses = []; //List of selected statuses.
    @track selectedCurrencies = []; //List of selected currencies.
    @track selectedMethod = ''; //Selected payment method.
    @track pendingOfMyAuthorization = false; //True when 'Pending of my authorization' header option is clicked.
    @track isHeaderOptionSelected = false; //True when a header option is selected.
    @track filterCounter = 0; //Counts the number of types of filers selected (source account, amount, currency, status, payment method, client, reference, destination country, date)
    @track showSpinner = true; //Controls whether the spinner shows when whole page is loading
    @track filteredPaymentList = []; //List of payments filtered by the selected filters
    @track reloadAccounts = false; //Retry the call to retrieve list of accounts.
    @track selectedRows = []; //List of payment IDs selected in the table
    @track isAllSelected = false; //Controls weather all rows are selected or not

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        this.doInit();
    }

    get getClassFullScreen(){
        return (this.showSpinner ? 'contentPayments slds-is-relative' : 'contentPayments');
    }

    openModal(){
        this.showMethodModal = true;
    }

    closeModal(){
        this.showMethodModal = false;
    }
    
    doInit() {
        this.showSpinner = true;
        var isSingleTabSelected = this.isSingleTabSelected;
        if (isSingleTabSelected == true) {
            Promise.all([this.getURLParams()])
            .then((value) => {
                console.log('1. getURLParams ok');
                return this.getCurrentUserData();
            }, this)
            .then((value) => {
                console.log('2. getCurrentUserData ok');
                return this.getAccountData();
            }, this)    
            .then((value) => {
                console.log('3. getAccountData ok');
                return this.getAccountsToList(this.currentUser); //GAA este método no existe en ningún sitio
            }, this)
            .then((value) => {
                console.log('4. getAccountsToList ok');
                return this.handleAccountsToList(JSON.parse(JSON.stringify(value)));
            }, this)
            .then((value) => {
                console.log('5. handleAccountsToList ok');
                return this.getPaymentsStatuses(isSingleTabSelected);
            }, this)
            .then((value) => {
                console.log('6. getPaymentsStatuses ok');
                return this.getPaymentsInformation(isSingleTabSelected);
            }, this)
            .catch((error) => {
                console.log('### lwc_paymentsLandingParent ### doInit() ::: Catch error: ' + JSON.stringify(error));
                this.showToast(error.title, error.body, error.noReload);
            })
            .finally(() => {
                //document.querySelector(".comm-page-custom-landing-payments").style.overflow = 'auto';
                //this.template.querySelector(".comm-page-custom-landing-payments").style.overflow = 'auto';
                this.template.querySelector(".contentPayments").style.overflow = 'auto';
                this.showSpinner = false;
            });
        } else {
            console.log('### lwc_paymentsLandingParent ### doInit() ::: else');
        }
    }   

    displayData() {
        this.showSpinner = true;
        this.noService = false;
        var isSingleTabSelected = this.isSingleTabSelected;
        if (isSingleTabSelected == true) {
            this.resetSearch = true;
            this.isSingleDataLoaded = false;
            Promise.all([this.getCurrentUserData()])
            .then( value => {
                return this.getPaymentsStatuses(isSingleTabSelected);
            }, this)
            .then( value => {
                return this.getPaymentsInformation(isSingleTabSelected);
            }, this)
            .catch( error => {
                console.log('### lwc_paymentsLandingParent ### displayData(event) ::: Catch error:' + error);
            })
            .finally( () => this.showSpinner = false);
        } else {
            this.showSpinner = false;
            console.log('### lwc_paymentsLandingParent ### displayData() ::: else');
        }
    }
        
    handleHeaderSearch() {
        var selectedStatus = this.selectedPaymentStatusBox;
        if (selectedStatus) {
            var statusLst = [];
            var statusName = selectedStatus.statusName;
            if (statusName.includes("true_")) {
                var res = statusName.split("true_");
                statusLst.push('chk_' + res[1]);
               this.pendingOfMyAuthorization = true;
            } else if (statusName.includes("false_")) {
                var res = statusName.split("false_");
                statusLst.push('chk_' + res[1]);
               this.pendingOfMyAuthorization = false;
            } else {
                statusLst.push('chk_' + selectedStatus.statusName);
            }
           this.isHeaderOptionSelected = true;
           this.selectedStatuses = statusLst;
        }
    }

    /*
    handleReloadRetrieveAccounts(event) {
        let reload = this.reloadAccounts;
        if (reload) {
            this.showSpinner = true;
            var auxGetAccounts = this.getLandingFiltersAccounts(event);
            auxGetAccounts
            .catch((error) => {
                console.log(error);
                this.showToast(error.title, error.body, error.noReload);
            })
            .finally(() => {
               this.showSpinner = false;
               this.reloadAccounts = false;
            });
        }
    }
    */

    handleReloadPage(event) {
        let reload = event.getParam('reload');
        let landing = event.getParam('landing');
        if (reload && landing) {
            this.doInit(event);
        }
    }

    handleSearchOperationsList(event) {
       this.isLoading = true;
        var filterCounter = this.filterCounter;
        if (filterCounter > 0) {
            Promise.all([
                this.searchOperationsList(event)
            ])
            .then((value) => {
               this.isLoading = false;
            })
            .catch((error) => {
                console.log('### lwc_paymentsLandingParent ### handleSearchOperationsList ::: (if) Catch error: ' + error);
            })
            .finally();
        } else {
            var lst = this.initialSinglePaymentList;
            Promise.all([
               this.singlePaymentList = lst,
               this.template.querySelector('paymentsLandingTable').setComponent(lst)
            ])
            .then((value) => {
               this.isLoading = false;
            })
            .catch((error) => {
                console.log('### lwc_paymentsLandingParent ### handleSearchOperationsList ::: (else) Catch error: ' + error);
            })
            .finally();
        }
    }

    handleResetSearch(event) {
        var reset = this.resetSearch;
        if (reset) {
            var initialList = this.initialSinglePaymentList;
            this.template.querySelector('paymentsLandingTable').setComponent(initialList);
            this.singlePaymentList = initialList;
            console.log('### lwc_paymentsLandingParent ### handleResetSearch(event)');
        }
    }

    handleDownload(event) {
       this.showSpinner = true;

        let params = event.getParams();
        let fileFormat = "";
        if (params) {
            fileFormat = params.format;
        }
        this.getDocumentId(fileFormat)
        .then((documentId) => {
            return this.downloadFile(event, documentId);
        })
        .then((documentId) => {    
            this.removeFile(event, documentId);
        }, this)
        .catch((error) => {
            this.showToast(error.title, error.body, error.noReload);
        })
        .finally(() => this.showSpinner = false);

        /*
        Promise.all([
            this.callDownload(event, fileFormat)
        ]).then((results) => {
            if(results!=null && results!='' && results!=undefined){
                var domain=this.label.domain');
                window.location.href = domain+'/sfc/servlet.shepherd/document/download/'+results+'?operationContext=S1';
                //setTimeout(function(){
                    this.removeFile(event, results);
                //}, 100);
            }
        }, this)
        .catch((error) {
            this.showToast(error.title, error.body, error.noReload);
        })
        .finally( () => this.showSpinner = false);
        }));
        */
    }
    
    displaySendToReviewToast(event) {
        if(event){
            this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true);
        }
    }
    
    getCurrentUserData() {
        var errorLoading = this.label.B2B_Error_Problem_Loading;
        var errorCheckConnection = this.label.B2B_Error_Check_Connection;
        var thisp = this;
        return new Promise(function(resolve, reject) {
            getUserData()
            .then((result) => {
                var currentUser = {};
                console.log('GAA getCurrentUserData result: ' + JSON.stringify(result.value.userData));
                if (result.success) {
                    if(result.value){
                        if(result.value.userData){
                            currentUser = JSON.parse((JSON.stringify(result.value.userData)));//result.value.userData;
                            thisp.currentUser = currentUser;
                            resolve(result.value.userData);
                            //resolve(result.value.userData);
                        }else{
                            reject({
                                'title': errorLoading,
                                'body': errorCheckConnection,
                                'noReload': false
                            });
                        }
                    }else{
                        reject({
                            'title': errorLoading,
                            'body': errorCheckConnection,
                            'noReload': false
                        });
                    }                       
                    
                } else {
                    reject({
                        'title': errorLoading,
                        'body': errorCheckConnection,
                        'noReload': false
                    });
                }
            })
            .catch((errors) => {
                console.log('### lwc_paymentsLandingParent ### getCurrentUserData() ::: Catch Error: ' + errors);
                reject({
                    'title': errorLoading,
                    'body': errorCheckConnection,
                    'noReload': false
                });
            })
        }, this); 
    }
    
    getAccountData() {
        var errorNotRetrieved = this.label.ERROR_NOT_RETRIEVED;
        var thisp = this;
        return new Promise(function(resolve, reject) {
            getAccountData()
            .then((result) => {
                var accountData = {};
                if (result.success) {
                    if (result.value.cib) {
                        accountData.cib = result.value.cib;
                    } else {
                        accountData.cib = false; // Añadir un error
                    }
                    if (result.value.documentType) {
                        accountData.documentType = result.value.documentType;
                    } else { // FLOWERPOWER_PARCHE_MINIGO
                        accountData.documentType = 'tax_id'; // Añadir un error
                    }
                    if (result.value.documentNumber) {
                        accountData.documentNumber = result.value.documentNumber;
                    } else { // FLOWERPOWER_PARCHE_MINIGO
                        accountData.documentNumber = 'B86561412'; // Añadir un error
                    }
                    if (result.value.companyId) {
                        accountData.companyId = result.value.companyId;
                    } else { // FLOWERPOWER_PARCHE_MINIGO
                        accountData.companyId = '2119'; // Añadir un error
                    }
                }
                thisp.accountData = JSON.parse(JSON.stringify(accountData));
                console.log('GAA getAccountData result: ' + JSON.stringify(accountData));
                resolve(accountData);
            })
            .catch((errors) => {
                console.log('### lwc_paymentsLandingParent ### getAccountData() ::: Catch Error: ' + errors);
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                }
                reject({
                    'header': errorNotRetrieved,
                    'text': errorNotRetrieved,
                    'noReload': true
                });
            })              
        }, this);
    }
    
    handleAccountsToList(value) {	
        var titleError = this.label.B2B_Error_Problem_Loading;
        var bodyError = this.label.B2B_Error_Check_Connection;
        this.accounts = value ? value : this.accounts;
        return new Promise(function(resolve, reject) {
            if (value) {
                resolve('handleAccountsToList_OK');
            } else {
                reject({
                    'title': titleError,
                    'body': bodyError,
                    'noReload': false
                });
            }
        }, this);  
    }
    
    
    /*
    getCurrentAccounts(event) {	
        let accountList = this.accounts;
        return new Promise(function(resolve, reject) {
            if (!accountList) {
                var isCashNexusUser =  this.currentUser.isNexus;
                console.log('global user id: ' + isCashNexusUser);                
                getAccounts({ 
                    "isCashNexusUser" : isCashNexusUser 
                })               
                .then((result) => {
                    if (result.success) {
                        this.accounts = result.value.accountList;
                         //this.showAccountsToast = false;
                    } else {
                         console.log(this.label.B2B_Problem_accounts);
                         //this.showAccountsToast = true;
                         this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, false);
                     }
                     resolve('La ejecucion ha sido correcta.');
                })
                .catch((errors) => {
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + errors[0].message);
                        }
                    } else {
                        console.log(this.label.B2B_Problem_accounts);
                    }
                    //this.showAccountsToast = true;
                    this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, false);
                    reject(this.label.ERROR_NOT_RETRIEVED);
                })
            }
        }, this);  
    }
    */    
    
    getPaymentsStatuses(isSingleTabSelected) {
        var accounts = this.accounts;
        var globalUserId = this.currentUser.globalId;
        var errorTitle = this.label.B2B_Error_Problem_Loading;
        var errorBody = this.label.B2B_Error_Check_Connection;
        var errorNoReload = false;
        var thisp = this;
        return new Promise(function(resolve, reject) {
            getPaymentsStatuses({
                'accountList': accounts,
                'globalUserId': globalUserId
            })
            .then((result) => {
                if (result.success) {  
                    if (result && isSingleTabSelected) {
                        if (result.value) {
                            if (result.value.output) {
                                if (result.value.output.paymentStatusList) {                  
                                    thisp.singlePaymentStatusBoxes = result.value.output.paymentStatusList;
                                }
                                if (result.value.output.totalNumberOfRecords) {                  
                                    thisp.singleNumRecords = result.value.output.totalNumberOfRecords;
                                }
                                resolve('ok');
                            } else {
                                resolve('error statusHeader');
                                thisp.showToast(errorTitle, errorBody, errorNoReload);
                            }
                        } else {
                            resolve('error statusHeader');
                            thisp.showToast(errorTitle, errorBody, errorNoReload);
                        }
                    } else {
                        resolve('error statusHeader');
                        thisp.showToast(errorTitle, errorBody, errorNoReload);
                    }                      
                } else {
                    resolve('error statusHeader');
                    thisp.showToast(errorTitle, errorBody, errorNoReload);
                }
            })  
            .catch((errors) => {
                console.log('lwc_paymentsLandingError');
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                }
                resolve('error statuseHeader');
                thisp.showToast(errorTitle, errorBody, errorNoReload);
            })         
        }, this); 
    }
       
    getPaymentsInformation(isSingleTabSelected) {
        var titleError = this.label.B2B_Error_Problem_Loading;
        var bodyError = this.label.B2B_Error_Check_Connection;
        var accounts = this.accounts;
        var thisp = this;
        return new Promise(function(resolve, reject) {
            getPaymentsInformation({     
                'accountList': accounts
            })
            .then((result) => {
                if(isSingleTabSelected){
                    if(result){
                        if(result.success){
                            if(result.value){
                                if(result.value.output){
                                    thisp.singleStatusDropdownList = result.value.output.statusList;
                                    thisp.singleCurrencyDropdownList = result.value.output.currencyList;
                                    thisp.singlePaymentMethodDropdownList = result.value.output.paymentTypeList;
                                    thisp.singleCountryDropdownList = result.value.output.countryList;
                                    thisp.simpleCountryDropdownList = result.value.output.countryList;                                         
                                    thisp.initialSinglePaymentList = result.value.output.paymentsList;
                                    thisp.singlePaymentList = result.value.output.paymentsList;
                                    thisp.template.querySelector('paymentsLandingTable').setComponent(result.value.output.paymentsList);                                        
                                    thisp.isSingleDataLoaded = true;
                                    thisp.availableStatuses = result.value.output.availableStatuses;
                                    resolve('getPaymentsInformation_OK'); 
                                }else{
                                    reject({
                                        'title': titleError,
                                        'body': bodyError,
                                        'noReload': false
                                    }); 
                                } 
                            }else{
                                reject({
                                    'title': titleError,
                                    'body': bodyError,
                                    'noReload': false
                                });
                            }
                            
                        }else{
                            if(result.value){
                                if(result.value.output){
                                    thisp.singleStatusDropdownList = result.value.output.statusList;
                                    thisp.singleCurrencyDropdownList = result.value.output.currencyList;
                                    thisp.singlePaymentMethodDropdownList = result.value.output.paymentTypeList;
                                    thisp.singleCountryDropdownList = result.value.output.countryList;
                                    thisp.simpleCountryDropdownList = result.value.output.countryList;
                                    thisp.isSingleDataLoaded = true;
                                    reject({
                                        'title': titleError,
                                        'body': bodyError,
                                        'noReload': false
                                    }); 
                                }else{
                                    reject({
                                        'title': titleError,
                                        'body': bodyError,
                                        'noReload': false
                                    }); 
                                }
                            }else{
                                reject({
                                    'title': titleError,
                                    'body': bodyError,
                                    'noReload': false
                                });
                            }
                        }
                    }else{
                        reject({
                            'title': titleError,
                            'body': bodyError,
                            'noReload': false
                        }); 
                    }
                }
            })
            .catch((errors) => {
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                }
                reject({
                    'title': titleError,
                    'body': bodyError,
                    'noReload': false
                });
            })
        }, this);
    }
    
    searchOperationsList(event) {        
        return new Promise(function(resolve, reject) {
            var globalUserId = event.getParam('globalUserId'); 
            var pendingAuthorization = event.getParam('pendingAuthorization'); 
            var latestOperationsFlag = false;//event.getParam('latestOperationsFlag'); 
            var sourceAccountList = event.getParam('sourceAccountList'); 
            var destinationCountry = event.getParam('destinationCountry');
            var statusList = event.getParam('statusList');
            var amountFrom = event.getParam('amountFrom');
            var amountTo = event.getParam('amountTo');
            var currencyList = event.getParam('currencyList');
            var paymentType = event.getParam('paymentMethod');
            var clientReference = event.getParam('clientReference');
            var valueDateFrom = event.getParam('valueDateFrom');
            var valueDateTo = event.getParam('valueDateTo');
            var accountList = this.accounts;
            
            searchPaymentsInformation({     
                'globalUserId': globalUserId,
                'pendingAuthorization': pendingAuthorization,
                'sourceAccountList': sourceAccountList,
                'destinationCountry': destinationCountry,
                'statusList': statusList,
                'amountFrom': amountFrom,
                'amountTo': amountTo,
                'currencyList': currencyList,
                'productId': paymentType,
                'clientReference': clientReference,
                'valueDateFrom': valueDateFrom,
                'valueDateTo': valueDateTo,
                'latestOperationsFlag': latestOperationsFlag,
                'accountList': accountList
            })
            .then((result) => {
                if (result.success) {
                    this.template.querySelector('paymentsLandingTable').setComponent(result.value.output.paymentsList);
                    this.singlePaymentList = result.value.output.paymentsList;
                    resolve('ok');                    
                } else {
                    this.template.querySelector('paymentsLandingTable').setComponent(null);
                    this.singlePaymentList = null;
                    console.log('ko');
                    reject(this.label.ERROR_NOT_RETRIEVED);                       
                }          
            })
            .catch((errors) => {
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                } else {
                    console.log('Unknown error');
                }
                this.template.querySelector('paymentsLandingTable').setComponent(null);
                this.singlePaymentList = null;
                reject(this.label.ERROR_NOT_RETRIEVED);
            })       
        }, this); 
    }
    
    showToast(title, body, noReload) {
        this.template.querySelector('c-lwc_b2b_toast').openToast(false, false, title,  body, 'Error', 'warning', 'warning', noReload, true);
    }
    
    showSuccessToast(title, body) {
       this.template.querySelector('c-lwc_b2b_toast').openToast(false, false, title,  body, 'Success', 'success', 'success', true, true);
    }    
    
    getDocumentId(fileFormat) {
        var errorLoading = this.label.B2B_Error_Problem_Loading;
        var errorCheckConnection = this.label.B2B_Error_Check_Connection;
        return new Promise(function(resolve, reject) {
            var documentId = '';
            downloadPayments({
                "accountList": this.accounts,
                "fileFormat": fileFormat
            })            
            .then(result => {
                if (result.success) {
                    if (result.value) {
                        if (result.value.output) {
                            if (result.value.output.documentId) {    
                                documentId = result.value.output.documentId;
                                var fileName = '';  
                                if (result.value.output.fileName) {
                                    fileName = result.value.output.fileName;
                                }
                                var toastText = this.label.PAY_fileDownloaded;
                                toastText = toastText.replace("{0}", fileName);
                                this.showSuccessToast(this.label.PAY_downloadSuccessful, toastText);
                                resolve(documentId);
                            }else {
                                reject({
                                    'title': errorLoading,
                                    'body': errorCheckConnection,
                                    'noReload': true
                                });
                            }
                        } else {
                            reject({
                                'title': errorLoading,
                                'body': errorCheckConnection,
                                'noReload': true
                            });
                        }
                    } else {
                        reject({
                            'title': errorLoading,
                            'body': errorCheckConnection,
                            'noReload': true
                        });
                    }
                    
                } else {
                    reject({
                        'title': errorLoading,
                        'body': errorCheckConnection,
                        'noReload': true
                    });
                }
            })
            .catch(errors => {
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                }
                reject({
                    'title': errorLoading,
                    'body': errorCheckConnection,
                    'noReload': true
                });
            })
        }, this); 
    }    
    
    removeFile(event, ID){
        try{
            removeFile({
                id:ID
            })
            .then(result => {})
            .catch(errors => {
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("### lwc_paymentsLandingParent ### removeFile(event, ID) ::: Catch Error: " + errors);
                }
            })                       
        } catch (e) {
            console.log('### lwc_paymentsLandingParent ### removeFile(event, ID) ::: Catch error: ' + e);
        }
    }
    
    downloadFile(event, documentId) {
        var errorLoading = this.label.B2B_Error_Problem_Loading;
        var errorCheckConnection = this.label.B2B_Error_Check_Connection;
        return new Promise(function(resolve, reject) {
            if(documentId!=null && documentId!='' && documentId!=undefined){
                var domain = this.label.domainCashNexus;
                window.location.href = domain+'/sfc/servlet.shepherd/document/download/'+documentId+'?operationContext=S1';
                resolve(documentId);
            } else {
                reject({
                    'title': errorLoading,
                    'body': errorCheckConnection,
                    'noReload': true
                });
            }
        },this); 
    }    
    
    decrypt(data) {
        try {
            var result = "null"; 
            return new Promise(function(resolve, reject) {
                decryptData({ 
                    str : data 
                })
                .then(response => {
                    if (response) {
                        result = response;
                        resolve(result);
                    }
                }).catch(errors => {
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                            reject(response.getError()[0]);
                        }
                    } else {
                        console.log('Unknown error');
                    }
                    resolve(result);
                });
            });            
        } catch (e) {
            console.error('### lwc_paymentsLandingParent ### decrypt(data) ::: Catch error: ' + e);
        }
    }

    getURLParams() {
        try {
            var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
            var sURLVariablesMain = sPageURLMain.split('&')[0].split("=");
            var sParameterName;
            var sPageURL;
            if (sURLVariablesMain[0] == 'params') {
                if (sURLVariablesMain[1] != '' && sURLVariablesMain[1] != undefined && sURLVariablesMain[1] != null) {
                    //this.decrypt(sURLVariablesMain[1]).then( (results) {
                    this.decrypt(sURLVariablesMain[1]).then( (results) => {
                        sURLVariablesMain[1] === undefined ? 'Not found' : sPageURL = results;
                        var sURLVariables = sPageURL.split('&');
                        
                        for (var i = 0; i < sURLVariables.length; i++) {
                            sParameterName = sURLVariables[i].split('=');
                            if (sParameterName[0] === 'c__signed') {
                                if(sParameterName[1] && sParameterName[1] != 'false'){
                                    this.showSuccessToast(this.label.success, this.label.authorizeSuccess);
                                }
                            }
                            if (sParameterName[0] === 'c__FFCError') {
                                if (sParameterName[1] && sParameterName[1] == 'true') {
                                    this.showToast(this.label.FCCError, this.label.FCCErrorDescription, true);
                                }
                            }
                        }
                    });
                }
            } else{
                //console.log('GAA No existen parámetros en la URL: ' + sURLVariablesMain);
            }
        
        } catch (e) {
            console.log('### lwc_paymentsLandingParent ### getURLParams(event) ::: Catch error: ' + e);
        }
    }

    getAccountsToList(userData) {
        var errorLoading = this.label.B2B_Error_Problem_Loading;
        var errorProblemAccounts = this.label.B2B_Problem_accounts;
        var errorCheckConnection = this.label.B2B_Error_Check_Connection;
        return new Promise( (resolve, reject) => {
            let key = 'AccountsToList';
            this.handleRetrieveFromCache(key)
            .then( (value) => {
                if (value) {
                    resolve(value);
                } else {
                    this.callToAccountsWithoutAttributions(userData)
					.then( (value) => {
                        return this.discardAccountsByCountry(userData, value);
                    }).then( (value) => {
                        return this.handleSaveToCache(key, value);
                    }).then( (value) => {
                        resolve(value);
                    }).catch( (error) => {
                        console.log(error);
                        reject({
                            'title': errorLoading,
                            'body': errorProblemAccounts,
                            'noReload': false
                        });
                    });
                }
            }).catch( (error) => {
                console.log(error);
                reject({
                    'title': errorLoading,
                    'body': errorCheckConnection,
                    'noReload': false
                });
            });
        }, this);
    }

    handleRetrieveFromCache(key) {
        return new Promise( (resolve, reject) => {
            const PAY_AccountsCache = this.label.PAY_AccountsCache;
            if (PAY_AccountsCache === 'false') {
                resolve(null);
            } else {
                let userId = this.userId;
                let data = window.localStorage.getItem(userId + '_' + key);
                let timestamp = window.localStorage.getItem(userId + '_' + key + '_timestamp');
                let isFreshData = timestamp != 'null' && timestamp != undefined && ((new Date() - new Date(Date.parse(timestamp))) < parseInt(this.label.refreshBalanceCollout) * 60000);
                console.log(timestamp);
                console.log(isFreshData);
                if (data && isFreshData) {
                    decryptAccountsData({ 
                        str : data
                    })
                    .then( response =>{
                        let stateRV = response;
                        if (stateRV.success == true) {
                            if (stateRV.value.result) {
                                let result = stateRV.value.result;
                                resolve(JSON.parse(result));
                            } else {
                                reject('REJECT');
                            }                           
                        } else {
                            reject('REJECT');
                        }
                    })
                    .catch( error => {
                        let errors = error;
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log('Error message: ' + errors[0].message);
                            }
                        }
                        reject('REJECT');
                    })
                } else {
                    resolve(undefined);
                }
            }
        });
    }

    callToAccountsWithoutAttributions(nexus) {
        return new Promise( (resolve, reject) => {
            callToAccountsWithoutAttributions({
                'userData': nexus
            })
            .then( (result) => {
                var stateRV = result;
                if (stateRV.success) {
                    resolve(stateRV.value.accountList);
                } else {
                    reject('callToAccountsWithAttributions_ERROR');
                }
            })
            .catch( (errors) => {
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                }
                reject('callToAccountsWithAttributions_ERROR');
            })           
        }, this);
    }

    discardAccountsByCountry(userData, accountList){
        return new Promise( (resolve, reject) => {
            discardAccountsByCountry({
                'userData': userData,
                'accountList': accountList
            })
            .then( (result) => {
                var stateRV = result;
                if (stateRV.success) {
                    resolve(stateRV.value.accountList);
                } else {
                    reject('discardAccountsByCountry_ERROR');
                }
            })
            .catch( (erros) => {
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                }
                reject('discardAccountsByCountry_ERROR');
            })
        }, this);
    }

    handleSaveToCache(key, data) {
        const PAY_AccountsCache = this.label.PAY_AccountsCache;
        return new Promise( (resolve, reject) => {
            if (PAY_AccountsCache === 'false') {
                resolve(data);
            } else {
                let userId = this.userId
                encryptAccountsData({
                    str : JSON.stringify(data)
                })
                .then( response => {
                    let stateRV = response;
                    if (stateRV.success) {
                        let result = stateRV.value.result;
                        window.localStorage.setItem(userId + '_' + key, result);
                        window.localStorage.setItem(userId + '_' + key + '_timestamp', new Date());
                        resolve(data);
                    } else {
                        reject('REJECT');
                    }
                })
                .catch( error => {
                    let errors = error;
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    reject('REJECT');
                })
            }
        });
    }
}