global without sharing class CNT_B2B_SignatureUtilities {

    /*
    Author:         Candido
    Company:        Deloitte
    Description:    get signer structure of payment.
    History
    <Date>          <Author>        <Description>
    02/02/2021      Candido         Refactor with WRAPPER_PAY_PaymentDraft
    */
    global static WRAPPER_B2B_SignatureStructure getSignatureStructure (String channel, Map<String, String> navigatorInfo, WRAPPER_PAY_PaymentDraft paymentDraft) {
        String serviceAPILine = ServiceAPILine.getAPILine();
        if (serviceAPILine == 'NEXUS' || serviceAPILine == 'MULTI_ONE_TRADE') { // NEXUS OR MULTI_ONE_TRADE
            return CNT_B2B_SignatureUtilitiesNexus.getSignatureStructure(channel, paymentDraft);
        } else if (serviceAPILine == 'LOCAL_BANKING') { // LOCAL_BANKING
            return CNT_B2B_SignatureUtilitiesLocal.getSignatureStructure(channel, navigatorInfo, paymentDraft);
        }
        return null;
    }

    global static void storeSignatureData (WRAPPER_B2B_SignatureStructure structure) {
        // Insertion of the Signature record
        SNG_Payment__c signature = new SNG_Payment__c();
        signature.SGN_TXT_IdPayment__c = structure.paymentID;
        signature.Name = structure.paymentID;
        insert signature;
        // Insertion of each Signature group
        List<WRAPPER_B2B_SignatureStructure.GroupDataDetails> groupDataDetails = structure.StructureListResponse.GroupDataDetails;
        List<SGN_Group__c> groups = new List<SGN_Group__c>();
        Set<String> globalIds = new Set<String>();
        Set<String> localIds = new Set<String>();
        for (WRAPPER_B2B_SignatureStructure.GroupDataDetails g : groupDataDetails) {
            SGN_Group__c newGroup = new SGN_Group__c();
            newGroup.Name = g.groupDescription;
            newGroup.SGN_TXT_IdExt__c = g.groupId;
            newGroup.SGN_TXT_Level__c = g.groupLevel;
            newGroup.SGN_ELCK_RelatedSign__c = signature.Id;
            newGroup.SGN_TXT_SingsRequired__c = Decimal.valueOf(g.signsRequired);
            groups.add(newGroup);
            // Get the users Global Ids
            for (WRAPPER_B2B_SignatureStructure.userList uGroup : g.userList) {
                if (String.isNotBlank(uGroup.userId)) {
                    if (globalIds.contains(uGroup.userId) == false) {
                        globalIds.add(uGroup.userId);
                    }
                } else if (String.isNotBlank(uGroup.localUserId)) {
                    if(localIds.contains(uGroup.localUserId) == false) {
                        localIds.add(uGroup.localUserId);
                    }
                }

            }
        }
        if (!groups.isEmpty()) {
            insert groups;
        }
        List<User> users = new List<User>();
        // Insertion of each Signature user
        if (!globalIds.isEmpty()) {
               users = new List<User>([
                SELECT Id, Name, USER_TXT_GlobalId__c, USER_TXT_LocalUid__c
                FROM User
                WHERE USER_TXT_GlobalId__c IN :globalIds
            ]);
        } else {
               users = new List<User>([
                SELECT Id, Name, USER_TXT_GlobalId__c, USER_TXT_LocalUid__c
                FROM User
                WHERE USER_TXT_LocalUid__c IN :localIds
            ]);
        }
        List<SGN_User__c> signatureUsers = new List<SGN_User__c>();
        for (User u : users) {
            SGN_User__c signatureUser = new SGN_User__c();
            signatureUser.Name = u.Name;
            signatureUser.SGN_TXT_GlobalId__c = u.USER_TXT_GlobalId__c;
            signatureUser.SGN_TXT_LocalId__c = u.USER_TXT_LocalUid__c;
            signatureUser.SGN_ELCK_RelatedUser__c = u.Id;
            signatureUser.SGN_ELCK_RelatedSign__c = signature.Id;
            signatureUsers.add(signatureUser);
        }
        if (!signatureUsers.isEmpty()) {
            insert signatureUsers;
        }
        // Insertion of each Signature Group User
        if (!signatureUsers.isEmpty() && !groups.isEmpty()) {
            List<SNG_Group_User__c> groupUsers = new List<SNG_Group_User__c>();
            for (WRAPPER_B2B_SignatureStructure.GroupDataDetails g : groupDataDetails) {
                String groupId = '';
                for (SGN_Group__c groupItem : groups) {
                    if (groupItem.Name == g.groupDescription && groupItem.SGN_TXT_IdExt__c == g.groupId && groupItem.SGN_TXT_Level__c == g.groupLevel) {
                        groupId = groupItem.Id;
                    }
                }
                for (WRAPPER_B2B_SignatureStructure.userList u : g.userList) {
                    for (SGN_User__c userItem : signatureUsers) {
                        if (userItem.SGN_TXT_GlobalId__c == u.userId) {
                            SNG_Group_User__c groupUser = new SNG_Group_User__c();
                            groupUser.Name =  '';
                            groupUser.SGN_ELCK_RelatedGroup__c =  groupId;
                            groupUser.SGN_ELCK_RelatedUser__c = userItem.Id;
                            groupUsers.add(groupUser);
                        }
                    }
                }
            }
            if (!groupUsers.isEmpty()) {
                insert groupUsers;
            }
        }
    }


   global static void storeUserSign (String PaymentID, String userID, Boolean finalAuthorizer, String scaUid) {
        try {
            // Save sign in Stratio
            String statusCode = WS_B2B_storeSignature.storeSignature(PaymentID, scaUid);
            if (statusCode == '200') {
                // Update the payment Status
                WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentID);
                if (finalAuthorizer == true) {
                    wsObject.updateStatus('101', '001');
                } else {
                    wsObject.updateStatus('002', '002');
                }
                // Save sign in SFDC
                if (userID == '' || userID == null) {
                    userID = Global_Utilities.getUserData('').USER_TXT_GlobalId__c;
                }
                if (PaymentID != '' && PaymentID != null && userID != '' && userID!= null) {
                    List<SGN_User__c> user = new List<SGN_User__c>([
                        SELECT Id, SGN_DATET_Completed__c, SGN_ELCK_RelatedSign__r.SGN_TXT_IdPayment__c
                        FROM SGN_User__c
                        WHERE SGN_ELCK_RelatedSign__r.SGN_TXT_IdPayment__c = :PaymentID
                        AND SGN_TXT_GlobalId__c = :userID AND SGN_ELCK_RelatedUser__c = :userInfo.getUserId()
                    ]);
                    if (!user.isEmpty() && user.size() == 1 && user[0].SGN_DATET_Completed__c == null) {
                        user[0].SGN_DATET_Completed__c = DateTime.now();
                        update user[0];
                        checkCompletedSignatureGroup(user[0].SGN_ELCK_RelatedSign__r.SGN_TXT_IdPayment__c);
                    }
                }
            }
        } catch (Exception e) {
            throw new CustomException('CNT_B2B_SignatureUtilities.storeUserSign: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }

    global static void checkCompletedSignatureGroup (String paymentID) {
        List<SNG_Payment__c> signature = new List<SNG_Payment__c>([
            SELECT Id
            FROM SNG_Payment__c
            WHERE SGN_TXT_IdPayment__c = :paymentID
        ]);
        if (!signature.isEmpty()) {
            List<SGN_Group__c> groups = new List<SGN_Group__c>([
                SELECT Id, SGN_TXT_SingsRequired__c, SGN_TXT_Level__c, SGN_DATET_Completed__c
                FROM SGN_Group__c
                WHERE SGN_ELCK_RelatedSign__c = :signature[0].Id
            ]);
            Set<SGN_User__c> users = new Set<SGN_User__c>([
                SELECT Id
                FROM SGN_User__c
                WHERE SGN_ELCK_RelatedSign__c = :signature[0].Id
                AND SGN_DATET_Completed__c != null
            ]);
            List<String> groupsIds = new List<String>();
            List<String> usersIds = new List<String>();
            if (!groups.isEmpty() && !users.isEmpty()) {
                for (SGN_Group__c g : groups) {
                    groupsIds.add(g.Id);
                }
                for (SGN_User__c s : users) {
                    usersIds.add(s.Id);
                }
                List<SNG_Group_User__c> groupUsers = new List<SNG_Group_User__c>([
                    SELECT SGN_ELCK_RelatedGroup__c
                    FROM SNG_Group_User__c
                    WHERE SGN_ELCK_RelatedUser__c IN :usersIds
                    AND SGN_ELCK_RelatedGroup__c IN :groupsIds
                ]);
                for (SGN_Group__c g : groups) {
                    Integer count = 0;
                    for (SNG_Group_User__c gu : groupUsers) {
                        if (gu.SGN_ELCK_RelatedGroup__c == g.Id) {
                            count++;
                        }
                    }
                    if (count >= g.SGN_TXT_SingsRequired__c) {
                        if (g.SGN_DATET_Completed__c == null) {
                            g.SGN_DATET_Completed__c = DateTime.now();
                        }
                    }
                }
                update groups;
                checkCompletedSignature(paymentID);
            }
        }
    }

    global static void checkCompletedSignature (String paymentID) {
        List<SNG_Payment__c> signature = new List<SNG_Payment__c>([
            SELECT Id, SGN_DATET_Completed__c
            FROM SNG_Payment__c
            WHERE SGN_TXT_IdPayment__c = :paymentID
        ]);
        if (!signature.isEmpty()) {
            List<SGN_Group__c> groups = new List<SGN_Group__c>([
                SELECT Id, SGN_TXT_Level__c, SGN_DATET_Completed__c
                FROM SGN_Group__c
                WHERE SGN_ELCK_RelatedSign__c = :signature[0].Id
            ]);
            Map<String, Integer> levelsRequired = new Map<String, Integer>();
            Map<String, Integer> levelsCurrent = new Map<String, Integer>();
            // Get the levels
            for (SGN_Group__c g : groups) {
                String key = g.SGN_TXT_Level__c;
                // Get required groups per level
                if (!levelsRequired.containsKey(key)) {
                    levelsRequired.put(key, 0);
                }
                Integer countRequired = levelsRequired.get(key) + 1;
                levelsRequired.put(key,countRequired);
                // Get current completed groups per level
                if (!levelsCurrent.containsKey(key)) {
                    levelsCurrent.put(key, 0);
                }
                if (g.SGN_DATET_Completed__c != null) {
                    Integer countCurrent = levelsCurrent.get(key) + 1;
                    levelsCurrent.put(key, countCurrent);
                }
            }
            // Check if the level is completed
            for (String level : levelsRequired.keySet()) {
                if (levelsRequired.get(level) == levelsCurrent.get(level)) {
                    if (signature[0].SGN_DATET_Completed__c == null) {
                        signature[0].SGN_DATET_Completed__c = DateTime.now();
                    }
                }
            }
            update signature;
        }
    }

    global static Map<String, String> getSignatoryStatus (String paymentId) {
        List<SNG_Payment__c> signature = new List<SNG_Payment__c>([
            SELECT Id, SGN_DATET_Completed__c
            FROM SNG_Payment__c
            WHERE SGN_TXT_IdPayment__c = :paymentId
        ]);
        if (!signature.isEmpty() && signature != null) {
            Map<string, String> result = new Map<String, String>();
            if (signature[0].SGN_DATET_Completed__c != null) {
                result.put('completed','true');
            } else {
                Map<Id, SGN_User__c> users = new Map<Id, SGN_User__c>([
                    SELECT Id, SGN_DATET_Completed__c, SGN_ELCK_RelatedUser__c
                    FROM SGN_User__c
                    WHERE SGN_ELCK_RelatedSign__c = :signature[0].Id
                ]);
                SGN_User__c currentUser = null;
                for (SGN_User__c u : users.values()) {
                    if (u.SGN_ELCK_RelatedUser__c == UserInfo.getUserId()) {
                        currentUser = users.get(u.Id);
                    }
                }
                // Check if the current user can authorize the payment
                if (currentUser == null) {
                    result.put('signatory', 'false');
                } else {
                    result.put('signatory', 'true');
                    // Check if the user already signed
                    if (currentUser.SGN_DATET_Completed__c != null) {
                        result.put('signed','true');
                    } else {
                        result.put('signed','false');
                        // Check the number of signatures left
                        Map<Id, SGN_Group__c> groups = new Map<Id, SGN_Group__c>([
                            SELECT Id, SGN_TXT_SingsRequired__c, SGN_TXT_Level__c, SGN_DATET_Completed__c
                            FROM SGN_Group__c
                            WHERE SGN_ELCK_RelatedSign__c = :signature[0].Id
                            AND SGN_DATET_Completed__c = null
                        ]);
                        List<String> groupsIds = new List<String>();
                        List<String> usersIds = new List<String>();
                        if (!groups.isEmpty() && !users.isEmpty()) {
                            List<SNG_Group_User__c> groupUsers = new List<SNG_Group_User__c>([
                                SELECT SGN_ELCK_RelatedGroup__c, SGN_ELCK_RelatedGroup__r.SGN_TXT_SingsRequired__c, SGN_ELCK_RelatedUser__c, SGN_ELCK_RelatedUser__r.SGN_DATET_Completed__c
                                FROM SNG_Group_User__c
                                WHERE SGN_ELCK_RelatedUser__c IN :users.keyset()
                                AND SGN_ELCK_RelatedGroup__c IN :groups.keyset()
                            ]);
                            Set<Id> userGroups = new Set<Id>();
                            // GroupId and Signatures left
                            Map<Id, Decimal> res = new Map<Id, Decimal>();
                            for (SNG_Group_User__c gu : groupUsers) {
                                if (gu.SGN_ELCK_RelatedUser__c == currentUser.Id) {
                                    userGroups.add(gu.SGN_ELCK_RelatedGroup__c);
                                    res.put(gu.SGN_ELCK_RelatedGroup__c, gu.SGN_ELCK_RelatedGroup__r.SGN_TXT_SingsRequired__c);
                                }
                            }
                            for (SNG_Group_User__c gu : groupUsers) {
                                if (res.keyset().contains(gu.SGN_ELCK_RelatedGroup__c)) {
                                    if (gu.SGN_ELCK_RelatedUser__r.SGN_DATET_Completed__c != null) {
                                        res.put(gu.SGN_ELCK_RelatedGroup__c, res.get(gu.SGN_ELCK_RelatedGroup__c) - 1);
                                    }
                                }
                            }
                            List<Decimal> values = res.values();
                            values.sort();
                            if (values[0] == 1) {
                                result.put('lastSign', 'true');
                            } else {
                                result.put('lastSign', 'false');
                            }
                        }
                    }
                }
            }
            return result;
        } else {
            return null;
        }
    }

    global static void deleteSignatureRecord (String paymentId) {
        List<SNG_Payment__c> signature = new List<SNG_Payment__c>([
            SELECT Id
            FROM SNG_Payment__c
            WHERE Id = :paymentId
        ]);
        if (!signature.isEmpty() && signature != null) {
            List<SGN_User__c> users = new List<SGN_User__c>([
                SELECT Id
                FROM SGN_User__c
                WHERE SGN_ELCK_RelatedSign__c = :signature[0].Id
            ]);
            List<SGN_Group__c> groups = new List<SGN_Group__c>([
                SELECT Id
                FROM SGN_Group__c
                WHERE SGN_ELCK_RelatedSign__c = :signature[0].Id
            ]);
            List<String> groupsIds = new List<String>();
            List<String> usersIds = new List<String>();
            if (!groups.isEmpty() && !users.isEmpty()) {
                for (SGN_Group__c g : groups) {
                    groupsIds.add(g.Id);
                }
                for (SGN_User__c s : users) {
                    usersIds.add(s.Id);
                }
                List<SNG_Group_User__c> groupUsers = new List<SNG_Group_User__c>([
                    SELECT SGN_ELCK_RelatedGroup__c
                    FROM SNG_Group_User__c
                    WHERE SGN_ELCK_RelatedUser__c IN :usersIds
                    AND SGN_ELCK_RelatedGroup__c IN :groupsIds
                ]);
                if (!groupUsers.isEmpty()) {
                    delete groupUsers;
                }
                delete users;
                delete groups;
                delete signature;
            }
        }
    }


    global static void storeOTPId (String otpId, String paymentID) {
        try {
            List<SNG_Payment__c> signature = new List<SNG_Payment__c>([
                SELECT Id
                FROM SNG_Payment__c
                WHERE SGN_TXT_IdPayment__c = :paymentID
            ]);
            if (!signature.isEmpty()) {
                String userID = Global_Utilities.getUserData('').USER_TXT_GlobalId__c;
                List<SGN_User__c> user = new List<SGN_User__c>([
                    SELECT Id, SNG_OTP_ID__c, SGN_DATET_Completed__c, SGN_ELCK_RelatedSign__r.SGN_TXT_IdPayment__c
                    FROM SGN_User__c
                    WHERE SGN_ELCK_RelatedSign__r.SGN_TXT_IdPayment__c = :paymentID
                    AND SGN_TXT_GlobalId__c = :userID
                ]);
                if (!user.isEmpty()) {
                    user[0].SNG_OTP_ID__c = otpId;
                    update user;
                }
            }
        } catch (Exception e) {
            System.debug('CNT_B2B_SignatureUtilities.storeOTPId: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }

    global static ReturnValue getOTP_Strategic (String beneficiaryName, String beneficiaryAccount, String paymentId, String debitAmount, String fees, String exchangeRate, String paymentAmount, WRAPPER_PaymentDetail.OperationDetail paymentDetail, String service_id, Map<String, String> navigatorInfo) {
        String serviceAPILine = ServiceAPILine.getAPILine();
        if (serviceAPILine == 'MULTI_ONE_TRADE') { // MULTI_ONE_TRADE
            return CNT_B2B_SignatureUtilitiesNexus.getOTP_Strategic(beneficiaryName, beneficiaryAccount, paymentId, debitAmount, fees, exchangeRate, paymentAmount);
        } else if (serviceAPILine == 'NEXUS') { // NEXUS
            return CNT_B2B_SignatureUtilitiesNexus.getOTP_Strategic(beneficiaryName, beneficiaryAccount, paymentId, debitAmount, fees, exchangeRate, paymentAmount);
        } else if (serviceAPILine == 'LOCAL_BANKING') { // LOCAL_BANKING
            return CNT_B2B_SignatureUtilitiesLocal.getOTP_Strategic(paymentId, paymentDetail, service_id, navigatorInfo);
        }
        return null;
    }

    /*
    Author:         Candido
    Company:        Deloitte
    Description:    Makes a call to an external WS to validate if a transaction can be processed on behalf of a customer according to their transactional limits.
    History
    <Date>          <Author>        <Description>
    02/02/2021      Candido         Refactor with WRAPPER_PAY_PaymentDraft
    */
    global static ReturnValue getOTP_Strategic (String debitAmount, String fees, String exchangeRate, String paymentAmount, WRAPPER_PAY_PaymentDraft paymentDraft, Map<String, String> navigatorInfo) {
        String serviceAPILine = ServiceAPILine.getAPILine();
        if (serviceAPILine == 'NEXUS' || serviceAPILine == 'MULTI_ONE_TRADE') { // NEXUS OR MULTI_ONE_TRADE
            return CNT_B2B_SignatureUtilitiesNexus.getOTP_Strategic(paymentDraft.destinationAccount.subsidiaryName, paymentDraft.destinationAccount.displayNumber, paymentDraft.paymentId, debitAmount, fees, exchangeRate, paymentAmount);
        } else if (serviceAPILine == 'LOCAL_BANKING') { // LOCAL_BANKING
            return CNT_B2B_SignatureUtilitiesLocal.getOTP_Strategic(navigatorInfo, paymentDraft);
        }
        return null;
    }

    global static String getSignatoriesStatus (String paymentId) {
        String res = '';
        try {
            List<SNG_Payment__c> signature = new List<SNG_Payment__c>([
                SELECT Id
                FROM SNG_Payment__c
                WHERE SGN_TXT_IdPayment__c = :paymentId
            ]);
            if (!signature.isEmpty()) {
                List<SGN_User__c> users = new List<SGN_User__c>([
                    SELECT Id, SGN_DATET_Completed__c, SGN_TXT_LocalId__c, SGN_ELCK_RelatedSign__r.SGN_TXT_IdPayment__c, SGN_TXT_GlobalId__c
                    FROM SGN_User__c
                    WHERE SGN_ELCK_RelatedSign__r.SGN_TXT_IdPayment__c= :paymentId
                ]);
                if (!users.isEmpty()) {
                    String serviceAPILine = ServiceAPILine.getAPILine();
                    res +='{';
                    for (SGN_User__c s : users) {
                        if (s.SGN_DATET_Completed__c != null) {
                            if (serviceAPILine == 'MULTI_ONE_TRADE' || serviceAPILine == 'NEXUS') {
                                res += s.SGN_TXT_GlobalId__c+':OK,';
                            } else if (serviceAPILine == 'LOCAL_BANKING') {
                                res += s.SGN_TXT_LocalId__c+':OK,';
                            }
                        }
                    }
                    res = res.removeEnd(',');
                    res += '}';
                }
            }
            system.debug(res);
            return res;
        } catch (Exception e) {
            System.debug('getSignatoriesStatus: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return null;
    }
    
    global static Boolean checkUserRedirect (String paymentId, String scaUid) {
        Boolean validUser = false;
        try {
            List<SNG_Payment__c> signature = new List<SNG_Payment__c>([
                SELECT Id
                FROM SNG_Payment__c
                WHERE SGN_TXT_IdPayment__c = :paymentId
            ]);
            if (!signature.isEmpty()) {
                
                Map<String, String> signatory = CNT_B2B_SignatureUtilities.getSignatoryStatus(paymentId);
                
                if(signatory != null){
                    if(signatory.get('signatory') != null && signatory.get('signatory') != 'true'){
            			throw new CustomException('CNT_B2B_SignatureUtilities.checkUserRedirect: The user is not a signatory');
                    }else if(signatory.get('signed') != null && signatory.get('signed') != 'false'){
            			throw new CustomException('CNT_B2B_SignatureUtilities.checkUserRedirect: The user has already signed');
                    }else{
                        //Check if the sign process Id
                        List<SGN_User__c> users = new List<SGN_User__c>([
                            SELECT Id
                            FROM SGN_User__c
                            WHERE SGN_ELCK_RelatedSign__r.SGN_TXT_IdPayment__c= :paymentId AND SNG_OTP_ID__c= :scaUid
                        ]);
                        if (users.isEmpty()) {
            				throw new CustomException('CNT_B2B_SignatureUtilities.checkUserRedirect: No signature user found for that scaUid');
                        }else{
                            validUser = true;
                        }
                    }
                }else{
            		throw new CustomException('CNT_B2B_SignatureUtilities.checkUserRedirect: No signatory map');
                }
            }else{
            	throw new CustomException('CNT_B2B_SignatureUtilities.checkUserRedirect: No sign record for this paymentId');
            }
                
            return validUser;
        } catch (Exception e) {
            System.debug('CNT_B2B_SignatureUtilities: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return null;
    }
}