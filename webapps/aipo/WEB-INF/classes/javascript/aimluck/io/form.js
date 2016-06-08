aimluck.namespace("aimluck.io");
dojo.provide("aimluck.io");
aimluck.io.submit=function(K,E,L,H){aimluck.io.disableForm(K,true);
var I=dojo.byId(E+L);
if(I){dojo.style(I,"display","")
}try{dojo.xhrPost({url:K.action,timeout:30000,form:K,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(B,C){var A="";
if(dojo.isArray(B)&&B.length>0){if(B[0]=="PermissionError"){A+="<ul>";
A+="<li><span class='caution'>"+B[1]+"</span></li>";
A+="</ul>"
}else{A+="<ul>";
dojo.forEach(B,function(D){A+="<li><span class='caution'>"+D+"</span></li>"
});
A+="</ul>"
}}H.call(H,A);
I=dojo.byId(E+L);
if(I){dojo.style(I,"display","none")
}if(A!=""){aimluck.io.disableForm(K,false)
}},error:function(A){}})
}catch(J){}return false
};
aimluck.io.sendData=function(E,G,F){var H=new Array();
H.callback=F;
aimluck.io.sendRawData(E,G,sendErrorData,H);
return false
};
aimluck.io.sendErrorData=function(E,D){var F="";
if(dojo.isArray(D.data)&&D.data.length>0){F+="<ul>";
dojo.forEach(D.data,function(A){F+="<li>"+A+"</li>"
});
F+="</ul>"
}E.callback.call(E.callback,F);
return false
};
aimluck.io.sendRawData=function(L,I,H,J){var E=new Array;
try{dojo.xhrGet({url:L,method:"POST",encoding:"utf-8",content:I,mimetype:"text/json",sync:true,load:function(C,A,B,D){E.type=C;
E.data=A;
E.event=B;
E.args=D;
E.bool=true;
H.call(H,J,E);
return E
}})
}catch(K){alert("error")
}};
aimluck.io.escapeText=function(C){var D;
if(typeof (dojo.byId(C).innerText)!="undefined"){D=dojo.byId(C).innerText
}else{if(typeof (dojo.byId(C).value)!="undefined"){D=dojo.byId(C).value
}else{if(typeof (dojo.byId(C).textContent)!="undefined"){D=dojo.byId(C).textContent
}}}return D
};
aimluck.io.disableForm=function(G,E){var F=G.elements;
for(var H=0;
H<F.length;
H++){if(F[H].type=="submit"||F[H].type=="button"){F[H].disabled=E
}}};
aimluck.io.actionSubmit=function(B){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=B.form.action+"?"+B.name+"=1";
B.form.submit()
};
aimluck.io.ajaxActionSubmit=function(J,F,I,H,G){aimluck.io.disableForm(J.form,true);
aimluck.io.setHiddenValue(J);
J.form.action=F;
aimluck.io.submit(J.form,I,H,G)
};
aimluck.io.actionSubmitReturn=function(C,D){aimluck.io.disableForm(C.form,true);
aimluck.io.setHiddenValue(C);
C.form.action=C.form.action+"?"+C.name+"=1&action="+D;
C.form.submit()
};
aimluck.io.deleteSubmit=function(B){if(confirm("\u3053\u306e"+B.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=B.form.action+"?"+B.name+"=1";
B.form.submit()
}};
aimluck.io.ajaxDeleteSubmit=function(J,F,I,H,G){if(confirm("\u3053\u306e"+J.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(J.form,true);
aimluck.io.setHiddenValue(J);
J.form.action=F;
aimluck.io.submit(J.form,I,H,G)
}};
aimluck.io.ajaxEnableSubmit=function(J,F,I,H,G){if(confirm("\u3053\u306e"+J.form._name.value+"\u3092\u6709\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(J.form,true);
aimluck.io.setHiddenValue(J);
J.form.action=F;
aimluck.io.submit(J.form,I,H,G)
}};
aimluck.io.ajaxDisableSubmit=function(J,F,I,H,G){if(confirm("\u3053\u306e"+J.form._name.value+"\u3092\u7121\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(J.form,true);
aimluck.io.setHiddenValue(J);
J.form.action=F;
aimluck.io.submit(J.form,I,H,G)
}};
aimluck.io.deleteSubmitReturn=function(C,D){if(confirm("\u3053\u306e"+C.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(C.form,true);
aimluck.io.setHiddenValue(C);
C.form.action=C.form.action+"?"+C.name+"=1&action="+D;
C.form.submit()
}};
aimluck.io.multiDeleteSubmit=function(B){if(confirm("\u9078\u629e\u3057\u305f"+B.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=B.form.action+"?"+B.name+"=1";
B.form.submit()
}};
aimluck.io.ajaxMultiDeleteSubmit=function(J,F,I,H,G){if(confirm("\u9078\u629e\u3057\u305f"+J.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(J.form,true);
aimluck.io.setHiddenValue(J);
J.form.action=F;
aimluck.io.submit(J.form,I,H,G)
}};
aimluck.io.ajaxMultiEnableSubmit=function(J,F,I,H,G){if(confirm("\u9078\u629e\u3057\u305f"+J.form._name.value+"\u3092\u6709\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(J.form,true);
aimluck.io.setHiddenValue(J);
J.form.action=F;
aimluck.io.submit(J.form,I,H,G)
}};
aimluck.io.ajaxMultiDisableSubmit=function(J,F,I,H,G){if(confirm("\u9078\u629e\u3057\u305f"+J.form._name.value+"\u3092\u7121\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(J.form,true);
aimluck.io.setHiddenValue(J);
J.form.action=F;
aimluck.io.submit(J.form,I,H,G)
}};
aimluck.io.setHiddenValue=function(C){if(C.name){var D=document.createElement("input");
D.type="hidden";
D.name=C.name;
D.value=C.value;
C.form.appendChild(D)
}};
aimluck.io.openDialog=function(H,E,G,F){aimluck.io.disableForm(H.form,true);
aipo.common.showDialog(E,G,F)
};
aimluck.io.checkboxActionSubmit=function(B){aimluck.io.verifyCheckbox(B.form,aimluck.io.actionSubmit,B)
};
aimluck.io.ajaxCheckboxActionSubmit=function(J,F,I,H,G){aimluck.io.ajaxVerifyCheckbox(J.form,aimluck.io.ajaxActionSubmit,J,F,I,H,G)
};
aimluck.io.checkboxDeleteSubmit=function(B){aimluck.io.verifyCheckbox(B.form,aimluck.io.multiDeleteSubmit,B)
};
aimluck.io.ajaxCheckboxDeleteSubmit=function(J,F,I,H,G){aimluck.io.ajaxVerifyCheckbox(J.form,aimluck.io.ajaxMultiDeleteSubmit,J,F,I,H,G)
};
aimluck.io.ajaxCheckboxEnableSubmit=function(J,F,I,H,G){aimluck.io.ajaxVerifyCheckbox(J.form,aimluck.io.ajaxMultiEnableSubmit,J,F,I,H,G)
};
aimluck.io.ajaxCheckboxDisableSubmit=function(J,F,I,H,G){aimluck.io.ajaxVerifyCheckbox(J.form,aimluck.io.ajaxMultiDisableSubmit,J,F,I,H,G)
};
aimluck.io.verifyCheckbox=function(H,G,I){var J=0;
var F;
for(F=0;
F<H.elements.length;
F++){if(H.elements[F].checked){J++
}}if(J==0){alert("\u30c1\u30a7\u30c3\u30af\u30dc\u30c3\u30af\u30b9\u3092\uff11\u3064\u4ee5\u4e0a\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
return false
}else{return G(I)
}};
aimluck.io.ajaxVerifyCheckbox=function(L,R,N,M,O,P,J){var K=0;
var Q;
for(Q=0;
Q<L.elements.length;
Q++){if(L.elements[Q].checked){K++
}}if(K==0){alert("\u30c1\u30a7\u30c3\u30af\u30dc\u30c3\u30af\u30b9\u3092\uff11\u3064\u4ee5\u4e0a\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
return false
}else{return R(N,M,O,P,J)
}};
aimluck.io.createOptions=function(N,U){var M,V,R,S,O,L,P,Q;
if(U.url){O=U.url
}if(U.key){R=U.key
}if(U.value){S=U.value
}if(typeof U.selectedId=="undefined"){}else{M=U.selectedId
}if(typeof U.preOptions=="undefined"){}else{V=U.preOptions
}if(typeof U.indicator=="undefined"){}else{L=U.indicator;
var T=dojo.byId(L);
if(T){dojo.style(T,"display","none")
}}if(typeof U.callback=="undefined"){}else{P=U.callback;
if(typeof U.callbackTarget=="undefined"){}else{Q=U.callbackTarget
}}dojo.xhrGet({url:O,timeout:10000,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(B,C){var A=dojo.byId(N);
A.options.length=0;
if(typeof V=="undefined"){}else{aimluck.io.addOption(A,V.key,V.value,false)
}dojo.forEach(B,function(D){if(typeof D[R]=="undefined"||typeof D[S]=="undefined"){}else{if(D[R]==M){aimluck.io.addOption(A,D[R],D[S],true)
}else{aimluck.io.addOption(A,D[R],D[S],false)
}}});
if(T){dojo.style(T,"display","none")
}if(P){P.call(Q?Q:P,B)
}}})
};
aimluck.io.addFileToList=function(G,F,H){if(G.parentNode.style.display=="none"){G.parentNode.style.display=""
}if(document.all){var E=document.createElement("li");
E.setAttribute("data-fileid",F);
E.setAttribute("data-filename",H);
E.innerHTML="<span>"+H+'</span><span class="deletebutton" onclick="aimluck.io.removeFileFromList(this.parentNode.parentNode,this.parentNode);">削除</span>';
return G.appendChild(E)
}else{var E=document.createElement("li");
E.setAttribute("data-fileid",F);
E.setAttribute("data-filename",H);
E.innerHTML="<span>"+H+'</span><span class="deletebutton"  onclick="aimluck.io.removeFileFromList(this.parentNode.parentNode,this.parentNode);">削除</span>';
return G.appendChild(E)
}};
aimluck.io.replaceFileToList=function(G,F,H){if(document.all){var E=document.createElement("li");
E.setAttribute("data-fileid",F);
E.setAttribute("data-filename",H);
E.innerHTML="<span>"+H+'</span><span class="deletebutton" onclick="aimluck.io.removeFileFromList(this.parentNode.parentNode,this.parentNode);">削除</span>';
G.innerHTML="";
return G.appendChild(E)
}else{var E=document.createElement("li");
E.setAttribute("data-fileid",F);
E.setAttribute("data-filename",H);
E.innerHTML="<span>"+H+'</span><span class="deletebutton"  onclick="aimluck.io.removeFileFromList(this.parentNode.parentNode,this.parentNode);">削除</span>';
G.innerHTML="";
return G.appendChild(E)
}};
aimluck.io.removeFileFromList=function(D,C){return D.removeChild(C)
};
aimluck.io.createSelectFromFileList=function(I,N){var K=dojo.byId("attachments_"+N);
var H=document.createElement("select");
H.style.display="none";
H.id="attachments_select";
H.multiple="multiple";
H.name="attachments";
var M=K.children;
for(var L=0;
L<M.length;
L++){var J=document.createElement("option");
J.value=M[L].getAttribute("data-fileid");
J.text=M[L].getAttribute("data-filename");
J.selected=true;
H.appendChild(J)
}I.appendChild(H)
};
aimluck.io.addOption=function(F,I,H,G){if(document.all){var J=document.createElement("OPTION");
J.value=I;
J.text=H;
J.selected=G;
if(F.options.length==1&&F.options[0].value==""){F.options.remove(0)
}F.add(J,F.options.length)
}else{var J=document.createElement("OPTION");
J.value=I;
J.text=H;
J.selected=G;
if(F.options.length==1&&F.options[0].value==""){F.removeChild(F.options[0])
}F.insertBefore(J,F.options[F.options.length])
}};
aimluck.io.removeOptions=function(C){if(document.all){var D=C.options;
for(i=0;
i<D.length;
i++){if(D[i].selected){D.remove(i);
i-=1
}}}else{var D=C.options;
for(i=0;
i<D.length;
i++){if(D[i].selected){C.removeChild(D[i]);
i-=1
}}}if(D.length==0){add_option(C,"","\u3000",false)
}};
aimluck.io.removeAllOptions=function(C){if(C.options.length==0){return 
}aimluck.io.selectAllOptions(C);
if(document.all){var D=C.options;
for(i=0;
i<D.length;
i++){if(D[i].selected){D.remove(i);
i-=1
}}}else{var D=C.options;
for(i=0;
i<D.length;
i++){if(D[i].selected){C.removeChild(D[i]);
i-=1
}}}if(D.length==0){add_option(C,"","\u3000",false)
}};
aimluck.io.selectAllOptions=function(C){var D=C.options;
if(D.length==0){return 
}for(i=0;
i<D.length;
i++){D[i].selected=true
}};
aimluck.io.switchCheckbox=function(D){var C;
if(D.checked){for(i=0;
i<D.form.elements.length;
i++){C=D.form.elements[i];
if(!C.disabled&&C.type=="checkbox"){C.checked=true
}}}else{for(i=0;
i<D.form.elements.length;
i++){C=D.form.elements[i];
if(!C.disabled&&C.type=="checkbox"){C.checked=false
}}}};
aimluck.io.postViewPage=function(G,H,E){aimluck.io.disableForm(G,true);
var F=dojo.byId(E+H);
if(F){dojo.style(F,"display","")
}dojo.xhrPost({url:G.action,timeout:30000,form:G,encoding:"utf-8",handleAs:"text",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(C,D){var B=C;
F=dojo.byId(E+H);
if(F){dojo.style(F,"display","none")
}if(B!=""){aimluck.io.disableForm(G,false);
var A=dijit.byId("portlet_"+H);
if(!A){A=new aimluck.widget.Contentpane({},"portlet_"+H)
}if(A){ptConfig[H].reloadUrl=ptConfig[H].initUrl;
A._isDownloaded=true;
A.setContent(B)
}}if(aipo.onloadSmartPhone==null){aipo.onloadSmartPhone()
}},error:function(A){}})
};