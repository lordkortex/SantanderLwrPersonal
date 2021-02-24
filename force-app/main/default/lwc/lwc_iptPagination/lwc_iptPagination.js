import { LightningElement,api,track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import previousPage from '@salesforce/label/c.previousPage';
import viewing from '@salesforce/label/c.viewing';
import of from '@salesforce/label/c.of';
import Payments from '@salesforce/label/c.Payments';
import nextPage from '@salesforce/label/c.nextPage';
// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
export default class Lwc_iptPagination extends LightningElement {

    @api alldata;
    @api paymentsperpage;
    
    @track allDataReceived;
    @track currentPageInt;
    @track currentPage;
    @track pageList;
    @track start;
    @track end;
    @track pagesToShow;
    @track totalRetrieved;
    @track retrievedSeen;
    @track dropdownCurrentPage;
    @track item; 
    

    label={
        previousPage,
        viewing,
        of,
        Payments,
        nextPage,
	};

    get pageListLength() {
        if(this.pageList){
            return this.currentPage < this.pageList.length;
        }
    }

    get getCurrentPage() {
        if(this.currentPageInt){
            return this.currentPageInt > 1;
        }
    }

    get pageListLengthGreaterThan(){
        if(this.pageList){
            return ((this.pageList.length > this.pagesToShow) && ((this.currentPageInt > 1) && this.start != 0));
        }
    }

    get getCurrentPageGreaterTwo(){
        return this.currentPageInt>2;
    }

    get lastPage(){
        if(this.pageList){
            return this.pageList.length-2 >= this.currentPageInt && this.pageList.length-2 >= this.end;
        }
    }

    get getPage(){
        if(this.pageList){
            return ((this.pageList.length > this.currentPageInt+this.pagesToShow-1 || this.currentPageInt==this.end) && this.currentPageInt != this.pageList.length);
        }
    }
 
    get paymentsPage(){
        var ret = 1;
        if(this.currentPage){
            ret = 1+(this.currentPage-1)*this.paymentsperpage;
        }
        return  ret;
    }

    get paymentsCurrentPage(){
        return this.currentPage*this.paymentsperpage
    }

    get getcurrentPageInt(){
        if(this.pageList){
            return this.pageList.length>1 && this.pageList.length!=this.currentPageInt;
        }
    }

    get getpageListLength(){
        if(this.pageList){
            return this.pageList.length
        }
    }
    
    get iterationPageList(){
        if(this.pageList){
            /*var retaux = this.pageList.slice(this.currentPageInt-1,this.end + 1);
            var ret = [retaux[0],retaux[1],retaux[2],'...',retaux[this.end-1]];
            return ret;*/
            /*Desarrollo original pre-migración*/
            var items = new Array();
            var aux = this.pageList.slice(this.start,this.end + 1);
            for(var i=0; i<aux.length; i++){
                var item = new Object();
                item.value = aux[i];
                item.showfirstpoints = false;
                item.showlastpoints = false;
                if (i == this.start){
                    item.show = true;
                } else if (i == this.end - 1){
                    item.show = true;
                } else if (i == this.start + 1 && this.currentPageInt == this.start + 2){
                    item.show = true;
                }else if (i >= this.end - 3 && this.currentPageInt >= this.end - 3){
                    if (i == this.end - 3 && this.currentPageInt > this.end - 3){
                        item.showfirstpoints = true;
                        item.showlastpoints = false;
                    }
                    item.show = true;
                } else if (i >= this.currentPageInt - 1 && i <= this.currentPageInt + 1){
                    item.show = true;
                    if (i == this.currentPageInt - 1  && this.currentPageInt <= this.end - 3){
                        item.showfirstpoints = true;
                    } else if (i == this.currentPageInt + 1){
                        item.showlastpoints = true;
                    }
                }
                if (i === this.currentPageInt-1){
                    item.iscurrerntpage = true;
                } else {
                    item.iscurrerntpage = false;
                }
                items.push(item);
            }    
            return items;
        }
    }

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        const onfinish = new CustomEvent('finish');
        this.dispatchEvent(onfinish);
        this.start=0;
    }

    previousPage(){
        try{
            var currentPage = parseInt(this.currentPage);
            var pages = this.pageList.length;

            if(this.pagesToShow != pages){
                var start = this.start;
                var end = this.end;
                if(start>0){
                    this.start = start-1
                    this.end = end-1
                }
            }

            if(currentPage > 1){
                this.currentPage = (currentPage-1).toString();                  
            }
            this.currentPageInt = parseInt(this.currentPage);
            //Call the event to send the current page number to the SwiftPaymentTable CMP
            const currentpage = new CustomEvent('currentpage', {
                detail: { start : this.start, end : this.end, currentPage : this.currentPage},
            });
            this.dispatchEvent(currentpage);
        }
        catch(e) {
            console.error(e);
        }
    }

    @api
    buildData(currentPageAux){
        var currentPage;
        try {
            if(currentPageAux != undefined){
                currentPage = currentPageAux.currentPageAux;
                this.currentPage = currentPage.toString();
                this.currentPageInt = currentPageAux.currentPageAux;
            }else{
                currentPage = this.currentPage;
            }
            
            this.currentPageInt = parseInt(this.currentPage);

            //Configure the number of records displayed per page
            if(this.totalRetrieved <= this.paymentsperpage){
                this.retrievedSeen = this.totalRetrieved;
            }else if(parseInt(this.currentPage)!=this.pageList.length){
                this.retrievedSeen = this.paymentsperpage;
            }else{
                this.retrievedSeen = (this.totalRetrieved - this.paymentsperpage)*(this.currentPage-1);
            }
    
            //Call the event to send the current page number to the SwiftPaymentTable CMP
            const getpageevent = new CustomEvent('getpageevent', {
                detail: { filter : this.currentPage},
            });
            this.dispatchEvent(getpageevent);

            if(currentPage=='1'){
                this.start = 0;
                if(this.pageList.length > this.pagesToShow){
                    this.end = this.pagesToShow;
                }else{
                    this.end = this.pageList;
                }
                //component.find("paginationDropdown").updateSelection([currentPageInitial]);
            }
        } catch (e) {
            console.error(e);
        }
    }

    nextPage(){
        try {
            let currentPage = parseInt(this.currentPage);
            let pages = this.pageList.length;
    
            if(this.pagesToShow != pages){
                var start=this.start;
                var end=this.end;
                if(end!=pages){
                    this.start = start+1;
                    this.end = end+1;
                }
            }
    
            //Set the new pages index
            if(currentPage < pages){
                this.currentPage = (currentPage+1).toString();  
            }
            
            var start = this.start;
            var end= this.end;
            this.currentPageInt = parseInt(this.currentPage);
            //Call the event to send the current page number to the SwiftPaymentTable CMP
            const currentpage = new CustomEvent('currentpage', {
                detail: { start : this.start, end : this.end, currentPage : this.currentPage},
            });
            this.dispatchEvent(currentpage);
        } catch(e){
            console.error(e);
        }
    }

    selectedCurrentPage(){
        try{
            var recId = this.dropdownCurrentPage;
            if(recId!=undefined){
                currentPage = this.recId;
                let pages = this.pageList.length;

                if(this.pagesToShow != pages){
                    if(parseInt(recId)!=pages){
                        if(parseInt(recId)>=pages-this.pagesToShow+1){
                            this.start = (pages-this.pagesToShow+1-1);
                            this.end = pages;
                        }else{
                            this.start = parseInt(recId)-1;
                            this.end = parseInt(recId)+2;
                        }
                    }else{
                        this.start = parseInt(recId) - this.pagesToShow;
                        this.end = parseInt(recId);
                    }
                }
            }
        }catch (e) {
            console.log(e);
        }
    }
   
    
    @api
    reInitPagination(currentPageAux){
        try {
            var currentPage = this.currentPage;
            var currentPageInitial=this.currentPage;

            if(currentPageAux != undefined){
                currentPage = currentPageAux;
            }
            this.currentPage = currentPage;
        } catch (e) {
            console.error(e);
        }
    }

    @api
    setPagesNumber(allDataReceivedAux){
        try{
            var totalPages = allDataReceivedAux.allDataReceivedAux;
            if(totalPages != null && totalPages != '' && totalPages != undefined){
                let pageList = [];
                this.totalRetrieved = totalPages.length;
                let pages =Math.ceil(totalPages.length/this.paymentsperpage);
                if(pages > 1){
                for( var i =1; i<=pages; i++){
                        pageList.push(i.toString());
                }
                }else{
                    pageList.push('1');
                }
                //Obtain the number of pages
                this.pageList = pageList;
        
                //Set the index of pages to display
                if(pages >= this.pagesToShow){
                    this.end = this.pagesToShow;
                }else{
                    this.end = pages;
                }
                
                //Configure the number of records displayed per page
                if(this.totalRetrieved <= this.paymentsperpage){
                    this.retrievedSeen = this.totalRetrieved;
                }else if(parseInt(this.currentPage != this.pageList.length)){
                    this.retrievedSeen = this.paymentsperpage;
                }else{
                    this.retrievedSeen = this.totalRetrieved - this.paymentsperpage*(parseInt(this.currentPage)-1);
                }
                this.currentPage = '1';
                this.currentPageInt = 1;

            }
        }catch (e) {
            console.error(e);
        }
    }
}