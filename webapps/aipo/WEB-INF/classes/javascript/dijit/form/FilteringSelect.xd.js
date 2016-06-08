dojo._xdResourceLoaded({depends:[["provide","dijit.form.FilteringSelect"],["require","dijit.form.ComboBox"]],defineResource:function(B){if(!B._hasResource["dijit.form.FilteringSelect"]){B._hasResource["dijit.form.FilteringSelect"]=true;
B.provide("dijit.form.FilteringSelect");
B.require("dijit.form.ComboBox");
B.declare("dijit.form.FilteringSelect",[dijit.form.MappedTextBox,dijit.form.ComboBoxMixin],{labelAttr:"",labelType:"text",_isvalid:true,isValid:function(){return this._isvalid
},_callbackSetLabel:function(F,E,A){if(E&&E.query[this.searchAttr]!=this._lastQuery){return 
}if(!F.length){if(!this._hasFocus){this.valueNode.value=""
}dijit.form.TextBox.superclass.setValue.call(this,undefined,!this._hasFocus);
this._isvalid=false;
this.validate(this._hasFocus)
}else{this._setValueFromItem(F[0],A)
}},_openResultList:function(D,A){if(A.query[this.searchAttr]!=this._lastQuery){return 
}this._isvalid=D.length!=0;
this.validate(true);
dijit.form.ComboBoxMixin.prototype._openResultList.apply(this,arguments)
},getValue:function(){return this.valueNode.value
},_getValueField:function(){return"value"
},_setValue:function(A,F,E){this.valueNode.value=A;
dijit.form.FilteringSelect.superclass.setValue.call(this,A,E,F);
this._lastDisplayedValue=F
},setValue:function(A,G){var H=this;
var F=function(C,D){if(C){if(H.store.isItemLoaded(C)){H._callbackSetLabel([C],undefined,D)
}else{H.store.loadItem({item:C,onItem:function(J,E){H._callbackSetLabel(J,E,D)
}})
}}else{H._isvalid=false;
H.validate(false)
}};
this.store.fetchItemByIdentity({identity:A,onItem:function(C){F(C,G)
}})
},_setValueFromItem:function(A,D){this._isvalid=true;
this._setValue(this.store.getIdentity(A),this.labelFunc(A,this.store),D)
},labelFunc:function(A,D){return D.getValue(A,this.searchAttr)
},onkeyup:function(A){},_doSelect:function(A){this.item=A.item;
this._setValueFromItem(A.item,true)
},setDisplayedValue:function(D){if(this.store){var A={};
this._lastQuery=A[this.searchAttr]=D;
this.textbox.value=D;
this._lastDisplayedValue=D;
this.store.fetch({query:A,queryOptions:{ignoreCase:this.ignoreCase,deep:true},onComplete:B.hitch(this,this._callbackSetLabel)})
}},_getMenuLabelFromItem:function(A){if(this.labelAttr){return{html:this.labelType=="html",label:this.store.getValue(A,this.labelAttr)}
}else{return dijit.form.ComboBoxMixin.prototype._getMenuLabelFromItem.apply(this,arguments)
}},postMixInProperties:function(){dijit.form.ComboBoxMixin.prototype.postMixInProperties.apply(this,arguments);
dijit.form.MappedTextBox.prototype.postMixInProperties.apply(this,arguments)
}})
}}});