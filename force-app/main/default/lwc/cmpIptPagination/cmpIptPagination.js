import { LightningElement, api, track } from 'lwc';

import viewing from '@salesforce/label/c.viewing';
import o from '@salesforce/label/c.of';
import payments from '@salesforce/label/c.Payments';
import goToPage from '@salesforce/label/c.goToPage';
import previousPage from '@salesforce/label/c.previousPage';
import nextPage from '@salesforce/label/c.nextPage';

import { loadStyle } from 'lightning/platformResourceLoader';

import ICONS_OBJ from '@salesforce/resourceUrl/Santander_Icons';

export default class CmpIptPagination extends LightningElement {
    
    @api allData;
    @api currentPage = '1';
    @api currentPageInt = 1;
    @api pageList = ['1'];
    @api start = 0;
    @api end;
    @api pagesToShow = 3;
    @api totalRetrieved;
    @api retrievedSeen;
    @api paymentsPerPage;
    @api dropdownCurrentPage = '1';
    @api allDataReceived = [];


    viewing = viewing;
    of = o;
    payments = payments;
    goToPage = goToPage;
    previousPage = previousPage;
    nextPage = nextPage;


    /*get condition(){
        if(this.currentPage < this.pageList.length)
            return true;
        else if (this.currentPageInt>1)
            return true;
        else if(this.pageList.length > this.pagesToShow && (this.currentPagenInt > 1 && this.start !=0))
            return true;
        else if (this.currentPageInt>2)
            return true;
        else if(this.currentPage)
            return true;
        else if(this.currentPageInt!=this.pageList.length && (this.pageList.length>this.currentPageInt+this.pagesToShow-1 || this.currentPageInt == this.end))
            return true;
        else if (this.pageList.length-2>=this.currentPageInt && this.pageList.length-2 >= this.end)
            return true;
        else if (this.pageList.length>1 && this.pageList.length!=this.currentPageInt)
            return true;
        else
            return false;
    }*/

    get condition1(){
        if(this.currentPage < this.pageList.length){
            console.log("TRUE");
            return true;
        }else{
            console.log("FALSE");
            return false;
        }
            
    }

    get condition2(){
        if (this.currentPageInt>1)
            return true;
        else    
            return false;
    }

    get condition3(){
        if(this.pageList.length > this.pagesToShow && (this.currentPagenInt > 1 && this.start !=0))
            return true;
        else
            return false;
    }

    get condition4(){
        if (this.currentPageInt>2)
            return true;
        else
            return false;
    }

    get condition5(){
        if(this.currentPage) //currentPage == item
            return true;
        else
            return false;
    }

    get condition6(){
        if(this.currentPageInt!=this.pageList.length && (this.pageList.length>this.currentPageInt+this.pagesToShow-1 || this.currentPageInt == this.end))
            return true;
        else 
            return false;
    }

    get condition7(){
        if (this.pageList.length-2>=this.currentPageInt && this.pageList.length-2 >= this.end)
            return true;
        else
            return false;
    }

    get condition8(){
        if (this.pageList.length>1 && this.pageList.length!=this.currentPageInt)
            return true;
        else
            return false;
    }

    get span1(){
        console.log("SPAN1");
        return 1+(this.currentPage-1)*this.paymentsPerPage +'-'+((this.currentPage)*this.paymentsPerPage);
    }

    get span2(){
        console.log("SPAN2")
        return 1+(this.currentPage-1)*this.paymentsPerPage +'-'+ this.totalRetrieved;
    }

    connectedCallback(){
        
        console.log("DENTRO")
        Promise.all([loadStyle(this, ICONS_OBJ + '/style.css')]).then(() => {
            console.log('Files loaded.');
            this.initPagination();
            this.buildData();
            this.selectedCurrentPage();
        })
        .catch(error => {
            alert(error);
        });

        
    }

