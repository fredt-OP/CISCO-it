/**
* Sends command and properties to the flash item
* @param {string} c command to send
* @param {string} p properties to send
*/
function sendCommand(c,p) {
	var d = "SEND\n";
	d += "\tjscommand: "+c+"\n";
	if (p) { d+= "\tjsprops: "+p+"\n"; }
	dump(d);
	fo = window.frames["mediaframe"].document["cheetah"];
	fo.SetVariable("jsprops", p);
	fo.SetVariable("jscommand", c);
}
/**
* Recieves response from the flash item based on the command sent.
* If the command sent was not valid and error returns.  If the
* command was valid the data is made available inside the flash
* as a variable which is retrieved and acted upon based on
* the command type.
* @param {string} c command recieved
*/
function recCommand(c) {
	var d = "RECEIVE\n";
	d += "\tcommand: "+c+"\n";
	dump(d);
	fo = window.frames["mediaframe"].document["cheetah"];
	jsdata = fo.GetVariable("jsdata");
	switch(c) {
		/*
		load status
		*/
		case 'loadstatus':
			var i = "maincontent";
			if (document.getElementById) {
				x = document.getElementById(i);
			} else if (document.all) {
				x = document.all[i];
			}
			if (x) {
				x.innerHTML = jsdata;
			}
			break;
		/*
		utility commands
		*/
		case 'init':
			sendCommand("checkcom");
			break;
		case 'checkcom':
			dump(jsdata+"\n");
			eventobj.eventWatcher("comactive");
			break;
		case 'error':
			alert(jsdata);
			break;
		/*
		data commands
		*/
		case 'globaltoolsdata':
			main.globaltools.setData(jsdata);
			break;
		case 'themedata':
			main.theme.setData(jsdata);
			break;
		case 'glossarydata':
			main.glossary.setData(jsdata);
			break;
		case 'coursedata':
			main.course.setData(jsdata);
			break;
		case 'current':
			main.setData(jsdata);
			break;
		case 'pagetext':
			main.page.setText(jsdata);
			eventobj.eventWatcher("pageready");
			break;
		/*
		event commands
		*/
		case 'update':
			main.getCurrent();
			break;
		case 'toggle':
			eventobj.eventWatcher("toggle");
			break;
	}
}
