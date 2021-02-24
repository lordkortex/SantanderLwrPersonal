import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

// Import apex methods
import encryptData from '@salesforce/apex/Global_Utilities.encryptData';
import decryptData from '@salesforce/apex/Global_Utilities.decryptData';
import getUserNumberFormat from '@salesforce/apex/Global_Utilities.getUserNumberFormat';
import getAccountData from '@salesforce/apex/Global_Utilities.getAccountData';
import getUserData from '@salesforce/apex/Global_Utilities.getUserData';
import getUserDateFormat from '@salesforce/apex/Global_Utilities.getUserDateFormat';
import getExchangeRates from '@salesforce/apex/Global_Utilities.getExchangeRates';
import getExchangeRatesWithExtraInfo from '@salesforce/apex/Global_Utilities.getExchangeRatesWithExtraInfo';
import getPersonalSettings from '@salesforce/apex/Global_Utilities.getPersonalSettings';
import getCurrentUserTimezoneOffSetInMiliseconds from '@salesforce/apex/Global_Utilities.getCurrentUserTimezoneOffSetInMiliseconds';
import getFilteredData from '@salesforce/apex/CNT_SwiftPaymentTable.getFilteredData';
import isOneTrade from '@salesforce/apex/CNT_GlobalPositionController.isOneTrade';
import retrieveIAMData from '@salesforce/apex/CNT_GlobalPositionController.retrieveIAMData';
import callMulesoft from '@salesforce/apex/CNT_International_Treasury_Management.callMulesoft';
import getUserInfo from '@salesforce/apex/CNT_International_Treasury_Management.getUserInfo';
import orderByCountry from '@salesforce/apex/CNT_International_Treasury_Management.orderByCountry';
import orderByCurrency from '@salesforce/apex/CNT_International_Treasury_Management.orderByCurrency';
import orderBySubsidiary from '@salesforce/apex/CNT_International_Treasury_Management.orderBySubsidiary';


// Import current user info
import uId from '@salesforce/user/Id';

// Import custom labels
import refreshBalanceCollout from '@salesforce/label/c.refreshBalanceCollout';

