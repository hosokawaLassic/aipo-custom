if(!dojo._hasResource["dojox.charting.plot2d.ClusteredColumns"]){dojo._hasResource["dojox.charting.plot2d.ClusteredColumns"]=true;
dojo.provide("dojox.charting.plot2d.ClusteredColumns");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.charting.plot2d.Columns");
dojo.require("dojox.lang.functional");
(function(){var E=dojox.lang.functional,D=dojox.charting.plot2d.common,F=E.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.ClusteredColumns",dojox.charting.plot2d.Columns,{render:function(b,n){if(this.dirty){dojo.forEach(this.series,F);
this.cleanGroup();
var j=this.group;
E.forEachReversed(this.series,function(G){G.cleanGroup(j)
})
}var k=this.chart.theme,d,m,c,B,f=this.opt.gap<this._hScaler.scale/3?this.opt.gap:0,p=(this._hScaler.scale-2*f)/this.series.length;
for(var Z=0;
Z<this.series.length;
++Z){var i=this.series[Z];
if(!this.dirty&&!i.dirty){continue
}i.cleanGroup();
var j=i.group;
if(!i.fill||!i.stroke){d=i.dyn.color=new dojo.Color(k.next("color"))
}m=i.stroke?i.stroke:D.augmentStroke(k.series.stroke,d);
c=i.fill?i.fill:D.augmentFill(k.series.fill,d);
var h=Math.max(0,this._vScaler.bounds.lower),C=n.l+this._hScaler.scale*(0.5-this._hScaler.bounds.lower)+f+p*Z,A=b.height-n.b-this._vScaler.scale*(h-this._vScaler.bounds.lower);
for(var a=0;
a<i.data.length;
++a){var l=i.data[a],e=p,g=this._vScaler.scale*(l-h),Y=Math.abs(g);
if(e>=1&&Y>=1){var o=j.createRect({x:C+this._hScaler.scale*a,y:A-(g<0?0:g),width:e,height:Y}).setFill(c).setStroke(m);
i.dyn.fill=o.getFill();
i.dyn.stroke=o.getStroke()
}}i.dirty=false
}this.dirty=false;
return this
}})
})()
};