if(!dojo._hasResource["dojox.charting.axis2d.Default"]){dojo._hasResource["dojox.charting.axis2d.Default"]=true;
dojo.provide("dojox.charting.axis2d.Default");
dojo.require("dojox.charting.scaler");
dojo.require("dojox.charting.axis2d.common");
dojo.require("dojox.charting.axis2d.Base");
dojo.require("dojo.colors");
dojo.require("dojox.gfx");
dojo.require("dojox.lang.functional");
dojo.require("dojox.lang.utils");
(function(){var M=dojox.charting,I=dojox.lang.functional,L=dojox.lang.utils,K=dojox.gfx,J=4,N=0.8;
var H=function(A,B){return Math.abs(A-B)<=0.000001*(Math.abs(A)+Math.abs(B))
};
dojo.declare("dojox.charting.axis2d.Default",dojox.charting.axis2d.Base,{defaultParams:{vertical:false,fixUpper:"none",fixLower:"none",natural:false,leftBottom:true,includeZero:false,fixed:true,majorLabels:true,minorTicks:true,minorLabels:true,microTicks:false,htmlLabels:true},optionalParams:{min:0,max:1,majorTickStep:4,minorTickStep:2,microTickStep:1,labels:[],stroke:{},majorTick:{},minorTick:{},font:"",fontColor:""},constructor:function(A,B){this.opt=dojo.clone(this.defaultParams);
L.updateWithObject(this.opt,B);
L.updateWithPattern(this.opt,B,this.optionalParams)
},dependOnData:function(){return !("min" in this.opt)||!("max" in this.opt)
},clear:function(){delete this.scaler;
this.dirty=true;
return this
},initialized:function(){return"scaler" in this
},calculate:function(U,C,B,F){if(this.initialized()){return this
}this.labels="labels" in this.opt?this.opt.labels:F;
if("min" in this.opt){U=this.opt.min
}if("max" in this.opt){C=this.opt.max
}if(this.opt.includeZero){if(U>0){U=0
}if(C<0){C=0
}}var V=0,T=this.chart.theme.axis,D="font" in this.opt?this.opt.font:T.font,A=D?K.normalizedLength(K.splitFontString(D).size):0;
if(this.vertical){if(A){V=A+J
}}else{if(A){var E=Math.ceil(Math.log(Math.max(Math.abs(U),Math.abs(C)))/Math.LN10);
if(U<0||C<0){++E
}var G=Math.floor(Math.log(C-U)/Math.LN10);
if(G>0){E+=G
}if(this.labels){E=I.foldl(I.map(this.labels,"x.text.length"),"Math.max(a, b)",E)
}V=Math.floor(A*E*N)+J
}}var S={fixUpper:this.opt.fixUpper,fixLower:this.opt.fixLower,natural:this.opt.natural};
if("majorTickStep" in this.opt){S.majorTick=this.opt.majorTickStep
}if("minorTickStep" in this.opt){S.minorTick=this.opt.minorTickStep
}if("microTickStep" in this.opt){S.microTick=this.opt.microTickStep
}this.scaler=dojox.charting.scaler(U,C,B,S);
this.scaler.minMinorStep=V;
return this
},getScaler:function(){return this.scaler
},getOffsets:function(){var Z={l:0,r:0,t:0,b:0};
var Y=0,X=this.chart.theme.axis,F="font" in this.opt?this.opt.font:X.font,C="majorTick" in this.opt?this.opt.majorTick:X.majorTick,W="minorTick" in this.opt?this.opt.minorTick:X.minorTick,A=F?K.normalizedLength(K.splitFontString(F).size):0;
if(this.vertical){if(A){var B=this.scaler,D=this._getLabel(B.major.start,B.major.prec).length,E=this._getLabel(B.major.start+B.major.count*B.major.tick,B.major.prec).length,G=this._getLabel(B.minor.start,B.minor.prec).length,U=this._getLabel(B.minor.start+B.minor.count*B.minor.tick,B.minor.prec).length,V=Math.max(D,E,G,U);
if(this.labels){V=I.foldl(I.map(this.labels,"x.text.length"),"Math.max(a, b)",V)
}Y=Math.floor(A*V*N)+J
}Y+=J+Math.max(C.length,W.length);
Z[this.opt.leftBottom?"l":"r"]=Y;
Z.t=Z.b=A/2
}else{if(A){Y=A+J
}Y+=J+Math.max(C.length,W.length);
Z[this.opt.leftBottom?"b":"t"]=Y;
if(A){var B=this.scaler,D=this._getLabel(B.major.start,B.major.prec).length,E=this._getLabel(B.major.start+B.major.count*B.major.tick,B.major.prec).length,G=this._getLabel(B.minor.start,B.minor.prec).length,U=this._getLabel(B.minor.start+B.minor.count*B.minor.tick,B.minor.prec).length,V=Math.max(D,E,G,U);
if(this.labels){V=I.foldl(I.map(this.labels,"x.text.length"),"Math.max(a, b)",V)
}Z.l=Z.r=Math.floor(A*V*N)/2
}}return Z
},render:function(AB,m){if(!this.dirty){return this
}var o,A,j,t,AA,u,c=this.chart.theme.axis,v="stroke" in this.opt?this.opt.stroke:c.stroke,F="majorTick" in this.opt?this.opt.majorTick:c.majorTick,p="minorTick" in this.opt?this.opt.minorTick:c.minorTick,w="font" in this.opt?this.opt.font:c.font,s="fontColor" in this.opt?this.opt.fontColor:c.fontColor,C=Math.max(F.length,p.length),D=w?K.normalizedLength(K.splitFontString(w).size):0;
if(this.vertical){o={y:AB.height-m.b};
A={y:m.t};
j={x:0,y:-1};
if(this.opt.leftBottom){o.x=A.x=m.l;
t={x:-1,y:0};
u="end"
}else{o.x=A.x=AB.width-m.r;
t={x:1,y:0};
u="start"
}AA={x:t.x*(C+J),y:D*0.4}
}else{o={x:m.l};
A={x:AB.width-m.r};
j={x:1,y:0};
u="middle";
if(this.opt.leftBottom){o.y=A.y=AB.height-m.b;
t={x:0,y:1};
AA={y:C+J+D}
}else{o.y=A.y=m.t;
t={x:0,y:-1};
AA={y:-C-J}
}AA.x=0
}this.cleanGroup();
var E=this.group,x=this.scaler,l,B,z=x.major.start,q=x.minor.start,r=x.micro.start;
E.createLine({x1:o.x,y1:o.y,x2:A.x,y2:A.y}).setStroke(v);
if(this.opt.microTicks&&x.micro.tick){l=x.micro.tick,B=r
}else{if(this.opt.minorTicks&&x.minor.tick){l=x.minor.tick,B=q
}else{if(x.major.tick){l=x.major.tick,B=z
}else{return this
}}}while(B<=x.bounds.upper+1/x.scale){var n=(B-x.bounds.lower)*x.scale,G=o.x+j.x*n,k=o.y+j.y*n;
if(Math.abs(z-B)<l/2){E.createLine({x1:G,y1:k,x2:G+t.x*F.length,y2:k+t.y*F.length}).setStroke(F);
if(this.opt.majorLabels){var y=M.axis2d.common.createText[this.opt.htmlLabels?"html":"gfx"](this.chart,E,G+AA.x,k+AA.y,u,this._getLabel(z,x.major.prec),w,s);
if(this.opt.htmlLabels){this.htmlElements.push(y)
}}z+=x.major.tick;
q+=x.minor.tick;
r+=x.micro.tick
}else{if(Math.abs(q-B)<l/2){if(this.opt.minorTicks){E.createLine({x1:G,y1:k,x2:G+t.x*p.length,y2:k+t.y*p.length}).setStroke(p);
if(this.opt.minorLabels&&(x.minMinorStep<=x.minor.tick*x.scale)){var y=M.axis2d.common.createText[this.opt.htmlLabels?"html":"gfx"](this.chart,E,G+AA.x,k+AA.y,u,this._getLabel(q,x.minor.prec),w,s);
if(this.opt.htmlLabels){this.htmlElements.push(y)
}}}q+=x.minor.tick;
r+=x.micro.tick
}else{if(this.opt.microTicks){E.createLine({x1:G,y1:k,x2:G+t.x*p.length,y2:k+t.y*p.length}).setStroke(p)
}r+=x.micro.tick
}}B+=l
}this.dirty=false;
return this
},_getLabel:function(G,D){if(this.opt.labels){var E=this.opt.labels,A=0,B=E.length;
while(A<B){var C=Math.floor((A+B)/2),F=E[C].value;
if(F<G){A=C+1
}else{B=C
}}if(A<E.length&&H(E[A].value,G)){return E[A].text
}--A;
if(A<E.length&&H(E[A].value,G)){return E[A].text
}A+=2;
if(A<E.length&&H(E[A].value,G)){return E[A].text
}}return this.opt.fixed?G.toFixed(D<0?-D:0):G.toString()
}})
})()
};