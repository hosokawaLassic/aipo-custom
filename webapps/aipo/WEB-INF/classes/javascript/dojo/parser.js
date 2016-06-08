if(!dojo._hasResource["dojo.parser"]){dojo._hasResource["dojo.parser"]=true;
dojo.provide("dojo.parser");
dojo.require("dojo.date.stamp");
dojo.parser=new function(){var G=dojo;
function F(A){if(G.isString(A)){return"string"
}if(typeof A=="number"){return"number"
}if(typeof A=="boolean"){return"boolean"
}if(G.isFunction(A)){return"function"
}if(G.isArray(A)){return"array"
}if(A instanceof Date){return"date"
}if(A instanceof G._Url){return"url"
}return"object"
}function J(B,C){switch(C){case"string":return B;
case"number":return B.length?Number(B):NaN;
case"boolean":return typeof B=="boolean"?B:!(B.toLowerCase()=="false");
case"function":if(G.isFunction(B)){B=B.toString();
B=G.trim(B.substring(B.indexOf("{")+1,B.length-1))
}try{if(B.search(/[^\w\.]+/i)!=-1){B=G.parser._nameAnonFunc(new Function(B),this)
}return G.getObject(B,false)
}catch(A){return new Function()
}case"array":return B.split(/\s*,\s*/);
case"date":switch(B){case"":return new Date("");
case"now":return new Date();
default:return G.date.stamp.fromISOString(B)
}case"url":return G.baseUrl+B;
default:return G.fromJson(B)
}}var H={};
function I(D){if(!H[D]){var L=G.getObject(D);
if(!G.isFunction(L)){throw new Error("Could not load class '"+D+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?")
}var C=L.prototype;
var A={};
for(var E in C){if(E.charAt(0)=="_"){continue
}var B=C[E];
A[E]=F(B)
}H[D]={cls:L,params:A}
}return H[D]
}this._functionFromScript=function(D){var C="";
var A="";
var E=D.getAttribute("args");
if(E){G.forEach(E.split(/\s*,\s*/),function(M,N){C+="var "+M+" = arguments["+N+"]; "
})
}var B=D.getAttribute("with");
if(B&&B.length){G.forEach(B.split(/\s*,\s*/),function(L){C+="with("+L+"){";
A+="}"
})
}return new Function(C+D.innerHTML+A)
};
this.instantiate=function(B){var A=[];
G.forEach(B,function(h){if(!h){return 
}var Z=h.getAttribute("dojoType");
if((!Z)||(!Z.length)){return 
}var c=I(Z);
var b=c.cls;
var j=b._noScript||b.prototype._noScript;
var g={};
var e=h.attributes;
for(var i in c.params){var D=e.getNamedItem(i);
if(!D||(!D.specified&&(!dojo.isIE||i.toLowerCase()!="value"))){continue
}var X=D.value;
switch(i){case"class":X=h.className;
break;
case"style":X=h.style&&h.style.cssText
}var d=c.params[i];
g[i]=J(X,d)
}if(!j){var f=[],C=[];
G.query("> script[type^='dojo/']",h).orphan().forEach(function(N){var L=N.getAttribute("event"),M=N.getAttribute("type"),K=G.parser._functionFromScript(N);
if(L){if(M=="dojo/connect"){f.push({event:L,func:K})
}else{g[L]=K
}}else{C.push(K)
}})
}var Y=b.markupFactory;
if(!Y&&b.prototype){Y=b.prototype.markupFactory
}var E=Y?Y(g,h,b):new b(g,h);
A.push(E);
var a=h.getAttribute("jsId");
if(a){G.setObject(a,E)
}if(!j){dojo.forEach(f,function(K){dojo.connect(E,K.event,null,K.func)
});
dojo.forEach(C,function(K){K.call(E)
})
}});
G.forEach(A,function(C){if(C&&(C.startup)&&((!C.getParent)||(!C.getParent()))){C.startup()
}});
return A
};
this.parse=function(C){var B=G.query("[dojoType]",C);
var A=this.instantiate(B);
return A
}
}();
(function(){var B=function(){if(djConfig.parseOnLoad==true){dojo.parser.parse()
}};
if(dojo.exists("dijit.wai.onload")&&(dijit.wai.onload===dojo._loaders[0])){dojo._loaders.splice(1,0,B)
}else{dojo._loaders.unshift(B)
}})();
dojo.parser._anonCtr=0;
dojo.parser._anon={};
dojo.parser._nameAnonFunc=function(G,I){var J="$joinpoint";
var K=(I||dojo.parser._anon);
if(dojo.isIE){var H=G.__dojoNameCache;
if(H&&K[H]===G){return G.__dojoNameCache
}}var L="__"+dojo.parser._anonCtr++;
while(typeof K[L]!="undefined"){L="__"+dojo.parser._anonCtr++
}K[L]=G;
return L
}
};