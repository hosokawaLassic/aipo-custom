if(!dojo._hasResource["dojox.grid._grid.views"]){dojo._hasResource["dojox.grid._grid.views"]=true;
dojo.provide("dojox.grid._grid.views");
dojo.declare("dojox.grid.views",null,{constructor:function(B){this.grid=B
},defaultWidth:200,views:[],resize:function(){this.onEach("resize")
},render:function(){this.onEach("render");
this.normalizeHeaderNodeHeight()
},addView:function(B){B.idx=this.views.length;
this.views.push(B)
},destroyViews:function(){for(var D=0,C;
C=this.views[D];
D++){C.destroy()
}this.views=[]
},getContentNodes:function(){var F=[];
for(var E=0,D;
D=this.views[E];
E++){F.push(D.contentNode)
}return F
},forEach:function(D){for(var E=0,F;
F=this.views[E];
E++){D(F,E)
}},onEach:function(G,F){F=F||[];
for(var H=0,E;
E=this.views[H];
H++){if(G in E){E[G].apply(E,F)
}}},normalizeHeaderNodeHeight:function(){var E=[];
for(var F=0,D;
(D=this.views[F]);
F++){if(D.headerContentNode.firstChild){E.push(D.headerContentNode)
}}this.normalizeRowNodeHeights(E)
},normalizeRowNodeHeights:function(J){var L=0;
for(var G=0,H,I;
(H=J[G]);
G++){L=Math.max(L,(H.firstChild.clientHeight)||(H.firstChild.offsetHeight))
}L=(L>=0?L:0);
var K=L+"px";
for(var G=0,H;
(H=J[G]);
G++){if(H.firstChild.clientHeight!=L){H.firstChild.style.height=K
}}if(J&&J[0]){J[0].parentNode.offsetHeight
}},renormalizeRow:function(H){var I=[];
for(var J=0,F,G;
(F=this.views[J])&&(G=F.getRowNode(H));
J++){G.firstChild.style.height="";
I.push(G)
}this.normalizeRowNodeHeights(I)
},getViewWidth:function(B){return this.views[B].getWidth()||this.defaultWidth
},measureHeader:function(){this.forEach(function(A){A.headerContentNode.style.height=""
});
var B=0;
this.forEach(function(A){B=Math.max(A.headerNode.offsetHeight,B)
});
return B
},measureContent:function(){var B=0;
this.forEach(function(A){B=Math.max(A.domNode.offsetHeight,B)
});
return B
},findClient:function(G){var F=this.grid.elasticView||-1;
if(F<0){for(var H=1,E;
(E=this.views[H]);
H++){if(E.viewWidth){for(H=1;
(E=this.views[H]);
H++){if(!E.viewWidth){F=H;
break
}}break
}}}if(F<0){F=Math.floor(this.views.length/2)
}return F
},_arrange:function(l,t,w,h){var i,v,vw,len=this.views.length;
var c=(w<=0?len:this.findClient());
var setPosition=function(v,l,t){with(v.domNode.style){left=l+"px";
top=t+"px"
}with(v.headerNode.style){left=l+"px";
top=0
}};
for(i=0;
(v=this.views[i])&&(i<c);
i++){vw=this.getViewWidth(i);
v.setSize(vw,h);
setPosition(v,l,t);
vw=v.domNode.offsetWidth;
l+=vw
}i++;
var r=w;
for(var j=len-1;
(v=this.views[j])&&(i<=j);
j--){vw=this.getViewWidth(j);
v.setSize(vw,h);
vw=v.domNode.offsetWidth;
r-=vw;
setPosition(v,r,t)
}if(c<len){v=this.views[c];
vw=Math.max(1,r-l);
v.setSize(vw+"px",h);
setPosition(v,l,t)
}return l
},arrange:function(H,G,E,F){var E=this._arrange(H,G,E,F);
this.resize();
return E
},renderRow:function(J,K){var L=[];
for(var N=0,H,I,M;
(H=this.views[N])&&(I=K[N]);
N++){M=H.renderRow(J);
I.appendChild(M);
L.push(M)
}this.normalizeRowNodeHeights(L)
},rowRemoved:function(B){this.onEach("rowRemoved",[B])
},updateRow:function(F,G){for(var H=0,E;
E=this.views[H];
H++){E.updateRow(F,G)
}this.renormalizeRow(F)
},updateRowStyles:function(B){this.onEach("updateRowStyles",[B])
},setScrollTop:function(G){var F=G;
for(var H=0,E;
E=this.views[H];
H++){F=E.setScrollTop(G)
}return F
},getFirstScrollingView:function(){for(var D=0,C;
(C=this.views[D]);
D++){if(C.hasScrollbar()){return C
}}}})
};