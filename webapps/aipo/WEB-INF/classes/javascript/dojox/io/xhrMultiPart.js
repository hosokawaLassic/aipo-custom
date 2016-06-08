if(!dojo._hasResource["dojox.io.xhrMultiPart"]){dojo._hasResource["dojox.io.xhrMultiPart"]=true;
dojo.provide("dojox.io.xhrMultiPart");
dojo.require("dojo._base.xhr");
dojo.require("dojox.uuid.generateRandomUuid");
(function(){function F(H,A){if(!H.name&&!H.content){throw new Error("Each part of a multi-part request requires 'name' and 'content'.")
}var B=[];
B.push("--"+A,'Content-Disposition: form-data; name="'+H.name+'"'+(H.filename?'; filename="'+H.filename+'"':""));
if(H.contentType){var C="Content-Type: "+H.contentType;
if(H.charset){C+="; Charset="+H.charset
}B.push(C)
}if(H.contentTransferEncoding){B.push("Content-Transfer-Encoding: "+H.contentTransferEncoding)
}B.push("",H.content);
return B
}function D(A){return(!!(dojo.query("input[type=file]",A).length))
}function E(B,A){var C=[];
return C
}dojox.io.xhrMultiPart=function(K){if(!K.file&&!K.formNode){throw new Error("file or formNode must be provided to dojox.io.xhrMultiPart's arguments")
}var A=dojox.uuid.generateRandomUuid();
var C=[];
var L="";
if(K.file){var B=(dojo.isArray(K.file)?K.file:[K.file]);
for(var J=0;
J<B.length;
J++){C=C.concat(F(B[J],A))
}}if(K.formNode){C=C.concat(E(K.formNode,A))
}if(C.length){C.push("--"+A+"--","");
L=C.join("\r\n")
}return dojo.rawXhrPost(dojo.mixin(K,{contentType:"multipart/form-data; boundary="+A,postData:L}))
}
})()
};