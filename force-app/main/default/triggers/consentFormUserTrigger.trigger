trigger consentFormUserTrigger on Account (after insert, after update, before update) {
    
    HandlerAccount handler = new HandlerAccount(Trigger.new);

    //handler.setUserId();
}