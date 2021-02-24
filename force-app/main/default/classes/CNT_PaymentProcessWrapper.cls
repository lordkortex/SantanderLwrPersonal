public with sharing class CNT_PaymentProcessWrapper 
{

    //CONSTANT DEFINITION
    public static final String GRPHDR_MSGID = Global_Utilities.generateRandomNumber(7);

    public static final String GRPHDR_TRANSACTIONDATE = Global_Utilities.formatToServerDate(DateTime.now());
    public static final String GRPHDR_TRANSACTIONAMOUNT = '1';
    public static final String GRPHDR_TRANSACTIONTYPE_TRANSACTIONMETHOD = 'CLRG';

    public static final String TRANSACTIONINFORMATION_PMTID_ENDTOENDID = 'e2eId111';
    public static final String TRANSACTIONINFORMATION_PMTID_TXID = 'txId111';

    public static final String TRANSACTIONINFORMATION_PMTTPINF_SVCLVL_PRTRY = 'INT';

    public static final String TRANSACTIONINFORMATION_CHARGESTYPE = 'SHAR';
    
    public static final String DEBTORAGENCY_AGENCY_NAME = 'SantanderInternal';
    public static final String CREDITORAGENCY_AGENCY_NAME = 'SantanderInternal';
    
    public static final String SENDERINFORMATION_SENDER_CREDITORREFERENCEINFO_REFERENCE = 'interna';
    


    //CONSTRUCTOR
    public CNT_PaymentProcessWrapper(Map<String,CNT_PaymentProcessWrapper.CNT_OriginDataWrapper> data)
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


    public class CNT_SenderInformationWrapper 
    {
        public CNT_SenderInformationWrapper()
        {
         sender = new List<CNT_SenderWrapper>();
         sender.add(new CNT_SenderWrapper());
        }
        public List<CNT_SenderWrapper> sender;
    }

    public class CNT_TransactionTypeWrapper 
    {
        public CNT_TransactionTypeWrapper()
        {
            transactionMethod = GRPHDR_TRANSACTIONTYPE_TRANSACTIONMETHOD;
        }
        public String transactionMethod;
    }

    public class CNT_DebtorAgencyWrapper
    {
        public CNT_DebtorAgencyWrapper()
        {
            agency = new CNT_DebtorWrapper();
        }
        public CNT_DebtorWrapper agency;
    }

    public CNT_FitoFICstmrCdtTrfWrapper fitoFICstmrCdtTrf;

    public class CNT_PmtTpInfWrapper 
    {
        public CNT_PmtTpInfWrapper()
        {
            svcLvl = new CNT_SvcLvlWrapper();
        }
        public CNT_SvcLvlWrapper svcLvl;
    }

    public class CNT_DebtorIBANWrapper 
    {
        public CNT_DebtorIBANWrapper()
        {
            id = new CNT_IdWrapper();
        }
        public CNT_IdWrapper id;
    }

    public class CNT_OriginAmountWrapper 
    {
        public CNT_OriginAmountWrapper(){
        }
        
        public Double value{get;set;}
        public String ObjectCurrency{get;set;}
    }

    public class CNT_PmtIdWrapper 
    {
        public CNT_PmtIdWrapper()
        {
            endToEndId = TRANSACTIONINFORMATION_PMTID_ENDTOENDID;
            txId = TRANSACTIONINFORMATION_PMTID_TXID;
        }
        public String endToEndId;
        public String txId;
    }

    public class CNT_SvcLvlWrapper 
    {
        public CNT_SvcLvlWrapper()
        {
            prtry = TRANSACTIONINFORMATION_PMTTPINF_SVCLVL_PRTRY;
        }
        public String prtry;
    }

    public class CNT_SenderWrapper 
    {
        public CNT_SenderWrapper()
        {
            creditorReferenceInfo = new CNT_CreditorReferenceInfoWrapper();
        }
        public CNT_CreditorReferenceInfoWrapper creditorReferenceInfo;
    }

    public class CNT_TransactionInformationWrapper 
    {
        public CNT_TransactionInformationWrapper(){
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


        public CNT_PmtIdWrapper pmtId;
        public CNT_PmtTpInfWrapper pmtTpInf;
        public CNT_OriginAmountWrapper originAmount;
        public CNT_OriginAmountWrapper destinationAmount;
        public String chargesType;
        public CNT_DebtorWrapper debtor;
        public CNT_DebtorIBANWrapper debtorIBAN;
        public CNT_DebtorAgencyWrapper debtorAgency;
        public CNT_DebtorAgencyWrapper creditorAgency;
        public CNT_DebtorWrapper creditor;
        public CNT_DebtorIBANWrapper creditorIBAN;
        public CNT_SenderInformationWrapper senderInformation;
    }

    public class CNT_DebtorWrapper 
    {
        public CNT_DebtorWrapper()
        {
            name = DEBTORAGENCY_AGENCY_NAME;
        }
        public String name;
    }

    public class CNT_GrpHdrWrapper 
    {
        public CNT_GrpHdrWrapper() 
        {
            msgId = GRPHDR_MSGID;
            transactionDate = GRPHDR_TRANSACTIONDATE;
            transactionAmount = GRPHDR_TRANSACTIONAMOUNT;
            transactionType = new CNT_TransactionTypeWrapper();

        }

        public String msgId;
        public String transactionDate;
        public String transactionAmount;
        public CNT_TransactionTypeWrapper transactionType;
    }

    public class CNT_IdWrapper 
    {
        public CNT_IdWrapper() 
        {

        }
        public String IBAN;
    }

    public class CNT_FitoFICstmrCdtTrfWrapper 
    {
        public CNT_FitoFICstmrCdtTrfWrapper()
        {
            grpHdr = new CNT_GrpHdrWrapper();
            transactionInformation = new List<CNT_TransactionInformationWrapper>();
            transactionInformation.add(new CNT_TransactionInformationWrapper());
        }
        public CNT_GrpHdrWrapper grpHdr;
        public List<CNT_TransactionInformationWrapper> transactionInformation;
    }

    public class CNT_CreditorReferenceInfoWrapper 
    {
        public CNT_CreditorReferenceInfoWrapper()
        {
            reference = SENDERINFORMATION_SENDER_CREDITORREFERENCEINFO_REFERENCE;
        }
        public String reference;
    }


    //WRAPPER OF ORIGIN DATA 
    public class CNT_OriginDataWrapper {
        @AuraEnabled public Integer id {get;set;}
        @AuraEnabled public String alias {get;set;}
        @AuraEnabled public String accountNumber {get;set;}
        @AuraEnabled public String balance {get;set;}
        @AuraEnabled public String ObjectCurrency {get;set;}
        @AuraEnabled public String countryCode {get;set;}
        @AuraEnabled public Double value {get;set;}

        public CNT_originDataWrapper(){}
    }

    
}