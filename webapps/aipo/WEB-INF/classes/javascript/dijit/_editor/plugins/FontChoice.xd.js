dojo._xdResourceLoaded({depends:[["provide","dijit._editor.plugins.FontChoice"],["require","dijit._editor._Plugin"],["require","dijit.form.FilteringSelect"],["require","dojo.data.ItemFileReadStore"],["require","dojo.i18n"],["requireLocalization","dijit._editor","FontChoice",null,"ROOT","ROOT"]],defineResource:function(B){if(!B._hasResource["dijit._editor.plugins.FontChoice"]){B._hasResource["dijit._editor.plugins.FontChoice"]=true;
B.provide("dijit._editor.plugins.FontChoice");
B.require("dijit._editor._Plugin");
B.require("dijit.form.FilteringSelect");
B.require("dojo.data.ItemFileReadStore");
B.require("dojo.i18n");
B.declare("dijit._editor.plugins.FontChoice",dijit._editor._Plugin,{_uniqueId:0,buttonClass:dijit.form.FilteringSelect,_initButton:function(){this.inherited("_initButton",arguments);
var A={fontName:["serif","sans-serif","monospaced","cursive","fantasy"],fontSize:[1,2,3,4,5,6,7],formatBlock:["p","h1","h2","h3","pre"]}[this.command];
var F=B.i18n.getLocalization("dijit._editor","FontChoice");
var E=B.map(A,function(C){return{name:F[C],value:C}
});
E.push({name:"",value:""});
this.button.store=new B.data.ItemFileReadStore({data:{identifier:"value",items:E}});
this.button.setValue("");
B.connect(this.button,"onChange",this,function(C){this.editor.execCommand(this.command,C)
})
},updateState:function(){this.inherited("updateState",arguments);
var F=this.editor;
var E=this.command;
if(!F||!F.isLoaded||!E.length){return 
}if(this.button){var A=F.queryCommandValue(E);
this.button.setValue(A)
}},setToolbar:function(){this.inherited("setToolbar",arguments);
var A=this.button;
if(!A.id){A.id="dijitEditorButton-"+this.command+(this._uniqueId++)
}var E=B.doc.createElement("label");
E.setAttribute("for",A.id);
var F=B.i18n.getLocalization("dijit._editor","FontChoice");
E.appendChild(B.doc.createTextNode(F[this.command]));
B.place(E,this.button.domNode,"before")
}})
}}});