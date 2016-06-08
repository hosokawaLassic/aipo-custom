if(!dojo._hasResource["dojox.grid._grid.drag"]){dojo._hasResource["dojox.grid._grid.drag"]=true;
dojo.provide("dojox.grid._grid.drag");
(function(){var B=dojox.grid.drag={};
B.dragging=false;
B.hysteresis=2;
B.capture=function(A){if(A.setCapture){A.setCapture()
}else{document.addEventListener("mousemove",A.onmousemove,true);
document.addEventListener("mouseup",A.onmouseup,true);
document.addEventListener("click",A.onclick,true)
}};
B.release=function(A){if(A.releaseCapture){A.releaseCapture()
}else{document.removeEventListener("click",A.onclick,true);
document.removeEventListener("mouseup",A.onmouseup,true);
document.removeEventListener("mousemove",A.onmousemove,true)
}};
B.start=function(G,H,A,J,I){if(!G||B.dragging){console.debug("failed to start drag: bad input node or already dragging");
return 
}B.dragging=true;
B.elt=G;
B.events={drag:H||dojox.grid.nop,end:A||dojox.grid.nop,start:I||dojox.grid.nop,oldmove:G.onmousemove,oldup:G.onmouseup,oldclick:G.onclick};
B.positionX=(J&&("screenX" in J)?J.screenX:false);
B.positionY=(J&&("screenY" in J)?J.screenY:false);
B.started=(B.position===false);
G.onmousemove=B.mousemove;
G.onmouseup=B.mouseup;
G.onclick=B.click;
B.capture(B.elt)
};
B.end=function(){B.release(B.elt);
B.elt.onmousemove=B.events.oldmove;
B.elt.onmouseup=B.events.oldup;
B.elt.onclick=B.events.oldclick;
B.elt=null;
try{if(B.started){B.events.end()
}}finally{B.dragging=false
}};
B.calcDelta=function(A){A.deltaX=A.screenX-B.positionX;
A.deltaY=A.screenY-B.positionY
};
B.hasMoved=function(A){return Math.abs(A.deltaX)+Math.abs(A.deltaY)>B.hysteresis
};
B.mousemove=function(A){A=dojo.fixEvent(A);
dojo.stopEvent(A);
B.calcDelta(A);
if((!B.started)&&(B.hasMoved(A))){B.events.start(A);
B.started=true
}if(B.started){B.events.drag(A)
}};
B.mouseup=function(A){dojo.stopEvent(dojo.fixEvent(A));
B.end()
};
B.click=function(A){dojo.stopEvent(dojo.fixEvent(A))
}
})()
};