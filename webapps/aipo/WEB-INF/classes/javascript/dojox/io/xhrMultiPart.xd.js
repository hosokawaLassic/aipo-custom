dojo._xdResourceLoaded({depends:[["provide","dojox.io.xhrMultiPart"],["require","dojo._base.xhr"],["require","dojox.uuid.generateRandomUuid"]],defineResource:function(B){if(!B._hasResource["dojox.io.xhrMultiPart"]){B._hasResource["dojox.io.xhrMultiPart"]=true;
B.provide("dojox.io.xhrMultiPart");
B.require("dojo._base.xhr");
B.require("dojox.uuid.generateRandomUuid");
(function(){function E(J,C){if(!J.name&&!J.content){throw new Error("Each part of a multi-part request requires 'name' and 'content'.")
}var D=[];
D.push("--"+C,'Content-Disposition: form-data; name="'+J.name+'"'+(J.filename?'; filename="'+J.filename+'"':""));
if(J.contentType){var I="Content-Type: "+J.contentType;
if(J.charset){I+="; Charset="+J.charset
}D.push(I)
}if(J.contentTransferEncoding){D.push("Content-Transfer-Encoding: "+J.contentTransferEncoding)
}D.push("",J.content);
return D
}function F(C){return(!!(B.query("input[type=file]",C).length))
}function A(D,C){var H=[];
return H
}dojox.io.xhrMultiPart=function(M){if(!M.file&&!M.formNode){throw new Error("file or formNode must be provided to dojox.io.xhrMultiPart's arguments")
}var C=dojox.uuid.generateRandomUuid();
var K=[];
var N="";
if(M.file){var D=(B.isArray(M.file)?M.file:[M.file]);
for(var L=0;
L<D.length;
L++){K=K.concat(E(D[L],C))
}}if(M.formNode){K=K.concat(A(M.formNode,C))
}if(K.length){K.push("--"+C+"--","");
N=K.join("\r\n")
}return B.rawXhrPost(B.mixin(M,{contentType:"multipart/form-data; boundary="+C,postData:N}))
}
})()
}}});