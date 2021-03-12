import {LightningElement,api,track} from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';

import { NavigationMixin } from 'lightning/navigation';

import uId from '@salesforce/user/Id';

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



export default class lwc_paymentsLandingParent extends NavigationMixin(LightningElement) {

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
    
    @track urlFilter = ''; //User selected a filter through URL


    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        this.userId = uId;
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
            .then( (value) => {
                return this.getCurrentUserData();
            }, this)
            .then( (value) => {
                return this.getAccountData();
            }, this)    
            .then( (value) => {
                return this.getAccountsToList(this.currentUser); //GAA este método no existe en ningún sitio
            }, this)
            .then( (value) => {
                return this.handleAccountsToList(JSON.parse(JSON.stringify(value)));
            }, this)
            .then( (value) => {
                return Promise.all([
                    this.getPaymentsStatuses(isSingleTabSelected),
                    this.getPaymentsInformation(isSingleTabSelected)
                ]);
            }, this)  
            .then( (value) => {
                console.log('6. PaymentsStatuses & PaymentsInformation ok');
                this.template.querySelector('c-lwc_payments-landing-boxes').updatePaymentStatusBoxes();
                return this.getURLStatus();
            }, this)  
            .catch( (error) => {
                console.log('### lwc_paymentsLandingParent ### doInit() ::: Catch error: ' + JSON.stringify(error));
                this.showToast(error.title, error.body, error.noReload);
            })
            .finally( () => {
                //document.querySelector(".comm-page-custom-landing-payments").style.overflow = 'auto';
                //this.template.querySelector(".comm-page-custom-landing-payments").style.overflow = 'auto';
                this.template.querySelector('c-lwc_payments-landing-boxes').updatePaymentStatusBoxes();
                //this.template.querySelector(".contentPayments").style.overflow = 'auto';
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
                return Promise.all([
                    this.getPaymentsStatuses(isSingleTabSelected),
                    this.getPaymentsInformation(isSingleTabSelected)
                ]);
                
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
               //this.template.querySelector('[data-id="paymentsLandingTable"]').setComponent(lst)
               this.template.querySelector('c-lwc_payments-landing-table').setPaymentList(lst),
               this.template.querySelector('c-lwc_payments-landing-table').doInit()   
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
            //this.template.querySelector('[data-id="paymentsLandingTable"]').setComponent(initialList);
            this.template.querySelector('c-lwc_payments-landing-table').setPaymentList(initialList),
            this.template.querySelector('c-lwc_payments-landing-table').doInit()   


            this.singlePaymentList = initialList;
            console.log('### lwc_paymentsLandingParent ### handleResetSearch(event)');
        }
    }

