function openAbout(file, dir) {
	var w = 500;
	var h = 300;
	if (dir) {
		direction = dir;
	} else {
		if (isarabic && main.course.lang == "tl") {
			direction = "dir=rtl";
		} else {
			direction = "dir=ltr";
		}
	}
	var about = window.open("../about.html?file="+file+"&"+direction, "about", "status=0,toolbar=0,location=1,menubar=0,address=1,directories=0,resizable=1,scrollbars=1,width="+w+",height="+h);
}

function loadAbout(url) {
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

	if (window.opener.main) {
		var main = window.opener.main;
	} else if (window.opener.top.main) {
		var main = window.opener.top.main;
	} else {
		alert("error: couldn't find main object");
	}
	var text = "<b>"+main.course.title+"</b><br>";
	text += "<b>"+main.course.subtitle+"</b><br><br>";
	var p = xmlDoc.getElementsByTagName('p');
	for (i=0;i<p.length-1;i++) {
		text += "<p>"+p[i].childNodes[0].nodeValue+"</p><br>";
	}
	var a = xmlDoc.getElementsByTagName('span')[0].childNodes[0].nodeValue;
	text += "<a href=\""+a+"\">"+a+"</a>";
	writeToElement("aboutdiv", text);
}


