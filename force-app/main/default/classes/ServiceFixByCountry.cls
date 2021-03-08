public with sharing class ServiceFixByCountry {

    /*
    Author:         Candido
    Company:        Deloitte
    Description:    fix bankId information to Poland
    History
    <Date>          <Author>            <Description>
    12/11/2020      Candido             Initial version
    */
    public static List<WRAPPER_AccountList.AccountDetails> fixBicByCountry (List<WRAPPER_AccountList.AccountDetails> accountList) {
        try {
            if (!accountList.isEmpty()) {
                for (WRAPPER_AccountList.AccountDetails acc : accountList) {
                    fixBicByCountry(acc);
                }
            }
        } catch (Exception e) {
            System.debug('ServiceFixByCountry.fixBicByCountry: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return accountList;
    }

    /*
    Author:         Candido
    Company:        Deloitte
    Description:    fix bankId information to Poland
    History
    <Date>          <Author>            <Description>
    12/11/2020      Candido             Initial version
    */
    public static WRAPPER_AccountList.AccountDetails fixBicByCountry (WRAPPER_AccountList.AccountDetails accountData) {
        try {
            if (accountData != null) {
                if (String.isNotBlank(accountData.country) && String.isBlank(accountData.codigoBic)) {
                    String codigoBic;
                    if (accountData.country.equalsIgnoreCase('PL')) {
                        codigoBic = Label.PAY_BIC_Poland;
                    }
                    if (accountData.country.equalsIgnoreCase('ES')) {
                        codigoBic = Label.PAY_BIC_Spain;
                    }
                    if (accountData.country.equalsIgnoreCase('GB')) {
                        codigoBic = Label.PAY_BIC_UnitedKingdom;
                    }
                    if (String.isNotBlank(codigoBic)) {
                        accountData.codigoBic = codigoBic;
                        accountData.bic =  codigoBic.substring(0, 4);
                        accountData.branch =  'XXX';
                        accountData.locatorbic =  codigoBic.substring(6, 8);
                        accountData.paisbic =  codigoBic.substring(4, 6); 
                    }
                }
            }
        } catch (Exception e) {
            System.debug('ServiceFixByCountry.fixBicByCountry: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return accountData;
    }
}