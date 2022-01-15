currentlink = -1;
currentcontent = null;

function nextLink() {
	var links = $ES('a');
	currentlink++;
	if (currentlink >= links.length) {
		currentlink = 0;
	}
	links[currentlink].focus();
}

function prevLink() {
	var links = $ES('a');
	currentlink--;
	if (currentlink < 0) {
		currentlink = links.length-1;
	}
	links[currentlink].focus();
}

shortcut.add("Ctrl+Shift+s", function() {
	if (searchon) {
		closeSearch();
	} else {
		openPopup("search",true);
	}
});

shortcut.add("Ctrl+Shift+g", function() {
	if (glossaryon) {
		closeGlossary();
	} else {
		openPopup("glossary",true);
	}
});

shortcut.add("Ctrl+Shift+Right", function() {
	nextContent();
});

shortcut.add("Ctrl+Shift+Left", function() {
	prevContent();
});

shortcut.add("Ctrl+Shift+Up", function() {
	prevLink();
});

shortcut.add("Ctrl+Shift+Down", function() {
	nextLink();
});


