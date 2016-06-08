dojo._xdResourceLoaded({depends:[["provide","dijit.TitlePane"],["require","dojo.fx"],["require","dijit._Templated"],["require","dijit.layout.ContentPane"]],defineResource:function(B){if(!B._hasResource["dijit.TitlePane"]){B._hasResource["dijit.TitlePane"]=true;
B.provide("dijit.TitlePane");
B.require("dojo.fx");
B.require("dijit._Templated");
B.require("dijit.layout.ContentPane");
B.declare("dijit.TitlePane",[dijit.layout.ContentPane,dijit._Templated],{title:"",open:true,duration:250,baseClass:"dijitTitlePane",templateString:'<div class="dijitTitlePane">\r\n\t<div dojoAttachEvent="onclick:toggle,onkeypress: _onTitleKey,onfocus:_handleFocus,onblur:_handleFocus" tabindex="0"\r\n\t\t\twaiRole="button" class="dijitTitlePaneTitle" dojoAttachPoint="focusNode">\r\n\t\t<div dojoAttachPoint="arrowNode" class="dijitInline dijitArrowNode"><span dojoAttachPoint="arrowNodeInner" class="dijitArrowNodeInner"></span></div>\r\n\t\t<div dojoAttachPoint="titleNode" class="dijitTitlePaneTextNode"></div>\r\n\t</div>\r\n\t<div class="dijitTitlePaneContentOuter" dojoAttachPoint="hideNode">\r\n\t\t<div class="dijitReset" dojoAttachPoint="wipeNode">\r\n\t\t\t<div class="dijitTitlePaneContentInner" dojoAttachPoint="containerNode" waiRole="region" tabindex="-1">\r\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn\'t work right on node w/padding etc.  Put padding on inner div. -->\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n',postCreate:function(){this.setTitle(this.title);
if(!this.open){this.hideNode.style.display=this.wipeNode.style.display="none"
}this._setCss();
B.setSelectable(this.titleNode,false);
this.inherited("postCreate",arguments);
dijit.setWaiState(this.containerNode,"labelledby",this.titleNode.id);
dijit.setWaiState(this.focusNode,"haspopup","true");
var A=this.hideNode,D=this.wipeNode;
this._wipeIn=B.fx.wipeIn({node:this.wipeNode,duration:this.duration,beforeBegin:function(){A.style.display=""
}});
this._wipeOut=B.fx.wipeOut({node:this.wipeNode,duration:this.duration,onEnd:function(){A.style.display="none"
}})
},setContent:function(A){if(this._wipeOut.status()=="playing"){this.inherited("setContent",arguments)
}else{if(this._wipeIn.status()=="playing"){this._wipeIn.stop()
}B.marginBox(this.wipeNode,{h:B.marginBox(this.wipeNode).h});
this.inherited("setContent",arguments);
this._wipeIn.play()
}},toggle:function(){B.forEach([this._wipeIn,this._wipeOut],function(A){if(A.status()=="playing"){A.stop()
}});
this[this.open?"_wipeOut":"_wipeIn"].play();
this.open=!this.open;
this._loadCheck();
this._setCss()
},_setCss:function(){var D=["dijitClosed","dijitOpen"];
var A=this.open;
B.removeClass(this.focusNode,D[!A+0]);
this.focusNode.className+=" "+D[A+0];
this.arrowNodeInner.innerHTML=this.open?"-":"+"
},_onTitleKey:function(A){if(A.keyCode==B.keys.ENTER||A.charCode==B.keys.SPACE){this.toggle()
}else{if(A.keyCode==B.keys.DOWN_ARROW){if(this.open){this.containerNode.focus();
A.preventDefault()
}}}},_handleFocus:function(A){B[(A.type=="focus"?"addClass":"removeClass")](this.focusNode,this.baseClass+"Focused")
},setTitle:function(A){this.titleNode.innerHTML=A
}})
}}});