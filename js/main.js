var EBoard = {
	canvas: document.getElementById("sim"),
	ctx: canvas.getContext("2d"),
	
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
		
		return x[0];
	},
}

var __project = null;
window.onload = function() {
	__project = new EBoard.Project("samples/empty.xml");
}
