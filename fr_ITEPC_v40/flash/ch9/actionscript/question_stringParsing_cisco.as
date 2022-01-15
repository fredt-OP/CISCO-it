function islFunc_LocaleCallback(success) 
{
	if(success)
	{
		for(x in Locale.stringIDArray)
		{			
		
			var sStringIdentifier = Locale.stringIDArray[x].substring(Locale.stringIDArray[x].indexOf("_")+1, Locale.stringIDArray[x].lastIndexOf("-"));	
			var sStringName = Locale.stringIDArray[x].substring(Locale.stringIDArray[x].indexOf("-")+1, Locale.stringIDArray[x].lastIndexOf("_"));
			
			var sStringValue = Locale.loadString(Locale.stringIDArray[x]);
			if(sStringIdentifier == islVar_QuestionID)
			{
				// CALL THE ASSIGNMENT FUNCTION
				islVar_QuestionBase.islFunc_AssignStringValues(sStringName, sStringValue);
			}
			else
			{
				// ignore nothing to do with this question.
			}
		}
		play();
	}
}

function islFunc_AssignStringValues(whatIdentifier, whatValue)
{
	switch (whatIdentifier)
	{
		case "QTITLE":
		{
			islVar_QuestionBase.islVar_QuestionTitle = whatValue;
			break;
		}		
		case "QQUESTION":
		{
			islVar_QuestionBase.islVar_QuestionText = whatValue;
			break;
		}
		case "QOPTION" :
		{
			islVar_QuestionBase.islVar_QuestionOption.push(whatValue);
			break;
		}		
		case "QSLOTLABEL" :
		{
			islVar_QuestionBase.islVar_QuestionSlotLabels.push(whatValue);
			break;
		}
		case "QGRIDHEADING" :
		{
			islVar_QuestionBase.islVar_QuestionGridHeadings.push(whatValue);
			break;			
		}
		case "QCORRECT" :
		{
			islVar_QuestionBase.islVar_QuestionCorrectFeed = whatValue;
			break;
		}		
		case "QTRYAGAIN" :
		{
			islVar_QuestionBase.islVar_QuestionTryAgainFeed = whatValue;
			break;
		}
		default :
		break;
	}
}

function islFunc_QuestionInit(targetLevel)
{
	targetLevel.islVar_QuestionInProgress = true;
	targetLevel.dc_InitQuestion();
}
