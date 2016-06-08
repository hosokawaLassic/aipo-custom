var gadgets=gadgets||{};
var shindig=shindig||{};
var osapi=osapi||{};
gadgets.config=function(){var B={};
var A;
return{register:function(F,E,D){var C=B[F];
if(!C){C=[];
B[F]=C
}C.push({validators:E||{},callback:D})
},get:function(C){if(C){return A[C]||{}
}return A
},init:function(E,L){A=E;
for(var C in B){if(B.hasOwnProperty(C)){var D=B[C],I=E[C];
for(var H=0,G=D.length;
H<G;
++H){var J=D[H];
if(I&&!L){var F=J.validators;
for(var K in F){if(F.hasOwnProperty(K)){if(!F[K](I[K])){throw new Error('Invalid config value "'+I[K]+'" for parameter "'+K+'" in component "'+C+'"')
}}}}if(J.callback){J.callback(E)
}}}}},EnumValidator:function(C){var F=[];
if(arguments.length>1){for(var E=0,D;
(D=arguments[E]);
++E){F.push(D)
}}else{F=C
}return function(H){for(var G=0,I;
(I=F[G]);
++G){if(H===F[G]){return true
}}return false
}
},RegExValidator:function(C){return function(D){return C.test(D)
}
},ExistsValidator:function(C){return typeof C!=="undefined"
},NonEmptyStringValidator:function(C){return typeof C==="string"&&C.length>0
},BooleanValidator:function(C){return typeof C==="boolean"
},LikeValidator:function(C){return function(E){for(var F in C){if(C.hasOwnProperty(F)){var D=C[F];
if(!D(E[F])){return false
}}}return true
}
}}
}();
gadgets.config.isGadget=false;
gadgets.config.isContainer=true;
gadgets.util=function(){function B(L){var I;
var J=L.indexOf("?");
var K=L.indexOf("#");
if(K===-1){I=L.substr(J+1)
}else{I=[L.substr(J+1,K-J-1),"&",L.substr(K+1)].join("")
}return I.split("&")
}var H=null;
var G={};
var F={};
var A=[];
var D={0:false,10:true,13:true,34:true,39:true,60:true,62:true,92:true,8232:true,8233:true};
function E(J,I){return String.fromCharCode(I)
}function C(I){G=I["core.util"]||{}
}if(gadgets.config){gadgets.config.register("core.util",null,C)
}return{getUrlParameters:function(L){var N=typeof L==="undefined";
if(H!==null&&N){return H
}var R={};
var O=B(L||document.location.href);
var J=window.decodeURIComponent?decodeURIComponent:unescape;
for(var Q=0,P=O.length;
Q<P;
++Q){var I=O[Q].indexOf("=");
if(I===-1){continue
}var M=O[Q].substring(0,I);
var K=O[Q].substring(I+1);
K=K.replace(/\+/g," ");
R[M]=J(K)
}if(N){H=R
}return R
},makeClosure:function(I,K,J){var N=[];
for(var M=2,L=arguments.length;
M<L;
++M){N.push(arguments[M])
}return function(){var Q=N.slice();
for(var P=0,O=arguments.length;
P<O;
++P){Q.push(arguments[P])
}return K.apply(I,Q)
}
},makeEnum:function(K){var L,J,I={};
for(L=0;
(J=K[L]);
++L){I[J]=J
}return I
},getFeatureParameters:function(I){return typeof G[I]==="undefined"?null:G[I]
},hasFeature:function(I){return typeof G[I]!=="undefined"
},getServices:function(){return F
},registerOnLoadHandler:function(I){A.push(I)
},runOnLoadHandlers:function(){for(var I=0,J=A.length;
I<J;
++I){A[I]()
}},escape:function(L,J){if(!L){return L
}else{if(typeof L==="string"){return gadgets.util.escapeString(L)
}else{if(typeof L==="array"){for(var I=0,M=L.length;
I<M;
++I){L[I]=gadgets.util.escape(L[I])
}}else{if(typeof L==="object"&&J){var N={};
for(var K in L){if(L.hasOwnProperty(K)){N[gadgets.util.escapeString(K)]=gadgets.util.escape(L[K],true)
}}return N
}}}}return L
},escapeString:function(J){if(!J){return J
}var M=[],I,K;
for(var N=0,L=J.length;
N<L;
++N){I=J.charCodeAt(N);
K=D[I];
if(K===true){M.push("&#",I,";")
}else{if(K!==false){M.push(J.charAt(N))
}}}return M.join("")
},unescapeString:function(I){if(!I){return I
}return I.replace(/&#([0-9]+);/g,E)
},attachBrowserEvent:function(L,K,I,J){if(typeof L.addEventListener!="undefined"){L.addEventListener(K,I,J)
}else{if(typeof L.attachEvent!="undefined"){L.attachEvent("on"+K,I)
}else{gadgets.warn("cannot attachBrowserEvent: "+K)
}}},removeBrowserEvent:function(L,K,I,J){if(L.removeEventListener){L.removeEventListener(K,I,J)
}else{if(L.detachEvent){L.detachEvent("on"+K,I)
}else{gadgets.warn("cannot removeBrowserEvent: "+K)
}}}}
}();
gadgets.util.getUrlParameters();
var tamings___=tamings___||[];
tamings___.push(function(A){caja___.whitelistFuncs([[gadgets.util,"escapeString"],[gadgets.util,"getFeatureParameters"],[gadgets.util,"getUrlParameters"],[gadgets.util,"hasFeature"],[gadgets.util,"registerOnLoadHandler"],[gadgets.util,"unescapeString"]])
});
if(window.JSON&&window.JSON.parse&&window.JSON.stringify){gadgets.json=(function(){var A=/___$/;
return{parse:function(B){try{return window.JSON.parse(B)
}catch(C){return false
}},stringify:function(B){try{return window.JSON.stringify(B,function(E,D){return !A.test(E)?D:null
})
}catch(C){return null
}}}
})()
}else{gadgets.json=function(){function f(n){return n<10?"0"+n:n
}Date.prototype.toJSON=function(){return[this.getUTCFullYear(),"-",f(this.getUTCMonth()+1),"-",f(this.getUTCDate()),"T",f(this.getUTCHours()),":",f(this.getUTCMinutes()),":",f(this.getUTCSeconds()),"Z"].join("")
};
var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
function stringify(value){var a,i,k,l,r=/["\\\x00-\x1f\x7f-\x9f]/g,v;
switch(typeof value){case"string":return r.test(value)?'"'+value.replace(r,function(a){var c=m[a];
if(c){return c
}c=a.charCodeAt();
return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)
})+'"':'"'+value+'"';
case"number":return isFinite(value)?String(value):"null";
case"boolean":case"null":return String(value);
case"object":if(!value){return"null"
}a=[];
if(typeof value.length==="number"&&!value.propertyIsEnumerable("length")){l=value.length;
for(i=0;
i<l;
i+=1){a.push(stringify(value[i])||"null")
}return"["+a.join(",")+"]"
}for(k in value){if(k.match("___$")){continue
}if(value.hasOwnProperty(k)){if(typeof k==="string"){v=stringify(value[k]);
if(v){a.push(stringify(k)+":"+v)
}}}}return"{"+a.join(",")+"}"
}return""
}return{stringify:stringify,parse:function(text){if(/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/b-u]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){return eval("("+text+")")
}return false
}}
}()
}gadgets.json.flatten=function(B){var C={};
if(B===null||B===undefined){return C
}for(var D in B){if(B.hasOwnProperty(D)){var A=B[D];
if(null===A||undefined===A){continue
}C[D]=(typeof A==="string")?A:gadgets.json.stringify(A)
}}return C
};
var tamings___=tamings___||[];
tamings___.push(function(A){___.tamesTo(gadgets.json.stringify,safeJSON.stringify);
___.tamesTo(gadgets.json.parse,safeJSON.parse)
});
shindig.Auth=function(){var authToken=null;
var trusted=null;
function addParamsToToken(urlParams){var args=authToken.split("&");
for(var i=0;
i<args.length;
i++){var nameAndValue=args[i].split("=");
if(nameAndValue.length===2){var name=nameAndValue[0];
var value=nameAndValue[1];
if(value==="$"){value=encodeURIComponent(urlParams[name]);
args[i]=name+"="+value
}}}authToken=args.join("&")
}function init(configuration){var urlParams=gadgets.util.getUrlParameters();
var config=configuration["shindig.auth"]||{};
if(config.authToken){authToken=config.authToken
}else{if(urlParams.st){authToken=urlParams.st
}}if(authToken!==null){addParamsToToken(urlParams)
}if(config.trustedJson){trusted=eval("("+config.trustedJson+")")
}}gadgets.config.register("shindig.auth",null,init);
return{getSecurityToken:function(){return authToken
},updateSecurityToken:function(newToken){authToken=newToken
},getTrustedData:function(){return trusted
}}
};
shindig.auth=new shindig.Auth();
gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.wpm){gadgets.rpctx.wpm=function(){var C,B;
function A(H,F,G){if(typeof window.addEventListener!="undefined"){window.addEventListener(H,F,G)
}else{if(typeof window.attachEvent!="undefined"){window.attachEvent("on"+H,F)
}}}function E(H,F,G){if(window.removeEventListener){window.removeEventListener(H,F,G)
}else{if(window.detachEvent){window.detachEvent("on"+H,F)
}}}function D(H){var F=gadgets.json.parse(H.data);
if(!F||!F.f){return 
}var G=gadgets.rpc.getTargetOrigin(F.f);
if(typeof H.origin!=="undefined"?H.origin!==G:H.domain!==/^.+:\/\/([^:]+).*/.exec(G)[1]){return 
}C(F,H.origin)
}return{getCode:function(){return"wpm"
},isParentVerifiable:function(){return true
},init:function(G,F){C=G;
B=F;
A("message",D,false);
B("..",true);
return true
},setup:function(F,G){B(F,true);
return true
},call:function(H,F,J){var G=gadgets.rpc.getTargetOrigin(H);
var I=gadgets.rpc._getTargetWin(H);
if(G){window.setTimeout(function(){I.postMessage(gadgets.json.stringify(J),G)
},0)
}else{gadgets.error("No relay set (used as window.postMessage targetOrigin), cannot send cross-domain message")
}return true
}}
}()
}gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.flash){gadgets.rpctx.flash=function(){var Z="___xpcswf";
var Q=null;
var J=false;
var K=null;
var g=null;
var U=null;
var h=100;
var R=50;
var a=[];
var i=null;
var A=0;
var V="_scr";
var F="_pnt";
var I=100;
var P=50;
var M=0;
var E=null;
var Y={};
var c=window.location.protocol+"//"+window.location.host;
var N="___jsl";
var D="_fm";
var H;
function T(){window[N]=window[N]||{};
var l=window[N];
var k=l[D]={};
H=N+"."+D;
return k
}var L=T();
function j(k,l){var m=function(){k.apply({},arguments)
};
L[l]=L[l]||m;
return H+"."+l
}function O(k){return k===".."?gadgets.rpc.RPC_ID:k
}function d(k){return k===".."?"INNER":"OUTER"
}function f(k){if(J){Q=k.rpc.commSwf||"/xpc.swf"
}}gadgets.config.register("rpc",null,f);
function W(){if(U===null&&document.body&&Q){var k=Q+"?cb="+Math.random()+"&origin="+c+"&jsl=1";
var m=document.createElement("div");
m.style.height="1px";
m.style.width="1px";
var l='<object height="1" width="1" id="'+Z+'" type="application/x-shockwave-flash"><param name="allowScriptAccess" value="always"></param><param name="movie" value="'+k+'"></param><embed type="application/x-shockwave-flash" allowScriptAccess="always" src="'+k+'" height="1" width="1"></embed></object>';
document.body.appendChild(m);
m.innerHTML=l;
U=m.firstChild
}++A;
if(i!==null&&(U!==null||A>=R)){window.clearTimeout(i)
}else{i=window.setTimeout(W,h)
}}function b(){if(Y[".."]){return 
}X("..");
M++;
if(M>=P&&E!==null){window.clearTimeout(E);
E=null
}else{E=window.setTimeout(b,I)
}}function e(){if(U!==null){while(a.length>0){var k=a.shift();
var l=k.targetId;
U.setup(k.token,O(l),d(l))
}}}function G(){e();
if(i!==null){window.clearTimeout(i)
}i=null
}j(G,"ready");
function B(){if(!Y[".."]&&E===null){E=window.setTimeout(b,I)
}}j(B,"setupDone");
function C(k,o,m){var q=gadgets.rpc.getTargetOrigin(k);
var n=gadgets.rpc.getAuthToken(k);
var p="sendMessage_"+O(k)+"_"+n+"_"+d(k);
var l=U[p];
l.call(U,gadgets.json.stringify(m),q);
return true
}function S(k,m,l){var n=gadgets.json.parse(k);
var o=n[V];
if(o){g(o,true);
Y[o]=true;
if(o!==".."){X(o,true)
}return 
}window.setTimeout(function(){K(n,m)
},0)
}j(S,"receiveMessage");
function X(l,k){var m=gadgets.rpc.RPC_ID;
var n={};
n[V]=k?"..":m;
n[F]=m;
C(l,m,n)
}return{getCode:function(){return"flash"
},isParentVerifiable:function(){return true
},init:function(k,l){K=k;
g=l;
J=true;
return true
},setup:function(k,l){a.push({token:l,targetId:k});
if(U===null&&i===null){i=window.setTimeout(W,h)
}e();
return true
},call:C,_receiveMessage:S,_ready:G,_setupDone:B}
}()
}gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.frameElement){gadgets.rpctx.frameElement=function(){var D="__g2c_rpc";
var A="__c2g_rpc";
var C;
var B;
function E(H,G,K){try{if(G!==".."){var F=window.frameElement;
if(typeof F[D]==="function"){if(typeof F[D][A]!=="function"){F[D][A]=function(L){C(gadgets.json.parse(L))
}
}F[D](gadgets.json.stringify(K));
return true
}}else{var J=document.getElementById(H);
if(typeof J[D]==="function"&&typeof J[D][A]==="function"){J[D][A](gadgets.json.stringify(K));
return true
}}}catch(I){}return false
}return{getCode:function(){return"fe"
},isParentVerifiable:function(){return false
},init:function(G,F){C=G;
B=F;
return true
},setup:function(F,G){if(F!==".."){try{var J=document.getElementById(F);
J[D]=function(K){C(gadgets.json.parse(K))
}
}catch(I){return false
}}if(F===".."){B("..",true);
var H=function(){window.setTimeout(function(){gadgets.rpc.call(F,gadgets.rpc.ACK)
},500)
};
gadgets.util.registerOnLoadHandler(H)
}return true
},call:function(G,F,H){return E(G,F,H)
}}
}()
}gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.nix){gadgets.rpctx.nix=function(){var I="GRPC____NIXVBS_wrapper";
var J="GRPC____NIXVBS_get_wrapper";
var B="GRPC____NIXVBS_handle_message";
var H="GRPC____NIXVBS_create_channel";
var G=10;
var F=500;
var E={};
var D;
var C=0;
function A(){var K=E[".."];
if(K){return 
}if(++C>G){gadgets.warn("Nix transport setup failed, falling back...");
D("..",false);
return 
}if(!K&&window.opener&&"GetAuthToken" in window.opener){K=window.opener;
if(K.GetAuthToken()==gadgets.rpc.getAuthToken("..")){var L=gadgets.rpc.getAuthToken("..");
K.CreateChannel(window[J]("..",L),L);
E[".."]=K;
window.opener=null;
D("..",true);
return 
}}window.setTimeout(function(){A()
},F)
}return{getCode:function(){return"nix"
},isParentVerifiable:function(){return false
},init:function(K,L){D=L;
if(typeof window[J]!=="unknown"){window[B]=function(O){window.setTimeout(function(){K(gadgets.json.parse(O))
},0)
};
window[H]=function(O,Q,P){if(gadgets.rpc.getAuthToken(O)===P){E[O]=Q;
D(O,true)
}};
var N="Class "+I+"\n Private m_Intended\nPrivate m_Auth\nPublic Sub SetIntendedName(name)\n If isEmpty(m_Intended) Then\nm_Intended = name\nEnd If\nEnd Sub\nPublic Sub SetAuth(auth)\n If isEmpty(m_Auth) Then\nm_Auth = auth\nEnd If\nEnd Sub\nPublic Sub SendMessage(data)\n "+B+"(data)\nEnd Sub\nPublic Function GetAuthToken()\n GetAuthToken = m_Auth\nEnd Function\nPublic Sub CreateChannel(channel, auth)\n Call "+H+"(m_Intended, channel, auth)\nEnd Sub\nEnd Class\nFunction "+J+"(name, auth)\nDim wrap\nSet wrap = New "+I+"\nwrap.SetIntendedName name\nwrap.SetAuth auth\nSet "+J+" = wrap\nEnd Function";
try{window.execScript(N,"vbscript")
}catch(M){return false
}}return true
},setup:function(N,O){if(N===".."){A();
return true
}try{var L=document.getElementById(N);
var M=window[J](N,O);
L.contentWindow.opener=M
}catch(K){return false
}return true
},call:function(N,M,L){try{if(E[N]){E[N].SendMessage(gadgets.json.stringify(L))
}}catch(K){return false
}return true
}}
}()
}gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.rmr){gadgets.rpctx.rmr=function(){var D=500;
var B=10;
var E={};
var J=gadgets.util.getUrlParameters()["parent"];
var L;
var F;
function H(R,P,Q,O){var N=function(){document.body.appendChild(R);
R.src="about:blank";
if(O){R.onload=function(){I(O)
}
}R.src=P+"#"+Q
};
if(document.body){N()
}else{gadgets.util.registerOnLoadHandler(function(){N()
})
}}function M(R){if(typeof E[R]==="object"){return 
}var N=document.createElement("iframe");
var P=N.style;
P.position="absolute";
P.top="0px";
P.border="0";
P.opacity="0";
P.width="10px";
P.height="1px";
N.id="rmrtransport-"+R;
N.name=N.id;
var Q=gadgets.rpc.getRelayUrl(R);
var O=gadgets.rpc.getOrigin(J);
if(!Q){Q=O+"/robots.txt"
}E[R]={frame:N,receiveWindow:null,relayUri:Q,relayOrigin:O,searchCounter:0,width:10,waiting:true,queue:[],sendId:0,recvId:0,verifySendToken:String(Math.random()),verifyRecvToken:null,originVerified:false};
if(R!==".."){H(N,Q,K(R))
}A(R)
}function A(Q){var N=null;
E[Q].searchCounter++;
try{var P=gadgets.rpc._getTargetWin(Q);
if(Q===".."){N=P.frames["rmrtransport-"+gadgets.rpc.RPC_ID]
}else{N=P.frames["rmrtransport-.."]
}}catch(R){}var O=false;
if(N){O=C(Q,N)
}if(!O){if(E[Q].searchCounter>B){return 
}window.setTimeout(function(){A(Q)
},D)
}}function G(P,R,N,U){var Q=null;
if(N!==".."){Q=E[".."]
}else{Q=E[P]
}if(Q){if(R!==gadgets.rpc.ACK){Q.queue.push(U)
}if(Q.waiting||(Q.queue.length===0&&!(R===gadgets.rpc.ACK&&U&&U.ackAlone===true))){return true
}if(Q.queue.length>0){Q.waiting=true
}var O=Q.relayUri+"#"+K(P);
try{Q.frame.contentWindow.location=O;
var S=Q.width==10?20:10;
Q.frame.style.width=S+"px";
Q.width=S
}catch(T){return false
}}return true
}function K(P){var Q=E[P];
var O={id:Q.sendId};
if(Q){O.d=Array.prototype.slice.call(Q.queue,0);
var N={s:gadgets.rpc.ACK,id:Q.recvId};
if(!Q.originVerified){N.sendToken=Q.verifySendToken
}if(Q.verifyRecvToken){N.recvToken=Q.verifyRecvToken
}O.d.push(N)
}return gadgets.json.stringify(O)
}function I(P){var Z=E[P];
var V=Z.receiveWindow.location.hash.substring(1);
var Q=gadgets.json.parse(decodeURIComponent(V))||{};
var S=Q.d||[];
var T=false;
var Y=false;
var N=0;
var R=(Z.recvId-Q.id);
for(var U=0;
U<S.length;
++U){var X=S[U];
if(X.s===gadgets.rpc.ACK){F(P,true);
Z.verifyRecvToken=X.sendToken;
if(!Z.originVerified&&X.recvToken&&String(X.recvToken)==String(Z.verifySendToken)){Z.originVerified=true
}if(Z.waiting){Y=true
}Z.waiting=false;
var W=Math.max(0,X.id-Z.sendId);
Z.queue.splice(0,W);
Z.sendId=Math.max(Z.sendId,X.id||0);
continue
}T=true;
if(++N<=R){continue
}++Z.recvId;
L(X,Z.originVerified?Z.relayOrigin:undefined)
}if(T||(Y&&Z.queue.length>0)){var O=(P==="..")?gadgets.rpc.RPC_ID:"..";
G(P,gadgets.rpc.ACK,O,{ackAlone:T})
}}function C(R,N){var Q=E[R];
try{var P=false;
P="document" in N;
if(!P){return false
}P=typeof N.document=="object";
if(!P){return false
}var T=N.location.href;
if(T==="about:blank"){return false
}}catch(O){return false
}Q.receiveWindow=N;
function S(){I(R)
}if(typeof N.attachEvent==="undefined"){N.onresize=S
}else{N.attachEvent("onresize",S)
}if(R===".."){H(Q.frame,Q.relayUri,K(R),R)
}else{I(R)
}return true
}return{getCode:function(){return"rmr"
},isParentVerifiable:function(){return true
},init:function(O,N){L=O;
F=N;
return true
},setup:function(N,O){try{M(N)
}catch(P){gadgets.warn("Caught exception setting up RMR: "+P);
return false
}return true
},call:function(O,N,P){return G(O,P.s,N,P)
}}
}()
}gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.ifpc){gadgets.rpctx.ifpc=function(){var C=[];
var H=0;
var G;
var D=2000;
var B={};
function F(L){var J=[];
for(var I=0,K=L.length;
I<K;
++I){J.push(encodeURIComponent(gadgets.json.stringify(L[I])))
}return J.join("&")
}function E(I){var L;
for(var K=C.length-1;
K>=0;
--K){var J=C[K];
try{if(J&&(J.recyclable||J.readyState==="complete")){J.parentNode.removeChild(J);
if(window.ActiveXObject){C[K]=J=null;
C.splice(K,1)
}else{J.recyclable=false;
L=J;
break
}}}catch(M){}}if(!L){L=document.createElement("iframe");
L.style.border=L.style.width=L.style.height="0px";
L.style.visibility="hidden";
L.style.position="absolute";
L.onload=function(){this.recyclable=true
};
C.push(L)
}L.src=I;
window.setTimeout(function(){document.body.appendChild(L)
},0)
}function A(J,I){for(var K=I-1;
K>=0;
--K){if(typeof J[K]==="undefined"){return false
}}return true
}return{getCode:function(){return"ifpc"
},isParentVerifiable:function(){return true
},init:function(J,I){G=I;
G("..",true);
return true
},setup:function(I,J){G(I,true);
return true
},call:function(K,J,I){var P=gadgets.rpc.getRelayUrl(K);
++H;
if(!P){gadgets.warn("No relay file assigned for IFPC");
return false
}var L=null,N=[];
if(I.l){var S=I.a;
L=[P,"#",F([J,H,1,0,F([J,I.s,"","",J].concat(S))])].join("");
N.push(L)
}else{L=[P,"#",K,"&",J,"@",H,"&"].join("");
var M=encodeURIComponent(gadgets.json.stringify(I)),R=D-L.length,T=Math.ceil(M.length/R),Q=0,O;
while(M.length>0){O=M.substring(0,R);
M=M.substring(R);
N.push([L,T,"&",Q,"&",O].join(""));
Q+=1
}}do{E(N.shift())
}while(N.length>0);
return true
},_receiveMessage:function(M,K){var L=M[1],J=parseInt(M[2],10),O=parseInt(M[3],10),I=M[M.length-1],N=J===1;
if(J>1){if(!B[L]){B[L]=[]
}B[L][O]=I;
if(A(B[L],J)){I=B[L].join("");
delete B[L];
N=true
}}if(N){K(gadgets.json.parse(decodeURIComponent(I)))
}}}
}()
}if(!window.gadgets.rpc){gadgets.rpc=function(){var S="__cb";
var Z="";
var a="__ack";
var m=500;
var M=10;
var i="|";
var AA="callback";
var n="origin";
var y="referer";
var x={};
var d={};
var J={};
var H={};
var F=0;
var s={};
var t={};
var X={};
var k={};
var u={};
var K={};
var l=null;
var w=null;
var G=(window.top!==window.self);
var AB=window.name;
var P=function(){};
var W=0;
var f=1;
var h=2;
var C=window.console;
var c=C&&C.log&&function(AD){C.log(AD)
}||function(){};
var Y=(function(){function AD(AE){return function(){c(AE+": call ignored")
}
}return{getCode:function(){return"noop"
},isParentVerifiable:function(){return true
},init:AD("init"),setup:AD("setup"),call:AD("call")}
})();
if(gadgets.util){k=gadgets.util.getUrlParameters()
}function Q(){if(k.rpctx=="flash"){return gadgets.rpctx.flash
}if(k.rpctx=="rmr"){return gadgets.rpctx.rmr
}return typeof window.postMessage==="function"?gadgets.rpctx.wpm:typeof window.postMessage==="object"?gadgets.rpctx.wpm:window.ActiveXObject?(gadgets.rpctx.flash?gadgets.rpctx.flash:gadgets.rpctx.nix):navigator.userAgent.indexOf("WebKit")>0?gadgets.rpctx.rmr:navigator.product==="Gecko"?gadgets.rpctx.frameElement:gadgets.rpctx.ifpc
}function r(AD,AH){if(u[AD]){return 
}var AF=N;
if(!AH){AF=Y
}u[AD]=AF;
var AE=K[AD]||[];
for(var AG=0;
AG<AE.length;
++AG){var AI=AE[AG];
AI.t=L(AD);
AF.call(AD,AI.f,AI)
}K[AD]=[]
}var O=false,b=false;
function U(){if(b){return 
}function AD(){O=true
}if(typeof window.addEventListener!="undefined"){window.addEventListener("unload",AD,false)
}else{if(typeof window.attachEvent!="undefined"){window.attachEvent("onunload",AD)
}}b=true
}function q(AE,AD,AF,AH,AG){if(!H[AD]||H[AD]!==AF){gadgets.error("Invalid auth token. "+H[AD]+" vs "+AF);
P(AD,h)
}AG.onunload=function(){if(t[AD]&&!O){P(AD,f);
gadgets.rpc.removeReceiver(AD)
}};
U();
AH=gadgets.json.parse(decodeURIComponent(AH))
}function g(AD,AF){if(AD&&typeof AD.s==="string"&&typeof AD.f==="string"&&AD.a instanceof Array){if(H[AD.f]){if(H[AD.f]!==AD.t){gadgets.error("Invalid auth token. "+H[AD.f]+" vs "+AD.t);
P(AD.f,h)
}}if(AD.s===a){window.setTimeout(function(){r(AD.f,true)
},0);
return 
}if(AD.c){AD[AA]=function(AI){gadgets.rpc.call(AD.f,S,null,AD.c,AI)
}
}if(AF){var AG=z(AF);
AD[n]=AF;
var AH=AD.r;
if(!AH||z(AH)!=AG){AH=AF
}AD[y]=AH
}var AE=(x[AD.s]||x[Z]).apply(AD,AD.a);
if(AD.c&&typeof AE!=="undefined"){gadgets.rpc.call(AD.f,S,null,AD.c,AE)
}}}function z(AG){if(!AG){return""
}AG=AG.toLowerCase();
if(AG.indexOf("//")==0){AG=window.location.protocol+AG
}if(AG.indexOf("://")==-1){AG=window.location.protocol+"//"+AG
}var AH=AG.substring(AG.indexOf("://")+3);
var AE=AH.indexOf("/");
if(AE!=-1){AH=AH.substring(0,AE)
}var AJ=AG.substring(0,AG.indexOf("://"));
var AI="";
var AD=AH.indexOf(":");
if(AD!=-1){var AF=AH.substring(AD+1);
AH=AH.substring(0,AD);
if((AJ==="http"&&AF!=="80")||(AJ==="https"&&AF!=="443")){AI=":"+AF
}}return AJ+"://"+AH+AI
}function I(AD,AE){return"/"+AD+(AE?i+AE:"")
}function E(AD){if(AD.charAt(0)=="/"){var AF=AD.indexOf(i);
var AG=AF>0?AD.substring(1,AF):AD.substring(1);
var AE=AF>0?AD.substring(AF+1):null;
return{id:AG,origin:AE}
}else{return null
}}function D(AD){if(typeof AD==="undefined"||AD===".."){return window.parent
}var AF=E(AD);
if(AF){return window.top.frames[AF.id]
}AD=String(AD);
var AE=window.frames[AD];
if(AE){return AE
}AE=document.getElementById(AD);
if(AE&&AE.contentWindow){return AE.contentWindow
}return null
}function R(AD){var AG=null;
var AE=V(AD);
if(AE){AG=AE
}else{var AF=E(AD);
if(AF){AG=AF.origin
}else{if(AD==".."){AG=k.parent
}else{AG=document.getElementById(AD).src
}}}return z(AG)
}var N=Q();
x[Z]=function(){c("Unknown RPC service: "+this.s)
};
x[S]=function(AF,AE){var AD=s[AF];
if(AD){delete s[AF];
AD.call(this,AE)
}};
function e(AD,AE){if(t[AD]===true){return 
}if(typeof t[AD]==="undefined"){t[AD]=0
}var AF=D(AD);
if(AD===".."||AF!=null){if(N.setup(AD,AE)===true){t[AD]=true;
return 
}}if(t[AD]!==true&&t[AD]++<M){window.setTimeout(function(){e(AD,AE)
},m)
}else{u[AD]=Y;
t[AD]=true
}}function T(AF,AI){if(typeof X[AF]==="undefined"){X[AF]=false;
var AH=V(AF);
if(z(AH)!==z(window.location.href)){return false
}var AG=D(AF);
try{var AD=AG.gadgets;
X[AF]=AD.rpc.receiveSameDomain
}catch(AE){}}if(typeof X[AF]==="function"){X[AF](AI);
return true
}return false
}function V(AD){var AE=d[AD];
if(AE&&AE.substring(0,1)==="/"){if(AE.substring(1,2)==="/"){AE=document.location.protocol+AE
}else{AE=document.location.protocol+"//"+document.location.host+AE
}}return AE
}function A(AF,AE,AD){if(!/http(s)?:\/\/.+/.test(AE)){if(AE.indexOf("//")==0){AE=window.location.protocol+AE
}else{if(AE.charAt(0)=="/"){AE=window.location.protocol+"//"+window.location.host+AE
}else{if(AE.indexOf("://")==-1){AE=window.location.protocol+"//"+AE
}}}}d[AF]=AE;
J[AF]=!!AD
}function L(AD){return H[AD]
}function j(AE,AD){AD=AD||"";
H[AE]=String(AD);
e(AE,AD)
}function AC(AF){var AE=AF.passReferrer||"";
var AD=AE.split(":",2);
l=AD[0]||"none";
w=AD[1]||"origin"
}function o(AF,AE){function AD(AI){var AH=AI?AI.rpc:{};
var AJ=String(AH.useLegacyProtocol)==="true";
AC(AH);
var AG=AH.parentRelayUrl||"";
AG=z(k.parent||AE)+AG;
A("..",AG,AJ);
if(AJ){N=gadgets.rpctx.ifpc;
N.init(g,r)
}j("..",AF)
}if(!k.parent&&AE){AD({});
return 
}gadgets.config.register("rpc",null,AD)
}function v(AG,AK,AE){if(AG.charAt(0)!="/"){if(!gadgets.util){return 
}var AJ=document.getElementById(AG);
if(!AJ){throw new Error("Cannot set up gadgets.rpc receiver with ID: "+AG+", element not found.")
}}var AF=AJ&&AJ.src;
var AH=AK||gadgets.rpc.getOrigin(AF);
A(AG,AH);
var AD=gadgets.util.getUrlParameters(AF);
var AI=AE||AD.rpctoken;
j(AG,AI)
}function p(AE,AG,AD){if(AE===".."){var AF=AD||k.rpctoken||k.ifpctok||"";
o(AF,AG)
}else{v(AE,AG,AD)
}}function B(AG){if(l==="bidir"||(l==="c2p"&&AG==="..")||(l==="p2c"&&AG!=="..")){var AF=window.location.href;
var AD="?";
if(w==="query"){AD="#"
}else{if(w==="hash"){return AF
}}var AE=AF.lastIndexOf(AD);
AE=AE===-1?AF.length:AE;
return AF.substring(0,AE)
}return null
}return{config:function(AD){if(typeof AD.securityCallback==="function"){P=AD.securityCallback
}},register:function(AD,AE){if(AD===S||AD===a){throw new Error("Cannot overwrite callback/ack service")
}if(AD===Z){throw new Error("Cannot overwrite default service: use registerDefault")
}x[AD]=AE
},unregister:function(AD){if(AD===S||AD===a){throw new Error("Cannot delete callback/ack service")
}if(AD===Z){throw new Error("Cannot delete default service: use unregisterDefault")
}delete x[AD]
},registerDefault:function(AD){x[Z]=AD
},unregisterDefault:function(){delete x[Z]
},forceParentVerifiable:function(){if(!N.isParentVerifiable()){N=gadgets.rpctx.ifpc
}},call:function(AF,AH,AE,AK){AF=AF||"..";
var AD="..";
if(AF===".."){AD=AB
}else{if(AF.charAt(0)=="/"){AD=I(AB,gadgets.rpc.getOrigin(window.location.href))
}}++F;
if(AE){s[F]=AE
}var AJ={s:AH,f:AD,c:AE?F:0,a:Array.prototype.slice.call(arguments,3),t:H[AF],l:J[AF]};
var AG=B(AF);
if(AG){AJ.r=AG
}if(AF!==".."&&E(AF)==null&&!document.getElementById(AF)){return 
}if(T(AF,AJ)){return 
}var AI=u[AF];
if(!AI&&E(AF)!==null){AI=N
}if(!AI){if(!K[AF]){K[AF]=[AJ]
}else{K[AF].push(AJ)
}return 
}if(J[AF]){AI=gadgets.rpctx.ifpc
}if(AI.call(AF,AD,AJ)===false){u[AF]=Y;
N.call(AF,AD,AJ)
}},getRelayUrl:V,setRelayUrl:A,setAuthToken:j,setupReceiver:p,getAuthToken:L,removeReceiver:function(AD){delete d[AD];
delete J[AD];
delete H[AD];
delete t[AD];
delete X[AD];
delete u[AD]
},getRelayChannel:function(){return N.getCode()
},receive:function(AD,AE){if(AD.length>4){N._receiveMessage(AD,g)
}else{q.apply(null,AD.concat(AE))
}},receiveSameDomain:function(AD){AD.a=Array.prototype.slice.call(AD.a);
window.setTimeout(function(){g(AD)
},0)
},getOrigin:z,getTargetOrigin:R,init:function(){if(N.init(g,r)===false){N=Y
}if(G){p("..")
}else{gadgets.config.register("rpc",null,function(AD){AC(AD.rpc||{})
})
}},_getTargetWin:D,_parseSiblingId:E,ACK:a,RPC_ID:AB||"..",SEC_ERROR_LOAD_TIMEOUT:W,SEC_ERROR_FRAME_PHISH:f,SEC_ERROR_FORGED_MSG:h}
}();
gadgets.rpc.init()
}gadgets.io=function(){var config={};
var oauthState;
function makeXhr(){var x;
if(typeof shindig!="undefined"&&shindig.xhrwrapper&&shindig.xhrwrapper.createXHR){return shindig.xhrwrapper.createXHR()
}else{if(typeof ActiveXObject!="undefined"){x=new ActiveXObject("Msxml2.XMLHTTP");
if(!x){x=new ActiveXObject("Microsoft.XMLHTTP")
}return x
}else{if(typeof XMLHttpRequest!="undefined"||window.XMLHttpRequest){return new window.XMLHttpRequest()
}else{throw ("no xhr available")
}}}}function hadError(xobj,callback){if(xobj.readyState!==4){return true
}try{if(xobj.status!==200){var error=(""+xobj.status);
if(xobj.responseText){error=error+" "+xobj.responseText
}callback({errors:[error],rc:xobj.status,text:xobj.responseText});
return true
}}catch(e){callback({errors:[e.number+" Error not specified"],rc:e.number,text:e.description});
return true
}return false
}function processNonProxiedResponse(url,callback,params,xobj){if(hadError(xobj,callback)){return 
}var data={body:xobj.responseText};
callback(transformResponseData(params,data))
}var UNPARSEABLE_CRUFT="throw 1; < don't be evil' >";
function processResponse(url,callback,params,xobj){if(hadError(xobj,callback)){return 
}var txt=xobj.responseText;
var offset=txt.indexOf(UNPARSEABLE_CRUFT)+UNPARSEABLE_CRUFT.length;
if(offset<UNPARSEABLE_CRUFT.length){return 
}txt=txt.substr(offset);
var data=eval("("+txt+")");
data=data[url];
if(data.oauthState){oauthState=data.oauthState
}if(data.st){shindig.auth.updateSecurityToken(data.st)
}callback(transformResponseData(params,data))
}function transformResponseData(params,data){var resp={text:data.body,rc:data.rc||200,headers:data.headers,oauthApprovalUrl:data.oauthApprovalUrl,oauthError:data.oauthError,oauthErrorText:data.oauthErrorText,errors:[]};
if(resp.rc<200||resp.rc>=400){resp.errors=[resp.rc+" Error"]
}else{if(resp.text){if(resp.rc>=300&&resp.rc<400){params.CONTENT_TYPE="TEXT"
}switch(params.CONTENT_TYPE){case"JSON":case"FEED":resp.data=gadgets.json.parse(resp.text);
if(!resp.data){resp.errors.push("500 Failed to parse JSON");
resp.rc=500;
resp.data=null
}break;
case"DOM":var dom;
if(typeof ActiveXObject!="undefined"){dom=new ActiveXObject("Microsoft.XMLDOM");
dom.async=false;
dom.validateOnParse=false;
dom.resolveExternals=false;
if(!dom.loadXML(resp.text)){resp.errors.push("500 Failed to parse XML");
resp.rc=500
}else{resp.data=dom
}}else{var parser=new DOMParser();
dom=parser.parseFromString(resp.text,"text/xml");
if("parsererror"===dom.documentElement.nodeName){resp.errors.push("500 Failed to parse XML");
resp.rc=500
}else{resp.data=dom
}}break;
default:resp.data=resp.text;
break
}}}return resp
}function makeXhrRequest(realUrl,proxyUrl,callback,paramData,method,params,processResponseFunction,opt_contentType){var xhr=makeXhr();
if(proxyUrl.indexOf("//")==0){proxyUrl=document.location.protocol+proxyUrl
}xhr.open(method,proxyUrl,true);
if(callback){xhr.onreadystatechange=gadgets.util.makeClosure(null,processResponseFunction,realUrl,callback,params,xhr)
}if(paramData!==null){xhr.setRequestHeader("Content-Type",opt_contentType||"application/x-www-form-urlencoded");
xhr.send(paramData)
}else{xhr.send(null)
}}function respondWithPreload(postData,params,callback){if(gadgets.io.preloaded_&&postData.httpMethod==="GET"){for(var i=0;
i<gadgets.io.preloaded_.length;
i++){var preload=gadgets.io.preloaded_[i];
if(preload&&(preload.id===postData.url)){delete gadgets.io.preloaded_[i];
if(preload.rc!==200){callback({rc:preload.rc,errors:[preload.rc+" Error"]})
}else{if(preload.oauthState){oauthState=preload.oauthState
}var resp={body:preload.body,rc:preload.rc,headers:preload.headers,oauthApprovalUrl:preload.oauthApprovalUrl,oauthError:preload.oauthError,oauthErrorText:preload.oauthErrorText,errors:[]};
callback(transformResponseData(params,resp))
}return true
}}}return false
}function init(configuration){config=configuration["core.io"]||{}
}var requiredConfig={proxyUrl:new gadgets.config.RegExValidator(/.*%(raw)?url%.*/),jsonProxyUrl:gadgets.config.NonEmptyStringValidator};
gadgets.config.register("core.io",requiredConfig,init);
return{makeRequest:function(url,callback,opt_params){var params=opt_params||{};
var httpMethod=params.METHOD||"GET";
var refreshInterval=params.REFRESH_INTERVAL;
var auth,st;
if(params.AUTHORIZATION&&params.AUTHORIZATION!=="NONE"){auth=params.AUTHORIZATION.toLowerCase();
st=shindig.auth.getSecurityToken()
}else{if(httpMethod==="GET"&&refreshInterval===undefined){refreshInterval=3600
}}var signOwner=true;
if(typeof params.OWNER_SIGNED!=="undefined"){signOwner=params.OWNER_SIGNED
}var signViewer=true;
if(typeof params.VIEWER_SIGNED!=="undefined"){signViewer=params.VIEWER_SIGNED
}var headers=params.HEADERS||{};
if(httpMethod==="POST"&&!headers["Content-Type"]){headers["Content-Type"]="application/x-www-form-urlencoded"
}var urlParams=gadgets.util.getUrlParameters();
var paramData={url:url,httpMethod:httpMethod,headers:gadgets.io.encodeValues(headers,false),postData:params.POST_DATA||"",authz:auth||"",st:st||"",contentType:params.CONTENT_TYPE||"TEXT",numEntries:params.NUM_ENTRIES||"3",getSummaries:!!params.GET_SUMMARIES,signOwner:signOwner,signViewer:signViewer,gadget:urlParams.url,container:urlParams.container||urlParams.synd||"default",bypassSpecCache:gadgets.util.getUrlParameters().nocache||"",getFullHeaders:!!params.GET_FULL_HEADERS};
if(auth==="oauth"||auth==="signed"){if(gadgets.io.oauthReceivedCallbackUrl_){paramData.OAUTH_RECEIVED_CALLBACK=gadgets.io.oauthReceivedCallbackUrl_;
gadgets.io.oauthReceivedCallbackUrl_=null
}paramData.oauthState=oauthState||"";
for(var opt in params){if(params.hasOwnProperty(opt)){if(opt.indexOf("OAUTH_")===0){paramData[opt]=params[opt]
}}}}var proxyUrl=config.jsonProxyUrl.replace("%host%",document.location.host);
if(!respondWithPreload(paramData,params,callback,processResponse)){if(httpMethod==="GET"&&refreshInterval>0){var extraparams="?refresh="+refreshInterval+"&"+gadgets.io.encodeValues(paramData);
makeXhrRequest(url,proxyUrl+extraparams,callback,null,"GET",params,processResponse)
}else{makeXhrRequest(url,proxyUrl,callback,gadgets.io.encodeValues(paramData),"POST",params,processResponse)
}}},makeNonProxiedRequest:function(relativeUrl,callback,opt_params,opt_contentType){var params=opt_params||{};
makeXhrRequest(relativeUrl,relativeUrl,callback,params.POST_DATA,params.METHOD,params,processNonProxiedResponse,opt_contentType)
},clearOAuthState:function(){oauthState=undefined
},encodeValues:function(fields,opt_noEscaping){var escape=!opt_noEscaping;
var buf=[];
var first=false;
for(var i in fields){if(fields.hasOwnProperty(i)&&!/___$/.test(i)){if(!first){first=true
}else{buf.push("&")
}buf.push(escape?encodeURIComponent(i):i);
buf.push("=");
buf.push(escape?encodeURIComponent(fields[i]):fields[i])
}}return buf.join("")
},getProxyUrl:function(url,opt_params){return url
}}
}();
gadgets.io.RequestParameters=gadgets.util.makeEnum(["METHOD","CONTENT_TYPE","POST_DATA","HEADERS","AUTHORIZATION","NUM_ENTRIES","GET_SUMMARIES","GET_FULL_HEADERS","REFRESH_INTERVAL","OAUTH_SERVICE_NAME","OAUTH_USE_TOKEN","OAUTH_TOKEN_NAME","OAUTH_REQUEST_TOKEN","OAUTH_REQUEST_TOKEN_SECRET","OAUTH_RECEIVED_CALLBACK"]);
gadgets.io.MethodType=gadgets.util.makeEnum(["GET","POST","PUT","DELETE","HEAD"]);
gadgets.io.ContentType=gadgets.util.makeEnum(["TEXT","DOM","JSON","FEED"]);
gadgets.io.AuthorizationType=gadgets.util.makeEnum(["NONE","SIGNED","OAUTH"]);
var tamings___=tamings___||[];
tamings___.push(function(A){caja___.whitelistFuncs([[gadgets.io,"encodeValues"],[gadgets.io,"getProxyUrl"],[gadgets.io,"makeRequest"]])
});
gadgets.log=(function(){var H=1;
var D=2;
var A=3;
var F=4;
var G=function(I){E(H,I)
};
gadgets.warn=function(I){E(D,I)
};
gadgets.error=function(I){E(A,I)
};
gadgets.setLogLevel=function(I){C=I
};
function E(I,J){if(I<C||!B){return 
}if(I===D&&B.warn){B.warn(J)
}else{if(I===A&&B.error){B.error(J)
}else{if(B.log){B.log(J)
}}}}G.INFO=H;
G.WARNING=D;
G.NONE=F;
var C=H;
var B=window.console?window.console:window.opera?window.opera.postError:undefined;
return G
})();
var tamings___=tamings___||[];
tamings___.push(function(A){___.grantRead(gadgets.log,"INFO");
___.grantRead(gadgets.log,"WARNING");
___.grantRead(gadgets.log,"ERROR");
___.grantRead(gadgets.log,"NONE");
caja___.whitelistFuncs([[gadgets,"log"],[gadgets,"warn"],[gadgets,"error"],[gadgets,"setLogLevel"]])
});
shindig.uri=(function(){var A=new RegExp("^(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*)(?:\\?([^#]*))?(?:#(.*))?");
return function(Z){var S="";
var O="";
var C="";
var H="";
var D=null;
var I="";
var K=null;
var M=window.decodeURIComponent?decodeURIComponent:unescape;
var Y=window.encodeURIComponent?encodeURIComponent:escape;
var L=null;
function V(a){if(a.match(A)===null){throw"Malformed URL: "+a
}S=RegExp.$1;
O=RegExp.$2;
C=RegExp.$3;
H=RegExp.$4;
I=RegExp.$5
}function U(d){var c=[];
for(var a=0,e=d.length;
a<e;
++a){var f=d[a][0];
var b=d[a][1];
if(b===undefined){continue
}c.push(Y(f)+(b!==null?"="+Y(b):""))
}return c.join("&")
}function R(){if(D){H=U(D);
D=null
}return H
}function J(){if(K){I=U(K);
K=null
}return I
}function P(a){D=D||F(H);
return T(D,a)
}function X(a){K=K||F(I);
return T(K,a)
}function B(b,a){D=N(D||F(H),b,a);
return L
}function G(b,a){K=N(K||F(I),b,a);
return L
}function W(){return[S,S!==""?":":"",O!==""?"//":"",O].join("")
}function Q(){var b=R();
var a=J();
return[W(),C,b!==""?"?":"",b,a!==""?"#":"",a].join("")
}function F(f){var e=[];
var d=f.split("&");
for(var a=0,g=d.length;
a<g;
++a){var c=d[a].split("=");
var h=c.shift();
var b=null;
if(c.length>0){b=c.join("").replace(/\+/g," ")
}e.push([h,b!=null?M(b):null])
}return e
}function T(c,b){for(var a=0,d=c.length;
a<d;
++a){if(c[a][0]==b){return c[a][1]
}}return undefined
}function N(c,d,b){var f=d;
if(typeof d==="string"){f={};
f[d]=b
}for(var a in f){var e=false;
for(var h=0,g=c.length;
!e&&h<g;
++h){if(c[h][0]==a){c[h][1]=f[a];
e=true
}}if(!e){c.push([a,f[a]])
}}return c
}function E(b,a){b=b||"";
if(b[0]===a){b=b.substr(a.length)
}return b
}if(typeof Z==="object"&&typeof Z.toString==="function"){V(Z.toString())
}else{if(Z){V(Z)
}}L={getSchema:function(){return S
},getAuthority:function(){return O
},getOrigin:W,getPath:function(){return C
},getQuery:R,getFragment:J,getQP:P,getFP:X,setSchema:function(a){S=a;
return L
},setAuthority:function(a){O=a;
return L
},setPath:function(a){C=(a[0]==="/"?"":"/")+a;
return L
},setQuery:function(a){D=null;
H=E(a,"?");
return L
},setFragment:function(a){K=null;
I=E(a,"#");
return L
},setQP:B,setFP:G,setExistingP:function(a,b){if(P(a,b)!==undefined){B(a,b)
}if(X(a,b)!==undefined){G(a,b)
}return L
},toString:Q};
return L
}
})();
(function(){osapi._registerMethod=function(D,C){var E=typeof ___!=="undefined";
if(D=="newBatch"){return 
}var A=D.split(".");
var G=osapi;
for(var F=0;
F<A.length-1;
F++){G[A[F]]=G[A[F]]||{};
G=G[A[F]]
}var B=function(H){var J=osapi.newBatch();
var I={};
I.execute=function(K){var L=E?___.untame(K):K;
var M=E?___.USELESS:this;
J.add(D,this);
J.execute(function(N){if(N.error){L.call(M,N.error)
}else{L.call(M,N[D])
}})
};
if(E){___.markInnocent(I.execute,"execute")
}H=H||{};
H.userId=H.userId||"@viewer";
H.groupId=H.groupId||"@self";
I.method=D;
I.transport=C;
I.rpc=H;
return I
};
if(E&&typeof ___.markInnocent!=="undefined"){___.markInnocent(B,D)
}if(G[A[A.length-1]]){}else{G[A[A.length-1]]=B
}}
})();
(function(){var A=function(){var D={};
var C=[];
var B=function(G,H){if(H&&G){C.push({key:G,request:H})
}return D
};
var F=function(H){var G={method:H.request.method,id:H.key};
if(H.request.rpc){G.params=H.request.rpc
}return G
};
var E=function(I){var J={};
var H={};
var L=0;
var M=[];
for(var O=0;
O<C.length;
O++){var K=C[O].request.transport;
if(!H[K.name]){M.push(K);
L++
}H[K.name]=H[K.name]||[];
H[K.name].push(F(C[O]))
}var G=function(Q){if(Q.error){J.error=Q.error
}for(var P=0;
P<C.length;
P++){var S=C[P].key;
var R=Q[S];
if(R){if(R.error){J[S]=R
}else{J[S]=R.data||R.result
}}}L--;
if(L===0){I(J)
}};
for(var N=0;
N<M.length;
N++){M[N].execute(H[M[N].name],G)
}if(L==0){window.setTimeout(function(){I(J)
},0)
}};
D.execute=E;
D.add=B;
return D
};
osapi.newBatch=A
})();
(function(){function B(D,H){function G(J){if(J.errors[0]){H({error:{code:J.rc,message:J.text}})
}else{var K=J.result||J.data;
if(K.error){H(K)
}else{var I={};
for(var L=0;
L<K.length;
L++){I[K[L].id]=K[L]
}H(I)
}}}var F={POST_DATA:gadgets.json.stringify(D),CONTENT_TYPE:"JSON",METHOD:"POST",AUTHORIZATION:"SIGNED"};
var C=this.name;
var E=shindig.auth.getSecurityToken();
if(E){C+="?st=";
C+=encodeURIComponent(E)
}gadgets.io.makeNonProxiedRequest(C,G,F,"application/json")
}function A(E){var I=E["osapi.services"];
if(I){for(var D in I){if(I.hasOwnProperty(D)){if(D.indexOf("http")==0||D.indexOf("//")==0){var G=D.replace("%host%",document.location.host);
var C={name:G,execute:B};
var H=I[D];
for(var F=0;
F<H.length;
F++){osapi._registerMethod(H[F],C)
}}}}}}if(gadgets.config){gadgets.config.register("osapi.services",null,A)
}})();
if(gadgets&&gadgets.rpc){(function(){function B(C,E){var D=function(G){if(!G){E({code:500,message:"Container refused the request"})
}else{if(G.error){E(G)
}else{var F={};
for(var H=0;
H<G.length;
H++){F[G[H].id]=G[H]
}E(F)
}}};
gadgets.rpc.call("..","osapi._handleGadgetRpcMethod",D,C)
}function A(C){var F={name:"gadgets.rpc",execute:B};
var K=C["osapi.services"];
if(K){for(var D in K){if(K.hasOwnProperty(D)){if(D==="gadgets.rpc"){var E=K[D];
for(var H=0;
H<E.length;
H++){osapi._registerMethod(E[H],F)
}}}}}if(osapi.container&&osapi.container.listMethods){var G=gadgets.util.runOnLoadHandlers;
var I=2;
var J=function(){I--;
if(I==0){G()
}};
gadgets.util.runOnLoadHandlers=J;
osapi.container.listMethods({}).execute(function(M){if(!M.error){for(var L=0;
L<M.length;
L++){if(M[L]!="container.listMethods"){osapi._registerMethod(M[L],F)
}}}J()
});
window.setTimeout(J,500)
}}if(gadgets.config&&gadgets.config.isGadget){gadgets.config.register("osapi.services",null,A)
}})()
}gadgets.util.registerOnLoadHandler(function(){if(osapi&&osapi.people&&osapi.people.get){osapi.people.getViewer=function(A){A=A||{};
A.userId="@viewer";
A.groupId="@self";
return osapi.people.get(A)
};
osapi.people.getViewerFriends=function(A){A=A||{};
A.userId="@viewer";
A.groupId="@friends";
return osapi.people.get(A)
};
osapi.people.getOwner=function(A){A=A||{};
A.userId="@owner";
A.groupId="@self";
return osapi.people.get(A)
};
osapi.people.getOwnerFriends=function(A){A=A||{};
A.userId="@owner";
A.groupId="@friends";
return osapi.people.get(A)
}
}});
var tamings___=tamings___||[];
tamings___.push(function(B){___.tamesTo(osapi.newBatch,___.markFuncFreeze(function(){var C=osapi.newBatch();
___.markInnocent(C.add,"add");
___.markInnocent(C.execute,"execute");
return ___.tame(C)
}));
B.outers.osapi=___.tame(osapi);
___.grantRead(B.outers,"osapi");
var A=B;
gadgets.util.registerOnLoadHandler(function(){if(osapi&&osapi.people&&osapi.people.get){caja___.whitelistFuncs([[osapi.people,"getViewer"],[osapi.people,"getViewerFriends"],[osapi.people,"getOwner"],[osapi.people,"getOwnerFriends"]]);
A.outers.osapi.people.getViewer=___.tame(osapi.people.getViewer);
A.outers.osapi.people.getViewerFriends=___.tame(osapi.people.getViewerFriends);
A.outers.osapi.people.getOwner=___.tame(osapi.people.getOwner);
A.outers.osapi.people.getOwnerFriends=___.tame(osapi.people.getOwnerFriends)
}})
});
shindig._uri=shindig.uri;
shindig.uri=(function(){var B=shindig._uri;
shindig._uri=null;
function C(D,E){return D.getOrigin()==E.getOrigin()
}function A(F,H){if(F.getSchema()==""){F.setSchema(H.getSchema())
}if(F.getAuthority()==""){F.setAuthority(H.getAuthority())
}var G=F.getPath();
if(G==""||G.charAt(0)!="/"){var D=H.getPath();
var E=D.lastIndexOf("/");
if(E!=-1){D=D.substring(0,E+1)
}F.setPath(H.getPath()+G)
}}return function(E){var D=B(E);
D.hasSameOrigin=function(F){return C(D,F)
};
D.resolve=function(F){return A(D,F)
};
return D
}
})();
Function.prototype.inherits=function(B){function A(){}A.prototype=B.prototype;
this.superClass_=B.prototype;
this.prototype=new A();
this.prototype.constructor=this
};
shindig.cookies={};
shindig.cookies.JsType_={UNDEFINED:"undefined"};
shindig.cookies.isDef=function(A){return typeof A!=shindig.cookies.JsType_.UNDEFINED
};
shindig.cookies.set=function(I,E,D,H,J){if(/;=/g.test(I)){throw new Error('Invalid cookie name "'+I+'"')
}if(/;/g.test(E)){throw new Error('Invalid cookie value "'+E+'"')
}if(!shindig.cookies.isDef(D)){D=-1
}var B=J?";domain="+J:"";
var F=H?";path="+H:"";
var A;
if(D<0){A=""
}else{if(D===0){var C=new Date(1970,1,1);
A=";expires="+C.toUTCString()
}else{var G=new Date((new Date).getTime()+D*1000);
A=";expires="+G.toUTCString()
}}document.cookie=I+"="+E+B+F+A
};
shindig.cookies.get=function(E,B){var A=E+"=";
var G=String(document.cookie);
for(var C=-1;
(C=G.indexOf(A,C+1))>=0;
){var F=C;
while(--F>=0){var H=G.charAt(F);
if(H==";"){F=-1;
break
}}if(F==-1){var D=G.indexOf(";",C);
if(D<0){D=G.length
}return G.substring(C+A.length,D)
}}return B
};
shindig.cookies.remove=function(A,D,B){var C=shindig.cookies.containsKey(A);
shindig.cookies.set(A,"",0,D,B);
return C
};
shindig.cookies.getKeyValues_=function(){var B=String(document.cookie);
var D=B.split(/\s*;\s*/);
var C=[],E=[],G,F;
for(var A=0;
F=D[A];
A++){G=F.indexOf("=");
if(G==-1){C.push("");
E.push(F)
}else{C.push(F.substring(0,G));
E.push(F.substring(G+1))
}}return{keys:C,values:E}
};
shindig.cookies.getKeys=function(){return shindig.cookies.getKeyValues_().keys
};
shindig.cookies.getValues=function(){return shindig.cookies.getKeyValues_().values
};
shindig.cookies.isEmpty=function(){return document.cookie===""
};
shindig.cookies.getCount=function(){var B=String(document.cookie);
if(B===""){return 0
}var A=B.split(/\s*;\s*/);
return A.length
};
shindig.cookies.containsKey=function(A){var B={};
return shindig.cookies.get(A,B)!==B
};
shindig.cookies.containsValue=function(B){var C=shindig.cookies.getKeyValues_().values;
for(var A=0;
A<C.length;
A++){if(C[A]==B){return true
}}return false
};
shindig.cookies.clear=function(){var A=shindig.cookies.getKeyValues_().keys;
for(var B=A.length-1;
B>=0;
B--){shindig.cookies.remove(A[B])
}};
shindig.cookies.MAX_COOKIE_LENGTH=3950;
shindig.errors={};
shindig.errors.SUBCLASS_RESPONSIBILITY="subclass responsibility";
shindig.errors.TO_BE_DONE="to be done";
shindig.callAsyncAndJoin=function(B,E,A){var C=B.length;
var G=[];
for(var F=0;
F<B.length;
F++){var D=function(I){var H=B[I];
if(typeof H==="string"){H=A[H]
}H.call(A,function(J){G[I]=J;
if(--C===0){E(G)
}})
};
D(F)
}};
shindig.Extensible=function(){};
shindig.Extensible.prototype.setDependencies=function(B){for(var A in B){this[A]=B[A]
}};
shindig.Extensible.prototype.getDependencies=function(A){return this[A]
};
shindig.UserPrefStore=function(){};
shindig.UserPrefStore.prototype.getPrefs=function(A){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.UserPrefStore.prototype.savePrefs=function(A){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.DefaultUserPrefStore=function(){shindig.UserPrefStore.call(this)
};
shindig.DefaultUserPrefStore.inherits(shindig.UserPrefStore);
shindig.DefaultUserPrefStore.prototype.getPrefs=function(A){};
shindig.DefaultUserPrefStore.prototype.savePrefs=function(A){};
shindig.GadgetService=function(){};
shindig.GadgetService.prototype.setHeight=function(A,B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.GadgetService.prototype.setTitle=function(B,A){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.GadgetService.prototype.setUserPref=function(A){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.IfrGadgetService=function(){shindig.GadgetService.call(this);
gadgets.rpc.register("resize_iframe",this.setHeight);
gadgets.rpc.register("set_pref",this.setUserPref);
gadgets.rpc.register("set_title",this.setTitle);
gadgets.rpc.register("requestNavigateTo",this.requestNavigateTo);
gadgets.rpc.register("requestSendMessage",this.requestSendMessage)
};
shindig.IfrGadgetService.inherits(shindig.GadgetService);
shindig.IfrGadgetService.prototype.setHeight=function(B){if(B>shindig.container.maxheight_){B=shindig.container.maxheight_
}var A=document.getElementById(this.f);
if(A){A.style.height=B+"px"
}};
shindig.IfrGadgetService.prototype.setTitle=function(A){var B=document.getElementById(this.f+"_title");
if(B){B.innerHTML=A.replace(/&/g,"&amp;").replace(/</g,"&lt;")
}};
shindig.IfrGadgetService.prototype.setUserPref=function(D,F,A){var C=shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);
var B=shindig.container.getGadget(C);
for(var G=1,E=arguments.length;
G<E;
G+=2){this.userPrefs[arguments[G]].value=arguments[G+1]
}B.saveUserPrefs()
};
shindig.IfrGadgetService.prototype.requestSendMessage=function(D,C,A,B){if(A){window.setTimeout(function(){A(new opensocial.ResponseItem(null,null,opensocial.ResponseItem.Error.NOT_IMPLEMENTED,null))
},0)
}};
shindig.IfrGadgetService.prototype.requestNavigateTo=function(E,C){var D=shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);
var A=shindig.container.gadgetService.getUrlForView(E);
if(C){var B=gadgets.json.stringify(C);
if(B.length>0){A+="&appParams="+encodeURIComponent(B)
}}if(A&&document.location.href.indexOf(A)==-1){document.location.href=A
}};
shindig.IfrGadgetService.prototype.getUrlForView=function(A){if(A==="canvas"){return"/canvas"
}else{if(A==="profile"){return"/profile"
}else{return null
}}};
shindig.IfrGadgetService.prototype.getGadgetIdFromModuleId=function(A){return parseInt(A.match(/_([0-9]+)$/)[1],10)
};
shindig.LayoutManager=function(){};
shindig.LayoutManager.prototype.getGadgetChrome=function(A){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.StaticLayoutManager=function(){shindig.LayoutManager.call(this)
};
shindig.StaticLayoutManager.inherits(shindig.LayoutManager);
shindig.StaticLayoutManager.prototype.setGadgetChromeIds=function(A){this.gadgetChromeIds_=A
};
shindig.StaticLayoutManager.prototype.getGadgetChrome=function(A){var B=this.gadgetChromeIds_[A.id];
return B?document.getElementById(B):null
};
shindig.FloatLeftLayoutManager=function(A){shindig.LayoutManager.call(this);
this.layoutRootId_=A
};
shindig.FloatLeftLayoutManager.inherits(shindig.LayoutManager);
shindig.FloatLeftLayoutManager.prototype.getGadgetChrome=function(B){var A=document.getElementById(this.layoutRootId_);
if(A){var C=document.createElement("div");
C.className="gadgets-gadget-chrome";
C.style.cssFloat="left";
A.appendChild(C);
return C
}else{return null
}};
shindig.Gadget=function(A){this.userPrefs={};
if(A){for(var B in A){if(A.hasOwnProperty(B)){this[B]=A[B]
}}}if(!this.secureToken){this.secureToken="john.doe:john.doe:appid:cont:url:0:default"
}};
shindig.Gadget.prototype.getUserPrefs=function(){return this.userPrefs
};
shindig.Gadget.prototype.saveUserPrefs=function(){shindig.container.userPrefStore.savePrefs(this)
};
shindig.Gadget.prototype.getUserPrefValue=function(A){var B=this.userPrefs[A];
return typeof (B.value)!="undefined"&&B.value!=null?B.value:B["default"]
};
shindig.Gadget.prototype.render=function(B){if(B){var A=this;
this.getContent(function(C){B.innerHTML=C;
A.finishRender(B)
})
}};
shindig.Gadget.prototype.getContent=function(A){shindig.callAsyncAndJoin(["getTitleBarContent","getUserPrefsDialogContent","getMainContent"],function(B){A(B.join(""))
},this)
};
shindig.Gadget.prototype.getTitleBarContent=function(A){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.Gadget.prototype.getUserPrefsDialogContent=function(A){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.Gadget.prototype.getMainContent=function(A){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.Gadget.prototype.finishRender=function(A){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.Gadget.prototype.getAdditionalParams=function(){return""
};
shindig.BaseIfrGadget=function(A){shindig.Gadget.call(this,A);
this.serverBase_="/gadgets/";
this.queryIfrGadgetType_()
};
shindig.BaseIfrGadget.inherits(shindig.Gadget);
shindig.BaseIfrGadget.prototype.GADGET_IFRAME_PREFIX_="remote_iframe_";
shindig.BaseIfrGadget.prototype.CONTAINER="default";
shindig.BaseIfrGadget.prototype.cssClassGadget="gadgets-gadget";
shindig.BaseIfrGadget.prototype.cssClassTitleBar="gadgets-gadget-title-bar";
shindig.BaseIfrGadget.prototype.cssClassTitle="gadgets-gadget-title";
shindig.BaseIfrGadget.prototype.cssClassTitleButtonBar="gadgets-gadget-title-button-bar";
shindig.BaseIfrGadget.prototype.cssClassGadgetUserPrefsDialog="gadgets-gadget-user-prefs-dialog";
shindig.BaseIfrGadget.prototype.cssClassGadgetUserPrefsDialogActionBar="gadgets-gadget-user-prefs-dialog-action-bar";
shindig.BaseIfrGadget.prototype.cssClassTitleButton="gadgets-gadget-title-button";
shindig.BaseIfrGadget.prototype.cssClassGadgetContent="gadgets-gadget-content";
shindig.BaseIfrGadget.prototype.rpcToken=(2147483647*Math.random())|0;
shindig.BaseIfrGadget.prototype.rpcRelay="../container/rpc_relay.html";
shindig.BaseIfrGadget.prototype.getTitleBarContent=function(B){var A=this.hasViewablePrefs_()?'<a href="#" onclick="shindig.container.getGadget('+this.id+').handleOpenUserPrefsDialog();return false;" class="'+this.cssClassTitleButton+'">settings</a> ':"";
B('<div id="'+this.cssClassTitleBar+"-"+this.id+'" class="'+this.cssClassTitleBar+'"><span id="'+this.getIframeId()+'_title" class="'+this.cssClassTitle+'">'+(this.title?this.title:"Title")+'</span> | <span class="'+this.cssClassTitleButtonBar+'">'+A+'<a href="#" onclick="shindig.container.getGadget('+this.id+').handleToggle();return false;" class="'+this.cssClassTitleButton+'">toggle</a></span></div>')
};
shindig.BaseIfrGadget.prototype.getUserPrefsDialogContent=function(A){A('<div id="'+this.getUserPrefsDialogId()+'" class="'+this.cssClassGadgetUserPrefsDialog+'"></div>')
};
shindig.BaseIfrGadget.prototype.setServerBase=function(A){this.serverBase_=A
};
shindig.BaseIfrGadget.prototype.getServerBase=function(){return this.serverBase_
};
shindig.BaseIfrGadget.prototype.getMainContent=function(B){var A=this;
window.setTimeout(function(){A.getMainContent(B)
},0)
};
shindig.BaseIfrGadget.prototype.getIframeId=function(){return this.GADGET_IFRAME_PREFIX_+this.id
};
shindig.BaseIfrGadget.prototype.getUserPrefsDialogId=function(){return this.getIframeId()+"_userPrefsDialog"
};
shindig.BaseIfrGadget.prototype.getUserPrefsParams=function(){var A="";
for(var B in this.getUserPrefs()){A+="&up_"+encodeURIComponent(B)+"="+encodeURIComponent(this.getUserPrefValue(B))
}return A
};
shindig.BaseIfrGadget.prototype.handleToggle=function(){var A=document.getElementById(this.getIframeId());
if(A){var C=A.parentNode;
var B=C.style.display;
C.style.display=B?"":"none"
}};
shindig.BaseIfrGadget.prototype.hasViewablePrefs_=function(){for(var A in this.getUserPrefs()){var B=this.userPrefs[A];
if(B.type!="hidden"){return true
}}return false
};
shindig.BaseIfrGadget.prototype.handleOpenUserPrefsDialog=function(){if(this.userPrefsDialogContentLoaded){this.showUserPrefsDialog()
}else{var B=this;
var A="ig_callback_"+this.id;
window[A]=function(D){B.userPrefsDialogContentLoaded=true;
B.buildUserPrefsDialog(D);
B.showUserPrefsDialog()
};
var C=document.createElement("script");
C.src="http://www.gmodules.com/ig/gadgetsettings?mid="+this.id+"&output=js"+this.getUserPrefsParams()+"&url="+this.specUrl;
document.body.appendChild(C)
}};
shindig.BaseIfrGadget.prototype.buildUserPrefsDialog=function(B){var A=document.getElementById(this.getUserPrefsDialogId());
A.innerHTML=B+'<div class="'+this.cssClassGadgetUserPrefsDialogActionBar+'"><input type="button" value="Save" onclick="shindig.container.getGadget('+this.id+').handleSaveUserPrefs()"> <input type="button" value="Cancel" onclick="shindig.container.getGadget('+this.id+').handleCancelUserPrefs()"></div>';
A.childNodes[0].style.display=""
};
shindig.BaseIfrGadget.prototype.showUserPrefsDialog=function(B){var A=document.getElementById(this.getUserPrefsDialogId());
A.style.display=(B||B===undefined)?"":"none"
};
shindig.BaseIfrGadget.prototype.hideUserPrefsDialog=function(){this.showUserPrefsDialog(false)
};
shindig.BaseIfrGadget.prototype.handleSaveUserPrefs=function(){this.hideUserPrefsDialog();
var F=document.getElementById("m_"+this.id+"_numfields").value;
for(var C=0;
C<F;
C++){var A=document.getElementById("m_"+this.id+"_"+C);
var E="m_"+this.id+"_up_";
var B=A.name.substring(E.length);
var D=A.value;
this.userPrefs[B].value=D
}this.saveUserPrefs();
this.refresh()
};
shindig.BaseIfrGadget.prototype.handleCancelUserPrefs=function(){this.hideUserPrefsDialog()
};
shindig.BaseIfrGadget.prototype.refresh=function(){var A=this.getIframeId();
document.getElementById(A).src=this.getIframeUrl()
};
shindig.BaseIfrGadget.prototype.queryIfrGadgetType_=function(){var B={context:{country:"default",language:"default",view:"default",container:"default"},gadgets:[{url:this.specUrl,moduleId:1}]};
var A={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify(B)};
var E=this.serverBase_+"metadata?st="+this.secureToken;
gadgets.io.makeNonProxiedRequest(E,C,A,"application/javascript");
var D=this;
function C(K){var G=false;
var F=K.data.gadgets[0].features;
for(var I=0;
I<F.length;
I++){if(F[I]==="pubsub-2"){G=true;
break
}}var J=G?shindig.OAAIfrGadget:shindig.IfrGadget;
for(var H in J){if(J.hasOwnProperty(H)){D[H]=J[H]
}}}};
shindig.IfrGadget={getMainContent:function(B){var A=this.getIframeId();
gadgets.rpc.setRelayUrl(A,this.serverBase_+this.rpcRelay);
gadgets.rpc.setAuthToken(A,this.rpcToken);
B('<div class="'+this.cssClassGadgetContent+'"><iframe id="'+A+'" name="'+A+'" class="'+this.cssClassGadget+'" src="about:blank" frameborder="no" scrolling="no"'+(this.height?' height="'+this.height+'"':"")+(this.width?' width="'+this.width+'"':"")+"></iframe></div>")
},finishRender:function(A){window.frames[this.getIframeId()].location=this.getIframeUrl()
},getIframeUrl:function(){return this.serverBase_+"ifr?container="+this.CONTAINER+"&mid="+this.id+"&nocache="+shindig.container.nocache_+"&country="+shindig.container.country_+"&lang="+shindig.container.language_+"&view="+shindig.container.view_+(this.specVersion?"&v="+this.specVersion:"")+(shindig.container.parentUrl_?"&parent="+encodeURIComponent(shindig.container.parentUrl_):"")+(this.debug?"&debug=1":"")+this.getAdditionalParams()+this.getUserPrefsParams()+(this.secureToken?"&st="+this.secureToken:"")+"&url="+encodeURIComponent(this.specUrl)+"#rpctoken="+this.rpcToken+(this.viewParams?"&view-params="+encodeURIComponent(gadgets.json.stringify(this.viewParams)):"")+(this.hashData?"&"+this.hashData:"")
}};
shindig.OAAIfrGadget={getMainContent:function(A){A('<div id="'+this.cssClassGadgetContent+"-"+this.id+'" class="'+this.cssClassGadgetContent+'"></div>')
},finishRender:function(B){var A={className:this.cssClassGadget,frameborder:"no",scrolling:"no"};
if(this.height){A.height=this.height
}if(this.width){A.width=this.width
}new OpenAjax.hub.IframeContainer(gadgets.pubsub2router.hub,this.getIframeId(),{Container:{onSecurityAlert:function(C,D){gadgets.error("Security error for container "+C.getClientID()+" : "+D);
C.getIframe().src="about:blank"
}},IframeContainer:{parent:document.getElementById(this.cssClassGadgetContent+"-"+this.id),uri:this.getIframeUrl(),tunnelURI:shindig.uri(this.serverBase_+this.rpcRelay).resolve(shindig.uri(window.location.href)),iframeAttrs:A}})
},getIframeUrl:function(){return this.serverBase_+"ifr?container="+this.CONTAINER+"&mid="+this.id+"&nocache="+shindig.container.nocache_+"&country="+shindig.container.country_+"&lang="+shindig.container.language_+"&view="+shindig.container.view_+(this.specVersion?"&v="+this.specVersion:"")+(this.debug?"&debug=1":"")+this.getAdditionalParams()+this.getUserPrefsParams()+(this.secureToken?"&st="+this.secureToken:"")+"&url="+encodeURIComponent(this.specUrl)+(this.viewParams?"&view-params="+encodeURIComponent(gadgets.json.stringify(this.viewParams)):"")+(this.hashData?"#"+this.hashData:"")
}};
shindig.Container=function(){this.gadgets_={};
this.parentUrl_=document.location.href+"://"+document.location.host;
this.country_="ALL";
this.language_="ALL";
this.view_="default";
this.nocache_=1;
this.maxheight_=2147483647
};
shindig.Container.inherits(shindig.Extensible);
shindig.Container.prototype.gadgetClass=shindig.Gadget;
shindig.Container.prototype.userPrefStore=new shindig.DefaultUserPrefStore();
shindig.Container.prototype.gadgetService=new shindig.GadgetService();
shindig.Container.prototype.layoutManager=new shindig.StaticLayoutManager();
shindig.Container.prototype.setParentUrl=function(A){this.parentUrl_=A
};
shindig.Container.prototype.setCountry=function(A){this.country_=A
};
shindig.Container.prototype.setNoCache=function(A){this.nocache_=A
};
shindig.Container.prototype.setLanguage=function(A){this.language_=A
};
shindig.Container.prototype.setView=function(A){this.view_=A
};
shindig.Container.prototype.setMaxHeight=function(A){this.maxheight_=A
};
shindig.Container.prototype.getGadgetKey_=function(A){return"gadget_"+A
};
shindig.Container.prototype.getGadget=function(A){return this.gadgets_[this.getGadgetKey_(A)]
};
shindig.Container.prototype.createGadget=function(A){return new this.gadgetClass(A)
};
shindig.Container.prototype.addGadget=function(A){A.id=this.getNextGadgetInstanceId();
this.gadgets_[this.getGadgetKey_(A.id)]=A
};
shindig.Container.prototype.addGadgets=function(B){for(var A=0;
A<B.length;
A++){this.addGadget(B[A])
}};
shindig.Container.prototype.renderGadgets=function(){for(var A in this.gadgets_){this.renderGadget(this.gadgets_[A])
}};
shindig.Container.prototype.renderGadget=function(A){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.Container.prototype.nextGadgetInstanceId_=0;
shindig.Container.prototype.getNextGadgetInstanceId=function(){return this.nextGadgetInstanceId_++
};
shindig.Container.prototype.refreshGadgets=function(){for(var A in this.gadgets_){this.gadgets_[A].refresh()
}};
shindig.IfrContainer=function(){shindig.Container.call(this)
};
shindig.IfrContainer.inherits(shindig.Container);
shindig.IfrContainer.prototype.gadgetClass=shindig.BaseIfrGadget;
shindig.IfrContainer.prototype.gadgetService=new shindig.IfrGadgetService();
shindig.IfrContainer.prototype.setParentUrl=function(A){if(!A.match(/^http[s]?:\/\//)){A=document.location.href.match(/^[^?#]+\//)[0]+A
}this.parentUrl_=A
};
shindig.IfrContainer.prototype.renderGadget=function(A){var B=this.layoutManager.getGadgetChrome(A);
A.render(B)
};
shindig.container=new shindig.IfrContainer();
if(gadgets&&gadgets.rpc){osapi._handleGadgetRpcMethod=function(F){var B=new Array(F.length);
var A=0;
var D=this.callback;
var G=function(J,K){K({})
};
for(var I=0;
I<F.length;
I++){var C=osapi;
if(F[I].method.indexOf("_")==-1){var E=F[I].method.split(".");
for(var H=0;
H<E.length;
H++){if(C.hasOwnProperty(E[H])){C=C[E[H]]
}else{C=G;
break
}}}else{C=G
}C(F[I].params,function(J){return function(K){B[J]={id:F[J].id,data:K};
A++;
if(A==F.length){D(B)
}}
}(I))
}};
osapi.container={};
osapi.container.listMethods=function(C,B){var A=[];
recurseNames(osapi,"",5,A);
B(A)
};
function recurseNames(B,C,D,A){if(D==0){return 
}for(var E in B){if(B.hasOwnProperty(E)){if(E.indexOf("_")==-1){var F=typeof (B[E]);
if(F=="function"){A.push(C+E)
}else{if(F=="object"){recurseNames(B[E],C+E+".",D-1,A)
}}}}}}gadgets.rpc.register("osapi._handleGadgetRpcMethod",osapi._handleGadgetRpcMethod)
}gadgets.config.init({"shindig.auth":{},osapi:{endPoints:["https://%host%/rpc"]},"osapi.services":{"gadgets.rpc":["container.listMethods"],"https://%host%/rpc":["activities.supportedFields","activities.update","gadgets.metadata","activities.delete","activities.get","appdata.update","http.put","http.post","gadgets.tokenSupportedFields","appdata.get","activities.create","system.listMethods","cache.invalidate","groups.get","people.supportedFields","http.get","http.head","appdata.delete","http.delete","aipo.version","gadgets.token","appdata.create","people.get","gadgets.supportedFields"]},rpc:{parentRelayUrl:"/gadgets/files/container/rpc_relay.html",useLegacyProtocol:false},"core.io":{proxyUrl:"//%host%/gadgets/proxy?container=default&refresh=%refresh%&url=%url%%rewriteMime%",jsonProxyUrl:"//%host%/gadgets/makeRequest"}});