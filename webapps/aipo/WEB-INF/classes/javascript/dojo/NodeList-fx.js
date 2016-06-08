if(!dojo._hasResource["dojo.NodeList-fx"]){dojo._hasResource["dojo.NodeList-fx"]=true;
dojo.provide("dojo.NodeList-fx");
dojo.require("dojo.fx");
dojo.extend(dojo.NodeList,{_anim:function(G,F,H){var E=[];
H=H||{};
this.forEach(function(A){var B={node:A};
dojo.mixin(B,H);
E.push(G[F](B))
});
return dojo.fx.combine(E)
},wipeIn:function(B){return this._anim(dojo.fx,"wipeIn",B)
},wipeOut:function(B){return this._anim(dojo.fx,"wipeOut",B)
},slideTo:function(B){return this._anim(dojo.fx,"slideTo",B)
},fadeIn:function(B){return this._anim(dojo,"fadeIn",B)
},fadeOut:function(B){return this._anim(dojo,"fadeOut",B)
},animateProperty:function(B){return this._anim(dojo,"animateProperty",B)
}})
};