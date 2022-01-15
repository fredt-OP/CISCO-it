/**
* Holds all event object references and controllers
* @constructor
*
* @author mpollack
* @version 1.0
*
*/
function EventObj() {
/**
* Array of events to fire on comactive
* @type array
*/
	this.comactiveEventObj = new Array();
/**
* Array of events to fire on courseready
* @type array
*/
	this.coursereadyEventObj = new Array();
/**
* Array of events to fire on pageready
* @type array
*/
	this.pagereadyEventObj = new Array();
/**
* Array of events to fire on themeready
* @type array
*/
	this.themereadyEventObj = new Array();
/**
* Array of events to fire on toggle
* @type array
*/
	this.toggleEventObj = new Array();
/**
* Array of events to fire on globaltools
* @type array
*/
	this.globaltoolsreadyEventObj = new Array();
/**
* Array of events to fire on glossary
* @type array
*/
	this.glossaryreadyEventObj = new Array();
}
/**
* Adds event to an event array based on type.  If not
* enough data is provided an error is thrown.
* @param {string} t Event type
* @param {method} e Event to execute
* @param {string} i Event identifier
*/
EventObj.prototype.addEvent = function(t,e,i) {
	if (!t || !e || !i) {
		a = "ERROR: EventObj.addEvent - not enough properties\n";
		a+= "syntax:\tEventObj.addEvent(EventType, ItemToExecute, EventID);\n\n";
		a+= "\tEventObj.addEvent(\""+t+"\",\""+e+"\",\""+i+"\");\n";
		alert(a);
	} else {
		switch(t) {
			case 'courseready':
				this.coursereadyEventObj[i] = e;
				break;
			case 'comactive':
				this.comactiveEventObj[i] = e;
				break;
			case 'glossaryready':
				this.glossaryreadyEventObj[i] = e;
				break;
			case 'globaltoolsready':
				this.globaltoolsreadyEventObj[i] = e;
				break;
			case 'toggle':
				this.toggleEventObj[i] = e;
				break;
			case 'themeready':
				this.themereadyEventObj[i] = e;
				break;
			case 'pageready':
				this.pagereadyEventObj[i] = e;
				break;
			default:
				a = "ERROR: EventObj.addEvent - incorrect event handle\n";
				a+= "see documentation for valid events\n\n";
				a+= "\tEventObj.addEvent(\""+t+"\",\""+e+"\",\""+i+"\");\n";
				alert(a);
		}
	}
}
/**
* Removes an event from an event array based on type and ID.  If not
* enough data is provided an error is thrown.
* @param {string} t Event type
* @param {string} i Event identifier
*/
EventObj.prototype.removeEvent = function(t,i) {
	if (!t || !i) {
		a = "ERROR: EventObj.removeEvent - not enough properties\n";
		a+= "syntax:\tEventObj.removeEvent(EventType, EventID);\n\n";
		a+= "\tEventObj.removeEvent(\""+t+"\",\""+i+"\");\n";
		alert(a);
	} else {
		switch(t) {
			case 'courseready':
				this.coursereadyEventObj[i] = null;
				break;
			case 'comactive':
				this.comactiveEventObj[i] = null;
				break;
			case 'glossaryready':
				this.glossaryreadyEventObj[i] = null;
				break;
			case 'globaltoolsready':
				this.globaltoolsreadyEventObj[i] = null;
				break;
			case 'toggle':
				this.toggleEventObj[i] = null;
				break;
			case 'themeready':
				this.themereadyEventObj[i] = null;
				break;
			case 'pageready':
				this.pagereadyEventObj[i] = null;
				break;
			default:
				a = "ERROR: EventObj.removeEvent - incorrect event handle\n";
				a+= "see documentation for valid events\n\n";
				a+= "\tEventObj.addEvent(\""+t+"\",\""+e+"\",\""+i+"\");\n";
				alert(a);
		}
	}
}
/**
* Passes an event type that then executes all items in
* the event array for that type.
* @param {string} val Event identifier
*/
EventObj.prototype.eventWatcher = function(val) {
	eventarray = null;
	switch(val) {
		case 'courseready':
			eventarray = this.coursereadyEventObj;
			break;
		case 'comactive':
			eventarray = this.comactiveEventObj;
			break;
		case 'pageready':
			eventarray = this.pagereadyEventObj;
			break;
		case 'globaltoolsready':
			eventarray = this.globaltoolsreadyEventObj;
			break;
		case 'toggle':
			eventarray = this.toggleEventObj;
			break;
		case 'themeready':
			eventarray = this.themereadyEventObj;
			break;
		case 'glossaryready':
			eventarray = this.glossaryreadyEventObj;
			break;
	}
	if (eventarray) {
		for (id in eventarray) {
			eval(eventarray[id]);
		}
	}
}

eventobj = new EventObj();
	

