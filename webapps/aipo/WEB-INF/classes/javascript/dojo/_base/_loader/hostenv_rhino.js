if(djConfig.baseUrl){dojo.baseUrl=djConfig.baseUrl
}else{dojo.baseUrl="./"
}dojo.locale=dojo.locale||String(java.util.Locale.getDefault().toString().replace("_","-").toLowerCase());
dojo._name="rhino";
dojo.isRhino=true;
if(typeof print=="function"){console.debug=print
}if(typeof dojo.byId=="undefined"){dojo.byId=function(D,C){if(D&&(typeof D=="string"||D instanceof String)){if(!C){C=document
}return C.getElementById(D)
}return D
}
}dojo._loadUri=function(uri,cb){try{var local=(new java.io.File(uri)).exists();
if(!local){try{var stream=(new java.net.URL(uri)).openStream();
stream.close()
}catch(e){return false
}}if(cb){var contents=(local?readText:readUri)(uri,"UTF-8");
cb(eval("("+contents+")"))
}else{load(uri)
}return true
}catch(e){console.debug("rhino load('"+uri+"') failed. Exception: "+e);
return false
}};
dojo.exit=function(B){quit(B)
};
dojo._rhinoCurrentScriptViaJava=function(K){var P=Packages.org.mozilla.javascript.Context.getCurrentContext().getOptimizationLevel();
var L=new java.io.CharArrayWriter();
var N=new java.io.PrintWriter(L);
var I=new java.lang.Exception();
var O=L.toString();
var M=O.match(/[^\(]*\.js\)/gi);
if(!M){throw Error("cannot parse printStackTrace output: "+O)
}var J=((typeof K!="undefined")&&(K))?M[K+1]:M[M.length-1];
var J=M[3];
if(!J){J=M[1]
}if(!J){throw Error("could not find js file in printStackTrace output: "+O)
}return J
};
function readText(G,H){H=H||"utf-8";
var F=new java.io.File(G);
var E=new java.io.FileInputStream(F);
return dj_readInputStream(E,H)
}function readUri(F,G){var H=(new java.net.URL(F)).openConnection();
G=G||H.getContentEncoding()||"utf-8";
var E=H.getInputStream();
return dj_readInputStream(E,G)
}function dj_readInputStream(H,I){var J=new java.io.BufferedReader(new java.io.InputStreamReader(H,I));
try{var G=new java.lang.StringBuffer();
var F="";
while((F=J.readLine())!==null){G.append(F);
G.append(java.lang.System.getProperty("line.separator"))
}return G.toString()
}finally{J.close()
}}if(!djConfig.libraryScriptUri.length){try{djConfig.libraryScriptUri=dojo._rhinoCurrentScriptViaJava(1)
}catch(e){if(djConfig.isDebug){print("\n");
print("we have no idea where Dojo is located.");
print("Please try loading rhino in a non-interpreted mode or set a");
print("\n\tdjConfig.libraryScriptUri\n");
print("Setting the dojo path to './'");
print("This is probably wrong!");
print("\n");
print("Dojo will try to load anyway")
}djConfig.libraryScriptUri="./"
}}dojo.doc=typeof (document)!="undefined"?document:null;
dojo.body=function(){return document.body
};
dojo._timeouts=[];
function clearTimeout(B){if(!dojo._timeouts[B]){return 
}dojo._timeouts[B].stop()
}function setTimeout(I,J){var G={sleepTime:J,hasSlept:false,run:function(){if(!this.hasSlept){this.hasSlept=true;
java.lang.Thread.currentThread().sleep(this.sleepTime)
}try{I()
}catch(A){console.debug("Error running setTimeout thread:"+A)
}}};
var H=new java.lang.Runnable(G);
var F=new java.lang.Thread(H);
F.start();
return dojo._timeouts.push(F)-1
}if(djConfig.modulePaths){for(var param in djConfig.modulePaths){dojo.registerModulePath(param,djConfig.modulePaths[param])
}};