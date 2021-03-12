import {LightningElement, track, api } from 'lwc';
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import {loadStyle, loadScript } from 'lightning/platformResourceLoader';
import filterBy from '@salesforce/label/c.filterBy';
import toAmountLowerThanFrom from '@salesforce/label/c.toAmountLowerThanFrom';
import amountLowerThanZero from '@salesforce/label/c.amountLowerThanZero';
import to from '@salesforce/label/c.to';
import clearAll from '@salesforce/label/c.clearAll';
import amount from '@salesforce/label/c.amount';
import apply from '@salesforce/label/c.apply';
import advancedFilters from '@salesforce/label/c.advancedFilters';
import T_Print from '@salesforce/label/c.T_Print';
import T_Download from '@salesforce/label/c.T_Download';
import Show_More from '@salesforce/label/c.Show_More';
import from from '@salesforce/label/c.from';
import validationDate from '@salesforce/label/c.validationDate';
import selectOne from '@salesforce/label/c.selectOne';
import Max from '@salesforce/label/c.Max';
import Min from '@salesforce/label/c.Min';
import bookDate from '@salesforce/label/c.bookDate';
import TimePeriod from '@salesforce/label/c.TimePeriod';
import Category from '@salesforce/label/c.Category';

//import encryptData from '@salesforce/apex/Global_Utilities.encryptData';
export default class Lwc_cn_filters extends LightningElement {

    label = {
        filterBy,
        toAmountLowerThanFrom,
        amountLowerThanZero,
        to,
        clearAll,
        apply,
        advancedFilters,
        T_Print,
        T_Download,
        from,
        advancedFilters,
        amount,
        validationDate,
        selectOne,
        Max,
        Min,
        bookDate,
        Show_More,
        TimePeriod,
        Category
    }; 


    @api filters;
    @api showadvancedfilters;
    @api showmodal;
    @api numberactivefilters;
    @api currentage;
    @api displayprinticon;
    @api displaydownloadicon;
    @api convertdatestousertimezone;
    @api currentpage;
    @api dates;
    @api dropdownvalues;
    @api dropdownselectedvalue;
    @api dropdownheader = this.label.TimePeriod;
    @api fromdate;
    @api todate;

    @api heritagedfilters;

    //pedro
    @api fromamount;
    @api toamount;

    @track filtersAux;
    @track displayedDates = 4;
    @track displayedAmount = 2;
    @track showAmountError = false;
    @track datesBis = [];
    @track amountBis = [];
    @track showFormatError  = false;
    @track calendarHelpText = "dd/mm/yyyy";
    @track calendarLabel;
    @track placeholderFrom = this.label.from;
    @track placeholderTo = this.label.to;
    @track displayDropdown = true;
    @track helpTextDropdown = this.label.Show_More;
    @track dropdownPlaceholder = this.label.selectOne;
    @track isDropdownDisabled = false;
    @track displayDropdown = true;
    @track iamC;
    @track firstTime = false;
    @track selectedOptions = [];
    @track varB = true;

    @track applyDate = true;

    get datesZero(){
        if(this.fromdate != null){
            return this.fromdate;
        } else if(this.dates){
            return this.dates[0];
        } else return null;            
        
    }

    get datesOne(){
        if(this.todate != null){
            return this.todate;
        }else if(this.dates){
            return this.dates[1];
        }else return null; 
        
    }

    get amountZero(){
        if(this.fromamount != null){
            return this.fromamount;
        }else if(this.amountBis){
            return this.amountBis[0];
        }else return null;
        /*
        var ret = null;
        if(this.amountBis){
         ret = this.amountBis[0];
        }
        return ret;*/
    }

    get amountOne(){
        if(this.toamount != null){
            return this.toamount;
        }else if(this.amountBis){
            return this.amountBis[1];
        }else return null;
        /*
        var ret = null;
        if(this.amountBis){
         ret = this.amountBis[1];
        }
        return ret;
        */
    }

   /* get filters(){
        return this._filters;
    }

    set filters(filters){
        if (filters){
            this._filters= filters;
        }
       
    }*/

    get filterLengthNotNull(){
        var ret = false;
        if(this.filtersAux){
            ret = this.filtersAux && this.filtersAux.length >0;
        }
        return ret;       
    }

    get amountFormatError(){
        return this.showAmountError && this.showFormatError == false;
    }

