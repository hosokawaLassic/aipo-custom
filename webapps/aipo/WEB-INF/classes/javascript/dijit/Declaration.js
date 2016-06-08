if(!dojo._hasResource["dijit.Declaration"]){dojo._hasResource["dijit.Declaration"]=true;
dojo.provide("dijit.Declaration");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("dijit.Declaration",dijit._Widget,{_noScript:true,widgetClass:"",replaceVars:true,defaults:null,mixins:[],buildRendering:function(){var H=this.srcNodeRef.parentNode.removeChild(this.srcNodeRef);
var I=dojo.query("> script[type='dojo/method'][event='preamble']",H).orphan();
var K=dojo.query("> script[type^='dojo/']",H).orphan();
var J=H.nodeName;
var L=this.defaults||{};
this.mixins=this.mixins.length?dojo.map(this.mixins,function(A){return dojo.getObject(A)
}):[dijit._Widget,dijit._Templated];
if(I.length){L.preamble=dojo.parser._functionFromScript(I[0])
}var G=dojo.map(K,function(A){var B=A.getAttribute("event")||"postscript";
return{event:B,func:dojo.parser._functionFromScript(A)}
});
this.mixins.push(function(){dojo.forEach(G,function(A){dojo.connect(this,A.event,this,A.func)
},this)
});
L.widgetsInTemplate=true;
L._skipNodeCache=true;
L.templateString="<"+J+" class='"+H.className+"' dojoAttachPoint='"+(H.getAttribute("dojoAttachPoint")||"")+"' dojoAttachEvent='"+(H.getAttribute("dojoAttachEvent")||"")+"' >"+H.innerHTML.replace(/\%7B/g,"{").replace(/\%7D/g,"}")+"</"+J+">";
dojo.query("[dojoType]",H).forEach(function(A){A.removeAttribute("dojoType")
});
dojo.declare(this.widgetClass,this.mixins,L)
}})
};