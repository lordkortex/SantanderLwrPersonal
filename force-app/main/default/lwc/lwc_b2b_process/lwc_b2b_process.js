import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

// Import labels
import instantTransfer from '@salesforce/label/c.instantTransfer';
import Loading from '@salesforce/label/c.Loading';
import ERROR_NOT_RETRIEVED from '@salesforce/label/c.ERROR_NOT_RETRIEVED';
import B2B_Error_Problem_Loading from '@salesforce/label/c.B2B_Error_Problem_Loading';
import B2B_Problem_accounts from '@salesforce/label/c.B2B_Problem_accounts';
import PAY_AccountsCache from '@salesforce/label/c.PAY_AccountsCache';
import refreshBalanceCollout from '@salesforce/label/c.refreshBalanceCollout';
import PTT_instant_transfer from '@salesforce/label/c.PTT_instant_transfer';
import PTT_international_transfer_single from '@salesforce/label/c.PTT_international_transfer_single';
import CNF_payment_productId_001 from '@salesforce/label/c.CNF_payment_productId_001';
import CNF_payment_productId_002 from '@salesforce/label/c.CNF_payment_productId_002';
import PAY_InternationalTransfer from '@salesforce/label/c.PAY_InternationalTransfer';
import PARAM_transferType from '@salesforce/label/c.PARAM_transferType';
import Problem_Signature_Structure from '@salesforce/label/c.Problem_Signature_Structure';
import B2B_Error_Updating_Data from '@salesforce/label/c.B2B_Error_Updating_Data';
import B2B_Error_Check_Connection from '@salesforce/label/c.B2B_Error_Check_Connection';
import PAY_Error_Amount_Exceeds_Limits from '@salesforce/label/c.PAY_Error_Amount_Exceeds_Limits';





// Import Apex methods
import getUserData from '@salesforce/apex/CNT_B2B_Process.getUserData';
import getAccountData from '@salesforce/apex/CNT_B2B_Process.getAccountData';
import decryptData from '@salesforce/apex/CNT_B2B_Process.decryptData';
import decryptAccountsData from '@salesforce/apex/CNT_PaymentsLoadUserAccounts.decryptAccountsData';
import callToAccountsWithAttributions from '@salesforce/apex/CNT_PaymentsLoadUserAccounts.callToAccountsWithAttributions';
import filterAccountsByCountryAndCurrency from '@salesforce/apex/CNT_PaymentsLoadUserAccounts.filterAccountsByCountryAndCurrency';
import encryptAccountsData from '@salesforce/apex/CNT_PaymentsLoadUserAccounts.encryptAccountsData';
import callToBeneficiaryAccounts from '@salesforce/apex/CNT_PaymentsLoadUserAccounts.callToBeneficiaryAccounts';

import reverseLimits from '@salesforce/apex/CNT_B2B_Process.reverseLimits';
import postFraud from '@salesforce/apex/CNT_B2B_Process.postFraud';
import getLimits from '@salesforce/apex/CNT_B2B_Process.getLimits';
import checkFCCDowJones from '@salesforce/apex/CNT_B2B_Process.checkFCCDowJones';
import getSignatureStructure from '@salesforce/apex/CNT_B2B_Process.getSignatureStructure';



// Import user info
import Id from '@salesforce/user/Id';

export default class Lwc_b2b_process extends NavigationMixin(LightningElement) {

    userId = Id;
    label = {
        instantTransfer,
        Loading,
        ERROR_NOT_RETRIEVED,
        B2B_Error_Problem_Loading,
        B2B_Problem_accounts,
        PAY_AccountsCache,
        refreshBalanceCollout,
        PTT_instant_transfer,
        PTT_international_transfer_single,
        CNF_payment_productId_001,
        CNF_payment_productId_002,
        PAY_InternationalTransfer,
        PARAM_transferType,
        Problem_Signature_Structure,
        B2B_Error_Updating_Data,
        B2B_Error_Check_Connection,
        PAY_Error_Amount_Exceeds_Limits
    }

    @track accountListDestination;
    @track accountListOrigin;
    @track headerLabel = this.label.instantTransfer;
    @track dataPaymentInformation;
    @track dataSelectOrigin;
    @track dataSelectDestination;
    @track dataSelectAmount;
    @track steps = {}
    //     focusStep : 7, 
    //     shownStep: 3,
    //     totalSteps : 20,
    //     lastModifiedStep : 20
    // };
    @track spinner = true;
    @track paymentData;
    @track userData;
    @track accountData;
    @track signLevel;
    @track lastCode;
    @track paymentId;
    @track reload;
    @track isEditing;
    @track expensesAccount;
    @track showErrorScreen;

    @track paymentDraft
    @track transferType
    @track navigatorInfo = {};
    @track isReuse
    

    get focusStepGtOne(){
        return this.steps.focusStep > 1 && this.steps.focusStep <= this.steps.totalSteps;
    }

    // get focusStepGtFive(){
    //     return this.steps.focusStep >= 5;
    // }

    get focusStepLeFour(){
        return this.steps.focusStep <= 4;
    }

    get focusStepLeThree(){
        return this.steps.focusStep <= 3;
    }

    get focusStepGeFour(){
        return this.steps.focusStep >= 4;
    }

    get shownStepGeOne(){
        return this.steps.shownStep >= 1;
    }

    get shownStepGeTwo(){
        return this.steps.shownStep >= 2;
    }

    get shownStepGeThree(){
        return this.steps.shownStep >= 3;
    }

