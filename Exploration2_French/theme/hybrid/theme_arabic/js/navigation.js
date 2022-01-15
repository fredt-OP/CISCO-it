function popup(id, arg) {
	switch (id) {
		case 'pglossary':
			if (!arg) { arg = "null"; }
			popwin = window.open(id+".html?term="+arg, "popwin");
			break;
		default:
			popwin = window.open(id+".html", "popwin");
			break;
			
	}
}