    handleDownload(format) {
        this.showSpinner = true;
        let fileFormat = "";
        if (format) {
            fileFormat = format;
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
        return new Promise( function(resolve, reject) {
            getUserData()
            .then((result) => {
                var currentUser = {};
                console.log('GAA getCurrentUserData result: ' + JSON.stringify(result.value.userData));
                if (result.success) {
                    if(result.value){
                        if(result.value.userData){
                            currentUser = JSON.parse((JSON.stringify(result.value.userData)));//result.value.userData;
                            this.currentUser = currentUser;
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
        }.bind(this)); 
    }
    
    getAccountData() {
        var errorNotRetrieved = this.label.ERROR_NOT_RETRIEVED;
        return new Promise( function(resolve, reject) {
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
                this.accountData = JSON.parse(JSON.stringify(accountData));
                console.log('GAA getAccountData result: ' + JSON.stringify(accountData));
                resolve(accountData);
            })
            .catch((errors) => {
                console.log('### lwc_paymentsLandingParent ### getAccountData() ::: Catch Error: ' + JSON.stringify(errors));
                reject({
                    'header': errorNotRetrieved,
                    'text': errorNotRetrieved,
                    'noReload': true
                });
            })              
        }.bind(this));
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
        }.bind(this));  
    }
    
    
    /*
    getCurrentAccounts(event) {	
        let accountList = this.accounts;
        return new Promise( function(resolve, reject) {
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
        }.bind(this));  
    }
    */    
    
    getPaymentsStatuses(isSingleTabSelected) {
        var errorTitle = this.label.B2B_Error_Problem_Loading;
        var errorBody = this.label.B2B_Error_Check_Connection;
        var errorNoReload = false;
        return new Promise( function(resolve, reject) {
            getPaymentsStatuses({
                'accountList': this.accounts,
                'globalUserId': this.currentUser.globalId
            })
            .then((result) => {
                if (result.success) {  
                    if (result && isSingleTabSelected) {
                        if (result.value) {
                            if (result.value.output) {
                                if (result.value.output.paymentStatusList) {                  
                                    this.singlePaymentStatusBoxes = result.value.output.paymentStatusList;
                                }
                                if (result.value.output.totalNumberOfRecords) {                  
                                    this.singleNumRecords = result.value.output.totalNumberOfRecords;
                                }
                                resolve('ok');
                            } else {
                                resolve('error statusHeader');
                                this.showToast(errorTitle, errorBody, errorNoReload);
                            }
                        } else {
                            resolve('error statusHeader');
                            this.showToast(errorTitle, errorBody, errorNoReload);
                        }
                    } else {
                        resolve('error statusHeader');
                        this.showToast(errorTitle, errorBody, errorNoReload);
                    }                      
                } else {
                    resolve('error statusHeader');
                    this.showToast(errorTitle, errorBody, errorNoReload);
                }
            })  
            .catch((errors) => {
                console.log('### lwc_paymentsLandingParent ### getPaymentsStatuses ::: Catch error: ' + errors);
                resolve('error statuseHeader');
                this.showToast(errorTitle, errorBody, errorNoReload);
            })         
        }.bind(this)); 
    }
       
    getPaymentsInformation(isSingleTabSelected) {
        var titleError = this.label.B2B_Error_Problem_Loading;
        var bodyError = this.label.B2B_Error_Check_Connection;
        return new Promise( function(resolve, reject) {
            getPaymentsInformation({     
                'accountList': this.accounts
            })
            .then((result) => {
                console.log('### lwc_paymentsLandingParent ### getPaymentsInformation() ::: Consulta Apex realizada con éxito: ' + JSON.stringify(result));
                if(isSingleTabSelected){
                    if(result){
                        if(result.success){
                            if(result.value){
                                if(result.value.output){
                                    this.singleStatusDropdownList = result.value.output.statusList;
                                    this.singleCurrencyDropdownList = result.value.output.currencyList;
                                    this.singlePaymentMethodDropdownList = result.value.output.paymentTypeList;
                                    this.singleCountryDropdownList = result.value.output.countryList;
                                    this.simpleCountryDropdownList = result.value.output.countryList;                                         
                                    this.initialSinglePaymentList = result.value.output.paymentsList;
                                    this.singlePaymentList = result.value.output.paymentsList;
                                    this.template.querySelector('c-lwc_payments-landing-table').setPaymentList(result.value.output.paymentsList);                                        
                                    this.template.querySelector('c-lwc_payments-landing-table').doInit();                                        
                                    this.isSingleDataLoaded = true;
                                    this.availableStatuses = result.value.output.availableStatuses;
                                    resolve('ok'); 
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
                                    this.singleStatusDropdownList = result.value.output.statusList;
                                    this.singleCurrencyDropdownList = result.value.output.currencyList;
                                    this.singlePaymentMethodDropdownList = result.value.output.paymentTypeList;
                                    this.singleCountryDropdownList = result.value.output.countryList;
                                    this.simpleCountryDropdownList = result.value.output.countryList;
                                    this.isSingleDataLoaded = true;
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
        }.bind(this));
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
                    //this.template.querySelector('[data-id="paymentsLandingTable"]').setComponent(result.value.output.paymentsList);
                    this.template.querySelector('c-lwc_payments-landing-table').setPaymentList(result.value.output.paymentsList);                                        
                    this.template.querySelector('c-lwc_payments-landing-table').doInit();   

                    this.singlePaymentList = result.value.output.paymentsList;
                    resolve('ok');                    
                } else {
                    //this.template.querySelector('[data-id="paymentsLandingTable"]').setComponent(null);
                    this.template.querySelector('c-lwc_payments-landing-table').setPaymentList(null);                                        
                    this.template.querySelector('c-lwc_payments-landing-table').doInit();   

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
                //this.template.querySelector('[data-id="paymentsLandingTable"]').setComponent(null);
                this.template.querySelector('c-lwc_payments-landing-table').setPaymentList(null);                                        
                this.template.querySelector('c-lwc_payments-landing-table').doInit();   

                this.singlePaymentList = null;
                reject(this.label.ERROR_NOT_RETRIEVED);
            })       
        }.bind(this)); 
    }
    
    showToast(title, body, noReload) {
        var myEvent = {
            detail: {
                action: false, 
                static: false, 
                notificationTitle: title,
                bodyText: body, 
                functionTypeText: 'Error', 
                functionTypeClass: 'warning', 
                functionTypeClassIcon: 'warning', 
                noReload: noReload,
                landing: true
            }
        }
        this.template.querySelector('c-lwc_b2b_toast').openToast(myEvent);
    }
    
    showSuccessToast(title, body) {
        var myEvent = {
            detail: {
                action: false, 
                static: false, 
                notificationTitle: title,
                bodyText: body, 
                functionTypeText: 'Success', 
                functionTypeClass: 'success', 
                functionTypeClassIcon: 'success', 
                noReload: true,
                landing: true
            }
        }
       this.template.querySelector('c-lwc_b2b_toast').openToast(myEvent);
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
                console.log('### lwc_paymentsLandingParent ### getDocumentId() ::: Catch Error: ' + errors);
                reject({
                    'title': errorLoading,
                    'body': errorCheckConnection,
                    'noReload': true
                });
            })
        }.bind(this)); 
    }    
    
    removeFile(event, ID){
        try{
            removeFile({
                id:ID
            })
            .then(result => {})
            .catch(errors => {
                console.log("### lwc_paymentsLandingParent ### removeFile(event, ID) ::: Apex Error removeFile: " + JSON.stringify(errors));
                })                       
        } catch (e) {
            console.log('### lwc_paymentsLandingParent ### removeFile(event, ID) ::: Catch error: ' +JSON.stringify(e));
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
        }.bind(this)); 
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
                    console.log('### lwc_paymentsLandingParent ### decrypt(data) ::: Catch error: ' + JSON.stringify(errors));
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
            var paymentAction = '';
            var paymentData = {};
            var message = '';
            var method = '';
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
                            if (sParameterName[0] === 'c__discard') {
                                if (sParameterName[1] != undefined && sParameterName[1] != 'false') {
                                    this.showSuccessToast(this.label.success, this.label.Pay_discarted);
                                }
                            }
                            if (sParameterName[0] === 'c__saveForLater') {
                                if (sParameterName[1] != undefined && sParameterName[1] != 'false') {
                                    this.showSuccessToast(this.label.success, this.label.PAY_savedSuccess);
                                }
                            }
                            if (sParameterName[0] === 'c__review') {
                                if (sParameterName[1] != undefined && sParameterName[1] != 'false') {
                                    this.showSuccessToast(this.label.success, this.label.PAY_sendReview);
                                }
                            }
                            if (sParameterName[0] === 'c__reject') {
                                if (sParameterName[1] != undefined && sParameterName[1] != 'false') {
                                    this.showSuccessToast(this.label.success, this.label.PAY_sendRejected);
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
            } else if(sURLVariablesMain[0] == 'publicParams'){
                if (sURLVariablesMain[1]) {
                    if ((sURLVariablesMain[1] === 'c__pendingByMe' || sURLVariablesMain[1] === 'c__pendingByOthers'
                                || sURLVariablesMain[1] === 'c__inReview' || sURLVariablesMain[1] === 'c__scheduled'
                                || sURLVariablesMain[1] === 'c__completed' || sURLVariablesMain[1] === 'c__rejected')) {
                                this.urlFilter = sURLVariablesMain[1];
                            }
                }
            }
        
        } catch (e) {
            console.log('### lwc_paymentsLandingParent ### getURLParams(event) ::: Catch error: ' + e);
        }
    }

