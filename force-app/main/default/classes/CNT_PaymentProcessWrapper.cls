global with sharing class CNT_PaymentProcessWrapper 
{

    //CONSTANT DEFINITION
    global static final String GRPHDR_MSGID = Global_Utilities.generateRandomNumber(7);

    global static final String GRPHDR_TRANSACTIONDATE = Global_Utilities.formatToServerDate(DateTime.now());
    global static final String GRPHDR_TRANSACTIONAMOUNT = '1';
    global static final String GRPHDR_TRANSACTIONTYPE_TRANSACTIONMETHOD = 'CLRG';

    global static final String TRANSACTIONINFORMATION_PMTID_ENDTOENDID = 'e2eId111';
    global static final String TRANSACTIONINFORMATION_PMTID_TXID = 'txId111';

    global static final String TRANSACTIONINFORMATION_PMTTPINF_SVCLVL_PRTRY = 'INT';

    global static final String TRANSACTIONINFORMATION_CHARGESTYPE = 'SHAR';
    
    global static final String DEBTORAGENCY_AGENCY_NAME = 'SantanderInternal';
    global static final String CREDITORAGENCY_AGENCY_NAME = 'SantanderInternal';
    
    global static final String SENDERINFORMATION_SENDER_CREDITORREFERENCEINFO_REFERENCE = 'interna';
    


    //CONSTRUCTOR
    global CNT_PaymentProcessWrapper(Map<String,CNT_PaymentProcessWrapper.CNT_OriginDataWrapper> data)
    {
            fitoFICstmrCdtTrf = new CNT_FitoFICstmrCdtTrfWrapper();
            fitoFICstmrCdtTrf.transactionInformation = new List<CNT_TransactionInformationWrapper>();
            fitoFICstmrCdtTrf.transactionInformation.add(new CNT_TransactionInformationWrapper());
            
        if(data != null) 
        {
            system.debug(data.get('originData'));
            CNT_OriginDataWrapper originData = (CNT_OriginDataWrapper) data.get('originData');
            CNT_OriginDataWrapper destinationData = (CNT_OriginDataWrapper) data.get('destinationData');

            //Origin Data fill
            fitoFICstmrCdtTrf.transactionInformation[0].originAmount.value = originData.value;
            fitoFICstmrCdtTrf.transactionInformation[0].originAmount.ObjectCurrency = originData.ObjectCurrency;
            fitoFICstmrCdtTrf.transactionInformation[0].debtorIBAN.id.IBAN= originData.accountNumber.replaceAll(' ', '');

            //DestinationDataFill
            fitoFICstmrCdtTrf.transactionInformation[0].destinationAmount.value = destinationData.value;
            fitoFICstmrCdtTrf.transactionInformation[0].destinationAmount.ObjectCurrency = destinationData.ObjectCurrency;
            fitoFICstmrCdtTrf.transactionInformation[0].creditorIBAN.id.IBAN= destinationData.accountNumber.replaceAll(' ', '');
        }
        system.debug('eeeeeeeeoooo' + fitoFICstmrCdtTrf.grpHdr.msgId);
        
    }
    
    global CNT_PaymentProcessWrapper(){
        System.debug('CNT_PaymentProcessWrapper');
    }


    global class CNT_SenderInformationWrapper 
    {
        global CNT_SenderInformationWrapper()
        {
         sender = new List<CNT_SenderWrapper>();
         sender.add(new CNT_SenderWrapper());
        }
        global List<CNT_SenderWrapper> sender;
    }

    global class CNT_TransactionTypeWrapper 
    {
        global CNT_TransactionTypeWrapper()
        {
            transactionMethod = GRPHDR_TRANSACTIONTYPE_TRANSACTIONMETHOD;
        }
        global String transactionMethod;
    }

    global class CNT_DebtorAgencyWrapper
    {
        global CNT_DebtorAgencyWrapper()
        {
            agency = new CNT_DebtorWrapper();
        }
        global CNT_DebtorWrapper agency;
    }

    global CNT_FitoFICstmrCdtTrfWrapper fitoFICstmrCdtTrf;

    global class CNT_PmtTpInfWrapper 
    {
        global CNT_PmtTpInfWrapper()
        {
            svcLvl = new CNT_SvcLvlWrapper();
        }
        global CNT_SvcLvlWrapper svcLvl;
    }

    global class CNT_DebtorIBANWrapper 
    {
        global CNT_DebtorIBANWrapper()
        {
            id = new CNT_IdWrapper();
        }
        global CNT_IdWrapper id;
    }

    global class CNT_OriginAmountWrapper 
    {
        global CNT_OriginAmountWrapper(){
            System.debug('CNT_PaymentProcessWrapper.CNT_OriginAmountWrapper');
        }
        
        global Double value{get;set;}
        global String ObjectCurrency{get;set;}
    }

    global class CNT_PmtIdWrapper 
    {
        global CNT_PmtIdWrapper()
        {
            endToEndId = TRANSACTIONINFORMATION_PMTID_ENDTOENDID;
            txId = TRANSACTIONINFORMATION_PMTID_TXID;
        }
        global String endToEndId;
        global String txId;
    }

    global class CNT_SvcLvlWrapper 
    {
        global CNT_SvcLvlWrapper()
        {
            prtry = TRANSACTIONINFORMATION_PMTTPINF_SVCLVL_PRTRY;
        }
        global String prtry;
    }

    global class CNT_SenderWrapper 
    {
        global CNT_SenderWrapper()
        {
            creditorReferenceInfo = new CNT_CreditorReferenceInfoWrapper();
        }
        global CNT_CreditorReferenceInfoWrapper creditorReferenceInfo;
    }

    global class CNT_TransactionInformationWrapper 
    {
        global CNT_TransactionInformationWrapper(){
            pmtId = new CNT_PmtIdWrapper();
            pmtTpInf = new CNT_PmtTpInfWrapper();
            originAmount = new CNT_OriginAmountWrapper();
            destinationAmount = new CNT_OriginAmountWrapper();
            chargesType = TRANSACTIONINFORMATION_CHARGESTYPE;
            debtor = new CNT_DebtorWrapper();
            debtorIBAN = new CNT_DebtorIBANWrapper();
            debtorAgency = new CNT_DebtorAgencyWrapper();
            creditorAgency = new CNT_DebtorAgencyWrapper();
            creditor = new CNT_DebtorWrapper();
            creditorIBAN = new CNT_DebtorIBANWrapper();
            senderInformation = new CNT_SenderInformationWrapper();
        }


        global CNT_PmtIdWrapper pmtId;
        global CNT_PmtTpInfWrapper pmtTpInf;
        global CNT_OriginAmountWrapper originAmount;
        global CNT_OriginAmountWrapper destinationAmount;
        global String chargesType;
        global CNT_DebtorWrapper debtor;
        global CNT_DebtorIBANWrapper debtorIBAN;
        global CNT_DebtorAgencyWrapper debtorAgency;
        global CNT_DebtorAgencyWrapper creditorAgency;
        global CNT_DebtorWrapper creditor;
        global CNT_DebtorIBANWrapper creditorIBAN;
        global CNT_SenderInformationWrapper senderInformation;
    }

    global class CNT_DebtorWrapper 
    {
        global CNT_DebtorWrapper()
        {
            name = DEBTORAGENCY_AGENCY_NAME;
        }
        global String name;
    }

    global class CNT_GrpHdrWrapper 
    {
        global CNT_GrpHdrWrapper() 
        {
            msgId = GRPHDR_MSGID;
            transactionDate = GRPHDR_TRANSACTIONDATE;
            transactionAmount = GRPHDR_TRANSACTIONAMOUNT;
            transactionType = new CNT_TransactionTypeWrapper();

        }

        global String msgId;
        global String transactionDate;
        global String transactionAmount;
        global CNT_TransactionTypeWrapper transactionType;
    }

    global class CNT_IdWrapper 
    {
        global CNT_IdWrapper(){
            System.debug('CNT_PaymentProcessWrapper.CNT_IdWrapper');
        }
        global String IBAN;
    }

    global class CNT_FitoFICstmrCdtTrfWrapper 
    {
        global CNT_FitoFICstmrCdtTrfWrapper()
        {
            grpHdr = new CNT_GrpHdrWrapper();
            transactionInformation = new List<CNT_TransactionInformationWrapper>();
            transactionInformation.add(new CNT_TransactionInformationWrapper());
        }
        global CNT_GrpHdrWrapper grpHdr;
        global List<CNT_TransactionInformationWrapper> transactionInformation;
    }

    global class CNT_CreditorReferenceInfoWrapper 
    {
        global CNT_CreditorReferenceInfoWrapper()
        {
            reference = SENDERINFORMATION_SENDER_CREDITORREFERENCEINFO_REFERENCE;
        }
        global String reference;
    }


    //WRAPPER OF ORIGIN DATA 
    global class CNT_OriginDataWrapper {
        @AuraEnabled global Integer id {get;set;}
        @AuraEnabled global String alias {get;set;}
        @AuraEnabled global String accountNumber {get;set;}
        @AuraEnabled global String balance {get;set;}
        @AuraEnabled global String ObjectCurrency {get;set;}
        @AuraEnabled global String countryCode {get;set;}
        @AuraEnabled global Double value {get;set;}

        global CNT_OriginDataWrapper(){
            System.debug('CNT_PaymentProcessWrapper.CNT_OriginDataWrapper');
        }
    }

    
}