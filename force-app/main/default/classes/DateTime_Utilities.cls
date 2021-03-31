/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Holds DateTime auxiliar functions
Test Class:     DateTime_Utilities_Test
History
<Date>          <Author>        <Description>
26/11/2019      Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
public class DateTime_Utilities {
    
    /*----------------------------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:
            Input: 
            fString --> YYYY-MM-DDThh:mm:ss:sssZ    /   mask    = 0
            YYYY-MM-DDThh:mm:ss:sss /   mask    =   1
            YYYY-MM-DDThh:mm:ss.sss+/-hh:mm /   mask    =   2
            YYYY-MM-DDThh:mm:ss /   mask    =   3
            Output:
            DateTime value that depends on user's timezone

    History
    <Date>          <Author>        <Description>
    05/03/2020      Shahad Naji     Initial version
    ----------------------------------------------------------------------------------*/        
    public static DateTime getDatetime(String fString, Integer mask){
        DateTime iDateTime = null;
        DateTime iDateTimeAux = null;
        String iTimezone = '';
        try{
            if(String.isEmpty(fString)){
                System.debug('The following error has occurred: The method has received an empty String');
            /*}else if((fString.length() != 24 && mask == 0) || (fString.length() != 23  && mask == 1) || (fString.length() != 28 && mask == 2)|| (fString.length() != 20 && mask == 3)){
                System.debug('The following error has occurred: The method has received a String with incorrect length'); 
                System.debug(fString.length());  */          
           
            }
            else{
                if(mask == 0){
                    system.debug('>>> SNJ mask 0');                    
                    iDateTimeAux = stringToDateTime(fString, mask);
                    system.debug('>>> SNJ mask 0: ' + stringToDateTime(fString, mask));
                    iTimezone = 'GMT+00:00';
                    iDateTime = getDate(iDateTimeAux, iTimezone);
                }
                if(mask == 1){
                    system.debug('>>> SNJ mask 1');
                    iDateTimeAux = stringToDateTime(fString, mask);
                    system.debug('>>> SNJ mask 1: ' + stringToDateTime(fString, mask));
                    iDateTime = iDateTimeAux;
                }
                if(mask == 2){
                    system.debug('>>> SNJ mask 2');
                    iDateTimeAux = stringToDateTime(fString, mask);
                    iTimezone = 'GMT'+fString.substring(23,28);
                    iDateTime = getDate(iDateTimeAux, iTimezone);
                }
                if(mask == 3){
                    system.debug('>>> SNJ mask 3');
                    iDateTimeAux = stringToDateTime(fString, mask);
                    system.debug('>>> SNJ mask 3: ' + stringToDateTime(fString, mask));
                    iDateTime = iDateTimeAux;
                }
            }
        }catch(Exception e){
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());    
            System.debug('Cause: ' + e.getCause());    // returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString());
        }        
        return iDateTime;
    }
    
    /*----------------------------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Returns current user date time
    History
    <Date>          <Author>        <Description>
    25/10/2019      Shahad Naji     Initial version
    ----------------------------------------------------------------------------------*/    
    public static String getCurrentUserDateTime(){  
        String str = '';
        try{
            Datetime now = Datetime.now(); 
            Integer offset = UserInfo.getTimezone().getOffset(now); 
            Datetime local = now.addSeconds(offset/1000);
            str = local.format('dd/MM/yyyy, HH:MM');
        }catch(Exception e){
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());    
            System.debug('Cause: ' + e.getCause());    // returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString()); 
        }        
        return str;
    }
    
    /*----------------------------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Formats Date
    History
    <Date>          <Author>        <Description>
    25/10/2019      Shahad Naji     Initial version
    ----------------------------------------------------------------------------------*/        
    public static String formatDate(Datetime dateToStr){
        String str = '';
        try{
            str = dateToStr.format('dd/MM/yyyy, HH:mm');
        }catch(Exception e){
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());    
            System.debug('Cause: ' + e.getCause());    // returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString()); 
        }        
        return str;
    }
    
    /*----------------------------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:   
    Input: 
    strToDate   --> 
    YYYY-MM-DDThh:mm:ss:sssZ    /   mask    = 0
    YYYY-MM-DDThh:mm:ss:sss /   mask    =   1
    YYYY-MM-DDThh:mm:ss.sss+/-hh:mm /   mask    =   2


    Receives a String with 'yyyy-mm-ddTHH:MM:SS.sss+HH:MM' format (Ex. '20191112T141016000+0300') and Returns a DateTime
    History
    <Date>          <Author>        <Description>
    27/11/2019      Shahad Naji     Initial version
    05/03/2020      Shahad Naji     The method receives three different types of datetime format
    ----------------------------------------------------------------------------------*/  
    public static DateTime stringToDateTime(String strToDate, Integer mask){
        DateTime myDateTime = null;
        try{
            if(String.isEmpty(strToDate)){
                System.debug('The following error has occurred: The method has received an empty String');
            /*}else if((strToDate.length() != 24 && mask == 0) || (strToDate.length() != 23  && mask == 1) || (strToDate.length() != 28 && mask == 2)|| (strToDate.length() != 20 && mask == 3)){
                System.debug('The following error has occurred: The method has received a String with incorrect length');   */         
            }else{                 
                if(mask == 0 || mask == 1 || mask == 2 || mask == 3){                      
                    Integer iYear = Integer.valueOf(strToDate.substring(0,4));
                    Integer iMonth =  Integer.valueOf(strToDate.substring(5,7));  
                    Integer iDay =  Integer.valueOf(strToDate.substring(8,10));               
                    Integer iHour =  Integer.valueOf(strToDate.substring(11,13));                
                    Integer iMinutes =  Integer.valueOf(strToDate.substring(14,16));               
                    Integer iSeconds =  Integer.valueOf(strToDate.substring(17,19));
                    Date myDate = Date.newInstance(iYear, iMonth, iDay);
                    Time myTime = Time.newInstance(iHour, iMinutes, iSeconds, 0);
                    myDateTime = DateTime.newInstance(myDate, myTime);
                }else{
                    System.debug('The following error has occurred: The method hasn\'t received a correct mask ');            
                }
            }
        }catch(Exception e){
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());    
            System.debug('Cause: ' + e.getCause());    // returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString()); 
        }
        return myDateTime;
    }
    
    /*----------------------------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Receives a String with 'yyyy-mm-ddTHH:MM:SS.sss+HH:MM' format (Ex. '20191112T141016000+0300') and Returns a time zone
    History
    <Date>          <Author>        <Description>
    27/11/2019      Shahad Naji     Initial version
    ----------------------------------------------------------------------------------*/     
    public static String getStrTimeZone(String strTimeZone){
        String aux = '';
        try{
            if(String.isEmpty(strTimeZone)){
                System.debug('The following error has occurred: The method has received an  empty String');       
            }else if(strTimeZone.length() != 23){
                System.debug('The following error has occurred: The method has received a String with incorrect length');           
            }else{
                String auxTzHours = strTimeZone.substring(18,21);
                System.debug('auxTzHours: ' + auxTzHours);
                String auxTzMinutes = strTimeZone.substring(21,23);
                System.debug('auxTzMinutes: ' + auxTzMinutes);
                String tzHM = 'GMT' + auxTzHours +':'+ auxTzMinutes;
                aux = tzHM;
                System.debug('tzHM: ' + tzHM);
            }
        }catch(Exception e){
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());    
            System.debug('Cause: ' + e.getCause());    // returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString()); 
        }        
        return aux;
    }  
    
    /*----------------------------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Returns DateTime value according to current user's time zone
    History
    <Date>          <Author>        <Description>
    26/11/2019      Shahad Naji     Initial version
    ----------------------------------------------------------------------------------*/  
    public static DateTime getDate(DateTime myDateTime, String strTimeZone){
        system.debug('>>> ' + myDateTime);
        system.debug('>>> ' + strTimeZone);
        DateTime local = null;
        try{            
            if(myDateTime != null && String.isNotEmpty(strTimeZone)){
                Integer offset = Timezone.getTimeZone(strTimeZone).getOffset(myDateTime);
                offset *= -1;
                local = myDateTime.addSeconds(offset/1000);
                system.debug('>>> SNJ: ' + local);
            }else{
                local = NULL;
                System.debug('The following error has occurred: The method has received invalid inputs');           
            }
        }catch(Exception e){
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());    
            System.debug('Cause: ' + e.getCause());    // returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString()); 
        }        
        return local;
    }
    
    /*----------------------------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Calculates the difference between two DateTime values
    History
    <Date>          <Author>        <Description>
    26/11/2019      Shahad Naji     Initial version
    ----------------------------------------------------------------------------------*/  
    public static List<Integer> getDifferenceDateTime(DateTime fDateTime, DateTime oDateTime){
        System.debug(fDateTime);
        System.debug(oDateTime);

        List<Integer> result = new List<Integer>();
        try {
            Long createdDateTime = fDateTime.getTime();
            Long modifiedDateTime = oDateTime.getTime();
            Decimal diffMilliSecs = Decimal.valueOf(modifiedDateTime - createdDateTime);
            
            Decimal dDays = diffMilliSecs/1000/60/60/24;
            Integer iDays = Integer.valueOf(math.floor(dDays));
            Decimal remainderDays = dDays- iDays;
            
            Decimal dHours = remainderDays * 24;
            Integer iHours = Integer.valueOf(math.floor(dHours));
            Decimal remainderHours = dHours - iHours;
            
            Decimal dMinutes = remainderHours * 60;
            Integer iMinutes = Integer.valueOf(math.floor(dMinutes));
            Decimal remainderMinutes = dMinutes - iMinutes;
            
            Decimal dSeconds = remainderMinutes * 60;
            Integer iSeconds = Integer.valueOf(math.floor(dSeconds));
            Decimal remainderSeconds = dSeconds - iSeconds;
            System.debug('>>> DifferenceDateTime: '+ iDays);
            System.debug('>>> DifferenceDateTime: '+ iHours);
            System.debug('>>> DifferenceDateTime: '+ iMinutes);
            result.add(iDays);
            result.add(iHours);
            result.add(iMinutes);
            result.add(iSeconds);

            /*if((iDays <= 0) && (iHours <= 0) && (iMinutes <= 0)){
                result = iDays + ' '  + System.Label.Days + ' ' + iHours + ' h ' + iMinutes + ' min';
            }else if((iDays <= 0) && (iHours <= 0) && (iMinutes > 0)){
                result = iMinutes + ' min';
            }else if((iDays <= 0) && (iHours > 0) && (iMinutes <= 0)){
                result = iHours + ' h';
            }else if((iDays <= 0) && (iHours > 0) && (iMinutes > 0)){
                result = iHours + ' h ' + iMinutes + ' min';
            }else if((iDays > 0) && (iHours <= 0) && (iMinutes <= 0)){
                result = iDays + ' ' + System.Label.Days;
            }else if((iDays > 0) && (iHours <= 0) && (iMinutes > 0)){
                result = iDays + ' ' + System.Label.Days + ' ' + iMinutes + ' min';
            }else if((iDays > 0) && (iHours > 0) && (iMinutes <= 0)){
                result = iDays + ' ' + System.Label.Days + ' ' + iHours + ' h';
            }else{
                result = iDays + ' ' + System.Label.Days + ' ' + iHours + ' h ' + iMinutes + ' min';
            }*/
            System.debug('>>> DifferenceDateTime: '+ result);
            System.debug('Days: ' + iDays+' - '+'Hours: ' + iHours+' - '+'Minutes: ' + iMinutes+' - '+'Seconds: ' + iSeconds);            
        }catch(Exception e){
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());    
            System.debug('Cause: ' + e.getCause());    // returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString());  
        }
        System.debug(result);
        return result;
    }
    
    
      /*----------------------------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:   
    Input: 
    strToDate  -->  
    YYYY-MM-DDThh:mm:ss:sssZ  /  mask  = 0
    YYYY-MM-DDThh:mm:ss:sss  /  mask  =  1
    YYYY-MM-DDThh:mm:ss.sss+/-hh:mm  /  mask  =  2


    Receives a String with 'yyyy-mm-ddTHH:MM:SS.sss+HH:MM' format (Ex. '20191112T141016000+0300') and Returns a DateTime
    History
    <Date>      <Author>    <Description>
    27/11/2019    Shahad Naji     Initial version
    05/03/2020    Shahad Naji    The method receives three different types of datetime format
    ----------------------------------------------------------------------------------*/  
    public static DateTime stringToDateTimeStep(String strToDate, Integer mask){
        DateTime myDateTime = null;
        try{
            if(String.isEmpty(strToDate)){
                System.debug('The following error has occurred: The method has received an empty String');
            /*}else if((strToDate.length() != 24 && mask == 0) || (strToDate.length() != 23  && mask == 1) || (strToDate.length() != 28 && mask == 2)|| (strToDate.length() != 20 && mask == 3)){
                System.debug('The following error has occurred: The method has received a String with incorrect length');   */         
            }else{                 
                if(mask == 0 || mask == 1 || mask == 2 || mask == 3){                      
                    Integer iYear = Integer.valueOf(strToDate.substring(0,4));
                    Integer iMonth =  Integer.valueOf(strToDate.substring(5,7));  
                    Integer iDay =  Integer.valueOf(strToDate.substring(8,10));               
                    Integer iHour =  Integer.valueOf(strToDate.substring(11,13));                
                    Integer iMinutes =  Integer.valueOf(strToDate.substring(14,16));               
                    Integer iSeconds =  Integer.valueOf(strToDate.substring(17,19));
                    Date myDate = Date.newInstance(iYear, iMonth, iDay);
                    Time myTime = Time.newInstance(iHour, iMinutes, iSeconds, 0);
                    Datetime local  = DateTime.newInstanceGMT(myDate, myTime);
                    
                    Integer offset = UserInfo.getTimezone().getOffset(local);
                    myDateTime = local.addSeconds(offset/1000);                
                }else{
                    System.debug('The following error has occurred: The method hasn\'t received a correct mask ');            
                }
            }
        }catch(Exception e){
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());    
            System.debug('Cause: ' + e.getCause());    // returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString()); 
        }
        return myDateTime;
    }
    
    
}