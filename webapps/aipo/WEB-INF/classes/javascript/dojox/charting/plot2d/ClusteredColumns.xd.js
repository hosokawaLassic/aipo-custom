dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.ClusteredColumns"],["require","dojox.charting.plot2d.common"],["require","dojox.charting.plot2d.Columns"],["require","dojox.lang.functional"]],defineResource:function(B){if(!B._hasResource["dojox.charting.plot2d.ClusteredColumns"]){B._hasResource["dojox.charting.plot2d.ClusteredColumns"]=true;
B.provide("dojox.charting.plot2d.ClusteredColumns");
B.require("dojox.charting.plot2d.common");
B.require("dojox.charting.plot2d.Columns");
B.require("dojox.lang.functional");
(function(){var A=dojox.lang.functional,F=dojox.charting.plot2d.common,E=A.lambda("item.purgeGroup()");
B.declare("dojox.charting.plot2d.ClusteredColumns",dojox.charting.plot2d.Columns,{render:function(d,p){if(this.dirty){B.forEach(this.series,E);
this.cleanGroup();
var l=this.group;
A.forEachReversed(this.series,function(G){G.cleanGroup(l)
})
}var m=this.chart.theme,f,o,e,D,h=this.opt.gap<this._hScaler.scale/3?this.opt.gap:0,r=(this._hScaler.scale-2*h)/this.series.length;
for(var b=0;
b<this.series.length;
++b){var k=this.series[b];
if(!this.dirty&&!k.dirty){continue
}k.cleanGroup();
var l=k.group;
if(!k.fill||!k.stroke){f=k.dyn.color=new B.Color(m.next("color"))
}o=k.stroke?k.stroke:F.augmentStroke(m.series.stroke,f);
e=k.fill?k.fill:F.augmentFill(m.series.fill,f);
var j=Math.max(0,this._vScaler.bounds.lower),Z=p.l+this._hScaler.scale*(0.5-this._hScaler.bounds.lower)+h+r*b,C=d.height-p.b-this._vScaler.scale*(j-this._vScaler.bounds.lower);
for(var c=0;
c<k.data.length;
++c){var n=k.data[c],g=r,i=this._vScaler.scale*(n-j),a=Math.abs(i);
if(g>=1&&a>=1){var q=l.createRect({x:Z+this._hScaler.scale*c,y:C-(i<0?0:i),width:g,height:a}).setFill(e).setStroke(o);
k.dyn.fill=q.getFill();
k.dyn.stroke=q.getStroke()
}}k.dirty=false
}this.dirty=false;
return this
}})
})()
}}});