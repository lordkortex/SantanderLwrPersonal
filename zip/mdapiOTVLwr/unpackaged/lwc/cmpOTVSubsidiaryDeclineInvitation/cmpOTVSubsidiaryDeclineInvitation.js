import { LightningElement, api } from 'lwc';

import { loadStyle }            from 'lightning/platformResourceLoader';
import Santander_Icons          from '@salesforce/resourceUrl/Santander_Icons';
import images                   from '@salesforce/resourceUrl/Images';
import { NavigationMixin }      from 'lightning/navigation';
import declineOTVInvitation     from '@salesforce/apex/CNT_OTV_ServiceDeclination.declineOTVInvitation';

//Import labels
import back                                     from '@salesforce/label/c.back';
import DeclineInvitation                        from '@salesforce/label/c.DeclineInvitation';
import progress                                 from '@salesforce/label/c.Progress';
import cmpOTVSubsidiaryDeclineInvitation_1      from '@salesforce/label/c.cmpOTVSubsidiaryDeclineInvitation_1';
import cmpOTVSubsidiaryDeclineInvitation_2      from '@salesforce/label/c.cmpOTVSubsidiaryDeclineInvitation_2';
import cmpOTVSubsidiaryDeclineInvitation_3      from '@salesforce/label/c.cmpOTVSubsidiaryDeclineInvitation_3';
import cmpOTVSubsidiaryDeclineInvitation_4      from '@salesforce/label/c.cmpOTVSubsidiaryDeclineInvitation_4';
import cmpOTVTalkWithAnExpert_14                from '@salesforce/label/c.cmpOTVTalkWithAnExpert_14';
import declineSubsdReason1                      from '@salesforce/label/c.declineSubsdReason1';
import declineSubsdReason2                      from '@salesforce/label/c.declineSubsdReason2';
import declineSubsdReason3                      from '@salesforce/label/c.declineSubsdReason3';
import cmpOTVCancelService_18                   from '@salesforce/label/c.cmpOTVCancelService_18';

export default class Cmp_OTVSubsidiaryDeclineInvitation extends NavigationMixin(LightningElement)  {

    label = {
        back,
        DeclineInvitation,
        progress,
        cmpOTVSubsidiaryDeclineInvitation_1,
        cmpOTVSubsidiaryDeclineInvitation_2,
        cmpOTVSubsidiaryDeclineInvitation_3,
        cmpOTVSubsidiaryDeclineInvitation_4,
        cmpOTVTalkWithAnExpert_14
    }

    dropdownReason = [
        {label : declineSubsdReason1, value : declineSubsdReason1},
        {label : declineSubsdReason2, value : declineSubsdReason2},
        {label : declineSubsdReason3, value : declineSubsdReason3},
        {label : cmpOTVCancelService_18, value : cmpOTVCancelService_18}
    ];

    talkWithAnExpert = images + '/illustration-talk-with-an-expert@3x.png';
    logo_symbol_red = images + '/logo_symbol_red.svg';
    reason = '';
    details = '';
    showDeclineModal = false;

    renderedCallback() {
        console.log('entra decline invitation');
        Promise.all([
            loadStyle(this, Santander_Icons + '/style.css'),
        ])
    } 

    goBack(){
        try {
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    name: "Home"
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    sendDecline(event){
        if(event.detail.cancelAccess){
            declineOTVInvitation({reason : this.reason, details : this.details, status : 'Cancelled'}).then((results)=>{this.goBack()});
        }else{
            this.showDeclineModal = false;
        }
    }

    changeReason(event){
        this.reason = event.detail.selectedValue;
        console.log(this.reason);
    }

    changeDetails(event){
        this.details = event.detail.text;
        console.log(this.details);
    }

    openModal(){
        this.showDeclineModal = true;
    }


}