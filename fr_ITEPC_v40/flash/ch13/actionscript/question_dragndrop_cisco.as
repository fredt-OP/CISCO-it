//*********************************************************************************
// IMPORTING THE VALUES DIRECT FROM THE FILES>>>>>>
//*********************************************************************************

var dc_QuestionTitle = islVar_QuestionTitle;
var dc_QuestionText = islVar_QuestionText;
var dc_optArray = islVar_QuestionOption; 
var dc_numOptions = dc_optArray.length;
var dc_slotArray = islVar_QuestionSlotLabels;
var dc_numSlots = dc_slotArray.length;
var dc_slotSolutionArray = islVar_QuestionAnswer; 
var dc_TotalCorrectPlacements = 0;
var dc_CorrectFeedback = islVar_QuestionCorrectFeed;
var dc_TryAgainFeedback = islVar_QuestionTryAgainFeed;
var dc_RamdomOptions = islVar_QuestionRandomOptions;


/*trace("dc_QuestionTitle: " + dc_QuestionTitle);
trace("dc_QuestionText: " + dc_QuestionText);

trace("dc_optArray: " + dc_optArray);
trace("dc_numOptions: " + dc_numOptions);
trace("dc_slotArray: " + dc_slotArray);
trace("dc_numSlots: " + dc_numSlots);
trace("dc_slotSolutionArray: " + dc_slotSolutionArray);

trace("dc_CorrectFeedback: " + dc_CorrectFeedback);
trace("dc_PartCorrectFeedback: " + dc_PartCorrectFeedback);
trace("dc_IncorrectFeedback: " + dc_IncorrectFeedback);
trace("dc_TryAgainFeedback: " + dc_TryAgainFeedback);
trace("dc_RamdomOptions: " + dc_RamdomOptions);*/

// *****************************************************************************************************************************************
// *****************************************************************************************************************************************
// *****************************************************************************************************************************************



function dc_InitDragObject()
{
	
	if(dc_RamdomOptions == true)
	{
		dc_RrandomiseOptionPositioning();
	}
	
	for(var i = 0; i < dc_numOptions; i++)
	{
		var targetOpt_mc = eval("option_" + (i+1));
		targetOpt_mc.optionText_txt.htmlText = dc_optArray[i]	
		targetOpt_mc.originX = targetOpt_mc._x;
		targetOpt_mc.originY = targetOpt_mc._y;
		targetOpt_mc.originDepth = targetOpt_mc.getDepth();
		targetOpt_mc.currentPlacedStatus = false;
		targetOpt_mc.currentPosition = 0;
		targetOpt_mc.correctlyPlaced = false;
		targetOpt_mc.optionID = (i+1);
		targetOpt_mc.onPress = function()
		{
			this.swapDepths(4000);
			startDrag(this, false, 0, 0, 600-this._width, 600-this._height);	
		}
		targetOpt_mc.onRelease = function()
		{
			dc_DropItem(this);	
		}
		targetOpt_mc.onReleaseOutside = function()
		{
			dc_DropItem(this);	
		}
	}
}

function dc_InitSlotLabels()
{
	for(var i = 0; i < dc_numSlots; i++)
	{
		var targetSlotLabel_mc = eval("slotlabel_"+ (i+1));
		targetSlotLabel_mc.slotLabel_txt.htmlText = dc_slotArray[i];
	}
}

