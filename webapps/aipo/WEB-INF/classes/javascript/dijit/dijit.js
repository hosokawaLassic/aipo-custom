if(!dojo._hasResource["dijit._base.focus"]){dojo._hasResource["dijit._base.focus"]=true;
dojo.provide("dijit._base.focus");
dojo.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){var E=dojo.global;
var F=dojo.doc;
if(F.selection){return !F.selection.createRange().text
}else{if(E.getSelection){var D=E.getSelection();
if(dojo.isString(D)){return !D
}else{return D.isCollapsed||!D.toString()
}}}},getBookmark:function(){var E,F=dojo.doc.selection;
if(F){var D=F.createRange();
if(F.type.toUpperCase()=="CONTROL"){E=D.length?dojo._toArray(D):null
}else{E=D.getBookmark()
}}else{if(dojo.global.getSelection){F=dojo.global.getSelection();
if(F){var D=F.getRangeAt(0);
E=D.cloneRange()
}}else{console.debug("No idea how to store the current selection for this browser!")
}}return E
},moveToBookmark:function(G){var H=dojo.doc;
if(H.selection){var E;
if(dojo.isArray(G)){E=H.body.createControlRange();
dojo.forEach(G,E.addElement)
}else{E=H.selection.createRange();
E.moveToBookmark(G)
}E.select()
}else{var F=dojo.global.getSelection&&dojo.global.getSelection();
if(F&&F.removeAllRanges){F.removeAllRanges();
F.addRange(G)
}else{console.debug("No idea how to restore selection for this browser!")
}}},getFocus:function(D,C){return{node:D&&dojo.isDescendant(dijit._curFocus,D.domNode)?dijit._prevFocus:dijit._curFocus,bookmark:!dojo.withGlobal(C||dojo.global,dijit.isCollapsed)?dojo.withGlobal(C||dojo.global,dijit.getBookmark):null,openedForWindow:C}
},focus:function(L){if(!L){return 
}var G="node" in L?L.node:L,H=L.bookmark,I=L.openedForWindow;
if(G){var J=(G.tagName.toLowerCase()=="iframe")?G.contentWindow:G;
if(J&&J.focus){try{J.focus()
}catch(K){}}dijit._onFocusNode(G)
}if(H&&dojo.withGlobal(I||dojo.global,dijit.isCollapsed)){if(I){I.focus()
}try{dojo.withGlobal(I||dojo.global,moveToBookmark,null,[H])
}catch(K){}}},_activeStack:[],registerWin:function(D){if(!D){D=window
}dojo.connect(D.document,"onmousedown",null,function(A){dijit._justMouseDowned=true;
setTimeout(function(){dijit._justMouseDowned=false
},0);
dijit._onTouchNode(A.target||A.srcElement)
});
var C=D.document.body||D.document.getElementsByTagName("body")[0];
if(C){if(dojo.isIE){C.attachEvent("onactivate",function(A){if(A.srcElement.tagName.toLowerCase()!="body"){dijit._onFocusNode(A.srcElement)
}});
C.attachEvent("ondeactivate",function(A){dijit._onBlurNode(A.srcElement)
})
}else{C.addEventListener("focus",function(A){dijit._onFocusNode(A.target)
},true);
C.addEventListener("blur",function(A){dijit._onBlurNode(A.target)
},true)
}}C=null
},_onBlurNode:function(D){dijit._prevFocus=dijit._curFocus;
dijit._curFocus=null;
var C=dijit.getEnclosingWidget(D);
if(C&&C._setStateClass){C._focused=false;
C._setStateClass()
}if(dijit._justMouseDowned){return 
}if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer)
}dijit._clearActiveWidgetsTimer=setTimeout(function(){delete dijit._clearActiveWidgetsTimer;
dijit._setStack([])
},100)
},_onTouchNode:function(H){if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer);
delete dijit._clearActiveWidgetsTimer
}var E=[];
try{while(H){if(H.dijitPopupParent){H=dijit.byId(H.dijitPopupParent).domNode
}else{if(H.tagName&&H.tagName.toLowerCase()=="body"){if(H===dojo.body()){break
}H=dojo.query("iframe").filter(function(A){return A.contentDocument.body===H
})[0]
}else{var F=H.getAttribute&&H.getAttribute("widgetId");
if(F){E.unshift(F)
}H=H.parentNode
}}}}catch(G){}dijit._setStack(E)
},_onFocusNode:function(C){if(C&&C.tagName&&C.tagName.toLowerCase()=="body"){return 
}dijit._onTouchNode(C);
if(C==dijit._curFocus){return 
}dijit._prevFocus=dijit._curFocus;
dijit._curFocus=C;
dojo.publish("focusNode",[C]);
var D=dijit.getEnclosingWidget(C);
if(D&&D._setStateClass){D._focused=true;
D._setStateClass()
}},_setStack:function(F){var G=dijit._activeStack;
dijit._activeStack=F;
for(var H=0;
H<Math.min(G.length,F.length);
H++){if(G[H]!=F[H]){break
}}for(var J=G.length-1;
J>=H;
J--){var I=dijit.byId(G[J]);
if(I){dojo.publish("widgetBlur",[I]);
if(I._onBlur){I._onBlur()
}}}for(var J=H;
J<F.length;
J++){var I=dijit.byId(F[J]);
if(I){dojo.publish("widgetFocus",[I]);
if(I._onFocus){I._onFocus()
}}}}});
dojo.addOnLoad(dijit.registerWin)
}if(!dojo._hasResource["dijit._base.manager"]){dojo._hasResource["dijit._base.manager"]=true;
dojo.provide("dijit._base.manager");
dojo.declare("dijit.WidgetSet",null,{constructor:function(){this._hash={}
},add:function(B){if(this._hash[B.id]){throw new Error("Tried to register widget with id=="+B.id+" but that id is already registered")
}this._hash[B.id]=B
},remove:function(B){delete this._hash[B]
},forEach:function(C){for(var D in this._hash){C(this._hash[D])
}},filter:function(D){var C=new dijit.WidgetSet();
this.forEach(function(A){if(D(A)){C.add(A)
}});
return C
},byId:function(B){return this._hash[B]
},byClass:function(B){return this.filter(function(A){return A.declaredClass==B
})
}});
dijit.registry=new dijit.WidgetSet();
dijit._widgetTypeCtr={};
dijit.getUniqueId=function(C){var D;
do{D=C+"_"+(dijit._widgetTypeCtr[C]!==undefined?++dijit._widgetTypeCtr[C]:dijit._widgetTypeCtr[C]=0)
}while(dijit.byId(D));
return D
};
if(dojo.isIE){dojo.addOnUnload(function(){dijit.registry.forEach(function(B){B.destroy()
})
})
}dijit.byId=function(B){return(dojo.isString(B))?dijit.registry.byId(B):B
};
dijit.byNode=function(B){return dijit.registry.byId(B.getAttribute("widgetId"))
};
dijit.getEnclosingWidget=function(B){while(B){if(B.getAttribute&&B.getAttribute("widgetId")){return dijit.registry.byId(B.getAttribute("widgetId"))
}B=B.parentNode
}return null
}
}if(!dojo._hasResource["dijit._base.place"]){dojo._hasResource["dijit._base.place"]=true;
dojo.provide("dijit._base.place");
dijit.getViewport=function(){var J=dojo.global;
var K=dojo.doc;
var N=0,M=0;
if(dojo.isMozilla){var O,P,Q,R;
if(K.body.clientWidth>K.documentElement.clientWidth){O=K.documentElement.clientWidth;
Q=K.body.clientWidth
}else{Q=K.documentElement.clientWidth;
O=K.body.clientWidth
}if(K.body.clientHeight>K.documentElement.clientHeight){P=K.documentElement.clientHeight;
R=K.body.clientHeight
}else{R=K.documentElement.clientHeight;
P=K.body.clientHeight
}N=(Q>J.innerWidth)?O:Q;
M=(R>J.innerHeight)?P:R
}else{if(!dojo.isOpera&&J.innerWidth){N=J.innerWidth;
M=J.innerHeight
}else{if(dojo.isIE&&K.documentElement&&K.documentElement.clientHeight){N=K.documentElement.clientWidth;
M=K.documentElement.clientHeight
}else{if(dojo.body().clientWidth){N=dojo.body().clientWidth;
M=dojo.body().clientHeight
}}}}var L=dojo._docScroll();
return{w:N,h:M,l:L.x,t:L.y}
};
dijit.placeOnScreen=function(H,G,I,J){var F=dojo.map(I,function(A){return{corner:A,pos:G}
});
return dijit._place(H,F)
};
dijit._place=function(d,f,g){var h=dijit.getViewport();
if(!d.parentNode||String(d.parentNode.tagName).toLowerCase()!="body"){dojo.body().appendChild(d)
}var i=null;
for(var S=0;
S<f.length;
S++){var b=f[S].corner;
var a=f[S].pos;
if(g){g(b)
}var c=d.style.display;
var e=d.style.visibility;
d.style.visibility="hidden";
d.style.display="";
var j=dojo.marginBox(d);
d.style.display=c;
d.style.visibility=e;
var T=(b.charAt(1)=="L"?a.x:Math.max(h.l,a.x-j.w)),U=(b.charAt(0)=="T"?a.y:Math.max(h.t,a.y-j.h)),V=(b.charAt(1)=="L"?Math.min(h.l+h.w,T+j.w):a.x),W=(b.charAt(0)=="T"?Math.min(h.t+h.h,U+j.h):a.y),X=V-T,Y=W-U,Z=(j.w-X)+(j.h-Y);
if(i==null||Z<i.overflow){i={corner:b,aroundCorner:f[S].aroundCorner,x:T,y:U,w:X,h:Y,overflow:Z}
}if(Z==0){break
}}d.style.left=i.x+"px";
d.style.top=i.y+"px";
return i
};
dijit.placeOnScreenAroundElement=function(S,K,N,O){K=dojo.byId(K);
var P=K.style.display;
K.style.display="";
var Q=K.offsetWidth;
var R=K.offsetHeight;
var T=dojo.coords(K,true);
K.style.display=P;
var L=[];
for(var M in N){L.push({aroundCorner:M,corner:N[M],pos:{x:T.x+(M.charAt(1)=="L"?0:Q),y:T.y+(M.charAt(0)=="T"?0:R)}})
}return dijit._place(S,L,O)
}
}if(!dojo._hasResource["dijit._base.window"]){dojo._hasResource["dijit._base.window"]=true;
dojo.provide("dijit._base.window");
dijit.getDocumentWindow=function(E){if(dojo.isSafari&&!E._parentWindow){var D=function(A){A.document._parentWindow=A;
for(var B=0;
B<A.frames.length;
B++){D(A.frames[B])
}};
D(window.top)
}if(dojo.isIE&&window!==document.parentWindow&&!E._parentWindow){E.parentWindow.execScript("document._parentWindow = window;","Javascript");
var F=E._parentWindow;
E._parentWindow=null;
return F
}return E._parentWindow||E.parentWindow||E.defaultView
}
}if(!dojo._hasResource["dijit._base.popup"]){dojo._hasResource["dijit._base.popup"]=true;
dojo.provide("dijit._base.popup");
dijit.popup=new function(){var E=[],F=1000,D=1;
this.open=function(R){var B=R.popup,C=R.orient||{BL:"TL",TL:"BL"},N=R.around,T=(R.around&&R.around.id)?(R.around.id+"_dropdown"):("popup_"+D++);
var O=dojo.doc.createElement("div");
O.id=T;
O.className="dijitPopup";
O.style.zIndex=F+E.length;
O.style.visibility="hidden";
if(R.parent){O.dijitPopupParent=R.parent.id
}dojo.body().appendChild(O);
B.domNode.style.display="";
O.appendChild(B.domNode);
var Q=new dijit.BackgroundIframe(O);
var P=N?dijit.placeOnScreenAroundElement(O,N,C,B.orient?dojo.hitch(B,"orient"):null):dijit.placeOnScreen(O,R,C=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"]);
O.style.visibility="visible";
var S=[];
function A(){for(var G=E.length-1;
G>0&&E[G].parent===E[G-1].widget;
G--){}return E[G]
}S.push(dojo.connect(O,"onkeypress",this,function(H){if(H.keyCode==dojo.keys.ESCAPE&&R.onCancel){R.onCancel()
}else{if(H.keyCode==dojo.keys.TAB){dojo.stopEvent(H);
var G=A();
if(G&&G.onCancel){G.onCancel()
}}}}));
if(B.onCancel){S.push(dojo.connect(B,"onCancel",null,R.onCancel))
}S.push(dojo.connect(B,B.onExecute?"onExecute":"onChange",null,function(){var G=A();
if(G&&G.onExecute){G.onExecute()
}}));
E.push({wrapper:O,iframe:Q,widget:B,parent:R.parent,onExecute:R.onExecute,onCancel:R.onCancel,onClose:R.onClose,handlers:S});
if(B.onOpen){B.onOpen(P)
}return P
};
this.close=function(C){while(dojo.some(E,function(G){return G.widget==C
})){var A=E.pop(),L=A.wrapper,B=A.iframe,J=A.widget,K=A.onClose;
if(J.onClose){J.onClose()
}dojo.forEach(A.handlers,dojo.disconnect);
if(!J||!J.domNode){return 
}dojo.style(J.domNode,"display","none");
dojo.body().appendChild(J.domNode);
B.destroy();
dojo._destroyElement(L);
if(K){K()
}}}
}();
dijit._frames=new function(){var B=[];
this.pop=function(){var A;
if(B.length){A=B.pop();
A.style.display=""
}else{if(dojo.isIE){var D="<iframe src='javascript:\"\"' style='position: absolute; left: 0px; top: 0px;z-index: -1; filter:Alpha(Opacity=\"0\");'>";
A=dojo.doc.createElement(D)
}else{var A=dojo.doc.createElement("iframe");
A.src='javascript:""';
A.className="dijitBackgroundIframe"
}A.tabIndex=-1;
dojo.body().appendChild(A)
}return A
};
this.push=function(A){A.style.display="";
if(dojo.isIE){A.style.removeExpression("width");
A.style.removeExpression("height")
}B.push(A)
}
}();
if(dojo.isIE&&dojo.isIE<7){dojo.addOnLoad(function(){var B=dijit._frames;
dojo.forEach([B.pop()],B.push)
})
}dijit.BackgroundIframe=function(C){if(!C.id){throw new Error("no id")
}if((dojo.isIE&&dojo.isIE<7)||(dojo.isFF&&dojo.isFF<3&&dojo.hasClass(dojo.body(),"dijit_a11y"))){var D=dijit._frames.pop();
C.appendChild(D);
if(dojo.isIE){D.style.setExpression("width","document.getElementById('"+C.id+"').offsetWidth");
D.style.setExpression("height","document.getElementById('"+C.id+"').offsetHeight")
}this.iframe=D
}};
dojo.extend(dijit.BackgroundIframe,{destroy:function(){if(this.iframe){dijit._frames.push(this.iframe);
delete this.iframe
}}})
}if(!dojo._hasResource["dijit._base.scroll"]){dojo._hasResource["dijit._base.scroll"]=true;
dojo.provide("dijit._base.scroll");
dijit.scrollIntoView=function(F){if(dojo.isIE){if(dojo.marginBox(F.parentNode).h<=F.parentNode.scrollHeight){F.scrollIntoView(false)
}}else{if(dojo.isMozilla){F.scrollIntoView(false)
}else{var G=F.parentNode;
var H=G.scrollTop+dojo.marginBox(G).h;
var E=F.offsetTop+dojo.marginBox(F).h;
if(H<E){G.scrollTop+=(E-H)
}else{if(G.scrollTop>F.offsetTop){G.scrollTop-=(G.scrollTop-F.offsetTop)
}}}}}
}if(!dojo._hasResource["dijit._base.sniff"]){dojo._hasResource["dijit._base.sniff"]=true;
dojo.provide("dijit._base.sniff");
(function(){var I=dojo;
var J=I.isIE;
var K=I.isOpera;
var H=Math.floor;
var M={dj_ie:J,dj_ie6:H(J)==6,dj_ie7:H(J)==7,dj_iequirks:J&&I.isQuirks,dj_opera:K,dj_opera8:H(K)==8,dj_opera9:H(K)==9,dj_khtml:I.isKhtml,dj_safari:I.isSafari,dj_gecko:I.isMozilla};
for(var L in M){if(M[L]){var N=dojo.doc.documentElement;
if(N.className){N.className+=" "+L
}else{N.className=L
}}}})()
}if(!dojo._hasResource["dijit._base.bidi"]){dojo._hasResource["dijit._base.bidi"]=true;
dojo.provide("dijit._base.bidi");
dojo.addOnLoad(function(){if(!dojo._isBodyLtr()){dojo.addClass(dojo.body(),"dijitRtl")
}})
}if(!dojo._hasResource["dijit._base.typematic"]){dojo._hasResource["dijit._base.typematic"]=true;
dojo.provide("dijit._base.typematic");
dijit.typematic={_fireEventAndReload:function(){this._timer=null;
this._callback(++this._count,this._node,this._evt);
this._currentTimeout=(this._currentTimeout<0)?this._initialDelay:((this._subsequentDelay>1)?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay));
this._timer=setTimeout(dojo.hitch(this,"_fireEventAndReload"),this._currentTimeout)
},trigger:function(N,K,L,M,J,H,I){if(J!=this._obj){this.stop();
this._initialDelay=I||500;
this._subsequentDelay=H||0.9;
this._obj=J;
this._evt=N;
this._node=L;
this._currentTimeout=-1;
this._count=-1;
this._callback=dojo.hitch(K,M);
this._fireEventAndReload()
}},stop:function(){if(this._timer){clearTimeout(this._timer);
this._timer=null
}if(this._obj){this._callback(-1,this._node,this._evt);
this._obj=null
}},addKeyListener:function(I,K,L,G,H,J){return[dojo.connect(I,"onkeypress",this,function(A){if(A.keyCode==K.keyCode&&(!K.charCode||K.charCode==A.charCode)&&(K.ctrlKey===undefined||K.ctrlKey==A.ctrlKey)&&(K.altKey===undefined||K.altKey==A.ctrlKey)&&(K.shiftKey===undefined||K.shiftKey==A.ctrlKey)){dojo.stopEvent(A);
dijit.typematic.trigger(K,L,I,G,K,H,J)
}else{if(dijit.typematic._obj==K){dijit.typematic.stop()
}}}),dojo.connect(I,"onkeyup",this,function(A){if(dijit.typematic._obj==K){dijit.typematic.stop()
}})]
},addMouseListener:function(I,K,H,J,L){var G=dojo.connect;
return[G(I,"mousedown",this,function(A){dojo.stopEvent(A);
dijit.typematic.trigger(A,K,I,H,I,J,L)
}),G(I,"mouseup",this,function(A){dojo.stopEvent(A);
dijit.typematic.stop()
}),G(I,"mouseout",this,function(A){dojo.stopEvent(A);
dijit.typematic.stop()
}),G(I,"mousemove",this,function(A){dojo.stopEvent(A)
}),G(I,"dblclick",this,function(A){dojo.stopEvent(A);
if(dojo.isIE){dijit.typematic.trigger(A,K,I,H,I,J,L);
setTimeout(dijit.typematic.stop,50)
}})]
},addListener:function(J,M,N,H,I,K,L){return this.addKeyListener(M,N,H,I,K,L).concat(this.addMouseListener(J,H,I,K,L))
}}
}if(!dojo._hasResource["dijit._base.wai"]){dojo._hasResource["dijit._base.wai"]=true;
dojo.provide("dijit._base.wai");
dijit.wai={onload:function(){var D=document.createElement("div");
D.id="a11yTestNode";
D.style.cssText='border: 1px solid;border-color:red green;position: absolute;height: 5px;top: -999px;background-image: url("'+dojo.moduleUrl("dijit","form/templates/blank.gif")+'");';
dojo.body().appendChild(D);
function C(){var F=dojo.getComputedStyle(D);
if(F){var A=F.backgroundImage;
var B=(F.borderTopColor==F.borderRightColor)||(A!=null&&(A=="none"||A=="url(invalid-url:)"));
dojo[B?"addClass":"removeClass"](dojo.body(),"dijit_a11y")
}}C();
if(dojo.isIE){setInterval(C,4000)
}}};
if(dojo.isIE||dojo.isMoz){dojo._loaders.unshift(dijit.wai.onload)
}dojo.mixin(dijit,{hasWaiRole:function(B){if(B.hasAttribute){return B.hasAttribute("role")
}else{return B.getAttribute("role")?true:false
}},getWaiRole:function(E){var F=E.getAttribute("role");
if(F){var D=F.indexOf(":");
return D==-1?F:F.substring(D+1)
}else{return""
}},setWaiRole:function(D,C){if(dojo.isFF&&dojo.isFF<3){D.setAttribute("role","wairole:"+C)
}else{D.setAttribute("role",C)
}},removeWaiRole:function(B){B.removeAttribute("role")
},hasWaiState:function(D,C){if(dojo.isFF&&dojo.isFF<3){return D.hasAttributeNS("http://www.w3.org/2005/07/aaa",C)
}else{if(D.hasAttribute){return D.hasAttribute("aria-"+C)
}else{return D.getAttribute("aria-"+C)?true:false
}}},getWaiState:function(F,D){if(dojo.isFF&&dojo.isFF<3){return F.getAttributeNS("http://www.w3.org/2005/07/aaa",D)
}else{var E=F.getAttribute("aria-"+D);
return E?E:""
}},setWaiState:function(D,E,F){if(dojo.isFF&&dojo.isFF<3){D.setAttributeNS("http://www.w3.org/2005/07/aaa","aaa:"+E,F)
}else{D.setAttribute("aria-"+E,F)
}},removeWaiState:function(D,C){if(dojo.isFF&&dojo.isFF<3){D.removeAttributeNS("http://www.w3.org/2005/07/aaa",C)
}else{D.removeAttribute("aria-"+C)
}}})
}if(!dojo._hasResource["dijit._base"]){dojo._hasResource["dijit._base"]=true;
dojo.provide("dijit._base")
}if(!dojo._hasResource["dojo.date.stamp"]){dojo._hasResource["dojo.date.stamp"]=true;
dojo.provide("dojo.date.stamp");
dojo.date.stamp.fromISOString=function(H,I){if(!dojo.date.stamp._isoRegExp){dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/
}var J=dojo.date.stamp._isoRegExp.exec(H);
var L=null;
if(J){J.shift();
J[1]&&J[1]--;
J[6]&&(J[6]*=1000);
if(I){I=new Date(I);
dojo.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(A){return I["get"+A]()
}).forEach(function(A,B){if(J[B]===undefined){J[B]=A
}})
}L=new Date(J[0]||1970,J[1]||0,J[2]||0,J[3]||0,J[4]||0,J[5]||0,J[6]||0);
var K=0;
var G=J[7]&&J[7].charAt(0);
if(G!="Z"){K=((J[8]||0)*60)+(Number(J[9])||0);
if(G!="-"){K*=-1
}}if(G){K-=L.getTimezoneOffset()
}if(K){L.setTime(L.getTime()+K*60000)
}}return L
};
dojo.date.stamp.toISOString=function(P,Q){var O=function(A){return(A<10)?"0"+A:A
};
Q=Q||{};
var R=[];
var S=Q.zulu?"getUTC":"get";
var T="";
if(Q.selector!="time"){T=[P[S+"FullYear"](),O(P[S+"Month"]()+1),O(P[S+"Date"]())].join("-")
}R.push(T);
if(Q.selector!="date"){var K=[O(P[S+"Hours"]()),O(P[S+"Minutes"]()),O(P[S+"Seconds"]())].join(":");
var L=P[S+"Milliseconds"]();
if(Q.milliseconds){K+="."+(L<100?"0":"")+O(L)
}if(Q.zulu){K+="Z"
}else{if(Q.selector!="time"){var M=P.getTimezoneOffset();
var N=Math.abs(M);
K+=(M>0?"-":"+")+O(Math.floor(N/60))+":"+O(N%60)
}}R.push(K)
}return R.join("T")
}
}if(!dojo._hasResource["dojo.parser"]){dojo._hasResource["dojo.parser"]=true;
dojo.provide("dojo.parser");
dojo.parser=new function(){var G=dojo;
function F(A){if(G.isString(A)){return"string"
}if(typeof A=="number"){return"number"
}if(typeof A=="boolean"){return"boolean"
}if(G.isFunction(A)){return"function"
}if(G.isArray(A)){return"array"
}if(A instanceof Date){return"date"
}if(A instanceof G._Url){return"url"
}return"object"
}function I(B,C){switch(C){case"string":return B;
case"number":return B.length?Number(B):NaN;
case"boolean":return typeof B=="boolean"?B:!(B.toLowerCase()=="false");
case"function":if(G.isFunction(B)){B=B.toString();
B=G.trim(B.substring(B.indexOf("{")+1,B.length-1))
}try{if(B.search(/[^\w\.]+/i)!=-1){B=G.parser._nameAnonFunc(new Function(B),this)
}return G.getObject(B,false)
}catch(A){return new Function()
}case"array":return B.split(/\s*,\s*/);
case"date":switch(B){case"":return new Date("");
case"now":return new Date();
default:return G.date.stamp.fromISOString(B)
}case"url":return G.baseUrl+B;
default:return G.fromJson(B)
}}var J={};
function H(A){if(!J[A]){var E=G.getObject(A);
if(!G.isFunction(E)){throw new Error("Could not load class '"+A+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?")
}var B=E.prototype;
var C={};
for(var D in B){if(D.charAt(0)=="_"){continue
}var L=B[D];
C[D]=F(L)
}J[A]={cls:E,params:C}
}return J[A]
}this._functionFromScript=function(E){var A="";
var C="";
var D=E.getAttribute("args");
if(D){G.forEach(D.split(/\s*,\s*/),function(M,N){A+="var "+M+" = arguments["+N+"]; "
})
}var B=E.getAttribute("with");
if(B&&B.length){G.forEach(B.split(/\s*,\s*/),function(L){A+="with("+L+"){";
C+="}"
})
}return new Function(A+E.innerHTML+C)
};
this.instantiate=function(A){var B=[];
G.forEach(A,function(e){if(!e){return 
}var f=e.getAttribute("dojoType");
if((!f)||(!f.length)){return 
}var g=H(f);
var i=g.cls;
var j=i._noScript||i.prototype._noScript;
var C={};
var E=e.attributes;
for(var X in g.params){var Y=E.getNamedItem(X);
if(!Y||(!Y.specified&&(!dojo.isIE||X.toLowerCase()!="value"))){continue
}var Z=Y.value;
switch(X){case"class":Z=e.className;
break;
case"style":Z=e.style&&e.style.cssText
}var b=g.params[X];
C[X]=I(Z,b)
}if(!j){var d=[],D=[];
G.query("> script[type^='dojo/']",e).orphan().forEach(function(N){var K=N.getAttribute("event"),M=N.getAttribute("type"),L=G.parser._functionFromScript(N);
if(K){if(M=="dojo/connect"){d.push({event:K,func:L})
}else{C[K]=L
}}else{D.push(L)
}})
}var a=i.markupFactory;
if(!a&&i.prototype){a=i.prototype.markupFactory
}var c=a?a(C,e,i):new i(C,e);
B.push(c);
var h=e.getAttribute("jsId");
if(h){G.setObject(h,c)
}if(!j){dojo.forEach(d,function(K){dojo.connect(c,K.event,null,K.func)
});
dojo.forEach(D,function(K){K.call(c)
})
}});
G.forEach(B,function(C){if(C&&(C.startup)&&((!C.getParent)||(!C.getParent()))){C.startup()
}});
return B
};
this.parse=function(B){var A=G.query("[dojoType]",B);
var C=this.instantiate(A);
return C
}
}();
(function(){var B=function(){if(djConfig.parseOnLoad==true){dojo.parser.parse()
}};
if(dojo.exists("dijit.wai.onload")&&(dijit.wai.onload===dojo._loaders[0])){dojo._loaders.splice(1,0,B)
}else{dojo._loaders.unshift(B)
}})();
dojo.parser._anonCtr=0;
dojo.parser._anon={};
dojo.parser._nameAnonFunc=function(I,J){var K="$joinpoint";
var L=(J||dojo.parser._anon);
if(dojo.isIE){var H=I.__dojoNameCache;
if(H&&L[H]===I){return I.__dojoNameCache
}}var G="__"+dojo.parser._anonCtr++;
while(typeof L[G]!="undefined"){G="__"+dojo.parser._anonCtr++
}L[G]=I;
return G
}
}if(!dojo._hasResource["dijit._Widget"]){dojo._hasResource["dijit._Widget"]=true;
dojo.provide("dijit._Widget");
dojo.declare("dijit._Widget",null,{id:"",lang:"",dir:"","class":"",style:"",title:"",srcNodeRef:null,domNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},postscript:function(D,C){this.create(D,C)
},create:function(G,H){this.srcNodeRef=dojo.byId(H);
this._connects=[];
this._attaches=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){this.id=this.srcNodeRef.id
}if(G){dojo.mixin(this,G)
}this.postMixInProperties();
if(!this.id){this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"))
}dijit.registry.add(this);
this.buildRendering();
if(this.domNode){for(var F in this.attributeMap){var I=this[this.attributeMap[F]||"domNode"];
var J=this[F];
if(typeof J!="object"&&(J!==""||(G&&G[F]))){switch(F){case"class":dojo.addClass(I,J);
break;
case"style":if(I.style.cssText){I.style.cssText+="; "+J
}else{I.style.cssText=J
}break;
default:I.setAttribute(F,J)
}}}}if(this.domNode){this.domNode.setAttribute("widgetId",this.id)
}this.postCreate();
if(this.srcNodeRef&&!this.srcNodeRef.parentNode){delete this.srcNodeRef
}},postMixInProperties:function(){},buildRendering:function(){this.domNode=this.srcNodeRef||dojo.doc.createElement("div")
},postCreate:function(){},startup:function(){},destroyRecursive:function(B){this.destroyDescendants();
this.destroy()
},destroy:function(B){this.uninitialize();
dojo.forEach(this._connects,function(A){dojo.forEach(A,dojo.disconnect)
});
this.destroyRendering(B);
dijit.registry.remove(this.id)
},destroyRendering:function(B){if(this.bgIframe){this.bgIframe.destroy();
delete this.bgIframe
}if(this.domNode){dojo._destroyElement(this.domNode);
delete this.domNode
}if(this.srcNodeRef){dojo._destroyElement(this.srcNodeRef);
delete this.srcNodeRef
}},destroyDescendants:function(){dojo.forEach(this.getDescendants(),function(B){B.destroy()
})
},uninitialize:function(){return false
},toString:function(){return"[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]"
},getDescendants:function(){var B=dojo.query("[widgetId]",this.domNode);
return B.map(dijit.byNode)
},nodesWithKeyClick:["input","button"],connect:function(H,I,F){var G=[];
if(I=="ondijitclick"){var J=this;
if(!this.nodesWithKeyClick[H.nodeName]){G.push(dojo.connect(H,"onkeydown",this,function(A){if(A.keyCode==dojo.keys.ENTER){return(dojo.isString(F))?J[F](A):F.call(J,A)
}else{if(A.keyCode==dojo.keys.SPACE){dojo.stopEvent(A)
}}}));
G.push(dojo.connect(H,"onkeyup",this,function(A){if(A.keyCode==dojo.keys.SPACE){return dojo.isString(F)?J[F](A):F.call(J,A)
}}))
}I="onclick"
}G.push(dojo.connect(H,I,this,F));
this._connects.push(G);
return G
},disconnect:function(D){for(var C=0;
C<this._connects.length;
C++){if(this._connects[C]==D){dojo.forEach(D,dojo.disconnect);
this._connects.splice(C,1);
return 
}}},isLeftToRight:function(){if(typeof this._ltr=="undefined"){this._ltr=dojo.getComputedStyle(this.domNode).direction!="rtl"
}return this._ltr
},isFocusable:function(){return this.focus&&(dojo.style(this.domNode,"display")!="none")
}})
}if(!dojo._hasResource["dojo.string"]){dojo._hasResource["dojo.string"]=true;
dojo.provide("dojo.string");
dojo.string.pad=function(G,I,H,F){var J=String(G);
if(!H){H="0"
}while(J.length<I){if(F){J+=H
}else{J=H+J
}}return J
};
dojo.string.substitute=function(E,F,G,H){return E.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(B,A,D){var C=dojo.getObject(A,false,F);
if(D){C=dojo.getObject(D,false,H)(C)
}if(G){C=G(C,A)
}return C.toString()
})
};
dojo.string.trim=function(D){D=D.replace(/^\s+/,"");
for(var C=D.length-1;
C>0;
C--){if(/\S/.test(D.charAt(C))){D=D.substring(0,C+1);
break
}}return D
}
}if(!dojo._hasResource["dijit._Templated"]){dojo._hasResource["dijit._Templated"]=true;
dojo.provide("dijit._Templated");
dojo.declare("dijit._Templated",null,{templateNode:null,templateString:null,templatePath:null,widgetsInTemplate:false,containerNode:null,_skipNodeCache:false,buildRendering:function(){var I=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var L;
if(dojo.isString(I)){var J=this.declaredClass,M=this;
var H=dojo.string.substitute(I,this,function(A,B){if(B.charAt(0)=="!"){A=M[B.substr(1)]
}if(typeof A=="undefined"){throw new Error(J+" template:"+B)
}if(!A){return""
}return B.charAt(0)=="!"?A:A.toString().replace(/"/g,"&quot;")
},this);
L=dijit._Templated._createNodesFromText(H)[0]
}else{L=I.cloneNode(true)
}this._attachTemplateNodes(L);
var K=this.srcNodeRef;
if(K&&K.parentNode){K.parentNode.replaceChild(L,K)
}this.domNode=L;
if(this.widgetsInTemplate){var N=dojo.parser.parse(L);
this._attachTemplateNodes(N,function(A,B){return A[B]
})
}this._fillContent(K)
},_fillContent:function(D){var C=this.containerNode;
if(D&&C){while(D.hasChildNodes()){C.appendChild(D.firstChild)
}}},_attachTemplateNodes:function(V,W){W=W||function(A,B){return A.getAttribute(B)
};
var Y=dojo.isArray(V)?V:(V.all||V.getElementsByTagName("*"));
var U=dojo.isArray(V)?0:-1;
for(;
U<Y.length;
U++){var b=(U==-1)?V:Y[U];
if(this.widgetsInTemplate&&W(b,"dojoType")){continue
}var d=W(b,"dojoAttachPoint");
if(d){var f,R=d.split(/\s*,\s*/);
while(f=R.shift()){if(dojo.isArray(this[f])){this[f].push(b)
}else{this[f]=b
}}}var X=W(b,"dojoAttachEvent");
if(X){var Z,a=X.split(/\s*,\s*/);
var T=dojo.trim;
while(Z=a.shift()){if(Z){var e=null;
if(Z.indexOf(":")!=-1){var Q=Z.split(":");
Z=T(Q[0]);
e=T(Q[1])
}else{Z=T(Z)
}if(!e){e=Z
}this.connect(b,Z,e)
}}}var c=W(b,"waiRole");
if(c){dijit.setWaiRole(b,c)
}var S=W(b,"waiState");
if(S){dojo.forEach(S.split(/\s*,\s*/),function(B){if(B.indexOf("-")!=-1){var A=B.split("-");
dijit.setWaiState(b,A[0],A[1])
}})
}}}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(L,G,H){var I=dijit._Templated._templateCache;
var K=G||L;
var J=I[K];
if(J){return J
}if(!G){G=dijit._Templated._sanitizeTemplateString(dojo._getText(L))
}G=dojo.string.trim(G);
if(G.match(/\$\{([^\}]+)\}/g)||H){return(I[K]=G)
}else{return(I[K]=dijit._Templated._createNodesFromText(G)[0])
}};
dijit._Templated._sanitizeTemplateString=function(C){if(C){C=C.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var D=C.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(D){C=D[1]
}}else{C=""
}return C
};
if(dojo.isIE){dojo.addOnUnload(function(){var E=dijit._Templated._templateCache;
for(var D in E){var F=E[D];
if(!isNaN(F.nodeType)){dojo._destroyElement(F)
}delete E[D]
}})
}(function(){var D={cell:{re:/^<t[dh][\s\r\n>]/i,pre:"<table><tbody><tr>",post:"</tr></tbody></table>"},row:{re:/^<tr[\s\r\n>]/i,pre:"<table><tbody>",post:"</tbody></table>"},section:{re:/^<(thead|tbody|tfoot)[\s\r\n>]/i,pre:"<table>",post:"</table>"}};
var C;
dijit._Templated._createNodesFromText=function(B){if(!C){C=dojo.doc.createElement("div");
C.style.display="none";
dojo.body().appendChild(C)
}var L="none";
var N=B.replace(/^\s+/,"");
for(var M in D){var K=D[M];
if(K.re.test(N)){L=M;
B=K.pre+B+K.post;
break
}}C.innerHTML=B;
if(C.normalize){C.normalize()
}var O={cell:"tr",row:"tbody",section:"table"}[L];
var P=(typeof O!="undefined")?C.getElementsByTagName(O)[0]:C;
var A=[];
while(P.firstChild){A.push(P.removeChild(P.firstChild))
}C.innerHTML="";
return A
}
})();
dojo.extend(dijit._Widget,{dojoAttachEvent:"",dojoAttachPoint:"",waiRole:"",waiState:""})
}if(!dojo._hasResource["dijit._Container"]){dojo._hasResource["dijit._Container"]=true;
dojo.provide("dijit._Container");
dojo.declare("dijit._Contained",null,{getParent:function(){for(var F=this.domNode.parentNode;
F;
F=F.parentNode){var E=F.getAttribute&&F.getAttribute("widgetId");
if(E){var D=dijit.byId(E);
return D.isContainer?D:null
}}return null
},_getSibling:function(D){var F=this.domNode;
do{F=F[D+"Sibling"]
}while(F&&F.nodeType!=1);
if(!F){return null
}var E=F.getAttribute("widgetId");
return dijit.byId(E)
},getPreviousSibling:function(){return this._getSibling("previous")
},getNextSibling:function(){return this._getSibling("next")
}});
dojo.declare("dijit._Container",null,{isContainer:true,addChild:function(G,F){if(F===undefined){F="last"
}var H=this.containerNode||this.domNode;
if(F&&typeof F=="number"){var E=dojo.query("> [widgetid]",H);
if(E&&E.length>=F){H=E[F-1];
F="after"
}}dojo.place(G.domNode,H,F);
if(this._started&&!G._started){G.startup()
}},removeChild:function(D){var C=D.domNode;
C.parentNode.removeChild(C)
},_nextElement:function(B){do{B=B.nextSibling
}while(B&&B.nodeType!=1);
return B
},_firstElement:function(B){B=B.firstChild;
if(B&&B.nodeType!=1){B=this._nextElement(B)
}return B
},getChildren:function(){return dojo.query("> [widgetId]",this.containerNode||this.domNode).map(dijit.byNode)
},hasChildren:function(){var B=this.containerNode||this.domNode;
return !!this._firstElement(B)
},_getSiblingOfChild:function(E,G){var F=E.domNode;
var H=(G>0?"nextSibling":"previousSibling");
do{F=F[H]
}while(F&&(F.nodeType!=1||!dijit.byNode(F)));
return F?dijit.byNode(F):null
}});
dojo.declare("dijit._KeyNavContainer",[dijit._Container],{_keyNavCodes:{},connectKeyNavHandlers:function(I,J){var F=this._keyNavCodes={};
var G=dojo.hitch(this,this.focusPrev);
var H=dojo.hitch(this,this.focusNext);
dojo.forEach(I,function(A){F[A]=G
});
dojo.forEach(J,function(A){F[A]=H
});
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
if(dojo.isIE){this.connect(this.domNode,"onactivate","_onContainerFocus");
this.connect(this.domNode,"ondeactivate","_onContainerBlur")
}else{this.connect(this.domNode,"onfocus","_onContainerFocus");
this.connect(this.domNode,"onblur","_onContainerBlur")
}},startupKeyNavChildren:function(){dojo.forEach(this.getChildren(),dojo.hitch(this,"_setTabIndexMinusOne"))
},addChild:function(D,C){dijit._KeyNavContainer.superclass.addChild.apply(this,arguments);
this._setTabIndexMinusOne(D)
},focus:function(){this.focusFirstChild()
},focusFirstChild:function(){this.focusChild(this._getFirstFocusableChild())
},focusNext:function(){if(this.focusedChild&&this.focusedChild.hasNextFocalNode&&this.focusedChild.hasNextFocalNode()){this.focusedChild.focusNext();
return 
}var B=this._getNextFocusableChild(this.focusedChild,1);
if(B.getFocalNodes){this.focusChild(B,B.getFocalNodes()[0])
}else{this.focusChild(B)
}},focusPrev:function(){if(this.focusedChild&&this.focusedChild.hasPrevFocalNode&&this.focusedChild.hasPrevFocalNode()){this.focusedChild.focusPrev();
return 
}var D=this._getNextFocusableChild(this.focusedChild,-1);
if(D.getFocalNodes){var C=D.getFocalNodes();
this.focusChild(D,C[C.length-1])
}else{this.focusChild(D)
}},focusChild:function(C,D){if(C){if(this.focusedChild&&C!==this.focusedChild){this._onChildBlur(this.focusedChild)
}this.focusedChild=C;
if(D&&C.focusFocalNode){C.focusFocalNode(D)
}else{C.focus()
}}},_setTabIndexMinusOne:function(B){if(B.getFocalNodes){dojo.forEach(B.getFocalNodes(),function(A){A.setAttribute("tabIndex",-1)
})
}else{(B.focusNode||B.domNode).setAttribute("tabIndex",-1)
}},_onContainerFocus:function(C){this.domNode.setAttribute("tabIndex",-1);
if(C.target===this.domNode){this.focusFirstChild()
}else{var D=dijit.getEnclosingWidget(C.target);
if(D&&D.isFocusable()){this.focusedChild=D
}}},_onContainerBlur:function(B){if(this.tabIndex){this.domNode.setAttribute("tabIndex",this.tabIndex)
}},_onContainerKeypress:function(C){if(C.ctrlKey||C.altKey){return 
}var D=this._keyNavCodes[C.keyCode];
if(D){D();
dojo.stopEvent(C)
}},_onChildBlur:function(B){},_getFirstFocusableChild:function(){return this._getNextFocusableChild(null,1)
},_getNextFocusableChild:function(E,H){if(E){E=this._getSiblingOfChild(E,H)
}var F=this.getChildren();
for(var G=0;
G<F.length;
G++){if(!E){E=F[(H>0)?0:(F.length-1)]
}if(E.isFocusable()){return E
}E=this._getSiblingOfChild(E,H)
}}})
}if(!dojo._hasResource["dijit.layout._LayoutWidget"]){dojo._hasResource["dijit.layout._LayoutWidget"]=true;
dojo.provide("dijit.layout._LayoutWidget");
dojo.declare("dijit.layout._LayoutWidget",[dijit._Widget,dijit._Container,dijit._Contained],{isLayoutContainer:true,postCreate:function(){dojo.addClass(this.domNode,"dijitContainer")
},startup:function(){if(this._started){return 
}this._started=true;
if(this.getChildren){dojo.forEach(this.getChildren(),function(B){B.startup()
})
}if(!this.getParent||!this.getParent()){this.resize();
this.connect(window,"onresize",function(){this.resize()
})
}},resize:function(D){var F=this.domNode;
if(D){dojo.marginBox(F,D);
if(D.t){F.style.top=D.t+"px"
}if(D.l){F.style.left=D.l+"px"
}}var E=dojo.mixin(dojo.marginBox(F),D||{});
this._contentBox=dijit.layout.marginBox2contentBox(F,E);
this.layout()
},layout:function(){}});
dijit.layout.marginBox2contentBox=function(H,G){var J=dojo.getComputedStyle(H);
var I=dojo._getMarginExtents(H,J);
var F=dojo._getPadBorderExtents(H,J);
return{l:dojo._toPixelValue(H,J.paddingLeft),t:dojo._toPixelValue(H,J.paddingTop),w:G.w-(I.w+F.w),h:G.h-(I.h+F.h)}
};
(function(){var C=function(A){return A.substring(0,1).toUpperCase()+A.substring(1)
};
var D=function(B,A){B.resize?B.resize(A):dojo.marginBox(B.domNode,A);
dojo.mixin(B,dojo.marginBox(B.domNode));
dojo.mixin(B,A)
};
dijit.layout.layoutChildren=function(F,B,A){B=dojo.mixin({},B);
dojo.addClass(F,"dijitLayoutContainer");
A=dojo.filter(A,function(E){return E.layoutAlign!="client"
}).concat(dojo.filter(A,function(E){return E.layoutAlign=="client"
}));
dojo.forEach(A,function(L){var E=L.domNode,J=L.layoutAlign;
var K=E.style;
K.left=B.l+"px";
K.top=B.t+"px";
K.bottom=K.right="auto";
dojo.addClass(E,"dijitAlign"+C(J));
if(J=="top"||J=="bottom"){D(L,{w:B.w});
B.h-=L.h;
if(J=="top"){B.t+=L.h
}else{K.top=B.t+B.h+"px"
}}else{if(J=="left"||J=="right"){D(L,{h:B.h});
B.w-=L.w;
if(J=="left"){B.l+=L.w
}else{K.left=B.l+B.w+"px"
}}else{if(J=="client"){D(L,B)
}}}})
}
})()
}if(!dojo._hasResource["dijit.form._FormWidget"]){dojo._hasResource["dijit.form._FormWidget"]=true;
dojo.provide("dijit.form._FormWidget");
dojo.declare("dijit.form._FormWidget",[dijit._Widget,dijit._Templated],{baseClass:"",value:"",name:"",id:"",alt:"",type:"text",tabIndex:"0",disabled:false,intermediateChanges:false,attributeMap:dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap),{id:"focusNode",tabIndex:"focusNode",alt:"focusNode"}),setDisabled:function(B){this.domNode.disabled=this.disabled=B;
if(this.focusNode){this.focusNode.disabled=B
}if(B){this._hovering=false;
this._active=false
}dijit.setWaiState(this.focusNode||this.domNode,"disabled",B);
this._setStateClass()
},_onMouse:function(F){var G=F.target;
if(G&&G.getAttribute){this.stateModifier=G.getAttribute("stateModifier")||""
}if(!this.disabled){switch(F.type){case"mouseenter":case"mouseover":this._hovering=true;
break;
case"mouseout":case"mouseleave":this._hovering=false;
break;
case"mousedown":this._active=true;
var E=this;
var H=this.connect(dojo.body(),"onmouseup",function(){E._active=false;
E._setStateClass();
E.disconnect(H)
});
break
}this._setStateClass()
}},isFocusable:function(){return !this.disabled&&(dojo.style(this.domNode,"display")!="none")
},focus:function(){dijit.focus(this.focusNode)
},_setStateClass:function(){if(!("staticClass" in this)){this.staticClass=(this.stateNode||this.domNode).className
}var D=[this.baseClass];
function C(A){D=D.concat(dojo.map(D,function(B){return B+A
}))
}if(this.checked){C("Checked")
}if(this.state){C(this.state)
}if(this.selected){C("Selected")
}if(this.disabled){C("Disabled")
}else{if(this._active){C(this.stateModifier+"Active")
}else{if(this._focused){C("Focused")
}if((this.stateModifier||!this._focused)&&this._hovering){C(this.stateModifier+"Hover")
}}}(this.stateNode||this.domNode).className=this.staticClass+" "+D.join(" ")
},onChange:function(B){},postCreate:function(){this.setValue(this.value,null);
this.setDisabled(this.disabled);
this._setStateClass()
},setValue:function(D,C){this._lastValue=D;
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",this.forWaiValuenow());
if(C===undefined){C=true
}if(this._lastValueReported==undefined&&C===null){this._lastValueReported=D
}if((this.intermediateChanges||C)&&((D&&D.toString)?D.toString():D)!==((this._lastValueReported&&this._lastValueReported.toString)?this._lastValueReported.toString():this._lastValueReported)){this._lastValueReported=D;
this.onChange(D)
}},getValue:function(){return this._lastValue
},undo:function(){this.setValue(this._lastValueReported,false)
},_onKeyPress:function(F){if(F.keyCode==dojo.keys.ESCAPE&&!F.shiftKey&&!F.ctrlKey&&!F.altKey){var D=this.getValue();
var E=this._lastValueReported;
if((typeof E!="undefined")&&((D!==null&&D.toString)?D.toString():null)!==E.toString()){this.undo();
dojo.stopEvent(F);
return false
}}return true
},forWaiValuenow:function(){return this.getValue()
}})
}if(!dojo._hasResource["dijit.dijit"]){dojo._hasResource["dijit.dijit"]=true;
dojo.provide("dijit.dijit")
};