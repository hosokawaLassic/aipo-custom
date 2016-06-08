if(!dojo._hasResource["dojox.gfx3d.gradient"]){dojo._hasResource["dojox.gfx3d.gradient"]=true;
dojo.provide("dojox.gfx3d.gradient");
dojo.require("dojox.gfx3d.vector");
dojo.require("dojox.gfx3d.matrix");
(function(){var D=function(A,B){return Math.sqrt(Math.pow(B.x-A.x,2)+Math.pow(B.y-A.y,2))
};
var C=32;
dojox.gfx3d.gradient=function(s,n,Z,r,f,t,e){var g=dojox.gfx3d.matrix,o=dojox.gfx3d.vector,l=g.normalize(e),c=g.multiplyPoint(l,r*Math.cos(f)+Z.x,r*Math.sin(f)+Z.y,Z.z),m=g.multiplyPoint(l,r*Math.cos(t)+Z.x,r*Math.sin(t)+Z.y,Z.z),a=g.multiplyPoint(l,Z.x,Z.y,Z.z),q=(t-f)/C,j=D(c,m)/2,A=s[n.type],d=n.finish,i=n.color,p=[{offset:0,color:A.call(s,o.substract(c,a),d,i)}];
for(var B=f+q;
B<t;
B+=q){var h=g.multiplyPoint(l,r*Math.cos(B)+Z.x,r*Math.sin(B)+Z.y,Z.z),b=D(c,h),k=D(m,h);
p.push({offset:b/(b+k),color:A.call(s,o.substract(h,a),d,i)})
}p.push({offset:1,color:A.call(s,o.substract(m,a),d,i)});
return{type:"linear",x1:0,y1:-j,x2:0,y2:j,colors:p}
}
})()
};