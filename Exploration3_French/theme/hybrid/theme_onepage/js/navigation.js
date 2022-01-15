var contentNavArray = new Array();

function fillNavArray() {
	for (var i=0; i<main.course.chapters.length; i++) {
		if (getLevel() == "chapter") { contentNavArray.push(main.course.chapters[i]); }
		for (var j=0; j<main.course.chapters[i].sections.length; j++) {
			if (getLevel() == "section") { contentNavArray.push(main.course.chapters[i].sections[j]); }
			for (var k=0; k<main.course.chapters[i].sections[j].topics.length; k++) {
				if (getLevel() == "topic") { contentNavArray.push(main.course.chapters[i].sections[j].topics[k]); }
				for (var l=0; l<main.course.chapters[i].sections[j].topics[k].pages.length; l++) {
					if (getLevel() == "page") { contentNavArray.push(main.course.chapters[i].sections[j].topics[k].pages[l]); }
				}
			}
		}
	}
}

function nextContent() {
	if (contentNavArray.length == 0) { fillNavArray(); }
	var level = getLevel();
	switch (level) {
		case 'chapter':
			var navindex = contentNavArray.indexOf(main.chapter);
			var nextitem = contentNavArray[navindex+1];
			var nsec = nextitem.sections[0];
			var ntop = nsec.topics[0];
			var npag = ntop.pages[0];
			var nextli = npag.getLI();
			break;
		case 'section':
			var navindex = contentNavArray.indexOf(main.section);
			var nextitem = contentNavArray[navindex+1];
			var ntop = nextitem.topics[0];
			var npag = ntop.pages[0];
			var nextli = npag.getLI();
			break;
		case 'topic':
			var navindex = contentNavArray.indexOf(main.topic);
			var nextitem = contentNavArray[navindex+1];
			var npag = nextitem.pages[0];
			var nextli = npag.getLI();
			break;
		case 'page':
			var navindex = contentNavArray.indexOf(main.page);
			var nextitem = contentNavArray[navindex+1];
			var nextli = nextitem.getLI();
			break;
	}
	main.gotoPage(nextli);
}

function prevContent() {
	if (contentNavArray.length == 0) { fillNavArray(); }
	var level = getLevel();
	switch (level) {
		case 'chapter':
			var navindex = contentNavArray.indexOf(main.chapter);
			var previtem = contentNavArray[navindex-1];
			var psec = previtem.sections.getLast();
			var ptop = psec.topics.getLast();
			var ppag = ptop.pages.getLast();
			var prevli = ppag.getLI();
			break;
		case 'section':
			var navindex = contentNavArray.indexOf(main.section);
			var previtem = contentNavArray[navindex-1];
			var ptop = previtem.topics.getLast();
			var ppag = ptop.pages.getLast();
			var prevli = ppag.getLI();
			break;
		case 'topic':
			var navindex = contentNavArray.indexOf(main.topic);
			var previtem = contentNavArray[navindex-1];
			var ppag = previtem.pages.getLast();
			var prevli = ppag.getLI();
			break;
		case 'page':
			var navindex = contentNavArray.indexOf(main.page);
			var previtem = contentNavArray[navindex-1];
			var prevli = previtem.getLI();
			break;
	}
	main.gotoPage(prevli);
}



function indexNavigation() {
	main.gotoPage(window.document.forms["indexform"].indexselect.value);
}

function openPopup(type, clearvars) {
	if (clearvars) {
		selset = null;
		selterm = null;
	}
	if (isarabic && main.course.lang == "tl") {
		var rtl = "&direction=rtl";
	} else {
		var rtl = "";
	}
	var popwin = window.open("popup.html?type="+type+""+rtl, "popwin", "width=1024,height=768");
}

function scrollToTop() {
	window.scroll(0,0);
	$E('a').focus();
}
