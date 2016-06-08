dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.move"],["require","dojo.dnd.Mover"],["require","dojo.dnd.Moveable"]],defineResource:function(B){if(!B._hasResource["dojo.dnd.move"]){B._hasResource["dojo.dnd.move"]=true;
B.provide("dojo.dnd.move");
B.require("dojo.dnd.Mover");
B.require("dojo.dnd.Moveable");
B.declare("dojo.dnd.move.constrainedMoveable",B.dnd.Moveable,{constraints:function(){},within:false,markupFactory:function(A,D){return new B.dnd.move.constrainedMoveable(D,A)
},constructor:function(D,A){if(!A){A={}
}this.constraints=A.constraints;
this.within=A.within
},onFirstMove:function(E){var A=this.constraintBox=this.constraints.call(this,E),F=E.marginBox;
A.r=A.l+A.w-(this.within?F.w:0);
A.b=A.t+A.h-(this.within?F.h:0)
},onMove:function(E,F){var A=this.constraintBox;
F.l=F.l<A.l?A.l:A.r<F.l?A.r:F.l;
F.t=F.t<A.t?A.t:A.b<F.t?A.b:F.t;
B.marginBox(E.node,F)
}});
B.declare("dojo.dnd.move.boxConstrainedMoveable",B.dnd.move.constrainedMoveable,{box:{},markupFactory:function(A,D){return new B.dnd.move.boxConstrainedMoveable(D,A)
},constructor:function(E,A){var F=A&&A.box;
this.constraints=function(){return F
}
}});
B.declare("dojo.dnd.move.parentConstrainedMoveable",B.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(A,D){return new B.dnd.move.parentConstrainedMoveable(D,A)
},constructor:function(E,A){var F=A&&A.area;
this.constraints=function(){var C=this.node.parentNode,I=B.getComputedStyle(C),D=B._getMarginBox(C,I);
if(F=="margin"){return D
}var J=B._getMarginExtents(C,I);
D.l+=J.l,D.t+=J.t,D.w-=J.w,D.h-=J.h;
if(F=="border"){return D
}J=B._getBorderExtents(C,I);
D.l+=J.l,D.t+=J.t,D.w-=J.w,D.h-=J.h;
if(F=="padding"){return D
}J=B._getPadExtents(C,I);
D.l+=J.l,D.t+=J.t,D.w-=J.w,D.h-=J.h;
return D
}
}});
B.dnd.move.constrainedMover=function(F,A){var E=function(D,C,H){B.dnd.Mover.call(this,D,C,H)
};
B.extend(E,B.dnd.Mover.prototype);
B.extend(E,{onMouseMove:function(D){B.dnd.autoScroll(D);
var L=this.marginBox,C=this.constraintBox,K=L.l+D.pageX,J=L.t+D.pageY;
K=K<C.l?C.l:C.r<K?C.r:K;
J=J<C.t?C.t:C.b<J?C.b:J;
this.host.onMove(this,{l:K,t:J})
},onFirstMove:function(){B.dnd.Mover.prototype.onFirstMove.call(this);
var C=this.constraintBox=F.call(this),D=this.marginBox;
C.r=C.l+C.w-(A?D.w:0);
C.b=C.t+C.h-(A?D.h:0)
}});
return E
};
B.dnd.move.boxConstrainedMover=function(A,D){return B.dnd.move.constrainedMover(function(){return A
},D)
};
B.dnd.move.parentConstrainedMover=function(A,E){var F=function(){var C=this.node.parentNode,I=B.getComputedStyle(C),D=B._getMarginBox(C,I);
if(A=="margin"){return D
}var J=B._getMarginExtents(C,I);
D.l+=J.l,D.t+=J.t,D.w-=J.w,D.h-=J.h;
if(A=="border"){return D
}J=B._getBorderExtents(C,I);
D.l+=J.l,D.t+=J.t,D.w-=J.w,D.h-=J.h;
if(A=="padding"){return D
}J=B._getPadExtents(C,I);
D.l+=J.l,D.t+=J.t,D.w-=J.w,D.h-=J.h;
return D
};
return B.dnd.move.constrainedMover(F,E)
};
B.dnd.constrainedMover=B.dnd.move.constrainedMover;
B.dnd.boxConstrainedMover=B.dnd.move.boxConstrainedMover;
B.dnd.parentConstrainedMover=B.dnd.move.parentConstrainedMover
}}});