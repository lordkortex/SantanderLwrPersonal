public class testJSON {
public class simple {
    @AuraEnabled
    public String a {get; set;}
    @AuraEnabled
    public String b {get; set;}
}
    public static void test(){
    //{"0":"ES"}
    //{"1":"ES"}
    String jsontest ='{"0":"ES","1":"ES"}';
    Map<String,String> fieldList = (Map<String,String>) JSON.deserialize(jsontest, Map<String,String>.class);
    system.debug(fieldList.values());
    }
}