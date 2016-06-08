if(!dojo._hasResource["dojox.grid._grid.lib"]){dojo._hasResource["dojox.grid._grid.lib"]=true;
dojo.provide("dojox.grid._grid.lib");
dojo.isNumber=function(B){return(typeof B=="number")||(B instanceof Number)
};
dojo.mixin(dojox.grid,{na:"...",nop:function(){},getTdIndex:function(B){return B.cellIndex>=0?B.cellIndex:dojo.indexOf(B.parentNode.cells,B)
},getTrIndex:function(B){return B.rowIndex>=0?B.rowIndex:dojo.indexOf(B.parentNode.childNodes,B)
},getTr:function(D,C){return D&&((D.rows||0)[C]||D.childNodes[C])
},getTd:function(F,E,D){return(dojox.grid.getTr(inTable,E)||0)[D]
},findTable:function(C){for(var D=C;
D&&D.tagName!="TABLE";
D=D.parentNode){}return D
},ascendDom:function(E,D){for(var F=E;
F&&D(F);
F=F.parentNode){}return F
},makeNotTagName:function(D){var C=D.toUpperCase();
return function(A){return A.tagName!=C
}
},fire:function(E,F,H){var G=E&&F&&E[F];
return G&&(H?G.apply(E,H):E[F]())
},setStyleText:function(D,C){if(D.style.cssText==undefined){D.setAttribute("style",C)
}else{D.style.cssText=C
}},getStyleText:function(D,C){return(D.style.cssText==undefined?D.getAttribute("style"):D.style.cssText)
},setStyle:function(E,D,F){if(E&&E.style[D]!=F){E.style[D]=F
}},setStyleHeightPx:function(D,C){if(C>=0){dojox.grid.setStyle(D,"height",C+"px")
}},mouseEvents:["mouseover","mouseout","mousedown","mouseup","click","dblclick","contextmenu"],keyEvents:["keyup","keydown","keypress"],funnelEvents:function(I,K,L,J){var N=(J?J:dojox.grid.mouseEvents.concat(dojox.grid.keyEvents));
for(var M=0,H=N.length;
M<H;
M++){dojo.connect(I,"on"+N[M],K,L)
}},removeNode:function(B){B=dojo.byId(B);
B&&B.parentNode&&B.parentNode.removeChild(B);
return B
},getScrollbarWidth:function(){if(this._scrollBarWidth){return this._scrollBarWidth
}this._scrollBarWidth=18;
try{var D=document.createElement("div");
D.style.cssText="top:0;left:0;width:100px;height:100px;overflow:scroll;position:absolute;visibility:hidden;";
document.body.appendChild(D);
this._scrollBarWidth=D.offsetWidth-D.clientWidth;
document.body.removeChild(D);
delete D
}catch(C){}return this._scrollBarWidth
},getRef:function(I,N,O){var K=O||dojo.global,L=I.split("."),J=L.pop();
for(var P=0,M;
K&&(M=L[P]);
P++){K=(M in K?K[M]:(N?K[M]={}:undefined))
}return{obj:K,prop:J}
},getProp:function(name,create,context){with(dojox.grid.getRef(name,create,context)){return(obj)&&(prop)&&(prop in obj?obj[prop]:(create?obj[prop]={}:undefined))
}},indexInParent:function(F){var E=0,G,H=F.parentNode;
while(G=H.childNodes[E++]){if(G==F){return E-1
}}return -1
},cleanNode:function(G){if(!G){return 
}var H=function(A){return A.domNode&&dojo.isDescendant(A.domNode,G,true)
};
var J=dijit.registry.filter(H);
for(var I=0,F;
(F=J[I]);
I++){F.destroy()
}delete J
},getTagName:function(C){var D=dojo.byId(C);
return(D&&D.tagName?D.tagName.toLowerCase():"")
},nodeKids:function(G,H){var F=[];
var J=0,I;
while(I=G.childNodes[J++]){if(dojox.grid.getTagName(I)==H){F.push(I)
}}return F
},divkids:function(B){return dojox.grid.nodeKids(B,"div")
},focusSelectNode:function(D){try{dojox.grid.fire(D,"focus");
dojox.grid.fire(D,"select")
}catch(C){}},whenIdle:function(){setTimeout(dojo.hitch.apply(dojo,arguments),0)
},arrayCompare:function(F,G){for(var H=0,E=F.length;
H<E;
H++){if(F[H]!=G[H]){return false
}}return(F.length==G.length)
},arrayInsert:function(F,E,D){if(F.length<=E){F[E]=D
}else{F.splice(E,0,D)
}},arrayRemove:function(C,D){C.splice(D,1)
},arraySwap:function(F,H,E){var G=F[H];
F[H]=F[E];
F[E]=G
},initTextSizePoll:function(inInterval){var f=document.createElement("div");
with(f.style){top="0px";
left="0px";
position="absolute";
visibility="hidden"
}f.innerHTML="TheQuickBrownFoxJumpedOverTheLazyDog";
document.body.appendChild(f);
var fw=f.offsetWidth;
var job=function(){if(f.offsetWidth!=fw){fw=f.offsetWidth;
dojox.grid.textSizeChanged()
}};
window.setInterval(job,inInterval||200);
dojox.grid.initTextSizePoll=dojox.grid.nop
},textSizeChanged:function(){}});
dojox.grid.jobs={cancel:function(B){if(B){window.clearTimeout(B)
}},jobs:[],job:function(G,F,E){dojox.grid.jobs.cancelJob(G);
var H=function(){delete dojox.grid.jobs.jobs[G];
E()
};
dojox.grid.jobs.jobs[G]=setTimeout(H,F)
},cancelJob:function(B){dojox.grid.jobs.cancel(dojox.grid.jobs.jobs[B])
}}
};