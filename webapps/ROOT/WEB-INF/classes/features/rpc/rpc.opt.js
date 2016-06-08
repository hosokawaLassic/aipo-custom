if(!window.gadgets["rpc"]){gadgets.rpc=function(){var l="__cb";
var s="";
var t="__ack";
var F=500;
var f=10;
var B="|";
var T="callback";
var G="origin";
var R="referer";
var Q={};
var w={};
var c={};
var a={};
var Y=0;
var L={};
var M={};
var q={};
var D={};
var N={};
var d={};
var E=null;
var P=null;
var Z=(window.top!==window.self);
var U=window.name;
var i=function(){};
var p=0;
var y=1;
var A=2;
var W=window.console;
var v=W&&W.log&&function(AD){W.log(AD)
}||function(){};
var r=(function(){function AD(AE){return function(){v(AE+": call ignored")
}
}return{getCode:function(){return"noop"
},isParentVerifiable:function(){return true
},init:AD("init"),setup:AD("setup"),call:AD("call")}
})();
if(gadgets.util){D=gadgets.util.getUrlParameters()
}function j(){if(D.rpctx=="flash"){return gadgets.rpctx.flash
}if(D.rpctx=="rmr"){return gadgets.rpctx.rmr
}return typeof window.postMessage==="function"?gadgets.rpctx.wpm:typeof window.postMessage==="object"?gadgets.rpctx.wpm:window.ActiveXObject?(gadgets.rpctx.flash?gadgets.rpctx.flash:gadgets.rpctx.nix):navigator.userAgent.indexOf("WebKit")>0?gadgets.rpctx.rmr:navigator.product==="Gecko"?gadgets.rpctx.frameElement:gadgets.rpctx.ifpc
}function K(AI,AG){if(N[AI]){return 
}var AE=g;
if(!AG){AE=r
}N[AI]=AE;
var AD=d[AI]||[];
for(var AF=0;
AF<AD.length;
++AF){var AH=AD[AF];
AH.t=e(AI);
AE.call(AI,AH.f,AH)
}d[AI]=[]
}var h=false,u=false;
function n(){if(u){return 
}function AD(){h=true
}if(typeof window.addEventListener!="undefined"){window.addEventListener("unload",AD,false)
}else{if(typeof window.attachEvent!="undefined"){window.attachEvent("onunload",AD)
}}u=true
}function J(AD,AH,AE,AG,AF){if(!a[AH]||a[AH]!==AE){gadgets.error("Invalid auth token. "+a[AH]+" vs "+AE);
i(AH,A)
}AF.onunload=function(){if(M[AH]&&!h){i(AH,y);
gadgets.rpc.removeReceiver(AH)
}};
n();
AG=gadgets.json.parse(decodeURIComponent(AG))
}function z(AH,AE){if(AH&&typeof AH.s==="string"&&typeof AH.f==="string"&&AH.a instanceof Array){if(a[AH.f]){if(a[AH.f]!==AH.t){gadgets.error("Invalid auth token. "+a[AH.f]+" vs "+AH.t);
i(AH.f,A)
}}if(AH.s===t){window.setTimeout(function(){K(AH.f,true)
},0);
return 
}if(AH.c){AH[T]=function(AI){gadgets.rpc.call(AH.f,l,null,AH.c,AI)
}
}if(AE){var AF=S(AE);
AH[G]=AE;
var AG=AH.r;
if(!AG||S(AG)!=AF){AG=AE
}AH[R]=AG
}var AD=(Q[AH.s]||Q[s]).apply(AH,AH.a);
if(AH.c&&typeof AD!=="undefined"){gadgets.rpc.call(AH.f,l,null,AH.c,AD)
}}}function S(AF){if(!AF){return""
}AF=AF.toLowerCase();
if(AF.indexOf("//")==0){AF=window.location.protocol+AF
}if(AF.indexOf("://")==-1){AF=window.location.protocol+"//"+AF
}var AG=AF.substring(AF.indexOf("://")+3);
var AD=AG.indexOf("/");
if(AD!=-1){AG=AG.substring(0,AD)
}var AI=AF.substring(0,AF.indexOf("://"));
var AH="";
var AJ=AG.indexOf(":");
if(AJ!=-1){var AE=AG.substring(AJ+1);
AG=AG.substring(0,AJ);
if((AI==="http"&&AE!=="80")||(AI==="https"&&AE!=="443")){AH=":"+AE
}}return AI+"://"+AG+AH
}function b(AE,AD){return"/"+AE+(AD?B+AD:"")
}function X(AG){if(AG.charAt(0)=="/"){var AE=AG.indexOf(B);
var AF=AE>0?AG.substring(1,AE):AG.substring(1);
var AD=AE>0?AG.substring(AE+1):null;
return{id:AF,origin:AD}
}else{return null
}}function AC(AF){if(typeof AF==="undefined"||AF===".."){return window.parent
}var AE=X(AF);
if(AE){return window.top.frames[AE.id]
}AF=String(AF);
var AD=window.frames[AF];
if(AD){return AD
}AD=document.getElementById(AF);
if(AD&&AD.contentWindow){return AD.contentWindow
}return null
}function k(AG){var AF=null;
var AD=o(AG);
if(AD){AF=AD
}else{var AE=X(AG);
if(AE){AF=AE.origin
}else{if(AG==".."){AF=D.parent
}else{AF=document.getElementById(AG).src
}}}return S(AF)
}var g=j();
Q[s]=function(){v("Unknown RPC service: "+this.s)
};
Q[l]=function(AE,AD){var AF=L[AE];
if(AF){delete L[AE];
AF.call(this,AD)
}};
function x(AF,AD){if(M[AF]===true){return 
}if(typeof M[AF]==="undefined"){M[AF]=0
}var AE=AC(AF);
if(AF===".."||AE!=null){if(g.setup(AF,AD)===true){M[AF]=true;
return 
}}if(M[AF]!==true&&M[AF]++<f){window.setTimeout(function(){x(AF,AD)
},F)
}else{N[AF]=r;
M[AF]=true
}}function m(AE,AH){if(typeof q[AE]==="undefined"){q[AE]=false;
var AG=o(AE);
if(S(AG)!==S(window.location.href)){return false
}var AF=AC(AE);
try{var AI=AF.gadgets;
q[AE]=AI.rpc.receiveSameDomain
}catch(AD){}}if(typeof q[AE]==="function"){q[AE](AH);
return true
}return false
}function o(AE){var AD=w[AE];
if(AD&&AD.substring(0,1)==="/"){if(AD.substring(1,2)==="/"){AD=document.location.protocol+AD
}else{AD=document.location.protocol+"//"+document.location.host+AD
}}return AD
}function AB(AE,AD,AF){if(!/http(s)?:\/\/.+/.test(AD)){if(AD.indexOf("//")==0){AD=window.location.protocol+AD
}else{if(AD.charAt(0)=="/"){AD=window.location.protocol+"//"+window.location.host+AD
}else{if(AD.indexOf("://")==-1){AD=window.location.protocol+"//"+AD
}}}}w[AE]=AD;
c[AE]=!!AF
}function e(AD){return a[AD]
}function C(AD,AE){AE=AE||"";
a[AD]=String(AE);
x(AD,AE)
}function AA(AE){var AD=AE.passReferrer||"";
var AF=AD.split(":",2);
E=AF[0]||"none";
P=AF[1]||"origin"
}function H(AE,AD){function AF(AI){var AH=AI?AI.rpc:{};
var AJ=String(AH.useLegacyProtocol)==="true";
AA(AH);
var AG=AH.parentRelayUrl||"";
AG=S(D.parent||AD)+AG;
AB("..",AG,AJ);
if(AJ){g=gadgets.rpctx.ifpc;
g.init(z,K)
}C("..",AE)
}if(!D.parent&&AD){AF({});
return 
}gadgets.config.register("rpc",null,AF)
}function O(AE,AI,AK){if(AE.charAt(0)!="/"){if(!gadgets.util){return 
}var AH=document.getElementById(AE);
if(!AH){throw new Error("Cannot set up gadgets.rpc receiver with ID: "+AE+", element not found.")
}}var AD=AH&&AH.src;
var AF=AI||gadgets.rpc.getOrigin(AD);
AB(AE,AF);
var AJ=gadgets.util.getUrlParameters(AD);
var AG=AK||AJ.rpctoken;
C(AE,AG)
}function I(AD,AF,AG){if(AD===".."){var AE=AG||D.rpctoken||D.ifpctok||"";
H(AE,AF)
}else{O(AD,AF,AG)
}}function V(AF){if(E==="bidir"||(E==="c2p"&&AF==="..")||(E==="p2c"&&AF!=="..")){var AE=window.location.href;
var AG="?";
if(P==="query"){AG="#"
}else{if(P==="hash"){return AE
}}var AD=AE.lastIndexOf(AG);
AD=AD===-1?AE.length:AD;
return AE.substring(0,AD)
}return null
}return{config:function(AD){if(typeof AD.securityCallback==="function"){i=AD.securityCallback
}},register:function(AE,AD){if(AE===l||AE===t){throw new Error("Cannot overwrite callback/ack service")
}if(AE===s){throw new Error("Cannot overwrite default service: use registerDefault")
}Q[AE]=AD
},unregister:function(AD){if(AD===l||AD===t){throw new Error("Cannot delete callback/ack service")
}if(AD===s){throw new Error("Cannot delete default service: use unregisterDefault")
}delete Q[AD]
},registerDefault:function(AD){Q[s]=AD
},unregisterDefault:function(){delete Q[s]
},forceParentVerifiable:function(){if(!g.isParentVerifiable()){g=gadgets.rpctx.ifpc
}},call:function(AD,AF,AK,AI){AD=AD||"..";
var AJ="..";
if(AD===".."){AJ=U
}else{if(AD.charAt(0)=="/"){AJ=b(U,gadgets.rpc.getOrigin(window.location.href))
}}++Y;
if(AK){L[Y]=AK
}var AH={s:AF,f:AJ,c:AK?Y:0,a:Array.prototype.slice.call(arguments,3),t:a[AD],l:c[AD]};
var AE=V(AD);
if(AE){AH.r=AE
}if(AD!==".."&&X(AD)==null&&!document.getElementById(AD)){return 
}if(m(AD,AH)){return 
}var AG=N[AD];
if(!AG&&X(AD)!==null){AG=g
}if(!AG){if(!d[AD]){d[AD]=[AH]
}else{d[AD].push(AH)
}return 
}if(c[AD]){AG=gadgets.rpctx.ifpc
}if(AG.call(AD,AJ,AH)===false){N[AD]=r;
g.call(AD,AJ,AH)
}},getRelayUrl:o,setRelayUrl:AB,setAuthToken:C,setupReceiver:I,getAuthToken:e,removeReceiver:function(AD){delete w[AD];
delete c[AD];
delete a[AD];
delete M[AD];
delete q[AD];
delete N[AD]
},getRelayChannel:function(){return g.getCode()
},receive:function(AE,AD){if(AE.length>4){g._receiveMessage(AE,z)
}else{J.apply(null,AE.concat(AD))
}},receiveSameDomain:function(AD){AD.a=Array.prototype.slice.call(AD.a);
window.setTimeout(function(){z(AD)
},0)
},getOrigin:S,getTargetOrigin:k,init:function(){if(g.init(z,K)===false){g=r
}if(Z){I("..")
}else{gadgets.config.register("rpc",null,function(AD){AA(AD.rpc||{})
})
}},_getTargetWin:AC,_parseSiblingId:X,ACK:t,RPC_ID:U||"..",SEC_ERROR_LOAD_TIMEOUT:p,SEC_ERROR_FRAME_PHISH:y,SEC_ERROR_FORGED_MSG:A}
}();
gadgets.rpc.init()
};