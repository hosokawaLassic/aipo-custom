if(!dojo._hasResource["dojox.charting.plot2d.StackedColumns"]){dojo._hasResource["dojox.charting.plot2d.StackedColumns"]=true;
dojo.provide("dojox.charting.plot2d.StackedColumns");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.charting.plot2d.Columns");
dojo.require("dojox.lang.functional");
(function(){var E=dojox.lang.functional,D=dojox.charting.plot2d.common,F=E.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.StackedColumns",dojox.charting.plot2d.Columns,{calculateAxes:function(A){var B=D.collectStackedStats(this.series);
this._maxRunLength=B.hmax;
B.hmin-=0.5;
B.hmax+=0.5;
this._calc(A,B);
return this
},render:function(b,g){var e=E.repeat(this._maxRunLength,"-> 0",0);
for(var c=0;
c<this.series.length;
++c){var h=this.series[c];
for(var d=0;
d<h.data.length;
++d){var X=h.data[d];
if(isNaN(X)){X=0
}e[d]+=X
}}if(this.dirty){dojo.forEach(this.series,F);
this.cleanGroup();
var B=this.group;
E.forEachReversed(this.series,function(G){G.cleanGroup(B)
})
}var C=this.chart.theme,f,U,V,a,Y=this.opt.gap<this._hScaler.scale/3?this.opt.gap:0;
for(var c=this.series.length-1;
c>=0;
--c){var h=this.series[c];
if(!this.dirty&&!h.dirty){continue
}h.cleanGroup();
var B=h.group;
if(!h.fill||!h.stroke){f=h.dyn.color=new dojo.Color(C.next("color"))
}U=h.stroke?h.stroke:D.augmentStroke(C.series.stroke,f);
V=h.fill?h.fill:D.augmentFill(C.series.fill,f);
for(var d=0;
d<e.length;
++d){var X=e[d],A=this._hScaler.scale-2*Y,W=this._vScaler.scale*(X-this._vScaler.bounds.lower);
if(A>=1&&W>=1){var Z=B.createRect({x:g.l+this._hScaler.scale*(d+0.5-this._hScaler.bounds.lower)+Y,y:b.height-g.b-this._vScaler.scale*(X-this._vScaler.bounds.lower),width:A,height:W}).setFill(V).setStroke(U);
h.dyn.fill=Z.getFill();
h.dyn.stroke=Z.getStroke()
}}h.dirty=false;
for(var d=0;
d<h.data.length;
++d){var X=h.data[d];
if(isNaN(X)){X=0
}e[d]-=X
}}this.dirty=false;
return this
}})
})()
};