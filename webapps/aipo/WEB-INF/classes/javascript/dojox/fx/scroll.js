if(!dojo._hasResource["dojox.fx.scroll"]){dojo._hasResource["dojox.fx.scroll"]=true;
dojo.provide("dojox.fx.scroll");
dojo.experimental("dojox.fx.scroll");
dojo.require("dojox.fx._core");
dojox.fx.smoothScroll=function(H){if(!H.target){H.target=dojo.coords(H.node,true)
}var E=dojo[(dojo.isIE?"isObject":"isFunction")](H.win.scrollTo);
var G=(E)?(function(A){H.win.scrollTo(A[0],A[1])
}):(function(A){H.win.scrollLeft=A[0];
H.win.scrollTop=A[1]
});
var F=new dojo._Animation(dojo.mixin({beforeBegin:function(){if(this.curve){delete this.curve
}var A=E?dojo._docScroll():{x:H.win.scrollLeft,y:H.win.scrollTop};
F.curve=new dojox.fx._Line([A.x,A.y],[H.target.x,H.target.y])
},onAnimate:G},H));
return F
}
};