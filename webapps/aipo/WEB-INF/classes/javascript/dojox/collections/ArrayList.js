if(!dojo._hasResource["dojox.collections.ArrayList"]){dojo._hasResource["dojox.collections.ArrayList"]=true;
dojo.provide("dojox.collections.ArrayList");
dojo.require("dojox.collections._base");
dojox.collections.ArrayList=function(C){var D=[];
if(C){D=D.concat(C)
}this.count=D.length;
this.add=function(A){D.push(A);
this.count=D.length
};
this.addRange=function(F){if(F.getIterator){var A=F.getIterator();
while(!A.atEnd()){this.add(A.get())
}this.count=D.length
}else{for(var B=0;
B<F.length;
B++){D.push(F[B])
}this.count=D.length
}};
this.clear=function(){D.splice(0,D.length);
this.count=0
};
this.clone=function(){return new dojox.collections.ArrayList(D)
};
this.contains=function(A){for(var B=0;
B<D.length;
B++){if(D[B]==A){return true
}}return false
};
this.forEach=function(A,B){dojo.forEach(D,A,B)
};
this.getIterator=function(){return new dojox.collections.Iterator(D)
};
this.indexOf=function(A){for(var B=0;
B<D.length;
B++){if(D[B]==A){return B
}}return -1
};
this.insert=function(B,A){D.splice(B,0,A);
this.count=D.length
};
this.item=function(A){return D[A]
};
this.remove=function(A){var B=this.indexOf(A);
if(B>=0){D.splice(B,1)
}this.count=D.length
};
this.removeAt=function(A){D.splice(A,1);
this.count=D.length
};
this.reverse=function(){D.reverse()
};
this.sort=function(A){if(A){D.sort(A)
}else{D.sort()
}};
this.setByIndex=function(B,A){D[B]=A;
this.count=D.length
};
this.toArray=function(){return[].concat(D)
};
this.toString=function(A){return D.join((A||","))
}
}
};