global with sharing class ServicePaymentLine {
    
    public static final String PRODUCT_ID_001 = System.Label.CNF_payment_productId_001; // Book_to_Book
    public static final String PRODUCT_ID_002 = System.Label.CNF_payment_productId_002; // International_Instant_Payment
    public static final String PRODUCT_ID_003 = System.Label.CNF_payment_productId_003; // Do_and_Follow
    public static final String PRODUCT_ID_004 = System.Label.CNF_payment_productId_004; // international_transfers
    public static final String PRODUCT_ID_005 = System.Label.CNF_payment_productId_005; // Inbound_Payment_Brazil_non_Santander
    public static final String PRODUCT_ID_006 = System.Label.CNF_payment_productId_006; // Inbound_Payment_Santander_Brazil

    public static final String MULTI_ONE_TRADE = System.Label.PAY_ServiceAPILine_001; // 'MULTI_ONE_TRADE';
    public static final String NEXUS = System.Label.PAY_ServiceAPILine_002; // 'NEXUS';
    public static final String LOCAL_BANKING = System.Label.PAY_ServiceAPILine_003; // 'LOCAL_BANKING';
    public static final String INSTANT_TRANSFER = System.Label.PTT_instant_transfer;
 	public static final String INTERNATIONAL_TRANSFER_SINGLE = System.Label.PTT_international_transfer_single;
    public static final String SERVICE_ID_001 = 'add_international_payment_internal';
    public static final String SERVICE_ID_002 = 'add_inter_paym_int_cust_diff_group'; //Cuentas Santander
    public static final String SERVICE_ID_003 = 'add_international_payments_other_cust'; //Cuentas no Santander (antes add_international_payment_external)
    
    global static Map<String,String> getPaymentLine (String transferType, WRAPPER_PAY_PaymentDraft paymentDraft) {
        Map<String,String> paymentLine = new Map<String,String>();
		String productId = '';
		String serviceId = '';        
        if(transferType.equalsIgnoreCase(INSTANT_TRANSFER)){
            //book_to_book
            productId = PRODUCT_ID_001;
            serviceId = SERVICE_ID_001;
            System.debug('debug book_to_book: ' + productId + ', ' + serviceId);
        }else if(transferType.equalsIgnoreCase(INTERNATIONAL_TRANSFER_SINGLE)){
            if(paymentDraft.destinationAccount == null || String.isBlank(paymentDraft.destinationAccount.currencyCodeAvailableBalance) || String.isBlank(paymentDraft.paymentCurrency)){
                System.debug('ServicePaymentLine.getPaymentLine account or currency or country not informed');
                throw new customException('ERROR: ServicePaymentLine.getPaymentLine');
            }else{
                Boolean isSantader = ServicePaymentLine.isSantander(paymentDraft.destinationAccount);
                if(isSantader && paymentDraft.paymentCurrency.equalsIgnoreCase(paymentDraft.destinationAccount.currencyCodeAvailableBalance)){
                    if(paymentDraft.destinationAccount.country == 'BR'){
                        //BR Santander
                        productId = PRODUCT_ID_006;
                        serviceId = SERVICE_ID_002;
                        System.debug('debug BR Santander: ' + productId + ', ' + serviceId);
                    }else{
                        //PAGO IIP
                        productId = PRODUCT_ID_002;
                        serviceId = SERVICE_ID_002;
                        System.debug('debug PAGO IIP: ' + productId + ', ' + serviceId);

                    }
                }else{
                    //PAGO D&F o SWIFT(aún no disponible)
                    if(paymentDraft.destinationAccount.country == 'BR'){
                        //Brasil no Santander
                        productId = PRODUCT_ID_005;
                        serviceId = SERVICE_ID_003;
                        System.debug('debug Brasil no Santander: ' + productId + ', ' + serviceId);   
                    }else{
                        //D&F Otro país
                        productId = PRODUCT_ID_003;
                        serviceId = SERVICE_ID_002;
                        System.debug('debug D&F Otro país: ' + productId + ', ' + serviceId);   

                    }
                }
            }
        }
        paymentLine.put('productId',productId);
        paymentLine.put('serviceId',serviceId);
        return paymentLine; 
    }
        
    global static Boolean isSantander(WRAPPER_AccountList.AccountDetails destinationAccount){
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
                if (String.isNotBlank(destinationAccount.country) && String.isNotBlank(destinationAccount.codigoBic)) {
                    System.debug('ServicePaymentLine.isSantander COUNTRY BIC' + destinationAccount.codigoBic.substring(0, 8));                   
                    if ((destinationAccount.country == 'PL' && destinationAccount.codigoBic.substring(0, 8) == Label.PAY_BIC_Poland) ||
                        (destinationAccount.country == 'ES' && destinationAccount.codigoBic.substring(0, 8) == Label.PAY_BIC_Spain) ||
                       	(destinationAccount.country == 'GB' && destinationAccount.codigoBic.substring(0, 8) == Label.PAY_BIC_UnitedKingdom)) {
                        //System.debug('ServicePaymentLine.isSantander PL');
                        isSantander = true;
                    }
                }                
            }else{
                if(destinationAccount.country.equalsIgnoreCase('BR')){
                    if(String.isBlank(destinationAccount.idType) || String.isBlank(destinationAccount.displayNumber)){
                        System.debug('ServicePaymentLine.isSantander');
                        throw new customException('ERROR: ServicePaymentLine.isSantander');
                    }else{
                        if(destinationAccount.idType.equalsIgnoreCase('BBA')) {
                            if(String.isBlank(destinationAccount.bankName)) {
                                System.debug('ServicePaymentLine.isSantander bankName necessary for BBA condition');
                                throw new customException('ERROR: ServicePaymentLine.isSantander');
                            }else{
                                if(destinationAccount.bankName.equalsIgnoreCase('SAN Brasil')) {
                                    isSantander = true;
                                }
                            } 
                        }else if(destinationAccount.idType.equalsIgnoreCase('IBA')){
                            if(destinationAccount.displayNumber.length() > 12){
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
    
    //AMR 25032021
    //Validate if account is Santander Brasil
    /*global static Boolean isSantanderBrasil(WRAPPER_AccountList.AccountDetails destinationAccount){
        Boolean isSantanderBrasil = false;
        if(destinationAccount.country.equalsIgnoreCase('BR')){
            if(String.isBlank(destinationAccount.idType) || String.isBlank(destinationAccount.displayNumber)){
                System.debug('ServicePaymentLine.isSantanderBrasil');
                throw new customException('ERROR: ServicePaymentLine.isSantanderBrasil');
            }else{
                if(destinationAccount.idType.equalsIgnoreCase('BBA')) {
                    if(String.isBlank(destinationAccount.bankName)) {
                        System.debug('ServicePaymentLine.isSantander bankName necessary for BBA condition');
                        throw new customException('ERROR: ServicePaymentLine.isSantanderBrasil');
                    }else{
                        if(destinationAccount.bankName.equalsIgnoreCase('SAN Brasil')) {
                            isSantanderBrasil = true;
                        }
                    } 
                }else if(destinationAccount.idType.equalsIgnoreCase('IBA')){
                    if(destinationAccount.displayNumber.length() > 12){
                        String displayNumber_aux = destinationAccount.displayNumber.substring(4, 12);
                        if(displayNumber_aux.equalsIgnoreCase('90400888')){
                            isSantanderBrasil = true;
                        }
                    }  
                }
            }
        }
        return isSantanderBrasil; 
    }*/

    global static String getProvisionalServiceId (String transferType) {
		String serviceId = '';        
        if(transferType.equalsIgnoreCase(INSTANT_TRANSFER)){
            serviceId = SERVICE_ID_001;
        }else if(transferType.equalsIgnoreCase(INTERNATIONAL_TRANSFER_SINGLE)){
            serviceId = SERVICE_ID_002; 
        }
        return serviceId; 
    }

}