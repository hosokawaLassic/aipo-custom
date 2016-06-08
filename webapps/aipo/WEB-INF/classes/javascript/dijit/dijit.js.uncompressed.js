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
};