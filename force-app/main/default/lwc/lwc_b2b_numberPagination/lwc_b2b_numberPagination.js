import {LightningElement,api,track} from 'lwc';


export default class lwc_b2b_numberPagination extends LightningElement{

    @api number = ''; //Page number displayed
    @api track = ''; //Number of the currently displayed page
    @api currentpage;

	handleSelectPage(event) {
		var pagination = this.number;
		this.currentpage = pagination;
    }

    get classPagination(){
        return this.currentpage == this.number ? 'active' : '';
    }

}