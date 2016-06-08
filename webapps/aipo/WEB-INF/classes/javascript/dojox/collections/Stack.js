if(!dojo._hasResource["dojox.collections.Stack"]){dojo._hasResource["dojox.collections.Stack"]=true;
dojo.provide("dojox.collections.Stack");
dojo.require("dojox.collections._base");
dojox.collections.Stack=function(C){var D=[];
if(C){D=D.concat(C)
}this.count=D.length;
this.clear=function(){D=[];
this.count=D.length
};
this.clone=function(){return new dojox.collections.Stack(D)
};
this.contains=function(A){for(var B=0;
B<D.length;
B++){if(D[B]==A){return true
}}return false
};
this.copyTo=function(B,A){B.splice(A,0,D)
};
this.forEach=function(A,B){dojo.forEach(D,A,B)
};
this.getIterator=function(){return new dojox.collections.Iterator(D)
};
this.peek=function(){return D[(D.length-1)]
};
this.pop=function(){var A=D.pop();
this.count=D.length;
return A
};
this.push=function(A){this.count=D.push(A)
};
this.toArray=function(){return[].concat(D)
}
}
};