    get shownStepGeFour(){
        return this.steps.shownStep >= 4;
    }

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        this.initComponent();
    }

    initComponent() {
        new Promise((resolve) => {
            let steps = this.steps;
            steps.shownStep = 1;
            steps.focusStep = 1;
            steps.lastModifiedStep = 1;
            steps.totalSteps = 4;
            this.steps = steps;
            this.paymentDraft = {};
            // this.dataSelectOrigin = {};
            // this.dataSelectDestination = {};
            // this.dataSelectAmount = {};
            // this.dataPaymentInformation = {};
            this.spinner = true;
            
            resolve('Ok');
        }).then( () => {
            this.getURLParams();
        }).then( () => {
            return this.getUserData();
        }).then( () => {
            // return this.getAccountData();
            return this.getAccountsToB2BOrigin(this.userData, this.transferType);
        // }).then( value => {
            // return this.getAccountsToB2BOrigin(this.userData);
        }).then(value => {
            // value = [{"address":{"country":"BR","streetName":"","townName":"Belo Horizonte"},"alias":"","amountAvailableBalance":40001,"amountMainBalance":40000,"balanceAllowed":true,"bankName":"BANCO SANTANDER S.A.","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESMMXXX","codigoCorporate":"J000104892","companyIdsList":{"LOCAL":"J000104892","GLOBAL":"2995","NEXUS":"2995"},"country":"ES","countryName":"Spain","currencyCodeAvailableBalance":"EUR","customerId":"J000104892","displayNumber":"00490072042710472885","hasSwiftPayments":"false","idType":"BBA","internationalPaymentsAllowed":true,"lastUpdateAvailableBalance":"2021-01-28 09:06:14","lastUpdateAvailableBalanceMain":"2021-01-28T08:06:14.455+0000","locatorbic":"MM","mandatoryPurpose":false,"paisbic":"ES","status":"Open","subsidiaryName":"TESTGTS","transactionsAllowed":true,"valueDate":"2021-01-28T08:06:14.455+0000"},{"address":{"country":"BR","streetName":"","townName":"Belo Horizonte"},"alias":"CORPORATE CURRENT ACCOUNT","amountAvailableBalance":49295.3,"amountMainBalance":49295.3,"balanceAllowed":true,"bankName":"SANTANDER UK PLC","bic":"ABBY","branch":"XXX","codigoBic":"ABBYGB2LXXX","codigoCorporate":"2995","companyIdsList":{"LOCAL":"2995","GLOBAL":"2995","NEXUS":"2995"},"country":"GB","countryName":"United Kingdom","currencyCodeAvailableBalance":"GBP","customerId":"2995","displayNumber":"09022210205660","hasSwiftPayments":"false","idType":"BBA","internationalPaymentsAllowed":true,"lastUpdateAvailableBalance":"2021-01-28 09:06:17","lastUpdateAvailableBalanceMain":"2021-01-28T08:06:17.430+0000","locatorbic":"2L","mandatoryPurpose":false,"paisbic":"GB","status":"Open","subsidiaryName":"TESTGTS","transactionsAllowed":true,"valueDate":"2021-01-28T08:06:17.430+0000"},{"address":{"country":"ES","streetName":"Calle Patones","townName":"Madrid"},"alias":"STANDARD PRODUCTS","amountAvailableBalance":144065.78,"amountMainBalance":144065.78,"balanceAllowed":true,"bankName":"SANTANDER UK PLC","bic":"ABBY","branch":"XXX","codigoBic":"ABBYGB20XXX","codigoCorporate":"4382","companyIdsList":{"LOCAL":"4382","GLOBAL":"-1363016250","NEXUS":"4382"},"country":"GB","countryName":"United Kingdom","currencyCodeAvailableBalance":"GBP","customerId":"4382","displayNumber":"GB37ABBY09072445283289","hasSwiftPayments":"false","idType":"IBA","internationalPaymentsAllowed":true,"lastUpdateAvailableBalance":"2021-01-28 09:06:20","lastUpdateAvailableBalanceMain":"2021-01-28T08:06:20.556+0000","locatorbic":"20","mandatoryPurpose":false,"paisbic":"GB","status":"Open","subsidiaryName":"M.G.M. ACCIAIERIA ITALIA","transactionsAllowed":true,"valueDate":"2021-01-28T08:06:20.556+0000"},{"address":{"country":"ES","streetName":"Calle Patones","townName":"Madrid"},"alias":"CORPORATE CURRENT ACCOUNT","amountAvailableBalance":11.48,"amountMainBalance":11.48,"balanceAllowed":true,"bankName":"SANTANDER UK PLC","bic":"ABBY","branch":"XXX","codigoBic":"ABBYGB20XXX","codigoCorporate":"4382","companyIdsList":{"LOCAL":"4382","GLOBAL":"-1363016250","NEXUS":"4382"},"country":"GB","countryName":"United Kingdom","currencyCodeAvailableBalance":"GBP","customerId":"4382","displayNumber":"GB66ABBY09022210211272","hasSwiftPayments":"false","idType":"IBA","internationalPaymentsAllowed":true,"lastUpdateAvailableBalance":"2021-01-28 09:06:20","lastUpdateAvailableBalanceMain":"2021-01-28T08:06:20.556+0000","locatorbic":"20","mandatoryPurpose":false,"paisbic":"GB","status":"Open","subsidiaryName":"M.G.M. ACCIAIERIA ITALIA","transactionsAllowed":true,"valueDate":"2021-01-28T08:06:20.556+0000"},{"address":{"country":"ES","streetName":"Calle Patones","townName":"Madrid"},"alias":"OTHER VT-2","amountAvailableBalance":9772523.92,"amountMainBalance":9772523.92,"balanceAllowed":true,"bankName":"SANTANDER UK PLC","bic":"ABBY","branch":"XXX","codigoBic":"ABBYGB20XXX","codigoCorporate":"4382","companyIdsList":{"LOCAL":"4382","GLOBAL":"-1363016250","NEXUS":"4382"},"country":"GB","countryName":"United Kingdom","currencyCodeAvailableBalance":"GBP","customerId":"4382","displayNumber":"09072322275601","hasSwiftPayments":"false","idType":"BBA","internationalPaymentsAllowed":true,"lastUpdateAvailableBalance":"2021-01-28 09:06:20","lastUpdateAvailableBalanceMain":"2021-01-28T08:06:20.556+0000","locatorbic":"20","mandatoryPurpose":false,"paisbic":"GB","status":"Open","subsidiaryName":"M.G.M. ACCIAIERIA ITALIA","transactionsAllowed":true,"valueDate":"2021-01-28T08:06:20.556+0000"}];
            return this.handleAccountsToB2BOrigin(value);
        }).then( () => {
            return this.initEditingProcess();
        }).then( () => {
            return this.initReusingProcess();
        }).then( () => {
            return this.getNavigatorInfo();
        }).catch(error => {
            console.log(error);
            this.showErrorScreen = true;
            let steps = this.steps;
            steps.totalSteps = 0;
            this.steps = steps;
        }).finally( () => {
            console.log("finally");
            this.spinner = false;
        });
    
    }

    handleCompleteStep(event) {
        let confirm = event.detail.confirm;
        if (confirm) {
            this.getBeneficiaryAccounts()
            .then(() => {
                return this.continuePaymentInformation();
            }).then(() => {
                return this.checkLastModified();
            }).then( () => {
                this.nextStep()
            }).catch( (error) => {
                console.log(error);
            }).finally( () => {
                //pintado barra
                this.template.querySelector('c-lwc_b2b_process-header').changeWidthSteps(this.steps);
            });
        } else if (confirm == false) {
            this.isEditingProcess = false;
            this.paymentDetails = {};
        }
    }

    getBeneficiaryAccounts() {
        return new Promise( (resolve, reject) => {
            let focusStep = this.steps.lastModifiedStep;
            let transferType = this.transferType;
            if (!transferType) {
                transferType = 'instant_transfer'; // FLOWERPOWER_PARCHE_BH para controlar el caso de editar
            }
            if (focusStep == 1) {
                this.spinner = true;
                let userData = this.userData;
                let paymentDraft = this.paymentDraft;
                this.getAccountsToB2BDestination(userData, transferType, paymentDraft.sourceAccount)
                .then( (value) => {
                    return this.handleAccountsToB2BDestination(value);
                }).then( () => {
                    resolve('getBeneficiaryAccounts_OK');
                }).catch( (error) => {
                    this.spinner = false;
                    this.showToast( error.title, error.body, error.noReload);
                    reject('getBeneficiaryAccounts_KO');
                }).finally( () => {
                    this.spinner = false;
                });
            } else {
                resolve('getBeneficiaryAccounts_OK');
            }
        });
    }

    checkLastModified() {
        return new Promise( (resolve) => {
            let steps = this.steps;
            if (steps.lastModifiedStep < steps.shownStep && steps.focusStep == steps.lastModifiedStep) {
                steps.shownStep = steps.lastModifiedStep;
            }
            this.steps = steps;
            resolve('ok');
        });
    }

    processStep(shownStep, focusStep, editPayment) {
        return new Promise( resolve => {
            this.steps.shownStep = shownStep;
            if (!editPayment) {
                this.steps.focusStep = focusStep;
            }
            this.steps.lastModifiedStep = focusStep;

            
            resolve('Ok');
        });
    }

    nextStep() {
        let steps = this.steps;
        let shownStep = steps.shownStep;
        let focusStep = steps.focusStep;
        let lastModifiedStep = steps.lastModifiedStep;
        let totalSteps = steps.totalSteps;
        if (focusStep < totalSteps) {                          
            if (shownStep == focusStep && shownStep == 5) {
                editPayment = true;
            }
            if (shownStep == focusStep) {
                shownStep++;
            } else if (lastModifiedStep > focusStep) {
                focusStep = lastModifiedStep;
                shownStep++;
                lastModifiedStep++;
            }
            focusStep++;
            this.processStep(shownStep, focusStep, false)
            .then( () => {
                return new Promise( resolve => {
                    // var element = "[data-id='step-" + focusStep + "']";
                    // var stepComponent = this.template.querySelector('c-lwc_b2b_select-destination');//.querySelector(element);
                    // if (stepComponent != null) {
                    //     stepComponent.scrollIntoView({ behavior: 'smooth' });
                    // } else {
                    //     setTimeout( () => {
                    //         stepComponent = this.template.querySelector(element);
                    //         if (stepComponent != null) {
                    //             stepComponent.scrollIntoView({ behavior: 'smooth' });
                    //         }
                    //     }, 10);
                    // }
                    switch(focusStep){
                        case 1:
                            this.template.querySelector('c-lwc_b2b_select-origin').doScroll(focusStep);
                            break;
                        case 2:
                            this.template.querySelector('c-lwc_b2b_select-destination').doScroll(focusStep);
                            break;
                        case 3:
                            this.template.querySelector('c-lwc_b2b_select-amount').doScroll(focusStep);
                            break;
                        case 4:
                            this.template.querySelector('c-lwc_b2b_payment-summary').doScroll(focusStep);
                            break;
                    }
                    resolve('OK');
                });
            }).then( () => {                
                return this.loadingEditingProcess();
            }).catch( (error) => {
                console.log(error);
            }).finally( () => {
                console.log('OK');
            });
        }
    }

    getAccountsToB2BDestination(user, transferType, sourceAccount) {
        return new Promise( (resolve, reject) => {
            let key = 'AccountsToB2BDestination';

            let companyGlobalId = ""; 
    		let countryOriginator = "";
   			if(sourceAccount != null){
    			if (sourceAccount.companyIdsList != null){
                    if (sourceAccount.companyIdsList.GTS){
                        companyGlobalId = sourceAccount.companyIdsList.GTS;
                    }
				}
 				if(sourceAccount.country != null){
                countryOriginator = sourceAccount.country;
                }           
            } 
            let keyCache = key + '_' + companyGlobalId + '_' + countryOriginator;

            this.handleRetrieveFromCache(keyCache)
            .then((value) => {
                if (value) {
                    resolve(value);
                } else {
                    this.getAccountsToB2BOrigin(user, transferType)
                    .then((value) => {
                    // return this.callToBeneficiaryAccounts(user, transferType, sourceAccount, value)
					}).then((value) => {
                        //value = [{"address":{"country":"ES","streetName":"Calle GTS 234","townName":"Madrid"},"amountAvailableBalance":0,"amountMainBalance":0,"bankName":"BANCO SANTANDER S.A CIUDAD GRUPO SANTANDER.EDF.PAMPA","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESM0XXX","companyIdsList":{"GLOBAL":"2938","NEXUS":"2938"},"country":"ES","countryName":"Spain","currencyCodeAvailableBalance":"EUR","currencyCodeMainBalance":"EUR","displayNumber":"ES9900490000000000000099","hasSwiftPayment":"NO","hasSwiftPayments":"NO","idType":"BBA","lastUpdateAvailableBalance":"2019-04-04T22:00:00Z","lastupdateMainBalance":"2019-04-04T22:00:00Z","locatorbic":"M0","mandatoryPurpose":false,"paisbic":"ES","status":"H","subsidiaryName":"CORPORATE GTS 1 ES","type":"BBA"},{"address":{"country":"ES","streetName":"Calle GTS 234","townName":"Madrid"},"amountAvailableBalance":1730809987.25,"amountMainBalance":1730809987.25,"amountOverdraftLimit":0,"amountWithholdingBalance":0,"bankName":"BANCO SANTANDER S.A CIUDAD GRUPO SANTANDER.EDF.PAMPA","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESM0XXX","codigoCorporate":"J101505920","companyIdsList":{"LOCAL":"J101505920","GLOBAL":"2938","NEXUS":"2938"},"country":"ES","countryName":"Spain","currencyCodeAvailableBalance":"EUR","currencyCodeMainBalance":"EUR","currencycodeOverdraftLimit":"EUR","currencyCodeWithholdingBalance":"EUR","customerId":"J101505920","description":"CUENTA CORRIENTE SANTANDER PB","displayNumber":"ES1000490072012110458432","hasSwiftPayment":"YES","hasSwiftPayments":"YES","idType":"IBA","lastudpateWithholdingBalance":"2020-03-03T00:00:00Z","lastUpdateAvailableBalance":"2021-02-02T00:20:33Z","lastupdateMainBalance":"2021-02-02T00:20:33Z","lastUpdateOverdraftLimit":"2020-03-03T00:00:00Z","locatorbic":"M0","mandatoryPurpose":false,"paisbic":"ES","status":"Open","subsidiaryName":"CORPORATE GTS 1 ES","type":"IBA"},{"address":{"country":"ES","streetName":"Calle GTS 234","townName":"Madrid"},"amountAvailableBalance":0,"amountMainBalance":0,"bankName":"BANCO SANTANDER S.A CIUDAD GRUPO SANTANDER.EDF.PAMPA","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESM0XXX","codigoCorporate":"2938","companyIdsList":{"LOCAL":"2938","GLOBAL":"2938","NEXUS":"2938"},"country":"ES","countryName":"Spain","currencyCodeAvailableBalance":"EUR","currencyCodeMainBalance":"EUR","customerId":"2938","displayNumber":"ES9900490000000000000099","hasSwiftPayment":"NO","hasSwiftPayments":"NO","idType":"IBA","lastUpdateAvailableBalance":"2019-04-04T22:00:00Z","lastupdateMainBalance":"2019-04-04T22:00:00Z","locatorbic":"M0","mandatoryPurpose":false,"paisbic":"ES","status":"H","subsidiaryName":"CORPORATE GTS 1 ES","type":"IBA"},{"address":{"country":"ES","streetName":"Calle GTS 234","townName":"Madrid"},"amountAvailableBalance":8927886.98,"amountMainBalance":8927886.98,"amountOverdraftLimit":0,"amountWithholdingBalance":0,"bankName":"BANCO SANTANDER S.A CIUDAD GRUPO SANTANDER.EDF.PAMPA","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESM0XXX","codigoCorporate":"J001286665","companyIdsList":{"LOCAL":"J001286665","GLOBAL":"2938","NEXUS":"2938"},"country":"ES","countryName":"Spain","currencyCodeAvailableBalance":"EUR","currencyCodeMainBalance":"EUR","currencycodeOverdraftLimit":"EUR","currencyCodeWithholdingBalance":"EUR","customerId":"J001286665","description":"CUENTA CORRIENTE A LA VISTA","displayNumber":"ES8100490075473000562155","hasSwiftPayment":"YES","hasSwiftPayments":"YES","idType":"IBA","lastudpateWithholdingBalance":"2020-03-03T00:00:00Z","lastUpdateAvailableBalance":"2021-02-02T00:20:33Z","lastupdateMainBalance":"2021-02-02T00:20:33Z","lastUpdateOverdraftLimit":"2020-03-03T00:00:00Z","locatorbic":"M0","mandatoryPurpose":false,"paisbic":"ES","status":"Open","subsidiaryName":"CORPORATE GTS 1 ES","type":"IBA"},{"address":{"country":"ES","streetName":"Calle GTS 234","townName":"Madrid"},"alias":"Alias GTS Testing","amountAvailableBalance":1000001,"amountMainBalance":1000000,"amountOverdraftLimit":1000003,"amountWithholdingBalance":1000002,"bankName":"BANCO SANTANDER S.A CIUDAD GRUPO SANTANDER.EDF.PAMPA","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESM0XXX","companyIdsList":{"GLOBAL":"2938","NEXUS":"2938"},"country":"ES","countryName":"Spain","currencyCodeAvailableBalance":"EUR","currencyCodeMainBalance":"EUR","currencycodeOverdraftLimit":"EUR","currencyCodeWithholdingBalance":"EUR","displayNumber":"ES9000490000000000000011","hasSwiftPayment":"NO","hasSwiftPayments":"NO","idType":"BBA","lastudpateWithholdingBalance":"2020-03-03T00:00:00Z","lastUpdateAvailableBalance":"2020-03-03T00:00:00Z","lastupdateMainBalance":"2020-03-03T00:00:00Z","lastUpdateOverdraftLimit":"2020-03-03T00:00:00Z","locatorbic":"M0","mandatoryPurpose":false,"paisbic":"ES","status":"H","subsidiaryName":"CORPORATE GTS 1 ES","type":"BBA"},{"address":{"country":"ES","streetName":"Calle GTS 234","townName":"Madrid"},"alias":"Alias GTS Testing","amountAvailableBalance":1000001,"amountMainBalance":1000000,"amountOverdraftLimit":1000003,"amountWithholdingBalance":1000002,"bankName":"BANCO SANTANDER S.A CIUDAD GRUPO SANTANDER.EDF.PAMPA","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESM0XXX","codigoCorporate":"2938","companyIdsList":{"LOCAL":"2938","GLOBAL":"2938","NEXUS":"2938"},"country":"ES","countryName":"Spain","currencyCodeAvailableBalance":"EUR","currencyCodeMainBalance":"EUR","currencycodeOverdraftLimit":"EUR","currencyCodeWithholdingBalance":"EUR","customerId":"2938","displayNumber":"ES9000490000000000000011","hasSwiftPayment":"NO","hasSwiftPayments":"NO","idType":"IBA","lastudpateWithholdingBalance":"2020-03-03T00:00:00Z","lastUpdateAvailableBalance":"2020-03-03T00:00:00Z","lastupdateMainBalance":"2020-03-03T00:00:00Z","lastUpdateOverdraftLimit":"2020-03-03T00:00:00Z","locatorbic":"M0","mandatoryPurpose":false,"paisbic":"ES","status":"H","subsidiaryName":"CORPORATE GTS 1 ES","type":"IBA"},{"address":{"country":"ES","streetName":"Calle GTS 234","townName":"Madrid"},"amountAvailableBalance":9150962.06,"amountMainBalance":9150962.06,"amountOverdraftLimit":0,"amountWithholdingBalance":0,"bankName":"BANCO SANTANDER S.A CIUDAD GRUPO SANTANDER.EDF.PAMPA","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESM0XXX","codigoCorporate":"J001286665","companyIdsList":{"LOCAL":"J001286665","GLOBAL":"2938","NEXUS":"2938"},"country":"ES","countryName":"Spain","currencyCodeAvailableBalance":"EUR","currencyCodeMainBalance":"EUR","currencycodeOverdraftLimit":"EUR","currencyCodeWithholdingBalance":"EUR","customerId":"J001286665","description":"CUENTA CORRIENTE A LA VISTA","displayNumber":"ES8100490075473000562155","hasSwiftPayment":"YES","hasSwiftPayments":"YES","idType":"BBA","lastudpateWithholdingBalance":"2020-03-03T00:00:00Z","lastUpdateAvailableBalance":"2020-11-06T13:52:48Z","lastupdateMainBalance":"2020-11-06T13:52:48Z","lastUpdateOverdraftLimit":"2020-03-03T00:00:00Z","locatorbic":"M0","mandatoryPurpose":false,"paisbic":"ES","status":"Open","subsidiaryName":"CORPORATE GTS 1 ES","type":"BBA"},{"address":{"country":"ES","streetName":"Calle GTS 234","townName":"Madrid"},"bankName":"BANCO SANTANDER S.A.","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESMMXXX","codigoCorporate":"2938","companyIdsList":{"LOCAL":"2938","GLOBAL":"2938","NEXUS":"2938"},"country":"ES","countryName":"Spain","currencyCodeAvailableBalance":"EUR","currencyCodeMainBalance":"EUR","customerId":"2938","displayNumber":"ES6000491500051234567891","hasSwiftPayment":"NO","hasSwiftPayments":"NO","idType":"IBA","locatorbic":"MM","mandatoryPurpose":false,"paisbic":"ES","status":"H","subsidiaryName":"CORPORATE GTS 1 ES","type":"IBA"},{"address":{"country":"ES","streetName":"Calle GTS 234","townName":"Madrid"},"bankName":"BANCO SANTANDER S.A CIUDAD GRUPO SANTANDER.EDF.PAMPA","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESM0XXX","codigoCorporate":"2938","companyIdsList":{"LOCAL":"2938","GLOBAL":"2938","NEXUS":"2938"},"country":"ES","countryName":"Spain","currencyCodeAvailableBalance":"EUR","currencyCodeMainBalance":"EUR","customerId":"2938","displayNumber":"ES4800490000000000000000","hasSwiftPayment":"NO","hasSwiftPayments":"NO","idType":"IBA","lastUpdateAvailableBalance":"2020-03-03T00:00:00Z","lastupdateMainBalance":"2020-03-03T00:00:00Z","locatorbic":"M0","mandatoryPurpose":false,"paisbic":"ES","status":"H","subsidiaryName":"CORPORATE GTS 1 ES","type":"IBA"},{"address":{"country":"ES","streetName":"Calle GTS 234","townName":"Madrid"},"amountAvailableBalance":1731973850.05,"amountMainBalance":1731973850.05,"amountOverdraftLimit":0,"amountWithholdingBalance":0,"bankName":"BANCO SANTANDER S.A CIUDAD GRUPO SANTANDER.EDF.PAMPA","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESM0XXX","codigoCorporate":"J101505920","companyIdsList":{"LOCAL":"J101505920","GLOBAL":"2938","NEXUS":"2938"},"country":"ES","countryName":"Spain","currencyCodeAvailableBalance":"EUR","currencyCodeMainBalance":"EUR","currencycodeOverdraftLimit":"EUR","currencyCodeWithholdingBalance":"EUR","customerId":"J101505920","description":"CUENTA 1 2 3 PYMES (P.J)","displayNumber":"ES1000490072012110458432","hasSwiftPayment":"YES","hasSwiftPayments":"YES","idType":"BBA","lastudpateWithholdingBalance":"2020-03-03T00:00:00Z","lastUpdateAvailableBalance":"2020-11-06T13:52:48Z","lastupdateMainBalance":"2020-11-06T13:52:48Z","lastUpdateOverdraftLimit":"2020-03-03T00:00:00Z","locatorbic":"M0","mandatoryPurpose":false,"paisbic":"ES","status":"Open","subsidiaryName":"CORPORATE GTS 1 ES","type":"BBA"}];
                        //value = [{"address":{"country":"ES","streetName":"Calle GTS 234","townName":"Madrid"},"amountAvailableBalance":0,"amountMainBalance":0,"bankName":"BANCO SANTANDER S.A CIUDAD GRUPO SANTANDER.EDF.PAMPA","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESM0XXX","companyIdsList":{"GLOBAL":"2938","NEXUS":"2938"},"country":"ES","countryName":"Spain","currencyCodeAvailableBalance":"EUR","currencyCodeMainBalance":"EUR","displayNumber":"ES9900490000000000000099","hasSwiftPayment":"NO","hasSwiftPayments":"NO","idType":"BBA","lastUpdateAvailableBalance":"2019-04-04T22:00:00Z","lastupdateMainBalance":"2019-04-04T22:00:00Z","locatorbic":"M0","mandatoryPurpose":false,"paisbic":"ES","status":"H","subsidiaryName":"CORPORATE GTS 1 ES","type":"BBA"},{"address":{"country":"ES","streetName":"Calle GTS 234","townName":"Madrid"},"amountAvailableBalance":1730809987.25,"amountMainBalance":1730809987.25,"amountOverdraftLimit":0,"amountWithholdingBalance":0,"bankName":"BANCO SANTANDER S.A CIUDAD GRUPO SANTANDER.EDF.PAMPA","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESM0XXX","codigoCorporate":"J101505920","companyIdsList":{"LOCAL":"J101505920","GLOBAL":"2938","NEXUS":"2938"},"country":"ES","countryName":"Spain","currencyCodeAvailableBalance":"EUR","currencyCodeMainBalance":"EUR","currencycodeOverdraftLimit":"EUR","currencyCodeWithholdingBalance":"EUR","customerId":"J101505920","description":"CUENTA CORRIENTE SANTANDER PB","displayNumber":"ES1000490072012110458432","hasSwiftPayment":"YES","hasSwiftPayments":"YES","idType":"IBA","lastudpateWithholdingBalance":"2020-03-03T00:00:00Z","lastUpdateAvailableBalance":"2021-02-02T00:20:33Z","lastupdateMainBalance":"2021-02-02T00:20:33Z","lastUpdateOverdraftLimit":"2020-03-03T00:00:00Z","locatorbic":"M0","mandatoryPurpose":false,"paisbic":"ES","status":"Open","subsidiaryName":"CORPORATE GTS 1 ES","type":"IBA"},{"address":{"country":"ES","streetName":"Calle GTS 234","townName":"Madrid"},"amountAvailableBalance":0,"amountMainBalance":0,"bankName":"BANCO SANTANDER S.A CIUDAD GRUPO SANTANDER.EDF.PAMPA","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESM0XXX","codigoCorporate":"2938","companyIdsList":{"LOCAL":"2938","GLOBAL":"2938","NEXUS":"2938"},"country":"ES","countryName":"Spain","currencyCodeAvailableBalance":"EUR","currencyCodeMainBalance":"EUR","customerId":"2938","displayNumber":"ES9900490000000000000099","hasSwiftPayment":"NO","hasSwiftPayments":"NO","idType":"IBA","lastUpdateAvailableBalance":"2019-04-04T22:00:00Z","lastupdateMainBalance":"2019-04-04T22:00:00Z","locatorbic":"M0","mandatoryPurpose":false,"paisbic":"ES","status":"H","subsidiaryName":"CORPORATE GTS 1 ES","type":"IBA"},{"address":{"country":"ES","streetName":"Calle GTS 234","townName":"Madrid"},"amountAvailableBalance":8927886.98,"amountMainBalance":8927886.98,"amountOverdraftLimit":0,"amountWithholdingBalance":0,"bankName":"BANCO SANTANDER S.A CIUDAD GRUPO SANTANDER.EDF.PAMPA","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESM0XXX","codigoCorporate":"J001286665","companyIdsList":{"LOCAL":"J001286665","GLOBAL":"2938","NEXUS":"2938"},"country":"ES","countryName":"Spain","currencyCodeAvailableBalance":"EUR","currencyCodeMainBalance":"EUR","currencycodeOverdraftLimit":"EUR","currencyCodeWithholdingBalance":"EUR","customerId":"J001286665","description":"CUENTA CORRIENTE A LA VISTA","displayNumber":"ES8100490075473000562155","hasSwiftPayment":"YES","hasSwiftPayments":"YES","idType":"IBA","lastudpateWithholdingBalance":"2020-03-03T00:00:00Z","lastUpdateAvailableBalance":"2021-02-02T00:20:33Z","lastupdateMainBalance":"2021-02-02T00:20:33Z","lastUpdateOverdraftLimit":"2020-03-03T00:00:00Z","locatorbic":"M0","mandatoryPurpose":false,"paisbic":"ES","status":"Open","subsidiaryName":"CORPORATE GTS 1 ES","type":"IBA"},{"address":{"country":"ES","streetName":"Calle GTS 234","townName":"Madrid"},"alias":"Alias GTS Testing","amountAvailableBalance":1000001,"amountMainBalance":1000000,"amountOverdraftLimit":1000003,"amountWithholdingBalance":1000002,"bankName":"BANCO SANTANDER S.A CIUDAD GRUPO SANTANDER.EDF.PAMPA","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESM0XXX","companyIdsList":{"GLOBAL":"2938","NEXUS":"2938"},"country":"ES","countryName":"Spain","currencyCodeAvailableBalance":"EUR","currencyCodeMainBalance":"EUR","currencycodeOverdraftLimit":"EUR","currencyCodeWithholdingBalance":"EUR","displayNumber":"ES9000490000000000000011","hasSwiftPayment":"NO","hasSwiftPayments":"NO","idType":"BBA","lastudpateWithholdingBalance":"2020-03-03T00:00:00Z","lastUpdateAvailableBalance":"2020-03-03T00:00:00Z","lastupdateMainBalance":"2020-03-03T00:00:00Z","lastUpdateOverdraftLimit":"2020-03-03T00:00:00Z","locatorbic":"M0","mandatoryPurpose":false,"paisbic":"ES","status":"H","subsidiaryName":"CORPORATE GTS 1 ES","type":"BBA"},{"address":{"country":"ES","streetName":"Calle GTS 234","townName":"Madrid"},"alias":"Alias GTS Testing","amountAvailableBalance":1000001,"amountMainBalance":1000000,"amountOverdraftLimit":1000003,"amountWithholdingBalance":1000002,"bankName":"BANCO SANTANDER S.A CIUDAD GRUPO SANTANDER.EDF.PAMPA","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESM0XXX","codigoCorporate":"2938","companyIdsList":{"LOCAL":"2938","GLOBAL":"2938","NEXUS":"2938"},"country":"ES","countryName":"Spain","currencyCodeAvailableBalance":"EUR","currencyCodeMainBalance":"EUR","currencycodeOverdraftLimit":"EUR","currencyCodeWithholdingBalance":"EUR","customerId":"2938","displayNumber":"ES9000490000000000000011","hasSwiftPayment":"NO","hasSwiftPayments":"NO","idType":"IBA","lastudpateWithholdingBalance":"2020-03-03T00:00:00Z","lastUpdateAvailableBalance":"2020-03-03T00:00:00Z","lastupdateMainBalance":"2020-03-03T00:00:00Z","lastUpdateOverdraftLimit":"2020-03-03T00:00:00Z","locatorbic":"M0","mandatoryPurpose":false,"paisbic":"ES","status":"H","subsidiaryName":"CORPORATE GTS 1 ES","type":"IBA"},{"address":{"country":"ES","streetName":"Calle GTS 234","townName":"Madrid"},"amountAvailableBalance":9150962.06,"amountMainBalance":9150962.06,"amountOverdraftLimit":0,"amountWithholdingBalance":0,"bankName":"BANCO SANTANDER S.A CIUDAD GRUPO SANTANDER.EDF.PAMPA","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESM0XXX","codigoCorporate":"J001286665","companyIdsList":{"LOCAL":"J001286665","GLOBAL":"2938","NEXUS":"2938"},"country":"ES","countryName":"Spain","currencyCodeAvailableBalance":"EUR","currencyCodeMainBalance":"EUR","currencycodeOverdraftLimit":"EUR","currencyCodeWithholdingBalance":"EUR","customerId":"J001286665","description":"CUENTA CORRIENTE A LA VISTA","displayNumber":"ES8100490075473000562155","hasSwiftPayment":"YES","hasSwiftPayments":"YES","idType":"BBA","lastudpateWithholdingBalance":"2020-03-03T00:00:00Z","lastUpdateAvailableBalance":"2020-11-06T13:52:48Z","lastupdateMainBalance":"2020-11-06T13:52:48Z","lastUpdateOverdraftLimit":"2020-03-03T00:00:00Z","locatorbic":"M0","mandatoryPurpose":false,"paisbic":"ES","status":"Open","subsidiaryName":"CORPORATE GTS 1 ES","type":"BBA"},{"address":{"country":"ES","streetName":"Calle GTS 234","townName":"Madrid"},"bankName":"BANCO SANTANDER S.A.","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESMMXXX","codigoCorporate":"2938","companyIdsList":{"LOCAL":"2938","GLOBAL":"2938","NEXUS":"2938"},"country":"ES","countryName":"Spain","currencyCodeAvailableBalance":"EUR","currencyCodeMainBalance":"EUR","customerId":"2938","displayNumber":"ES6000491500051234567891","hasSwiftPayment":"NO","hasSwiftPayments":"NO","idType":"IBA","locatorbic":"MM","mandatoryPurpose":false,"paisbic":"ES","status":"H","subsidiaryName":"CORPORATE GTS 1 ES","type":"IBA"},{"address":{"country":"ES","streetName":"Calle GTS 234","townName":"Madrid"},"bankName":"BANCO SANTANDER S.A CIUDAD GRUPO SANTANDER.EDF.PAMPA","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESM0XXX","codigoCorporate":"2938","companyIdsList":{"LOCAL":"2938","GLOBAL":"2938","NEXUS":"2938"},"country":"ES","countryName":"Spain","currencyCodeAvailableBalance":"EUR","currencyCodeMainBalance":"EUR","customerId":"2938","displayNumber":"ES4800490000000000000000","hasSwiftPayment":"NO","hasSwiftPayments":"NO","idType":"IBA","lastUpdateAvailableBalance":"2020-03-03T00:00:00Z","lastupdateMainBalance":"2020-03-03T00:00:00Z","locatorbic":"M0","mandatoryPurpose":false,"paisbic":"ES","status":"H","subsidiaryName":"CORPORATE GTS 1 ES","type":"IBA"},{"address":{"country":"ES","streetName":"Calle GTS 234","townName":"Madrid"},"amountAvailableBalance":1731973850.05,"amountMainBalance":1731973850.05,"amountOverdraftLimit":0,"amountWithholdingBalance":0,"bankName":"BANCO SANTANDER S.A CIUDAD GRUPO SANTANDER.EDF.PAMPA","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESM0XXX","codigoCorporate":"J101505920","companyIdsList":{"LOCAL":"J101505920","GLOBAL":"2938","NEXUS":"2938"},"country":"ES","countryName":"Spain","currencyCodeAvailableBalance":"EUR","currencyCodeMainBalance":"EUR","currencycodeOverdraftLimit":"EUR","currencyCodeWithholdingBalance":"EUR","customerId":"J101505920","description":"CUENTA 1 2 3 PYMES (P.J)","displayNumber":"ES1000490072012110458432","hasSwiftPayment":"YES","hasSwiftPayments":"YES","idType":"BBA","lastudpateWithholdingBalance":"2020-03-03T00:00:00Z","lastUpdateAvailableBalance":"2020-11-06T13:52:48Z","lastupdateMainBalance":"2020-11-06T13:52:48Z","lastUpdateOverdraftLimit":"2020-03-03T00:00:00Z","locatorbic":"M0","mandatoryPurpose":false,"paisbic":"ES","status":"Open","subsidiaryName":"CORPO","type":"BBA"},{"address":{"country":"ES","streetName":"Calle GTS 234","townName":"Madrid"},"amountAvailableBalance":0,"amountMainBalance":0,"bankName":"BANCO SANTANDER S.A CIUDAD GRUPO SANTANDER.EDF.PAMPA","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESM0XXX","companyIdsList":{"GLOBAL":"2938","NEXUS":"2938"},"country":"GB","countryName":"Great Britain","currencyCodeAvailableBalance":"USD","currencyCodeMainBalance":"EUR","displayNumber":"ES9900490000000000000099","hasSwiftPayment":"NO","hasSwiftPayments":"NO","idType":"BBA","lastUpdateAvailableBalance":"2019-04-04T22:00:00Z","lastupdateMainBalance":"2019-04-04T22:00:00Z","locatorbic":"M0","mandatoryPurpose":false,"paisbic":"ES","status":"H","subsidiaryName":"CORPORATE GTS 1 ES","type":"BBA"}];
                        value = [{"address":{"country":"ES","streetName":"306ª, High Holborn, High Holborn","townName":"London"},"amountAvailableBalance":40001,"amountMainBalance":40000,"amountOverdraftLimit":0,"amountWithholdingBalance":0,"bankName":"BANCO SANTANDER S.A.","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESMMXXX","codigoCorporate":"J000104892","companyIdsList":{"GTS":"-1363016250","LOCAL":"J000104892","API":"J000104892"},"country":"ES","countryName":"Spain","currencyCodeAvailableBalance":"EUR","currencyCodeMainBalance":"EUR","currencycodeOverdraftLimit":"EUR","currencyCodeWithholdingBalance":"EUR","customerId":"J000104892","description":"FINANCIACION COMERCIO EXTERIOR","displayNumber":"ES8800490072042710472885","hasSwiftPayment":"NO","hasSwiftPayments":"NO","idType":"IBA","lastUpdateAvailableBalance":"2021-02-24T13:01:56Z","lastupdateMainBalance":"2021-02-24T13:01:56Z","locatorbic":"MM","mandatoryPurpose":false,"paisbic":"ES","status":"Open","subsidiaryName":"AQUANIMAQA SAGB"},{"address":{"country":"ES","streetName":"306ª, High Holborn, High Holborn","townName":"London"},"amountOverdraftLimit":1,"amountWithholdingBalance":0,"bankName":"BANCO SANTANDER S.A.","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESMMXXX","codigoCorporate":"4382","companyIdsList":{"GTS":"-1363016250","LOCAL":"4382","API":"4382"},"country":"ES","countryName":"Spain","currencyCodeAvailableBalance":"EUR","currencyCodeMainBalance":"EUR","currencycodeOverdraftLimit":"EUR","currencyCodeWithholdingBalance":"EUR","customerId":"4382","description":"CUENTA CORRIENTE SANTANDER PB","displayNumber":"ES7700490454193000541739","hasSwiftPayment":"YES","hasSwiftPayments":"YES","idType":"IBA","lastUpdateAvailableBalance":"2021-02-09T15:57:12Z","lastupdateMainBalance":"2021-02-09T15:57:12Z","locatorbic":"MM","mandatoryPurpose":false,"paisbic":"ES","status":"Open","subsidiaryName":"AQUANIMAQA SAGB"},             {"address":{"country":"GB","streetName":"306ª, High Holborn, High Holborn","townName":"London"},"amountAvailableBalance":50001,"amountMainBalance":50000,"amountOverdraftLimit":0,"amountWithholdingBalance":0,"bankName":"BANCO SANTANDER S.A.","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESMMXXX","codigoCorporate":"J000104891","companyIdsList":{"GTS":"-1363016250","LOCAL":"J000104892","API":"J000104892"},"country":"GB","countryName":"Great Britain","currencyCodeAvailableBalance":"USD","currencyCodeMainBalance":"USD","currencycodeOverdraftLimit":"USD","currencyCodeWithholdingBalance":"USD","customerId":"J000104892","description":"FINANCIACION COMERCIO EXTERIOR","displayNumber":"ES8800490072042710472885","hasSwiftPayment":"NO","hasSwiftPayments":"NO","idType":"IBA","lastUpdateAvailableBalance":"2021-02-24T13:01:56Z","lastupdateMainBalance":"2021-02-24T13:01:56Z","locatorbic":"MM","mandatoryPurpose":false,"paisbic":"GB","status":"Open","subsidiaryName":"ANIMAQUA GB"}]
                        this.handleSaveToCache(keyCache, value)
                    }).then( (value) => {
                        resolve(value);
                    }).catch( (error) => {
                        console.log(error);
                        reject({
                            'title': this.label.B2B_Error_Problem_Loading,
                            'body': this.label.B2B_Problem_accounts,
                            'noReload': false
                        });
                    });
                }
            }).catch( (error) => {
                console.log(error);
                reject({
                    'title': this.label.B2B_Error_Problem_Loading,
                    'body': this.label.B2B_Problem_accounts,
                    'noReload': false
                });
            });
        });
    }

    callToBeneficiaryAccounts(userData, transferType, sourceAccount, originAccounts) {
        return new Promise( (resolve, reject) => {
            callToBeneficiaryAccounts({
                userData: userData,
                transferType: transferType,
                sourceAccount: sourceAccount,
                originAccounts: originAccounts
            })
            .then( actionResult => {
                var stateRV = actionResult;
                if (stateRV.success) {
                    resolve(stateRV.value.accountList);
                } else {
                    reject('callToBeneficiaryAccounts_ERROR');
                }
            })
            .catch( error =>{
                var errors = error;
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                }
                reject('callToBeneficiaryAccounts_ERROR');
            });
        })
    }

    getAccountsToB2BOrigin(userData, transferType) {
        return new Promise( (resolve, reject) => {
            let key = 'AccountsToB2BOrigin';
            //let services = ['add_international_payment_internal']; //07-09-2020 - SNJ - Accounts which can be selected by current logged in user to initiate a payment procedure
            this.handleRetrieveFromCache(key)
            .then( value => {
                if (value) {
                    resolve(value);
                } else {
                    // this.callToAccountsWithAttributions(userData, transferType)
                    // .then( value => {
                        value = [{"address":{"country":"BR","streetName":"","townName":"Belo Horizonte"},"alias":"","amountAvailableBalance":40001,"amountMainBalance":40000,"balanceAllowed":true,"bankName":"BANCO SANTANDER S.A.","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESMMXXX","codigoCorporate":"J000104892","companyIdsList":{"LOCAL":"J000104892","GLOBAL":"2995","NEXUS":"2995"},"country":"ES","countryName":"Spain","currencyCodeAvailableBalance":"EUR","customerId":"J000104892","displayNumber":"00490072042710472885","hasSwiftPayments":"false","idType":"BBA","internationalPaymentsAllowed":true,"lastUpdateAvailableBalance":"2021-01-28 09:06:14","lastUpdateAvailableBalanceMain":"2021-01-28T08:06:14.455+0000","locatorbic":"MM","mandatoryPurpose":false,"paisbic":"ES","status":"Open","subsidiaryName":"TESTGTS","transactionsAllowed":true,"valueDate":"2021-01-28T08:06:14.455+0000"},{"address":{"country":"BR","streetName":"","townName":"Belo Horizonte"},"alias":"CORPORATE CURRENT ACCOUNT","amountAvailableBalance":49295.3,"amountMainBalance":49295.3,"balanceAllowed":true,"bankName":"SANTANDER UK PLC","bic":"ABBY","branch":"XXX","codigoBic":"ABBYGB2LXXX","codigoCorporate":"2995","companyIdsList":{"LOCAL":"2995","GLOBAL":"2995","NEXUS":"2995"},"country":"GB","countryName":"United Kingdom","currencyCodeAvailableBalance":"GBP","customerId":"2995","displayNumber":"09022210205660","hasSwiftPayments":"false","idType":"BBA","internationalPaymentsAllowed":true,"lastUpdateAvailableBalance":"2021-01-28 09:06:17","lastUpdateAvailableBalanceMain":"2021-01-28T08:06:17.430+0000","locatorbic":"2L","mandatoryPurpose":false,"paisbic":"GB","status":"Open","subsidiaryName":"TESTGTS","transactionsAllowed":true,"valueDate":"2021-01-28T08:06:17.430+0000"},{"address":{"country":"ES","streetName":"Calle Patones","townName":"Madrid"},"alias":"STANDARD PRODUCTS","amountAvailableBalance":144065.78,"amountMainBalance":144065.78,"balanceAllowed":true,"bankName":"SANTANDER UK PLC","bic":"ABBY","branch":"XXX","codigoBic":"ABBYGB20XXX","codigoCorporate":"4382","companyIdsList":{"LOCAL":"4382","GLOBAL":"-1363016250","NEXUS":"4382"},"country":"GB","countryName":"United Kingdom","currencyCodeAvailableBalance":"GBP","customerId":"4382","displayNumber":"GB37ABBY09072445283289","hasSwiftPayments":"false","idType":"IBA","internationalPaymentsAllowed":true,"lastUpdateAvailableBalance":"2021-01-28 09:06:20","lastUpdateAvailableBalanceMain":"2021-01-28T08:06:20.556+0000","locatorbic":"20","mandatoryPurpose":false,"paisbic":"GB","status":"Open","subsidiaryName":"M.G.M. ACCIAIERIA ITALIA","transactionsAllowed":true,"valueDate":"2021-01-28T08:06:20.556+0000"},{"address":{"country":"ES","streetName":"Calle Patones","townName":"Madrid"},"alias":"CORPORATE CURRENT ACCOUNT","amountAvailableBalance":11.48,"amountMainBalance":11.48,"balanceAllowed":true,"bankName":"SANTANDER UK PLC","bic":"ABBY","branch":"XXX","codigoBic":"ABBYGB20XXX","codigoCorporate":"4382","companyIdsList":{"LOCAL":"4382","GLOBAL":"-1363016250","NEXUS":"4382"},"country":"GB","countryName":"United Kingdom","currencyCodeAvailableBalance":"GBP","customerId":"4382","displayNumber":"GB66ABBY09022210211272","hasSwiftPayments":"false","idType":"IBA","internationalPaymentsAllowed":true,"lastUpdateAvailableBalance":"2021-01-28 09:06:20","lastUpdateAvailableBalanceMain":"2021-01-28T08:06:20.556+0000","locatorbic":"20","mandatoryPurpose":false,"paisbic":"GB","status":"Open","subsidiaryName":"M.G.M. ACCIAIERIA ITALIA","transactionsAllowed":true,"valueDate":"2021-01-28T08:06:20.556+0000"},{"address":{"country":"ES","streetName":"Calle Patones","townName":"Madrid"},"alias":"OTHER VT-2","amountAvailableBalance":9772523.92,"amountMainBalance":9772523.92,"balanceAllowed":true,"bankName":"SANTANDER UK PLC","bic":"ABBY","branch":"XXX","codigoBic":"ABBYGB20XXX","codigoCorporate":"4382","companyIdsList":{"LOCAL":"4382","GLOBAL":"-1363016250","NEXUS":"4382"},"country":"GB","countryName":"United Kingdom","currencyCodeAvailableBalance":"GBP","customerId":"4382","displayNumber":"09072322275601","hasSwiftPayments":"false","idType":"BBA","internationalPaymentsAllowed":true,"lastUpdateAvailableBalance":"2021-01-28 09:06:20","lastUpdateAvailableBalanceMain":"2021-01-28T08:06:20.556+0000","locatorbic":"20","mandatoryPurpose":false,"paisbic":"GB","status":"Open","subsidiaryName":"M.G.M. ACCIAIERIA ITALIA","transactionsAllowed":true,"valueDate":"2021-01-28T08:06:20.556+0000"}];
                        this.filterAccountsToB2BOriginByCountryAndCurrency(userData, value)
                    // })
                    .then( value => {
                        return this.handleSaveToCache(key, value);
                    }).then( value => {
                        resolve(value);
                    }).catch( error => {
                        console.log(error);
                        reject({
                            'title': this.label.B2B_Error_Problem_Loading,
                            'body': this.label.B2B_Problem_accounts,
                            'noReload': false
                        });
                    });
                }
                
            }).catch( error => {
                console.log(error);
                reject({
                    'title': this.label.B2B_Error_Problem_Loading,
                    'body': this.label.B2B_Problem_accounts,
                    'noReload': false
                });
            });
        });
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
                    decryptAccountsData({ str : data})
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

    callToAccountsWithAttributions(nexus, transferType) {
        return new Promise( (resolve, reject) => {
            callToAccountsWithAttributions({
                userData : nexus,
                transferType : transferType
            })
            .then( actionResult => {
                let stateRV = actionResult;
                if (stateRV.success) {
                    resolve(stateRV.value.accountList);
                } else {
                    reject('callToAccountsWithAttributions_ERROR');
                }
            })
            .catch( error => {
                let errors = error;
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                }
                reject('callToAccountsWithAttributions_ERROR');
            })
        });
    }

    filterAccountsToB2BOriginByCountryAndCurrency(userData, accountList){
        return new Promise( (resolve, reject) => {
            filterAccountsByCountryAndCurrency({
                userData : userData,
                accountList : accountList
            })
            .then( actionResult => {
                var stateRV = actionResult;
                stateRV = {"msg":"","success":true,"value":{"accountList":[{"address":{},"alias":"","amountAvailableBalance":40001,"amountMainBalance":40000,"balanceAllowed":true,"bankName":"BANCO SANTANDER S.A.","bic":"BSCH","branch":"XXX","codigoBic":"BSCHESMMXXX","codigoCorporate":"J000104892","companyIdsList":{"API":"J000104892"},"country":"ES","countryName":"Spain","currencyCodeAvailableBalance":"EUR","customerId":"J000104892","displayNumber":"ES8800490072042710472885","hasSwiftPayments":"false","idType":"IBA","internationalPaymentsAllowed":true,"lastUpdateAvailableBalance":"2021-02-24 15:01:56","lastUpdateAvailableBalanceMain":"2021-02-24T13:01:56.000+0000","locatorbic":"MM","mandatoryPurpose":false,"paisbic":"ES","status":"","transactionsAllowed":true,"valueDate":"2021-02-24T13:01:56.000+0000"},{"address":{},"alias":"CORPORATE CURRENT ACCOUNT","amountAvailableBalance":49077.4,"amountMainBalance":49077.4,"balanceAllowed":true,"bankName":"SANTANDER UK PLC","bic":"ABBY","branch":"XXX","codigoBic":"ABBYGB2LXXX","codigoCorporate":"2995","companyIdsList":{"API":"2995"},"country":"GB","countryName":"United Kingdom","currencyCodeAvailableBalance":"GBP","customerId":"2995","displayNumber":"GB76ABBY09022210205660","hasSwiftPayments":"false","idType":"IBA","internationalPaymentsAllowed":true,"lastUpdateAvailableBalance":"2021-02-17 13:11:26","lastUpdateAvailableBalanceMain":"2021-02-17T11:11:26.000+0000","locatorbic":"2L","mandatoryPurpose":false,"paisbic":"GB","status":"Open","transactionsAllowed":true,"valueDate":"2021-02-17T11:11:26.000+0000"},{"address":{"country":"ES"},"alias":"CORPORATE CURRENT ACCOUNT","amountAvailableBalance":3.32,"amountMainBalance":3.32,"balanceAllowed":true,"bankName":"SANTANDER UK PLC","bic":"ABBY","branch":"XXX","codigoBic":"ABBYGB20XXX","codigoCorporate":"4382","companyIdsList":{"GTS":"-1363016250","LOCAL":"4382","API":"4382"},"country":"GB","countryName":"United Kingdom","currencyCodeAvailableBalance":"GBP","customerId":"4382","displayNumber":"GB66ABBY09022210211272","hasSwiftPayments":"false","idType":"IBA","internationalPaymentsAllowed":true,"lastUpdateAvailableBalance":"2021-02-17 13:11:26","lastUpdateAvailableBalanceMain":"2021-02-17T11:11:26.000+0000","locatorbic":"20","mandatoryPurpose":false,"paisbic":"GB","status":"Open","subsidiaryName":"AQUANIMAQA SAGB","transactionsAllowed":true,"valueDate":"2021-02-17T11:11:26.000+0000"},{"address":{"country":"ES"},"alias":"OTHER VT-2","amountAvailableBalance":9766209.72,"amountMainBalance":9766209.72,"balanceAllowed":true,"bankName":"SANTANDER UK PLC","bic":"ABBY","branch":"XXX","codigoBic":"ABBYGB20XXX","codigoCorporate":"4382","companyIdsList":{"GTS":"-1363016250","LOCAL":"4382","API":"4382"},"country":"GB","countryName":"United Kingdom","currencyCodeAvailableBalance":"GBP","customerId":"4382","displayNumber":"GB72ABBY09072322275601","hasSwiftPayments":"false","idType":"IBA","internationalPaymentsAllowed":true,"lastUpdateAvailableBalance":"2021-02-17 13:11:26","lastUpdateAvailableBalanceMain":"2021-02-17T11:11:26.000+0000","locatorbic":"20","mandatoryPurpose":false,"paisbic":"GB","status":"Open","subsidiaryName":"AQUANIMAQA SAGB","transactionsAllowed":true,"valueDate":"2021-02-17T11:11:26.000+0000"},{"address":{"country":"ES"},"alias":"STANDARD PRODUCTS","amountAvailableBalance":143941.34,"amountMainBalance":143941.34,"balanceAllowed":true,"bankName":"SANTANDER UK PLC","bic":"ABBY","branch":"XXX","codigoBic":"ABBYGB20XXX","codigoCorporate":"4382","companyIdsList":{"GTS":"-1363016250","LOCAL":"4382","API":"4382"},"country":"GB","countryName":"United Kingdom","currencyCodeAvailableBalance":"GBP","customerId":"4382","displayNumber":"GB37ABBY09072445283289","hasSwiftPayments":"false","idType":"IBA","internationalPaymentsAllowed":true,"lastUpdateAvailableBalance":"2021-02-17 13:11:26","lastUpdateAvailableBalanceMain":"2021-02-17T11:11:26.000+0000","locatorbic":"20","mandatoryPurpose":false,"paisbic":"GB","status":"Open","subsidiaryName":"AQUANIMAQA SAGB","transactionsAllowed":true,"valueDate":"2021-02-17T11:11:26.000+0000"}]}};
                if (stateRV.success) {
                    resolve(stateRV.value.accountList);
                } else {
                    reject('discardAccountsByCountry_ERROR');
                }
            })
            .catch( error => {
                var errors = error;
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                }
                reject('discardAccountsByCountry_ERROR');
            })
        });
    }

    handleSaveToCache(key, data) {
        return new Promise( (resolve, reject) => {
            const PAY_AccountsCache = this.label.PAY_AccountsCache;
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

    handleAccountsToB2BDestination(value) {
        return new Promise( (resolve, reject) => {
            let transferType = this.transferType;
            let PTT_instant_transfer = this.label.PTT_instant_transfer;
            let PTT_international_transfer_single = this.label.PTT_international_transfer_single;
            let paymentDraft = this.paymentDraft;
            // if (value) {
            let accountListDestination = this.removeAccountFromList(value, paymentDraft);
            if (transferType == PTT_instant_transfer) {
                if (accountListDestination) {   
                    this.accountListDestination = accountListDestination;
                    resolve('handleAccountsToB2BDestination_OK');
                } else {
                    reject({
                        title: this.label.B2B_Error_Problem_Loading,
                        body: this.label.B2B_Problem_accounts,
                        noReload: false
                    });
                }
            } else if (transferType == PTT_international_transfer_single) {
                this.accountListDestination = accountListDestination;
                resolve('handleAccountsToB2BDestination_OK');
            } else {
                reject({
                    title: this.label.B2B_Error_Problem_Loading,
                    body: this.label.B2B_Problem_accounts,
                    noReload: false
                });
            }
        });
    }

    removeAccountFromList(listToCheck, accountToDelete) {
        let newList = [];
        if(listToCheck){
            for (let i = 0; i < listToCheck.length; i++) {
                if (listToCheck[i].displayNumber.localeCompare(accountToDelete.displayNumber) != 0) {
                    newList[i] = listToCheck[i];
                }
            }
        }        
        return newList;
    }

    showToast (title, body, noReload) {
        var errorToast = this.template.querySelector('c-lwc_b2b-toast');
        if (errorToast) {
            errorToast.openToast(false, false, title, body, 'Error', 'warning', 'warning', noReload, false);
        }
    }

    showSuccessToast(title, body, method) {
        var toast = this.template.querySelector('c-lwc_b2b-toast');
        if (toast) {
            toast.openToast(true, false, title, body, 'Success', 'success', 'success', false, false, method);
        }
    }

    getUserData() {
        return new Promise( (resolve, reject) => {
            // getUserData()
            // .then(value => {
            //     var stateRV = value;
            //     if (stateRV.success) {
            //         if (stateRV.value) {
            //             if (stateRV.value.userData) {
            //                 this.userData = stateRV.value.userData;
                            this.userData = {"accountCountry":"QU","accountId":"0011x000018I9X6AAK","accountName":"AQUANIMAQA SAGB","alias":"minie","bic":"BSCHESMM","cashNexus":false,"cib":false,"companyBIC":"NULL","companyId":"-1363016250","contactId":"0031x00000yv7evAAA","contactName":"MacarenaQA Iniesta","country":"ES","dateFormat":"MM/dd/yyyy","documentNumber":"111111150","documentType":"tax_id","email":"macarenaqa44@segovia.com","firstName":"MacarenaQA","globalId":"5b05d962-a3ed-4ee6-af65-4d738b560446","lastName":"Iniesta","multiOneTrade":true,"numberFormat":"###.###.###,##","profileName":"Portal User","userId":"0051x000004ZryMAAS"};
                            resolve('getUserData_OK');
            //             } else {
            //                 reject({
            //                     'title': this.label.ERROR_NOT_RETRIEVED,
            //                     'body': this.label.ERROR_NOT_RETRIEVED,
            //                     'noReload': true
            //                 });
            //             }
            //         } else {
            //             reject({
            //                 'title': this.label.ERROR_NOT_RETRIEVED,
            //                 'body': this.label.ERROR_NOT_RETRIEVED,
            //                 'noReload': true
            //             });
            //         }
            //     } else {
            //         reject({
            //             'title': this.label.ERROR_NOT_RETRIEVED,
            //             'body': this.label.ERROR_NOT_RETRIEVED,
            //             'noReload': true
            //         });
            //     }
            // })
            // .catch(error => {
            //     if (error) {
            //         console.log('Error message: ' + error);
            //     }
            //     reject({
            //         'title': this.label.ERROR_NOT_RETRIEVED,
            //         'body': this.label.ERROR_NOT_RETRIEVED,
            //         'noReload': true
            //     });
            // })
        });
    }

    // getAccountData() {
    //     return new Promise( (resolve, reject) => {
    //         getAccountData()
    //             .then(value => {
    //                 var accountData = {};
    //                 var stateRV = value;
    //                 if (stateRV.success) {
    //                     if (stateRV.value.cib) {
    //                         accountData.cib = stateRV.value.cib;
    //                     } 
    //                     else { // FLOWERPOWER_PARCHE_MINIGO
    //                         accountData.cib = false; // Añadir un error
    //                     }

    //                     if (stateRV.value.documentType) {
    //                         accountData.documentType = stateRV.value.documentType;
    //                     } 
    //                     else { // FLOWERPOWER_PARCHE_MINIGO
    //                         accountData.documentType = 'tax_id'; // Añadir un error
    //                     }
                        
    //                     if (stateRV.value.documentNumber) {
    //                         accountData.documentNumber = stateRV.value.documentNumber;
    //                     } 
    //                     else { // FLOWERPOWER_PARCHE_MINIGO
    //                         accountData.documentNumber = 'B86561412'; // Añadir un error
    //                     }

    //                     if (stateRV.value.companyId) {
    //                         accountData.companyId = stateRV.value.companyId;
    //                     } 
    //                     else { // FLOWERPOWER_PARCHE_MINIGO
    //                         accountData.companyId = '2119'; // Añadir un error
    //                     }
    //                 }
    //                 this.accountData = accountData;
    //                 resolve('getAccountData_OK');
    //             })
    //             .catch(error => {
    //                 if (error) {
    //                     if (error) {
    //                         console.log('Error message: ' + error);
    //                     }
    //                 }
    //                 reject({
    //                     'title': this.label.ERROR_NOT_RETRIEVED,
    //                     'body': this.label.ERROR_NOT_RETRIEVED,
    //                     'noReload': true
    //                 });
    //             })
    //     });
    // }

    handleAccountsToB2BOrigin(value) {
        return new Promise( (resolve, reject) => {
            if (value) {
                this.accountListOrigin = value;
                resolve('handleAccountsToB2BOrigin_OK');
            } else {
                reject({
                    title: this.label.B2B_Error_Problem_Loading,
                    body: this.label.B2B_Problem_accounts,
                    noReload: false
                });
            }
        });
    }

    // getURLParams() {
    //     try {
    //         var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
    //         sPageURLMain = "params=caPfLuOWH8iPDXqDzyiZigBWJ3vWQE6eMo/qOcBd3T2K8ED5RaxXzswNzwsIQM2UyfcKvhDIppa2qTQ3RSsKGg==";
    //         var sURLVariablesMain = sPageURLMain.split('&')[0].split('=');
    //         var sParameterName;
    //         var sPageURL;
    //         if (sURLVariablesMain[0] == 'params') {
    //             if (sURLVariablesMain[1] != '' && sURLVariablesMain[1] != undefined && sURLVariablesMain[1] != null) {
    //                 this.decrypt(sURLVariablesMain[1])
    //                     .then( results => {
    //                         sURLVariablesMain[1] === undefined ? 'Not found' : sPageURL = results;
    //                         var sURLVariables = sPageURL.split('&');
    //                         var paymentId = '';
    //                         var source = '';
    //                         var paymentDetails = {};
    //                         for (var i = 0; i < sURLVariables.length; i++) {
    //                             sParameterName = sURLVariables[i].split('=');
    //                             if (sParameterName[0] === 'c__paymentId') {
    //                                 sParameterName[1] === undefined ? 'Not found' : paymentId = sParameterName[1]; this.paymentId = sParameterName[1];
    //                             }
    //                             if (sParameterName[0] === 'c__source') {
    //                                 sParameterName[1] === undefined ? 'Not found' : source = sParameterName[1];
    //                             }
    //                             if (sParameterName[0] === 'c__paymentDetails') {
    //                                 sParameterName[1] === undefined ? 'Not found' : paymentDetails = JSON.parse(sParameterName[1]);
    //                             }
    //                         }
    //                         if (paymentId != null && paymentId != '') {
    //                             if (source != null && source != '') {
    //                                 if (source == 'landing-payment-details') {
    //                                     this.isEditing = true;
    //                                     if (paymentDetails) {
    //                                         var dataSelectAmount = this.dataSelectAmount;
    //                                         dataSelectAmount.amountSend = paymentDetails.amount;
    //                                         dataSelectAmount.transactionFee = paymentDetails.fees;
    //                                         if (paymentDetails.operationNominalFxDetails) {
    //                                             if (paymentDetails.operationNominalFxDetails.ccyCountervalue) {
    //                                                 if (paymentDetails.operationNominalFxDetails.ccyCountervalue.ccyCountervalueAmount) {
    //                                                     dataSelectAmount.amountReceive = paymentDetails.operationNominalFxDetails.ccyCountervalue.ccyCountervalueAmount;
    //                                                 } else {
    //                                                     dataSelectAmount.amountReceive = null;
    //                                                 }
    //                                             } else {
    //                                             dataSelectAmount.amountReceive = null; 
    //                                             }
    //                                         } else {
    //                                             dataSelectAmount.amountReceive = null;
    //                                         }
    //                                         var dataPaymentInformation = this.dataPaymentInformation;
    //                                         dataPaymentInformation.reference = paymentDetails.clientReference;
    //                                         dataPaymentInformation.purpose = paymentDetails.purpose;
    //                                         dataPaymentInformation.description = paymentDetails.paymentReference;
    //                                         dataPaymentInformation.paymentReason = paymentDetails.paymentReason;
    //                                         dataPaymentInformation.paymentStatus = paymentDetails.paymentStatus;
    //                                         var originList = this.accountListOrigin;
    //                                         console.log(originList);
    //                                         console.log(originList.length);
    //                                         let exitOrigin = false;
    //                                         let i = 0;
    //                                         while (exitOrigin == false && i < originList.length) {
    //                                             console.log(originList[i]);
    //                                             if (originList[i].displayNumber == paymentDetails.sourceAccount.trim()) {
    //                                                 console.log('ok');
    //                                                 console.log(originList[i]);
    //                                                 this.dataSelectOrigin = originList[i];
    //                                                 exitOrigin = true;
    //                                             }
    //                                             i++;
    //                                         }
    //                                         var destinationList = this.accountListDestination;
    //                                         let exitDestination = false;
    //                                         let j = 0;
    //                                         while (exitDestination == false && j < destinationList.length) {
    //                                             if (destinationList[j].displayNumber == paymentDetails.beneficiaryAccount.trim()) {
    //                                                 this.dataSelectDestination = destinationList[j];
    //                                                 exitDestination = true;
    //                                             }
    //                                             j++;
    //                                         }
    //                                         this.dataSelectAmount = dataSelectAmount;
    //                                         this.dataPaymentInformation = dataPaymentInformation;
    //                                         var steps = this.steps;
    //                                         if (steps) {
    //                                             steps.shownStep = 4;
    //                                             steps.focusStep = 1;
    //                                             steps.lastModifiedStep = 4;
    //                                             steps.totalSteps = 5;
    //                                             this.steps = steps;
    //                                         }
    //                                     }
    //                                 }
    //                             }
    //                         }
    //                 });
    //             } else {
    //                 this.steps.shownStep = 1;
    //             }
    //         } else {
    //             this.steps.shownStep = 1;
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    getURLParams() {
        return new Promise((resolve, reject) => {
            this.paymentId = '';
            this.paymentDetails = {};
            this.transferType = '';            
            let sPageURLMain = decodeURIComponent(window.location.search.substring(1));
            sPageURLMain = "params=%2F5DJs1wO1vCkJeawtBmuoBhdilIUaKwBIy6ZJU1s6E9pd92SEWDQtkg2d9kJTLjCKkd%2FwbrGEWcjyffoMj%2FHjg%3D%3D";
            let sURLVariablesMain = sPageURLMain.split('&')[0].split('=');
            if (sURLVariablesMain[0] == 'params' && sURLVariablesMain[1]) {
                this.decrypt(sURLVariablesMain[1])
                    .then((results) => {
                        results = "c__transferType=instant_transfer";
                        let paymentId = '';
                        let paymentDetails = {};
                        let reuse = false;
                        let transferType = '';
                        let header = '';
                        if (results) {
                            let sURLVariables = results.split('&');
                            for (var i = 0; i < sURLVariables.length; i++) {
                                let sParameterName = sURLVariables[i].split('=');
                                if (sParameterName[0] === 'c__paymentId') {
                                    paymentId = sParameterName[1];
                                    this.paymentId = paymentId;
                                }
                                if (sParameterName[0] === 'c__paymentDetails') {
                                    if (sParameterName[1]) {
                                        paymentDetails = JSON.parse(sParameterName[1]);
                                        this.paymentDetails = paymentDetails;
                                    }
                                }
                                if (sParameterName[0] === 'c__reuse') {
                                    if (sParameterName[1]) {
                                        reuse = JSON.parse(sParameterName[1]);
                                        this.isReuse = reuse;
                                    }
                                }
                                if (sParameterName[0] === this.label.PARAM_transferType) {
                                    if (sParameterName[1]) {
                                        transferType = sParameterName[1];
                                        this.transferType = transferType;
                                    }
                                }
                            }

                        }
                        if (paymentDetails && !transferType) {
                            var b2bprodId = this.label.CNF_payment_productId_001;
                            var IIPprodId = this.label.CNF_payment_productId_002;
                            if (paymentDetails.productId) {
                                if (paymentDetails.productId === b2bprodId) {
                                    transferType = this.label.PTT_instant_transfer;
                                } else if (paymentDetails.productId === IIPprodId){
                                    transferType = this.label.PTT_international_transfer_single;
                                }
                                this.transferType = transferType;
                            }
                        }
                        if (transferType == this.label.PTT_instant_transfer || transferType == 'instant_transfer') {
                            header = this.label.instantTransfer;
                        } else if (transferType == this.label.PTT_international_transfer_single || transferType == 'international_transfer_single') {
                            header = this.label.PAY_InternationalTransfer;
                        }
                        this.headerLabel = header;
                        resolve('getURLParams_OK');
                    }).catch((error) => {
                        reject({
                            'title': this.label.B2B_Error_Problem_Loading,
                            'body': this.label.B2B_Error_Check_Connection,
                            'noReload': false
                        });
                    });
            } else {
                resolve('getURLParams_OK');
            }
        });
    }

    initReusingProcess() {
        return new Promise((resolve, reject) => {
            let reuse = this.isReuse;
            let paymentDetails = this.paymentDetails;
            if (reuse && paymentDetails) {
                this.isEditingProcess = true;
                this.isEditing = true;
                this.loadingEditingProcess();
            }
            resolve('initReusingProcess');
        });
    }

    
    decrypt (data) {
        try {
			var result = '';
			return new Promise( (resolve, reject) => {
				decryptData({
					str : data
				})
				.then((value) => {
					if(value){
						result = value;
					}
					resolve(result);
				})
				.catch((error) => {
					if (error[0] && error[0].message) {
						console.log('Error message: ' + 
									error[0].message);
						reject(response.getError()[0]);
					}
					resolve(result);
				})
			});
		} catch(e) {
			console.error(e);
        }
        
    }

    goToLanding() {
        this[NavigationMixin.Navigate]({
            type: "comm__namedPage", 
            attributes: {
                pageName: 'landing-payments'
            }, 
            state: {
                params : ''
            }
        });
    }
    
    goToHelp() {
        this[NavigationMixin.Navigate]({
            type: "comm__namedPage", 
            attributes: {
                pageName: 'contact-us'
            }, 
            state: {
                params : ''
            }
        });
    }

    // handleBack() {
    //     let steps = this.steps;
    //     if (steps.focusStep == 5) {
    //         this.isEditing = true;
    //     }
    //     this.previousStep();
    // }

    handleBack() {
        new Promise((resolve, reject) => {
            this.spinner = true;
            resolve('Ok');
        }).then( () => {
             let steps = this.steps;
            if (steps.focusStep == 5) {
                this.isEditing = true;
                return this.reverseLimits();                
            }else{
               resolve('ok'); 
            }
        }).catch( error => {
            console.log(error);                
        }).finally( () => {
            this.previousStep();
            //pintado barra
            this.template.querySelector('c-lwc_b2b_process-header').changeWidthSteps(this.steps);
            this.spinner = false;
        });
    }

    // handleCancel() {
    //     alert('Cancelar.');
    // }

    handleContinue() {
        let steps = this.steps;
        let focusStep = steps.lastModifiedStep;
        if (focusStep == 1) {
            let selectOrigin = this.template.querySelector('c-lwc_b2b_select-origin');
            selectOrigin.handleCheckContinue(1);
        } else if (focusStep == 2) {
            let selectDestination = this.template.querySelector('c-lwc_b2b_select-destination');
            selectDestination.handleCheckContinue(2);
        } else if (focusStep == 3) {
            let selectAmount = this.template.querySelector('c-lwc_b2b_select-amount');
            selectAmount.handleCheckContinue(3);
        } else if (focusStep == 4) {
            let paymentInformation = this.template.querySelector('c-lwc_b2b_payment-information');
            paymentInformation.handleCheckContinue(4);
        }
    }

    previousStep() {
        let steps = this.steps;
        let shownStep = steps.shownStep;
        let focusStep = steps.focusStep;
        let totalSteps = steps.totalSteps;
        let editPayment = false;
        if (focusStep > 1) {
            if (shownStep == focusStep && shownStep == 5) {
                editPayment = true;
            }
            console.log(this.steps.focusStep);
            if (totalSteps == focusStep) {
                shownStep -= 1;
            }
            else if (focusStep == shownStep) {
                shownStep -=1;
            }
            focusStep -= 1;
            var parametros = this.processStep(shownStep, focusStep, editPayment);
            parametros.then( () => {
                if (editPayment) {
                    this.steps.focusStep = focusStep;
                }
                if (focusStep < totalSteps) {
                    // var element = "[data-id='step-" + focusStep + "']";;
                    // var stepComponent = this.template.querySelector(element);
                    // if (stepComponent != null) {
                    //     stepComponent.scrollIntoView({ behavior: 'smooth' });
                    // } else {
                    //     setTimeout( () => {
                    //         stepComponent = this.template.querySelector(element);
                    //         if (stepComponent != null) {
                    //             stepComponent.scrollIntoView({ behavior: 'smooth' });
                    //         }
                    //     }, 10);
                    // }
                    switch(focusStep){
                        case 1:
                            this.template.querySelector('c-lwc_b2b_select-origin').doScroll(focusStep);
                            break;
                        case 2:
                            this.template.querySelector('c-lwc_b2b_select-destination').doScroll(focusStep);
                            break;
                        case 3:
                            this.template.querySelector('c-lwc_b2b_select-amount').doScroll(focusStep);
                            break;
                        case 4:
                            this.template.querySelector('c-lwc_b2b_payment-information').doScroll(focusStep);
                            break;
                    }
                }
            }).catch( (error) => {
                console.log(error);
            }).finally( ()  => {
                console.log('end scrollIntoView');
            });
        }
    }

    handleReloadRetrieveAccounts(event) {
        let reload = event.detail.reload;
        let landing = event.detail.landing;
        var accountListOrigin = this.accountListOrigin;
        var accountListDestination = this.accountListDestination;
        var step = null;
        if (!accountListOrigin) {
            step = 1;
        } else if (!accountListDestination) {
            step = 2;
        }
        if (reload && !landing && step != null) {
            new Promise( resolve => {
                this.spinner = true;
                resolve('Ok');
            }).then( () => {
                if (step == 1) {
                    return this.getAccountsToB2BOrigin( this.userData, this.transferType);
                } else if (step == 2) {
                    let userData = this.userData;
                    let paymentDraft = this.paymentDraft;
                    return this.getAccountsToB2BDestination(userData, this.transferType, paymentDraft.sourceAccount);
                }
            }).then( value => {
                if (step == 1) {
                    return this.handleAccountsToB2BOrigin(value);
                } else if (step == 2) {
                    return this.handleAccountsToB2BDestination(value);
                }
            }).then( () => {
                if (step == 2) {
                    return this.checkLastModified();
                }
            }).then( () => {
                if (step == 2) {
                    this.nextStep();
                }
            }).catch( error => {
                console.log(error);
                this.showToast(error.title, error.body, error.noReload);
            }).finally( () => {
                this.spinner = false;
            });
            this.reload = false;
        }
    }

    initEditingProcess() {
        return new Promise( resolve => {
            let paymentId = this.paymentId;
            let paymentDetails = this.paymentDetails;
            if (paymentId && paymentDetails) {
                this.isEditingProcess = true;
                this.isEditing = true;
                this.loadingEditingProcess();
            }
            resolve('initEditingProcess_OK');
        });
    }

    loadingEditingProcess() {
        return new Promise( resolve => {
            //this.isEditingProcess = true;
            let isEditingProcess = this.isEditingProcess;
            if (isEditingProcess == true) {
                let paymentDetails = this.paymentDetails;
                let steps = this.steps;
                let focusStep = steps.lastModifiedStep;
                if (focusStep == 1) {
                    // let dataSelectOrigin = null;
                    let sourceAccount = null;
                    var originList = this.accountListOrigin;
                    if (originList) {
                        for (let i = 0; i < originList.length && sourceAccount == null; i++) {
                            if (originList[i].displayNumber == paymentDetails.sourceAccount.trim()) {
                                sourceAccount = originList[i];
                            }
                        }
                    }
                    if (sourceAccount) {
                        paymentDraft.sourceAccount  = sourceAccount;
                        let paymentDraft = this.paymentDraft;
                        this.paymentDraft = paymentDraft;
                        let selectOrigin = this.template.querySelector('c-lwc_b2b_select-origin');
                        selectOrigin.checkContinue(1);
                    }
                } else if (focusStep == 2) {
                    let destinationAccount  = null;
                    var destinationList = this.accountListDestination;
                    if (destinationList) {
                        for (let i = 0; i < destinationList.length && destinationAccount  == null; i++) {
                            if (destinationList[i].displayNumber == paymentDetails.beneficiaryAccount.trim()) {
                                destinationAccount  = destinationList[i];
                            }
                        }
                    }
                    if (destinationAccount ) {
                        let paymentDraft = this.paymentDraft;
                        paymentDraft.destinationAccount = destinationAccount;
                        this.paymentDraft = paymentDraft;
                        
                        let selectDestination = this.template.querySelector('c-lwc_b2b_select-destination');
                        selectDestination.checkContinue(2);
                    }
                } else if (focusStep == 3) {
                    
                    let amountReceive = null;
                    let amountSend = null;
                    let amountEntered = null;
                    let amountEnteredFrom = '';
                    if (paymentDetails.operationAmount && paymentDetails.operationAmount.amount) {
                        if (paymentDetails.operationNominalFxDetails && paymentDetails.operationNominalFxDetails.customerExchangeRate) {
                            amountReceive = paymentDetails.operationAmount.amount;
                            amountEntered = paymentDetails.operationAmount.amount;
                            amountEnteredFrom = 'recipient';
                        } else {
                            amountSend = paymentDetails.operationAmount.amount;
                            amountEntered = paymentDetails.operationAmount.amount;
                            amountEnteredFrom = 'source';
                        }
                    } else if (paymentDetails.counterValueOperationAmount && paymentDetails.counterValueOperationAmount.amount) {
                        dataSelectAmount.amountSend = paymentDetails.counterValueOperationAmount.amount;
                        amountEntered = paymentDetails.counterValueOperationAmount.amount;
                        amountEnteredFrom = 'source';
                    }
                    let paymentDraft = this.paymentDraft;
                    paymentDraft.amountReceive = amountReceive;
                    paymentDraft.amountSend = amountSend;
                    paymentDraft.amountEnteredFrom = amountEnteredFrom;
                    this.paymentDraft = paymentDraft;

                    let selectAmount = this.template.querySelector('c-lwc_b2b_select-amount');
                    selectAmount.editingProcess(amountEntered, amountEnteredFrom);
                    this.isEditingProcess = false;
                    this.paymentDetails = {};
                } else {
                    this.isEditingProcess = false;
                    this.paymentDetails = {};
                }
            }
            resolve('initEditingProcess_OK');
        });
    }

    handleAccountData(event){
        if(event.detail.step == 1){
            this.paymentDraft.sourceAccount = event.detail.account;
            this.paymentDraft.paymentId = event.detail.id;
            this.paymentDraft.destinationAccount = {};
            this.paymentDraft.expensesAccount = event.detail.expensesAccount ? event.detail.expensesAccount : {};
            if(this.steps.shownStep >= 2){
                this.handleBack();
            }
        }
        else if(event.detail.step == 2){
            this.paymentDraft.destinationAccount = event.detail.account;
            this.paymentDraft.expensesAccount = event.detail.expensesAccount ? event.detail.expensesAccount : {};
            if(event.detail.exchange){
                this.paymentDraft.exchangeRate = event.detail.exchange;
            }
            if(event.detail.dominant){
                this.paymentDraft.sourceCurrencyDominant = event.detail.dominant;
            }   
            if(event.detail.currency){
                this.paymentDraft.paymentCurrency = event.detail.currency;
            }          
        }
        else if(event.detail.step == 3){
            this.paymentDraft = event.detail.paymentDraft;
        }

    }

    
    /*
    Author:        	Shahad Naji
    Company:        Deloitte
    Description:    Makes the callout to cancel a previously validated transaction, 
    which removes it from transactional counters for accumulated limits
    History:
    <Date>          <Author>            <Description>	    
    18/01/2021      Shahad Naji         Initial version 
    */

    reverseLimits() {
        return new Promise((resolve, reject) => {
            let paymentDraft = this.paymentDraft;

            let notificationTitle = this.label.B2B_Error_Problem_Loading;
            let subtitle = null;
            let ok = 'ok';

            reverseLimits({
                paymentDraft: paymentDraft
            }).then(response => {
                let output = response.getReturnValue();
                if (output.success) {
                    if (output.value) {
                        if (returnValue.value.limitsResult.toLowerCase() != ok.toLowerCase()) {
                            resolve('ok');
                        } else {
                            this.showToast(notificationTitle, subtitle, false);
                            reject('ko');
                        }
                    } else {
                        resolve('ok');
                    }
                } else {
                    this.showToast(notificationTitle, subtitle, false);
                    reject('ko');
                }
            }).catch(error => {
                let errors = error;
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                } else {
                    console.log('Unknown error');
                }
                reject('ko');
            })         
        });
    }

    postFraud() {
        return new Promise((resolve, reject) => {
            try {
                var userData = this.userData;
                var navigatorInfo = this.navigatorInfo;
                var paymentDraft = this.paymentDraft;

                postFraud({
                    userData : userData,
                    navigatorInfo : navigatorInfo,
                    paymentDraft :paymentDraft
                }).then(response => {
                    var stateRV = response;
                    if (stateRV.success) {
                        resolve('ok');
                    }else{
                        reject('ko');
                    }
                }).then(error => {
                    var errors = error;
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log('Error message: ' + errors[0].message);
                            }
                        } else {
                            console.log('Unknown error');
                        }
                        reject('ko');
                }) 
            } catch(e) {
                console.error(e);
                console.error('e.name => ' + e.name);
                console.error('e.message => ' + e.message);
                console.error('e.stack => ' + e.stack);
                reject('ko');
            }
        });
    }

    getPaymentSignatureStructure() {
        return new Promise((resolve, reject) => {

            var paymentDraft = this.paymentDraft;

            getSignatureStructure({
                channel: 'WEB',
                navigatorInfo : this.navigatorInfo,
                paymentDraft: paymentDraft
            }).then(actionResult => {
                var stateRV = actionResult;
                if (stateRV.success) {
                    resolve('OK');
                } else {
                    reject({
                        message: this.label.ERROR_NOT_RETRIEVED
                    });
                    this.showToast('Error' ,this.label.B2B_Error_Problem_Loading, this.label.Problem_Signature_Structure, true);
                }
            }).catch(error => {
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                } else {
                    this.showToast('Error' ,this.label.B2B_Error_Problem_Loading, this.label.Problem_Signature_Structure, true);
                }
                reject({
                    message: this.label.ERROR_NOT_RETRIEVED
                });
            })            
        });
    }

    //	14/01/2021	Shahad Naji		Update payment with baseAmount and baseCurrency pieces of information
    updatePaymentDetails() {
        return new Promise((resolve, reject) => {

            let clientReference = null;
            let purpose = null;
            let description = null;
            let paymentId =  null;
            let chargeBearer = null;
            let paymentMethod = null;
            let comercialCode = null;
            let baseAmount = null;
            let baseCurrency = null;
            let processDate = null;
            let paymentDraft = {...this.paymentDraft};
            if (paymentDraft) {
                if (paymentDraft.reference) {
                    clientReference = paymentDraft.reference;
                }
                if (paymentDraft.purpose) {
                    purpose = paymentDraft.purpose;
                }
                if (paymentDraft.description) {
                    description = paymentDraft.description;
                }
                if (paymentDraft.comercialCode) {
                    comercialCode = paymentDraft.comercialCode;
                }
                if (paymentDraft.baseAmount) {
                    baseAmount = paymentDraft.baseAmount;
                }
                if (paymentDraft.baseCurrency) {
                    baseCurrency = paymentDraft.baseCurrency;
                }
                if (paymentDraft.paymentId) {
                    paymentId = paymentDraft.paymentId;
                }
                chargeBearer = 'OUR';
                paymentMethod = 'book_to_book';
            }
            paymentDraft.chargeBearer = chargeBearer; // Siempre 'OUR' para Book To Book. Posibles valores 'OUR'-nuestro, 'SHA'-compartido, 'BEN'-recipiente
            paymentDraft.paymentMethod = paymentMethod; // Pendiente de confirmación del valor, es el método seleccionado por el usuario en las tarjetas en este paso
            this.paymentDraft = paymentDraft;

            resolve('OK');
    
        //     updatePaymentInformation({
        //         paymentId: paymentId,
        //         clientReference: clientReference,
        //         purpose: purpose,
        //         description: description,
        //         chargeBearer: chargeBearer,
        //         paymentMethod: paymentMethod,
        //         commercialCode: comercialCode,
        //         baseAmount: baseAmount,
        //         baseCurrency: baseCurrency
        //     }).then(actionResult => {
        //         var stateRV = actionResult;
        //             if (stateRV.success) {
        //                 resolve('OK');
        //             } else {
        //                 reject({
        //                     message: stateRV.msg
        //                 });
        //                 this.showToast('Error',this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Updating_Data,  true);
        //             }
        //     }).catch(error =>{
        //         var errors = error;
        //         if (errors) {
        //             if (errors[0] && errors[0].message) {
        //                 console.log('Error message: ' + errors[0].message);
        //             }
        //         } else {
        //             console.log('problem updating payment details.');
        //         }
        //         reject({
        //             message: this.label.ERROR_NOT_RETRIEVED
        //         });
        //         this.showToast('Error',this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true);
        //     })
        });
    }

    /*
    Author:        	Candido
    Company:        Deloitte
    Description:    Call API to check the FCC Dow Jones
    History:
    <Date>          <Author>            <Description>
    07/08/2020      Candido             Initial version
    */
    checkFCCDowJones() {
        return new Promise((resolve, reject) => {
            var paymentDraft = this.paymentDraft;

            checkFCCDowJones({
                paymentDraft: paymentDraft
            }).then(actionResult => {
                var stateRV = actionResult;
                if (stateRV.success) {
                    if (stateRV.value.passValidation && stateRV.value.passValidation == true) {
                        resolve('OK');
                    } else {
                        reject({
                            FCCError: true,
                            message: stateRV.msg
                        });
                    }
                } else {
                    reject({
                        message: stateRV.msg
                    });
                    this.showToast('Error',this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Updating_Data, true);
                }
            }).catch(error => {
                reject({
                    message: this.label.ERROR_NOT_RETRIEVED
                });
                this.showToast('Error',this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true);
            })
            
        });
    }
        /*
    Author:        	Candido
    Company:        Deloitte
    Description:    Handle when 'checkFCCDowJones' return unsuccessful
    History:
    <Date>          <Author>            <Description>
    07/08/2020      Candido             Initial version
    */
    handleFCCError() {
        var url = 'c__FFCError=true';
        this.encrypt(component, url)
        .then((results) => {
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    pageName: 'landing-payments'
                },
                state: {
                    params: results
                }            
            });
        });
    }

    continuePaymentInformation() {
        return new Promise((resolve, reject) => {
            let focusStep = this.steps.lastModifiedStep;
            let transferType = this.transferType;
            if (focusStep == 3) {
                this.spinner = true;
                this.getLimits().then(() => { 
                    return this.updatePaymentDetails();
                }).then(() => { 
                    return this.checkFCCDowJones();
                }).then(() => { 
                    return this.getPaymentSignatureStructure();
                }).then(() => { 
                    return this.postFraud();
                }).catch((value) => {
                    if (value.FCCError && value.FCCError == true) {
                        this.handleFCCError();
                    }
                    console.log(value.message);
                    reject('KO');
                }).finally(() => {
                    this.spinner = false;
                    resolve('OK');
                });
            } else {
                resolve('OK');
            }
        });
    }
        
        /*
        continuePaymentInformation :function (component, helper) {
        this.spinner', true);
        this.getLimits().then((value) { 
            return this.updatePaymentDetails(component, helper);
        })).then((value) { 
            return this.checkFCCDowJones(component, helper);
        })).then((value) { 
            return this.getPaymentSignatureStructure(component, helper);
        })).then((value) { 
            return this.postFraud();
        })).then((value) {
            return this.completeStep(component, helper);
        })).catch((value) {
            if (value.FCCError) && value.FCCError == true) {
                this.handleFCCError(component, helper);
            }
            console.log(value.message);
        })).finally(() {
            this.spinner', false);
        }));
    },*/
        
    getNavigatorInfo() {
        new Promise((resolve, reject) => {
            let navigatorInfo = this.navigatorInfo;
            navigatorInfo.userAgent = navigator.userAgent;
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(function (position) {
                    navigatorInfo.latitude = position.coords.latitude;
                    navigatorInfo.longitude = position.coords.longitude;
                    console.log(navigatorInfo.latitude);
                    console.log(navigatorInfo.longitude);
                    console.log(navigatorInfo.userAgent);
                    this.navigatorInfo = navigatorInfo;
                    resolve('ok');
                }, function () {
                    this.navigatorInfo = navigatorInfo;
                    resolve('ok');
                });
            } else {
                this.navigatorInfo = navigatorInfo;
                resolve('ok');
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    getLimits() {
        return new Promise((resolve, reject) => {
            let userData  = this.userData;
            let paymentDraft = this.paymentDraft;

            let notificationTitle =  this.label.B2B_Error_Problem_Loading;
            let bodyText =  this.label.B2B_Error_Check_Connection;
            let label = this.label.PAY_Error_Amount_Exceeds_Limits;
            let limitsResult = '';

            getLimits({
                userData: userData,
                paymentDraft: paymentDraft
            }).then(actionResult => {
                let stateRV = actionResult;
                if (stateRV.success) {
                    if (stateRV.value.limitsResult && !stateRV.value.errorMessage) {
                        let paymentDraft = {...this.paymentDraft};
                        if (stateRV.value.baseAmount) {
                            paymentDraft.baseAmount = stateRV.value.baseAmount;
                        }
                        if (stateRV.value.baseCurrency) {
                            paymentDraft.baseCurrency = stateRV.value.baseCurrency;
                        }
                        this.paymentDraft = paymentDraft;
                        resolve('OK');
                    } else {
                        this.showToast('Error',notificationTitle, bodyText, false);
                        reject('KO');
                    }
                    if (limitsResult.toLowerCase().localeCompare('ko') == 0 || stateRV.value.errorMessage) {
                        this.showToast('Warning', notificationTitle, label, true);
                        reject('KO');
                    }
                } else {
                    this.showToast('Error',notificationTitle, bodyText, false);
                    reject(stateRV.msg);

                }
            }).catch(error => {
                this.showToast('Error',notificationTitle, bodyText, false);
                reject('ERROR: Limits');
            })


        });
    }
}