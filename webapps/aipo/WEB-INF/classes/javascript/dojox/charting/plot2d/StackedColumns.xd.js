dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.StackedColumns"],["require","dojox.charting.plot2d.common"],["require","dojox.charting.plot2d.Columns"],["require","dojox.lang.functional"]],defineResource:function(B){if(!B._hasResource["dojox.charting.plot2d.StackedColumns"]){B._hasResource["dojox.charting.plot2d.StackedColumns"]=true;
B.provide("dojox.charting.plot2d.StackedColumns");
B.require("dojox.charting.plot2d.common");
B.require("dojox.charting.plot2d.Columns");
B.require("dojox.lang.functional");
(function(){var A=dojox.lang.functional,F=dojox.charting.plot2d.common,E=A.lambda("item.purgeGroup()");
B.declare("dojox.charting.plot2d.StackedColumns",dojox.charting.plot2d.Columns,{calculateAxes:function(C){var D=F.collectStackedStats(this.series);
this._maxRunLength=D.hmax;
D.hmin-=0.5;
D.hmax+=0.5;
this._calc(C,D);
return this
},render:function(c,h){var f=A.repeat(this._maxRunLength,"-> 0",0);
for(var d=0;
d<this.series.length;
++d){var i=this.series[d];
for(var e=0;
e<i.data.length;
++e){var Y=i.data[e];
if(isNaN(Y)){Y=0
}f[e]+=Y
}}if(this.dirty){B.forEach(this.series,E);
this.cleanGroup();
var C=this.group;
A.forEachReversed(this.series,function(G){G.cleanGroup(C)
})
}var D=this.chart.theme,g,V,W,b,Z=this.opt.gap<this._hScaler.scale/3?this.opt.gap:0;
for(var d=this.series.length-1;
d>=0;
--d){var i=this.series[d];
if(!this.dirty&&!i.dirty){continue
}i.cleanGroup();
var C=i.group;
if(!i.fill||!i.stroke){g=i.dyn.color=new B.Color(D.next("color"))
}V=i.stroke?i.stroke:F.augmentStroke(D.series.stroke,g);
W=i.fill?i.fill:F.augmentFill(D.series.fill,g);
for(var e=0;
e<f.length;
++e){var Y=f[e],j=this._hScaler.scale-2*Z,X=this._vScaler.scale*(Y-this._vScaler.bounds.lower);
if(j>=1&&X>=1){var a=C.createRect({x:h.l+this._hScaler.scale*(e+0.5-this._hScaler.bounds.lower)+Z,y:c.height-h.b-this._vScaler.scale*(Y-this._vScaler.bounds.lower),width:j,height:X}).setFill(W).setStroke(V);
i.dyn.fill=a.getFill();
i.dyn.stroke=a.getStroke()
}}i.dirty=false;
for(var e=0;
e<i.data.length;
++e){var Y=i.data[e];
if(isNaN(Y)){Y=0
}f[e]-=Y
}}this.dirty=false;
return this
}})
})()
}}});