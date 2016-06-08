if(!dojo._hasResource["dojox.collections.BinaryTree"]){dojo._hasResource["dojox.collections.BinaryTree"]=true;
dojo.provide("dojox.collections.BinaryTree");
dojo.require("dojox.collections._base");
dojox.collections.BinaryTree=function(J){function M(B,A,C){this.value=B||null;
this.right=A||null;
this.left=C||null;
this.clone=function(){var D=new M();
if(this.value.value){D.value=this.value.clone()
}else{D.value=this.value
}if(this.left!=null){D.left=this.left.clone()
}if(this.right!=null){D.right=this.right.clone()
}return D
};
this.compare=function(D){if(this.value>D.value){return 1
}if(this.value<D.value){return -1
}return 0
};
this.compareData=function(D){if(this.value>D){return 1
}if(this.value<D){return -1
}return 0
}
}function O(A,B){if(A){O(A.left,B);
B.push(A.value);
O(A.right,B)
}}function K(A,C){var B="";
if(A){B=A.value.toString()+C;
B+=K(A.left,C);
B+=K(A.right,C)
}return B
}function L(A,C){var B="";
if(A){B=L(A.left,C);
B+=A.value.toString()+C;
B+=L(A.right,C)
}return B
}function N(A,C){var B="";
if(A){B=N(A.left,C);
B+=N(A.right,C);
B+=A.value.toString()+C
}return B
}function P(A,B){if(!A){return null
}var C=A.compareData(B);
if(C==0){return A
}if(C>0){return P(A.left,B)
}else{return P(A.right,B)
}}this.add=function(B){var E=new M(B);
var D;
var A=I;
var C=null;
while(A){D=A.compare(E);
if(D==0){return 
}C=A;
if(D>0){A=A.left
}else{A=A.right
}}this.count++;
if(!C){I=E
}else{D=C.compare(E);
if(D>0){C.left=E
}else{C.right=E
}}};
this.clear=function(){I=null;
this.count=0
};
this.clone=function(){var A=new dojox.collections.BinaryTree();
var B=this.getIterator();
while(!B.atEnd()){A.add(B.get())
}return A
};
this.contains=function(A){return this.search(A)!=null
};
this.deleteData=function(F){var E=I;
var C=null;
var D=E.compareData(F);
while(D!=0&&E!=null){if(D>0){C=E;
E=E.left
}else{if(D<0){C=E;
E=E.right
}}D=E.compareData(F)
}if(!E){return 
}this.count--;
if(!E.right){if(!C){I=E.left
}else{D=C.compare(E);
if(D>0){C.left=E.left
}else{if(D<0){C.right=E.left
}}}}else{if(!E.right.left){if(!C){I=E.right
}else{D=C.compare(E);
if(D>0){C.left=E.right
}else{if(D<0){C.right=E.right
}}}}else{var A=E.right.left;
var B=E.right;
while(A.left!=null){B=A;
A=A.left
}B.left=A.right;
A.left=E.left;
A.right=E.right;
if(!C){I=A
}else{D=C.compare(E);
if(D>0){C.left=A
}else{if(D<0){C.right=A
}}}}}};
this.getIterator=function(){var A=[];
O(I,A);
return new dojox.collections.Iterator(A)
};
this.search=function(A){return P(I,A)
};
this.toString=function(C,B){if(!C){C=dojox.collections.BinaryTree.TraversalMethods.Inorder
}if(!B){B=","
}var A="";
switch(C){case dojox.collections.BinaryTree.TraversalMethods.Preorder:A=K(I,B);
break;
case dojox.collections.BinaryTree.TraversalMethods.Inorder:A=L(I,B);
break;
case dojox.collections.BinaryTree.TraversalMethods.Postorder:A=N(I,B);
break
}if(A.length==0){return""
}else{return A.substring(0,A.length-B.length)
}};
this.count=0;
var I=this.root=null;
if(J){this.add(J)
}};
dojox.collections.BinaryTree.TraversalMethods={Preorder:1,Inorder:2,Postorder:3}
};