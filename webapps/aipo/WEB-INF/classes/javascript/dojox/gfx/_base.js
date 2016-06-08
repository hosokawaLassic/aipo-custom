if(!dojo._hasResource["dojox.gfx._base"]){dojo._hasResource["dojox.gfx._base"]=true;
dojo.provide("dojox.gfx._base");
dojox.gfx._hasClass=function(D,C){return((" "+D.getAttribute("className")+" ").indexOf(" "+C+" ")>=0)
};
dojox.gfx._addClass=function(E,F){var D=E.getAttribute("className");
if((" "+D+" ").indexOf(" "+F+" ")<0){E.setAttribute("className",D+(D?" ":"")+F)
}};
dojox.gfx._removeClass=function(D,C){D.setAttribute("className",D.getAttribute("className").replace(new RegExp("(^|\\s+)"+C+"(\\s+|$)"),"$1$2"))
};
dojox.gfx._base._getFontMeasurements=function(){var D={"1em":0,"1ex":0,"100%":0,"12pt":0,"16px":0,"xx-small":0,"x-small":0,small:0,medium:0,large:0,"x-large":0,"xx-large":0};
if(dojo.isIE){dojo.doc.documentElement.style.fontSize="100%"
}var E=dojo.doc.createElement("div");
E.style.position="absolute";
E.style.left="-100px";
E.style.top="0";
E.style.width="30px";
E.style.height="1000em";
E.style.border="0";
E.style.margin="0";
E.style.padding="0";
E.style.outline="0";
E.style.lineHeight="1";
E.style.overflow="hidden";
dojo.body().appendChild(E);
for(var F in D){E.style.fontSize=F;
D[F]=Math.round(E.offsetHeight*12/16)*16/12/1000
}dojo.body().removeChild(E);
E=null;
return D
};
dojox.gfx._base._fontMeasurements=null;
dojox.gfx._base._getCachedFontMeasurements=function(B){if(B||!dojox.gfx._base._fontMeasurements){dojox.gfx._base._fontMeasurements=dojox.gfx._base._getFontMeasurements()
}return dojox.gfx._base._fontMeasurements
};
dojox.gfx._base._uniqueId=0;
dojox.gfx._base._getUniqueId=function(){var B;
do{B="dojoUnique"+(++dojox.gfx._base._uniqueId)
}while(dojo.byId(B));
return B
};
dojo.mixin(dojox.gfx,{defaultPath:{type:"path",path:""},defaultPolyline:{type:"polyline",points:[]},defaultRect:{type:"rect",x:0,y:0,width:100,height:100,r:0},defaultEllipse:{type:"ellipse",cx:0,cy:0,rx:200,ry:100},defaultCircle:{type:"circle",cx:0,cy:0,r:100},defaultLine:{type:"line",x1:0,y1:0,x2:100,y2:100},defaultImage:{type:"image",x:0,y:0,width:0,height:0,src:""},defaultText:{type:"text",x:0,y:0,text:"",align:"start",decoration:"none",rotated:false,kerning:true},defaultTextPath:{type:"textpath",text:"",align:"start",decoration:"none",rotated:false,kerning:true},defaultStroke:{type:"stroke",color:"black",style:"solid",width:1,cap:"butt",join:4},defaultLinearGradient:{type:"linear",x1:0,y1:0,x2:100,y2:100,colors:[{offset:0,color:"black"},{offset:1,color:"white"}]},defaultRadialGradient:{type:"radial",cx:0,cy:0,r:100,colors:[{offset:0,color:"black"},{offset:1,color:"white"}]},defaultPattern:{type:"pattern",x:0,y:0,width:0,height:0,src:""},defaultFont:{type:"font",style:"normal",variant:"normal",weight:"normal",size:"10pt",family:"serif"},normalizeColor:function(B){return(B instanceof dojo.Color)?B:new dojo.Color(B)
},normalizeParameters:function(H,F){if(F){var G={};
for(var E in H){if(E in F&&!(E in G)){H[E]=F[E]
}}}return H
},makeParameters:function(G,F){if(!F){return dojo.clone(G)
}var E={};
for(var H in G){if(!(H in E)){E[H]=dojo.clone((H in F)?F[H]:G[H])
}}return E
},formatNumber:function(H,G){var F=H.toString();
if(F.indexOf("e")>=0){F=H.toFixed(4)
}else{var E=F.indexOf(".");
if(E>=0&&F.length-E>5){F=H.toFixed(4)
}}if(H<0){return F
}return G?" "+F:F
},makeFontString:function(B){return B.style+" "+B.variant+" "+B.weight+" "+B.size+" "+B.family
},splitFontString:function(G){var F=dojo.clone(dojox.gfx.defaultFont);
var H=G.split(/\s+/);
do{if(H.length<5){break
}F.style=H[0];
F.varian=H[1];
F.weight=H[2];
var I=H[3].indexOf("/");
F.size=I<0?H[3]:H[3].substring(0,I);
var J=4;
if(I<0){if(H[4]=="/"){J=6;
break
}if(H[4].substr(0,1)=="/"){J=5;
break
}}if(J+3>H.length){break
}F.size=H[J];
F.family=H[J+1]
}while(false);
return F
},cm_in_pt:72/2.54,mm_in_pt:7.2/2.54,px_in_pt:function(){return dojox.gfx._base._getCachedFontMeasurements()["12pt"]/12
},pt2px:function(B){return B*dojox.gfx.px_in_pt()
},px2pt:function(B){return B/dojox.gfx.px_in_pt()
},normalizedLength:function(D){if(D.length==0){return 0
}if(D.length>2){var E=dojox.gfx.px_in_pt();
var F=parseFloat(D);
switch(D.slice(-2)){case"px":return F;
case"pt":return F*E;
case"in":return F*72*E;
case"pc":return F*12*E;
case"mm":return F/dojox.gfx.mm_in_pt*E;
case"cm":return F/dojox.gfx.cm_in_pt*E
}}return parseFloat(D)
},pathVmlRegExp:/([A-Za-z]+)|(\d+(\.\d+)?)|(\.\d+)|(-\d+(\.\d+)?)|(-\.\d+)/g,pathSvgRegExp:/([A-Za-z])|(\d+(\.\d+)?)|(\.\d+)|(-\d+(\.\d+)?)|(-\.\d+)/g,equalSources:function(D,C){return D&&C&&D==C
}})
};