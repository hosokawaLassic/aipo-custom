dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.ClusteredBars"],["require","dojox.charting.plot2d.common"],["require","dojox.charting.plot2d.Bars"],["require","dojox.lang.functional"]],defineResource:function(B){if(!B._hasResource["dojox.charting.plot2d.ClusteredBars"]){B._hasResource["dojox.charting.plot2d.ClusteredBars"]=true;
B.provide("dojox.charting.plot2d.ClusteredBars");
B.require("dojox.charting.plot2d.common");
B.require("dojox.charting.plot2d.Bars");
B.require("dojox.lang.functional");
(function(){var A=dojox.lang.functional,F=dojox.charting.plot2d.common,E=A.lambda("item.purgeGroup()");
B.declare("dojox.charting.plot2d.ClusteredBars",dojox.charting.plot2d.Bars,{render:function(c,p){if(this.dirty){B.forEach(this.series,E);
this.cleanGroup();
var k=this.group;
A.forEachReversed(this.series,function(G){G.cleanGroup(k)
})
}var l=this.chart.theme,e,o,d,D,g=this.opt.gap<this._vScaler.scale/3?this.opt.gap:0,r=(this._vScaler.scale-2*g)/this.series.length;
for(var a=this.series.length-1;
a>=0;
--a){var j=this.series[a];
if(!this.dirty&&!j.dirty){continue
}j.cleanGroup();
var k=j.group;
if(!j.fill||!j.stroke){e=j.dyn.color=new B.Color(l.next("color"))
}o=j.stroke?j.stroke:F.augmentStroke(l.series.stroke,e);
d=j.fill?j.fill:F.augmentFill(l.series.fill,e);
var i=Math.max(0,this._hScaler.bounds.lower),Z=p.l+this._hScaler.scale*(i-this._hScaler.bounds.lower),C=c.height-p.b-this._vScaler.scale*(1.5-this._vScaler.bounds.lower)+g+r*(this.series.length-a-1);
for(var b=0;
b<j.data.length;
++b){var m=j.data[b],f=this._hScaler.scale*(m-i),h=r,n=Math.abs(f);
if(n>=1&&h>=1){var q=k.createRect({x:Z+(f<0?f:0),y:C-this._vScaler.scale*b,width:n,height:h}).setFill(d).setStroke(o);
j.dyn.fill=q.getFill();
j.dyn.stroke=q.getStroke()
}}j.dirty=false
}this.dirty=false;
return this
}})
})()
}}});