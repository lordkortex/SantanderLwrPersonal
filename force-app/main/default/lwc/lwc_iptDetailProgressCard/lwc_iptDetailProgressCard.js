import { LightningElement, api, track } from 'lwc';
import { loadStyle } from'lightning/platformResourceLoader';
import getDateAndTime from '@salesforce/apex/CNT_IPTDetailParent.getDateAndTime';
import diffDates from '@salesforce/apex/CNT_IPTDetailParent.diffDates';

//import defaultImg from '@salesforce/resourceUrl/Default';
import flagsIcon from '@salesforce/resourceUrl/Flags';

import NOT_TRACEABLE from '@salesforce/label/c.notTraceable';
import APPLIED from '@salesforce/label/c.Applied';
import NOT_APPLIED from '@salesforce/label/c.NotApplied';
import DAYS from '@salesforce/label/c.Days';

export default class Lwc_ipt_detailProgressCard extends LightningElement {
    @api status;
    @track iobject;
    @api item;
    @api mainclass = 'slds-progress__item progress__gray slds-is-completed';
    @api cardclass;
    @api progressicon = 'icon-check iconBlack';
    @api textbold;
    @api textregular;
    @track fxlabel = 'FX';
    @api showfee;// = '1';
    @api foreignexchangecard; //controlar pintado de columnas con foreignexchange

    _showfee;

    get showfee(){
        return this._showfee;
    }

    set showfee(showfee){
        this._showfee = showfee;
    }

    
    @track countryImg = '';

    _fxlabel = '';
    _cardclass = 'card';
    @track _item = {};
    _textbold = 'textBold';
    _textregular = 'textRegular';
    arrivalDate;
    departureDate;
    arrivalTime;
    departureTime;
    itemDurationTimeSEGANDMIN;
    itemDurationTime;

    textBold2 = 'textBold';

   // defaultImage = defaultImg;
    classCss = {
        colBank: 'slds-media__body colBank',
        colCountry: 'slds-media__body colCountry',
        colArrivalTime: 'slds-media__body colArrivalTime',
        colDuration: 'slds-media__body colDuration',
        colDepartureTime: 'slds-media__body colDepartureTime',
        cardClass: 'slds-progress__item_content slds-grid slds-grid_align-spread',
        textBold: 'slds-card__header-title slds-truncate textBold',
        textRegular: 'slds-card__header-title slds-truncate textRegular'
    }

    label = {
        NOT_TRACEABLE,
        NOT_APPLIED,
        APPLIED,
        DAYS
    };

    set fxlabel(fxlabel) {
        if (fxlabel) {
            this._fxlabel = fxlabel;
            this.updateColClassCss(fxlabel);
        }
    }
    get fxlabel() {
        return this._fxlabel;
    }
    set cardClass(cardclass) {
        if (cardclass) {
            this._cardclass = cardclass;
            this.updateCardClass(cardclass);
        }
    }
    get cardClass() {
        return this._cardclass;
    }

    set item(item) {
        if (item) {
            console.log(item);
            this._item = item;
            this.iobject = item.data;
            this.setSvgCountry(item);
            this.doInit();
        }
    }

    set textbold(textbold) {
        if(textbold){
            this._textbold = textbold;
            this.updateTextBoldClass(textbold);
        }
    }
    get textbold() {
        return this._textbold;
    }

    set textregular(textregular) {
        if(textregular){
            this._textregular = textregular;
            this.updateTextRegularClass(textregular);
        }
    }
    get textregular() {
        return this._textregular;
    }
    get item() {
        return this._item;
    }

