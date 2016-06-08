if(!dojo._hasResource["dijit.Editor"]){dojo._hasResource["dijit.Editor"]=true;
dojo.provide("dijit.Editor");
dojo.require("dijit._editor.RichText");
dojo.require("dijit.Toolbar");
dojo.require("dijit._editor._Plugin");
dojo.require("dijit._Container");
dojo.require("dojo.i18n");
dojo.requireLocalization("dijit._editor","commands",null,"ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw");
dojo.declare("dijit.Editor",dijit._editor.RichText,{plugins:null,extraPlugins:null,constructor:function(){this.plugins=["undo","redo","|","cut","copy","paste","|","bold","italic","underline","strikethrough","|","insertOrderedList","insertUnorderedList","indent","outdent","|","justifyLeft","justifyRight","justifyCenter","justifyFull"];
this._plugins=[];
this._editInterval=this.editActionInterval*1000
},postCreate:function(){if(this.customUndo){dojo.require("dijit._editor.range");
this._steps=this._steps.slice(0);
this._undoedSteps=this._undoedSteps.slice(0)
}if(dojo.isArray(this.extraPlugins)){this.plugins=this.plugins.concat(this.extraPlugins)
}dijit.Editor.superclass.postCreate.apply(this,arguments);
this.commands=dojo.i18n.getLocalization("dijit._editor","commands",this.lang);
if(!this.toolbar){var B=dojo.doc.createElement("div");
dojo.place(B,this.editingArea,"before");
this.toolbar=new dijit.Toolbar({},B)
}dojo.forEach(this.plugins,this.addPlugin,this);
this.onNormalizedDisplayChanged()
},destroy:function(){dojo.forEach(this._plugins,function(B){if(B.destroy){B.destroy()
}});
this._plugins=[];
this.toolbar.destroy();
delete this.toolbar;
this.inherited("destroy",arguments)
},addPlugin:function(H,I){var J=dojo.isString(H)?{name:H}:H;
if(!J.setEditor){var G={args:J,plugin:null,editor:this};
dojo.publish("dijit.Editor.getPlugin",[G]);
if(!G.plugin){var F=dojo.getObject(J.name);
if(F){G.plugin=new F(J)
}}if(!G.plugin){console.debug("Cannot find plugin",H);
return 
}H=G.plugin
}if(arguments.length>1){this._plugins[I]=H
}else{this._plugins.push(H)
}H.setEditor(this);
if(dojo.isFunction(H.setToolbar)){H.setToolbar(this.toolbar)
}},customUndo:dojo.isIE,editActionInterval:3,beginEditing:function(B){if(!this._inEditing){this._inEditing=true;
this._beginEditing(B)
}if(this.editActionInterval>0){if(this._editTimer){clearTimeout(this._editTimer)
}this._editTimer=setTimeout(dojo.hitch(this,this.endEditing),this._editInterval)
}},_steps:[],_undoedSteps:[],execCommand:function(I){if(this.customUndo&&(I=="undo"||I=="redo")){return this[I]()
}else{try{if(this.customUndo){this.endEditing();
this._beginEditing()
}var J=this.inherited("execCommand",arguments);
if(this.customUndo){this._endEditing()
}return J
}catch(H){if(dojo.isMoz&&/copy|cut|paste/.test(I)){var K=dojo.string.substitute,G={cut:"X",copy:"C",paste:"V"},L=navigator.userAgent.indexOf("Macintosh")!=-1;
alert(K(this.commands.systemShortcutFF,[this.commands[I],K(this.commands[L?"appleKey":"ctrlKey"],[G[I]])]))
}return false
}}},queryCommandEnabled:function(B){if(this.customUndo&&(B=="undo"||B=="redo")){return B=="undo"?(this._steps.length>1):(this._undoedSteps.length>0)
}else{return this.inherited("queryCommandEnabled",arguments)
}},_changeToStep:function(G,H){this.setValue(H.text);
var F=H.bookmark;
if(!F){return 
}if(dojo.isIE){if(dojo.isArray(F)){var J=[];
dojo.forEach(F,function(A){J.push(dijit.range.getNode(A,this.editNode))
},this);
F=J
}}else{var I=dijit.range.create();
I.setStart(dijit.range.getNode(F.startContainer,this.editNode),F.startOffset);
I.setEnd(dijit.range.getNode(F.endContainer,this.editNode),F.endOffset);
F=I
}dojo.withGlobal(this.window,"moveToBookmark",dijit,[F])
},undo:function(){this.endEditing(true);
var B=this._steps.pop();
if(this._steps.length>0){this.focus();
this._changeToStep(B,this._steps[this._steps.length-1]);
this._undoedSteps.push(B);
this.onDisplayChanged();
return true
}return false
},redo:function(){this.endEditing(true);
var B=this._undoedSteps.pop();
if(B&&this._steps.length>0){this.focus();
this._changeToStep(this._steps[this._steps.length-1],B);
this._steps.push(B);
this.onDisplayChanged();
return true
}return false
},endEditing:function(B){if(this._editTimer){clearTimeout(this._editTimer)
}if(this._inEditing){this._endEditing(B);
this._inEditing=false
}},_getBookmark:function(){var C=dojo.withGlobal(this.window,dijit.getBookmark);
if(dojo.isIE){if(dojo.isArray(C)){var D=[];
dojo.forEach(C,function(A){D.push(dijit.range.getIndex(A,this.editNode).o)
},this);
C=D
}}else{var D=dijit.range.getIndex(C.startContainer,this.editNode).o;
C={startContainer:D,startOffset:C.startOffset,endContainer:C.endContainer===C.startContainer?D:dijit.range.getIndex(C.endContainer,this.editNode).o,endOffset:C.endOffset}
}return C
},_beginEditing:function(B){if(this._steps.length===0){this._steps.push({text:this.savedContent,bookmark:this._getBookmark()})
}},_endEditing:function(D){var C=this.getValue(true);
this._undoedSteps=[];
this._steps.push({text:C,bookmark:this._getBookmark()})
},onKeyDown:function(F){if(!this.customUndo){this.inherited("onKeyDown",arguments);
return 
}var D=F.keyCode,E=dojo.keys;
if(F.ctrlKey){if(D===90||D===122){dojo.stopEvent(F);
this.undo();
return 
}else{if(D===89||D===121){dojo.stopEvent(F);
this.redo();
return 
}}}this.inherited("onKeyDown",arguments);
switch(D){case E.ENTER:this.beginEditing();
break;
case E.BACKSPACE:case E.DELETE:this.beginEditing();
break;
case 88:case 86:if(F.ctrlKey&&!F.altKey&&!F.metaKey){this.endEditing();
if(F.keyCode==88){this.beginEditing("cut");
setTimeout(dojo.hitch(this,this.endEditing),1)
}else{this.beginEditing("paste");
setTimeout(dojo.hitch(this,this.endEditing),1)
}break
}default:if(!F.ctrlKey&&!F.altKey&&!F.metaKey&&(F.keyCode<dojo.keys.F1||F.keyCode>dojo.keys.F15)){this.beginEditing();
break
}case E.ALT:this.endEditing();
break;
case E.UP_ARROW:case E.DOWN_ARROW:case E.LEFT_ARROW:case E.RIGHT_ARROW:case E.HOME:case E.END:case E.PAGE_UP:case E.PAGE_DOWN:this.endEditing(true);
break;
case E.CTRL:case E.SHIFT:case E.TAB:break
}},_onBlur:function(){this.inherited("_onBlur",arguments);
this.endEditing(true)
},onClick:function(){this.endEditing(true);
this.inherited("onClick",arguments)
}});
dojo.subscribe("dijit.Editor.getPlugin",null,function(G){if(G.plugin){return 
}var I=G.args,H;
var F=dijit._editor._Plugin;
var J=I.name;
switch(J){case"undo":case"redo":case"cut":case"copy":case"paste":case"insertOrderedList":case"insertUnorderedList":case"indent":case"outdent":case"justifyCenter":case"justifyFull":case"justifyLeft":case"justifyRight":case"delete":case"selectAll":case"removeFormat":H=new F({command:J});
break;
case"bold":case"italic":case"underline":case"strikethrough":case"subscript":case"superscript":H=new F({buttonClass:dijit.form.ToggleButton,command:J});
break;
case"|":H=new F({button:new dijit.ToolbarSeparator()});
break;
case"createLink":H=new dijit._editor.plugins.LinkDialog({command:J});
break;
case"foreColor":case"hiliteColor":H=new dijit._editor.plugins.TextColor({command:J});
break;
case"fontName":case"fontSize":case"formatBlock":H=new dijit._editor.plugins.FontChoice({command:J})
}G.plugin=H
})
};