global with sharing class ServicePaymentLine {
    
    public static final String PRODUCT_ID_001 = System.Label.CNF_payment_productId_001; // book_to_book
    public static final String PRODUCT_ID_002 = System.Label.CNF_payment_productId_002; // international_instant_payment
    public static final String PRODUCT_ID_003 = System.Label.CNF_payment_productId_003;
    public static final String PRODUCT_ID_004 = System.Label.CNF_payment_productId_004;

    public static final String MULTI_ONE_TRADE = System.Label.PAY_ServiceAPILine_001; // 'MULTI_ONE_TRADE';
    public static final String NEXUS = System.Label.PAY_ServiceAPILine_002; // 'NEXUS';
    public static final String LOCAL_BANKING = System.Label.PAY_ServiceAPILine_003; // 'LOCAL_BANKING';
    public static final String INSTANT_TRANSFER = System.Label.PTT_instant_transfer;
 	public static final String INTERNATIONAL_TRANSFER_SINGLE = System.Label.PTT_international_transfer_single;
    public static final String SERVICE_ID_001 = 'add_international_payment_internal';
    public static final String SERVICE_ID_002 = 'add_inter_paym_int_cust_diff_group';
    public static final String SERVICE_ID_003 = 'add_international_payment_external';
    
    global static Map<String,Object> getPaymentLine (String transferType, WRAPPER_PAY_PaymentDraft paymentDraft) {
        Map<String,Object> paymentLine = new Map<String,Object>();
        WRAPPER_PAY_PaymentDraft paymentDraft_aux = paymentDraft;
        
        if(transferType.equalsIgnoreCase(INSTANT_TRANSFER)){
            //book_to_book
            paymentDraft.productId = PRODUCT_ID_001;
            paymentDraft.serviceId = SERVICE_ID_001;
        }else if(transferType.equalsIgnoreCase(INTERNATIONAL_TRANSFER_SINGLE)){
            if(paymentDraft.destinationAccount == null || String.isBlank(paymentDraft.destinationAccount.currencyCodeAvailableBalance) || String.isBlank(paymentDraft.paymentCurrency)){
                System.debug('ServicePaymentLine.getPaymentLine');
                throw new customException('ERROR: ServicePaymentLine.getPaymentLine');
            }else{
                Boolean isSantader = ServicePaymentLine.isSantander(paymentDraft.destinationAccount);
                if(isSantader && paymentDraft.paymentCurrency.equalsIgnoreCase(paymentDraft.destinationAccount.currencyCodeAvailableBalance)){
                    //PAGO IIP
                    paymentDraft.productId = PRODUCT_ID_002;
                    paymentDraft.serviceId = SERVICE_ID_002;
                }else{
                    paymentDraft.productId = PRODUCT_ID_003;
                    paymentDraft.serviceId = SERVICE_ID_003;
                }
                
            }
        }
            paymentLine.put('output',paymentDraft);
            return paymentLine; 
        }
        
    private static Boolean isSantander(WRAPPER_AccountList.AccountDetails destinationAccount){
        Boolean isSantander = false;
        List<String> santanderBankCounries =  new List<String>();
        santanderBankCounries.add('ES');
        santanderBankCounries.add('GB');
        santanderBankCounries.add('PL');
        if(destinationAccount == null || String.isBlank(destinationAccount.country)){
            System.debug('ServicePaymentLine.isSantander');
            throw new customException('ERROR: ServicePaymentLine.isSantander');
        }else{
            if(santanderBankCounries.contains(destinationAccount.country)){
                isSantander = true;
            }else{
                if(destinationAccount.country.equalsIgnoreCase('BR')){
                    if(String.isBlank(destinationAccount.idType) || String.isBlank(destinationAccount.bankName) || String.isBlank(destinationAccount.displayNumber)){
                        System.debug('ServicePaymentLine.isSantander');
                        throw new customException('ERROR: ServicePaymentLine.isSantander');
                    }else{
                        if(destinationAccount.idType.equalsIgnoreCase('BBA') && destinationAccount.bankName.equalsIgnoreCase('SAN Brasil')){
                            isSantander = true;
                        }else if(destinationAccount.idType.equalsIgnoreCase('IBA')){
                            if( destinationAccount.displayNumber.length() > 12){
                                String displayNumber_aux = destinationAccount.displayNumber.substring(4, 12);
                                if(displayNumber_aux.equalsIgnoreCase('90400888')){
                                    isSantander = true;
                                }
                            }  
                        }
                    }
                }
            }    
        }
        return isSantander;        
    }

}