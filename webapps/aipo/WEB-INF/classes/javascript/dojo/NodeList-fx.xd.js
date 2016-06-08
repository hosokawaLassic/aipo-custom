dojo._xdResourceLoaded({depends:[["provide","dojo.NodeList-fx"],["require","dojo.fx"]],defineResource:function(B){if(!B._hasResource["dojo.NodeList-fx"]){B._hasResource["dojo.NodeList-fx"]=true;
B.provide("dojo.NodeList-fx");
B.require("dojo.fx");
B.extend(B.NodeList,{_anim:function(F,A,G){var H=[];
G=G||{};
this.forEach(function(C){var D={node:C};
B.mixin(D,G);
H.push(F[A](D))
});
return B.fx.combine(H)
},wipeIn:function(A){return this._anim(B.fx,"wipeIn",A)
},wipeOut:function(A){return this._anim(B.fx,"wipeOut",A)
},slideTo:function(A){return this._anim(B.fx,"slideTo",A)
},fadeIn:function(A){return this._anim(B,"fadeIn",A)
},fadeOut:function(A){return this._anim(B,"fadeOut",A)
},animateProperty:function(A){return this._anim(B,"animateProperty",A)
}})
}}});