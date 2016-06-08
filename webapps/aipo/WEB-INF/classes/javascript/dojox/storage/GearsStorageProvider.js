if(!dojo._hasResource["dojox.storage.GearsStorageProvider"]){dojo._hasResource["dojox.storage.GearsStorageProvider"]=true;
dojo.provide("dojox.storage.GearsStorageProvider");
dojo.require("dojox.storage.Provider");
dojo.require("dojox.storage.manager");
dojo.require("dojox.sql");
if(dojo.isGears){(function(){dojo.declare("dojox.storage.GearsStorageProvider",dojox.storage.Provider,{constructor:function(){},TABLE_NAME:"__DOJO_STORAGE",initialized:false,_available:null,initialize:function(){if(djConfig.disableGearsStorage==true){return 
}this.TABLE_NAME="__DOJO_STORAGE";
try{dojox.sql("CREATE TABLE IF NOT EXISTS "+this.TABLE_NAME+"(  namespace TEXT,  key TEXT,  value TEXT )");
dojox.sql("CREATE UNIQUE INDEX IF NOT EXISTS namespace_key_index ON "+this.TABLE_NAME+" (namespace, key)")
}catch(B){console.debug("dojox.storage.GearsStorageProvider.initialize:",B);
this.initialized=false;
dojox.storage.manager.loaded();
return 
}this.initialized=true;
dojox.storage.manager.loaded()
},isAvailable:function(){return this._available=dojo.isGears
},put:function(F,H,I,J){if(this.isValidKey(F)==false){throw new Error("Invalid key given: "+F)
}J=J||this.DEFAULT_NAMESPACE;
if(dojo.isString(H)){H="string:"+H
}else{H=dojo.toJson(H)
}try{dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?",J,F);
dojox.sql("INSERT INTO "+this.TABLE_NAME+" VALUES (?, ?, ?)",J,F,H)
}catch(G){console.debug("dojox.storage.GearsStorageProvider.put:",G);
I(this.FAILED,F,G.toString());
return 
}if(I){I(dojox.storage.SUCCESS,F,null)
}},get:function(F,E){if(this.isValidKey(F)==false){throw new Error("Invalid key given: "+F)
}E=E||this.DEFAULT_NAMESPACE;
var D=dojox.sql("SELECT * FROM "+this.TABLE_NAME+" WHERE namespace = ? AND  key = ?",E,F);
if(!D.length){return null
}else{D=D[0].value
}if(dojo.isString(D)&&(/^string:/.test(D))){D=D.substring("string:".length)
}else{D=dojo.fromJson(D)
}return D
},getNamespaces:function(){var E=[dojox.storage.DEFAULT_NAMESPACE];
var D=dojox.sql("SELECT namespace FROM "+this.TABLE_NAME+" DESC GROUP BY namespace");
for(var F=0;
F<D.length;
F++){if(D[F].namespace!=dojox.storage.DEFAULT_NAMESPACE){E.push(D[F].namespace)
}}return E
},getKeys:function(F){F=F||this.DEFAULT_NAMESPACE;
if(this.isValidKey(F)==false){throw new Error("Invalid namespace given: "+F)
}var E=dojox.sql("SELECT key FROM "+this.TABLE_NAME+" WHERE namespace = ?",F);
var G=[];
for(var H=0;
H<E.length;
H++){G.push(E[H].key)
}return G
},clear:function(B){if(this.isValidKey(B)==false){throw new Error("Invalid namespace given: "+B)
}B=B||this.DEFAULT_NAMESPACE;
dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ?",B)
},remove:function(C,D){D=D||this.DEFAULT_NAMESPACE;
dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?",D,C)
},putMultiple:function(L,I,M,N){if(this.isValidKeyArray(L)===false||!I instanceof Array||L.length!=I.length){throw new Error("Invalid arguments: keys = ["+L+"], values = ["+I+"]")
}if(N==null||typeof N=="undefined"){N=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(N)==false){throw new Error("Invalid namespace given: "+N)
}this._statusHandler=M;
try{dojox.sql.open();
dojox.sql.db.execute("BEGIN TRANSACTION");
var O="REPLACE INTO "+this.TABLE_NAME+" VALUES (?, ?, ?)";
for(var P=0;
P<L.length;
P++){var K=I[P];
if(dojo.isString(K)){K="string:"+K
}else{K=dojo.toJson(K)
}dojox.sql.db.execute(O,[N,L[P],K])
}dojox.sql.db.execute("COMMIT TRANSACTION");
dojox.sql.close()
}catch(J){console.debug("dojox.storage.GearsStorageProvider.putMultiple:",J);
if(M){M(this.FAILED,L,J.toString())
}return 
}if(M){M(dojox.storage.SUCCESS,key,null)
}},getMultiple:function(H,I){if(this.isValidKeyArray(H)===false){throw new ("Invalid key array given: "+H)
}if(I==null||typeof I=="undefined"){I=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(I)==false){throw new Error("Invalid namespace given: "+I)
}var J="SELECT * FROM "+this.TABLE_NAME+" WHERE namespace = ? AND  key = ?";
var K=[];
for(var L=0;
L<H.length;
L++){var G=dojox.sql(J,I,H[L]);
if(!G.length){K[L]=null
}else{G=G[0].value;
if(dojo.isString(G)&&(/^string:/.test(G))){K[L]=G.substring("string:".length)
}else{K[L]=dojo.fromJson(G)
}}}return K
},removeMultiple:function(F,G){G=G||this.DEFAULT_NAMESPACE;
dojox.sql.open();
dojox.sql.db.execute("BEGIN TRANSACTION");
var H="DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?";
for(var E=0;
E<F.length;
E++){dojox.sql.db.execute(H,[G,F[E]])
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
}};