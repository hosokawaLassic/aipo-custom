if(!dojo._hasResource["dijit._editor.plugins.FontChoice"]){dojo._hasResource["dijit._editor.plugins.FontChoice"]=true;
dojo.provide("dijit._editor.plugins.FontChoice");
dojo.require("dijit._editor._Plugin");
dojo.require("dijit.form.FilteringSelect");
dojo.require("dojo.data.ItemFileReadStore");
dojo.require("dojo.i18n");
dojo.requireLocalization("dijit._editor","FontChoice",null,"ROOT");
dojo.declare("dijit._editor.plugins.FontChoice",dijit._editor._Plugin,{_uniqueId:0,buttonClass:dijit.form.FilteringSelect,_initButton:function(){this.inherited("_initButton",arguments);
var E={fontName:["serif","sans-serif","monospaced","cursive","fantasy"],fontSize:[1,2,3,4,5,6,7],formatBlock:["p","h1","h2","h3","pre"]}[this.command];
var D=dojo.i18n.getLocalization("dijit._editor","FontChoice");
var F=dojo.map(E,function(A){return{name:D[A],value:A}
});
F.push({name:"",value:""});
this.button.store=new dojo.data.ItemFileReadStore({data:{identifier:"value",items:F}});
this.button.setValue("");
dojo.connect(this.button,"onChange",this,function(A){this.editor.execCommand(this.command,A)
})
},updateState:function(){this.inherited("updateState",arguments);
var D=this.editor;
var F=this.command;
if(!D||!D.isLoaded||!F.length){return 
}if(this.button){var E=D.queryCommandValue(F);
this.button.setValue(E)
}},setToolbar:function(){this.inherited("setToolbar",arguments);
var E=this.button;
if(!E.id){E.id="dijitEditorButton-"+this.command+(this._uniqueId++)
}var F=dojo.doc.createElement("label");
F.setAttribute("for",E.id);
var D=dojo.i18n.getLocalization("dijit._editor","FontChoice");
F.appendChild(dojo.doc.createTextNode(D[this.command]));
dojo.place(F,this.button.domNode,"before")
}})
};