export default class Lwc_serviceComponent extends NavigationMixin(LightningElement) {
	@api onCallApex(data) {
		console.log('onCallApex');
		var callercomponent = data.callercomponent;
        var controllermethod = data.controllermethod;
        var actionparameters = data.actionparameters;
		this.callApex(callercomponent,controllermethod, actionparameters);
	}
	@api redirect(data) {
		console.log('redirect');
		var page = data.page;
        var urlParams = data.urlParams;
		this.handleRedirection(page, urlParams);
	}
	@api apexDataDecryption(data) {
		console.log('dataDecryption');
		var callercomponent = data.callercomponent;
		var callerhelper = data.callerhelper;
		var datauri = data.datauri;
		var controllermethod = data.controllermethod;
		this.handleDecrypt(callercomponent, callerhelper, datauri, controllermethod);
	}
	@api saveToCache() {
		console.log('saveToCache');     
		let key = data.key;
		let data = data.data;
		this.handleSaveToCache(key, data)
    }
    @api retrieveFromCache() {
		console.log('retrieveFromCache');
		let key = data.key;
		let callercomponent = data.callercomponent;
		this.handleRetrieveFromCache(callercomponent, key);
	}
	callApex(callercomponent, controllerMethod, actionParameters) {
        // create a one-time use instance of the serverEcho action
		// in the server-side controller
		if (controllerMethod === 'encryptData') {
			encryptData(actionParameters)
            .then(result => {
				console.log('OK');
				const successcallback = new CustomEvent('successcallback', {
					detail: { callercomponent : callercomponent,  value : result},
				});
				// Fire the custom event
				this.dispatchEvent(successcallback);
            })
            .catch(error => {
				console.log('KO '+error);
            });
		}
		else if (controllerMethod === 'decryptData') {
			decryptData(actionParameters)
            .then(result => {
				console.log('OK');
				const successcallback = new CustomEvent('successcallback', {
					detail: { callercomponent : callercomponent,  value : result},
				});
				// Fire the custom event
				this.dispatchEvent(successcallback);
            })
            .catch(error => {
				console.log('KO '+error);
            });
		}
		else if (controllerMethod === 'getUserNumberFormat') {
			getUserNumberFormat(actionParameters)
            .then(result => {
				console.log('OK');
				const successcallback = new CustomEvent('successcallback', {
					detail: { callercomponent : callercomponent,  value : result},
				});
				// Fire the custom event
				this.dispatchEvent(successcallback);
            })
            .catch(error => {
				console.log('KO '+error);
            });
		}
		else if (controllerMethod === 'getAccountData') {
			getAccountData(actionParameters)
            .then(result => {
				console.log('OK');
				const successcallback = new CustomEvent('successcallback', {
					detail: { callercomponent : callercomponent,  value : result},
				});
				// Fire the custom event
				this.dispatchEvent(successcallback);
            })
            .catch(error => {
				console.log('KO '+error);
            });
		}
		else if (controllerMethod === 'getUserData') {
			getUserData(actionParameters)
            .then(result => {
				console.log('OK');
				const successcallback = new CustomEvent('successcallback', {
					detail: { callercomponent : callercomponent,  value : result},
				});
				// Fire the custom event
				this.dispatchEvent(successcallback);
            })
            .catch(error => {
				console.log('KO '+error);
            });
		}
		else if (controllerMethod === 'getUserDateFormat') {
			getUserDateFormat(actionParameters)
            .then(result => {
				console.log('OK');
				const successcallback = new CustomEvent('successcallback', {
					detail: { callercomponent : callercomponent,  value : result},
				});
				// Fire the custom event
				this.dispatchEvent(successcallback);
            })
            .catch(error => {
				console.log('KO '+error);
            });
		}
		else if (controllerMethod === 'getExchangeRates') {
			getExchangeRates(actionParameters)
            .then(result => {
				console.log('OK');
				const successcallback = new CustomEvent('successcallback', {
					detail: { callercomponent : callercomponent,  value : result},
				});
				// Fire the custom event
				this.dispatchEvent(successcallback);
            })
            .catch(error => {
				console.log('KO '+error);
            });
		}
		else if (controllerMethod === 'getExchangeRatesWithExtraInfo') {
			getExchangeRatesWithExtraInfo(actionParameters)
            .then(result => {
				console.log('OK');
				const successcallback = new CustomEvent('successcallback', {
					detail: { callercomponent : callercomponent,  value : result},
				});
				// Fire the custom event
				this.dispatchEvent(successcallback);
            })
            .catch(error => {
				console.log('KO '+error);
            });
		}
		else if (controllerMethod === 'getPersonalSettings') {
			getPersonalSettings(actionParameters)
            .then(result => {
				console.log('OK');
				const successcallback = new CustomEvent('successcallback', {
					detail: { callercomponent : callercomponent,  value : result},
				});
				// Fire the custom event
				this.dispatchEvent(successcallback);
            })
            .catch(error => {
				console.log('KO '+error);
            });
		}
		else if (controllerMethod === 'getCurrentUserTimezoneOffSetInMiliseconds') {
			getCurrentUserTimezoneOffSetInMiliseconds(actionParameters)
            .then(result => {
				console.log('OK');
				const successcallback = new CustomEvent('successcallback', {
					detail: { callercomponent : callercomponent,  value : result},
				});
				// Fire the custom event
				this.dispatchEvent(successcallback);
            })
            .catch(error => {
				console.log('KO '+error);
            });
		}
		else if (controllerMethod === 'getFilteredData') {
			getFilteredData(actionParameters)
            .then(result => {
				console.log('OK');
				const successcallback = new CustomEvent('successcallback', {
					detail: { callercomponent : callercomponent,  value : result},
				});
				// Fire the custom event
				this.dispatchEvent(successcallback);
            })
            .catch(error => {
				console.log('KO '+error);
            });
		}
		else if (controllerMethod === 'isOneTrade'){
			isOneTrade(actionParameters)
            .then(result => {
				console.log('OK');
				const successcallback = new CustomEvent('successcallback', {
					detail: { callercomponent : callercomponent,  value : result},
				});
				// Fire the custom event
				this.dispatchEvent(successcallback);
            })
            .catch(error => {
				console.log('KO '+error);
            });
		}
		else if (controllerMethod === 'retrieveIAMData'){
			retrieveIAMData(actionParameters)
            .then(result => {
				console.log('OK');
				const successcallback = new CustomEvent('successcallback', {
					detail: { callercomponent : callercomponent,  value : result},
				});
				// Fire the custom event
				this.dispatchEvent(successcallback);
            })
            .catch(error => {
				console.log('KO '+ JSON.stringify(error));
            });
		}
		else if (controllerMethod === 'callMulesoft'){
			callMulesoft(actionParameters)
            .then(result => {
				console.log('OK');
				const successcallback = new CustomEvent('successcallback', {
					detail: { callercomponent : callercomponent,  value : result},
				});
				// Fire the custom event
				this.dispatchEvent(successcallback);
            })
            .catch(error => {
				console.log('KO '+ JSON.stringify(error));
            });
		}
		else if (controllerMethod === 'getUserInfo'){
			getUserInfo(actionParameters)
            .then(result => {
				console.log('OK');
				const successcallback = new CustomEvent('successcallback', {
					detail: { callercomponent : callercomponent,  value : result},
				});
				// Fire the custom event
				this.dispatchEvent(successcallback);
            })
            .catch(error => {
				console.log('KO '+ JSON.stringify(error));
            });
		}
		else if (controllerMethod === 'orderByCountry'){
			orderByCountry(actionParameters)
            .then(result => {
				console.log('OK');
				const successcallback = new CustomEvent('successcallback', {
					detail: { callercomponent : callercomponent,  value : result},
				});
				// Fire the custom event
				this.dispatchEvent(successcallback);
            })
            .catch(error => {
				console.log('KO '+ JSON.stringify(error));
            });
		}
		else if (controllerMethod === 'orderByCurrency'){
			orderByCurrency(actionParameters)
            .then(result => {
				console.log('OK');
				const successcallback = new CustomEvent('successcallback', {
					detail: { callercomponent : callercomponent,  value : result},
				});
				// Fire the custom event
				this.dispatchEvent(successcallback);
            })
            .catch(error => {
				console.log('KO '+ JSON.stringify(error));
            });
		}
		else if (controllerMethod === 'orderBySubsidiary'){
			orderBySubsidiary(actionParameters)
            .then(result => {
				console.log('OK');
				const successcallback = new CustomEvent('successcallback', {
					detail: { callercomponent : callercomponent,  value : result},
				});
				// Fire the custom event
				this.dispatchEvent(successcallback);
            })
            .catch(error => {
				console.log('KO '+ JSON.stringify(error));
            });
		}
	}
	handleRedirection(page, url) {
		//var results = this.encrypt(url);
		this.encrypt(page,url);
		//this[NavigationMixin.Navigate]({type: "comm__namedPage", attributes: {pageName: page}, state: {params : results},});
	}

