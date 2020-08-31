//codemirror en campos
var editor = CodeMirror.fromTextArea(document.getElementById("CampoTexto"), {
    lineNumbers: true,
    mode: "text/x-java",
    matchBrackets: true
  });
  editor.setSize(550, 400);
  //campo2
  var editor2 = CodeMirror.fromTextArea(document.getElementById("CampoTexto2"), {
    lineNumbers: true,
    mode: "text/x-java",
    matchBrackets: true
  });
  editor2.setSize(550, 400);
  