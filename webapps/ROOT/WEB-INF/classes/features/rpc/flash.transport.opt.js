gadgets.rpctx=gadgets.rpctx||{};
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
var k=window[N];
var l=k[D]={};
H=N+"."+D;
return l
}var L=T();
function j(m,k){var l=function(){m.apply({},arguments)
};
L[k]=L[k]||l;
return H+"."+k
}function O(k){return k===".."?gadgets.rpc.RPC_ID:k
}function d(k){return k===".."?"INNER":"OUTER"
}function f(k){if(J){Q=k.rpc["commSwf"]||"/xpc.swf"
}}gadgets.config.register("rpc",null,f);
function W(){if(U===null&&document.body&&Q){var m=Q+"?cb="+Math.random()+"&origin="+c+"&jsl=1";
var l=document.createElement("div");
l.style.height="1px";
l.style.width="1px";
var k='<object height="1" width="1" id="'+Z+'" type="application/x-shockwave-flash"><param name="allowScriptAccess" value="always"></param><param name="movie" value="'+m+'"></param><embed type="application/x-shockwave-flash" allowScriptAccess="always" src="'+m+'" height="1" width="1"></embed></object>';
document.body.appendChild(l);
l.innerHTML=k;
U=l.firstChild
}++A;
if(i!==null&&(U!==null||A>=R)){window.clearTimeout(i)
}else{i=window.setTimeout(W,h)
}}function b(){if(Y[".."]){return 
}X("..");
M++;
if(M>=P&&E!==null){window.clearTimeout(E);
E=null
}else{E=window.setTimeout(b,I)
}}function e(){if(U!==null){while(a.length>0){var l=a.shift();
var k=l.targetId;
U.setup(l.token,O(k),d(k))
}}}function G(){e();
if(i!==null){window.clearTimeout(i)
}i=null
}j(G,"ready");
function B(){if(!Y[".."]&&E===null){E=window.setTimeout(b,I)
}}j(B,"setupDone");
function C(m,q,o){var l=gadgets.rpc.getTargetOrigin(m);
var p=gadgets.rpc.getAuthToken(m);
var k="sendMessage_"+O(m)+"_"+p+"_"+d(m);
var n=U[k];
n.call(U,gadgets.json.stringify(o),l);
return true
}function S(m,o,n){var k=gadgets.json.parse(m);
var l=k[V];
if(l){g(l,true);
Y[l]=true;
if(l!==".."){X(l,true)
}return 
}window.setTimeout(function(){K(k,o)
},0)
}j(S,"receiveMessage");
function X(n,m){var k=gadgets.rpc.RPC_ID;
var l={};
l[V]=m?"..":k;
l[F]=k;
C(n,k,l)
}return{getCode:function(){return"flash"
},isParentVerifiable:function(){return true
},init:function(l,k){K=l;
g=k;
J=true;
return true
},setup:function(l,k){a.push({token:k,targetId:l});
if(U===null&&i===null){i=window.setTimeout(W,h)
}e();
return true
},call:C,_receiveMessage:S,_ready:G,_setupDone:B}
}()
};