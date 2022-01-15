/**
* Holds information for glossary term
* @constructor
*
* @author mpollack
* @version 1.0
* @param {Glossary} p parent object reference
* @param {string} t term
* @param {string} d definition
* @param {string} i term id
* @param {string} s set id
* @param {string} sa see also terms
*/
function GlossaryTerm(p,t,d,i,s,sa) {
/**
* Name given to identify object on debug 
* @type string
*/
	this.objname = "glossaryterm";
/**
* Reference to parent object
* @type Glossary
*/
	this.par = p;
/**
* Glossary term string
* @type string
*/
	this.term = t;
/**
* Glossary term definition
* @type string
*/
	this.definition = d;
/**
* Glossary term id
* @type string
*/
	this.id = i;
/**
* ID of glossary set term belongs in
* @type string
*/
	this.setID = s;
/**
* Array of glossary term ids this term is to reference
* @type array
*/
	this.seealso = this.setSeeAlso(sa);
}
/**
* Sets data on the object using a delimited string
* sent via the jshook api.  The string is split and each
* entry is run through eval() to execute.
* @param {string} d delimited string with js commands
*/
GlossaryTerm.prototype.setData = function(d) {
	var darray = d.split("<#>");
	for (i=0; i<darray.length; i++) {
		eval(darray[i]);
	}
	this.dump();
}
/**
* Converts comma delimited string of glossary ids to an array
* @param {string} r delimited string of glossary term ids
* @returns {array} glossary term ids
*/
GlossaryTerm.prototype.setSeeAlso = function(r) {
	if (r == "undefined" || r == undefined || r == "") {
		var ret = null;
        } else {
		var ret = r.split(",");
        }
	return ret;
}
/**
* Sends debug information on term properties
* to the debug window if turned on
*/
GlossaryTerm.prototype.dump = function() {
	var d = "GlossaryTerm Dump\n";
	d += "\tthis.objname: "+this.objname+"\n";
	d += "\tthis.par: "+this.par+"\n";
	d += "\tthis.term: "+this.term+"\n";
	d += "\tthis.definition: "+this.definition+"\n";
	d += "\tthis.id: "+this.id+"\n";
	d += "\tthis.setID: "+this.setID+"\n";
	d += "\tthis.seealso: "+this.seealso+"\n";
	dump(d);
}


