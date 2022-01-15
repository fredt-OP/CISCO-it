/**
* The highest level object containing all data and 
* methods for accessing data from a course or
* theme
* @constructor
*
* @author mpollack
* @version 1.0
*
*/
function Main() {
	dump("MAIN CONSTRUCTOR\n");
/**
* Name given to identify object on debug 
* @type string
*/
	this.objname = "main";
/**
* Global Tools Object reference 
* @type GlobalTools
*/
	this.globaltools = new GlobalTools(this);
/**
* Theme Object reference 
* @type Theme
*/
	this.theme = new Theme(this);
/**
* Glossary Object reference 
* @type Glossary
*/
	this.glossary = new Glossary(this);
/**
* Course Object reference 
* @type Course
*/
	this.course = new Course(this);
/**
* Current Chapter Object reference 
* @type Chapter
*/
	this.chapter = null;
/**
* Current Section Object reference 
* @type Section
*/
	this.section = null;
/**
* Current Topic Object reference 
* @type Topic
*/
	this.topic = null;
/**
* Current Page Object reference 
* @type Page
*/
	this.page = null;
	
}

/**
* Sets data on the object using a delimited string
* sent via the jshook api.  The string is split and each
* entry is run through eval() to execute.
* @param {string} d delimited string with js commands
*/
Main.prototype.setData = function(d) {
	var darray = d.split("<#>");
	for (i=0; i<darray.length; i++) {
		eval(darray[i]);
	}
}

/**
* Toggles from the current language to the secondary
* language and refreshes the data and theme
*/
Main.prototype.toggle = function() {
	this.globaltools = new GlobalTools(this);
	this.theme = new Theme(this);
	this.glossary = new Glossary(this);
	this.course = new Course(this);
	sendCommand("toggle");
}

/**
* sends the command to get the current page information
*/
Main.prototype.getCurrent = function() {
	sendCommand("current");
}

/**
* Sets the chapter from a supplied ID
* @param {string} i chapter id
*/
Main.prototype.setCurrentChapterByID = function(i) {
	this.chapter = this.course.getChapterByID(i);
	this.chapter.dump();
}

/**
* Sets the section from a supplied ID
* @param {string} i section id
*/
Main.prototype.setCurrentSectionByID = function(i) {
	this.section = this.chapter.getSectionByID(i);
	this.section.dump();
}

/**
* Sets the topic from a supplied ID
* @param {string} i topic id
*/
Main.prototype.setCurrentTopicByID = function(i) {
	this.topic = this.section.getTopicByID(i);
	this.topic.dump();
}

/**
* Sets the page from a supplied ID and if the page
* set does not have page text set, the call is made
* to get that text.
* @param {string} i page id
*/
Main.prototype.setCurrentPageByID = function(i) {
	this.page = this.topic.getPageByID(i);
	if (this.page.contenttext == null) {
		this.page.getText();
	} else {
		this.page.dump();
		this.page.media.dump();
		eventobj.eventWatcher("pageready");
	}
}

/**
* Adds a theme item to the themetext associative array on the Theme Object
* @param {string} k entry key
* @param {string} i entry item
*/
Main.prototype.addThemeItem = function(k, i) {
	this.theme.themetext[k] = i;
}


/**
* Sends the next page command
* @see #previousPage
* @see #gotoPage
*/
Main.prototype.nextPage = function() {
	sendCommand("nextpage");
}

/**
* Sends the previous page command
* @see #nextPage
* @see #gotoPage
*/
Main.prototype.previousPage = function() {
	sendCommand("prevpage");
}

/**
* Sends the go to page command passing the supplied
* LI number
* @param {string} p "." delimited LI number for the page
*			to be navigated to, ex "1.2.3.4"
* @see #previousPage
* @see #nextPage
*/
Main.prototype.gotoPage = function(p) {
	sendCommand("gotopage", p);
}

main = new Main();

