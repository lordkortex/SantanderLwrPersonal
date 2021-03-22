import {LightningElement,api} from 'lwc';


export default class lwc_b2b_numberPagination extends LightningElement{

    @api number = ''; //Page number displayed
    @api currentpage;

	handleSelectPage() {
		var pagination = this.number;
        this.currentpage = pagination;
        const handleselectpage = new CustomEvent('handleselectpage',{
            detail : {
                currentpage: this.currentpage
            }
        })
        this.dispatchEvent(handleselectpage);
    }

    get classPagination(){
        return this.currentpage == this.number ? 'active' : '';
    }

}