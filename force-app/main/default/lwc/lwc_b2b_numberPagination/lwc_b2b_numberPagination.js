import {LightningElement,api,track} from 'lwc';


export default class lwc_b2b_numberPagination extends LightningElement{

    @api number = ''; //Page number displayed
    @api track = ''; //Number of the currently displayed page

	handleSelectPage(event) {
		var pagination = this.number;
		this.currentPage = pagination;
    }

    get classPagination(){
        return this.currentPage == this.number ? 'active' : '';
    }

}