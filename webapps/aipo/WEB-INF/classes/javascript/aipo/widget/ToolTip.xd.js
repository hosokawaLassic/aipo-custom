dojo._xdResourceLoaded({depends:[["provide","aipo.widget.ToolTip"],["require","dijit.Tooltip"]],defineResource:function(B){if(!B._hasResource["aipo.widget.ToolTip"]){B._hasResource["aipo.widget.ToolTip"]=true;
B.provide("aipo.widget.ToolTip");
B.require("dijit.Tooltip");
B.declare("aipo.widget._MasterToolTip",[dijit._MasterTooltip],{duration:100,postCreate:function(){B.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode)
},show:function(A,P,J,N){if(this.aroundNode&&this.aroundNode===P){return 
}if(P==null||P=="undefined"){return 
}if(this.domNode==null||this.domNode=="undefined"){return 
}this.containerNode.innerHTML=A;
this.domNode.style.width="150px";
this.domNode.style.top=(this.domNode.offsetTop+1)+"px";
try{var K=this.isLeftToRight()?{BR:"BL",BL:"BR"}:{BL:"BR",BR:"BL"};
var L=dijit.placeOnScreenAroundElement(this.domNode,P,K);
this.domNode.className="dijitTooltip dijitTooltip"+(L.corner=="BL"?"Right":"Left")
}catch(O){this.hide(P);
return 
}if(parseInt(this.domNode.style.left)<1){this.domNode.style.top=-10000+"px"
}else{var M=parseInt(aipo.widget.tmpY)-36;
this.domNode.style.top=M+"px"
}B.style(this.domNode,"opacity",1);
this.isShowingNow=true;
this.aroundNode=P;
if(J){J(this.containerNode,N)
}},hide:function(A){if(this.domNode){this.domNode.zIndex=0
}if(!this.aroundNode||this.aroundNode!==A){return 
}if(this._onDeck){this._onDeck=null;
return 
}this.domNode.style.top=-10000+"px";
B.style(this.domNode,"opacity",0);
this.isShowingNow=false;
this.aroundNode=null
}});
aipo.widget._masterTT=null;
aipo.widget.showTooltip=function(A,H,F,G){if(!aipo.widget._masterTT){aipo.widget._masterTT=new aipo.widget._MasterToolTip()
}return aipo.widget._masterTT.show(A,H,F,G)
};
aipo.widget.hideTooltip=function(A){if(!aipo.widget._masterTT){return 
}return aipo.widget._masterTT.hide(A)
};
B.declare("aipo.widget.ToolTip",[dijit.Tooltip],{origZIndex:0,_portletId:null,_callback:null,constructor:function(E,F,A){this._portletId=F;
this._callback=A
},open:function(A){A=A||this._connectNodes[0];
if(!A){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}aipo.widget.showTooltip(this.label||this.domNode.innerHTML,A,this._callback,this._connectNodes[0]);
this._connectNode=A
},close:function(){aipo.widget.hideTooltip(this._connectNode);
delete this._connectNode;
if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}},_onHover:function(A){if(ptConfig[this._portletId].isTooltipEnable!=true){return 
}if(!this._showTimer){var D=A.target;
aipo.widget.tmpX=A.pageX;
aipo.widget.tmpY=A.pageY;
this._showTimer=setTimeout(B.hitch(this,function(){this.open(D)
}),this.showDelay)
}},_onUnHover:function(A){if(this._focus){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}this.close()
}})
}}});