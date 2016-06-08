dojo._xdResourceLoaded({depends:[["provide","dojox.fx.scroll"],["require","dojox.fx._core"]],defineResource:function(B){if(!B._hasResource["dojox.fx.scroll"]){B._hasResource["dojox.fx.scroll"]=true;
B.provide("dojox.fx.scroll");
B.experimental("dojox.fx.scroll");
B.require("dojox.fx._core");
dojox.fx.smoothScroll=function(G){if(!G.target){G.target=B.coords(G.node,true)
}var H=B[(B.isIE?"isObject":"isFunction")](G.win.scrollTo);
var F=(H)?(function(C){G.win.scrollTo(C[0],C[1])
}):(function(C){G.win.scrollLeft=C[0];
G.win.scrollTop=C[1]
});
var A=new B._Animation(B.mixin({beforeBegin:function(){if(this.curve){delete this.curve
}var C=H?B._docScroll():{x:G.win.scrollLeft,y:G.win.scrollTop};
A.curve=new dojox.fx._Line([C.x,C.y],[G.target.x,G.target.y])
},onAnimate:F},G));
return A
}
}}});