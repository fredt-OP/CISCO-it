/**
* Contains data for global tools
* @constructor
*
* @author mpollack
* @version 1.0
* @param {Main} p parent object reference
* @param {string} la globl tool label
* @param {string} lt global tool link type
* @param {string} li global tool link
*
*/
function GlobalTools(p) {
/**
* Name given to identify object on debug 
* @type string
*/
	this.objname = "globaltool";
/**
* Reference to parent object
* @type Topic
*/
	this.par = p;
/**
* array of global tool instances
* @type array
*/
	this.tools = new Array();
}

/**
* sends the call to get global tool data
*/
GlobalTools.prototype.getData = function() {
	sendCommand("globaltoolsdata");

}

/**
* Sets data on the object using a delimited string
* sent via the jshook api.  The string is split and each
* entry is run through eval() to execute.
* @param {string} d delimited string with js commands
*/
GlobalTools.prototype.setData = function(d) {
	var darray = d.split("<#>");
	for (i=0; i<darray.length; i++) {
		eval(darray[i]);
	}
	this.dump();
	eventobj.eventWatcher("globaltoolsready");
	this.dump();
}


/**
* Adds a global tool object to the tools array
* @param {string} link global tool link
* @param {string} linktype global tool link type
* @param {string} label global tool label
*/
GlobalTools.prototype.addGlobalTool = function(link, linktype, label) {
	var nt = {label:label, linktype:linktype, link:'../../../'+link};
	this.tools.push(nt);
}

/**
* Sends debug information on all properties to the debug window
*/
GlobalTools.prototype.dump = function() {
	var d = "Global Tool Dump\n";
	d += "\tthis.objname: "+this.objname+"\n";
	d += "\tthis.par: "+this.par+"\n";
	d += "\tthis.tools: "+this.tools.length+"\n";
	dump(d);
}


