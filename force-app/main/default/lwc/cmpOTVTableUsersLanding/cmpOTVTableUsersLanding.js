import { LightningElement,api,track} from 'lwc';



import { loadStyle } from 'lightning/platformResourceLoader';
import Santander_Icons from '@salesforce/resourceUrl/Santander_Icons';
import Images from '@salesforce/resourceUrl/Images';

import calloutGetUsersAccounts  from '@salesforce/apex/CNT_OTV_UsersLanding.calloutGetUserAccounts';
import getLstCountriesUser      from '@salesforce/apex/CNT_OTV_UsersLanding.getLstCountriesUser';
import getLstSubsidiaries       from '@salesforce/apex/CNT_OTV_UsersLanding.calloutGetAccountSubsidiaries';

// importing Custom Label
import cmpOTVTableUsersLanding_1 from '@salesforce/label/c.cmpOTVTableUsersLanding_1';
import cmpOTVTableUsersLanding_2 from '@salesforce/label/c.cmpOTVTableUsersLanding_2';
import cmpOTVTableUsersLanding_3 from '@salesforce/label/c.cmpOTVTableUsersLanding_3';
import cmpOTVTableUsersLanding_4 from '@salesforce/label/c.cmpOTVTableUsersLanding_4';
import cmpOTVTableUsersLanding_5 from '@salesforce/label/c.cmpOTVTableUsersLanding_5';
import cmpOTVTableUsersLanding_6 from '@salesforce/label/c.cmpOTVTableUsersLanding_6';
import cmpOTVTableUsersLanding_7 from '@salesforce/label/c.cmpOTVTableUsersLanding_7';

export default class CmpOTVTableUsersLanding extends LightningElement {
    selectedUser;

    label = {
        cmpOTVTableUsersLanding_1,
        cmpOTVTableUsersLanding_2,
        cmpOTVTableUsersLanding_3,
        cmpOTVTableUsersLanding_4,
        cmpOTVTableUsersLanding_5,
        cmpOTVTableUsersLanding_6,
        cmpOTVTableUsersLanding_7
    }
     
     
    // Expose URL of assets included inside an archive file
    
    @api lstusers;
    @api items;
    @api isbackfront = false;
    @api isClicked = false;
    @api showtoast = false;
    @api filters;
    @track showtoastError = false;
    @track showtoast = false;
    @track msgtoast;
    @track typetoast;
    @track tobehiddentoast;
    colors = ['blue', 'green', 'pink','lightpink', 'cream', 'gray'];
    image = Images + '/03-with-image@3x.jpg';
    user;
    lstAccounts ={};
    lstCountriesAux ={};
    lstCountries ={};
    lstSubsidiaries ={};
    loading = false;
    

    connectedCallback(){
        Promise.all([
            loadStyle(this, Santander_Icons + '/style.css'),
        ]);
    }

    get tabClass() {
        return 'image ' +  this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    handleUserClick(event){
        this.loading = true;
        const selectedUserGlobalId = event.currentTarget.dataset.whichrow;
        console.log('value GlobalId: ' + selectedUserGlobalId);

        this.selectedUser = this.lstusers.find(
            (user) => user.globalId === selectedUserGlobalId
        );
        
        if(this.selectedUser != null){
            calloutGetUsersAccounts({ companyId : '1588401980',
                                      userId : '5431ac57-96e3-4d45-8a4c-2c92aea767b9'
            }).then(result => {
                this.lstAccounts = result;

                for(var i=0; i<this.lstAccounts.length; i++){
                    this.lstCountriesAux[i] =this.lstAccounts[i].country;
                }
                this.lstCountries = this.lstCountriesAux;
                this.loading = false;
            }).finally(() =>{
                getLstCountriesUser({ jsonCountries : JSON.stringify(this.lstCountries)}).then(result => {
                    console.log('getLstCountriesUser');
                    console.log(result);
                    this.lstCountries = result;
                }).catch(error => {
                    console.log(error);
                });
                getLstSubsidiaries({ lstAccounts : JSON.stringify(this.lstAccounts)}).then(result => {
                    console.log('getLstSubsidiaries');
                    console.log(result);
                    this.lstSubsidiaries = result;
                }).catch(error => {
                    console.log(error);
                });
            }).finally(() =>{
                this.isClicked = true;
            }).catch(error => {
                console.log(error);
            });
        }
    }

    closeuserinfo(event){
        this.isClicked = event.detail.isClicked;
        console.log('toast: ' + event.detail.showtoast);
        console.log('toastError: ' + event.detail.showtoastError);
        this.showtoast = event.detail.showtoast;
        this.showtoastError = event.detail.showtoastError,
        this.loading = event.detail.loading;
        this.msgtoast = event.detail.msgtoast;
        this.typetoast = event.detail.typetoast;
        this.tobehiddentoast = event.detail.tobehiddentoast;
        const saveUserInfoParent = new CustomEvent('saveuserinfo', {detail: {showtoast : this.showtoast,
                                                                             showtoastError : this.showtoastError,
                                                                             msgtoast  : this.msgtoast,
                                                                             typetoast : this.typetoast,
                                                                             tobehiddentoast : this.tobehiddentoast}});
        this.dispatchEvent(saveUserInfoParent);
    }

    get isOneTrade(){
        if(this.isClicked && !this.isbackfront  && !this.loading){
            return true;
        } else {
            return false;
        }
    }

    get isBackfront(){
        if(this.isClicked && this.isbackfront && !this.loading) {
            return true;
        } else {
            return false;
        }
    }

}