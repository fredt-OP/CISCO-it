/**
* Contains data for a chapter
* @constructor
*
* @author mpollack
* @version 1.0
* @param {Course} p parent object reference
* @param {string} id chapter ID
* @param {string} ti chapter title
* @param {string} ty chapter type
* @param {int} nu chapter number
*
*/
function Chapter(p,id,ti,ty,nu) {
/**
* Name given to identify object on debug 
* @type string
*/
	this.objname = "chapter";
/**
* Reference to parent object
* @type Course
*/
	this.par = p;
/**
* Chapter ID
* @type string
*/
	this.oid = id;
/**
* Chapter title
* @type string
*/
	this.title = ti;
/**
* Chapter tytpe
* @type string
*/
	this.type = ty;
/**
* Chapter number
* @type int
*/
	this.num = nu;
/**
* Section objects in a sequential array
* @type array
*/
	this.sections = new Array();
/**
* Section objects in an associative array
* @type array
*/
	this.sectionsID = new Array();
}

/**
* Gets the section from a supplied ID
* @param {string} i section id
* @return A {@link Section} instance
* @type Section
*/
Chapter.prototype.getSectionByID = function(i) {
	var r = this.sectionsID[i];
	return r;
}

/**
* Returns the li number for the chapter
* @param {string} i li direction
* @return A string containing the li of the chapter 
* @type string
*/
Chapter.prototype.getLI = function(i) {
	var li = new String(this.num);
	return li;
}


/**
* Sends debug information on all properties to the debug window
*/
Chapter.prototype.dump = function() {
	var d = "Chapter Dump\n";
	d += "\tthis.objname: "+this.objname+"\n";
	d += "\tthis.oid: "+this.oid+"\n";
	d += "\tthis.par: "+this.par+"\n";
	d += "\tthis.title: "+this.title+"\n";
	d += "\tthis.num: "+this.num+"\n";
	d += "\tthis.type: "+this.type+"\n";
	d += "\tthis.sections: "+this.sections+"\n";
	dump(d);
}


