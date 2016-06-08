dojo._xdResourceLoaded({depends:[["provide","dojox._sql.common"],["require","dojox._sql._crypto"]],defineResource:function(B){if(!B._hasResource["dojox._sql.common"]){B._hasResource["dojox._sql.common"]=true;
B.provide("dojox._sql.common");
B.require("dojox._sql._crypto");
dojox.sql=new Function("return dojox.sql._exec(arguments);");
B.mixin(dojox.sql,{dbName:null,debug:(B.exists("dojox.sql.debug")?dojox.sql.debug:false),open:function(D){if(this._dbOpen&&(!D||D==this.dbName)){return 
}if(!this.dbName){this.dbName="dot_store_"+window.location.href.replace(/[^0-9A-Za-z_]/g,"_")
}if(!D){D=this.dbName
}try{this._initDb();
this.db.open(D);
this._dbOpen=true
}catch(A){throw A.message||A
}},close:function(D){if(B.isIE){return 
}if(!this._dbOpen&&(!D||D==this.dbName)){return 
}if(!D){D=this.dbName
}try{this.db.close(D);
this._dbOpen=false
}catch(A){throw A.message||A
}},_exec:function(K){try{this._initDb();
if(!this._dbOpen){this.open();
this._autoClose=true
}var M=null;
var N=null;
var O=null;
var P=B._toArray(K);
M=P.splice(0,1)[0];
if(this._needsEncrypt(M)||this._needsDecrypt(M)){N=P.splice(P.length-1,1)[0];
O=P.splice(P.length-1,1)[0]
}if(this.debug){this._printDebugSQL(M,P)
}if(this._needsEncrypt(M)){var L=new dojox.sql._SQLCrypto("encrypt",M,O,P,N);
return 
}else{if(this._needsDecrypt(M)){var L=new dojox.sql._SQLCrypto("decrypt",M,O,P,N);
return 
}}var R=this.db.execute(M,P);
R=this._normalizeResults(R);
if(this._autoClose){this.close()
}return R
}catch(A){A=A.message||A;
console.debug("SQL Exception: "+A);
if(this._autoClose){try{this.close()
}catch(Q){console.debug("Error closing database: "+Q.message||Q)
}}throw A
}},_initDb:function(){if(!this.db){try{this.db=google.gears.factory.create("beta.database","1.0")
}catch(A){B.setObject("google.gears.denied",true);
dojox.off.onFrameworkEvent("coreOperationFailed");
throw"Google Gears must be allowed to run"
}}},_printDebugSQL:function(A,H){var F='dojox.sql("'+A+'"';
for(var G=0;
G<H.length;
G++){if(typeof H[G]=="string"){F+=', "'+H[G]+'"'
}else{F+=", "+H[G]
}}F+=")";
console.debug(F)
},_normalizeResults:function(L){var J=[];
if(!L){return[]
}while(L.isValidRow()){var H={};
for(var K=0;
K<L.fieldCount();
K++){var A=L.fieldName(K);
var I=L.field(K);
H[A]=I
}J.push(H);
L.next()
}L.close();
return J
},_needsEncrypt:function(A){return/encrypt\([^\)]*\)/i.test(A)
},_needsDecrypt:function(A){return/decrypt\([^\)]*\)/i.test(A)
}});
B.declare("dojox.sql._SQLCrypto",null,{constructor:function(H,G,I,J,A){if(H=="encrypt"){this._execEncryptSQL(G,I,J,A)
}else{this._execDecryptSQL(G,I,J,A)
}},_execEncryptSQL:function(J,L,M,A){var I=this._stripCryptoSQL(J);
var K=this._flagEncryptedArgs(J,M);
var N=this;
this._encrypt(I,L,M,K,function(P){var E=false;
var D=[];
var G=null;
try{D=dojox.sql.db.execute(I,P)
}catch(C){E=true;
G=C.message||C
}if(G!=null){if(dojox.sql._autoClose){try{dojox.sql.close()
}catch(H){}}A(null,true,G.toString());
return 
}D=dojox.sql._normalizeResults(D);
if(dojox.sql._autoClose){dojox.sql.close()
}if(dojox.sql._needsDecrypt(J)){var F=N._determineDecryptedColumns(J);
N._decrypt(D,F,L,function(O){A(O,false,null)
})
}else{A(D,false,null)
}})
},_execDecryptSQL:function(O,S,A,Q){var P=this._stripCryptoSQL(O);
var R=this._determineDecryptedColumns(O);
var V=false;
var T=[];
var N=null;
try{T=dojox.sql.db.execute(P,A)
}catch(U){V=true;
N=U.message||U
}if(N!=null){if(dojox.sql._autoClose){try{dojox.sql.close()
}catch(M){}}Q(T,true,N.toString());
return 
}T=dojox.sql._normalizeResults(T);
if(dojox.sql._autoClose){dojox.sql.close()
}this._decrypt(T,R,S,function(C){Q(C,false,null)
})
},_encrypt:function(J,O,P,L,A){this._totalCrypto=0;
this._finishedCrypto=0;
this._finishedSpawningCrypto=false;
this._finalArgs=P;
for(var N=0;
N<P.length;
N++){if(L[N]){var K=P[N];
var M=N;
this._totalCrypto++;
dojox._sql._crypto.encrypt(K,O,B.hitch(this,function(C){this._finalArgs[M]=C;
this._finishedCrypto++;
if(this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto){A(this._finalArgs)
}}))
}}this._finishedSpawningCrypto=true
},_decrypt:function(L,O,N,A){this._totalCrypto=0;
this._finishedCrypto=0;
this._finishedSpawningCrypto=false;
this._finalResultSet=L;
for(var M=0;
M<L.length;
M++){var J=L[M];
for(var P in J){if(O=="*"||O[P]){this._totalCrypto++;
var K=J[P];
this._decryptSingleColumn(P,K,N,M,function(C){A(C)
})
}}}this._finishedSpawningCrypto=true
},_stripCryptoSQL:function(I){I=I.replace(/DECRYPT\(\*\)/ig,"*");
var K=I.match(/ENCRYPT\([^\)]*\)/ig);
if(K!=null){for(var L=0;
L<K.length;
L++){var N=K[L];
var A=N.match(/ENCRYPT\(([^\)]*)\)/i)[1];
I=I.replace(N,A)
}}K=I.match(/DECRYPT\([^\)]*\)/ig);
if(K!=null){for(var L=0;
L<K.length;
L++){var M=K[L];
var J=M.match(/DECRYPT\(([^\)]*)\)/i)[1];
I=I.replace(M,J)
}}return I
},_flagEncryptedArgs:function(A,N){var O=new RegExp(/([\"][^\"]*\?[^\"]*[\"])|([\'][^\']*\?[^\']*[\'])|(\?)/ig);
var K;
var L=0;
var M=[];
while((K=O.exec(A))!=null){var P=RegExp.lastMatch+"";
if(/^[\"\']/.test(P)){continue
}var J=false;
if(/ENCRYPT\([^\)]*$/i.test(RegExp.leftContext)){J=true
}M[L]=J;
L++
}return M
},_determineDecryptedColumns:function(I){var K={};
if(/DECRYPT\(\*\)/i.test(I)){K="*"
}else{var L=/DECRYPT\((?:\s*\w*\s*\,?)*\)/ig;
var J;
while(J=L.exec(I)){var A=new String(RegExp.lastMatch);
var H=A.replace(/DECRYPT\(/i,"");
H=H.replace(/\)/,"");
H=H.split(/\s*,\s*/);
B.forEach(H,function(C){if(/\s*\w* AS (\w*)/i.test(C)){C=C.match(/\s*\w* AS (\w*)/i)[1]
}K[C]=true
})
}}return K
},_decryptSingleColumn:function(J,G,I,H,A){dojox._sql._crypto.decrypt(G,I,B.hitch(this,function(C){this._finalResultSet[H][J]=C;
this._finishedCrypto++;
if(this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto){A(this._finalResultSet)
}}))
}})
}}});