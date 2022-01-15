function loadTranscript(url, target, type, isloop) {
	top.xmlloadtarget = target;
	top.xmlloadtype = type;
	url = "../../"+url;
	try { 
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		writeToElement(target, "Fetching data...");
		xmlDoc.async=false;
		xmlDoc.load(url);  
		parseIt(xmlDoc);
	} catch(e) {
		try {
			var req = new XMLHttpRequest();
			req.open('GET', url, false); 
			req.onload = setXMLDoc;
			req.send(null);
		} catch(e) {
			//alert(e.message);
			return;
		}
	}
}

function setXMLDoc(e) {
	xmlDoc = e.target.responseXML;
	parseIt(xmlDoc);
}

function parseIt(XMLDoc) {
	try  {
		ttext = "";
		//ttext = url+"<br>";
		writeToElement(top.xmlloadtarget, ttext);
		ttext += "<b>"+xmlDoc.getElementsByTagName('title')[0].childNodes[0].childNodes[0].nodeValue+"</b><br/>";
		if (top.xmlloadtype == "brief") {
			ttext += xmlDoc.getElementsByTagName('brief')[0].childNodes[0].childNodes[0].nodeValue;
		} else if (type == "full") {
			ttext += xmlDoc.getElementsByTagName('full')[0].childNodes[0].childNodes[0].nodeValue;
		}
		writeToElement(top.xmlloadtarget, ttext);

		showAllTranscripts();
	} catch(e) {
		ttext = main.theme.getThemeItem('notranscript')+"<br/>";
		writeToElement(top.xmlloadtarget, ttext);
		showAllTranscripts();
		//alert(e.message);
	}
}



function loadVisualMedia(oid, width, height, mediaplayer, mediaref, externalref, mediatyperef) {
	if (openDiv && openDiv != "null") {
		clearDiv(openDiv);
	}
	var f = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="'+width+'" height="'+height+'" id="'+oid+'" align="top">';
	f += '<param name="base" value="../../" />';
	f += '<param name="allowScriptAccess" value="sameDomain" />';
	f += '<param name="movie" value="'+mediaplayer+'?mediaref='+mediaref+'&externalref='+externalref+'&mediatyperef='+mediatyperef+'" />';
	f += '<param name="menu" value="false" />';
	f += '<param name="quality" value="high" />';
	f += '<param name="bgcolor" value="#FFFFFF" />';
	f += '<embed src="'+mediaplayer+'?mediaref='+mediaref+'&externalref='+externalref+'&mediatyperef='+mediatyperef+'" menu="false" quality="high" bgcolor="#FFFFFF" width="'+width+'" height="'+height+'" name="'+oid+'" align="top" base="../../" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
	f += '</object>';
	writeToElement("media"+oid, f);
	openDiv = "media"+oid;
}

openDiv = null;

function clearDiv(d) {
	writeToElement(d, "");
}
	

transcripts = new Array();

function showAllTranscripts() {
	if (transcripts.length > 0) {
		var ct = transcripts.pop();
		loadTranscript(ct.url, ct.target, ct.type, true);
	}
}

function addTranscript(o) {
	transcripts.push(o);
}

function clearTranscripts() {
	transcripts = new Array();
}

function transcriptObject(ur,ta,ty) {
	this.url = ur;
	this.target = ta;
	this.type = ty;
}
