import { LightningElement, api } from 'lwc';
import { getTypeCss } from './cmpPayToastHelper.js';

export default class CmpPayToast extends LightningElement {
    _show = false;
    _type = null;
    _title = null;
    _body = null;
    _action = null;

    @api
    open (type, title, body, action) {
        this._show = true;
        if (type) {
            this._type = type;
        }
        if (title) {
            this._title = title;
        }
        if (body) {
            this._body = body;
        }
        if (action) {
            this._action = action;
        } else {
            this._action = {
                show: false,
                text: null,
                id: null
            }
        }
    }

    clickAction (event) {
        let id = (action.id ? action.id : null);
        let actionEvent = new CustomEvent('action', {
            detail: id
        });
        this.dispatchEvent(actionEvent);
        this._show = false;
    }

    clickClose (event) {
        this._show = false;
    }

    get classActionButton () {
        return `slds-button slds-button_icon icon-${this._action.type}`;
    }

    get classBody () {
        return `slds-notify slds-notify_toast ${(this._action.show ? 'action' : '')} slds-scrollable_y slds-theme_${getTypeCss(this._type)}`;
    }

    get classIcon () {
        return `slds-icon_container slds-m-right_small slds-no-flex slds-align-top button-selected slds-icon-utility-${getTypeCss(this._type)}`;
    }
}