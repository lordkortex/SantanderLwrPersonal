import {LightningElement,api} from 'lwc';

export default class lwc_b2b_numberPagination extends LightningElement{

    @api paginationselection //Selected items per page
    @api item //Number currently displayed

    handleSelectPagination(event) {
        var pagination =this.item;
        this.paginationSelection = pagination;
    }

    get selectionClass(){
        return this.item == this.paginationSelection ? 'slds-dropdown__item slds-is-selected' : 'slds-dropdown__item';
    }
}