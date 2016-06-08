if(!dojo._hasResource["dojo._base.event"]){dojo._hasResource["dojo._base.event"]=true;
dojo.provide("dojo._base.event");
dojo.require("dojo._base.connect");
(function(){var H=dojo._event_listener={add:function(C,D,E){if(!C){return 
}D=H._normalizeEventName(D);
E=H._fixCallback(D,E);
var B=D;
if((!dojo.isIE)&&((D=="mouseenter")||(D=="mouseleave"))){var B=D;
var A=E;
D=(D=="mouseenter")?"mouseover":"mouseout";
E=function(G){var F=dojo.isDescendant(G.relatedTarget,C);
if(F==false){return A.call(this,G)
}}
}C.addEventListener(D,E,false);
return E
},remove:function(B,C,A){(B)&&(B.removeEventListener(H._normalizeEventName(C),A,false))
},_normalizeEventName:function(A){return(A.slice(0,2)=="on"?A.slice(2):A)
},_fixCallback:function(A,B){return(A!="keypress"?B:function(C){return B.call(this,H._fixEvent(C,this))
})
},_fixEvent:function(B,A){switch(B.type){case"keypress":H._setKeyChar(B);
break
}return B
},_setKeyChar:function(A){A.keyChar=(A.charCode?String.fromCharCode(A.charCode):"")
}};
dojo.fixEvent=function(B,A){return H._fixEvent(B,A)
};
dojo.stopEvent=function(A){A.preventDefault();
A.stopPropagation()
};
var L=dojo._listener;
dojo._connect=function(E,Q,G,R,A){var B=E&&(E.nodeType||E.attachEvent||E.addEventListener);
var C=!B?0:(!A?1:2),F=[dojo._listener,H,L][C];
var D=F.add(E,Q,dojo.hitch(G,R));
return[E,Q,D,C]
};
dojo._disconnect=function(A,D,B,C){([dojo._listener,H,L][C]).remove(A,D,B)
};
dojo.keys={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145};
if(dojo.isIE){var J=function(A,B){try{return(A.keyCode=B)
}catch(A){return 0
}};
var N=dojo._listener;
if(!djConfig._allow_leaks){L=N=dojo._ie_listener={handlers:[],add:function(C,A,D){C=C||dojo.global;
var E=C[A];
if(!E||!E._listeners){var B=dojo._getIeDispatcher();
B.target=E&&(K.push(E)-1);
B._listeners=[];
E=C[A]=B
}return E._listeners.push(K.push(D)-1)
},remove:function(B,A,C){var D=(B||dojo.global)[A],E=D&&D._listeners;
if(D&&E&&C--){delete K[E[C]];
delete E[C]
}}};
var K=N.handlers
}dojo.mixin(H,{add:function(A,B,C){if(!A){return 
}B=H._normalizeEventName(B);
if(B=="onkeypress"){var D=A.onkeydown;
if(!D||!D._listeners||!D._stealthKeydown){H.add(A,"onkeydown",H._stealthKeyDown);
A.onkeydown._stealthKeydown=true
}}return N.add(A,B,H._fixCallback(C))
},remove:function(B,C,A){N.remove(B,H._normalizeEventName(C),A)
},_normalizeEventName:function(A){return(A.slice(0,2)!="on"?"on"+A:A)
},_nop:function(){},_fixEvent:function(D,C){if(!D){var E=(C)&&((C.ownerDocument||C.document||C).parentWindow)||window;
D=E.event
}if(!D){return(D)
}D.target=D.srcElement;
D.currentTarget=(C||D.srcElement);
D.layerX=D.offsetX;
D.layerY=D.offsetY;
var A=D.srcElement,G=(A&&A.ownerDocument)||document;
var B=((dojo.isIE<6)||(G.compatMode=="BackCompat"))?G.body:G.documentElement;
var F=dojo._getIeDocumentElementOffset();
D.pageX=D.clientX+dojo._fixIeBiDiScrollLeft(B.scrollLeft||0)-F.x;
D.pageY=D.clientY+(B.scrollTop||0)-F.y;
if(D.type=="mouseover"){D.relatedTarget=D.fromElement
}if(D.type=="mouseout"){D.relatedTarget=D.toElement
}D.stopPropagation=H._stopPropagation;
D.preventDefault=H._preventDefault;
return H._fixKeys(D)
},_fixKeys:function(B){switch(B.type){case"keypress":var A=("charCode" in B?B.charCode:B.keyCode);
if(A==10){A=0;
B.keyCode=13
}else{if(A==13||A==27){A=0
}else{if(A==3){A=99
}}}B.charCode=A;
H._setKeyChar(B);
break
}return B
},_punctMap:{106:42,111:47,186:59,187:43,188:44,189:45,190:46,191:47,192:96,219:91,220:92,221:93,222:39},_stealthKeyDown:function(E){var B=E.currentTarget.onkeypress;
if(!B||!B._listeners){return 
}var C=E.keyCode;
var A=(C!=13)&&(C!=32)&&(C!=27)&&(C<48||C>90)&&(C<96||C>111)&&(C<186||C>192)&&(C<219||C>222);
if(A||E.ctrlKey){var F=(A?0:C);
if(E.ctrlKey){if(C==3||C==13){return 
}else{if(F>95&&F<106){F-=48
}else{if((!E.shiftKey)&&(F>=65&&F<=90)){F+=32
}else{F=H._punctMap[F]||F
}}}}var D=H._synthesizeEvent(E,{type:"keypress",faux:true,charCode:F});
B.call(E.currentTarget,D);
E.cancelBubble=D.cancelBubble;
E.returnValue=D.returnValue;
J(E,D.keyCode)
}},_stopPropagation:function(){this.cancelBubble=true
},_preventDefault:function(){this.bubbledKeyCode=this.keyCode;
if(this.ctrlKey){J(this,0)
}this.returnValue=false
}});
dojo.stopEvent=function(A){A=A||window.event;
H._stopPropagation.call(A);
H._preventDefault.call(A)
}
}H._synthesizeEvent=function(C,A){var B=dojo.mixin({},C,A);
H._setKeyChar(B);
B.preventDefault=function(){C.preventDefault()
};
B.stopPropagation=function(){C.stopPropagation()
};
return B
};
if(dojo.isOpera){dojo.mixin(H,{_fixEvent:function(C,B){switch(C.type){case"keypress":var A=C.which;
if(A==3){A=99
}A=((A<41)&&(!C.shiftKey)?0:A);
if((C.ctrlKey)&&(!C.shiftKey)&&(A>=65)&&(A<=90)){A+=32
}return H._synthesizeEvent(C,{charCode:A})
}return C
}})
}if(dojo.isSafari){dojo.mixin(H,{_fixEvent:function(E,C){switch(E.type){case"keypress":var A=E.charCode,B=E.shiftKey,D=E.keyCode;
D=D||I[E.keyIdentifier]||0;
if(E.keyIdentifier=="Enter"){A=0
}else{if((E.ctrlKey)&&(A>0)&&(A<27)){A+=96
}else{if(A==dojo.keys.SHIFT_TAB){A=dojo.keys.TAB;
B=true
}else{A=(A>=32&&A<63232?A:0)
}}}return H._synthesizeEvent(E,{charCode:A,shiftKey:B,keyCode:D})
}return E
}});
dojo.mixin(dojo.keys,{SHIFT_TAB:25,UP_ARROW:63232,DOWN_ARROW:63233,LEFT_ARROW:63234,RIGHT_ARROW:63235,F1:63236,F2:63237,F3:63238,F4:63239,F5:63240,F6:63241,F7:63242,F8:63243,F9:63244,F10:63245,F11:63246,F12:63247,PAUSE:63250,DELETE:63272,HOME:63273,END:63275,PAGE_UP:63276,PAGE_DOWN:63277,INSERT:63302,PRINT_SCREEN:63248,SCROLL_LOCK:63249,NUM_LOCK:63289});
var M=dojo.keys,I={Up:M.UP_ARROW,Down:M.DOWN_ARROW,Left:M.LEFT_ARROW,Right:M.RIGHT_ARROW,PageUp:M.PAGE_UP,PageDown:M.PAGE_DOWN}
}})();
if(dojo.isIE){dojo._getIeDispatcher=function(){return function(){var L=Array.prototype,K=dojo._ie_listener.handlers,I=arguments.callee,H=I._listeners,M=K[I.target];
var J=M&&M.apply(this,arguments);
for(var N in H){if(!(N in L)){K[H[N]].apply(this,arguments)
}}return J
}
};
dojo._event_listener._fixCallback=function(C){var D=dojo._event_listener._fixEvent;
return function(A){return C.call(this,D(A,this))
}
}
}};