    get itemBank() {
        return (this._item && this._item.data.bank ? this._item.data.bank : '');
    }
    get itemBic() {
        return (this._item && this._item.data.bic ? this._item.data.bic : '');
    }
    get itemCity() {
        return (this._item && this._item.data.city ? this._item.data.city : '');
    }
    get itemCountryName() {
        return (this._item && this._item.data.countryName ? this._item.data.countryName : '');
    }
    get itemArrivalDate() {
        return (this.arrivalDate ? this.arrivalDate : '');
    }
    get itemArrivalTime() {
        return (this.arrivalTime ? this.arrivalTime : '');
    }
    get itemArrival() {
        return (this._item && this._item.data.arrival ? this._item.data.arrival : '');
    }
    get itemDurationTime() {
        return (this._item && this._item.data.durationTime ? this._item.data.durationTime : '');
    }
    get itemDepartureDate() {
        return (this.departureDate ? this.departureDate : '');
    }
    get itemDepartureTime() {
        return (this.departureTime ? this.departureTime : '');
    }
    get itemDeparture() {
        return (this._item && this._item.data.departure ? this._item.data.departure : '');
    }
    get itemSourceCurrency() {
        //return (this._item && this._item.data.foreignExchangeDetails && this._item.data.foreignExchangeDetails.sourceCurrency ? this._item.foreignExchangeDetails.sourceCurrency : '');
        try{
        return this._item.data.foreignExchangeDetails.sourceCurrency ? this._item.data.foreignExchangeDetails.sourceCurrency : '';
        }
        catch(e){return '';};
    }
    get itemTargetCurrency() {
        //return (this._item && this._item.data.foreignExchangeDetails && this._item.data.foreignExchangeDetails.targetCurrency ? this._item.foreignExchangeDetails.targetCurrency : '');
        try{
        return this._item.data.foreignExchangeDetails.targetCurrency ? this._item.data.foreignExchangeDetails.targetCurrency : '';
        }
        catch(e){return '';};
    }
    get itemExchangeRate() {
        //return (this._item && this._item.data.foreignExchangeDetails && this._item.data.foreignExchangeDetails.exchangeRate ? this._item.exchangeRate.targetCurrency : '');
        try{
        return this._item.data.foreignExchangeDetails.exchangeRate ? this._item.data.foreignExchangeDetails.exchangeRate : '';
        }
        catch(e){ return '';};
    }
    get itemStepFee() {
        return (this._item && this._item.data.stepFee ? this._item.data.stepFee : '');
    }
    get itemStepFeeCurrency() {
        return (this._item && this._item.data.stepFeeCurrency ? this._item.data.stepFeeCurrency : '');
    }
    get colBankCss() {
        return this.classCss.colBank;
    }
    get colCountryCss() {
        return this.classCss.colCountry;
    }
    get colArrivalTimeCss() {
        return this.classCss.colArrivalTime;
    }
    get colDurationCss() {
        return this.classCss.colDuration;
 
    }
    get colDepartureTimeCss() {
        return this.classCss.colDepartureTime;
    }
    get cardClassCss() {
        return this.classCss.cardClass;
    }
    get textBoldCss() {
        return this.classCss.textBold;
    }
    get textRegularCss() {
        return this.classCss.textRegular;
    }
   /* get isItemTraceable() {
        let traceable = true;
        if (this._item && this._item.data.arrival == this.label.NOT_TRACEABLE) traceable = false;
        return traceable
    }*/

    
    get isArrivalTraceable() {
        let arrivalTraceable = true;
        if (this._item && this._item.data.arrival == this.label.NOT_TRACEABLE) arrivalTraceable = false;
        return arrivalTraceable
    }

    get isDepartureTraceable() {
        let departureTraceable = true;
        if (this._item && this._item.data.departure == this.label.NOT_TRACEABLE) departureTraceable = false;
        return departureTraceable
    }

