dojo._xdResourceLoaded({depends:[["provide","dijit.form._FormWidget"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(B){if(!B._hasResource["dijit.form._FormWidget"]){B._hasResource["dijit.form._FormWidget"]=true;
B.provide("dijit.form._FormWidget");
B.require("dijit._Widget");
B.require("dijit._Templated");
B.declare("dijit.form._FormWidget",[dijit._Widget,dijit._Templated],{baseClass:"",value:"",name:"",id:"",alt:"",type:"text",tabIndex:"0",disabled:false,intermediateChanges:false,attributeMap:B.mixin(B.clone(dijit._Widget.prototype.attributeMap),{id:"focusNode",tabIndex:"focusNode",alt:"focusNode"}),setDisabled:function(A){this.domNode.disabled=this.disabled=A;
if(this.focusNode){this.focusNode.disabled=A
}if(A){this._hovering=false;
this._active=false
}dijit.setWaiState(this.focusNode||this.domNode,"disabled",A);
this._setStateClass()
},_onMouse:function(F){var A=F.target;
if(A&&A.getAttribute){this.stateModifier=A.getAttribute("stateModifier")||""
}if(!this.disabled){switch(F.type){case"mouseenter":case"mouseover":this._hovering=true;
break;
case"mouseout":case"mouseleave":this._hovering=false;
break;
case"mousedown":this._active=true;
var H=this;
var G=this.connect(B.body(),"onmouseup",function(){H._active=false;
H._setStateClass();
H.disconnect(G)
});
break
}this._setStateClass()
}},isFocusable:function(){return !this.disabled&&(B.style(this.domNode,"display")!="none")
},focus:function(){dijit.focus(this.focusNode)
},_setStateClass:function(){if(!("staticClass" in this)){this.staticClass=(this.stateNode||this.domNode).className
}var A=[this.baseClass];
function D(C){A=A.concat(B.map(A,function(F){return F+C
}))
}if(this.checked){D("Checked")
}if(this.state){D(this.state)
}if(this.selected){D("Selected")
}if(this.disabled){D("Disabled")
}else{if(this._active){D(this.stateModifier+"Active")
}else{if(this._focused){D("Focused")
}if((this.stateModifier||!this._focused)&&this._hovering){D(this.stateModifier+"Hover")
}}}(this.stateNode||this.domNode).className=this.staticClass+" "+A.join(" ")
},onChange:function(A){},postCreate:function(){this.setValue(this.value,null);
this.setDisabled(this.disabled);
this._setStateClass()
},setValue:function(A,D){this._lastValue=A;
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",this.forWaiValuenow());
if(D===undefined){D=true
}if(this._lastValueReported==undefined&&D===null){this._lastValueReported=A
}if((this.intermediateChanges||D)&&((A&&A.toString)?A.toString():A)!==((this._lastValueReported&&this._lastValueReported.toString)?this._lastValueReported.toString():this._lastValueReported)){this._lastValueReported=A;
this.onChange(A)
}},getValue:function(){return this._lastValue
},undo:function(){this.setValue(this._lastValueReported,false)
},_onKeyPress:function(E){if(E.keyCode==B.keys.ESCAPE&&!E.shiftKey&&!E.ctrlKey&&!E.altKey){var F=this.getValue();
var A=this._lastValueReported;
if((typeof A!="undefined")&&((F!==null&&F.toString)?F.toString():null)!==A.toString()){this.undo();
B.stopEvent(E);
return false
}}return true
},forWaiValuenow:function(){return this.getValue()
}})
}}});