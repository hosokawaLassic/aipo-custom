dojo._xdResourceLoaded({depends:[["provide","dojox.layout.RadioGroup"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dijit._Container"],["require","dijit.layout.StackContainer"],["require","dojox.fx.easing"]],defineResource:function(B){if(!B._hasResource["dojox.layout.RadioGroup"]){B._hasResource["dojox.layout.RadioGroup"]=true;
B.provide("dojox.layout.RadioGroup");
B.experimental("dojox.layout.RadioGroup");
B.require("dijit._Widget");
B.require("dijit._Templated");
B.require("dijit._Container");
B.require("dijit.layout.StackContainer");
B.require("dojox.fx.easing");
B.declare("dojox.layout.RadioGroup",[dijit.layout.StackContainer,dijit._Templated],{duration:750,hasButtons:true,templateString:'<div class="dojoxRadioGroup"> 	<div dojoAttachPoint="buttonHolder" style="display:none;">		<table class="dojoxRadioButtons"><tbody><tr class="dojoxRadioButtonRow" dojoAttachPoint="buttonNode"></tr></tbody></table>	</div>	<div class="dojoxRadioView" dojoAttachPoint="containerNode"></div></div>',startup:function(){this.inherited("startup",arguments);
this._children=this.getChildren();
this._buttons=this._children.length;
this._size=B.coords(this.containerNode);
if(this.hasButtons){B.style(this.buttonHolder,"display","block");
B.forEach(this._children,this._makeButton,this)
}},_makeButton:function(A){B.style(A.domNode,"position","absolute");
var G=document.createElement("td");
this.buttonNode.appendChild(G);
var F=G.appendChild(document.createElement("div"));
var H=new dojox.layout._RadioButton({label:A.title,page:A},F);
H.startup()
},_transition:function(A,D){this._showChild(A);
if(D){this._hideChild(D)
}if(this.doLayout&&A.resize){A.resize(this._containerContentBox||this._contentBox)
}},_showChild:function(A){var D=this.getChildren();
A.isFirstChild=(A==D[0]);
A.isLastChild=(A==D[D.length-1]);
A.selected=true;
A.domNode.style.display="";
if(A._loadCheck){A._loadCheck()
}if(A.onShow){A.onShow()
}},_hideChild:function(A){A.selected=false;
A.domNode.style.display="none";
if(A.onHide){A.onHide()
}}});
B.declare("dojox.layout.RadioGroupFade",dojox.layout.RadioGroup,{_hideChild:function(A){B.fadeOut({node:A.domNode,duration:this.duration,onEnd:this.inherited("_hideChild",arguments)}).play()
},_showChild:function(A){this.inherited("_showChild",arguments);
B.style(A.domNode,"opacity",0);
B.fadeIn({node:A.domNode,duration:this.duration}).play()
}});
B.declare("dojox.layout.RadioGroupSlide",dojox.layout.RadioGroup,{easing:dojox.fx.easing.easeOut,startup:function(){this.inherited("startup",arguments);
B.forEach(this._children,this._positionChild,this)
},_positionChild:function(E){var A=Math.round(Math.random());
var F=Math.round(Math.random());
B.style(E.domNode,A?"top":"left",(F?"-":"")+this._size[A?"h":"w"]+"px")
},_showChild:function(A){this.inherited("_showChild",arguments);
if(this._anim&&this._anim.status()=="playing"){this._anim.gotoPercent(100,true)
}this._anim=B.animateProperty({node:A.domNode,properties:{left:{end:0,unit:"px"},top:{end:0,unit:"px"}},duration:this.duration,easing:this.easing});
this._anim.play()
},_hideChild:function(A){this.inherited("_hideChild",arguments);
this._positionChild(A)
}});
B.declare("dojox.layout._RadioButton",[dijit._Widget,dijit._Templated,dijit._Contained],{label:"",page:null,templateString:'<div dojoAttachPoint="focusNode" class="dojoxRadioButton"><span dojoAttachPoint="titleNode" class="dojoxRadioButtonLabel">${label}</span></div>',startup:function(){this.connect(this.domNode,"onmouseover","_onMouse")
},_onMouse:function(A){this.getParent().selectChild(this.page);
this._clearSelected();
B.addClass(this.domNode,"dojoxRadioButtonSelected")
},_clearSelected:function(){B.query(".dojoxRadioButtonSelected",this.domNode.parentNode.parentNode).forEach(function(A){B.removeClass(A,"dojoxRadioButtonSelected")
})
}})
}}});