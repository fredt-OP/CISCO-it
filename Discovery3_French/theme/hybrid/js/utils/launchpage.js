function getBrowser() {
    c = navigator.appName+"\n";
    if (c.indexOf("Microsoft") > -1) {
        c = "IE";
    } else {
        c = "other";
    }
    return c;
}



function loadLaunchpage(url) {
	try { 
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	} catch(e) {
		try {
			xmlDoc=document.implementation.createDocument("","",null);
		} catch(e) {
			alert(e.message);
			return;
		}
	}
	xmlDoc.async=false;
	xmlDoc.load(url);

	var coursetitle = xmlDoc.getElementsByTagName('title')[0].getElementsByTagName("content-text")[0].childNodes[0].nodeValue;
	writeToElement("titlediv", coursetitle);
	var coursesubtitle = xmlDoc.getElementsByTagName('subtitle')[0].getElementsByTagName("content-text")[0].childNodes[0].nodeValue;
	writeToElement("subtitlediv", coursesubtitle);
	if (window.document.getElementById("startbtn")) {
		window.document.getElementById("startbtn").value = xmlDoc.getElementsByTagName('lcbtn')[0].getElementsByTagName("content-text")[0].childNodes[0].nodeValue;
	} else {
		var lcbtn = '<a href="javascript:startCourse();" class="btntext">'+xmlDoc.getElementsByTagName('lcbtn')[0].getElementsByTagName("content-text")[0].childNodes[0].nodeValue+'</a>';
		writeToElement("lcbtn", lcbtn);
	}
	var copyright = xmlDoc.getElementsByTagName('copyright')[0].getElementsByTagName("content-text")[0].childNodes[0].nodeValue;
	if (getBrowser() == "IE") {
		if (xmlDoc.getElementsByTagName('copyright')[0].getElementsByTagName("content-text")[0].getElementsByTagName("a")[0]) {
			copyright += '  '+xmlDoc.getElementsByTagName('copyright')[0].getElementsByTagName("content-text")[0].getElementsByTagName("a")[0].xml;
		}
	} else {
		if (xmlDoc.getElementsByTagName('copyright')[0].getElementsByTagName("content-text")[0].getElementsByTagName("a")[0]) {
			copyright += '  <a href="'+xmlDoc.getElementsByTagName('copyright')[0].getElementsByTagName("content-text")[0].getElementsByTagName("a")[0].attributes["href"].value+'" target="_blank"><u>'+xmlDoc.getElementsByTagName('copyright')[0].getElementsByTagName("content-text")[0].getElementsByTagName("a")[0].childNodes[0].nodeValue+'</u></a>';
		}
	}
	writeToElement("copyright", copyright);
	//var loc = new String(window.location);
	//if (loc.indexOf("accessible.html") > -1) {
	if (is508) {
		loadThemelaunch("theme/"+lang1+"/accessible.launch.xml");
	}

}

function loadThemelaunch(url) {
	try { 
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	} catch(e) {
		try {
			xmlDoc=document.implementation.createDocument("","",null);
		} catch(e) {
			alert(e.message);
			return;
		}
	}
	xmlDoc.async=false;
	xmlDoc.load(url);

	// userguide link
	var userguide = xmlDoc.getElementsByTagName('userguide')[0].getElementsByTagName("content-text")[0].childNodes[0].nodeValue;
	var link = $E('a[id=userguide]');
	link.innerHTML = userguide;
	// first selection box
	var heading1 = xmlDoc.getElementsByTagName('heading1')[0].getElementsByTagName("content-text")[0].childNodes[0].nodeValue;
	var label = $E('label[id=level]');
	label.innerHTML = heading1;
	var chlevel = xmlDoc.getElementsByTagName('chlevel')[0].getElementsByTagName("content-text")[0].childNodes[0].nodeValue;
	var option = $E('option[name=chapter]');
	option.innerHTML = chlevel;
	var selevel = xmlDoc.getElementsByTagName('selevel')[0].getElementsByTagName("content-text")[0].childNodes[0].nodeValue;
	var option = $E('option[name=section]');
	option.innerHTML = selevel;
	var tolevel = xmlDoc.getElementsByTagName('tolevel')[0].getElementsByTagName("content-text")[0].childNodes[0].nodeValue;
	var option = $E('option[name=topic]');
	option.innerHTML = tolevel;
	var palevel = xmlDoc.getElementsByTagName('palevel')[0].getElementsByTagName("content-text")[0].childNodes[0].nodeValue;
	var option = $E('option[name=page]');
	option.innerHTML = palevel;
	// second selection box
	var heading2 = xmlDoc.getElementsByTagName('heading2')[0].getElementsByTagName("content-text")[0].childNodes[0].nodeValue;
	var label = $E('label[id=media]');
	label.innerHTML = heading2;
	var transcript = xmlDoc.getElementsByTagName('transcript')[0].getElementsByTagName("content-text")[0].childNodes[0].nodeValue;
	var option = $E('option[name=transfull]');
	option.innerHTML = transcript;
	var visual = xmlDoc.getElementsByTagName('visual')[0].getElementsByTagName("content-text")[0].childNodes[0].nodeValue;
	var option = $E('option[name=visual]');
	option.innerHTML = visual;
	var choice = xmlDoc.getElementsByTagName('choice')[0].getElementsByTagName("content-text")[0].childNodes[0].nodeValue;
	var option = $E('option[name=choice]');
	option.innerHTML = choice;
	if (!allowtranscript) {
		$E('form[id=media]').innerHTML = "";
	}
}



