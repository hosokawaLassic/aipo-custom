dojo._xdResourceLoaded({depends:[["provide","dijit._base.focus"],["provide","dijit._base.manager"],["provide","dijit._base.place"],["provide","dijit._base.window"],["provide","dijit._base.popup"],["provide","dijit._base.scroll"],["provide","dijit._base.sniff"],["provide","dijit._base.bidi"],["provide","dijit._base.typematic"],["provide","dijit._base.wai"],["provide","dijit._base"],["provide","dojo.date.stamp"],["provide","dojo.parser"],["provide","dijit._Widget"],["provide","dojo.string"],["provide","dijit._Templated"],["provide","dijit._Container"],["provide","dijit.layout._LayoutWidget"],["provide","dijit.form._FormWidget"],["provide","dijit.dijit"]],defineResource:function(B){if(!B._hasResource["dijit._base.focus"]){B._hasResource["dijit._base.focus"]=true;
B.provide("dijit._base.focus");
B.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){var A=B.global;
var F=B.doc;
if(F.selection){return !F.selection.createRange().text
}else{if(A.getSelection){var E=A.getSelection();
if(B.isString(E)){return !E
}else{return E.isCollapsed||!E.toString()
}}}},getBookmark:function(){var A,E=B.doc.selection;
if(E){var F=E.createRange();
if(E.type.toUpperCase()=="CONTROL"){A=F.length?B._toArray(F):null
}else{A=F.getBookmark()
}}else{if(B.global.getSelection){E=B.global.getSelection();
if(E){var F=E.getRangeAt(0);
A=F.cloneRange()
}}else{console.debug("No idea how to store the current selection for this browser!")
}}return A
},moveToBookmark:function(A){var H=B.doc;
if(H.selection){var G;
if(B.isArray(A)){G=H.body.createControlRange();
B.forEach(A,G.addElement)
}else{G=H.selection.createRange();
G.moveToBookmark(A)
}G.select()
}else{var F=B.global.getSelection&&B.global.getSelection();
if(F&&F.removeAllRanges){F.removeAllRanges();
F.addRange(A)
}else{console.debug("No idea how to restore selection for this browser!")
}}},getFocus:function(A,D){return{node:A&&B.isDescendant(dijit._curFocus,A.domNode)?dijit._prevFocus:dijit._curFocus,bookmark:!B.withGlobal(D||B.global,dijit.isCollapsed)?B.withGlobal(D||B.global,dijit.getBookmark):null,openedForWindow:D}
},focus:function(I){if(!I){return 
}var J="node" in I?I.node:I,K=I.bookmark,L=I.openedForWindow;
if(J){var A=(J.tagName.toLowerCase()=="iframe")?J.contentWindow:J;
if(A&&A.focus){try{A.focus()
}catch(H){}}dijit._onFocusNode(J)
}if(K&&B.withGlobal(L||B.global,dijit.isCollapsed)){if(L){L.focus()
}try{B.withGlobal(L||B.global,moveToBookmark,null,[K])
}catch(H){}}},_activeStack:[],registerWin:function(A){if(!A){A=window
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
}},_setStack:function(J){var A=dijit._activeStack;
dijit._activeStack=J;
for(var H=0;
H<Math.min(A.length,J.length);
H++){if(A[H]!=J[H]){break
}}for(var I=A.length-1;
I>=H;
I--){var G=dijit.byId(A[I]);
if(G){B.publish("widgetBlur",[G]);
if(G._onBlur){G._onBlur()
}}}for(var I=H;
I<J.length;
I++){var G=dijit.byId(J[I]);
if(G){B.publish("widgetFocus",[G]);
if(G._onFocus){G._onFocus()
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
dijit.getViewport=function(){var L=B.global;
var O=B.doc;
var N=0,A=0;
if(B.isMozilla){var M,R,Q,K;
if(O.body.clientWidth>O.documentElement.clientWidth){M=O.documentElement.clientWidth;
Q=O.body.clientWidth
}else{Q=O.documentElement.clientWidth;
M=O.body.clientWidth
}if(O.body.clientHeight>O.documentElement.clientHeight){R=O.documentElement.clientHeight;
K=O.body.clientHeight
}else{K=O.documentElement.clientHeight;
R=O.body.clientHeight
}N=(Q>L.innerWidth)?M:Q;
A=(K>L.innerHeight)?R:K
}else{if(!B.isOpera&&L.innerWidth){N=L.innerWidth;
A=L.innerHeight
}else{if(B.isIE&&O.documentElement&&O.documentElement.clientHeight){N=O.documentElement.clientWidth;
A=O.documentElement.clientHeight
}else{if(B.body().clientWidth){N=B.body().clientWidth;
A=B.body().clientHeight
}}}}var P=B._docScroll();
return{w:N,h:A,l:P.x,t:P.y}
};
dijit.placeOnScreen=function(I,A,J,H){var G=B.map(J,function(C){return{corner:C,pos:A}
});
return dijit._place(I,G)
};
dijit._place=function(V,Y,c){var b=dijit.getViewport();
if(!V.parentNode||String(V.parentNode.tagName).toLowerCase()!="body"){B.body().appendChild(V)
}var f=null;
for(var U=0;
U<Y.length;
U++){var d=Y[U].corner;
var e=Y[U].pos;
if(c){c(d)
}var Z=V.style.display;
var i=V.style.visibility;
V.style.visibility="hidden";
V.style.display="";
var j=B.marginBox(V);
V.style.display=Z;
V.style.visibility=i;
var A=(d.charAt(1)=="L"?e.x:Math.max(b.l,e.x-j.w)),T=(d.charAt(0)=="T"?e.y:Math.max(b.t,e.y-j.h)),g=(d.charAt(1)=="L"?Math.min(b.l+b.w,A+j.w):e.x),h=(d.charAt(0)=="T"?Math.min(b.t+b.h,T+j.h):e.y),X=g-A,a=h-T,W=(j.w-X)+(j.h-a);
if(f==null||W<f.overflow){f={corner:d,aroundCorner:Y[U].aroundCorner,x:A,y:T,w:X,h:a,overflow:W}
}if(W==0){break
}}V.style.left=f.x+"px";
V.style.top=f.y+"px";
return f
};
dijit.placeOnScreenAroundElement=function(L,S,R,A){S=B.byId(S);
var P=S.style.display;
S.style.display="";
var O=S.offsetWidth;
var T=S.offsetHeight;
var Q=B.coords(S,true);
S.style.display=P;
var N=[];
for(var M in R){N.push({aroundCorner:M,corner:R[M],pos:{x:Q.x+(M.charAt(1)=="L"?0:O),y:Q.y+(M.charAt(0)=="T"?0:T)}})
}return dijit._place(L,N,A)
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
dijit.popup=new function(){var F=[],E=1000,A=1;
this.open=function(D){var O=D.popup,P=D.orient||{BL:"TL",TL:"BL"},C=D.around,T=(D.around&&D.around.id)?(D.around.id+"_dropdown"):("popup_"+A++);
var U=B.doc.createElement("div");
U.id=T;
U.className="dijitPopup";
U.style.zIndex=E+F.length;
U.style.visibility="hidden";
if(D.parent){U.dijitPopupParent=D.parent.id
}B.body().appendChild(U);
O.domNode.style.display="";
U.appendChild(O.domNode);
var Q=new dijit.BackgroundIframe(U);
var R=C?dijit.placeOnScreenAroundElement(U,C,P,O.orient?B.hitch(O,"orient"):null):dijit.placeOnScreen(U,D,P=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"]);
U.style.visibility="visible";
var S=[];
function V(){for(var G=F.length-1;
G>0&&F[G].parent===F[G-1].widget;
G--){}return F[G]
}S.push(B.connect(U,"onkeypress",this,function(H){if(H.keyCode==B.keys.ESCAPE&&D.onCancel){D.onCancel()
}else{if(H.keyCode==B.keys.TAB){B.stopEvent(H);
var G=V();
if(G&&G.onCancel){G.onCancel()
}}}}));
if(O.onCancel){S.push(B.connect(O,"onCancel",null,D.onCancel))
}S.push(B.connect(O,O.onExecute?"onExecute":"onChange",null,function(){var G=V();
if(G&&G.onExecute){G.onExecute()
}}));
F.push({wrapper:U,iframe:Q,widget:O,parent:D.parent,onExecute:D.onExecute,onCancel:D.onCancel,onClose:D.onClose,handlers:S});
if(O.onOpen){O.onOpen(R)
}return R
};
this.close=function(M){while(B.some(F,function(G){return G.widget==M
})){var D=F.pop(),C=D.wrapper,L=D.iframe,K=D.widget,N=D.onClose;
if(K.onClose){K.onClose()
}B.forEach(D.handlers,B.disconnect);
if(!K||!K.domNode){return 
}B.style(K.domNode,"display","none");
B.body().appendChild(K.domNode);
L.destroy();
B._destroyElement(C);
if(N){N()
}}}
}();
dijit._frames=new function(){var A=[];
this.pop=function(){var E;
if(A.length){E=A.pop();
E.style.display=""
}else{if(B.isIE){var F="<iframe src='javascript:\"\"' style='position: absolute; left: 0px; top: 0px;z-index: -1; filter:Alpha(Opacity=\"0\");'>";
E=B.doc.createElement(F)
}else{var E=B.doc.createElement("iframe");
E.src='javascript:""';
E.className="dijitBackgroundIframe"
}E.tabIndex=-1;
B.body().appendChild(E)
}return E
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
dijit.scrollIntoView=function(F){if(B.isIE){if(B.marginBox(F.parentNode).h<=F.parentNode.scrollHeight){F.scrollIntoView(false)
}}else{if(B.isMozilla){F.scrollIntoView(false)
}else{var H=F.parentNode;
var G=H.scrollTop+B.marginBox(H).h;
var A=F.offsetTop+B.marginBox(F).h;
if(G<A){H.scrollTop+=(A-G)
}else{if(H.scrollTop>F.offsetTop){H.scrollTop-=(H.scrollTop-F.offsetTop)
}}}}}
}if(!B._hasResource["dijit._base.sniff"]){B._hasResource["dijit._base.sniff"]=true;
B.provide("dijit._base.sniff");
(function(){var A=B;
var I=A.isIE;
var N=A.isOpera;
var M=Math.floor;
var K={dj_ie:I,dj_ie6:M(I)==6,dj_ie7:M(I)==7,dj_iequirks:I&&A.isQuirks,dj_opera:N,dj_opera8:M(N)==8,dj_opera9:M(N)==9,dj_khtml:A.isKhtml,dj_safari:A.isSafari,dj_gecko:A.isMozilla};
for(var J in K){if(K[J]){var L=B.doc.documentElement;
if(L.className){L.className+=" "+J
}else{L.className=J
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
},trigger:function(N,A,L,I,J,M,K){if(J!=this._obj){this.stop();
this._initialDelay=K||500;
this._subsequentDelay=M||0.9;
this._obj=J;
this._evt=N;
this._node=L;
this._currentTimeout=-1;
this._count=-1;
this._callback=B.hitch(A,I);
this._fireEventAndReload()
}},stop:function(){if(this._timer){clearTimeout(this._timer);
this._timer=null
}if(this._obj){this._callback(-1,this._node,this._evt);
this._obj=null
}},addKeyListener:function(J,L,A,H,K,I){return[B.connect(J,"onkeypress",this,function(C){if(C.keyCode==L.keyCode&&(!L.charCode||L.charCode==C.charCode)&&(L.ctrlKey===undefined||L.ctrlKey==C.ctrlKey)&&(L.altKey===undefined||L.altKey==C.ctrlKey)&&(L.shiftKey===undefined||L.shiftKey==C.ctrlKey)){B.stopEvent(C);
dijit.typematic.trigger(L,A,J,H,L,K,I)
}else{if(dijit.typematic._obj==L){dijit.typematic.stop()
}}}),B.connect(J,"onkeyup",this,function(C){if(dijit.typematic._obj==L){dijit.typematic.stop()
}})]
},addMouseListener:function(J,A,H,K,I){var L=B.connect;
return[L(J,"mousedown",this,function(C){B.stopEvent(C);
dijit.typematic.trigger(C,A,J,H,J,K,I)
}),L(J,"mouseup",this,function(C){B.stopEvent(C);
dijit.typematic.stop()
}),L(J,"mouseout",this,function(C){B.stopEvent(C);
dijit.typematic.stop()
}),L(J,"mousemove",this,function(C){B.stopEvent(C)
}),L(J,"dblclick",this,function(C){B.stopEvent(C);
if(B.isIE){dijit.typematic.trigger(C,A,J,H,J,K,I);
setTimeout(dijit.typematic.stop,50)
}})]
},addListener:function(K,J,N,A,I,M,L){return this.addKeyListener(J,N,A,I,M,L).concat(this.addMouseListener(K,A,I,M,L))
}}
}if(!B._hasResource["dijit._base.wai"]){B._hasResource["dijit._base.wai"]=true;
B.provide("dijit._base.wai");
dijit.wai={onload:function(){var A=document.createElement("div");
A.id="a11yTestNode";
A.style.cssText='border: 1px solid;border-color:red green;position: absolute;height: 5px;top: -999px;background-image: url("'+B.moduleUrl("dijit","form/templates/blank.gif")+'");';
B.body().appendChild(A);
function D(){var G=B.getComputedStyle(A);
if(G){var H=G.backgroundImage;
var C=(G.borderTopColor==G.borderRightColor)||(H!=null&&(H=="none"||H=="url(invalid-url:)"));
B[C?"addClass":"removeClass"](B.body(),"dijit_a11y")
}}D();
if(B.isIE){setInterval(D,4000)
}}};
if(B.isIE||B.isMoz){B._loaders.unshift(dijit.wai.onload)
}B.mixin(dijit,{hasWaiRole:function(A){if(A.hasAttribute){return A.hasAttribute("role")
}else{return A.getAttribute("role")?true:false
}},getWaiRole:function(E){var A=E.getAttribute("role");
if(A){var F=A.indexOf(":");
return F==-1?A:A.substring(F+1)
}else{return""
}},setWaiRole:function(D,A){if(B.isFF&&B.isFF<3){D.setAttribute("role","wairole:"+A)
}else{D.setAttribute("role",A)
}},removeWaiRole:function(A){A.removeAttribute("role")
},hasWaiState:function(D,A){if(B.isFF&&B.isFF<3){return D.hasAttributeNS("http://www.w3.org/2005/07/aaa",A)
}else{if(D.hasAttribute){return D.hasAttribute("aria-"+A)
}else{return D.getAttribute("aria-"+A)?true:false
}}},getWaiState:function(F,A){if(B.isFF&&B.isFF<3){return F.getAttributeNS("http://www.w3.org/2005/07/aaa",A)
}else{var E=F.getAttribute("aria-"+A);
return E?E:""
}},setWaiState:function(F,A,E){if(B.isFF&&B.isFF<3){F.setAttributeNS("http://www.w3.org/2005/07/aaa","aaa:"+A,E)
}else{F.setAttribute("aria-"+A,E)
}},removeWaiState:function(D,A){if(B.isFF&&B.isFF<3){D.removeAttributeNS("http://www.w3.org/2005/07/aaa",A)
}else{D.removeAttribute("aria-"+A)
}}})
}if(!B._hasResource["dijit._base"]){B._hasResource["dijit._base"]=true;
B.provide("dijit._base")
}if(!B._hasResource["dojo.date.stamp"]){B._hasResource["dojo.date.stamp"]=true;
B.provide("dojo.date.stamp");
B.date.stamp.fromISOString=function(H,K){if(!B.date.stamp._isoRegExp){B.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/
}var J=B.date.stamp._isoRegExp.exec(H);
var L=null;
if(J){J.shift();
J[1]&&J[1]--;
J[6]&&(J[6]*=1000);
if(K){K=new Date(K);
B.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(C){return K["get"+C]()
}).forEach(function(C,D){if(J[D]===undefined){J[D]=C
}})
}L=new Date(J[0]||1970,J[1]||0,J[2]||0,J[3]||0,J[4]||0,J[5]||0,J[6]||0);
var A=0;
var I=J[7]&&J[7].charAt(0);
if(I!="Z"){A=((J[8]||0)*60)+(Number(J[9])||0);
if(I!="-"){A*=-1
}}if(I){A-=L.getTimezoneOffset()
}if(A){L.setTime(L.getTime()+A*60000)
}}return L
};
B.date.stamp.toISOString=function(R,N){var O=function(C){return(C<10)?"0"+C:C
};
N=N||{};
var S=[];
var Q=N.zulu?"getUTC":"get";
var A="";
if(N.selector!="time"){A=[R[Q+"FullYear"](),O(R[Q+"Month"]()+1),O(R[Q+"Date"]())].join("-")
}S.push(A);
if(N.selector!="date"){var L=[O(R[Q+"Hours"]()),O(R[Q+"Minutes"]()),O(R[Q+"Seconds"]())].join(":");
var M=R[Q+"Milliseconds"]();
if(N.milliseconds){L+="."+(M<100?"0":"")+O(M)
}if(N.zulu){L+="Z"
}else{if(N.selector!="time"){var P=R.getTimezoneOffset();
var T=Math.abs(P);
L+=(P>0?"-":"+")+O(Math.floor(T/60))+":"+O(T%60)
}}S.push(L)
}return S.join("T")
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
}function I(D,E){switch(E){case"string":return D;
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
}}var G={};
function H(F){if(!G[F]){var N=A.getObject(F);
if(!A.isFunction(N)){throw new Error("Could not load class '"+F+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?")
}var E=N.prototype;
var C={};
for(var M in E){if(M.charAt(0)=="_"){continue
}var D=E[M];
C[M]=J(D)
}G[F]={cls:N,params:C}
}return G[F]
}this._functionFromScript=function(F){var E="";
var C="";
var L=F.getAttribute("args");
if(L){A.forEach(L.split(/\s*,\s*/),function(N,K){E+="var "+N+" = arguments["+K+"]; "
})
}var D=F.getAttribute("with");
if(D&&D.length){A.forEach(D.split(/\s*,\s*/),function(K){E+="with("+K+"){";
C+="}"
})
}return new Function(E+F.innerHTML+C)
};
this.instantiate=function(D){var C=[];
A.forEach(D,function(j){if(!j){return 
}var b=j.getAttribute("dojoType");
if((!b)||(!b.length)){return 
}var e=H(b);
var d=e.cls;
var l=d._noScript||d.prototype._noScript;
var i={};
var g=j.attributes;
for(var k in e.params){var F=g.getNamedItem(k);
if(!F||(!F.specified&&(!B.isIE||k.toLowerCase()!="value"))){continue
}var Z=F.value;
switch(k){case"class":Z=j.className;
break;
case"style":Z=j.style&&j.style.cssText
}var f=e.params[k];
i[k]=I(Z,f)
}if(!l){var h=[],E=[];
A.query("> script[type^='dojo/']",j).orphan().forEach(function(N){var L=N.getAttribute("event"),M=N.getAttribute("type"),K=A.parser._functionFromScript(N);
if(L){if(M=="dojo/connect"){h.push({event:L,func:K})
}else{i[L]=K
}}else{E.push(K)
}})
}var a=d.markupFactory;
if(!a&&d.prototype){a=d.prototype.markupFactory
}var Y=a?a(i,j,d):new d(i,j);
C.push(Y);
var c=j.getAttribute("jsId");
if(c){A.setObject(c,Y)
}if(!l){B.forEach(h,function(K){B.connect(Y,K.event,null,K.func)
});
B.forEach(E,function(K){K.call(Y)
})
}});
A.forEach(C,function(E){if(E&&(E.startup)&&((!E.getParent)||(!E.getParent()))){E.startup()
}});
return C
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
B.parser._nameAnonFunc=function(L,H){var I="$joinpoint";
var J=(H||B.parser._anon);
if(B.isIE){var A=L.__dojoNameCache;
if(A&&J[A]===L){return L.__dojoNameCache
}}var K="__"+B.parser._anonCtr++;
while(typeof J[K]!="undefined"){K="__"+B.parser._anonCtr++
}J[K]=L;
return K
}
}if(!B._hasResource["dijit._Widget"]){B._hasResource["dijit._Widget"]=true;
B.provide("dijit._Widget");
B.declare("dijit._Widget",null,{id:"",lang:"",dir:"","class":"",style:"",title:"",srcNodeRef:null,domNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},postscript:function(A,D){this.create(A,D)
},create:function(A,I){this.srcNodeRef=B.byId(I);
this._connects=[];
this._attaches=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){this.id=this.srcNodeRef.id
}if(A){B.mixin(this,A)
}this.postMixInProperties();
if(!this.id){this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"))
}dijit.registry.add(this);
this.buildRendering();
if(this.domNode){for(var J in this.attributeMap){var G=this[this.attributeMap[J]||"domNode"];
var H=this[J];
if(typeof H!="object"&&(H!==""||(A&&A[J]))){switch(J){case"class":B.addClass(G,H);
break;
case"style":if(G.style.cssText){G.style.cssText+="; "+H
}else{G.style.cssText=H
}break;
default:G.setAttribute(J,H)
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
},nodesWithKeyClick:["input","button"],connect:function(G,H,A){var I=[];
if(H=="ondijitclick"){var J=this;
if(!this.nodesWithKeyClick[G.nodeName]){I.push(B.connect(G,"onkeydown",this,function(C){if(C.keyCode==B.keys.ENTER){return(B.isString(A))?J[A](C):A.call(J,C)
}else{if(C.keyCode==B.keys.SPACE){B.stopEvent(C)
}}}));
I.push(B.connect(G,"onkeyup",this,function(C){if(C.keyCode==B.keys.SPACE){return B.isString(A)?J[A](C):A.call(J,C)
}}))
}H="onclick"
}I.push(B.connect(G,H,this,A));
this._connects.push(I);
return I
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
B.string.substitute=function(F,A,G,H){return F.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(J,E,C){var D=B.getObject(E,false,A);
if(C){D=B.getObject(C,false,H)(D)
}if(G){D=G(D,E)
}return D.toString()
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
B.declare("dijit._Templated",null,{templateNode:null,templateString:null,templatePath:null,widgetsInTemplate:false,containerNode:null,_skipNodeCache:false,buildRendering:function(){var K=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var J;
if(B.isString(K)){var L=this.declaredClass,A=this;
var N=B.string.substitute(K,this,function(C,D){if(D.charAt(0)=="!"){C=A[D.substr(1)]
}if(typeof C=="undefined"){throw new Error(L+" template:"+D)
}if(!C){return""
}return D.charAt(0)=="!"?C:C.toString().replace(/"/g,"&quot;")
},this);
J=dijit._Templated._createNodesFromText(N)[0]
}else{J=K.cloneNode(true)
}this._attachTemplateNodes(J);
var I=this.srcNodeRef;
if(I&&I.parentNode){I.parentNode.replaceChild(J,I)
}this.domNode=J;
if(this.widgetsInTemplate){var M=B.parser.parse(J);
this._attachTemplateNodes(M,function(C,D){return C[D]
})
}this._fillContent(I)
},_fillContent:function(A){var D=this.containerNode;
if(A&&D){while(A.hasChildNodes()){D.appendChild(A.firstChild)
}}},_attachTemplateNodes:function(f,c){c=c||function(C,D){return C.getAttribute(D)
};
var R=B.isArray(f)?f:(f.all||f.getElementsByTagName("*"));
var Y=B.isArray(f)?0:-1;
for(;
Y<R.length;
Y++){var A=(Y==-1)?f:R[Y];
if(this.widgetsInTemplate&&c(A,"dojoType")){continue
}var e=c(A,"dojoAttachPoint");
if(e){var X,V=e.split(/\s*,\s*/);
while(X=V.shift()){if(B.isArray(this[X])){this[X].push(A)
}else{this[X]=A
}}}var Z=c(A,"dojoAttachEvent");
if(Z){var S,U=Z.split(/\s*,\s*/);
var d=B.trim;
while(S=U.shift()){if(S){var b=null;
if(S.indexOf(":")!=-1){var T=S.split(":");
S=d(T[0]);
b=d(T[1])
}else{S=d(S)
}if(!b){b=S
}this.connect(A,S,b)
}}}var a=c(A,"waiRole");
if(a){dijit.setWaiRole(A,a)
}var W=c(A,"waiState");
if(W){B.forEach(W.split(/\s*,\s*/),function(C){if(C.indexOf("-")!=-1){var D=C.split("-");
dijit.setWaiState(A,D[0],D[1])
}})
}}}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(J,I,A){var H=dijit._Templated._templateCache;
var L=I||J;
var K=H[L];
if(K){return K
}if(!I){I=dijit._Templated._sanitizeTemplateString(B._getText(J))
}I=B.string.trim(I);
if(I.match(/\$\{([^\}]+)\}/g)||A){return(H[L]=I)
}else{return(H[L]=dijit._Templated._createNodesFromText(I)[0])
}};
dijit._Templated._sanitizeTemplateString=function(D){if(D){D=D.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var A=D.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(A){D=A[1]
}}else{D=""
}return D
};
if(B.isIE){B.addOnUnload(function(){var F=dijit._Templated._templateCache;
for(var E in F){var A=F[E];
if(!isNaN(A.nodeType)){B._destroyElement(A)
}delete F[E]
}})
}(function(){var A={cell:{re:/^<t[dh][\s\r\n>]/i,pre:"<table><tbody><tr>",post:"</tr></tbody></table>"},row:{re:/^<tr[\s\r\n>]/i,pre:"<table><tbody>",post:"</tbody></table>"},section:{re:/^<(thead|tbody|tfoot)[\s\r\n>]/i,pre:"<table>",post:"</table>"}};
var D;
dijit._Templated._createNodesFromText=function(C){if(!D){D=B.doc.createElement("div");
D.style.display="none";
B.body().appendChild(D)
}var O="none";
var Q=C.replace(/^\s+/,"");
for(var N in A){var M=A[N];
if(M.re.test(Q)){O=N;
C=M.pre+C+M.post;
break
}}D.innerHTML=C;
if(D.normalize){D.normalize()
}var R={cell:"tr",row:"tbody",section:"table"}[O];
var L=(typeof R!="undefined")?D.getElementsByTagName(R)[0]:D;
var P=[];
while(L.firstChild){P.push(L.removeChild(L.firstChild))
}D.innerHTML="";
return P
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
},_getSibling:function(E){var F=this.domNode;
do{F=F[E+"Sibling"]
}while(F&&F.nodeType!=1);
if(!F){return null
}var A=F.getAttribute("widgetId");
return dijit.byId(A)
},getPreviousSibling:function(){return this._getSibling("previous")
},getNextSibling:function(){return this._getSibling("next")
}});
B.declare("dijit._Container",null,{isContainer:true,addChild:function(A,H){if(H===undefined){H="last"
}var G=this.containerNode||this.domNode;
if(H&&typeof H=="number"){var F=B.query("> [widgetid]",G);
if(F&&F.length>=H){G=F[H-1];
H="after"
}}B.place(A.domNode,G,H);
if(this._started&&!A._started){A.startup()
}},removeChild:function(A){var D=A.domNode;
D.parentNode.removeChild(D)
},_nextElement:function(A){do{A=A.nextSibling
}while(A&&A.nodeType!=1);
return A
},_firstElement:function(A){A=A.firstChild;
if(A&&A.nodeType!=1){A=this._nextElement(A)
}return A
},getChildren:function(){return B.query("> [widgetId]",this.containerNode||this.domNode).map(dijit.byNode)
},hasChildren:function(){var A=this.containerNode||this.domNode;
return !!this._firstElement(A)
},_getSiblingOfChild:function(A,H){var G=A.domNode;
var F=(H>0?"nextSibling":"previousSibling");
do{G=G[F]
}while(G&&(G.nodeType!=1||!dijit.byNode(G)));
return G?dijit.byNode(G):null
}});
B.declare("dijit._KeyNavContainer",[dijit._Container],{_keyNavCodes:{},connectKeyNavHandlers:function(J,A){var I=this._keyNavCodes={};
var G=B.hitch(this,this.focusPrev);
var H=B.hitch(this,this.focusNext);
B.forEach(J,function(C){I[C]=G
});
B.forEach(A,function(C){I[C]=H
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
}},focusChild:function(A,D){if(A){if(this.focusedChild&&A!==this.focusedChild){this._onChildBlur(this.focusedChild)
}this.focusedChild=A;
if(D&&A.focusFocalNode){A.focusFocalNode(D)
}else{A.focus()
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
dijit.layout.layoutChildren=function(H,C,G){C=B.mixin({},C);
B.addClass(H,"dijitLayoutContainer");
G=B.filter(G,function(E){return E.layoutAlign!="client"
}).concat(B.filter(G,function(E){return E.layoutAlign=="client"
}));
B.forEach(G,function(E){var F=E.domNode,K=E.layoutAlign;
var L=F.style;
L.left=C.l+"px";
L.top=C.t+"px";
L.bottom=L.right="auto";
B.addClass(F,"dijitAlign"+A(K));
if(K=="top"||K=="bottom"){D(E,{w:C.w});
C.h-=E.h;
if(K=="top"){C.t+=E.h
}else{L.top=C.t+C.h+"px"
}}else{if(K=="left"||K=="right"){D(E,{h:C.h});
C.w-=E.w;
if(K=="left"){C.l+=E.w
}else{L.left=C.l+C.w+"px"
}}else{if(K=="client"){D(E,C)
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
},setValue:function(A,D){this._lastValue=A;
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",this.forWaiValuenow());
if(D===undefined){D=true
}if(this._lastValueReported==undefined&&D===null){this._lastValueReported=A
}if((this.intermediateChanges||D)&&((A&&A.toString)?A.toString():A)!==((this._lastValueReported&&this._lastValueReported.toString)?this._lastValueReported.toString():this._lastValueReported)){this._lastValueReported=A;
this.onChange(A)
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