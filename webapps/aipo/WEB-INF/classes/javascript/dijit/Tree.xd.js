dojo._xdResourceLoaded({depends:[["provide","dijit.Tree"],["require","dojo.fx"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dijit._Container"],["require","dojo.cookie"]],defineResource:function(B){if(!B._hasResource["dijit.Tree"]){B._hasResource["dijit.Tree"]=true;
B.provide("dijit.Tree");
B.require("dojo.fx");
B.require("dijit._Widget");
B.require("dijit._Templated");
B.require("dijit._Container");
B.require("dojo.cookie");
B.declare("dijit._TreeNode",[dijit._Widget,dijit._Templated,dijit._Container,dijit._Contained],{item:null,isTreeNode:true,label:"",isExpandable:null,isExpanded:false,state:"UNCHECKED",templateString:'<div class="dijitTreeNode dijitTreeExpandLeaf dijitTreeChildrenNo" waiRole="presentation"\r\n\t><span dojoAttachPoint="expandoNode" class="dijitTreeExpando" waiRole="presentation"\r\n\t></span\r\n\t><span dojoAttachPoint="expandoNodeText" class="dijitExpandoText" waiRole="presentation"\r\n\t></span\r\n\t>\r\n\t<div dojoAttachPoint="contentNode" class="dijitTreeContent" waiRole="presentation">\r\n\t\t<div dojoAttachPoint="iconNode" class="dijitInline dijitTreeIcon" waiRole="presentation"></div>\r\n\t\t<span dojoAttachPoint="labelNode" class="dijitTreeLabel" wairole="treeitem" tabindex="-1"></span>\r\n\t</div>\r\n</div>\r\n',postCreate:function(){this.setLabelNode(this.label);
this._setExpando();
this._updateItemClasses(this.item);
if(this.isExpandable){dijit.setWaiState(this.labelNode,"expanded",this.isExpanded)
}},markProcessing:function(){this.state="LOADING";
this._setExpando(true)
},unmarkProcessing:function(){this._setExpando(false)
},_updateItemClasses:function(A){this.iconNode.className="dijitInline dijitTreeIcon "+this.tree.getIconClass(A);
this.labelNode.className="dijitTreeLabel "+this.tree.getLabelClass(A)
},_updateLayout:function(){var A=this.getParent();
if(A&&A.isTree&&A._hideRoot){B.addClass(this.domNode,"dijitTreeIsRoot")
}else{B.toggleClass(this.domNode,"dijitTreeIsLast",!this.getNextSibling())
}},_setExpando:function(A){var E=["dijitTreeExpandoLoading","dijitTreeExpandoOpened","dijitTreeExpandoClosed","dijitTreeExpandoLeaf"];
var F=A?0:(this.isExpandable?(this.isExpanded?1:2):3);
B.forEach(E,function(C){B.removeClass(this.expandoNode,C)
},this);
B.addClass(this.expandoNode,E[F]);
this.expandoNodeText.innerHTML=A?"*":(this.isExpandable?(this.isExpanded?"-":"+"):"*")
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
},setLabelNode:function(A){this.labelNode.innerHTML="";
this.labelNode.appendChild(document.createTextNode(A))
},_setChildren:function(A){this.destroyDescendants();
this.state="LOADED";
var F={};
if(A&&A.length>0){this.isExpandable=true;
if(!this.containerNode){this.containerNode=this.tree.containerNodeTemplate.cloneNode(true);
this.domNode.appendChild(this.containerNode)
}B.forEach(A,function(D){var C=new dijit._TreeNode(B.mixin({tree:this.tree,label:this.tree.getLabel(D.item)},D));
this.addChild(C);
var E=this.tree.store.getIdentity(D.item);
F[E]=C;
if(this.tree.persist){if(this.tree._openedItemIds[E]){this.tree._expandNode(C)
}}},this);
B.forEach(this.getChildren(),function(C,D){C._updateLayout()
})
}else{this.isExpandable=false
}if(this._setExpando){this._setExpando(false)
}if(this.isTree&&this._hideRoot){var G=this.getChildren()[0];
var H=G?G.labelNode:this.domNode;
H.setAttribute("tabIndex","0")
}if(this.containerNode&&!this._wipeIn){this._wipeIn=B.fx.wipeIn({node:this.containerNode,duration:150});
this._wipeOut=B.fx.wipeOut({node:this.containerNode,duration:150})
}return F
},_addChildren:function(A){var D={};
if(A&&A.length>0){B.forEach(A,function(F){var C=new dijit._TreeNode(B.mixin({tree:this.tree,label:this.tree.getLabel(F.item)},F));
this.addChild(C);
D[this.tree.store.getIdentity(F.item)]=C
},this);
B.forEach(this.getChildren(),function(C,F){C._updateLayout()
})
}return D
},deleteNode:function(A){A.destroy();
var D=this.getChildren();
if(D.length==0){this.isExpandable=false;
this.collapse()
}B.forEach(D,function(C){C._updateLayout()
})
},makeExpandable:function(){this.isExpandable=true;
this._setExpando(false)
}});
B.declare("dijit.Tree",dijit._TreeNode,{store:null,query:null,childrenAttr:["children"],templateString:'<div class="dijitTreeContainer" style="" waiRole="tree"\r\n\tdojoAttachEvent="onclick:_onClick,onkeypress:_onKeyPress">\r\n\t<div class="dijitTreeNode  dijitTreeIsRoot dijitTreeExpandLeaf dijitTreeChildrenNo" waiRole="presentation"\r\n\t\tdojoAttachPoint="rowNode"\r\n\t\t><span dojoAttachPoint="expandoNode" class="dijitTreeExpando" waiRole="presentation"\r\n\t\t></span\r\n\t\t><span dojoAttachPoint="expandoNodeText" class="dijitExpandoText" waiRole="presentation"\r\n\t\t></span\r\n\t\t>\r\n\t\t<div dojoAttachPoint="contentNode" class="dijitTreeContent" waiRole="presentation">\r\n\t\t\t<div dojoAttachPoint="iconNode" class="dijitInline dijitTreeIcon" waiRole="presentation"></div>\r\n\t\t\t<span dojoAttachPoint="labelNode" class="dijitTreeLabel" wairole="treeitem" tabindex="0"></span>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n',isExpandable:true,isTree:true,persist:true,dndController:null,dndParams:["onDndDrop","itemCreator","onDndCancel","checkAcceptance","checkItemAcceptance"],onDndDrop:null,itemCreator:null,onDndCancel:null,checkAcceptance:null,checkItemAcceptance:null,_publish:function(D,A){B.publish(this.id,[B.mixin({tree:this,event:D},A||{})])
},postMixInProperties:function(){this.tree=this;
this.lastFocused=this.labelNode;
this._itemNodeMap={};
this._hideRoot=!this.label;
if(!this.store.getFeatures()["dojo.data.api.Identity"]){throw new Error("dijit.tree requires access to a store supporting the dojo.data Identity api")
}if(!this.cookieName){this.cookieName=this.id+"SaveStateCookie"
}if(this.store.getFeatures()["dojo.data.api.Notification"]){this.connect(this.store,"onNew","_onNewItem");
this.connect(this.store,"onDelete","_onDeleteItem");
this.connect(this.store,"onSet","_onSetItem")
}},postCreate:function(){if(this.persist){var G=B.cookie(this.cookieName);
this._openedItemIds={};
if(G){B.forEach(G.split(","),function(C){this._openedItemIds[C]=true
},this)
}}var A=document.createElement("div");
A.style.display="none";
A.className="dijitTreeContainer";
dijit.setWaiRole(A,"presentation");
this.containerNodeTemplate=A;
if(this._hideRoot){this.rowNode.style.display="none"
}this.inherited("postCreate",arguments);
this._expandNode(this);
if(this.dndController){if(B.isString(this.dndController)){this.dndController=B.getObject(this.dndController)
}var F={};
for(var H=0;
H<this.dndParams.length;
H++){if(this[this.dndParams[H]]){F[this.dndParams[H]]=this[this.dndParams[H]]
}}this.dndController=new this.dndController(this,F)
}this.connect(this.domNode,B.isIE?"onactivate":"onfocus","_onTreeFocus")
},mayHaveChildren:function(A){return B.some(this.childrenAttr,function(D){return this.store.hasAttribute(A,D)
},this)
},getItemChildren:function(M,I){var L=this.store;
if(M==null){L.fetch({query:this.query,onComplete:I})
}else{var A=[];
for(var J=0;
J<this.childrenAttr.length;
J++){A=A.concat(L.getValues(M,this.childrenAttr[J]))
}var N=0;
B.forEach(A,function(C){if(!L.isItemLoaded(C)){N++
}});
if(N==0){I(A)
}else{function K(C){if(--N==0){I(A)
}}B.forEach(A,function(C){if(!L.isItemLoaded(C)){L.loadItem({item:C,onItem:K})
}})
}}},getItemParentIdentity:function(A,D){return this.store.getIdentity(D.item)
},getLabel:function(A){return this.store.getLabel(A)
},getIconClass:function(A){},getLabelClass:function(A){},_onLoadAllItems:function(E,F){var A=B.map(F,function(C){return{item:C,isExpandable:this.mayHaveChildren(C)}
},this);
B.mixin(this._itemNodeMap,E._setChildren(A));
this._expandNode(E)
},_onKeyPress:function(F){if(F.altKey){return 
}var H=dijit.getEnclosingWidget(F.target);
if(!H){return 
}if(F.charCode){var A=F.charCode;
if(!F.altKey&&!F.ctrlKey&&!F.shiftKey&&!F.metaKey){A=(String.fromCharCode(A)).toLowerCase();
this._onLetterKeyNav({node:H,key:A});
B.stopEvent(F)
}}else{var G=this._keyHandlerMap;
if(!G){G={};
G[B.keys.ENTER]="_onEnterKey";
G[B.keys.LEFT_ARROW]="_onLeftArrow";
G[B.keys.RIGHT_ARROW]="_onRightArrow";
G[B.keys.UP_ARROW]="_onUpArrow";
G[B.keys.DOWN_ARROW]="_onDownArrow";
G[B.keys.HOME]="_onHomeKey";
G[B.keys.END]="_onEndKey";
this._keyHandlerMap=G
}if(this._keyHandlerMap[F.keyCode]){this[this._keyHandlerMap[F.keyCode]]({node:H,item:H.item});
B.stopEvent(F)
}}},_onEnterKey:function(A){this._publish("execute",{item:A.item,node:A.node});
this.onClick(A.item,A.node)
},_onDownArrow:function(A){var D=this._navToNextNode(A.node);
if(D&&D.isTreeNode){D.tree.focusNode(D);
return D
}},_onUpArrow:function(A){var L=A.node;
var I=L;
var H=L.getPreviousSibling();
if(H){L=H;
while(L.isExpandable&&L.isExpanded&&L.hasChildren()){I=L;
var K=L.getChildren();
L=K[K.length-1]
}}else{var J=L.getParent();
if(!(this._hideRoot&&J===this)){L=J
}}if(L&&L.isTreeNode){I=L
}if(I&&I.isTreeNode){I.tree.focusNode(I);
return I
}},_onRightArrow:function(A){var F=A.node;
var E=F;
if(F.isExpandable&&!F.isExpanded){this._expandNode(F)
}else{if(F.hasChildren()){F=F.getChildren()[0]
}}if(F&&F.isTreeNode){E=F
}if(E&&E.isTreeNode){E.tree.focusNode(E);
return E
}},_onLeftArrow:function(A){var E=A.node;
var F=E;
if(E.isExpandable&&E.isExpanded){this._collapseNode(E)
}else{E=E.getParent()
}if(E&&E.isTreeNode){F=E
}if(F&&F.isTreeNode){F.tree.focusNode(F);
return F
}},_onHomeKey:function(){var A=this._navToRootOrFirstNode();
if(A){A.tree.focusNode(A);
return A
}},_onEndKey:function(F){var H=F.node.tree;
var G=H;
while(G.isExpanded){var A=G.getChildren();
G=A[A.length-1];
if(G.isTreeNode){H=G
}}if(H&&H.isTreeNode){H.tree.focusNode(H);
return H
}},_onLetterKeyNav:function(A){var E=startNode=A.node;
var F=A.key;
do{E=this._navToNextNode(E);
if(!E){E=this._navToRootOrFirstNode()
}}while(E!==startNode&&(E.label.charAt(0).toLowerCase()!=F));
if(E&&E.isTreeNode){if(E!==startNode){E.tree.focusNode(E)
}return E
}},_onClick:function(E){var A=E.target;
var F=dijit.getEnclosingWidget(A);
if(!F||!F.isTreeNode){return 
}if(A==F.expandoNode||A==F.expandoNodeText){if(F.isExpandable){this._onExpandoClick({node:F})
}}else{this._publish("execute",{item:F.item,node:F});
this.onClick(F.item,F);
this.focusNode(F)
}B.stopEvent(E)
},_onExpandoClick:function(A){var D=A.node;
if(D.isExpanded){this._collapseNode(D)
}else{this._expandNode(D)
}},onClick:function(A,D){},_navToNextNode:function(A){var D;
if(A.isExpandable&&A.isExpanded&&A.hasChildren()){D=A.getChildren()[0]
}else{while(A&&A.isTreeNode){D=A.getNextSibling();
if(D){break
}A=A.getParent()
}}return D
},_navToRootOrFirstNode:function(){if(!this._hideRoot){return this
}else{var A=this.getChildren()[0];
if(A&&A.isTreeNode){return A
}}},_collapseNode:function(A){if(A.isExpandable){if(A.state=="LOADING"){return 
}if(this.lastFocused){if(B.isDescendant(this.lastFocused.domNode,A.domNode)){this.focusNode(A)
}else{this.focusNode(this.lastFocused)
}}A.collapse();
if(this.persist&&A.item){delete this._openedItemIds[this.store.getIdentity(A.item)];
this._saveState()
}}},_expandNode:function(I){var J=I.tree;
if(J.lastFocused){J.focusNode(J.lastFocused)
}if(!I.isExpandable){return 
}var K=this.store;
var L=this.store.getValue;
switch(I.state){case"LOADING":return ;
case"UNCHECKED":I.markProcessing();
var A=this;
var H=function(C){I.unmarkProcessing();
A._onLoadAllItems(I,C)
};
this.getItemChildren(I.item,H);
break;
default:if(I.expand){I.expand();
if(this.persist&&I.item){this._openedItemIds[this.store.getIdentity(I.item)]=true;
this._saveState()
}}break
}},blurNode:function(){var A=this.lastFocused;
if(!A){return 
}var D=A.labelNode;
B.removeClass(D,"dijitTreeLabelFocused");
D.setAttribute("tabIndex","-1");
this.lastFocused=null
},focusNode:function(A){A.labelNode.focus()
},_onBlur:function(){if(this.lastFocused){var A=this.lastFocused.labelNode;
B.removeClass(A,"dijitTreeLabelFocused")
}},_onTreeFocus:function(F){var A=dijit.getEnclosingWidget(F.target);
if(A!=this.lastFocused){this.blurNode()
}var E=A.labelNode;
E.setAttribute("tabIndex","0");
B.addClass(E,"dijitTreeLabelFocused");
this.lastFocused=A
},_onNewItem:function(I,L){var H;
if(L){var J=this._itemNodeMap[this.getItemParentIdentity(I,L)];
if(!J||B.indexOf(this.childrenAttr,L.attribute)==-1){return 
}}var A={item:I,isExpandable:this.mayHaveChildren(I)};
if(J){if(!J.isExpandable){J.makeExpandable()
}if(J.state=="LOADED"||J.isExpanded){var K=J._addChildren([A])
}}else{var K=this._addChildren([A])
}if(K){B.mixin(this._itemNodeMap,K)
}},_onDeleteItem:function(A){var H=this.store.getIdentity(A);
var F=this._itemNodeMap[H];
if(F){var G=F.getParent();
G.deleteNode(F);
this._itemNodeMap[H]=null
}},_onSetItem:function(A){var D=this.store.getIdentity(A);
node=this._itemNodeMap[D];
if(node){node.setLabelNode(this.getLabel(A));
node._updateItemClasses(A)
}},_saveState:function(){if(!this.persist){return 
}var D=[];
for(var A in this._openedItemIds){D.push(A)
}B.cookie(this.cookieName,D.join(","))
}})
}}});