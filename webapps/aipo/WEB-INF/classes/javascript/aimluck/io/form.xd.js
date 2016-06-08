dojo._xdResourceLoaded({depends:[["provide","aimluck.io"]],defineResource:function(B){if(!B._hasResource["aimluck.io"]){B._hasResource["aimluck.io"]=true;
aimluck.namespace("aimluck.io");
B.provide("aimluck.io");
aimluck.io.submit=function(J,L,K,A){aimluck.io.disableForm(J,true);
var E=B.byId(L+K);
if(E){B.style(E,"display","")
}try{B.xhrPost({url:J.action,timeout:30000,form:J,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(D,F){var C="";
if(B.isArray(D)&&D.length>0){if(D[0]=="PermissionError"){C+="<ul>";
C+="<li><span class='caution'>"+D[1]+"</span></li>";
C+="</ul>"
}else{C+="<ul>";
B.forEach(D,function(G){C+="<li><span class='caution'>"+G+"</span></li>"
});
C+="</ul>"
}}A.call(A,C);
E=B.byId(L+K);
if(E){B.style(E,"display","none")
}if(C!=""){aimluck.io.disableForm(J,false)
}},error:function(C){}})
}catch(I){}return false
};
aimluck.io.sendData=function(H,F,A){var G=new Array();
G.callback=A;
aimluck.io.sendRawData(H,F,sendErrorData,G);
return false
};
aimluck.io.sendErrorData=function(A,F){var E="";
if(B.isArray(F.data)&&F.data.length>0){E+="<ul>";
B.forEach(F.data,function(C){E+="<li>"+C+"</li>"
});
E+="</ul>"
}A.callback.call(A.callback,E);
return false
};
aimluck.io.sendRawData=function(K,E,A,I){var L=new Array;
try{B.xhrGet({url:K,method:"POST",encoding:"utf-8",content:E,mimetype:"text/json",sync:true,load:function(F,C,D,G){L.type=F;
L.data=C;
L.event=D;
L.args=G;
L.bool=true;
A.call(A,I,L);
return L
}})
}catch(J){alert("error")
}};
aimluck.io.escapeText=function(D){var A;
if(typeof (B.byId(D).innerText)!="undefined"){A=B.byId(D).innerText
}else{if(typeof (B.byId(D).value)!="undefined"){A=B.byId(D).value
}else{if(typeof (B.byId(D).textContent)!="undefined"){A=B.byId(D).textContent
}}}return A
};
aimluck.io.disableForm=function(F,H){var A=F.elements;
for(var G=0;
G<A.length;
G++){if(A[G].type=="submit"||A[G].type=="button"){A[G].disabled=H
}}};
aimluck.io.actionSubmit=function(A){aimluck.io.disableForm(A.form,true);
aimluck.io.setHiddenValue(A);
A.form.action=A.form.action+"?"+A.name+"=1";
A.form.submit()
};
aimluck.io.ajaxActionSubmit=function(I,J,H,G,A){aimluck.io.disableForm(I.form,true);
aimluck.io.setHiddenValue(I);
I.form.action=J;
aimluck.io.submit(I.form,H,G,A)
};
aimluck.io.actionSubmitReturn=function(D,A){aimluck.io.disableForm(D.form,true);
aimluck.io.setHiddenValue(D);
D.form.action=D.form.action+"?"+D.name+"=1&action="+A;
D.form.submit()
};
aimluck.io.deleteSubmit=function(A){if(confirm("\u3053\u306e"+A.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(A.form,true);
aimluck.io.setHiddenValue(A);
A.form.action=A.form.action+"?"+A.name+"=1";
A.form.submit()
}};
aimluck.io.ajaxDeleteSubmit=function(I,J,H,G,A){if(confirm("\u3053\u306e"+I.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(I.form,true);
aimluck.io.setHiddenValue(I);
I.form.action=J;
aimluck.io.submit(I.form,H,G,A)
}};
aimluck.io.ajaxEnableSubmit=function(I,J,H,G,A){if(confirm("\u3053\u306e"+I.form._name.value+"\u3092\u6709\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(I.form,true);
aimluck.io.setHiddenValue(I);
I.form.action=J;
aimluck.io.submit(I.form,H,G,A)
}};
aimluck.io.ajaxDisableSubmit=function(I,J,H,G,A){if(confirm("\u3053\u306e"+I.form._name.value+"\u3092\u7121\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(I.form,true);
aimluck.io.setHiddenValue(I);
I.form.action=J;
aimluck.io.submit(I.form,H,G,A)
}};
aimluck.io.deleteSubmitReturn=function(D,A){if(confirm("\u3053\u306e"+D.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(D.form,true);
aimluck.io.setHiddenValue(D);
D.form.action=D.form.action+"?"+D.name+"=1&action="+A;
D.form.submit()
}};
aimluck.io.multiDeleteSubmit=function(A){if(confirm("\u9078\u629e\u3057\u305f"+A.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(A.form,true);
aimluck.io.setHiddenValue(A);
A.form.action=A.form.action+"?"+A.name+"=1";
A.form.submit()
}};
aimluck.io.ajaxMultiDeleteSubmit=function(I,J,H,G,A){if(confirm("\u9078\u629e\u3057\u305f"+I.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(I.form,true);
aimluck.io.setHiddenValue(I);
I.form.action=J;
aimluck.io.submit(I.form,H,G,A)
}};
aimluck.io.ajaxMultiEnableSubmit=function(I,J,H,G,A){if(confirm("\u9078\u629e\u3057\u305f"+I.form._name.value+"\u3092\u6709\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(I.form,true);
aimluck.io.setHiddenValue(I);
I.form.action=J;
aimluck.io.submit(I.form,H,G,A)
}};
aimluck.io.ajaxMultiDisableSubmit=function(I,J,H,G,A){if(confirm("\u9078\u629e\u3057\u305f"+I.form._name.value+"\u3092\u7121\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(I.form,true);
aimluck.io.setHiddenValue(I);
I.form.action=J;
aimluck.io.submit(I.form,H,G,A)
}};
aimluck.io.setHiddenValue=function(D){if(D.name){var A=document.createElement("input");
A.type="hidden";
A.name=D.name;
A.value=D.value;
D.form.appendChild(A)
}};
aimluck.io.openDialog=function(G,H,F,A){aimluck.io.disableForm(G.form,true);
aipo.common.showDialog(H,F,A)
};
aimluck.io.checkboxActionSubmit=function(A){aimluck.io.verifyCheckbox(A.form,aimluck.io.actionSubmit,A)
};
aimluck.io.ajaxCheckboxActionSubmit=function(I,J,H,G,A){aimluck.io.ajaxVerifyCheckbox(I.form,aimluck.io.ajaxActionSubmit,I,J,H,G,A)
};
aimluck.io.checkboxDeleteSubmit=function(A){aimluck.io.verifyCheckbox(A.form,aimluck.io.multiDeleteSubmit,A)
};
aimluck.io.ajaxCheckboxDeleteSubmit=function(I,J,H,G,A){aimluck.io.ajaxVerifyCheckbox(I.form,aimluck.io.ajaxMultiDeleteSubmit,I,J,H,G,A)
};
aimluck.io.ajaxCheckboxEnableSubmit=function(I,J,H,G,A){aimluck.io.ajaxVerifyCheckbox(I.form,aimluck.io.ajaxMultiEnableSubmit,I,J,H,G,A)
};
aimluck.io.ajaxCheckboxDisableSubmit=function(I,J,H,G,A){aimluck.io.ajaxVerifyCheckbox(I.form,aimluck.io.ajaxMultiDisableSubmit,I,J,H,G,A)
};
aimluck.io.verifyCheckbox=function(G,A,H){var I=0;
var J;
for(J=0;
J<G.elements.length;
J++){if(G.elements[J].checked){I++
}}if(I==0){alert("\u30c1\u30a7\u30c3\u30af\u30dc\u30c3\u30af\u30b9\u3092\uff11\u3064\u4ee5\u4e0a\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
return false
}else{return A(H)
}};
aimluck.io.ajaxVerifyCheckbox=function(K,Q,M,L,N,O,R){var A=0;
var P;
for(P=0;
P<K.elements.length;
P++){if(K.elements[P].checked){A++
}}if(A==0){alert("\u30c1\u30a7\u30c3\u30af\u30dc\u30c3\u30af\u30b9\u3092\uff11\u3064\u4ee5\u4e0a\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
return false
}else{return Q(M,L,N,O,R)
}};
aimluck.io.createOptions=function(M,T){var A,U,Q,R,N,V,O,P;
if(T.url){N=T.url
}if(T.key){Q=T.key
}if(T.value){R=T.value
}if(typeof T.selectedId=="undefined"){}else{A=T.selectedId
}if(typeof T.preOptions=="undefined"){}else{U=T.preOptions
}if(typeof T.indicator=="undefined"){}else{V=T.indicator;
var S=B.byId(V);
if(S){B.style(S,"display","none")
}}if(typeof T.callback=="undefined"){}else{O=T.callback;
if(typeof T.callbackTarget=="undefined"){}else{P=T.callbackTarget
}}B.xhrGet({url:N,timeout:10000,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(C,D){var E=B.byId(M);
E.options.length=0;
if(typeof U=="undefined"){}else{aimluck.io.addOption(E,U.key,U.value,false)
}B.forEach(C,function(F){if(typeof F[Q]=="undefined"||typeof F[R]=="undefined"){}else{if(F[Q]==A){aimluck.io.addOption(E,F[Q],F[R],true)
}else{aimluck.io.addOption(E,F[Q],F[R],false)
}}});
if(S){B.style(S,"display","none")
}if(O){O.call(P?P:O,C)
}}})
};
aimluck.io.addOption=function(J,H,G,A){if(document.all){var I=document.createElement("OPTION");
I.value=H;
I.text=G;
I.selected=A;
if(J.options.length==1&&J.options[0].value==""){J.options.remove(0)
}J.add(I,J.options.length)
}else{var I=document.createElement("OPTION");
I.value=H;
I.text=G;
I.selected=A;
if(J.options.length==1&&J.options[0].value==""){J.removeChild(J.options[0])
}J.insertBefore(I,J.options[J.options.length])
}};
aimluck.io.removeOptions=function(D){if(document.all){var A=D.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){A.remove(i);
i-=1
}}}else{var A=D.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){D.removeChild(A[i]);
i-=1
}}}if(A.length==0){add_option(D,"","\u3000",false)
}};
aimluck.io.removeAllOptions=function(D){if(D.options.length==0){return 
}aimluck.io.selectAllOptions(D);
if(document.all){var A=D.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){A.remove(i);
i-=1
}}}else{var A=D.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){D.removeChild(A[i]);
i-=1
}}}if(A.length==0){add_option(D,"","\u3000",false)
}};
aimluck.io.selectAllOptions=function(D){var A=D.options;
if(A.length==0){return 
}for(i=0;
i<A.length;
i++){A[i].selected=true
}};
aimluck.io.switchCheckbox=function(A){var D;
if(A.checked){for(i=0;
i<A.form.elements.length;
i++){D=A.form.elements[i];
if(!D.disabled){D.checked=true
}}}else{for(i=0;
i<A.form.elements.length;
i++){D=A.form.elements[i];
if(!D.disabled){D.checked=false
}}}};
aimluck.io.postViewPage=function(F,G,H){aimluck.io.disableForm(F,true);
var A=B.byId(H+G);
if(A){B.style(A,"display","")
}B.xhrPost({url:F.action,timeout:30000,form:F,encoding:"utf-8",handleAs:"text",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(E,J){var D=E;
A=B.byId(H+G);
if(A){B.style(A,"display","none")
}if(D!=""){aimluck.io.disableForm(F,false);
var C=dijit.byId("portlet_"+G);
if(!C){C=new aimluck.widget.Contentpane({},"portlet_"+G)
}if(C){ptConfig[G].reloadUrl=ptConfig[G].initUrl;
C._isDownloaded=true;
C.setContent(D)
}}if(aipo.onloadSmartPhone==null){aipo.onloadSmartPhone()
}},error:function(C){}})
}
}}});