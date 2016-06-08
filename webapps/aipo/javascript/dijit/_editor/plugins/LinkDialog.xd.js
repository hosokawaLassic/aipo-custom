dojo._xdResourceLoaded({depends:[["provide","dijit._editor.plugins.LinkDialog"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dijit._editor._Plugin"],["require","dijit.Dialog"],["require","dijit.form.Button"],["require","dijit.form.ValidationTextBox"],["require","dojo.i18n"],["require","dojo.string"],["requireLocalization","dijit._editor","LinkDialog",null,"cs,de,es,fr,hu,it,ja,ko,ROOT,pl,pt,ru,zh,zh-tw","cs,de,es,fr,hu,it,ja,ko,ROOT,pl,pt,ru,zh,zh-tw"]],defineResource:function(A){if(!A._hasResource["dijit._editor.plugins.LinkDialog"]){A._hasResource["dijit._editor.plugins.LinkDialog"]=true;
A.provide("dijit._editor.plugins.LinkDialog");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.require("dijit._editor._Plugin");
A.require("dijit.Dialog");
A.require("dijit.form.Button");
A.require("dijit.form.ValidationTextBox");
A.require("dojo.i18n");
A.require("dojo.string");
A.declare("dijit._editor.plugins.DualStateDropDownButton",dijit.form.DropDownButton,{setChecked:dijit.form.ToggleButton.prototype.setChecked});
A.declare("dijit._editor.plugins.UrlTextBox",dijit.form.ValidationTextBox,{regExp:"((https?|ftps?)\\://|)(([0-9a-zA-Z]([-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?\\.)+(arpa|aero|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|xxx|jobs|mobi|post|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|eu|es|et|fi|fj|fk|fm|fo|fr|ga|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sk|sl|sm|sn|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)|(((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])|(0[xX]0*[\\da-fA-F]?[\\da-fA-F]\\.){3}0[xX]0*[\\da-fA-F]?[\\da-fA-F]|(0+[0-3][0-7][0-7]\\.){3}0+[0-3][0-7][0-7]|(0|[1-9]\\d{0,8}|[1-3]\\d{9}|4[01]\\d{8}|42[0-8]\\d{7}|429[0-3]\\d{6}|4294[0-8]\\d{5}|42949[0-5]\\d{4}|429496[0-6]\\d{3}|4294967[01]\\d{2}|42949672[0-8]\\d|429496729[0-5])|0[xX]0*[\\da-fA-F]{1,8}|([\\da-fA-F]{1,4}\\:){7}[\\da-fA-F]{1,4}|([\\da-fA-F]{1,4}\\:){6}((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])))(\\:(0|[1-9]\\d*))?(/([^?#\\s/]+/)*)?([^?#\\s/]+(\\?[^?#\\s/]*)?(#[A-Za-z][\\w.:-]*)?)?",required:true,postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.invalidMessage=A.i18n.getLocalization("dijit._editor","LinkDialog",this.lang).urlInvalidMessage
},getValue:function(){if(!/^(https?|ftps?)/.test(this.textbox.value)){this.textbox.value="http://"+this.textbox.value
}return this.textbox.value
}});
A.declare("dijit._editor.plugins.LinkDialog",dijit._editor._Plugin,{buttonClass:dijit._editor.plugins.DualStateDropDownButton,useDefaultCommand:false,command:"createLink",linkDialogTemplate:["<label for='urlInput'>${url}&nbsp;</label>","<input dojoType=dijit._editor.plugins.UrlTextBox name='urlInput'><br>","<label for='textInput'>${text}&nbsp;</label>","<input dojoType=dijit.form.TextBox name='textInput'>","<br>","<button dojoType=dijit.form.Button type='submit'>${set}</button>"].join(""),constructor:function(){var C=this;
var B=A.i18n.getLocalization("dijit._editor","LinkDialog",this.lang);
this.dropDown=new dijit.TooltipDialog({title:B.title,execute:A.hitch(this,"setValue"),onOpen:function(){C._onOpenDialog();
dijit.TooltipDialog.prototype.onOpen.apply(this,arguments)
},onCancel:function(){setTimeout(A.hitch(C,"_onCloseDialog"),0)
},onClose:A.hitch(this,"_onCloseDialog")});
this.dropDown.setContent(A.string.substitute(this.linkDialogTemplate,B));
this.dropDown.startup()
},setValue:function(C){this._onCloseDialog();
if(A.isIE){var B=A.withGlobal(this.editor.window,"getAncestorElement",dijit._editor.selection,["a"]);
if(B){A.withGlobal(this.editor.window,"selectElement",dijit._editor.selection,[B])
}}var D='href="'+C.urlInput+'" _djrealurl="'+C.urlInput+'"';
this.editor.execCommand("inserthtml","<a "+D+">"+C.textInput+"</a>")
},_onCloseDialog:function(){if(A.isIE){if(this._savedSelection){var B=this._savedSelection;
this._savedSelection=null;
this.editor.focus();
var C=this.editor.document.selection.createRange();
C.moveToBookmark(B);
C.select()
}}else{this.editor.focus()
}},_onOpenDialog:function(){var B=A.withGlobal(this.editor.window,"getAncestorElement",dijit._editor.selection,["a"]);
var D="",E="";
if(B){D=B.getAttribute("_djrealurl");
E=B.textContent||B.innerText;
A.withGlobal(this.editor.window,"selectElement",dijit._editor.selection,[B,true])
}else{E=A.withGlobal(this.editor.window,dijit._editor.selection.getSelectedText)
}if(A.isIE){var C=this.editor.document.selection.createRange();
this._savedSelection=C.getBookmark()
}this.dropDown.setValues({urlInput:D,textInput:E})
},updateState:function(){var B=this.editor;
if(!B){return 
}if(!B.isLoaded){return 
}if(this.button){try{var C=A.withGlobal(this.editor.window,"hasAncestorElement",dijit._editor.selection,["a"]);
this.button.setChecked(C)
}catch(D){console.debug(D)
}}}})
}}});