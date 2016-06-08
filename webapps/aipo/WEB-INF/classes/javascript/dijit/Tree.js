if(!dojo._hasResource["dijit.Tree"]){dojo._hasResource["dijit.Tree"]=true;
dojo.provide("dijit.Tree");
dojo.require("dojo.fx");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Container");
dojo.require("dojo.cookie");
dojo.declare("dijit._TreeNode",[dijit._Widget,dijit._Templated,dijit._Container,dijit._Contained],{item:null,isTreeNode:true,label:"",isExpandable:null,isExpanded:false,state:"UNCHECKED",templateString:'<div class="dijitTreeNode dijitTreeExpandLeaf dijitTreeChildrenNo" waiRole="presentation"\r\n\t><span dojoAttachPoint="expandoNode" class="dijitTreeExpando" waiRole="presentation"\r\n\t></span\r\n\t><span dojoAttachPoint="expandoNodeText" class="dijitExpandoText" waiRole="presentation"\r\n\t></span\r\n\t>\r\n\t<div dojoAttachPoint="contentNode" class="dijitTreeContent" waiRole="presentation">\r\n\t\t<div dojoAttachPoint="iconNode" class="dijitInline dijitTreeIcon" waiRole="presentation"></div>\r\n\t\t<span dojoAttachPoint="labelNode" class="dijitTreeLabel" wairole="treeitem" tabindex="-1"></span>\r\n\t</div>\r\n</div>\r\n',postCreate:function(){this.setLabelNode(this.label);
this._setExpando();
this._updateItemClasses(this.item);
if(this.isExpandable){dijit.setWaiState(this.labelNode,"expanded",this.isExpanded)
}},markProcessing:function(){this.state="LOADING";
this._setExpando(true)
},unmarkProcessing:function(){this._setExpando(false)
},_updateItemClasses:function(B){this.iconNode.className="dijitInline dijitTreeIcon "+this.tree.getIconClass(B);
this.labelNode.className="dijitTreeLabel "+this.tree.getLabelClass(B)
},_updateLayout:function(){var B=this.getParent();
if(B&&B.isTree&&B._hideRoot){dojo.addClass(this.domNode,"dijitTreeIsRoot")
}else{dojo.toggleClass(this.domNode,"dijitTreeIsLast",!this.getNextSibling())
}},_setExpando:function(E){var F=["dijitTreeExpandoLoading","dijitTreeExpandoOpened","dijitTreeExpandoClosed","dijitTreeExpandoLeaf"];
var D=E?0:(this.isExpandable?(this.isExpanded?1:2):3);
dojo.forEach(F,function(A){dojo.removeClass(this.expandoNode,A)
},this);
dojo.addClass(this.expandoNode,F[D]);
this.expandoNodeText.innerHTML=E?"*":(this.isExpandable?(this.isExpanded?"-":"+"):"*")
},expand:function(){if(this.isExpanded){return 
}if(this._wipeOut.status()=="playing"){this._wipeOut.stop()
}this.isExpanded=true;
dijit.setWaiState(this.labelNode,"expanded","true");
dijit.setWaiRole(this.containerNode,"group");
this._setExpando();
this._wipeIn.play()
},collapse:function(){if(!this.isExpanded){return 
}if(this._wipeIn.status()=="playing"){this._wipeIn.stop()
}this.isExpanded=false;
dijit.setWaiState(this.labelNode,"expanded","false");
this._setExpando();
this._wipeOut.play()
},setLabelNode:function(B){this.labelNode.innerHTML="";
this.labelNode.appendChild(document.createTextNode(B))
},_setChildren:function(F){this.destroyDescendants();
this.state="LOADED";
var G={};
if(F&&F.length>0){this.isExpandable=true;
if(!this.containerNode){this.containerNode=this.tree.containerNodeTemplate.cloneNode(true);
this.domNode.appendChild(this.containerNode)
}dojo.forEach(F,function(B){var A=new dijit._TreeNode(dojo.mixin({tree:this.tree,label:this.tree.getLabel(B.item)},B));
this.addChild(A);
var C=this.tree.store.getIdentity(B.item);
G[C]=A;
if(this.tree.persist){if(this.tree._openedItemIds[C]){this.tree._expandNode(A)
}}},this);
dojo.forEach(this.getChildren(),function(A,B){A._updateLayout()
})
}else{this.isExpandable=false
}if(this._setExpando){this._setExpando(false)
}if(this.isTree&&this._hideRoot){var H=this.getChildren()[0];
var E=H?H.labelNode:this.domNode;
E.setAttribute("tabIndex","0")
}if(this.containerNode&&!this._wipeIn){this._wipeIn=dojo.fx.wipeIn({node:this.containerNode,duration:150});
this._wipeOut=dojo.fx.wipeOut({node:this.containerNode,duration:150})
}return G
},_addChildren:function(D){var C={};
if(D&&D.length>0){dojo.forEach(D,function(B){var A=new dijit._TreeNode(dojo.mixin({tree:this.tree,label:this.tree.getLabel(B.item)},B));
this.addChild(A);
C[this.tree.store.getIdentity(B.item)]=A
},this);
dojo.forEach(this.getChildren(),function(A,B){A._updateLayout()
})
}return C
},deleteNode:function(D){D.destroy();
var C=this.getChildren();
if(C.length==0){this.isExpandable=false;
this.collapse()
}dojo.forEach(C,function(A){A._updateLayout()
})
},makeExpandable:function(){this.isExpandable=true;
this._setExpando(false)
}});
dojo.declare("dijit.Tree",dijit._TreeNode,{store:null,query:null,childrenAttr:["children"],templateString:'<div class="dijitTreeContainer" style="" waiRole="tree"\r\n\tdojoAttachEvent="onclick:_onClick,onkeypress:_onKeyPress">\r\n\t<div class="dijitTreeNode  dijitTreeIsRoot dijitTreeExpandLeaf dijitTreeChildrenNo" waiRole="presentation"\r\n\t\tdojoAttachPoint="rowNode"\r\n\t\t><span dojoAttachPoint="expandoNode" class="dijitTreeExpando" waiRole="presentation"\r\n\t\t></span\r\n\t\t><span dojoAttachPoint="expandoNodeText" class="dijitExpandoText" waiRole="presentation"\r\n\t\t></span\r\n\t\t>\r\n\t\t<div dojoAttachPoint="contentNode" class="dijitTreeContent" waiRole="presentation">\r\n\t\t\t<div dojoAttachPoint="iconNode" class="dijitInline dijitTreeIcon" waiRole="presentation"></div>\r\n\t\t\t<span dojoAttachPoint="labelNode" class="dijitTreeLabel" wairole="treeitem" tabindex="0"></span>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n',isExpandable:true,isTree:true,persist:true,dndController:null,dndParams:["onDndDrop","itemCreator","onDndCancel","checkAcceptance","checkItemAcceptance"],onDndDrop:null,itemCreator:null,onDndCancel:null,checkAcceptance:null,checkItemAcceptance:null,_publish:function(C,D){dojo.publish(this.id,[dojo.mixin({tree:this,event:C},D||{})])
},postMixInProperties:function(){this.tree=this;
this.lastFocused=this.labelNode;
this._itemNodeMap={};
this._hideRoot=!this.label;
if(!this.store.getFeatures()["dojo.data.api.Identity"]){throw new Error("dijit.tree requires access to a store supporting the dojo.data Identity api")
}if(!this.cookieName){this.cookieName=this.id+"SaveStateCookie"
}if(this.store.getFeatures()["dojo.data.api.Notification"]){this.connect(this.store,"onNew","_onNewItem");
this.connect(this.store,"onDelete","_onDeleteItem");
this.connect(this.store,"onSet","_onSetItem")
}},postCreate:function(){if(this.persist){var H=dojo.cookie(this.cookieName);
this._openedItemIds={};
if(H){dojo.forEach(H.split(","),function(A){this._openedItemIds[A]=true
},this)
}}var F=document.createElement("div");
F.style.display="none";
F.className="dijitTreeContainer";
dijit.setWaiRole(F,"presentation");
this.containerNodeTemplate=F;
if(this._hideRoot){this.rowNode.style.display="none"
}this.inherited("postCreate",arguments);
this._expandNode(this);
if(this.dndController){if(dojo.isString(this.dndController)){this.dndController=dojo.getObject(this.dndController)
}var G={};
for(var E=0;
E<this.dndParams.length;
E++){if(this[this.dndParams[E]]){G[this.dndParams[E]]=this[this.dndParams[E]]
}}this.dndController=new this.dndController(this,G)
}this.connect(this.domNode,dojo.isIE?"onactivate":"onfocus","_onTreeFocus")
},mayHaveChildren:function(B){return dojo.some(this.childrenAttr,function(A){return this.store.hasAttribute(B,A)
},this)
},getItemChildren:function(N,J){var M=this.store;
if(N==null){M.fetch({query:this.query,onComplete:J})
}else{var I=[];
for(var K=0;
K<this.childrenAttr.length;
K++){I=I.concat(M.getValues(N,this.childrenAttr[K]))
}var H=0;
dojo.forEach(I,function(A){if(!M.isItemLoaded(A)){H++
}});
if(H==0){J(I)
}else{function L(A){if(--H==0){J(I)
}}dojo.forEach(I,function(A){if(!M.isItemLoaded(A)){M.loadItem({item:A,onItem:L})
}})
}}},getItemParentIdentity:function(D,C){return this.store.getIdentity(C.item)
},getLabel:function(B){return this.store.getLabel(B)
},getIconClass:function(B){},getLabelClass:function(B){},_onLoadAllItems:function(F,D){var E=dojo.map(D,function(A){return{item:A,isExpandable:this.mayHaveChildren(A)}
},this);
dojo.mixin(this._itemNodeMap,F._setChildren(E));
this._expandNode(F)
},_onKeyPress:function(G){if(G.altKey){return 
}var E=dijit.getEnclosingWidget(G.target);
if(!E){return 
}if(G.charCode){var F=G.charCode;
if(!G.altKey&&!G.ctrlKey&&!G.shiftKey&&!G.metaKey){F=(String.fromCharCode(F)).toLowerCase();
this._onLetterKeyNav({node:E,key:F});
dojo.stopEvent(G)
}}else{var H=this._keyHandlerMap;
if(!H){H={};
H[dojo.keys.ENTER]="_onEnterKey";
H[dojo.keys.LEFT_ARROW]="_onLeftArrow";
H[dojo.keys.RIGHT_ARROW]="_onRightArrow";
H[dojo.keys.UP_ARROW]="_onUpArrow";
H[dojo.keys.DOWN_ARROW]="_onDownArrow";
H[dojo.keys.HOME]="_onHomeKey";
H[dojo.keys.END]="_onEndKey";
this._keyHandlerMap=H
}if(this._keyHandlerMap[G.keyCode]){this[this._keyHandlerMap[G.keyCode]]({node:E,item:E.item});
dojo.stopEvent(G)
}}},_onEnterKey:function(B){this._publish("execute",{item:B.item,node:B.node});
this.onClick(B.item,B.node)
},_onDownArrow:function(D){var C=this._navToNextNode(D.node);
if(C&&C.isTreeNode){C.tree.focusNode(C);
return C
}},_onUpArrow:function(H){var G=H.node;
var J=G;
var I=G.getPreviousSibling();
if(I){G=I;
while(G.isExpandable&&G.isExpanded&&G.hasChildren()){J=G;
var L=G.getChildren();
G=L[L.length-1]
}}else{var K=G.getParent();
if(!(this._hideRoot&&K===this)){G=K
}}if(G&&G.isTreeNode){J=G
}if(J&&J.isTreeNode){J.tree.focusNode(J);
return J
}},_onRightArrow:function(E){var D=E.node;
var F=D;
if(D.isExpandable&&!D.isExpanded){this._expandNode(D)
}else{if(D.hasChildren()){D=D.getChildren()[0]
}}if(D&&D.isTreeNode){F=D
}if(F&&F.isTreeNode){F.tree.focusNode(F);
return F
}},_onLeftArrow:function(E){var F=E.node;
var D=F;
if(F.isExpandable&&F.isExpanded){this._collapseNode(F)
}else{F=F.getParent()
}if(F&&F.isTreeNode){D=F
}if(D&&D.isTreeNode){D.tree.focusNode(D);
return D
}},_onHomeKey:function(){var B=this._navToRootOrFirstNode();
if(B){B.tree.focusNode(B);
return B
}},_onEndKey:function(G){var E=G.node.tree;
var H=E;
while(H.isExpanded){var F=H.getChildren();
H=F[F.length-1];
if(H.isTreeNode){E=H
}}if(E&&E.isTreeNode){E.tree.focusNode(E);
return E
}},_onLetterKeyNav:function(E){var F=startNode=E.node;
var D=E.key;
do{F=this._navToNextNode(F);
if(!F){F=this._navToRootOrFirstNode()
}}while(F!==startNode&&(F.label.charAt(0).toLowerCase()!=D));
if(F&&F.isTreeNode){if(F!==startNode){F.tree.focusNode(F)
}return F
}},_onClick:function(F){var E=F.target;
var D=dijit.getEnclosingWidget(E);
if(!D||!D.isTreeNode){return 
}if(E==D.expandoNode||E==D.expandoNodeText){if(D.isExpandable){this._onExpandoClick({node:D})
}}else{this._publish("execute",{item:D.item,node:D});
this.onClick(D.item,D);
this.focusNode(D)
}dojo.stopEvent(F)
},_onExpandoClick:function(D){var C=D.node;
if(C.isExpanded){this._collapseNode(C)
}else{this._expandNode(C)
}},onClick:function(D,C){},_navToNextNode:function(D){var C;
if(D.isExpandable&&D.isExpanded&&D.hasChildren()){C=D.getChildren()[0]
}else{while(D&&D.isTreeNode){C=D.getNextSibling();
if(C){break
}D=D.getParent()
}}return C
},_navToRootOrFirstNode:function(){if(!this._hideRoot){return this
}else{var B=this.getChildren()[0];
if(B&&B.isTreeNode){return B
}}},_collapseNode:function(B){if(B.isExpandable){if(B.state=="LOADING"){return 
}if(this.lastFocused){if(dojo.isDescendant(this.lastFocused.domNode,B.domNode)){this.focusNode(B)
}else{this.focusNode(this.lastFocused)
}}B.collapse();
if(this.persist&&B.item){delete this._openedItemIds[this.store.getIdentity(B.item)];
this._saveState()
}}},_expandNode:function(J){var K=J.tree;
if(K.lastFocused){K.focusNode(K.lastFocused)
}if(!J.isExpandable){return 
}var L=this.store;
var G=this.store.getValue;
switch(J.state){case"LOADING":return ;
case"UNCHECKED":J.markProcessing();
var H=this;
var I=function(A){J.unmarkProcessing();
H._onLoadAllItems(J,A)
};
this.getItemChildren(J.item,I);
break;
default:if(J.expand){J.expand();
if(this.persist&&J.item){this._openedItemIds[this.store.getIdentity(J.item)]=true;
this._saveState()
}}break
}},blurNode:function(){var D=this.lastFocused;
if(!D){return 
}var C=D.labelNode;
dojo.removeClass(C,"dijitTreeLabelFocused");
C.setAttribute("tabIndex","-1");
this.lastFocused=null
},focusNode:function(B){B.labelNode.focus()
},_onBlur:function(){if(this.lastFocused){var B=this.lastFocused.labelNode;
dojo.removeClass(B,"dijitTreeLabelFocused")
}},_onTreeFocus:function(D){var E=dijit.getEnclosingWidget(D.target);
if(E!=this.lastFocused){this.blurNode()
}var F=E.labelNode;
F.setAttribute("tabIndex","0");
dojo.addClass(F,"dijitTreeLabelFocused");
this.lastFocused=E
},_onNewItem:function(J,G){var I;
if(G){var K=this._itemNodeMap[this.getItemParentIdentity(J,G)];
if(!K||dojo.indexOf(this.childrenAttr,G.attribute)==-1){return 
}}var H={item:J,isExpandable:this.mayHaveChildren(J)};
if(K){if(!K.isExpandable){K.makeExpandable()
}if(K.state=="LOADED"||K.isExpanded){var L=K._addChildren([H])
}}else{var L=this._addChildren([H])
}if(L){dojo.mixin(this._itemNodeMap,L)
}},_onDeleteItem:function(F){var E=this.store.getIdentity(F);
var G=this._itemNodeMap[E];
if(G){var H=G.getParent();
H.deleteNode(G);
this._itemNodeMap[E]=null
}},_onSetItem:function(D){var C=this.store.getIdentity(D);
node=this._itemNodeMap[C];
if(node){node.setLabelNode(this.getLabel(D));
node._updateItemClasses(D)
}},_saveState:function(){if(!this.persist){return 
}var C=[];
for(var D in this._openedItemIds){C.push(D)
}dojo.cookie(this.cookieName,C.join(","))
}})
};