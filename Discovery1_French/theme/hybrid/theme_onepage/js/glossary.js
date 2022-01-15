glossaryon = false;
returntofocus = null;
selterm = null;
selset = null;

if (window.opener) {  if (window.opener.selterm) { selectTerm(window.opener.selterm, true); } }

function glossary() {
	glossaryon = true;
	var glossary = new EJS({url: 'glossary.ejs'});
	var html = "";
	data = {main:window.opener.main};
	html = glossary.render(data);
	var ret = writeToElement("toolsdiv", html);
	if ($E('form[id=glossary_form]')) {
		if ($E('form[id=glossary_form]').glossary_term) {
			$E('form[id=glossary_form]').glossary_term.focus();
		} else if ($E('form[id=glossary_form]').glossary_list) {
			$E('form[id=glossary_form]').glossary_list.focus();
		} else if ($E('form[id=glossary_form]').glossary_index) {
			$E('form[id=glossary_form]').glossary_index.focus();
		}
	}
}


function selectTerm(id, noupdate) {
	selterm = window.opener.main.glossary.termsID[id];
	selset = window.opener.main.glossary.setsID[selterm.setID];
	if (!noupdate) {
		glossary();
	}
}

function selectSet(k) {
	selterm = null;
	selset = window.opener.main.glossary.setsID[k];
	glossary();
}

function closeGlossary() {
	selterm = null;
	window.opener.selterm = null;
	glossaryon = false;
	window.close();
}

function popup(t,i) {
	openPopup("glossary");
	selterm = i;
}

function parseDefinition(def) {
	def = def.replace(/<content-text>/g, '');
	def = def.replace(/<\/content-text>/g, '');
	def = def.replace(/<p>/g, '');
	def = def.replace(/<\/p>/g, '');
	def = def.replace(/<br\/>/g, '\n');
	return def;
}

function getCurrentFocus() {
	var elements = $ES('');
	alert(elements.length);
	for (var i=0; i<elements.length; i++) {
		if (elements[i].focus) { alert(elements[i]); }
	}
}
