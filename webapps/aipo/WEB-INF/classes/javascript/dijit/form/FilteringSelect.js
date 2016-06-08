if(!dojo._hasResource["dijit.form.FilteringSelect"]){dojo._hasResource["dijit.form.FilteringSelect"]=true;
dojo.provide("dijit.form.FilteringSelect");
dojo.require("dijit.form.ComboBox");
dojo.declare("dijit.form.FilteringSelect",[dijit.form.MappedTextBox,dijit.form.ComboBoxMixin],{labelAttr:"",labelType:"text",_isvalid:true,isValid:function(){return this._isvalid
},_callbackSetLabel:function(D,F,E){if(F&&F.query[this.searchAttr]!=this._lastQuery){return 
}if(!D.length){if(!this._hasFocus){this.valueNode.value=""
}dijit.form.TextBox.superclass.setValue.call(this,undefined,!this._hasFocus);
this._isvalid=false;
this.validate(this._hasFocus)
}else{this._setValueFromItem(D[0],E)
}},_openResultList:function(C,D){if(D.query[this.searchAttr]!=this._lastQuery){return 
}this._isvalid=C.length!=0;
this.validate(true);
dijit.form.ComboBoxMixin.prototype._openResultList.apply(this,arguments)
},getValue:function(){return this.valueNode.value
},_getValueField:function(){return"value"
},_setValue:function(E,D,F){this.valueNode.value=E;
dijit.form.FilteringSelect.superclass.setValue.call(this,E,F,D);
this._lastDisplayedValue=D
},setValue:function(F,H){var E=this;
var G=function(A,B){if(A){if(E.store.isItemLoaded(A)){E._callbackSetLabel([A],undefined,B)
}else{E.store.loadItem({item:A,onItem:function(D,C){E._callbackSetLabel(D,C,B)
}})
}}else{E._isvalid=false;
E.validate(false)
}};
this.store.fetchItemByIdentity({identity:F,onItem:function(A){G(A,H)
}})
},_setValueFromItem:function(D,C){this._isvalid=true;
this._setValue(this.store.getIdentity(D),this.labelFunc(D,this.store),C)
},labelFunc:function(D,C){return C.getValue(D,this.searchAttr)
},onkeyup:function(B){},_doSelect:function(B){this.item=B.item;
this._setValueFromItem(B.item,true)
},setDisplayedValue:function(C){if(this.store){var D={};
this._lastQuery=D[this.searchAttr]=C;
this.textbox.value=C;
this._lastDisplayedValue=C;
this.store.fetch({query:D,queryOptions:{ignoreCase:this.ignoreCase,deep:true},onComplete:dojo.hitch(this,this._callbackSetLabel)})
}},_getMenuLabelFromItem:function(B){if(this.labelAttr){return{html:this.labelType=="html",label:this.store.getValue(B,this.labelAttr)}
}else{return dijit.form.ComboBoxMixin.prototype._getMenuLabelFromItem.apply(this,arguments)
}},postMixInProperties:function(){dijit.form.ComboBoxMixin.prototype.postMixInProperties.apply(this,arguments);
dijit.form.MappedTextBox.prototype.postMixInProperties.apply(this,arguments)
}})
};