/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Controller of CMP_MRTracker
Test Class:     CNT_MRTracker_Test
History
<Date>          <Author>        <Description>
21/01/2020      R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/

public with sharing class CNT_MRTracker {

   /*----------------------------------------------------------------------------------
   Author:         R. Alexander Cervino
   Company:        Deloitte
   Description:    Method to get the filtered data
   History
   <Date>          <Author>        <Description>
   21/01/2020      R. Alexander Cervino     Initial version
   ----------------------------------------------------------------------------------

     @AuraEnabled
     public Static String getFilteredData(String filters){
        try{
            String res='';
            WRAPPER_MRTracker data = new WRAPPER_MRTracker(filters);
            data.execute();
            
            if (String.isNotBlank(data.getOutput())) {
               res= data.getOutput();
            } else { 
               res= null;
            }
            if(Test.isRunningTest()){
                throw new customException();
            }
            return res;
            
        } catch (Exception e) {
            System.debug('execute: ' + e.getMessage());
			   throw new customException(e.getMessage());
        }

     }*/
}