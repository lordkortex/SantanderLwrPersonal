trigger TRG_User on User (after insert, before insert, before update) {
    if (Trigger.isInsert) {
        
        if(Trigger.isAfter){
            HANDLER_User.updateContact(Trigger.new);
        }
        if(Trigger.isBefore){
            HANDLER_User.enforceOnlyOneParentDummyUser(Trigger.new, null);
        }
    } else if(Trigger.isUpdate){
        if(Trigger.isBefore){
            HANDLER_User.enforceOnlyOneParentDummyUser(Trigger.new, Trigger.oldMap);
        }
    }
}