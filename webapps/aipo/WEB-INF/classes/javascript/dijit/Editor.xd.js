dojo._xdResourceLoaded({depends:[["provide","dijit.Editor"],["require","dijit._editor.RichText"],["require","dijit.Toolbar"],["require","dijit._editor._Plugin"],["require","dijit._Container"],["require","dojo.i18n"],["requireLocalization","dijit._editor","commands",null,"ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw","ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw"]],defineResource:function(B){if(!B._hasResource["dijit.Editor"]){B._hasResource["dijit.Editor"]=true;
B.provide("dijit.Editor");
B.require("dijit._editor.RichText");
B.require("dijit.Toolbar");
B.require("dijit._editor._Plugin");
B.require("dijit._Container");
B.require("dojo.i18n");
B.declare("dijit.Editor",dijit._editor.RichText,{plugins:null,extraPlugins:null,constructor:function(){this.plugins=["undo","redo","|","cut","copy","paste","|","bold","italic","underline","strikethrough","|","insertOrderedList","insertUnorderedList","indent","outdent","|","justifyLeft","justifyRight","justifyCenter","justifyFull"];
this._plugins=[];
this._editInterval=this.editActionInterval*1000
},postCreate:function(){if(this.customUndo){B.require("dijit._editor.range");
this._steps=this._steps.slice(0);
this._undoedSteps=this._undoedSteps.slice(0)
}if(B.isArray(this.extraPlugins)){this.plugins=this.plugins.concat(this.extraPlugins)
}dijit.Editor.superclass.postCreate.apply(this,arguments);
this.commands=B.i18n.getLocalization("dijit._editor","commands",this.lang);
if(!this.toolbar){var A=B.doc.createElement("div");
B.place(A,this.editingArea,"before");
this.toolbar=new dijit.Toolbar({},A)
}B.forEach(this.plugins,this.addPlugin,this);
this.onNormalizedDisplayChanged()
},destroy:function(){B.forEach(this._plugins,function(A){if(A.destroy){A.destroy()
}});
this._plugins=[];
this.toolbar.destroy();
delete this.toolbar;
this.inherited("destroy",arguments)
},addPlugin:function(G,H){var I=B.isString(G)?{name:G}:G;
if(!I.setEditor){var A={args:I,plugin:null,editor:this};
B.publish("dijit.Editor.getPlugin",[A]);
if(!A.plugin){var J=B.getObject(I.name);
if(J){A.plugin=new J(I)
}}if(!A.plugin){console.debug("Cannot find plugin",G);
return 
}G=A.plugin
}if(arguments.length>1){this._plugins[H]=G
}else{this._plugins.push(G)
}G.setEditor(this);
if(B.isFunction(G.setToolbar)){G.setToolbar(this.toolbar)
}},customUndo:B.isIE,editActionInterval:3,beginEditing:function(A){if(!this._inEditing){this._inEditing=true;
this._beginEditing(A)
}if(this.editActionInterval>0){if(this._editTimer){clearTimeout(this._editTimer)
}this._editTimer=setTimeout(B.hitch(this,this.endEditing),this._editInterval)
}},_steps:[],_undoedSteps:[],execCommand:function(H){if(this.customUndo&&(H=="undo"||H=="redo")){return this[H]()
}else{try{if(this.customUndo){this.endEditing();
this._beginEditing()
}var I=this.inherited("execCommand",arguments);
if(this.customUndo){this._endEditing()
}return I
}catch(A){if(B.isMoz&&/copy|cut|paste/.test(H)){var J=B.string.substitute,L={cut:"X",copy:"C",paste:"V"},K=navigator.userAgent.indexOf("Macintosh")!=-1;
alert(J(this.commands.systemShortcutFF,[this.commands[H],J(this.commands[K?"appleKey":"ctrlKey"],[L[H]])]))
}return false
}}},queryCommandEnabled:function(A){if(this.customUndo&&(A=="undo"||A=="redo")){return A=="undo"?(this._steps.length>1):(this._undoedSteps.length>0)
}else{return this.inherited("queryCommandEnabled",arguments)
}},_changeToStep:function(A,G){this.setValue(G.text);
var J=G.bookmark;
if(!J){return 
}if(B.isIE){if(B.isArray(J)){var I=[];
B.forEach(J,function(C){I.push(dijit.range.getNode(C,this.editNode))
},this);
J=I
}}else{var H=dijit.range.create();
H.setStart(dijit.range.getNode(J.startContainer,this.editNode),J.startOffset);
H.setEnd(dijit.range.getNode(J.endContainer,this.editNode),J.endOffset);
J=H
}B.withGlobal(this.window,"moveToBookmark",dijit,[J])
},undo:function(){this.endEditing(true);
var A=this._steps.pop();
if(this._steps.length>0){this.focus();
this._changeToStep(A,this._steps[this._steps.length-1]);
this._undoedSteps.push(A);
this.onDisplayChanged();
return true
}return false
},redo:function(){this.endEditing(true);
var A=this._undoedSteps.pop();
if(A&&this._steps.length>0){this.focus();
this._changeToStep(this._steps[this._steps.length-1],A);
this._steps.push(A);
this.onDisplayChanged();
return true
}return false
},endEditing:function(A){if(this._editTimer){clearTimeout(this._editTimer)
}if(this._inEditing){this._endEditing(A);
this._inEditing=false
}},_getBookmark:function(){var D=B.withGlobal(this.window,dijit.getBookmark);
if(B.isIE){if(B.isArray(D)){var A=[];
B.forEach(D,function(C){A.push(dijit.range.getIndex(C,this.editNode).o)
},this);
D=A
}}else{var A=dijit.range.getIndex(D.startContainer,this.editNode).o;
D={startContainer:A,startOffset:D.startOffset,endContainer:D.endContainer===D.startContainer?A:dijit.range.getIndex(D.endContainer,this.editNode).o,endOffset:D.endOffset}
}return D
},_beginEditing:function(A){if(this._steps.length===0){this._steps.push({text:this.savedContent,bookmark:this._getBookmark()})
}},_endEditing:function(A){var D=this.getValue(true);
this._undoedSteps=[];
this._steps.push({text:D,bookmark:this._getBookmark()})
},onKeyDown:function(E){if(!this.customUndo){this.inherited("onKeyDown",arguments);
return 
}var F=E.keyCode,A=B.keys;
if(E.ctrlKey){if(F===90||F===122){B.stopEvent(E);
this.undo();
return 
}else{if(F===89||F===121){B.stopEvent(E);
this.redo();
return 
}}}this.inherited("onKeyDown",arguments);
switch(F){case A.ENTER:this.beginEditing();
break;
case A.BACKSPACE:case A.DELETE:this.beginEditing();
break;
case 88:case 86:if(E.ctrlKey&&!E.altKey&&!E.metaKey){this.endEditing();
if(E.keyCode==88){this.beginEditing("cut");
setTimeout(B.hitch(this,this.endEditing),1)
}else{this.beginEditing("paste");
setTimeout(B.hitch(this,this.endEditing),1)
}break
}default:if(!E.ctrlKey&&!E.altKey&&!E.metaKey&&(E.keyCode<B.keys.F1||E.keyCode>B.keys.F15)){this.beginEditing();
break
}case A.ALT:this.endEditing();
break;
case A.UP_ARROW:case A.DOWN_ARROW:case A.LEFT_ARROW:case A.RIGHT_ARROW:case A.HOME:case A.END:case A.PAGE_UP:case A.PAGE_DOWN:this.endEditing(true);
break;
case A.CTRL:case A.SHIFT:case A.TAB:break
}},_onBlur:function(){this.inherited("_onBlur",arguments);
this.endEditing(true)
},onClick:function(){this.endEditing(true);
this.inherited("onClick",arguments)
}});
B.subscribe("dijit.Editor.getPlugin",null,function(A){if(A.plugin){return 
}var H=A.args,G;
var J=dijit._editor._Plugin;
var I=H.name;
switch(I){case"undo":case"redo":case"cut":case"copy":case"paste":case"insertOrderedList":case"insertUnorderedList":case"indent":case"outdent":case"justifyCenter":case"justifyFull":case"justifyLeft":case"justifyRight":case"delete":case"selectAll":case"removeFormat":G=new J({command:I});
break;
case"bold":case"italic":case"underline":case"strikethrough":case"subscript":case"superscript":G=new J({buttonClass:dijit.form.ToggleButton,command:I});
break;
case"|":G=new J({button:new dijit.ToolbarSeparator()});
break;
case"createLink":G=new dijit._editor.plugins.LinkDialog({command:I});
break;
case"foreColor":case"hiliteColor":G=new dijit._editor.plugins.TextColor({command:I});
break;
case"fontName":case"fontSize":case"formatBlock":G=new dijit._editor.plugins.FontChoice({command:I})
}A.plugin=G
})
}}});