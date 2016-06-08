dojo._xdResourceLoaded({depends:[["provide","dojox.gfx3d.gradient"],["require","dojox.gfx3d.vector"],["require","dojox.gfx3d.matrix"]],defineResource:function(B){if(!B._hasResource["dojox.gfx3d.gradient"]){B._hasResource["dojox.gfx3d.gradient"]=true;
B.provide("dojox.gfx3d.gradient");
B.require("dojox.gfx3d.vector");
B.require("dojox.gfx3d.matrix");
(function(){var A=function(C,F){return Math.sqrt(Math.pow(F.x-C.x,2)+Math.pow(F.y-C.y,2))
};
var D=32;
dojox.gfx3d.gradient=function(u,p,b,t,h,v,g){var i=dojox.gfx3d.matrix,q=dojox.gfx3d.vector,n=i.normalize(g),e=i.multiplyPoint(n,t*Math.cos(h)+b.x,t*Math.sin(h)+b.y,b.z),o=i.multiplyPoint(n,t*Math.cos(v)+b.x,t*Math.sin(v)+b.y,b.z),c=i.multiplyPoint(n,b.x,b.y,b.z),s=(v-h)/D,l=A(e,o)/2,C=u[p.type],f=p.finish,k=p.color,r=[{offset:0,color:C.call(u,q.substract(e,c),f,k)}];
for(var a=h+s;
a<v;
a+=s){var j=i.multiplyPoint(n,t*Math.cos(a)+b.x,t*Math.sin(a)+b.y,b.z),d=A(e,j),m=A(o,j);
r.push({offset:d/(d+m),color:C.call(u,q.substract(j,c),f,k)})
}r.push({offset:1,color:C.call(u,q.substract(o,c),f,k)});
return{type:"linear",x1:0,y1:-l,x2:0,y2:l,colors:r}
}
})()
}}});