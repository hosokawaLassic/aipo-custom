dojo.provide("aipo.customize");
aipo.customize.positionInitialize=function(){dojo.query(".body-child").forEach(function(B){dojo.place(B,dojo.query("body")[0],"last")
})
};
aipo.customize.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(!!C){C.hide()
}}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};
aipo.customize.showMenu=function(H){var J=dojo.query("#menubar_"+H);
var L=dojo.query("#menubar_button_"+H);
if(J.length==0||L.length==0){return 
}var I=L[0].getBoundingClientRect();
var K=document.documentElement.getBoundingClientRect();
if(J.style("display")=="none"){dojo.query("div.menubar").style("display","none");
var G={left:document.documentElement.scrollLeft||document.body.scrollLeft,top:document.documentElement.scrollTop||document.body.scrollTop};
J.style("opacity","0");
J.style("display","block");
if(K.right-J[0].clientWidth>I.left){J.style("left",I.left+G.left+"px")
}else{J.style("left",I.right-J[0].clientWidth+G.left+"px")
}if(K.bottom-J[0].clientHeight>I.bottom){J.style("top",I.bottom+G.top+"px")
}else{J.style("top",I.top-J[0].clientHeight+G.top+"px")
}J.style("opacity","1");
if(dojo.byId("timeline_"+H)&&(dojo.query("div.timeline").length==1)){dojo.query("#accessControlDelete_"+H).style("display","none")
}}else{aipo.customize.hideMenu(H)
}};
aipo.customize.showMenuSchedule=function(L){var M=dojo.query("#menubar_"+L+"_date");
if(M.style("display")=="none"){dojo.query("div.menubar").style("display","none");
M.style("display","block");
if(dojo.byId("timeline_"+L)&&(dojo.query("div.timeline").length==1)){dojo.query("#accessControlDelete_"+L).style("display","none")
}var N=dojo.byId("indicateDate_"+L);
if(dojo.isIE){var H=function(A){var B=0;
while(A){B+=A.offsetLeft;
A=A.offsetParent
}return B
};
var K=function(A){var B=0;
while(A){B+=A.offsetTop;
A=A.offsetParent
}return B
};
var I=H(N)-H(N.offsetParent.offsetParent);
var J=K(N)-K(N.offsetParent.offsetParent)
}else{var I=N.offsetLeft-N.clientLeft;
var J=N.offsetTop-N.clientTop
}M.style("left",I+"px");
M.style("top",J+24+"px")
}else{aipo.customize.hideMenu(L)
}};
aipo.customize.hideMenu=function(D){var C=dojo.query("div.menubar").style("display","none")
};
aipo.customize.setController=function(J,M){var H=M.parentNode.id;
dojo.query("form#form"+J+' input[name="controller"]')[0].value=H;
var L=dojo.query("form#form"+J+" table.controllerTable td");
var K=L.length;
for(var N=0;
N<K;
N++){dojo.removeClass(L[N],"selected")
}var I=dojo.query("form#form"+J+" td#"+H)[0];
dojo.addClass(I,"selected")
};
aipo.customize.deletesubmit=function(D,F,E){if(confirm("このアプリを削除してもよろしいですか？")){aipo.customize.submit(D,F,E)
}};
aipo.customize.submit=function(E,H,F){try{dojo.xhrPost({url:E,timeout:30000,content:{portlet_id:H},encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(B,C){var A="";
if(dojo.isArray(B)&&B.length>0){if(B[0]=="PermissionError"){A+="<ul>";
A+="<li><span class='caution'>"+B[1]+"</span></li>";
A+="</ul>"
}else{A+="<ul>";
dojo.forEach(B,function(D){A+="<li><span class='caution'>"+D+"</span></li>"
});
A+="</ul>"
}}F.call(F,A);
if(A!=""){aimluck.io.disableForm(form,false)
}},error:function(A){}})
}catch(G){}};