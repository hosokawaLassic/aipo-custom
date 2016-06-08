if(!dojo._hasResource["dojox.gfx.path"]){dojo._hasResource["dojox.gfx.path"]=true;
dojo.provide("dojox.gfx.path");
dojo.require("dojox.gfx.shape");
dojo.declare("dojox.gfx.path.Path",dojox.gfx.Shape,{constructor:function(B){this.shape=dojo.clone(dojox.gfx.defaultPath);
this.segments=[];
this.absolute=true;
this.last={};
this.rawNode=B
},setAbsoluteMode:function(B){this.absolute=typeof B=="string"?(B=="absolute"):B;
return this
},getAbsoluteMode:function(){return this.absolute
},getBoundingBox:function(){return(this.bbox&&("l" in this.bbox))?{x:this.bbox.l,y:this.bbox.t,width:this.bbox.r-this.bbox.l,height:this.bbox.b-this.bbox.t}:null
},getLastPosition:function(){return"x" in this.last?this.last:null
},_updateBBox:function(C,D){if(this.bbox&&("l" in this.bbox)){if(this.bbox.l>C){this.bbox.l=C
}if(this.bbox.r<C){this.bbox.r=C
}if(this.bbox.t>D){this.bbox.t=D
}if(this.bbox.b<D){this.bbox.b=D
}}else{this.bbox={l:C,b:D,r:C,t:D}
}},_updateWithSegment:function(L){var I=L.args,N=I.length;
switch(L.action){case"M":case"L":case"C":case"S":case"Q":case"T":for(var M=0;
M<N;
M+=2){this._updateBBox(I[M],I[M+1])
}this.last.x=I[N-2];
this.last.y=I[N-1];
this.absolute=true;
break;
case"H":for(var M=0;
M<N;
++M){this._updateBBox(I[M],this.last.y)
}this.last.x=I[N-1];
this.absolute=true;
break;
case"V":for(var M=0;
M<N;
++M){this._updateBBox(this.last.x,I[M])
}this.last.y=I[N-1];
this.absolute=true;
break;
case"m":var J=0;
if(!("x" in this.last)){this._updateBBox(this.last.x=I[0],this.last.y=I[1]);
J=2
}for(var M=J;
M<N;
M+=2){this._updateBBox(this.last.x+=I[M],this.last.y+=I[M+1])
}this.absolute=false;
break;
case"l":case"t":for(var M=0;
M<N;
M+=2){this._updateBBox(this.last.x+=I[M],this.last.y+=I[M+1])
}this.absolute=false;
break;
case"h":for(var M=0;
M<N;
++M){this._updateBBox(this.last.x+=I[M],this.last.y)
}this.absolute=false;
break;
case"v":for(var M=0;
M<N;
++M){this._updateBBox(this.last.x,this.last.y+=I[M])
}this.absolute=false;
break;
case"c":for(var M=0;
M<N;
M+=6){this._updateBBox(this.last.x+I[M],this.last.y+I[M+1]);
this._updateBBox(this.last.x+I[M+2],this.last.y+I[M+3]);
this._updateBBox(this.last.x+=I[M+4],this.last.y+=I[M+5])
}this.absolute=false;
break;
case"s":case"q":for(var M=0;
M<N;
M+=4){this._updateBBox(this.last.x+I[M],this.last.y+I[M+1]);
this._updateBBox(this.last.x+=I[M+2],this.last.y+=I[M+3])
}this.absolute=false;
break;
case"A":for(var M=0;
M<N;
M+=7){this._updateBBox(I[M+5],I[M+6])
}this.last.x=I[N-2];
this.last.y=I[N-1];
this.absolute=true;
break;
case"a":for(var M=0;
M<N;
M+=7){this._updateBBox(this.last.x+=I[M+5],this.last.y+=I[M+6])
}this.absolute=false;
break
}var K=[L.action];
for(var M=0;
M<N;
++M){K.push(dojox.gfx.formatNumber(I[M],true))
}if(typeof this.shape.path=="string"){this.shape.path+=K.join("")
}else{var N=K.length,H=this.shape.path;
for(var M=0;
M<N;
++M){H.push(K[M])
}}},_validSegments:{m:2,l:2,h:1,v:1,c:6,s:4,q:4,t:2,a:7,z:0},_pushSegment:function(G,E){var F=this._validSegments[G.toLowerCase()];
if(typeof F=="number"){if(F){if(E.length>=F){var H={action:G,args:E.slice(0,E.length-E.length%F)};
this.segments.push(H);
this._updateWithSegment(H)
}}else{var H={action:G,args:[]};
this.segments.push(H);
this._updateWithSegment(H)
}}},_collectArgs:function(F,E){for(var G=0;
G<E.length;
++G){var H=E[G];
if(typeof H=="boolean"){F.push(H?1:0)
}else{if(typeof H=="number"){F.push(H)
}else{if(H instanceof Array){this._collectArgs(F,H)
}else{if("x" in H&&"y" in H){F.push(H.x,H.y)
}}}}}},moveTo:function(){var B=[];
this._collectArgs(B,arguments);
this._pushSegment(this.absolute?"M":"m",B);
return this
},lineTo:function(){var B=[];
this._collectArgs(B,arguments);
this._pushSegment(this.absolute?"L":"l",B);
return this
},hLineTo:function(){var B=[];
this._collectArgs(B,arguments);
this._pushSegment(this.absolute?"H":"h",B);
return this
},vLineTo:function(){var B=[];
this._collectArgs(B,arguments);
this._pushSegment(this.absolute?"V":"v",B);
return this
},curveTo:function(){var B=[];
this._collectArgs(B,arguments);
this._pushSegment(this.absolute?"C":"c",B);
return this
},smoothCurveTo:function(){var B=[];
this._collectArgs(B,arguments);
this._pushSegment(this.absolute?"S":"s",B);
return this
},qCurveTo:function(){var B=[];
this._collectArgs(B,arguments);
this._pushSegment(this.absolute?"Q":"q",B);
return this
},qSmoothCurveTo:function(){var B=[];
this._collectArgs(B,arguments);
this._pushSegment(this.absolute?"T":"t",B);
return this
},arcTo:function(){var B=[];
this._collectArgs(B,arguments);
this._pushSegment(this.absolute?"A":"a",B);
return this
},closePath:function(){this._pushSegment("Z",[]);
return this
},_setPath:function(J){var K=dojo.isArray(J)?J:J.match(dojox.gfx.pathSvgRegExp);
this.segments=[];
this.absolute=true;
this.bbox={};
this.last={};
if(!K){return 
}var L="",O=[],P=K.length;
for(var M=0;
M<P;
++M){var N=K[M],I=parseFloat(N);
if(isNaN(I)){if(L){this._pushSegment(L,O)
}O=[];
L=N
}else{O.push(I)
}}this._pushSegment(L,O)
},setShape:function(C){dojox.gfx.Shape.prototype.setShape.call(this,typeof C=="string"?{path:C}:C);
var D=this.shape.path;
this.shape.path=[];
this._setPath(D);
this.shape.path=this.shape.path.join("");
return this
},_2PI:Math.PI*2});
dojo.declare("dojox.gfx.path.TextPath",dojox.gfx.path.Path,{constructor:function(B){if(!("text" in this)){this.text=dojo.clone(dojox.gfx.defaultTextPath)
}if(!("fontStyle" in this)){this.fontStyle=dojo.clone(dojox.gfx.defaultFont)
}},setText:function(B){this.text=dojox.gfx.makeParameters(this.text,typeof B=="string"?{text:B}:B);
this._setText();
return this
},setFont:function(B){this.fontStyle=typeof B=="string"?dojox.gfx.splitFontString(B):dojox.gfx.makeParameters(dojox.gfx.defaultFont,B);
this._setFont();
return this
}})
};