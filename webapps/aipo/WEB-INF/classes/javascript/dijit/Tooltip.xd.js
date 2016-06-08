dojo._xdResourceLoaded({depends:[["provide","dijit.Tooltip"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(B){if(!B._hasResource["dijit.Tooltip"]){B._hasResource["dijit.Tooltip"]=true;
B.provide("dijit.Tooltip");
B.require("dijit._Widget");
B.require("dijit._Templated");
B.declare("dijit._MasterTooltip",[dijit._Widget,dijit._Templated],{duration:200,templateString:'<div class="dijitTooltip dijitTooltipLeft" id="dojoTooltip">\r\n\t<div class="dijitTooltipContainer dijitTooltipContents" dojoAttachPoint="containerNode" waiRole=\'alert\'></div>\r\n\t<div class="dijitTooltipConnector"></div>\r\n</div>\r\n',postCreate:function(){B.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode);
this.fadeIn=B.fadeIn({node:this.domNode,duration:this.duration,onEnd:B.hitch(this,"_onShow")});
this.fadeOut=B.fadeOut({node:this.domNode,duration:this.duration,onEnd:B.hitch(this,"_onHide")})
},show:function(A,H){if(this.aroundNode&&this.aroundNode===H){return 
}if(this.fadeOut.status()=="playing"){this._onDeck=arguments;
return 
}this.containerNode.innerHTML=A;
this.domNode.style.top=(this.domNode.offsetTop+1)+"px";
var F=this.isLeftToRight()?{BR:"BL",BL:"BR"}:{BL:"BR",BR:"BL"};
var G=dijit.placeOnScreenAroundElement(this.domNode,H,F);
this.domNode.className="dijitTooltip dijitTooltip"+(G.corner=="BL"?"Right":"Left");
B.style(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=H
},_onShow:function(){if(B.isIE){this.domNode.style.filter=""
}},hide:function(A){if(!this.aroundNode||this.aroundNode!==A){return 
}if(this._onDeck){this._onDeck=null;
return 
}this.fadeIn.stop();
this.isShowingNow=false;
this.aroundNode=null;
this.fadeOut.play()
},_onHide:function(){this.domNode.style.cssText="";
if(this._onDeck){this.show.apply(this,this._onDeck);
this._onDeck=null
}}});
dijit.showTooltip=function(A,D){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.show(A,D)
};
dijit.hideTooltip=function(A){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.hide(A)
};
B.declare("dijit.Tooltip",dijit._Widget,{label:"",showDelay:400,connectId:[],postCreate:function(){if(this.srcNodeRef){this.srcNodeRef.style.display="none"
}this._connectNodes=[];
B.forEach(this.connectId,function(A){var D=B.byId(A);
if(D){this._connectNodes.push(D);
B.forEach(["onMouseOver","onMouseOut","onFocus","onBlur","onHover","onUnHover"],function(C){this.connect(D,C.toLowerCase(),"_"+C)
},this);
if(B.isIE){D.style.zoom=1
}}},this)
},_onMouseOver:function(A){this._onHover(A)
},_onMouseOut:function(A){if(B.isDescendant(A.relatedTarget,A.target)){return 
}this._onUnHover(A)
},_onFocus:function(A){this._focus=true;
this._onHover(A)
},_onBlur:function(A){this._focus=false;
this._onUnHover(A)
},_onHover:function(A){if(!this._showTimer){var D=A.target;
this._showTimer=setTimeout(B.hitch(this,function(){this.open(D)
}),this.showDelay)
}},_onUnHover:function(A){if(this._focus){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}this.close()
},open:function(A){A=A||this._connectNodes[0];
if(!A){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}dijit.showTooltip(this.label||this.domNode.innerHTML,A);
this._connectNode=A
},close:function(){dijit.hideTooltip(this._connectNode);
delete this._connectNode;
if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}},uninitialize:function(){this.close()
}})
}}});