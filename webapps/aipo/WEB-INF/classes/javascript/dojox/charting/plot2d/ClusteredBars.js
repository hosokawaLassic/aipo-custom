if(!dojo._hasResource["dojox.charting.plot2d.ClusteredBars"]){dojo._hasResource["dojox.charting.plot2d.ClusteredBars"]=true;
dojo.provide("dojox.charting.plot2d.ClusteredBars");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.charting.plot2d.Bars");
dojo.require("dojox.lang.functional");
(function(){var E=dojox.lang.functional,D=dojox.charting.plot2d.common,F=E.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.ClusteredBars",dojox.charting.plot2d.Bars,{render:function(a,n){if(this.dirty){dojo.forEach(this.series,F);
this.cleanGroup();
var i=this.group;
E.forEachReversed(this.series,function(G){G.cleanGroup(i)
})
}var j=this.chart.theme,c,m,b,B,e=this.opt.gap<this._vScaler.scale/3?this.opt.gap:0,p=(this._vScaler.scale-2*e)/this.series.length;
for(var Y=this.series.length-1;
Y>=0;
--Y){var h=this.series[Y];
if(!this.dirty&&!h.dirty){continue
}h.cleanGroup();
var i=h.group;
if(!h.fill||!h.stroke){c=h.dyn.color=new dojo.Color(j.next("color"))
}m=h.stroke?h.stroke:D.augmentStroke(j.series.stroke,c);
b=h.fill?h.fill:D.augmentFill(j.series.fill,c);
var g=Math.max(0,this._hScaler.bounds.lower),C=n.l+this._hScaler.scale*(g-this._hScaler.bounds.lower),A=a.height-n.b-this._vScaler.scale*(1.5-this._vScaler.bounds.lower)+e+p*(this.series.length-Y-1);
for(var Z=0;
Z<h.data.length;
++Z){var k=h.data[Z],d=this._hScaler.scale*(k-g),f=p,l=Math.abs(d);
if(l>=1&&f>=1){var o=i.createRect({x:C+(d<0?d:0),y:A-this._vScaler.scale*Z,width:l,height:f}).setFill(b).setStroke(m);
h.dyn.fill=o.getFill();
h.dyn.stroke=o.getStroke()
}}h.dirty=false
}this.dirty=false;
return this
}})
})()
};