trigger TRG_AccountContactRelation on AccountContactRelation (after insert, before insert, after update, before update) {
     if (Trigger.isInsert) {
        System.debug('estoy en isInsert');
        if(Trigger.isAfter){
            HANDLER_AccountContactRelation.checkUsersInsert(Trigger.new);
        }
        if(Trigger.isBefore){
            HANDLER_AccountContactRelation.deactivateTime(Trigger.new);
            HANDLER_AccountContactRelation.createRelationId(Trigger.new);
        }
        System.debug('antes de actualizar');
    } else if(Trigger.isUpdate){
        if(Trigger.isBefore){
            HANDLER_AccountContactRelation.deactivateTime(Trigger.new);
        }
        if(Trigger.isAfter){
            HANDLER_AccountContactRelation.checkUsers(Trigger.new);
        }
    }
}