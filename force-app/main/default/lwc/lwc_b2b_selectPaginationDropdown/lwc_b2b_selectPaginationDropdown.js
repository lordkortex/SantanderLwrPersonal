import {LightningElement,api} from 'lwc';

export default class lwc_b2b_numberPagination extends LightningElement{

    @api paginationselection //Selected items per page
    @api item //Number currently displayed

    handleSelectPagination(event) {
        var pagination =this.item;
        this.paginationselection = pagination;

        const dropdownValueEvent = new CustomEvent('dropdownvalue',{
            detail : {pagination : pagination}
        })
        this.dispatchEvent(dropdownValueEvent);
    }

    get selectionClass(){
        return this.item == this.paginationselection ? 'slds-dropdown__item slds-is-selected' : 'slds-dropdown__item';
    }
}