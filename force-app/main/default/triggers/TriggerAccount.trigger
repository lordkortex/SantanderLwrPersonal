trigger TriggerAccount on Account (before update) {
    
    HandlerAccount handler = new HandlerAccount(Trigger.new);
       
    if(Trigger.isBefore && Trigger.isUpdate){
        handler.setParent();
        
    }
}