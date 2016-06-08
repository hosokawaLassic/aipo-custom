if(!dojo._hasResource["dojox.charting.Chart3D"]){dojo._hasResource["dojox.charting.Chart3D"]=true;
dojo.provide("dojox.charting.Chart3D");
dojo.require("dojox.gfx3d");
(function(){var F={x:0,y:0,z:1},D=dojox.gfx3d.vector,E=dojox.gfx.normalizedLength;
dojo.declare("dojox.charting.Chart3D",null,{constructor:function(B,H,C,A){this.node=dojo.byId(B);
this.surface=dojox.gfx.createSurface(this.node,E(this.node.style.width),E(this.node.style.height));
this.view=this.surface.createViewport();
this.view.setLights(H.lights,H.ambient,H.specular);
this.view.setCameraTransform(C);
this.theme=A;
this.walls=[];
this.plots=[]
},generate:function(){return this._generateWalls()._generatePlots()
},invalidate:function(){this.view.invalidate();
return this
},render:function(){this.view.render();
return this
},addPlot:function(A){return this._add(this.plots,A)
},removePlot:function(A){return this._remove(this.plots,A)
},addWall:function(A){return this._add(this.walls,A)
},removeWall:function(A){return this._remove(this.walls,A)
},_add:function(A,B){if(!dojo.some(A,function(C){return C==B
})){A.push(B);
this.view.invalidate()
}return this
},_remove:function(A,B){var C=dojo.filter(A,function(H){return H!=B
});
return C.length<A.length?(A=C,this.invalidate()):this
},_generateWalls:function(){for(var A=0;
A<this.walls.length;
++A){if(D.dotProduct(F,this.walls[A].normal)>0){this.walls[A].generate(this)
}}return this
},_generatePlots:function(){var A=0,H=dojox.gfx3d.matrix,C=0;
for(;
C<this.plots.length;
++C){A+=this.plots[C].getDepth()
}for(--C;
C>=0;
--C){var B=this.view.createScene();
B.setTransform(H.translate(0,0,-A));
this.plots[C].generate(this,B);
A-=this.plots[C].getDepth()
}return this
}})
})()
};