function dc_DropItem(whichOption)
{
	whichOption.stopDrag();	
	whichOption.swapDepths(whichOption.originDepth);
	var droppedOnName = eval(whichOption._droptarget)._name.toString();
	var droppedOnItem = eval(whichOption._droptarget);
	if(droppedOnName == undefined)
	{
		// dumped in no mans land.
		dc_ResetOption(whichOption);
	}
	else
	{
		if(droppedOnName.substring(droppedOnName.lastIndexOf("."), droppedOnName.lastIndexOf("_")) == "slot")
		{
			// standard dump in slot.
			whichOption._x = droppedOnItem._x;
			whichOption._y = droppedOnItem._y;
			whichOption.currentPlacedStatus = true;
			whichOption.currentPosition = parseInt(droppedOnName.substring(droppedOnName.indexOf("_")+1, droppedOnName.length));	
			// as it has been swapped clear it color detail.
			whichOption.background_mc.gotoAndPlay("off");		
		}
		else if(droppedOnName.substring(droppedOnName.lastIndexOf("."), droppedOnName.lastIndexOf("_")) == "optionText")
		{
			var hoggingOptionItem = droppedOnItem._parent; 		
			if(hoggingOptionItem.currentPlacedStatus == true)
			{
				
				var dTempX = 0;
				var dTempY = 0;
				var iTempPosition = 0;
				// if the item being dropped is currently placed inanother slot record the slot itys in to temp;
				if(whichOption.currentPlacedStatus == true)
				{
					var iTargetSlot = eval("slot_"+ whichOption.currentPosition);
					dTempX = iTargetSlot._x;
					dTempY = iTargetSlot._y;
					iTempPosition = whichOption.currentPosition;
				}

				// do the place
				whichOption._x = hoggingOptionItem._x;
				whichOption._y = hoggingOptionItem._y;
				whichOption.currentPosition = hoggingOptionItem.currentPosition;
				whichOption.currentPlacedStatus = true
				// as it has been swapped clear it color detail.
				whichOption.background_mc.gotoAndPlay("off");

				if(iTempPosition > 0)
				{ 
					hoggingOptionItem._x = dTempX;
					hoggingOptionItem._y = dTempY;
					hoggingOptionItem.currentPosition = iTempPosition;
					hoggingOptionItem.currentPlacedStatus = true;
					// as it has been swapped clear it color detail.
					hoggingOptionItem.background_mc.gotoAndPlay("off");
				}
				else
				{
					dc_ResetOption(hoggingOptionItem);
				}
				
			}
			else
			{
				dc_ResetOption(whichOption);
			}
			
		}
		else
		{
			dc_ResetOption(whichOption);
		}
	}
														 
}


function dc_ResetOption(whichOption)
{
		whichOption._x = whichOption.originX;
		whichOption._y = whichOption.originY;
		whichOption.background_mc.gotoAndPlay("off");
		whichOption.currentPlacedStatus = false;
		whichOption.currentPosition = 0;				
}

/* CHECKS THE PLACEMENT AGAINST WHATS THERE */
function dc_CheckResult()
{
	for (var w=1; w<=dc_numOptions; w++) 
	{
		var targetOpt_mc = eval("option_" + w);
		if(targetOpt_mc.currentPlacedStatus == true)
		{
			// Next we need to check if the option fits in the slot properly
			var aSlotAnswers = new Array();
			aSlotAnswers = dc_slotSolutionArray[targetOpt_mc.currentPosition-1];
			var bFound = false;
			for(var g = 0; g < aSlotAnswers.length; g++)
			{
				if(aSlotAnswers[g] == targetOpt_mc.optionID)
				{
					bFound = true;
				}
			}
			
			if(bFound == true)
			{
				targetOpt_mc.correctlyPlaced = true;
			}
			else
			{
				targetOpt_mc.correctlyPlaced = false;
			}
		}
		else
		{
			// ignore NOT PLACED.
		}
	}
	dc_ShowResult();
}

function dc_ShowResult()
{
	dc_TotalCorrectPlacements = 0;
	for (var o=1; o<=dc_numOptions; o++) 
	{
		var targetOpt_mc = eval("option_" + o);
		if(targetOpt_mc.currentPlacedStatus == true)
		{
			if(targetOpt_mc.correctlyPlaced == true)
			{
			    targetOpt_mc.background_mc.gotoAndPlay("correct") ; 
				dc_TotalCorrectPlacements++;   
			}
			if(targetOpt_mc.correctlyPlaced == false)
			{
			    targetOpt_mc.background_mc.gotoAndPlay("incorrect") ;    
			}			
		}
		else
		{
			targetOpt_mc.background_mc.gotoAndPlay("off")
		}
	}
	// text feedback
	dc_ShowTextFeedback()
	
}


