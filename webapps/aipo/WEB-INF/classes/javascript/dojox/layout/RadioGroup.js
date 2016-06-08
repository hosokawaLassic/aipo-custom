if(!dojo._hasResource["dojox.layout.RadioGroup"]){dojo._hasResource["dojox.layout.RadioGroup"]=true;
dojo.provide("dojox.layout.RadioGroup");
dojo.experimental("dojox.layout.RadioGroup");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Container");
dojo.require("dijit.layout.StackContainer");
dojo.require("dojox.fx.easing");
dojo.declare("dojox.layout.RadioGroup",[dijit.layout.StackContainer,dijit._Templated],{duration:750,hasButtons:true,templateString:'<div class="dojoxRadioGroup"> 	<div dojoAttachPoint="buttonHolder" style="display:none;">		<table class="dojoxRadioButtons"><tbody><tr class="dojoxRadioButtonRow" dojoAttachPoint="buttonNode"></tr></tbody></table>	</div>	<div class="dojoxRadioView" dojoAttachPoint="containerNode"></div></div>',startup:function(){this.inherited("startup",arguments);
this._children=this.getChildren();
this._buttons=this._children.length;
this._size=dojo.coords(this.containerNode);
if(this.hasButtons){dojo.style(this.buttonHolder,"display","block");
dojo.forEach(this._children,this._makeButton,this)
}},_makeButton:function(F){dojo.style(F.domNode,"position","absolute");
var H=document.createElement("td");
this.buttonNode.appendChild(H);
var G=H.appendChild(document.createElement("div"));
var E=new dojox.layout._RadioButton({label:F.title,page:F},G);
E.startup()
},_transition:function(D,C){this._showChild(D);
if(C){this._hideChild(C)
}if(this.doLayout&&D.resize){D.resize(this._containerContentBox||this._contentBox)
}},_showChild:function(D){var C=this.getChildren();
D.isFirstChild=(D==C[0]);
D.isLastChild=(D==C[C.length-1]);
D.selected=true;
D.domNode.style.display="";
if(D._loadCheck){D._loadCheck()
}if(D.onShow){D.onShow()
}},_hideChild:function(B){B.selected=false;
B.domNode.style.display="none";
if(B.onHide){B.onHide()
}}});
dojo.declare("dojox.layout.RadioGroupFade",dojox.layout.RadioGroup,{_hideChild:function(B){dojo.fadeOut({node:B.domNode,duration:this.duration,onEnd:this.inherited("_hideChild",arguments)}).play()
},_showChild:function(B){this.inherited("_showChild",arguments);
dojo.style(B.domNode,"opacity",0);
dojo.fadeIn({node:B.domNode,duration:this.duration}).play()
}});
dojo.declare("dojox.layout.RadioGroupSlide",dojox.layout.RadioGroup,{easing:dojox.fx.easing.easeOut,startup:function(){this.inherited("startup",arguments);
dojo.forEach(this._children,this._positionChild,this)
},_positionChild:function(F){var E=Math.round(Math.random());
var D=Math.round(Math.random());
dojo.style(F.domNode,E?"top":"left",(D?"-":"")+this._size[E?"h":"w"]+"px")
},_showChild:function(B){this.inherited("_showChild",arguments);
if(this._anim&&this._anim.status()=="playing"){this._anim.gotoPercent(100,true)
}this._anim=dojo.animateProperty({node:B.domNode,properties:{left:{end:0,unit:"px"},top:{end:0,unit:"px"}},duration:this.duration,easing:this.easing});
this._anim.play()
},_hideChild:function(B){this.inherited("_hideChild",arguments);
this._positionChild(B)
}});
dojo.declare("dojox.layout._RadioButton",[dijit._Widget,dijit._Templated,dijit._Contained],{label:"",page:null,templateString:'<div dojoAttachPoint="focusNode" class="dojoxRadioButton"><span dojoAttachPoint="titleNode" class="dojoxRadioButtonLabel">${label}</span></div>',startup:function(){this.connect(this.domNode,"onmouseover","_onMouse")
},_onMouse:function(B){this.getParent().selectChild(this.page);
this._clearSelected();
dojo.addClass(this.domNode,"dojoxRadioButtonSelected")
},_clearSelected:function(){dojo.query(".dojoxRadioButtonSelected",this.domNode.parentNode.parentNode).forEach(function(B){dojo.removeClass(B,"dojoxRadioButtonSelected")
})
}})
};