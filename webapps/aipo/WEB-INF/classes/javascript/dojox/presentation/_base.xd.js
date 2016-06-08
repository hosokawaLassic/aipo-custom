dojo._xdResourceLoaded({depends:[["provide","dojox.presentation._base"],["require","dijit._Widget"],["require","dijit._Container"],["require","dijit._Templated"],["require","dijit.layout.StackContainer"],["require","dijit.layout.ContentPane"],["require","dojo.fx"]],defineResource:function(B){if(!B._hasResource["dojox.presentation._base"]){B._hasResource["dojox.presentation._base"]=true;
B.provide("dojox.presentation._base");
B.experimental("dojox.presentation");
B.require("dijit._Widget");
B.require("dijit._Container");
B.require("dijit._Templated");
B.require("dijit.layout.StackContainer");
B.require("dijit.layout.ContentPane");
B.require("dojo.fx");
B.declare("dojox.presentation.Deck",[dijit.layout.StackContainer,dijit._Templated],{fullScreen:true,useNav:true,navDuration:250,noClick:false,setHash:true,templateString:null,templateString:'<div class="dojoShow" dojoAttachPoint="showHolder">\r\n\t<div class="dojoShowNav" dojoAttachPoint="showNav" dojoAttachEvent="onmouseover: _showNav, onmouseout: _hideNav">\r\n\t<div class="dojoShowNavToggler" dojoAttachPoint="showToggler">\r\n\t\t<img dojoAttachPoint="prevNode" src="${prevIcon}" dojoAttachEvent="onclick:previousSlide">\r\n\t\t<select dojoAttachEvent="onchange:_onEvent" dojoAttachPoint="select">\r\n\t\t\t<option dojoAttachPoint="_option">Title</option>\r\n\t\t</select>\r\n\t\t<img dojoAttachPoint="nextNode" src="${nextIcon}" dojoAttachEvent="onclick:nextSlide">\r\n\t</div>\r\n\t</div>\r\n\t<div dojoAttachPoint="containerNode"></div>\r\n</div>\r\n',nextIcon:B.moduleUrl("dojox.presentation","resources/icons/next.png"),prevIcon:B.moduleUrl("dojox.presentation","resources/icons/prev.png"),_navOpacMin:0,_navOpacMax:0.85,_slideIndex:0,_slides:[],_navShowing:true,_inNav:false,startup:function(){dojox.presentation.Deck.superclass.startup.call(this);
if(this.useNav){this._hideNav()
}else{this.showNav.style.display="none"
}this.connect(document,"onclick","_onEvent");
this.connect(document,"onkeypress","_onEvent");
this.connect(window,"onresize","_resizeWindow");
this._resizeWindow();
this._updateSlides();
this._readHash();
this._setHash()
},moveTo:function(D){var A=D-1;
if(A<0){A=0
}if(A>this._slides.length-1){A=this._slides.length-1
}this._gotoSlide(A)
},onMove:function(A){},nextSlide:function(A){if(!this.selectedChildWidget.isLastChild){this._gotoSlide(this._slideIndex+1)
}if(A){A.stopPropagation()
}},previousSlide:function(A){if(!this.selectedChildWidget.isFirstChild){this._gotoSlide(this._slideIndex-1)
}else{this.selectedChildWidget._reset()
}if(A){A.stopPropagation()
}},getHash:function(A){return this.id+"_SlideNo_"+A
},_hideNav:function(A){if(this._navAnim){this._navAnim.stop()
}this._navAnim=B.animateProperty({node:this.showNav,duration:this.navDuration,properties:{opacity:{end:this._navOpacMin}}}).play()
},_showNav:function(A){if(this._navAnim){this._navAnim.stop()
}this._navAnim=B.animateProperty({node:this.showNav,duration:this.navDuration,properties:{opacity:{end:this._navOpacMax}}}).play()
},_handleNav:function(A){A.stopPropagation()
},_updateSlides:function(){this._slides=this.getChildren();
if(this.useNav){var A=0;
B.forEach(this._slides,B.hitch(this,function(F){A++;
var E=this._option.cloneNode(true);
E.text=F.title+" ("+A+") ";
this._option.parentNode.insertBefore(E,this._option)
}));
if(this._option.parentNode){this._option.parentNode.removeChild(this._option)
}}},_onEvent:function(H){var A=H.target;
var G=H.type;
if(G=="click"||G=="change"){if(A.index&&A.parentNode==this.select){this._gotoSlide(A.index)
}else{if(A==this.select){this._gotoSlide(A.selectedIndex)
}else{if(this.noClick||this.selectedChildWidget.noClick||this._isUnclickable(H)){return 
}this.selectedChildWidget._nextAction(H)
}}}else{if(G=="keydown"||G=="keypress"){var F=(H.charCode==B.keys.SPACE?B.keys.SPACE:H.keyCode);
switch(F){case B.keys.DELETE:case B.keys.BACKSPACE:case B.keys.LEFT_ARROW:case B.keys.UP_ARROW:case B.keys.PAGE_UP:case 80:this.previousSlide(H);
break;
case B.keys.ENTER:case B.keys.SPACE:case B.keys.RIGHT_ARROW:case B.keys.DOWN_ARROW:case B.keys.PAGE_DOWN:case 78:this.selectedChildWidget._nextAction(H);
break;
case B.keys.HOME:this._gotoSlide(0)
}}}this._resizeWindow();
H.stopPropagation()
},_gotoSlide:function(A){this.selectChild(this._slides[A]);
this.selectedChildWidget._reset();
this._slideIndex=A;
if(this.useNav){this.select.selectedIndex=A
}if(this.setHash){this._setHash()
}this.onMove(this._slideIndex+1)
},_isUnclickable:function(D){var A=D.target.nodeName.toLowerCase();
switch(A){case"a":case"input":case"textarea":return true;
break
}return false
},_readHash:function(){var D=window.location.hash;
if(D.length&&this.setHash){var A=(""+window.location).split(this.getHash(""));
if(A.length>1){this._gotoSlide(parseInt(A[1])-1)
}}},_setHash:function(){if(this.setHash){var A=this._slideIndex+1;
window.location.href="#"+this.getHash(A)
}},_resizeWindow:function(F){B.body().style.height="auto";
var G=dijit.getViewport();
var A=Math.max(document.documentElement.scrollHeight||B.body().scrollHeight,G.h);
var H=G.w;
this.selectedChildWidget.domNode.style.height=A+"px";
this.selectedChildWidget.domNode.style.width=H+"px"
},_transition:function(A,E){var F=[];
if(E){this._hideChild(E)
}if(A){this._showChild(A);
A._reset()
}}});
B.declare("dojox.presentation.Slide",[dijit.layout.ContentPane,dijit._Contained,dijit._Container,dijit._Templated],{templateString:'<div dojoAttachPoint="showSlide" class="dojoShowPrint dojoShowSlide">\r\n\t<h1 class="showTitle" dojoAttachPoint="slideTitle"><span class="dojoShowSlideTitle" dojoAttachPoint="slideTitleText">${title}</span></h1>\r\n\t<div class="dojoShowBody" dojoAttachPoint="containerNode"></div>\r\n</div>\r\n',title:"",refreshOnShow:true,preLoad:false,doLayout:true,parseContent:true,noClick:false,_parts:[],_actions:[],_actionIndex:0,_runningDelay:false,startup:function(){this.slideTitleText.innerHTML=this.title;
var A=this.getChildren();
this._actions=[];
B.forEach(A,function(E){var F=E.declaredClass.toLowerCase();
switch(F){case"dojox.presentation.part":this._parts.push(E);
break;
case"dojox.presentation.action":this._actions.push(E);
break
}},this)
},_nextAction:function(F){var A=this._actions[this._actionIndex]||0;
if(A){if(A.on=="delay"){this._runningDelay=setTimeout(B.hitch(A,"_runAction"),A.delay);
console.debug("started delay action",this._runningDelay)
}else{A._runAction()
}var E=this._getNextAction();
this._actionIndex++;
if(E.on=="delay"){console.debug("started delay action",this._runningDelay);
setTimeout(B.hitch(E,"_runAction"),E.delay)
}}else{this.getParent().nextSlide(F)
}},_getNextAction:function(){return this._actions[this._actionIndex+1]||0
},_reset:function(){this._actionIndex=[0];
B.forEach(this._parts,function(A){A._reset()
},this)
}});
B.declare("dojox.presentation.Part",[dijit._Widget,dijit._Contained],{as:null,startVisible:false,_isShowing:false,postCreate:function(){this._reset()
},_reset:function(){this._isShowing=!this.startVisible;
this._quickToggle()
},_quickToggle:function(){if(this._isShowing){B.style(this.domNode,"display","none");
B.style(this.domNode,"visibility","hidden");
B.style(this.domNode,"opacity",0)
}else{B.style(this.domNode,"display","");
B.style(this.domNode,"visibility","visible");
B.style(this.domNode,"opacity",1)
}this._isShowing=!this._isShowing
}});
B.declare("dojox.presentation.Action",[dijit._Widget,dijit._Contained],{on:"click",forSlide:null,toggle:"fade",delay:0,duration:1000,_attached:[],_nullAnim:false,_runAction:function(){var D=[];
B.forEach(this._attached,function(C){var H=(C._isShowing)?"Out":"In";
C._quickToggle();
var G=B.fadeIn({node:C.domNode,duration:this.duration});
D.push(G)
},this);
var A=B.fx.combine(D);
if(A){A.play()
}},_getSiblingsByType:function(D){var A=B.filter(this.getParent().getChildren(),function(C){return C.declaredClass==D
});
return A
},postCreate:function(){B.style(this.domNode,"display","none");
var A=this._getSiblingsByType("dojox.presentation.Part");
this._attached=[];
B.forEach(A,function(D){if(this.forSlide==D.as){this._attached.push(D)
}},this)
}})
}}});