    get numberActiveFiltersGt(){
        return this.numberactivefilters > 0;
    }
    
    get numberActiveFiltersClass(){
        return this.label.advancedFilters + ' ('+ this.numberactivefilters + ')';
    }

    @api
    setFilterAux(filters){
        if(filters){
            this.firstTime = true;
            var filtersAux = JSON.parse(JSON.stringify(filters));
                Object.keys(filters).forEach(key => {
                    filtersAux[key].label1 = filtersAux[key].name + ' (' + filtersAux[key].numberChecked + ')';    
                    filtersAux[key].label2 = filtersAux[key].name + this.displayedAmount;
                    filtersAux[key].label3= filtersAux[key].name + this.displayedDates;

                    filtersAux[key].filterTypeCheckbox = filtersAux[key].type == 'checkbox';
                    filtersAux[key].filterTypeText = filtersAux[key].type == 'text';
                    filtersAux[key].filterTypeDates = filtersAux[key].type == 'dates';
                    filtersAux[key].filterNumberCheckedZero = filtersAux[key].numberChecked == 0;
                    filtersAux[key].filterNumberCheckedGt = filtersAux[key].numberChecked > 0;

                    if(filtersAux[key].type == 'checkbox'){
                        Object.keys(filtersAux[key].data).forEach(key2 => {
                            let options = filtersAux[key].data;
                            options[key2].label1 =  options[key2].value + options[key2].index;
                        });
                    }
                    
                });
               this.filtersAux = filtersAux;

            }
           
    }


    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        console.log('filtros: ' + this.filters);
        if(this.filters){
            this.firstTime = true;
            var filtersAux = JSON.parse(JSON.stringify(this.filters));
                Object.keys(this.filters).forEach(key => {
                    filtersAux[key].label1 = filtersAux[key].name + ' (' + filtersAux[key].numberChecked + ')';    
                    filtersAux[key].label2 = filtersAux[key].name + this.displayedAmount;
                    filtersAux[key].label3= filtersAux[key].name + this.displayedDates;

                    filtersAux[key].filterTypeCheckbox = filtersAux[key].type == 'checkbox';
                    filtersAux[key].filterTypeText = filtersAux[key].type == 'text';
                    filtersAux[key].filterTypeDates = filtersAux[key].type == 'dates';
                    filtersAux[key].filterNumberCheckedZero = filtersAux[key].numberChecked == 0;
                    filtersAux[key].filterNumberCheckedGt = filtersAux[key].numberChecked > 0;

                    if(filtersAux[key].type == 'checkbox'){
                        Object.keys(filtersAux[key].data).forEach(key2 => {
                            let options = filtersAux[key].data;
                            options[key2].label1 =  options[key2].value + options[key2].index;
                        });
                    }
                    
                });
               this.filtersAux = filtersAux;
            }

