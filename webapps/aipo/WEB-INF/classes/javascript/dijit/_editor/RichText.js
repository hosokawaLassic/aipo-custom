if(!dojo._hasResource["dijit._editor.RichText"]){dojo._hasResource["dijit._editor.RichText"]=true;
dojo.provide("dijit._editor.RichText");
dojo.require("dijit._Widget");
dojo.require("dijit._editor.selection");
dojo.require("dojo.i18n");
dojo.requireLocalization("dijit","Textarea",null,"ROOT");
if(!djConfig.useXDomain||djConfig.allowXdRichTextSave){if(dojo._postLoad){(function(){var C=dojo.doc.createElement("textarea");
C.id="dijit._editor.RichText.savedContent";
var D=C.style;
D.display="none";
D.position="absolute";
D.top="-100px";
D.left="-100px";
D.height="3px";
D.width="3px";
dojo.body().appendChild(C)
})()
}else{try{dojo.doc.write('<textarea id="dijit._editor.RichText.savedContent" style="display:none;position:absolute;top:-100px;left:-100px;height:3px;width:3px;overflow:hidden;"></textarea>')
}catch(e){}}}dojo.declare("dijit._editor.RichText",[dijit._Widget],{constructor:function(){this.contentPreFilters=[];
this.contentPostFilters=[];
this.contentDomPreFilters=[];
this.contentDomPostFilters=[];
this.editingAreaStyleSheets=[];
this._keyHandlers={};
this.contentPreFilters.push(dojo.hitch(this,"_preFixUrlAttributes"));
if(dojo.isMoz){this.contentPreFilters.push(this._fixContentForMoz)
}this.onLoadDeferred=new dojo.Deferred()
},inheritWidth:false,focusOnLoad:false,name:"",styleSheets:"",_content:"",height:"300px",minHeight:"1em",isClosed:true,isLoaded:false,_SEPARATOR:"@@**%%__RICHTEXTBOUNDRY__%%**@@",onLoadDeferred:null,postCreate:function(){dojo.publish("dijit._editor.RichText::init",[this]);
this.open();
this.setupDefaultShortcuts()
},setupDefaultShortcuts:function(){var D=this.KEY_CTRL;
var C=function(A,B){return arguments.length==1?function(){this.execCommand(A)
}:function(){this.execCommand(A,B)
}
};
this.addKeyHandler("b",D,C("bold"));
this.addKeyHandler("i",D,C("italic"));
this.addKeyHandler("u",D,C("underline"));
this.addKeyHandler("a",D,C("selectall"));
this.addKeyHandler("s",D,function(){this.save(true)
});
this.addKeyHandler("1",D,C("formatblock","h1"));
this.addKeyHandler("2",D,C("formatblock","h2"));
this.addKeyHandler("3",D,C("formatblock","h3"));
this.addKeyHandler("4",D,C("formatblock","h4"));
this.addKeyHandler("\\",D,C("insertunorderedlist"));
if(!dojo.isIE){this.addKeyHandler("Z",D,C("redo"))
}},events:["onKeyPress","onKeyDown","onKeyUp","onClick"],captureEvents:[],_editorCommandsLocalized:false,_localizeEditorCommands:function(){if(this._editorCommandsLocalized){return 
}this._editorCommandsLocalized=true;
var N=["p","pre","address","h1","h2","h3","h4","h5","h6","ol","div","ul"];
var K="",J,M=0;
while((J=N[M++])){if(J.charAt(1)!="l"){K+="<"+J+"><span>content</span></"+J+">"
}else{K+="<"+J+"><li>content</li></"+J+">"
}}var I=document.createElement("div");
I.style.position="absolute";
I.style.left="-2000px";
I.style.top="-2000px";
document.body.appendChild(I);
I.innerHTML=K;
var L=I.firstChild;
while(L){dijit._editor.selection.selectElement(L.firstChild);
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[L.firstChild]);
var H=L.tagName.toLowerCase();
this._local2NativeFormatNames[H]=document.queryCommandValue("formatblock");
this._native2LocalFormatNames[this._local2NativeFormatNames[H]]=H;
L=L.nextSibling
}document.body.removeChild(I)
},open:function(element){if((!this.onLoadDeferred)||(this.onLoadDeferred.fired>=0)){this.onLoadDeferred=new dojo.Deferred()
}if(!this.isClosed){this.close()
}dojo.publish("dijit._editor.RichText::open",[this]);
this._content="";
if((arguments.length==1)&&(element.nodeName)){this.domNode=element
}if((this.domNode.nodeName)&&(this.domNode.nodeName.toLowerCase()=="textarea")){this.textarea=this.domNode;
this.name=this.textarea.name;
var html=this._preFilterContent(this.textarea.value);
this.domNode=dojo.doc.createElement("div");
this.domNode.setAttribute("widgetId",this.id);
this.textarea.removeAttribute("widgetId");
this.domNode.cssText=this.textarea.cssText;
this.domNode.className+=" "+this.textarea.className;
dojo.place(this.domNode,this.textarea,"before");
var tmpFunc=dojo.hitch(this,function(){with(this.textarea.style){display="block";
position="absolute";
left=top="-1000px";
if(dojo.isIE){this.__overflow=overflow;
overflow="hidden"
}}});
if(dojo.isIE){setTimeout(tmpFunc,10)
}else{tmpFunc()
}}else{var html=this._preFilterContent(this.getNodeChildrenHtml(this.domNode));
this.domNode.innerHTML=""
}if(html==""){html="&nbsp;"
}var content=dojo.contentBox(this.domNode);
this._oldHeight=content.h;
this._oldWidth=content.w;
this.savedContent=html;
if((this.domNode.nodeName)&&(this.domNode.nodeName=="LI")){this.domNode.innerHTML=" <br>"
}this.editingArea=dojo.doc.createElement("div");
this.domNode.appendChild(this.editingArea);
if(this.name!=""&&(!djConfig.useXDomain||djConfig.allowXdRichTextSave)){var saveTextarea=dojo.byId("dijit._editor.RichText.savedContent");
if(saveTextarea.value!=""){var datas=saveTextarea.value.split(this._SEPARATOR),i=0,dat;
while((dat=datas[i++])){var data=dat.split(":");
if(data[0]==this.name){html=data[1];
datas.splice(i,1);
break
}}}dojo.connect(window,"onbeforeunload",this,"_saveContent")
}this.isClosed=false;
if(dojo.isIE||dojo.isSafari||dojo.isOpera){var ifr=this.iframe=dojo.doc.createElement("iframe");
ifr.src="javascript:void(0)";
this.editorObject=ifr;
ifr.style.border="none";
ifr.style.width="100%";
ifr.frameBorder=0;
this.editingArea.appendChild(ifr);
this.window=ifr.contentWindow;
this.document=this.window.document;
this.document.open();
this.document.write(this._getIframeDocTxt(html));
this.document.close();
if(dojo.isIE>=7){if(this.height){ifr.style.height=this.height
}if(this.minHeight){ifr.style.minHeight=this.minHeight
}}else{ifr.style.height=this.height?this.height:this.minHeight
}if(dojo.isIE){this._localizeEditorCommands()
}this.onLoad()
}else{this._drawIframe(html)
}if(this.domNode.nodeName=="LI"){this.domNode.lastChild.style.marginTop="-1.2em"
}this.domNode.className+=" RichTextEditable"
},_local2NativeFormatNames:{},_native2LocalFormatNames:{},_localizedIframeTitles:null,_getIframeDocTxt:function(H){var F=dojo.getComputedStyle(this.domNode);
if(!this.height&&!dojo.isMoz){H="<div>"+H+"</div>"
}var E=[F.fontWeight,F.fontSize,F.fontFamily].join(" ");
var G=F.lineHeight;
if(G.indexOf("px")>=0){G=parseFloat(G)/parseFloat(F.fontSize)
}else{if(G.indexOf("em")>=0){G=parseFloat(G)
}else{G="1.0"
}}return[this.isLeftToRight()?"<html><head>":"<html dir='rtl'><head>",(dojo.isMoz?"<title>"+this._localizedIframeTitles.iframeEditTitle+"</title>":""),"<style>","body,html {","	background:transparent;","	padding: 0;","	margin: 0;","}","body{","	top:0px; left:0px; right:0px;",((this.height||dojo.isOpera)?"":"position: fixed;"),"	font:",E,";","	min-height:",this.minHeight,";","	line-height:",G,"}","p{ margin: 1em 0 !important; }",(this.height?"":"body,html{overflow-y:hidden;/*for IE*/} body > div {overflow-x:auto;/*for FF to show vertical scrollbar*/}"),"li > ul:-moz-first-node, li > ol:-moz-first-node{ padding-top: 1.2em; } ","li{ min-height:1.2em; }","</style>",this._applyEditingAreaStyleSheets(),"</head><body>"+H+"</body></html>"].join("")
},_drawIframe:function(L){if(!this.iframe){var J=this.iframe=dojo.doc.createElement("iframe");
var K=J.style;
K.border="none";
K.lineHeight="0";
K.verticalAlign="bottom";
this.editorObject=this.iframe;
this._localizedIframeTitles=dojo.i18n.getLocalization("dijit","Textarea");
var M=dojo.query('label[for="'+this.id+'"]');
if(M.length){this._localizedIframeTitles.iframeEditTitle=M[0].innerHTML+" "+this._localizedIframeTitles.iframeEditTitle
}}this.iframe.style.width=this.inheritWidth?this._oldWidth:"100%";
if(this.height){this.iframe.style.height=this.height
}else{this.iframe.height=this._oldHeight
}if(this.textarea){var N=this.srcNodeRef
}else{var N=dojo.doc.createElement("div");
N.style.display="none";
N.innerHTML=L;
this.editingArea.appendChild(N)
}this.editingArea.appendChild(this.iframe);
var I=false;
var O=this.iframe.contentDocument;
O.open();
O.write(this._getIframeDocTxt(L));
O.close();
var P=dojo.hitch(this,function(){if(!I){I=true
}else{return 
}if(!this.editNode){try{if(this.iframe.contentWindow){this.window=this.iframe.contentWindow;
this.document=this.iframe.contentWindow.document
}else{if(this.iframe.contentDocument){this.window=this.iframe.contentDocument.window;
this.document=this.iframe.contentDocument
}}if(!this.document.body){throw"Error"
}}catch(A){setTimeout(P,500);
I=false;
return 
}dojo._destroyElement(N);
this.document.designMode="on";
this.onLoad()
}else{dojo._destroyElement(N);
this.editNode.innerHTML=L;
this.onDisplayChanged()
}this._preDomFilterContent(this.editNode)
});
P()
},_applyEditingAreaStyleSheets:function(){var H=[];
if(this.styleSheets){H=this.styleSheets.split(";");
this.styleSheets=""
}H=H.concat(this.editingAreaStyleSheets);
this.editingAreaStyleSheets=[];
var G="",I=0,J;
while((J=H[I++])){var F=(new dojo._Url(dojo.global.location,J)).toString();
this.editingAreaStyleSheets.push(F);
G+='<link rel="stylesheet" type="text/css" href="'+F+'"/>'
}return G
},addStyleSheet:function(uri){var url=uri.toString();
if(url.charAt(0)=="."||(url.charAt(0)!="/"&&!uri.host)){url=(new dojo._Url(dojo.global.location,url)).toString()
}if(dojo.indexOf(this.editingAreaStyleSheets,url)>-1){console.debug("dijit._editor.RichText.addStyleSheet: Style sheet "+url+" is already applied to the editing area!");
return 
}this.editingAreaStyleSheets.push(url);
if(this.document.createStyleSheet){this.document.createStyleSheet(url)
}else{var head=this.document.getElementsByTagName("head")[0];
var stylesheet=this.document.createElement("link");
with(stylesheet){rel="stylesheet";
type="text/css";
href=url
}head.appendChild(stylesheet)
}},removeStyleSheet:function(E){var F=E.toString();
if(F.charAt(0)=="."||(F.charAt(0)!="/"&&!E.host)){F=(new dojo._Url(dojo.global.location,F)).toString()
}var D=dojo.indexOf(this.editingAreaStyleSheets,F);
if(D==-1){console.debug("dijit._editor.RichText.removeStyleSheet: Style sheet "+F+" is not applied to the editing area so it can not be removed!");
return 
}delete this.editingAreaStyleSheets[D];
dojo.withGlobal(this.window,"query",dojo,['link:[href="'+F+'"]']).orphan()
},disabled:false,_mozSettingProps:["styleWithCSS","insertBrOnReturn"],setDisabled:function(B){if(dojo.isIE||dojo.isSafari||dojo.isOpera){this.editNode.contentEditable=!B
}else{if(B){this._mozSettings=[false,this.blockNodeForEnter==="BR"]
}this.document.designMode=(B?"off":"on");
if(!B){dojo.forEach(this._mozSettingProps,function(A,D){this.document.execCommand(A,false,this._mozSettings[D])
},this)
}}this.disabled=B
},_isResized:function(){return false
},onLoad:function(G){this.isLoaded=true;
if(this.height||dojo.isMoz){this.editNode=this.document.body
}else{this.editNode=this.document.body.firstChild
}this.editNode.contentEditable=true;
this._preDomFilterContent(this.editNode);
var J=this.events.concat(this.captureEvents),F=0,H;
while((H=J[F++])){this.connect(this.document,H.toLowerCase(),H)
}if(!dojo.isIE){try{this.document.execCommand("styleWithCSS",false,false)
}catch(I){}}else{this.editNode.style.zoom=1
}if(this.focusOnLoad){this.focus()
}this.onDisplayChanged(G);
if(this.onLoadDeferred){this.onLoadDeferred.callback(true)
}},onKeyDown:function(B){if(dojo.isIE){if(B.keyCode===dojo.keys.BACKSPACE&&this.document.selection.type==="Control"){dojo.stopEvent(B);
this.execCommand("delete")
}else{if((65<=B.keyCode&&B.keyCode<=90)||(B.keyCode>=37&&B.keyCode<=40)){B.charCode=B.keyCode;
this.onKeyPress(B)
}}}else{if(dojo.isMoz){if(B.keyCode==dojo.keys.TAB&&!B.shiftKey&&!B.ctrlKey&&!B.altKey&&this.iframe){this.iframe.contentDocument.title=this._localizedIframeTitles.iframeFocusTitle;
this.iframe.focus();
dojo.stopEvent(B)
}else{if(B.keyCode==dojo.keys.TAB&&B.shiftKey){if(this.toolbar){this.toolbar.focus()
}dojo.stopEvent(B)
}}}}},onKeyUp:function(B){return 
},KEY_CTRL:1,KEY_SHIFT:2,onKeyPress:function(H){var L=H.ctrlKey?this.KEY_CTRL:0|H.shiftKey?this.KEY_SHIFT:0;
var J=H.keyChar||H.keyCode;
if(this._keyHandlers[J]){var G=this._keyHandlers[J],K=0,I;
while((I=G[K++])){if(L==I.modifiers){if(!I.handler.apply(this,arguments)){H.preventDefault()
}break
}}}setTimeout(dojo.hitch(this,function(){this.onKeyPressed(H)
}),1)
},addKeyHandler:function(F,D,E){if(!dojo.isArray(this._keyHandlers[F])){this._keyHandlers[F]=[]
}this._keyHandlers[F].push({modifiers:D||0,handler:E})
},onKeyPressed:function(B){this.onDisplayChanged()
},onClick:function(B){this.onDisplayChanged(B)
},_onBlur:function(D){var C=this.getValue(true);
if(C!=this.savedContent){this.onChange(C);
this.savedContent=C
}if(dojo.isMoz&&this.iframe){this.iframe.contentDocument.title=this._localizedIframeTitles.iframeEditTitle
}},_initialFocus:true,_onFocus:function(B){if((dojo.isMoz)&&(this._initialFocus)){this._initialFocus=false;
if(this.editNode.innerHTML.replace(/^\s+|\s+$/g,"")=="&nbsp;"){this.placeCursorAtStart()
}}},blur:function(){if(this.iframe){this.window.blur()
}else{if(this.editNode){this.editNode.blur()
}}},focus:function(){if(this.iframe&&!dojo.isIE){dijit.focus(this.iframe)
}else{if(this.editNode&&this.editNode.focus){dijit.focus(this.editNode)
}else{console.debug("Have no idea how to focus into the editor!")
}}},updateInterval:200,_updateTimer:null,onDisplayChanged:function(B){if(!this._updateTimer){if(this._updateTimer){clearTimeout(this._updateTimer)
}this._updateTimer=setTimeout(dojo.hitch(this,this.onNormalizedDisplayChanged),this.updateInterval)
}},onNormalizedDisplayChanged:function(){this._updateTimer=null
},onChange:function(B){},_normalizeCommand:function(C){var D=C.toLowerCase();
if(D=="formatblock"){if(dojo.isSafari){D="heading"
}}else{if(D=="hilitecolor"&&!dojo.isMoz){D="backcolor"
}}return D
},queryCommandAvailable:function(R){var M=1;
var O=1<<1;
var L=1<<2;
var K=1<<3;
var N=1<<4;
var Q=dojo.isSafari;
function J(A){return{ie:Boolean(A&M),mozilla:Boolean(A&O),safari:Boolean(A&L),safari420:Boolean(A&N),opera:Boolean(A&K)}
}var P=null;
switch(R.toLowerCase()){case"bold":case"italic":case"underline":case"subscript":case"superscript":case"fontname":case"fontsize":case"forecolor":case"hilitecolor":case"justifycenter":case"justifyfull":case"justifyleft":case"justifyright":case"delete":case"selectall":P=J(O|M|L|K);
break;
case"createlink":case"unlink":case"removeformat":case"inserthorizontalrule":case"insertimage":case"insertorderedlist":case"insertunorderedlist":case"indent":case"outdent":case"formatblock":case"inserthtml":case"undo":case"redo":case"strikethrough":P=J(O|M|K|N);
break;
case"blockdirltr":case"blockdirrtl":case"dirltr":case"dirrtl":case"inlinedirltr":case"inlinedirrtl":P=J(M);
break;
case"cut":case"copy":case"paste":P=J(M|O|N);
break;
case"inserttable":P=J(O|M);
break;
case"insertcell":case"insertcol":case"insertrow":case"deletecells":case"deletecols":case"deleterows":case"mergecells":case"splitcell":P=J(M|O);
break;
default:return false
}return(dojo.isIE&&P.ie)||(dojo.isMoz&&P.mozilla)||(dojo.isSafari&&P.safari)||(Q&&P.safari420)||(dojo.isOpera&&P.opera)
},execCommand:function(I,J){var K;
this.focus();
I=this._normalizeCommand(I);
if(J!=undefined){if(I=="heading"){throw new Error("unimplemented")
}else{if((I=="formatblock")&&dojo.isIE){J="<"+J+">"
}}}if(I=="inserthtml"){J=this._preFilterContent(J);
if(dojo.isIE){var H=this.document.selection.createRange();
H.pasteHTML(J);
H.select();
K=true
}else{if(dojo.isMoz&&!J.length){dojo.withGlobal(this.window,"remove",dijit._editor.selection);
K=true
}else{K=this.document.execCommand(I,false,J)
}}}else{if((I=="unlink")&&(this.queryCommandEnabled("unlink"))&&(dojo.isMoz||dojo.isSafari)){var L=this.window.getSelection();
var G=dojo.withGlobal(this.window,"getAncestorElement",dijit._editor.selection,["a"]);
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[G]);
K=this.document.execCommand("unlink",false,null)
}else{if((I=="hilitecolor")&&(dojo.isMoz)){this.document.execCommand("styleWithCSS",false,true);
K=this.document.execCommand(I,false,J);
this.document.execCommand("styleWithCSS",false,false)
}else{if((dojo.isIE)&&((I=="backcolor")||(I=="forecolor"))){J=arguments.length>1?J:null;
K=this.document.execCommand(I,false,J)
}else{J=arguments.length>1?J:null;
if(J||I!="createlink"){K=this.document.execCommand(I,false,J)
}}}}}this.onDisplayChanged();
return K
},queryCommandEnabled:function(D){D=this._normalizeCommand(D);
if(dojo.isMoz||dojo.isSafari){if(D=="unlink"){return dojo.withGlobal(this.window,"hasAncestorElement",dijit._editor.selection,["a"])
}else{if(D=="inserttable"){return true
}}}if(dojo.isSafari){if(D=="copy"){D="cut"
}else{if(D=="paste"){return true
}}}var C=(dojo.isIE)?this.document.selection.createRange():this.document;
return C.queryCommandEnabled(D)
},queryCommandState:function(B){B=this._normalizeCommand(B);
return this.document.queryCommandState(B)
},queryCommandValue:function(B){B=this._normalizeCommand(B);
if(dojo.isIE&&B=="formatblock"){return this._local2NativeFormatNames[this.document.queryCommandValue(B)]
}return this.document.queryCommandValue(B)
},placeCursorAtStart:function(){this.focus();
var C=false;
if(dojo.isMoz){var D=this.editNode.firstChild;
while(D){if(D.nodeType==3){if(D.nodeValue.replace(/^\s+|\s+$/g,"").length>0){C=true;
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[D]);
break
}}else{if(D.nodeType==1){C=true;
dojo.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[D]);
break
}}D=D.nextSibling
}}else{C=true;
dojo.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[this.editNode])
}if(C){dojo.withGlobal(this.window,"collapse",dijit._editor.selection,[true])
}},placeCursorAtEnd:function(){this.focus();
var C=false;
if(dojo.isMoz){var D=this.editNode.lastChild;
while(D){if(D.nodeType==3){if(D.nodeValue.replace(/^\s+|\s+$/g,"").length>0){C=true;
dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[D]);
break
}}else{if(D.nodeType==1){C=true;
if(D.lastChild){dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[D.lastChild])
}else{dojo.withGlobal(this.window,"selectElement",dijit._editor.selection,[D])
}break
}}D=D.previousSibling
}}else{C=true;
dojo.withGlobal(this.window,"selectElementChildren",dijit._editor.selection,[this.editNode])
}if(C){dojo.withGlobal(this.window,"collapse",dijit._editor.selection,[false])
}},getValue:function(B){if(this.textarea){if(this.isClosed||!this.isLoaded){return this.textarea.value
}}return this._postFilterContent(null,B)
},setValue:function(B){if(this.textarea&&(this.isClosed||!this.isLoaded)){this.textarea.value=B
}else{B=this._preFilterContent(B);
if(this.isClosed){this.domNode.innerHTML=B;
this._preDomFilterContent(this.domNode)
}else{this.editNode.innerHTML=B;
this._preDomFilterContent(this.editNode)
}}},replaceValue:function(B){if(this.isClosed){this.setValue(B)
}else{if(this.window&&this.window.getSelection&&!dojo.isMoz){this.setValue(B)
}else{if(this.window&&this.window.getSelection){B=this._preFilterContent(B);
this.execCommand("selectall");
if(dojo.isMoz&&!B){B="&nbsp;"
}this.execCommand("inserthtml",B);
this._preDomFilterContent(this.editNode)
}else{if(this.document&&this.document.selection){this.setValue(B)
}}}}},_preFilterContent:function(D){var C=D;
dojo.forEach(this.contentPreFilters,function(A){if(A){C=A(C)
}});
return C
},_preDomFilterContent:function(B){B=B||this.editNode;
dojo.forEach(this.contentDomPreFilters,function(A){if(A&&dojo.isFunction(A)){A(B)
}},this)
},_postFilterContent:function(E,F){E=E||this.editNode;
if(this.contentDomPostFilters.length){if(F&&E.cloneNode){E=E.cloneNode(true)
}dojo.forEach(this.contentDomPostFilters,function(A){E=A(E)
})
}var D=this.getNodeChildrenHtml(E);
if(!D.replace(/^(?:\s|\xA0)+/g,"").replace(/(?:\s|\xA0)+$/g,"").length){D=""
}dojo.forEach(this.contentPostFilters,function(A){D=A(D)
});
return D
},_saveContent:function(D){var C=dojo.byId("dijit._editor.RichText.savedContent");
C.value+=this._SEPARATOR+this.name+":"+this.getValue()
},escapeXml:function(C,D){C=C.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!D){C=C.replace(/'/gm,"&#39;")
}return C
},getNodeHtml:function(M){switch(M.nodeType){case 1:var N="<"+M.tagName.toLowerCase();
if(dojo.isMoz){if(M.getAttribute("type")=="_moz"){M.removeAttribute("type")
}if(M.getAttribute("_moz_dirty")!=undefined){M.removeAttribute("_moz_dirty")
}}var T=[];
if(dojo.isIE){var P=M.outerHTML;
P=P.substr(0,P.indexOf(">"));
P=P.replace(/(?:['"])[^"']*\1/g,"");
var O=/([^\s=]+)=/g;
var L,Q;
while((L=O.exec(P))!=undefined){Q=L[1];
if(Q.substr(0,3)!="_dj"){if(Q=="src"||Q=="href"){if(M.getAttribute("_djrealurl")){T.push([Q,M.getAttribute("_djrealurl")]);
continue
}}if(Q=="class"){T.push([Q,M.className])
}else{T.push([Q,M.getAttribute(Q)])
}}}}else{var U,V=0,R=M.attributes;
while((U=R[V++])){if(U.name.substr(0,3)!="_dj"){var S=U.value;
if(U.name=="src"||U.name=="href"){if(M.getAttribute("_djrealurl")){S=M.getAttribute("_djrealurl")
}}T.push([U.name,S])
}}}T.sort(function(B,A){return B[0]<A[0]?-1:(B[0]==A[0]?0:1)
});
V=0;
while((U=T[V++])){N+=" "+U[0]+'="'+U[1]+'"'
}if(M.childNodes.length){N+=">"+this.getNodeChildrenHtml(M)+"</"+M.tagName.toLowerCase()+">"
}else{N+=" />"
}break;
case 3:var N=this.escapeXml(M.nodeValue,true);
break;
case 8:var N="<!--"+this.escapeXml(M.nodeValue,true)+"-->";
break;
default:var N="Element not recognized - Type: "+M.nodeType+" Name: "+M.nodeName
}return N
},getNodeChildrenHtml:function(G){var J="";
if(!G){return J
}var F=G.childNodes||G;
var I=0;
var H;
while((H=F[I++])){J+=this.getNodeHtml(H)
}return J
},close:function(save,force){if(this.isClosed){return false
}if(!arguments.length){save=true
}this._content=this.getValue();
var changed=(this.savedContent!=this._content);
if(this.interval){clearInterval(this.interval)
}if(this.textarea){with(this.textarea.style){position="";
left=top="";
if(dojo.isIE){overflow=this.__overflow;
this.__overflow=null
}}if(save){this.textarea.value=this._content
}else{this.textarea.value=this.savedContent
}dojo._destroyElement(this.domNode);
this.domNode=this.textarea
}else{if(save){this.domNode.innerHTML=this._content
}else{this.domNode.innerHTML=this.savedContent
}}dojo.removeClass(this.domNode,"RichTextEditable");
this.isClosed=true;
this.isLoaded=false;
delete this.editNode;
if(this.window&&this.window._frameElement){this.window._frameElement=null
}this.window=null;
this.document=null;
this.editingArea=null;
this.editorObject=null;
return changed
},destroyRendering:function(){},destroy:function(){this.destroyRendering();
if(!this.isClosed){this.close(false)
}this.inherited("destroy",arguments)
},_fixContentForMoz:function(B){B=B.replace(/<(\/)?strong([ \>])/gi,"<$1b$2");
B=B.replace(/<(\/)?em([ \>])/gi,"<$1i$2");
return B
},_srcInImgRegex:/(?:(<img(?=\s).*?\ssrc=)("|')(.*?)\2)|(?:(<img\s.*?src=)([^"'][^ >]+))/gi,_hrefInARegex:/(?:(<a(?=\s).*?\shref=)("|')(.*?)\2)|(?:(<a\s.*?href=)([^"'][^ >]+))/gi,_preFixUrlAttributes:function(B){B=B.replace(this._hrefInARegex,"$1$4$2$3$5$2 _djrealurl=$2$3$5$2");
B=B.replace(this._srcInImgRegex,"$1$4$2$3$5$2 _djrealurl=$2$3$5$2");
return B
}})
};