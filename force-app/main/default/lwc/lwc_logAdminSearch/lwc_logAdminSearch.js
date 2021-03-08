import { LightningElement,api,track } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader'; 

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import Labels
import LogAdmin_UserId from '@salesforce/label/c.LogAdmin_UserId';
import LogAdmin_Text from '@salesforce/label/c.LogAdmin_Text';
import LogAdmin_TextPlaceholder from '@salesforce/label/c.LogAdmin_TextPlaceholder';
import LogAdmin_ActionOn from '@salesforce/label/c.LogAdmin_ActionOn';
import LogAdmin_SelectOne from '@salesforce/label/c.LogAdmin_SelectOne';
import LogAdmin_Date from '@salesforce/label/c.LogAdmin_Date';
import from from '@salesforce/label/c.from';
import to from '@salesforce/label/c.to';
import LogAdmin_Search from '@salesforce/label/c.LogAdmin_Search';
import LogAdmin_Name from '@salesforce/label/c.LogAdmin_Name';
import LogAdmin_Action from '@salesforce/label/c.LogAdmin_Action';

export default class lwc_logAdminSearch extends LightningElement {  

    label = {
        LogAdmin_UserId,
        LogAdmin_Text,
        LogAdmin_TextPlaceholder,
        LogAdmin_ActionOn,
        LogAdmin_SelectOne,
        LogAdmin_Date,
        from,
        to,
        LogAdmin_Search,
        LogAdmin_Name,
        LogAdmin_Action,
    }

    @track searchData = {}; //Map with the data to be sent to the search service
    @track tableData //List of row data to be displayed in the table
    @api displaydata = false; //Flag to indicate whether to show the search box or the results table
    @track userId //User Id to filter the results
    @track keyWords //Key words to filter the results
    @track typeLogs = ['Account Grouping','User Group','Users','Authorization Policy','Group profiling']; //List of options for 'Action On' picklist
    @track selectedLog //Type of log to be searched
    @track dates //Range of dates selected to search


    @track logsPerPage = 40; //Number of logs to show in each page of the table
    @track currentPage = 1;
    @track oldPage = 1;
    @track start = 0; //Row number of the first displayed row
    @track end //Row number of the last displayed row
    @track paginatedLogs

    isSimpleDropdown = true;
    simple = false;

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }

    searchLogs() {		
		this.userId = this.template.querySelector('[data-id="text-input-id-1"]').value;
		this.keyWords = this.template.querySelector('[data-id="text-input-id-2"]').value;

		var data = {
			userid : this.userId,
			keywords : this.keyWords,
			typelogs : this.selectedLog,
			dates : this.dates
		};

		this.searchData = data;

		this.getLogsData(data);
	}

    buildTableData(event){
        try {
            var json = this.tableData;
            var currentPage = event.getParam("currentPage");
            var oldPage = this.oldPage;
            var perPage = this.logsPerPage;
            var start = this.start;

            if (currentPage != null && currentPage != undefined && currentPage != '' && oldPage!=currentPage){
                //Update the index of dataset to display
                if(currentPage >oldPage && currentPage!=1){
                    this.start = perPage*currentPage-perPage;
                    if(Math.ceil(json.length/currentPage) >= perPage){
                        this.end = perPage*currentPage;
                    }else{
                        this.end = json.length;
                    }
                }else{
                    this.end = start;
                    if(currentPage==1){ 
                        this.start = 0;
                        this.end = perPage;

                    }else{
                        this.start = start-perPage;
                    }
                }
                this.oldPage = currentPage;
                //Update a set of the paginated data
                var paginatedValues=[];
                for(var i= this.start; i<=this.end; i++){
                    paginatedValues.push(json[i]);
                }
                this.paginatedLogs = paginatedValues;
            }
        } catch(e) {
            console.error(e);
        }
    }

    getLogsData(component, helper, searchData) {
		console.log(JSON.stringify(searchData));
        this.template.querySelector("c-lwc_service-component").onCallApex({callercomponent: "lwc_logAdminSearch", controllermethod: "getLogs", actionparameters: {}});
    }
    
    successcallback(event){
        if(event.detail.callercomponent === 'lwc_logAdminSearch'){
            console.log('Event details: ' + JSON.stringify(event.detail));
            this.populateLogResultsTable(event.detail.value);
        }
    }
	
	populateLogResultsTable(response){
		if(response){
			this.tableData = response;
			this.displaydata = true;
			console.log(JSON.stringify(response));
			this.buildPagination(response);
		}
	}

	buildPagination(response){
		// Build pagination
        this.end = response.length<this.logsPerPage ? response.length : this.logsPerPage;
		var paginatedValues=[];
		for(var i= this.start; i<=this.end; i++){
			console.log(response[i]);
			paginatedValues.push(response[i]);
		}
		this.paginatedLogs = paginatedValues;
		var toDisplay=[];
        
        var finish = (response.length > 1000) ? 1000 : response.length;

		for(var i= 0;i<finish;i++){
			toDisplay.push(response[i]);
		}
        this.template.querySelector("c-lwc_cn_pagination").initPagination(toDisplay);
	}
}