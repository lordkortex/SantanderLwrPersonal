trigger TRG_Contact on Contact(after update) {
  if (Trigger.isUpdate && Trigger.isAfter) {
    system.debug('TRG_Contact: isAfter');
    system.debug('TRG_Contact: isUpdate');
    HANDLER_Contact.updateUser(Trigger.oldMap, Trigger.new);
  }
}
