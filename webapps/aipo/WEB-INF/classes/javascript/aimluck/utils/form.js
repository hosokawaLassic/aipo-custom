aimluck.namespace("utils.form");
aimluck.utils.form.createSelect=function(P,J,O,N,L,M,K,I){dojo.xhrGet({url:O,timeout:5000,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(A,C){var B="";
if(typeof I=="undefined"){B+='<select name="'+P+'">'
}else{B+='<select name="'+P+'" '+I+"/>"
}if(typeof K=="undefined"){B+=""
}else{B+=K
}dojo.forEach(A,function(D){if(typeof D[N]=="undefined"||typeof D[L]=="undefined"){}else{if(D[N]==M){B+="<option value='"+D[N]+"' selected='selected'>"+D[L]+"</option>"
}else{B+="<option value='"+D[N]+"'>"+D[L]+"</option>"
}}});
B+="</select>";
dojo.byId(J).innerHTML=B
}})
};
aimluck.utils.form.switchDisplay=function(C,D){dojo.html.setDisplay(dojo.byId(D),"none");
dojo.html.setDisplay(dojo.byId(C),"")
};