    getAccountsToList(userData) {
        var errorLoading = this.label.B2B_Error_Problem_Loading;
        var errorProblemAccounts = this.label.B2B_Problem_accounts;
        var errorCheckConnection = this.label.B2B_Error_Check_Connection;
        return new Promise(function (resolve, reject) {
            let key = 'AccountsToList';
            this.handleRetrieveFromCache(key)
            .then( (value) => {
                if (value) {
                    resolve(value);
                } else {
                    console.log('getAccountsToList(userData) ::: userData: ' + JSON.stringify(userData));
                    this.callToAccountsWithoutAttributions(userData)
					.then( (value) => {
                        return this.discardAccountsByCountry(userData, value);
                    })
                    .then( (value) => {
                        return this.handleSaveToCache(key, value);
                    })
                    .then( (value) => {
                        resolve(value);
                    })
                    .catch( (error) => {
                        console.log('### lwc_paymentsLandingParent ### getAccountsToList(userData) ::: Catch Error: ' + JSON.stringify(error));
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
        }.bind(this));
    }

    handleRetrieveFromCache(key) {
        return new Promise( function(resolve, reject) {
            const PAY_AccountsCache = this.label.PAY_AccountsCache;
            if (PAY_AccountsCache === 'false') {
                resolve(null);
            } else {
                let userId = this.userId;
                let data = window.localStorage.getItem(userId + '_' + key);
                let timestamp = window.localStorage.getItem(userId + '_' + key + '_timestamp');
                let isFreshData = timestamp != 'null' && timestamp != undefined && ((new Date() - new Date(Date.parse(timestamp))) < parseInt(this.label.refreshBalanceCollout) * 60000);
                //console.log('timestamp: ' + timestamp);
                //console.log('isFreshData: ' + isFreshData);
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
                        console.log('### lwc_paymentsLandingParent ### handleRetrieveFromCache() ::: Catch error: ' + JSON.stringify(error));
                        reject('REJECT');
                    })
                } else {
                    resolve(undefined);
                }
            }
        }.bind(this));
    }

    callToAccountsWithoutAttributions(nexus) {
        return new Promise( function(resolve, reject) {
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
            .catch( (error) => {
                console.log('### lwc_paymentsLandingParent ### callToAccountsWithoutAttributions() ::: Catch error: ' + JSON.stringify(error));
                reject('callToAccountsWithAttributions_ERROR');
            })           
        }.bind(this));
    }

    discardAccountsByCountry(userData, accountList){
        return new Promise( function(resolve, reject) {
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
            .catch( (error) => {
                console.log('### lwc_paymentsLandingParent ### discardAccountsByCountry() ::: Catch error: ' + JSON.stringify(error));
                reject('discardAccountsByCountry_ERROR');
            })
        }.bind(this));
    }

    handleSaveToCache(key, data) {
        const PAY_AccountsCache = this.label.PAY_AccountsCache;
        return new Promise( function(resolve, reject) {
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
                    console.log('### lwc_paymentsLandingParent ### handleSaveToCache() ::: Catch error: ' + JSON.stringify(error));
                    reject('REJECT');
                })
            }
        }.bind(this));
    }

    goToPaymentDetail() {
        var payment = this.paymentObject;
        var paymentID = payment.paymentId;
        var url = "c__currentUser=" + JSON.stringify(this.currentUser) + "&c__paymentID=" + paymentID;
        var page = 'landing-payment-details';
        this.goTo(page, url);
    }    

    goTo(page, url) {
        if (url != '') {
            this.encrypt(url)
            .then( (results) => {
                this[NavigationMixin.Navigate]({
                    type: 'comm__namedPage',
                    attributes: {
                        pageName: page
                    },
                    state: {
                        params: results
                    }
                });
            });
        } else {
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    pageName: page
                },
                state: {
                    params: ''
                }
            });
        }
    }

    getURLStatus() {
        var errorLoading = this.label.B2B_Error_Problem_Loading;
        var errorCheckConnection = this.label.B2B_Error_Check_Connection;
        return new Promise( function(resolve, reject) {
            try {
                let urlFilter = this.urlFilter;
                let paymentStatusBoxes = this.singlePaymentStatusBoxes;
                if (urlFilter) {
                    let statusName = null;
                    if (urlFilter === 'c__pendingByMe') {
                        statusName = this.label.PAY_Status_PendingOne;
                    } else if (urlFilter === 'c__pendingByOthers') {
                        statusName = this.label.PAY_Status_PendingTwo;
                    } else if (urlFilter === 'c__inReview') {
                        statusName = this.label.PAY_Status_InReviewOne;
                    } else if (urlFilter === 'c__scheduled') {
                        statusName = this.label.PAY_Status_ScheduledOne;
                    } else if (urlFilter === 'c__completed') {
                        statusName = this.label.PAY_Status_CompletedOne;
                    } else if (urlFilter === 'c__rejected') {
                        statusName = this.label.PAY_Status_RejectedOne;
                    }
                    if (statusName) {
                        let paymentStatusBox = null;
                        for (let i = 0; i < paymentStatusBoxes.length && paymentStatusBox == null; i++) {
                            if (paymentStatusBoxes[i].parsedStatusDescription == statusName) {
                                paymentStatusBox = paymentStatusBoxes[i];
                            }
                        }
                        if (paymentStatusBox) {
                            this.selectedPaymentStatusBox = paymentStatusBox;
                            this.isHeaderOptionSelected = true;
                        } else {
                            throw 'Error searching the box';
                        }
                    } else {
                        throw 'Error looking the statusName';
                    }
                }
                resolve('OK_getURLStatus');  
            } catch (error) {
                console.log('### lwc_paymentsLandingParent ### getURLStatus() ::: Catch error: ' + JSON.stringify(error));
                reject({
                    'title': errorLoading,
                    'body': errorCheckConnection,
                    'noReload': true
                });
            }
        }.bind(this));
    }

    encrypt (data){
        try{
            var result = "null";
            return new Promise( (resolve, reject) => {
                encryptData({str : data})
                .then((value) => {
                    result = value;
                    resolve(result);
                })
                .catch((error) => {
                    console.log(JSON.stringify(error));
                    reject(error);
                })
            });
        } catch (error) { 
            console.log(JSON.stringify(error));
        }   
    }

    onChangeSelectedPaymentStatusBox(event){
        console.log('Nuevo estado seleccionado: ' + JSON.stringify(event.detail.selectedbox));
        this.selectedPaymentStatusBox=event.detail.selectedbox;
        this.template.querySelector('c-lwc_payments-landing-boxes').updatePaymentStatusBoxes();
        this.template.querySelector('c-lwc_payments-landing-filters').changeSelectedStatusBox(this.selectedPaymentStatusBox);
    }

    onReloadAccounts(event){
        this.reloadAccounts = true;
    }

    onOpenDownloadModal(){
        this.showDownloadModal = true;
    }

    onApplyDownload(event){
        var fileFormat = event.detail;
        console.log('Formato de descarga seleccionado por el usuario: ' + fileFormat);
        this.handleDownload(fileFormat);
    }

    onCloseDownloadModal(){
        this.showDownloadModal = false;
    }
}