    get isHasForeignExchange() {
        return (this.iobject && this.iobject.hasForeignExchange);
    }
    get isforeignExchangeDetails() {
        //return (this._item && this._item.data.foreignExchangeDetails && this._item.data.foreignExchangeDetails.exchangeRate !== 0);
        try{
        return (this._item.data.foreignExchangeDetails.exchangeRate !== 0);
        }
        catch(e){return false;}
    }
    get isShowFee() {
        return (this._showfee == 1 || this._showfee == 0);
    }
    get isFeeApplied() {
        return (this._item && this._item.data.feeApplied);
    }
    connectedCallback() {
        this.doInit();
    }
    updateColClassCss(fxLabel) {
        this.classCss.colBank = 'slds-media__body colBank' + fxLabel,
        this.classCss.colCountry = 'slds-media__body colCountry' + fxLabel,
        this.classCss.colArrivalTime = 'slds-media__body colArrivalTime' + fxLabel,
        this.classCss.colDuration = 'slds-media__body colDuration' + fxLabel,
        this.classCss.colDepartureTime = 'slds-media__body colDepartureTime' + fxLabel

    }
    updateCardClass(cardClass) {
        this.classCss.cardClass = 'slds-progress__item_content slds-grid slds-grid_align-spread ' + cardClass;
        this._cardclass = 'slds-progress__item_content slds-grid slds-grid_align-spread ' + cardClass;
    }
    updateTextBoldClass(textbold) {
        this.classCss.textBold = 'slds-card__header-title slds-truncate ' + textbold;
    }
    updateTextRegularClass(textRegular) {
        this.classCss.textRegular = 'slds-card__header-title slds-truncate ' + textRegular;
    }
    setSvgCountry(item) {
        var country = 'Default';
        if (this._item.data.country) {
            country = this._item.data.country;
        }
        this.countryImg = flagsIcon + '/' + country + '.svg';
    }

    doInit() {
        console.log("doInit");
        //if(this.iobject && this.iobject.hasForeignExchange){
        if(this.foreignexchangecard){
           this._fxlabel = 'FX';
           this.updateColClassCss(this._fxlabel);
        }
        if (this._item) {
            if(this._item.data.arrival){
                this.getDateTimeCard(this._item.data.arrival,'arrival');
            }
            
            if(this._item.data.departure){
                this.getDateTimeCard(this._item.data.departure,'destination');
            }

            if(this._item.data.arrival && this._item.data.departure!=null){
                this.getDateDifference(this._item.data.arrival,this._item.data.departure);
            }
        }
        if (this.cardclass){
            this.updateCardClass(this.cardclass);
        }
        if (this.textregular){
            this.updateTextRegularClass(this.textregular);
        }
    }
    getDateTimeCard (date,destination){
        try{
            if(date !== this.label.NOT_TRACEABLE){
                 getDateAndTime({dateT: date}).then(res => {
                    if(destination === 'arrival'){
                        this.arrivalDate = res.substring(8,10)+"/"+res.substring(5,7)+"/"+res.substring(0,4);
                        this.arrivalTime = res.substring(11);
                    }else{
                        this.departureDate = res.substring(8,10)+"/"+res.substring(5,7)+"/"+res.substring(0,4);
                        this.departureTime = res.substring(11);
                    }
                }).catch(errors => {
                    if (errors) {
                        console.log("Error message: " + errors);
                    } else {
                        console.log("Unknown error");
                    }
                })
            }
        }catch(e){
            console.log("CMP_IPTDetailParent / getDummyData : " + e);
        }
    }
    getDateDifference(arrival, departure){
        try{
            if(arrival !==null && departure !== null && arrival !== this.label.NOT_TRACEABLE) {
                diffDates({arrival:arrival, departure: departure}).then(res => {
                    var firstLine='';
                    var secondLine='';
                    firstLine+=res[2]+" m ";
                    firstLine+=res[3]+" s";
                    secondLine+=+res[0]+" "+ this.label.DAYS + ' ';
                    secondLine+=res[1]+" h";
                    this.itemDurationTimeSEGANDMIN = firstLine;
                    this.itemDurationTime = secondLine;
                }).catch(error => {
                    if (error) {
                        console.log("Error message: " + error);
                        
                    } else {
                        console.log("Unknown error");
                    }
                });
            }
        } catch(e) {
            console.log("CMP_IPTDetailParent / getDummyData : " + e);
        }
    }
}