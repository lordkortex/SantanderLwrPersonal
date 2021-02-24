import { LightningElement, wire, track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import { NavigationMixin } from 'lightning/navigation';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

// Import custom labels
import hi from '@salesforce/label/c.hi';
import theseAreYourInternationalPayments from '@salesforce/label/c.theseAreYourInternationalPayments';
import TrackByUETR from '@salesforce/label/c.TrackByUETR';

// Import apex methods
import encryptData from '@salesforce/apex/CNT_IPTTitle.encryptData';

// Import current user info
import USER_ID from '@salesforce/user/Id';
import { getRecord } from 'lightning/uiRecordApi';

export default class Lwc_iptTitle extends NavigationMixin(LightningElement) {

    @track objuser = {};
    
    // Expose the labels to use in the template.
    label = {
        hi,
        theseAreYourInternationalPayments,
        TrackByUETR
    };

    @wire(getRecord, {recordId: USER_ID, fields: ['User.FirstName']})
    userData({error, data}) {
        if(data) {
            window.console.log('data => '+JSON.stringify(data));
            let objCurrentData = data.fields;

            this.objuser = {
                firstname : objCurrentData.FirstName.value,
            }
        } 
        else if(error) {
            window.console.log('error => '+JSON.stringify(error))
        } 
    }

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
    }

    openPaymentUETRTrack (){
        try{
            var page = "payment-uetr-track";
            var url = "c__comesFromTracker=true";
            this.encrypt(url)
                .then((result) => {
                    console.log('openPaymentUETRTrack result: ',result);
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
 
        } catch (e) {
            console.log(e);
        }
    }

    encrypt (data){
        try{
            var result="null";
            return new Promise(function (resolve, reject) {
                encryptData({str : data})
                .then((value) => {
                    result = value;
                    resolve(result);
                 })
                 .catch((error) => {
                    console.log(error); // TestError
                    reject(error);
                 })
            });
        } catch (e) { 
            console.log(e);
        }   
    }
}