/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Controller of CMP_SwiftPaymentTableRow
Test Class:     CNT_SwiftPaymentTableRow_Test
History
<Date>			<Author>		<Description>
21/11/2019		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
public with sharing class CNT_SwiftPaymentTableRow {
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Data encrypting
History
<Date>			<Author>		<Description>
21/11/2019		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String encryptData(String str){
        return Global_Utilities.encryptData(str);
    }

     /*----------------------------------------------------------------------------------
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Download MT103
    History
    <Date>			<Author>		        <Description>
    11/12/2019		R. Alexander Cervino     Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String downloadMT103Doc(String str){
        try{
            
            String res='';
            CNT_DownloadMT103 data = new CNT_DownloadMT103(str);

            data.execute();

            if (String.isNotBlank(data.getOutput())) {
                res= data.getOutput();
            }
            
            return res;
        } catch (Exception e) {throw new customException(e.getMessage());}

    }

    /*----------------------------------------------------------------------------------
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Remove MT103
    History
    <Date>			<Author>		        <Description>
    11/12/2019		R. Alexander Cervino     Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static void removeMT103(String id){
        try{
            if(id!=''){
                List<ContentDocument> doc = new List<ContentDocument>([SELECT id from ContentDocument where Id=:id LIMIT 1]);

                if(!doc.isEmpty()){
                    delete doc[0];
                }
            }

        } catch (Exception e) {throw new customException(e.getMessage());}

    }

    /*------------------------------------------------------------
        Author:         R. Cervino
        Company:        Deloitte
        Description:    Get Date according to locale
        History 
        <Date>          <Author>            <Change Description>
        06/03/2020		R Cervino     Initial version
        ------------------------------------------------------------*/     
        @AuraEnabled
        public static String getDateAndTime(String dateT){
            return String.ValueofGmt(DateTime_Utilities.getDatetime(dateT,0));
        }
    
}