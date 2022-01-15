function getBrowser() {
    c = navigator.appName+"\n";
    if (c.indexOf("Microsoft") > -1) {
        c = "IE";
    } else {
        c = "other";
    }
    return c;
}

function openGlobalTool(ref) {
    var w = 800;
    var h = 600;
    var gtwin = window.open(ref, "gtwin", "status=0,toolbar=0,location=0,menubar=0,directories=0,resizable=1,width="+w+",height="+h);
}

function openActivity(ref, path) {
    var w = 800;
    var h = 470;
    var eawin = window.open(ref+"?path="+path, "eawin", "status=0,toolbar=0,location=0,menubar=0,directories=0,resizable=1,width="+w+",height="+h);
}

function openDocument(ref) {
    var w = 800;
    var h = 600;
    var docwin = window.open(ref, "docwin", "status=0,toolbar=0,location=0,menubar=0,directories=0,resizable=1,scrollbars=1,width="+w+",height="+h);
}

function openExternal(ref) {
    var w = 800;
    var h = 600;
    var docwin = window.open(ref, "docwin", "status=0,toolbar=0,location=1,menubar=0,address=1,directories=0,resizable=1,scrollbars=1,width="+w+",height="+h);
}

function openELAB(ref) {
    var w = 800;
    var h = 600;
    var docwin = window.open(ref, "docwin", "status=0,toolbar=0,location=1,menubar=0,address=1,directories=0,resizable=1,scrollbars=1,width="+w+",height="+h);
}

function openPT(ref) {
    var browser = getBrowser();
    var w = 300;
    var h = 150;
    if (browser == "IE") {
        var ptwin = window.open("pt.html?pt="+ref, "ptwin", "status=0,toolbar=0,location=0,menubar=0,directories=0,resizable=1,width="+w+",height="+h);
    } else {
        var ptwin = window.open(ref, "ptwin", "status=0,toolbar=0,location=0,menubar=0,directories=0,resizable=1,width="+w+",height="+h);
    }
}
function openQuiz(ref, path) {
    var w = 740;
    var h = 460;
	if (main.course.lang == "tl" && isarabic) {
		ref = ref.replace(/quiz\.html/, "hybrid/theme_frontend/quiz.html");
		path = "../../"+path;
	}
	path = path.replace(/\.\.\/\.\.\//, "");
    var ptwin = window.open("../../"+ref+"?path="+path, "quizwin", "status=0,toolbar=0,location=0,menubar=0,directories=0,scrollbars=0,resizable=1,width="+w+",height="+h);
}

