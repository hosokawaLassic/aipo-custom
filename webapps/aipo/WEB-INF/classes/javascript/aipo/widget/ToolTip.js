if(!dojo._hasResource["aipo.widget.ToolTip"]){dojo._hasResource["aipo.widget.ToolTip"]=true;
dojo.provide("aipo.widget.ToolTip");
dojo.require("dijit.Tooltip");
dojo.declare("aipo.widget._MasterToolTip",[dijit._MasterTooltip],{duration:100,postCreate:function(){dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode)
},show:function(J,I,K,O){if(this.aroundNode&&this.aroundNode===I){return 
}if(I==null||I=="undefined"){return 
}if(this.domNode==null||this.domNode=="undefined"){return 
}this.containerNode.innerHTML=J;
this.domNode.style.width="150px";
this.domNode.style.top=(this.domNode.offsetTop+1)+"px";
try{var L=this.isLeftToRight()?{BR:"BL",BL:"BR"}:{BL:"BR",BR:"BL"};
var M=dijit.placeOnScreenAroundElement(this.domNode,I,L);
this.domNode.className="dijitTooltip dijitTooltip"+(M.corner=="BL"?"Right":"Left")
}catch(P){this.hide(I);
return 
}if(parseInt(this.domNode.style.left)<1){this.domNode.style.top=-10000+"px"
}else{var N=parseInt(aipo.widget.tmpY)-36;
this.domNode.style.top=N+"px"
}dojo.style(this.domNode,"opacity",1);
this.isShowingNow=true;
this.aroundNode=I;
if(K){K(this.containerNode,O)
}},hide:function(B){if(this.domNode){this.domNode.zIndex=0
}if(!this.aroundNode||this.aroundNode!==B){return 
}if(this._onDeck){this._onDeck=null;
return 
}this.domNode.style.top=-10000+"px";
dojo.style(this.domNode,"opacity",0);
this.isShowingNow=false;
this.aroundNode=null
}});
aipo.widget._masterTT=null;
aipo.widget.showTooltip=function(F,E,G,H){if(!aipo.widget._masterTT){aipo.widget._masterTT=new aipo.widget._MasterToolTip()
}return aipo.widget._masterTT.show(F,E,G,H)
};
aipo.widget.hideTooltip=function(B){if(!aipo.widget._masterTT){return 
}return aipo.widget._masterTT.hide(B)
};
dojo.declare("aipo.widget.ToolTip",[dijit.Tooltip],{origZIndex:0,_portletId:null,_callback:null,constructor:function(F,D,E){this._portletId=D;
this._callback=E
},open:function(B){B=B||this._connectNodes[0];
if(!B){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}aipo.widget.showTooltip(this.label||this.domNode.innerHTML,B,this._callback,this._connectNodes[0]);
this._connectNode=B
},close:function(){aipo.widget.hideTooltip(this._connectNode);
delete this._connectNode;
if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}},_onHover:function(D){if(ptConfig[this._portletId].isTooltipEnable!=true){return 
}if(!this._showTimer){var C=D.target;
aipo.widget.tmpX=D.pageX;
aipo.widget.tmpY=D.pageY;
this._showTimer=setTimeout(dojo.hitch(this,function(){this.open(C)
}),this.showDelay)
}},_onUnHover:function(B){if(this._focus){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}this.close()
}})
};