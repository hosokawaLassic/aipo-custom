if(!dojo._hasResource["dojox.charting.plot2d.Stacked"]){dojo._hasResource["dojox.charting.plot2d.Stacked"]=true;
dojo.provide("dojox.charting.plot2d.Stacked");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.charting.plot2d.Default");
dojo.require("dojox.lang.functional");
(function(){var E=dojox.lang.functional,D=dojox.charting.plot2d.common,F=E.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.Stacked",dojox.charting.plot2d.Default,{calculateAxes:function(A){var B=D.collectStackedStats(this.series);
this._maxRunLength=B.hmax;
this._calc(A,B);
return this
},render:function(Y,j){var l=E.repeat(this._maxRunLength,"-> 0",0);
for(var C=0;
C<this.series.length;
++C){var c=this.series[C];
for(var X=0;
X<c.data.length;
++X){var g=c.data[X];
if(isNaN(g)){g=0
}l[X]+=g
}}if(this.dirty){dojo.forEach(this.series,F);
this.cleanGroup();
var d=this.group;
E.forEachReversed(this.series,function(G){G.cleanGroup(d)
})
}var e=this.chart.theme,h,k,a,i;
for(var C=this.series.length-1;
C>=0;
--C){var c=this.series[C];
if(!this.dirty&&!c.dirty){continue
}c.cleanGroup();
var d=c.group,B=dojo.map(l,function(H,G){return{x:this._hScaler.scale*(G+1-this._hScaler.bounds.lower)+j.l,y:Y.height-j.b-this._vScaler.scale*(H-this._vScaler.bounds.lower)}
},this);
if(!c.fill||!c.stroke){a=new dojo.Color(e.next("color"))
}if(this.opt.areas){var n=dojo.clone(B);
n.push({x:B[B.length-1].x,y:Y.height-j.b});
n.push({x:B[0].x,y:Y.height-j.b});
n.push(B[0]);
var Z=c.fill?c.fill:D.augmentFill(e.series.fill,a);
d.createPolyline(n).setFill(Z)
}if(this.opt.lines||this.opt.markers){h=c.stroke?D.makeStroke(c.stroke):D.augmentStroke(e.series.stroke,a);
if(c.outline||e.series.outline){k=D.makeStroke(c.outline?c.outline:e.series.outline);
k.width=2*k.width+h.width
}}if(this.opt.markers){i=c.marker?c.marker:e.next("marker")
}if(this.opt.shadows&&h){var A=this.opt.shadows,b=new dojo.Color([0,0,0,0.3]),m=dojo.map(B,function(G){return{x:G.x+A.dx,y:G.y+A.dy}
}),f=dojo.clone(k?k:h);
f.color=b;
f.width+=A.dw?A.dw:0;
if(this.opt.lines){d.createPolyline(m).setStroke(f)
}if(this.opt.markers){dojo.forEach(m,function(G){d.createPath("M"+G.x+" "+G.y+" "+i).setStroke(f).setFill(b)
},this)
}}if(this.opt.lines){if(k){d.createPolyline(B).setStroke(k)
}d.createPolyline(B).setStroke(h)
}if(this.opt.markers){dojo.forEach(B,function(G){var H="M"+G.x+" "+G.y+" "+i;
if(k){d.createPath(H).setStroke(k)
}d.createPath(H).setStroke(h).setFill(h.color)
},this)
}c.dirty=false;
for(var X=0;
X<c.data.length;
++X){var g=c.data[X];
if(isNaN(g)){g=0
}l[X]-=g
}}this.dirty=false;
return this
}})
})()
};