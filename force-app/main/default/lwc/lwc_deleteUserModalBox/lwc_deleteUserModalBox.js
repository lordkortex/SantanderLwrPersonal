import { LightningElement, track, api } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

import Users_DeletionTitle from '@salesforce/label/c.Users_DeletionTitle';
import Users_DeletionConfirmation from '@salesforce/label/c.Users_DeletionConfirmation';
import close_Label from '@salesforce/label/c.close';
import No from '@salesforce/label/c.No';
import Yes from '@salesforce/label/c.Yes';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
export default class Lwc_deleteUserModalBoxController extends LightningElement {

    Label = {
        Users_DeletionConfirmation,
        Users_DeletionTitle,
        close_Label,
        No,
        Yes
    }
    
    @api isshowing;
    @api titletext = this.Label.Users_DeletionTitle;
    @api firsttext;
    @api secondtext = this.Label.Users_DeletionConfirmation;
    @track userClicked;

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }
    
    
    buttonClicked(event) {
        this.isShowing = false;
        var idButton = event.detail.currentTarget.id;

        if(idButton == "buttonYes"){
            const curExEvent = new CustomEvent("deleteuserevent",{
                isDeleting : true
            });
            this.dispatchEvent(curExEvent);
    }
    else{
        const curExEvent = new CustomEvent("deleteuserevent",{
            isDeleting : false
        });
        this.dispatchEvent(curExEvent);
    }
    
    }   
}