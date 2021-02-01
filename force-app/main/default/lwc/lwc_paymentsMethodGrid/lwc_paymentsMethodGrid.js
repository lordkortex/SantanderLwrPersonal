import { LightningElement, api, track } from 'lwc';
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
//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
//Controlador
import encryptData from '@salesforce/apex/CNT_PaymentsMethod.encryptData';
//Navegación
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
        IncorrectInputFormat
    };

    @api countrydropdownlist = [];                  //List of values to populate the dropdown
    @api showtoast;                                 //Indicates if the toast is shown.
    selectedCountry = '';                           //Selected option from the dropdown
    helpTextDropdown = 'Show More';                 //Dropdown help text
    bookToBookPage = 'payments-b2b';
    singlePage = 'payments-single';
    

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
    }

    goToBooktoBook () {
        var url ="";
        // let navService = component.find("navService");

        if(url!=''){
        //     //helper.encrypt(component, url).then(function(results){
            page = this.bookToBookPage;
            try{
                this.encrypt(page,url);
            } catch (e) {
                console.log(e);
            }
        //         let pageReference = {
        //             type: "comm__namedPage", 
        //                 attributes: {
        //                         //pageName: component.get("v.bookToBookPage")
        //                         pageName: this.bookToBookPage
        //                     },
        //                     state: {
        //                             params : results
        //                     }
        //             }
        //             navService.navigate(pageReference); 
        //     });
        }else{
        //     let pageReference = {
        //         type: "comm__namedPage", 
        //         attributes: {
        //                 //pageName: component.get("v.bookToBookPage")
        //                 pageName: this.bookToBookPage
        //         },
        //         state: {
        //                 params : ''
        //         }
        //     }
        //     navService.navigate(pageReference); 
            this[NavigationMixin.Navigate]({
                type: "comm__namedPage", 
                attributes: {
                    pageName: page
                }, 
                state: {
                    params : ''
                }
            });
        }
    }

    goToSingle () {
        //component.set('v.showToast', true);
        this.showtoast = true;
    }

    goToMultiple () {
        //component.set('v.showToast', true);
        this.showtoast = true;
    }

    encrypt (page, urlAddress){  
    //     var result="null";
    //     //var action = component.get("c.encryptData");
    //     //action.setParams({ str : data });
    //     encryptData({str : data})
    //     // Create a callback that is executed after 
    //     // the server-side action returns
    //     .then(value =>{
    //         result = value;
    //     }).catch((error) => {
    //         console.log(error);
    //     });

    //     return new Promise(function (resolve, reject) {
    //             action.setCallback(this, function(response) {
    //             var state = response.getState();
    //             if (state === "ERROR") {
    //                     var errors = response.getError();
    //                     if (errors) {
    //                     if (errors[0] && errors[0].message) {
    //                             console.log("Error message: " + 
    //                                     errors[0].message);
    //                             reject(response.getError()[0]);
    //                     }
    //                     } else {
    //                     console.log("Unknown error");
    //                     }
    //             }else if (state === "SUCCESS") {
    //                     result = response.getReturnValue();
    //             }
    //                     resolve(result);
    //             });
    //             $A.enqueueAction(action);
    //     });
        var result='';
        try{
            encryptData({
                str : urlAddress
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
}