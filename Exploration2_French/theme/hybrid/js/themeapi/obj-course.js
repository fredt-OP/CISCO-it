/**
* Contains data tree for entire course
* @constructor
*
* @author mpollack
* @version 1.0
* @param {Main} p parent object reference
*
*/
function Course(p) {
/**
* Name given to identify object on debug 
* @type string
*/
	this.objname = "course";
/**
* Reference to parent object
* @type Main
*/
	this.par = p;
/**
* The title of the course
* @type string
*/
	this.title = "";
/**
* The sub title of the course 
* @type string
*/
	this.subtitle = "";
/**
* The language of the course 
* @type string
*/
	this.lang = "";
/**
* The course ID 
* @type string
*/
	this.oid = null;
/**
* Chapter objects in a sequential array 
* @type array
*/
	this.chapters = new Array();
/**
* Chapter objects in an associative array 
* @type array
*/
	this.chaptersID = new Array();
}

/**
* sends the command to get the course data
*/
Course.prototype.getData = function() {
	sendCommand("coursedata");

}

/**
* Sets data on the object using a delimited string
* sent via the jshook api.  The string is split and each
* entry is run through eval() to execute.
* @param {string} d delimited string with js commands
*/
Course.prototype.setData = function(d) {
	var darray = d.split("<#>");
	for (i=0; i<darray.length; i++) {
		if (darray[i].indexOf("\n") > -1 ) {
			alert("The following XML chunk contains newline character(s) and needs to be fixed before it can be processed.\n\n"+darray[i]);
		} else {
			eval(darray[i]);
		}
	}
	this.dump();
	eventobj.eventWatcher("courseready");
}

/**
* Gets the chapter from a supplied ID
* @param {string} i chapter id
* @return A {@link Chapter} instance
* @type Chapter
*/
Course.prototype.getChapterByID = function(i) {
	var r = this.chaptersID[i];
	return r;
}

/**
* Loops through entire course tree and sends information
* to the debug window if turned on
*/
Course.prototype.dump = function() {
	var d = "Course Dump\n";
	d += "\tthis.objname: "+this.objname+"\n";
	d += "\tthis.oid: "+this.oid+"\n";
	d += "\tthis.par: "+this.par+"\n";
	d += "\tthis.title: "+this.title+"\n";
	d += "\tthis.subtitle: "+this.subtitle+"\n";
	d += "\tthis.lang: "+this.lang+"\n";
	for (i=0; i<this.chapters.length; i++) {
		d += "\t\tchapter.oid: "+this.chapters[i].oid+"\n";
		for (j=0; j<this.chapters[i].sections.length; j++) {
			d += "\t\t\tsection.oid: "+this.chapters[i].sections[j].oid+"\n";
			for (k=0; k<this.chapters[i].sections[j].topics.length; k++) {
				d += "\t\t\t\ttopic.oid: "+this.chapters[i].sections[j].topics[k].oid+"\n";
				for (l=0; l<this.chapters[i].sections[j].topics[k].pages.length; l++) {
					d += "\t\t\t\t\tpage.oid: "+this.chapters[i].sections[j].topics[k].pages[l].oid+"\n";
					d += "\t\t\t\t\tmedia.oid: "+this.chapters[i].sections[j].topics[k].pages[l].media.filtertype+"\n";
				}
			}
		}
	}
	dump(d);
}


