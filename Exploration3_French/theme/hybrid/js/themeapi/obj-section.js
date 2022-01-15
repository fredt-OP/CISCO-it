/**
* Contains data for a section
* @constructor
*
* @author mpollack
* @version 1.0
* @param {Course} p parent object reference
* @param {string} id section ID
* @param {string} ti section title
* @param {string} ty section type
* @param {int} nu section number
*
*/
function Section(p,id,ti,ty,nu) {
/**
* Name given to identify object on debug 
* @type string
*/
	this.objname = "section";
/**
* Reference to parent object
* @type Chapter
*/
	this.par = p;
/**
* Section ID
* @type string
*/
	this.oid = id;
/**
* Section title
* @type string
*/
	this.title = ti;
/**
* Section type
* @type string
*/
	this.type = ty;
/**
* Section number
* @type string
*/
	this.num = nu;
/**
* Topic objects in a sequential array
* @type array
*/
	this.topics = new Array();
/**
* Topic objects in an associative array
* @type array
*/
	this.topicsID = new Array();
}

/**
* Gets the topic from a supplied ID
* @param {string} i topic id
* @return A {@link Topic} instance
* @type Topic
*/
Section.prototype.getTopicByID = function(i) {
	var r = this.topicsID[i];
	return r;
}

/**
* Returns the li number for the section
* @param {string} i li direction
* @return A string containing the li of the chapter 
* @type string
*/
Section.prototype.getLI = function(i) {
	if (i != "rtl") {
		var li = new String(this.par.num+"."+this.num);
	} else {
		var li = new String(this.num+"."+this.par.num);
	}
	return li;
}


/**
* Checks the section to see if any pages furth down the tree
* contain media of a particular type
* @param {string} f media filter type
* @return boolean
* @type Boolean
*/
Section.prototype.containsMediaByFilter = function(f) {
	var check = false;
	for (var i=0; i<this.topics.length; i++) {
		var ct = this.topics[i];
		for (var j=0; j<ct.pages.length; j++) {
			if (ct.pages[j].media.filtertype == f) {
				check = true;
				j = ct.pages.length;
				i = this.topics.length;
			}
		}
	}
	return check;
}

/**
* Sends debug information on all properties to the debug window
*/
Section.prototype.dump = function() {
	var d = "Section Dump\n";
	d += "\tthis.objname: "+this.objname+"\n";
	d += "\tthis.oid: "+this.oid+"\n";
	d += "\tthis.par: "+this.par+"\n";
	d += "\tthis.title: "+this.title+"\n";
	d += "\tthis.num: "+this.num+"\n";
	d += "\tthis.type: "+this.type+"\n";
	d += "\tthis.topics: "+this.topics+"\n";
	dump(d);
}


