dojo._xdResourceLoaded({depends:[["provide","dojo._base.event"],["require","dojo._base.connect"]],defineResource:function(B){if(!B._hasResource["dojo._base.event"]){B._hasResource["dojo._base.event"]=true;
B.provide("dojo._base.event");
B.require("dojo._base.connect");
(function(){var N=B._event_listener={add:function(D,E,F){if(!D){return 
}E=N._normalizeEventName(E);
F=N._fixCallback(E,F);
var C=E;
if((!B.isIE)&&((E=="mouseenter")||(E=="mouseleave"))){var C=E;
var G=F;
E=(E=="mouseenter")?"mouseover":"mouseout";
F=function(P){var H=B.isDescendant(P.relatedTarget,D);
if(H==false){return G.call(this,P)
}}
}D.addEventListener(E,F,false);
return F
},remove:function(D,E,C){(D)&&(D.removeEventListener(N._normalizeEventName(E),C,false))
},_normalizeEventName:function(C){return(C.slice(0,2)=="on"?C.slice(2):C)
},_fixCallback:function(C,D){return(C!="keypress"?D:function(E){return D.call(this,N._fixEvent(E,this))
})
},_fixEvent:function(D,C){switch(D.type){case"keypress":N._setKeyChar(D);
break
}return D
},_setKeyChar:function(C){C.keyChar=(C.charCode?String.fromCharCode(C.charCode):"")
}};
B.fixEvent=function(D,C){return N._fixEvent(D,C)
};
B.stopEvent=function(C){C.preventDefault();
C.stopPropagation()
};
var K=B._listener;
B._connect=function(G,S,R,T,C){var D=G&&(G.nodeType||G.attachEvent||G.addEventListener);
var E=!D?0:(!C?1:2),H=[B._listener,N,K][E];
var F=H.add(G,S,B.hitch(R,T));
return[G,S,F,E]
};
B._disconnect=function(C,F,D,E){([B._listener,N,K][E]).remove(C,F,D)
};
B.keys={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145};
if(B.isIE){var I=function(C,D){try{return(C.keyCode=D)
}catch(C){return 0
}};
var M=B._listener;
if(!djConfig._allow_leaks){K=M=B._ie_listener={handlers:[],add:function(D,G,E){D=D||B.global;
var F=D[G];
if(!F||!F._listeners){var C=B._getIeDispatcher();
C.target=F&&(J.push(F)-1);
C._listeners=[];
F=D[G]=C
}return F._listeners.push(J.push(E)-1)
},remove:function(C,G,D){var E=(C||B.global)[G],F=E&&E._listeners;
if(E&&F&&D--){delete J[F[D]];
delete F[D]
}}};
var J=M.handlers
}B.mixin(N,{add:function(C,D,E){if(!C){return 
}D=N._normalizeEventName(D);
if(D=="onkeypress"){var F=C.onkeydown;
if(!F||!F._listeners||!F._stealthKeydown){N.add(C,"onkeydown",N._stealthKeyDown);
C.onkeydown._stealthKeydown=true
}}return M.add(C,D,N._fixCallback(E))
},remove:function(D,E,C){M.remove(D,N._normalizeEventName(E),C)
},_normalizeEventName:function(C){return(C.slice(0,2)!="on"?"on"+C:C)
},_nop:function(){},_fixEvent:function(E,D){if(!E){var F=(D)&&((D.ownerDocument||D.document||D).parentWindow)||window;
E=F.event
}if(!E){return(E)
}E.target=E.srcElement;
E.currentTarget=(D||E.srcElement);
E.layerX=E.offsetX;
E.layerY=E.offsetY;
var P=E.srcElement,H=(P&&P.ownerDocument)||document;
var C=((B.isIE<6)||(H.compatMode=="BackCompat"))?H.body:H.documentElement;
var G=B._getIeDocumentElementOffset();
E.pageX=E.clientX+B._fixIeBiDiScrollLeft(C.scrollLeft||0)-G.x;
E.pageY=E.clientY+(C.scrollTop||0)-G.y;
if(E.type=="mouseover"){E.relatedTarget=E.fromElement
}if(E.type=="mouseout"){E.relatedTarget=E.toElement
}E.stopPropagation=N._stopPropagation;
E.preventDefault=N._preventDefault;
return N._fixKeys(E)
},_fixKeys:function(D){switch(D.type){case"keypress":var C=("charCode" in D?D.charCode:D.keyCode);
if(C==10){C=0;
D.keyCode=13
}else{if(C==13||C==27){C=0
}else{if(C==3){C=99
}}}D.charCode=C;
N._setKeyChar(D);
break
}return D
},_punctMap:{106:42,111:47,186:59,187:43,188:44,189:45,190:46,191:47,192:96,219:91,220:92,221:93,222:39},_stealthKeyDown:function(F){var C=F.currentTarget.onkeypress;
if(!C||!C._listeners){return 
}var D=F.keyCode;
var H=(D!=13)&&(D!=32)&&(D!=27)&&(D<48||D>90)&&(D<96||D>111)&&(D<186||D>192)&&(D<219||D>222);
if(H||F.ctrlKey){var G=(H?0:D);
if(F.ctrlKey){if(D==3||D==13){return 
}else{if(G>95&&G<106){G-=48
}else{if((!F.shiftKey)&&(G>=65&&G<=90)){G+=32
}else{G=N._punctMap[G]||G
}}}}var E=N._synthesizeEvent(F,{type:"keypress",faux:true,charCode:G});
C.call(F.currentTarget,E);
F.cancelBubble=E.cancelBubble;
F.returnValue=E.returnValue;
I(F,E.keyCode)
}},_stopPropagation:function(){this.cancelBubble=true
},_preventDefault:function(){this.bubbledKeyCode=this.keyCode;
if(this.ctrlKey){I(this,0)
}this.returnValue=false
}});
B.stopEvent=function(C){C=C||window.event;
N._stopPropagation.call(C);
N._preventDefault.call(C)
}
}N._synthesizeEvent=function(E,C){var D=B.mixin({},E,C);
N._setKeyChar(D);
D.preventDefault=function(){E.preventDefault()
};
D.stopPropagation=function(){E.stopPropagation()
};
return D
};
if(B.isOpera){B.mixin(N,{_fixEvent:function(E,D){switch(E.type){case"keypress":var C=E.which;
if(C==3){C=99
}C=((C<41)&&(!E.shiftKey)?0:C);
if((E.ctrlKey)&&(!E.shiftKey)&&(C>=65)&&(C<=90)){C+=32
}return N._synthesizeEvent(E,{charCode:C})
}return E
}})
}if(B.isSafari){B.mixin(N,{_fixEvent:function(F,D){switch(F.type){case"keypress":var G=F.charCode,C=F.shiftKey,E=F.keyCode;
E=E||A[F.keyIdentifier]||0;
if(F.keyIdentifier=="Enter"){G=0
}else{if((F.ctrlKey)&&(G>0)&&(G<27)){G+=96
}else{if(G==B.keys.SHIFT_TAB){G=B.keys.TAB;
C=true
}else{G=(G>=32&&G<63232?G:0)
}}}return N._synthesizeEvent(F,{charCode:G,shiftKey:C,keyCode:E})
}return F
}});
B.mixin(B.keys,{SHIFT_TAB:25,UP_ARROW:63232,DOWN_ARROW:63233,LEFT_ARROW:63234,RIGHT_ARROW:63235,F1:63236,F2:63237,F3:63238,F4:63239,F5:63240,F6:63241,F7:63242,F8:63243,F9:63244,F10:63245,F11:63246,F12:63247,PAUSE:63250,DELETE:63272,HOME:63273,END:63275,PAGE_UP:63276,PAGE_DOWN:63277,INSERT:63302,PRINT_SCREEN:63248,SCROLL_LOCK:63249,NUM_LOCK:63289});
var L=B.keys,A={Up:L.UP_ARROW,Down:L.DOWN_ARROW,Left:L.LEFT_ARROW,Right:L.RIGHT_ARROW,PageUp:L.PAGE_UP,PageDown:L.PAGE_DOWN}
}})();
if(B.isIE){B._getIeDispatcher=function(){return function(){var K=Array.prototype,J=B._ie_listener.handlers,A=arguments.callee,N=A._listeners,L=J[A.target];
var I=L&&L.apply(this,arguments);
for(var M in N){if(!(M in K)){J[N[M]].apply(this,arguments)
}}return I
}
};
B._event_listener._fixCallback=function(D){var A=B._event_listener._fixEvent;
return function(C){return D.call(this,A(C,this))
}
}
}}}});