dojo._xdResourceLoaded({depends:[["provide","dojox.gfx"],["require","dojox.gfx.matrix"],["require","dojox.gfx._base"],["requireIf",dojox.gfx.renderer=="svg","dojox.gfx.svg"],["requireIf",dojox.gfx.renderer=="vml","dojox.gfx.vml"],["requireIf",dojox.gfx.renderer=="silverlight","dojox.gfx.silverlight"],["requireIf",dojox.gfx.renderer=="canvas","dojox.gfx.canvas"]],defineResource:function(B){if(!B._hasResource["dojox.gfx"]){B._hasResource["dojox.gfx"]=true;
B.provide("dojox.gfx");
B.require("dojox.gfx.matrix");
B.require("dojox.gfx._base");
(function(){var D=(typeof djConfig.gfxRenderer=="string"?djConfig.gfxRenderer:"svg,vml,silverlight,canvas").split(",");
for(var A=0;
A<D.length;
++A){switch(D[A]){case"svg":if(!B.isIE&&(navigator.userAgent.indexOf("iPhone")<0)&&(navigator.userAgent.indexOf("iPod")<0)){dojox.gfx.renderer="svg"
}break;
case"vml":if(B.isIE!=0){dojox.gfx.renderer="vml"
}break;
case"silverlight":if(window.Silverlight){dojox.gfx.renderer="silverlight"
}break;
case"canvas":if(B.isIE==0){dojox.gfx.renderer="canvas"
}break
}if(dojox.gfx.renderer){break
}}})();
B.requireIf(dojox.gfx.renderer=="svg","dojox.gfx.svg");
B.requireIf(dojox.gfx.renderer=="vml","dojox.gfx.vml");
B.requireIf(dojox.gfx.renderer=="silverlight","dojox.gfx.silverlight");
B.requireIf(dojox.gfx.renderer=="canvas","dojox.gfx.canvas")
}}});