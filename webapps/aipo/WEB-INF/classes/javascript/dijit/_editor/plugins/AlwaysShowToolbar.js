if(!dojo._hasResource["dijit._editor.plugins.AlwaysShowToolbar"]){dojo._hasResource["dijit._editor.plugins.AlwaysShowToolbar"]=true;
dojo.provide("dijit._editor.plugins.AlwaysShowToolbar");
dojo.declare("dijit._editor.plugins.AlwaysShowToolbar",null,{_handleScroll:true,setEditor:function(B){this.editor=B;
B.onLoadDeferred.addCallback(dojo.hitch(this,this.enable))
},enable:function(B){this._updateHeight();
this._connects=[dojo.connect(window,"onscroll",this,"globalOnScrollHandler"),dojo.connect(this.editor,"onNormalizedDisplayChanged",this,"_updateHeight")];
return B
},_updateHeight:function(){var D=this.editor;
if(!D.isLoaded){return 
}if(D.height){return 
}var C=dojo.marginBox(D.editNode).h;
if(dojo.isOpera){C=D.editNode.scrollHeight
}if(!C){C=dojo.marginBox(D.document.body).h
}if(C==0){console.debug("Can not figure out the height of the editing area!");
return 
}if(C!=this._lastHeight){this._lastHeight=C;
dojo.marginBox(D.iframe,{h:this._lastHeight})
}},_lastHeight:0,globalOnScrollHandler:function(){var isIE=dojo.isIE&&dojo.isIE<7;
if(!this._handleScroll){return 
}var tdn=this.editor.toolbar.domNode;
var db=dojo.body;
if(!this._scrollSetUp){this._scrollSetUp=true;
this._scrollThreshold=dojo._abs(tdn,true).y
}var scrollPos=dojo._docScroll().y;
if(scrollPos>this._scrollThreshold&&scrollPos<this._scrollThreshold+this._lastHeight){if(!this._fixEnabled){var tdnbox=dojo.marginBox(tdn);
this.editor.iframe.style.marginTop=tdnbox.h+"px";
if(isIE){tdn.style.left=dojo._abs(tdn).x;
if(tdn.previousSibling){this._IEOriginalPos=["after",tdn.previousSibling]
}else{if(tdn.nextSibling){this._IEOriginalPos=["before",tdn.nextSibling]
}else{this._IEOriginalPos=["last",tdn.parentNode]
}}dojo.body().appendChild(tdn);
dojo.addClass(tdn,"IEFixedToolbar")
}else{with(tdn.style){position="fixed";
top="0px"
}}dojo.marginBox(tdn,{w:tdnbox.w});
tdn.style.zIndex=2000;
this._fixEnabled=true
}var eHeight=(this.height)?parseInt(this.editor.height):this.editor._lastHeight;
if(scrollPos>(this._scrollThreshold+eHeight)){tdn.style.display="none"
}else{tdn.style.display=""
}}else{if(this._fixEnabled){this.editor.iframe.style.marginTop="";
with(tdn.style){position="";
top="";
zIndex="";
display=""
}if(isIE){tdn.style.left="";
dojo.removeClass(tdn,"IEFixedToolbar");
if(this._IEOriginalPos){dojo.place(tdn,this._IEOriginalPos[1],this._IEOriginalPos[0]);
this._IEOriginalPos=null
}else{dojo.place(tdn,this.editor.iframe,"before")
}}tdn.style.width="";
this._fixEnabled=false
}}},destroy:function(){this._IEOriginalPos=null;
this._handleScroll=false;
dojo.forEach(this._connects,dojo.disconnect);
if(dojo.isIE&&dojo.isIE<7){dojo.removeClass(this.editor.toolbar.domNode,"IEFixedToolbar")
}}})
};