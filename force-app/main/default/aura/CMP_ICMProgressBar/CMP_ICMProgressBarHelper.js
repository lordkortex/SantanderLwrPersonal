({
	changeStage : function(component,event,helper) {
	
        //########## VARIABLES DEFINITION ##########//

        //Get the current stage number
        var curStage = component.get("v.currentStageNumber");
        
        //variables for the components
        var stringCompLi = "";
        var stringCompTextLi = "";
        var stringCompBt = "";
        
        //Constants for the ids
        const STRINGLI = "LiStage";
        const STRINGLITEXT = "LiStringStage";
        const STRINGBUTTON = "ButtonStage";

        //STYLES FOR THE LI
        const LINOTSTARTED = "slds-progress__item step";
        const LIISACTIVE = "slds-progress__item slds-is-active step";
        const LIISCOMPLETED = "slds-progress__item slds-is-completed step"; 

        //STYLE FOR THE LI TEXT
        const LITEXTACTIVE = "textStep__active";
        const LITEXTINACTIVE = "textStep";

        //STYLES FOR THE BUTTON
        const BUTTONFINISHED = "slds-button slds-button_icon slds-progress__marker slds-progress__marker_icon button button__completed";
        const BUTTONINPROGRESS = "slds-button slds-button_icon slds-progress__marker slds-progress__marker_icon button button__active";
        const BUTTONDISABLED = "slds-button slds-button_icon slds-progress__marker slds-progress__marker_icon button button__disabled";
        
        //Constants for progress bar
        const IDPROGRESSBAR = "ProgressBar";
        console.log("[CMP_ICMProgressBarHelper.changeStage] Button element " + document.getElementById(STRINGBUTTON+"1"));
        //const BUTTONRELATIVEWIDTH = document.getElementById(STRINGBUTTON+"1").offsetWidth / 1184*100; // Relative width of the buttons in %
        var progressBar = document.getElementById(IDPROGRESSBAR);
        //var progress = (curStage-1)*27.8+9;
        var progress = (curStage - 1) * 22 + 17;

        // Limit maximum width to 100%
        progress > 100 ? 100 : progress;
        // 10 - 37 - 66 - 92

        //Changing the progress bar progress

        progressBar.style.width = progress + "%";
        //document.getElementById(IDPROGRESSBAR).style.width =  progress;

        var i;

        //STARTING THE LOOP
        for (i = 1; i <= 4; i++) 
        {
            stringCompLi = STRINGLI + i;
            stringCompTextLi = STRINGLITEXT + i;
            stringCompBt = STRINGBUTTON + i;

            if(curStage < i)
            {
                
                document.getElementById(stringCompLi).className = LINOTSTARTED;
                document.getElementById(stringCompTextLi).className = LITEXTINACTIVE;
                document.getElementById(stringCompBt).className = BUTTONDISABLED;
            }
            if(curStage == i)
            {
                document.getElementById(stringCompLi).className = LIISACTIVE;
                document.getElementById(stringCompTextLi).className = LITEXTACTIVE;
                document.getElementById(stringCompBt).className = BUTTONINPROGRESS;
            }
            if((curStage > i))
            {
                document.getElementById(stringCompLi).className = LIISCOMPLETED;
                document.getElementById(stringCompTextLi).className = LITEXTINACTIVE;
                document.getElementById(stringCompBt).className = BUTTONFINISHED;

            }
        }
    },
    
    updateStep : function(component,event,helper) {
        const BUTTONFINISHED = "slds-button slds-button_icon slds-progress__marker slds-progress__marker_icon button button__completed";
        const BUTTONINPROGRESS = "slds-button slds-button_icon slds-progress__marker slds-progress__marker_icon button button__active";
        var pressedButton = event.currentTarget.id;
        console.log("[CMP_ICMProgressBarHelper.updateStep] Completed step: " + document.getElementById(pressedButton).className);
        var activeStep = (document.getElementById(pressedButton).className == BUTTONFINISHED) || (document.getElementById(pressedButton).className == BUTTONINPROGRESS);
        console.log("[CMP_ICMProgressBarHelper.updateStep] El botón pulsado es " + pressedButton);
        if(activeStep){
            if(pressedButton == "ButtonStage1"){
                component.set("v.currentStageNumber", 1);
            } else if(pressedButton == "ButtonStage2"){
                component.set("v.currentStageNumber", 2);
            } else if (pressedButton == "ButtonStage3"){
                component.set("v.currentStageNumber", 3);
            } else if(pressedButton == "ButtonStage4"){
                component.set("v.currentStageNumber", 4);
            }
        }
    }
     
})