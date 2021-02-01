global with sharing class WS_ExchangeRate_Cancel {
   
    
    
    global with sharing class INPUT {

        global String operationReference                                {get;set;}
        global DataCancelConfirmFx dataCancelConfirmFx                  {get;set;}

        global INPUT (String operationReference, DataCancelConfirmFx dataCancelConfirmFx) {
            this.operationReference = operationReference;
            this.dataCancelConfirmFx = dataCancelConfirmFx;
        }
    }

    global with sharing class DataCancelConfirmFx {
		global String priceType                                         {get;set;}
		global SellNominal sellNominal                                  {get;set;}
		global BuyNominal buyNominal                                    {get;set;}
		global String valueDateRequested                                {get;set;}

        global DataCancelConfirmFx (String priceType, SellNominal sellNominal, BuyNominal buyNominal, String valueDateRequested) {
            this.priceType = priceType;
            this.sellNominal = sellNominal;
            this.buyNominal = buyNominal;
            this.valueDateRequested = valueDateRequested;
        }
    }

    global with sharing class SellNominal {
		global String sellNominalAmount                                 {get;set;}
        global String sellNominalCurrency                               {get;set;}
        
        global SellNominal (String sellNominalAmount, String sellNominalCurrency) {
            this.sellNominalAmount = sellNominalAmount;
            this.sellNominalCurrency = sellNominalCurrency;
        }
    }

    global with sharing class BuyNominal {
		global String buyNominalCurrency                                {get;set;}
        global String buyNominalAmount                                  {get;set;}
        
        global BuyNominal (String buyNominalAmount, String buyNominalCurrency) {
            this.buyNominalAmount = buyNominalAmount;
            this.buyNominalCurrency = buyNominalCurrency;
        }
	}
}