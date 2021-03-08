global class Wrapper_MuleSoft_Classes {
  
    global class Wrapper_GlobalBalance{
       global String globalId {get;set;}
       global List<Wrapper_Account> accounts {get;set;}
       global Wrapper_GlobalBalance(){
        System.debug('Wrapper_MuleSoft_Classes.Wrapper_GlobalBalance');
    }
    }
    global class Wrapper_Account{
        global String	accountId	{get;set;}   
        global String	country	{get;set;} 
        global String	alias	{get;set;} 
		global String 	subsidiaryName {get;set;}  
        global String	lastUpdateAvailableBalance	{get;set;}
        global String	displayNumber	{get;set;} 
        global String	bankName	{get;set;}
        global String	amountMainBalance	{get;set;} 
        global String	amountAvailableBalance	{get;set;}    
        global String	currencyCodeAvailableBalance	{get;set;}
        global String	agent	{get;set;}

        global Wrapper_Account(){
            System.debug('Wrapper_MuleSoft_Classes.Wrapper_Account');
        }
        

    }
    
    
   
    
}