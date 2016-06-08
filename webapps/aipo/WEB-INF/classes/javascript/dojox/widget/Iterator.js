if(!dojo._hasResource["dojox.widget.Iterator"]){dojo._hasResource["dojox.widget.Iterator"]=true;
dojo.provide("dojox.widget.Iterator");
dojo.require("dijit.Declaration");
dojo.experimental("dojox.widget.Iterator");
dojo.declare("dojox.widget.Iterator",[dijit.Declaration],{constructor:(function(){var B=0;
return function(){this.attrs=[];
this.children=[];
this.widgetClass="dojox.widget.Iterator._classes._"+(B++)
}
})(),start:0,fetchMax:1000,query:{name:"*"},attrs:[],defaultValue:"",widgetCtor:null,dataValues:[],data:null,store:null,_srcIndex:0,_srcParent:null,_setSrcIndex:function(C){this._srcIndex=0;
this._srcParent=C.parentNode;
var D=C;
while(D.previousSibling){this._srcIndex++;
D=D.previousSibling
}},postscript:function(E,D){this._setSrcIndex(D);
this.inherited("postscript",arguments);
var F=this.widgetCtor=dojo.getObject(this.widgetClass);
this.attrs=dojo.map(F.prototype.templateString.match(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g),function(A){return A.slice(2,-1)
});
dojo.forEach(this.attrs,function(A){F.prototype[A]=""
});
this.update()
},clear:function(){if(this.children.length){this._setSrcIndex(this.children[0].domNode)
}dojo.forEach(this.children,"item.destroy();");
this.children=[]
},update:function(){if(this.store){this.fetch()
}else{this.onDataAvailable(this.data||this.dataValues)
}},_addItem:function(F,D){if(dojo.isString(F)){F={value:F}
}var E=new this.widgetCtor(F);
this.children.push(E);
dojo.place(E.domNode,this._srcParent,this._srcIndex+D)
},getAttrValuesObj:function(C){var D={};
if(dojo.isString(C)){dojo.forEach(this.attrs,function(A){D[A]=(A=="value")?C:this.defaultValue
},this)
}else{dojo.forEach(this.attrs,function(A){if(this.store){D[A]=this.store.getValue(C,A)||this.defaultValue
}else{D[A]=C[A]||this.defaultValue
}},this)
}return D
},onDataAvailable:function(B){this.clear();
dojo.forEach(B,function(A,D){this._addItem(this.getAttrValuesObj(A),D)
},this)
},fetch:function(F,E,D){this.store.fetch({query:F||this.query,start:E||this.start,count:D||this.fetchMax,onComplete:dojo.hitch(this,"onDataAvailable"),})
}});
dojox.widget.Iterator._classes={}
};