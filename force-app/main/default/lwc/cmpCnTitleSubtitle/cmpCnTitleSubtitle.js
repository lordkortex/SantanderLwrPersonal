import { api, LightningElement } from 'lwc';

import { loadStyle } from 'lightning/platformResourceLoader';

import ICONS_OBJ from '@salesforce/resourceUrl/Santander_Icons';

export default class cmpCnTitleSubtitle extends LightningElement {

    @api title = "";
    @api subtitle = "";
    @api fireNavigationEvent = false;

    connectedCallback(){
        Promise.all([
            loadStyle(this, ICONS_OBJ + '/style.css')
        ])
        .then(() => {
            console.log('Files loaded.');
        })
        .catch(error => {
            alert(error);
        });
    }

    goBack(){
        console.log("Event", this.fireNavigationEvent);

        if(this.fireNavigationEvent == "true"){
            console.log("DENTRO");
            this.dispatchEvent(new CustomEvent('previous'));
        }else {
            window.history.back();
        }
            
    }
}