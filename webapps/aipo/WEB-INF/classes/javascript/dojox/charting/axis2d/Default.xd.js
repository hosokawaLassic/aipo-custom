dojo._xdResourceLoaded({depends:[["provide","dojox.charting.axis2d.Default"],["require","dojox.charting.scaler"],["require","dojox.charting.axis2d.common"],["require","dojox.charting.axis2d.Base"],["require","dojo.colors"],["require","dojox.gfx"],["require","dojox.lang.functional"],["require","dojox.lang.utils"]],defineResource:function(B){if(!B._hasResource["dojox.charting.axis2d.Default"]){B._hasResource["dojox.charting.axis2d.Default"]=true;
B.provide("dojox.charting.axis2d.Default");
B.require("dojox.charting.scaler");
B.require("dojox.charting.axis2d.common");
B.require("dojox.charting.axis2d.Base");
B.require("dojo.colors");
B.require("dojox.gfx");
B.require("dojox.lang.functional");
B.require("dojox.lang.utils");
(function(){var L=dojox.charting,A=dojox.lang.functional,K=dojox.lang.utils,J=dojox.gfx,I=4,M=0.8;
var N=function(C,D){return Math.abs(C-D)<=0.000001*(Math.abs(C)+Math.abs(D))
};
B.declare("dojox.charting.axis2d.Default",dojox.charting.axis2d.Base,{defaultParams:{vertical:false,fixUpper:"none",fixLower:"none",natural:false,leftBottom:true,includeZero:false,fixed:true,majorLabels:true,minorTicks:true,minorLabels:true,microTicks:false,htmlLabels:true},optionalParams:{min:0,max:1,majorTickStep:4,minorTickStep:2,microTickStep:1,labels:[],stroke:{},majorTick:{},minorTick:{},font:"",fontColor:""},constructor:function(C,D){this.opt=B.clone(this.defaultParams);
K.updateWithObject(this.opt,D);
K.updateWithPattern(this.opt,D,this.optionalParams)
},dependOnData:function(){return !("min" in this.opt)||!("max" in this.opt)
},clear:function(){delete this.scaler;
this.dirty=true;
return this
},initialized:function(){return"scaler" in this
},calculate:function(W,E,D,H){if(this.initialized()){return this
}this.labels="labels" in this.opt?this.opt.labels:H;
if("min" in this.opt){W=this.opt.min
}if("max" in this.opt){E=this.opt.max
}if(this.opt.includeZero){if(W>0){W=0
}if(E<0){E=0
}}var X=0,V=this.chart.theme.axis,F="font" in this.opt?this.opt.font:V.font,C=F?J.normalizedLength(J.splitFontString(F).size):0;
if(this.vertical){if(C){X=C+I
}}else{if(C){var G=Math.ceil(Math.log(Math.max(Math.abs(W),Math.abs(E)))/Math.LN10);
if(W<0||E<0){++G
}var T=Math.floor(Math.log(E-W)/Math.LN10);
if(T>0){G+=T
}if(this.labels){G=A.foldl(A.map(this.labels,"x.text.length"),"Math.max(a, b)",G)
}X=Math.floor(C*G*M)+I
}}var U={fixUpper:this.opt.fixUpper,fixLower:this.opt.fixLower,natural:this.opt.natural};
if("majorTickStep" in this.opt){U.majorTick=this.opt.majorTickStep
}if("minorTickStep" in this.opt){U.minorTick=this.opt.minorTickStep
}if("microTickStep" in this.opt){U.microTick=this.opt.microTickStep
}this.scaler=dojox.charting.scaler(W,E,D,U);
this.scaler.minMinorStep=X;
return this
},getScaler:function(){return this.scaler
},getOffsets:function(){var b={l:0,r:0,t:0,b:0};
var a=0,Z=this.chart.theme.axis,H="font" in this.opt?this.opt.font:Z.font,E="majorTick" in this.opt?this.opt.majorTick:Z.majorTick,Y="minorTick" in this.opt?this.opt.minorTick:Z.minorTick,C=H?J.normalizedLength(J.splitFontString(H).size):0;
if(this.vertical){if(C){var D=this.scaler,F=this._getLabel(D.major.start,D.major.prec).length,G=this._getLabel(D.major.start+D.major.count*D.major.tick,D.major.prec).length,V=this._getLabel(D.minor.start,D.minor.prec).length,W=this._getLabel(D.minor.start+D.minor.count*D.minor.tick,D.minor.prec).length,X=Math.max(F,G,V,W);
if(this.labels){X=A.foldl(A.map(this.labels,"x.text.length"),"Math.max(a, b)",X)
}a=Math.floor(C*X*M)+I
}a+=I+Math.max(E.length,Y.length);
b[this.opt.leftBottom?"l":"r"]=a;
b.t=b.b=C/2
}else{if(C){a=C+I
}a+=I+Math.max(E.length,Y.length);
b[this.opt.leftBottom?"b":"t"]=a;
if(C){var D=this.scaler,F=this._getLabel(D.major.start,D.major.prec).length,G=this._getLabel(D.major.start+D.major.count*D.major.tick,D.major.prec).length,V=this._getLabel(D.minor.start,D.minor.prec).length,W=this._getLabel(D.minor.start+D.minor.count*D.minor.tick,D.minor.prec).length,X=Math.max(F,G,V,W);
if(this.labels){X=A.foldl(A.map(this.labels,"x.text.length"),"Math.max(a, b)",X)
}b.l=b.r=Math.floor(C*X*M)/2
}}return b
},render:function(AC,n){if(!this.dirty){return this
}var p,AD,k,u,AB,v,c=this.chart.theme.axis,w="stroke" in this.opt?this.opt.stroke:c.stroke,G="majorTick" in this.opt?this.opt.majorTick:c.majorTick,q="minorTick" in this.opt?this.opt.minorTick:c.minorTick,x="font" in this.opt?this.opt.font:c.font,t="fontColor" in this.opt?this.opt.fontColor:c.fontColor,D=Math.max(G.length,q.length),E=x?J.normalizedLength(J.splitFontString(x).size):0;
if(this.vertical){p={y:AC.height-n.b};
AD={y:n.t};
k={x:0,y:-1};
if(this.opt.leftBottom){p.x=AD.x=n.l;
u={x:-1,y:0};
v="end"
}else{p.x=AD.x=AC.width-n.r;
u={x:1,y:0};
v="start"
}AB={x:u.x*(D+I),y:E*0.4}
}else{p={x:n.l};
AD={x:AC.width-n.r};
k={x:1,y:0};
v="middle";
if(this.opt.leftBottom){p.y=AD.y=AC.height-n.b;
u={x:0,y:1};
AB={y:D+I+E}
}else{p.y=AD.y=n.t;
u={x:0,y:-1};
AB={y:-D-I}
}AB.x=0
}this.cleanGroup();
var F=this.group,y=this.scaler,m,C,AA=y.major.start,r=y.minor.start,s=y.micro.start;
F.createLine({x1:p.x,y1:p.y,x2:AD.x,y2:AD.y}).setStroke(w);
if(this.opt.microTicks&&y.micro.tick){m=y.micro.tick,C=s
}else{if(this.opt.minorTicks&&y.minor.tick){m=y.minor.tick,C=r
}else{if(y.major.tick){m=y.major.tick,C=AA
}else{return this
}}}while(C<=y.bounds.upper+1/y.scale){var o=(C-y.bounds.lower)*y.scale,H=p.x+k.x*o,l=p.y+k.y*o;
if(Math.abs(AA-C)<m/2){F.createLine({x1:H,y1:l,x2:H+u.x*G.length,y2:l+u.y*G.length}).setStroke(G);
if(this.opt.majorLabels){var z=L.axis2d.common.createText[this.opt.htmlLabels?"html":"gfx"](this.chart,F,H+AB.x,l+AB.y,v,this._getLabel(AA,y.major.prec),x,t);
if(this.opt.htmlLabels){this.htmlElements.push(z)
}}AA+=y.major.tick;
r+=y.minor.tick;
s+=y.micro.tick
}else{if(Math.abs(r-C)<m/2){if(this.opt.minorTicks){F.createLine({x1:H,y1:l,x2:H+u.x*q.length,y2:l+u.y*q.length}).setStroke(q);
if(this.opt.minorLabels&&(y.minMinorStep<=y.minor.tick*y.scale)){var z=L.axis2d.common.createText[this.opt.htmlLabels?"html":"gfx"](this.chart,F,H+AB.x,l+AB.y,v,this._getLabel(r,y.minor.prec),x,t);
if(this.opt.htmlLabels){this.htmlElements.push(z)
}}}r+=y.minor.tick;
s+=y.micro.tick
}else{if(this.opt.microTicks){F.createLine({x1:H,y1:l,x2:H+u.x*q.length,y2:l+u.y*q.length}).setStroke(q)
}s+=y.micro.tick
}}C+=m
}this.dirty=false;
return this
},_getLabel:function(H,E){if(this.opt.labels){var F=this.opt.labels,P=0,C=F.length;
while(P<C){var D=Math.floor((P+C)/2),G=F[D].value;
if(G<H){P=D+1
}else{C=D
}}if(P<F.length&&N(F[P].value,H)){return F[P].text
}--P;
if(P<F.length&&N(F[P].value,H)){return F[P].text
}P+=2;
if(P<F.length&&N(F[P].value,H)){return F[P].text
}}return this.opt.fixed?H.toFixed(E<0?-E:0):H.toString()
}})
})()
}}});