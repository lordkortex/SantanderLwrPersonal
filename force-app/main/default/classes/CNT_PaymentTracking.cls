/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Controller of CMP_PaymentTracking
Test Class:     CNT_PaymentTracking_Test
History
<Date>			<Author>		<Description>
26/11/2019		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
public class CNT_PaymentTracking {
    
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Returns dummy data for CMP_PaymentTracking component
History
<Date>			<Author>		<Description>
26/11/2019		Shahad Naji     Initial version
----------------------------------------------------------------------------------
    @AuraEnabled
    public Static String getDummyData(){
        return DUMMYDATA_SWIFTPAYMENTS.getJsonPaymentsDetails();
    }*/
    
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:   	Receives a List of countries ISO Code and returns Map of Country Iso Code and Country Name
History
<Date>			<Author>		<Description>
26/11/2019		Shahad Naji     Initial version
---------------------------------------------------------------------------------- 
    @AuraEnabled
    public Static Map<String, String> getCountryName(List<String> ISOCode){
        Map<String, String> countryLst = new Map<String, String>();
        try{
            for(String icode : ISOCode){
                String aux = Global_Utilities.getCountryName(icode);
                countryLst.put(icode, aux);
            }      
        }catch(Exception e){
            throw new AuraHandledException('The following exception has occurred: '
                                           + e.getMessage());
        }   
        return countryLst;     
    }*/
}