// Display feedback text
function dc_ShowTextFeedback()
{
	if(dc_TotalCorrectPlacements == dc_numOptions)
	{
		questionPrompt_mc.questionPrompt_txt.htmlText = dc_CorrectFeedback;
	}
	else if((dc_TotalCorrectPlacements < dc_numOptions) && (dc_TotalCorrectPlacements > 0))
	{
		questionPrompt_mc.questionPrompt_txt.htmlText = dc_TryAgainFeedback;
	}
	else if(dc_TotalCorrectPlacements == 0)
	{
		questionPrompt_mc.questionPrompt_txt.htmlText = dc_TryAgainFeedback;
	}
}



//randomise option x + y positioning on screen
function dc_RrandomiseOptionPositioning()
{
	for (var j=1; j<=dc_numOptions; j++) {
		//generate a random option number
		random_number = Math.ceil(Math.random()*dc_numOptions);
		//create temporary holder variables for x and y positioning of current option
		temp_y_pos = eval("option_"+j)._y;
		temp_x_pos = eval("option_"+j)._x;
		//switch the x and y position of current option with random option
		eval("option_"+j)._y = eval("option_"+random_number)._y;
		eval("option_"+j)._x = eval("option_"+random_number)._x;
		eval("option_"+random_number)._y = temp_y_pos;
		eval("option_"+random_number)._x = temp_x_pos;
	}
}

function dc_ResetOptions()
{
	// RESET 
	for (var i=1;i<=dc_numOptions;i++)
	{
		dc_ResetOption(eval("option_"+i));
	}
	questionPrompt_mc.questionPrompt_txt.htmlText	= "";
	
}

//initialise functionality of evaluator/ok button
function dc_InitEvaluatorButtonFunctionality()
{
	//assign rollover functionality to evaluator/ok button
	evaluator_button.onRollOver = function()
	{
		this.button_graphic.gotoAndStop("over");
	}
	//assign rollout functionality to evaluator/ok button
	evaluator_button.onRollOut = function()
	{
		this.button_graphic.gotoAndStop("up");
	}
	//assign button release functionality to evaluator/ok button
	evaluator_button.onRelease = function()
	{
		dc_CheckResult();
	}
}

function dc_InitResetButtonFunctionality()
{
	reset_button.onRollOver = function()
	{
		this.button_graphic.gotoAndStop("over");
	}
	//assign rollout functionality to evaluator/ok button
	reset_button.onRollOut = function()
	{
		this.button_graphic.gotoAndStop("up");
	}
	//assign button release functionality to evaluator/ok button
	reset_button.onRelease = function()
	{
		dc_ResetOptions();
	}	
}

//activates movie clip emulating a button and 'grays' it out
function dc_ActivateButton(the_button){
	the_button.enabled = true;
	the_button._alpha = 100;
}

//deactivates movie clip emulating a button and 'grays' it out
function dc_DeactivateButton(the_button){
	the_button.enabled = false;
	the_button._alpha = 50;
}

function dc_InitScreenText()
{
	titleText_mc.titleText_txt.htmlText = dc_QuestionTitle;
	questionText_mc.questionText_txt.htmlText = dc_QuestionText;
	questionPrompt_mc.questionPrompt_txt.htmlText = "";
}

function dc_InitQuestion()
{
	// INIT THE SCREEN TEXT
	dc_InitScreenText();
	// INIT THE BUTTONS
	dc_InitEvaluatorButtonFunctionality();
	dc_InitResetButtonFunctionality();
	dc_InitSlotLabels();
	dc_InitDragObject();
}
