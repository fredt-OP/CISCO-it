function openIndex(mod)
{
  var w = window.open("../../index/outline/" + mod + "/index.html", "Outline", "scrollbars=yes,resizable=yes,width=640,height=500,left=0,top=0");
  w.focus();
}

function openQuiz(mod)
{
  var w = window.open("../../quizzes/" + mod + "/" + mod + "_quiz.html", "Quiz", "scrollbars=no,resizable=yes,width=740,height=388,left=26,top=38");
  w.focus();
}

function openGlossary()
{
  var w = window.open("../../index/glossary/index.html", "Glossary", "scrollbars=no,resizable=yes,width=492,height=500,left=20,top=50");
  w.focus();
}

function openQuizIndex(mod)
{
  var w = window.open("../../../quizzes/" + mod + "/" + mod + "_quiz.html", "Quiz", "scrollbars=no,resizable=yes,width=740,height=388,left=26,top=38");
  w.focus();
}
