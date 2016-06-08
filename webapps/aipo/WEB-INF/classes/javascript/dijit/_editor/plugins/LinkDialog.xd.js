dojo._xdResourceLoaded({depends:[["provide","dijit._editor.plugins.LinkDialog"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dijit._editor._Plugin"],["require","dijit.Dialog"],["require","dijit.form.Button"],["require","dijit.form.ValidationTextBox"],["require","dojo.i18n"],["require","dojo.string"],["requireLocalization","dijit._editor","LinkDialog",null,"cs,de,es,fr,hu,it,ja,ko,ROOT,pl,pt,ru,zh,zh-tw","cs,de,es,fr,hu,it,ja,ko,ROOT,pl,pt,ru,zh,zh-tw"]],defineResource:function(B){if(!B._hasResource["dijit._editor.plugins.LinkDialog"]){B._hasResource["dijit._editor.plugins.LinkDialog"]=true;
B.provide("dijit._editor.plugins.LinkDialog");
B.require("dijit._Widget");
B.require("dijit._Templated");
B.require("dijit._editor._Plugin");
B.require("dijit.Dialog");
B.require("dijit.form.Button");
B.require("dijit.form.ValidationTextBox");
B.require("dojo.i18n");
B.require("dojo.string");
B.declare("dijit._editor.plugins.DualStateDropDownButton",dijit.form.DropDownButton,{setChecked:dijit.form.ToggleButton.prototype.setChecked});
B.declare("dijit._editor.plugins.UrlTextBox",dijit.form.ValidationTextBox,{regExp:"((https?|ftps?)\\://|)(([0-9a-zA-Z]([-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?\\.)+(arpa|aero|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|xxx|jobs|mobi|post|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|eu|es|et|fi|fj|fk|fm|fo|fr|ga|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sk|sl|sm|sn|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)|(((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])|(0[xX]0*[\\da-fA-F]?[\\da-fA-F]\\.){3}0[xX]0*[\\da-fA-F]?[\\da-fA-F]|(0+[0-3][0-7][0-7]\\.){3}0+[0-3][0-7][0-7]|(0|[1-9]\\d{0,8}|[1-3]\\d{9}|4[01]\\d{8}|42[0-8]\\d{7}|429[0-3]\\d{6}|4294[0-8]\\d{5}|42949[0-5]\\d{4}|429496[0-6]\\d{3}|4294967[01]\\d{2}|42949672[0-8]\\d|429496729[0-5])|0[xX]0*[\\da-fA-F]{1,8}|([\\da-fA-F]{1,4}\\:){7}[\\da-fA-F]{1,4}|([\\da-fA-F]{1,4}\\:){6}((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])))(\\:(0|[1-9]\\d*))?(/([^?#\\s/]+/)*)?([^?#\\s/]+(\\?[^?#\\s/]*)?(#[A-Za-z][\\w.:-]*)?)?",required:true,postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.invalidMessage=B.i18n.getLocalization("dijit._editor","LinkDialog",this.lang).urlInvalidMessage
},getValue:function(){if(!/^(https?|ftps?)/.test(this.textbox.value)){this.textbox.value="http://"+this.textbox.value
}return this.textbox.value
}});
B.declare("dijit._editor.plugins.LinkDialog",dijit._editor._Plugin,{buttonClass:dijit._editor.plugins.DualStateDropDownButton,useDefaultCommand:false,command:"createLink",linkDialogTemplate:["<label for='urlInput'>${url}&nbsp;</label>","<input dojoType=dijit._editor.plugins.UrlTextBox name='urlInput'><br>","<label for='textInput'>${text}&nbsp;</label>","<input dojoType=dijit.form.TextBox name='textInput'>","<br>","<button dojoType=dijit.form.Button type='submit'>${set}</button>"].join(""),constructor:function(){var A=this;
var D=B.i18n.getLocalization("dijit._editor","LinkDialog",this.lang);
this.dropDown=new dijit.TooltipDialog({title:D.title,execute:B.hitch(this,"setValue"),onOpen:function(){A._onOpenDialog();
dijit.TooltipDialog.prototype.onOpen.apply(this,arguments)
},onCancel:function(){setTimeout(B.hitch(A,"_onCloseDialog"),0)
},onClose:B.hitch(this,"_onCloseDialog")});
this.dropDown.setContent(B.string.substitute(this.linkDialogTemplate,D));
this.dropDown.startup()
},setValue:function(E){this._onCloseDialog();
if(B.isIE){var F=B.withGlobal(this.editor.window,"getAncestorElement",dijit._editor.selection,["a"]);
if(F){B.withGlobal(this.editor.window,"selectElement",dijit._editor.selection,[F])
}}var A='href="'+E.urlInput+'" _djrealurl="'+E.urlInput+'"';
this.editor.execCommand("inserthtml","<a "+A+">"+E.textInput+"</a>")
},_onCloseDialog:function(){if(B.isIE){if(this._savedSelection){var D=this._savedSelection;
this._savedSelection=null;
this.editor.focus();
var A=this.editor.document.selection.createRange();
A.moveToBookmark(D);
A.select()
}}else{this.editor.focus()
}},_onOpenDialog:function(){var H=B.withGlobal(this.editor.window,"getAncestorElement",dijit._editor.selection,["a"]);
var F="",A="";
if(H){F=H.getAttribute("_djrealurl");
A=H.textContent||H.innerText;
B.withGlobal(this.editor.window,"selectElement",dijit._editor.selection,[H,true])
}else{A=B.withGlobal(this.editor.window,dijit._editor.selection.getSelectedText)
}if(B.isIE){var G=this.editor.document.selection.createRange();
this._savedSelection=G.getBookmark()
}this.dropDown.setValues({urlInput:F,textInput:A})
},updateState:function(){var F=this.editor;
if(!F){return 
}if(!F.isLoaded){return 
}if(this.button){try{var E=B.withGlobal(this.editor.window,"hasAncestorElement",dijit._editor.selection,["a"]);
this.button.setChecked(E)
}catch(A){console.debug(A)
}}}})
}}});