/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Wrapper of International Payments Tracker Detail
Test Class:     WRAPPER_IPTDetail_Test
History
<Date>          <Author>        <Description>
27/02/2020      Shahad Naji     Initial version
21/09/2020      Antonio Duarte  Remade version
----------------------------------------------------------------------------------*/
global with sharing class WRAPPER_IPTDetail {

    global WRAPPER_IPTDetail(){
        System.debug('WRAPPER_IPTDetail');
    }

    @AuraEnabled global cancellationStatus          cancellationStatus;
    @AuraEnabled global String                      completionTime;
    @AuraEnabled global String                      initiationTime;
    @AuraEnabled global String                      lastUpdateTime;
    @AuraEnabled global List<paymentEventsArray>    paymentEventsArray;
    @AuraEnabled global transactionStatus           transactionStatus;
    @AuraEnabled global fromAgent                   creditorAgent;
    @AuraEnabled global fromAgent                   debtorAgent;
    @AuraEnabled global instructedAmount 			instructedAmount;
    @AuraEnabled global instructedAmount 			confirmedAmount;
    @AuraEnabled global Boolean                   	hasForeignExchange;
    @AuraEnabled global String 						totalElapsedTime;
    

    global class cancellationStatus {
        @AuraEnabled global Object transactionCancellationStatus;
        
        global cancellationStatus(){
            System.debug('WRAPPER_IPTDetail.cancellationStatus');
        }
    }

    global class paymentEventsArray {
        @AuraEnabled global String                  networkReference;
        @AuraEnabled global String                  messageNameIdentification;
        @AuraEnabled global fromAgent               fromAgent;
        @AuraEnabled global fromAgent               toAgent;
        @AuraEnabled global fromAgent               originatorAgent;
        @AuraEnabled global String                  senderAcknowledgementReceipt;
        @AuraEnabled global String                  receivedDate;
        @AuraEnabled global String                  chargeBearer;
        @AuraEnabled global List<instructedAmount>  chargeAmount;
        @AuraEnabled global instructedAmount        instructedAmount;
        @AuraEnabled global instructedAmount        confirmedAmount;
        @AuraEnabled global foreignExchangeDetails  foreignExchangeDetails;
        @AuraEnabled global fromAgent               forwardedToAgent;
        @AuraEnabled global String                  lastUpdateTime;
        @AuraEnabled global String                  updatePayment;
        @AuraEnabled global instructedAmount        chargeAmountSingle;
        
        global paymentEventsArray(){
            System.debug('WRAPPER_IPTDetail.paymentEventsArray');
        }
    }

    global class fromAgent {
        @AuraEnabled global String agentCode;
        @AuraEnabled global String agentName;
        @AuraEnabled global String agentCountry;
        @AuraEnabled global String agentLocation;
        @AuraEnabled global String agentCountryName;
        
        global fromAgent(){
            System.debug('WRAPPER_IPTDetail.fromAgent');
        }
    }

    global class instructedAmount {
        @AuraEnabled global Double amount;
        @AuraEnabled global String tcurrency;
        
        global instructedAmount(){
            System.debug('WRAPPER_IPTDetail.instructedAmount');
        }
    }

    global class foreignExchangeDetails {
        @AuraEnabled global String sourceCurrency;
        @AuraEnabled global String targetCurrency;
        @AuraEnabled global Double exchangeRate;
        
        global foreignExchangeDetails(){
            System.debug('WRAPPER_IPTDetail.foreignExchangeDetails');
        }
    }

    global class transactionStatus {
        @AuraEnabled global String status;
        @AuraEnabled global String reason;
        
        global transactionStatus(){
            System.debug('WRAPPER_IPTDetail.transactionStatus');
        }
    }

    global static WRAPPER_IPTDetail parse(String json) {
        
        try {
            return (WRAPPER_IPTDetail) System.JSON.deserialize(json, WRAPPER_IPTDetail.class);
            
        } catch(DmlException e) {
            System.debug('The following exception has occurred: ' + e.getMessage());
        }
        return null;
    }


    //Métodos - relocalizar a helper?

    /*------------------------------------------------------------
    Author:         Antonio Duarte
    Company:        Deloitte
    Description:   	Method that creates the list with the steps to be shown
    History 
    <Date>          <Author>            <Change Description>
    21/09/2020      Antonio Duarte  	Initial Version
    ------------------------------------------------------------*/
    global static void getVisualSteps(WRAPPER_IPTDetail ipt){
        final String noTraceable = System.Label.notTraceable;
        List<paymentEventsArray> visualStepsList = new List<paymentEventsArray>();
        String lastPaintedAgentCode;
        Boolean hasCreditorBeenPainted = false;
        Boolean isDebtorNotIncluded = false;
        Integer counter = 0;


        //First - Reorder the incoming paymentEventsArray
        ipt.paymentEventsArray = sortPaymentEventsArray(ipt.paymentEventsArray);
        
        //Second - Add the debtorAgent step if it's not in the incoming array
        if(ipt.debtorAgent != null && ipt.paymentEventsArray[0].fromAgent.agentCode != ipt.debtorAgent.agentCode){
            visualStepsList.add(addStep(ipt.debtorAgent, noTraceable, noTraceable, null, null));
            isDebtorNotIncluded = true;
        }
        
        //Third - Fill the list
        for(paymentEventsArray ele : ipt.paymentEventsArray){
            Boolean isLastStep = counter == ipt.paymentEventsArray.size()-1;
            
            //If the last painted step is the creditor
            if(lastPaintedAgentCode == ipt.creditorAgent.agentCode){
                hasCreditorBeenPainted = true;
            }
            //IS SEND - 103
            if(ele.messageNameIdentification == '103'){
                //103FROM
                Integer paintedLocation = checkPainted(visualStepsList, ele.fromAgent.agentCode, '103FROM');
                //If has not been painted yet
                if(paintedLocation == -1){
                    //Paint the fromAgent
                    visualStepsList.add(addStep(ele.fromAgent, noTraceable, ele.senderAcknowledgementReceipt, ele.foreignExchangeDetails, ele.chargeAmount));
                    lastPaintedAgentCode = ele.fromAgent.agentCode;
                }
                //If From has already been painted
                else{
                    //Update the previous step
                    visualStepsList[paintedLocation] = updateStep(visualStepsList[paintedLocation], ele.fromAgent, ele.senderAcknowledgementReceipt, ele.foreignExchangeDetails, ele.chargeAmount, '103FROM', false);
                }
                
                //103TO
                paintedLocation = checkPainted(visualStepsList, ele.toAgent.agentCode, '103TO');
                //If has not been painted yet
                if(paintedLocation == -1){
                    //Paint the toAgent
                    visualStepsList.add(addStep(ele.toAgent, ele.receivedDate, noTraceable, null, null));
                    lastPaintedAgentCode = ele.toAgent.agentCode;
                }
                
                //103FORWARD
                //If ForwardTo exists
                if(ele.forwardedToAgent.agentCode != null){
                    paintedLocation = checkPainted(visualStepsList, ele.forwardedToAgent.agentCode, '103FORWARD');
                    //If has not been painted yet
                    if(paintedLocation == -1){
                        //Paint the forwardedToAgent
                        visualStepsList.add(addStep(ele.forwardedToAgent, noTraceable, noTraceable, null, null));
                        lastPaintedAgentCode = ele.forwardedToAgent.agentCode;
                    }
                }
                
                //Set the instructedAmount
                ipt.instructedAmount=ele.instructedAmount;
                
            }
            //IS RECEIVE - 199
            else if(ele.messageNameIdentification == '199'){
                Boolean hasForward = ele.forwardedToAgent.agentCode != null;
                Boolean isLastStepInPayment = ipt.transactionStatus.status != 'ACSP' && (ele.originatorAgent.agentCode == ipt.creditorAgent.agentCode || isLastStep);
                
                //199FROM-Originator
                Integer paintedLocation = checkPainted(visualStepsList, ele.originatorAgent.agentCode, '199FROM');
                //If has not been painted yet
                if(paintedLocation == -1){
                    if(ele.fromAgent.agentCode != 'TRCKCHZZXXX'){
                        
                        //Filter which date has to be filled
                        String dateReceived;
                        String dateSent;
                        if(isLastStepInPayment){
                            dateReceived = noTraceable;
                            dateSent = ele.senderAcknowledgementReceipt;
                        }else{
                            dateReceived = ele.senderAcknowledgementReceipt;
                            dateSent = noTraceable;
                        }
                    
                        //Paint the originatorAgent
                        visualStepsList.add(addStep(ele.originatorAgent, dateReceived, dateSent, ele.foreignExchangeDetails, ele.chargeAmount));
                        lastPaintedAgentCode = ele.originatorAgent.agentCode;
                    }
                }
                //If has already been painted
                else{
                    //Filter which date has to be updated
                    Boolean updateAsForward;
                    if(isLastStepInPayment){
                        updateAsForward = true;
                    }else{
                        updateAsForward = hasForward;
                    }
                    //Update previous step
                    visualStepsList[paintedLocation] = updateStep(visualStepsList[paintedLocation], ele.originatorAgent, ele.senderAcknowledgementReceipt, ele.foreignExchangeDetails, ele.chargeAmount, '199FROM', updateAsForward);
                }
                
                //199FORWARD
                //If ForwardTo exists
                if(hasForward){
                    paintedLocation = checkPainted(visualStepsList, ele.forwardedToAgent.agentCode, '199FORWARD');
                    //If has not been painted yet
                    if(paintedLocation == -1 && ele.fromAgent.agentCode != 'TRCKCHZZXXX'){
                        //Paint the forwardedToAgent
                        visualStepsList.add(addStep(ele.forwardedToAgent, noTraceable, noTraceable, null, null));
                        lastPaintedAgentCode = ele.forwardedToAgent.agentCode;
                    }
                }
                
                //Set the confirmedAmount
                ipt.confirmedAmount=ele.confirmedAmount;
                
            }
            counter++;
        }
        
        //Fourth - fix the first date
        visualStepsList[0].receivedDate = null;
        
        //Fifth - fix the last date when payment not completed
        if(ipt.transactionStatus.status == 'ACSP' || visualStepsList[visualStepsList.size()-1].senderAcknowledgementReceipt == System.Label.notTraceable){
            visualStepsList[visualStepsList.size()-1].senderAcknowledgementReceipt = null;
        }

        //Sixth - fix the fx rates
        Boolean fxPainted = false;
        for(paymentEventsArray ele : visualStepsList){
            if(ele.foreignExchangeDetails != null && !fxPainted){
                fxPainted = true;
                ipt.hasForeignExchange = true;
            }else{
                ele.foreignExchangeDetails = null;
            }
        }

        //Seventh - fix the fees
        visualStepsList = fixFees(isDebtorNotIncluded, ipt.paymentEventsArray, visualStepsList);
        
        //Finally - Set the stepList
        ipt.paymentEventsArray = visualStepsList;
    }


    /*------------------------------------------------------------
    Author:         Antonio Duarte
    Company:        Deloitte
    Description:   	Method that adds an step to the visualStepsList
    History 
    <Date>          <Author>            <Change Description>
    21/09/2020      Antonio Duarte  	Initial Version
    ------------------------------------------------------------*/
    private static paymentEventsArray addStep(fromAgent bank, String dateIn, String dateOut, foreignExchangeDetails fxrate, List<instructedAmount> fees){
        //Creates the step with the information received in the parameters
        paymentEventsArray step = new paymentEventsArray();
        step.fromAgent = bank;
        step.toAgent = bank;
        step.receivedDate = dateIn;
        step.senderAcknowledgementReceipt = dateOut;

        if(fxrate != null && fxrate.sourceCurrency != null){
            step.foreignExchangeDetails = fxrate;
        }

        if(fees != null && fees.size()>0){
            step.chargeAmountSingle = fees[fees.size()-1];
        }

        return step;
    }


    /*------------------------------------------------------------
    Author:         Antonio Duarte
    Company:        Deloitte
    Description:   	Method that sorts the incoming paymentEventsArray
    History 
    <Date>          <Author>            <Change Description>
    21/09/2020      Antonio Duarte  	Initial Version
    ------------------------------------------------------------*/
    private static List<paymentEventsArray> sortPaymentEventsArray(List<paymentEventsArray> listPaymentsOriginal){
        List<paymentEventsArray>            listPaymentsSorted      = new List<paymentEventsArray>();
        Map<String, paymentEventsArray>     mapUpdatePayments       = new Map<String, paymentEventsArray>();
 		Integer                             invalidReferences       = 0;
        
        try{
            //The steps array is inverted
            for(Integer i=listPaymentsOriginal.size()-1; i>=0; i--){
                if(listPaymentsOriginal[i].messageNameIdentification == '103' || listPaymentsOriginal[i].messageNameIdentification == '199'){
                    listPaymentsSorted.add(listPaymentsOriginal[i]);
                }
            }
            listPaymentsOriginal = listPaymentsSorted;
            listPaymentsSorted = new List<paymentEventsArray>();
            
            //The order of the steps is validated
            for(paymentEventsArray payment : listPaymentsOriginal){
                if(payment.updatePayment == null){
                    invalidReferences++;
                    listPaymentsSorted.add(payment);
                }else{
                    if(mapUpdatePayments.containsKey(payment.updatePayment)){
                        invalidReferences++;
                    }else{
                        mapUpdatePayments.put(payment.updatePayment, payment);
                    }
                	
                }
            }
            
            //For valid payment information, there will always be only one invalid reference.
            if(invalidReferences == 1){
                for(Integer i=0 ; i<listPaymentsOriginal.size()-1 ; i++){     
                    if(mapUpdatePayments.get(listPaymentsSorted[listPaymentsSorted.size()-1].networkReference) != null){
                        listPaymentsSorted.add(mapUpdatePayments.get(listPaymentsSorted[listPaymentsSorted.size()-1].networkReference));
                    }
                }
            }else{
                throw new CustomException();
            }
            
            //If the order is valid, the modified array is returned
            return listPaymentsSorted;
        }catch(Exception e){
            System.debug('Invalid payment events references');
        }
        
        //If the order is not valid, the original -and inverted- array is returned
        return listPaymentsOriginal;
    }

    
    /*------------------------------------------------------------
    Author:         Antonio Duarte
    Company:        Deloitte
    Description:   	Method that checks if the step has been painted
    History 
    <Date>          <Author>            <Change Description>
    21/09/2020      Antonio Duarte  	Initial Version
    ------------------------------------------------------------*/
    private static Integer checkPainted(List<paymentEventsArray> alreadyPaintedSteps, String actualStep, String operationType){
        Integer stepListLocation = -1;

        for(Integer i = alreadyPaintedSteps.size()-1 ; i >= 0 ; i--){
            if(alreadyPaintedSteps[i].fromAgent.agentCode == actualStep){
                stepListLocation = i;
                break;
            }
        }
        
        if(stepListLocation != -1 && operationType == '103TO' && stepListLocation == alreadyPaintedSteps.size()-1){
            stepListLocation = -1;
        }
        
        if(stepListLocation != -1 && operationType == '199FORWARD'){
            stepListLocation = -1;
        }
        
        return stepListLocation;
    }
    
    
    /*------------------------------------------------------------
    Author:         Antonio Duarte
    Company:        Deloitte
    Description:   	Method that checks if the step has been painted
    History 
    <Date>          <Author>            <Change Description>
    21/09/2020      Antonio Duarte  	Initial Version
    ------------------------------------------------------------*/
    private static paymentEventsArray updateStep(paymentEventsArray paintedStep, fromAgent comingStep, String sendDate, foreignExchangeDetails fxrate, List<instructedAmount> fees, String operation, Boolean hasForward){
        if('199FROM'.equals(operation) && !hasForward){
            if(paintedStep.receivedDate == System.label.notTraceable){
                paintedStep.receivedDate = sendDate;
            }
        }else{
            paintedStep.senderAcknowledgementReceipt = sendDate;
        }
        
        if(paintedStep.fromAgent.agentCountry == null){
            paintedStep.fromAgent.agentCountry = comingStep.agentCountry;
        }
        if(paintedStep.fromAgent.agentLocation == null){
            paintedStep.fromAgent.agentLocation = comingStep.agentLocation;
        }
        if(paintedStep.fromAgent.agentName == null){
            paintedStep.fromAgent.agentName = comingStep.agentName;
        }
        if(fxrate != null && paintedStep.foreignExchangeDetails == null && fxrate.sourceCurrency != null){
            paintedStep.foreignExchangeDetails = fxrate;
        }
        if(fees != null && paintedStep.chargeAmountSingle == null && fees.size()>0){
            paintedStep.chargeAmountSingle = fees[fees.size()-1];
        }
        
        return paintedStep;
    }

    
    /*------------------------------------------------------------
    Author:         Antonio Duarte
    Company:        Deloitte
    Description:   	Method that fixes the fees issues generated
    History 
    <Date>          <Author>            <Change Description>
    27/10/2020      Antonio Duarte  	Initial Version
    ------------------------------------------------------------*/
    global static List<paymentEventsArray> fixFees(Boolean isDebtorNotIncluded, List<paymentEventsArray> comingSteps, List<paymentEventsArray> paintedSteps){
        //When the first coming step has more than one fee
        if(comingSteps[0].chargeAmount.size() > 1){
            Integer variation = isDebtorNotIncluded ? 1 : 0;
            for(Integer n = 0 ; n < comingSteps[0].chargeAmount.size() - variation ; n++){
                if(n == 0){
                    paintedSteps[0].chargeAmountSingle = comingSteps[0].chargeAmount[n];
                }else{
                    paintedSteps[0].chargeAmountSingle.amount = paintedSteps[0].chargeAmountSingle.amount + comingSteps[0].chargeAmount[n].amount;
                }
            }
        }

        return paintedSteps;
    }
    
    
    /*------------------------------------------------------------
    Author:         Undefined
    Company:        Deloitte
    Description:   	Method that gets the corresponding country name
    History 
    <Date>          <Author>            <Change Description>
    Undefined      	Undefined  			Initial Version
    ------------------------------------------------------------*/
    global static void getCountryName(WRAPPER_IPTDetail ipt){
        try{
            for (PaymentEventsArray ele:ipt.paymentEventsArray){
                if(ele.fromAgent.agentCountry == null && ele.fromAgent.agentCode != null){
                    ele.fromAgent.agentCountry = ele.fromAgent.agentCode.substring(4,6);
                }
                ele.fromAgent.agentCountryName=Global_Utilities.getCountryName(ele.fromAgent.agentCountry);
                ele.toAgent.agentCountryName=Global_Utilities.getCountryName(ele.fromAgent.agentCountry);
            }
            if(ipt.creditorAgent != null && ipt.creditorAgent.agentCountryName == null && ipt.creditorAgent.agentCountry != null){
                ipt.creditorAgent.agentCountryName = Global_Utilities.getCountryName(ipt.creditorAgent.agentCountry);
            }
            
        }catch(Exception e){
            System.debug('WRAPPER_IPTDetail.getCountryName: ' + e.getMessage());
        }
    }
    
    
    /*------------------------------------------------------------
    Author:         Undefined
    Company:        Deloitte
    Description:   	Method that formats the last update
    History 
    <Date>          <Author>            <Change Description>
    Undefined      	Undefined  			Initial Version
    ------------------------------------------------------------*/
    global static void getLastUpdate(WRAPPER_IPTDetail ipt){
        try{
            //Get the totalElapsedtime
            DateTime arrDateTime = DateTime.ValueofGmt(ipt.initiationTime.replace('T', ' ')); 
            DateTime depDateTime =null;
            
            System.debug(ipt.completionTime);
            System.debug(ipt.lastUpdateTime);
            
            if(ipt.completionTime!='' && ipt.completionTime!='null' && ipt.completionTime!=null){
                depDateTime = DateTime.ValueofGmt(ipt.completionTime.replace('T', ' ')); 
            }else{
                depDateTime = DateTime.ValueofGmt(ipt.lastUpdateTime.replace('T', ' ')); 
            }
            System.debug(depDateTime);
            
            List<integer> totalElapsed=DateTime_Utilities.getDifferenceDateTime(arrDateTime, depDateTime);
            ipt.totalElapsedtime= totalElapsed[0]+' '+System.Label.Days+' '+totalElapsed[1]+' h '+totalElapsed[2]+' m '+totalElapsed[3]+' s';
            
            //Get the formatted LastUpdatedTime
            String format = Global_Utilities.getUserDateFormat(UserInfo.getUserId());
            
            if(format == null || format == ''){
                format='dd/MM/yyyy';
            }
            
            if(ipt.lastUpdateTime!='' || ipt.lastUpdateTime!=null){
                
                String formattedDate=String.ValueofGmt(DateTime_Utilities.stringToDateTimeStep(ipt.lastUpdateTime,3));
                
                Date f=Date.valueOf(formattedDate.substring(0,10));
                Datetime ft = Datetime.newInstance(f.year(), f.month(), f.day());
                String firstPart =ft.formatGmt(format);
                
                ipt.lastUpdateTime=firstPart +', ' +formattedDate.substring(11);
            }
        }catch(Exception e){
            System.debug('CNT_IPTDetailParent.getReason: ' + e.getMessage());
        }
    }

    
    



}