({

	doInit : function(component, event, helper) {
        var dates = component.get("v.dates");

        // Only To date is filled, then fill From with -25 months
        if(dates != undefined && dates.length>0){
            //if(dates[1] == undefined ){
            if(dates[1] != undefined ){

                if(dates[1].length>10){
                    dates[1]=dates[1].split('T')[0];
                } 

            }

            //if(dates[0] == undefined ){
            if(dates[0] != undefined){

                if(dates[0].length>10){
                    dates[0]=dates[0].split('T')[0];
                } 
            }
            component.set("v.dates",dates);

        }

        component.set("v.datesBis",component.get("v.dates"));


    },
    updateDatesBis : function(component, event, helper) {
        component.set("v.datesBis",component.get("v.dates"));
    },
	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to clear the filter values
    History
    <Date>			<Author>			<Description>
	16/03/2020		Guillermo Giral   	Initial version
	*/
	clearFilters : function(component, event, helper) {
		var filterName = event.currentTarget.id;
		
		if(filterName){
			var filters = component.get("v.filters");
			console.log("FILTERS");
			console.log(filters);
			for(var key in filters){
				if(filters[key].name == filterName){
					if(filters[key].type == "checkbox"){
						for(var option in filters[key].data){
							filters[key].data[option].checked = false;
							filters[key].numberChecked = 0;
						}
					} else if(filters[key].type == "text"){
						component.set("v.showAmountError", false);
						component.set("v.showFormatError", false);
						filters[key].selectedFilters = {"from" : '', "to" : ''};
					} else if(filters[key].type == "dates"){

						//Remove error
						component.find('dateFromInput').setCustomValidity('');
						component.find('dateFromInput').reportValidity();

						component.find('dateToInput').setCustomValidity('');
						component.find('dateToInput').reportValidity();

						component.set("v.dates", []);

                        component.set("v.datesBis",[]);
						component.set("v.displayedDates", "");
						component.set("v.fromDate", undefined);
						component.set("v.toDate", undefined);
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
				// Set the display options flag to false, so the options section collapses
				// filters[key].displayOptions = false;
			}
			component.set("v.filters", filters);
			component.set("v.selectedOptions", []);

			var evt = component.getEvent("onOptionSelection");
			console.log("FILTER");
			if(evt){
				var aux =[];
				evt.setParams({
					"filterName" : filterName,
					"selectedOptions" : aux,
					"source" : "clearAll"
				});
				evt.fire();
			}

			helper.applyFilters(component, event, helper);

			/*Fire the event so the filters return to their initial status*/
			// var clearAllEvt = component.getEvent("clearAllFilters");
			// if(clearAllEvt){
			// 	clearAllEvt.setParam("filterName", filterName);
			// 	clearAllEvt.fire();
			// }

		}
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:   	Function to switch the options displayed
					in the filters
    History
    <Date>			<Author>			<Description>
	15/03/2020		Guillermo Giral   	Initial version
	*/
	toggleFilterVisibility : function(component, event){
		var filterName = event.currentTarget.name;
		var filters = component.get("v.filters");
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
			component.set("v.filters", filters);

			// Toggle the CSS class to select / unselect the button
			var buttonId = event.currentTarget.id;
			document.getElementById(buttonId).classList.toggle("buttonSelected");
		}
	},

	// numberWithCommas : function(x){ 
	// 	var parts = x.toString().split(".");
	// 	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	// 	return parts.join(".");
	// },

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Saves the data from the amount filter
    History
    <Date>			<Author>			<Description>
	18/03/2020		Guillermo Giral   	Initial version
	*/
	saveFreeTextData : function(component, event, helper) {
		var idButton = event.currentTarget.id;
		if(idButton){
			var filters = component.get("v.filters");
			for(var key in filters){
				if(filters[key].name == $A.get("$Label.c.amount") && idButton == "AmountFrom"){
					component.set("v.showAmountError", false);
					component.set("v.showFormatError", false);
					// var check = numberWithCommas(event.currentTarget.value);



					if(filters[key].selectedFilters == undefined){
						filters[key].selectedFilters = {};
						filters[key].selectedFilters.from = event.currentTarget.value;
					} else if((parseInt(event.currentTarget.value) > parseInt(filters[key].selectedFilters.to)) 
								&& filters[key].selectedFilters.to != undefined && filters[key].selectedFilters.to != ""){
						filters[key].selectedFilters.from = event.currentTarget.value;
						// event.currentTarget.value = undefined;
						//Show error
						component.set("v.showAmountError", true);
					}else if(parseInt(event.currentTarget.value) < 0 || isNaN(event.currentTarget.value)){
						//component.set("v.showFormatError", true);
						filters[key].selectedFilters.from = event.currentTarget.value;
					} else {
						filters[key].selectedFilters.from = event.currentTarget.value;
					}					
				} else if(filters[key].name == $A.get("$Label.c.amount") && idButton == "AmountTo"){
					component.set("v.showAmountError", false);
					component.set("v.showFormatError", false);

					if(filters[key].selectedFilters == undefined){
						filters[key].selectedFilters = {};
						filters[key].selectedFilters.to = event.currentTarget.value;
					} else if((parseInt(event.currentTarget.value) < parseInt(filters[key].selectedFilters.from)) 
								&& filters[key].selectedFilters.from != undefined && filters[key].selectedFilters.from != ""){
						filters[key].selectedFilters.to = event.currentTarget.value;
						// event.currentTarget.value = undefined;
						//Show error
						component.set("v.showAmountError", true);
									
					} else if(parseInt(event.currentTarget.value) < 0 || isNaN(event.currentTarget.value)){
						//component.set("v.showFormatError", true);
						filters[key].selectedFilters.to = event.currentTarget.value;
					} else {
						filters[key].selectedFilters.to = event.currentTarget.value;
					}
				}
			}
			component.set("v.filters", filters);
		}
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Open the advanced filters modal if needed
    History
    <Date>			<Author>			<Description>
	24/03/2020		Guillermo Giral   	Initial version
	*/
	openModal :function(component, event, helper) {
		var compEvent = component.getEvent("OpenModal");
			
		compEvent.setParams({ 
			openModal : true
			
		});
	
		compEvent.fire();
		component.set("v.showModal", true);
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Checks / unchecks some values from the
					multiselect checkboxes dropdown
    History
    <Date>			<Author>			<Description>
	24/03/2020		Guillermo Giral   	Initial version
	*/
	checkOption :function(component, event, helper) {
		var checkValue = event.currentTarget.value;
		var dropdownName = event.currentTarget.name;
		var filters = component.get("v.filters");
		var selectedOptions = component.get("v.selectedOptions");
        var selectedOptionsBuilded = [];
        //helper.applyFilters(component,event,helper);


        //TODOS LOS FILTROS
		for(var key in filters){
            selectedOptionsBuilded.push({value : []});
            selectedOptionsBuilded[key].name = filters[key].name;
            selectedOptionsBuilded[key].type = filters[key].type;
            selectedOptionsBuilded[key].value = filters[key].data;
			//if(dropdownName == filters[key].name){
			
            	//CADA OPCIÓN DE CADA FILTRO
				for(var option in filters[key].data)
                {
                    
                    //SI EL QUE HEMOS MARCADO ES IGUAL A LA OPCIÓN ACTUAL
					if(checkValue == filters[key].data[option].value)
                    {
                        
                        //SE MARCA EL ATRIBUTO A TRUE
						filters[key].data[option].checked = event.currentTarget.checked;
                        
                        //NUMERO DE ATRIBUTOS MARCADOS
						filters[key].numberChecked = filters[key].data.filter(option => option.checked).length;
                        
                        //NOMBRE DEL FILTRO ELEGIDO
						var selectedFilter = filters[key].name;
                        
                        //SI ESTÁ MARCADO SE AÑADE A LA LISTA
						if(filters[key].data[option].checked)
                        {
							selectedOptions.push(filters[key].data[option].value);
                            
						} else 
                        {
							let index = selectedOptions.indexOf(checkValue);
							selectedOptions.splice(index, 1);
						}
					}
				}
            //}
            selectedOptionsBuilded[key] = JSON.parse(JSON.stringify(selectedOptionsBuilded[key]));
            selectedOptionsBuilded[key].value = selectedOptionsBuilded[key].value.filter(data => data.checked == true); 
		}
		
        selectedOptionsBuilded = selectedOptionsBuilded.filter(data => data.value.length > 0 );
        
		// Fire the option selection event so that the other dropdowns can be updated
		component.set("v.filters", filters);
		component.set("v.selectedOptions", selectedOptions);


		var evt = component.getEvent("onOptionSelection");
		if(evt){
			evt.setParams({
				"filterName" : selectedFilter,
				"selectedOptions" : selectedOptionsBuilded
			});
			evt.fire();
		}
        
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Processes the selected filters and
					dispatch them via component event
    History
    <Date>			<Author>			<Description>
	14/03/2020		Guillermo Giral   	Initial version
	*/
	applyFilters : function(component, event, helper) {
		helper.applyFilters(component,event, helper);
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to add a "Select One" value and make it selected
					when a date filter has been selected
    History
    <Date>			<Author>			<Description>
	01/04/2020		Guillermo Giral   	Initial version
	*/
	updateTimeframeDropdown : function(component, event, helper){
		helper.toggleTimeframeValue(component, true);
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Fires the download event to call the service
					and download the file
    History
    <Date>			<Author>			<Description>
	03/04/2020		Guillermo Giral   	Initial version
	*/
	donwloadFile: function(component, event, helper){
		var cmpEvent = component.getEvent("launchDonwload");
		cmpEvent.fire();
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Prints the screen
    History
    <Date>			<Author>			<Description>
	06/04/2020		Guillermo Giral   	Initial version
	*/
	printScreen : function(component, event, helper){
		window.print();
	},

	validateDate : function(component, event, helper){
        var dates = component.get("v.dates");
		helper.checkDates(component, helper);
        //var datesBis = component.get("v.datesBis");

        //Remove error
        component.find('dateFromInput').setCustomValidity('');
        
        component.find('dateToInput').setCustomValidity('');
        
        if(dates[1] < dates[0]){
            if(event.getSource().getLocalId() == "dateFromInput"){
                // dates[0] = undefined;
                //Show error
                component.find('dateFromInput').setCustomValidity($A.get("$Label.c.validationDate"));
                component.find('dateFromInput').reportValidity();
            } else if(event.getSource().getLocalId() == "dateToInput"){
                // dates[1] = undefined;
                //Show error
                component.find('dateToInput').setCustomValidity($A.get("$Label.c.validationDate"));
                component.find('dateToInput').reportValidity();
            }		
            component.set("v.dates", dates);
        }
	},
	
	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Gets the date from a string
    History
    <Date>			<Author>			<Description>
	07/05/2020		Guillermo Giral   	Initial version
	*/
	getDatesFromString : function(component, event, helper){
		var params = event.getParam("arguments");
		if(params){
			var dateStrings = params.dateStrings;
			return helper.getISOStringFromDateString(component, dateStrings, undefined, helper);
		}
	}
})