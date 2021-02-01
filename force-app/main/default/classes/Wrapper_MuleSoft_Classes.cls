public class Wrapper_MuleSoft_Classes {
  
    public class Wrapper_GlobalBalance{
       public String globalId {get;set;}
       public List<Wrapper_Account> accounts {get;set;}
    }
    public class Wrapper_Account{
        public String	accountId	{get;set;}   
        public String	country	{get;set;} 
        public String	alias	{get;set;} 
		public String 	subsidiaryName {get;set;}  
        public String	lastUpdateAvailableBalance	{get;set;}
        public String	displayNumber	{get;set;} 
        public String	bankName	{get;set;}
        public String	amountMainBalance	{get;set;} 
        public String	amountAvailableBalance	{get;set;}    
        public String	currencyCodeAvailableBalance	{get;set;}
        public String	agent	{get;set;}

    }
    
    
   
    
}