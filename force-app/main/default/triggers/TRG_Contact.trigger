trigger TRG_Contact on Contact (after update) {
	 System.debug('TRG_Contact >>>>> entra trigger');
    if (Trigger.isUpdate && Trigger.isAfter) {
       System.debug('TRG_Contact >>>>> entra trigger is after');
        //if(!Trigger.new.isEmpty() && Trigger.new.size() == 1){
            System.debug('TRG_Contact >>>>> After Update');
            HANDLER_Contact.updateAccount(Trigger.oldMap, Trigger.new);
        //}
    }
}