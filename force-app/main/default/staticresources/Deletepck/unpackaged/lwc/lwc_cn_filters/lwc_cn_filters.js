import {LightningElement, track, api } from 'lwc';
import santanderStyle from '@salesforce/resourceUrl/Santander_Icons';
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
import from from '@salesforce/label/c.from';
import validationDate from '@salesforce/label/c.validationDate';
import selectOne from '@salesforce/label/c.selectOne';
import Max from '@salesforce/label/c.Max';
import Min from '@salesforce/label/c.Min';
import bookDate from '@salesforce/label/c.bookDate';
import encryptData from '@salesforce/apex/Global_Utilities.encryptData'
export default class Lwc_cn_filters extends LightningElement {

    @api filters;
    @api showadvancedfilters;
    @api showmodal;
    @api numberactivefilters;
    @api currentage;
    @api displaydownloadicon;
    @api convertdatestousertimezone;
    @api currentpage;
    @api dates;
    @api dropdownvalues = ['val1', 'val2', 'val3'];
    @api dropdownselectedvalue;
    @api dropdownheader = 'dropdownheader';
    @api fromdate;
    @api todate;

    @track filtersAux;
    @track displayedDates = 4;
    @track displayedAmount = 2;
    @track displayPrintIcon;
    @track showAmountError;
    @track datesBis;
    @track showFormatError;
    @track calendarHelpText;
    @track calendarLabel;
    @track placeholderFrom;
    @track placeholderTo;
    @track displayDropdown;
    @track helpTextDropdown;
    @track dropdownPlaceholder;
    @track isDropdownDisabled;
    @track displayDropdown = true;
    @track iamC;


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
        bookDate
    }

    get datesZero(){
        return this.dates[0];
    }

    get datesOne(){
        return this.dates[1];
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
        return this.filters;
    }

    get amountFormatError(){
        return this.showAmountError && !this.showFormatError;
    }

    get numberActiveFiltersGt(){
        return this.numberactivefilters > 0;
    }
    
    get numberActiveFiltersClass(){
        return label.advancedFilters + ' ('+ this.numberActiveFilters + ')';
    }

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
       // console.log('filters: ' + this.filters);
       // console.log('filters.displayFilters ' + this.filters.displayFilters);
        if(this.filters){
            this.filtersAux = this.filters;
            Object.keys(this.filtersAux).forEach(key => {
                this.filtersAux[key].label1 = this.filtersAux[key].name + ' (' + this.filtersAux[key].numberChecked + ')';
                this.filtersAux[key].label2 = this.filtersAux[key].name + this.displayedAmount;
                this.filtersAux[key].label3= this.filtersAux[key].name + this.displayedDates;

                this.filtersAux[key].filterTypeCheckbox = this.filtersAux[key].type == 'checkbox';
                this.filtersAux[key].filterTypeText = this.filtersAux[key].type == 'text';
                this.filtersAux[key].filterTypeDates = this.filtersAux[key].type == 'dates';
                this.filtersAux[key].filterNumberCheckedZero = this.filtersAux[key].numberChecked == 0;
                this.filtersAux[key].filterNumberCheckedGt = this.filtersAux[key].numberChecked > 0;

                Object.keys(this.filtersAux[key].data).forEach(key2 => {
                    let options = this.filtersAux[key].data;
                    options[key2].label1 =  options[key2].value + options[key2].index;
                });
                
            });
        }
        // for(var key in this.filtersAux){
        //     this.filtersAux[key].label1 = this.filtersAux[key].name + ' (' + this.filtersAux[key].numberChecked + ')';
        //     this.filtersAux[key].label2 = this.filtersAux[key].name + this.displayedAmount;
        //     this.filtersAux[key].label3= this.filtersAux[key].name + this.displayedDates;

        //     for(var keyAux in this.filtersAux[key].data){
        //         let options = this.filtersAux[key].data;
        //         options[keyAux].label1 =  options[keyAux].value + option[keyAux].index;
        //     }
        // }


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
			var filters = this.filters;
			console.log('FILTERS: ' + filters);
			for(var key in filters){
				if(filters[key].name == filterName){
					if(filters[key].type == "checkbox"){
						for(var option in filters[key].data){
							filters[key].data[option].checked = false;
							filters[key].numberChecked = 0;
						}
					} else if(filters[key].type == "text"){
						this.showAmountError = false;
						this.showFormatError = false;
						filters[key].selectedFilters = {"from" : '', "to" : ''};
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
						this.fromDate = undefined;
						this.toDate = undefined;
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
			}
            this.filters = filters;
            var aux= [];
			
            const evt = new CustomEvent('onoptionselection', {
                "filterName" : filterName,
                "selectedOptions" : aux,
                "source" : "clearAll"
              });
            this.dispatchEvent(evt);
            this.applyFilters(event);
		}
    }
    
    toggleFilterVisibility(event){
		var filterName = event.currentTarget.name;
		var filters = this.filters;
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
			this.filters = filters;
			// Toggle the CSS class to select / unselect the button
			var buttonId = event.currentTarget.name;
            //document.getElementById(buttonId).classList.toggle("buttonSelected");
            if(this.template.querySelector('#'+ buttonId) != null){
                this.template.querySelector('#'+ buttonId).classList.toggle("buttonSelected");
            }
		}
    }
    
    saveFreeTextData(event){
		var idButton = event.currentTarget.id;
		if(idButton){
			var filters = this.filters;
			for(var key in filters){
				if(filters[key].name == this.label.amount && idButton == "AmountFrom"){
					this.showAmountError = false;
					this.showFormatError = false;

					if(filters[key].selectedFilters == undefined){
						filters[key].selectedFilters = {};
						filters[key].selectedFilters.from = event.currentTarget.value;
					} else if((parseInt(event.currentTarget.value) > parseInt(filters[key].selectedFilters.to)) 
								&& filters[key].selectedFilters.to != undefined && filters[key].selectedFilters.to != ""){
						filters[key].selectedFilters.from = event.currentTarget.value;
						// event.currentTarget.value = undefined;
						//Show error
						this.showAmountError = true;
					}else if(parseInt(event.currentTarget.value) < 0 || isNaN(event.currentTarget.value)){
						this.showFormatError = true;
						filters[key].selectedFilters.from = event.currentTarget.value;
					} else {
						filters[key].selectedFilters.from = event.currentTarget.value;
					}					
				} else if(filters[key].name == this.label.amount && idButton == "AmountTo"){
					this.showAmountError = false;
					this.showFormatError = false;

					if(filters[key].selectedFilters == undefined){
						filters[key].selectedFilters = {};
						filters[key].selectedFilters.to = event.currentTarget.value;
					} else if((parseInt(event.currentTarget.value) < parseInt(filters[key].selectedFilters.from)) 
								&& filters[key].selectedFilters.from != undefined && filters[key].selectedFilters.from != ""){
						filters[key].selectedFilters.to = event.currentTarget.value;
						this.showAmountError = true;
									
					} else if(parseInt(event.currentTarget.value) < 0 || isNaN(event.currentTarget.value)){
						this.showFormatError = true;
						filters[key].selectedFilters.to = event.currentTarget.value;
					} else {
						filters[key].selectedFilters.to = event.currentTarget.value;
					}
				}
			}
			this.filters = filters;
		}
	}

	openModal() {
        const compEvent = new CustomEvent('openmodal', {openModal : true});
        this.dispatchEvent(compEvent);
		this.showModal = true;
    }
    
    checkOption(event){
		var checkValue = event.currentTarget.value;
		var dropdownName = event.currentTarget.name;
		var filters = this.filters;
		var selectedOptions = [];

		for(var key in filters){
			if(dropdownName == filters[key].name){
				for(var option in filters[key].data){
					if(checkValue == filters[key].data[option].value){
						filters[key].data[option].checked = event.currentTarget.checked;
						filters[key].numberChecked = filters[key].data.filter(option => option.checked).length;
						var selectedFilter = filters[key].name;
						if(filters[key].data[option].checked){
							selectedOptions.push(filters[key].data[option].value);
						}
					}
				}
			}
		}
		// Fire the option selection event so that the other dropdowns can be updated
		this.filters = filters;
        
        const evt = new CustomEvent('onoptionselection', {
            "filterName" : selectedFilter,
			"selectedOptions" : selectedOptions
          });
        this.dispatchEvent(evt);
	}

	donwloadFile(){        
        const cmpEvent = new CustomEvent('launchdonwload');
        this.dispatchEvent(cmpEvent);
	}

    printScreen(){
		window.print();
	}

	validateDate(event){
        var dates = this.dates;
		this.checkDates();

        //Remove error
        if(this.template.querySelector('[data-id="dateFromInput"]') != null){
            this.template.querySelector('[data-id="dateFromInput"]').setCustomValidity('');
        }
        if(this.template.querySelector('[data-id="dateToInput"]') != null){
            this.template.querySelector('[data-id="dateToInput"]').setCustomValidity('');
        }

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
        }
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
        if(dates[0] == undefined  && dates[1] != undefined && dates[1] != label.to){
            var toDate = new Date(Date.parse(dates[1]));
            var fromDate = new Date(toDate.setMonth(toDate.getMonth() - 25));
            var finalDate = "";
            var aux = toDate.getMonth() + 1;
            finalDate = fromDate.getFullYear() + "-" + aux + "-" + fromDate.getDate();
            dates[0] = finalDate;
            this.datesBis = dates;
            //helper.toggleTimeframeValue(component, true);
            // Only From date is filled, then fill until today
        } else if(dates[1] == undefined && dates[0] != undefined && dates[0]!=this.label.from || new Date(Date.parse(dates[0])) > new Date(Date.parse(dates[1]))){
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
        
        if(this.convertDatesToUserTimezone){
            this.getISOStringFromDateString(dates, selectedFilters);
        } else {
            this.fireSelectedDates(dates, selectedFilters);
        }
    }

    validateDates(event){
        var dates = thisdates;
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
            if(!filterClicked){
                filterClicked = e.contains(clickedElement);
            }
        });
        // If no filter has been clicked and
        // neither a filter button, then close all filters
        if(!filterClicked){
            var filters = this.filters;
            for(var key in filters){
                if(filters[key].type == "checkbox" && filters[key].name != clickedElement.id){
                    filters[key].displayOptions = false;
                }
            }
            this.filters = filters;
        }
    }

    applyFilters(event) {
        var cmpParams;
        if(event.currentTarget && event.currentTarget.name == "clearBtn"){
            cmpParams = {button: "clear"};
        }else{
            cmpParams = {button: "filter"};
        }
        // Validate the date
        var isValidDate = true;
        var isValidAmount = true;
        
        if(this.template.querySelector('[data-id="dateFromInput"]') != undefined && this.template.querySelector('[data-id="dateToInput"]') != undefined)
        {
            isValidDate =  this.validateDates( event);
            if(this.template.querySelector('[data-id="dateFromInput"]').get(this.validity).valid==false || this.template.querySelector('[data-id="dateToInput"]').get(this.validity).valid==false){
                isValidDate=false;
            }       
     }

        if(isValidDate && this.showAmountError && this.showFormatError){
            var selectedFilters = [];
            var filters = this.filters;
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
                    selection.value.from = this.fromDate;
                    selection.value.to = this.toDate;
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
                    if(filters[key].selectedFilters != undefined){
                        var selection = {};
                        selection.value = {};
                        selection.value.from = filters[key].selectedFilters.from;
                        selection.value.to = filters[key].selectedFilters.to;
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
                    }
                }
                // Set the display options flag to false, so the options section collapses
                if(filters[key].type != "text" || (filters[key].type == "text" && isValidAmount)){
                    filters[key].displayOptions = false;
                }
            }
            
            // Clear the "Select one" value if there is a selected value in the drodpdown
            if(this.dropdownSelectedValue == this.label.selectOne){
                this.toggleTimeframeValue(false);
            }
            this.filters = filters;
            
            // Fire the event, if no filter is selected then all the data must be retrieved
            if(isValidAmount){
                //cmpEvent.fire();
                console.log(flagEvent);
                if(flagEvent==false){
                    cmpParams.selectedFilters = selectedFilters;
                    if(event.currentTarget!=undefined){	
                        cmpParams.filterName = event.currentTarget.id;	
                    }
                    const compEvent = new CustomEvent('firefilter', {detail : {cmpParams}});
                    this.dispatchEvent(compEvent);
                }else{
                    this.checkDates(selectedFilters);
                }
            }
            
        }
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
        if(this.convertDatesToUserTimezone){
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

            const compEvent = new CustomEvent('firefilter', {"selectedFilters":selectedFilters});
            this.dispatchEvent(compEvent);

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
    }