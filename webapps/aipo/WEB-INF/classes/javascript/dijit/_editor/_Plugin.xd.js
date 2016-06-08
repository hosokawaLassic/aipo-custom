dojo._xdResourceLoaded({depends:[["provide","dijit._editor._Plugin"],["require","dijit._Widget"],["require","dijit.Editor"],["require","dijit.form.Button"]],defineResource:function(B){if(!B._hasResource["dijit._editor._Plugin"]){B._hasResource["dijit._editor._Plugin"]=true;
B.provide("dijit._editor._Plugin");
B.require("dijit._Widget");
B.require("dijit.Editor");
B.require("dijit.form.Button");
B.declare("dijit._editor._Plugin",null,{constructor:function(D,A){if(D){B.mixin(this,D)
}},editor:null,iconClassPrefix:"dijitEditorIcon",button:null,queryCommand:null,command:"",commandArg:null,useDefaultCommand:true,buttonClass:dijit.form.Button,updateInterval:200,_initButton:function(){if(this.command.length){var F=this.editor.commands[this.command];
var A="dijitEditorIcon "+this.iconClassPrefix+this.command.charAt(0).toUpperCase()+this.command.substr(1);
if(!this.button){var E={label:F,showLabel:false,iconClass:A,dropDown:this.dropDown};
this.button=new this.buttonClass(E)
}}},updateState:function(){var H=this.editor;
var G=this.command;
if(!H){return 
}if(!H.isLoaded){return 
}if(!G.length){return 
}if(this.button){try{var F=H.queryCommandEnabled(G);
this.button.setDisabled(!F);
if(this.button.setChecked){this.button.setChecked(H.queryCommandState(G))
}}catch(A){console.debug(A)
}}},setEditor:function(A){this.editor=A;
this._initButton();
if((this.command.length)&&(!this.editor.queryCommandAvailable(this.command))){if(this.button){this.button.domNode.style.display="none"
}}if(this.button&&this.useDefaultCommand){B.connect(this.button,"onClick",B.hitch(this.editor,"execCommand",this.command,this.commandArg))
}B.connect(this.editor,"onNormalizedDisplayChanged",this,"updateState")
},setToolbar:function(A){if(this.button){A.addChild(this.button)
}}})
}}});