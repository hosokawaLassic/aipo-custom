if(!dojo._hasResource["dojox.charting.plot2d.Bars"]){dojo._hasResource["dojox.charting.plot2d.Bars"]=true;
dojo.provide("dojox.charting.plot2d.Bars");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.charting.plot2d.Base");
dojo.require("dojox.lang.utils");
dojo.require("dojox.lang.functional");
(function(){var F=dojox.lang.functional,H=dojox.lang.utils,E=dojox.charting.plot2d.common,G=F.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.Bars",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",gap:0,shadows:null},optionalParams:{},constructor:function(A,B){this.opt=dojo.clone(this.defaultParams);
H.updateWithObject(this.opt,B);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis
},calculateAxes:function(A){var B=E.collectSimpleStats(this.series),C;
B.hmin-=0.5;
B.hmax+=0.5;
C=B.hmin,B.hmin=B.vmin,B.vmin=C;
C=B.hmax,B.hmax=B.vmax,B.vmax=C;
this._calc(A,B);
return this
},render:function(Z,m){if(this.dirty){dojo.forEach(this.series,G);
this.cleanGroup();
var h=this.group;
F.forEachReversed(this.series,function(I){I.cleanGroup(h)
})
}var i=this.chart.theme,b,l,a,B,d=this.opt.gap<this._vScaler.scale/3?this.opt.gap:0;
for(var D=this.series.length-1;
D>=0;
--D){var g=this.series[D];
if(!this.dirty&&!g.dirty){continue
}g.cleanGroup();
var h=g.group;
if(!g.fill||!g.stroke){b=g.dyn.color=new dojo.Color(i.next("color"))
}l=g.stroke?g.stroke:E.augmentStroke(i.series.stroke,b);
a=g.fill?g.fill:E.augmentFill(i.series.fill,b);
var f=Math.max(0,this._hScaler.bounds.lower),C=m.l+this._hScaler.scale*(f-this._hScaler.bounds.lower),A=Z.height-m.b-this._vScaler.scale*(1.5-this._vScaler.bounds.lower)+d;
for(var Y=0;
Y<g.data.length;
++Y){var j=g.data[Y],c=this._hScaler.scale*(j-f),e=this._vScaler.scale-2*d,k=Math.abs(c);
if(k>=1&&e>=1){var n=h.createRect({x:C+(c<0?c:0),y:A-this._vScaler.scale*Y,width:k,height:e}).setFill(a).setStroke(l);
g.dyn.fill=n.getFill();
g.dyn.stroke=n.getStroke()
}}g.dirty=false
}this.dirty=false;
return this
}})
})()
};