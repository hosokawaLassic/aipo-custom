dojo._xdResourceLoaded({depends:[["provide","dojox.gfx._base"]],defineResource:function(B){if(!B._hasResource["dojox.gfx._base"]){B._hasResource["dojox.gfx._base"]=true;
B.provide("dojox.gfx._base");
dojox.gfx._hasClass=function(A,D){return((" "+A.getAttribute("className")+" ").indexOf(" "+D+" ")>=0)
};
dojox.gfx._addClass=function(A,E){var F=A.getAttribute("className");
if((" "+F+" ").indexOf(" "+E+" ")<0){A.setAttribute("className",F+(F?" ":"")+E)
}};
dojox.gfx._removeClass=function(A,D){A.setAttribute("className",A.getAttribute("className").replace(new RegExp("(^|\\s+)"+D+"(\\s+|$)"),"$1$2"))
};
dojox.gfx._base._getFontMeasurements=function(){var F={"1em":0,"1ex":0,"100%":0,"12pt":0,"16px":0,"xx-small":0,"x-small":0,small:0,medium:0,large:0,"x-large":0,"xx-large":0};
if(B.isIE){B.doc.documentElement.style.fontSize="100%"
}var A=B.doc.createElement("div");
A.style.position="absolute";
A.style.left="-100px";
A.style.top="0";
A.style.width="30px";
A.style.height="1000em";
A.style.border="0";
A.style.margin="0";
A.style.padding="0";
A.style.outline="0";
A.style.lineHeight="1";
A.style.overflow="hidden";
B.body().appendChild(A);
for(var E in F){A.style.fontSize=E;
F[E]=Math.round(A.offsetHeight*12/16)*16/12/1000
}B.body().removeChild(A);
A=null;
return F
};
dojox.gfx._base._fontMeasurements=null;
dojox.gfx._base._getCachedFontMeasurements=function(A){if(A||!dojox.gfx._base._fontMeasurements){dojox.gfx._base._fontMeasurements=dojox.gfx._base._getFontMeasurements()
}return dojox.gfx._base._fontMeasurements
};
dojox.gfx._base._uniqueId=0;
dojox.gfx._base._getUniqueId=function(){var A;
do{A="dojoUnique"+(++dojox.gfx._base._uniqueId)
}while(B.byId(A));
return A
};
B.mixin(dojox.gfx,{defaultPath:{type:"path",path:""},defaultPolyline:{type:"polyline",points:[]},defaultRect:{type:"rect",x:0,y:0,width:100,height:100,r:0},defaultEllipse:{type:"ellipse",cx:0,cy:0,rx:200,ry:100},defaultCircle:{type:"circle",cx:0,cy:0,r:100},defaultLine:{type:"line",x1:0,y1:0,x2:100,y2:100},defaultImage:{type:"image",x:0,y:0,width:0,height:0,src:""},defaultText:{type:"text",x:0,y:0,text:"",align:"start",decoration:"none",rotated:false,kerning:true},defaultTextPath:{type:"textpath",text:"",align:"start",decoration:"none",rotated:false,kerning:true},defaultStroke:{type:"stroke",color:"black",style:"solid",width:1,cap:"butt",join:4},defaultLinearGradient:{type:"linear",x1:0,y1:0,x2:100,y2:100,colors:[{offset:0,color:"black"},{offset:1,color:"white"}]},defaultRadialGradient:{type:"radial",cx:0,cy:0,r:100,colors:[{offset:0,color:"black"},{offset:1,color:"white"}]},defaultPattern:{type:"pattern",x:0,y:0,width:0,height:0,src:""},defaultFont:{type:"font",style:"normal",variant:"normal",weight:"normal",size:"10pt",family:"serif"},normalizeColor:function(A){return(A instanceof B.Color)?A:new B.Color(A)
},normalizeParameters:function(G,A){if(A){var F={};
for(var H in G){if(H in A&&!(H in F)){G[H]=A[H]
}}}return G
},makeParameters:function(F,A){if(!A){return B.clone(F)
}var H={};
for(var G in F){if(!(G in H)){H[G]=B.clone((G in A)?A[G]:F[G])
}}return H
},formatNumber:function(G,F){var A=G.toString();
if(A.indexOf("e")>=0){A=G.toFixed(4)
}else{var H=A.indexOf(".");
if(H>=0&&A.length-H>5){A=G.toFixed(4)
}}if(G<0){return A
}return F?" "+A:A
},makeFontString:function(A){return A.style+" "+A.variant+" "+A.weight+" "+A.size+" "+A.family
},splitFontString:function(A){var J=B.clone(dojox.gfx.defaultFont);
var G=A.split(/\s+/);
do{if(G.length<5){break
}J.style=G[0];
J.varian=G[1];
J.weight=G[2];
var H=G[3].indexOf("/");
J.size=H<0?G[3]:G[3].substring(0,H);
var I=4;
if(H<0){if(G[4]=="/"){I=6;
break
}if(G[4].substr(0,1)=="/"){I=5;
break
}}if(I+3>G.length){break
}J.size=G[I];
J.family=G[I+1]
}while(false);
return J
},cm_in_pt:72/2.54,mm_in_pt:7.2/2.54,px_in_pt:function(){return dojox.gfx._base._getCachedFontMeasurements()["12pt"]/12
},pt2px:function(A){return A*dojox.gfx.px_in_pt()
},px2pt:function(A){return A/dojox.gfx.px_in_pt()
},normalizedLength:function(F){if(F.length==0){return 0
}if(F.length>2){var A=dojox.gfx.px_in_pt();
var E=parseFloat(F);
switch(F.slice(-2)){case"px":return E;
case"pt":return E*A;
case"in":return E*72*A;
case"pc":return E*12*A;
case"mm":return E/dojox.gfx.mm_in_pt*A;
case"cm":return E/dojox.gfx.cm_in_pt*A
}}return parseFloat(F)
},pathVmlRegExp:/([A-Za-z]+)|(\d+(\.\d+)?)|(\.\d+)|(-\d+(\.\d+)?)|(-\.\d+)/g,pathSvgRegExp:/([A-Za-z])|(\d+(\.\d+)?)|(\.\d+)|(-\d+(\.\d+)?)|(-\.\d+)/g,equalSources:function(A,D){return A&&D&&A==D
}})
}}});