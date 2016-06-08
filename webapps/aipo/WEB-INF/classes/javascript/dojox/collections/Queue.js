if(!dojo._hasResource["dojox.collections.Queue"]){dojo._hasResource["dojox.collections.Queue"]=true;
dojo.provide("dojox.collections.Queue");
dojo.require("dojox.collections._base");
dojox.collections.Queue=function(C){var D=[];
if(C){D=D.concat(C)
}this.count=D.length;
this.clear=function(){D=[];
this.count=D.length
};
this.clone=function(){return new dojox.collections.Queue(D)
};
this.contains=function(A){for(var B=0;
B<D.length;
B++){if(D[B]==A){return true
}}return false
};
this.copyTo=function(B,A){B.splice(A,0,D)
};
this.dequeue=function(){var A=D.shift();
this.count=D.length;
return A
};
this.enqueue=function(A){this.count=D.push(A)
};
this.forEach=function(A,B){dojo.forEach(D,A,B)
};
this.getIterator=function(){return new dojox.collections.Iterator(D)
};
this.peek=function(){return D[0]
};
this.toArray=function(){return[].concat(D)
}
}
};