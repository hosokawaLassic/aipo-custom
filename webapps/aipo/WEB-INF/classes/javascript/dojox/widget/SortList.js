if(!dojo._hasResource["dojox.widget.SortList"]){dojo._hasResource["dojox.widget.SortList"]=true;
dojo.provide("dojox.widget.SortList");
dojo.experimental("dojox.widget.SortList");
dojo.require("dijit.layout._LayoutWidget");
dojo.require("dijit._Templated");
dojo.declare("dojox.widget.SortList",[dijit.layout._LayoutWidget,dijit._Templated],{title:"",heading:"",descending:true,selected:null,sortable:true,store:"",key:"name",templateString:'<div class="sortList" id="${id}">\r\n\t\t<div class="sortListTitle" dojoAttachPoint="titleNode">\r\n\t\t<div class="sortListIcon"></div>\r\n\t\t<span dojoAttachPoint="focusNode">${title}</span>\r\n\t\t</div>\r\n\t\t<div class="sortListBodyWrapper" dojoAttachEvent="onmouseover: _set, onmouseout: _unset, onclick:_handleClick" dojoAttachPoint="bodyWrapper">\r\n\t\t<ul dojoAttachPoint="containerNode" class="sortListBody"></ul>\r\n\t</div>\r\n</div>\r\n',_addItem:function(F){var D=document.createElement("li");
var E=this.store.getValue(F,this.key);
D.innerHTML=E;
this.containerNode.appendChild(D)
},postCreate:function(){if(this.store){this.store=eval(this.store);
var props={onItem:dojo.hitch(this,"_addItem"),onComplete:dojo.hitch(this,"onSort")};
this.store.fetch(props)
}else{this.onSort()
}this.inherited("postCreate",arguments)
},startup:function(){this.inherited("startup",arguments);
if(this.heading){this.setTitle(this.heading);
this.title=this.heading
}setTimeout(dojo.hitch(this,"resize"),5);
if(this.sortable){this.connect(this.titleNode,"onclick","onSort")
}},resize:function(){this.inherited("resize",arguments);
var B=((this._contentBox.h)-(dojo.style(this.titleNode,"height")))-10;
this.bodyWrapper.style.height=Math.abs(B)+"px"
},onSort:function(E){var D=dojo.query("li",this.domNode);
if(this.sortable){this.descending=!this.descending;
dojo.addClass(this.titleNode,((this.descending)?"sortListDesc":"sortListAsc"));
dojo.removeClass(this.titleNode,((this.descending)?"sortListAsc":"sortListDesc"));
D.sort(this._sorter);
if(this.descending){D.reverse()
}}var F=0;
dojo.forEach(D,function(A){dojo[(((F++)%2)===0)?"addClass":"removeClass"](A,"sortListItemOdd");
this.containerNode.appendChild(A)
},this)
},_set:function(B){if(B.target!=this.bodyWrapper){dojo.addClass(B.target,"sortListItemHover")
}},_unset:function(B){dojo.removeClass(B.target,"sortListItemHover")
},_handleClick:function(B){dojo.toggleClass(B.target,"sortListItemSelected");
B.target.focus();
this._updateValues(B.target.innerHTML)
},_updateValues:function(){this._selected=dojo.query("li.sortListItemSelected",this.containerNode);
this.selected=[];
dojo.forEach(this._selected,function(B){this.selected.push(B.innerHTML)
},this);
this.onChanged(arguments)
},_sorter:function(G,H){var E=G.innerHTML;
var F=H.innerHTML;
if(E>F){return 1
}if(E<F){return -1
}return 0
},setTitle:function(B){this.focusNode.innerHTML=B
},onChanged:function(){}})
};