    renderedCallback(){
        console.log("PageList", this.pageList.length);
        console.log("CurrentPage", this.currentPage);        
        console.log("PageperPayments", this.paymentsPerPage);
    }

    initPagination(){
        
        try{

            console.log("InitPag");
            var totalPages = this.allDataReceived;

            if(totalPages != null && totalPages != '' && totalPages != undefined){
                var pageList = [];
                this.totalRetrieved = totalPages.length;
                var pages = Math.ceil(totalPages.length/this.paymentsPerPage);
                if(pages > 1){
                for( var i =1;i<=pages;i++){
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
                if(this.totalRetrieved <= this.paymentsPerPage){
                    this.retrievedSeen = this.totalRetrieved;
                }else if(parseInt(this.currentPage) != this.pageList.length){
                    this.retrievedSeen = this.paymentsPerPage;
                }else{
                    this.retrievedSeen = this.totalRetrieved-this.paymentsPerPage*(parseInt(this.currentPage)-1);
                }
                this.currentPage = '1';
                this.currentPageInt = 1;

            }
        }catch(e){
            console.log(e);
        }
    }

    buildData(){
        
        try{
            console.log("BuildData");
            var currentPage;

            if(this.currentPage != undefined){
                currentPage = this.currentPage;
                this.currentPage = currentPage.toString();
                this.currentPageInt = currentPage;
            }else{
                currentPage = this.currentPage;
            }

            this.currentPageInt = parseInt(this.currentPage);

            if(this.totalRetrieved <= this.paymentsPerPage){
                this.retrievedSeen = this.totalRetrieved;
            }else if(parseInt(this.currentPage) != this.pageList.length){
                this.retrievedSeen = this.paymentsPerPage;
            }else{
                this.retrievedSeen = this.totalRetrieved - this.paymentsPerPage*(this.currentPage-1);
            }

            const pageEvent = new CustomEvent('getPageEvent',{
                detail: {currentPage: parseInt(this.currentPage)}
            });

            this.dispatchEvent(pageEvent);

            if(currentPage == '1'){
                this.start = 0;

                if(this.pageList.length > this.pagesToShow){
                    this.end = this.pagesToShow;
                }else{
                    this.end = this.pageList.length;
                }
            }

        }catch(e){
            console.log(e);
        }
    }

    previousPage(){
        try{
            var currentPage = parseInt(This.currentPage);
            var pages = this.pageList.length;

            if(this.pagesToShow != pages){
                var start = this.start;
                var end = this.end;
                
                if(start >  0){
                    this.start = start-1;
                    this.end = end-1;
                }
            }

            if(currentPage > 1){
                this.currentPage = (currentPage-1).toString();
            }

        }catch(e){
            console.log(e);
        }
    }

    nextPage(){
        try{
            var currentPage = parseInt(this.currentPage);
            if(this.pagesToShow != pages){
                var start = this.start;
                var end = this.end;
                
                if(end != pages){
                    this.start = start+1;
                    this.end = end+1;
                }
            }

            if(currentPage < pages){
                this.currentPage = (currentPage+1).toString();
            }
        }catch(e){
            console.log(e);
        }
    }

    selectedCurrentPage(){
        
        try{
            console.log("SelectedCurrentPage");
            var recId = this.dropdownCurrentPage;

            if(recId != undefined){
                this.currentPage = recId;
                var pages = this.pageList.length;

                if(this.pagesToShow != pages){
                    if(parseInt(recId) != pages){
                        if(parseInt(recId) >= pages-this.pagesToShow+1){
                            this.start = pages - this.pagesToShow+1-1;
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

        }catch(e){
            console.log(e);
        }
    }

    reInitPagination(){
        try{
            /*var currentPage;
            var currentPageInitial=component.get("v.currentPage");

            if(event.getParam('arguments')!=undefined){
                currentPage=event.getParam('arguments').currentPage;
            }

            component.set("v.currentPage",currentPage);*/


        }catch(e){
            console.log(e);
        }
    }

}