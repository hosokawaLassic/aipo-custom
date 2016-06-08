dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.shape"],["require","dojox.gfx._base"]],defineResource:function(B){if(!B._hasResource["dojox.gfx.shape"]){B._hasResource["dojox.gfx.shape"]=true;
B.provide("dojox.gfx.shape");
B.require("dojox.gfx._base");
B.declare("dojox.gfx.Shape",null,{constructor:function(){this.rawNode=null;
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
},getTransformedBoundingBox:function(){var G=this.getBoundingBox();
if(!G){return null
}var H=this._getRealMatrix();
var A=[];
var F=dojox.gfx.matrix;
A.push(F.multiplyPoint(H,G.x,G.y));
A.push(F.multiplyPoint(H,G.x+G.width,G.y));
A.push(F.multiplyPoint(H,G.x+G.width,G.y+G.height));
A.push(F.multiplyPoint(H,G.x,G.y+G.height));
return A
},getEventSource:function(){return this.rawNode
},setShape:function(A){this.shape=dojox.gfx.makeParameters(this.shape,A);
this.bbox=null;
return this
},setFill:function(A){if(!A){this.fillStyle=null;
return this
}var D=null;
if(typeof (A)=="object"&&"type" in A){switch(A.type){case"linear":D=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,A);
break;
case"radial":D=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,A);
break;
case"pattern":D=dojox.gfx.makeParameters(dojox.gfx.defaultPattern,A);
break
}}else{D=dojox.gfx.normalizeColor(A)
}this.fillStyle=D;
return this
},setStroke:function(A){if(!A){this.strokeStyle=null;
return this
}if(typeof A=="string"){A={color:A}
}var D=this.strokeStyle=dojox.gfx.makeParameters(dojox.gfx.defaultStroke,A);
D.color=dojox.gfx.normalizeColor(D.color);
return this
},setTransform:function(A){this.matrix=dojox.gfx.matrix.clone(A?dojox.gfx.matrix.normalize(A):dojox.gfx.matrix.identity);
return this._applyTransform()
},_applyTransform:function(){return this
},moveToFront:function(){var A=this.getParent();
if(A){A._moveChildToFront(this);
this._moveToFront()
}return this
},moveToBack:function(){var A=this.getParent();
if(A){A._moveChildToBack(this);
this._moveToBack()
}return this
},_moveToFront:function(){},_moveToBack:function(){},applyRightTransform:function(A){return A?this.setTransform([this.matrix,A]):this
},applyLeftTransform:function(A){return A?this.setTransform([A,this.matrix]):this
},applyTransform:function(A){return A?this.setTransform([this.matrix,A]):this
},removeShape:function(A){if(this.parent){this.parent.remove(this,A)
}return this
},_setParent:function(A,D){this.parent=A;
return this._updateParentMatrix(D)
},_updateParentMatrix:function(A){this.parentMatrix=A?dojox.gfx.matrix.clone(A):null;
return this._applyTransform()
},_getRealMatrix:function(){var D=this.matrix;
var A=this.parent;
while(A){if(A.matrix){D=dojox.gfx.matrix.multiply(A.matrix,D)
}A=A.parent
}return D
}});
dojox.gfx.shape._eventsProcessing={connect:function(E,F,A){return arguments.length>2?B.connect(this.getEventSource(),E,F,A):B.connect(this.getEventSource(),E,F)
},disconnect:function(A){B.disconnect(A)
}};
B.extend(dojox.gfx.Shape,dojox.gfx.shape._eventsProcessing);
dojox.gfx.shape.Container={_init:function(){this.children=[]
},add:function(D){var A=D.getParent();
if(A){A.remove(D,true)
}this.children.push(D);
return D._setParent(this,this._getRealMatrix())
},remove:function(F,A){for(var E=0;
E<this.children.length;
++E){if(this.children[E]==F){if(A){}else{F._setParent(null,null)
}this.children.splice(E,1);
break
}}return this
},clear:function(){this.children=[];
return this
},_moveChildToFront:function(D){for(var A=0;
A<this.children.length;
++A){if(this.children[A]==D){this.children.splice(A,1);
this.children.push(D);
break
}}return this
},_moveChildToBack:function(D){for(var A=0;
A<this.children.length;
++A){if(this.children[A]==D){this.children.splice(A,1);
this.children.unshift(D);
break
}}return this
}};
B.declare("dojox.gfx.shape.Surface",null,{constructor:function(){this.rawNode=null
},getEventSource:function(){return this.rawNode
},_getRealMatrix:function(){return null
}});
B.extend(dojox.gfx.shape.Surface,dojox.gfx.shape._eventsProcessing);
B.declare("dojox.gfx.Point",null,{});
B.declare("dojox.gfx.Rectangle",null,{});
B.declare("dojox.gfx.shape.Rect",dojox.gfx.Shape,{constructor:function(A){this.shape=B.clone(dojox.gfx.defaultRect);
this.rawNode=A
},getBoundingBox:function(){return this.shape
}});
B.declare("dojox.gfx.shape.Ellipse",dojox.gfx.Shape,{constructor:function(A){this.shape=B.clone(dojox.gfx.defaultEllipse);
this.rawNode=A
},getBoundingBox:function(){if(!this.bbox){var A=this.shape;
this.bbox={x:A.cx-A.rx,y:A.cy-A.ry,width:2*A.rx,height:2*A.ry}
}return this.bbox
}});
B.declare("dojox.gfx.shape.Circle",dojox.gfx.Shape,{constructor:function(A){this.shape=B.clone(dojox.gfx.defaultCircle);
this.rawNode=A
},getBoundingBox:function(){if(!this.bbox){var A=this.shape;
this.bbox={x:A.cx-A.r,y:A.cy-A.r,width:2*A.r,height:2*A.r}
}return this.bbox
}});
B.declare("dojox.gfx.shape.Line",dojox.gfx.Shape,{constructor:function(A){this.shape=B.clone(dojox.gfx.defaultLine);
this.rawNode=A
},getBoundingBox:function(){if(!this.bbox){var A=this.shape;
this.bbox={x:Math.min(A.x1,A.x2),y:Math.min(A.y1,A.y2),width:Math.abs(A.x2-A.x1),height:Math.abs(A.y2-A.y1)}
}return this.bbox
}});
B.declare("dojox.gfx.shape.Polyline",dojox.gfx.Shape,{constructor:function(A){this.shape=B.clone(dojox.gfx.defaultPolyline);
this.rawNode=A
},setShape:function(A,D){if(A&&A instanceof Array){dojox.gfx.Shape.prototype.setShape.call(this,{points:A});
if(D&&this.shape.points.length){this.shape.points.push(this.shape.points[0])
}}else{dojox.gfx.Shape.prototype.setShape.call(this,A)
}return this
},getBoundingBox:function(){if(!this.bbox&&this.shape.points.length){var G=this.shape.points;
var J=G.length;
var H=G[0];
var A={l:H.x,t:H.y,r:H.x,b:H.y};
for(var I=1;
I<J;
++I){H=G[I];
if(A.l>H.x){A.l=H.x
}if(A.r<H.x){A.r=H.x
}if(A.t>H.y){A.t=H.y
}if(A.b<H.y){A.b=H.y
}}this.bbox={x:A.l,y:A.t,width:A.r-A.l,height:A.b-A.t}
}return this.bbox
}});
B.declare("dojox.gfx.shape.Image",dojox.gfx.Shape,{constructor:function(A){this.shape=B.clone(dojox.gfx.defaultImage);
this.rawNode=A
},getBoundingBox:function(){return this.shape
},setStroke:function(){return this
},setFill:function(){return this
}});
B.declare("dojox.gfx.shape.Text",dojox.gfx.Shape,{constructor:function(A){this.fontStyle=null;
this.shape=B.clone(dojox.gfx.defaultText);
this.rawNode=A
},setFont:function(A){this.fontStyle=typeof A=="string"?dojox.gfx.splitFontString(A):dojox.gfx.makeParameters(dojox.gfx.defaultFont,A);
this._setFont();
return this
}});
dojox.gfx.shape.Creator={createShape:function(A){switch(A.type){case dojox.gfx.defaultPath.type:return this.createPath(A);
case dojox.gfx.defaultRect.type:return this.createRect(A);
case dojox.gfx.defaultCircle.type:return this.createCircle(A);
case dojox.gfx.defaultEllipse.type:return this.createEllipse(A);
case dojox.gfx.defaultLine.type:return this.createLine(A);
case dojox.gfx.defaultPolyline.type:return this.createPolyline(A);
case dojox.gfx.defaultImage.type:return this.createImage(A);
case dojox.gfx.defaultText.type:return this.createText(A);
case dojox.gfx.defaultTextPath.type:return this.createTextPath(A)
}return null
},createGroup:function(){return this.createObject(dojox.gfx.Group)
},createRect:function(A){return this.createObject(dojox.gfx.Rect,A)
},createEllipse:function(A){return this.createObject(dojox.gfx.Ellipse,A)
},createCircle:function(A){return this.createObject(dojox.gfx.Circle,A)
},createLine:function(A){return this.createObject(dojox.gfx.Line,A)
},createPolyline:function(A){return this.createObject(dojox.gfx.Polyline,A)
},createImage:function(A){return this.createObject(dojox.gfx.Image,A)
},createText:function(A){return this.createObject(dojox.gfx.Text,A)
},createPath:function(A){return this.createObject(dojox.gfx.Path,A)
},createTextPath:function(A){return this.createObject(dojox.gfx.TextPath,{}).setText(A)
},createObject:function(A,D){return null
}}
}}});