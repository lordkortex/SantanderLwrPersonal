@isTest
public class CNT_ICMOriginDestinationTable_Test {

    @isTest
    public static void getCountryValuesMapTest() {
        
        map<String,String> data = CNT_ICMOriginDestinationTable.getCountryValuesMap();
    }
    
    @isTest
    public static void getOriginDataTest() {
        
        String data = CNT_ICMOriginDestinationTable.getOriginData();
    }
}