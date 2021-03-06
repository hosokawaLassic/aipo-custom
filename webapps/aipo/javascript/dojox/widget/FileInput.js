if(!dojo._hasResource["dojox.widget.FileInput"]){dojo._hasResource["dojox.widget.FileInput"]=true;
dojo.provide("dojox.widget.FileInput");
dojo.experimental("dojox.widget.FileInput");
dojo.require("dijit.form._FormWidget");
dojo.require("dijit._Templated");
dojo.declare("dojox.widget.FileInput",[dijit.form._FormWidget,dijit._Templated],{label:"Browse ...",cancelText:"Cancel",name:"uploadFile",templateString:'<div class="dijitFileInput">\r\n\t<input id="${id}" class="dijitFileInputReal" type="file" dojoAttachPoint="fileInput" name="${name}" />\r\n\t<div class="dijitFakeInput">\r\n\t\t<input class="dijitFileInputVisible" type="text" dojoAttachPoint="focusNode, inputNode" />\r\n\t\t<span class="dijitFileInputText" dojoAttachPoint="titleNode">${label}</span>\r\n\t\t<span class="dijitFileInputButton" dojoAttachPoint="cancelNode" \r\n\t\t\tdojoAttachEvent="onclick:_onClick">${cancelText}</span>\r\n\t</div>\r\n</div>\r\n',startup:function(){this.inherited("startup",arguments);
this._listener=dojo.connect(this.fileInput,"onchange",this,"_matchValue");
this._keyListener=dojo.connect(this.fileInput,"onkeyup",this,"_matchValue")
},_matchValue:function(){this.inputNode.value=this.fileInput.value;
if(this.inputNode.value){this.cancelNode.style.visibility="visible";
dojo.fadeIn({node:this.cancelNode,duration:275}).play()
}},setLabel:function(B,A){this.titleNode.innerHTML=B
},_onClick:function(A){dojo.disconnect(this._listener);
dojo.disconnect(this._keyListener);
this.domNode.removeChild(this.fileInput);
dojo.fadeOut({node:this.cancelNode,duration:275}).play();
this.fileInput=document.createElement("input");
this.fileInput.setAttribute("type","file");
this.fileInput.setAttribute("id",this.id);
this.fileInput.setAttribute("name",this.name);
dojo.addClass(this.fileInput,"dijitFileInputReal");
this.domNode.appendChild(this.fileInput);
this._keyListener=dojo.connect(this.fileInput,"onkeyup",this,"_matchValue");
this._listener=dojo.connect(this.fileInput,"onchange",this,"_matchValue");
this.inputNode.value=""
}})
};