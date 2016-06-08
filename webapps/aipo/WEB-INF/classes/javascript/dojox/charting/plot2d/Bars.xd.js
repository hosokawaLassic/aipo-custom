dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.Bars"],["require","dojox.charting.plot2d.common"],["require","dojox.charting.plot2d.Base"],["require","dojox.lang.utils"],["require","dojox.lang.functional"]],defineResource:function(B){if(!B._hasResource["dojox.charting.plot2d.Bars"]){B._hasResource["dojox.charting.plot2d.Bars"]=true;
B.provide("dojox.charting.plot2d.Bars");
B.require("dojox.charting.plot2d.common");
B.require("dojox.charting.plot2d.Base");
B.require("dojox.lang.utils");
B.require("dojox.lang.functional");
(function(){var A=dojox.lang.functional,G=dojox.lang.utils,H=dojox.charting.plot2d.common,F=A.lambda("item.purgeGroup()");
B.declare("dojox.charting.plot2d.Bars",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",gap:0,shadows:null},optionalParams:{},constructor:function(C,D){this.opt=B.clone(this.defaultParams);
G.updateWithObject(this.opt,D);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis
},calculateAxes:function(C){var D=H.collectSimpleStats(this.series),E;
D.hmin-=0.5;
D.hmax+=0.5;
E=D.hmin,D.hmin=D.vmin,D.vmin=E;
E=D.hmax,D.hmax=D.vmax,D.vmax=E;
this._calc(C,D);
return this
},render:function(b,o){if(this.dirty){B.forEach(this.series,F);
this.cleanGroup();
var j=this.group;
A.forEachReversed(this.series,function(I){I.cleanGroup(j)
})
}var k=this.chart.theme,d,n,c,D,f=this.opt.gap<this._vScaler.scale/3?this.opt.gap:0;
for(var Z=this.series.length-1;
Z>=0;
--Z){var i=this.series[Z];
if(!this.dirty&&!i.dirty){continue
}i.cleanGroup();
var j=i.group;
if(!i.fill||!i.stroke){d=i.dyn.color=new B.Color(k.next("color"))
}n=i.stroke?i.stroke:H.augmentStroke(k.series.stroke,d);
c=i.fill?i.fill:H.augmentFill(k.series.fill,d);
var h=Math.max(0,this._hScaler.bounds.lower),E=o.l+this._hScaler.scale*(h-this._hScaler.bounds.lower),C=b.height-o.b-this._vScaler.scale*(1.5-this._vScaler.bounds.lower)+f;
for(var a=0;
a<i.data.length;
++a){var l=i.data[a],e=this._hScaler.scale*(l-h),g=this._vScaler.scale-2*f,m=Math.abs(e);
if(m>=1&&g>=1){var p=j.createRect({x:E+(e<0?e:0),y:C-this._vScaler.scale*a,width:m,height:g}).setFill(c).setStroke(n);
i.dyn.fill=p.getFill();
i.dyn.stroke=p.getStroke()
}}i.dirty=false
}this.dirty=false;
return this
}})
})()
}}});