dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.Stacked"],["require","dojox.charting.plot2d.common"],["require","dojox.charting.plot2d.Default"],["require","dojox.lang.functional"]],defineResource:function(B){if(!B._hasResource["dojox.charting.plot2d.Stacked"]){B._hasResource["dojox.charting.plot2d.Stacked"]=true;
B.provide("dojox.charting.plot2d.Stacked");
B.require("dojox.charting.plot2d.common");
B.require("dojox.charting.plot2d.Default");
B.require("dojox.lang.functional");
(function(){var A=dojox.lang.functional,F=dojox.charting.plot2d.common,E=A.lambda("item.purgeGroup()");
B.declare("dojox.charting.plot2d.Stacked",dojox.charting.plot2d.Default,{calculateAxes:function(C){var D=F.collectStackedStats(this.series);
this._maxRunLength=D.hmax;
this._calc(C,D);
return this
},render:function(a,l){var n=A.repeat(this._maxRunLength,"-> 0",0);
for(var Y=0;
Y<this.series.length;
++Y){var e=this.series[Y];
for(var Z=0;
Z<e.data.length;
++Z){var i=e.data[Z];
if(isNaN(i)){i=0
}n[Z]+=i
}}if(this.dirty){B.forEach(this.series,E);
this.cleanGroup();
var f=this.group;
A.forEachReversed(this.series,function(G){G.cleanGroup(f)
})
}var g=this.chart.theme,j,m,c,k;
for(var Y=this.series.length-1;
Y>=0;
--Y){var e=this.series[Y];
if(!this.dirty&&!e.dirty){continue
}e.cleanGroup();
var f=e.group,D=B.map(n,function(H,G){return{x:this._hScaler.scale*(G+1-this._hScaler.bounds.lower)+l.l,y:a.height-l.b-this._vScaler.scale*(H-this._vScaler.bounds.lower)}
},this);
if(!e.fill||!e.stroke){c=new B.Color(g.next("color"))
}if(this.opt.areas){var p=B.clone(D);
p.push({x:D[D.length-1].x,y:a.height-l.b});
p.push({x:D[0].x,y:a.height-l.b});
p.push(D[0]);
var b=e.fill?e.fill:F.augmentFill(g.series.fill,c);
f.createPolyline(p).setFill(b)
}if(this.opt.lines||this.opt.markers){j=e.stroke?F.makeStroke(e.stroke):F.augmentStroke(g.series.stroke,c);
if(e.outline||g.series.outline){m=F.makeStroke(e.outline?e.outline:g.series.outline);
m.width=2*m.width+j.width
}}if(this.opt.markers){k=e.marker?e.marker:g.next("marker")
}if(this.opt.shadows&&j){var C=this.opt.shadows,d=new B.Color([0,0,0,0.3]),o=B.map(D,function(G){return{x:G.x+C.dx,y:G.y+C.dy}
}),h=B.clone(m?m:j);
h.color=d;
h.width+=C.dw?C.dw:0;
if(this.opt.lines){f.createPolyline(o).setStroke(h)
}if(this.opt.markers){B.forEach(o,function(G){f.createPath("M"+G.x+" "+G.y+" "+k).setStroke(h).setFill(d)
},this)
}}if(this.opt.lines){if(m){f.createPolyline(D).setStroke(m)
}f.createPolyline(D).setStroke(j)
}if(this.opt.markers){B.forEach(D,function(G){var H="M"+G.x+" "+G.y+" "+k;
if(m){f.createPath(H).setStroke(m)
}f.createPath(H).setStroke(j).setFill(j.color)
},this)
}e.dirty=false;
for(var Z=0;
Z<e.data.length;
++Z){var i=e.data[Z];
if(isNaN(i)){i=0
}n[Z]-=i
}}this.dirty=false;
return this
}})
})()
}}});