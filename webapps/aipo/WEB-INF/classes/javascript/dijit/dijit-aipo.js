if(!dojo._hasResource["dijit._base.focus"]){dojo._hasResource["dijit._base.focus"]=true;
dojo.provide("dijit._base.focus");
dojo.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){var E=dojo.global;
var D=dojo.doc;
if(D.selection){return !D.selection.createRange().text
}else{if(E.getSelection){var F=E.getSelection();
if(dojo.isString(F)){return !F
}else{return F.isCollapsed||!F.toString()
}}}},getBookmark:function(){var E,F=dojo.doc.selection;
if(F){var D=F.createRange();
if(F.type.toUpperCase()=="CONTROL"){E=D.length?dojo._toArray(D):null
}else{E=D.getBookmark()
}}else{if(dojo.global.getSelection){F=dojo.global.getSelection();
if(F){var D=F.getRangeAt(0);
E=D.cloneRange()
}}else{console.debug("No idea how to store the current selection for this browser!")
}}return E
},moveToBookmark:function(F){var E=dojo.doc;
if(E.selection){var H;
if(dojo.isArray(F)){H=E.body.createControlRange();
dojo.forEach(F,H.addElement)
}else{H=E.selection.createRange();
H.moveToBookmark(F)
}H.select()
}else{var G=dojo.global.getSelection&&dojo.global.getSelection();
if(G&&G.removeAllRanges){G.removeAllRanges();
G.addRange(F)
}else{console.debug("No idea how to restore selection for this browser!")
}}},getFocus:function(D,C){return{node:D&&dojo.isDescendant(dijit._curFocus,D.domNode)?dijit._prevFocus:dijit._curFocus,bookmark:!dojo.withGlobal(C||dojo.global,dijit.isCollapsed)?dojo.withGlobal(C||dojo.global,dijit.getBookmark):null,openedForWindow:C}
},focus:function(J){if(!J){return 
}var K="node" in J?J.node:J,L=J.bookmark,G=J.openedForWindow;
if(K){var H=(K.tagName.toLowerCase()=="iframe")?K.contentWindow:K;
if(H&&H.focus){try{H.focus()
}catch(I){}}dijit._onFocusNode(K)
}if(L&&dojo.withGlobal(G||dojo.global,dijit.isCollapsed)){if(G){G.focus()
}try{dojo.withGlobal(G||dojo.global,moveToBookmark,null,[L])
}catch(I){}}},_activeStack:[],registerWin:function(D){if(!D){D=window
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
},_onFocusNode:function(D){if(D&&D.tagName&&D.tagName.toLowerCase()=="body"){return 
}dijit._onTouchNode(D);
if(D==dijit._curFocus){return 
}dijit._prevFocus=dijit._curFocus;
dijit._curFocus=D;
dojo.publish("focusNode",[D]);
var C=dijit.getEnclosingWidget(D);
if(C&&C._setStateClass){C._focused=true;
C._setStateClass()
}},_setStack:function(F){var G=dijit._activeStack;
dijit._activeStack=F;
for(var I=0;
I<Math.min(G.length,F.length);
I++){if(G[I]!=F[I]){break
}}for(var J=G.length-1;
J>=I;
J--){var H=dijit.byId(G[J]);
if(H){dojo.publish("widgetBlur",[H]);
if(H._onBlur){H._onBlur()
}}}for(var J=I;
J<F.length;
J++){var H=dijit.byId(F[J]);
if(H){dojo.publish("widgetFocus",[H]);
if(H._onFocus){H._onFocus()
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
dijit.getViewport=function(){var M=dojo.global;
var P=dojo.doc;
var O=0,K=0;
if(dojo.isMozilla){var N,J,R,L;
if(P.body.clientWidth>P.documentElement.clientWidth){N=P.documentElement.clientWidth;
R=P.body.clientWidth
}else{R=P.documentElement.clientWidth;
N=P.body.clientWidth
}if(P.body.clientHeight>P.documentElement.clientHeight){J=P.documentElement.clientHeight;
L=P.body.clientHeight
}else{L=P.documentElement.clientHeight;
J=P.body.clientHeight
}O=(R>M.innerWidth)?N:R;
K=(L>M.innerHeight)?J:L
}else{if(!dojo.isOpera&&M.innerWidth){O=M.innerWidth;
K=M.innerHeight
}else{if(dojo.isIE&&P.documentElement&&P.documentElement.clientHeight){O=P.documentElement.clientWidth;
K=P.documentElement.clientHeight
}else{if(dojo.body().clientWidth){O=dojo.body().clientWidth;
K=dojo.body().clientHeight
}}}}var Q=dojo._docScroll();
return{w:O,h:K,l:Q.x,t:Q.y}
};
dijit.placeOnScreen=function(J,G,F,I){var H=dojo.map(F,function(A){return{corner:A,pos:G}
});
return dijit._place(J,H)
};
dijit._place=function(V,Y,c){var b=dijit.getViewport();
if(!V.parentNode||String(V.parentNode.tagName).toLowerCase()!="body"){dojo.body().appendChild(V)
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
var j=dojo.marginBox(V);
V.style.display=Z;
V.style.visibility=i;
var S=(d.charAt(1)=="L"?e.x:Math.max(b.l,e.x-j.w)),T=(d.charAt(0)=="T"?e.y:Math.max(b.t,e.y-j.h)),g=(d.charAt(1)=="L"?Math.min(b.l+b.w,S+j.w):e.x),h=(d.charAt(0)=="T"?Math.min(b.t+b.h,T+j.h):e.y),X=g-S,a=h-T,W=(j.w-X)+(j.h-a);
if(f==null||W<f.overflow){f={corner:d,aroundCorner:Y[U].aroundCorner,x:S,y:T,w:X,h:a,overflow:W}
}if(W==0){break
}}V.style.left=f.x+"px";
V.style.top=f.y+"px";
return f
};
dijit.placeOnScreenAroundElement=function(M,T,S,L){T=dojo.byId(T);
var Q=T.style.display;
T.style.display="";
var P=T.offsetWidth;
var K=T.offsetHeight;
var R=dojo.coords(T,true);
T.style.display=Q;
var O=[];
for(var N in S){O.push({aroundCorner:N,corner:S[N],pos:{x:R.x+(N.charAt(1)=="L"?0:P),y:R.y+(N.charAt(0)=="T"?0:K)}})
}return dijit._place(M,O,L)
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
dijit.popup=new function(){var D=[],F=1000,E=1;
this.open=function(C){var N=C.popup,O=C.orient||{BL:"TL",TL:"BL"},B=C.around,S=(C.around&&C.around.id)?(C.around.id+"_dropdown"):("popup_"+E++);
var T=dojo.doc.createElement("div");
T.id=S;
T.className="dijitPopup";
T.style.zIndex=F+D.length;
T.style.visibility="hidden";
if(C.parent){T.dijitPopupParent=C.parent.id
}dojo.body().appendChild(T);
N.domNode.style.display="";
T.appendChild(N.domNode);
var P=new dijit.BackgroundIframe(T);
var Q=B?dijit.placeOnScreenAroundElement(T,B,O,N.orient?dojo.hitch(N,"orient"):null):dijit.placeOnScreen(T,C,O=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"]);
T.style.visibility="visible";
var R=[];
function A(){for(var G=D.length-1;
G>0&&D[G].parent===D[G-1].widget;
G--){}return D[G]
}R.push(dojo.connect(T,"onkeypress",this,function(H){if(H.keyCode==dojo.keys.ESCAPE&&C.onCancel){C.onCancel()
}else{if(H.keyCode==dojo.keys.TAB){dojo.stopEvent(H);
var G=A();
if(G&&G.onCancel){G.onCancel()
}}}}));
if(N.onCancel){R.push(dojo.connect(N,"onCancel",null,C.onCancel))
}R.push(dojo.connect(N,N.onExecute?"onExecute":"onChange",null,function(){var G=A();
if(G&&G.onExecute){G.onExecute()
}}));
D.push({wrapper:T,iframe:P,widget:N,parent:C.parent,onExecute:C.onExecute,onCancel:C.onCancel,onClose:C.onClose,handlers:R});
if(N.onOpen){N.onOpen(Q)
}return Q
};
this.close=function(K){while(dojo.some(D,function(G){return G.widget==K
})){var B=D.pop(),A=B.wrapper,J=B.iframe,C=B.widget,L=B.onClose;
if(C.onClose){C.onClose()
}dojo.forEach(B.handlers,dojo.disconnect);
if(!C||!C.domNode){return 
}dojo.style(C.domNode,"display","none");
dojo.body().appendChild(C.domNode);
J.destroy();
dojo._destroyElement(A);
if(L){L()
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
}dijit.BackgroundIframe=function(D){if(!D.id){throw new Error("no id")
}if((dojo.isIE&&dojo.isIE<7)||(dojo.isFF&&dojo.isFF<3&&dojo.hasClass(dojo.body(),"dijit_a11y"))){var C=dijit._frames.pop();
D.appendChild(C);
if(dojo.isIE){C.style.setExpression("width","document.getElementById('"+D.id+"').offsetWidth");
C.style.setExpression("height","document.getElementById('"+D.id+"').offsetHeight")
}this.iframe=C
}};
dojo.extend(dijit.BackgroundIframe,{destroy:function(){if(this.iframe){dijit._frames.push(this.iframe);
delete this.iframe
}}})
}if(!dojo._hasResource["dijit._base.scroll"]){dojo._hasResource["dijit._base.scroll"]=true;
dojo.provide("dijit._base.scroll");
dijit.scrollIntoView=function(G){if(dojo.isIE){if(dojo.marginBox(G.parentNode).h<=G.parentNode.scrollHeight){G.scrollIntoView(false)
}}else{if(dojo.isMozilla){G.scrollIntoView(false)
}else{var E=G.parentNode;
var H=E.scrollTop+dojo.marginBox(E).h;
var F=G.offsetTop+dojo.marginBox(G).h;
if(H<F){E.scrollTop+=(F-H)
}else{if(E.scrollTop>G.offsetTop){E.scrollTop-=(E.scrollTop-G.offsetTop)
}}}}}
}if(!dojo._hasResource["dijit._base.sniff"]){dojo._hasResource["dijit._base.sniff"]=true;
dojo.provide("dijit._base.sniff");
(function(){var I=dojo;
var J=I.isIE;
var H=I.isOpera;
var N=Math.floor;
var L={dj_ie:J,dj_ie6:N(J)==6,dj_ie7:N(J)==7,dj_iequirks:J&&I.isQuirks,dj_opera:H,dj_opera8:N(H)==8,dj_opera9:N(H)==9,dj_khtml:I.isKhtml,dj_safari:I.isSafari,dj_gecko:I.isMozilla};
for(var K in L){if(L[K]){var M=dojo.doc.documentElement;
if(M.className){M.className+=" "+K
}else{M.className=K
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
},trigger:function(H,I,M,J,K,N,L){if(K!=this._obj){this.stop();
this._initialDelay=L||500;
this._subsequentDelay=N||0.9;
this._obj=K;
this._evt=H;
this._node=M;
this._currentTimeout=-1;
this._count=-1;
this._callback=dojo.hitch(I,J);
this._fireEventAndReload()
}},stop:function(){if(this._timer){clearTimeout(this._timer);
this._timer=null
}if(this._obj){this._callback(-1,this._node,this._evt);
this._obj=null
}},addKeyListener:function(K,G,H,I,L,J){return[dojo.connect(K,"onkeypress",this,function(A){if(A.keyCode==G.keyCode&&(!G.charCode||G.charCode==A.charCode)&&(G.ctrlKey===undefined||G.ctrlKey==A.ctrlKey)&&(G.altKey===undefined||G.altKey==A.ctrlKey)&&(G.shiftKey===undefined||G.shiftKey==A.ctrlKey)){dojo.stopEvent(A);
dijit.typematic.trigger(G,H,K,I,G,L,J)
}else{if(dijit.typematic._obj==G){dijit.typematic.stop()
}}}),dojo.connect(K,"onkeyup",this,function(A){if(dijit.typematic._obj==G){dijit.typematic.stop()
}})]
},addMouseListener:function(K,H,I,L,J){var G=dojo.connect;
return[G(K,"mousedown",this,function(A){dojo.stopEvent(A);
dijit.typematic.trigger(A,H,K,I,K,L,J)
}),G(K,"mouseup",this,function(A){dojo.stopEvent(A);
dijit.typematic.stop()
}),G(K,"mouseout",this,function(A){dojo.stopEvent(A);
dijit.typematic.stop()
}),G(K,"mousemove",this,function(A){dojo.stopEvent(A)
}),G(K,"dblclick",this,function(A){dojo.stopEvent(A);
if(dojo.isIE){dijit.typematic.trigger(A,H,K,I,K,L,J);
setTimeout(dijit.typematic.stop,50)
}})]
},addListener:function(L,K,H,I,J,N,M){return this.addKeyListener(K,H,I,J,N,M).concat(this.addMouseListener(L,I,J,N,M))
}}
}if(!dojo._hasResource["dijit._base.wai"]){dojo._hasResource["dijit._base.wai"]=true;
dojo.provide("dijit._base.wai");
dijit.wai={onload:function(){var D=document.createElement("div");
D.id="a11yTestNode";
D.style.cssText='border: 1px solid;border-color:red green;position: absolute;height: 5px;top: -999px;background-image: url("'+dojo.moduleUrl("dijit","form/templates/blank.gif")+'");';
dojo.body().appendChild(D);
function C(){var B=dojo.getComputedStyle(D);
if(B){var F=B.backgroundImage;
var A=(B.borderTopColor==B.borderRightColor)||(F!=null&&(F=="none"||F=="url(invalid-url:)"));
dojo[A?"addClass":"removeClass"](dojo.body(),"dijit_a11y")
}}C();
if(dojo.isIE){setInterval(C,4000)
}}};
if(dojo.isIE||dojo.isMoz){dojo._loaders.unshift(dijit.wai.onload)
}dojo.mixin(dijit,{hasWaiRole:function(B){if(B.hasAttribute){return B.hasAttribute("role")
}else{return B.getAttribute("role")?true:false
}},getWaiRole:function(F){var E=F.getAttribute("role");
if(E){var D=E.indexOf(":");
return D==-1?E:E.substring(D+1)
}else{return""
}},setWaiRole:function(C,D){if(dojo.isFF&&dojo.isFF<3){C.setAttribute("role","wairole:"+D)
}else{C.setAttribute("role",D)
}},removeWaiRole:function(B){B.removeAttribute("role")
},hasWaiState:function(C,D){if(dojo.isFF&&dojo.isFF<3){return C.hasAttributeNS("http://www.w3.org/2005/07/aaa",D)
}else{if(C.hasAttribute){return C.hasAttribute("aria-"+D)
}else{return C.getAttribute("aria-"+D)?true:false
}}},getWaiState:function(D,E){if(dojo.isFF&&dojo.isFF<3){return D.getAttributeNS("http://www.w3.org/2005/07/aaa",E)
}else{var F=D.getAttribute("aria-"+E);
return F?F:""
}},setWaiState:function(D,E,F){if(dojo.isFF&&dojo.isFF<3){D.setAttributeNS("http://www.w3.org/2005/07/aaa","aaa:"+E,F)
}else{D.setAttribute("aria-"+E,F)
}},removeWaiState:function(C,D){if(dojo.isFF&&dojo.isFF<3){C.removeAttributeNS("http://www.w3.org/2005/07/aaa",D)
}else{C.removeAttribute("aria-"+D)
}}})
}if(!dojo._hasResource["dijit._base"]){dojo._hasResource["dijit._base"]=true;
dojo.provide("dijit._base")
}if(!dojo._hasResource["dojo.date.stamp"]){dojo._hasResource["dojo.date.stamp"]=true;
dojo.provide("dojo.date.stamp");
dojo.date.stamp.fromISOString=function(I,L){if(!dojo.date.stamp._isoRegExp){dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/
}var K=dojo.date.stamp._isoRegExp.exec(I);
var G=null;
if(K){K.shift();
K[1]&&K[1]--;
K[6]&&(K[6]*=1000);
if(L){L=new Date(L);
dojo.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(A){return L["get"+A]()
}).forEach(function(A,B){if(K[B]===undefined){K[B]=A
}})
}G=new Date(K[0]||1970,K[1]||0,K[2]||0,K[3]||0,K[4]||0,K[5]||0,K[6]||0);
var H=0;
var J=K[7]&&K[7].charAt(0);
if(J!="Z"){H=((K[8]||0)*60)+(Number(K[9])||0);
if(J!="-"){H*=-1
}}if(J){H-=G.getTimezoneOffset()
}if(H){G.setTime(G.getTime()+H*60000)
}}return G
};
dojo.date.stamp.toISOString=function(S,O){var P=function(A){return(A<10)?"0"+A:A
};
O=O||{};
var T=[];
var R=O.zulu?"getUTC":"get";
var L="";
if(O.selector!="time"){L=[S[R+"FullYear"](),P(S[R+"Month"]()+1),P(S[R+"Date"]())].join("-")
}T.push(L);
if(O.selector!="date"){var M=[P(S[R+"Hours"]()),P(S[R+"Minutes"]()),P(S[R+"Seconds"]())].join(":");
var N=S[R+"Milliseconds"]();
if(O.milliseconds){M+="."+(N<100?"0":"")+P(N)
}if(O.zulu){M+="Z"
}else{if(O.selector!="time"){var Q=S.getTimezoneOffset();
var K=Math.abs(Q);
M+=(Q>0?"-":"+")+P(Math.floor(K/60))+":"+P(K%60)
}}T.push(M)
}return T.join("T")
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
}function J(B,C){switch(C){case"string":return B;
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
}}var H={};
function I(D){if(!H[D]){var L=G.getObject(D);
if(!G.isFunction(L)){throw new Error("Could not load class '"+D+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?")
}var C=L.prototype;
var A={};
for(var E in C){if(E.charAt(0)=="_"){continue
}var B=C[E];
A[E]=F(B)
}H[D]={cls:L,params:A}
}return H[D]
}this._functionFromScript=function(D){var C="";
var A="";
var E=D.getAttribute("args");
if(E){G.forEach(E.split(/\s*,\s*/),function(M,N){C+="var "+M+" = arguments["+N+"]; "
})
}var B=D.getAttribute("with");
if(B&&B.length){G.forEach(B.split(/\s*,\s*/),function(L){C+="with("+L+"){";
A+="}"
})
}return new Function(C+D.innerHTML+A)
};
this.instantiate=function(B){var A=[];
G.forEach(B,function(h){if(!h){return 
}var Z=h.getAttribute("dojoType");
if((!Z)||(!Z.length)){return 
}var c=I(Z);
var b=c.cls;
var j=b._noScript||b.prototype._noScript;
var g={};
var e=h.attributes;
for(var i in c.params){var D=e.getNamedItem(i);
if(!D||(!D.specified&&(!dojo.isIE||i.toLowerCase()!="value"))){continue
}var X=D.value;
switch(i){case"class":X=h.className;
break;
case"style":X=h.style&&h.style.cssText
}var d=c.params[i];
g[i]=J(X,d)
}if(!j){var f=[],C=[];
G.query("> script[type^='dojo/']",h).orphan().forEach(function(N){var L=N.getAttribute("event"),M=N.getAttribute("type"),K=G.parser._functionFromScript(N);
if(L){if(M=="dojo/connect"){f.push({event:L,func:K})
}else{g[L]=K
}}else{C.push(K)
}})
}var Y=b.markupFactory;
if(!Y&&b.prototype){Y=b.prototype.markupFactory
}var E=Y?Y(g,h,b):new b(g,h);
A.push(E);
var a=h.getAttribute("jsId");
if(a){G.setObject(a,E)
}if(!j){dojo.forEach(f,function(K){dojo.connect(E,K.event,null,K.func)
});
dojo.forEach(C,function(K){K.call(E)
})
}});
G.forEach(A,function(C){if(C&&(C.startup)&&((!C.getParent)||(!C.getParent()))){C.startup()
}});
return A
};
this.parse=function(C){var B=G.query("[dojoType]",C);
var A=this.instantiate(B);
return A
}
}();
(function(){var B=function(){if(djConfig.parseOnLoad==true){dojo.parser.parse()
}};
if(dojo.exists("dijit.wai.onload")&&(dijit.wai.onload===dojo._loaders[0])){dojo._loaders.splice(1,0,B)
}else{dojo._loaders.unshift(B)
}})();
dojo.parser._anonCtr=0;
dojo.parser._anon={};
dojo.parser._nameAnonFunc=function(G,I){var J="$joinpoint";
var K=(I||dojo.parser._anon);
if(dojo.isIE){var H=G.__dojoNameCache;
if(H&&K[H]===G){return G.__dojoNameCache
}}var L="__"+dojo.parser._anonCtr++;
while(typeof K[L]!="undefined"){L="__"+dojo.parser._anonCtr++
}K[L]=G;
return L
}
}if(!dojo._hasResource["dijit._Widget"]){dojo._hasResource["dijit._Widget"]=true;
dojo.provide("dijit._Widget");
dojo.declare("dijit._Widget",null,{id:"",lang:"",dir:"","class":"",style:"",title:"",srcNodeRef:null,domNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},postscript:function(D,C){this.create(D,C)
},create:function(G,J){this.srcNodeRef=dojo.byId(J);
this._connects=[];
this._attaches=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){this.id=this.srcNodeRef.id
}if(G){dojo.mixin(this,G)
}this.postMixInProperties();
if(!this.id){this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"))
}dijit.registry.add(this);
this.buildRendering();
if(this.domNode){for(var F in this.attributeMap){var H=this[this.attributeMap[F]||"domNode"];
var I=this[F];
if(typeof I!="object"&&(I!==""||(G&&G[F]))){switch(F){case"class":dojo.addClass(H,I);
break;
case"style":if(H.style.cssText){H.style.cssText+="; "+I
}else{H.style.cssText=I
}break;
default:H.setAttribute(F,I)
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
},nodesWithKeyClick:["input","button"],connect:function(H,I,G){var J=[];
if(I=="ondijitclick"){var F=this;
if(!this.nodesWithKeyClick[H.nodeName]){J.push(dojo.connect(H,"onkeydown",this,function(A){if(A.keyCode==dojo.keys.ENTER){return(dojo.isString(G))?F[G](A):G.call(F,A)
}else{if(A.keyCode==dojo.keys.SPACE){dojo.stopEvent(A)
}}}));
J.push(dojo.connect(H,"onkeyup",this,function(A){if(A.keyCode==dojo.keys.SPACE){return dojo.isString(G)?F[G](A):G.call(F,A)
}}))
}I="onclick"
}J.push(dojo.connect(H,I,this,G));
this._connects.push(J);
return J
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
dojo.string.substitute=function(G,F,H,E){return G.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(D,C,A){var B=dojo.getObject(C,false,F);
if(A){B=dojo.getObject(A,false,E)(B)
}if(H){B=H(B,C)
}return B.toString()
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
dojo.declare("dijit._Templated",null,{templateNode:null,templateString:null,templatePath:null,widgetsInTemplate:false,containerNode:null,_skipNodeCache:false,buildRendering:function(){var L=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var K;
if(dojo.isString(L)){var M=this.declaredClass,I=this;
var H=dojo.string.substitute(L,this,function(A,B){if(B.charAt(0)=="!"){A=I[B.substr(1)]
}if(typeof A=="undefined"){throw new Error(M+" template:"+B)
}if(!A){return""
}return B.charAt(0)=="!"?A:A.toString().replace(/"/g,"&quot;")
},this);
K=dijit._Templated._createNodesFromText(H)[0]
}else{K=L.cloneNode(true)
}this._attachTemplateNodes(K);
var J=this.srcNodeRef;
if(J&&J.parentNode){J.parentNode.replaceChild(K,J)
}this.domNode=K;
if(this.widgetsInTemplate){var N=dojo.parser.parse(K);
this._attachTemplateNodes(N,function(A,B){return A[B]
})
}this._fillContent(J)
},_fillContent:function(D){var C=this.containerNode;
if(D&&C){while(D.hasChildNodes()){C.appendChild(D.firstChild)
}}},_attachTemplateNodes:function(Q,d){d=d||function(A,B){return A.getAttribute(B)
};
var S=dojo.isArray(Q)?Q:(Q.all||Q.getElementsByTagName("*"));
var Z=dojo.isArray(Q)?0:-1;
for(;
Z<S.length;
Z++){var R=(Z==-1)?Q:S[Z];
if(this.widgetsInTemplate&&d(R,"dojoType")){continue
}var f=d(R,"dojoAttachPoint");
if(f){var Y,W=f.split(/\s*,\s*/);
while(Y=W.shift()){if(dojo.isArray(this[Y])){this[Y].push(R)
}else{this[Y]=R
}}}var a=d(R,"dojoAttachEvent");
if(a){var T,V=a.split(/\s*,\s*/);
var e=dojo.trim;
while(T=V.shift()){if(T){var c=null;
if(T.indexOf(":")!=-1){var U=T.split(":");
T=e(U[0]);
c=e(U[1])
}else{T=e(T)
}if(!c){c=T
}this.connect(R,T,c)
}}}var b=d(R,"waiRole");
if(b){dijit.setWaiRole(R,b)
}var X=d(R,"waiState");
if(X){dojo.forEach(X.split(/\s*,\s*/),function(A){if(A.indexOf("-")!=-1){var B=A.split("-");
dijit.setWaiState(R,B[0],B[1])
}})
}}}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(K,J,H){var I=dijit._Templated._templateCache;
var G=J||K;
var L=I[G];
if(L){return L
}if(!J){J=dijit._Templated._sanitizeTemplateString(dojo._getText(K))
}J=dojo.string.trim(J);
if(J.match(/\$\{([^\}]+)\}/g)||H){return(I[G]=J)
}else{return(I[G]=dijit._Templated._createNodesFromText(J)[0])
}};
dijit._Templated._sanitizeTemplateString=function(C){if(C){C=C.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var D=C.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(D){C=D[1]
}}else{C=""
}return C
};
if(dojo.isIE){dojo.addOnUnload(function(){var D=dijit._Templated._templateCache;
for(var F in D){var E=D[F];
if(!isNaN(E.nodeType)){dojo._destroyElement(E)
}delete D[F]
}})
}(function(){var D={cell:{re:/^<t[dh][\s\r\n>]/i,pre:"<table><tbody><tr>",post:"</tr></tbody></table>"},row:{re:/^<tr[\s\r\n>]/i,pre:"<table><tbody>",post:"</tbody></table>"},section:{re:/^<(thead|tbody|tfoot)[\s\r\n>]/i,pre:"<table>",post:"</table>"}};
var C;
dijit._Templated._createNodesFromText=function(A){if(!C){C=dojo.doc.createElement("div");
C.style.display="none";
dojo.body().appendChild(C)
}var M="none";
var O=A.replace(/^\s+/,"");
for(var L in D){var K=D[L];
if(K.re.test(O)){M=L;
A=K.pre+A+K.post;
break
}}C.innerHTML=A;
if(C.normalize){C.normalize()
}var P={cell:"tr",row:"tbody",section:"table"}[M];
var B=(typeof P!="undefined")?C.getElementsByTagName(P)[0]:C;
var N=[];
while(B.firstChild){N.push(B.removeChild(B.firstChild))
}C.innerHTML="";
return N
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
},_getSibling:function(F){var D=this.domNode;
do{D=D[F+"Sibling"]
}while(D&&D.nodeType!=1);
if(!D){return null
}var E=D.getAttribute("widgetId");
return dijit.byId(E)
},getPreviousSibling:function(){return this._getSibling("previous")
},getNextSibling:function(){return this._getSibling("next")
}});
dojo.declare("dijit._Container",null,{isContainer:true,addChild:function(F,E){if(E===undefined){E="last"
}var H=this.containerNode||this.domNode;
if(E&&typeof E=="number"){var G=dojo.query("> [widgetid]",H);
if(G&&G.length>=E){H=G[E-1];
E="after"
}}dojo.place(F.domNode,H,E);
if(this._started&&!F._started){F.startup()
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
},_getSiblingOfChild:function(F,E){var H=F.domNode;
var G=(E>0?"nextSibling":"previousSibling");
do{H=H[G]
}while(H&&(H.nodeType!=1||!dijit.byNode(H)));
return H?dijit.byNode(H):null
}});
dojo.declare("dijit._KeyNavContainer",[dijit._Container],{_keyNavCodes:{},connectKeyNavHandlers:function(F,G){var J=this._keyNavCodes={};
var H=dojo.hitch(this,this.focusPrev);
var I=dojo.hitch(this,this.focusNext);
dojo.forEach(F,function(A){J[A]=H
});
dojo.forEach(G,function(A){J[A]=I
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
}},focusChild:function(D,C){if(D){if(this.focusedChild&&D!==this.focusedChild){this._onChildBlur(this.focusedChild)
}this.focusedChild=D;
if(C&&D.focusFocalNode){D.focusFocalNode(C)
}else{D.focus()
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
},_getNextFocusableChild:function(F,E){if(F){F=this._getSiblingOfChild(F,E)
}var G=this.getChildren();
for(var H=0;
H<G.length;
H++){if(!F){F=G[(E>0)?0:(G.length-1)]
}if(F.isFocusable()){return F
}F=this._getSiblingOfChild(F,E)
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
(function(){var D=function(A){return A.substring(0,1).toUpperCase()+A.substring(1)
};
var C=function(B,A){B.resize?B.resize(A):dojo.marginBox(B.domNode,A);
dojo.mixin(B,dojo.marginBox(B.domNode));
dojo.mixin(B,A)
};
dijit.layout.layoutChildren=function(F,A,B){A=dojo.mixin({},A);
dojo.addClass(F,"dijitLayoutContainer");
B=dojo.filter(B,function(E){return E.layoutAlign!="client"
}).concat(dojo.filter(B,function(E){return E.layoutAlign=="client"
}));
dojo.forEach(B,function(E){var J=E.domNode,K=E.layoutAlign;
var L=J.style;
L.left=A.l+"px";
L.top=A.t+"px";
L.bottom=L.right="auto";
dojo.addClass(J,"dijitAlign"+D(K));
if(K=="top"||K=="bottom"){C(E,{w:A.w});
A.h-=E.h;
if(K=="top"){A.t+=E.h
}else{L.top=A.t+A.h+"px"
}}else{if(K=="left"||K=="right"){C(E,{h:A.h});
A.w-=E.w;
if(K=="left"){A.l+=E.w
}else{L.left=A.l+A.w+"px"
}}else{if(K=="client"){C(E,A)
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
},_onMouse:function(G){var F=G.target;
if(F&&F.getAttribute){this.stateModifier=F.getAttribute("stateModifier")||""
}if(!this.disabled){switch(G.type){case"mouseenter":case"mouseover":this._hovering=true;
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
}if(!dojo._hasResource["dojo.i18n"]){dojo._hasResource["dojo.i18n"]=true;
dojo.provide("dojo.i18n");
dojo.i18n.getLocalization=function(M,L,Q){Q=dojo.i18n.normalizeLocale(Q);
var N=Q.split("-");
var K=[M,"nls",L].join(".");
var O=dojo._loadedModules[K];
if(O){var P;
for(var T=N.length;
T>0;
T--){var R=N.slice(0,T).join("_");
if(O[R]){P=O[R];
break
}}if(!P){P=O.ROOT
}if(P){var S=function(){};
S.prototype=P;
return new S()
}}throw new Error("Bundle not found: "+L+" in "+M+" , locale="+Q)
};
dojo.i18n.normalizeLocale=function(D){var C=D?D.toLowerCase():dojo.locale;
if(C=="root"){C="ROOT"
}return C
};
dojo.i18n._requireLocalization=function(U,T,X,b){var e=dojo.i18n.normalizeLocale(X);
var h=[U,"nls",T].join(".");
var R="";
if(b){var Y=b.split(",");
for(var d=0;
d<Y.length;
d++){if(e.indexOf(Y[d])==0){if(Y[d].length>R.length){R=Y[d]
}}}if(!R){R="ROOT"
}}var a=b?R:e;
var V=dojo._loadedModules[h];
var S=null;
if(V){if(djConfig.localizationComplete&&V._built){return 
}var f=a.replace(/-/g,"_");
var Z=h+"."+f;
S=dojo._loadedModules[Z]
}if(!S){V=dojo.provide(h);
var g=dojo._getModuleSymbols(U);
var c=g.concat("nls").join("/");
var W;
dojo.i18n._searchLocalePath(a,b,function(B){var A=B.replace(/-/g,"_");
var C=h+"."+A;
var E=false;
if(!dojo._loadedModules[C]){dojo.provide(C);
var D=[c];
if(B!="ROOT"){D.push(B)
}D.push(T);
var F=D.join("/")+".js";
E=dojo._loadPath(F,null,function(G){var H=function(){};
H.prototype=W;
V[A]=new H();
for(var I in G){V[A][I]=G[I]
}})
}else{E=true
}if(E&&V[A]){W=V[A]
}else{V[A]=W
}if(b){return true
}})
}if(b&&e!=R){V[e.replace(/-/g,"_")]=V[R.replace(/-/g,"_")]
}};
(function(){var C=djConfig.extraLocale;
if(C){if(!C instanceof Array){C=[C]
}var D=dojo.i18n._requireLocalization;
dojo.i18n._requireLocalization=function(H,I,J,A){D(H,I,J,A);
if(J){return 
}for(var B=0;
B<C.length;
B++){D(H,I,C[B],A)
}}
}})();
dojo.i18n._searchLocalePath=function(O,N,K){O=dojo.i18n.normalizeLocale(O);
var M=O.split("-");
var L=[];
for(var R=M.length;
R>0;
R--){L.push(M.slice(0,R).join("-"))
}L.push(false);
if(N){L.reverse()
}for(var J=L.length-1;
J>=0;
J--){var Q=L[J]||"ROOT";
var P=K(Q);
if(P){break
}}};
dojo.i18n._preloadLocalizations=function(G,J){function I(A){A=dojo.i18n.normalizeLocale(A);
dojo.i18n._searchLocalePath(A,true,function(B){for(var C=0;
C<J.length;
C++){if(J[C]==B){dojo.require(G+"_"+B);
return true
}}return false
})
}I();
var F=djConfig.extraLocale||[];
for(var H=0;
H<F.length;
H++){I(F[H])
}}
}if(!dojo._hasResource["dojo.cldr.supplemental"]){dojo._hasResource["dojo.cldr.supplemental"]=true;
dojo.provide("dojo.cldr.supplemental");
dojo.cldr.supplemental.getFirstDayOfWeek=function(E){var H={mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,lb:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,tn:6,ye:6,as:0,au:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,ie:0,il:0,is:0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,za:0,zw:0,et:0,mw:0,ng:0,tj:0,gb:0,sy:4};
var G=dojo.cldr.supplemental._region(E);
var F=H[G];
return(typeof F=="undefined")?1:F
};
dojo.cldr.supplemental._region=function(D){D=dojo.i18n.normalizeLocale(D);
var F=D.split("-");
var E=F[1];
if(!E){E={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[F[0]]
}else{if(E.length==4){E=F[2]
}}return E
};
dojo.cldr.supplemental.getWeekend=function(L){var J={eg:5,il:5,sy:5,"in":0,ae:4,bh:4,dz:4,iq:4,jo:4,kw:4,lb:4,ly:4,ma:4,om:4,qa:4,sa:4,sd:4,tn:4,ye:4};
var G={ae:5,bh:5,dz:5,iq:5,jo:5,kw:5,lb:5,ly:5,ma:5,om:5,qa:5,sa:5,sd:5,tn:5,ye:5,af:5,ir:5,eg:6,il:6,sy:6};
var I=dojo.cldr.supplemental._region(L);
var H=J[I];
var K=G[I];
if(typeof H=="undefined"){H=6
}if(typeof K=="undefined"){K=0
}return{start:H,end:K}
}
}if(!dojo._hasResource["dojo.date"]){dojo._hasResource["dojo.date"]=true;
dojo.provide("dojo.date");
dojo.date.getDaysInMonth=function(D){var F=D.getMonth();
var E=[31,28,31,30,31,30,31,31,30,31,30,31];
if(F==1&&dojo.date.isLeapYear(D)){return 29
}return E[F]
};
dojo.date.isLeapYear=function(D){var C=D.getFullYear();
return !(C%400)||(!(C%4)&&!!(C%100))
};
dojo.date.getTimezoneName=function(K){var J=K.toString();
var H="";
var L;
var I=J.indexOf("(");
if(I>-1){H=J.substring(++I,J.indexOf(")"))
}else{var G=/([A-Z\/]+) \d{4}$/;
if((L=J.match(G))){H=L[1]
}else{J=K.toLocaleString();
G=/ ([A-Z\/]+)$/;
if((L=J.match(G))){H=L[1]
}}}return(H=="AM"||H=="PM")?"":H
};
dojo.date.compare=function(E,F,D){E=new Date(Number(E));
F=new Date(Number(F||new Date()));
if(typeof D!=="undefined"){if(D=="date"){E.setHours(0,0,0,0);
F.setHours(0,0,0,0)
}else{if(D=="time"){E.setFullYear(0,0,0);
F.setFullYear(0,0,0)
}}}if(E>F){return 1
}if(E<F){return -1
}return 0
};
dojo.date.add=function(M,N,X){var V=new Date(Number(M));
var O=false;
var R="Date";
switch(N){case"day":break;
case"weekday":var Q,P;
var T=0;
var S=X%5;
if(!S){Q=(X>0)?5:-5;
P=(X>0)?((X-5)/5):((X+5)/5)
}else{Q=S;
P=parseInt(X/5)
}var W=M.getDay();
if(W==6&&X>0){T=1
}else{if(W==0&&X<0){T=-1
}}var U=W+Q;
if(U==0||U==6){T=(X>0)?2:-2
}X=7*P+Q+T;
break;
case"year":R="FullYear";
O=true;
break;
case"week":X*=7;
break;
case"quarter":X*=3;
case"month":O=true;
R="Month";
break;
case"hour":case"minute":case"second":case"millisecond":R=N.charAt(0).toUpperCase()+N.substring(1)+"s"
}if(R){V["setUTC"+R](V["getUTC"+R]()+X)
}if(O&&(V.getDate()<M.getDate())){V.setDate(0)
}return V
};
dojo.date.difference=function(W,Y,R){Y=Y||new Date();
R=R||"day";
var S=Y.getFullYear()-W.getFullYear();
var a=1;
switch(R){case"quarter":var V=W.getMonth();
var X=Y.getMonth();
var d=Math.floor(V/3)+1;
var e=Math.floor(X/3)+1;
e+=(S*4);
a=e-d;
break;
case"weekday":var Z=Math.round(dojo.date.difference(W,Y,"day"));
var U=parseInt(dojo.date.difference(W,Y,"week"));
var b=Z%7;
if(b==0){Z=U*5
}else{var c=0;
var f=W.getDay();
var h=Y.getDay();
U=parseInt(Z/7);
b=Z%7;
var g=new Date(W);
g.setDate(g.getDate()+(U*7));
var T=g.getDay();
if(Z>0){switch(true){case f==6:c=-1;
break;
case f==0:c=0;
break;
case h==6:c=-1;
break;
case h==0:c=-2;
break;
case (T+b)>5:c=-2
}}else{if(Z<0){switch(true){case f==6:c=0;
break;
case f==0:c=1;
break;
case h==6:c=2;
break;
case h==0:c=1;
break;
case (T+b)<0:c=2
}}}Z+=c;
Z-=(U*2)
}a=Z;
break;
case"year":a=S;
break;
case"month":a=(Y.getMonth()-W.getMonth())+(S*12);
break;
case"week":a=parseInt(dojo.date.difference(W,Y,"day")/7);
break;
case"day":a/=24;
case"hour":a/=60;
case"minute":a/=60;
case"second":a/=1000;
case"millisecond":a*=Y.getTime()-W.getTime()
}return Math.round(a)
}
}if(!dojo._hasResource["dojo.regexp"]){dojo._hasResource["dojo.regexp"]=true;
dojo.provide("dojo.regexp");
dojo.regexp.escapeString=function(D,C){return D.replace(/([\.$?*!=:|{}\(\)\[\]\\\/^])/g,function(A){if(C&&C.indexOf(A)!=-1){return A
}return"\\"+A
})
};
dojo.regexp.buildGroupRE=function(J,G,H){if(!(J instanceof Array)){return G(J)
}var F=[];
for(var I=0;
I<J.length;
I++){F.push(G(J[I]))
}return dojo.regexp.group(F.join("|"),H)
};
dojo.regexp.group=function(D,C){return"("+(C?"?:":"")+D+")"
}
}if(!dojo._hasResource["dojo.date.locale"]){dojo._hasResource["dojo.date.locale"]=true;
dojo.provide("dojo.date.locale");
(function(){function F(B,C,A){return A.replace(/([a-z])\1*/ig,function(b){var X;
var Y=b.charAt(0);
var g=b.length;
var j;
var i=["abbr","wide","narrow"];
switch(Y){case"G":X=C[(g<4)?"eraAbbr":"eraNames"][B.getFullYear()<0?0:1];
break;
case"y":X=B.getFullYear();
switch(g){case 1:break;
case 2:X=String(X);
X=X.substr(X.length-2);
break;
default:j=true
}break;
case"Q":case"q":X=Math.ceil((B.getMonth()+1)/3);
j=true;
break;
case"M":case"L":var h=B.getMonth();
var l;
switch(g){case 1:case 2:X=h+1;
j=true;
break;
case 3:case 4:case 5:l=i[g-3];
break
}if(l){var Z=(Y=="L")?"standalone":"format";
var m=["months",Z,l].join("-");
X=C[m][h]
}break;
case"w":var n=0;
X=dojo.date.locale._getWeekOfYear(B,n);
j=true;
break;
case"d":X=B.getDate();
j=true;
break;
case"D":X=dojo.date.locale._getDayOfYear(B);
j=true;
break;
case"E":case"e":case"c":var a=B.getDay();
var l;
switch(g){case 1:case 2:if(Y=="e"){var c=dojo.cldr.supplemental.getFirstDayOfWeek(options.locale);
a=(a-c+7)%7
}if(Y!="c"){X=a+1;
j=true;
break
}case 3:case 4:case 5:l=i[g-3];
break
}if(l){var Z=(Y=="c")?"standalone":"format";
var m=["days",Z,l].join("-");
X=C[m][a]
}break;
case"a":var k=(B.getHours()<12)?"am":"pm";
X=C[k];
break;
case"h":case"H":case"K":case"k":var d=B.getHours();
switch(Y){case"h":X=(d%12)||12;
break;
case"H":X=d;
break;
case"K":X=(d%12);
break;
case"k":X=d||24;
break
}j=true;
break;
case"m":X=B.getMinutes();
j=true;
break;
case"s":X=B.getSeconds();
j=true;
break;
case"S":X=Math.round(B.getMilliseconds()*Math.pow(10,g-3));
break;
case"v":case"z":X=dojo.date.getTimezoneName(B);
if(X){break
}g=4;
case"Z":var e=B.getTimezoneOffset();
var f=[(e<=0?"+":"-"),dojo.string.pad(Math.floor(Math.abs(e)/60),2),dojo.string.pad(Math.abs(e)%60,2)];
if(g==4){f.splice(0,0,"GMT");
f.splice(3,0,":")
}X=f.join("");
break;
default:throw new Error("dojo.date.locale.format: invalid pattern char: "+A)
}if(j){X=dojo.string.pad(X,g)
}return X
})
}dojo.date.locale.format=function(U,O){O=O||{};
var R=dojo.i18n.normalizeLocale(O.locale);
var C=O.formatLength||"short";
var B=dojo.date.locale._getGregorianBundle(R);
var T=[];
var V=dojo.hitch(this,F,U,B);
if(O.selector=="year"){var S=U.getFullYear();
if(R.match(/^zh|^ja/)){S+="\u5E74"
}return S
}if(O.selector!="time"){var A=O.datePattern||B["dateFormat-"+C];
if(A){T.push(E(A,V))
}}if(O.selector!="date"){var P=O.timePattern||B["timeFormat-"+C];
if(P){T.push(E(P,V))
}}var Q=T.join(" ");
return Q
};
dojo.date.locale.regexp=function(A){return dojo.date.locale._parseInfo(A).regexp
};
dojo.date.locale._parseInfo=function(N){N=N||{};
var P=dojo.i18n.normalizeLocale(N.locale);
var C=dojo.date.locale._getGregorianBundle(P);
var M=N.formatLength||"short";
var A=N.datePattern||C["dateFormat-"+M];
var B=N.timePattern||C["timeFormat-"+M];
var R;
if(N.selector=="date"){R=A
}else{if(N.selector=="time"){R=B
}else{R=A+" "+B
}}var Q=[];
var O=E(R,dojo.hitch(this,D,Q,C,N));
return{regexp:O,tokens:Q,bundle:C}
};
dojo.date.locale.parse=function(R,C){var A=dojo.date.locale._parseInfo(C);
var U=A.tokens,B=A.bundle;
var Q=new RegExp("^"+A.regexp+"$");
var W=Q.exec(R);
if(!W){return null
}var X=["abbr","wide","narrow"];
var P=new Date(1972,0);
var V={};
var S="";
dojo.forEach(W,function(g,K){if(!K){return 
}var N=U[K-1];
var M=N.length;
switch(N.charAt(0)){case"y":if(M!=2){P.setFullYear(g);
V.year=g
}else{if(g<100){g=Number(g);
var h=""+new Date().getFullYear();
var L=h.substring(0,2)*100;
var I=Number(h.substring(2,4));
var d=Math.min(I+20,99);
var J=(g<d)?L+g:L-100+g;
P.setFullYear(J);
V.year=J
}else{if(C.strict){return null
}P.setFullYear(g);
V.year=g
}}break;
case"M":if(M>2){var e=B["months-format-"+X[M-3]].concat();
if(!C.strict){g=g.replace(".","").toLowerCase();
e=dojo.map(e,function(Y){return Y.replace(".","").toLowerCase()
})
}g=dojo.indexOf(e,g);
if(g==-1){return null
}}else{g--
}P.setMonth(g);
V.month=g;
break;
case"E":case"e":var f=B["days-format-"+X[M-3]].concat();
if(!C.strict){g=g.toLowerCase();
f=dojo.map(f,"".toLowerCase)
}g=dojo.indexOf(f,g);
if(g==-1){return null
}break;
case"d":P.setDate(g);
V.date=g;
break;
case"D":P.setMonth(0);
P.setDate(g);
break;
case"a":var H=C.am||B.am;
var O=C.pm||B.pm;
if(!C.strict){var G=/\./g;
g=g.replace(G,"").toLowerCase();
H=H.replace(G,"").toLowerCase();
O=O.replace(G,"").toLowerCase()
}if(C.strict&&g!=H&&g!=O){return null
}S=(g==O)?"p":(g==H)?"a":"";
break;
case"K":if(g==24){g=0
}case"h":case"H":case"k":if(g>23){return null
}P.setHours(g);
break;
case"m":P.setMinutes(g);
break;
case"s":P.setSeconds(g);
break;
case"S":P.setMilliseconds(g)
}});
var T=P.getHours();
if(S==="p"&&T<12){P.setHours(T+12)
}else{if(S==="a"&&T==12){P.setHours(0)
}}if(V.year&&P.getFullYear()!=V.year){return null
}if(V.month&&P.getMonth()!=V.month){return null
}if(V.date&&P.getDate()!=V.date){return null
}return P
};
function E(C,N,A,K){var M=function(G){return G
};
N=N||M;
A=A||M;
K=K||M;
var B=C.match(/(''|[^'])+/g);
var L=false;
dojo.forEach(B,function(H,G){if(!H){B[G]=""
}else{B[G]=(L?A:N)(H);
L=!L
}});
return K(B.join(""))
}function D(A,H,C,B){B=dojo.regexp.escapeString(B);
if(!C.strict){B=B.replace(" a"," ?a")
}return B.replace(/([a-z])\1*/ig,function(R){var P;
var T=R.charAt(0);
var S=R.length;
var U="",V="";
if(C.strict){if(S>1){U="0{"+(S-1)+"}"
}if(S>2){V="0{"+(S-2)+"}"
}}else{U="0?";
V="0{0,2}"
}switch(T){case"y":P="\\d{2,4}";
break;
case"M":P=(S>2)?"\\S+":U+"[1-9]|1[0-2]";
break;
case"D":P=U+"[1-9]|"+V+"[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6]";
break;
case"d":P=U+"[1-9]|[12]\\d|3[01]";
break;
case"w":P=U+"[1-9]|[1-4][0-9]|5[0-3]";
break;
case"E":P="\\S+";
break;
case"h":P=U+"[1-9]|1[0-2]";
break;
case"k":P=U+"\\d|1[01]";
break;
case"H":P=U+"\\d|1\\d|2[0-3]";
break;
case"K":P=U+"[1-9]|1\\d|2[0-4]";
break;
case"m":case"s":P="[0-5]\\d";
break;
case"S":P="\\d{"+S+"}";
break;
case"a":var G=C.am||H.am||"AM";
var Q=C.pm||H.pm||"PM";
if(C.strict){P=G+"|"+Q
}else{P=G+"|"+Q;
if(G!=G.toLowerCase()){P+="|"+G.toLowerCase()
}if(Q!=Q.toLowerCase()){P+="|"+Q.toLowerCase()
}}break;
default:P=".*"
}if(A){A.push(R)
}return"("+P+")"
}).replace(/[\xa0 ]/g,"[\\s\\xa0]")
}})();
(function(){var B=[];
dojo.date.locale.addCustomFormats=function(D,A){B.push({pkg:D,name:A})
};
dojo.date.locale._getGregorianBundle=function(D){var A={};
dojo.forEach(B,function(C){var F=dojo.i18n.getLocalization(C.pkg,C.name,D);
A=dojo.mixin(A,F)
},this);
return A
}
})();
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(J,K,N,H){var M;
var I=dojo.date.locale._getGregorianBundle(H);
var L=[J,N,K];
if(N=="standAlone"){M=I[L.join("-")]
}L[1]="format";
return(M||I[L.join("-")]).concat()
};
dojo.date.locale.isWeekend=function(F,E){var G=dojo.cldr.supplemental.getWeekend(E);
var H=(F||new Date()).getDay();
if(G.end<G.start){G.end+=7;
if(H<G.start){H+=7
}}return H>=G.start&&H<=G.end
};
dojo.date.locale._getDayOfYear=function(B){return dojo.date.difference(new Date(B.getFullYear(),0,1),B)+1
};
dojo.date.locale._getWeekOfYear=function(G,J){if(arguments.length==1){J=0
}var I=new Date(G.getFullYear(),0,1).getDay();
var F=(I-J+7)%7;
var H=Math.floor((dojo.date.locale._getDayOfYear(G)+F-1)/7);
if(I==J){H++
}return H
}
}if(!dojo._hasResource["dijit._Calendar"]){dojo._hasResource["dijit._Calendar"]=true;
dojo.provide("dijit._Calendar");
dojo.declare("dijit._Calendar",[dijit._Widget,dijit._Templated],{templatePath:dojo.moduleUrl("dijit","templates/Calendar.html"),value:new Date(),dayWidth:"narrow",setValue:function(B){if(!this.value||dojo.date.compare(B,this.value)){B=new Date(B);
this.displayMonth=new Date(B);
if(!this.isDisabledDate(B,this.lang)){this.value=B;
this.value.setHours(0,0,0,0);
this.onChange(this.value)
}this._populateGrid()
}},_setText:function(C,D){while(C.firstChild){C.removeChild(C.firstChild)
}C.appendChild(document.createTextNode(D))
},_populateGrid:function(){var U=this.displayMonth;
U.setDate(1);
var O=U.getDay();
var N=dojo.date.getDaysInMonth(U);
var R=dojo.date.getDaysInMonth(dojo.date.add(U,"month",-1));
var T=new Date();
var M=this.value;
var P=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
if(P>O){P-=7
}dojo.query(".dijitCalendarDateTemplate",this.domNode).forEach(function(C,D){D+=P;
var E=new Date(U);
var B,F="dijitCalendar",A=0;
if(D<O){B=R-O+D+1;
A=-1;
F+="Previous"
}else{if(D>=(O+N)){B=D-O-N+1;
A=1;
F+="Next"
}else{B=D-O+1;
F+="Current"
}}if(A){E=dojo.date.add(E,"month",A)
}E.setDate(B);
if(!dojo.date.compare(E,T,"date")){F="dijitCalendarCurrentDate "+F
}if(!dojo.date.compare(E,M,"date")){F="dijitCalendarSelectedDate "+F
}if(this.isDisabledDate(E,this.lang)){F="dijitCalendarDisabledDate "+F
}C.className=F+"Month dijitCalendarDateTemplate";
C.dijitDateValue=E.valueOf();
var G=dojo.query(".dijitCalendarDateLabel",C)[0];
this._setText(G,E.getDate())
},this);
var L=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
this._setText(this.monthLabelNode,L[U.getMonth()]);
var S=U.getFullYear()-1;
dojo.forEach(["previous","current","next"],function(A){this._setText(this[A+"YearLabelNode"],dojo.date.locale.format(new Date(S++,0),{selector:"year",locale:this.lang}))
},this);
var V=this;
var Q=function(C,B,A){dijit.typematic.addMouseListener(V[C],V,function(D){if(D>=0){V._adjustDisplay(B,A)
}},0.8,500)
};
Q("incrementMonth","month",1);
Q("decrementMonth","month",-1);
Q("nextYearLabelNode","year",1);
Q("previousYearLabelNode","year",-1)
},postCreate:function(){dijit._Calendar.superclass.postCreate.apply(this);
var H=dojo.hitch(this,function(D,A){var B=dojo.query(D,this.domNode)[0];
for(var C=0;
C<A;
C++){B.parentNode.appendChild(B.cloneNode(true))
}});
H(".dijitCalendarDayLabelTemplate",6);
H(".dijitCalendarDateTemplate",6);
H(".dijitCalendarWeekTemplate",5);
var F=dojo.date.locale.getNames("days",this.dayWidth,"standAlone",this.lang);
var E=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
dojo.query(".dijitCalendarDayLabel",this.domNode).forEach(function(B,A){this._setText(B,F[(A+E)%7])
},this);
var G=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
dojo.forEach(G,function(A){var B=dojo.doc.createElement("div");
this._setText(B,A);
this.monthLabelSpacer.appendChild(B)
},this);
this.value=null;
this.setValue(new Date())
},_adjustDisplay:function(C,D){this.displayMonth=dojo.date.add(this.displayMonth,C,D);
this._populateGrid()
},_onDayClick:function(C){var D=C.target;
dojo.stopEvent(C);
while(!D.dijitDateValue){D=D.parentNode
}if(!dojo.hasClass(D,"dijitCalendarDisabledDate")){this.setValue(D.dijitDateValue);
this.onValueSelected(this.value)
}},onValueSelected:function(B){},onChange:function(B){},isDisabledDate:function(D,C){return false
}})
}if(!dojo._hasResource["dijit.layout.ContentPane"]){dojo._hasResource["dijit.layout.ContentPane"]=true;
dojo.provide("dijit.layout.ContentPane");
dojo.declare("dijit.layout.ContentPane",dijit._Widget,{href:"",extractContent:false,parseOnLoad:true,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'>${errorState}</span>",isLoaded:false,"class":"dijitContentPane",postCreate:function(){this.domNode.title="";
if(this.preload){this._loadCheck()
}var B=dojo.i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=dojo.string.substitute(this.loadingMessage,B);
this.errorMessage=dojo.string.substitute(this.errorMessage,B);
dojo.addClass(this.domNode,this["class"])
},startup:function(){if(this._started){return 
}this._checkIfSingleChild();
if(this._singleChild){this._singleChild.startup()
}this._loadCheck();
this._started=true
},_checkIfSingleChild:function(){var D=dojo.query(">",this.containerNode||this.domNode),C=D.filter("[widgetId]");
if(D.length==1&&C.length==1){this.isContainer=true;
this._singleChild=dijit.byNode(C[0])
}else{delete this.isContainer;
delete this._singleChild
}},refresh:function(){return this._prepareLoad(true)
},setHref:function(B){this.href=B;
return this._prepareLoad()
},setContent:function(B){if(!this._isDownloaded){this.href="";
this._onUnloadHandler()
}this._setContent(B||"");
this._isDownloaded=false;
if(this.parseOnLoad){this._createSubWidgets()
}this._checkIfSingleChild();
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}this._onLoadHandler()
},cancel:function(){if(this._xhrDfd&&(this._xhrDfd.fired==-1)){this._xhrDfd.cancel()
}delete this._xhrDfd
},destroy:function(){if(this._beingDestroyed){return 
}this._onUnloadHandler();
this._beingDestroyed=true;
this.inherited("destroy",arguments)
},resize:function(D){dojo.marginBox(this.domNode,D);
var F=this.containerNode||this.domNode,E=dojo.mixin(dojo.marginBox(F),D||{});
this._contentBox=dijit.layout.marginBox2contentBox(F,E);
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}},_prepareLoad:function(B){this.cancel();
this.isLoaded=false;
this._loadCheck(B)
},_loadCheck:function(D){var C=((this.open!==false)&&(this.domNode.style.display!="none"));
if(this.href&&(D||(this.preload&&!this._xhrDfd)||(this.refreshOnShow&&C&&!this._xhrDfd)||(!this.isLoaded&&C&&!this._xhrDfd))){this._downloadExternalContent()
}},_downloadExternalContent:function(){this._onUnloadHandler();
this._setContent(this.onDownloadStart.call(this));
var F=this;
var E={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(dojo.isObject(this.ioArgs)){dojo.mixin(E,this.ioArgs)
}var D=this._xhrDfd=(this.ioMethod||dojo.xhrGet)(E);
D.addCallback(function(B){try{F.onDownloadEnd.call(F);
F._isDownloaded=true;
F.setContent.call(F,B)
}catch(A){F._onError.call(F,"Content",A)
}delete F._xhrDfd;
return B
});
D.addErrback(function(A){if(!D.cancelled){F._onError.call(F,"Download",A)
}delete F._xhrDfd;
return A
})
},_onLoadHandler:function(){this.isLoaded=true;
try{this.onLoad.call(this)
}catch(B){console.error("Error "+this.widgetId+" running custom onLoad code")
}},_onUnloadHandler:function(){this.isLoaded=false;
this.cancel();
try{this.onUnload.call(this)
}catch(B){console.error("Error "+this.widgetId+" running custom onUnload code")
}},_setContent:function(E){this.destroyDescendants();
try{var H=this.containerNode||this.domNode;
while(H.firstChild){dojo._destroyElement(H.firstChild)
}if(typeof E=="string"){if(this.extractContent){match=E.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(match){E=match[1]
}}H.innerHTML=E
}else{if(E.nodeType){H.appendChild(E)
}else{dojo.forEach(E,function(A){H.appendChild(A.cloneNode(true))
})
}}}catch(F){var G=this.onContentError(F);
try{H.innerHTML=G
}catch(F){console.error("Fatal "+this.id+" could not change content due to "+F.message,F)
}}},_onError:function(H,F,E){var G=this["on"+H+"Error"].call(this,F);
if(E){console.error(E,F)
}else{if(G){this._setContent.call(this,G)
}}},_createSubWidgets:function(){var C=this.containerNode||this.domNode;
try{dojo.parser.parse(C,true)
}catch(D){this._onError("Content",D,"Couldn't create widgets in "+this.id+(this.href?" from "+this.href:""))
}},onLoad:function(B){},onUnload:function(B){},onDownloadStart:function(){return this.loadingMessage
},onContentError:function(B){},onDownloadError:function(B){return this.errorMessage
},onDownloadEnd:function(){}})
}if(!dojo._hasResource["dijit.form.Form"]){dojo._hasResource["dijit.form.Form"]=true;
dojo.provide("dijit.form.Form");
dojo.declare("dijit.form._FormMixin",null,{action:"",method:"",enctype:"",name:"","accept-charset":"",accept:"",target:"",attributeMap:dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap),{action:"",method:"",enctype:"","accept-charset":"",accept:"",target:""}),execute:function(B){},onCancel:function(){},onExecute:function(){},templateString:"<form dojoAttachPoint='containerNode' dojoAttachEvent='onsubmit:_onSubmit' name='${name}' enctype='multipart/form-data'></form>",_onSubmit:function(B){dojo.stopEvent(B);
this.onExecute();
this.execute(this.getValues())
},submit:function(){this.containerNode.submit()
},setValues:function(G){var H={};
dojo.forEach(this.getDescendants(),function(A){if(!A.name){return 
}var B=H[A.name]||(H[A.name]=[]);
B.push(A)
});
for(var J in H){var I=H[J],F=dojo.getObject(J,false,G);
if(!dojo.isArray(F)){F=[F]
}if(I[0].setChecked){dojo.forEach(I,function(B,A){B.setChecked(dojo.indexOf(F,B.value)!=-1)
})
}else{dojo.forEach(I,function(B,A){B.setValue(F[A])
})
}}},getValues:function(){var B={};
dojo.forEach(this.getDescendants(),function(A){var F=A.getValue?A.getValue():A.value;
var H=A.name;
if(!H){return 
}if(A.setChecked){if(/Radio/.test(A.declaredClass)){if(A.checked){dojo.setObject(H,F,B)
}}else{var G=dojo.getObject(H,false,B);
if(!G){G=[];
dojo.setObject(H,G,B)
}if(A.checked){G.push(F)
}}}else{dojo.setObject(H,F,B)
}});
return B
},isValid:function(){return dojo.every(this.getDescendants(),function(B){return !B.isValid||B.isValid()
})
}});
dojo.declare("dijit.form.Form",[dijit._Widget,dijit._Templated,dijit.form._FormMixin],null)
}if(!dojo._hasResource["dijit.Dialog"]){dojo._hasResource["dijit.Dialog"]=true;
dojo.provide("dijit.Dialog");
dojo.declare("dijit.DialogUnderlay",[dijit._Widget,dijit._Templated],{templateString:"<div class=dijitDialogUnderlayWrapper id='${id}_underlay'><div class=dijitDialogUnderlay dojoAttachPoint='node'></div></div>",postCreate:function(){dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode)
},layout:function(){var E=dijit.getViewport();
var G=this.node.style,F=this.domNode.style;
F.top=E.t+"px";
F.left=E.l+"px";
G.width=E.w+"px";
G.height=E.h+"px";
var H=dijit.getViewport();
if(E.w!=H.w){G.width=H.w+"px"
}if(E.h!=H.h){G.height=H.h+"px"
}},show:function(){this.domNode.style.display="block";
this.layout();
if(this.bgIframe.iframe){this.bgIframe.iframe.style.display="block"
}this._resizeHandler=this.connect(window,"onresize","layout")
},hide:function(){this.domNode.style.display="none";
if(this.bgIframe.iframe){this.bgIframe.iframe.style.display="none"
}this.disconnect(this._resizeHandler)
},uninitialize:function(){if(this.bgIframe){this.bgIframe.destroy()
}}});
dojo.declare("dijit.Dialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin],{templateString:null,templatePath:dojo.moduleUrl("dijit","templates/Dialog.html"),open:false,duration:400,_lastFocusItem:null,attributeMap:dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap),{title:"titleBar"}),postCreate:function(){dojo.body().appendChild(this.domNode);
this.inherited("postCreate",arguments);
this.domNode.style.display="none";
this.connect(this,"onExecute","hide");
this.connect(this,"onCancel","hide")
},onLoad:function(){this._position();
this.inherited("onLoad",arguments)
},_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new dojo.dnd.Moveable(this.domNode,{handle:this.titleBar})
}this._underlay=new dijit.DialogUnderlay();
var B=this.domNode;
this._fadeIn=dojo.fx.combine([dojo.fadeIn({node:B,duration:this.duration}),dojo.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:dojo.hitch(this._underlay,"show")})]);
this._fadeOut=dojo.fx.combine([dojo.fadeOut({node:B,duration:this.duration,onEnd:function(){B.style.display="none"
}}),dojo.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:dojo.hitch(this._underlay,"hide")})])
},uninitialize:function(){if(this._underlay){this._underlay.destroy()
}},_position:function(){if(dojo.hasClass(dojo.body(),"dojoMove")){return 
}var D=dijit.getViewport();
var E=dojo.marginBox(this.domNode);
var F=this.domNode.style;
F.left=Math.floor((D.l+(D.w-E.w)/2))+"px";
F.top=Math.floor((D.t+(D.h-E.h)/2))+"px"
},_findLastFocus:function(B){this._lastFocused=B.target
},_cycleFocus:function(B){if(!this._lastFocusItem){this._lastFocusItem=this._lastFocused
}this.titleBar.focus()
},_onKey:function(D){if(D.keyCode){var F=D.target;
if(F==this.titleBar&&D.shiftKey&&D.keyCode==dojo.keys.TAB){if(this._lastFocusItem){this._lastFocusItem.focus()
}dojo.stopEvent(D)
}else{while(F){if(F==this.domNode){if(D.keyCode==dojo.keys.ESCAPE){this.hide()
}else{return 
}}F=F.parentNode
}if(D.keyCode!=dojo.keys.TAB){dojo.stopEvent(D)
}else{if(!dojo.isOpera){try{this.titleBar.focus()
}catch(E){}}}}}},show:function(){if(!this._alreadyInitialized){this._setup();
this._alreadyInitialized=true
}if(this._fadeOut.status()=="playing"){this._fadeOut.stop()
}this._modalconnects.push(dojo.connect(window,"onscroll",this,"layout"));
this._modalconnects.push(dojo.connect(document.documentElement,"onkeypress",this,"_onKey"));
var B=typeof (document.ondeactivate)=="object"?"ondeactivate":"onblur";
this._modalconnects.push(dojo.connect(this.containerNode,B,this,"_findLastFocus"));
dojo.style(this.domNode,"opacity",0);
this.domNode.style.display="block";
this.open=true;
this._loadCheck();
this._position();
this._fadeIn.play();
this._savedFocus=dijit.getFocus(this);
setTimeout(dojo.hitch(this,function(){dijit.focus(this.titleBar)
}),50)
},hide:function(){if(!this._alreadyInitialized){return 
}if(this._fadeIn.status()=="playing"){this._fadeIn.stop()
}this._fadeOut.play();
if(this._scrollConnected){this._scrollConnected=false
}dojo.forEach(this._modalconnects,dojo.disconnect);
this._modalconnects=[];
this.connect(this._fadeOut,"onEnd",dojo.hitch(this,function(){dijit.focus(this._savedFocus)
}));
this.open=false
},layout:function(){if(this.domNode.style.display=="block"){this._underlay.layout();
this._position()
}}});
dojo.declare("dijit.TooltipDialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin],{title:"",_lastFocusItem:null,templateString:null,templatePath:dojo.moduleUrl("dijit.layout","templates/TooltipDialog.html"),postCreate:function(){this.inherited("postCreate",arguments);
this.connect(this.containerNode,"onkeypress","_onKey");
var B=typeof (document.ondeactivate)=="object"?"ondeactivate":"onblur";
this.connect(this.containerNode,B,"_findLastFocus");
this.containerNode.title=this.title
},orient:function(B){this.domNode.className="dijitTooltipDialog  dijitTooltipAB"+(B.charAt(1)=="L"?"Left":"Right")+" dijitTooltip"+(B.charAt(0)=="T"?"Below":"Above")
},onOpen:function(B){this.orient(B.corner);
this._loadCheck();
this.containerNode.focus()
},_onKey:function(B){if(B.keyCode==dojo.keys.ESCAPE){this.onCancel()
}else{if(B.target==this.containerNode&&B.shiftKey&&B.keyCode==dojo.keys.TAB){if(this._lastFocusItem){this._lastFocusItem.focus()
}dojo.stopEvent(B)
}else{if(B.keyCode==dojo.keys.TAB){B.stopPropagation()
}}}},_findLastFocus:function(B){this._lastFocused=B.target
},_cycleFocus:function(B){if(!this._lastFocusItem){this._lastFocusItem=this._lastFocused
}this.containerNode.focus()
}})
}if(!dojo._hasResource["dijit.Toolbar"]){dojo._hasResource["dijit.Toolbar"]=true;
dojo.provide("dijit.Toolbar");
dojo.declare("dijit.Toolbar",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{templateString:'<div class="dijit dijitToolbar" waiRole="toolbar" tabIndex="${tabIndex}" dojoAttachPoint="containerNode"></div>',tabIndex:"0",postCreate:function(){this.connectKeyNavHandlers(this.isLeftToRight()?[dojo.keys.LEFT_ARROW]:[dojo.keys.RIGHT_ARROW],this.isLeftToRight()?[dojo.keys.RIGHT_ARROW]:[dojo.keys.LEFT_ARROW])
},startup:function(){this.startupKeyNavChildren()
}});
dojo.declare("dijit.ToolbarSeparator",[dijit._Widget,dijit._Templated],{templateString:'<div class="dijitToolbarSeparator dijitInline"></div>',postCreate:function(){dojo.setSelectable(this.domNode,false)
},isFocusable:function(){return false
}})
}if(!dojo._hasResource["dijit.form.Button"]){dojo._hasResource["dijit.form.Button"]=true;
dojo.provide("dijit.form.Button");
dojo.declare("dijit.form.Button",dijit.form._FormWidget,{label:"",showLabel:true,iconClass:"",type:"button",baseClass:"dijitButton",templateString:'<div class="dijit dijitLeft dijitInline dijitButton"\n\tdojoAttachEvent="onclick:_onButtonClick,onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse"\n\t><div class=\'dijitRight\'\n\t\t><button class="dijitStretch dijitButtonNode dijitButtonContents" dojoAttachPoint="focusNode,titleNode"\n\t\t\ttype="${type}" waiRole="button" waiState="labelledby-${id}_label"\n\t\t\t><span class="dijitInline ${iconClass}" dojoAttachPoint="iconNode" \n \t\t\t\t><span class="dijitToggleButtonIconChar">&#10003</span \n\t\t\t></span\n\t\t\t><span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span\n\t\t></button\n\t></div\n></div>\n',_onClick:function(B){if(this.disabled){return false
}this._clicked();
return this.onClick(B)
},_onButtonClick:function(F){dojo.stopEvent(F);
var G=this._onClick(F)!==false;
if(this.type=="submit"&&G){for(var E=this.domNode;
E;
E=E.parentNode){var H=dijit.byNode(E);
if(H&&H._onSubmit){H._onSubmit(F);
break
}if(E.tagName.toLowerCase()=="form"){if(!E.onsubmit||E.onsubmit()){E.submit()
}break
}}}},postCreate:function(){if(this.showLabel==false){var B="";
this.label=this.containerNode.innerHTML;
B=dojo.trim(this.containerNode.innerText||this.containerNode.textContent);
this.titleNode.title=B;
dojo.addClass(this.containerNode,"dijitDisplayNone")
}this.inherited(arguments)
},onClick:function(B){return true
},_clicked:function(B){},setLabel:function(D){this.containerNode.innerHTML=this.label=D;
if(dojo.isMozilla){var F=dojo.getComputedStyle(this.domNode).display;
this.domNode.style.display="none";
var E=this;
setTimeout(function(){E.domNode.style.display=F
},1)
}if(this.showLabel==false){this.titleNode.title=dojo.trim(this.containerNode.innerText||this.containerNode.textContent)
}}});
dojo.declare("dijit.form.DropDownButton",[dijit.form.Button,dijit._Container],{baseClass:"dijitDropDownButton",templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<button class="dijitStretch dijitButtonNode dijitButtonContents" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><div class="dijitInline ${iconClass}" dojoAttachPoint="iconNode"></div\n\t\t><span class="dijitButtonText" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label">${label}</span\n\t\t><span class=\'dijitA11yDownArrow\'>&#9660;</span>\n\t</button>\n</div></div>\n',_fillContent:function(){if(this.srcNodeRef){var B=dojo.query("*",this.srcNodeRef);
dijit.form.DropDownButton.superclass._fillContent.call(this,B[0]);
this.dropDownContainer=this.srcNodeRef
}},startup:function(){if(!this.dropDown){var B=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.dropDown=dijit.byNode(B);
delete this.dropDownContainer
}dojo.body().appendChild(this.dropDown.domNode);
this.dropDown.domNode.style.display="none"
},_onArrowClick:function(B){if(this.disabled){return 
}this._toggleDropDown()
},_onDropDownClick:function(D){var C=dojo.isFF&&dojo.isFF<3&&navigator.appVersion.indexOf("Macintosh")!=-1;
if(!C||D.detail!=0||this._seenKeydown){this._onArrowClick(D)
}this._seenKeydown=false
},_onDropDownKeydown:function(B){this._seenKeydown=true
},_onDropDownBlur:function(B){this._seenKeydown=false
},_onKey:function(B){if(this.disabled){return 
}if(B.keyCode==dojo.keys.DOWN_ARROW){if(!this.dropDown||this.dropDown.domNode.style.display=="none"){dojo.stopEvent(B);
return this._toggleDropDown()
}}},_onBlur:function(){this._closeDropDown()
},_toggleDropDown:function(){if(this.disabled){return 
}dijit.focus(this.popupStateNode);
var E=this.dropDown;
if(!E){return false
}if(!E.isShowingNow){if(E.href&&!E.isLoaded){var D=this;
var F=dojo.connect(E,"onLoad",function(){dojo.disconnect(F);
D._openDropDown()
});
E._loadCheck(true);
return 
}else{this._openDropDown()
}}else{this._closeDropDown()
}},_openDropDown:function(){var G=this.dropDown;
var J=G.domNode.style.width;
var I=this;
dijit.popup.open({parent:this,popup:G,around:this.domNode,orient:this.isLeftToRight()?{BL:"TL",BR:"TR",TL:"BL",TR:"BR"}:{BR:"TR",BL:"TL",TR:"BR",TL:"BL"},onExecute:function(){I._closeDropDown(true)
},onCancel:function(){I._closeDropDown(true)
},onClose:function(){G.domNode.style.width=J;
I.popupStateNode.removeAttribute("popupActive");
this._opened=false
}});
if(this.domNode.offsetWidth>G.domNode.offsetWidth){var H=null;
if(!this.isLeftToRight()){H=G.domNode.parentNode;
var F=H.offsetLeft+H.offsetWidth
}dojo.marginBox(G.domNode,{w:this.domNode.offsetWidth});
if(H){H.style.left=F-this.domNode.offsetWidth+"px"
}}this.popupStateNode.setAttribute("popupActive","true");
this._opened=true;
if(G.focus){G.focus()
}},_closeDropDown:function(B){if(this._opened){dijit.popup.close(this.dropDown);
if(B){this.focus()
}this._opened=false
}}});
dojo.declare("dijit.form.ComboButton",dijit.form.DropDownButton,{templateString:'<table class=\'dijit dijitReset dijitInline dijitLeft\'\n\tcellspacing=\'0\' cellpadding=\'0\'\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse">\n\t<tr>\n\t\t<td\tclass="dijitStretch dijitButtonContents dijitButtonNode"\n\t\t\ttabIndex="${tabIndex}"\n\t\t\tdojoAttachEvent="ondijitclick:_onButtonClick"  dojoAttachPoint="titleNode"\n\t\t\twaiRole="button" waiState="labelledby-${id}_label">\n\t\t\t<div class="dijitInline ${iconClass}" dojoAttachPoint="iconNode"></div>\n\t\t\t<span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span>\n\t\t</td>\n\t\t<td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\'\n\t\t\tdojoAttachPoint="popupStateNode,focusNode"\n\t\t\tdojoAttachEvent="ondijitclick:_onArrowClick, onkeypress:_onKey"\n\t\t\tstateModifier="DownArrow"\n\t\t\ttitle="${optionsTitle}" name="${name}"\n\t\t\twaiRole="button" waiState="haspopup-true"\n\t\t><div waiRole="presentation">&#9660;</div>\n\t</td></tr>\n</table>\n',attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{id:"",name:""}),optionsTitle:"",baseClass:"dijitComboButton",_focusedNode:null,postCreate:function(){this.inherited(arguments);
this._focalNodes=[this.titleNode,this.popupStateNode];
dojo.forEach(this._focalNodes,dojo.hitch(this,function(B){if(dojo.isIE){this.connect(B,"onactivate",this._onNodeFocus)
}else{this.connect(B,"onfocus",this._onNodeFocus)
}}))
},focusFocalNode:function(B){this._focusedNode=B;
dijit.focus(B)
},hasNextFocalNode:function(){return this._focusedNode!==this.getFocalNodes()[1]
},focusNext:function(){this._focusedNode=this.getFocalNodes()[this._focusedNode?1:0];
dijit.focus(this._focusedNode)
},hasPrevFocalNode:function(){return this._focusedNode!==this.getFocalNodes()[0]
},focusPrev:function(){this._focusedNode=this.getFocalNodes()[this._focusedNode?0:1];
dijit.focus(this._focusedNode)
},getFocalNodes:function(){return this._focalNodes
},_onNodeFocus:function(B){this._focusedNode=B.currentTarget
},_onBlur:function(B){this.inherited(arguments);
this._focusedNode=null
}});
dojo.declare("dijit.form.ToggleButton",dijit.form.Button,{baseClass:"dijitToggleButton",checked:false,_clicked:function(B){this.setChecked(!this.checked)
},setChecked:function(B){this.checked=B;
dijit.setWaiState(this.focusNode||this.domNode,"pressed",this.checked);
this._setStateClass();
this.onChange(B)
}})
}if(!dojo._hasResource["dijit.Menu"]){dojo._hasResource["dijit.Menu"]=true;
dojo.provide("dijit.Menu");
dojo.declare("dijit.Menu",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{constructor:function(){this._bindings=[]
},templateString:'<table class="dijit dijitMenu dijitReset dijitMenuTable" waiRole="menu" dojoAttachEvent="onkeypress:_onKeyPress"><tbody class="dijitReset" dojoAttachPoint="containerNode"></tbody></table>',targetNodeIds:[],contextMenuForWindow:false,parentMenu:null,popupDelay:500,_contextMenuWithMouse:false,postCreate:function(){if(this.contextMenuForWindow){this.bindDomNode(dojo.body())
}else{dojo.forEach(this.targetNodeIds,this.bindDomNode,this)
}this.connectKeyNavHandlers([dojo.keys.UP_ARROW],[dojo.keys.DOWN_ARROW])
},startup:function(){dojo.forEach(this.getChildren(),function(B){B.startup()
});
this.startupKeyNavChildren()
},onExecute:function(){},onCancel:function(B){},_moveToPopup:function(B){if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){this.focusedChild._onClick(B)
}},_onKeyPress:function(B){if(B.ctrlKey||B.altKey){return 
}switch(B.keyCode){case dojo.keys.RIGHT_ARROW:this._moveToPopup(B);
dojo.stopEvent(B);
break;
case dojo.keys.LEFT_ARROW:if(this.parentMenu){this.onCancel(false)
}else{dojo.stopEvent(B)
}break
}},onItemHover:function(B){this.focusChild(B);
if(this.focusedChild.popup&&!this.focusedChild.disabled&&!this.hover_timer){this.hover_timer=setTimeout(dojo.hitch(this,"_openPopup"),this.popupDelay)
}},_onChildBlur:function(B){dijit.popup.close(B.popup);
B._blur();
this._stopPopupTimer()
},onItemUnhover:function(B){},_stopPopupTimer:function(){if(this.hover_timer){clearTimeout(this.hover_timer);
this.hover_timer=null
}},_getTopMenu:function(){for(var B=this;
B.parentMenu;
B=B.parentMenu){}return B
},onItemClick:function(B){if(B.disabled){return false
}if(B.popup){if(!this.is_open){this._openPopup()
}}else{this.onExecute();
B.onClick()
}},_iframeContentWindow:function(C){var D=dijit.getDocumentWindow(dijit.Menu._iframeContentDocument(C))||dijit.Menu._iframeContentDocument(C)["__parent__"]||(C.name&&document.frames[C.name])||null;
return D
},_iframeContentDocument:function(C){var D=C.contentDocument||(C.contentWindow&&C.contentWindow.document)||(C.name&&document.frames[C.name]&&document.frames[C.name].document)||null;
return D
},bindDomNode:function(D){D=dojo.byId(D);
var F=dijit.getDocumentWindow(D.ownerDocument);
if(D.tagName.toLowerCase()=="iframe"){F=this._iframeContentWindow(D);
D=dojo.withGlobal(F,dojo.body)
}var E=(D==dojo.body()?dojo.doc:D);
D[this.id]=this._bindings.push([dojo.connect(E,"oncontextmenu",this,"_openMyself"),dojo.connect(E,"onkeydown",this,"_contextKey"),dojo.connect(E,"onmousedown",this,"_contextMouse")])
},unBindDomNode:function(F){var G=dojo.byId(F);
var H=G[this.id]-1,E=this._bindings[H];
dojo.forEach(E,dojo.disconnect);
delete this._bindings[H]
},_contextKey:function(D){this._contextMenuWithMouse=false;
if(D.keyCode==dojo.keys.F10){dojo.stopEvent(D);
if(D.shiftKey&&D.type=="keydown"){var C={target:D.target,pageX:D.pageX,pageY:D.pageY};
C.preventDefault=C.stopPropagation=function(){};
window.setTimeout(dojo.hitch(this,function(){this._openMyself(C)
}),1)
}}},_contextMouse:function(B){this._contextMenuWithMouse=true
},_openMyself:function(J){dojo.stopEvent(J);
var H,I;
if(dojo.isSafari||this._contextMenuWithMouse){H=J.pageX;
I=J.pageY
}else{var K=dojo.coords(J.target,true);
H=K.x+10;
I=K.y+10
}var M=this;
var N=dijit.getFocus(this);
function L(){dijit.focus(N);
dijit.popup.close(M)
}dijit.popup.open({popup:this,x:H,y:I,onExecute:L,onCancel:L,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){dijit.popup.close(this)
}
},onOpen:function(B){this.isShowingNow=true
},onClose:function(){this._stopPopupTimer();
this.parentMenu=null;
this.isShowingNow=false;
this.currentPopup=null;
if(this.focusedChild){this._onChildBlur(this.focusedChild);
this.focusedChild=null
}},_openPopup:function(){this._stopPopupTimer();
var D=this.focusedChild;
var F=D.popup;
if(F.isShowingNow){return 
}F.parentMenu=this;
var E=this;
dijit.popup.open({parent:this,popup:F,around:D.arrowCell,orient:this.isLeftToRight()?{TR:"TL",TL:"TR"}:{TL:"TR",TR:"TL"},onCancel:function(){dijit.popup.close(F);
D.focus();
E.currentPopup=null
}});
this.currentPopup=F;
if(F.focus){F.focus()
}}});
dojo.declare("dijit.MenuItem",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:'<tr class="dijitReset dijitMenuItem"dojoAttachEvent="onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick"><td class="dijitReset"><div class="dijitMenuItemIcon ${iconClass}" dojoAttachPoint="iconNode" ></div></td><td tabIndex="-1" class="dijitReset dijitMenuItemLabel" dojoAttachPoint="containerNode" waiRole="menuitem"></td><td class="dijitReset" dojoAttachPoint="arrowCell"><div class="dijitMenuExpand" dojoAttachPoint="expand" style="display:none"><span class="dijitInline dijitArrowNode dijitMenuExpandInner">+</span></div></td></tr>',label:"",iconClass:"",disabled:false,postCreate:function(){dojo.setSelectable(this.domNode,false);
this.setDisabled(this.disabled);
if(this.label){this.containerNode.innerHTML=this.label
}},_onHover:function(){this.getParent().onItemHover(this)
},_onUnhover:function(){this.getParent().onItemUnhover(this)
},_onClick:function(B){this.getParent().onItemClick(this);
dojo.stopEvent(B)
},onClick:function(){},focus:function(){dojo.addClass(this.domNode,"dijitMenuItemHover");
try{dijit.focus(this.containerNode)
}catch(B){}},_blur:function(){dojo.removeClass(this.domNode,"dijitMenuItemHover")
},setDisabled:function(B){this.disabled=B;
dojo[B?"addClass":"removeClass"](this.domNode,"dijitMenuItemDisabled");
dijit.setWaiState(this.containerNode,"disabled",B?"true":"false")
}});
dojo.declare("dijit.PopupMenuItem",dijit.MenuItem,{_fillContent:function(){if(this.srcNodeRef){var B=dojo.query("*",this.srcNodeRef);
dijit.PopupMenuItem.superclass._fillContent.call(this,B[0]);
this.dropDownContainer=this.srcNodeRef
}},startup:function(){if(!this.popup){var B=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.popup=dijit.byNode(B)
}dojo.body().appendChild(this.popup.domNode);
this.popup.domNode.style.display="none";
dojo.addClass(this.expand,"dijitMenuExpandEnabled");
dojo.style(this.expand,"display","");
dijit.setWaiState(this.containerNode,"haspopup","true")
}});
dojo.declare("dijit.MenuSeparator",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:'<tr class="dijitMenuSeparator"><td colspan=3><div class="dijitMenuSeparatorTop"></div><div class="dijitMenuSeparatorBottom"></div></td></tr>',postCreate:function(){dojo.setSelectable(this.domNode,false)
},isFocusable:function(){return false
}})
}if(!dojo._hasResource["dijit.Tooltip"]){dojo._hasResource["dijit.Tooltip"]=true;
dojo.provide("dijit.Tooltip");
dojo.declare("dijit._MasterTooltip",[dijit._Widget,dijit._Templated],{duration:200,templateString:'<div class="dijitTooltip dijitTooltipLeft" id="dojoTooltip">\n\t<div class="dijitTooltipContainer dijitTooltipContents" dojoAttachPoint="containerNode" waiRole=\'alert\'></div>\n\t<div class="dijitTooltipConnector"></div>\n</div>\n',postCreate:function(){dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode);
this.fadeIn=dojo.fadeIn({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onShow")});
this.fadeOut=dojo.fadeOut({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onHide")})
},show:function(F,E){if(this.aroundNode&&this.aroundNode===E){return 
}if(this.fadeOut.status()=="playing"){this._onDeck=arguments;
return 
}this.containerNode.innerHTML=F;
this.domNode.style.top=(this.domNode.offsetTop+1)+"px";
var G=this.isLeftToRight()?{BR:"BL",BL:"BR"}:{BL:"BR",BR:"BL"};
var H=dijit.placeOnScreenAroundElement(this.domNode,E,G);
this.domNode.className="dijitTooltip dijitTooltip"+(H.corner=="BL"?"Right":"Left");
dojo.style(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=E
},_onShow:function(){if(dojo.isIE){this.domNode.style.filter=""
}},hide:function(B){if(!this.aroundNode||this.aroundNode!==B){return 
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
dijit.showTooltip=function(D,C){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.show(D,C)
};
dijit.hideTooltip=function(B){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.hide(B)
};
dojo.declare("dijit.Tooltip",dijit._Widget,{label:"",showDelay:400,connectId:[],postCreate:function(){if(this.srcNodeRef){this.srcNodeRef.style.display="none"
}this._connectNodes=[];
dojo.forEach(this.connectId,function(D){var C=dojo.byId(D);
if(C){this._connectNodes.push(C);
dojo.forEach(["onMouseOver","onMouseOut","onFocus","onBlur","onHover","onUnHover"],function(A){this.connect(C,A.toLowerCase(),"_"+A)
},this);
if(dojo.isIE){C.style.zoom=1
}}},this)
},_onMouseOver:function(B){this._onHover(B)
},_onMouseOut:function(B){if(dojo.isDescendant(B.relatedTarget,B.target)){return 
}this._onUnHover(B)
},_onFocus:function(B){this._focus=true;
this._onHover(B)
},_onBlur:function(B){this._focus=false;
this._onUnHover(B)
},_onHover:function(D){if(!this._showTimer){var C=D.target;
this._showTimer=setTimeout(dojo.hitch(this,function(){this.open(C)
}),this.showDelay)
}},_onUnHover:function(B){if(this._focus){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}this.close()
},open:function(B){B=B||this._connectNodes[0];
if(!B){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}dijit.showTooltip(this.label||this.domNode.innerHTML,B);
this._connectNode=B
},close:function(){dijit.hideTooltip(this._connectNode);
delete this._connectNode;
if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}},uninitialize:function(){this.close()
}})
}if(!dojo._hasResource["dijit.form.TextBox"]){dojo._hasResource["dijit.form.TextBox"]=true;
dojo.provide("dijit.form.TextBox");
dojo.declare("dijit.form.TextBox",dijit.form._FormWidget,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",templateString:'<input class="dojoTextBox" dojoAttachPoint=\'textbox,focusNode\' name="${name}"\n\tdojoAttachEvent=\'onmouseenter:_onMouse,onmouseleave:_onMouse,onfocus:_onMouse,onblur:_onMouse,onkeyup,onkeypress:_onKeyPress\'\n\tautocomplete="off" type="${type}"\n\t/>\n',baseClass:"dijitTextBox",attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{maxLength:"focusNode"}),getDisplayedValue:function(){return this.filter(this.textbox.value)
},getValue:function(){return this.parse(this.getDisplayedValue(),this.constraints)
},setValue:function(F,G,H){var E=this.filter(F);
if((typeof E==typeof F)&&(H==null||H==undefined)){H=this.format(E,this.constraints)
}if(H!=null&&H!=undefined){this.textbox.value=H
}dijit.form.TextBox.superclass.setValue.call(this,E,G)
},setDisplayedValue:function(B){this.textbox.value=B;
this.setValue(this.getValue(),true)
},forWaiValuenow:function(){return this.getDisplayedValue()
},format:function(C,D){return((C==null||C==undefined)?"":(C.toString?C.toString():C))
},parse:function(C,D){return C
},postCreate:function(){this.textbox.setAttribute("value",this.getDisplayedValue());
this.inherited("postCreate",arguments);
if(this.srcNodeRef){dojo.style(this.textbox,"cssText",this.style);
this.textbox.className+=" "+this["class"]
}this._layoutHack()
},_layoutHack:function(){if(dojo.isFF==2&&this.domNode.tagName=="TABLE"){var D=this.domNode;
var C=D.style.opacity;
D.style.opacity="0.999";
setTimeout(function(){D.style.opacity=C
},0)
}},filter:function(B){if(B==undefined||B==null){return""
}else{if(typeof B!="string"){return B
}}if(this.trim){B=dojo.trim(B)
}if(this.uppercase){B=B.toUpperCase()
}if(this.lowercase){B=B.toLowerCase()
}if(this.propercase){B=B.replace(/[^\s]+/g,function(A){return A.substring(0,1).toUpperCase()+A.substring(1)
})
}return B
},_onBlur:function(){this.setValue(this.getValue(),(this.isValid?this.isValid():true))
},onkeyup:function(){}})
}if(!dojo._hasResource["dijit.form.ValidationTextBox"]){dojo._hasResource["dijit.form.ValidationTextBox"]=true;
dojo.provide("dijit.form.ValidationTextBox");
dojo.requireLocalization("dijit.form","validate",null,"ko,zh-cn,zh,ja,zh-tw,ru,it,hu,ROOT,fr,pt,pl,es,de,cs");
dojo.declare("dijit.form.ValidationTextBox",dijit.form.TextBox,{templateString:'<table style="display: -moz-inline-stack;" class="dijit dijitReset dijitInlineTable" cellspacing="0" cellpadding="0"\n\tid="widget_${id}" name="${name}"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse" waiRole="presentation"\n\t><tr class="dijitReset"\n\t\t><td class="dijitReset dijitInputField" width="100%"\n\t\t\t><input dojoAttachPoint=\'textbox,focusNode\' dojoAttachEvent=\'onfocus,onblur:_onMouse,onkeyup,onkeypress:_onKeyPress\' autocomplete="off"\n\t\t\ttype=\'${type}\' name=\'${name}\'\n\t\t/></td\n\t\t><td class="dijitReset dijitValidationIconField" width="0%"\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div><div class=\'dijitValidationIconText\'>&Chi;</div\n\t\t></td\n\t></tr\n></table>\n',baseClass:"dijitTextBox",required:false,promptMessage:"",invalidMessage:"$_unset_$",constraints:{},regExp:".*",regExpGen:function(B){return this.regExp
},state:"",setValue:function(){this.inherited("setValue",arguments);
this.validate(false)
},validator:function(C,D){return(new RegExp("^("+this.regExpGen(D)+")"+(this.required?"":"?")+"$")).test(C)&&(!this.required||!this._isEmpty(C))&&(this._isEmpty(C)||this.parse(C,D)!==null)
},isValid:function(B){return this.validator(this.textbox.value,this.constraints)
},_isEmpty:function(B){return/^\s*$/.test(B)
},getErrorMessage:function(B){return this.invalidMessage
},getPromptMessage:function(B){return this.promptMessage
},validate:function(E){var H="";
var G=this.isValid(E);
var F=this._isEmpty(this.textbox.value);
this.state=(G||(!this._hasBeenBlurred&&F))?"":"Error";
this._setStateClass();
dijit.setWaiState(this.focusNode,"invalid",(G?"false":"true"));
if(E){if(F){H=this.getPromptMessage(true)
}if(!H&&!G){H=this.getErrorMessage(true)
}}this._displayMessage(H)
},_message:"",_displayMessage:function(B){if(this._message==B){return 
}this._message=B;
this.displayMessage(B)
},displayMessage:function(B){if(B){dijit.showTooltip(B,this.domNode)
}else{dijit.hideTooltip(this.domNode)
}},_hasBeenBlurred:false,_onBlur:function(B){this._hasBeenBlurred=true;
this.validate(false);
this.inherited("_onBlur",arguments)
},onfocus:function(B){this.validate(true);
this._onMouse(B)
},onkeyup:function(B){this.onfocus(B)
},constructor:function(){this.constraints={}
},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.constraints.locale=this.lang;
this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
if(this.invalidMessage=="$_unset_$"){this.invalidMessage=this.messages.invalidMessage
}var B=this.regExpGen(this.constraints);
this.regExp=B
}});
dojo.declare("dijit.form.MappedTextBox",dijit.form.ValidationTextBox,{serialize:function(D,C){return(D.toString?D.toString():"")
},toString:function(){var B=this.filter(this.getValue());
return(B!=null)?((typeof B=="string")?B:this.serialize(B,this.constraints)):""
},validate:function(){this.valueNode.value=this.toString();
this.inherited("validate",arguments)
},postCreate:function(){var D=this.textbox;
var C=(this.valueNode=document.createElement("input"));
C.setAttribute("type",D.type);
C.setAttribute("value",this.toString());
dojo.style(C,"display","none");
C.name=this.textbox.name;
this.textbox.name="_"+this.textbox.name+"_displayed_";
this.textbox.removeAttribute("name");
dojo.place(C,D,"after");
this.inherited("postCreate",arguments)
}});
dojo.declare("dijit.form.RangeBoundTextBox",dijit.form.MappedTextBox,{rangeMessage:"",compare:function(D,C){return D-C
},rangeCheck:function(E,F){var G=(typeof F.min!="undefined");
var H=(typeof F.max!="undefined");
if(G||H){return(!G||this.compare(E,F.min)>=0)&&(!H||this.compare(E,F.max)<=0)
}else{return true
}},isInRange:function(B){return this.rangeCheck(this.getValue(),this.constraints)
},isValid:function(B){return this.inherited("isValid",arguments)&&((this._isEmpty(this.textbox.value)&&!this.required)||this.isInRange(B))
},getErrorMessage:function(B){if(dijit.form.RangeBoundTextBox.superclass.isValid.call(this,false)&&!this.isInRange(B)){return this.rangeMessage
}else{return this.inherited("getErrorMessage",arguments)
}},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
if(!this.rangeMessage){this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
this.rangeMessage=this.messages.rangeMessage
}},postCreate:function(){this.inherited("postCreate",arguments);
if(typeof this.constraints.min!="undefined"){dijit.setWaiState(this.focusNode,"valuemin",this.constraints.min)
}if(typeof this.constraints.max!="undefined"){dijit.setWaiState(this.focusNode,"valuemax",this.constraints.max)
}}})
}if(!dojo._hasResource["dijit.form.ComboBox"]){dojo._hasResource["dijit.form.ComboBox"]=true;
dojo.provide("dijit.form.ComboBox");
dojo.requireLocalization("dijit.form","ComboBox",null,"ko,zh,ja,zh-tw,ru,it,hu,ROOT,fr,pt,pl,es,de,cs");
dojo.declare("dijit.form.ComboBoxMixin",null,{item:null,pageSize:Infinity,store:null,query:{},autoComplete:true,searchDelay:100,searchAttr:"name",ignoreCase:true,hasDownArrow:true,_hasFocus:false,templateString:'<table class="dijit dijitReset dijitInlineTable dijitLeft" cellspacing="0" cellpadding="0"\n\tid="widget_${id}" name="${name}" dojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse" waiRole="presentation"\n\t><tr class="dijitReset"\n\t\t><td class=\'dijitReset dijitStretch dijitInputField\' width="100%"\n\t\t\t><input type="text" autocomplete="off" name="${name}"\n\t\t\tdojoAttachEvent="onkeypress, onkeyup, onfocus, compositionend"\n\t\t\tdojoAttachPoint="textbox,focusNode" waiRole="combobox"\n\t\t/></td\n\t\t><td class="dijitReset dijitValidationIconField" width="0%"\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div\n\t\t\t><div class=\'dijitValidationIconText\'>&Chi;</div\n\t\t></td\n\t\t><td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\' width="0%"\n\t\t\tdojoAttachPoint="downArrowNode"\n\t\t\tdojoAttachEvent="onmousedown:_onArrowMouseDown,onmouseup:_onMouse,onmouseenter:_onMouse,onmouseleave:_onMouse"\n\t\t\t><div class="dijitDownArrowButtonInner" waiRole="presentation"\n\t\t\t\t><div class="dijitDownArrowButtonChar">&#9660;</div\n\t\t\t></div\n\t\t></td\t\n\t></tr\n></table>\n',baseClass:"dijitComboBox",_lastDisplayedValue:"",getValue:function(){return dijit.form.TextBox.superclass.getValue.apply(this,arguments)
},setDisplayedValue:function(B){this._lastDisplayedValue=B;
this.setValue(B,true)
},_getCaretPos:function(E){if(typeof (E.selectionStart)=="number"){return E.selectionStart
}else{if(dojo.isIE){var G=document.selection.createRange().duplicate();
var H=E.createTextRange();
G.move("character",0);
H.move("character",0);
try{H.setEndPoint("EndToEnd",G);
return String(H.text).replace(/\r/g,"").length
}catch(F){return 0
}}}},_setCaretPos:function(D,C){C=parseInt(C);
this._setSelectedRange(D,C,C)
},_setSelectedRange:function(element,start,end){if(!end){end=element.value.length
}if(element.setSelectionRange){dijit.focus(element);
element.setSelectionRange(start,end)
}else{if(element.createTextRange){var range=element.createTextRange();
with(range){collapse(true);
moveEnd("character",end);
moveStart("character",start);
select()
}}else{element.value=element.value;
element.blur();
dijit.focus(element);
var dist=parseInt(element.value.length)-end;
var tchar=String.fromCharCode(37);
var tcc=tchar.charCodeAt(0);
for(var x=0;
x<dist;
x++){var te=document.createEvent("KeyEvents");
te.initKeyEvent("keypress",true,true,null,false,false,false,false,tcc,tcc);
element.dispatchEvent(te)
}}}},onkeypress:function(E){if(E.altKey||(E.ctrlKey&&E.charCode!=118)){return 
}var G=false;
this.item=null;
if(this._isShowingNow){this._popupWidget.handleKey(E)
}switch(E.keyCode){case dojo.keys.PAGE_DOWN:case dojo.keys.DOWN_ARROW:if(!this._isShowingNow||this._prev_key_esc){this._arrowPressed();
G=true
}else{this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(E);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.PAGE_UP:case dojo.keys.UP_ARROW:if(this._isShowingNow){this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(E);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.ENTER:var F;
if(this._isShowingNow&&(F=this._popupWidget.getHighlightedOption())){if(F==this._popupWidget.nextButton){this._nextSearch(1);
dojo.stopEvent(E);
break
}else{if(F==this._popupWidget.previousButton){this._nextSearch(-1);
dojo.stopEvent(E);
break
}}}else{this.setDisplayedValue(this.getDisplayedValue())
}E.preventDefault();
case dojo.keys.TAB:var H=this.getDisplayedValue();
if(this._popupWidget&&(H==this._popupWidget._messages.previousMessage||H==this._popupWidget._messages.nextMessage)){break
}if(this._isShowingNow){this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._popupWidget.getHighlightedOption()){this._popupWidget.setValue({target:this._popupWidget.getHighlightedOption()},true)
}this._hideResultList()
}break;
case dojo.keys.SPACE:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._isShowingNow&&this._popupWidget.getHighlightedOption()){dojo.stopEvent(E);
this._selectOption();
this._hideResultList()
}else{G=true
}break;
case dojo.keys.ESCAPE:this._prev_key_backspace=false;
this._prev_key_esc=true;
this._hideResultList();
if(this._lastDisplayedValue!=this.getDisplayedValue()){this.setDisplayedValue(this._lastDisplayedValue);
dojo.stopEvent(E)
}else{this.setValue(this.getValue(),false)
}break;
case dojo.keys.DELETE:case dojo.keys.BACKSPACE:this._prev_key_esc=false;
this._prev_key_backspace=true;
G=true;
break;
case dojo.keys.RIGHT_ARROW:case dojo.keys.LEFT_ARROW:this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
default:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(dojo.isIE||E.charCode!=0){G=true
}}if(this.searchTimer){clearTimeout(this.searchTimer)
}if(G){this.searchTimer=setTimeout(dojo.hitch(this,this._startSearchFromInput),this.searchDelay)
}},_autoCompleteText:function(C){this._setSelectedRange(this.focusNode,this.focusNode.value.length,this.focusNode.value.length);
if(new RegExp("^"+escape(this.focusNode.value),this.ignoreCase?"i":"").test(escape(C))){var D=this._getCaretPos(this.focusNode);
if((D+1)>this.focusNode.value.length){this.focusNode.value=C;
this._setSelectedRange(this.focusNode,D,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",C)
}}else{this.focusNode.value=C;
this._setSelectedRange(this.focusNode,0,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",C)
}},_openResultList:function(D,F){if(this.disabled||F.query[this.searchAttr]!=this._lastQuery){return 
}this._popupWidget.clearResultList();
if(!D.length){this._hideResultList();
return 
}var E=new String(this.store.getValue(D[0],this.searchAttr));
if(E&&this.autoComplete&&!this._prev_key_backspace&&(F.query[this.searchAttr]!="*")){this._autoCompleteText(E);
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",E)
}this._popupWidget.createOptions(D,F,dojo.hitch(this,this._getMenuLabelFromItem));
this._showResultList();
if(F.direction){if(F.direction==1){this._popupWidget.highlightFirstOption()
}else{if(F.direction==-1){this._popupWidget.highlightLastOption()
}}this._announceOption(this._popupWidget.getHighlightedOption())
}},_showResultList:function(){this._hideResultList();
var items=this._popupWidget.getItems(),visibleCount=Math.min(items.length,this.maxListLength);
this._arrowPressed();
this._displayMessage("");
with(this._popupWidget.domNode.style){width="";
height=""
}var best=this.open();
var popupbox=dojo.marginBox(this._popupWidget.domNode);
this._popupWidget.domNode.style.overflow=((best.h==popupbox.h)&&(best.w==popupbox.w))?"hidden":"auto";
var newwidth=best.w;
if(best.h<this._popupWidget.domNode.scrollHeight){newwidth+=16
}dojo.marginBox(this._popupWidget.domNode,{h:best.h,w:Math.max(newwidth,this.domNode.offsetWidth)})
},_hideResultList:function(){if(this._isShowingNow){dijit.popup.close(this._popupWidget);
this._arrowIdle();
this._isShowingNow=false
}},_onBlur:function(){this._hasFocus=false;
this._hasBeenBlurred=true;
this._hideResultList();
this._arrowIdle();
var B=this.getDisplayedValue();
if(this._popupWidget&&(B==this._popupWidget._messages.previousMessage||B==this._popupWidget._messages.nextMessage)){this.setValue(this._lastValueReported,true)
}else{this.setDisplayedValue(B)
}},onfocus:function(B){this._hasFocus=true;
this._onMouse(B)
},_announceOption:function(C){if(C==null){return 
}var D;
if(C==this._popupWidget.nextButton||C==this._popupWidget.previousButton){D=C.innerHTML
}else{D=this.store.getValue(C.item,this.searchAttr)
}this.focusNode.value=this.focusNode.value.substring(0,this._getCaretPos(this.focusNode));
this._autoCompleteText(D)
},_selectOption:function(C){var D=null;
if(!C){C={target:this._popupWidget.getHighlightedOption()}
}if(!C.target){this.setDisplayedValue(this.getDisplayedValue());
return 
}else{D=C.target
}if(!C.noHide){this._hideResultList();
this._setCaretPos(this.focusNode,this.store.getValue(D.item,this.searchAttr).length)
}this._doSelect(D)
},_doSelect:function(B){this.item=B.item;
this.setValue(this.store.getValue(B.item,this.searchAttr),true)
},_onArrowMouseDown:function(B){if(this.disabled){return 
}dojo.stopEvent(B);
this.focus();
if(this._isShowingNow){this._hideResultList()
}else{this._startSearch("")
}},_startSearchFromInput:function(){this._startSearch(this.focusNode.value)
},_startSearch:function(E){if(!this._popupWidget){this._popupWidget=new dijit.form._ComboBoxMenu({onChange:dojo.hitch(this,this._selectOption)})
}var G=this.query;
this._lastQuery=G[this.searchAttr]=E+"*";
var H=this.store.fetch({queryOptions:{ignoreCase:this.ignoreCase,deep:true},query:G,onComplete:dojo.hitch(this,"_openResultList"),start:0,count:this.pageSize});
function F(B,A){B.start+=B.count*A;
B.direction=A;
B.store.fetch(B)
}this._nextSearch=this._popupWidget.onPage=dojo.hitch(this,F,H)
},_getValueField:function(){return this.searchAttr
},_arrowPressed:function(){if(!this.disabled&&this.hasDownArrow){dojo.addClass(this.downArrowNode,"dijitArrowButtonActive")
}},_arrowIdle:function(){if(!this.disabled&&this.hasDownArrow){dojo.removeClass(this.downArrowNode,"dojoArrowButtonPushed")
}},compositionend:function(B){this.onkeypress({charCode:-1})
},constructor:function(){this.query={}
},postMixInProperties:function(){if(!this.hasDownArrow){this.baseClass="dijitTextBox"
}if(!this.store){var B=this.srcNodeRef?dojo.query("> option",this.srcNodeRef).map(function(A){A.style.display="none";
return{value:A.getAttribute("value"),name:String(A.innerHTML)}
}):{};
this.store=new dojo.data.ItemFileReadStore({data:{identifier:this._getValueField(),items:B}});
if(B&&B.length&&!this.value){this.value=B[this.srcNodeRef.selectedIndex!=-1?this.srcNodeRef.selectedIndex:0][this._getValueField()]
}}},uninitialize:function(){if(this._popupWidget){this._hideResultList();
this._popupWidget.destroy()
}},_getMenuLabelFromItem:function(B){return{html:false,label:this.store.getValue(B,this.searchAttr)}
},open:function(){this._isShowingNow=true;
return dijit.popup.open({popup:this._popupWidget,around:this.domNode,parent:this})
}});
dojo.declare("dijit.form._ComboBoxMenu",[dijit._Widget,dijit._Templated],{templateString:"<div class='dijitMenu' dojoAttachEvent='onmousedown,onmouseup,onmouseover,onmouseout' tabIndex='-1' style='overflow:\"auto\";'><div class='dijitMenuItem dijitMenuPreviousButton' dojoAttachPoint='previousButton'></div><div class='dijitMenuItem dijitMenuNextButton' dojoAttachPoint='nextButton'></div></div>",_messages:null,postMixInProperties:function(){this._messages=dojo.i18n.getLocalization("dijit.form","ComboBox",this.lang);
this.inherited("postMixInProperties",arguments)
},setValue:function(B){this.value=B;
this.onChange(B)
},onChange:function(B){},onPage:function(B){},postCreate:function(){this.previousButton.innerHTML=this._messages.previousMessage;
this.nextButton.innerHTML=this._messages.nextMessage;
this.inherited("postCreate",arguments)
},onClose:function(){this._blurOptionNode()
},_createOption:function(G,H){var E=H(G);
var F=document.createElement("div");
if(E.html){F.innerHTML=E.label
}else{F.appendChild(document.createTextNode(E.label))
}if(F.innerHTML==""){F.innerHTML="&nbsp;"
}F.item=G;
return F
},createOptions:function(H,G,E){this.previousButton.style.display=G.start==0?"none":"";
var F=this;
dojo.forEach(H,function(B){var A=F._createOption(B,E);
A.className="dijitMenuItem";
F.domNode.insertBefore(A,F.nextButton)
});
this.nextButton.style.display=G.count==H.length?"":"none"
},clearResultList:function(){while(this.domNode.childNodes.length>2){this.domNode.removeChild(this.domNode.childNodes[this.domNode.childNodes.length-2])
}},getItems:function(){return this.domNode.childNodes
},getListLength:function(){return this.domNode.childNodes.length-2
},onmousedown:function(B){dojo.stopEvent(B)
},onmouseup:function(C){if(C.target===this.domNode){return 
}else{if(C.target==this.previousButton){this.onPage(-1)
}else{if(C.target==this.nextButton){this.onPage(1)
}else{var D=C.target;
while(!D.item){D=D.parentNode
}this.setValue({target:D},true)
}}}},onmouseover:function(C){if(C.target===this.domNode){return 
}var D=C.target;
if(!(D==this.previousButton||D==this.nextButton)){while(!D.item){D=D.parentNode
}}this._focusOptionNode(D)
},onmouseout:function(B){if(B.target===this.domNode){return 
}this._blurOptionNode()
},_focusOptionNode:function(B){if(this._highlighted_option!=B){this._blurOptionNode();
this._highlighted_option=B;
dojo.addClass(this._highlighted_option,"dijitMenuItemHover")
}},_blurOptionNode:function(){if(this._highlighted_option){dojo.removeClass(this._highlighted_option,"dijitMenuItemHover");
this._highlighted_option=null
}},_highlightNextOption:function(){if(!this.getHighlightedOption()){this._focusOptionNode(this.domNode.firstChild.style.display=="none"?this.domNode.firstChild.nextSibling:this.domNode.firstChild)
}else{if(this._highlighted_option.nextSibling&&this._highlighted_option.nextSibling.style.display!="none"){this._focusOptionNode(this._highlighted_option.nextSibling)
}}dijit.scrollIntoView(this._highlighted_option)
},highlightFirstOption:function(){this._focusOptionNode(this.domNode.firstChild.nextSibling);
dijit.scrollIntoView(this._highlighted_option)
},highlightLastOption:function(){this._focusOptionNode(this.domNode.lastChild.previousSibling);
dijit.scrollIntoView(this._highlighted_option)
},_highlightPrevOption:function(){if(!this.getHighlightedOption()){this._focusOptionNode(this.domNode.lastChild.style.display=="none"?this.domNode.lastChild.previousSibling:this.domNode.lastChild)
}else{if(this._highlighted_option.previousSibling&&this._highlighted_option.previousSibling.style.display!="none"){this._focusOptionNode(this._highlighted_option.previousSibling)
}}dijit.scrollIntoView(this._highlighted_option)
},_page:function(J){var G=0;
var I=this.domNode.scrollTop;
var F=parseInt(dojo.getComputedStyle(this.domNode).height);
if(!this.getHighlightedOption()){this._highlightNextOption()
}while(G<F){if(J){if(!this.getHighlightedOption().previousSibling||this._highlighted_option.previousSibling.style.display=="none"){break
}this._highlightPrevOption()
}else{if(!this.getHighlightedOption().nextSibling||this._highlighted_option.nextSibling.style.display=="none"){break
}this._highlightNextOption()
}var H=this.domNode.scrollTop;
G+=(H-I)*(J?-1:1);
I=H
}},pageUp:function(){this._page(true)
},pageDown:function(){this._page(false)
},getHighlightedOption:function(){return this._highlighted_option&&this._highlighted_option.parentNode?this._highlighted_option:null
},handleKey:function(B){switch(B.keyCode){case dojo.keys.DOWN_ARROW:this._highlightNextOption();
break;
case dojo.keys.PAGE_DOWN:this.pageDown();
break;
case dojo.keys.UP_ARROW:this._highlightPrevOption();
break;
case dojo.keys.PAGE_UP:this.pageUp();
break
}}});
dojo.declare("dijit.form.ComboBox",[dijit.form.ValidationTextBox,dijit.form.ComboBoxMixin],{postMixInProperties:function(){dijit.form.ComboBoxMixin.prototype.postMixInProperties.apply(this,arguments);
dijit.form.ValidationTextBox.prototype.postMixInProperties.apply(this,arguments)
}})
}dojo.i18n._preloadLocalizations("dijit.nls.dijit-all",["es-es","es","hu","it-it","de","pt-br","pl","fr-fr","zh-cn","pt","en-us","zh","ru","xx","fr","zh-tw","it","cs","en-gb","de-de","ja-jp","ko-kr","ko","en","ROOT","ja"]);