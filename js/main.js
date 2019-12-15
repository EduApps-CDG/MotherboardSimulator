var __canvas = document.getElementById("sim");
var __ctx = __canvas.getContext("2d");
var __project = null;

var EBoard = {
	Project: function(file) {
		var xmlhttp;
		
		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		} else {
  			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		xmlhttp.open("GET",file,false);
		xmlhttp.send();
		var xmlDoc = xmlhttp.responseXML;
		var x = xmlDoc.getElementsByTagName("project");
		
		this.insert = function(root, element) {
			root.appendChild(element);
		}
		
		this.download = function() {
			document.open();
			document.write(xmlDoc);
			document.close();
		}
		
		 this.xml = x[0];
	},
}

window.onload = function() {
	__project = new EBoard.Project("samples/empty.xml");
}
