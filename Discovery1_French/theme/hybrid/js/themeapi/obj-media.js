/**
* Contains data for media
* @constructor
*
* @author mpollack
* @version 1.0
* @param {Page} p parent object reference
* @param {string} id media ID
* @param {string} ty media type
* @param {string} fi media file
* @param {string} ex media external data
* @param {string} ft media filter type
*
*/
function Media(p,id,ty,fi,ex,mt,ft) {
/**
* Name given to identify object on debug 
* @type string
*/
	this.objname = "media";
/**
* Reference to parent object
* @type Page
*/
	this.par = p;
/**
* Media ID
* @type string
*/
	this.oid = id;
/**
* Media type
* @type string
*/
	this.type = ty;
/**
* Media file reference
* @type string
*/
	this.file = fi;
/**
* Media external data
* @type string
*/
	this.external = ex;
/**
* Media major type
* @type string
*/
	this.majortype = mt;
/**
* Media filter type
* @type string
*/
	this.filtertype = ft;

}

/**
* Sends debug information on all properties to the debug window
*/
Media.prototype.dump = function() {
	var d = "Media Dump\n";
	d += "\tthis.objname: "+this.objname+"\n";
	d += "\tthis.oid: "+this.oid+"\n";
	d += "\tthis.par: "+this.par+"\n";
	d += "\tthis.type: "+this.type+"\n";
	d += "\tthis.file: "+this.file+"\n";
	d += "\tthis.external: "+this.external+"\n";
	d += "\tthis.majortype: "+this.majortype+"\n";
	d += "\tthis.filtertype: "+this.filtertype+"\n";
	dump(d);
}