            var dates = this.dates;
        // Only To date is filled, then fill From with -25 months
        if(dates != undefined && dates.length>0){
            if(dates[1] != undefined ){
                if(dates[1].length>10){
                    dates[1]=dates[1].split('T')[0];
                } 
            }
            if(dates[0] != undefined){
                if(dates[0].length > 10){
                    dates[0]=dates[0].split('T')[0];
                } 
            }
        this.dates = dates;
        }
    this.datesBis = this.dates;
        
    }

    updateDatesBis(){
       this.datesBis = this.dates;
    }     

    clearFilters(event){
        var filterName = event.currentTarget.id;

		if(filterName){
            //var filters = this.filters;
            var filters = JSON.parse(JSON.stringify(this.filtersAux));
			console.log('FILTERS: ' + filters);
			for(var key in filters){
				if(filters[key].name == filterName.split('-')[0]){
					if(filters[key].type == "checkbox"){
						for(var option in filters[key].data){
							filters[key].data[option].checked = false;
							filters[key].numberChecked = 0;
						}
					} else if(filters[key].type == "text"){
						this.showAmountError = false;
						this.showFormatError = false;
                        filters[key].selectedFilters = {"from" : '', "to" : ''};                        
                        this.amountBis = [];
                        this.fromamount = undefined;
						this.toamount = undefined;
					} else if(filters[key].type == "dates"){
                        //Remove error
                    if(this.template.querySelector('[data-id="dateFromInput"]') != null && this.template.querySelector('[data-id="dateToInput"]') != null){
                        this.template.querySelector('[data-id="dateFromInput"]').setCustomValidity('');
                        this.template.querySelector('[data-id="dateFromInput"]').reportValidity();
                        this.template.querySelector('[data-id="dateToInput"]').setCustomValidity('');
                        this.template.querySelector('[data-id="dateToInput"]').reportValidity();
                    }
						this.dates = [];
                        this.datesBis = [];
						this.displayedDates = "";
						this.fromdate = undefined;
                        this.todate = undefined;
						filters[key].data = [];
					}

					if(filters[key].dependsOn != null && filters[key].dependsOn != []){
						for (var i in filters[key].dependsOn){
							for(var k in filters){
								if(filters[k].name == filters[key].dependsOn[i]){
									for(var option in filters[k].data){
										filters[k].data[option].checked = false;
										filters[k].numberChecked = 0;
									}
								}

							}

						}
					}
				}
                else if(filters[key].name == this.label.Category){
                    for(var option in filters[key].data){
                        filters[key].data[option].checked = false;
                        filters[key].numberChecked = 0;
                    }
                }
			}

            this.filtersAux = filters;
            var aux= [];
			
            const evt = new CustomEvent('onoptionselection', {
                detail: {
                    "filterName" : filterName,
                    "selectedOptions" : aux,
                    "source" : "clearAll"
                }
              });
            this.dispatchEvent(evt);
            this.applyFilters(event);
            this.toggleFilterVisibility(event);
            this.setFilterAux(this.filtersAux);
		}
    }
    
    toggleFilterVisibility(event){
		var filterName = event.currentTarget.name;
		var filters = JSON.parse(JSON.stringify(this.filtersAux));
		if(filterName){
			// Mark the displayOptions param to display the options
			for(var key in filters){
				if(filters[key].name == filterName){
					if(filters[key].displayOptions == undefined || filters[key].displayOptions == false){
						filters[key].displayOptions = true;
					} else {
						filters[key].displayOptions = false;
					}
				} else {
					filters[key].displayOptions = false;
				}
			}
			this.filtersAux = filters;
			// Toggle the CSS class to select / unselect the button
			var buttonId = event.currentTarget.name;
            //document.getElementById(buttonId).classList.toggle("buttonSelected");
            /*if(this.template.querySelector('#'+ buttonId) != null){
                this.template.querySelector('#'+ buttonId).classList.toggle("buttonSelected");
            }*/
            if(this.template.querySelector('[data-id="'+buttonId+'"]') != null){
                this.template.querySelector('[data-id="'+buttonId+'"]').classList.toggle("buttonSelected");
            }
		}
    }
    
    saveFreeTextData(event){

        var amountFrom = this.template.querySelector('[data-id="AmountFrom"]');
        var amountTo = this.template.querySelector('[data-id="AmountTo"]');
        console.log(amountFrom.value + '*****' + amountTo.value);

		//var idButton = event.currentTarget.id;
		if(amountFrom != null || amountTo != null){
			var filters = JSON.parse(JSON.stringify(this.filters));
			for(var key in filters){
				if(filters[key].name == this.label.amount && amountFrom.value != undefined){
					this.showAmountError = false;
					this.showFormatError = false;

                    this.amountBis[0] = amountFrom.value;
                    this.fromamount = amountFrom.value;
                    
                    if(this.amountBis[1] != undefined && parseInt(this.amountBis[0]) > parseInt(this.amountBis[1])){
                        this.showAmountError = true;
                    }
                    /*
					if(filters[key].selectedFilters == undefined){
						filters[key].selectedFilters = {};
                        filters[key].selectedFilters.from = amountFrom.value;
					} else if((parseInt(amountFrom.value) > parseInt(filters[key].selectedFilters.to)) 
								&& filters[key].selectedFilters.to != undefined && filters[key].selectedFilters.to != ""){
						filters[key].selectedFilters.from = amountFrom.value;
						// event.currentTarget.value = undefined;
						//Show error
						this.showAmountError = true;
					}else if(parseInt(amountFrom.value) < 0 || isNaN(amountFrom.value)){
						this.showFormatError = true;
						filters[key].selectedFilters.from = amountFrom.value;
					} else {
						filters[key].selectedFilters.from = amountFrom.value;
                    }*/	
                } 
                if(filters[key].name == this.label.amount && amountTo.value != undefined){
                    this.showAmountError = false;
					this.showFormatError = false;

                    this.amountBis[1] = amountTo.value;
                    this.toamount = amountTo.value;
                    
                    if(this.amountBis[0] != undefined && parseInt(this.amountBis[0]) > parseInt(this.amountBis[1])){
                        this.showAmountError = true;
                    }
                }
                
                /*                
                else if(filters[key].name == this.label.amount && amountTo.value != undefined){
					this.showAmountError = false;
					this.showFormatError = false;

					if(filters[key].selectedFilters == undefined){
						filters[key].selectedFilters = {};
						filters[key].selectedFilters.to = amountTo.value;
					} else if((parseInt(amountTo.value) < parseInt(filters[key].selectedFilters.from)) 
								&& filters[key].selectedFilters.from != undefined && filters[key].selectedFilters.from != ""){
						filters[key].selectedFilters.to = amountTo.value;
						this.showAmountError = true;
									
					} else if(parseInt(amountTo.value) < 0 || isNaN(amountTo.value)){
						this.showFormatError = true;
						filters[key].selectedFilters.to = amountTo.value;
					} else {
						filters[key].selectedFilters.to = amountTo.value;
					}
				}*/
			}
			//this.filters = filters;
		}
	}

	openModal() {
        const compEvent = new CustomEvent('openmodal', {detail: {openModal : true}});
        this.dispatchEvent(compEvent);
		this.showModal = true;
    }

    checkOption(event){
		var checkValue = event.currentTarget.value;
        var dropdownName = event.currentTarget.name;
        var filters = JSON.parse(JSON.stringify(this.filtersAux));
        //var filters = this.filters;
        var selectedOptionAux = [];

		for(var key in filters){
			if(dropdownName == filters[key].name){
				for(var option in filters[key].data){
					if(checkValue == filters[key].data[option].value){
                        filters[key].data[option].checked = event.currentTarget.checked;
						filters[key].numberChecked = filters[key].data.filter(option => option.checked).length;
						var selectedFilter = filters[key].name;
						if(filters[key].data[option].checked){
                            this.selectedOptions.push(filters[key].data[option].value);
                            selectedOptionAux = this.selectedOptions;
						}
					}
				}
			}
		}
		// Fire the option selection event so that the other dropdowns can be updated
		this.filtersAux = filters;
        const evt = new CustomEvent('optionselection', {
            detail: {
                "filterName" : selectedFilter,
                "selectedOptions" : selectedOptionAux,
                "filters" : this.filtersAux
            }
        });
        this.dispatchEvent(evt);
        this.setFilterAux(this.filtersAux);
	}

	donwloadFile(){        
        const cmpEvent = new CustomEvent('launchdonwload');
        this.dispatchEvent(cmpEvent);
	}

    printScreen(){
		window.print();
	}

	validateDate(event){
        
        var bis = [];        
        
        var from = '';
        var to = '';

        if(this.template.querySelector('[data-id="dateFromInput"]') != null){
            from = this.template.querySelector('[data-id="dateFromInput"]').value;            
        }
        if(this.template.querySelector('[data-id="dateToInput"]') != null){
            to = this.template.querySelector('[data-id="dateToInput"]').value;            
        }
        bis.push(from);
        bis.push(to);
        this.datesBis = bis;
              
        if(to != ''){
            if(to < from)
            {
                console.log('TO menor que el FROM: ' + to +'****'+from);
                this.template.querySelector('[data-id="dateFromInput"]').setCustomValidity(this.label.validationDate);
                this.template.querySelector('[data-id="dateFromInput"]').reportValidity();
                this.applyDate = false;
            }
            else{
                this.template.querySelector('[data-id="dateFromInput"]').setCustomValidity('');
                this.template.querySelector('[data-id="dateFromInput"]').reportValidity();
                this.applyDate = true;
            }
        }
        
        this.checkDates();
       
        /*
        if(dates[1] < dates[0]){
            if(event.getSource().getLocalId() == "dateFromInput"){
                if(this.template.querySelector('[data-id="dateFromInput"]') != null){
                    this.template.querySelector('[data-id="dateFromInput"]').setCustomValidity(this.label.validationDate);
                    this.template.querySelector('[data-id="dateFromInput"]').reportValidity();
                }
            } else if(event.getSource().getLocalId() == "dateToInput"){
                // dates[1] = undefined;
                //Show error
                if(this.template.querySelector('[data-id="dateToInput"]') != null){
                    this.template.querySelector('[data-id="dateToInput"]').setCustomValidity(this.label.validationDate);
                    this.template.querySelector('[data-id="dateToInput"]').reportValidity();
                }
                
            }		
            this.dates = dates;
        }*/
	}
	
	getDatesFromString(event){
		var params = event.getParam("arguments");
		if(params){
			var dateStrings = params.dateStrings;
			this.getISOStringFromDateString( dateStrings, undefined);
		}
    }
    
    toggleTimeframeValue(insertValue){
        if(insertValue){
            var values = this.dropdownValues;
            if(!values.includes(this.label.selectOne)){
                values.unshift(this.label.selectOne);
                this.dropdownValues = values;
                this.dropdownSelectedValue = this.label.selectOne;
            }
        } else {
            var dropdownValues = this.dropdownValues;
            dropdownValues.filter(row => row != this.label.selectOne);
            this.dropdownValues = dropdownValues;
        }
    }

    checkDates(selectedFilters){
        console.log("ENTRO CDATES");
        var dates = this.datesBis;
        console.log(dates);
        // Only To date is filled, then fill From with -25 months
        if((dates[0] == undefined || dates[0] == '') && dates[1] != undefined && dates[1] != this.label.to){
            var toDate = new Date(Date.parse(dates[1]));
            var fromDate = new Date(toDate.setMonth(toDate.getMonth() - 25));
            var finalDate = "";
            var aux = toDate.getMonth() + 1;
            finalDate = fromDate.getFullYear() + "-" + aux + "-" + fromDate.getDate();
            dates[0] = finalDate;
            this.datesBis = dates;
            //helper.toggleTimeframeValue(component, true);
            // Only From date is filled, then fill until today
        } else if((dates[1] == undefined || dates[1] == '') && dates[0] != undefined && dates[0]!=this.label.from || new Date(Date.parse(dates[0])) > new Date(Date.parse(dates[1]))){
            var toDate = new Date(Date.now());
            var fromDate = new Date(Date.parse(dates[0]));
            var finalDate = "";
            if(fromDate >= toDate){
                toDate = JSON.parse(JSON.stringify(fromDate));
            }
            var aux = toDate.getMonth() + 1;
            finalDate = toDate.getFullYear() + "-" + aux + "-" + toDate.getDate();
            dates[1] = finalDate;
            this.datesBis = dates;
        }
        this.dates = dates;

        if(dates[0]!= null && dates[0]!=undefined){
            if(dates[0].dates>10){
                dates[0]=dates[0].split("T")[0];
            } 
        }else{
            this.fromDate = undefined;
        }
        if(dates[1]!= null && dates[1]!=undefined){
            if(dates[1].dates>10){
                dates[1]=dates[1].split("T")[0];
            } 
        }else{
            this.toDate = undefined;
        }
        
        if(this.convertdatestousertimezone){
            this.getISOStringFromDateString(dates, selectedFilters);
        } else {
            this.fireSelectedDates(dates, selectedFilters);
        }
    }

    validateDates(event){
        var dates = this.dates;
        if(dates[1] < dates[0]){
            if(event.currentTarget.id == "dateFromInput"){
                // dates[0] = undefined;
                //Show error
                if(this.template.querySelector('[data-id="dateFromInput"]') != null){
                    this.template.querySelector('[data-id="dateFromInput"]').setCustomValidity(this.label.validationDate);
                    this.template.querySelector('[data-id="dateFromInput"]').reportValidity();
                }
            } else if(event.currentTarget.id == "dateToInput"){
                // dates[1] = undefined;
                //Show error
                if(this.template.querySelector('[data-id="dateFromInput"]') != null){
                    this.template.querySelector('[data-id="dateFromInput"]').setCustomValidity(this.label.validationDate);
                    this.template.querySelector('[data-id="dateFromInput"]').reportValidity();
                }
            }else{
                // component.find('dateToInput').setCustomValidity($A.get("$Label.c.validationDate"));
                // component.find('dateToInput').reportValidity();
            }	
            return false;
        }	
        return true;
    }

    closeFilter(event){
        // Get all the filters sections and check whether
        // any of them has been clicked
        var clickedElement = event.target;
        var elements = this.template.querySelectorAll("div.content_modal");
        var filterClicked = false;
        elements.forEach(function(e) {
            if(filterClicked == false){
                filterClicked = e.contains(clickedElement);
            }
        });
        // If no filter has been clicked and
        // neither a filter button, then close all filters
        if(filterClicked == false){
            var filters = this.filters;
            for(var key in filters){
                if(filters[key].type == "checkbox" && filters[key].name != clickedElement.id){
                    filters[key].displayOptions = false;
                }
            }
            this.filters = filters;
        }
    }

    @api
    applyFilters(event) {
        var cmpParams;
        if(event && event.currentTarget && event.currentTarget.name == "clearBtn"){
            cmpParams = {button: "clear"};
        }else{
            cmpParams = {button: "filter"};
        }
        // Validate the date
        var isValidDate = true;
        var isValidAmount = true;
        
        if(this.template.querySelector('[data-id="dateFromInput"]') != undefined && this.template.querySelector('[data-id="dateToInput"]') != undefined){
            isValidDate =  this.validateDates(event);
            //comentada pedro
            /*if(this.template.querySelector('[data-id="dateFromInput"]').get(this.validity).valid==false || this.template.querySelector('[data-id="dateToInput"]').get(this.validity).valid==false){
                isValidDate=false;
            }*/      
        }

        if(isValidDate && !this.showAmountError && !this.showFormatError){
            var selectedFilters = [];
            var filters = JSON.parse(JSON.stringify(this.filtersAux));
           // var filters = this.filters;
            var flagEvent = false;
            
            // Get the selected values from the filters
            for(var key in filters){
                if(filters[key].type == "checkbox"){
                    var selectedOptions = filters[key].data.filter(option => option.checked);
                    if(selectedOptions.length > 0){
                        var selection = {};
                        selection.value = selectedOptions;
                        selection.name = filters[key].name;
                        selection.type = "checkbox";
                        selectedFilters.push(selection);
                    }
                } else if(filters[key].type == "dates"){
                    //component.set("v.dates", component.get("v.datesBis"));
                    cmpParams.buttonClicked = "apply";
                    var selection = {};
                    selection.value = {};
                    selection.value.from = this.fromdate;//this.dates[0];//this.fromDate;
                    selection.value.to = this.todate;//this.dates[1];//this.toDate;
                    selection.name = filters[key].name;
                    selection.type = "dates";
                    if(selection.value != undefined && (selection.value.from != undefined || selection.value.to != undefined)){	
                        selectedFilters.push(selection);	
                    }
                    
                    if(selection.value.from != undefined || selection.value.from != null || selection.value.to != undefined || selection.value.to != null){
                        flagEvent=true;
                    }
                    if(this.datesBis[0] != undefined && this.datesBis[1] != undefined){
                        flagEvent=true;
                    }

                
                    // Create the selected dates string
                    //component.set("v.displayedDates", "(" + selection.value.from + " - " + selection.value.to + ")");
                } else if(filters[key].type == "text"){
                    //if(filters[key].selectedFilters != undefined){
                        var selection = {};
                        selection.value =   {};
                        selection.value.from = this.fromamount;//this.amountBis[0];//filters[key].selectedFilters.from;
                        selection.value.to = this.toamount;//this.amountBis[1];//filters[key].selectedFilters.to;
                        selection.name = filters[key].name;
                        selection.type = "text";
                        if(selection.value != undefined && (selection.value.from != "" || selection.value.to != "")){	
                            selectedFilters.push(selection);	
                        }
                        
                        var displayedAmount = "";
                        isValidAmount = this.validateAmount(selection.value.from, selection.value.to);
                        if(selection.value.from != undefined && selection.value.to == undefined){
                            var maxLabel = this.label.Max;
                            displayedAmount = "(" + selection.value.from + " - " + maxLabel + ")";
                        } else if(selection.value.to != undefined && selection.value.from == undefined){
                            var minLabel = this.label.Min;
                            displayedAmount = "(" + minLabel + " - " + selection.value.to + ")";
                        } else if(selection.value.to != undefined && selection.value.from != undefined){
                            displayedAmount = "(" + selection.value.from + " - " + selection.value.to + ")";
                        }
                    //}
                }
                // Set the display options flag to false, so the options section collapses
                if(filters[key].type != "text" || (filters[key].type == "text" && isValidAmount)){
                   // filters[key].displayOptions = false;
                   filters[key].displayFilter = false;
                }
            }
            
            // Clear the "Select one" value if there is a selected value in the drodpdown
            if(this.dropdownSelectedValue == this.label.selectOne){
                this.toggleTimeframeValue(false);
            }
            this.filters = filters;
            //this.filtersAux = filters;
            // Fire the event, if no filter is selected then all the data must be retrieved
            if(isValidAmount){
                //cmpEvent.fire();
                console.log(flagEvent);
                if(flagEvent==false){
                    cmpParams.selectedFilters = selectedFilters;
                    if(event && event.currentTarget!=undefined){	
                        cmpParams.filterName = event.currentTarget.id.split('-')[0];	
                    }else{
                        cmpParams.filterName = cmpParams.selectedFilters[0].name;
                    }
                    const compEvent = new CustomEvent('firefilter', {detail : {cmpParams}});
                    this.dispatchEvent(compEvent);
                    if(event) {
                        this.toggleFilterVisibility(event);
                    }
                }else{
                    
                    if(this.applyDate){
                        if(this.fromdate != null && this.template.querySelector('[data-id="dateFromInput"]') != null && this.template.querySelector('[data-id="dateToInput"]') != null){
                            var bis = [];
                            var f = this.fromdate.substring(0, 10);
                            var t = this.todate.substring(0, 10);
                            var labelfrom = this.template.querySelector('[data-id="dateFromInput"]').value.substring(0, 10);
                            var labelto = this.template.querySelector('[data-id="dateToInput"]').value.substring(0, 10);

                            if(f != labelfrom) bis.push(labelfrom);
                            else bis.push(f);
                            if(t != labelto) bis.push(labelto);
                            else bis.push(t);

                            this.datesBis = bis;
                        }else{
                            if(this.fromdate != null){
                                var bis = [];
                                var f = this.fromdate.substring(0, 10);
                                var t = this.todate.substring(0, 10);
                                bis.push(f);
                                bis.push(t);
                                this.datesBis = bis;
                            }
                        }
                        this.checkDates(selectedFilters);
                        if(event) {
                            this.toggleFilterVisibility(event);
                        }
                    }

                }
            }
        }
        this.firstTime = false;
        this.setFilterAux(this.filtersAux);
        
    }

    validateAmount(from, to){
        var validate = this.iamC;
        if(from != "" || to != ""){
            let x = parseInt(from);
            let y = parseInt(to);
            if(x > y) {
                this.showAmountError =  true;
                return false;
            } else if((isNaN(from) && from != undefined) || (isNaN(to) && to != undefined)) {
                this.showFormatError = true;	
                return false;
            } else if ((x < 0 )|| (y < 0)){
                if(validate == false){
                    this.showFormatError =  true;
                    return false;
                }
               
            }
        }
        return true;   
    }

    getISOStringFromDateString(dateString, selectedFilters){
        try {
            var result = '';
            return new Promise(function (resolve, reject) {
            getISOStringFromDateString({ dateInput : [dateString[0],dateString[1]] })
            .then(res => {
                if(res!='null' && res!=undefined && res!=null){
                    this.fireSelectedDates(dateString, selectedFilters, res);
                    resolve(res);
                }else { 
                    return null;
                }
            })
            .catch(error => {
                if(error){
                    component.set("v.errorAccount",true);
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                    reject(result);
                }else{
                    console.log("Unknown error");
                }
            });
        });
        }catch(e) {
            console.error('### lwc_cn_filters ### getISOStringFromDateString() ::: Catch Error: ' + e);
        }
    }

    fireSelectedDates (dateString, selectedFilters, res){
        var from = "";
        var to = "";
        if(this.convertdatestousertimezone){
            from = this.formatDateGMT(dateString[0],res[dateString[0]], true);
            to = this.formatDateGMT(dateString[1],res[dateString[1]], false);
        } else {
            // Get the date and format it in a proper way
            for(let i in dateString){
                var dateChunks = dateString[i].split('-');
                var monthChunk = dateChunks[1];
                var dayChunk = dateChunks[2];
                if(dateChunks[1].length < 2){
                    monthChunk = "0" + dateChunks[1];
                }
                if(dateChunks[2].length < 2){
                    dayChunk = "0" + dateChunks[2]; 
                }
                dateString[i] = dateChunks[0] + '-' + monthChunk + '-' + dayChunk;
            }
            var now = new Date();	
			now.setSeconds(0,0);	
			var newTime = now.toISOString();	
            if(dateString[1] == newTime.slice(0,10)) {	
            	from = dateString[0] + "T00:00:00.000Z";	
                to = dateString[1] + newTime.slice(10,24);	
            } else {	
                from = dateString[0] + "T00:00:00.000Z";	
                to = dateString[1] + "T23:59:59.999Z";	
            }
        }
        if(selectedFilters!=undefined && dateString != undefined){
            if(selectedFilters.length>0){
                var dateFilterCreated;

                for(var f in selectedFilters){
                    var currentFilter = selectedFilters[f];
                    if(currentFilter.name == this.label.bookDate){
                        currentFilter.value.from=from;
                        currentFilter.value.to=to;
                        dateFilterCreated = true;
                    }
                    
                }
                if(!dateFilterCreated && from != '' && to != ''){
                    var selection = {};
					selection.value = {};
					selection.value.from = from;
					selection.value.to = to;
					selection.name = this.label.bookDate;
					selection.type = "dates";
					selectedFilters.push(selection);    
                }
            }else{
                var selection = {};
                selection.value = {};
                selection.value.from = from; 
                selection.value.to = to;
                selection.name = this.label.bookDate;
                selection.type = "dates";
                selectedFilters.push(selection);
            }    

            //const compEvent = new CustomEvent('firefilter', {"selectedFilters" : selectedFilters});
            var cmpParams = {};
            cmpParams.selectedFilters = selectedFilters;
            //const compEvent = new CustomEvent('firefilter', {detail : selectedFilters});
            const compEvent = new CustomEvent('firefilter', {detail : {cmpParams}});
            this.dispatchEvent(compEvent);
            //visibilidad

        }
    }
        
        formatDateGMT(dateString, res, beginningOfDay){
            var timeZoneOffsetInMs = res;
            var MS_PER_HOUR = 3600000;
            var MS_PER_MIN = 60000;
            // Get the date and format it in a proper way
            var dateChunks = dateString.split('-');
            var monthChunk = dateChunks[1];
            var dayChunk = dateChunks[2];
            if(dateChunks[1].length < 2){
                monthChunk = "0" + dateChunks[1];
            }
            if(dateChunks[2].length < 2){
                dayChunk = "0" + dateChunks[2];
            }
            dateString = dateChunks[0] + '-' + monthChunk + '-' + dayChunk;
            // We have the user's locale timezone from Salesforce and a date created with the browser's timezone
            // So first we need to adapt both values
            var timezoneOffsetDate = new Date();
            var localTimezoneOffSet = timezoneOffsetDate.getTimezoneOffset()*MS_PER_MIN;
            //GET DATESTRING NO GMT
            
            var x = new Date(Date.parse(dateString));
            const getUTC = x.getTime();
            const offset = x.getTimezoneOffset() * 60000;
            var xx = new Date(getUTC+offset).toString();
            var newDate; 
            newDate = new Date(Date.parse(xx) - timeZoneOffsetInMs );
            
            if(!beginningOfDay){
                newDate.setTime(newDate.getTime() +  (MS_PER_HOUR*24));
                newDate.setTime(newDate.getTime() - 1);
            }
            var month = parseInt(newDate.getMonth())+1;
            if(month < 10){
                month = '0' + month;
            }
            var day = newDate.getDate();
            var hour=newDate.getHours();
            var mins = newDate.getMinutes();
            var secs = newDate.getSeconds();
            var msecs = newDate.getMilliseconds();
            if(hour < 10){
                hour = '0' + hour;
            }
            if(day < 10){
                day = '0' + day;
            }
            if(mins < 10){
                mins = '0' + mins;
            }
            if(secs < 10){
                secs = '0' + secs;
            }
            if(msecs > 9 && msecs < 100){
                msecs = '0' + msecs;
            } else if(msecs < 10){
                msecs = '00' + msecs;
            }
            var finalDate = newDate.getFullYear() + '-' + month + '-' + day +'T' + hour + ':' + mins + ':' + secs + '.' + msecs + 'Z';
            if(beginningOfDay){
                this.fromDate = finalDate;
            }else{
                this.toDate = finalDate;
            }
            return finalDate;
        }

        @api
        filterData(){
            this.applyFilters();
        }

        handledropdownvalueselected(evt){
            console.log("Entra a handledropdownvalueselected: " + evt.detail[0]);
            this.dropdownselectedvalue = evt.detail[0];
            const selectedEvent = new CustomEvent('dropdownvalueselected', {detail: this.dropdownselectedvalue});
            this.dispatchEvent(selectedEvent);
        }
}