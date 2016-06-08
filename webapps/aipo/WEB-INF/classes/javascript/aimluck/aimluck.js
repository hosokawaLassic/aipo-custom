window.aimluck=window.aimluck||{};
aimluck.namespace=function(G){if(!G||!G.length){return null
}var F=G.split(".");
var H=aimluck;
for(var E=(F[0]=="aimluck")?1:0;
E<F.length;
++E){H[F[E]]=H[F[E]]||{};
H=H[F[E]]
}return H
};
function getObjectById(B){if(document.getElementById){return document.getElementById(B)
}else{if(document.all){return document.all(B)
}else{if(document.layers){return document.layers[B]
}}}}function ew(B){disableButton(B.form);
B.form.action=B.form.action+"?"+B.name+"=1";
B.form.submit()
}function dw(B){if(confirm("\u3053\u306e"+B.form.name+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){disableButton(B.form);
B.form.action=B.form.action+"?"+B.name+"=1";
B.form.submit()
}}function ews(B){disableButton(B.form);
B.form.action=B.form.action+"?"+B.name+"=1";
B.form.submit()
}function dws(B){if(confirm("\u9078\u629e\u3057\u305f"+B.form.name+"\u3092\u3059\u3079\u3066\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){disableButton(B.form);
B.form.action=B.form.action+"?"+B.name+"=1";
B.form.submit()
}}function setHiddenValue(C){if(C.name){var D=document.createElement("input");
D.type="hidden";
D.name=C.name;
D.value=C.value;
C.form.appendChild(D)
}}function disableSubmit(F){var E=F.elements;
for(var D=0;
D<E.length;
D++){if(E[D].type=="submit"){E[D].disabled=true
}}}function disableButton(F){var E=F.elements;
for(var D=0;
D<E.length;
D++){if(E[D].type=="button"){E[D].disabled=true
}}}function check_new_mail(C,D){C.form.action=C.form.action+"?confirmlasttime=true&start="+D;
C.form.submit()
}function createAction(B){B.form.action=B.form.action+"?"+B.name+"=1"
}function verifyCheckBox(H,G,I){var J=0;
var F;
for(F=0;
F<H.elements.length;
F++){if(H.elements[F].checked){J++
}}if(J==0){alert("\u30c1\u30a7\u30c3\u30af\u30dc\u30c3\u30af\u30b9\u3092\uff11\u3064\u4ee5\u4e0a\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
return false
}else{return G(I)
}}function submit_member(C){var D=C.options;
for(i=0;
i<D.length;
i++){D[i].selected=true
}}function add_option(F,I,H,G){if(document.all){var J=document.createElement("OPTION");
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
}}function add_member(I,L){if(document.all){var G=I.options;
var H=L.options;
if(G.length==1&&G[0].value==""){return 
}for(i=0;
i<G.length;
i++){if(!G[i].selected){continue
}var J=false;
for(j=0;
j<H.length;
j++){if(H[j].value==G[i].value){J=true;
break
}}if(J){continue
}var K=document.createElement("OPTION");
K.value=G[i].value;
K.text=G[i].text;
K.selected=true;
if(H.length==1&&H[0].value==""){H.remove(0)
}H.add(K,H.length)
}}else{var G=I.options;
var H=L.options;
if(G.length==1&&G[0].value==""){return 
}for(i=0;
i<G.length;
i++){if(!G[i].selected){continue
}var J=false;
for(j=0;
j<H.length;
j++){if(H[j].value==G[i].value){J=true;
break
}}if(J){continue
}var K=document.createElement("OPTION");
K.value=G[i].value;
K.text=G[i].text;
K.selected=true;
if(L.options.length==1&&L.options[0].value==""){L.removeChild(L.options[0])
}L.insertBefore(K,H[H.length])
}}}function remove_member(C){if(document.all){var D=C.options;
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
}}function doUpOptions10(C){var D=C.options;
for(i=0;
i<D.length;
i++){if(!D[i].selected){continue
}if(i==0){continue
}if(D[i-1].selected){continue
}up_option(C,i,10)
}}function doUpOptions(C){var D=C.options;
for(i=0;
i<D.length;
i++){if(!D[i].selected){continue
}if(i==0){continue
}if(D[i-1].selected){continue
}up_option(C,i,1)
}}function doDownOptions10(C){var D=C.options;
for(i=D.length-1;
i>=0;
i--){if(!D[i].selected){continue
}if(i==D.length-1){continue
}if(D[i+1].selected){continue
}down_option(C,i,10)
}}function doDownOptions(C){var D=C.options;
for(i=D.length-1;
i>=0;
i--){if(!D[i].selected){continue
}if(i==D.length-1){continue
}if(D[i+1].selected){continue
}down_option(C,i,1)
}}function up_option(F,I,H){var J=F.options;
var G=0;
if(I-H>=0){G=I-H
}else{for(i=0;
i<J.length;
i++){if(!J[i].selected){G=i;
break
}}}change_turn_option(F,I,G)
}function down_option(F,I,H){var J=F.options;
var G=0;
if(J.length-1-I-H>=0){G=I+H
}else{for(i=J.length-1;
i>=0;
i--){if(!J[i].selected){G=i;
break
}}}change_turn_option(F,I,G)
}function change_turn_option(F,I,G){var J=F.options;
if(document.all){var H=document.createElement("OPTION");
H.value=J[I].value;
H.text=J[I].text;
H.selected=true;
F.remove(I);
J.add(H,G);
J[G].selected=true
}else{var H=document.createElement("OPTION");
H.value=J[I].value;
H.text=J[I].text;
H.selected=true;
F.removeChild(J[I]);
F.insertBefore(H,J[G]);
J[G].selected=true
}};