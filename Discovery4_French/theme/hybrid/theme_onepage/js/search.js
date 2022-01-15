searchstring = "";
foundArray = new Array();
foundCount = 0;
searchon = false;

function search() {
	searchon = true;
	var search = new EJS({url: 'search.ejs'});
	var html = "";
	data = {main:window.opener.main};
	html = search.render(data);
	writeToElement("toolsdiv", html);
	if ($E('form[id=searchform]').search_results) {
		$E('form[id=searchform]').search_results.focus();
	} else {
		$E('form[id=searchform]').field.focus();
	}
}

function searchContent() {
	var term = $E('form[id=searchform]').field.value;
	searchstring = term;
	if (term.length > 0) {
		foundArray = new Array();
		foundCount = 0;
		for (var i=0; i<window.opener.main.course.chapters.length; i++) {
			var ch = window.opener.main.course.chapters[i];
			for (var j=0; j<ch.sections.length; j++) {
				var se = ch.sections[j];
				for (var k=0; k<se.topics.length; k++) {
					var to = se.topics[k];
					for (var l=0; l<to.pages.length; l++) {
						var pa = to.pages[l];
						var has = checkForTerm(term,pa.contenttext);
						if (has) {
							foundArray[ch.oid] = true;
							foundArray[se.oid] = true;
							foundArray[to.oid] = true;
							foundArray[pa.oid] = true;
							foundCount++;
						}
					}
				}
			}
		}
	}
	search();
}

function selectPage() {
	li = $E('form[id=searchform]').search_results.options[$E('form[id=searchform]').search_results.selectedIndex].value;
	window.opener.main.gotoPage(li);
	window.opener.scrollToTop();
	closeSearch();
}

function closeSearch() {
	searchon = false;
	window.close();
}

function resetSearch() {
	searchstring = "";
	foundArray = new Array();
	foundCount = 0;
	search();
}



function checkForTerm(t,r) {
	var t = t.toLowerCase();
	var r = r.toLowerCase();
	if (r.indexOf(t) > -1) {
		return true;
	} else {
		return false;
	}
}

