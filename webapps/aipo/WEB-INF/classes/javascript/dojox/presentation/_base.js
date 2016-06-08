if(!dojo._hasResource["dojox.presentation._base"]){dojo._hasResource["dojox.presentation._base"]=true;
dojo.provide("dojox.presentation._base");
dojo.experimental("dojox.presentation");
dojo.require("dijit._Widget");
dojo.require("dijit._Container");
dojo.require("dijit._Templated");
dojo.require("dijit.layout.StackContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dojo.fx");
dojo.declare("dojox.presentation.Deck",[dijit.layout.StackContainer,dijit._Templated],{fullScreen:true,useNav:true,navDuration:250,noClick:false,setHash:true,templateString:null,templateString:'<div class="dojoShow" dojoAttachPoint="showHolder">\r\n\t<div class="dojoShowNav" dojoAttachPoint="showNav" dojoAttachEvent="onmouseover: _showNav, onmouseout: _hideNav">\r\n\t<div class="dojoShowNavToggler" dojoAttachPoint="showToggler">\r\n\t\t<img dojoAttachPoint="prevNode" src="${prevIcon}" dojoAttachEvent="onclick:previousSlide">\r\n\t\t<select dojoAttachEvent="onchange:_onEvent" dojoAttachPoint="select">\r\n\t\t\t<option dojoAttachPoint="_option">Title</option>\r\n\t\t</select>\r\n\t\t<img dojoAttachPoint="nextNode" src="${nextIcon}" dojoAttachEvent="onclick:nextSlide">\r\n\t</div>\r\n\t</div>\r\n\t<div dojoAttachPoint="containerNode"></div>\r\n</div>\r\n',nextIcon:dojo.moduleUrl("dojox.presentation","resources/icons/next.png"),prevIcon:dojo.moduleUrl("dojox.presentation","resources/icons/prev.png"),_navOpacMin:0,_navOpacMax:0.85,_slideIndex:0,_slides:[],_navShowing:true,_inNav:false,startup:function(){dojox.presentation.Deck.superclass.startup.call(this);
if(this.useNav){this._hideNav()
}else{this.showNav.style.display="none"
}this.connect(document,"onclick","_onEvent");
this.connect(document,"onkeypress","_onEvent");
this.connect(window,"onresize","_resizeWindow");
this._resizeWindow();
this._updateSlides();
this._readHash();
this._setHash()
},moveTo:function(C){var D=C-1;
if(D<0){D=0
}if(D>this._slides.length-1){D=this._slides.length-1
}this._gotoSlide(D)
},onMove:function(B){},nextSlide:function(B){if(!this.selectedChildWidget.isLastChild){this._gotoSlide(this._slideIndex+1)
}if(B){B.stopPropagation()
}},previousSlide:function(B){if(!this.selectedChildWidget.isFirstChild){this._gotoSlide(this._slideIndex-1)
}else{this.selectedChildWidget._reset()
}if(B){B.stopPropagation()
}},getHash:function(B){return this.id+"_SlideNo_"+B
},_hideNav:function(B){if(this._navAnim){this._navAnim.stop()
}this._navAnim=dojo.animateProperty({node:this.showNav,duration:this.navDuration,properties:{opacity:{end:this._navOpacMin}}}).play()
},_showNav:function(B){if(this._navAnim){this._navAnim.stop()
}this._navAnim=dojo.animateProperty({node:this.showNav,duration:this.navDuration,properties:{opacity:{end:this._navOpacMax}}}).play()
},_handleNav:function(B){B.stopPropagation()
},_updateSlides:function(){this._slides=this.getChildren();
if(this.useNav){var B=0;
dojo.forEach(this._slides,dojo.hitch(this,function(D){B++;
var A=this._option.cloneNode(true);
A.text=D.title+" ("+B+") ";
this._option.parentNode.insertBefore(A,this._option)
}));
if(this._option.parentNode){this._option.parentNode.removeChild(this._option)
}}},_onEvent:function(E){var F=E.target;
var H=E.type;
if(H=="click"||H=="change"){if(F.index&&F.parentNode==this.select){this._gotoSlide(F.index)
}else{if(F==this.select){this._gotoSlide(F.selectedIndex)
}else{if(this.noClick||this.selectedChildWidget.noClick||this._isUnclickable(E)){return 
}this.selectedChildWidget._nextAction(E)
}}}else{if(H=="keydown"||H=="keypress"){var G=(E.charCode==dojo.keys.SPACE?dojo.keys.SPACE:E.keyCode);
switch(G){case dojo.keys.DELETE:case dojo.keys.BACKSPACE:case dojo.keys.LEFT_ARROW:case dojo.keys.UP_ARROW:case dojo.keys.PAGE_UP:case 80:this.previousSlide(E);
break;
case dojo.keys.ENTER:case dojo.keys.SPACE:case dojo.keys.RIGHT_ARROW:case dojo.keys.DOWN_ARROW:case dojo.keys.PAGE_DOWN:case 78:this.selectedChildWidget._nextAction(E);
break;
case dojo.keys.HOME:this._gotoSlide(0)
}}}this._resizeWindow();
E.stopPropagation()
},_gotoSlide:function(B){this.selectChild(this._slides[B]);
this.selectedChildWidget._reset();
this._slideIndex=B;
if(this.useNav){this.select.selectedIndex=B
}if(this.setHash){this._setHash()
}this.onMove(this._slideIndex+1)
},_isUnclickable:function(C){var D=C.target.nodeName.toLowerCase();
switch(D){case"a":case"input":case"textarea":return true;
break
}return false
},_readHash:function(){var C=window.location.hash;
if(C.length&&this.setHash){var D=(""+window.location).split(this.getHash(""));
if(D.length>1){this._gotoSlide(parseInt(D[1])-1)
}}},_setHash:function(){if(this.setHash){var B=this._slideIndex+1;
window.location.href="#"+this.getHash(B)
}},_resizeWindow:function(G){dojo.body().style.height="auto";
var H=dijit.getViewport();
var F=Math.max(document.documentElement.scrollHeight||dojo.body().scrollHeight,H.h);
var E=H.w;
this.selectedChildWidget.domNode.style.height=F+"px";
this.selectedChildWidget.domNode.style.width=E+"px"
},_transition:function(E,F){var D=[];
if(F){this._hideChild(F)
}if(E){this._showChild(E);
E._reset()
}}});
dojo.declare("dojox.presentation.Slide",[dijit.layout.ContentPane,dijit._Contained,dijit._Container,dijit._Templated],{templateString:'<div dojoAttachPoint="showSlide" class="dojoShowPrint dojoShowSlide">\r\n\t<h1 class="showTitle" dojoAttachPoint="slideTitle"><span class="dojoShowSlideTitle" dojoAttachPoint="slideTitleText">${title}</span></h1>\r\n\t<div class="dojoShowBody" dojoAttachPoint="containerNode"></div>\r\n</div>\r\n',title:"",refreshOnShow:true,preLoad:false,doLayout:true,parseContent:true,noClick:false,_parts:[],_actions:[],_actionIndex:0,_runningDelay:false,startup:function(){this.slideTitleText.innerHTML=this.title;
var B=this.getChildren();
this._actions=[];
dojo.forEach(B,function(A){var D=A.declaredClass.toLowerCase();
switch(D){case"dojox.presentation.part":this._parts.push(A);
break;
case"dojox.presentation.action":this._actions.push(A);
break
}},this)
},_nextAction:function(D){var E=this._actions[this._actionIndex]||0;
if(E){if(E.on=="delay"){this._runningDelay=setTimeout(dojo.hitch(E,"_runAction"),E.delay);
console.debug("started delay action",this._runningDelay)
}else{E._runAction()
}var F=this._getNextAction();
this._actionIndex++;
if(F.on=="delay"){console.debug("started delay action",this._runningDelay);
setTimeout(dojo.hitch(F,"_runAction"),F.delay)
}}else{this.getParent().nextSlide(D)
}},_getNextAction:function(){return this._actions[this._actionIndex+1]||0
},_reset:function(){this._actionIndex=[0];
dojo.forEach(this._parts,function(B){B._reset()
},this)
}});
dojo.declare("dojox.presentation.Part",[dijit._Widget,dijit._Contained],{as:null,startVisible:false,_isShowing:false,postCreate:function(){this._reset()
},_reset:function(){this._isShowing=!this.startVisible;
this._quickToggle()
},_quickToggle:function(){if(this._isShowing){dojo.style(this.domNode,"display","none");
dojo.style(this.domNode,"visibility","hidden");
dojo.style(this.domNode,"opacity",0)
}else{dojo.style(this.domNode,"display","");
dojo.style(this.domNode,"visibility","visible");
dojo.style(this.domNode,"opacity",1)
}this._isShowing=!this._isShowing
}});
dojo.declare("dojox.presentation.Action",[dijit._Widget,dijit._Contained],{on:"click",forSlide:null,toggle:"fade",delay:0,duration:1000,_attached:[],_nullAnim:false,_runAction:function(){var C=[];
dojo.forEach(this._attached,function(A){var F=(A._isShowing)?"Out":"In";
A._quickToggle();
var B=dojo.fadeIn({node:A.domNode,duration:this.duration});
C.push(B)
},this);
var D=dojo.fx.combine(C);
if(D){D.play()
}},_getSiblingsByType:function(C){var D=dojo.filter(this.getParent().getChildren(),function(A){return A.declaredClass==C
});
return D
},postCreate:function(){dojo.style(this.domNode,"display","none");
var B=this._getSiblingsByType("dojox.presentation.Part");
this._attached=[];
dojo.forEach(B,function(A){if(this.forSlide==A.as){this._attached.push(A)
}},this)
}})
};