public without sharing class HANDLER_Case {
    
    public static void createTask(List<Case> oldCaseList, List<Case> newCaseList){
        List<Task> taskList = new List<Task>();
      
        for (Case objCase: newCaseList) {
            //AMR Desarrollo Customer Service SGTGLTRSE-4781 13/01/2021
            if (objCase.Status == 'CAU1' || objCase.Status == 'Closed Solved'){
                if(objCase.OwnerId != oldCaseList[0].OwnerId){              
                        Task newTask = new Task();
                        newTask.OwnerId = objCase.OwnerId;
                        List<String> argument = new List<String>();
                        argument.add(objCase.CaseNumber);
                        String value = String.format(System.Label.Task_Notifaction, argument);
                        newTask.Subject = value;
                        newTask.WhatId = objCase.Id;
                        newTask.Priority = objCase.Priority;
                        taskList.add(newTask);                     
                }            
            }
        
        }
        insert taskList;
    }
    
    //AMR Desarrollo Customer Service SGTGLTRSE-4781 13/01/2021
    public static void caseReopen(Map<Id,Case> oldCaseMap, List<Case> newCaseList){
        Id RTCId 		  = Schema.SObjectType.Case.getRecordTypeInfosByDeveloperName().get('CaseRecordType').getRecordTypeId();
        List<CaseMilestone> cmUpdateLst = new List<CaseMilestone>();
        List<CaseMilestone> csmList = new List<CaseMilestone>();
        Set<Id> setIdCases = new Set<Id>();
        
        for(Case c : newCaseList){
            setIdCases.add(c.Id);   
            /*if(oldCaseMap.get(c.Id).Status != c.Status && oldCaseMap.get(c.Id).Status == 'Closed Cancelled' && c.status == 'Reopen' && c.RecordTypeId == RTCId){
                Profile userProfile = [SELECT Id, Name from Profile where Id =: UserInfo.getProfileId()];
                if(c.CASE_Resolutor__c != null && c.EntitlementId != null){
                    if(userProfile.Name == 'Support' || userProfile.Name == 'Local Support'){
                         c.OwnerId = c.CASE_Resolutor__c;
                    }              
                }                             
            }*/ 
        }    
        
        csmList = [SELECT Id , CaseId, CASE.Status,  CASE.IsClosed, CASE.IsStopped,  CASE.CaseNumber,  StartDate, CompletionDate,
                                     IsViolated, IsCompleted, TimeRemainingInMins, TimeSinceTargetInMins, ActualElapsedTimeInMins, ElapsedTimeInMins, StoppedTimeInMins
                                     FROM CaseMilestone
                                     WHERE CaseId IN :setIdCases];
        if(csmList.size()>0){    	  
            for(CaseMilestone csm: csmList){
                csm.CompletionDate = null;
                cmUpdateLst.add(csm);
            }
        }
        
        try{
            if(cmUpdateLst.size()>0){
                update cmUpdateLst;
            }         
        } catch(DmlException e){
            System.debug('The following exception has occurred: ' + e.getMessage());
        }
    }
    
    public static void AssignRecordType(List<Case> newCaseList){
        
        Id RTCId 		  = Schema.SObjectType.Case.getRecordTypeInfosByDeveloperName().get('CaseRecordType').getRecordTypeId();
		Id RTPPId         = Schema.SObjectType.Case.getRecordTypeInfosByDeveloperName().get('PaymentParentCase').getRecordTypeId();
        Id RTPCId         = Schema.SObjectType.Case.getRecordTypeInfosByDeveloperName().get('PaymentChildCase').getRecordTypeId();
        Id RTComplianceId = Schema.SObjectType.Case.getRecordTypeInfosByDeveloperName().get('Compliance').getRecordTypeId();
        Id RTFundingId   = Schema.SObjectType.Case.getRecordTypeInfosByDeveloperName().get('TRS_Funding').getRecordTypeId();
        
        for (Case StandardCase: newCaseList){
            if(String.valueOf(StandardCase.OwnerId).startsWith('005')){
                if(StandardCase.CASE_PCK_Record_Type__c == 'Case RecordType'){
                    StandardCase.RecordTypeId = RTCId;
                }
                else if(StandardCase.CASE_PCK_Record_Type__c == 'Payment Parent Case'){                   
                    StandardCase.RecordTypeId = RTPPId;            
                    if(StandardCase.CASE_PCK_Sourcesystem__c == 'Mulesoft'){
                        String country = StandardCase.CASE_PCK_OrderingCountry__c;
                        if(country != null && country != ''){
                            country = country + '_PaymentAnalystQueue';
                            List<group> idOwner = new List<group>([SELECT id FROM group WHERE developername =: country]);
                            if(idOwner != null){
                                StandardCase.OwnerId = idOwner[0].id;
                            }
                        }
                    }                
                }
                else if(StandardCase.CASE_PCK_Record_Type__c == 'Payment Child Case'){                    
                    StandardCase.RecordTypeId = RTPCId;                
                    if(StandardCase.CASE_PCK_Sourcesystem__c == 'Salesforce'){
                        String country = StandardCase.CASE_PCK_Beneficiary_country__c;
                        if(country != null && country != ''){
                            country = country + '_PaymentAnalystQueue';
                            List<group> idOwner = new List<group>([SELECT id FROM group WHERE developername =: country]);
                            if(idOwner != null){
                                StandardCase.OwnerId = idOwner[0].id;                            
                            }
                        }
                    }
                }
                else if (standardCase.CASE_PCK_Record_Type__c == 'Compliance'){
                    standardCase.RecordTypeId = RTComplianceId;
                }
                else if (standardCase.CASE_PCK_Record_Type__c == 'TRS_Funding'){
                    standardCase.RecordTypeId = RTFundingId;
                }
            }
        }
    }
    
    public static void updateOwnerAfter(List<Case> oldCaseList, List<Case> newCaseList){
        
        Id RTCId 		  = Schema.SObjectType.Case.getRecordTypeInfosByDeveloperName().get('CaseRecordType').getRecordTypeId();
		Id RTPPId         = Schema.SObjectType.Case.getRecordTypeInfosByDeveloperName().get('PaymentParentCase').getRecordTypeId();
        Id RTPCId         = Schema.SObjectType.Case.getRecordTypeInfosByDeveloperName().get('PaymentChildCase').getRecordTypeId();
        Id RTFundingId   = Schema.SObjectType.Case.getRecordTypeInfosByDeveloperName().get('TRS_Funding').getRecordTypeId();          
        Id OperationsGroupId = [SELECT Id FROM Group where Type = 'Queue' and DeveloperName = 'Operations' LIMIT 1]?.Id;
        
        //AMR Desarrollo Customer Service SGTGLTRSE-4781 13/01/2021
        Set<Id> setOwnerIDs = new Set<Id>();
        for(Case c: newCaseList){
            if(c.OwnerId != null){
                setOwnerIDs.add(c.OwnerId);
            }
        }      
        Map<Id, User> ownerMap = new Map<Id, User>([ Select Id, ProfileId, Profile.Name From User where Id IN: setOwnerIDs ]);
        
        for (Case objCase: newCaseList) {
            if(objCase.RecordTypeId == RTCId){
                if(objCase.Status == 'In progress'){
                    //AMR Desarrollo Customer Service SGTGLTRSE-4781 13/01/2021
                    if(oldCaseList[0].Status == 'CAU1' || oldCaseList[0].Status == 'Closed Solved'){
                        if(objCase.CASE_Resolutor__c != null){
                            objCase.OwnerId = objCase.CASE_Resolutor__c;                  
                        	system.debug('>>> despues: '+ objCase.OwnerId);
                        }  
                    }
                }else if(objCase.Status == 'CAU1'){
                    //AMR Desarrollo Customer Service SGTGLTRSE-4781 13/01/2021
                    if(oldCaseList[0].Status == 'In progress' || oldCaseList[0].Status == 'IT'){
                        if(objCase.CASE_CAU1__c != null){
                            objCase.OwnerId = objCase.CASE_CAU1__c;
                        } 
                        system.debug('>>> pasar el caso de CAU2 a CAU1:');
                    }else if(oldCaseList[0].Status == 'CAU1'){
                        //AMR Desarrollo Customer Service SGTGLTRSE-4781 13/01/2021
                        if(objCase.OwnerId != null && ownerMap.containsKey( objCase.OwnerId ) && ownerMap.get( objCase.OwnerId ).Profile.Name == 'Local Support'){
                            system.debug('>>> actualizar onwer en CAU1');
                        	objCase.CASE_CAU1__c = objCase.OwnerId;
                        }
                        /*contact cnt = [SELECT Id FROM contact WHERE CONTACT_User__c =: objCase.OwnerId LIMIT 1];
                        if(cnt != null){
                            objCase.ContactId = cnt.Id;
                        }*/
                    }
                //AMR Desarrollo Customer Service 05/01/2021
                }else if(objCase.Status == 'Closed Solved' && objCase.CASE_CAU1__c != null && oldCaseList[0].Status != objCase.Status && String.valueOf(objCase.OwnerId).startsWith('005')){ 
                	objCase.OwnerId = objCase.CASE_CAU1__c;
                }else if(objCase.Status == 'CAU2' && objCase.CASE_Resolutor__c != null && oldCaseList[0].Status != objCase.Status &&  oldCaseList[0].Status == 'Reopen'){
                    objCase.OwnerId = objCase.CASE_Resolutor__c;
                }
            }
            else if(objCase.RecordTypeId == RTPPId || objCase.RecordTypeId == RTPCId){
                if(objCase.Status == 'In progress'){
                    objCase.CASE_Analyst__c = objCase.OwnerId;
                }
                else if(objCase.Status == 'Pending of Authorization'){
                    if(objCase.RecordTypeId == RTPPId){
                        String country = objCase.CASE_PCK_OrderingCountry__c;
                        if(country != null && country != ''){
                            country = country + '_PaymentApprovalQueue';
                            List<group> idOwner = new List<group>([SELECT id FROM group WHERE developername =: country]);
                            if(idOwner != null){
                                objCase.OwnerId = idOwner[0].id;
                            }
                        }
                    }
                    else if(objCase.RecordTypeId == RTPCId){
                        String country = objCase.CASE_PCK_Beneficiary_country__c;
                        if(country != null && country != ''){
                            country = country + '_PaymentApprovalQueue';
                            List<Group> idOwner = new List<Group>([SELECT id FROM Group WHERE developername = :country]);
                            if(!idOwner.isEmpty()){
                                objCase.OwnerId = idOwner[0].id;
                                system.debug('>>> SNJ: New child case Id case: ' + objCase.id);
                            }
                        }
                    }                   
                }
            } 
            else if (objCase.RecordTypeId == RTFundingId) {
                if(objCase.status == 'Pending of Authorization'){
                    objCase.OwnerId = OperationsGroupId;
                }
                
            }
            //Activate if neccesary use random user to assign Case
            else{
                RecordType RTP = [Select Name, id, SobjectType from RecordType where Name = 'Payment Parent Case' and SobjectType  = 'Case' LIMIT 1];
                if(RTP != null){
                    if(objCase.RecordTypeId == RTP.Id){
                        if(objCase.Status == 'Pending authorization'){
                            String country = objCase.CASE_PCK_OrderingCountry__c;
                            String searchQueue = country+'_PaymentApprovalQueue';
                            String analystId = objCase.CASE_Analyst__c;  
                            system.debug('>>> SNJ: analystId: ' + analystId);
                            Group myGroup = [SELECT Id,Name,Type FROM Group where name=: searchQueue  and Type='Queue' LIMIT 1];
                            List<GroupMember> groupMembers = new List<GroupMember>([SELECT GroupId,Id,UserOrGroupId FROM GroupMember where GroupId =: myGroup.Id and UserOrGroupId !=: analystId]);
                            system.debug('>>> SNJ: GroupMember: ' +  groupMembers);
                            Integer randomNumber = Integer.valueof((Math.random() * groupMembers.size()));
                            system.debug('>>> SNJ: randomNumber: ' +  randomNumber);
                           	objCase.OwnerId = groupMembers.get(randomNumber).UserOrGroupId;                         
                        }
                    }
                }              
            }
        }
    }
    
    public static void updateResolutor(Map<Id,Case> oldCaseMap, List<Case> newCaseList){
        RecordType RTC = [Select Name, id, SobjectType from RecordType where Name = 'Case RecordType' and SobjectType  = 'Case' LIMIT 1];
        RecordType RTPP = [Select Name, id, SobjectType from RecordType where Name = 'Payment Parent Case' and SobjectType  = 'Case' LIMIT 1];
        RecordType RTPC = [Select Name, id, SobjectType from RecordType where Name = 'Payment Child Case' and SobjectType  = 'Case' LIMIT 1];
        
        String UserID = UserInfo.getUserId();
        
        for (Case objCase: newCaseList) {
            if(objCase.RecordTypeId == RTPP.Id || objCase.RecordTypeId == RTPC.Id){
                if(oldCaseMap.get(objCase.Id).Status != objCase.Status &&  objCase.Status == 'Management Process'){
                    
                    System.debug('Last: '+ objCase.LastModifiedById);
                    objCase.CASE_Resolutor__c = UserID;
					
                }
            }else if(objCase.RecordTypeId == RTC.Id){
                if(oldCaseMap.get(objCase.Id).Status != objCase.Status &&  objCase.Status == 'Closed Solved' && objCase.CASE_CAU1__c == null){
                    objCase.CASE_Resolutor__c = objCase.OwnerId;
                } 
            }
        }
    }
    
        /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Method to create a payment child case 
History
<Date>          <Author>             <Description>
15/07/2020      Shahad Naji        Initial version
----------------------------------------------------------------------------------*/    
    public static void createChildCase(Map<Id,Case> oldCaseMap, List<Case> newCaseList){
        RecordType RTPP = [Select Name, id, SobjectType from RecordType where Name = 'Payment Parent Case' and SobjectType  = 'Case' LIMIT 1];
        RecordType RTPC = [Select Name, id, SobjectType from RecordType where Name = 'Payment Child Case' and SobjectType  = 'Case' LIMIT 1];
        
        List<Case> childCaseList = new List<Case>();
        for (Case objCase: newCaseList) {
            if(objCase.RecordTypeId == RTPP.Id){
                if(oldCaseMap.get(objCase.Id).Status != objCase.Status &&  objCase.Status == 'Management Process'){
                    if(objCase.ParentId == null){
                        Case newCase = new Case();
                            newCase.ParentId = objCase.Id;
                            newCase.Status = 'New';
                            //newCase.RecordTypeId = RTPC.Id;
                            newCase.CASE_PCK_Record_Type__c = 'Payment Child Case';
                            newCase.CASE_PCK_OrderingCountry__c = objCase.CASE_PCK_OrderingCountry__c;
                            newCase.Case_TXT_PaymentId__c = objCase.Case_TXT_PaymentId__c;
                            newCase.CASE_PCK_Beneficiary_country__c = objCase.CASE_PCK_Beneficiary_country__c;
                            newCase.CASE_PCK_Sourcesystem__c = 'Salesforce';
                        	newCase.CASE_affected_functionality__c = objCase.CASE_affected_functionality__c;
                        	newCase.CASE_TXT_BICCode__c = objCase.CASE_TXT_BICCode__c;
                        	newCase.Origin = objCase.Origin;
                        system.debug('>>> SNJ: New child case');
                        childCaseList.add(newCase);
                        
                    }
                }
            }            
        }
        if (!childCaseList.IsEmpty()){
            try{
                insert childCaseList;
            }
            catch(Exception e){
                system.debug('No se ha insertado el caso hijo');
            }
            
        }
    }
   
    public static void shareObject(List<Case> newCaseList){
        
        List<CaseShare> caseShrList = new List<CaseShare>();
        
        for (Case objCase: newCaseList) {             
            system.debug('Compartir caso');
            if(objCase.CASE_CAU1__c != null ){ //&& objCase.Status != 'New'
                caseShrList.add(HANDLER_Case.manualShare(objCase.Id,objCase.CASE_CAU1__c,'Edit'));
            }
            if(!caseShrList.isEmpty()){
                Database.SaveResult[] sr = Database.insert(caseShrList, false);
                system.debug('>>> Resultado share: ' + sr);                    
                
            }  
        }
    }
            
    public static void deleteRelatedTasks(List<Case> newCaseList){
        for (Case objCase: newCaseList) { 
            if(objCase.IsClosed || objCase.IsDeleted){
                List<Task> taskList = new List<Task>();
                taskList = [select id, whatid, Status from Task where WhatId =: objCase.Id];
                for(Task objTask : taskList){
                    objTask.Status = 'Completed';
                }
                update taskList;
            }
        }
    }
    
    public static void updateMilestoneCase(List<Case> newCaseList){
        for(Case objCase : newCaseList){
            if(objCase.IsClosed){
                system.debug('Caso Cerrado: ' + objCase.CaseNumber);
                List<CaseMilestone> cmLst = new List<CaseMilestone>();                
                cmLst = [select id, CaseId, CompletionDate from CaseMilestone where CaseId =: objCase.Id];
                for(CaseMilestone cm: cmLst){
                    if(cm.CompletionDate == null){
                        cm.CompletionDate  = system.now();
                    }
                    
                }
                update cmLst;
            }
        }
    }
    
    public static void fillBasicFields(List<Case> newCaseList){
        
        if(!newCaseList.isEmpty()){
            //Get the only and generic Entitlement of the ORG
            List<Entitlement> entitlement = new List<Entitlement>([SELECT ID FROM Entitlement WHERE Name='SLAs']);
            
            //Get the only and generic Entitlement of the ORG
            //List<RecordType> recordTypeCase = new List<RecordType>([SELECT ID FROM RecordType WHERE Name='Internal' AND sObjectType='Case']);
            
            Profile userProfile = [SELECT Id, Name from Profile where Id =: UserInfo.getProfileId()];
            List<Contact> userContact = new List<Contact>([SELECT ID FROM Contact WHERE CONTACT_User__c=:UserInfo.getUserId()]);
            //System.debug('UserContactId: ' + userContact[0].ID);
            
            for(Case c : newCaseList){
                if(String.valueOf(c.OwnerId).startsWith('005')){
                    if(!entitlement.isEmpty()){
                        c.EntitlementId=entitlement[0].Id;
                    }
                    
                    if(c.Origin=='Internal'){
                        if(userProfile.Name == 'Intranet GTS Support Partner'){
                            if(!userContact.isEmpty()){
                                c.CASE_Submitter_General__c=userContact[0].ID;
                            }
    
                        }
                        if(userProfile.Name == 'Local Support'){
                            c.CASE_User_Submitter_General__c= UserInfo.getUserId();
                        }
                    }
                    user u = [SELECT Id, Profile.name FROM user WHERE Id =: c.OwnerId LIMIT 1];
                    if(u != null){
                        //if(u.Profile.name == 'Intranet GTS Support Partner' || u.Profile.name == 'System Administrator'){
                        //AMR Desarrollo Customer Service SGTGLTRSE-4781 13/01/2021
                        if((u.Profile.name == 'Local Support' || u.Profile.name == 'Intranet GTS Support Partner') && c.OwnerId != null){ 
                            c.CASE_CAU1__c = c.OwnerId;
                        }
                    }
                }
            }
        }
    }
    
     public static void stopMilestone(List<Case> newCaseList){
        if(!newCaseList.isEmpty()){
            for(Case c: newCaseList){
                //AMR Desarrollo Customer Service SGTGLTRSE-4781 13/01/2021
                if(c.Status == 'CAU1' || c.Status == 'IT' || c.Status == 'Closed Solved' || c.Status == 'Closed Cancelled'){
                    c.IsStopped = true;
                } 
                else if(c.Status != 'In Progress' && c.Status != 'IT'){
                    c.IsStopped = false;                    
                }                 
            }
        }
    }
    
    //SNJ - 28/07/2020 - Comentar la siguiente linea antes de subir a PROD - Funcionalidad PAGO duplicado
    public static void closePaymentCase(List<Case> oldCaseList, List<Case> newCaseList){
        if(!newCaseList.isEmpty()){
            for(Case c: newCaseList){
                if(c.ParentId != null){
                    
                   if(c.CASE_CHK_ReverseBeneficiaryCredit__c){
                       if(c.CASE_CHK_ReverseBeneficiaryCredit__c != oldCaseList[0].CASE_CHK_ReverseBeneficiaryCredit__c){
                           c.Status = 'Refunded funds'; 
                           Case parentCase = [SELECT id, status from Case where id =: c.ParentId LIMIT 1]; 
                            if(parentCase != null){
                                parentCase.status = 'Refunded funds';
                                update parentCase;
                            }
                        }  
                    }
                    
                    if(c.Status == 'Dismissed'){
                        Case parentCase = [SELECT id, status from Case where id =: c.ParentId LIMIT 1]; 
                        if(parentCase != null){
                            parentCase.status = 'Dismissed';
                            update parentCase;
                        }
                    }
                    
                }
            }
        }
    }
  
    
    public static CaseShare manualShare(Id recordId, Id userOrGroupId, string caseAccessLevel){
        // Create new sharing object for the custom object Job.
        CaseShare caseShr  = new CaseShare();
        caseShr.CaseId = recordId;
        caseShr.UserOrGroupId = userOrGroupId;
        caseShr.CaseAccessLevel = caseAccessLevel;
        caseShr.RowCause = Schema.CaseShare.RowCause.Manual;
        
        //Database.SaveResult sr = Database.insert(caseShr,false);
        return caseShr;     
    }
    
	
    public static void inProgressHours (Map<Id,Case> oldCaseMap, List<Case> newCaseList){
        BusinessHours cau2BH = [SELECT Id FROM BusinessHours WHERE name = 'CAU2 Support'];
        
        for(Case objCase: newCaseList){
            if(objCase.CASE_DATE_StartDateInProgress__c==null){
                objCase.CASE_DATE_StartDateInProgress__c = System.now();
            }
            if(oldCaseMap.get(objCase.Id).Status != objCase.Status && objCase.status == 'In progress'){
                objCase.CASE_DATE_StartDateInProgress__c = System.now();
            }
        
            if(oldCaseMap.get(objCase.Id).Status != objCase.Status &&  (objCase.Status == 'CAU1' || objCase.Status == 'IT')){
                Decimal hoursInProgress = BusinessHours.diff(cau2BH.Id, objCase.CASE_DATE_StartDateInProgress__c , System.now()); 
                if(objCase.CASE_NUM_DateInprogress__c != null){
                    objCase.CASE_NUM_DateInprogress__c = objCase.CASE_NUM_DateInprogress__c + (hoursInProgress / (1000*60*60));
                }else{
                    objCase.CASE_NUM_DateInprogress__c = (hoursInProgress / (1000*60*60));
                }
            }
        }
    }
    
    public static ReturnValue createComplianceCase(String PaymentId, String Description, WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData){		
		ReturnValue response = null;
		Id RTComplianceId = Schema.SObjectType.Case.getRecordTypeInfosByDeveloperName().get('Compliance').getRecordTypeId();        
        WrapperUserData userData = ServiceUserData.getUserData();       
		
        try{
			Case newCase = new Case(
				Status = 'New',
				Priority = 'Medium',
                Type='Screening Dow Jones',
				RecordTypeId = RTComplianceId,
				CASE_PCK_Record_Type__c = 'Compliance',
				Case_TXT_PaymentId__c = PaymentId,
                CASE_PCK_accountCountry__c = sourceAccountData.country,
                CASE_TXT_accountName__c = sourceAccountData.subsidiaryName,
                CASE_TXT_accountGlobalId__c = sourceAccountData?.companyIdsList?.get('GLOBAL'),
				Origin = 'Dow Jones',
                CASE_TXT_sourceAccountName__c = sourceAccountData.subsidiaryName,
				CASE_TXT_sourceAccountNumber__c = sourceAccountData.displayNumber,
                CASE_TXT_sourceBank__c = sourceAccountData.bankName,
				CASE_TXT_beneficiaryAccountName__c = recipientAccountData.subsidiaryName,
				CASE_TXT_beneficiaryAccountNumber__c = recipientAccountData.displayNumber,
                CASE_TXT_beneficiaryBank__c = recipientAccountData.bankName,
				Subject = 'B2B payment API hit',
				Description = 'Payment description with hit: ' + Description
			);    
            
			insert newCase; 
            
			Map<String, Object> value = new Map<String, Object>();
            value.put('Case', newCase);
            response = new ReturnValue(true, value);           
		} catch (Exception e) {
            System.debug('createComplianceCase: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }       
        return response;
	}
        
    public static void updateOwner(List<Case> newCaseList){
        Id RTComplianceId = Schema.SObjectType.Case.getRecordTypeInfosByDeveloperName().get('Compliance').getRecordTypeId();
        Id groupId = [SELECT Id FROM Group where Type = 'Queue' and DeveloperName = 'ScreeningDowJones' LIMIT 1]?.Id;
        for(Case objCase : newCaseList){
            if(objCase.RecordTypeId == RTComplianceId){     	
            	objCase.ownerId = groupId; 
            }
        }
    }
    
    public static void TreasuryUpdates(List<Case> newCaseList){
    	Id RTFundingId    = Schema.SObjectType.Case.getRecordTypeInfosByDeveloperName().get('TRS_Funding').getRecordTypeId();       
    	Id RTSettlementId = Schema.SObjectType.Case.getRecordTypeInfosByDeveloperName().get('TRS_Settlement').getRecordTypeId(); 
        List<Id> SettlementIds = new List<Id>();
        for(Case objCase : newCaseList){
            if(objCase.RecordTypeId == RTFundingId){
                SettlementIds.add(objCase.ParentId);
            }
        } 
        SettlementStatusUpdates(SettlementIds);
    }
       
    public static void sendEmailAfterInsert(List<Case> newCaseList){
    	Id RTComplianceId = Schema.SObjectType.Case.getRecordTypeInfosByDeveloperName().get('Compliance').getRecordTypeId();
        Id RTFundingId = Schema.SObjectType.Case.getRecordTypeInfosByDeveloperName().get('TRS_Funding').getRecordTypeId();
        for (Case objCase : newCaseList){
            if(objCase.RecordTypeId == RTComplianceId){
                HANDLER_CustomEmailNotification.sendComplianceEmail(objCase.Id);
            }
            else if(objCase.RecordTypeId == RTFundingId){
                if(objCase.Type == 'Notification'){
                	HANDLER_CustomEmailNotification.sendTreasuryEmail(objCase.Id, 'Creation');
                }
            }
        }        
    }
    
    public static void cau2CaseCreation(List<Case> newCaseList){
    	Id RTCId 		  = Schema.SObjectType.Case.getRecordTypeInfosByDeveloperName().get('CaseRecordType').getRecordTypeId();
        Id LowQueueId = [SELECT Id, Name, DeveloperName FROM Group where Type = 'Queue' and DeveloperName = 'LOW_OC' LIMIT 1]?.Id;
        System.debug('cau2CaseCreation LowQueueId: ' + LowQueueId);
        //Id userId = UserInfo.getUserId();
        Id profileId=userinfo.getProfileId();
        String profileName=[Select Id,Name from Profile where Id=:profileId].Name;
        System.debug('cau2CaseCreation profileName: ' + profileName);

        for (Case objCase: newCaseList) {
            if(objCase.RecordTypeId == RTCId && objCase.CASE_CAU1__c == null && objCase.Status == 'New'){
                if(profileName == 'Portal User'){
                    objCase.OwnerId = LowQueueId;
                    //objCase.CASE_Resolutor__c = objCase.OwnerId;
                }else{
                    objCase.Status = 'In Progress';
                    objCase.CASE_Resolutor__c = objCase.OwnerId;	
                }	
            }else if(objCase.RecordTypeId == RTCId && objCase.CASE_CAU1__c == null && objCase.Status == 'In progress'){
                objCase.Status.addError(System.Label.CASE_CAU2_new_case_error);
            }         
        }
    }
    
    public static void SettlementStatusUpdates (List<Id> SettlementIds){
        boolean fundingCompleted;       
        boolean fundingStarted;
        boolean fundingbackCompleted;
        boolean fundingbackStarted;
        List<Case> Settlements = [SELECT Id, Status, CASE_PCK_FundingStatus__c, CASE_PCK_FundingBackStatus__c, (SELECT Id, Status, Type FROM Cases) FROM Case WHERE Id IN :SettlementIds];
        for(Case settlement : Settlements){
            fundingCompleted = true;
            fundingStarted = false;
            fundingbackCompleted = true;            
            fundingbackStarted = false;
            for(Case funding : settlement.Cases){
                Switch on funding.Type {
                    when 'Funding' {
                        if(funding.Status == 'New'){
                            fundingCompleted = false;
                        }
                        if(funding.Status == 'Requested'){
                            fundingCompleted = false;
                            fundingStarted = true;
                        }
                    }
                    when 'Funding Back' {
                       if(funding.Status == 'New'){
                            fundingbackCompleted = false;
                        }
                        if(funding.Status == 'Pending'){
                            fundingbackCompleted = false;
                            fundingbackStarted = true;
                        }
                    }
                }
                if(fundingCompleted){
                    settlement.CASE_PCK_FundingStatus__c = 'Completed';
                }
                else if(fundingStarted){
                    settlement.CASE_PCK_FundingStatus__c = 'In Progress';
                }
                else {
                    settlement.CASE_PCK_FundingStatus__c = 'Pending';
                }                
                if(fundingBackCompleted){
                    settlement.CASE_PCK_FundingBackStatus__c = 'Completed';
                }
                else if(fundingBackCompleted){
                    settlement.CASE_PCK_FundingBackStatus__c = 'In Progress';
                }
                else {
                    settlement.CASE_PCK_FundingBackStatus__c = 'Pending';
                }
            }
        } 
        if(!Settlements.isEmpty()){
            update Settlements;
        }
    }
}