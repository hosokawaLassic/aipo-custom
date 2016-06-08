dojo._xdResourceLoaded({depends:[["provide","dojo.parser"],["require","dojo.date.stamp"]],defineResource:function(B){if(!B._hasResource["dojo.parser"]){B._hasResource["dojo.parser"]=true;
B.provide("dojo.parser");
B.require("dojo.date.stamp");
B.parser=new function(){var A=B;
function J(C){if(A.isString(C)){return"string"
}if(typeof C=="number"){return"number"
}if(typeof C=="boolean"){return"boolean"
}if(A.isFunction(C)){return"function"
}if(A.isArray(C)){return"array"
}if(C instanceof Date){return"date"
}if(C instanceof A._Url){return"url"
}return"object"
}function I(D,E){switch(E){case"string":return D;
case"number":return D.length?Number(D):NaN;
case"boolean":return typeof D=="boolean"?D:!(D.toLowerCase()=="false");
case"function":if(A.isFunction(D)){D=D.toString();
D=A.trim(D.substring(D.indexOf("{")+1,D.length-1))
}try{if(D.search(/[^\w\.]+/i)!=-1){D=A.parser._nameAnonFunc(new Function(D),this)
}return A.getObject(D,false)
}catch(C){return new Function()
}case"array":return D.split(/\s*,\s*/);
case"date":switch(D){case"":return new Date("");
case"now":return new Date();
default:return A.date.stamp.fromISOString(D)
}case"url":return A.baseUrl+D;
default:return A.fromJson(D)
}}var G={};
function H(F){if(!G[F]){var N=A.getObject(F);
if(!A.isFunction(N)){throw new Error("Could not load class '"+F+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?")
}var E=N.prototype;
var C={};
for(var M in E){if(M.charAt(0)=="_"){continue
}var D=E[M];
C[M]=J(D)
}G[F]={cls:N,params:C}
}return G[F]
}this._functionFromScript=function(F){var E="";
var C="";
var L=F.getAttribute("args");
if(L){A.forEach(L.split(/\s*,\s*/),function(N,K){E+="var "+N+" = arguments["+K+"]; "
})
}var D=F.getAttribute("with");
if(D&&D.length){A.forEach(D.split(/\s*,\s*/),function(K){E+="with("+K+"){";
C+="}"
})
}return new Function(E+F.innerHTML+C)
};
this.instantiate=function(D){var C=[];
A.forEach(D,function(j){if(!j){return 
}var b=j.getAttribute("dojoType");
if((!b)||(!b.length)){return 
}var e=H(b);
var d=e.cls;
var l=d._noScript||d.prototype._noScript;
var i={};
var g=j.attributes;
for(var k in e.params){var F=g.getNamedItem(k);
if(!F||(!F.specified&&(!B.isIE||k.toLowerCase()!="value"))){continue
}var Z=F.value;
switch(k){case"class":Z=j.className;
break;
case"style":Z=j.style&&j.style.cssText
}var f=e.params[k];
i[k]=I(Z,f)
}if(!l){var h=[],E=[];
A.query("> script[type^='dojo/']",j).orphan().forEach(function(N){var L=N.getAttribute("event"),M=N.getAttribute("type"),K=A.parser._functionFromScript(N);
if(L){if(M=="dojo/connect"){h.push({event:L,func:K})
}else{i[L]=K
}}else{E.push(K)
}})
}var a=d.markupFactory;
if(!a&&d.prototype){a=d.prototype.markupFactory
}var Y=a?a(i,j,d):new d(i,j);
C.push(Y);
var c=j.getAttribute("jsId");
if(c){A.setObject(c,Y)
}if(!l){B.forEach(h,function(K){B.connect(Y,K.event,null,K.func)
});
B.forEach(E,function(K){K.call(Y)
})
}});
A.forEach(C,function(E){if(E&&(E.startup)&&((!E.getParent)||(!E.getParent()))){E.startup()
}});
return C
};
this.parse=function(E){var D=A.query("[dojoType]",E);
var C=this.instantiate(D);
return C
}
}();
(function(){var A=function(){if(djConfig.parseOnLoad==true){B.parser.parse()
}};
if(B.exists("dijit.wai.onload")&&(dijit.wai.onload===B._loaders[0])){B._loaders.splice(1,0,A)
}else{B._loaders.unshift(A)
}})();
B.parser._anonCtr=0;
B.parser._anon={};
B.parser._nameAnonFunc=function(L,H){var I="$joinpoint";
var J=(H||B.parser._anon);
if(B.isIE){var A=L.__dojoNameCache;
if(A&&J[A]===L){return L.__dojoNameCache
}}var K="__"+B.parser._anonCtr++;
while(typeof J[K]!="undefined"){K="__"+B.parser._anonCtr++
}J[K]=L;
return K
}
}}});