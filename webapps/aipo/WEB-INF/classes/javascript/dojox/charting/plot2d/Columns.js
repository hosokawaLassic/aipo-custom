if(!dojo._hasResource["dojox.charting.plot2d.Columns"]){dojo._hasResource["dojox.charting.plot2d.Columns"]=true;
dojo.provide("dojox.charting.plot2d.Columns");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.charting.plot2d.Base");
dojo.require("dojox.lang.utils");
dojo.require("dojox.lang.functional");
(function(){var F=dojox.lang.functional,H=dojox.lang.utils,E=dojox.charting.plot2d.common,G=F.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.Columns",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",gap:0,shadows:null},optionalParams:{},constructor:function(A,B){this.opt=dojo.clone(this.defaultParams);
H.updateWithObject(this.opt,B);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis
},calculateAxes:function(A){var B=E.collectSimpleStats(this.series);
B.hmin-=0.5;
B.hmax+=0.5;
this._calc(A,B);
return this
},render:function(b,n){if(this.dirty){dojo.forEach(this.series,G);
this.cleanGroup();
var j=this.group;
F.forEachReversed(this.series,function(I){I.cleanGroup(j)
})
}var k=this.chart.theme,d,m,c,B,f=this.opt.gap<this._hScaler.scale/3?this.opt.gap:0;
for(var Z=this.series.length-1;
Z>=0;
--Z){var i=this.series[Z];
if(!this.dirty&&!i.dirty){continue
}i.cleanGroup();
var j=i.group;
if(!i.fill||!i.stroke){d=i.dyn.color=new dojo.Color(k.next("color"))
}m=i.stroke?i.stroke:E.augmentStroke(k.series.stroke,d);
c=i.fill?i.fill:E.augmentFill(k.series.fill,d);
var h=Math.max(0,this._vScaler.bounds.lower),C=n.l+this._hScaler.scale*(0.5-this._hScaler.bounds.lower)+f,A=b.height-n.b-this._vScaler.scale*(h-this._vScaler.bounds.lower);
for(var a=0;
a<i.data.length;
++a){var l=i.data[a],e=this._hScaler.scale-2*f,g=this._vScaler.scale*(l-h),D=Math.abs(g);
if(e>=1&&D>=1){var o={x:C+this._hScaler.scale*a,y:A-(g<0?0:g),width:e,height:D},p=j.createRect(o).setFill(c).setStroke(m);
i.dyn.fill=p.getFill();
i.dyn.stroke=p.getStroke()
}}i.dirty=false
}this.dirty=false;
return this
}})
})()
};