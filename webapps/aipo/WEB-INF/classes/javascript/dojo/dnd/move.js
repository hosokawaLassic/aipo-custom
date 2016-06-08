if(!dojo._hasResource["dojo.dnd.move"]){dojo._hasResource["dojo.dnd.move"]=true;
dojo.provide("dojo.dnd.move");
dojo.require("dojo.dnd.Mover");
dojo.require("dojo.dnd.Moveable");
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){},within:false,markupFactory:function(D,C){return new dojo.dnd.move.constrainedMoveable(C,D)
},constructor:function(C,D){if(!D){D={}
}this.constraints=D.constraints;
this.within=D.within
},onFirstMove:function(F){var E=this.constraintBox=this.constraints.call(this,F),D=F.marginBox;
E.r=E.l+E.w-(this.within?D.w:0);
E.b=E.t+E.h-(this.within?D.h:0)
},onMove:function(F,D){var E=this.constraintBox;
D.l=D.l<E.l?E.l:E.r<D.l?E.r:D.l;
D.t=D.t<E.t?E.t:E.b<D.t?E.b:D.t;
dojo.marginBox(F.node,D)
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},markupFactory:function(D,C){return new dojo.dnd.move.boxConstrainedMoveable(C,D)
},constructor:function(F,E){var D=E&&E.box;
this.constraints=function(){return D
}
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(D,C){return new dojo.dnd.move.parentConstrainedMoveable(C,D)
},constructor:function(F,E){var D=E&&E.area;
this.constraints=function(){var A=this.node.parentNode,C=dojo.getComputedStyle(A),B=dojo._getMarginBox(A,C);
if(D=="margin"){return B
}var H=dojo._getMarginExtents(A,C);
B.l+=H.l,B.t+=H.t,B.w-=H.w,B.h-=H.h;
if(D=="border"){return B
}H=dojo._getBorderExtents(A,C);
B.l+=H.l,B.t+=H.t,B.w-=H.w,B.h-=H.h;
if(D=="padding"){return B
}H=dojo._getPadExtents(A,C);
B.l+=H.l,B.t+=H.t,B.w-=H.w,B.h-=H.h;
return B
}
}});
dojo.dnd.move.constrainedMover=function(D,E){var F=function(B,A,C){dojo.dnd.Mover.call(this,B,A,C)
};
dojo.extend(F,dojo.dnd.Mover.prototype);
dojo.extend(F,{onMouseMove:function(B){dojo.dnd.autoScroll(B);
var J=this.marginBox,A=this.constraintBox,I=J.l+B.pageX,C=J.t+B.pageY;
I=I<A.l?A.l:A.r<I?A.r:I;
C=C<A.t?A.t:A.b<C?A.b:C;
this.host.onMove(this,{l:I,t:C})
},onFirstMove:function(){dojo.dnd.Mover.prototype.onFirstMove.call(this);
var A=this.constraintBox=D.call(this),B=this.marginBox;
A.r=A.l+A.w-(E?B.w:0);
A.b=A.t+A.h-(E?B.h:0)
}});
return F
};
dojo.dnd.move.boxConstrainedMover=function(D,C){return dojo.dnd.move.constrainedMover(function(){return D
},C)
};
dojo.dnd.move.parentConstrainedMover=function(E,F){var D=function(){var A=this.node.parentNode,C=dojo.getComputedStyle(A),B=dojo._getMarginBox(A,C);
if(E=="margin"){return B
}var H=dojo._getMarginExtents(A,C);
B.l+=H.l,B.t+=H.t,B.w-=H.w,B.h-=H.h;
if(E=="border"){return B
}H=dojo._getBorderExtents(A,C);
B.l+=H.l,B.t+=H.t,B.w-=H.w,B.h-=H.h;
if(E=="padding"){return B
}H=dojo._getPadExtents(A,C);
B.l+=H.l,B.t+=H.t,B.w-=H.w,B.h-=H.h;
return B
};
return dojo.dnd.move.constrainedMover(D,F)
};
dojo.dnd.constrainedMover=dojo.dnd.move.constrainedMover;
dojo.dnd.boxConstrainedMover=dojo.dnd.move.boxConstrainedMover;
dojo.dnd.parentConstrainedMover=dojo.dnd.move.parentConstrainedMover
};