public with sharing class WRAPPER_FX_TradesOnColumns {
  @AuraEnabled
  public List<Headers> headers { get; set; }
  @AuraEnabled
  public List<Data> data { get; set; }

  public class Headers {
    @AuraEnabled
    public String key { get; set; }
    @AuraEnabled
    public String value { get; set; }
    @AuraEnabled
    public String sortable {
      get {
        return 'true';
      }
      set;
    }
    @AuraEnabled
    public String sortOrder {
      get {
        return 'desc';
      }
      set;
    }
    @AuraEnabled
    public String styleColumn {
      get {
        return 'button-orderRight icon-arrowDown color:white';
      }
      set;
    }
  }

  public class Data {
    @AuraEnabled
    public String key { get; set; }
    @AuraEnabled
    public List<Columns> columns { get; set; }
  }

  public class Columns {
    @AuraEnabled
    public String value { get; set; }
    @AuraEnabled
    public String type { get; set; }
    @AuraEnabled
    public String currency1 { get; set; }
    @AuraEnabled
    public String side { get; set; }
    @AuraEnabled
    public String currencyTargetAccount { get; set; }
  }

  public static WRAPPER_FX_TradesOnColumns parse(String json) {
    return (WRAPPER_FX_TradesOnColumns) System.JSON.deserialize(
      json,
      WRAPPER_FX_TradesOnColumns.class
    );
  }
}
