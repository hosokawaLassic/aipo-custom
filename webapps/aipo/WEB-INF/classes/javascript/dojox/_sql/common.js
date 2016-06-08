if(!dojo._hasResource["dojox._sql.common"]){dojo._hasResource["dojox._sql.common"]=true;
dojo.provide("dojox._sql.common");
dojo.require("dojox._sql._crypto");
dojox.sql=new Function("return dojox.sql._exec(arguments);");
dojo.mixin(dojox.sql,{dbName:null,debug:(dojo.exists("dojox.sql.debug")?dojox.sql.debug:false),open:function(C){if(this._dbOpen&&(!C||C==this.dbName)){return 
}if(!this.dbName){this.dbName="dot_store_"+window.location.href.replace(/[^0-9A-Za-z_]/g,"_")
}if(!C){C=this.dbName
}try{this._initDb();
this.db.open(C);
this._dbOpen=true
}catch(D){throw D.message||D
}},close:function(C){if(dojo.isIE){return 
}if(!this._dbOpen&&(!C||C==this.dbName)){return 
}if(!C){C=this.dbName
}try{this.db.close(C);
this._dbOpen=false
}catch(D){throw D.message||D
}},_exec:function(L){try{this._initDb();
if(!this._dbOpen){this.open();
this._autoClose=true
}var N=null;
var O=null;
var P=null;
var Q=dojo._toArray(L);
N=Q.splice(0,1)[0];
if(this._needsEncrypt(N)||this._needsDecrypt(N)){O=Q.splice(Q.length-1,1)[0];
P=Q.splice(Q.length-1,1)[0]
}if(this.debug){this._printDebugSQL(N,Q)
}if(this._needsEncrypt(N)){var M=new dojox.sql._SQLCrypto("encrypt",N,P,Q,O);
return 
}else{if(this._needsDecrypt(N)){var M=new dojox.sql._SQLCrypto("decrypt",N,P,Q,O);
return 
}}var J=this.db.execute(N,Q);
J=this._normalizeResults(J);
if(this._autoClose){this.close()
}return J
}catch(K){K=K.message||K;
console.debug("SQL Exception: "+K);
if(this._autoClose){try{this.close()
}catch(R){console.debug("Error closing database: "+R.message||R)
}}throw K
}},_initDb:function(){if(!this.db){try{this.db=google.gears.factory.create("beta.database","1.0")
}catch(B){dojo.setObject("google.gears.denied",true);
dojox.off.onFrameworkEvent("coreOperationFailed");
throw"Google Gears must be allowed to run"
}}},_printDebugSQL:function(F,E){var G='dojox.sql("'+F+'"';
for(var H=0;
H<E.length;
H++){if(typeof E[H]=="string"){G+=', "'+E[H]+'"'
}else{G+=", "+E[H]
}}G+=")";
console.debug(G)
},_normalizeResults:function(G){var K=[];
if(!G){return[]
}while(G.isValidRow()){var I={};
for(var L=0;
L<G.fieldCount();
L++){var H=G.fieldName(L);
var J=G.field(L);
I[H]=J
}K.push(I);
G.next()
}G.close();
return K
},_needsEncrypt:function(B){return/encrypt\([^\)]*\)/i.test(B)
},_needsDecrypt:function(B){return/decrypt\([^\)]*\)/i.test(B)
}});
dojo.declare("dojox.sql._SQLCrypto",null,{constructor:function(I,H,J,F,G){if(I=="encrypt"){this._execEncryptSQL(H,J,F,G)
}else{this._execDecryptSQL(H,J,F,G)
}},_execEncryptSQL:function(K,M,N,I){var J=this._stripCryptoSQL(K);
var L=this._flagEncryptedArgs(K,N);
var H=this;
this._encrypt(J,M,N,L,function(A){var D=false;
var C=[];
var F=null;
try{C=dojox.sql.db.execute(J,A)
}catch(B){D=true;
F=B.message||B
}if(F!=null){if(dojox.sql._autoClose){try{dojox.sql.close()
}catch(G){}}I(null,true,F.toString());
return 
}C=dojox.sql._normalizeResults(C);
if(dojox.sql._autoClose){dojox.sql.close()
}if(dojox.sql._needsDecrypt(K)){var E=H._determineDecryptedColumns(K);
H._decrypt(C,E,M,function(P){I(P,false,null)
})
}else{I(C,false,null)
}})
},_execDecryptSQL:function(P,T,M,R){var Q=this._stripCryptoSQL(P);
var S=this._determineDecryptedColumns(P);
var L=false;
var U=[];
var O=null;
try{U=dojox.sql.db.execute(Q,M)
}catch(V){L=true;
O=V.message||V
}if(O!=null){if(dojox.sql._autoClose){try{dojox.sql.close()
}catch(N){}}R(U,true,O.toString());
return 
}U=dojox.sql._normalizeResults(U);
if(dojox.sql._autoClose){dojox.sql.close()
}this._decrypt(U,S,T,function(A){R(A,false,null)
})
},_encrypt:function(K,P,I,M,J){this._totalCrypto=0;
this._finishedCrypto=0;
this._finishedSpawningCrypto=false;
this._finalArgs=I;
for(var O=0;
O<I.length;
O++){if(M[O]){var L=I[O];
var N=O;
this._totalCrypto++;
dojox._sql._crypto.encrypt(L,P,dojo.hitch(this,function(A){this._finalArgs[N]=A;
this._finishedCrypto++;
if(this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto){J(this._finalArgs)
}}))
}}this._finishedSpawningCrypto=true
},_decrypt:function(M,P,O,J){this._totalCrypto=0;
this._finishedCrypto=0;
this._finishedSpawningCrypto=false;
this._finalResultSet=M;
for(var N=0;
N<M.length;
N++){var K=M[N];
for(var I in K){if(P=="*"||P[I]){this._totalCrypto++;
var L=K[I];
this._decryptSingleColumn(I,L,O,N,function(A){J(A)
})
}}}this._finishedSpawningCrypto=true
},_stripCryptoSQL:function(J){J=J.replace(/DECRYPT\(\*\)/ig,"*");
var L=J.match(/ENCRYPT\([^\)]*\)/ig);
if(L!=null){for(var M=0;
M<L.length;
M++){var H=L[M];
var I=H.match(/ENCRYPT\(([^\)]*)\)/i)[1];
J=J.replace(H,I)
}}L=J.match(/DECRYPT\([^\)]*\)/ig);
if(L!=null){for(var M=0;
M<L.length;
M++){var N=L[M];
var K=N.match(/DECRYPT\(([^\)]*)\)/i)[1];
J=J.replace(N,K)
}}return J
},_flagEncryptedArgs:function(J,O){var P=new RegExp(/([\"][^\"]*\?[^\"]*[\"])|([\'][^\']*\?[^\']*[\'])|(\?)/ig);
var L;
var M=0;
var N=[];
while((L=P.exec(J))!=null){var I=RegExp.lastMatch+"";
if(/^[\"\']/.test(I)){continue
}var K=false;
if(/ENCRYPT\([^\)]*$/i.test(RegExp.leftContext)){K=true
}N[M]=K;
M++
}return N
},_determineDecryptedColumns:function(J){var L={};
if(/DECRYPT\(\*\)/i.test(J)){L="*"
}else{var G=/DECRYPT\((?:\s*\w*\s*\,?)*\)/ig;
var K;
while(K=G.exec(J)){var H=new String(RegExp.lastMatch);
var I=H.replace(/DECRYPT\(/i,"");
I=I.replace(/\)/,"");
I=I.split(/\s*,\s*/);
dojo.forEach(I,function(A){if(/\s*\w* AS (\w*)/i.test(A)){A=A.match(/\s*\w* AS (\w*)/i)[1]
}L[A]=true
})
}}return L
},_decryptSingleColumn:function(F,H,J,I,G){dojox._sql._crypto.decrypt(H,J,dojo.hitch(this,function(A){this._finalResultSet[I][F]=A;
this._finishedCrypto++;
if(this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto){G(this._finalResultSet)
}}))
}})
};