if(!dojo._hasResource["dijit._base.typematic"]){dojo._hasResource["dijit._base.typematic"]=true;
dojo.provide("dijit._base.typematic");
dijit.typematic={_fireEventAndReload:function(){this._timer=null;
this._callback(++this._count,this._node,this._evt);
this._currentTimeout=(this._currentTimeout<0)?this._initialDelay:((this._subsequentDelay>1)?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay));
this._timer=setTimeout(dojo.hitch(this,"_fireEventAndReload"),this._currentTimeout)
},trigger:function(H,I,M,J,K,N,L){if(K!=this._obj){this.stop();
this._initialDelay=L||500;
this._subsequentDelay=N||0.9;
this._obj=K;
this._evt=H;
this._node=M;
this._currentTimeout=-1;
this._count=-1;
this._callback=dojo.hitch(I,J);
this._fireEventAndReload()
}},stop:function(){if(this._timer){clearTimeout(this._timer);
this._timer=null
}if(this._obj){this._callback(-1,this._node,this._evt);
this._obj=null
}},addKeyListener:function(K,G,H,I,L,J){return[dojo.connect(K,"onkeypress",this,function(A){if(A.keyCode==G.keyCode&&(!G.charCode||G.charCode==A.charCode)&&(G.ctrlKey===undefined||G.ctrlKey==A.ctrlKey)&&(G.altKey===undefined||G.altKey==A.ctrlKey)&&(G.shiftKey===undefined||G.shiftKey==A.ctrlKey)){dojo.stopEvent(A);
dijit.typematic.trigger(G,H,K,I,G,L,J)
}else{if(dijit.typematic._obj==G){dijit.typematic.stop()
}}}),dojo.connect(K,"onkeyup",this,function(A){if(dijit.typematic._obj==G){dijit.typematic.stop()
}})]
},addMouseListener:function(K,H,I,L,J){var G=dojo.connect;
return[G(K,"mousedown",this,function(A){dojo.stopEvent(A);
dijit.typematic.trigger(A,H,K,I,K,L,J)
}),G(K,"mouseup",this,function(A){dojo.stopEvent(A);
dijit.typematic.stop()
}),G(K,"mouseout",this,function(A){dojo.stopEvent(A);
dijit.typematic.stop()
}),G(K,"mousemove",this,function(A){dojo.stopEvent(A)
}),G(K,"dblclick",this,function(A){dojo.stopEvent(A);
if(dojo.isIE){dijit.typematic.trigger(A,H,K,I,K,L,J);
setTimeout(dijit.typematic.stop,50)
}})]
},addListener:function(L,K,H,I,J,N,M){return this.addKeyListener(K,H,I,J,N,M).concat(this.addMouseListener(L,I,J,N,M))
}}
};