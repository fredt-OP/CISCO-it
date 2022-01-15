//*********************************************************************************
// IMPORTING THE VALUES DIRECT FROM THE FILES>>>>>>
//*********************************************************************************

var dc_QuestionTitle = islVar_QuestionTitle;
var dc_QuestionText = islVar_QuestionText;

var dc_optArray = islVar_QuestionOption; 
var dc_numOptions = dc_optArray.length;

var dc_columnHeadingArray = islVar_QuestionGridHeadings;

var dc_slotSolutionArray = islVar_QuestionAnswer; 
var dc_TotalCorrectPlacements = 0;
var dc_CorrectFeedback = islVar_QuestionCorrectFeed;
var dc_TryAgainFeedback = islVar_QuestionTryAgainFeed;
var dc_RamdomOptions = islVar_QuestionRandomOptions;
var dc_GridType = islVar_QuestionGridType;
var dc_GridOptions = islVar_QuestionGridOptions;

// *****************************************************************************************************************************************
// *****************************************************************************************************************************************
// *****************************************************************************************************************************************



// ****************************************************************************
// INIT THE SCREEN TEXT
// ****************************************************************************
function dc_InitScreenText()
{
	titleText_mc.titleText_txt.htmlText = dc_QuestionTitle;
	questionText_mc.questionText_txt.htmlText = dc_QuestionText;
	questionPrompt_mc.questionPrompt_txt.htmlText = "";
	
}

function dc_InitColumnHeadings()
{
	for(var t=0; t<dc_columnHeadingArray.length; t++)
	{
		var headingToFill = eval("columnHeadingText" + (t+1) + "_mc");
		headingToFill.columnHeadingText_txt.htmlText = dc_columnHeadingArray[t].toString();
	}
}

function dc_InitOptions()
{
		if(dc_RamdomOptions == true)
		{
			dc_RrandomiseOptionPositioning();
		}
	
	
		for(var h = 0; h <  dc_numOptions; h++)
		{
			// refrence the onscreen object
			var optionToInit = eval("option_" + (h+1));
			// init the option text
			optionToInit.background_mc.gotoAndPlay("off");	
			optionToInit.optionText_txt.htmlText = dc_optArray[h].toString();
			optionToInit.correctlySelected = false;
			optionToInit.numSelected = 0;
			// DC :: 10-04-07 :: NOTE: COULD REMOVE THE NEED FOR A GRIDOPTIONS VAR by counting here???? 
			for(var y = 1; y <= dc_GridOptions; y++)
			{
				var gridOptToInit = eval(optionToInit + ".grid_" + y);
				gridOptToInit.onRelease = function()
				{
					questionPrompt_mc.questionPrompt_txt.htmlText	= "";
					if(dc_GridType == "SINGLE")
					{
						dc_ResetOption(this._parent);
						this.gotoAndPlay("down");
						this.selected = true;
						this._parent.numSelected++;							
					}
					else if(dc_GridType == "MULTI")
					{
						if(this.selected == true)
						{
							this.gotoAndPlay("up");
							this.selected = false;
							this._parent.numSelected--;
						}
						else
						{
							this.gotoAndPlay("down");
							this.selected = true;
							this._parent.numSelected++;							
						}
					}
				};
			}
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
		questionPrompt_mc.questionPrompt_txt.htmlText	= "";
		for(var h = 0; h <  dc_numOptions; h++)
		{
			// refrence the onscreen object
			var optionToInit = eval("option_" + (h+1));
			// resets all options
			dc_ResetOption(optionToInit);
		}
	
}

/* CHECKS THE PLACEMENT AGAINST WHATS THERE */
function dc_CheckResult()
{
	for (var w=0; w < dc_numOptions; w++) 
	{
		var targetOpt_mc = eval("option_" + (w+1));
		var aSolutionsKey = dc_slotSolutionArray[w]
		targetOpt_mc.correctlySelected = false;
		var iFound = 0;
		for(var y = 1; y <= dc_GridOptions; y++)
		{
			 var gridOptToInit = eval(targetOpt_mc + ".grid_" + y);
			 if(gridOptToInit.selected == 1)
			 {
			 		for(x=0; x < aSolutionsKey.length; x++)
			 		{
			 			if(y == aSolutionsKey[x])
			 			{
			 				iFound++;		
			 			}
			 		}
			 }
		}
		
		if(dc_GridType == "SINGLE")
		{
			if((iFound == 1) && (targetOpt_mc.numSelected == aSolutionsKey.length))
			{
				targetOpt_mc.correctlySelected = true;
			}
			else
			{
				targetOpt_mc.correctlySelected = false;	
			}
		}
		else if(dc_GridType == "MULTI")
		{	
			if((iFound == aSolutionsKey.length) && (targetOpt_mc.numSelected == aSolutionsKey.length))
			{
				targetOpt_mc.correctlySelected = true;
			}
			else
			{
				targetOpt_mc.correctlySelected = false;				
			}
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
		if(targetOpt_mc.correctlySelected == true)
		{
		    targetOpt_mc.background_mc.gotoAndPlay("correct") ; 
				dc_TotalCorrectPlacements++;   
		}
		else if(targetOpt_mc.correctlySelected == false)
		{
		    targetOpt_mc.background_mc.gotoAndPlay("incorrect") ;    
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

// ****************************************************************************
// BUTTONS
// ****************************************************************************

function dc_ResetOption(whichOption)
{
			whichOption.correctlySelected = false;
			whichOption.background_mc.gotoAndPlay("off");	
			whichOption.numSelected = 0;
			for(var y = 1; y <= dc_GridOptions; y++)
			{
				 var gridOptToInit = eval(whichOption + ".grid_" + y);
				 gridOptToInit.selected = false;
				 gridOptToInit.gotoAndPlay("up");					 
			}
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
// ****************************************************************************
// ****************************************************************************
// ****************************************************************************


function dc_InitQuestion()
{
	// INIT THE SCREEN TEXT
	dc_InitScreenText();
	dc_InitColumnHeadings();
	
	
	
	// INIT THE OPTIONS
	dc_InitOptions();
	
	
	// INIT THE BUTTONS
	dc_InitEvaluatorButtonFunctionality()
	dc_InitResetButtonFunctionality()
	
}

