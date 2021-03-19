public with sharing class CNT_UserSettingsAux {
  @AuraEnabled
  public static List<Map<String, String>> getUserSettings() {
    List<User_Preference__c> currentUserPreferences = null;

    if (
      Schema.sObjectType.User_Preference__c.fields.OwnerId.isAccessible() &&
      Schema.sObjectType.User_Preference__c.fields.ccy_pairs_minipricers__c.isAccessible() &&
      Schema.sObjectType.User_Preference__c.fields.ccy_pairs_order__c.isAccessible() &&
      Schema.sObjectType.User_Preference__c.fields.Name.isAccessible()
    ) {
      currentUserPreferences = [
        SELECT ccy_pairs_minipricers__c, ccy_pairs_order__c, Name
        FROM User_Preference__c
        WHERE OwnerId = :UserInfo.getUserId() AND Name = 'CCY-Pair'
        ORDER BY ccy_pairs_order__c
      ];
    }
    //Map<String, String> userData = new Map<String, String>();
    List<Map<String, String>> ccyPairsList = new List<Map<String, String>>();
    if (!currentUserPreferences.isEmpty()) {
      //List<Map<String,String>> ccyPairsList = new List<Map<String,String>>();
      for (User_Preference__c preference : currentUserPreferences) {
        Map<String, String> ccyPair = new Map<String, String>();
        ccyPair.put('value', preference.ccy_pairs_minipricers__c);
        ccyPair.put('order', String.valueOf(preference.ccy_pairs_order__c));
        ccyPairsList.add(ccyPair);
      }
      //userData.put('ccyPairsList', ccyPairsList);
    } else {
      //añadir lista de ccy_pairs predefinida
      //( Object[])Schema.SObjectType.User.fields.ccy_pairs_minipricers__c.PicklistValues;

      //Inicializacion de Preferencias
      Map<String, String> ccyPair1 = new Map<String, String>();
      ccyPair1.put('value', 'EUR/USD');
      ccyPair1.put('order', '1');
      ccyPairsList.add(ccyPair1);
      saveData(ccyPair1);
      Map<String, String> ccyPair2 = new Map<String, String>();
      ccyPair2.put('value', 'USD/GBP');
      ccyPair2.put('order', '2');
      ccyPairsList.add(ccyPair2);
      saveData(ccyPair2);
      Map<String, String> ccyPair3 = new Map<String, String>();
      ccyPair3.put('value', 'EUR/GBP');
      ccyPair3.put('order', '3');
      ccyPairsList.add(ccyPair3);
      saveData(ccyPair3);
    }
    return ccyPairsList;
  }

  @AuraEnabled
  public static String getPicklistValues() {
    Map<String, List<Object>> data = new Map<String, List<Object>>();
    //SUSTITUIR LISTA DE PAREJAS DISPONIBLES
    data.put(
      'CurrencyPairsList',
      (Object[]) Schema.SObjectType.User.fields.ccy_pairs_minipricers__c.PicklistValues
    );

    System.debug(JSON.serialize(data.get('CurrencyPairsList')));
    return JSON.serialize(data);
  }

  @AuraEnabled
  public static boolean saveData(Map<String, String> userInfoCmp) {
    List<User_Preference__c> currentUserPreferences = new List<User_Preference__c>();

    if (userInfoCmp.size() > 0) {
      Decimal ccyPairsOrder = Decimal.valueOf(userInfoCmp.get('order'));
      currentUserPreferences = [
        SELECT Id, ccy_pairs_minipricers__c, ccy_pairs_order__c, Name
        FROM User_Preference__c
        WHERE
          OwnerId = :UserInfo.getUserId()
          AND ccy_pairs_order__c = :ccyPairsOrder
          AND Name = 'CCY-Pair'
        LIMIT 1
      ];
    }
    if (!currentUserPreferences.isEmpty()) {
      User_Preference__c currentUserPreference = currentUserPreferences.get(0);
      currentUserPreference.ccy_pairs_minipricers__c = userInfoCmp.get('value');
      currentUserPreference.ccy_pairs_order__c = Decimal.valueOf(
        userInfoCmp.get('order')
      );
      currentUserPreference.Name = 'CCY-Pair';

      try {
        System.debug(JSON.serialize(currentUserPreference));
        update currentUserPreference;
      } catch (DmlException e) {
        System.debug(e);
        return false;
      }
    } else {
      User_Preference__c newUserPreference = new User_Preference__c();
      newUserPreference.ccy_pairs_minipricers__c = userInfoCmp.get('value');
      newUserPreference.ccy_pairs_order__c = Decimal.valueOf(
        userInfoCmp.get('order')
      );
      newUserPreference.Name = 'CCY-Pair';

      try {
        System.debug(JSON.serialize(newUserPreference));
        insert newUserPreference;
      } catch (DmlException e) {
        System.debug(e);
        return false;
      }
    }

    return true;
  }
}
