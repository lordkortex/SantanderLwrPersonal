/*----------------------------------------------------------------------------------
Author:         A. Borraz
Company:        Deloitte
History
<Date>			<Author>		<Description>
18/11/2020		A. Borraz     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class JsonUtilities_Test {
	
    @isTest
    static Map<String, String> getValuesFromJsonTest(){
        Account acct = new Account(Name = 'Test');
        String s=JSON.serialize(acct);

        return JsonUtilities.getValuesFromJson(s);
}
 }