	encrypt(page,url) {  
		var result='';
        try{
            encryptData({
                str : url
            })
            .then((value) => {
                result = value;
                this[NavigationMixin.Navigate]({
                    type: "comm__namedPage", 
                    attributes: {
                        pageName: page
                    }, 
                    state: {
                        params : result
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            });
        } catch (e) { 
            console.log(e);
        }  
    }

	decrypt (data){
        var result = ''
        decryptData({str : data})
			.then((value) => {
				result = value;
				})
			.catch((error) => {
				console.log(error); // TestError
			});
		return result;
    }
	handleDecrypt (callercomponent, datauri) {
        var sURLVariablesMain = datauri.split('&')[0].split("="); 
        if (sURLVariablesMain[0] == 'params') {
            var result = decrypt(component,sURLVariablesMain[1]);
			const successcallback = new CustomEvent('successcallback', {
				detail: { callercomponent : callercomponent,  value : result},
			});
			// Fire the custom event
			this.dispatchEvent(successcallback);
        }
	}
	handleSaveToCache (key, data) {
        var userId = uId;
		var result="null";
		encryptData({str : data})
		.then((value) => {
			result = value;
			if(result!='null' && result!=undefined && result!=null){
				window.localStorage.setItem(userId + '_' + key, result);
				window.localStorage.setItem(userId + '_' + key + '_timestamp', new Date());
				if(key == "balanceEODGP"){
					window.localStorage.setItem(userId + '_balanceEODTimestampGP', new Date());
				}
				return {key : data};
			}
			})
		.catch((error) => {
			console.log(error); // TestError
		});
	}
	handleRetrieveFromCache (callercomponent, key) {
		var result="null";
		var userId = uId;
		let data = window.localStorage.getItem(userId + '_' + key);
		let timestamp = window.localStorage.getItem(userId + '_' + key + '_timestamp');
		if(key == "balanceEODGP"){
			timestamp = window.localStorage.getItem(userId + '_balanceEODTimestampGP');
		}
		let isFreshData = timestamp != 'null' && timestamp != undefined && ((new Date() - new Date(Date.parse(timestamp))) < parseInt(refreshBalanceCollout)*60000); 
		if(data != undefined && data != "undefined" && isFreshData){
			decryptData({str : data})
			.then((value) => {
				result = value;
				if(result!=null && result !=undefined && result!='null'){
					const successcallback = new CustomEvent('successcallback', {
						detail: { callercomponent : callercomponent,  value : result},
					});
					// Fire the custom event
					this.dispatchEvent(successcallback);
				} else {
					const successcallback = new CustomEvent('successcallback', {
						detail: { callercomponent : callercomponent,  value : 'RESPONSE ERROR'},
					});
					// Fire the custom event
					this.dispatchEvent(successcallback);
				}
				})
			.catch((error) => {
				console.log(error); // TestError
			});
		}
		
    }
}