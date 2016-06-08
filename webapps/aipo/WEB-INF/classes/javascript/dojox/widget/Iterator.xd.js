dojo._xdResourceLoaded({depends:[["provide","dojox.widget.Iterator"],["require","dijit.Declaration"]],defineResource:function(B){if(!B._hasResource["dojox.widget.Iterator"]){B._hasResource["dojox.widget.Iterator"]=true;
B.provide("dojox.widget.Iterator");
B.require("dijit.Declaration");
B.experimental("dojox.widget.Iterator");
B.declare("dojox.widget.Iterator",[dijit.Declaration],{constructor:(function(){var A=0;
return function(){this.attrs=[];
this.children=[];
this.widgetClass="dojox.widget.Iterator._classes._"+(A++)
}
})(),start:0,fetchMax:1000,query:{name:"*"},attrs:[],defaultValue:"",widgetCtor:null,dataValues:[],data:null,store:null,_srcIndex:0,_srcParent:null,_setSrcIndex:function(D){this._srcIndex=0;
this._srcParent=D.parentNode;
var A=D;
while(A.previousSibling){this._srcIndex++;
A=A.previousSibling
}},postscript:function(A,F){this._setSrcIndex(F);
this.inherited("postscript",arguments);
var E=this.widgetCtor=B.getObject(this.widgetClass);
this.attrs=B.map(E.prototype.templateString.match(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g),function(C){return C.slice(2,-1)
});
B.forEach(this.attrs,function(C){E.prototype[C]=""
});
this.update()
},clear:function(){if(this.children.length){this._setSrcIndex(this.children[0].domNode)
}B.forEach(this.children,"item.destroy();");
this.children=[]
},update:function(){if(this.store){this.fetch()
}else{this.onDataAvailable(this.data||this.dataValues)
}},_addItem:function(E,F){if(B.isString(E)){E={value:E}
}var A=new this.widgetCtor(E);
this.children.push(A);
B.place(A.domNode,this._srcParent,this._srcIndex+F)
},getAttrValuesObj:function(D){var A={};
if(B.isString(D)){B.forEach(this.attrs,function(C){A[C]=(C=="value")?D:this.defaultValue
},this)
}else{B.forEach(this.attrs,function(C){if(this.store){A[C]=this.store.getValue(D,C)||this.defaultValue
}else{A[C]=D[C]||this.defaultValue
}},this)
}return A
},onDataAvailable:function(A){this.clear();
B.forEach(A,function(E,F){this._addItem(this.getAttrValuesObj(E),F)
},this)
},fetch:function(E,A,F){this.store.fetch({query:E||this.query,start:A||this.start,count:F||this.fetchMax,onComplete:B.hitch(this,"onDataAvailable"),})
}});
dojox.widget.Iterator._classes={}
}}});