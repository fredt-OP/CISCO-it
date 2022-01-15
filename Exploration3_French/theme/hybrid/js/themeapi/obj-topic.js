/**
* Contains data for a topic
* @constructor
*
* @author mpollack
* @version 1.0
* @param {Section} p parent object reference
* @param {string} id topic ID
* @param {string} ti topic title
* @param {string} ty topic type
* @param {int} nu topic number
*
*/
function Topic(p,id,ti,ty,nu) {
/**
* Name given to identify object on debug 
* @type string
*/
	this.objname = "topic";
/**
* Reference to parent object
* @type Section
*/
	this.par = p;
/**
* Topic ID
* @type string
*/
	this.oid = id;
/**
* Topic title
* @type string
*/
	this.title = ti;
/**
* Topic type
* @type string
*/
	this.type = ty;
/**
* Topic number
* @type int
*/
	this.num = nu;
/**
* Page objects in a sequential array
* @type array
*/
	this.pages = new Array();
/**
* Topic objects in an associative array
* @type array
*/
	this.pagesID = new Array();
}

/**
* Gets the page from a supplied ID
* @param {string} i page id
* @return A {@link Page} instance
* @type Page
*/
Topic.prototype.getPageByID = function(i) {
	var r = this.pagesID[i];
	return r;
}

/**
* Checks the topic to see if any pages furth down the tree
* contain media of a particular type
* @param {string} f media filter type
* @return boolean
* @type Boolean
*/
Topic.prototype.containsMediaByFilter = function(f) {
	var check = false;
	for (var j=0; j<this.pages.length; j++) {
		if (this.pages[j].media.filtertype == f) {
			check = true;
			j = this.pages.length;
		}
	}
	return check;
}

/**
* Returns the li number for the topic
* @param {string} i li direction
* @return A string containing the li of the chapter 
* @type string
*/
Topic.prototype.getLI = function(i) {
	if (i != "rtl") {
		var li = new String(this.par.par.num+"."+this.par.num+"."+this.num);
	} else {
		var li = new String(this.num+"."+this.par.num+"."+this.par.par.num);
	}
	return li;
}


/**
* Sends debug information on all properties to the debug window
*/
Topic.prototype.dump = function() {
	var d = "Topic Dump\n";
	d += "\tthis.objname: "+this.objname+"\n";
	d += "\tthis.oid: "+this.oid+"\n";
	d += "\tthis.par: "+this.par+"\n";
	d += "\tthis.title: "+this.title+"\n";
	d += "\tthis.num: "+this.num+"\n";
	d += "\tthis.type: "+this.type+"\n";
	d += "\tthis.pages: "+this.pages+"\n";
	dump(d);
}


