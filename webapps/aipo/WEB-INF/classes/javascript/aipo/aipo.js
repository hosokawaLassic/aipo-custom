window.aipo=window.aipo||{};
aipo.namespace=function(G){if(!G||!G.length){return null
}var F=G.split(".");
var H=aipo;
for(var E=(F[0]=="aipo")?1:0;
E<F.length;
++E){H[F[E]]=H[F[E]]||{};
H=H[F[E]]
}return H
};
var ptConfig=[];
aipo.onReceiveMessage=function(E,F){if(!E){var D=dijit.byId("modalDialog");
D.hide();
aipo.portletReload(F)
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=E
}};
aipo.getCookie=function(J){var K="";
var H=0;
var I=0;
var G=J+"=";
var L="";
while(H<document.cookie.length){I=H+G.length;
if(document.cookie.substring(H,I)==G){L=document.cookie.indexOf(";",I);
if(L==-1){K=document.cookie.substring(I,document.cookie.length)
}else{K=document.cookie.substring(I,L)
}break
}H=document.cookie.indexOf(" ",H)+1;
if(H==0){break
}}return K
};
aipo.setCookie=function(J,G,H,I){var F=new Date();
F.setTime(F.getTime()+(typeof I!="number"?10*24*60*60*1000:I));
if(typeof H=="undefined"||H==null){document.cookie=J+"="+G+"; expires="+F.toGMTString()+"; path=${context_path}/"
}else{document.cookie=J+"="+G+"; expires="+F.toGMTString()+"; path="+H
}};
aipo.removeCookie=function remove_cookie(H,G){var F;
var E=new Date();
E.setTime(E.getTime()-1);
F=get_cookie(H);
if(typeof G=="undefined"){document.cookie=H+"="+F+"; expires="+E.toGMTString()+"; path=${context_path}/"
}else{document.cookie=H+"="+F+"; expires="+E.toGMTString()+"; path="+G
}};
aipo.portletReload=function(E,F){for(var D in ptConfig){if(D!=F){if(ptConfig[D].group==E){ptConfig[D].reloadFunction.call(ptConfig[D].reloadFunction,D)
}}}};
aipo.reloadPage=function(B){if(typeof ptConfig[B].reloadUrl=="undefined"){aipo.viewPage(ptConfig[B].initUrl,B)
}else{aipo.viewPage(ptConfig[B].reloadUrl,B)
}};
var setMouseListener=function(){aipo.customize.positionInitialize();
dojo.query(".customizeMenuIcon,.menubarOpenButton").forEach(function(A){dojo.connect(A,"onmouseenter",null,function(){dojo.addClass(this,"customizeMenuIconMouseenter")
});
dojo.connect(A,"onmouseleave",null,function(){dojo.removeClass(this,"customizeMenuIconMouseenter")
})
});
var B=dojo.connect(dojo.query("body")[0],"onclick",null,function(){if(dojo.query(".customizeMenuIconMouseenter").length==0){dojo.query("div.menubar").style("display","none")
}});
if(aipo.onloadSmartPhone!=null){aipo.onloadSmartPhone()
}};
aipo.viewPage=function(E,H,F){var G=dijit.byId("portlet_"+H);
if(!G){G=new aimluck.widget.Contentpane({},"portlet_"+H)
}if(G){ptConfig[H].reloadUrl=E;
if(F){for(i=0;
i<F.length;
i++){G.setParam(F[i][0],F[i][1])
}}G.onLoad=dojo.hitch(G.onLoad,setMouseListener);
G.viewPage(E)
}};
aipo.errorTreatment=function(D,C){if(D.error){if(D.error==1){window.location.href=C
}else{return true
}return false
}else{return true
}};
var favicon={change:function(B){this.addLink(B,"icon");
this.addLink(B,"shortcut icon")
},addLink:function(E,F){var D=document.createElement("link");
D.type="image/x-icon";
D.rel=F;
D.href=E;
this.removeLinkIfExists(F);
this.docHead.appendChild(D)
},removeLinkIfExists:function(F){var E=this.docHead.getElementsByTagName("link");
for(var H=0;
H<E.length;
H++){var G=E[H];
if(G.type=="image/x-icon"&&G.rel==F){this.docHead.removeChild(G);
return 
}}},docHead:document.getElementsByTagName("head")[0]};
function CronTask(F,D,E){this.task=F;
this.isDecay=E;
this.interval=D;
this.decayRate=1;
this.decayMultiplier=1.5;
this.maxDecayTime=5*60*1000
}CronTask.prototype={start:function(){this.stop().run();
return this
},stop:function(){if(this.worker){window.clearTimeout(this.worker)
}return this
},run:function(){var B=this;
this.task(function(){B.decayRate=B.isDecay?Math.max(1,B.decayRate/B.decayMultiplier):B.decayRate*B.decayMultiplier;
var A=B.interval*B.decayRate;
if(!B.isDecay){A=(A>=B.maxDecayTime)?B.maxDecayTime:A
}A=Math.floor(A);
B.worker=window.setTimeout(function(){B.run.call(B)
},A)
})
},reset:function(){this.destroy().run();
return this
},destroy:function(){this.stop();
this.decayRate=1;
return this
}};
aipo.userAgent={__userAgent:window.navigator.userAgent.toLowerCase(),isAndroid:function(){return this.__userAgent.indexOf("android")>-1
},isIphone:function(){return this.__userAgent.indexOf("iphone")>-1
},isSmartPhone:function(){return this.isAndroid()||this.isIphone()
}};
aipo.escapeHTML=function(D){var C=function(A){switch(A){case"<":return"&lt;";
case">":return"&gt;";
case"&":return"&amp;";
case"'":return"&#39;";
case'"':return"&quot;"
}return"?"
};
return String(D).replace(/[<>&"']/g,C)
};