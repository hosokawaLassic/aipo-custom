dojo._xdResourceLoaded({depends:[["provide","dojox.collections.BinaryTree"],["require","dojox.collections._base"]],defineResource:function(B){if(!B._hasResource["dojox.collections.BinaryTree"]){B._hasResource["dojox.collections.BinaryTree"]=true;
B.provide("dojox.collections.BinaryTree");
B.require("dojox.collections._base");
dojox.collections.BinaryTree=function(A){function L(D,C,E){this.value=D||null;
this.right=C||null;
this.left=E||null;
this.clone=function(){var F=new L();
if(this.value.value){F.value=this.value.clone()
}else{F.value=this.value
}if(this.left!=null){F.left=this.left.clone()
}if(this.right!=null){F.right=this.right.clone()
}return F
};
this.compare=function(F){if(this.value>F.value){return 1
}if(this.value<F.value){return -1
}return 0
};
this.compareData=function(F){if(this.value>F){return 1
}if(this.value<F){return -1
}return 0
}
}function N(C,D){if(C){N(C.left,D);
D.push(C.value);
N(C.right,D)
}}function J(C,E){var D="";
if(C){D=C.value.toString()+E;
D+=J(C.left,E);
D+=J(C.right,E)
}return D
}function K(C,E){var D="";
if(C){D=K(C.left,E);
D+=C.value.toString()+E;
D+=K(C.right,E)
}return D
}function M(C,E){var D="";
if(C){D=M(C.left,E);
D+=M(C.right,E);
D+=C.value.toString()+E
}return D
}function O(C,D){if(!C){return null
}var E=C.compareData(D);
if(E==0){return C
}if(E>0){return O(C.left,D)
}else{return O(C.right,D)
}}this.add=function(C){var F=new L(C);
var E;
var G=P;
var D=null;
while(G){E=G.compare(F);
if(E==0){return 
}D=G;
if(E>0){G=G.left
}else{G=G.right
}}this.count++;
if(!D){P=F
}else{E=D.compare(F);
if(E>0){D.left=F
}else{D.right=F
}}};
this.clear=function(){P=null;
this.count=0
};
this.clone=function(){var C=new dojox.collections.BinaryTree();
var D=this.getIterator();
while(!D.atEnd()){C.add(D.get())
}return C
};
this.contains=function(C){return this.search(C)!=null
};
this.deleteData=function(G){var F=P;
var D=null;
var E=F.compareData(G);
while(E!=0&&F!=null){if(E>0){D=F;
F=F.left
}else{if(E<0){D=F;
F=F.right
}}E=F.compareData(G)
}if(!F){return 
}this.count--;
if(!F.right){if(!D){P=F.left
}else{E=D.compare(F);
if(E>0){D.left=F.left
}else{if(E<0){D.right=F.left
}}}}else{if(!F.right.left){if(!D){P=F.right
}else{E=D.compare(F);
if(E>0){D.left=F.right
}else{if(E<0){D.right=F.right
}}}}else{var H=F.right.left;
var C=F.right;
while(H.left!=null){C=H;
H=H.left
}C.left=H.right;
H.left=F.left;
H.right=F.right;
if(!D){P=H
}else{E=D.compare(F);
if(E>0){D.left=H
}else{if(E<0){D.right=H
}}}}}};
this.getIterator=function(){var C=[];
N(P,C);
return new dojox.collections.Iterator(C)
};
this.search=function(C){return O(P,C)
};
this.toString=function(E,D){if(!E){E=dojox.collections.BinaryTree.TraversalMethods.Inorder
}if(!D){D=","
}var C="";
switch(E){case dojox.collections.BinaryTree.TraversalMethods.Preorder:C=J(P,D);
break;
case dojox.collections.BinaryTree.TraversalMethods.Inorder:C=K(P,D);
break;
case dojox.collections.BinaryTree.TraversalMethods.Postorder:C=M(P,D);
break
}if(C.length==0){return""
}else{return C.substring(0,C.length-D.length)
}};
this.count=0;
var P=this.root=null;
if(A){this.add(A)
}};
dojox.collections.BinaryTree.TraversalMethods={Preorder:1,Inorder:2,Postorder:3}
}}});