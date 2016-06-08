dojo._xdResourceLoaded({depends:[["provide","dojox.timing.Sequence"]],defineResource:function(B){if(!B._hasResource["dojox.timing.Sequence"]){B._hasResource["dojox.timing.Sequence"]=true;
B.provide("dojox.timing.Sequence");
B.experimental("dojox.timing.Sequence");
B.declare("dojox.timing.Sequence",null,{_defsResolved:[],_goOnPause:0,_running:false,go:function(G,H){this._running=true;
var F=this;
B.forEach(G,function(C){if(C.repeat>1){var D=C.repeat;
for(var E=0;
E<D;
E++){C.repeat=1;
F._defsResolved.push(C)
}}else{F._defsResolved.push(C)
}});
var A=G[G.length-1];
if(H){F._defsResolved.push({func:H})
}F._defsResolved.push({func:[this.stop,this]});
this._curId=0;
this._go()
},_go:function(){if(!this._running){return 
}var A=this._defsResolved[this._curId];
this._curId+=1;
function F(C){var D=null;
if(B.isArray(C)){if(C.length>2){D=C[0].apply(C[1],C.slice(2))
}else{D=C[0].apply(C[1])
}}else{D=C()
}return D
}if(this._curId>=this._defsResolved.length){F(A.func);
return 
}var G=this;
if(A.pauseAfter){if(F(A.func)!==false){window.setTimeout(function(){G._go()
},A.pauseAfter)
}else{this._goOnPause=A.pauseAfter
}}else{if(A.pauseBefore){var H=function(){if(F(A.func)!==false){G._go()
}};
window.setTimeout(H,A.pauseBefore)
}else{if(F(A.func)!==false){this._go()
}}}},goOn:function(){if(this._goOnPause){var A=this;
setTimeout(function(){A._go()
},this._goOnPause);
this._goOnPause=0
}else{this._go()
}},stop:function(){this._running=false
}})
}}});