dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.Columns"],["require","dojox.charting.plot2d.common"],["require","dojox.charting.plot2d.Base"],["require","dojox.lang.utils"],["require","dojox.lang.functional"]],defineResource:function(B){if(!B._hasResource["dojox.charting.plot2d.Columns"]){B._hasResource["dojox.charting.plot2d.Columns"]=true;
B.provide("dojox.charting.plot2d.Columns");
B.require("dojox.charting.plot2d.common");
B.require("dojox.charting.plot2d.Base");
B.require("dojox.lang.utils");
B.require("dojox.lang.functional");
(function(){var A=dojox.lang.functional,G=dojox.lang.utils,H=dojox.charting.plot2d.common,F=A.lambda("item.purgeGroup()");
B.declare("dojox.charting.plot2d.Columns",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",gap:0,shadows:null},optionalParams:{},constructor:function(C,D){this.opt=B.clone(this.defaultParams);
G.updateWithObject(this.opt,D);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis
},calculateAxes:function(C){var D=H.collectSimpleStats(this.series);
D.hmin-=0.5;
D.hmax+=0.5;
this._calc(C,D);
return this
},render:function(d,p){if(this.dirty){B.forEach(this.series,F);
this.cleanGroup();
var l=this.group;
A.forEachReversed(this.series,function(I){I.cleanGroup(l)
})
}var m=this.chart.theme,f,o,e,D,h=this.opt.gap<this._hScaler.scale/3?this.opt.gap:0;
for(var b=this.series.length-1;
b>=0;
--b){var k=this.series[b];
if(!this.dirty&&!k.dirty){continue
}k.cleanGroup();
var l=k.group;
if(!k.fill||!k.stroke){f=k.dyn.color=new B.Color(m.next("color"))
}o=k.stroke?k.stroke:H.augmentStroke(m.series.stroke,f);
e=k.fill?k.fill:H.augmentFill(m.series.fill,f);
var j=Math.max(0,this._vScaler.bounds.lower),E=p.l+this._hScaler.scale*(0.5-this._hScaler.bounds.lower)+h,C=d.height-p.b-this._vScaler.scale*(j-this._vScaler.bounds.lower);
for(var c=0;
c<k.data.length;
++c){var n=k.data[c],g=this._hScaler.scale-2*h,i=this._vScaler.scale*(n-j),a=Math.abs(i);
if(g>=1&&a>=1){var q={x:E+this._hScaler.scale*c,y:C-(i<0?0:i),width:g,height:a},r=l.createRect(q).setFill(e).setStroke(o);
k.dyn.fill=r.getFill();
k.dyn.stroke=r.getStroke()
}}k.dirty=false
}this.dirty=false;
return this
}})
})()
}}});