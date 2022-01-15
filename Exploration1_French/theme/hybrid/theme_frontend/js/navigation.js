function popup(id, arg) {
	if (!arg) { arg = "null"; }
	switch (id) {
		case 'pglossary':
			popwin = window.open(id+".html?term="+arg, "Boink", "menubar=no,width=800,height=500,toolbar=no,screenX=10,screenY=10");
			break;
		default:
			popwin = window.open(id+".html", "Boink", "menubar=no,width=800,height=500,toolbar=no,screenX=10,screenY=10");
			break;
	}
	popwin.focus();
}
