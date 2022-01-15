/**
* Holds information for glossary set
* @constructor
*
* @author mpollack
* @version 1.0
* @param {Glossary} p parent object reference
* @param {string} sk set key
* @param {string} sl set label
*/
function GlossarySet(p, sk, sl) {
/**
* Name given to identify object on debug 
* @type string
*/
	this.objname = "glossaryset";
/**
* Reference to parent object
* @type Glossary
*/
	this.par = p;
/**
* Glossary set key used to identify the set
* @type string
*/
	this.setkey = sk;
/**
* Glossary set label for display
* @type string
*/
	this.setlabel = sl;
/**
* Sequential array of glossary term objects
* @type array
*/
	this.terms = new Array();
}

/**
* Adds glossary term object to sequential terms array
* @param {GlossaryTerm} t glossry term object reference
*/
GlossarySet.prototype.addTerm = function(t) {
	this.terms.push(t);
}
/**
* Sends debug information on set properties
* to the debug window if turned on
*/

GlossarySet.prototype.dump = function() {
	var d = "GlossarySet Dump\n";
	d += "\tthis.objname: "+this.objname+"\n";
	d += "\tthis.par: "+this.par+"\n";
	d += "\tthis.setkey: "+this.setkey+"\n";
	d += "\tthis.setlabel: "+this.setlabel+"\n";
	d += "\tthis.terms.length: "+this.terms.length+"\n";
	dump(d);
}


