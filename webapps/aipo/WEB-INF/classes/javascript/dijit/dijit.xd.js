dojo._xdResourceLoaded({depends:[["provide","dijit._base.focus"],["provide","dijit._base.manager"],["provide","dijit._base.place"],["provide","dijit._base.window"],["provide","dijit._base.popup"],["provide","dijit._base.scroll"],["provide","dijit._base.sniff"],["provide","dijit._base.bidi"],["provide","dijit._base.typematic"],["provide","dijit._base.wai"],["provide","dijit._base"],["provide","dojo.date.stamp"],["provide","dojo.parser"],["provide","dijit._Widget"],["provide","dojo.string"],["provide","dijit._Templated"],["provide","dijit._Container"],["provide","dijit.layout._LayoutWidget"],["provide","dijit.form._FormWidget"],["provide","dijit.dijit"]],defineResource:function(B){if(!B._hasResource["dijit._base.focus"]){B._hasResource["dijit._base.focus"]=true;
B.provide("dijit._base.focus");
B.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){var A=B.global;
var E=B.doc;
if(E.selection){return !E.selection.createRange().text
}else{if(A.getSelection){var F=A.getSelection();
if(B.isString(F)){return !F
}else{return F.isCollapsed||!F.toString()
}}}},getBookmark:function(){var A,E=B.doc.selection;
if(E){var F=E.createRange();
if(E.type.toUpperCase()=="CONTROL"){A=F.length?B._toArray(F):null
}else{A=F.getBookmark()
}}else{if(B.global.getSelection){E=B.global.getSelection();
if(E){var F=E.getRangeAt(0);
A=F.cloneRange()
}}else{console.debug("No idea how to store the current selection for this browser!")
}}return A
},moveToBookmark:function(G){var H=B.doc;
if(H.selection){var A;
if(B.isArray(G)){A=H.body.createControlRange();
B.forEach(G,A.addElement)
}else{A=H.selection.createRange();
A.moveToBookmark(G)
}A.select()
}else{var F=B.global.getSelection&&B.global.getSelection();
if(F&&F.removeAllRanges){F.removeAllRanges();
F.addRange(G)
}else{console.debug("No idea how to restore selection for this browser!")
}}},getFocus:function(A,D){return{node:A&&B.isDescendant(dijit._curFocus,A.domNode)?dijit._prevFocus:dijit._curFocus,bookmark:!B.withGlobal(D||B.global,dijit.isCollapsed)?B.withGlobal(D||B.global,dijit.getBookmark):null,openedForWindow:D}
},focus:function(L){if(!L){return 
}var A="node" in L?L.node:L,H=L.bookmark,I=L.openedForWindow;
if(A){var J=(A.tagName.toLowerCase()=="iframe")?A.contentWindow:A;
if(J&&J.focus){try{J.focus()
}catch(K){}}dijit._onFocusNode(A)
}if(H&&B.withGlobal(I||B.global,dijit.isCollapsed)){if(I){I.focus()
}try{B.withGlobal(I||B.global,moveToBookmark,null,[H])
}catch(K){}}},_activeStack:[],registerWin:function(A){if(!A){A=window
}B.connect(A.document,"onmousedown",null,function(C){dijit._justMouseDowned=true;
setTimeout(function(){dijit._justMouseDowned=false
},0);
dijit._onTouchNode(C.target||C.srcElement)
});
var D=A.document.body||A.document.getElementsByTagName("body")[0];
if(D){if(B.isIE){D.attachEvent("onactivate",function(C){if(C.srcElement.tagName.toLowerCase()!="body"){dijit._onFocusNode(C.srcElement)
}});
D.attachEvent("ondeactivate",function(C){dijit._onBlurNode(C.srcElement)
})
}else{D.addEventListener("focus",function(C){dijit._onFocusNode(C.target)
},true);
D.addEventListener("blur",function(C){dijit._onBlurNode(C.target)
},true)
}}D=null
},_onBlurNode:function(A){dijit._prevFocus=dijit._curFocus;
dijit._curFocus=null;
var D=dijit.getEnclosingWidget(A);
if(D&&D._setStateClass){D._focused=false;
D._setStateClass()
}if(dijit._justMouseDowned){return 
}if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer)
}dijit._clearActiveWidgetsTimer=setTimeout(function(){delete dijit._clearActiveWidgetsTimer;
dijit._setStack([])
},100)
},_onTouchNode:function(G){if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer);
delete dijit._clearActiveWidgetsTimer
}var H=[];
try{while(G){if(G.dijitPopupParent){G=dijit.byId(G.dijitPopupParent).domNode
}else{if(G.tagName&&G.tagName.toLowerCase()=="body"){if(G===B.body()){break
}G=B.query("iframe").filter(function(C){return C.contentDocument.body===G
})[0]
}else{var A=G.getAttribute&&G.getAttribute("widgetId");
if(A){H.unshift(A)
}G=G.parentNode
}}}}catch(F){}dijit._setStack(H)
},_onFocusNode:function(A){if(A&&A.tagName&&A.tagName.toLowerCase()=="body"){return 
}dijit._onTouchNode(A);
if(A==dijit._curFocus){return 
}dijit._prevFocus=dijit._curFocus;
dijit._curFocus=A;
B.publish("focusNode",[A]);
var D=dijit.getEnclosingWidget(A);
if(D&&D._setStateClass){D._focused=true;
D._setStateClass()
}},_setStack:function(A){var G=dijit._activeStack;
dijit._activeStack=A;
for(var H=0;
H<Math.min(G.length,A.length);
H++){if(G[H]!=A[H]){break
}}for(var J=G.length-1;
J>=H;
J--){var I=dijit.byId(G[J]);
if(I){B.publish("widgetBlur",[I]);
if(I._onBlur){I._onBlur()
}}}for(var J=H;
J<A.length;
J++){var I=dijit.byId(A[J]);
if(I){B.publish("widgetFocus",[I]);
if(I._onFocus){I._onFocus()
}}}}});
B.addOnLoad(dijit.registerWin)
}if(!B._hasResource["dijit._base.manager"]){B._hasResource["dijit._base.manager"]=true;
B.provide("dijit._base.manager");
B.declare("dijit.WidgetSet",null,{constructor:function(){this._hash={}
},add:function(A){if(this._hash[A.id]){throw new Error("Tried to register widget with id=="+A.id+" but that id is already registered")
}this._hash[A.id]=A
},remove:function(A){delete this._hash[A]
},forEach:function(D){for(var A in this._hash){D(this._hash[A])
}},filter:function(A){var D=new dijit.WidgetSet();
this.forEach(function(C){if(A(C)){D.add(C)
}});
return D
},byId:function(A){return this._hash[A]
},byClass:function(A){return this.filter(function(D){return D.declaredClass==A
})
}});
dijit.registry=new dijit.WidgetSet();
dijit._widgetTypeCtr={};
dijit.getUniqueId=function(D){var A;
do{A=D+"_"+(dijit._widgetTypeCtr[D]!==undefined?++dijit._widgetTypeCtr[D]:dijit._widgetTypeCtr[D]=0)
}while(dijit.byId(A));
return A
};
if(B.isIE){B.addOnUnload(function(){dijit.registry.forEach(function(A){A.destroy()
})
})
}dijit.byId=function(A){return(B.isString(A))?dijit.registry.byId(A):A
};
dijit.byNode=function(A){return dijit.registry.byId(A.getAttribute("widgetId"))
};
dijit.getEnclosingWidget=function(A){while(A){if(A.getAttribute&&A.getAttribute("widgetId")){return dijit.registry.byId(A.getAttribute("widgetId"))
}A=A.parentNode
}return null
}
}if(!B._hasResource["dijit._base.place"]){B._hasResource["dijit._base.place"]=true;
B.provide("dijit._base.place");
dijit.getViewport=function(){var R=B.global;
var K=B.doc;
var M=0,A=0;
if(B.isMozilla){var N,O,P,Q;
if(K.body.clientWidth>K.documentElement.clientWidth){N=K.documentElement.clientWidth;
P=K.body.clientWidth
}else{P=K.documentElement.clientWidth;
N=K.body.clientWidth
}if(K.body.clientHeight>K.documentElement.clientHeight){O=K.documentElement.clientHeight;
Q=K.body.clientHeight
}else{Q=K.documentElement.clientHeight;
O=K.body.clientHeight
}M=(P>R.innerWidth)?N:P;
A=(Q>R.innerHeight)?O:Q
}else{if(!B.isOpera&&R.innerWidth){M=R.innerWidth;
A=R.innerHeight
}else{if(B.isIE&&K.documentElement&&K.documentElement.clientHeight){M=K.documentElement.clientWidth;
A=K.documentElement.clientHeight
}else{if(B.body().clientWidth){M=B.body().clientWidth;
A=B.body().clientHeight
}}}}var L=B._docScroll();
return{w:M,h:A,l:L.x,t:L.y}
};
dijit.placeOnScreen=function(G,A,H,I){var J=B.map(H,function(C){return{corner:C,pos:A}
});
return dijit._place(G,J)
};
dijit._place=function(e,g,h){var i=dijit.getViewport();
if(!e.parentNode||String(e.parentNode.tagName).toLowerCase()!="body"){B.body().appendChild(e)
}var b=null;
for(var A=0;
A<g.length;
A++){var c=g[A].corner;
var a=g[A].pos;
if(h){h(c)
}var d=e.style.display;
var f=e.style.visibility;
e.style.visibility="hidden";
e.style.display="";
var j=B.marginBox(e);
e.style.display=d;
e.style.visibility=f;
var T=(c.charAt(1)=="L"?a.x:Math.max(i.l,a.x-j.w)),U=(c.charAt(0)=="T"?a.y:Math.max(i.t,a.y-j.h)),V=(c.charAt(1)=="L"?Math.min(i.l+i.w,T+j.w):a.x),W=(c.charAt(0)=="T"?Math.min(i.t+i.h,U+j.h):a.y),X=V-T,Y=W-U,Z=(j.w-X)+(j.h-Y);
if(b==null||Z<b.overflow){b={corner:c,aroundCorner:g[A].aroundCorner,x:T,y:U,w:X,h:Y,overflow:Z}
}if(Z==0){break
}}e.style.left=b.x+"px";
e.style.top=b.y+"px";
return b
};
dijit.placeOnScreenAroundElement=function(T,L,N,O){L=B.byId(L);
var P=L.style.display;
L.style.display="";
var Q=L.offsetWidth;
var R=L.offsetHeight;
var S=B.coords(L,true);
L.style.display=P;
var A=[];
for(var M in N){A.push({aroundCorner:M,corner:N[M],pos:{x:S.x+(M.charAt(1)=="L"?0:Q),y:S.y+(M.charAt(0)=="T"?0:R)}})
}return dijit._place(T,A,O)
}
}if(!B._hasResource["dijit._base.window"]){B._hasResource["dijit._base.window"]=true;
B.provide("dijit._base.window");
dijit.getDocumentWindow=function(A){if(B.isSafari&&!A._parentWindow){var F=function(C){C.document._parentWindow=C;
for(var D=0;
D<C.frames.length;
D++){F(C.frames[D])
}};
F(window.top)
}if(B.isIE&&window!==document.parentWindow&&!A._parentWindow){A.parentWindow.execScript("document._parentWindow = window;","Javascript");
var E=A._parentWindow;
A._parentWindow=null;
return E
}return A._parentWindow||A.parentWindow||A.defaultView
}
}if(!B._hasResource["dijit._base.popup"]){B._hasResource["dijit._base.popup"]=true;
B.provide("dijit._base.popup");
dijit.popup=new function(){var A=[],E=1000,F=1;
this.open=function(C){var D=C.popup,O=C.orient||{BL:"TL",TL:"BL"},P=C.around,U=(C.around&&C.around.id)?(C.around.id+"_dropdown"):("popup_"+F++);
var R=B.doc.createElement("div");
R.id=U;
R.className="dijitPopup";
R.style.zIndex=E+A.length;
R.style.visibility="hidden";
if(C.parent){R.dijitPopupParent=C.parent.id
}B.body().appendChild(R);
D.domNode.style.display="";
R.appendChild(D.domNode);
var Q=new dijit.BackgroundIframe(R);
var S=P?dijit.placeOnScreenAroundElement(R,P,O,D.orient?B.hitch(D,"orient"):null):dijit.placeOnScreen(R,C,O=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"]);
R.style.visibility="visible";
var T=[];
function V(){for(var G=A.length-1;
G>0&&A[G].parent===A[G-1].widget;
G--){}return A[G]
}T.push(B.connect(R,"onkeypress",this,function(H){if(H.keyCode==B.keys.ESCAPE&&C.onCancel){C.onCancel()
}else{if(H.keyCode==B.keys.TAB){B.stopEvent(H);
var G=V();
if(G&&G.onCancel){G.onCancel()
}}}}));
if(D.onCancel){T.push(B.connect(D,"onCancel",null,C.onCancel))
}T.push(B.connect(D,D.onExecute?"onExecute":"onChange",null,function(){var G=V();
if(G&&G.onExecute){G.onExecute()
}}));
A.push({wrapper:R,iframe:Q,widget:D,parent:C.parent,onExecute:C.onExecute,onCancel:C.onCancel,onClose:C.onClose,handlers:T});
if(D.onOpen){D.onOpen(S)
}return S
};
this.close=function(L){while(B.some(A,function(G){return G.widget==L
})){var C=A.pop(),D=C.wrapper,K=C.iframe,M=C.widget,N=C.onClose;
if(M.onClose){M.onClose()
}B.forEach(C.handlers,B.disconnect);
if(!M||!M.domNode){return 
}B.style(M.domNode,"display","none");
B.body().appendChild(M.domNode);
K.destroy();
B._destroyElement(D);
if(N){N()
}}}
}();
dijit._frames=new function(){var A=[];
this.pop=function(){var F;
if(A.length){F=A.pop();
F.style.display=""
}else{if(B.isIE){var E="<iframe src='javascript:\"\"' style='position: absolute; left: 0px; top: 0px;z-index: -1; filter:Alpha(Opacity=\"0\");'>";
F=B.doc.createElement(E)
}else{var F=B.doc.createElement("iframe");
F.src='javascript:""';
F.className="dijitBackgroundIframe"
}F.tabIndex=-1;
B.body().appendChild(F)
}return F
};
this.push=function(D){D.style.display="";
if(B.isIE){D.style.removeExpression("width");
D.style.removeExpression("height")
}A.push(D)
}
}();
if(B.isIE&&B.isIE<7){B.addOnLoad(function(){var A=dijit._frames;
B.forEach([A.pop()],A.push)
})
}dijit.BackgroundIframe=function(A){if(!A.id){throw new Error("no id")
}if((B.isIE&&B.isIE<7)||(B.isFF&&B.isFF<3&&B.hasClass(B.body(),"dijit_a11y"))){var D=dijit._frames.pop();
A.appendChild(D);
if(B.isIE){D.style.setExpression("width","document.getElementById('"+A.id+"').offsetWidth");
D.style.setExpression("height","document.getElementById('"+A.id+"').offsetHeight")
}this.iframe=D
}};
B.extend(dijit.BackgroundIframe,{destroy:function(){if(this.iframe){dijit._frames.push(this.iframe);
delete this.iframe
}}})
}if(!B._hasResource["dijit._base.scroll"]){B._hasResource["dijit._base.scroll"]=true;
B.provide("dijit._base.scroll");
dijit.scrollIntoView=function(A){if(B.isIE){if(B.marginBox(A.parentNode).h<=A.parentNode.scrollHeight){A.scrollIntoView(false)
}}else{if(B.isMozilla){A.scrollIntoView(false)
}else{var F=A.parentNode;
var G=F.scrollTop+B.marginBox(F).h;
var H=A.offsetTop+B.marginBox(A).h;
if(G<H){F.scrollTop+=(H-G)
}else{if(F.scrollTop>A.offsetTop){F.scrollTop-=(F.scrollTop-A.offsetTop)
}}}}}
}if(!B._hasResource["dijit._base.sniff"]){B._hasResource["dijit._base.sniff"]=true;
B.provide("dijit._base.sniff");
(function(){var A=B;
var I=A.isIE;
var K=A.isOpera;
var M=Math.floor;
var L={dj_ie:I,dj_ie6:M(I)==6,dj_ie7:M(I)==7,dj_iequirks:I&&A.isQuirks,dj_opera:K,dj_opera8:M(K)==8,dj_opera9:M(K)==9,dj_khtml:A.isKhtml,dj_safari:A.isSafari,dj_gecko:A.isMozilla};
for(var J in L){if(L[J]){var N=B.doc.documentElement;
if(N.className){N.className+=" "+J
}else{N.className=J
}}}})()
}if(!B._hasResource["dijit._base.bidi"]){B._hasResource["dijit._base.bidi"]=true;
B.provide("dijit._base.bidi");
B.addOnLoad(function(){if(!B._isBodyLtr()){B.addClass(B.body(),"dijitRtl")
}})
}if(!B._hasResource["dijit._base.typematic"]){B._hasResource["dijit._base.typematic"]=true;
B.provide("dijit._base.typematic");
dijit.typematic={_fireEventAndReload:function(){this._timer=null;
this._callback(++this._count,this._node,this._evt);
this._currentTimeout=(this._currentTimeout<0)?this._initialDelay:((this._subsequentDelay>1)?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay));
this._timer=setTimeout(B.hitch(this,"_fireEventAndReload"),this._currentTimeout)
},trigger:function(M,K,L,N,J,A,I){if(J!=this._obj){this.stop();
this._initialDelay=I||500;
this._subsequentDelay=A||0.9;
this._obj=J;
this._evt=M;
this._node=L;
this._currentTimeout=-1;
this._count=-1;
this._callback=B.hitch(K,N);
this._fireEventAndReload()
}},stop:function(){if(this._timer){clearTimeout(this._timer);
this._timer=null
}if(this._obj){this._callback(-1,this._node,this._evt);
this._obj=null
}},addKeyListener:function(I,K,L,A,H,J){return[B.connect(I,"onkeypress",this,function(C){if(C.keyCode==K.keyCode&&(!K.charCode||K.charCode==C.charCode)&&(K.ctrlKey===undefined||K.ctrlKey==C.ctrlKey)&&(K.altKey===undefined||K.altKey==C.ctrlKey)&&(K.shiftKey===undefined||K.shiftKey==C.ctrlKey)){B.stopEvent(C);
dijit.typematic.trigger(K,L,I,A,K,H,J)
}else{if(dijit.typematic._obj==K){dijit.typematic.stop()
}}}),B.connect(I,"onkeyup",this,function(C){if(dijit.typematic._obj==K){dijit.typematic.stop()
}})]
},addMouseListener:function(I,A,H,J,K){var L=B.connect;
return[L(I,"mousedown",this,function(C){B.stopEvent(C);
dijit.typematic.trigger(C,A,I,H,I,J,K)
}),L(I,"mouseup",this,function(C){B.stopEvent(C);
dijit.typematic.stop()
}),L(I,"mouseout",this,function(C){B.stopEvent(C);
dijit.typematic.stop()
}),L(I,"mousemove",this,function(C){B.stopEvent(C)
}),L(I,"dblclick",this,function(C){B.stopEvent(C);
if(B.isIE){dijit.typematic.trigger(C,A,I,H,I,J,K);
setTimeout(dijit.typematic.stop,50)
}})]
},addListener:function(L,M,N,A,I,K,J){return this.addKeyListener(M,N,A,I,K,J).concat(this.addMouseListener(L,A,I,K,J))
}}
}if(!B._hasResource["dijit._base.wai"]){B._hasResource["dijit._base.wai"]=true;
B.provide("dijit._base.wai");
dijit.wai={onload:function(){var A=document.createElement("div");
A.id="a11yTestNode";
A.style.cssText='border: 1px solid;border-color:red green;position: absolute;height: 5px;top: -999px;background-image: url("'+B.moduleUrl("dijit","form/templates/blank.gif")+'");';
B.body().appendChild(A);
function D(){var G=B.getComputedStyle(A);
if(G){var C=G.backgroundImage;
var H=(G.borderTopColor==G.borderRightColor)||(C!=null&&(C=="none"||C=="url(invalid-url:)"));
B[H?"addClass":"removeClass"](B.body(),"dijit_a11y")
}}D();
if(B.isIE){setInterval(D,4000)
}}};
if(B.isIE||B.isMoz){B._loaders.unshift(dijit.wai.onload)
}B.mixin(dijit,{hasWaiRole:function(A){if(A.hasAttribute){return A.hasAttribute("role")
}else{return A.getAttribute("role")?true:false
}},getWaiRole:function(A){var E=A.getAttribute("role");
if(E){var F=E.indexOf(":");
return F==-1?E:E.substring(F+1)
}else{return""
}},setWaiRole:function(D,A){if(B.isFF&&B.isFF<3){D.setAttribute("role","wairole:"+A)
}else{D.setAttribute("role",A)
}},removeWaiRole:function(A){A.removeAttribute("role")
},hasWaiState:function(A,D){if(B.isFF&&B.isFF<3){return A.hasAttributeNS("http://www.w3.org/2005/07/aaa",D)
}else{if(A.hasAttribute){return A.hasAttribute("aria-"+D)
}else{return A.getAttribute("aria-"+D)?true:false
}}},getWaiState:function(E,A){if(B.isFF&&B.isFF<3){return E.getAttributeNS("http://www.w3.org/2005/07/aaa",A)
}else{var F=E.getAttribute("aria-"+A);
return F?F:""
}},setWaiState:function(A,E,F){if(B.isFF&&B.isFF<3){A.setAttributeNS("http://www.w3.org/2005/07/aaa","aaa:"+E,F)
}else{A.setAttribute("aria-"+E,F)
}},removeWaiState:function(A,D){if(B.isFF&&B.isFF<3){A.removeAttributeNS("http://www.w3.org/2005/07/aaa",D)
}else{A.removeAttribute("aria-"+D)
}}})
}if(!B._hasResource["dijit._base"]){B._hasResource["dijit._base"]=true;
B.provide("dijit._base")
}if(!B._hasResource["dojo.date.stamp"]){B._hasResource["dojo.date.stamp"]=true;
B.provide("dojo.date.stamp");
B.date.stamp.fromISOString=function(A,H){if(!B.date.stamp._isoRegExp){B.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/
}var I=B.date.stamp._isoRegExp.exec(A);
var K=null;
if(I){I.shift();
I[1]&&I[1]--;
I[6]&&(I[6]*=1000);
if(H){H=new Date(H);
B.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(C){return H["get"+C]()
}).forEach(function(C,D){if(I[D]===undefined){I[D]=C
}})
}K=new Date(I[0]||1970,I[1]||0,I[2]||0,I[3]||0,I[4]||0,I[5]||0,I[6]||0);
var J=0;
var L=I[7]&&I[7].charAt(0);
if(L!="Z"){J=((I[8]||0)*60)+(Number(I[9])||0);
if(L!="-"){J*=-1
}}if(L){J-=K.getTimezoneOffset()
}if(J){K.setTime(K.getTime()+J*60000)
}}return K
};
B.date.stamp.toISOString=function(O,P){var N=function(C){return(C<10)?"0"+C:C
};
P=P||{};
var Q=[];
var R=P.zulu?"getUTC":"get";
var S="";
if(P.selector!="time"){S=[O[R+"FullYear"](),N(O[R+"Month"]()+1),N(O[R+"Date"]())].join("-")
}Q.push(S);
if(P.selector!="date"){var T=[N(O[R+"Hours"]()),N(O[R+"Minutes"]()),N(O[R+"Seconds"]())].join(":");
var A=O[R+"Milliseconds"]();
if(P.milliseconds){T+="."+(A<100?"0":"")+N(A)
}if(P.zulu){T+="Z"
}else{if(P.selector!="time"){var L=O.getTimezoneOffset();
var M=Math.abs(L);
T+=(L>0?"-":"+")+N(Math.floor(M/60))+":"+N(M%60)
}}Q.push(T)
}return Q.join("T")
}
}if(!B._hasResource["dojo.parser"]){B._hasResource["dojo.parser"]=true;
B.provide("dojo.parser");
B.parser=new function(){var A=B;
function J(C){if(A.isString(C)){return"string"
}if(typeof C=="number"){return"number"
}if(typeof C=="boolean"){return"boolean"
}if(A.isFunction(C)){return"function"
}if(A.isArray(C)){return"array"
}if(C instanceof Date){return"date"
}if(C instanceof A._Url){return"url"
}return"object"
}function H(D,E){switch(E){case"string":return D;
case"number":return D.length?Number(D):NaN;
case"boolean":return typeof D=="boolean"?D:!(D.toLowerCase()=="false");
case"function":if(A.isFunction(D)){D=D.toString();
D=A.trim(D.substring(D.indexOf("{")+1,D.length-1))
}try{if(D.search(/[^\w\.]+/i)!=-1){D=A.parser._nameAnonFunc(new Function(D),this)
}return A.getObject(D,false)
}catch(C){return new Function()
}case"array":return D.split(/\s*,\s*/);
case"date":switch(D){case"":return new Date("");
case"now":return new Date();
default:return A.date.stamp.fromISOString(D)
}case"url":return A.baseUrl+D;
default:return A.fromJson(D)
}}var I={};
function G(C){if(!I[C]){var F=A.getObject(C);
if(!A.isFunction(F)){throw new Error("Could not load class '"+C+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?")
}var D=F.prototype;
var E={};
for(var M in D){if(M.charAt(0)=="_"){continue
}var N=D[M];
E[M]=J(N)
}I[C]={cls:F,params:E}
}return I[C]
}this._functionFromScript=function(C){var D="";
var F="";
var L=C.getAttribute("args");
if(L){A.forEach(L.split(/\s*,\s*/),function(N,K){D+="var "+N+" = arguments["+K+"]; "
})
}var E=C.getAttribute("with");
if(E&&E.length){A.forEach(E.split(/\s*,\s*/),function(K){D+="with("+K+"){";
F+="}"
})
}return new Function(D+C.innerHTML+F)
};
this.instantiate=function(C){var D=[];
A.forEach(C,function(g){if(!g){return 
}var h=g.getAttribute("dojoType");
if((!h)||(!h.length)){return 
}var j=G(h);
var E=j.cls;
var k=E._noScript||E.prototype._noScript;
var Y={};
var a=g.attributes;
for(var b in j.params){var c=a.getNamedItem(b);
if(!c||(!c.specified&&(!B.isIE||b.toLowerCase()!="value"))){continue
}var d=c.value;
switch(b){case"class":d=g.className;
break;
case"style":d=g.style&&g.style.cssText
}var f=j.params[b];
Y[b]=H(d,f)
}if(!k){var F=[],Z=[];
A.query("> script[type^='dojo/']",g).orphan().forEach(function(K){var L=K.getAttribute("event"),N=K.getAttribute("type"),M=A.parser._functionFromScript(K);
if(L){if(N=="dojo/connect"){F.push({event:L,func:M})
}else{Y[L]=M
}}else{Z.push(M)
}})
}var e=E.markupFactory;
if(!e&&E.prototype){e=E.prototype.markupFactory
}var i=e?e(Y,g,E):new E(Y,g);
D.push(i);
var l=g.getAttribute("jsId");
if(l){A.setObject(l,i)
}if(!k){B.forEach(F,function(K){B.connect(i,K.event,null,K.func)
});
B.forEach(Z,function(K){K.call(i)
})
}});
A.forEach(D,function(E){if(E&&(E.startup)&&((!E.getParent)||(!E.getParent()))){E.startup()
}});
return D
};
this.parse=function(E){var D=A.query("[dojoType]",E);
var C=this.instantiate(D);
return C
}
}();
(function(){var A=function(){if(djConfig.parseOnLoad==true){B.parser.parse()
}};
if(B.exists("dijit.wai.onload")&&(dijit.wai.onload===B._loaders[0])){B._loaders.splice(1,0,A)
}else{B._loaders.unshift(A)
}})();
B.parser._anonCtr=0;
B.parser._anon={};
B.parser._nameAnonFunc=function(H,L){var I="$joinpoint";
var J=(L||B.parser._anon);
if(B.isIE){var A=H.__dojoNameCache;
if(A&&J[A]===H){return H.__dojoNameCache
}}var K="__"+B.parser._anonCtr++;
while(typeof J[K]!="undefined"){K="__"+B.parser._anonCtr++
}J[K]=H;
return K
}
}if(!B._hasResource["dijit._Widget"]){B._hasResource["dijit._Widget"]=true;
B.provide("dijit._Widget");
B.declare("dijit._Widget",null,{id:"",lang:"",dir:"","class":"",style:"",title:"",srcNodeRef:null,domNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},postscript:function(D,A){this.create(D,A)
},create:function(A,G){this.srcNodeRef=B.byId(G);
this._connects=[];
this._attaches=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){this.id=this.srcNodeRef.id
}if(A){B.mixin(this,A)
}this.postMixInProperties();
if(!this.id){this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"))
}dijit.registry.add(this);
this.buildRendering();
if(this.domNode){for(var J in this.attributeMap){var H=this[this.attributeMap[J]||"domNode"];
var I=this[J];
if(typeof I!="object"&&(I!==""||(A&&A[J]))){switch(J){case"class":B.addClass(H,I);
break;
case"style":if(H.style.cssText){H.style.cssText+="; "+I
}else{H.style.cssText=I
}break;
default:H.setAttribute(J,I)
}}}}if(this.domNode){this.domNode.setAttribute("widgetId",this.id)
}this.postCreate();
if(this.srcNodeRef&&!this.srcNodeRef.parentNode){delete this.srcNodeRef
}},postMixInProperties:function(){},buildRendering:function(){this.domNode=this.srcNodeRef||B.doc.createElement("div")
},postCreate:function(){},startup:function(){},destroyRecursive:function(A){this.destroyDescendants();
this.destroy()
},destroy:function(A){this.uninitialize();
B.forEach(this._connects,function(D){B.forEach(D,B.disconnect)
});
this.destroyRendering(A);
dijit.registry.remove(this.id)
},destroyRendering:function(A){if(this.bgIframe){this.bgIframe.destroy();
delete this.bgIframe
}if(this.domNode){B._destroyElement(this.domNode);
delete this.domNode
}if(this.srcNodeRef){B._destroyElement(this.srcNodeRef);
delete this.srcNodeRef
}},destroyDescendants:function(){B.forEach(this.getDescendants(),function(A){A.destroy()
})
},uninitialize:function(){return false
},toString:function(){return"[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]"
},getDescendants:function(){var A=B.query("[widgetId]",this.domNode);
return A.map(dijit.byNode)
},nodesWithKeyClick:["input","button"],connect:function(H,J,A){var G=[];
if(J=="ondijitclick"){var I=this;
if(!this.nodesWithKeyClick[H.nodeName]){G.push(B.connect(H,"onkeydown",this,function(C){if(C.keyCode==B.keys.ENTER){return(B.isString(A))?I[A](C):A.call(I,C)
}else{if(C.keyCode==B.keys.SPACE){B.stopEvent(C)
}}}));
G.push(B.connect(H,"onkeyup",this,function(C){if(C.keyCode==B.keys.SPACE){return B.isString(A)?I[A](C):A.call(I,C)
}}))
}J="onclick"
}G.push(B.connect(H,J,this,A));
this._connects.push(G);
return G
},disconnect:function(A){for(var D=0;
D<this._connects.length;
D++){if(this._connects[D]==A){B.forEach(A,B.disconnect);
this._connects.splice(D,1);
return 
}}},isLeftToRight:function(){if(typeof this._ltr=="undefined"){this._ltr=B.getComputedStyle(this.domNode).direction!="rtl"
}return this._ltr
},isFocusable:function(){return this.focus&&(B.style(this.domNode,"display")!="none")
}})
}if(!B._hasResource["dojo.string"]){B._hasResource["dojo.string"]=true;
B.provide("dojo.string");
B.string.pad=function(A,H,G,J){var I=String(A);
if(!G){G="0"
}while(I.length<H){if(J){I+=G
}else{I=G+I
}}return I
};
B.string.substitute=function(F,A,G,H){return F.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(D,C,E){var J=B.getObject(C,false,A);
if(E){J=B.getObject(E,false,H)(J)
}if(G){J=G(J,C)
}return J.toString()
})
};
B.string.trim=function(A){A=A.replace(/^\s+/,"");
for(var D=A.length-1;
D>0;
D--){if(/\S/.test(A.charAt(D))){A=A.substring(0,D+1);
break
}}return A
}
}if(!B._hasResource["dijit._Templated"]){B._hasResource["dijit._Templated"]=true;
B.provide("dijit._Templated");
B.declare("dijit._Templated",null,{templateNode:null,templateString:null,templatePath:null,widgetsInTemplate:false,containerNode:null,_skipNodeCache:false,buildRendering:function(){var A=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var I;
if(B.isString(A)){var J=this.declaredClass,L=this;
var N=B.string.substitute(A,this,function(D,C){if(C.charAt(0)=="!"){D=L[C.substr(1)]
}if(typeof D=="undefined"){throw new Error(J+" template:"+C)
}if(!D){return""
}return C.charAt(0)=="!"?D:D.toString().replace(/"/g,"&quot;")
},this);
I=dijit._Templated._createNodesFromText(N)[0]
}else{I=A.cloneNode(true)
}this._attachTemplateNodes(I);
var K=this.srcNodeRef;
if(K&&K.parentNode){K.parentNode.replaceChild(I,K)
}this.domNode=I;
if(this.widgetsInTemplate){var M=B.parser.parse(I);
this._attachTemplateNodes(M,function(C,D){return C[D]
})
}this._fillContent(K)
},_fillContent:function(D){var A=this.containerNode;
if(D&&A){while(D.hasChildNodes()){A.appendChild(D.firstChild)
}}},_attachTemplateNodes:function(U,V){V=V||function(C,D){return C.getAttribute(D)
};
var Y=B.isArray(U)?U:(U.all||U.getElementsByTagName("*"));
var T=B.isArray(U)?0:-1;
for(;
T<Y.length;
T++){var c=(T==-1)?U:Y[T];
if(this.widgetsInTemplate&&V(c,"dojoType")){continue
}var d=V(c,"dojoAttachPoint");
if(d){var A,W=d.split(/\s*,\s*/);
while(A=W.shift()){if(B.isArray(this[A])){this[A].push(c)
}else{this[A]=c
}}}var X=V(c,"dojoAttachEvent");
if(X){var Z,a=X.split(/\s*,\s*/);
var R=B.trim;
while(Z=a.shift()){if(Z){var e=null;
if(Z.indexOf(":")!=-1){var f=Z.split(":");
Z=R(f[0]);
e=R(f[1])
}else{Z=R(Z)
}if(!e){e=Z
}this.connect(c,Z,e)
}}}var b=V(c,"waiRole");
if(b){dijit.setWaiRole(c,b)
}var S=V(c,"waiState");
if(S){B.forEach(S.split(/\s*,\s*/),function(D){if(D.indexOf("-")!=-1){var C=D.split("-");
dijit.setWaiState(c,C[0],C[1])
}})
}}}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(K,A,H){var I=dijit._Templated._templateCache;
var J=A||K;
var L=I[J];
if(L){return L
}if(!A){A=dijit._Templated._sanitizeTemplateString(B._getText(K))
}A=B.string.trim(A);
if(A.match(/\$\{([^\}]+)\}/g)||H){return(I[J]=A)
}else{return(I[J]=dijit._Templated._createNodesFromText(A)[0])
}};
dijit._Templated._sanitizeTemplateString=function(A){if(A){A=A.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var D=A.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(D){A=D[1]
}}else{A=""
}return A
};
if(B.isIE){B.addOnUnload(function(){var A=dijit._Templated._templateCache;
for(var F in A){var E=A[F];
if(!isNaN(E.nodeType)){B._destroyElement(E)
}delete A[F]
}})
}(function(){var A={cell:{re:/^<t[dh][\s\r\n>]/i,pre:"<table><tbody><tr>",post:"</tr></tbody></table>"},row:{re:/^<tr[\s\r\n>]/i,pre:"<table><tbody>",post:"</tbody></table>"},section:{re:/^<(thead|tbody|tfoot)[\s\r\n>]/i,pre:"<table>",post:"</table>"}};
var D;
dijit._Templated._createNodesFromText=function(L){if(!D){D=B.doc.createElement("div");
D.style.display="none";
B.body().appendChild(D)
}var P="none";
var Q=L.replace(/^\s+/,"");
for(var O in A){var N=A[O];
if(N.re.test(Q)){P=O;
L=N.pre+L+N.post;
break
}}D.innerHTML=L;
if(D.normalize){D.normalize()
}var R={cell:"tr",row:"tbody",section:"table"}[P];
var C=(typeof R!="undefined")?D.getElementsByTagName(R)[0]:D;
var M=[];
while(C.firstChild){M.push(C.removeChild(C.firstChild))
}D.innerHTML="";
return M
}
})();
B.extend(dijit._Widget,{dojoAttachEvent:"",dojoAttachPoint:"",waiRole:"",waiState:""})
}if(!B._hasResource["dijit._Container"]){B._hasResource["dijit._Container"]=true;
B.provide("dijit._Container");
B.declare("dijit._Contained",null,{getParent:function(){for(var E=this.domNode.parentNode;
E;
E=E.parentNode){var A=E.getAttribute&&E.getAttribute("widgetId");
if(A){var F=dijit.byId(A);
return F.isContainer?F:null
}}return null
},_getSibling:function(A){var F=this.domNode;
do{F=F[A+"Sibling"]
}while(F&&F.nodeType!=1);
if(!F){return null
}var E=F.getAttribute("widgetId");
return dijit.byId(E)
},getPreviousSibling:function(){return this._getSibling("previous")
},getNextSibling:function(){return this._getSibling("next")
}});
B.declare("dijit._Container",null,{isContainer:true,addChild:function(A,F){if(F===undefined){F="last"
}var G=this.containerNode||this.domNode;
if(F&&typeof F=="number"){var H=B.query("> [widgetid]",G);
if(H&&H.length>=F){G=H[F-1];
F="after"
}}B.place(A.domNode,G,F);
if(this._started&&!A._started){A.startup()
}},removeChild:function(D){var A=D.domNode;
A.parentNode.removeChild(A)
},_nextElement:function(A){do{A=A.nextSibling
}while(A&&A.nodeType!=1);
return A
},_firstElement:function(A){A=A.firstChild;
if(A&&A.nodeType!=1){A=this._nextElement(A)
}return A
},getChildren:function(){return B.query("> [widgetId]",this.containerNode||this.domNode).map(dijit.byNode)
},hasChildren:function(){var A=this.containerNode||this.domNode;
return !!this._firstElement(A)
},_getSiblingOfChild:function(H,F){var A=H.domNode;
var G=(F>0?"nextSibling":"previousSibling");
do{A=A[G]
}while(A&&(A.nodeType!=1||!dijit.byNode(A)));
return A?dijit.byNode(A):null
}});
B.declare("dijit._KeyNavContainer",[dijit._Container],{_keyNavCodes:{},connectKeyNavHandlers:function(I,J){var A=this._keyNavCodes={};
var G=B.hitch(this,this.focusPrev);
var H=B.hitch(this,this.focusNext);
B.forEach(I,function(C){A[C]=G
});
B.forEach(J,function(C){A[C]=H
});
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
if(B.isIE){this.connect(this.domNode,"onactivate","_onContainerFocus");
this.connect(this.domNode,"ondeactivate","_onContainerBlur")
}else{this.connect(this.domNode,"onfocus","_onContainerFocus");
this.connect(this.domNode,"onblur","_onContainerBlur")
}},startupKeyNavChildren:function(){B.forEach(this.getChildren(),B.hitch(this,"_setTabIndexMinusOne"))
},addChild:function(A,D){dijit._KeyNavContainer.superclass.addChild.apply(this,arguments);
this._setTabIndexMinusOne(A)
},focus:function(){this.focusFirstChild()
},focusFirstChild:function(){this.focusChild(this._getFirstFocusableChild())
},focusNext:function(){if(this.focusedChild&&this.focusedChild.hasNextFocalNode&&this.focusedChild.hasNextFocalNode()){this.focusedChild.focusNext();
return 
}var A=this._getNextFocusableChild(this.focusedChild,1);
if(A.getFocalNodes){this.focusChild(A,A.getFocalNodes()[0])
}else{this.focusChild(A)
}},focusPrev:function(){if(this.focusedChild&&this.focusedChild.hasPrevFocalNode&&this.focusedChild.hasPrevFocalNode()){this.focusedChild.focusPrev();
return 
}var A=this._getNextFocusableChild(this.focusedChild,-1);
if(A.getFocalNodes){var D=A.getFocalNodes();
this.focusChild(A,D[D.length-1])
}else{this.focusChild(A)
}},focusChild:function(D,A){if(D){if(this.focusedChild&&D!==this.focusedChild){this._onChildBlur(this.focusedChild)
}this.focusedChild=D;
if(A&&D.focusFocalNode){D.focusFocalNode(A)
}else{D.focus()
}}},_setTabIndexMinusOne:function(A){if(A.getFocalNodes){B.forEach(A.getFocalNodes(),function(D){D.setAttribute("tabIndex",-1)
})
}else{(A.focusNode||A.domNode).setAttribute("tabIndex",-1)
}},_onContainerFocus:function(D){this.domNode.setAttribute("tabIndex",-1);
if(D.target===this.domNode){this.focusFirstChild()
}else{var A=dijit.getEnclosingWidget(D.target);
if(A&&A.isFocusable()){this.focusedChild=A
}}},_onContainerBlur:function(A){if(this.tabIndex){this.domNode.setAttribute("tabIndex",this.tabIndex)
}},_onContainerKeypress:function(D){if(D.ctrlKey||D.altKey){return 
}var A=this._keyNavCodes[D.keyCode];
if(A){A();
B.stopEvent(D)
}},_onChildBlur:function(A){},_getFirstFocusableChild:function(){return this._getNextFocusableChild(null,1)
},_getNextFocusableChild:function(A,H){if(A){A=this._getSiblingOfChild(A,H)
}var F=this.getChildren();
for(var G=0;
G<F.length;
G++){if(!A){A=F[(H>0)?0:(F.length-1)]
}if(A.isFocusable()){return A
}A=this._getSiblingOfChild(A,H)
}}})
}if(!B._hasResource["dijit.layout._LayoutWidget"]){B._hasResource["dijit.layout._LayoutWidget"]=true;
B.provide("dijit.layout._LayoutWidget");
B.declare("dijit.layout._LayoutWidget",[dijit._Widget,dijit._Container,dijit._Contained],{isLayoutContainer:true,postCreate:function(){B.addClass(this.domNode,"dijitContainer")
},startup:function(){if(this._started){return 
}this._started=true;
if(this.getChildren){B.forEach(this.getChildren(),function(A){A.startup()
})
}if(!this.getParent||!this.getParent()){this.resize();
this.connect(window,"onresize",function(){this.resize()
})
}},resize:function(F){var E=this.domNode;
if(F){B.marginBox(E,F);
if(F.t){E.style.top=F.t+"px"
}if(F.l){E.style.left=F.l+"px"
}}var A=B.mixin(B.marginBox(E),F||{});
this._contentBox=dijit.layout.marginBox2contentBox(E,A);
this.layout()
},layout:function(){}});
dijit.layout.marginBox2contentBox=function(G,A){var I=B.getComputedStyle(G);
var H=B._getMarginExtents(G,I);
var J=B._getPadBorderExtents(G,I);
return{l:B._toPixelValue(G,I.paddingLeft),t:B._toPixelValue(G,I.paddingTop),w:A.w-(H.w+J.w),h:A.h-(H.h+J.h)}
};
(function(){var A=function(C){return C.substring(0,1).toUpperCase()+C.substring(1)
};
var D=function(F,C){F.resize?F.resize(C):B.marginBox(F.domNode,C);
B.mixin(F,B.marginBox(F.domNode));
B.mixin(F,C)
};
dijit.layout.layoutChildren=function(H,G,C){G=B.mixin({},G);
B.addClass(H,"dijitLayoutContainer");
C=B.filter(C,function(E){return E.layoutAlign!="client"
}).concat(B.filter(C,function(E){return E.layoutAlign=="client"
}));
B.forEach(C,function(L){var E=L.domNode,F=L.layoutAlign;
var K=E.style;
K.left=G.l+"px";
K.top=G.t+"px";
K.bottom=K.right="auto";
B.addClass(E,"dijitAlign"+A(F));
if(F=="top"||F=="bottom"){D(L,{w:G.w});
G.h-=L.h;
if(F=="top"){G.t+=L.h
}else{K.top=G.t+G.h+"px"
}}else{if(F=="left"||F=="right"){D(L,{h:G.h});
G.w-=L.w;
if(F=="left"){G.l+=L.w
}else{K.left=G.l+G.w+"px"
}}else{if(F=="client"){D(L,G)
}}}})
}
})()
}if(!B._hasResource["dijit.form._FormWidget"]){B._hasResource["dijit.form._FormWidget"]=true;
B.provide("dijit.form._FormWidget");
B.declare("dijit.form._FormWidget",[dijit._Widget,dijit._Templated],{baseClass:"",value:"",name:"",id:"",alt:"",type:"text",tabIndex:"0",disabled:false,intermediateChanges:false,attributeMap:B.mixin(B.clone(dijit._Widget.prototype.attributeMap),{id:"focusNode",tabIndex:"focusNode",alt:"focusNode"}),setDisabled:function(A){this.domNode.disabled=this.disabled=A;
if(this.focusNode){this.focusNode.disabled=A
}if(A){this._hovering=false;
this._active=false
}dijit.setWaiState(this.focusNode||this.domNode,"disabled",A);
this._setStateClass()
},_onMouse:function(F){var A=F.target;
if(A&&A.getAttribute){this.stateModifier=A.getAttribute("stateModifier")||""
}if(!this.disabled){switch(F.type){case"mouseenter":case"mouseover":this._hovering=true;
break;
case"mouseout":case"mouseleave":this._hovering=false;
break;
case"mousedown":this._active=true;
var H=this;
var G=this.connect(B.body(),"onmouseup",function(){H._active=false;
H._setStateClass();
H.disconnect(G)
});
break
}this._setStateClass()
}},isFocusable:function(){return !this.disabled&&(B.style(this.domNode,"display")!="none")
},focus:function(){dijit.focus(this.focusNode)
},_setStateClass:function(){if(!("staticClass" in this)){this.staticClass=(this.stateNode||this.domNode).className
}var A=[this.baseClass];
function D(C){A=A.concat(B.map(A,function(F){return F+C
}))
}if(this.checked){D("Checked")
}if(this.state){D(this.state)
}if(this.selected){D("Selected")
}if(this.disabled){D("Disabled")
}else{if(this._active){D(this.stateModifier+"Active")
}else{if(this._focused){D("Focused")
}if((this.stateModifier||!this._focused)&&this._hovering){D(this.stateModifier+"Hover")
}}}(this.stateNode||this.domNode).className=this.staticClass+" "+A.join(" ")
},onChange:function(A){},postCreate:function(){this.setValue(this.value,null);
this.setDisabled(this.disabled);
this._setStateClass()
},setValue:function(D,A){this._lastValue=D;
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",this.forWaiValuenow());
if(A===undefined){A=true
}if(this._lastValueReported==undefined&&A===null){this._lastValueReported=D
}if((this.intermediateChanges||A)&&((D&&D.toString)?D.toString():D)!==((this._lastValueReported&&this._lastValueReported.toString)?this._lastValueReported.toString():this._lastValueReported)){this._lastValueReported=D;
this.onChange(D)
}},getValue:function(){return this._lastValue
},undo:function(){this.setValue(this._lastValueReported,false)
},_onKeyPress:function(E){if(E.keyCode==B.keys.ESCAPE&&!E.shiftKey&&!E.ctrlKey&&!E.altKey){var F=this.getValue();
var A=this._lastValueReported;
if((typeof A!="undefined")&&((F!==null&&F.toString)?F.toString():null)!==A.toString()){this.undo();
B.stopEvent(E);
return false
}}return true
},forWaiValuenow:function(){return this.getValue()
}})
}if(!B._hasResource["dijit.dijit"]){B._hasResource["dijit.dijit"]=true;
B.provide("dijit.dijit")
}}});