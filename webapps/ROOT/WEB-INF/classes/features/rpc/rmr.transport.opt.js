gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.rmr){gadgets.rpctx.rmr=function(){var H=500;
var F=10;
var I={};
var A=gadgets.util.getUrlParameters()["parent"];
var C;
var J;
function L(Q,O,P,N){var R=function(){document.body.appendChild(Q);
Q.src="about:blank";
if(N){Q.onload=function(){M(N)
}
}Q.src=O+"#"+P
};
if(document.body){R()
}else{gadgets.util.registerOnLoadHandler(function(){R()
})
}}function D(Q){if(typeof I[Q]==="object"){return 
}var R=document.createElement("iframe");
var O=R.style;
O.position="absolute";
O.top="0px";
O.border="0";
O.opacity="0";
O.width="10px";
O.height="1px";
R.id="rmrtransport-"+Q;
R.name=R.id;
var P=gadgets.rpc.getRelayUrl(Q);
var N=gadgets.rpc.getOrigin(A);
if(!P){P=N+"/robots.txt"
}I[Q]={frame:R,receiveWindow:null,relayUri:P,relayOrigin:N,searchCounter:0,width:10,waiting:true,queue:[],sendId:0,recvId:0,verifySendToken:String(Math.random()),verifyRecvToken:null,originVerified:false};
if(Q!==".."){L(R,P,B(Q))
}E(Q)
}function E(P){var R=null;
I[P].searchCounter++;
try{var O=gadgets.rpc._getTargetWin(P);
if(P===".."){R=O.frames["rmrtransport-"+gadgets.rpc.RPC_ID]
}else{R=O.frames["rmrtransport-.."]
}}catch(Q){}var N=false;
if(R){N=G(P,R)
}if(!N){if(I[P].searchCounter>F){return 
}window.setTimeout(function(){E(P)
},H)
}}function K(O,Q,U,T){var P=null;
if(U!==".."){P=I[".."]
}else{P=I[O]
}if(P){if(Q!==gadgets.rpc.ACK){P.queue.push(T)
}if(P.waiting||(P.queue.length===0&&!(Q===gadgets.rpc.ACK&&T&&T.ackAlone===true))){return true
}if(P.queue.length>0){P.waiting=true
}var N=P.relayUri+"#"+B(O);
try{P.frame.contentWindow.location=N;
var R=P.width==10?20:10;
P.frame.style.width=R+"px";
P.width=R
}catch(S){return false
}}return true
}function B(O){var P=I[O];
var N={id:P.sendId};
if(P){N.d=Array.prototype.slice.call(P.queue,0);
var Q={s:gadgets.rpc.ACK,id:P.recvId};
if(!P.originVerified){Q.sendToken=P.verifySendToken
}if(P.verifyRecvToken){Q.recvToken=P.verifyRecvToken
}N.d.push(Q)
}return gadgets.json.stringify(N)
}function M(Y){var V=I[Y];
var R=V.receiveWindow.location.hash.substring(1);
var Z=gadgets.json.parse(decodeURIComponent(R))||{};
var O=Z.d||[];
var P=false;
var U=false;
var W=0;
var N=(V.recvId-Z.id);
for(var Q=0;
Q<O.length;
++Q){var T=O[Q];
if(T.s===gadgets.rpc.ACK){J(Y,true);
V.verifyRecvToken=T.sendToken;
if(!V.originVerified&&T.recvToken&&String(T.recvToken)==String(V.verifySendToken)){V.originVerified=true
}if(V.waiting){U=true
}V.waiting=false;
var S=Math.max(0,T.id-V.sendId);
V.queue.splice(0,S);
V.sendId=Math.max(V.sendId,T.id||0);
continue
}P=true;
if(++W<=N){continue
}++V.recvId;
C(T,V.originVerified?V.relayOrigin:undefined)
}if(P||(U&&V.queue.length>0)){var X=(Y==="..")?gadgets.rpc.RPC_ID:"..";
K(Y,gadgets.rpc.ACK,X,{ackAlone:P})
}}function G(Q,T){var P=I[Q];
try{var O=false;
O="document" in T;
if(!O){return false
}O=typeof T.document=="object";
if(!O){return false
}var S=T.location.href;
if(S==="about:blank"){return false
}}catch(N){return false
}P.receiveWindow=T;
function R(){M(Q)
}if(typeof T.attachEvent==="undefined"){T.onresize=R
}else{T.attachEvent("onresize",R)
}if(Q===".."){L(P.frame,P.relayUri,B(Q),Q)
}else{M(Q)
}return true
}return{getCode:function(){return"rmr"
},isParentVerifiable:function(){return true
},init:function(N,O){C=N;
J=O;
return true
},setup:function(P,N){try{D(P)
}catch(O){gadgets.warn("Caught exception setting up RMR: "+O);
return false
}return true
},call:function(N,P,O){return K(N,O.s,P,O)
}}
}()
};