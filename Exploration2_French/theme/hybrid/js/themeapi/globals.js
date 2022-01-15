/**
* Contains top level variables and methods
*
* @author mpollack
* @version 1.0
*
*/

// holds main object reference once set
main = null;
// holds event object reference once set
eventobj = null;
// boolean of stating whether all items are ready
isready = false;
// boolean of whether or not to use debug window
dumpon = false; 
// default debug data
dumpdata = "";
// reference to debug window
dumpwin = null;
// creates debug window if debug is on and no debug window exists
if (dumpon && !dumpwin) {
	dumpwin = window.open("../html/debug.html", "dumpwin");
}
/**
* Method to debug information if debugging is turned on
* @param {string} d Information to debug
*/
function dump(d) {
	if (dumpon) {
		dumpdata += datestamp()+"\t"+d;
		if (!dumpwin) {
			dumpwin = window.open("../html/debug.html", "dumpwin");
		} else {
			dumpwin.dump();
		}
	}
}
/**
* Method to clear debug information
*/
function cleardump() {
	dumpdata = "";
}

/**
* Method to get current time stamp
* @returns {string} current time in hour:minute:second:millisecond format
*/
function datestamp() {
	var d = new Date();
	var hou = d.getHours();
	var min = d.getMinutes();
	var sec = d.getSeconds();
	var mil = d.getMilliseconds();
	var r = hou+":"+min+":"+sec+":"+mil;
	return r;
}

/**
* Method set the content to ready
*/
function setReady(s) {
	isready = s;
	dump("isready: "+isready+"\n");
	if (isready) {
		eventobj.eventWatcher("contentready");
	}
}
/**
* Method to check to see if the session contains a secondary language
*/
function hasToggle() {
	var ht = true;
	var url = new String(window.location);
	if (url.indexOf("&l2=none") > -1) {
		ht = false;
	}
	return ht;
}
hasToggle();

