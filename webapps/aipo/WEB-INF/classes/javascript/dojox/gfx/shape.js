if(!dojo._hasResource["dojox.gfx.shape"]){dojo._hasResource["dojox.gfx.shape"]=true;
dojo.provide("dojox.gfx.shape");
dojo.require("dojox.gfx._base");
dojo.declare("dojox.gfx.Shape",null,{constructor:function(){this.rawNode=null;
this.shape=null;
this.matrix=null;
this.fillStyle=null;
this.strokeStyle=null;
this.bbox=null;
this.parent=null;
this.parentMatrix=null
},getNode:function(){return this.rawNode
},getShape:function(){return this.shape
},getTransform:function(){return this.matrix
},getFill:function(){return this.fillStyle
},getStroke:function(){return this.strokeStyle
},getParent:function(){return this.parent
},getBoundingBox:function(){return this.bbox
},getTransformedBoundingBox:function(){var H=this.getBoundingBox();
if(!H){return null
}var E=this._getRealMatrix();
var F=[];
var G=dojox.gfx.matrix;
F.push(G.multiplyPoint(E,H.x,H.y));
F.push(G.multiplyPoint(E,H.x+H.width,H.y));
F.push(G.multiplyPoint(E,H.x+H.width,H.y+H.height));
F.push(G.multiplyPoint(E,H.x,H.y+H.height));
return F
},getEventSource:function(){return this.rawNode
},setShape:function(B){this.shape=dojox.gfx.makeParameters(this.shape,B);
this.bbox=null;
return this
},setFill:function(D){if(!D){this.fillStyle=null;
return this
}var C=null;
if(typeof (D)=="object"&&"type" in D){switch(D.type){case"linear":C=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,D);
break;
case"radial":C=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,D);
break;
case"pattern":C=dojox.gfx.makeParameters(dojox.gfx.defaultPattern,D);
break
}}else{C=dojox.gfx.normalizeColor(D)
}this.fillStyle=C;
return this
},setStroke:function(D){if(!D){this.strokeStyle=null;
return this
}if(typeof D=="string"){D={color:D}
}var C=this.strokeStyle=dojox.gfx.makeParameters(dojox.gfx.defaultStroke,D);
C.color=dojox.gfx.normalizeColor(C.color);
return this
},setTransform:function(B){this.matrix=dojox.gfx.matrix.clone(B?dojox.gfx.matrix.normalize(B):dojox.gfx.matrix.identity);
return this._applyTransform()
},_applyTransform:function(){return this
},moveToFront:function(){var B=this.getParent();
if(B){B._moveChildToFront(this);
this._moveToFront()
}return this
},moveToBack:function(){var B=this.getParent();
if(B){B._moveChildToBack(this);
this._moveToBack()
}return this
},_moveToFront:function(){},_moveToBack:function(){},applyRightTransform:function(B){return B?this.setTransform([this.matrix,B]):this
},applyLeftTransform:function(B){return B?this.setTransform([B,this.matrix]):this
},applyTransform:function(B){return B?this.setTransform([this.matrix,B]):this
},removeShape:function(B){if(this.parent){this.parent.remove(this,B)
}return this
},_setParent:function(D,C){this.parent=D;
return this._updateParentMatrix(C)
},_updateParentMatrix:function(B){this.parentMatrix=B?dojox.gfx.matrix.clone(B):null;
return this._applyTransform()
},_getRealMatrix:function(){var C=this.matrix;
var D=this.parent;
while(D){if(D.matrix){C=dojox.gfx.matrix.multiply(D.matrix,C)
}D=D.parent
}return C
}});
dojox.gfx.shape._eventsProcessing={connect:function(F,D,E){return arguments.length>2?dojo.connect(this.getEventSource(),F,D,E):dojo.connect(this.getEventSource(),F,D)
},disconnect:function(B){dojo.disconnect(B)
}};
dojo.extend(dojox.gfx.Shape,dojox.gfx.shape._eventsProcessing);
dojox.gfx.shape.Container={_init:function(){this.children=[]
},add:function(C){var D=C.getParent();
if(D){D.remove(C,true)
}this.children.push(C);
return C._setParent(this,this._getRealMatrix())
},remove:function(D,E){for(var F=0;
F<this.children.length;
++F){if(this.children[F]==D){if(E){}else{D._setParent(null,null)
}this.children.splice(F,1);
break
}}return this
},clear:function(){this.children=[];
return this
},_moveChildToFront:function(C){for(var D=0;
D<this.children.length;
++D){if(this.children[D]==C){this.children.splice(D,1);
this.children.push(C);
break
}}return this
},_moveChildToBack:function(C){for(var D=0;
D<this.children.length;
++D){if(this.children[D]==C){this.children.splice(D,1);
this.children.unshift(C);
break
}}return this
}};
dojo.declare("dojox.gfx.shape.Surface",null,{constructor:function(){this.rawNode=null
},getEventSource:function(){return this.rawNode
},_getRealMatrix:function(){return null
}});
dojo.extend(dojox.gfx.shape.Surface,dojox.gfx.shape._eventsProcessing);
dojo.declare("dojox.gfx.Point",null,{});
dojo.declare("dojox.gfx.Rectangle",null,{});
dojo.declare("dojox.gfx.shape.Rect",dojox.gfx.Shape,{constructor:function(B){this.shape=dojo.clone(dojox.gfx.defaultRect);
this.rawNode=B
},getBoundingBox:function(){return this.shape
}});
dojo.declare("dojox.gfx.shape.Ellipse",dojox.gfx.Shape,{constructor:function(B){this.shape=dojo.clone(dojox.gfx.defaultEllipse);
this.rawNode=B
},getBoundingBox:function(){if(!this.bbox){var B=this.shape;
this.bbox={x:B.cx-B.rx,y:B.cy-B.ry,width:2*B.rx,height:2*B.ry}
}return this.bbox
}});
dojo.declare("dojox.gfx.shape.Circle",dojox.gfx.Shape,{constructor:function(B){this.shape=dojo.clone(dojox.gfx.defaultCircle);
this.rawNode=B
},getBoundingBox:function(){if(!this.bbox){var B=this.shape;
this.bbox={x:B.cx-B.r,y:B.cy-B.r,width:2*B.r,height:2*B.r}
}return this.bbox
}});
dojo.declare("dojox.gfx.shape.Line",dojox.gfx.Shape,{constructor:function(B){this.shape=dojo.clone(dojox.gfx.defaultLine);
this.rawNode=B
},getBoundingBox:function(){if(!this.bbox){var B=this.shape;
this.bbox={x:Math.min(B.x1,B.x2),y:Math.min(B.y1,B.y2),width:Math.abs(B.x2-B.x1),height:Math.abs(B.y2-B.y1)}
}return this.bbox
}});
dojo.declare("dojox.gfx.shape.Polyline",dojox.gfx.Shape,{constructor:function(B){this.shape=dojo.clone(dojox.gfx.defaultPolyline);
this.rawNode=B
},setShape:function(D,C){if(D&&D instanceof Array){dojox.gfx.Shape.prototype.setShape.call(this,{points:D});
if(C&&this.shape.points.length){this.shape.points.push(this.shape.points[0])
}}else{dojox.gfx.Shape.prototype.setShape.call(this,D)
}return this
},getBoundingBox:function(){if(!this.bbox&&this.shape.points.length){var H=this.shape.points;
var F=H.length;
var I=H[0];
var G={l:I.x,t:I.y,r:I.x,b:I.y};
for(var J=1;
J<F;
++J){I=H[J];
if(G.l>I.x){G.l=I.x
}if(G.r<I.x){G.r=I.x
}if(G.t>I.y){G.t=I.y
}if(G.b<I.y){G.b=I.y
}}this.bbox={x:G.l,y:G.t,width:G.r-G.l,height:G.b-G.t}
}return this.bbox
}});
dojo.declare("dojox.gfx.shape.Image",dojox.gfx.Shape,{constructor:function(B){this.shape=dojo.clone(dojox.gfx.defaultImage);
this.rawNode=B
},getBoundingBox:function(){return this.shape
},setStroke:function(){return this
},setFill:function(){return this
}});
dojo.declare("dojox.gfx.shape.Text",dojox.gfx.Shape,{constructor:function(B){this.fontStyle=null;
this.shape=dojo.clone(dojox.gfx.defaultText);
this.rawNode=B
},setFont:function(B){this.fontStyle=typeof B=="string"?dojox.gfx.splitFontString(B):dojox.gfx.makeParameters(dojox.gfx.defaultFont,B);
this._setFont();
return this
}});
dojox.gfx.shape.Creator={createShape:function(B){switch(B.type){case dojox.gfx.defaultPath.type:return this.createPath(B);
case dojox.gfx.defaultRect.type:return this.createRect(B);
case dojox.gfx.defaultCircle.type:return this.createCircle(B);
case dojox.gfx.defaultEllipse.type:return this.createEllipse(B);
case dojox.gfx.defaultLine.type:return this.createLine(B);
case dojox.gfx.defaultPolyline.type:return this.createPolyline(B);
case dojox.gfx.defaultImage.type:return this.createImage(B);
case dojox.gfx.defaultText.type:return this.createText(B);
case dojox.gfx.defaultTextPath.type:return this.createTextPath(B)
}return null
},createGroup:function(){return this.createObject(dojox.gfx.Group)
},createRect:function(B){return this.createObject(dojox.gfx.Rect,B)
},createEllipse:function(B){return this.createObject(dojox.gfx.Ellipse,B)
},createCircle:function(B){return this.createObject(dojox.gfx.Circle,B)
},createLine:function(B){return this.createObject(dojox.gfx.Line,B)
},createPolyline:function(B){return this.createObject(dojox.gfx.Polyline,B)
},createImage:function(B){return this.createObject(dojox.gfx.Image,B)
},createText:function(B){return this.createObject(dojox.gfx.Text,B)
},createPath:function(B){return this.createObject(dojox.gfx.Path,B)
},createTextPath:function(B){return this.createObject(dojox.gfx.TextPath,{}).setText(B)
},createObject:function(D,C){return null
}}
};