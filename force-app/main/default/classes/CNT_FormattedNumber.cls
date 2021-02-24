/*----------------------------------------------------------------------------------
Author:         Joaquín Vera Vallés
Company:        Deloitte
Description:    Controller of Numbers formatting
Test Class:     CNT_FormattedNumber_Test
History
<Date>			<Author>		<Description>
25/05/2020		Joaquín Vera Vallés     Initial version
----------------------------------------------------------------------------------*/
public with sharing class CNT_FormattedNumber {
    
    //FINAL SEPARATORS
    private final String AUX_SEPARATOR = 'd';
    private final String SALESFORCE_TSEP;
    private final String SALESFORCE_DSEP;
    
    //CONSTRUCTOR ATTRIBUTES
    public String initialNumber;
    
    //Component attributes
    @AuraEnabled public String wholeNumber_Formatted {get;set;}
    @AuraEnabled public String entirePart_Formatted {get;set;}
    @AuraEnabled public String decimalPart_Formatted {get;set;}
    
    //User profile number formaT
    private String userNumberFormat;
    private String userChoosenTSep;
    private String userChoosenDSep;
    
    
    /*----------------------------------------------------------------------------------
Author:         Joaquín Vera Vallés
Company:        Deloitte
Description:    Private constructor of the class to load final data.
History
<Date>			<Author>		<Description>
15/01/2020		Joaquín Vera Vallés     Initial version
----------------------------------------------------------------------------------*/
    {
        Double dummy1 = 1000;
        Double dummy2 = 0.23;
        SALESFORCE_TSEP = dummy1.format().subString(1,2);
        SALESFORCE_DSEP = dummy2.format().subString(1,2);
    }
    
    /*----------------------------------------------------------------------------------
Author:         Joaquín Vera Vallés
Company:        Deloitte
Description:    Loading user separators method
Test Class:     CNT_UsersController_Test
History
<Date>			<Author>		<Description>
15/01/2020		Joaquín Vera Vallés     Initial version
----------------------------------------------------------------------------------*/
    @TestVisible
    private void loadUserSeparators()
    {
        if(this.userNumberFormat.equals('###.###.###,##'))
        {
            //Escaping dots separator
            this.userChoosenTSep = '\\.';
            this.userChoosenDSep = ',';
        }
        
        else if(this.userNumberFormat.equals('###,###,###.##'))
        {
            this.userChoosenTSep = ',';
            this.userChoosenDSep = '.';
        }
    }
    
    /*----------------------------------------------------------------------------------
Author:         Joaquín Vera Vallés
Company:        Deloitte
Description:    Method that formats the dates
Test Class:     CNT_UsersController_Test
History
<Date>			<Author>		<Description>
24/05/2020		Joaquín Vera Vallés     Initial version
----------------------------------------------------------------------------------*/
    @TestVisible
    private void formatNumber()
    {
        //Creating the aux number that will be formatted
        String auxNumber = this.initialNumber;
        //Replasing Thousands separator to a dummy one
        String tSepAux = this.SALESFORCE_TSEP;
        if(this.SALESFORCE_TSEP == '.')
            tSepAux = '\\.';
        
        
        auxNumber = auxNumber.replaceAll(tSepAux, this.AUX_SEPARATOR);
        //Replacing decimal separator to the chosen one
        auxNumber = auxNumber.replace(this.SALESFORCE_DSEP, this.userChoosenDSep);
        //Replacing thousands separator to the chosen one
        auxNumber = auxNumber.replaceAll(this.AUX_SEPARATOR, this.userChoosenTSep);
        
        
        
        if(auxNumber.contains(this.userChoosenDSep))
        {
            //Escaping separator if dot
            String dSepAux = this.userChoosenDSep;
            if(dSepAux.equals('.'))
                dSepAux = '\\.';
            
            this.entirePart_Formatted = auxNumber.split(dSepAux)[0];
            this.decimalPart_Formatted = this.userChoosenDsep + auxNumber.split(dSepAux)[1]; 

            /* If the decimal part size is higher than 2, it reduces to 2 decimals by rounding it */
            if(auxNumber.split(dSepAux)[1].length() >= 3)
            {
                String[] numSplittedAux = Decimal.valueOf('0.' + auxNumber.split(dSepAux)[1]).setScale(2).format().split((SALESFORCE_DSEP == '.' ? '\\.' : SALESFORCE_DSEP));
                
                if(numSplittedAux.size() > 1)
                {
                    //If format method returns 1 decimal, it adds a 0 to the decimal part until it has 2 decimals
                    while(numSplittedAux[1].length() < 2)
                    {
                        numSplittedAux[1] += '0';

                    }
                    //Fills the decimal part formatted
                    this.decimalPart_Formatted = this.userChoosenDsep + numSplittedAux[1];
                }
                //If returns 0 decimals, it builds the decimal part with '00'
                else
                {
                    this.decimalPart_Formatted = this.userChoosenDsep + '00';
                }
            }
            
        }
        //If there is not decimal part, fills the entire part to the aux number and the decimal as 00
        else
        {
            this.entirePart_Formatted = auxNumber;
            this.decimalPart_Formatted = this.userChoosenDSep + '00';
        }

        //The whole number formatted is the entire part plus the decimal part
        this.wholeNumber_Formatted = this.entirePart_Formatted + this.decimalPart_Formatted;
    }
    
    
    
    // CONSTRUCTORS BLOCK
    // ----------------------------------------------------------------------------
    public CNT_FormattedNumber(String numberToFormat, String userNumberFormat)
    {
        if(numberToFormat != null && numberToFormat != '')
        {
            this.initialNumber = Double.valueOf(numberToFormat).format();
            this.userNumberFormat = userNumberFormat;
            this.loadUserSeparators();
            this.formatNumber();
        }
        
    }
    
    public CNT_FormattedNumber(Double numberToFormat, String userNumberFormat)
    {
        if(numberToFormat != null)
        {
            this.initialNumber = numberToFormat.format();
            this.userNumberFormat = userNumberFormat;
            this.loadUserSeparators();
            this.formatNumber();
        }
        
        
    }
    
    public CNT_FormattedNumber(Decimal numberToFormat, String userNumberFormat)
    {
        if(numberToFormat != null)
        {
            this.initialNumber = numberToFormat.format();
            this.userNumberFormat = userNumberFormat;
            this.loadUserSeparators();
            this.formatNumber();
        }
        
        
    }
    
    public CNT_FormattedNumber(Integer numberToFormat, String userNumberFormat)
    {
        if(numberToFormat != null)
        {
            this.initialNumber = numberToFormat.format();
            this.userNumberFormat = userNumberFormat;
            this.loadUserSeparators();
            this.formatNumber();
        }
        
    }
    
    // ----------------------------------------------------------------------------
    
}