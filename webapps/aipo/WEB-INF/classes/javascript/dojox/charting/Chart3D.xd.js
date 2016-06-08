dojo._xdResourceLoaded({depends:[["provide","dojox.charting.Chart3D"],["require","dojox.gfx3d"]],defineResource:function(B){if(!B._hasResource["dojox.charting.Chart3D"]){B._hasResource["dojox.charting.Chart3D"]=true;
B.provide("dojox.charting.Chart3D");
B.require("dojox.gfx3d");
(function(){var E={x:0,y:0,z:1},F=dojox.gfx3d.vector,A=dojox.gfx.normalizedLength;
B.declare("dojox.charting.Chart3D",null,{constructor:function(D,J,I,C){this.node=B.byId(D);
this.surface=dojox.gfx.createSurface(this.node,A(this.node.style.width),A(this.node.style.height));
this.view=this.surface.createViewport();
this.view.setLights(J.lights,J.ambient,J.specular);
this.view.setCameraTransform(I);
this.theme=C;
this.walls=[];
this.plots=[]
},generate:function(){return this._generateWalls()._generatePlots()
},invalidate:function(){this.view.invalidate();
return this
},render:function(){this.view.render();
return this
},addPlot:function(C){return this._add(this.plots,C)
},removePlot:function(C){return this._remove(this.plots,C)
},addWall:function(C){return this._add(this.walls,C)
},removeWall:function(C){return this._remove(this.walls,C)
},_add:function(C,D){if(!B.some(C,function(H){return H==D
})){C.push(D);
this.view.invalidate()
}return this
},_remove:function(C,D){var H=B.filter(C,function(G){return G!=D
});
return H.length<C.length?(C=H,this.invalidate()):this
},_generateWalls:function(){for(var C=0;
C<this.walls.length;
++C){if(F.dotProduct(E,this.walls[C].normal)>0){this.walls[C].generate(this)
}}return this
},_generatePlots:function(){var C=0,J=dojox.gfx3d.matrix,I=0;
for(;
I<this.plots.length;
++I){C+=this.plots[I].getDepth()
}for(--I;
I>=0;
--I){var D=this.view.createScene();
D.setTransform(J.translate(0,0,-C));
this.plots[I].generate(this,D);
C-=this.plots[I].getDepth()
}return this
}})
})()
}}});