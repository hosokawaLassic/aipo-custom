gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.ifpc){gadgets.rpctx.ifpc=function(){var H=[];
var E=0;
var D;
var A=2000;
var G={};
function C(K){var I=[];
for(var L=0,J=K.length;
L<J;
++L){I.push(encodeURIComponent(gadgets.json.stringify(K[L])))
}return I.join("&")
}function B(L){var J;
for(var I=H.length-1;
I>=0;
--I){var M=H[I];
try{if(M&&(M.recyclable||M.readyState==="complete")){M.parentNode.removeChild(M);
if(window.ActiveXObject){H[I]=M=null;
H.splice(I,1)
}else{M.recyclable=false;
J=M;
break
}}}catch(K){}}if(!J){J=document.createElement("iframe");
J.style.border=J.style.width=J.style.height="0px";
J.style.visibility="hidden";
J.style.position="absolute";
J.onload=function(){this.recyclable=true
};
H.push(J)
}J.src=L;
window.setTimeout(function(){document.body.appendChild(J)
},0)
}function F(I,K){for(var J=K-1;
J>=0;
--J){if(typeof I[J]==="undefined"){return false
}}return true
}return{getCode:function(){return"ifpc"
},isParentVerifiable:function(){return true
},init:function(I,J){D=J;
D("..",true);
return true
},setup:function(J,I){D(J,true);
return true
},call:function(S,R,Q){var L=gadgets.rpc.getRelayUrl(S);
++E;
if(!L){gadgets.warn("No relay file assigned for IFPC");
return false
}var I=null,J=[];
if(Q.l){var O=Q.a;
I=[L,"#",C([R,E,1,0,C([R,Q.s,"","",R].concat(O))])].join("");
J.push(I)
}else{I=[L,"#",S,"&",R,"@",E,"&"].join("");
var T=encodeURIComponent(gadgets.json.stringify(Q)),N=A-I.length,P=Math.ceil(T.length/N),M=0,K;
while(T.length>0){K=T.substring(0,N);
T=T.substring(N);
J.push([I,P,"&",M,"&",K].join(""));
M+=1
}}do{B(J.shift())
}while(J.length>0);
return true
},_receiveMessage:function(I,N){var O=I[1],M=parseInt(I[2],10),K=parseInt(I[3],10),L=I[I.length-1],J=M===1;
if(M>1){if(!G[O]){G[O]=[]
}G[O][K]=L;
if(F(G[O],M)){L=G[O].join("");
delete G[O];
J=true
}}if(J){N(gadgets.json.parse(decodeURIComponent(L)))
}}}
}()
};