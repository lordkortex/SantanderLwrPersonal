import { LightningElement, api} from 'lwc';

export default class cmpCnScopeNotificationLwc extends LightningElement {
    @api notificationClass;
    @api notificationIcon;
    @api title;
    @api notificationTitle;
    @api notificationBody;



    get notificationC(){
        return 'slds-scoped-notification slds-media slds-media_center ' + this.notificationClass;

    }

    get  notificationI(){
        return 'slds-icon_container slds-icon-utility-error slds-no-flex slds-align-top button-selected '+this.notificationIcon;

    }

    
   
}