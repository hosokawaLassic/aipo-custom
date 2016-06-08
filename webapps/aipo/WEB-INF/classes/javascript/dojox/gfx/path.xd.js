dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.path"],["require","dojox.gfx.shape"]],defineResource:function(B){if(!B._hasResource["dojox.gfx.path"]){B._hasResource["dojox.gfx.path"]=true;
B.provide("dojox.gfx.path");
B.require("dojox.gfx.shape");
B.declare("dojox.gfx.path.Path",dojox.gfx.Shape,{constructor:function(A){this.shape=B.clone(dojox.gfx.defaultPath);
this.segments=[];
this.absolute=true;
this.last={};
this.rawNode=A
},setAbsoluteMode:function(A){this.absolute=typeof A=="string"?(A=="absolute"):A;
return this
},getAbsoluteMode:function(){return this.absolute
},getBoundingBox:function(){return(this.bbox&&("l" in this.bbox))?{x:this.bbox.l,y:this.bbox.t,width:this.bbox.r-this.bbox.l,height:this.bbox.b-this.bbox.t}:null
},getLastPosition:function(){return"x" in this.last?this.last:null
},_updateBBox:function(D,A){if(this.bbox&&("l" in this.bbox)){if(this.bbox.l>D){this.bbox.l=D
}if(this.bbox.r<D){this.bbox.r=D
}if(this.bbox.t>A){this.bbox.t=A
}if(this.bbox.b<A){this.bbox.b=A
}}else{this.bbox={l:D,b:A,r:D,t:A}
}},_updateWithSegment:function(K){var A=K.args,M=A.length;
switch(K.action){case"M":case"L":case"C":case"S":case"Q":case"T":for(var L=0;
L<M;
L+=2){this._updateBBox(A[L],A[L+1])
}this.last.x=A[M-2];
this.last.y=A[M-1];
this.absolute=true;
break;
case"H":for(var L=0;
L<M;
++L){this._updateBBox(A[L],this.last.y)
}this.last.x=A[M-1];
this.absolute=true;
break;
case"V":for(var L=0;
L<M;
++L){this._updateBBox(this.last.x,A[L])
}this.last.y=A[M-1];
this.absolute=true;
break;
case"m":var I=0;
if(!("x" in this.last)){this._updateBBox(this.last.x=A[0],this.last.y=A[1]);
I=2
}for(var L=I;
L<M;
L+=2){this._updateBBox(this.last.x+=A[L],this.last.y+=A[L+1])
}this.absolute=false;
break;
case"l":case"t":for(var L=0;
L<M;
L+=2){this._updateBBox(this.last.x+=A[L],this.last.y+=A[L+1])
}this.absolute=false;
break;
case"h":for(var L=0;
L<M;
++L){this._updateBBox(this.last.x+=A[L],this.last.y)
}this.absolute=false;
break;
case"v":for(var L=0;
L<M;
++L){this._updateBBox(this.last.x,this.last.y+=A[L])
}this.absolute=false;
break;
case"c":for(var L=0;
L<M;
L+=6){this._updateBBox(this.last.x+A[L],this.last.y+A[L+1]);
this._updateBBox(this.last.x+A[L+2],this.last.y+A[L+3]);
this._updateBBox(this.last.x+=A[L+4],this.last.y+=A[L+5])
}this.absolute=false;
break;
case"s":case"q":for(var L=0;
L<M;
L+=4){this._updateBBox(this.last.x+A[L],this.last.y+A[L+1]);
this._updateBBox(this.last.x+=A[L+2],this.last.y+=A[L+3])
}this.absolute=false;
break;
case"A":for(var L=0;
L<M;
L+=7){this._updateBBox(A[L+5],A[L+6])
}this.last.x=A[M-2];
this.last.y=A[M-1];
this.absolute=true;
break;
case"a":for(var L=0;
L<M;
L+=7){this._updateBBox(this.last.x+=A[L+5],this.last.y+=A[L+6])
}this.absolute=false;
break
}var J=[K.action];
for(var L=0;
L<M;
++L){J.push(dojox.gfx.formatNumber(A[L],true))
}if(typeof this.shape.path=="string"){this.shape.path+=J.join("")
}else{var M=J.length,N=this.shape.path;
for(var L=0;
L<M;
++L){N.push(J[L])
}}},_validSegments:{m:2,l:2,h:1,v:1,c:6,s:4,q:4,t:2,a:7,z:0},_pushSegment:function(F,H){var A=this._validSegments[F.toLowerCase()];
if(typeof A=="number"){if(A){if(H.length>=A){var G={action:F,args:H.slice(0,H.length-H.length%A)};
this.segments.push(G);
this._updateWithSegment(G)
}}else{var G={action:F,args:[]};
this.segments.push(G);
this._updateWithSegment(G)
}}},_collectArgs:function(A,H){for(var F=0;
F<H.length;
++F){var G=H[F];
if(typeof G=="boolean"){A.push(G?1:0)
}else{if(typeof G=="number"){A.push(G)
}else{if(G instanceof Array){this._collectArgs(A,G)
}else{if("x" in G&&"y" in G){A.push(G.x,G.y)
}}}}}},moveTo:function(){var A=[];
this._collectArgs(A,arguments);
this._pushSegment(this.absolute?"M":"m",A);
return this
},lineTo:function(){var A=[];
this._collectArgs(A,arguments);
this._pushSegment(this.absolute?"L":"l",A);
return this
},hLineTo:function(){var A=[];
this._collectArgs(A,arguments);
this._pushSegment(this.absolute?"H":"h",A);
return this
},vLineTo:function(){var A=[];
this._collectArgs(A,arguments);
this._pushSegment(this.absolute?"V":"v",A);
return this
},curveTo:function(){var A=[];
this._collectArgs(A,arguments);
this._pushSegment(this.absolute?"C":"c",A);
return this
},smoothCurveTo:function(){var A=[];
this._collectArgs(A,arguments);
this._pushSegment(this.absolute?"S":"s",A);
return this
},qCurveTo:function(){var A=[];
this._collectArgs(A,arguments);
this._pushSegment(this.absolute?"Q":"q",A);
return this
},qSmoothCurveTo:function(){var A=[];
this._collectArgs(A,arguments);
this._pushSegment(this.absolute?"T":"t",A);
return this
},arcTo:function(){var A=[];
this._collectArgs(A,arguments);
this._pushSegment(this.absolute?"A":"a",A);
return this
},closePath:function(){this._pushSegment("Z",[]);
return this
},_setPath:function(A){var J=B.isArray(A)?A:A.match(dojox.gfx.pathSvgRegExp);
this.segments=[];
this.absolute=true;
this.bbox={};
this.last={};
if(!J){return 
}var K="",N=[],O=J.length;
for(var L=0;
L<O;
++L){var M=J[L],P=parseFloat(M);
if(isNaN(P)){if(K){this._pushSegment(K,N)
}N=[];
K=M
}else{N.push(P)
}}this._pushSegment(K,N)
},setShape:function(D){dojox.gfx.Shape.prototype.setShape.call(this,typeof D=="string"?{path:D}:D);
var A=this.shape.path;
this.shape.path=[];
this._setPath(A);
this.shape.path=this.shape.path.join("");
return this
},_2PI:Math.PI*2});
B.declare("dojox.gfx.path.TextPath",dojox.gfx.path.Path,{constructor:function(A){if(!("text" in this)){this.text=B.clone(dojox.gfx.defaultTextPath)
}if(!("fontStyle" in this)){this.fontStyle=B.clone(dojox.gfx.defaultFont)
}},setText:function(A){this.text=dojox.gfx.makeParameters(this.text,typeof A=="string"?{text:A}:A);
this._setText();
return this
},setFont:function(A){this.fontStyle=typeof A=="string"?dojox.gfx.splitFontString(A):dojox.gfx.makeParameters(dojox.gfx.defaultFont,A);
this._setFont();
return this
}})
}}});