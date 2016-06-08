dojo._xdResourceLoaded({defineResource:function(B){aimluck.namespace("utils.form");
aimluck.utils.form.createSelect=function(O,A,N,M,K,L,J,P){B.xhrGet({url:N,timeout:5000,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(C,E){var D="";
if(typeof P=="undefined"){D+='<select name="'+O+'">'
}else{D+='<select name="'+O+'" '+P+"/>"
}if(typeof J=="undefined"){D+=""
}else{D+=J
}B.forEach(C,function(F){if(typeof F[M]=="undefined"||typeof F[K]=="undefined"){}else{if(F[M]==L){D+="<option value='"+F[M]+"' selected='selected'>"+F[K]+"</option>"
}else{D+="<option value='"+F[M]+"'>"+F[K]+"</option>"
}}});
D+="</select>";
B.byId(A).innerHTML=D
}})
};
aimluck.utils.form.switchDisplay=function(D,A){B.html.setDisplay(B.byId(A),"none");
B.html.setDisplay(B.byId(D),"")
}
}});