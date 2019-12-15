var __canvas = document.getElementById("sim");
var __ctx = __canvas.getContext("2d");
var __uploadButton = document.getElementById("upload");
var __project = null;
var __test = null;

var EBoard = {
    Project: function(mode, file) {
        if (mode === "url") {
            var xmlhttp;
            var OK = false;
            var text;
            var xmlDoc;

            if (window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();
            } else {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xmlhttp.open("GET", file, false);
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState === 4) {
                    if (xmlhttp.status == 200) {
                        OK = true;
                        text = xmlhttp.responseText;
                        console.info("File \"" + file + "\" is OK");
                    }
                }
            }
            xmlhttp.send();
            xmlDoc = xmlhttp.responseXML;
        } else if (mode === "upload") {
            xmlDoc = (new window.DOMParser()).parseFromString(file, "text/xml");
        }
        var x = xmlDoc.getElementsByTagName("project");

        this.help = function() {
            console.log("EBoard.Project help\n\n commands:\n    help     - show this help message []\n    insert   - insert a tag in the project [root, element]\n    download - download the project []\n    xml      - the xml document resource []");
        }

        this.insert = function(root, element) {
            if (OK) {
                root.appendChild(element);
            } else {
                console.error("Document is not OK");
            }
        }

        this.download = function() {
            if (OK) {
                var save = new Blob([text], {
                    type: "application/xml"
                });
                var a = document.createElement("a");
                var url = URL.createObjectURL(save);
                a.href = url;
                a.download = "Your Project";
                document.body.appendChild(a);
                a.click();
                setTimeout(function() {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }, 0);
                console.log(text);
            } else {
                console.error("Document is not OK");
            }
        }

        this.upload = function() {
            $("#upload:hidden").trigger('click');
        }

        this.xml = x[0];
    },
}

__uploadButton.onchange = function(e) {
    var file = __uploadButton.files[0];
    file.text().then(function(text) {
        __project = new EBoard.Project("upload", text);
        console.log(text);
    });
}

window.onload = function() {
    __project = new EBoard.Project("url", "samples/empty.xml");
}
