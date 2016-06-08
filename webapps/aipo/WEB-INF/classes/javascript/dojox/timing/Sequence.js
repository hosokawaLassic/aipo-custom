if(!dojo._hasResource["dojox.timing.Sequence"]){dojo._hasResource["dojox.timing.Sequence"]=true;
dojo.provide("dojox.timing.Sequence");
dojo.experimental("dojox.timing.Sequence");
dojo.declare("dojox.timing.Sequence",null,{_defsResolved:[],_goOnPause:0,_running:false,go:function(H,E){this._running=true;
var G=this;
dojo.forEach(H,function(A){if(A.repeat>1){var B=A.repeat;
for(var C=0;
C<B;
C++){A.repeat=1;
G._defsResolved.push(A)
}}else{G._defsResolved.push(A)
}});
var F=H[H.length-1];
if(E){G._defsResolved.push({func:E})
}G._defsResolved.push({func:[this.stop,this]});
this._curId=0;
this._go()
},_go:function(){if(!this._running){return 
}var F=this._defsResolved[this._curId];
this._curId+=1;
function G(A){var B=null;
if(dojo.isArray(A)){if(A.length>2){B=A[0].apply(A[1],A.slice(2))
}else{B=A[0].apply(A[1])
}}else{B=A()
}return B
}if(this._curId>=this._defsResolved.length){G(F.func);
return 
}var H=this;
if(F.pauseAfter){if(G(F.func)!==false){window.setTimeout(function(){H._go()
},F.pauseAfter)
}else{this._goOnPause=F.pauseAfter
}}else{if(F.pauseBefore){var E=function(){if(G(F.func)!==false){H._go()
}};
window.setTimeout(E,F.pauseBefore)
}else{if(G(F.func)!==false){this._go()
}}}},goOn:function(){if(this._goOnPause){var B=this;
setTimeout(function(){B._go()
},this._goOnPause);
this._goOnPause=0
}else{this._go()
}},stop:function(){this._running=false
}})
};