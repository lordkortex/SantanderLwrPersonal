import { LightningElement, api, track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import uId from '@salesforce/user/Id';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

export default class Lwc_globalExchangeRatesSingle extends LightningElement {
	@api selectedcurrency;
    @api exchangerates;
    @api start;
    @api end;
	@api userpreferrednumberformat;
	
	@track exchangeratesshow;

	connectedCallback(){
		loadStyle(this, santanderStyle + '/style.css');
		this.exchangeratesshow = this.exchangerates;
		if(this.exchangeratesshow != undefined && this.exchangeratesshow != []){
			for(var i in this.exchangeratesshow){
				console.log(this.exchangeratesshow[i].value);
				let str = this.exchangeratesshow[i].value.toString();
				if(str.includes(".")){
					let res = str.split(".");
					if(res.length == 2){
						if(res[1].length < 8){
							//this.exchangeratesshow[i].value = this.exchangeratesshow[i].value.toFixed(8);
						}
					}
					
				}
				if(str == "1"){
					var userId = uId;
					window.localStorage.setItem(userId + "_actualCurrencyChange",  this.exchangeratesshow[i].divisa);
				}
			}
			//component.find('sigleRate').formatNumber();
		}
	}
	@api
	updateExchageRates(e){
		this.exchangeratesshow = e._exchangerates;
		if(this.template.querySelector("c-lwc_child-global-exchange-rates-single") != undefined && this.template.querySelector("c-lwc_child-global-exchange-rates-single") != null) {
			this.template.querySelectorAll('c-lwc_child-global-exchange-rates-single').forEach(element => {
				element.formatNumber();
			});
        }
	}

	get exchangeratesshowjson(){
		return JSON.stringify(this.exchangeratesshow );
	}
}