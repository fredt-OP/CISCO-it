/**
* Contains theme data
* @constructor
*
* @author mpollack
* @version 1.0
* @param {Main} p parent object reference
*
*/
function Theme(p) {
/**
* Name given to identify object on debug 
* @type string
*/
	this.objname = "theme";
/**
* Reference to parent object
* @type Main
*/
	this.par = p;
/**
* Associative array of all theme text items
* @type array
*/
	this.themetext = new Array();
}
/**
* Sends a command to get the theme data
*/
Theme.prototype.getData = function() {
	sendCommand("themedata");

}
/**
* Sets data on the object using a delimited string
* sent via the jshook api.  The string is split and each
* entry is run through eval() to execute.
* @param {string} d delimited string with js commands
*/
Theme.prototype.setData = function(d) {
	var darray = d.split("<#>");
	for (i=0; i<darray.length; i++) {
		eval(darray[i]);
	}
	this.dump();
	eventobj.eventWatcher("themeready");
}
/**
* Adds a theme item to the themetext associative array
* @param {string} k entry key
* @param {string} i entry item
*/
Theme.prototype.addThemeItem = function(k, i) {
	this.themetext[k] = i;
}
/**
* Returns a theme item from the themetext associative array
* @param {string} i entry key
* @returns {string} Either the string associated with the supplied key or an error string
*/
Theme.prototype.getThemeItem = function(i) {
	if (this.themetext[i]) {
		r = this.themetext[i];
	} else {
		r = "ERROR: No entry for id "+i+" in theme data.";
	}
	return r;
}

/**
* Sends debug information of all theme data to the debug window
*/
Theme.prototype.dump = function() {
	var d = "Theme Dump\n";
	d += "\tthis.objname: "+this.objname+"\n";
	for (id in this.themetext) {
		d += "\tthis.themetext[\""+id+"\"]: "+this.getThemeItem(id)+"\n";
	}
	dump(d);
}


