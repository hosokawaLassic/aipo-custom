dojo._xdResourceLoaded({depends:[["provide","dojox.storage.GearsStorageProvider"],["require","dojox.storage.Provider"],["require","dojox.storage.manager"],["require","dojox.sql"]],defineResource:function(B){if(!B._hasResource["dojox.storage.GearsStorageProvider"]){B._hasResource["dojox.storage.GearsStorageProvider"]=true;
B.provide("dojox.storage.GearsStorageProvider");
B.require("dojox.storage.Provider");
B.require("dojox.storage.manager");
B.require("dojox.sql");
if(B.isGears){(function(){B.declare("dojox.storage.GearsStorageProvider",dojox.storage.Provider,{constructor:function(){},TABLE_NAME:"__DOJO_STORAGE",initialized:false,_available:null,initialize:function(){if(djConfig.disableGearsStorage==true){return 
}this.TABLE_NAME="__DOJO_STORAGE";
try{dojox.sql("CREATE TABLE IF NOT EXISTS "+this.TABLE_NAME+"(  namespace TEXT,  key TEXT,  value TEXT )");
dojox.sql("CREATE UNIQUE INDEX IF NOT EXISTS namespace_key_index ON "+this.TABLE_NAME+" (namespace, key)")
}catch(A){console.debug("dojox.storage.GearsStorageProvider.initialize:",A);
this.initialized=false;
dojox.storage.manager.loaded();
return 
}this.initialized=true;
dojox.storage.manager.loaded()
},isAvailable:function(){return this._available=B.isGears
},put:function(J,G,H,I){if(this.isValidKey(J)==false){throw new Error("Invalid key given: "+J)
}I=I||this.DEFAULT_NAMESPACE;
if(B.isString(G)){G="string:"+G
}else{G=B.toJson(G)
}try{dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?",I,J);
dojox.sql("INSERT INTO "+this.TABLE_NAME+" VALUES (?, ?, ?)",I,J,G)
}catch(A){console.debug("dojox.storage.GearsStorageProvider.put:",A);
H(this.FAILED,J,A.toString());
return 
}if(H){H(dojox.storage.SUCCESS,J,null)
}},get:function(E,A){if(this.isValidKey(E)==false){throw new Error("Invalid key given: "+E)
}A=A||this.DEFAULT_NAMESPACE;
var F=dojox.sql("SELECT * FROM "+this.TABLE_NAME+" WHERE namespace = ? AND  key = ?",A,E);
if(!F.length){return null
}else{F=F[0].value
}if(B.isString(F)&&(/^string:/.test(F))){F=F.substring("string:".length)
}else{F=B.fromJson(F)
}return F
},getNamespaces:function(){var A=[dojox.storage.DEFAULT_NAMESPACE];
var F=dojox.sql("SELECT namespace FROM "+this.TABLE_NAME+" DESC GROUP BY namespace");
for(var E=0;
E<F.length;
E++){if(F[E].namespace!=dojox.storage.DEFAULT_NAMESPACE){A.push(F[E].namespace)
}}return A
},getKeys:function(A){A=A||this.DEFAULT_NAMESPACE;
if(this.isValidKey(A)==false){throw new Error("Invalid namespace given: "+A)
}var H=dojox.sql("SELECT key FROM "+this.TABLE_NAME+" WHERE namespace = ?",A);
var F=[];
for(var G=0;
G<H.length;
G++){F.push(H[G].key)
}return F
},clear:function(A){if(this.isValidKey(A)==false){throw new Error("Invalid namespace given: "+A)
}A=A||this.DEFAULT_NAMESPACE;
dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ?",A)
},remove:function(D,A){A=A||this.DEFAULT_NAMESPACE;
dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?",A,D)
},putMultiple:function(K,P,L,M){if(this.isValidKeyArray(K)===false||!P instanceof Array||K.length!=P.length){throw new Error("Invalid arguments: keys = ["+K+"], values = ["+P+"]")
}if(M==null||typeof M=="undefined"){M=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(M)==false){throw new Error("Invalid namespace given: "+M)
}this._statusHandler=L;
try{dojox.sql.open();
dojox.sql.db.execute("BEGIN TRANSACTION");
var N="REPLACE INTO "+this.TABLE_NAME+" VALUES (?, ?, ?)";
for(var O=0;
O<K.length;
O++){var J=P[O];
if(B.isString(J)){J="string:"+J
}else{J=B.toJson(J)
}dojox.sql.db.execute(N,[M,K[O],J])
}dojox.sql.db.execute("COMMIT TRANSACTION");
dojox.sql.close()
}catch(A){console.debug("dojox.storage.GearsStorageProvider.putMultiple:",A);
if(L){L(this.FAILED,K,A.toString())
}return 
}if(L){L(dojox.storage.SUCCESS,key,null)
}},getMultiple:function(A,H){if(this.isValidKeyArray(A)===false){throw new ("Invalid key array given: "+A)
}if(H==null||typeof H=="undefined"){H=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(H)==false){throw new Error("Invalid namespace given: "+H)
}var I="SELECT * FROM "+this.TABLE_NAME+" WHERE namespace = ? AND  key = ?";
var J=[];
for(var K=0;
K<A.length;
K++){var L=dojox.sql(I,H,A[K]);
if(!L.length){J[K]=null
}else{L=L[0].value;
if(B.isString(L)&&(/^string:/.test(L))){J[K]=L.substring("string:".length)
}else{J[K]=B.fromJson(L)
}}}return J
},removeMultiple:function(A,F){F=F||this.DEFAULT_NAMESPACE;
dojox.sql.open();
dojox.sql.db.execute("BEGIN TRANSACTION");
var G="DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?";
for(var H=0;
H<A.length;
H++){dojox.sql.db.execute(G,[F,A[H]])
}dojox.sql.db.execute("COMMIT TRANSACTION");
dojox.sql.close()
},isPermanent:function(){return true
},getMaximumSize:function(){return this.SIZE_NO_LIMIT
},hasSettingsUI:function(){return false
},showSettingsUI:function(){throw new Error(this.declaredClass+" does not support a storage settings user-interface")
},hideSettingsUI:function(){throw new Error(this.declaredClass+" does not support a storage settings user-interface")
}});
dojox.storage.manager.register("dojox.storage.GearsStorageProvider",new dojox.storage.GearsStorageProvider());
dojox.storage.manager.initialize()
})()
}}}});