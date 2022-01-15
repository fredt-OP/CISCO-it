/**
* Contains data for a page
* @constructor
*
* @author mpollack
* @version 1.0
* @param {Topic} p parent object reference
* @param {string} id page ID
* @param {string} ty page type
* @param {int} nu page number
* @param {string} te page text
*
*/
function Page(p,id,ty,nu,te) {
/**
* Name given to identify object on debug 
* @type string
*/
	this.objname = "page";
/**
* Reference to parent object
* @type Topic
*/
	this.par = p;
/**
* Page ID
* @type string
*/
	this.oid = id;
/**
* Page type
* @type string
*/
	this.type = ty;
/**
* Page number
* @type int
*/
	this.num = nu;
/**
* Page text
* @type string
*/
	this.contenttext = new String(te);
/**
* Page media
* @type Media
*/
	this.media = null;
/**
* Parses page text to convert links to proper format for use in HTML
*/
	this.parseLinksInText();
}

/**
* Parses page text to convert links to proper format for use in HTML
*/
Page.prototype.parseLinksInText = function() {
	if (this.contenttext.indexOf("asfunction:") > -1) {
		if (this.contenttext.indexOf("getGlossaryTerm") > -1 ) {
			var s = this.contenttext.indexOf("asfunction:_global.core.gui.pglossary.getGlossaryTerm");
			var e = this.contenttext.indexOf("\"",s);
			var sub = this.contenttext.substring(s,e);
			var id = sub.substr(sub.indexOf(",")+1,sub.length);
			this.contenttext = this.contenttext.replace(sub,"javascript:top.popup('pglossary','"+id+"');");
		} else if (this.contenttext.indexOf("openInternalFile") > -1 ) {
			var path = "../../../courses/"+main.course.oid+"/"+this.par.par.par.oid+"/"+this.par.par.oid+"/"+this.par.oid+"/"+this.oid;
			var s = this.contenttext.indexOf("asfunction:_global.core.currentpage.openInternalFile,");
			var e = this.contenttext.indexOf("\"",s);
			var sub = this.contenttext.substring(s,e);
			var file = sub.substr(sub.indexOf(",")+1,sub.length);
			this.contenttext = this.contenttext.replace(sub,"javascript:openExternal('"+path+"/"+file+"');");
		}
		if (this.contenttext.indexOf("asfunction:") > -1) {
			this.parseLinksInText();
		}
	}
}

/**
* Sends the command to get the page text
*/
Page.prototype.getText = function() {
	sendCommand("pagetext");
}

/**
* Returns the li number for the page
* @param {string} i li direction
* @return A string containing the li of the chapter 
* @type string
*/
Page.prototype.getLI = function(i) {
	if (i != "rtl") {
		var li = new String(this.par.par.par.num+"."+this.par.par.num+"."+this.par.num+"."+this.num);
	} else {
		var li = new String(this.num+"."+this.par.num+"."+this.par.par.num+"."+this.par.par.par.num);
	}
	return li;
}


/**
* Sets the page text
* @param {string} d page text
*/
Page.prototype.setText = function(d) {
	this.contenttext = d;
	this.dump();
}

/**
* Sends debug information on all properties to the debug window
*/
Page.prototype.dump = function() {
	var d = "Page Dump\n";
	d += "\tthis.objname: "+this.objname+"\n";
	d += "\tthis.oid: "+this.oid+"\n";
	d += "\tthis.par: "+this.par+"\n";
	d += "\tthis.num: "+this.num+"\n";
	d += "\tthis.type: "+this.type+"\n";
	d += "\tthis.contenttext: "+this.contenttext+"\n";
	dump(d);
}


