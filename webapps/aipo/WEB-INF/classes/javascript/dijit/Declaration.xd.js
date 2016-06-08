dojo._xdResourceLoaded({depends:[["provide","dijit.Declaration"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(B){if(!B._hasResource["dijit.Declaration"]){B._hasResource["dijit.Declaration"]=true;
B.provide("dijit.Declaration");
B.require("dijit._Widget");
B.require("dijit._Templated");
B.declare("dijit.Declaration",dijit._Widget,{_noScript:true,widgetClass:"",replaceVars:true,defaults:null,mixins:[],buildRendering:function(){var A=this.srcNodeRef.parentNode.removeChild(this.srcNodeRef);
var H=B.query("> script[type='dojo/method'][event='preamble']",A).orphan();
var J=B.query("> script[type^='dojo/']",A).orphan();
var I=A.nodeName;
var K=this.defaults||{};
this.mixins=this.mixins.length?B.map(this.mixins,function(C){return B.getObject(C)
}):[dijit._Widget,dijit._Templated];
if(H.length){K.preamble=B.parser._functionFromScript(H[0])
}var L=B.map(J,function(C){var D=C.getAttribute("event")||"postscript";
return{event:D,func:B.parser._functionFromScript(C)}
});
this.mixins.push(function(){B.forEach(L,function(C){B.connect(this,C.event,this,C.func)
},this)
});
K.widgetsInTemplate=true;
K._skipNodeCache=true;
K.templateString="<"+I+" class='"+A.className+"' dojoAttachPoint='"+(A.getAttribute("dojoAttachPoint")||"")+"' dojoAttachEvent='"+(A.getAttribute("dojoAttachEvent")||"")+"' >"+A.innerHTML.replace(/\%7B/g,"{").replace(/\%7D/g,"}")+"</"+I+">";
B.query("[dojoType]",A).forEach(function(C){C.removeAttribute("dojoType")
});
B.declare(this.widgetClass,this.mixins,K)
}})
}}});