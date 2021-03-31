trigger TRG_Contact on Contact (after update) {
    if(trigger.isUpdate && trigger.isAfter) {
		system.debug('TRG_Contact: isAfter');
        system.debug('TRG_Contact: isUpdate');
        HANDLER_Contact.updateUser(trigger.oldMap, trigger.new);
    }
}