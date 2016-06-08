gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.noop){gadgets.rpctx.noop=function(){return{getCode:function(){return"noop"
},isParentVerifiable:function(){return false
},init:function(A,B){return true
},setup:function(B,A){return true
},call:function(A,C,B){return false
}}
}()
};