dojo._xdResourceLoaded({depends:[["provide","dojox.grid._grid.drag"]],defineResource:function(B){if(!B._hasResource["dojox.grid._grid.drag"]){B._hasResource["dojox.grid._grid.drag"]=true;
B.provide("dojox.grid._grid.drag");
(function(){var A=dojox.grid.drag={};
A.dragging=false;
A.hysteresis=2;
A.capture=function(D){if(D.setCapture){D.setCapture()
}else{document.addEventListener("mousemove",D.onmousemove,true);
document.addEventListener("mouseup",D.onmouseup,true);
document.addEventListener("click",D.onclick,true)
}};
A.release=function(D){if(D.releaseCapture){D.releaseCapture()
}else{document.removeEventListener("click",D.onclick,true);
document.removeEventListener("mouseup",D.onmouseup,true);
document.removeEventListener("mousemove",D.onmousemove,true)
}};
A.start=function(I,J,H,L,K){if(!I||A.dragging){console.debug("failed to start drag: bad input node or already dragging");
return 
}A.dragging=true;
A.elt=I;
A.events={drag:J||dojox.grid.nop,end:H||dojox.grid.nop,start:K||dojox.grid.nop,oldmove:I.onmousemove,oldup:I.onmouseup,oldclick:I.onclick};
A.positionX=(L&&("screenX" in L)?L.screenX:false);
A.positionY=(L&&("screenY" in L)?L.screenY:false);
A.started=(A.position===false);
I.onmousemove=A.mousemove;
I.onmouseup=A.mouseup;
I.onclick=A.click;
A.capture(A.elt)
};
A.end=function(){A.release(A.elt);
A.elt.onmousemove=A.events.oldmove;
A.elt.onmouseup=A.events.oldup;
A.elt.onclick=A.events.oldclick;
A.elt=null;
try{if(A.started){A.events.end()
}}finally{A.dragging=false
}};
A.calcDelta=function(D){D.deltaX=D.screenX-A.positionX;
D.deltaY=D.screenY-A.positionY
};
A.hasMoved=function(D){return Math.abs(D.deltaX)+Math.abs(D.deltaY)>A.hysteresis
};
A.mousemove=function(D){D=B.fixEvent(D);
B.stopEvent(D);
A.calcDelta(D);
if((!A.started)&&(A.hasMoved(D))){A.events.start(D);
A.started=true
}if(A.started){A.events.drag(D)
}};
A.mouseup=function(D){B.stopEvent(B.fixEvent(D));
A.end()
};
A.click=function(D){B.stopEvent(B.fixEvent(D))
}
})()
}}});