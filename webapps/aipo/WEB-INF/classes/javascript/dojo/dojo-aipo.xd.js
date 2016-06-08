dojo._xdResourceLoaded({depends:[["provide","dojo.date"],["provide","dojo.fx"],["provide","dojo.fx.Toggler"],["provide","dojo.i18n"],["provide","dojo.cldr.supplemental"],["provide","dojo.regexp"],["provide","dojo.string"],["provide","dojo.date.stamp"],["provide","dojo.parser"],["provide","dojo.date.locale"],["requireLocalization","dojo.cldr","gregorian",null,"ko,zh-cn,zh,ja,en,it-it,en-ca,en-au,it,en-gb,es-es,fr,pt,ROOT,ko-kr,es,de,pt-br","de,en,en-au,en-ca,en-gb,es,es-es,fr,ROOT,it,it-it,ja,ko,ko-kr,pt,pt-br,zh,zh-cn","de,en,en-au,en-ca,en-gb,es,es-es,fr,ROOT,it,it-it,ja,ko,ko-kr,pt,pt-br,zh,zh-cn"],["provide","dojo.dnd.autoscroll"],["provide","dojo.dnd.common"],["provide","dojo.dnd.Container"],["provide","dojo.dnd.Selector"],["provide","dojo.dnd.Avatar"],["provide","dojo.dnd.Manager"],["provide","dojo.dnd.Source"],["provide","dojo.dnd.Mover"],["provide","dojo.dnd.Moveable"],["provide","dojo.dnd.move"],["provide","dojo.io.iframe"],["provide","dojo.data.util.filter"],["provide","dojo.data.util.sorter"],["provide","dojo.data.util.simpleFetch"],["provide","dojo.data.ItemFileReadStore"],["provide","dojo.data.ItemFileWriteStore"]],defineResource:function(dojo){if(!dojo._hasResource["dojo.date"]){dojo._hasResource["dojo.date"]=true;
dojo.provide("dojo.date");
dojo.date.getDaysInMonth=function(dateObject){var month=dateObject.getMonth();
var days=[31,28,31,30,31,30,31,31,30,31,30,31];
if(month==1&&dojo.date.isLeapYear(dateObject)){return 29
}return days[month]
};
dojo.date.isLeapYear=function(dateObject){var year=dateObject.getFullYear();
return !(year%400)||(!(year%4)&&!!(year%100))
};
dojo.date.getTimezoneName=function(dateObject){var str=dateObject.toString();
var tz="";
var match;
var pos=str.indexOf("(");
if(pos>-1){tz=str.substring(++pos,str.indexOf(")"))
}else{var pat=/([A-Z\/]+) \d{4}$/;
if((match=str.match(pat))){tz=match[1]
}else{str=dateObject.toLocaleString();
pat=/ ([A-Z\/]+)$/;
if((match=str.match(pat))){tz=match[1]
}}}return(tz=="AM"||tz=="PM")?"":tz
};
dojo.date.compare=function(date1,date2,portion){date1=new Date(Number(date1));
date2=new Date(Number(date2||new Date()));
if(typeof portion!=="undefined"){if(portion=="date"){date1.setHours(0,0,0,0);
date2.setHours(0,0,0,0)
}else{if(portion=="time"){date1.setFullYear(0,0,0);
date2.setFullYear(0,0,0)
}}}if(date1>date2){return 1
}if(date1<date2){return -1
}return 0
};
dojo.date.add=function(date,interval,amount){var sum=new Date(Number(date));
var fixOvershoot=false;
var property="Date";
switch(interval){case"day":break;
case"weekday":var days,weeks;
var adj=0;
var mod=amount%5;
if(!mod){days=(amount>0)?5:-5;
weeks=(amount>0)?((amount-5)/5):((amount+5)/5)
}else{days=mod;
weeks=parseInt(amount/5)
}var strt=date.getDay();
if(strt==6&&amount>0){adj=1
}else{if(strt==0&&amount<0){adj=-1
}}var trgt=strt+days;
if(trgt==0||trgt==6){adj=(amount>0)?2:-2
}amount=7*weeks+days+adj;
break;
case"year":property="FullYear";
fixOvershoot=true;
break;
case"week":amount*=7;
break;
case"quarter":amount*=3;
case"month":fixOvershoot=true;
property="Month";
break;
case"hour":case"minute":case"second":case"millisecond":property="UTC"+interval.charAt(0).toUpperCase()+interval.substring(1)+"s"
}if(property){sum["set"+property](sum["get"+property]()+amount)
}if(fixOvershoot&&(sum.getDate()<date.getDate())){sum.setDate(0)
}return sum
};
dojo.date.difference=function(date1,date2,interval){date2=date2||new Date();
interval=interval||"day";
var yearDiff=date2.getFullYear()-date1.getFullYear();
var delta=1;
switch(interval){case"quarter":var m1=date1.getMonth();
var m2=date2.getMonth();
var q1=Math.floor(m1/3)+1;
var q2=Math.floor(m2/3)+1;
q2+=(yearDiff*4);
delta=q2-q1;
break;
case"weekday":var days=Math.round(dojo.date.difference(date1,date2,"day"));
var weeks=parseInt(dojo.date.difference(date1,date2,"week"));
var mod=days%7;
if(mod==0){days=weeks*5
}else{var adj=0;
var aDay=date1.getDay();
var bDay=date2.getDay();
weeks=parseInt(days/7);
mod=days%7;
var dtMark=new Date(date1);
dtMark.setDate(dtMark.getDate()+(weeks*7));
var dayMark=dtMark.getDay();
if(days>0){switch(true){case aDay==6:adj=-1;
break;
case aDay==0:adj=0;
break;
case bDay==6:adj=-1;
break;
case bDay==0:adj=-2;
break;
case (dayMark+mod)>5:adj=-2
}}else{if(days<0){switch(true){case aDay==6:adj=0;
break;
case aDay==0:adj=1;
break;
case bDay==6:adj=2;
break;
case bDay==0:adj=1;
break;
case (dayMark+mod)<0:adj=2
}}}days+=adj;
days-=(weeks*2)
}delta=days;
break;
case"year":delta=yearDiff;
break;
case"month":delta=(date2.getMonth()-date1.getMonth())+(yearDiff*12);
break;
case"week":delta=parseInt(dojo.date.difference(date1,date2,"day")/7);
break;
case"day":delta/=24;
case"hour":delta/=60;
case"minute":delta/=60;
case"second":delta/=1000;
case"millisecond":delta*=date2.getTime()-date1.getTime()
}return Math.round(delta)
}
}if(!dojo._hasResource["dojo.fx"]){dojo._hasResource["dojo.fx"]=true;
dojo.provide("dojo.fx");
dojo.provide("dojo.fx.Toggler");
dojo.fx.chain=function(animations){var first=animations.shift();
var previous=first;
dojo.forEach(animations,function(current){dojo.connect(previous,"onEnd",current,"play");
previous=current
});
return first
};
dojo.fx.combine=function(animations){var ctr=new dojo._Animation({curve:[0,1]});
if(!animations.length){return ctr
}ctr.duration=animations[0].duration;
dojo.forEach(animations,function(current){dojo.forEach(["play","pause","stop"],function(e){if(current[e]){dojo.connect(ctr,e,current,e)
}})
});
return ctr
};
dojo.declare("dojo.fx.Toggler",null,{constructor:function(args){var _t=this;
dojo.mixin(_t,args);
_t.node=args.node;
_t._showArgs=dojo.mixin({},args);
_t._showArgs.node=_t.node;
_t._showArgs.duration=_t.showDuration;
_t.showAnim=_t.showFunc(_t._showArgs);
_t._hideArgs=dojo.mixin({},args);
_t._hideArgs.node=_t.node;
_t._hideArgs.duration=_t.hideDuration;
_t.hideAnim=_t.hideFunc(_t._hideArgs);
dojo.connect(_t.showAnim,"beforeBegin",dojo.hitch(_t.hideAnim,"stop",true));
dojo.connect(_t.hideAnim,"beforeBegin",dojo.hitch(_t.showAnim,"stop",true))
},node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,show:function(delay){return this.showAnim.play(delay||0)
},hide:function(delay){return this.hideAnim.play(delay||0)
}});
dojo.fx.wipeIn=function(args){args.node=dojo.byId(args.node);
var node=args.node,s=node.style;
var anim=dojo.animateProperty(dojo.mixin({properties:{height:{start:function(){s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){s.height="1px";
s.display="";
s.visibility="";
return 1
}else{var height=dojo.style(node,"height");
return Math.max(height,1)
}},end:function(){return node.scrollHeight
}}}},args));
dojo.connect(anim,"onEnd",function(){s.height="auto"
});
return anim
};
dojo.fx.wipeOut=function(args){var node=args.node=dojo.byId(args.node);
var s=node.style;
var anim=dojo.animateProperty(dojo.mixin({properties:{height:{end:1}}},args));
dojo.connect(anim,"beforeBegin",function(){s.overflow="hidden";
s.display=""
});
dojo.connect(anim,"onEnd",function(){s.height="auto";
s.display="none"
});
return anim
};
dojo.fx.slideTo=function(args){var node=(args.node=dojo.byId(args.node));
var top=null;
var left=null;
var init=(function(n){return function(){var cs=dojo.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
left=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){var ret=dojo.coords(n,true);
top=ret.y;
left=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=left+"px"
}}
})(node);
init();
var anim=dojo.animateProperty(dojo.mixin({properties:{top:{end:args.top||0},left:{end:args.left||0}}},args));
dojo.connect(anim,"beforeBegin",anim,init);
return anim
}
}if(!dojo._hasResource["dojo.i18n"]){dojo._hasResource["dojo.i18n"]=true;
dojo.provide("dojo.i18n");
dojo.i18n.getLocalization=function(packageName,bundleName,locale){locale=dojo.i18n.normalizeLocale(locale);
var elements=locale.split("-");
var module=[packageName,"nls",bundleName].join(".");
var bundle=dojo._loadedModules[module];
if(bundle){var localization;
for(var i=elements.length;
i>0;
i--){var loc=elements.slice(0,i).join("_");
if(bundle[loc]){localization=bundle[loc];
break
}}if(!localization){localization=bundle.ROOT
}if(localization){var clazz=function(){};
clazz.prototype=localization;
return new clazz()
}}throw new Error("Bundle not found: "+bundleName+" in "+packageName+" , locale="+locale)
};
dojo.i18n.normalizeLocale=function(locale){var result=locale?locale.toLowerCase():dojo.locale;
if(result=="root"){result="ROOT"
}return result
};
dojo.i18n._requireLocalization=function(moduleName,bundleName,locale,availableFlatLocales){var targetLocale=dojo.i18n.normalizeLocale(locale);
var bundlePackage=[moduleName,"nls",bundleName].join(".");
var bestLocale="";
if(availableFlatLocales){var flatLocales=availableFlatLocales.split(",");
for(var i=0;
i<flatLocales.length;
i++){if(targetLocale.indexOf(flatLocales[i])==0){if(flatLocales[i].length>bestLocale.length){bestLocale=flatLocales[i]
}}}if(!bestLocale){bestLocale="ROOT"
}}var tempLocale=availableFlatLocales?bestLocale:targetLocale;
var bundle=dojo._loadedModules[bundlePackage];
var localizedBundle=null;
if(bundle){if(djConfig.localizationComplete&&bundle._built){return 
}var jsLoc=tempLocale.replace(/-/g,"_");
var translationPackage=bundlePackage+"."+jsLoc;
localizedBundle=dojo._loadedModules[translationPackage]
}if(!localizedBundle){bundle=dojo.provide(bundlePackage);
var syms=dojo._getModuleSymbols(moduleName);
var modpath=syms.concat("nls").join("/");
var parent;
dojo.i18n._searchLocalePath(tempLocale,availableFlatLocales,function(loc){var jsLoc=loc.replace(/-/g,"_");
var translationPackage=bundlePackage+"."+jsLoc;
var loaded=false;
if(!dojo._loadedModules[translationPackage]){dojo.provide(translationPackage);
var module=[modpath];
if(loc!="ROOT"){module.push(loc)
}module.push(bundleName);
var filespec=module.join("/")+".js";
loaded=dojo._loadPath(filespec,null,function(hash){var clazz=function(){};
clazz.prototype=parent;
bundle[jsLoc]=new clazz();
for(var j in hash){bundle[jsLoc][j]=hash[j]
}})
}else{loaded=true
}if(loaded&&bundle[jsLoc]){parent=bundle[jsLoc]
}else{bundle[jsLoc]=parent
}if(availableFlatLocales){return true
}})
}if(availableFlatLocales&&targetLocale!=bestLocale){bundle[targetLocale.replace(/-/g,"_")]=bundle[bestLocale.replace(/-/g,"_")]
}};
(function(){var extra=djConfig.extraLocale;
if(extra){if(!extra instanceof Array){extra=[extra]
}var req=dojo.i18n._requireLocalization;
dojo.i18n._requireLocalization=function(m,b,locale,availableFlatLocales){req(m,b,locale,availableFlatLocales);
if(locale){return 
}for(var i=0;
i<extra.length;
i++){req(m,b,extra[i],availableFlatLocales)
}}
}})();
dojo.i18n._searchLocalePath=function(locale,down,searchFunc){locale=dojo.i18n.normalizeLocale(locale);
var elements=locale.split("-");
var searchlist=[];
for(var i=elements.length;
i>0;
i--){searchlist.push(elements.slice(0,i).join("-"))
}searchlist.push(false);
if(down){searchlist.reverse()
}for(var j=searchlist.length-1;
j>=0;
j--){var loc=searchlist[j]||"ROOT";
var stop=searchFunc(loc);
if(stop){break
}}};
dojo.i18n._preloadLocalizations=function(bundlePrefix,localesGenerated){function preload(locale){locale=dojo.i18n.normalizeLocale(locale);
dojo.i18n._searchLocalePath(locale,true,function(loc){for(var i=0;
i<localesGenerated.length;
i++){if(localesGenerated[i]==loc){dojo.require(bundlePrefix+"_"+loc);
return true
}}return false
})
}preload();
var extra=djConfig.extraLocale||[];
for(var i=0;
i<extra.length;
i++){preload(extra[i])
}}
}if(!dojo._hasResource["dojo.cldr.supplemental"]){dojo._hasResource["dojo.cldr.supplemental"]=true;
dojo.provide("dojo.cldr.supplemental");
dojo.cldr.supplemental.getFirstDayOfWeek=function(locale){var firstDay={mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,lb:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,tn:6,ye:6,as:0,au:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,ie:0,il:0,is:0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,za:0,zw:0,et:0,mw:0,ng:0,tj:0,gb:0,sy:4};
var country=dojo.cldr.supplemental._region(locale);
var dow=firstDay[country];
return(typeof dow=="undefined")?1:dow
};
dojo.cldr.supplemental._region=function(locale){locale=dojo.i18n.normalizeLocale(locale);
var tags=locale.split("-");
var region=tags[1];
if(!region){region={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[tags[0]]
}else{if(region.length==4){region=tags[2]
}}return region
};
dojo.cldr.supplemental.getWeekend=function(locale){var weekendStart={eg:5,il:5,sy:5,"in":0,ae:4,bh:4,dz:4,iq:4,jo:4,kw:4,lb:4,ly:4,ma:4,om:4,qa:4,sa:4,sd:4,tn:4,ye:4};
var weekendEnd={ae:5,bh:5,dz:5,iq:5,jo:5,kw:5,lb:5,ly:5,ma:5,om:5,qa:5,sa:5,sd:5,tn:5,ye:5,af:5,ir:5,eg:6,il:6,sy:6};
var country=dojo.cldr.supplemental._region(locale);
var start=weekendStart[country];
var end=weekendEnd[country];
if(typeof start=="undefined"){start=6
}if(typeof end=="undefined"){end=0
}return{start:start,end:end}
}
}if(!dojo._hasResource["dojo.regexp"]){dojo._hasResource["dojo.regexp"]=true;
dojo.provide("dojo.regexp");
dojo.regexp.escapeString=function(str,except){return str.replace(/([\.$?*!=:|{}\(\)\[\]\\\/^])/g,function(ch){if(except&&except.indexOf(ch)!=-1){return ch
}return"\\"+ch
})
};
dojo.regexp.buildGroupRE=function(arr,re,nonCapture){if(!(arr instanceof Array)){return re(arr)
}var b=[];
for(var i=0;
i<arr.length;
i++){b.push(re(arr[i]))
}return dojo.regexp.group(b.join("|"),nonCapture)
};
dojo.regexp.group=function(expression,nonCapture){return"("+(nonCapture?"?:":"")+expression+")"
}
}if(!dojo._hasResource["dojo.string"]){dojo._hasResource["dojo.string"]=true;
dojo.provide("dojo.string");
dojo.string.pad=function(text,size,ch,end){var out=String(text);
if(!ch){ch="0"
}while(out.length<size){if(end){out+=ch
}else{out=ch+out
}}return out
};
dojo.string.substitute=function(template,map,transform,thisObject){return template.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(match,key,format){var value=dojo.getObject(key,false,map);
if(format){value=dojo.getObject(format,false,thisObject)(value)
}if(transform){value=transform(value,key)
}return value.toString()
})
};
dojo.string.trim=function(str){str=str.replace(/^\s+/,"");
for(var i=str.length-1;
i>0;
i--){if(/\S/.test(str.charAt(i))){str=str.substring(0,i+1);
break
}}return str
}
}if(!dojo._hasResource["dojo.date.stamp"]){dojo._hasResource["dojo.date.stamp"]=true;
dojo.provide("dojo.date.stamp");
dojo.date.stamp.fromISOString=function(formattedString,defaultTime){if(!dojo.date.stamp._isoRegExp){dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/
}var match=dojo.date.stamp._isoRegExp.exec(formattedString);
var result=null;
if(match){match.shift();
match[1]&&match[1]--;
match[6]&&(match[6]*=1000);
if(defaultTime){defaultTime=new Date(defaultTime);
dojo.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(prop){return defaultTime["get"+prop]()
}).forEach(function(value,index){if(match[index]===undefined){match[index]=value
}})
}result=new Date(match[0]||1970,match[1]||0,match[2]||0,match[3]||0,match[4]||0,match[5]||0,match[6]||0);
var offset=0;
var zoneSign=match[7]&&match[7].charAt(0);
if(zoneSign!="Z"){offset=((match[8]||0)*60)+(Number(match[9])||0);
if(zoneSign!="-"){offset*=-1
}}if(zoneSign){offset-=result.getTimezoneOffset()
}if(offset){result.setTime(result.getTime()+offset*60000)
}}return result
};
dojo.date.stamp.toISOString=function(dateObject,options){var _=function(n){return(n<10)?"0"+n:n
};
options=options||{};
var formattedDate=[];
var getter=options.zulu?"getUTC":"get";
var date="";
if(options.selector!="time"){date=[dateObject[getter+"FullYear"](),_(dateObject[getter+"Month"]()+1),_(dateObject[getter+"Date"]())].join("-")
}formattedDate.push(date);
if(options.selector!="date"){var time=[_(dateObject[getter+"Hours"]()),_(dateObject[getter+"Minutes"]()),_(dateObject[getter+"Seconds"]())].join(":");
var millis=dateObject[getter+"Milliseconds"]();
if(options.milliseconds){time+="."+(millis<100?"0":"")+_(millis)
}if(options.zulu){time+="Z"
}else{if(options.selector!="time"){var timezoneOffset=dateObject.getTimezoneOffset();
var absOffset=Math.abs(timezoneOffset);
time+=(timezoneOffset>0?"-":"+")+_(Math.floor(absOffset/60))+":"+_(absOffset%60)
}}formattedDate.push(time)
}return formattedDate.join("T")
}
}if(!dojo._hasResource["dojo.parser"]){dojo._hasResource["dojo.parser"]=true;
dojo.provide("dojo.parser");
dojo.parser=new function(){var d=dojo;
function val2type(value){if(d.isString(value)){return"string"
}if(typeof value=="number"){return"number"
}if(typeof value=="boolean"){return"boolean"
}if(d.isFunction(value)){return"function"
}if(d.isArray(value)){return"array"
}if(value instanceof Date){return"date"
}if(value instanceof d._Url){return"url"
}return"object"
}function str2obj(value,type){switch(type){case"string":return value;
case"number":return value.length?Number(value):NaN;
case"boolean":return typeof value=="boolean"?value:!(value.toLowerCase()=="false");
case"function":if(d.isFunction(value)){value=value.toString();
value=d.trim(value.substring(value.indexOf("{")+1,value.length-1))
}try{if(value.search(/[^\w\.]+/i)!=-1){value=d.parser._nameAnonFunc(new Function(value),this)
}return d.getObject(value,false)
}catch(e){return new Function()
}case"array":return value.split(/\s*,\s*/);
case"date":switch(value){case"":return new Date("");
case"now":return new Date();
default:return d.date.stamp.fromISOString(value)
}case"url":return d.baseUrl+value;
default:return d.fromJson(value)
}}var instanceClasses={};
function getClassInfo(className){if(!instanceClasses[className]){var cls=d.getObject(className);
if(!d.isFunction(cls)){throw new Error("Could not load class '"+className+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?")
}var proto=cls.prototype;
var params={};
for(var name in proto){if(name.charAt(0)=="_"){continue
}var defVal=proto[name];
params[name]=val2type(defVal)
}instanceClasses[className]={cls:cls,params:params}
}return instanceClasses[className]
}this._functionFromScript=function(script){var preamble="";
var suffix="";
var argsStr=script.getAttribute("args");
if(argsStr){d.forEach(argsStr.split(/\s*,\s*/),function(part,idx){preamble+="var "+part+" = arguments["+idx+"]; "
})
}var withStr=script.getAttribute("with");
if(withStr&&withStr.length){d.forEach(withStr.split(/\s*,\s*/),function(part){preamble+="with("+part+"){";
suffix+="}"
})
}return new Function(preamble+script.innerHTML+suffix)
};
this.instantiate=function(nodes){var thelist=[];
d.forEach(nodes,function(node){if(!node){return 
}var type=node.getAttribute("dojoType");
if((!type)||(!type.length)){return 
}var clsInfo=getClassInfo(type);
var clazz=clsInfo.cls;
var ps=clazz._noScript||clazz.prototype._noScript;
var params={};
var attributes=node.attributes;
for(var name in clsInfo.params){var item=attributes.getNamedItem(name);
if(!item||(!item.specified&&(!dojo.isIE||name.toLowerCase()!="value"))){continue
}var value=item.value;
switch(name){case"class":value=node.className;
break;
case"style":value=node.style&&node.style.cssText
}var _type=clsInfo.params[name];
params[name]=str2obj(value,_type)
}if(!ps){var connects=[],calls=[];
d.query("> script[type^='dojo/']",node).orphan().forEach(function(script){var event=script.getAttribute("event"),type=script.getAttribute("type"),nf=d.parser._functionFromScript(script);
if(event){if(type=="dojo/connect"){connects.push({event:event,func:nf})
}else{params[event]=nf
}}else{calls.push(nf)
}})
}var markupFactory=clazz.markupFactory;
if(!markupFactory&&clazz.prototype){markupFactory=clazz.prototype.markupFactory
}var instance=markupFactory?markupFactory(params,node,clazz):new clazz(params,node);
thelist.push(instance);
var jsname=node.getAttribute("jsId");
if(jsname){d.setObject(jsname,instance)
}if(!ps){dojo.forEach(connects,function(connect){dojo.connect(instance,connect.event,null,connect.func)
});
dojo.forEach(calls,function(func){func.call(instance)
})
}});
d.forEach(thelist,function(instance){if(instance&&(instance.startup)&&((!instance.getParent)||(!instance.getParent()))){instance.startup()
}});
return thelist
};
this.parse=function(rootNode){var list=d.query("[dojoType]",rootNode);
var instances=this.instantiate(list);
return instances
}
}();
(function(){var parseRunner=function(){if(djConfig.parseOnLoad==true){dojo.parser.parse()
}};
if(dojo.exists("dijit.wai.onload")&&(dijit.wai.onload===dojo._loaders[0])){dojo._loaders.splice(1,0,parseRunner)
}else{dojo._loaders.unshift(parseRunner)
}})();
dojo.parser._anonCtr=0;
dojo.parser._anon={};
dojo.parser._nameAnonFunc=function(anonFuncPtr,thisObj){var jpn="$joinpoint";
var nso=(thisObj||dojo.parser._anon);
if(dojo.isIE){var cn=anonFuncPtr.__dojoNameCache;
if(cn&&nso[cn]===anonFuncPtr){return anonFuncPtr.__dojoNameCache
}}var ret="__"+dojo.parser._anonCtr++;
while(typeof nso[ret]!="undefined"){ret="__"+dojo.parser._anonCtr++
}nso[ret]=anonFuncPtr;
return ret
}
}if(!dojo._hasResource["dojo.date.locale"]){dojo._hasResource["dojo.date.locale"]=true;
dojo.provide("dojo.date.locale");
(function(){function formatPattern(dateObject,bundle,pattern){return pattern.replace(/([a-z])\1*/ig,function(match){var s;
var c=match.charAt(0);
var l=match.length;
var pad;
var widthList=["abbr","wide","narrow"];
switch(c){case"G":s=bundle[(l<4)?"eraAbbr":"eraNames"][dateObject.getFullYear()<0?0:1];
break;
case"y":s=dateObject.getFullYear();
switch(l){case 1:break;
case 2:s=String(s);
s=s.substr(s.length-2);
break;
default:pad=true
}break;
case"Q":case"q":s=Math.ceil((dateObject.getMonth()+1)/3);
pad=true;
break;
case"M":case"L":var m=dateObject.getMonth();
var width;
switch(l){case 1:case 2:s=m+1;
pad=true;
break;
case 3:case 4:case 5:width=widthList[l-3];
break
}if(width){var type=(c=="L")?"standalone":"format";
var prop=["months",type,width].join("-");
s=bundle[prop][m]
}break;
case"w":var firstDay=0;
s=dojo.date.locale._getWeekOfYear(dateObject,firstDay);
pad=true;
break;
case"d":s=dateObject.getDate();
pad=true;
break;
case"D":s=dojo.date.locale._getDayOfYear(dateObject);
pad=true;
break;
case"E":case"e":case"c":var d=dateObject.getDay();
var width;
switch(l){case 1:case 2:if(c=="e"){var first=dojo.cldr.supplemental.getFirstDayOfWeek(options.locale);
d=(d-first+7)%7
}if(c!="c"){s=d+1;
pad=true;
break
}case 3:case 4:case 5:width=widthList[l-3];
break
}if(width){var type=(c=="c")?"standalone":"format";
var prop=["days",type,width].join("-");
s=bundle[prop][d]
}break;
case"a":var timePeriod=(dateObject.getHours()<12)?"am":"pm";
s=bundle[timePeriod];
break;
case"h":case"H":case"K":case"k":var h=dateObject.getHours();
switch(c){case"h":s=(h%12)||12;
break;
case"H":s=h;
break;
case"K":s=(h%12);
break;
case"k":s=h||24;
break
}pad=true;
break;
case"m":s=dateObject.getMinutes();
pad=true;
break;
case"s":s=dateObject.getSeconds();
pad=true;
break;
case"S":s=Math.round(dateObject.getMilliseconds()*Math.pow(10,l-3));
break;
case"v":case"z":s=dojo.date.getTimezoneName(dateObject);
if(s){break
}l=4;
case"Z":var offset=dateObject.getTimezoneOffset();
var tz=[(offset<=0?"+":"-"),dojo.string.pad(Math.floor(Math.abs(offset)/60),2),dojo.string.pad(Math.abs(offset)%60,2)];
if(l==4){tz.splice(0,0,"GMT");
tz.splice(3,0,":")
}s=tz.join("");
break;
default:throw new Error("dojo.date.locale.format: invalid pattern char: "+pattern)
}if(pad){s=dojo.string.pad(s,l)
}return s
})
}dojo.date.locale.format=function(dateObject,options){options=options||{};
var locale=dojo.i18n.normalizeLocale(options.locale);
var formatLength=options.formatLength||"short";
var bundle=dojo.date.locale._getGregorianBundle(locale);
var str=[];
var sauce=dojo.hitch(this,formatPattern,dateObject,bundle);
if(options.selector=="year"){var year=dateObject.getFullYear();
if(locale.match(/^zh|^ja/)){year+="\u5E74"
}return year
}if(options.selector!="time"){var datePattern=options.datePattern||bundle["dateFormat-"+formatLength];
if(datePattern){str.push(_processPattern(datePattern,sauce))
}}if(options.selector!="date"){var timePattern=options.timePattern||bundle["timeFormat-"+formatLength];
if(timePattern){str.push(_processPattern(timePattern,sauce))
}}var result=str.join(" ");
return result
};
dojo.date.locale.regexp=function(options){return dojo.date.locale._parseInfo(options).regexp
};
dojo.date.locale._parseInfo=function(options){options=options||{};
var locale=dojo.i18n.normalizeLocale(options.locale);
var bundle=dojo.date.locale._getGregorianBundle(locale);
var formatLength=options.formatLength||"short";
var datePattern=options.datePattern||bundle["dateFormat-"+formatLength];
var timePattern=options.timePattern||bundle["timeFormat-"+formatLength];
var pattern;
if(options.selector=="date"){pattern=datePattern
}else{if(options.selector=="time"){pattern=timePattern
}else{pattern=datePattern+" "+timePattern
}}var tokens=[];
var re=_processPattern(pattern,dojo.hitch(this,_buildDateTimeRE,tokens,bundle,options));
return{regexp:re,tokens:tokens,bundle:bundle}
};
dojo.date.locale.parse=function(value,options){var info=dojo.date.locale._parseInfo(options);
var tokens=info.tokens,bundle=info.bundle;
var re=new RegExp("^"+info.regexp+"$");
var match=re.exec(value);
if(!match){return null
}var widthList=["abbr","wide","narrow"];
var result=new Date(1972,0);
var expected={};
var amPm="";
dojo.forEach(match,function(v,i){if(!i){return 
}var token=tokens[i-1];
var l=token.length;
switch(token.charAt(0)){case"y":if(l!=2){result.setFullYear(v);
expected.year=v
}else{if(v<100){v=Number(v);
var year=""+new Date().getFullYear();
var century=year.substring(0,2)*100;
var yearPart=Number(year.substring(2,4));
var cutoff=Math.min(yearPart+20,99);
var num=(v<cutoff)?century+v:century-100+v;
result.setFullYear(num);
expected.year=num
}else{if(options.strict){return null
}result.setFullYear(v);
expected.year=v
}}break;
case"M":if(l>2){var months=bundle["months-format-"+widthList[l-3]].concat();
if(!options.strict){v=v.replace(".","").toLowerCase();
months=dojo.map(months,function(s){return s.replace(".","").toLowerCase()
})
}v=dojo.indexOf(months,v);
if(v==-1){return null
}}else{v--
}result.setMonth(v);
expected.month=v;
break;
case"E":case"e":var days=bundle["days-format-"+widthList[l-3]].concat();
if(!options.strict){v=v.toLowerCase();
days=dojo.map(days,"".toLowerCase)
}v=dojo.indexOf(days,v);
if(v==-1){return null
}break;
case"d":result.setDate(v);
expected.date=v;
break;
case"D":result.setMonth(0);
result.setDate(v);
break;
case"a":var am=options.am||bundle.am;
var pm=options.pm||bundle.pm;
if(!options.strict){var period=/\./g;
v=v.replace(period,"").toLowerCase();
am=am.replace(period,"").toLowerCase();
pm=pm.replace(period,"").toLowerCase()
}if(options.strict&&v!=am&&v!=pm){return null
}amPm=(v==pm)?"p":(v==am)?"a":"";
break;
case"K":if(v==24){v=0
}case"h":case"H":case"k":if(v>23){return null
}result.setHours(v);
break;
case"m":result.setMinutes(v);
break;
case"s":result.setSeconds(v);
break;
case"S":result.setMilliseconds(v)
}});
var hours=result.getHours();
if(amPm==="p"&&hours<12){result.setHours(hours+12)
}else{if(amPm==="a"&&hours==12){result.setHours(0)
}}if(expected.year&&result.getFullYear()!=expected.year){return null
}if(expected.month&&result.getMonth()!=expected.month){return null
}if(expected.date&&result.getDate()!=expected.date){return null
}return result
};
function _processPattern(pattern,applyPattern,applyLiteral,applyAll){var identity=function(x){return x
};
applyPattern=applyPattern||identity;
applyLiteral=applyLiteral||identity;
applyAll=applyAll||identity;
var chunks=pattern.match(/(''|[^'])+/g);
var literal=false;
dojo.forEach(chunks,function(chunk,i){if(!chunk){chunks[i]=""
}else{chunks[i]=(literal?applyLiteral:applyPattern)(chunk);
literal=!literal
}});
return applyAll(chunks.join(""))
}function _buildDateTimeRE(tokens,bundle,options,pattern){pattern=dojo.regexp.escapeString(pattern);
if(!options.strict){pattern=pattern.replace(" a"," ?a")
}return pattern.replace(/([a-z])\1*/ig,function(match){var s;
var c=match.charAt(0);
var l=match.length;
var p2="",p3="";
if(options.strict){if(l>1){p2="0{"+(l-1)+"}"
}if(l>2){p3="0{"+(l-2)+"}"
}}else{p2="0?";
p3="0{0,2}"
}switch(c){case"y":s="\\d{2,4}";
break;
case"M":s=(l>2)?"\\S+":p2+"[1-9]|1[0-2]";
break;
case"D":s=p2+"[1-9]|"+p3+"[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6]";
break;
case"d":s=p2+"[1-9]|[12]\\d|3[01]";
break;
case"w":s=p2+"[1-9]|[1-4][0-9]|5[0-3]";
break;
case"E":s="\\S+";
break;
case"h":s=p2+"[1-9]|1[0-2]";
break;
case"k":s=p2+"\\d|1[01]";
break;
case"H":s=p2+"\\d|1\\d|2[0-3]";
break;
case"K":s=p2+"[1-9]|1\\d|2[0-4]";
break;
case"m":case"s":s="[0-5]\\d";
break;
case"S":s="\\d{"+l+"}";
break;
case"a":var am=options.am||bundle.am||"AM";
var pm=options.pm||bundle.pm||"PM";
if(options.strict){s=am+"|"+pm
}else{s=am+"|"+pm;
if(am!=am.toLowerCase()){s+="|"+am.toLowerCase()
}if(pm!=pm.toLowerCase()){s+="|"+pm.toLowerCase()
}}break;
default:s=".*"
}if(tokens){tokens.push(match)
}return"("+s+")"
}).replace(/[\xa0 ]/g,"[\\s\\xa0]")
}})();
(function(){var _customFormats=[];
dojo.date.locale.addCustomFormats=function(packageName,bundleName){_customFormats.push({pkg:packageName,name:bundleName})
};
dojo.date.locale._getGregorianBundle=function(locale){var gregorian={};
dojo.forEach(_customFormats,function(desc){var bundle=dojo.i18n.getLocalization(desc.pkg,desc.name,locale);
gregorian=dojo.mixin(gregorian,bundle)
},this);
return gregorian
}
})();
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(item,type,use,locale){var label;
var lookup=dojo.date.locale._getGregorianBundle(locale);
var props=[item,use,type];
if(use=="standAlone"){label=lookup[props.join("-")]
}props[1]="format";
return(label||lookup[props.join("-")]).concat()
};
dojo.date.locale.isWeekend=function(dateObject,locale){var weekend=dojo.cldr.supplemental.getWeekend(locale);
var day=(dateObject||new Date()).getDay();
if(weekend.end<weekend.start){weekend.end+=7;
if(day<weekend.start){day+=7
}}return day>=weekend.start&&day<=weekend.end
};
dojo.date.locale._getDayOfYear=function(dateObject){return dojo.date.difference(new Date(dateObject.getFullYear(),0,1),dateObject)+1
};
dojo.date.locale._getWeekOfYear=function(dateObject,firstDayOfWeek){if(arguments.length==1){firstDayOfWeek=0
}var firstDayOfYear=new Date(dateObject.getFullYear(),0,1).getDay();
var adj=(firstDayOfYear-firstDayOfWeek+7)%7;
var week=Math.floor((dojo.date.locale._getDayOfYear(dateObject)+adj-1)/7);
if(firstDayOfYear==firstDayOfWeek){week++
}return week
}
}if(!dojo._hasResource["dojo.dnd.autoscroll"]){dojo._hasResource["dojo.dnd.autoscroll"]=true;
dojo.provide("dojo.dnd.autoscroll");
dojo.dnd.getViewport=function(){var d=dojo.doc,dd=d.documentElement,w=window,b=dojo.body();
if(dojo.isMozilla){return{w:dd.clientWidth,h:w.innerHeight}
}else{if(!dojo.isOpera&&w.innerWidth){return{w:w.innerWidth,h:w.innerHeight}
}else{if(!dojo.isOpera&&dd&&dd.clientWidth){return{w:dd.clientWidth,h:dd.clientHeight}
}else{if(b.clientWidth){return{w:b.clientWidth,h:b.clientHeight}
}}}}return null
};
dojo.dnd.V_TRIGGER_AUTOSCROLL=32;
dojo.dnd.H_TRIGGER_AUTOSCROLL=32;
dojo.dnd.V_AUTOSCROLL_VALUE=16;
dojo.dnd.H_AUTOSCROLL_VALUE=16;
dojo.dnd.autoScroll=function(e){var v=dojo.dnd.getViewport(),dx=0,dy=0;
if(e.clientX<dojo.dnd.H_TRIGGER_AUTOSCROLL){dx=-dojo.dnd.H_AUTOSCROLL_VALUE
}else{if(e.clientX>v.w-dojo.dnd.H_TRIGGER_AUTOSCROLL){dx=dojo.dnd.H_AUTOSCROLL_VALUE
}}if(e.clientY<dojo.dnd.V_TRIGGER_AUTOSCROLL){dy=-dojo.dnd.V_AUTOSCROLL_VALUE
}else{if(e.clientY>v.h-dojo.dnd.V_TRIGGER_AUTOSCROLL){dy=dojo.dnd.V_AUTOSCROLL_VALUE
}}window.scrollBy(dx,dy)
};
dojo.dnd._validNodes={div:1,p:1,td:1};
dojo.dnd._validOverflow={auto:1,scroll:1};
dojo.dnd.autoScrollNodes=function(e){for(var n=e.target;
n;
){if(n.nodeType==1&&(n.tagName.toLowerCase() in dojo.dnd._validNodes)){var s=dojo.getComputedStyle(n);
if(s.overflow.toLowerCase() in dojo.dnd._validOverflow){var b=dojo._getContentBox(n,s),t=dojo._abs(n,true);
b.l+=t.x+n.scrollLeft;
b.t+=t.y+n.scrollTop;
var w=Math.min(dojo.dnd.H_TRIGGER_AUTOSCROLL,b.w/2),h=Math.min(dojo.dnd.V_TRIGGER_AUTOSCROLL,b.h/2),rx=e.pageX-b.l,ry=e.pageY-b.t,dx=0,dy=0;
if(rx>0&&rx<b.w){if(rx<w){dx=-dojo.dnd.H_AUTOSCROLL_VALUE
}else{if(rx>b.w-w){dx=dojo.dnd.H_AUTOSCROLL_VALUE
}}}if(ry>0&&ry<b.h){if(ry<h){dy=-dojo.dnd.V_AUTOSCROLL_VALUE
}else{if(ry>b.h-h){dy=dojo.dnd.V_AUTOSCROLL_VALUE
}}}var oldLeft=n.scrollLeft,oldTop=n.scrollTop;
n.scrollLeft=n.scrollLeft+dx;
n.scrollTop=n.scrollTop+dy;
if(oldLeft!=n.scrollLeft||oldTop!=n.scrollTop){return 
}}}try{n=n.parentNode
}catch(x){n=null
}}dojo.dnd.autoScroll(e)
}
}if(!dojo._hasResource["dojo.dnd.common"]){dojo._hasResource["dojo.dnd.common"]=true;
dojo.provide("dojo.dnd.common");
dojo.dnd._copyKey=navigator.appVersion.indexOf("Macintosh")<0?"ctrlKey":"metaKey";
dojo.dnd.getCopyKeyState=function(e){return e[dojo.dnd._copyKey]
};
dojo.dnd._uniqueId=0;
dojo.dnd.getUniqueId=function(){var id;
do{id="dojoUnique"+(++dojo.dnd._uniqueId)
}while(dojo.byId(id));
return id
};
dojo.dnd._empty={};
dojo.dnd.isFormElement=function(e){var t=e.target;
if(t.nodeType==3){t=t.parentNode
}return" button textarea input select option ".indexOf(" "+t.tagName.toLowerCase()+" ")>=0
}
}if(!dojo._hasResource["dojo.dnd.Container"]){dojo._hasResource["dojo.dnd.Container"]=true;
dojo.provide("dojo.dnd.Container");
dojo.declare("dojo.dnd.Container",null,{skipForm:false,constructor:function(node,params){this.node=dojo.byId(node);
if(!params){params={}
}this.creator=params.creator||null;
this.skipForm=params.skipForm;
this.defaultCreator=dojo.dnd._defaultCreator(this.node);
this.map={};
this.current=null;
this.containerState="";
dojo.addClass(this.node,"dojoDndContainer");
if(!(params&&params._skipStartup)){this.startup()
}this.events=[dojo.connect(this.node,"onmouseover",this,"onMouseOver"),dojo.connect(this.node,"onmouseout",this,"onMouseOut"),dojo.connect(this.node,"ondragstart",this,"onSelectStart"),dojo.connect(this.node,"onselectstart",this,"onSelectStart")]
},creator:function(){},getItem:function(key){return this.map[key]
},setItem:function(key,data){this.map[key]=data
},delItem:function(key){delete this.map[key]
},forInItems:function(f,o){o=o||dojo.global;
var m=this.map,e=dojo.dnd._empty;
for(var i in this.map){if(i in e){continue
}f.call(o,m[i],i,m)
}},clearItems:function(){this.map={}
},getAllNodes:function(){return dojo.query("> .dojoDndItem",this.parent)
},insertNodes:function(data,before,anchor){if(!this.parent.firstChild){anchor=null
}else{if(before){if(!anchor){anchor=this.parent.firstChild
}}else{if(anchor){anchor=anchor.nextSibling
}}}if(anchor){for(var i=0;
i<data.length;
++i){var t=this._normalizedCreator(data[i]);
this.setItem(t.node.id,{data:t.data,type:t.type});
this.parent.insertBefore(t.node,anchor)
}}else{for(var i=0;
i<data.length;
++i){var t=this._normalizedCreator(data[i]);
this.setItem(t.node.id,{data:t.data,type:t.type});
this.parent.appendChild(t.node)
}}return this
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
this.clearItems();
this.node=this.parent=this.current
},markupFactory:function(params,node){params._skipStartup=true;
return new dojo.dnd.Container(node,params)
},startup:function(){this.parent=this.node;
if(this.parent.tagName.toLowerCase()=="table"){var c=this.parent.getElementsByTagName("tbody");
if(c&&c.length){this.parent=c[0]
}}dojo.query("> .dojoDndItem",this.parent).forEach(function(node){if(!node.id){node.id=dojo.dnd.getUniqueId()
}var type=node.getAttribute("dndType"),data=node.getAttribute("dndData");
this.setItem(node.id,{data:data?data:node.innerHTML,type:type?type.split(/\s*,\s*/):["text"]})
},this)
},onMouseOver:function(e){var n=e.relatedTarget;
while(n){if(n==this.node){break
}try{n=n.parentNode
}catch(x){n=null
}}if(!n){this._changeState("Container","Over");
this.onOverEvent()
}n=this._getChildByEvent(e);
if(this.current==n){return 
}if(this.current){this._removeItemClass(this.current,"Over")
}if(n){this._addItemClass(n,"Over")
}this.current=n
},onMouseOut:function(e){for(var n=e.relatedTarget;
n;
){if(n==this.node){return 
}try{n=n.parentNode
}catch(x){n=null
}}if(this.current){this._removeItemClass(this.current,"Over");
this.current=null
}this._changeState("Container","");
this.onOutEvent()
},onSelectStart:function(e){if(!this.skipForm||!dojo.dnd.isFormElement(e)){dojo.stopEvent(e)
}},onOverEvent:function(){},onOutEvent:function(){},_changeState:function(type,newState){var prefix="dojoDnd"+type;
var state=type.toLowerCase()+"State";
dojo.removeClass(this.node,prefix+this[state]);
dojo.addClass(this.node,prefix+newState);
this[state]=newState
},_addItemClass:function(node,type){dojo.addClass(node,"dojoDndItem"+type)
},_removeItemClass:function(node,type){dojo.removeClass(node,"dojoDndItem"+type)
},_getChildByEvent:function(e){var node=e.target;
if(node){for(var parent=node.parentNode;
parent;
node=parent,parent=node.parentNode){if(parent==this.parent&&dojo.hasClass(node,"dojoDndItem")){return node
}}}return null
},_normalizedCreator:function(item,hint){var t=(this.creator?this.creator:this.defaultCreator)(item,hint);
if(!dojo.isArray(t.type)){t.type=["text"]
}if(!t.node.id){t.node.id=dojo.dnd.getUniqueId()
}dojo.addClass(t.node,"dojoDndItem");
return t
}});
dojo.dnd._createNode=function(tag){if(!tag){return dojo.dnd._createSpan
}return function(text){var n=dojo.doc.createElement(tag);
n.innerHTML=text;
return n
}
};
dojo.dnd._createTrTd=function(text){var tr=dojo.doc.createElement("tr");
var td=dojo.doc.createElement("td");
td.innerHTML=text;
tr.appendChild(td);
return tr
};
dojo.dnd._createSpan=function(text){var n=dojo.doc.createElement("span");
n.innerHTML=text;
return n
};
dojo.dnd._defaultCreatorNodes={ul:"li",ol:"li",div:"div",p:"div"};
dojo.dnd._defaultCreator=function(node){var tag=node.tagName.toLowerCase();
var c=tag=="table"?dojo.dnd._createTrTd:dojo.dnd._createNode(dojo.dnd._defaultCreatorNodes[tag]);
return function(item,hint){var isObj=dojo.isObject(item)&&item;
var data=(isObj&&item.data)?item.data:item;
var type=(isObj&&item.type)?item.type:["text"];
var t=String(data),n=(hint=="avatar"?dojo.dnd._createSpan:c)(t);
n.id=dojo.dnd.getUniqueId();
return{node:n,data:data,type:type}
}
}
}if(!dojo._hasResource["dojo.dnd.Selector"]){dojo._hasResource["dojo.dnd.Selector"]=true;
dojo.provide("dojo.dnd.Selector");
dojo.declare("dojo.dnd.Selector",dojo.dnd.Container,{constructor:function(node,params){if(!params){params={}
}this.singular=params.singular;
this.selection={};
this.anchor=null;
this.simpleSelection=false;
this.events.push(dojo.connect(this.node,"onmousedown",this,"onMouseDown"),dojo.connect(this.node,"onmouseup",this,"onMouseUp"))
},singular:false,getSelectedNodes:function(){var t=new dojo.NodeList();
var e=dojo.dnd._empty;
for(var i in this.selection){if(i in e){continue
}t.push(dojo.byId(i))
}return t
},selectNone:function(){return this._removeSelection()._removeAnchor()
},selectAll:function(){this.forInItems(function(data,id){this._addItemClass(dojo.byId(id),"Selected");
this.selection[id]=1
},this);
return this._removeAnchor()
},deleteSelectedNodes:function(){var e=dojo.dnd._empty;
for(var i in this.selection){if(i in e){continue
}var n=dojo.byId(i);
this.delItem(i);
dojo._destroyElement(n)
}this.anchor=null;
this.selection={};
return this
},insertNodes:function(addSelected,data,before,anchor){var oldCreator=this._normalizedCreator;
this._normalizedCreator=function(item,hint){var t=oldCreator.call(this,item,hint);
if(addSelected){if(!this.anchor){this.anchor=t.node;
this._removeItemClass(t.node,"Selected");
this._addItemClass(this.anchor,"Anchor")
}else{if(this.anchor!=t.node){this._removeItemClass(t.node,"Anchor");
this._addItemClass(t.node,"Selected")
}}this.selection[t.node.id]=1
}else{this._removeItemClass(t.node,"Selected");
this._removeItemClass(t.node,"Anchor")
}return t
};
dojo.dnd.Selector.superclass.insertNodes.call(this,data,before,anchor);
this._normalizedCreator=oldCreator;
return this
},destroy:function(){dojo.dnd.Selector.superclass.destroy.call(this);
this.selection=this.anchor=null
},markupFactory:function(params,node){params._skipStartup=true;
return new dojo.dnd.Selector(node,params)
},onMouseDown:function(e){if(!this.current){return 
}if(!this.singular&&!dojo.dnd.getCopyKeyState(e)&&!e.shiftKey&&(this.current.id in this.selection)){this.simpleSelection=true;
dojo.stopEvent(e);
return 
}if(!this.singular&&e.shiftKey){if(!dojo.dnd.getCopyKeyState(e)){this._removeSelection()
}var c=dojo.query("> .dojoDndItem",this.parent);
if(c.length){if(!this.anchor){this.anchor=c[0];
this._addItemClass(this.anchor,"Anchor")
}this.selection[this.anchor.id]=1;
if(this.anchor!=this.current){var i=0;
for(;
i<c.length;
++i){var node=c[i];
if(node==this.anchor||node==this.current){break
}}for(++i;
i<c.length;
++i){var node=c[i];
if(node==this.anchor||node==this.current){break
}this._addItemClass(node,"Selected");
this.selection[node.id]=1
}this._addItemClass(this.current,"Selected");
this.selection[this.current.id]=1
}}}else{if(this.singular){if(this.anchor==this.current){if(dojo.dnd.getCopyKeyState(e)){this.selectNone()
}}else{this.selectNone();
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1
}}else{if(dojo.dnd.getCopyKeyState(e)){if(this.anchor==this.current){delete this.selection[this.anchor.id];
this._removeAnchor()
}else{if(this.current.id in this.selection){this._removeItemClass(this.current,"Selected");
delete this.selection[this.current.id]
}else{if(this.anchor){this._removeItemClass(this.anchor,"Anchor");
this._addItemClass(this.anchor,"Selected")
}this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1
}}}else{if(!(this.current.id in this.selection)){this.selectNone();
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1
}}}}dojo.stopEvent(e)
},onMouseUp:function(e){if(!this.simpleSelection){return 
}this.simpleSelection=false;
this.selectNone();
if(this.current){this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1
}},onMouseMove:function(e){this.simpleSelection=false
},onOverEvent:function(){this.onmousemoveEvent=dojo.connect(this.node,"onmousemove",this,"onMouseMove")
},onOutEvent:function(){dojo.disconnect(this.onmousemoveEvent);
delete this.onmousemoveEvent
},_removeSelection:function(){var e=dojo.dnd._empty;
for(var i in this.selection){if(i in e){continue
}var node=dojo.byId(i);
if(node){this._removeItemClass(node,"Selected")
}}this.selection={};
return this
},_removeAnchor:function(){if(this.anchor){this._removeItemClass(this.anchor,"Anchor");
this.anchor=null
}return this
}})
}if(!dojo._hasResource["dojo.dnd.Avatar"]){dojo._hasResource["dojo.dnd.Avatar"]=true;
dojo.provide("dojo.dnd.Avatar");
dojo.dnd.Avatar=function(manager){this.manager=manager;
this.construct()
};
dojo.extend(dojo.dnd.Avatar,{construct:function(){var a=dojo.doc.createElement("table");
a.className="dojoDndAvatar";
a.style.position="absolute";
a.style.zIndex=1999;
a.style.margin="0px";
var b=dojo.doc.createElement("tbody");
var tr=dojo.doc.createElement("tr");
tr.className="dojoDndAvatarHeader";
var td=dojo.doc.createElement("td");
td.innerHTML=this._generateText();
tr.appendChild(td);
dojo.style(tr,"opacity",0.9);
b.appendChild(tr);
var k=Math.min(5,this.manager.nodes.length);
var source=this.manager.source;
for(var i=0;
i<k;
++i){tr=dojo.doc.createElement("tr");
tr.className="dojoDndAvatarItem";
td=dojo.doc.createElement("td");
var node=source.creator?node=source._normalizedCreator(source.getItem(this.manager.nodes[i].id).data,"avatar").node:node=this.manager.nodes[i].cloneNode(true);
node.id="";
node.style.width=(this.manager.nodes[i].clientWidth||this.manager.nodes[i].offsetWidth)+"px";
node.style.height=(this.manager.nodes[i].clientHeight||this.manager.nodes[i].offsetHeight)+"px";
td.appendChild(node);
tr.appendChild(td);
dojo.style(tr,"opacity",(9-i)/10);
b.appendChild(tr)
}a.appendChild(b);
this.node=a
},destroy:function(){dojo._destroyElement(this.node);
this.node=false
},update:function(){dojo[(this.manager.canDropFlag?"add":"remove")+"Class"](this.node,"dojoDndAvatarCanDrop");
var t=this.node.getElementsByTagName("td");
for(var i=0;
i<t.length;
++i){var n=t[i];
if(dojo.hasClass(n.parentNode,"dojoDndAvatarHeader")){n.innerHTML=this._generateText();
break
}}},_generateText:function(){return this.manager.nodes.length.toString()
}})
}if(!dojo._hasResource["dojo.dnd.Manager"]){dojo._hasResource["dojo.dnd.Manager"]=true;
dojo.provide("dojo.dnd.Manager");
dojo.dnd.Manager=function(){this.avatar=null;
this.source=null;
this.nodes=[];
this.copy=true;
this.target=null;
this.canDropFlag=false;
this.events=[]
};
dojo.extend(dojo.dnd.Manager,{OFFSET_X:16,OFFSET_Y:16,overSource:function(source){if(this.avatar){this.target=(source&&source.targetState!="Disabled")?source:null;
this.avatar.update()
}dojo.publish("/dnd/source/over",[source])
},outSource:function(source){if(this.avatar){if(this.target==source){this.target=null;
this.canDropFlag=false;
this.avatar.update();
dojo.publish("/dnd/source/over",[null])
}}else{dojo.publish("/dnd/source/over",[null])
}},startDrag:function(source,nodes,copy){this.source=source;
this.nodes=nodes;
this.copy=Boolean(copy);
this.avatar=this.makeAvatar();
dojo.body().appendChild(this.avatar.node);
dojo.publish("/dnd/start",[source,nodes,this.copy]);
this.events=[dojo.connect(dojo.doc,"onmousemove",this,"onMouseMove"),dojo.connect(dojo.doc,"onmouseup",this,"onMouseUp"),dojo.connect(dojo.doc,"onkeydown",this,"onKeyDown"),dojo.connect(dojo.doc,"onkeyup",this,"onKeyUp")];
var c="dojoDnd"+(copy?"Copy":"Move");
dojo.addClass(dojo.body(),c)
},canDrop:function(flag){var canDropFlag=this.target&&flag;
if(this.canDropFlag!=canDropFlag){this.canDropFlag=canDropFlag;
this.avatar.update()
}},stopDrag:function(){dojo.removeClass(dojo.body(),"dojoDndCopy");
dojo.removeClass(dojo.body(),"dojoDndMove");
dojo.forEach(this.events,dojo.disconnect);
this.events=[];
this.avatar.destroy();
this.avatar=null;
this.source=null;
this.nodes=[]
},makeAvatar:function(){return new dojo.dnd.Avatar(this)
},updateAvatar:function(){this.avatar.update()
},onMouseMove:function(e){var a=this.avatar;
if(a){dojo.dnd.autoScroll(e);
dojo.marginBox(a.node,{l:e.pageX+this.OFFSET_X,t:e.pageY+this.OFFSET_Y});
var copy=Boolean(this.source.copyState(dojo.dnd.getCopyKeyState(e)));
if(this.copy!=copy){this._setCopyStatus(copy)
}}},onMouseUp:function(e){if(this.avatar&&(!("mouseButton" in this.source)||this.source.mouseButton==e.button)){if(this.target&&this.canDropFlag){var params=[this.source,this.nodes,Boolean(this.source.copyState(dojo.dnd.getCopyKeyState(e))),this.target];
dojo.publish("/dnd/drop/before",params);
dojo.publish("/dnd/drop",params)
}else{dojo.publish("/dnd/cancel")
}this.stopDrag()
}},onKeyDown:function(e){if(this.avatar){switch(e.keyCode){case dojo.keys.CTRL:var copy=Boolean(this.source.copyState(true));
if(this.copy!=copy){this._setCopyStatus(copy)
}break;
case dojo.keys.ESCAPE:dojo.publish("/dnd/cancel");
this.stopDrag();
break
}}},onKeyUp:function(e){if(this.avatar&&e.keyCode==dojo.keys.CTRL){var copy=Boolean(this.source.copyState(false));
if(this.copy!=copy){this._setCopyStatus(copy)
}}},_setCopyStatus:function(copy){this.copy=copy;
this.source._markDndStatus(this.copy);
this.updateAvatar();
dojo.removeClass(dojo.body(),"dojoDnd"+(this.copy?"Move":"Copy"));
dojo.addClass(dojo.body(),"dojoDnd"+(this.copy?"Copy":"Move"))
}});
dojo.dnd._manager=null;
dojo.dnd.manager=function(){if(!dojo.dnd._manager){dojo.dnd._manager=new dojo.dnd.Manager()
}return dojo.dnd._manager
}
}if(!dojo._hasResource["dojo.dnd.Source"]){dojo._hasResource["dojo.dnd.Source"]=true;
dojo.provide("dojo.dnd.Source");
dojo.declare("dojo.dnd.Source",dojo.dnd.Selector,{isSource:true,horizontal:false,copyOnly:false,skipForm:false,withHandles:false,accept:["text"],constructor:function(node,params){if(!params){params={}
}this.isSource=typeof params.isSource=="undefined"?true:params.isSource;
var type=params.accept instanceof Array?params.accept:["text"];
this.accept=null;
if(type.length){this.accept={};
for(var i=0;
i<type.length;
++i){this.accept[type[i]]=1
}}this.horizontal=params.horizontal;
this.copyOnly=params.copyOnly;
this.withHandles=params.withHandles;
this.isDragging=false;
this.mouseDown=false;
this.targetAnchor=null;
this.targetBox=null;
this.before=true;
this.sourceState="";
if(this.isSource){dojo.addClass(this.node,"dojoDndSource")
}this.targetState="";
if(this.accept){dojo.addClass(this.node,"dojoDndTarget")
}if(this.horizontal){dojo.addClass(this.node,"dojoDndHorizontal")
}this.topics=[dojo.subscribe("/dnd/source/over",this,"onDndSourceOver"),dojo.subscribe("/dnd/start",this,"onDndStart"),dojo.subscribe("/dnd/drop",this,"onDndDrop"),dojo.subscribe("/dnd/cancel",this,"onDndCancel")]
},checkAcceptance:function(source,nodes){if(this==source){return true
}for(var i=0;
i<nodes.length;
++i){var type=source.getItem(nodes[i].id).type;
var flag=false;
for(var j=0;
j<type.length;
++j){if(type[j] in this.accept){flag=true;
break
}}if(!flag){return false
}}return true
},copyState:function(keyPressed){return this.copyOnly||keyPressed
},destroy:function(){dojo.dnd.Source.superclass.destroy.call(this);
dojo.forEach(this.topics,dojo.unsubscribe);
this.targetAnchor=null
},markupFactory:function(params,node){params._skipStartup=true;
return new dojo.dnd.Source(node,params)
},onMouseMove:function(e){if(this.isDragging&&this.targetState=="Disabled"){return 
}dojo.dnd.Source.superclass.onMouseMove.call(this,e);
var m=dojo.dnd.manager();
if(this.isDragging){var before=false;
if(this.current){if(!this.targetBox||this.targetAnchor!=this.current){this.targetBox={xy:dojo.coords(this.current,true),w:this.current.offsetWidth,h:this.current.offsetHeight}
}if(this.horizontal){before=(e.pageX-this.targetBox.xy.x)<(this.targetBox.w/2)
}else{before=(e.pageY-this.targetBox.xy.y)<(this.targetBox.h/2)
}}if(this.current!=this.targetAnchor||before!=this.before){this._markTargetAnchor(before);
m.canDrop(!this.current||m.source!=this||!(this.current.id in this.selection))
}}else{if(this.mouseDown&&this.isSource){var nodes=this.getSelectedNodes();
if(nodes.length){m.startDrag(this,nodes,this.copyState(dojo.dnd.getCopyKeyState(e)))
}}}},onMouseDown:function(e){if(this._legalMouseDown(e)&&(!this.skipForm||!dojo.dnd.isFormElement(e))){this.mouseDown=true;
this.mouseButton=e.button;
dojo.dnd.Source.superclass.onMouseDown.call(this,e)
}},onMouseUp:function(e){if(this.mouseDown){this.mouseDown=false;
dojo.dnd.Source.superclass.onMouseUp.call(this,e)
}},onDndSourceOver:function(source){if(this!=source){this.mouseDown=false;
if(this.targetAnchor){this._unmarkTargetAnchor()
}}else{if(this.isDragging){var m=dojo.dnd.manager();
m.canDrop(this.targetState!="Disabled"&&(!this.current||m.source!=this||!(this.current.id in this.selection)))
}}},onDndStart:function(source,nodes,copy){if(this.isSource){this._changeState("Source",this==source?(copy?"Copied":"Moved"):"")
}var accepted=this.accept&&this.checkAcceptance(source,nodes);
this._changeState("Target",accepted?"":"Disabled");
if(accepted&&this==source){dojo.dnd.manager().overSource(this)
}this.isDragging=true
},onDndDrop:function(source,nodes,copy){do{if(this.containerState!="Over"){break
}var oldCreator=this._normalizedCreator;
if(this!=source){if(this.creator){this._normalizedCreator=function(node,hint){return oldCreator.call(this,source.getItem(node.id).data,hint)
}
}else{if(copy){this._normalizedCreator=function(node,hint){var t=source.getItem(node.id);
var n=node.cloneNode(true);
n.id=dojo.dnd.getUniqueId();
return{node:n,data:t.data,type:t.type}
}
}else{this._normalizedCreator=function(node,hint){var t=source.getItem(node.id);
source.delItem(node.id);
return{node:node,data:t.data,type:t.type}
}
}}}else{if(this.current&&this.current.id in this.selection){break
}if(this.creator){if(copy){this._normalizedCreator=function(node,hint){return oldCreator.call(this,source.getItem(node.id).data,hint)
}
}else{if(!this.current){break
}this._normalizedCreator=function(node,hint){var t=source.getItem(node.id);
return{node:node,data:t.data,type:t.type}
}
}}else{if(copy){this._normalizedCreator=function(node,hint){var t=source.getItem(node.id);
var n=node.cloneNode(true);
n.id=dojo.dnd.getUniqueId();
return{node:n,data:t.data,type:t.type}
}
}else{if(!this.current){break
}this._normalizedCreator=function(node,hint){var t=source.getItem(node.id);
return{node:node,data:t.data,type:t.type}
}
}}}this._removeSelection();
if(this!=source){this._removeAnchor()
}if(this!=source&&!copy&&!this.creator){source.selectNone()
}this.insertNodes(true,nodes,this.before,this.current);
if(this!=source&&!copy&&this.creator){source.deleteSelectedNodes()
}this._normalizedCreator=oldCreator
}while(false);
this.onDndCancel()
},onDndCancel:function(){if(this.targetAnchor){this._unmarkTargetAnchor();
this.targetAnchor=null
}this.before=true;
this.isDragging=false;
this.mouseDown=false;
delete this.mouseButton;
this._changeState("Source","");
this._changeState("Target","")
},onOverEvent:function(){dojo.dnd.Source.superclass.onOverEvent.call(this);
dojo.dnd.manager().overSource(this)
},onOutEvent:function(){dojo.dnd.Source.superclass.onOutEvent.call(this);
dojo.dnd.manager().outSource(this)
},_markTargetAnchor:function(before){if(this.current==this.targetAnchor&&this.before==before){return 
}if(this.targetAnchor){this._removeItemClass(this.targetAnchor,this.before?"Before":"After")
}this.targetAnchor=this.current;
this.targetBox=null;
this.before=before;
if(this.targetAnchor){this._addItemClass(this.targetAnchor,this.before?"Before":"After")
}},_unmarkTargetAnchor:function(){if(!this.targetAnchor){return 
}this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
this.targetAnchor=null;
this.targetBox=null;
this.before=true
},_markDndStatus:function(copy){this._changeState("Source",copy?"Copied":"Moved")
},_legalMouseDown:function(e){if(!this.withHandles){return true
}for(var node=e.target;
node&&!dojo.hasClass(node,"dojoDndItem");
node=node.parentNode){if(dojo.hasClass(node,"dojoDndHandle")){var event=e;
if(!event){event=window.event
}var pos={x:event.clientX,y:event.clientY};
var isCollapsed=false;
dojo.query("a",node).forEach(function(item){if(!isCollapsed){var rect=item.getBoundingClientRect();
isCollapsed=(rect.left<=pos.x&&pos.x<=rect.right&&rect.top<=pos.y&&pos.y<=rect.bottom)
}});
if(isCollapsed){return false
}return true
}}return false
}});
dojo.declare("dojo.dnd.Target",dojo.dnd.Source,{constructor:function(node,params){this.isSource=false;
dojo.removeClass(this.node,"dojoDndSource")
},markupFactory:function(params,node){params._skipStartup=true;
return new dojo.dnd.Target(node,params)
}})
}if(!dojo._hasResource["dojo.dnd.Mover"]){dojo._hasResource["dojo.dnd.Mover"]=true;
dojo.provide("dojo.dnd.Mover");
dojo.declare("dojo.dnd.Mover",null,{constructor:function(node,e,host){this.node=dojo.byId(node);
this.marginBox={l:e.pageX,t:e.pageY};
this.mouseButton=e.button;
var h=this.host=host,d=node.ownerDocument,firstEvent=dojo.connect(d,"onmousemove",this,"onFirstMove");
this.events=[dojo.connect(d,"onmousemove",this,"onMouseMove"),dojo.connect(d,"onmouseup",this,"onMouseUp"),dojo.connect(d,"ondragstart",dojo,"stopEvent"),dojo.connect(d,"onselectstart",dojo,"stopEvent"),firstEvent];
if(h&&h.onMoveStart){h.onMoveStart(this)
}},onMouseMove:function(e){dojo.dnd.autoScroll(e);
var m=this.marginBox;
this.host.onMove(this,{l:m.l+e.pageX,t:m.t+e.pageY})
},onMouseUp:function(e){if(this.mouseButton==e.button){this.destroy()
}},onFirstMove:function(){this.node.style.position="absolute";
var m=dojo.marginBox(this.node);
m.l-=this.marginBox.l;
m.t-=this.marginBox.t;
this.marginBox=m;
this.host.onFirstMove(this);
dojo.disconnect(this.events.pop())
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
var h=this.host;
if(h&&h.onMoveStop){h.onMoveStop(this)
}this.events=this.node=null
}})
}if(!dojo._hasResource["dojo.dnd.Moveable"]){dojo._hasResource["dojo.dnd.Moveable"]=true;
dojo.provide("dojo.dnd.Moveable");
dojo.declare("dojo.dnd.Moveable",null,{handle:"",delay:0,skip:false,constructor:function(node,params){this.node=dojo.byId(node);
if(!params){params={}
}this.handle=params.handle?dojo.byId(params.handle):null;
if(!this.handle){this.handle=this.node
}this.delay=params.delay>0?params.delay:0;
this.skip=params.skip;
this.mover=params.mover?params.mover:dojo.dnd.Mover;
this.events=[dojo.connect(this.handle,"onmousedown",this,"onMouseDown"),dojo.connect(this.handle,"ondragstart",this,"onSelectStart"),dojo.connect(this.handle,"onselectstart",this,"onSelectStart")]
},markupFactory:function(params,node){return new dojo.dnd.Moveable(node,params)
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
this.events=this.node=this.handle=null
},onMouseDown:function(e){if(this.skip&&dojo.dnd.isFormElement(e)){return 
}if(this.delay){this.events.push(dojo.connect(this.handle,"onmousemove",this,"onMouseMove"));
this.events.push(dojo.connect(this.handle,"onmouseup",this,"onMouseUp"));
this._lastX=e.pageX;
this._lastY=e.pageY
}else{new this.mover(this.node,e,this)
}dojo.stopEvent(e)
},onMouseMove:function(e){if(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay){this.onMouseUp(e);
new this.mover(this.node,e,this)
}dojo.stopEvent(e)
},onMouseUp:function(e){dojo.disconnect(this.events.pop());
dojo.disconnect(this.events.pop())
},onSelectStart:function(e){if(!this.skip||!dojo.dnd.isFormElement(e)){dojo.stopEvent(e)
}},onMoveStart:function(mover){dojo.publish("/dnd/move/start",[mover]);
dojo.addClass(dojo.body(),"dojoMove");
dojo.addClass(this.node,"dojoMoveItem")
},onMoveStop:function(mover){dojo.publish("/dnd/move/stop",[mover]);
dojo.removeClass(dojo.body(),"dojoMove");
dojo.removeClass(this.node,"dojoMoveItem")
},onFirstMove:function(mover){},onMove:function(mover,leftTop){this.onMoving(mover,leftTop);
dojo.marginBox(mover.node,leftTop);
this.onMoved(mover,leftTop)
},onMoving:function(mover,leftTop){},onMoved:function(mover,leftTop){}})
}if(!dojo._hasResource["dojo.dnd.move"]){dojo._hasResource["dojo.dnd.move"]=true;
dojo.provide("dojo.dnd.move");
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){},within:false,markupFactory:function(params,node){return new dojo.dnd.move.constrainedMoveable(node,params)
},constructor:function(node,params){if(!params){params={}
}this.constraints=params.constraints;
this.within=params.within
},onFirstMove:function(mover){var c=this.constraintBox=this.constraints.call(this,mover),m=mover.marginBox;
c.r=c.l+c.w-(this.within?m.w:0);
c.b=c.t+c.h-(this.within?m.h:0)
},onMove:function(mover,leftTop){var c=this.constraintBox;
leftTop.l=leftTop.l<c.l?c.l:c.r<leftTop.l?c.r:leftTop.l;
leftTop.t=leftTop.t<c.t?c.t:c.b<leftTop.t?c.b:leftTop.t;
dojo.marginBox(mover.node,leftTop)
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},markupFactory:function(params,node){return new dojo.dnd.move.boxConstrainedMoveable(node,params)
},constructor:function(node,params){var box=params&&params.box;
this.constraints=function(){return box
}
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(params,node){return new dojo.dnd.move.parentConstrainedMoveable(node,params)
},constructor:function(node,params){var area=params&&params.area;
this.constraints=function(){var n=this.node.parentNode,s=dojo.getComputedStyle(n),mb=dojo._getMarginBox(n,s);
if(area=="margin"){return mb
}var t=dojo._getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(area=="border"){return mb
}t=dojo._getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(area=="padding"){return mb
}t=dojo._getPadExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
return mb
}
}});
dojo.dnd.move.constrainedMover=function(fun,within){var mover=function(node,e,notifier){dojo.dnd.Mover.call(this,node,e,notifier)
};
dojo.extend(mover,dojo.dnd.Mover.prototype);
dojo.extend(mover,{onMouseMove:function(e){dojo.dnd.autoScroll(e);
var m=this.marginBox,c=this.constraintBox,l=m.l+e.pageX,t=m.t+e.pageY;
l=l<c.l?c.l:c.r<l?c.r:l;
t=t<c.t?c.t:c.b<t?c.b:t;
this.host.onMove(this,{l:l,t:t})
},onFirstMove:function(){dojo.dnd.Mover.prototype.onFirstMove.call(this);
var c=this.constraintBox=fun.call(this),m=this.marginBox;
c.r=c.l+c.w-(within?m.w:0);
c.b=c.t+c.h-(within?m.h:0)
}});
return mover
};
dojo.dnd.move.boxConstrainedMover=function(box,within){return dojo.dnd.move.constrainedMover(function(){return box
},within)
};
dojo.dnd.move.parentConstrainedMover=function(area,within){var fun=function(){var n=this.node.parentNode,s=dojo.getComputedStyle(n),mb=dojo._getMarginBox(n,s);
if(area=="margin"){return mb
}var t=dojo._getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(area=="border"){return mb
}t=dojo._getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(area=="padding"){return mb
}t=dojo._getPadExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
return mb
};
return dojo.dnd.move.constrainedMover(fun,within)
};
dojo.dnd.constrainedMover=dojo.dnd.move.constrainedMover;
dojo.dnd.boxConstrainedMover=dojo.dnd.move.boxConstrainedMover;
dojo.dnd.parentConstrainedMover=dojo.dnd.move.parentConstrainedMover
}if(!dojo._hasResource["dojo.io.iframe"]){dojo._hasResource["dojo.io.iframe"]=true;
dojo.provide("dojo.io.iframe");
dojo.io.iframe={create:function(fname,onloadstr,uri){if(window[fname]){return window[fname]
}if(window.frames[fname]){return window.frames[fname]
}var cframe=null;
var turi=uri;
if(!turi){if(djConfig.useXDomain&&!djConfig.dojoBlankHtmlUrl){console.debug("dojo.io.iframe.create: When using cross-domain Dojo builds, please save dojo/resources/blank.html to your domain and set djConfig.dojoBlankHtmlUrl to the path on your domain to blank.html")
}turi=(djConfig.dojoBlankHtmlUrl||dojo.moduleUrl("dojo","resources/blank.html"))
}var ifrstr=dojo.isIE?'<iframe name="'+fname+'" src="'+turi+'" onload="'+onloadstr+'">':"iframe";
cframe=dojo.doc.createElement(ifrstr);
with(cframe){name=fname;
setAttribute("name",fname);
id=fname
}dojo.body().appendChild(cframe);
window[fname]=cframe;
with(cframe.style){if(dojo.isSafari<3){position="absolute"
}left=top="1px";
height=width="1px";
visibility="hidden"
}if(!dojo.isIE){this.setSrc(cframe,turi,true);
cframe.onload=new Function(onloadstr)
}return cframe
},setSrc:function(iframe,src,replace){try{if(!replace){if(dojo.isSafari){iframe.location=src
}else{frames[iframe.name].location=src
}}else{var idoc;
if(dojo.isIE||dojo.isSafari>2){idoc=iframe.contentWindow.document
}else{if(dojo.isSafari){idoc=iframe.document
}else{idoc=iframe.contentWindow
}}if(!idoc){iframe.location=src;
return 
}else{idoc.location.replace(src)
}}}catch(e){console.debug("dojo.io.iframe.setSrc: ",e)
}},doc:function(iframeNode){var doc=iframeNode.contentDocument||((iframeNode.contentWindow)&&(iframeNode.contentWindow.document))||((iframeNode.name)&&(document.frames[iframeNode.name])&&(document.frames[iframeNode.name].document))||null;
return doc
},send:function(args){if(!this["_frame"]){this._frame=this.create(this._iframeName,"dojo.io.iframe._iframeOnload();")
}var dfd=dojo._ioSetArgs(args,function(dfd){dfd.canceled=true;
dfd.ioArgs._callNext()
},function(dfd){var value=null;
try{var ioArgs=dfd.ioArgs;
var dii=dojo.io.iframe;
var ifd=dii.doc(dii._frame);
var handleAs=ioArgs.handleAs;
value=ifd;
if(handleAs!="html"){value=ifd.getElementsByTagName("textarea")[0].value;
if(handleAs=="json"){value=dojo.fromJson(value)
}else{if(handleAs=="javascript"){value=dojo.eval(value)
}}}}catch(e){value=e
}finally{ioArgs._callNext()
}return value
},function(error,dfd){dfd.ioArgs._hasError=true;
dfd.ioArgs._callNext();
return error
});
dfd.ioArgs._callNext=function(){if(!this["_calledNext"]){this._calledNext=true;
dojo.io.iframe._currentDfd=null;
dojo.io.iframe._fireNextRequest()
}};
this._dfdQueue.push(dfd);
this._fireNextRequest();
dojo._ioWatch(dfd,function(dfd){return !dfd.ioArgs._hasError
},function(dfd){return(!!dfd.ioArgs._finished)
},function(dfd){if(dfd.ioArgs._finished){dfd.callback(dfd)
}else{dfd.errback(new Error("Invalid dojo.io.iframe request state"))
}});
return dfd
},_currentDfd:null,_dfdQueue:[],_iframeName:"dojoIoIframe",_fireNextRequest:function(){try{if((this._currentDfd)||(this._dfdQueue.length==0)){return 
}var dfd=this._currentDfd=this._dfdQueue.shift();
var ioArgs=dfd.ioArgs;
var args=ioArgs.args;
ioArgs._contentToClean=[];
var fn=args.form;
var content=args.content||{};
if(fn){if(content){for(var x in content){if(!fn[x]){var tn;
if(dojo.isIE){tn=dojo.doc.createElement("<input type='hidden' name='"+x+"'>")
}else{tn=dojo.doc.createElement("input");
tn.type="hidden";
tn.name=x
}tn.value=content[x];
fn.appendChild(tn);
ioArgs._contentToClean.push(x)
}else{fn[x].value=content[x]
}}}var actnNode=fn.getAttributeNode("action");
var mthdNode=fn.getAttributeNode("method");
var trgtNode=fn.getAttributeNode("target");
if(args.url){ioArgs._originalAction=actnNode?actnNode.value:null;
if(actnNode){actnNode.value=args.url
}else{fn.setAttribute("action",args.url)
}}if(!mthdNode||!mthdNode.value){if(mthdNode){mthdNode.value=(args.method)?args.method:"post"
}else{fn.setAttribute("method",(args.method)?args.method:"post")
}}ioArgs._originalTarget=trgtNode?trgtNode.value:null;
if(trgtNode){trgtNode.value=this._iframeName
}else{fn.setAttribute("target",this._iframeName)
}fn.target=this._iframeName;
fn.submit()
}else{var tmpUrl=args.url+(args.url.indexOf("?")>-1?"&":"?")+ioArgs.query;
this.setSrc(this._frame,tmpUrl,true)
}}catch(e){dfd.errback(e)
}},_iframeOnload:function(){var dfd=this._currentDfd;
if(!dfd){this._fireNextRequest();
return 
}var ioArgs=dfd.ioArgs;
var args=ioArgs.args;
var fNode=args.form;
if(fNode){var toClean=ioArgs._contentToClean;
for(var i=0;
i<toClean.length;
i++){var key=toClean[i];
if(dojo.isSafari<3){for(var j=0;
j<fNode.childNodes.length;
j++){var chNode=fNode.childNodes[j];
if(chNode.name==key){dojo._destroyElement(chNode);
break
}}}else{dojo._destroyElement(fNode[key]);
fNode[key]=null
}}if(ioArgs._originalAction){fNode.setAttribute("action",ioArgs._originalAction)
}if(ioArgs._originalTarget){fNode.setAttribute("target",ioArgs._originalTarget);
fNode.target=ioArgs._originalTarget
}}ioArgs._finished=true
}}
}if(!dojo._hasResource["dojo.data.util.filter"]){dojo._hasResource["dojo.data.util.filter"]=true;
dojo.provide("dojo.data.util.filter");
dojo.data.util.filter.patternToRegExp=function(pattern,ignoreCase){var rxp="^";
var c=null;
for(var i=0;
i<pattern.length;
i++){c=pattern.charAt(i);
switch(c){case"\\":rxp+=c;
i++;
rxp+=pattern.charAt(i);
break;
case"*":rxp+=".*";
break;
case"?":rxp+=".";
break;
case"$":case"^":case"/":case"+":case".":case"|":case"(":case")":case"{":case"}":case"[":case"]":rxp+="\\";
default:rxp+=c
}}rxp+="$";
if(ignoreCase){return new RegExp(rxp,"i")
}else{return new RegExp(rxp)
}}
}if(!dojo._hasResource["dojo.data.util.sorter"]){dojo._hasResource["dojo.data.util.sorter"]=true;
dojo.provide("dojo.data.util.sorter");
dojo.data.util.sorter.basicComparator=function(a,b){var ret=0;
if(a>b||typeof a==="undefined"||a===null){ret=1
}else{if(a<b||typeof b==="undefined"||b===null){ret=-1
}}return ret
};
dojo.data.util.sorter.createSortFunction=function(sortSpec,store){var sortFunctions=[];
function createSortFunction(attr,dir){return function(itemA,itemB){var a=store.getValue(itemA,attr);
var b=store.getValue(itemB,attr);
var comparator=null;
if(store.comparatorMap){if(typeof attr!=="string"){attr=store.getIdentity(attr)
}comparator=store.comparatorMap[attr]||dojo.data.util.sorter.basicComparator
}comparator=comparator||dojo.data.util.sorter.basicComparator;
return dir*comparator(a,b)
}
}for(var i=0;
i<sortSpec.length;
i++){sortAttribute=sortSpec[i];
if(sortAttribute.attribute){var direction=(sortAttribute.descending)?-1:1;
sortFunctions.push(createSortFunction(sortAttribute.attribute,direction))
}}return function(rowA,rowB){var i=0;
while(i<sortFunctions.length){var ret=sortFunctions[i++](rowA,rowB);
if(ret!==0){return ret
}}return 0
}
}
}if(!dojo._hasResource["dojo.data.util.simpleFetch"]){dojo._hasResource["dojo.data.util.simpleFetch"]=true;
dojo.provide("dojo.data.util.simpleFetch");
dojo.data.util.simpleFetch.fetch=function(request){request=request||{};
if(!request.store){request.store=this
}var self=this;
var _errorHandler=function(errorData,requestObject){if(requestObject.onError){var scope=requestObject.scope||dojo.global;
requestObject.onError.call(scope,errorData,requestObject)
}};
var _fetchHandler=function(items,requestObject){var oldAbortFunction=requestObject.abort||null;
var aborted=false;
var startIndex=requestObject.start?requestObject.start:0;
var endIndex=requestObject.count?(startIndex+requestObject.count):items.length;
requestObject.abort=function(){aborted=true;
if(oldAbortFunction){oldAbortFunction.call(requestObject)
}};
var scope=requestObject.scope||dojo.global;
if(!requestObject.store){requestObject.store=self
}if(requestObject.onBegin){requestObject.onBegin.call(scope,items.length,requestObject)
}if(requestObject.sort){items.sort(dojo.data.util.sorter.createSortFunction(requestObject.sort,self))
}if(requestObject.onItem){for(var i=startIndex;
(i<items.length)&&(i<endIndex);
++i){var item=items[i];
if(!aborted){requestObject.onItem.call(scope,item,requestObject)
}}}if(requestObject.onComplete&&!aborted){var subset=null;
if(!requestObject.onItem){subset=items.slice(startIndex,endIndex)
}requestObject.onComplete.call(scope,subset,requestObject)
}};
this._fetchItems(request,_fetchHandler,_errorHandler);
return request
}
}if(!dojo._hasResource["dojo.data.ItemFileReadStore"]){dojo._hasResource["dojo.data.ItemFileReadStore"]=true;
dojo.provide("dojo.data.ItemFileReadStore");
dojo.declare("dojo.data.ItemFileReadStore",null,{constructor:function(keywordParameters){this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._jsonFileUrl=keywordParameters.url;
this._jsonData=keywordParameters.data;
this._datatypeMap=keywordParameters.typeMap||{};
if(!this._datatypeMap.Date){this._datatypeMap.Date={type:Date,deserialize:function(value){return dojo.date.stamp.fromISOString(value)
}}
}this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
this._itemsByIdentity=null;
this._storeRefPropName="_S";
this._itemNumPropName="_0";
this._rootItemPropName="_RI";
this._loadInProgress=false;
this._queuedFetches=[]
},url:"",_assertIsItem:function(item){if(!this.isItem(item)){throw new Error("dojo.data.ItemFileReadStore: Invalid item argument.")
}},_assertIsAttribute:function(attribute){if(typeof attribute!=="string"){throw new Error("dojo.data.ItemFileReadStore: Invalid attribute argument.")
}},getValue:function(item,attribute,defaultValue){var values=this.getValues(item,attribute);
return(values.length>0)?values[0]:defaultValue
},getValues:function(item,attribute){this._assertIsItem(item);
this._assertIsAttribute(attribute);
return item[attribute]||[]
},getAttributes:function(item){this._assertIsItem(item);
var attributes=[];
for(var key in item){if((key!==this._storeRefPropName)&&(key!==this._itemNumPropName)&&(key!==this._rootItemPropName)){attributes.push(key)
}}return attributes
},hasAttribute:function(item,attribute){return this.getValues(item,attribute).length>0
},containsValue:function(item,attribute,value){var regexp=undefined;
if(typeof value==="string"){regexp=dojo.data.util.filter.patternToRegExp(value,false)
}return this._containsValue(item,attribute,value,regexp)
},_containsValue:function(item,attribute,value,regexp){return dojo.some(this.getValues(item,attribute),function(possibleValue){if(possibleValue!==null&&!dojo.isObject(possibleValue)&&regexp){if(possibleValue.toString().match(regexp)){return true
}}else{if(value===possibleValue){return true
}}})
},isItem:function(something){if(something&&something[this._storeRefPropName]===this){if(this._arrayOfAllItems[something[this._itemNumPropName]]===something){return true
}}return false
},isItemLoaded:function(something){return this.isItem(something)
},loadItem:function(keywordArgs){this._assertIsItem(keywordArgs.item)
},getFeatures:function(){return this._features
},getLabel:function(item){if(this._labelAttr&&this.isItem(item)){return this.getValue(item,this._labelAttr)
}return undefined
},getLabelAttributes:function(item){if(this._labelAttr){return[this._labelAttr]
}return null
},_fetchItems:function(keywordArgs,findCallback,errorCallback){var self=this;
var filter=function(requestArgs,arrayOfItems){var items=[];
if(requestArgs.query){var ignoreCase=requestArgs.queryOptions?requestArgs.queryOptions.ignoreCase:false;
var regexpList={};
for(var key in requestArgs.query){var value=requestArgs.query[key];
if(typeof value==="string"){regexpList[key]=dojo.data.util.filter.patternToRegExp(value,ignoreCase)
}}for(var i=0;
i<arrayOfItems.length;
++i){var match=true;
var candidateItem=arrayOfItems[i];
if(candidateItem===null){match=false
}else{for(var key in requestArgs.query){var value=requestArgs.query[key];
if(!self._containsValue(candidateItem,key,value,regexpList[key])){match=false
}}}if(match){items.push(candidateItem)
}}findCallback(items,requestArgs)
}else{for(var i=0;
i<arrayOfItems.length;
++i){var item=arrayOfItems[i];
if(item!==null){items.push(item)
}}findCallback(items,requestArgs)
}};
if(this._loadFinished){filter(keywordArgs,this._getItemsArray(keywordArgs.queryOptions))
}else{if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:keywordArgs,filter:filter})
}else{this._loadInProgress=true;
var getArgs={url:self._jsonFileUrl,handleAs:"json-comment-optional"};
var getHandler=dojo.xhrGet(getArgs);
getHandler.addCallback(function(data){try{self._getItemsFromLoadedData(data);
self._loadFinished=true;
self._loadInProgress=false;
filter(keywordArgs,self._getItemsArray(keywordArgs.queryOptions));
self._handleQueuedFetches()
}catch(e){self._loadFinished=true;
self._loadInProgress=false;
errorCallback(e,keywordArgs)
}});
getHandler.addErrback(function(error){self._loadInProgress=false;
errorCallback(error,keywordArgs)
})
}}else{if(this._jsonData){try{this._loadFinished=true;
this._getItemsFromLoadedData(this._jsonData);
this._jsonData=null;
filter(keywordArgs,this._getItemsArray(keywordArgs.queryOptions))
}catch(e){errorCallback(e,keywordArgs)
}}else{errorCallback(new Error("dojo.data.ItemFileReadStore: No JSON source data was provided as either URL or a nested Javascript object."),keywordArgs)
}}}},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var i=0;
i<this._queuedFetches.length;
i++){var fData=this._queuedFetches[i];
var delayedQuery=fData.args;
var delayedFilter=fData.filter;
if(delayedFilter){delayedFilter(delayedQuery,this._getItemsArray(delayedQuery.queryOptions))
}else{this.fetchItemByIdentity(delayedQuery)
}}this._queuedFetches=[]
}},_getItemsArray:function(queryOptions){if(queryOptions&&queryOptions.deep){return this._arrayOfAllItems
}return this._arrayOfTopLevelItems
},close:function(request){},_getItemsFromLoadedData:function(dataObject){function valueIsAnItem(aValue){var isItem=((aValue!=null)&&(typeof aValue=="object")&&(!dojo.isArray(aValue))&&(!dojo.isFunction(aValue))&&(aValue.constructor==Object)&&(typeof aValue._reference=="undefined")&&(typeof aValue._type=="undefined")&&(typeof aValue._value=="undefined"));
return isItem
}var self=this;
function addItemAndSubItemsToArrayOfAllItems(anItem){self._arrayOfAllItems.push(anItem);
for(var attribute in anItem){var valueForAttribute=anItem[attribute];
if(valueForAttribute){if(dojo.isArray(valueForAttribute)){var valueArray=valueForAttribute;
for(var k=0;
k<valueArray.length;
++k){var singleValue=valueArray[k];
if(valueIsAnItem(singleValue)){addItemAndSubItemsToArrayOfAllItems(singleValue)
}}}else{if(valueIsAnItem(valueForAttribute)){addItemAndSubItemsToArrayOfAllItems(valueForAttribute)
}}}}}this._labelAttr=dataObject.label;
var i;
var item;
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=dataObject.items;
for(i=0;
i<this._arrayOfTopLevelItems.length;
++i){item=this._arrayOfTopLevelItems[i];
addItemAndSubItemsToArrayOfAllItems(item);
item[this._rootItemPropName]=true
}var allAttributeNames={};
var key;
for(i=0;
i<this._arrayOfAllItems.length;
++i){item=this._arrayOfAllItems[i];
for(key in item){if(key!==this._rootItemPropName){var value=item[key];
if(value!==null){if(!dojo.isArray(value)){item[key]=[value]
}}else{item[key]=[null]
}}allAttributeNames[key]=key
}}while(allAttributeNames[this._storeRefPropName]){this._storeRefPropName+="_"
}while(allAttributeNames[this._itemNumPropName]){this._itemNumPropName+="_"
}var arrayOfValues;
var identifier=dataObject.identifier;
if(identifier){this._itemsByIdentity={};
this._features["dojo.data.api.Identity"]=identifier;
for(i=0;
i<this._arrayOfAllItems.length;
++i){item=this._arrayOfAllItems[i];
arrayOfValues=item[identifier];
var identity=arrayOfValues[0];
if(!this._itemsByIdentity[identity]){this._itemsByIdentity[identity]=item
}else{if(this._jsonFileUrl){throw new Error("dojo.data.ItemFileReadStore:  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+identifier+"].  Value collided: ["+identity+"]")
}else{if(this._jsonData){throw new Error("dojo.data.ItemFileReadStore:  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+identifier+"].  Value collided: ["+identity+"]")
}}}}}else{this._features["dojo.data.api.Identity"]=Number
}for(i=0;
i<this._arrayOfAllItems.length;
++i){item=this._arrayOfAllItems[i];
item[this._storeRefPropName]=this;
item[this._itemNumPropName]=i
}for(i=0;
i<this._arrayOfAllItems.length;
++i){item=this._arrayOfAllItems[i];
for(key in item){arrayOfValues=item[key];
for(var j=0;
j<arrayOfValues.length;
++j){value=arrayOfValues[j];
if(value!==null&&typeof value=="object"){if(value._type&&value._value){var type=value._type;
var mappingObj=this._datatypeMap[type];
if(!mappingObj){throw new Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+type+"'")
}else{if(dojo.isFunction(mappingObj)){arrayOfValues[j]=new mappingObj(value._value)
}else{if(dojo.isFunction(mappingObj.deserialize)){arrayOfValues[j]=mappingObj.deserialize(value._value)
}else{throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function")
}}}}if(value._reference){var referenceDescription=value._reference;
if(dojo.isString(referenceDescription)){arrayOfValues[j]=this._itemsByIdentity[referenceDescription]
}else{for(var k=0;
k<this._arrayOfAllItems.length;
++k){var candidateItem=this._arrayOfAllItems[k];
var found=true;
for(var refKey in referenceDescription){if(candidateItem[refKey]!=referenceDescription[refKey]){found=false
}}if(found){arrayOfValues[j]=candidateItem
}}}}}}}}},getIdentity:function(item){var identifier=this._features["dojo.data.api.Identity"];
if(identifier===Number){return item[this._itemNumPropName]
}else{var arrayOfValues=item[identifier];
if(arrayOfValues){return arrayOfValues[0]
}}return null
},fetchItemByIdentity:function(keywordArgs){if(!this._loadFinished){var self=this;
if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:keywordArgs})
}else{this._loadInProgress=true;
var getArgs={url:self._jsonFileUrl,handleAs:"json-comment-optional"};
var getHandler=dojo.xhrGet(getArgs);
getHandler.addCallback(function(data){var scope=keywordArgs.scope?keywordArgs.scope:dojo.global;
try{self._getItemsFromLoadedData(data);
self._loadFinished=true;
self._loadInProgress=false;
var item=self._getItemByIdentity(keywordArgs.identity);
if(keywordArgs.onItem){keywordArgs.onItem.call(scope,item)
}self._handleQueuedFetches()
}catch(error){self._loadInProgress=false;
if(keywordArgs.onError){keywordArgs.onError.call(scope,error)
}}});
getHandler.addErrback(function(error){self._loadInProgress=false;
if(keywordArgs.onError){var scope=keywordArgs.scope?keywordArgs.scope:dojo.global;
keywordArgs.onError.call(scope,error)
}})
}}else{if(this._jsonData){self._getItemsFromLoadedData(self._jsonData);
self._jsonData=null;
self._loadFinished=true;
var item=self._getItemByIdentity(keywordArgs.identity);
if(keywordArgs.onItem){var scope=keywordArgs.scope?keywordArgs.scope:dojo.global;
keywordArgs.onItem.call(scope,item)
}}}}else{var item=this._getItemByIdentity(keywordArgs.identity);
if(keywordArgs.onItem){var scope=keywordArgs.scope?keywordArgs.scope:dojo.global;
keywordArgs.onItem.call(scope,item)
}}},_getItemByIdentity:function(identity){var item=null;
if(this._itemsByIdentity){item=this._itemsByIdentity[identity]
}else{item=this._arrayOfAllItems[identity]
}if(item===undefined){item=null
}return item
},getIdentityAttributes:function(item){var identifier=this._features["dojo.data.api.Identity"];
if(identifier===Number){return null
}else{return[identifier]
}},_forceLoad:function(){var self=this;
if(this._jsonFileUrl){var getArgs={url:self._jsonFileUrl,handleAs:"json-comment-optional",sync:true};
var getHandler=dojo.xhrGet(getArgs);
getHandler.addCallback(function(data){try{if(self._loadInProgress!==true&&!self._loadFinished){self._getItemsFromLoadedData(data);
self._loadFinished=true
}}catch(e){console.log(e);
throw e
}});
getHandler.addErrback(function(error){throw error
})
}else{if(this._jsonData){self._getItemsFromLoadedData(self._jsonData);
self._jsonData=null;
self._loadFinished=true
}}}});
dojo.extend(dojo.data.ItemFileReadStore,dojo.data.util.simpleFetch)
}if(!dojo._hasResource["dojo.data.ItemFileWriteStore"]){dojo._hasResource["dojo.data.ItemFileWriteStore"]=true;
dojo.provide("dojo.data.ItemFileWriteStore");
dojo.declare("dojo.data.ItemFileWriteStore",dojo.data.ItemFileReadStore,{constructor:function(keywordParameters){this._features["dojo.data.api.Write"]=true;
this._features["dojo.data.api.Notification"]=true;
this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
if(!this._datatypeMap.Date.serialize){this._datatypeMap.Date.serialize=function(obj){return dojo.date.stamp.toISOString(obj,{zulu:true})
}
}this._saveInProgress=false
},_assert:function(condition){if(!condition){throw new Error("assertion failed in ItemFileWriteStore")
}},_getIdentifierAttribute:function(){var identifierAttribute=this.getFeatures()["dojo.data.api.Identity"];
return identifierAttribute
},newItem:function(keywordArgs,parentInfo){this._assert(!this._saveInProgress);
if(!this._loadFinished){this._forceLoad()
}if(typeof keywordArgs!="object"&&typeof keywordArgs!="undefined"){throw new Error("newItem() was passed something other than an object")
}var newIdentity=null;
var identifierAttribute=this._getIdentifierAttribute();
if(identifierAttribute===Number){newIdentity=this._arrayOfAllItems.length
}else{newIdentity=keywordArgs[identifierAttribute];
if(typeof newIdentity==="undefined"){throw new Error("newItem() was not passed an identity for the new item")
}if(dojo.isArray(newIdentity)){throw new Error("newItem() was not passed an single-valued identity")
}}if(this._itemsByIdentity){this._assert(typeof this._itemsByIdentity[newIdentity]==="undefined")
}this._assert(typeof this._pending._newItems[newIdentity]==="undefined");
this._assert(typeof this._pending._deletedItems[newIdentity]==="undefined");
var newItem={};
newItem[this._storeRefPropName]=this;
newItem[this._itemNumPropName]=this._arrayOfAllItems.length;
if(this._itemsByIdentity){this._itemsByIdentity[newIdentity]=newItem
}this._arrayOfAllItems.push(newItem);
var pInfo=null;
if(parentInfo&&parentInfo.parent&&parentInfo.attribute){pInfo={item:parentInfo.parent,attribute:parentInfo.attribute,oldValue:undefined};
var values=this.getValues(parentInfo.parent,parentInfo.attribute);
if(values&&values.length>0){var tempValues=values.slice(0,values.length);
if(values.length===1){pInfo.oldValue=values[0]
}else{pInfo.oldValue=values.slice(0,values.length)
}tempValues.push(newItem);
this._setValueOrValues(parentInfo.parent,parentInfo.attribute,tempValues,false);
pInfo.newValue=this.getValues(parentInfo.parent,parentInfo.attribute)
}else{this._setValueOrValues(parentInfo.parent,parentInfo.attribute,newItem,false);
pInfo.newValue=newItem
}}else{newItem[this._rootItemPropName]=true;
this._arrayOfTopLevelItems.push(newItem)
}this._pending._newItems[newIdentity]=newItem;
for(var key in keywordArgs){if(key===this._storeRefPropName||key===this._itemNumPropName){throw new Error("encountered bug in ItemFileWriteStore.newItem")
}var value=keywordArgs[key];
if(!dojo.isArray(value)){value=[value]
}newItem[key]=value
}this.onNew(newItem,pInfo);
return newItem
},_removeArrayElement:function(array,element){var index=dojo.indexOf(array,element);
if(index!=-1){array.splice(index,1);
return true
}return false
},deleteItem:function(item){this._assert(!this._saveInProgress);
this._assertIsItem(item);
var indexInArrayOfAllItems=item[this._itemNumPropName];
this._arrayOfAllItems[indexInArrayOfAllItems]=null;
var identity=this.getIdentity(item);
item[this._storeRefPropName]=null;
if(this._itemsByIdentity){delete this._itemsByIdentity[identity]
}this._pending._deletedItems[identity]=item;
if(item[this._rootItemPropName]){this._removeArrayElement(this._arrayOfTopLevelItems,item)
}this.onDelete(item);
return true
},setValue:function(item,attribute,value){return this._setValueOrValues(item,attribute,value,true)
},setValues:function(item,attribute,values){return this._setValueOrValues(item,attribute,values,true)
},unsetAttribute:function(item,attribute){return this._setValueOrValues(item,attribute,[],true)
},_setValueOrValues:function(item,attribute,newValueOrValues,callOnSet){this._assert(!this._saveInProgress);
this._assertIsItem(item);
this._assert(dojo.isString(attribute));
this._assert(typeof newValueOrValues!=="undefined");
var identifierAttribute=this._getIdentifierAttribute();
if(attribute==identifierAttribute){throw new Error("ItemFileWriteStore does not have support for changing the value of an item's identifier.")
}var oldValueOrValues=this._getValueOrValues(item,attribute);
var identity=this.getIdentity(item);
if(!this._pending._modifiedItems[identity]){var copyOfItemState={};
for(var key in item){if((key===this._storeRefPropName)||(key===this._itemNumPropName)||(key===this._rootItemPropName)){copyOfItemState[key]=item[key]
}else{var valueArray=item[key];
var copyOfValueArray=[];
for(var i=0;
i<valueArray.length;
++i){copyOfValueArray.push(valueArray[i])
}copyOfItemState[key]=copyOfValueArray
}}this._pending._modifiedItems[identity]=copyOfItemState
}var success=false;
if(dojo.isArray(newValueOrValues)&&newValueOrValues.length===0){success=delete item[attribute];
newValueOrValues=undefined
}else{var newValueArray=[];
if(dojo.isArray(newValueOrValues)){var newValues=newValueOrValues;
for(var j=0;
j<newValues.length;
++j){newValueArray.push(newValues[j])
}}else{var newValue=newValueOrValues;
newValueArray.push(newValue)
}item[attribute]=newValueArray;
success=true
}if(callOnSet){this.onSet(item,attribute,oldValueOrValues,newValueOrValues)
}return success
},_getValueOrValues:function(item,attribute){var valueOrValues=undefined;
if(this.hasAttribute(item,attribute)){var valueArray=this.getValues(item,attribute);
if(valueArray.length==1){valueOrValues=valueArray[0]
}else{valueOrValues=valueArray
}}return valueOrValues
},_flatten:function(value){if(this.isItem(value)){var item=value;
var identity=this.getIdentity(item);
var referenceObject={_reference:identity};
return referenceObject
}else{if(typeof value==="object"){for(type in this._datatypeMap){var typeMap=this._datatypeMap[type];
if(dojo.isObject(typeMap)&&!dojo.isFunction(typeMap)){if(value instanceof typeMap.type){if(!typeMap.serialize){throw new Error("ItemFileWriteStore:  No serializer defined for type mapping: ["+type+"]")
}return{_type:type,_value:typeMap.serialize(value)}
}}else{if(value instanceof typeMap){return{_type:type,_value:value.toString()}
}}}}return value
}},_getNewFileContentString:function(){var serializableStructure={};
var identifierAttribute=this._getIdentifierAttribute();
if(identifierAttribute!==Number){serializableStructure.identifier=identifierAttribute
}if(this._labelAttr){serializableStructure.label=this._labelAttr
}serializableStructure.items=[];
for(var i=0;
i<this._arrayOfAllItems.length;
++i){var item=this._arrayOfAllItems[i];
if(item!==null){serializableItem={};
for(var key in item){if(key!==this._storeRefPropName&&key!==this._itemNumPropName){var attribute=key;
var valueArray=this.getValues(item,attribute);
if(valueArray.length==1){serializableItem[attribute]=this._flatten(valueArray[0])
}else{var serializableArray=[];
for(var j=0;
j<valueArray.length;
++j){serializableArray.push(this._flatten(valueArray[j]));
serializableItem[attribute]=serializableArray
}}}}serializableStructure.items.push(serializableItem)
}}var prettyPrint=true;
return dojo.toJson(serializableStructure,prettyPrint)
},save:function(keywordArgs){this._assert(!this._saveInProgress);
this._saveInProgress=true;
var self=this;
var saveCompleteCallback=function(){self._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
self._saveInProgress=false;
if(keywordArgs&&keywordArgs.onComplete){var scope=keywordArgs.scope||dojo.global;
keywordArgs.onComplete.call(scope)
}};
var saveFailedCallback=function(){self._saveInProgress=false;
if(keywordArgs&&keywordArgs.onError){var scope=keywordArgs.scope||dojo.global;
keywordArgs.onError.call(scope)
}};
if(this._saveEverything){var newFileContentString=this._getNewFileContentString();
this._saveEverything(saveCompleteCallback,saveFailedCallback,newFileContentString)
}if(this._saveCustom){this._saveCustom(saveCompleteCallback,saveFailedCallback)
}if(!this._saveEverything&&!this._saveCustom){saveCompleteCallback()
}},revert:function(){this._assert(!this._saveInProgress);
var identity;
for(identity in this._pending._newItems){var newItem=this._pending._newItems[identity];
newItem[this._storeRefPropName]=null;
this._arrayOfAllItems[newItem[this._itemNumPropName]]=null;
if(newItem[this._rootItemPropName]){this._removeArrayElement(this._arrayOfTopLevelItems,newItem)
}if(this._itemsByIdentity){delete this._itemsByIdentity[identity]
}}for(identity in this._pending._modifiedItems){var originalItem=this._pending._modifiedItems[identity];
var modifiedItem=null;
if(this._itemsByIdentity){modifiedItem=this._itemsByIdentity[identity]
}else{modifiedItem=this._arrayOfAllItems[identity]
}originalItem[this._storeRefPropName]=this;
modifiedItem[this._storeRefPropName]=null;
var arrayIndex=modifiedItem[this._itemNumPropName];
this._arrayOfAllItems[arrayIndex]=originalItem;
if(modifiedItem[this._rootItemPropName]){arrayIndex=modifiedItem[this._itemNumPropName];
this._arrayOfTopLevelItems[arrayIndex]=originalItem
}if(this._itemsByIdentity){this._itemsByIdentity[identity]=originalItem
}}for(identity in this._pending._deletedItems){var deletedItem=this._pending._deletedItems[identity];
deletedItem[this._storeRefPropName]=this;
var index=deletedItem[this._itemNumPropName];
this._arrayOfAllItems[index]=deletedItem;
if(this._itemsByIdentity){this._itemsByIdentity[identity]=deletedItem
}if(deletedItem[this._rootItemPropName]){this._arrayOfTopLevelItems.push(deletedItem)
}}this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
return true
},isDirty:function(item){if(item){var identity=this.getIdentity(item);
return new Boolean(this._pending._newItems[identity]||this._pending._modifiedItems[identity]||this._pending._deletedItems[identity])
}else{var key;
for(key in this._pending._newItems){return true
}for(key in this._pending._modifiedItems){return true
}for(key in this._pending._deletedItems){return true
}return false
}},onSet:function(item,attribute,oldValue,newValue){},onNew:function(newItem,parentInfo){},onDelete:function(deletedItem){}})
}}});