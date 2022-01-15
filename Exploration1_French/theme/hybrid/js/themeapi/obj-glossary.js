/**
* Holds all glossary terms, sets and access controls
* @constructor
*
* @author mpollack
* @version 1.0
& @param {Main} p parent object reference
*
*/
function Glossary(p) {
/**
* Name given to identify object on debug 
* @type string
*/
	this.objname = "glossary";
/**
* Reference to parent object
* @type Main
*/
	this.par = p;
/**
* Glossary sets in sequential array
* @type array
*/
	this.sets = new Array();
/**
* Glossary sets in associative array
* @type array
*/
	this.setsID = new Array();
/**
* Glossary terms in sequential array
* @type array
*/
	this.terms = new Array();
/**
* Glossary terms in associative array
* @type array
*/
	this.termsID = new Array();
}

/**
* sends the command to get the glossary data
*/
Glossary.prototype.getData = function() {
	sendCommand("glossarydata");
}
/**
* Sets data on the object using a delimited string
* sent via the jshook api.  The string is split and each
* entry is run through eval() to execute.
* @param {string} d delimited string with js commands
*/
Glossary.prototype.setData = function(d) {
	var darray = d.split("<#>");
	for (i=0; i<darray.length; i++) {
		eval(darray[i]);
	}
	this.dump();
	eventobj.eventWatcher("glossaryready");
}
/**
* Adds a term object to the term arrays and if the set exists
* adds that term to the term array of the set
* @param {string} t term
* @param {string} d definition
* @param {string} i term id
* @param {string} s set id
* @param {string} sa see also terms
*/
Glossary.prototype.addTerm = function(t, d, i, s, sa) {
	var term = new GlossaryTerm(this, t, d, i, s, sa);
	this.terms.push(term);
	this.termsID[i] = term;
	if (this.setsID[s]) {
		this.setsID[s].addTerm(term);
	}
}
/**
* Adds a set object to the set arrays
* @param {string} sk set key
* @param {string} sl set label
*/
Glossary.prototype.addSet = function(sk, sl) {
	var set = new GlossarySet(this, sk, sl);
	this.sets.push(set);
	this.setsID[sk] = set;
}
/**
* Returns a set object based on set id or an error string
* if the id is invalid
* @param {string} i set id
* @returns {GlossarySet} GlossarySet object reference
*/
Glossary.prototype.getSetByID = function(i) {
	if (this.setsID[i]) {
		return this.setsID[i];
	} else {
		return "ERROR: No set found with id: "+i;
	}
}
/**
* Returns a term object based on set id or an error string
* if the id is invalid
* @param {string} i term id
* @returns {GlossaryTerm} GlossaryTerm object reference
*/
Glossary.prototype.getTermByID = function(i) {
	if (this.termsID[i]) {
		return this.termsID[i];
	} else {
		return "ERROR: No term found with id: "+i;
	}
}
/**
* Sends debug information on glossary, sets and terms
* to the debug window if turned on
*/
Glossary.prototype.dump = function() {
	var d = "Glossary Dump\n";
	d += "\tthis.objname: "+this.objname+"\n";
	d += "\tthis.par: "+this.par+"\n";
	d += "\tthis.sets.length: "+this.sets.length+"\n";
	d += "\tthis.terms.length: "+this.terms.length+"\n";
	dump(d);
}


