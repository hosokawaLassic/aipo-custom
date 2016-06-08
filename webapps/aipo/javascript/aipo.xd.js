if(typeof djConfig.xDomainBasePath=="undefined"){dojo.registerModulePath("dojo","../dojo");
dojo.registerModulePath("dijit","../dijit");
dojo.registerModulePath("dojox","../dojox");
dojo.registerModulePath("aimluck","../aimluck");
dojo.registerModulePath("aipo","../aipo")
}else{djConfig.useXDomain=true;
dojo.registerModulePath("dojo",djConfig.xDomainBasePath+"/dojo");
dojo.registerModulePath("dijit",djConfig.xDomainBasePath+"/dijit");
dojo.registerModulePath("dojox",djConfig.xDomainBasePath+"/dojox");
dojo.registerModulePath("aimluck",djConfig.xDomainBasePath+"/aimluck");
dojo.registerModulePath("aipo",djConfig.xDomainBasePath+"/aipo")
};
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
dojo._xdResourceLoaded({depends:[["provide","dijit._base.focus"],["provide","dijit._base.manager"],["provide","dijit._base.place"],["provide","dijit._base.window"],["provide","dijit._base.popup"],["provide","dijit._base.scroll"],["provide","dijit._base.sniff"],["provide","dijit._base.bidi"],["provide","dijit._base.typematic"],["provide","dijit._base.wai"],["provide","dijit._base"],["provide","dojo.date.stamp"],["provide","dojo.parser"],["provide","dijit._Widget"],["provide","dojo.string"],["provide","dijit._Templated"],["provide","dijit._Container"],["provide","dijit.layout._LayoutWidget"],["provide","dijit.form._FormWidget"],["provide","dijit.dijit"],["provide","dojo.i18n"],["provide","dojo.cldr.supplemental"],["provide","dojo.date"],["provide","dojo.regexp"],["provide","dojo.date.locale"],["provide","dijit._Calendar"],["provide","dijit.layout.ContentPane"],["provide","dijit.form.Form"],["provide","dijit.Dialog"],["provide","dijit.Toolbar"],["provide","dijit.form.Button"],["provide","dijit.Menu"],["provide","dijit.Tooltip"],["provide","dijit.form.TextBox"],["provide","dijit.form.ValidationTextBox"],["requireLocalization","dijit.form","validate",null,"ko,zh-cn,zh,ja,zh-tw,ru,it,hu,ROOT,fr,pt,pl,es,de,cs","cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,ROOT,zh,zh-cn,zh-tw","cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,ROOT,zh,zh-cn,zh-tw"],["provide","dijit.form.ComboBox"],["requireLocalization","dijit.form","ComboBox",null,"ko,zh,ja,zh-tw,ru,it,hu,ROOT,fr,pt,pl,es,de,cs","ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw","ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw"],["i18n._preloadLocalizations","dijit.nls.dijit-all",["es-es","es","hu","it-it","de","pt-br","pl","fr-fr","zh-cn","pt","en-us","zh","ru","xx","fr","zh-tw","it","cs","en-gb","de-de","ja-jp","ko-kr","ko","en","ROOT","ja"]]],defineResource:function(dojo){if(!dojo._hasResource["dijit._base.focus"]){dojo._hasResource["dijit._base.focus"]=true;
dojo.provide("dijit._base.focus");
dojo.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){var _window=dojo.global;
var _document=dojo.doc;
if(_document.selection){return !_document.selection.createRange().text
}else{if(_window.getSelection){var selection=_window.getSelection();
if(dojo.isString(selection)){return !selection
}else{return selection.isCollapsed||!selection.toString()
}}}},getBookmark:function(){var bookmark,selection=dojo.doc.selection;
if(selection){var range=selection.createRange();
if(selection.type.toUpperCase()=="CONTROL"){bookmark=range.length?dojo._toArray(range):null
}else{bookmark=range.getBookmark()
}}else{if(dojo.global.getSelection){selection=dojo.global.getSelection();
if(selection){var range=selection.getRangeAt(0);
bookmark=range.cloneRange()
}}else{console.debug("No idea how to store the current selection for this browser!")
}}return bookmark
},moveToBookmark:function(bookmark){var _document=dojo.doc;
if(_document.selection){var range;
if(dojo.isArray(bookmark)){range=_document.body.createControlRange();
dojo.forEach(bookmark,range.addElement)
}else{range=_document.selection.createRange();
range.moveToBookmark(bookmark)
}range.select()
}else{var selection=dojo.global.getSelection&&dojo.global.getSelection();
if(selection&&selection.removeAllRanges){selection.removeAllRanges();
selection.addRange(bookmark)
}else{console.debug("No idea how to restore selection for this browser!")
}}},getFocus:function(menu,openedForWindow){return{node:menu&&dojo.isDescendant(dijit._curFocus,menu.domNode)?dijit._prevFocus:dijit._curFocus,bookmark:!dojo.withGlobal(openedForWindow||dojo.global,dijit.isCollapsed)?dojo.withGlobal(openedForWindow||dojo.global,dijit.getBookmark):null,openedForWindow:openedForWindow}
},focus:function(handle){if(!handle){return 
}var node="node" in handle?handle.node:handle,bookmark=handle.bookmark,openedForWindow=handle.openedForWindow;
if(node){var focusNode=(node.tagName.toLowerCase()=="iframe")?node.contentWindow:node;
if(focusNode&&focusNode.focus){try{focusNode.focus()
}catch(e){}}dijit._onFocusNode(node)
}if(bookmark&&dojo.withGlobal(openedForWindow||dojo.global,dijit.isCollapsed)){if(openedForWindow){openedForWindow.focus()
}try{dojo.withGlobal(openedForWindow||dojo.global,moveToBookmark,null,[bookmark])
}catch(e){}}},_activeStack:[],registerWin:function(targetWindow){if(!targetWindow){targetWindow=window
}dojo.connect(targetWindow.document,"onmousedown",null,function(evt){dijit._justMouseDowned=true;
setTimeout(function(){dijit._justMouseDowned=false
},0);
dijit._onTouchNode(evt.target||evt.srcElement)
});
var body=targetWindow.document.body||targetWindow.document.getElementsByTagName("body")[0];
if(body){if(dojo.isIE){body.attachEvent("onactivate",function(evt){if(evt.srcElement.tagName.toLowerCase()!="body"){dijit._onFocusNode(evt.srcElement)
}});
body.attachEvent("ondeactivate",function(evt){dijit._onBlurNode(evt.srcElement)
})
}else{body.addEventListener("focus",function(evt){dijit._onFocusNode(evt.target)
},true);
body.addEventListener("blur",function(evt){dijit._onBlurNode(evt.target)
},true)
}}body=null
},_onBlurNode:function(node){dijit._prevFocus=dijit._curFocus;
dijit._curFocus=null;
var w=dijit.getEnclosingWidget(node);
if(w&&w._setStateClass){w._focused=false;
w._setStateClass()
}if(dijit._justMouseDowned){return 
}if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer)
}dijit._clearActiveWidgetsTimer=setTimeout(function(){delete dijit._clearActiveWidgetsTimer;
dijit._setStack([])
},100)
},_onTouchNode:function(node){if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer);
delete dijit._clearActiveWidgetsTimer
}var newStack=[];
try{while(node){if(node.dijitPopupParent){node=dijit.byId(node.dijitPopupParent).domNode
}else{if(node.tagName&&node.tagName.toLowerCase()=="body"){if(node===dojo.body()){break
}node=dojo.query("iframe").filter(function(iframe){return iframe.contentDocument.body===node
})[0]
}else{var id=node.getAttribute&&node.getAttribute("widgetId");
if(id){newStack.unshift(id)
}node=node.parentNode
}}}}catch(e){}dijit._setStack(newStack)
},_onFocusNode:function(node){if(node&&node.tagName&&node.tagName.toLowerCase()=="body"){return 
}dijit._onTouchNode(node);
if(node==dijit._curFocus){return 
}dijit._prevFocus=dijit._curFocus;
dijit._curFocus=node;
dojo.publish("focusNode",[node]);
var w=dijit.getEnclosingWidget(node);
if(w&&w._setStateClass){w._focused=true;
w._setStateClass()
}},_setStack:function(newStack){var oldStack=dijit._activeStack;
dijit._activeStack=newStack;
for(var nCommon=0;
nCommon<Math.min(oldStack.length,newStack.length);
nCommon++){if(oldStack[nCommon]!=newStack[nCommon]){break
}}for(var i=oldStack.length-1;
i>=nCommon;
i--){var widget=dijit.byId(oldStack[i]);
if(widget){dojo.publish("widgetBlur",[widget]);
if(widget._onBlur){widget._onBlur()
}}}for(var i=nCommon;
i<newStack.length;
i++){var widget=dijit.byId(newStack[i]);
if(widget){dojo.publish("widgetFocus",[widget]);
if(widget._onFocus){widget._onFocus()
}}}}});
dojo.addOnLoad(dijit.registerWin)
}if(!dojo._hasResource["dijit._base.manager"]){dojo._hasResource["dijit._base.manager"]=true;
dojo.provide("dijit._base.manager");
dojo.declare("dijit.WidgetSet",null,{constructor:function(){this._hash={}
},add:function(widget){if(this._hash[widget.id]){throw new Error("Tried to register widget with id=="+widget.id+" but that id is already registered")
}this._hash[widget.id]=widget
},remove:function(id){delete this._hash[id]
},forEach:function(func){for(var id in this._hash){func(this._hash[id])
}},filter:function(filter){var res=new dijit.WidgetSet();
this.forEach(function(widget){if(filter(widget)){res.add(widget)
}});
return res
},byId:function(id){return this._hash[id]
},byClass:function(cls){return this.filter(function(widget){return widget.declaredClass==cls
})
}});
dijit.registry=new dijit.WidgetSet();
dijit._widgetTypeCtr={};
dijit.getUniqueId=function(widgetType){var id;
do{id=widgetType+"_"+(dijit._widgetTypeCtr[widgetType]!==undefined?++dijit._widgetTypeCtr[widgetType]:dijit._widgetTypeCtr[widgetType]=0)
}while(dijit.byId(id));
return id
};
if(dojo.isIE){dojo.addOnUnload(function(){dijit.registry.forEach(function(widget){widget.destroy()
})
})
}dijit.byId=function(id){return(dojo.isString(id))?dijit.registry.byId(id):id
};
dijit.byNode=function(node){return dijit.registry.byId(node.getAttribute("widgetId"))
};
dijit.getEnclosingWidget=function(node){while(node){if(node.getAttribute&&node.getAttribute("widgetId")){return dijit.registry.byId(node.getAttribute("widgetId"))
}node=node.parentNode
}return null
}
}if(!dojo._hasResource["dijit._base.place"]){dojo._hasResource["dijit._base.place"]=true;
dojo.provide("dijit._base.place");
dijit.getViewport=function(){var _window=dojo.global;
var _document=dojo.doc;
var w=0,h=0;
if(dojo.isMozilla){var minw,minh,maxw,maxh;
if(_document.body.clientWidth>_document.documentElement.clientWidth){minw=_document.documentElement.clientWidth;
maxw=_document.body.clientWidth
}else{maxw=_document.documentElement.clientWidth;
minw=_document.body.clientWidth
}if(_document.body.clientHeight>_document.documentElement.clientHeight){minh=_document.documentElement.clientHeight;
maxh=_document.body.clientHeight
}else{maxh=_document.documentElement.clientHeight;
minh=_document.body.clientHeight
}w=(maxw>_window.innerWidth)?minw:maxw;
h=(maxh>_window.innerHeight)?minh:maxh
}else{if(!dojo.isOpera&&_window.innerWidth){w=_window.innerWidth;
h=_window.innerHeight
}else{if(dojo.isIE&&_document.documentElement&&_document.documentElement.clientHeight){w=_document.documentElement.clientWidth;
h=_document.documentElement.clientHeight
}else{if(dojo.body().clientWidth){w=dojo.body().clientWidth;
h=dojo.body().clientHeight
}}}}var scroll=dojo._docScroll();
return{w:w,h:h,l:scroll.x,t:scroll.y}
};
dijit.placeOnScreen=function(node,pos,corners,tryOnly){var choices=dojo.map(corners,function(corner){return{corner:corner,pos:pos}
});
return dijit._place(node,choices)
};
dijit._place=function(node,choices,layoutNode){var view=dijit.getViewport();
if(!node.parentNode||String(node.parentNode.tagName).toLowerCase()!="body"){dojo.body().appendChild(node)
}var best=null;
for(var i=0;
i<choices.length;
i++){var corner=choices[i].corner;
var pos=choices[i].pos;
if(layoutNode){layoutNode(corner)
}var oldDisplay=node.style.display;
var oldVis=node.style.visibility;
node.style.visibility="hidden";
node.style.display="";
var mb=dojo.marginBox(node);
node.style.display=oldDisplay;
node.style.visibility=oldVis;
var startX=(corner.charAt(1)=="L"?pos.x:Math.max(view.l,pos.x-mb.w)),startY=(corner.charAt(0)=="T"?pos.y:Math.max(view.t,pos.y-mb.h)),endX=(corner.charAt(1)=="L"?Math.min(view.l+view.w,startX+mb.w):pos.x),endY=(corner.charAt(0)=="T"?Math.min(view.t+view.h,startY+mb.h):pos.y),width=endX-startX,height=endY-startY,overflow=(mb.w-width)+(mb.h-height);
if(best==null||overflow<best.overflow){best={corner:corner,aroundCorner:choices[i].aroundCorner,x:startX,y:startY,w:width,h:height,overflow:overflow}
}if(overflow==0){break
}}node.style.left=best.x+"px";
node.style.top=best.y+"px";
return best
};
dijit.placeOnScreenAroundElement=function(node,aroundNode,aroundCorners,layoutNode){aroundNode=dojo.byId(aroundNode);
var oldDisplay=aroundNode.style.display;
aroundNode.style.display="";
var aroundNodeW=aroundNode.offsetWidth;
var aroundNodeH=aroundNode.offsetHeight;
var aroundNodePos=dojo.coords(aroundNode,true);
aroundNode.style.display=oldDisplay;
var choices=[];
for(var nodeCorner in aroundCorners){choices.push({aroundCorner:nodeCorner,corner:aroundCorners[nodeCorner],pos:{x:aroundNodePos.x+(nodeCorner.charAt(1)=="L"?0:aroundNodeW),y:aroundNodePos.y+(nodeCorner.charAt(0)=="T"?0:aroundNodeH)}})
}return dijit._place(node,choices,layoutNode)
}
}if(!dojo._hasResource["dijit._base.window"]){dojo._hasResource["dijit._base.window"]=true;
dojo.provide("dijit._base.window");
dijit.getDocumentWindow=function(doc){if(dojo.isSafari&&!doc._parentWindow){var fix=function(win){win.document._parentWindow=win;
for(var i=0;
i<win.frames.length;
i++){fix(win.frames[i])
}};
fix(window.top)
}if(dojo.isIE&&window!==document.parentWindow&&!doc._parentWindow){doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win
}return doc._parentWindow||doc.parentWindow||doc.defaultView
}
}if(!dojo._hasResource["dijit._base.popup"]){dojo._hasResource["dijit._base.popup"]=true;
dojo.provide("dijit._base.popup");
dijit.popup=new function(){var stack=[],beginZIndex=1000,idGen=1;
this.open=function(args){var widget=args.popup,orient=args.orient||{BL:"TL",TL:"BL"},around=args.around,id=(args.around&&args.around.id)?(args.around.id+"_dropdown"):("popup_"+idGen++);
var wrapper=dojo.doc.createElement("div");
wrapper.id=id;
wrapper.className="dijitPopup";
wrapper.style.zIndex=beginZIndex+stack.length;
wrapper.style.visibility="hidden";
if(args.parent){wrapper.dijitPopupParent=args.parent.id
}dojo.body().appendChild(wrapper);
widget.domNode.style.display="";
wrapper.appendChild(widget.domNode);
var iframe=new dijit.BackgroundIframe(wrapper);
var best=around?dijit.placeOnScreenAroundElement(wrapper,around,orient,widget.orient?dojo.hitch(widget,"orient"):null):dijit.placeOnScreen(wrapper,args,orient=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"]);
wrapper.style.visibility="visible";
var handlers=[];
function getTopPopup(){for(var pi=stack.length-1;
pi>0&&stack[pi].parent===stack[pi-1].widget;
pi--){}return stack[pi]
}handlers.push(dojo.connect(wrapper,"onkeypress",this,function(evt){if(evt.keyCode==dojo.keys.ESCAPE&&args.onCancel){args.onCancel()
}else{if(evt.keyCode==dojo.keys.TAB){dojo.stopEvent(evt);
var topPopup=getTopPopup();
if(topPopup&&topPopup.onCancel){topPopup.onCancel()
}}}}));
if(widget.onCancel){handlers.push(dojo.connect(widget,"onCancel",null,args.onCancel))
}handlers.push(dojo.connect(widget,widget.onExecute?"onExecute":"onChange",null,function(){var topPopup=getTopPopup();
if(topPopup&&topPopup.onExecute){topPopup.onExecute()
}}));
stack.push({wrapper:wrapper,iframe:iframe,widget:widget,parent:args.parent,onExecute:args.onExecute,onCancel:args.onCancel,onClose:args.onClose,handlers:handlers});
if(widget.onOpen){widget.onOpen(best)
}return best
};
this.close=function(popup){while(dojo.some(stack,function(elem){return elem.widget==popup
})){var top=stack.pop(),wrapper=top.wrapper,iframe=top.iframe,widget=top.widget,onClose=top.onClose;
if(widget.onClose){widget.onClose()
}dojo.forEach(top.handlers,dojo.disconnect);
if(!widget||!widget.domNode){return 
}dojo.style(widget.domNode,"display","none");
dojo.body().appendChild(widget.domNode);
iframe.destroy();
dojo._destroyElement(wrapper);
if(onClose){onClose()
}}}
}();
dijit._frames=new function(){var queue=[];
this.pop=function(){var iframe;
if(queue.length){iframe=queue.pop();
iframe.style.display=""
}else{if(dojo.isIE){var html="<iframe src='javascript:\"\"' style='position: absolute; left: 0px; top: 0px;z-index: -1; filter:Alpha(Opacity=\"0\");'>";
iframe=dojo.doc.createElement(html)
}else{var iframe=dojo.doc.createElement("iframe");
iframe.src='javascript:""';
iframe.className="dijitBackgroundIframe"
}iframe.tabIndex=-1;
dojo.body().appendChild(iframe)
}return iframe
};
this.push=function(iframe){iframe.style.display="";
if(dojo.isIE){iframe.style.removeExpression("width");
iframe.style.removeExpression("height")
}queue.push(iframe)
}
}();
if(dojo.isIE&&dojo.isIE<7){dojo.addOnLoad(function(){var f=dijit._frames;
dojo.forEach([f.pop()],f.push)
})
}dijit.BackgroundIframe=function(node){if(!node.id){throw new Error("no id")
}if((dojo.isIE&&dojo.isIE<7)||(dojo.isFF&&dojo.isFF<3&&dojo.hasClass(dojo.body(),"dijit_a11y"))){var iframe=dijit._frames.pop();
node.appendChild(iframe);
if(dojo.isIE){iframe.style.setExpression("width","document.getElementById('"+node.id+"').offsetWidth");
iframe.style.setExpression("height","document.getElementById('"+node.id+"').offsetHeight")
}this.iframe=iframe
}};
dojo.extend(dijit.BackgroundIframe,{destroy:function(){if(this.iframe){dijit._frames.push(this.iframe);
delete this.iframe
}}})
}if(!dojo._hasResource["dijit._base.scroll"]){dojo._hasResource["dijit._base.scroll"]=true;
dojo.provide("dijit._base.scroll");
dijit.scrollIntoView=function(node){if(dojo.isIE){if(dojo.marginBox(node.parentNode).h<=node.parentNode.scrollHeight){node.scrollIntoView(false)
}}else{if(dojo.isMozilla){node.scrollIntoView(false)
}else{var parent=node.parentNode;
var parentBottom=parent.scrollTop+dojo.marginBox(parent).h;
var nodeBottom=node.offsetTop+dojo.marginBox(node).h;
if(parentBottom<nodeBottom){parent.scrollTop+=(nodeBottom-parentBottom)
}else{if(parent.scrollTop>node.offsetTop){parent.scrollTop-=(parent.scrollTop-node.offsetTop)
}}}}}
}if(!dojo._hasResource["dijit._base.sniff"]){dojo._hasResource["dijit._base.sniff"]=true;
dojo.provide("dijit._base.sniff");
(function(){var d=dojo;
var ie=d.isIE;
var opera=d.isOpera;
var maj=Math.floor;
var classes={dj_ie:ie,dj_ie6:maj(ie)==6,dj_ie7:maj(ie)==7,dj_iequirks:ie&&d.isQuirks,dj_opera:opera,dj_opera8:maj(opera)==8,dj_opera9:maj(opera)==9,dj_khtml:d.isKhtml,dj_safari:d.isSafari,dj_gecko:d.isMozilla};
for(var p in classes){if(classes[p]){var html=dojo.doc.documentElement;
if(html.className){html.className+=" "+p
}else{html.className=p
}}}})()
}if(!dojo._hasResource["dijit._base.bidi"]){dojo._hasResource["dijit._base.bidi"]=true;
dojo.provide("dijit._base.bidi");
dojo.addOnLoad(function(){if(!dojo._isBodyLtr()){dojo.addClass(dojo.body(),"dijitRtl")
}})
}if(!dojo._hasResource["dijit._base.typematic"]){dojo._hasResource["dijit._base.typematic"]=true;
dojo.provide("dijit._base.typematic");
dijit.typematic={_fireEventAndReload:function(){this._timer=null;
this._callback(++this._count,this._node,this._evt);
this._currentTimeout=(this._currentTimeout<0)?this._initialDelay:((this._subsequentDelay>1)?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay));
this._timer=setTimeout(dojo.hitch(this,"_fireEventAndReload"),this._currentTimeout)
},trigger:function(evt,_this,node,callback,obj,subsequentDelay,initialDelay){if(obj!=this._obj){this.stop();
this._initialDelay=initialDelay||500;
this._subsequentDelay=subsequentDelay||0.9;
this._obj=obj;
this._evt=evt;
this._node=node;
this._currentTimeout=-1;
this._count=-1;
this._callback=dojo.hitch(_this,callback);
this._fireEventAndReload()
}},stop:function(){if(this._timer){clearTimeout(this._timer);
this._timer=null
}if(this._obj){this._callback(-1,this._node,this._evt);
this._obj=null
}},addKeyListener:function(node,keyObject,_this,callback,subsequentDelay,initialDelay){return[dojo.connect(node,"onkeypress",this,function(evt){if(evt.keyCode==keyObject.keyCode&&(!keyObject.charCode||keyObject.charCode==evt.charCode)&&(keyObject.ctrlKey===undefined||keyObject.ctrlKey==evt.ctrlKey)&&(keyObject.altKey===undefined||keyObject.altKey==evt.ctrlKey)&&(keyObject.shiftKey===undefined||keyObject.shiftKey==evt.ctrlKey)){dojo.stopEvent(evt);
dijit.typematic.trigger(keyObject,_this,node,callback,keyObject,subsequentDelay,initialDelay)
}else{if(dijit.typematic._obj==keyObject){dijit.typematic.stop()
}}}),dojo.connect(node,"onkeyup",this,function(evt){if(dijit.typematic._obj==keyObject){dijit.typematic.stop()
}})]
},addMouseListener:function(node,_this,callback,subsequentDelay,initialDelay){var dc=dojo.connect;
return[dc(node,"mousedown",this,function(evt){dojo.stopEvent(evt);
dijit.typematic.trigger(evt,_this,node,callback,node,subsequentDelay,initialDelay)
}),dc(node,"mouseup",this,function(evt){dojo.stopEvent(evt);
dijit.typematic.stop()
}),dc(node,"mouseout",this,function(evt){dojo.stopEvent(evt);
dijit.typematic.stop()
}),dc(node,"mousemove",this,function(evt){dojo.stopEvent(evt)
}),dc(node,"dblclick",this,function(evt){dojo.stopEvent(evt);
if(dojo.isIE){dijit.typematic.trigger(evt,_this,node,callback,node,subsequentDelay,initialDelay);
setTimeout(dijit.typematic.stop,50)
}})]
},addListener:function(mouseNode,keyNode,keyObject,_this,callback,subsequentDelay,initialDelay){return this.addKeyListener(keyNode,keyObject,_this,callback,subsequentDelay,initialDelay).concat(this.addMouseListener(mouseNode,_this,callback,subsequentDelay,initialDelay))
}}
}if(!dojo._hasResource["dijit._base.wai"]){dojo._hasResource["dijit._base.wai"]=true;
dojo.provide("dijit._base.wai");
dijit.wai={onload:function(){var div=document.createElement("div");
div.id="a11yTestNode";
div.style.cssText='border: 1px solid;border-color:red green;position: absolute;height: 5px;top: -999px;background-image: url("'+dojo.moduleUrl("dijit","form/templates/blank.gif")+'");';
dojo.body().appendChild(div);
function check(){var cs=dojo.getComputedStyle(div);
if(cs){var bkImg=cs.backgroundImage;
var needsA11y=(cs.borderTopColor==cs.borderRightColor)||(bkImg!=null&&(bkImg=="none"||bkImg=="url(invalid-url:)"));
dojo[needsA11y?"addClass":"removeClass"](dojo.body(),"dijit_a11y")
}}check();
if(dojo.isIE){setInterval(check,4000)
}}};
if(dojo.isIE||dojo.isMoz){dojo._loaders.unshift(dijit.wai.onload)
}dojo.mixin(dijit,{hasWaiRole:function(elem){if(elem.hasAttribute){return elem.hasAttribute("role")
}else{return elem.getAttribute("role")?true:false
}},getWaiRole:function(elem){var value=elem.getAttribute("role");
if(value){var prefixEnd=value.indexOf(":");
return prefixEnd==-1?value:value.substring(prefixEnd+1)
}else{return""
}},setWaiRole:function(elem,role){if(dojo.isFF&&dojo.isFF<3){elem.setAttribute("role","wairole:"+role)
}else{elem.setAttribute("role",role)
}},removeWaiRole:function(elem){elem.removeAttribute("role")
},hasWaiState:function(elem,state){if(dojo.isFF&&dojo.isFF<3){return elem.hasAttributeNS("http://www.w3.org/2005/07/aaa",state)
}else{if(elem.hasAttribute){return elem.hasAttribute("aria-"+state)
}else{return elem.getAttribute("aria-"+state)?true:false
}}},getWaiState:function(elem,state){if(dojo.isFF&&dojo.isFF<3){return elem.getAttributeNS("http://www.w3.org/2005/07/aaa",state)
}else{var value=elem.getAttribute("aria-"+state);
return value?value:""
}},setWaiState:function(elem,state,value){if(dojo.isFF&&dojo.isFF<3){elem.setAttributeNS("http://www.w3.org/2005/07/aaa","aaa:"+state,value)
}else{elem.setAttribute("aria-"+state,value)
}},removeWaiState:function(elem,state){if(dojo.isFF&&dojo.isFF<3){elem.removeAttributeNS("http://www.w3.org/2005/07/aaa",state)
}else{elem.removeAttribute("aria-"+state)
}}})
}if(!dojo._hasResource["dijit._base"]){dojo._hasResource["dijit._base"]=true;
dojo.provide("dijit._base")
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
}if(!dojo._hasResource["dijit._Widget"]){dojo._hasResource["dijit._Widget"]=true;
dojo.provide("dijit._Widget");
dojo.declare("dijit._Widget",null,{id:"",lang:"",dir:"","class":"",style:"",title:"",srcNodeRef:null,domNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},postscript:function(params,srcNodeRef){this.create(params,srcNodeRef)
},create:function(params,srcNodeRef){this.srcNodeRef=dojo.byId(srcNodeRef);
this._connects=[];
this._attaches=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){this.id=this.srcNodeRef.id
}if(params){dojo.mixin(this,params)
}this.postMixInProperties();
if(!this.id){this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"))
}dijit.registry.add(this);
this.buildRendering();
if(this.domNode){for(var attr in this.attributeMap){var mapNode=this[this.attributeMap[attr]||"domNode"];
var value=this[attr];
if(typeof value!="object"&&(value!==""||(params&&params[attr]))){switch(attr){case"class":dojo.addClass(mapNode,value);
break;
case"style":if(mapNode.style.cssText){mapNode.style.cssText+="; "+value
}else{mapNode.style.cssText=value
}break;
default:mapNode.setAttribute(attr,value)
}}}}if(this.domNode){this.domNode.setAttribute("widgetId",this.id)
}this.postCreate();
if(this.srcNodeRef&&!this.srcNodeRef.parentNode){delete this.srcNodeRef
}},postMixInProperties:function(){},buildRendering:function(){this.domNode=this.srcNodeRef||dojo.doc.createElement("div")
},postCreate:function(){},startup:function(){},destroyRecursive:function(finalize){this.destroyDescendants();
this.destroy()
},destroy:function(finalize){this.uninitialize();
dojo.forEach(this._connects,function(array){dojo.forEach(array,dojo.disconnect)
});
this.destroyRendering(finalize);
dijit.registry.remove(this.id)
},destroyRendering:function(finalize){if(this.bgIframe){this.bgIframe.destroy();
delete this.bgIframe
}if(this.domNode){dojo._destroyElement(this.domNode);
delete this.domNode
}if(this.srcNodeRef){dojo._destroyElement(this.srcNodeRef);
delete this.srcNodeRef
}},destroyDescendants:function(){dojo.forEach(this.getDescendants(),function(widget){widget.destroy()
})
},uninitialize:function(){return false
},toString:function(){return"[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]"
},getDescendants:function(){var list=dojo.query("[widgetId]",this.domNode);
return list.map(dijit.byNode)
},nodesWithKeyClick:["input","button"],connect:function(obj,event,method){var handles=[];
if(event=="ondijitclick"){var w=this;
if(!this.nodesWithKeyClick[obj.nodeName]){handles.push(dojo.connect(obj,"onkeydown",this,function(e){if(e.keyCode==dojo.keys.ENTER){return(dojo.isString(method))?w[method](e):method.call(w,e)
}else{if(e.keyCode==dojo.keys.SPACE){dojo.stopEvent(e)
}}}));
handles.push(dojo.connect(obj,"onkeyup",this,function(e){if(e.keyCode==dojo.keys.SPACE){return dojo.isString(method)?w[method](e):method.call(w,e)
}}))
}event="onclick"
}handles.push(dojo.connect(obj,event,this,method));
this._connects.push(handles);
return handles
},disconnect:function(handles){for(var i=0;
i<this._connects.length;
i++){if(this._connects[i]==handles){dojo.forEach(handles,dojo.disconnect);
this._connects.splice(i,1);
return 
}}},isLeftToRight:function(){if(typeof this._ltr=="undefined"){this._ltr=dojo.getComputedStyle(this.domNode).direction!="rtl"
}return this._ltr
},isFocusable:function(){return this.focus&&(dojo.style(this.domNode,"display")!="none")
}})
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
}if(!dojo._hasResource["dijit._Templated"]){dojo._hasResource["dijit._Templated"]=true;
dojo.provide("dijit._Templated");
dojo.declare("dijit._Templated",null,{templateNode:null,templateString:null,templatePath:null,widgetsInTemplate:false,containerNode:null,_skipNodeCache:false,buildRendering:function(){var cached=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var node;
if(dojo.isString(cached)){var className=this.declaredClass,_this=this;
var tstr=dojo.string.substitute(cached,this,function(value,key){if(key.charAt(0)=="!"){value=_this[key.substr(1)]
}if(typeof value=="undefined"){throw new Error(className+" template:"+key)
}if(!value){return""
}return key.charAt(0)=="!"?value:value.toString().replace(/"/g,"&quot;")
},this);
node=dijit._Templated._createNodesFromText(tstr)[0]
}else{node=cached.cloneNode(true)
}this._attachTemplateNodes(node);
var source=this.srcNodeRef;
if(source&&source.parentNode){source.parentNode.replaceChild(node,source)
}this.domNode=node;
if(this.widgetsInTemplate){var childWidgets=dojo.parser.parse(node);
this._attachTemplateNodes(childWidgets,function(n,p){return n[p]
})
}this._fillContent(source)
},_fillContent:function(source){var dest=this.containerNode;
if(source&&dest){while(source.hasChildNodes()){dest.appendChild(source.firstChild)
}}},_attachTemplateNodes:function(rootNode,getAttrFunc){getAttrFunc=getAttrFunc||function(n,p){return n.getAttribute(p)
};
var nodes=dojo.isArray(rootNode)?rootNode:(rootNode.all||rootNode.getElementsByTagName("*"));
var x=dojo.isArray(rootNode)?0:-1;
for(;
x<nodes.length;
x++){var baseNode=(x==-1)?rootNode:nodes[x];
if(this.widgetsInTemplate&&getAttrFunc(baseNode,"dojoType")){continue
}var attachPoint=getAttrFunc(baseNode,"dojoAttachPoint");
if(attachPoint){var point,points=attachPoint.split(/\s*,\s*/);
while(point=points.shift()){if(dojo.isArray(this[point])){this[point].push(baseNode)
}else{this[point]=baseNode
}}}var attachEvent=getAttrFunc(baseNode,"dojoAttachEvent");
if(attachEvent){var event,events=attachEvent.split(/\s*,\s*/);
var trim=dojo.trim;
while(event=events.shift()){if(event){var thisFunc=null;
if(event.indexOf(":")!=-1){var funcNameArr=event.split(":");
event=trim(funcNameArr[0]);
thisFunc=trim(funcNameArr[1])
}else{event=trim(event)
}if(!thisFunc){thisFunc=event
}this.connect(baseNode,event,thisFunc)
}}}var role=getAttrFunc(baseNode,"waiRole");
if(role){dijit.setWaiRole(baseNode,role)
}var values=getAttrFunc(baseNode,"waiState");
if(values){dojo.forEach(values.split(/\s*,\s*/),function(stateValue){if(stateValue.indexOf("-")!=-1){var pair=stateValue.split("-");
dijit.setWaiState(baseNode,pair[0],pair[1])
}})
}}}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(templatePath,templateString,alwaysUseString){var tmplts=dijit._Templated._templateCache;
var key=templateString||templatePath;
var cached=tmplts[key];
if(cached){return cached
}if(!templateString){templateString=dijit._Templated._sanitizeTemplateString(dojo._getText(templatePath))
}templateString=dojo.string.trim(templateString);
if(templateString.match(/\$\{([^\}]+)\}/g)||alwaysUseString){return(tmplts[key]=templateString)
}else{return(tmplts[key]=dijit._Templated._createNodesFromText(templateString)[0])
}};
dijit._Templated._sanitizeTemplateString=function(tString){if(tString){tString=tString.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var matches=tString.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(matches){tString=matches[1]
}}else{tString=""
}return tString
};
if(dojo.isIE){dojo.addOnUnload(function(){var cache=dijit._Templated._templateCache;
for(var key in cache){var value=cache[key];
if(!isNaN(value.nodeType)){dojo._destroyElement(value)
}delete cache[key]
}})
}(function(){var tagMap={cell:{re:/^<t[dh][\s\r\n>]/i,pre:"<table><tbody><tr>",post:"</tr></tbody></table>"},row:{re:/^<tr[\s\r\n>]/i,pre:"<table><tbody>",post:"</tbody></table>"},section:{re:/^<(thead|tbody|tfoot)[\s\r\n>]/i,pre:"<table>",post:"</table>"}};
var tn;
dijit._Templated._createNodesFromText=function(text){if(!tn){tn=dojo.doc.createElement("div");
tn.style.display="none";
dojo.body().appendChild(tn)
}var tableType="none";
var rtext=text.replace(/^\s+/,"");
for(var type in tagMap){var map=tagMap[type];
if(map.re.test(rtext)){tableType=type;
text=map.pre+text+map.post;
break
}}tn.innerHTML=text;
if(tn.normalize){tn.normalize()
}var tag={cell:"tr",row:"tbody",section:"table"}[tableType];
var _parent=(typeof tag!="undefined")?tn.getElementsByTagName(tag)[0]:tn;
var nodes=[];
while(_parent.firstChild){nodes.push(_parent.removeChild(_parent.firstChild))
}tn.innerHTML="";
return nodes
}
})();
dojo.extend(dijit._Widget,{dojoAttachEvent:"",dojoAttachPoint:"",waiRole:"",waiState:""})
}if(!dojo._hasResource["dijit._Container"]){dojo._hasResource["dijit._Container"]=true;
dojo.provide("dijit._Container");
dojo.declare("dijit._Contained",null,{getParent:function(){for(var p=this.domNode.parentNode;
p;
p=p.parentNode){var id=p.getAttribute&&p.getAttribute("widgetId");
if(id){var parent=dijit.byId(id);
return parent.isContainer?parent:null
}}return null
},_getSibling:function(which){var node=this.domNode;
do{node=node[which+"Sibling"]
}while(node&&node.nodeType!=1);
if(!node){return null
}var id=node.getAttribute("widgetId");
return dijit.byId(id)
},getPreviousSibling:function(){return this._getSibling("previous")
},getNextSibling:function(){return this._getSibling("next")
}});
dojo.declare("dijit._Container",null,{isContainer:true,addChild:function(widget,insertIndex){if(insertIndex===undefined){insertIndex="last"
}var refNode=this.containerNode||this.domNode;
if(insertIndex&&typeof insertIndex=="number"){var children=dojo.query("> [widgetid]",refNode);
if(children&&children.length>=insertIndex){refNode=children[insertIndex-1];
insertIndex="after"
}}dojo.place(widget.domNode,refNode,insertIndex);
if(this._started&&!widget._started){widget.startup()
}},removeChild:function(widget){var node=widget.domNode;
node.parentNode.removeChild(node)
},_nextElement:function(node){do{node=node.nextSibling
}while(node&&node.nodeType!=1);
return node
},_firstElement:function(node){node=node.firstChild;
if(node&&node.nodeType!=1){node=this._nextElement(node)
}return node
},getChildren:function(){return dojo.query("> [widgetId]",this.containerNode||this.domNode).map(dijit.byNode)
},hasChildren:function(){var cn=this.containerNode||this.domNode;
return !!this._firstElement(cn)
},_getSiblingOfChild:function(child,dir){var node=child.domNode;
var which=(dir>0?"nextSibling":"previousSibling");
do{node=node[which]
}while(node&&(node.nodeType!=1||!dijit.byNode(node)));
return node?dijit.byNode(node):null
}});
dojo.declare("dijit._KeyNavContainer",[dijit._Container],{_keyNavCodes:{},connectKeyNavHandlers:function(prevKeyCodes,nextKeyCodes){var keyCodes=this._keyNavCodes={};
var prev=dojo.hitch(this,this.focusPrev);
var next=dojo.hitch(this,this.focusNext);
dojo.forEach(prevKeyCodes,function(code){keyCodes[code]=prev
});
dojo.forEach(nextKeyCodes,function(code){keyCodes[code]=next
});
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
if(dojo.isIE){this.connect(this.domNode,"onactivate","_onContainerFocus");
this.connect(this.domNode,"ondeactivate","_onContainerBlur")
}else{this.connect(this.domNode,"onfocus","_onContainerFocus");
this.connect(this.domNode,"onblur","_onContainerBlur")
}},startupKeyNavChildren:function(){dojo.forEach(this.getChildren(),dojo.hitch(this,"_setTabIndexMinusOne"))
},addChild:function(widget,insertIndex){dijit._KeyNavContainer.superclass.addChild.apply(this,arguments);
this._setTabIndexMinusOne(widget)
},focus:function(){this.focusFirstChild()
},focusFirstChild:function(){this.focusChild(this._getFirstFocusableChild())
},focusNext:function(){if(this.focusedChild&&this.focusedChild.hasNextFocalNode&&this.focusedChild.hasNextFocalNode()){this.focusedChild.focusNext();
return 
}var child=this._getNextFocusableChild(this.focusedChild,1);
if(child.getFocalNodes){this.focusChild(child,child.getFocalNodes()[0])
}else{this.focusChild(child)
}},focusPrev:function(){if(this.focusedChild&&this.focusedChild.hasPrevFocalNode&&this.focusedChild.hasPrevFocalNode()){this.focusedChild.focusPrev();
return 
}var child=this._getNextFocusableChild(this.focusedChild,-1);
if(child.getFocalNodes){var nodes=child.getFocalNodes();
this.focusChild(child,nodes[nodes.length-1])
}else{this.focusChild(child)
}},focusChild:function(widget,node){if(widget){if(this.focusedChild&&widget!==this.focusedChild){this._onChildBlur(this.focusedChild)
}this.focusedChild=widget;
if(node&&widget.focusFocalNode){widget.focusFocalNode(node)
}else{widget.focus()
}}},_setTabIndexMinusOne:function(widget){if(widget.getFocalNodes){dojo.forEach(widget.getFocalNodes(),function(node){node.setAttribute("tabIndex",-1)
})
}else{(widget.focusNode||widget.domNode).setAttribute("tabIndex",-1)
}},_onContainerFocus:function(evt){this.domNode.setAttribute("tabIndex",-1);
if(evt.target===this.domNode){this.focusFirstChild()
}else{var widget=dijit.getEnclosingWidget(evt.target);
if(widget&&widget.isFocusable()){this.focusedChild=widget
}}},_onContainerBlur:function(evt){if(this.tabIndex){this.domNode.setAttribute("tabIndex",this.tabIndex)
}},_onContainerKeypress:function(evt){if(evt.ctrlKey||evt.altKey){return 
}var func=this._keyNavCodes[evt.keyCode];
if(func){func();
dojo.stopEvent(evt)
}},_onChildBlur:function(widget){},_getFirstFocusableChild:function(){return this._getNextFocusableChild(null,1)
},_getNextFocusableChild:function(child,dir){if(child){child=this._getSiblingOfChild(child,dir)
}var children=this.getChildren();
for(var i=0;
i<children.length;
i++){if(!child){child=children[(dir>0)?0:(children.length-1)]
}if(child.isFocusable()){return child
}child=this._getSiblingOfChild(child,dir)
}}})
}if(!dojo._hasResource["dijit.layout._LayoutWidget"]){dojo._hasResource["dijit.layout._LayoutWidget"]=true;
dojo.provide("dijit.layout._LayoutWidget");
dojo.declare("dijit.layout._LayoutWidget",[dijit._Widget,dijit._Container,dijit._Contained],{isLayoutContainer:true,postCreate:function(){dojo.addClass(this.domNode,"dijitContainer")
},startup:function(){if(this._started){return 
}this._started=true;
if(this.getChildren){dojo.forEach(this.getChildren(),function(child){child.startup()
})
}if(!this.getParent||!this.getParent()){this.resize();
this.connect(window,"onresize",function(){this.resize()
})
}},resize:function(args){var node=this.domNode;
if(args){dojo.marginBox(node,args);
if(args.t){node.style.top=args.t+"px"
}if(args.l){node.style.left=args.l+"px"
}}var mb=dojo.mixin(dojo.marginBox(node),args||{});
this._contentBox=dijit.layout.marginBox2contentBox(node,mb);
this.layout()
},layout:function(){}});
dijit.layout.marginBox2contentBox=function(node,mb){var cs=dojo.getComputedStyle(node);
var me=dojo._getMarginExtents(node,cs);
var pb=dojo._getPadBorderExtents(node,cs);
return{l:dojo._toPixelValue(node,cs.paddingLeft),t:dojo._toPixelValue(node,cs.paddingTop),w:mb.w-(me.w+pb.w),h:mb.h-(me.h+pb.h)}
};
(function(){var capitalize=function(word){return word.substring(0,1).toUpperCase()+word.substring(1)
};
var size=function(widget,dim){widget.resize?widget.resize(dim):dojo.marginBox(widget.domNode,dim);
dojo.mixin(widget,dojo.marginBox(widget.domNode));
dojo.mixin(widget,dim)
};
dijit.layout.layoutChildren=function(container,dim,children){dim=dojo.mixin({},dim);
dojo.addClass(container,"dijitLayoutContainer");
children=dojo.filter(children,function(item){return item.layoutAlign!="client"
}).concat(dojo.filter(children,function(item){return item.layoutAlign=="client"
}));
dojo.forEach(children,function(child){var elm=child.domNode,pos=child.layoutAlign;
var elmStyle=elm.style;
elmStyle.left=dim.l+"px";
elmStyle.top=dim.t+"px";
elmStyle.bottom=elmStyle.right="auto";
dojo.addClass(elm,"dijitAlign"+capitalize(pos));
if(pos=="top"||pos=="bottom"){size(child,{w:dim.w});
dim.h-=child.h;
if(pos=="top"){dim.t+=child.h
}else{elmStyle.top=dim.t+dim.h+"px"
}}else{if(pos=="left"||pos=="right"){size(child,{h:dim.h});
dim.w-=child.w;
if(pos=="left"){dim.l+=child.w
}else{elmStyle.left=dim.l+dim.w+"px"
}}else{if(pos=="client"){size(child,dim)
}}}})
}
})()
}if(!dojo._hasResource["dijit.form._FormWidget"]){dojo._hasResource["dijit.form._FormWidget"]=true;
dojo.provide("dijit.form._FormWidget");
dojo.declare("dijit.form._FormWidget",[dijit._Widget,dijit._Templated],{baseClass:"",value:"",name:"",id:"",alt:"",type:"text",tabIndex:"0",disabled:false,intermediateChanges:false,attributeMap:dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap),{id:"focusNode",tabIndex:"focusNode",alt:"focusNode"}),setDisabled:function(disabled){this.domNode.disabled=this.disabled=disabled;
if(this.focusNode){this.focusNode.disabled=disabled
}if(disabled){this._hovering=false;
this._active=false
}dijit.setWaiState(this.focusNode||this.domNode,"disabled",disabled);
this._setStateClass()
},_onMouse:function(event){var mouseNode=event.target;
if(mouseNode&&mouseNode.getAttribute){this.stateModifier=mouseNode.getAttribute("stateModifier")||""
}if(!this.disabled){switch(event.type){case"mouseenter":case"mouseover":this._hovering=true;
break;
case"mouseout":case"mouseleave":this._hovering=false;
break;
case"mousedown":this._active=true;
var self=this;
var mouseUpConnector=this.connect(dojo.body(),"onmouseup",function(){self._active=false;
self._setStateClass();
self.disconnect(mouseUpConnector)
});
break
}this._setStateClass()
}},isFocusable:function(){return !this.disabled&&(dojo.style(this.domNode,"display")!="none")
},focus:function(){dijit.focus(this.focusNode)
},_setStateClass:function(){if(!("staticClass" in this)){this.staticClass=(this.stateNode||this.domNode).className
}var classes=[this.baseClass];
function multiply(modifier){classes=classes.concat(dojo.map(classes,function(c){return c+modifier
}))
}if(this.checked){multiply("Checked")
}if(this.state){multiply(this.state)
}if(this.selected){multiply("Selected")
}if(this.disabled){multiply("Disabled")
}else{if(this._active){multiply(this.stateModifier+"Active")
}else{if(this._focused){multiply("Focused")
}if((this.stateModifier||!this._focused)&&this._hovering){multiply(this.stateModifier+"Hover")
}}}(this.stateNode||this.domNode).className=this.staticClass+" "+classes.join(" ")
},onChange:function(newValue){},postCreate:function(){this.setValue(this.value,null);
this.setDisabled(this.disabled);
this._setStateClass()
},setValue:function(newValue,priorityChange){this._lastValue=newValue;
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",this.forWaiValuenow());
if(priorityChange===undefined){priorityChange=true
}if(this._lastValueReported==undefined&&priorityChange===null){this._lastValueReported=newValue
}if((this.intermediateChanges||priorityChange)&&((newValue&&newValue.toString)?newValue.toString():newValue)!==((this._lastValueReported&&this._lastValueReported.toString)?this._lastValueReported.toString():this._lastValueReported)){this._lastValueReported=newValue;
this.onChange(newValue)
}},getValue:function(){return this._lastValue
},undo:function(){this.setValue(this._lastValueReported,false)
},_onKeyPress:function(e){if(e.keyCode==dojo.keys.ESCAPE&&!e.shiftKey&&!e.ctrlKey&&!e.altKey){var v=this.getValue();
var lv=this._lastValueReported;
if((typeof lv!="undefined")&&((v!==null&&v.toString)?v.toString():null)!==lv.toString()){this.undo();
dojo.stopEvent(e);
return false
}}return true
},forWaiValuenow:function(){return this.getValue()
}})
}if(!dojo._hasResource["dijit.dijit"]){dojo._hasResource["dijit.dijit"]=true;
dojo.provide("dijit.dijit")
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
}if(!dojo._hasResource["dojo.date"]){dojo._hasResource["dojo.date"]=true;
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
case"hour":case"minute":case"second":case"millisecond":property=interval.charAt(0).toUpperCase()+interval.substring(1)+"s"
}if(property){sum["setUTC"+property](sum["getUTC"+property]()+amount)
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
}if(!dojo._hasResource["dijit._Calendar"]){dojo._hasResource["dijit._Calendar"]=true;
dojo.provide("dijit._Calendar");
dojo.declare("dijit._Calendar",[dijit._Widget,dijit._Templated],{templateString:'<table cellspacing="0" cellpadding="0" class="dijitCalendarContainer">\r\n\t<thead>\r\n\t\t<tr class="dijitReset dijitCalendarMonthContainer" valign="top">\r\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="decrementMonth">\r\n\t\t\t\t<span class="dijitInline dijitCalendarIncrementControl dijitCalendarDecrease"><span dojoAttachPoint="decreaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarDecreaseInner">-</span></span>\r\n\t\t\t</th>\r\n\t\t\t<th class=\'dijitReset\' colspan="5">\r\n\t\t\t\t<div dojoAttachPoint="monthLabelSpacer" class="dijitCalendarMonthLabelSpacer"></div>\r\n\t\t\t\t<div dojoAttachPoint="monthLabelNode" class="dijitCalendarMonth"></div>\r\n\t\t\t</th>\r\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="incrementMonth">\r\n\t\t\t\t<div class="dijitInline dijitCalendarIncrementControl dijitCalendarIncrease"><span dojoAttachPoint="increaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarIncreaseInner">+</span></div>\r\n\t\t\t</th>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<th class="dijitReset dijitCalendarDayLabelTemplate"><span class="dijitCalendarDayLabel"></span></th>\r\n\t\t</tr>\r\n\t</thead>\r\n\t<tbody dojoAttachEvent="onclick: _onDayClick" class="dijitReset dijitCalendarBodyContainer">\r\n\t\t<tr class="dijitReset dijitCalendarWeekTemplate">\r\n\t\t\t<td class="dijitReset dijitCalendarDateTemplate"><span class="dijitCalendarDateLabel"></span></td>\r\n\t\t</tr>\r\n\t</tbody>\r\n\t<tfoot class="dijitReset dijitCalendarYearContainer">\r\n\t\t<tr>\r\n\t\t\t<td class=\'dijitReset\' valign="top" colspan="7">\r\n\t\t\t\t<h3 class="dijitCalendarYearLabel">\r\n\t\t\t\t\t<span dojoAttachPoint="previousYearLabelNode" class="dijitInline dijitCalendarPreviousYear"></span>\r\n\t\t\t\t\t<span dojoAttachPoint="currentYearLabelNode" class="dijitInline dijitCalendarSelectedYear"></span>\r\n\t\t\t\t\t<span dojoAttachPoint="nextYearLabelNode" class="dijitInline dijitCalendarNextYear"></span>\r\n\t\t\t\t</h3>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</tfoot>\r\n</table>\t\r\n',value:new Date(),dayWidth:"narrow",setValue:function(value){if(!this.value||dojo.date.compare(value,this.value)){value=new Date(value);
this.displayMonth=new Date(value);
if(!this.isDisabledDate(value,this.lang)){this.value=value;
this.value.setHours(0,0,0,0);
this.onChange(this.value)
}this._populateGrid()
}},_setText:function(node,text){while(node.firstChild){node.removeChild(node.firstChild)
}node.appendChild(document.createTextNode(text))
},_populateGrid:function(){var month=this.displayMonth;
month.setDate(1);
var firstDay=month.getDay();
var daysInMonth=dojo.date.getDaysInMonth(month);
var daysInPreviousMonth=dojo.date.getDaysInMonth(dojo.date.add(month,"month",-1));
var today=new Date();
var selected=this.value;
var dayOffset=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
if(dayOffset>firstDay){dayOffset-=7
}dojo.query(".dijitCalendarDateTemplate",this.domNode).forEach(function(template,i){i+=dayOffset;
var date=new Date(month);
var number,clazz="dijitCalendar",adj=0;
if(i<firstDay){number=daysInPreviousMonth-firstDay+i+1;
adj=-1;
clazz+="Previous"
}else{if(i>=(firstDay+daysInMonth)){number=i-firstDay-daysInMonth+1;
adj=1;
clazz+="Next"
}else{number=i-firstDay+1;
clazz+="Current"
}}if(adj){date=dojo.date.add(date,"month",adj)
}date.setDate(number);
if(!dojo.date.compare(date,today,"date")){clazz="dijitCalendarCurrentDate "+clazz
}if(!dojo.date.compare(date,selected,"date")){clazz="dijitCalendarSelectedDate "+clazz
}if(this.isDisabledDate(date,this.lang)){clazz="dijitCalendarDisabledDate "+clazz
}template.className=clazz+"Month dijitCalendarDateTemplate";
template.dijitDateValue=date.valueOf();
var label=dojo.query(".dijitCalendarDateLabel",template)[0];
this._setText(label,date.getDate())
},this);
var monthNames=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
this._setText(this.monthLabelNode,monthNames[month.getMonth()]);
var y=month.getFullYear()-1;
dojo.forEach(["previous","current","next"],function(name){this._setText(this[name+"YearLabelNode"],dojo.date.locale.format(new Date(y++,0),{selector:"year",locale:this.lang}))
},this);
var _this=this;
var typematic=function(nodeProp,dateProp,adj){dijit.typematic.addMouseListener(_this[nodeProp],_this,function(count){if(count>=0){_this._adjustDisplay(dateProp,adj)
}},0.8,500)
};
typematic("incrementMonth","month",1);
typematic("decrementMonth","month",-1);
typematic("nextYearLabelNode","year",1);
typematic("previousYearLabelNode","year",-1)
},postCreate:function(){dijit._Calendar.superclass.postCreate.apply(this);
var cloneClass=dojo.hitch(this,function(clazz,n){var template=dojo.query(clazz,this.domNode)[0];
for(var i=0;
i<n;
i++){template.parentNode.appendChild(template.cloneNode(true))
}});
cloneClass(".dijitCalendarDayLabelTemplate",6);
cloneClass(".dijitCalendarDateTemplate",6);
cloneClass(".dijitCalendarWeekTemplate",5);
var dayNames=dojo.date.locale.getNames("days",this.dayWidth,"standAlone",this.lang);
var dayOffset=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
dojo.query(".dijitCalendarDayLabel",this.domNode).forEach(function(label,i){this._setText(label,dayNames[(i+dayOffset)%7])
},this);
var monthNames=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
dojo.forEach(monthNames,function(name){var monthSpacer=dojo.doc.createElement("div");
this._setText(monthSpacer,name);
this.monthLabelSpacer.appendChild(monthSpacer)
},this);
this.value=null;
this.setValue(new Date())
},_adjustDisplay:function(part,amount){this.displayMonth=dojo.date.add(this.displayMonth,part,amount);
this._populateGrid()
},_onDayClick:function(evt){var node=evt.target;
dojo.stopEvent(evt);
while(!node.dijitDateValue){node=node.parentNode
}if(!dojo.hasClass(node,"dijitCalendarDisabledDate")){this.setValue(node.dijitDateValue);
this.onValueSelected(this.value)
}},onValueSelected:function(date){},onChange:function(date){},isDisabledDate:function(dateObject,locale){return false
}})
}if(!dojo._hasResource["dijit.layout.ContentPane"]){dojo._hasResource["dijit.layout.ContentPane"]=true;
dojo.provide("dijit.layout.ContentPane");
dojo.declare("dijit.layout.ContentPane",dijit._Widget,{href:"",extractContent:false,parseOnLoad:true,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'>${errorState}</span>",isLoaded:false,"class":"dijitContentPane",postCreate:function(){this.domNode.title="";
if(this.preload){this._loadCheck()
}var messages=dojo.i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=dojo.string.substitute(this.loadingMessage,messages);
this.errorMessage=dojo.string.substitute(this.errorMessage,messages);
dojo.addClass(this.domNode,this["class"])
},startup:function(){if(this._started){return 
}this._checkIfSingleChild();
if(this._singleChild){this._singleChild.startup()
}this._loadCheck();
this._started=true
},_checkIfSingleChild:function(){var childNodes=dojo.query(">",this.containerNode||this.domNode),childWidgets=childNodes.filter("[widgetId]");
if(childNodes.length==1&&childWidgets.length==1){this.isContainer=true;
this._singleChild=dijit.byNode(childWidgets[0])
}else{delete this.isContainer;
delete this._singleChild
}},refresh:function(){return this._prepareLoad(true)
},setHref:function(href){this.href=href;
return this._prepareLoad()
},setContent:function(data){if(!this._isDownloaded){this.href="";
this._onUnloadHandler()
}this._setContent(data||"");
this._isDownloaded=false;
if(this.parseOnLoad){this._createSubWidgets()
}this._checkIfSingleChild();
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}this._onLoadHandler()
},cancel:function(){if(this._xhrDfd&&(this._xhrDfd.fired==-1)){this._xhrDfd.cancel()
}delete this._xhrDfd
},destroy:function(){if(this._beingDestroyed){return 
}this._onUnloadHandler();
this._beingDestroyed=true;
this.inherited("destroy",arguments)
},resize:function(size){dojo.marginBox(this.domNode,size);
var node=this.containerNode||this.domNode,mb=dojo.mixin(dojo.marginBox(node),size||{});
this._contentBox=dijit.layout.marginBox2contentBox(node,mb);
if(this._singleChild&&this._singleChild.resize){this._singleChild.resize(this._contentBox)
}},_prepareLoad:function(forceLoad){this.cancel();
this.isLoaded=false;
this._loadCheck(forceLoad)
},_loadCheck:function(forceLoad){var displayState=((this.open!==false)&&(this.domNode.style.display!="none"));
if(this.href&&(forceLoad||(this.preload&&!this._xhrDfd)||(this.refreshOnShow&&displayState&&!this._xhrDfd)||(!this.isLoaded&&displayState&&!this._xhrDfd))){this._downloadExternalContent()
}},_downloadExternalContent:function(){this._onUnloadHandler();
this._setContent(this.onDownloadStart.call(this));
var self=this;
var getArgs={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(dojo.isObject(this.ioArgs)){dojo.mixin(getArgs,this.ioArgs)
}var hand=this._xhrDfd=(this.ioMethod||dojo.xhrGet)(getArgs);
hand.addCallback(function(html){try{self.onDownloadEnd.call(self);
self._isDownloaded=true;
self.setContent.call(self,html)
}catch(err){self._onError.call(self,"Content",err)
}delete self._xhrDfd;
return html
});
hand.addErrback(function(err){if(!hand.cancelled){self._onError.call(self,"Download",err)
}delete self._xhrDfd;
return err
})
},_onLoadHandler:function(){this.isLoaded=true;
try{this.onLoad.call(this)
}catch(e){console.error("Error "+this.widgetId+" running custom onLoad code")
}},_onUnloadHandler:function(){this.isLoaded=false;
this.cancel();
try{this.onUnload.call(this)
}catch(e){console.error("Error "+this.widgetId+" running custom onUnload code")
}},_setContent:function(cont){this.destroyDescendants();
try{var node=this.containerNode||this.domNode;
while(node.firstChild){dojo._destroyElement(node.firstChild)
}if(typeof cont=="string"){if(this.extractContent){match=cont.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(match){cont=match[1]
}}node.innerHTML=cont
}else{if(cont.nodeType){node.appendChild(cont)
}else{dojo.forEach(cont,function(n){node.appendChild(n.cloneNode(true))
})
}}}catch(e){var errMess=this.onContentError(e);
try{node.innerHTML=errMess
}catch(e){console.error("Fatal "+this.id+" could not change content due to "+e.message,e)
}}},_onError:function(type,err,consoleText){var errText=this["on"+type+"Error"].call(this,err);
if(consoleText){console.error(consoleText,err)
}else{if(errText){this._setContent.call(this,errText)
}}},_createSubWidgets:function(){var rootNode=this.containerNode||this.domNode;
try{dojo.parser.parse(rootNode,true)
}catch(e){this._onError("Content",e,"Couldn't create widgets in "+this.id+(this.href?" from "+this.href:""))
}},onLoad:function(e){},onUnload:function(e){},onDownloadStart:function(){return this.loadingMessage
},onContentError:function(error){},onDownloadError:function(error){return this.errorMessage
},onDownloadEnd:function(){}})
}if(!dojo._hasResource["dijit.form.Form"]){dojo._hasResource["dijit.form.Form"]=true;
dojo.provide("dijit.form.Form");
dojo.declare("dijit.form._FormMixin",null,{action:"",method:"",enctype:"",name:"","accept-charset":"",accept:"",target:"",attributeMap:dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap),{action:"",method:"",enctype:"","accept-charset":"",accept:"",target:""}),execute:function(formContents){},onCancel:function(){},onExecute:function(){},templateString:"<form dojoAttachPoint='containerNode' dojoAttachEvent='onsubmit:_onSubmit' name='${name}' enctype='multipart/form-data'></form>",_onSubmit:function(e){dojo.stopEvent(e);
this.onExecute();
this.execute(this.getValues())
},submit:function(){this.containerNode.submit()
},setValues:function(obj){var map={};
dojo.forEach(this.getDescendants(),function(widget){if(!widget.name){return 
}var entry=map[widget.name]||(map[widget.name]=[]);
entry.push(widget)
});
for(var name in map){var widgets=map[name],values=dojo.getObject(name,false,obj);
if(!dojo.isArray(values)){values=[values]
}if(widgets[0].setChecked){dojo.forEach(widgets,function(w,i){w.setChecked(dojo.indexOf(values,w.value)!=-1)
})
}else{dojo.forEach(widgets,function(w,i){w.setValue(values[i])
})
}}},getValues:function(){var obj={};
dojo.forEach(this.getDescendants(),function(widget){var value=widget.getValue?widget.getValue():widget.value;
var name=widget.name;
if(!name){return 
}if(widget.setChecked){if(/Radio/.test(widget.declaredClass)){if(widget.checked){dojo.setObject(name,value,obj)
}}else{var ary=dojo.getObject(name,false,obj);
if(!ary){ary=[];
dojo.setObject(name,ary,obj)
}if(widget.checked){ary.push(value)
}}}else{dojo.setObject(name,value,obj)
}});
return obj
},isValid:function(){return dojo.every(this.getDescendants(),function(widget){return !widget.isValid||widget.isValid()
})
}});
dojo.declare("dijit.form.Form",[dijit._Widget,dijit._Templated,dijit.form._FormMixin],null)
}if(!dojo._hasResource["dijit.Dialog"]){dojo._hasResource["dijit.Dialog"]=true;
dojo.provide("dijit.Dialog");
dojo.declare("dijit.DialogUnderlay",[dijit._Widget,dijit._Templated],{templateString:"<div class=dijitDialogUnderlayWrapper id='${id}_underlay'><div class=dijitDialogUnderlay dojoAttachPoint='node'></div></div>",postCreate:function(){dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode)
},layout:function(){var viewport=dijit.getViewport();
var is=this.node.style,os=this.domNode.style;
os.top=viewport.t+"px";
os.left=viewport.l+"px";
is.width=viewport.w+"px";
is.height=viewport.h+"px";
var viewport2=dijit.getViewport();
if(viewport.w!=viewport2.w){is.width=viewport2.w+"px"
}if(viewport.h!=viewport2.h){is.height=viewport2.h+"px"
}},show:function(){this.domNode.style.display="block";
this.layout();
if(this.bgIframe.iframe){this.bgIframe.iframe.style.display="block"
}this._resizeHandler=this.connect(window,"onresize","layout")
},hide:function(){this.domNode.style.display="none";
if(this.bgIframe.iframe){this.bgIframe.iframe.style.display="none"
}this.disconnect(this._resizeHandler)
},uninitialize:function(){if(this.bgIframe){this.bgIframe.destroy()
}}});
dojo.declare("dijit.Dialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin],{templateString:null,templateString:'<div class="dijitDialog">\r\n\t<div dojoAttachPoint="titleBar" class="dijitDialogTitleBar" tabindex="0" waiRole="dialog">\r\n\t<span dojoAttachPoint="titleNode" class="dijitDialogTitle">${title}</span>\r\n\t<span dojoAttachPoint="closeButtonNode" class="dijitDialogCloseIcon" dojoAttachEvent="onclick: hide">\r\n\t\t<span dojoAttachPoint="closeText" class="closeText">x</span>\r\n\t</span>\r\n\t</div>\r\n\t\t<div dojoAttachPoint="containerNode" class="dijitDialogPaneContent"></div>\r\n\t<span dojoAttachPoint="tabEnd" dojoAttachEvent="onfocus:_cycleFocus" tabindex="0"></span>\r\n</div>\r\n',open:false,duration:400,_lastFocusItem:null,attributeMap:dojo.mixin(dojo.clone(dijit._Widget.prototype.attributeMap),{title:"titleBar"}),postCreate:function(){dojo.body().appendChild(this.domNode);
this.inherited("postCreate",arguments);
this.domNode.style.display="none";
this.connect(this,"onExecute","hide");
this.connect(this,"onCancel","hide")
},onLoad:function(){this._position();
this.inherited("onLoad",arguments)
},_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new dojo.dnd.Moveable(this.domNode,{handle:this.titleBar})
}this._underlay=new dijit.DialogUnderlay();
var node=this.domNode;
this._fadeIn=dojo.fx.combine([dojo.fadeIn({node:node,duration:this.duration}),dojo.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:dojo.hitch(this._underlay,"show")})]);
this._fadeOut=dojo.fx.combine([dojo.fadeOut({node:node,duration:this.duration,onEnd:function(){node.style.display="none"
}}),dojo.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:dojo.hitch(this._underlay,"hide")})])
},uninitialize:function(){if(this._underlay){this._underlay.destroy()
}},_position:function(){if(dojo.hasClass(dojo.body(),"dojoMove")){return 
}var viewport=dijit.getViewport();
var mb=dojo.marginBox(this.domNode);
var style=this.domNode.style;
style.left=Math.floor((viewport.l+(viewport.w-mb.w)/2))+"px";
style.top=Math.floor((viewport.t+(viewport.h-mb.h)/2))+"px"
},_findLastFocus:function(evt){this._lastFocused=evt.target
},_cycleFocus:function(evt){if(!this._lastFocusItem){this._lastFocusItem=this._lastFocused
}this.titleBar.focus()
},_onKey:function(evt){if(evt.keyCode){var node=evt.target;
if(node==this.titleBar&&evt.shiftKey&&evt.keyCode==dojo.keys.TAB){if(this._lastFocusItem){this._lastFocusItem.focus()
}dojo.stopEvent(evt)
}else{while(node){if(node==this.domNode){if(evt.keyCode==dojo.keys.ESCAPE){this.hide()
}else{return 
}}node=node.parentNode
}if(evt.keyCode!=dojo.keys.TAB){dojo.stopEvent(evt)
}else{if(!dojo.isOpera){try{this.titleBar.focus()
}catch(e){}}}}}},show:function(){if(!this._alreadyInitialized){this._setup();
this._alreadyInitialized=true
}if(this._fadeOut.status()=="playing"){this._fadeOut.stop()
}this._modalconnects.push(dojo.connect(window,"onscroll",this,"layout"));
this._modalconnects.push(dojo.connect(document.documentElement,"onkeypress",this,"_onKey"));
var ev=typeof (document.ondeactivate)=="object"?"ondeactivate":"onblur";
this._modalconnects.push(dojo.connect(this.containerNode,ev,this,"_findLastFocus"));
dojo.style(this.domNode,"opacity",0);
this.domNode.style.display="block";
this.open=true;
this._loadCheck();
this._position();
this._fadeIn.play();
this._savedFocus=dijit.getFocus(this);
setTimeout(dojo.hitch(this,function(){dijit.focus(this.titleBar)
}),50)
},hide:function(){if(!this._alreadyInitialized){return 
}if(this._fadeIn.status()=="playing"){this._fadeIn.stop()
}this._fadeOut.play();
if(this._scrollConnected){this._scrollConnected=false
}dojo.forEach(this._modalconnects,dojo.disconnect);
this._modalconnects=[];
this.connect(this._fadeOut,"onEnd",dojo.hitch(this,function(){dijit.focus(this._savedFocus)
}));
this.open=false
},layout:function(){if(this.domNode.style.display=="block"){this._underlay.layout();
this._position()
}}});
dojo.declare("dijit.TooltipDialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin],{title:"",_lastFocusItem:null,templateString:null,templateString:'<div class="dijitTooltipDialog" >\r\n\t<div class="dijitTooltipContainer">\r\n\t\t<div class ="dijitTooltipContents dijitTooltipFocusNode" dojoAttachPoint="containerNode" tabindex="0" waiRole="dialog"></div>\r\n\t</div>\r\n\t<span dojoAttachPoint="tabEnd" tabindex="0" dojoAttachEvent="focus:_cycleFocus"></span>\r\n\t<div class="dijitTooltipConnector" ></div>\r\n</div>\r\n',postCreate:function(){this.inherited("postCreate",arguments);
this.connect(this.containerNode,"onkeypress","_onKey");
var ev=typeof (document.ondeactivate)=="object"?"ondeactivate":"onblur";
this.connect(this.containerNode,ev,"_findLastFocus");
this.containerNode.title=this.title
},orient:function(corner){this.domNode.className="dijitTooltipDialog  dijitTooltipAB"+(corner.charAt(1)=="L"?"Left":"Right")+" dijitTooltip"+(corner.charAt(0)=="T"?"Below":"Above")
},onOpen:function(pos){this.orient(pos.corner);
this._loadCheck();
this.containerNode.focus()
},_onKey:function(evt){if(evt.keyCode==dojo.keys.ESCAPE){this.onCancel()
}else{if(evt.target==this.containerNode&&evt.shiftKey&&evt.keyCode==dojo.keys.TAB){if(this._lastFocusItem){this._lastFocusItem.focus()
}dojo.stopEvent(evt)
}else{if(evt.keyCode==dojo.keys.TAB){evt.stopPropagation()
}}}},_findLastFocus:function(evt){this._lastFocused=evt.target
},_cycleFocus:function(evt){if(!this._lastFocusItem){this._lastFocusItem=this._lastFocused
}this.containerNode.focus()
}})
}if(!dojo._hasResource["dijit.Toolbar"]){dojo._hasResource["dijit.Toolbar"]=true;
dojo.provide("dijit.Toolbar");
dojo.declare("dijit.Toolbar",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{templateString:'<div class="dijit dijitToolbar" waiRole="toolbar" tabIndex="${tabIndex}" dojoAttachPoint="containerNode"></div>',tabIndex:"0",postCreate:function(){this.connectKeyNavHandlers(this.isLeftToRight()?[dojo.keys.LEFT_ARROW]:[dojo.keys.RIGHT_ARROW],this.isLeftToRight()?[dojo.keys.RIGHT_ARROW]:[dojo.keys.LEFT_ARROW])
},startup:function(){this.startupKeyNavChildren()
}});
dojo.declare("dijit.ToolbarSeparator",[dijit._Widget,dijit._Templated],{templateString:'<div class="dijitToolbarSeparator dijitInline"></div>',postCreate:function(){dojo.setSelectable(this.domNode,false)
},isFocusable:function(){return false
}})
}if(!dojo._hasResource["dijit.form.Button"]){dojo._hasResource["dijit.form.Button"]=true;
dojo.provide("dijit.form.Button");
dojo.declare("dijit.form.Button",dijit.form._FormWidget,{label:"",showLabel:true,iconClass:"",type:"button",baseClass:"dijitButton",templateString:'<div class="dijit dijitLeft dijitInline dijitButton"\n\tdojoAttachEvent="onclick:_onButtonClick,onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse"\n\t><div class=\'dijitRight\'\n\t\t><button class="dijitStretch dijitButtonNode dijitButtonContents" dojoAttachPoint="focusNode,titleNode"\n\t\t\ttype="${type}" waiRole="button" waiState="labelledby-${id}_label"\n\t\t\t><span class="dijitInline ${iconClass}" dojoAttachPoint="iconNode" \n \t\t\t\t><span class="dijitToggleButtonIconChar">&#10003</span \n\t\t\t></span\n\t\t\t><span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span\n\t\t></button\n\t></div\n></div>\n',_onClick:function(e){if(this.disabled){return false
}this._clicked();
return this.onClick(e)
},_onButtonClick:function(e){dojo.stopEvent(e);
var okToSubmit=this._onClick(e)!==false;
if(this.type=="submit"&&okToSubmit){for(var node=this.domNode;
node;
node=node.parentNode){var widget=dijit.byNode(node);
if(widget&&widget._onSubmit){widget._onSubmit(e);
break
}if(node.tagName.toLowerCase()=="form"){if(!node.onsubmit||node.onsubmit()){node.submit()
}break
}}}},postCreate:function(){if(this.showLabel==false){var labelText="";
this.label=this.containerNode.innerHTML;
labelText=dojo.trim(this.containerNode.innerText||this.containerNode.textContent);
this.titleNode.title=labelText;
dojo.addClass(this.containerNode,"dijitDisplayNone")
}this.inherited(arguments)
},onClick:function(e){return true
},_clicked:function(e){},setLabel:function(content){this.containerNode.innerHTML=this.label=content;
if(dojo.isMozilla){var oldDisplay=dojo.getComputedStyle(this.domNode).display;
this.domNode.style.display="none";
var _this=this;
setTimeout(function(){_this.domNode.style.display=oldDisplay
},1)
}if(this.showLabel==false){this.titleNode.title=dojo.trim(this.containerNode.innerText||this.containerNode.textContent)
}}});
dojo.declare("dijit.form.DropDownButton",[dijit.form.Button,dijit._Container],{baseClass:"dijitDropDownButton",templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<button class="dijitStretch dijitButtonNode dijitButtonContents" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><div class="dijitInline ${iconClass}" dojoAttachPoint="iconNode"></div\n\t\t><span class="dijitButtonText" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label">${label}</span\n\t\t><span class=\'dijitA11yDownArrow\'>&#9660;</span>\n\t</button>\n</div></div>\n',_fillContent:function(){if(this.srcNodeRef){var nodes=dojo.query("*",this.srcNodeRef);
dijit.form.DropDownButton.superclass._fillContent.call(this,nodes[0]);
this.dropDownContainer=this.srcNodeRef
}},startup:function(){if(!this.dropDown){var dropDownNode=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.dropDown=dijit.byNode(dropDownNode);
delete this.dropDownContainer
}dojo.body().appendChild(this.dropDown.domNode);
this.dropDown.domNode.style.display="none"
},_onArrowClick:function(e){if(this.disabled){return 
}this._toggleDropDown()
},_onDropDownClick:function(e){var isMacFFlessThan3=dojo.isFF&&dojo.isFF<3&&navigator.appVersion.indexOf("Macintosh")!=-1;
if(!isMacFFlessThan3||e.detail!=0||this._seenKeydown){this._onArrowClick(e)
}this._seenKeydown=false
},_onDropDownKeydown:function(e){this._seenKeydown=true
},_onDropDownBlur:function(e){this._seenKeydown=false
},_onKey:function(e){if(this.disabled){return 
}if(e.keyCode==dojo.keys.DOWN_ARROW){if(!this.dropDown||this.dropDown.domNode.style.display=="none"){dojo.stopEvent(e);
return this._toggleDropDown()
}}},_onBlur:function(){this._closeDropDown()
},_toggleDropDown:function(){if(this.disabled){return 
}dijit.focus(this.popupStateNode);
var dropDown=this.dropDown;
if(!dropDown){return false
}if(!dropDown.isShowingNow){if(dropDown.href&&!dropDown.isLoaded){var self=this;
var handler=dojo.connect(dropDown,"onLoad",function(){dojo.disconnect(handler);
self._openDropDown()
});
dropDown._loadCheck(true);
return 
}else{this._openDropDown()
}}else{this._closeDropDown()
}},_openDropDown:function(){var dropDown=this.dropDown;
var oldWidth=dropDown.domNode.style.width;
var self=this;
dijit.popup.open({parent:this,popup:dropDown,around:this.domNode,orient:this.isLeftToRight()?{BL:"TL",BR:"TR",TL:"BL",TR:"BR"}:{BR:"TR",BL:"TL",TR:"BR",TL:"BL"},onExecute:function(){self._closeDropDown(true)
},onCancel:function(){self._closeDropDown(true)
},onClose:function(){dropDown.domNode.style.width=oldWidth;
self.popupStateNode.removeAttribute("popupActive");
this._opened=false
}});
if(this.domNode.offsetWidth>dropDown.domNode.offsetWidth){var adjustNode=null;
if(!this.isLeftToRight()){adjustNode=dropDown.domNode.parentNode;
var oldRight=adjustNode.offsetLeft+adjustNode.offsetWidth
}dojo.marginBox(dropDown.domNode,{w:this.domNode.offsetWidth});
if(adjustNode){adjustNode.style.left=oldRight-this.domNode.offsetWidth+"px"
}}this.popupStateNode.setAttribute("popupActive","true");
this._opened=true;
if(dropDown.focus){dropDown.focus()
}},_closeDropDown:function(focus){if(this._opened){dijit.popup.close(this.dropDown);
if(focus){this.focus()
}this._opened=false
}}});
dojo.declare("dijit.form.ComboButton",dijit.form.DropDownButton,{templateString:'<table class=\'dijit dijitReset dijitInline dijitLeft\'\n\tcellspacing=\'0\' cellpadding=\'0\'\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse">\n\t<tr>\n\t\t<td\tclass="dijitStretch dijitButtonContents dijitButtonNode"\n\t\t\ttabIndex="${tabIndex}"\n\t\t\tdojoAttachEvent="ondijitclick:_onButtonClick"  dojoAttachPoint="titleNode"\n\t\t\twaiRole="button" waiState="labelledby-${id}_label">\n\t\t\t<div class="dijitInline ${iconClass}" dojoAttachPoint="iconNode"></div>\n\t\t\t<span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span>\n\t\t</td>\n\t\t<td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\'\n\t\t\tdojoAttachPoint="popupStateNode,focusNode"\n\t\t\tdojoAttachEvent="ondijitclick:_onArrowClick, onkeypress:_onKey"\n\t\t\tstateModifier="DownArrow"\n\t\t\ttitle="${optionsTitle}" name="${name}"\n\t\t\twaiRole="button" waiState="haspopup-true"\n\t\t><div waiRole="presentation">&#9660;</div>\n\t</td></tr>\n</table>\n',attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{id:"",name:""}),optionsTitle:"",baseClass:"dijitComboButton",_focusedNode:null,postCreate:function(){this.inherited(arguments);
this._focalNodes=[this.titleNode,this.popupStateNode];
dojo.forEach(this._focalNodes,dojo.hitch(this,function(node){if(dojo.isIE){this.connect(node,"onactivate",this._onNodeFocus)
}else{this.connect(node,"onfocus",this._onNodeFocus)
}}))
},focusFocalNode:function(node){this._focusedNode=node;
dijit.focus(node)
},hasNextFocalNode:function(){return this._focusedNode!==this.getFocalNodes()[1]
},focusNext:function(){this._focusedNode=this.getFocalNodes()[this._focusedNode?1:0];
dijit.focus(this._focusedNode)
},hasPrevFocalNode:function(){return this._focusedNode!==this.getFocalNodes()[0]
},focusPrev:function(){this._focusedNode=this.getFocalNodes()[this._focusedNode?0:1];
dijit.focus(this._focusedNode)
},getFocalNodes:function(){return this._focalNodes
},_onNodeFocus:function(evt){this._focusedNode=evt.currentTarget
},_onBlur:function(evt){this.inherited(arguments);
this._focusedNode=null
}});
dojo.declare("dijit.form.ToggleButton",dijit.form.Button,{baseClass:"dijitToggleButton",checked:false,_clicked:function(evt){this.setChecked(!this.checked)
},setChecked:function(checked){this.checked=checked;
dijit.setWaiState(this.focusNode||this.domNode,"pressed",this.checked);
this._setStateClass();
this.onChange(checked)
}})
}if(!dojo._hasResource["dijit.Menu"]){dojo._hasResource["dijit.Menu"]=true;
dojo.provide("dijit.Menu");
dojo.declare("dijit.Menu",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{constructor:function(){this._bindings=[]
},templateString:'<table class="dijit dijitMenu dijitReset dijitMenuTable" waiRole="menu" dojoAttachEvent="onkeypress:_onKeyPress"><tbody class="dijitReset" dojoAttachPoint="containerNode"></tbody></table>',targetNodeIds:[],contextMenuForWindow:false,parentMenu:null,popupDelay:500,_contextMenuWithMouse:false,postCreate:function(){if(this.contextMenuForWindow){this.bindDomNode(dojo.body())
}else{dojo.forEach(this.targetNodeIds,this.bindDomNode,this)
}this.connectKeyNavHandlers([dojo.keys.UP_ARROW],[dojo.keys.DOWN_ARROW])
},startup:function(){dojo.forEach(this.getChildren(),function(child){child.startup()
});
this.startupKeyNavChildren()
},onExecute:function(){},onCancel:function(closeAll){},_moveToPopup:function(evt){if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){this.focusedChild._onClick(evt)
}},_onKeyPress:function(evt){if(evt.ctrlKey||evt.altKey){return 
}switch(evt.keyCode){case dojo.keys.RIGHT_ARROW:this._moveToPopup(evt);
dojo.stopEvent(evt);
break;
case dojo.keys.LEFT_ARROW:if(this.parentMenu){this.onCancel(false)
}else{dojo.stopEvent(evt)
}break
}},onItemHover:function(item){this.focusChild(item);
if(this.focusedChild.popup&&!this.focusedChild.disabled&&!this.hover_timer){this.hover_timer=setTimeout(dojo.hitch(this,"_openPopup"),this.popupDelay)
}},_onChildBlur:function(item){dijit.popup.close(item.popup);
item._blur();
this._stopPopupTimer()
},onItemUnhover:function(item){},_stopPopupTimer:function(){if(this.hover_timer){clearTimeout(this.hover_timer);
this.hover_timer=null
}},_getTopMenu:function(){for(var top=this;
top.parentMenu;
top=top.parentMenu){}return top
},onItemClick:function(item){if(item.disabled){return false
}if(item.popup){if(!this.is_open){this._openPopup()
}}else{this.onExecute();
item.onClick()
}},_iframeContentWindow:function(iframe_el){var win=dijit.getDocumentWindow(dijit.Menu._iframeContentDocument(iframe_el))||dijit.Menu._iframeContentDocument(iframe_el)["__parent__"]||(iframe_el.name&&document.frames[iframe_el.name])||null;
return win
},_iframeContentDocument:function(iframe_el){var doc=iframe_el.contentDocument||(iframe_el.contentWindow&&iframe_el.contentWindow.document)||(iframe_el.name&&document.frames[iframe_el.name]&&document.frames[iframe_el.name].document)||null;
return doc
},bindDomNode:function(node){node=dojo.byId(node);
var win=dijit.getDocumentWindow(node.ownerDocument);
if(node.tagName.toLowerCase()=="iframe"){win=this._iframeContentWindow(node);
node=dojo.withGlobal(win,dojo.body)
}var cn=(node==dojo.body()?dojo.doc:node);
node[this.id]=this._bindings.push([dojo.connect(cn,"oncontextmenu",this,"_openMyself"),dojo.connect(cn,"onkeydown",this,"_contextKey"),dojo.connect(cn,"onmousedown",this,"_contextMouse")])
},unBindDomNode:function(nodeName){var node=dojo.byId(nodeName);
var bid=node[this.id]-1,b=this._bindings[bid];
dojo.forEach(b,dojo.disconnect);
delete this._bindings[bid]
},_contextKey:function(e){this._contextMenuWithMouse=false;
if(e.keyCode==dojo.keys.F10){dojo.stopEvent(e);
if(e.shiftKey&&e.type=="keydown"){var _e={target:e.target,pageX:e.pageX,pageY:e.pageY};
_e.preventDefault=_e.stopPropagation=function(){};
window.setTimeout(dojo.hitch(this,function(){this._openMyself(_e)
}),1)
}}},_contextMouse:function(e){this._contextMenuWithMouse=true
},_openMyself:function(e){dojo.stopEvent(e);
var x,y;
if(dojo.isSafari||this._contextMenuWithMouse){x=e.pageX;
y=e.pageY
}else{var coords=dojo.coords(e.target,true);
x=coords.x+10;
y=coords.y+10
}var self=this;
var savedFocus=dijit.getFocus(this);
function closeAndRestoreFocus(){dijit.focus(savedFocus);
dijit.popup.close(self)
}dijit.popup.open({popup:this,x:x,y:y,onExecute:closeAndRestoreFocus,onCancel:closeAndRestoreFocus,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){dijit.popup.close(this)
}
},onOpen:function(e){this.isShowingNow=true
},onClose:function(){this._stopPopupTimer();
this.parentMenu=null;
this.isShowingNow=false;
this.currentPopup=null;
if(this.focusedChild){this._onChildBlur(this.focusedChild);
this.focusedChild=null
}},_openPopup:function(){this._stopPopupTimer();
var from_item=this.focusedChild;
var popup=from_item.popup;
if(popup.isShowingNow){return 
}popup.parentMenu=this;
var self=this;
dijit.popup.open({parent:this,popup:popup,around:from_item.arrowCell,orient:this.isLeftToRight()?{TR:"TL",TL:"TR"}:{TL:"TR",TR:"TL"},onCancel:function(){dijit.popup.close(popup);
from_item.focus();
self.currentPopup=null
}});
this.currentPopup=popup;
if(popup.focus){popup.focus()
}}});
dojo.declare("dijit.MenuItem",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:'<tr class="dijitReset dijitMenuItem"dojoAttachEvent="onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick"><td class="dijitReset"><div class="dijitMenuItemIcon ${iconClass}" dojoAttachPoint="iconNode" ></div></td><td tabIndex="-1" class="dijitReset dijitMenuItemLabel" dojoAttachPoint="containerNode" waiRole="menuitem"></td><td class="dijitReset" dojoAttachPoint="arrowCell"><div class="dijitMenuExpand" dojoAttachPoint="expand" style="display:none"><span class="dijitInline dijitArrowNode dijitMenuExpandInner">+</span></div></td></tr>',label:"",iconClass:"",disabled:false,postCreate:function(){dojo.setSelectable(this.domNode,false);
this.setDisabled(this.disabled);
if(this.label){this.containerNode.innerHTML=this.label
}},_onHover:function(){this.getParent().onItemHover(this)
},_onUnhover:function(){this.getParent().onItemUnhover(this)
},_onClick:function(evt){this.getParent().onItemClick(this);
dojo.stopEvent(evt)
},onClick:function(){},focus:function(){dojo.addClass(this.domNode,"dijitMenuItemHover");
try{dijit.focus(this.containerNode)
}catch(e){}},_blur:function(){dojo.removeClass(this.domNode,"dijitMenuItemHover")
},setDisabled:function(value){this.disabled=value;
dojo[value?"addClass":"removeClass"](this.domNode,"dijitMenuItemDisabled");
dijit.setWaiState(this.containerNode,"disabled",value?"true":"false")
}});
dojo.declare("dijit.PopupMenuItem",dijit.MenuItem,{_fillContent:function(){if(this.srcNodeRef){var nodes=dojo.query("*",this.srcNodeRef);
dijit.PopupMenuItem.superclass._fillContent.call(this,nodes[0]);
this.dropDownContainer=this.srcNodeRef
}},startup:function(){if(!this.popup){var node=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.popup=dijit.byNode(node)
}dojo.body().appendChild(this.popup.domNode);
this.popup.domNode.style.display="none";
dojo.addClass(this.expand,"dijitMenuExpandEnabled");
dojo.style(this.expand,"display","");
dijit.setWaiState(this.containerNode,"haspopup","true")
}});
dojo.declare("dijit.MenuSeparator",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:'<tr class="dijitMenuSeparator"><td colspan=3><div class="dijitMenuSeparatorTop"></div><div class="dijitMenuSeparatorBottom"></div></td></tr>',postCreate:function(){dojo.setSelectable(this.domNode,false)
},isFocusable:function(){return false
}})
}if(!dojo._hasResource["dijit.Tooltip"]){dojo._hasResource["dijit.Tooltip"]=true;
dojo.provide("dijit.Tooltip");
dojo.declare("dijit._MasterTooltip",[dijit._Widget,dijit._Templated],{duration:200,templateString:'<div class="dijitTooltip dijitTooltipLeft" id="dojoTooltip">\n\t<div class="dijitTooltipContainer dijitTooltipContents" dojoAttachPoint="containerNode" waiRole=\'alert\'></div>\n\t<div class="dijitTooltipConnector"></div>\n</div>\n',postCreate:function(){dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode);
this.fadeIn=dojo.fadeIn({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onShow")});
this.fadeOut=dojo.fadeOut({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onHide")})
},show:function(innerHTML,aroundNode){if(this.aroundNode&&this.aroundNode===aroundNode){return 
}if(this.fadeOut.status()=="playing"){this._onDeck=arguments;
return 
}this.containerNode.innerHTML=innerHTML;
this.domNode.style.top=(this.domNode.offsetTop+1)+"px";
var align=this.isLeftToRight()?{BR:"BL",BL:"BR"}:{BL:"BR",BR:"BL"};
var pos=dijit.placeOnScreenAroundElement(this.domNode,aroundNode,align);
this.domNode.className="dijitTooltip dijitTooltip"+(pos.corner=="BL"?"Right":"Left");
dojo.style(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=aroundNode
},_onShow:function(){if(dojo.isIE){this.domNode.style.filter=""
}},hide:function(aroundNode){if(!this.aroundNode||this.aroundNode!==aroundNode){return 
}if(this._onDeck){this._onDeck=null;
return 
}this.fadeIn.stop();
this.isShowingNow=false;
this.aroundNode=null;
this.fadeOut.play()
},_onHide:function(){this.domNode.style.cssText="";
if(this._onDeck){this.show.apply(this,this._onDeck);
this._onDeck=null
}}});
dijit.showTooltip=function(innerHTML,aroundNode){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.show(innerHTML,aroundNode)
};
dijit.hideTooltip=function(aroundNode){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.hide(aroundNode)
};
dojo.declare("dijit.Tooltip",dijit._Widget,{label:"",showDelay:400,connectId:[],postCreate:function(){if(this.srcNodeRef){this.srcNodeRef.style.display="none"
}this._connectNodes=[];
dojo.forEach(this.connectId,function(id){var node=dojo.byId(id);
if(node){this._connectNodes.push(node);
dojo.forEach(["onMouseOver","onMouseOut","onFocus","onBlur","onHover","onUnHover"],function(event){this.connect(node,event.toLowerCase(),"_"+event)
},this);
if(dojo.isIE){node.style.zoom=1
}}},this)
},_onMouseOver:function(e){this._onHover(e)
},_onMouseOut:function(e){if(dojo.isDescendant(e.relatedTarget,e.target)){return 
}this._onUnHover(e)
},_onFocus:function(e){this._focus=true;
this._onHover(e)
},_onBlur:function(e){this._focus=false;
this._onUnHover(e)
},_onHover:function(e){if(!this._showTimer){var target=e.target;
this._showTimer=setTimeout(dojo.hitch(this,function(){this.open(target)
}),this.showDelay)
}},_onUnHover:function(e){if(this._focus){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}this.close()
},open:function(target){target=target||this._connectNodes[0];
if(!target){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}dijit.showTooltip(this.label||this.domNode.innerHTML,target);
this._connectNode=target
},close:function(){dijit.hideTooltip(this._connectNode);
delete this._connectNode;
if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}},uninitialize:function(){this.close()
}})
}if(!dojo._hasResource["dijit.form.TextBox"]){dojo._hasResource["dijit.form.TextBox"]=true;
dojo.provide("dijit.form.TextBox");
dojo.declare("dijit.form.TextBox",dijit.form._FormWidget,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",templateString:'<input class="dojoTextBox" dojoAttachPoint=\'textbox,focusNode\' name="${name}"\n\tdojoAttachEvent=\'onmouseenter:_onMouse,onmouseleave:_onMouse,onfocus:_onMouse,onblur:_onMouse,onkeyup,onkeypress:_onKeyPress\'\n\tautocomplete="off" type="${type}"\n\t/>\n',baseClass:"dijitTextBox",attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{maxLength:"focusNode"}),getDisplayedValue:function(){return this.filter(this.textbox.value)
},getValue:function(){return this.parse(this.getDisplayedValue(),this.constraints)
},setValue:function(value,priorityChange,formattedValue){var filteredValue=this.filter(value);
if((typeof filteredValue==typeof value)&&(formattedValue==null||formattedValue==undefined)){formattedValue=this.format(filteredValue,this.constraints)
}if(formattedValue!=null&&formattedValue!=undefined){this.textbox.value=formattedValue
}dijit.form.TextBox.superclass.setValue.call(this,filteredValue,priorityChange)
},setDisplayedValue:function(value){this.textbox.value=value;
this.setValue(this.getValue(),true)
},forWaiValuenow:function(){return this.getDisplayedValue()
},format:function(value,constraints){return((value==null||value==undefined)?"":(value.toString?value.toString():value))
},parse:function(value,constraints){return value
},postCreate:function(){this.textbox.setAttribute("value",this.getDisplayedValue());
this.inherited("postCreate",arguments);
if(this.srcNodeRef){dojo.style(this.textbox,"cssText",this.style);
this.textbox.className+=" "+this["class"]
}this._layoutHack()
},_layoutHack:function(){if(dojo.isFF==2&&this.domNode.tagName=="TABLE"){var node=this.domNode;
var old=node.style.opacity;
node.style.opacity="0.999";
setTimeout(function(){node.style.opacity=old
},0)
}},filter:function(val){if(val==undefined||val==null){return""
}else{if(typeof val!="string"){return val
}}if(this.trim){val=dojo.trim(val)
}if(this.uppercase){val=val.toUpperCase()
}if(this.lowercase){val=val.toLowerCase()
}if(this.propercase){val=val.replace(/[^\s]+/g,function(word){return word.substring(0,1).toUpperCase()+word.substring(1)
})
}return val
},_onBlur:function(){this.setValue(this.getValue(),(this.isValid?this.isValid():true))
},onkeyup:function(){}})
}if(!dojo._hasResource["dijit.form.ValidationTextBox"]){dojo._hasResource["dijit.form.ValidationTextBox"]=true;
dojo.provide("dijit.form.ValidationTextBox");
dojo.declare("dijit.form.ValidationTextBox",dijit.form.TextBox,{templateString:'<table style="display: -moz-inline-stack;" class="dijit dijitReset dijitInlineTable" cellspacing="0" cellpadding="0"\n\tid="widget_${id}" name="${name}"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse" waiRole="presentation"\n\t><tr class="dijitReset"\n\t\t><td class="dijitReset dijitInputField" width="100%"\n\t\t\t><input dojoAttachPoint=\'textbox,focusNode\' dojoAttachEvent=\'onfocus,onblur:_onMouse,onkeyup,onkeypress:_onKeyPress\' autocomplete="off"\n\t\t\ttype=\'${type}\' name=\'${name}\'\n\t\t/></td\n\t\t><td class="dijitReset dijitValidationIconField" width="0%"\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div><div class=\'dijitValidationIconText\'>&Chi;</div\n\t\t></td\n\t></tr\n></table>\n',baseClass:"dijitTextBox",required:false,promptMessage:"",invalidMessage:"$_unset_$",constraints:{},regExp:".*",regExpGen:function(constraints){return this.regExp
},state:"",setValue:function(){this.inherited("setValue",arguments);
this.validate(false)
},validator:function(value,constraints){return(new RegExp("^("+this.regExpGen(constraints)+")"+(this.required?"":"?")+"$")).test(value)&&(!this.required||!this._isEmpty(value))&&(this._isEmpty(value)||this.parse(value,constraints)!==null)
},isValid:function(isFocused){return this.validator(this.textbox.value,this.constraints)
},_isEmpty:function(value){return/^\s*$/.test(value)
},getErrorMessage:function(isFocused){return this.invalidMessage
},getPromptMessage:function(isFocused){return this.promptMessage
},validate:function(isFocused){var message="";
var isValid=this.isValid(isFocused);
var isEmpty=this._isEmpty(this.textbox.value);
this.state=(isValid||(!this._hasBeenBlurred&&isEmpty))?"":"Error";
this._setStateClass();
dijit.setWaiState(this.focusNode,"invalid",(isValid?"false":"true"));
if(isFocused){if(isEmpty){message=this.getPromptMessage(true)
}if(!message&&!isValid){message=this.getErrorMessage(true)
}}this._displayMessage(message)
},_message:"",_displayMessage:function(message){if(this._message==message){return 
}this._message=message;
this.displayMessage(message)
},displayMessage:function(message){if(message){dijit.showTooltip(message,this.domNode)
}else{dijit.hideTooltip(this.domNode)
}},_hasBeenBlurred:false,_onBlur:function(evt){this._hasBeenBlurred=true;
this.validate(false);
this.inherited("_onBlur",arguments)
},onfocus:function(evt){this.validate(true);
this._onMouse(evt)
},onkeyup:function(evt){this.onfocus(evt)
},constructor:function(){this.constraints={}
},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.constraints.locale=this.lang;
this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
if(this.invalidMessage=="$_unset_$"){this.invalidMessage=this.messages.invalidMessage
}var p=this.regExpGen(this.constraints);
this.regExp=p
}});
dojo.declare("dijit.form.MappedTextBox",dijit.form.ValidationTextBox,{serialize:function(val,options){return(val.toString?val.toString():"")
},toString:function(){var val=this.filter(this.getValue());
return(val!=null)?((typeof val=="string")?val:this.serialize(val,this.constraints)):""
},validate:function(){this.valueNode.value=this.toString();
this.inherited("validate",arguments)
},postCreate:function(){var textbox=this.textbox;
var valueNode=(this.valueNode=document.createElement("input"));
valueNode.setAttribute("type",textbox.type);
valueNode.setAttribute("value",this.toString());
dojo.style(valueNode,"display","none");
valueNode.name=this.textbox.name;
this.textbox.name="_"+this.textbox.name+"_displayed_";
this.textbox.removeAttribute("name");
dojo.place(valueNode,textbox,"after");
this.inherited("postCreate",arguments)
}});
dojo.declare("dijit.form.RangeBoundTextBox",dijit.form.MappedTextBox,{rangeMessage:"",compare:function(val1,val2){return val1-val2
},rangeCheck:function(primitive,constraints){var isMin=(typeof constraints.min!="undefined");
var isMax=(typeof constraints.max!="undefined");
if(isMin||isMax){return(!isMin||this.compare(primitive,constraints.min)>=0)&&(!isMax||this.compare(primitive,constraints.max)<=0)
}else{return true
}},isInRange:function(isFocused){return this.rangeCheck(this.getValue(),this.constraints)
},isValid:function(isFocused){return this.inherited("isValid",arguments)&&((this._isEmpty(this.textbox.value)&&!this.required)||this.isInRange(isFocused))
},getErrorMessage:function(isFocused){if(dijit.form.RangeBoundTextBox.superclass.isValid.call(this,false)&&!this.isInRange(isFocused)){return this.rangeMessage
}else{return this.inherited("getErrorMessage",arguments)
}},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
if(!this.rangeMessage){this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
this.rangeMessage=this.messages.rangeMessage
}},postCreate:function(){this.inherited("postCreate",arguments);
if(typeof this.constraints.min!="undefined"){dijit.setWaiState(this.focusNode,"valuemin",this.constraints.min)
}if(typeof this.constraints.max!="undefined"){dijit.setWaiState(this.focusNode,"valuemax",this.constraints.max)
}}})
}if(!dojo._hasResource["dijit.form.ComboBox"]){dojo._hasResource["dijit.form.ComboBox"]=true;
dojo.provide("dijit.form.ComboBox");
dojo.declare("dijit.form.ComboBoxMixin",null,{item:null,pageSize:Infinity,store:null,query:{},autoComplete:true,searchDelay:100,searchAttr:"name",ignoreCase:true,hasDownArrow:true,_hasFocus:false,templateString:'<table class="dijit dijitReset dijitInlineTable dijitLeft" cellspacing="0" cellpadding="0"\n\tid="widget_${id}" name="${name}" dojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse" waiRole="presentation"\n\t><tr class="dijitReset"\n\t\t><td class=\'dijitReset dijitStretch dijitInputField\' width="100%"\n\t\t\t><input type="text" autocomplete="off" name="${name}"\n\t\t\tdojoAttachEvent="onkeypress, onkeyup, onfocus, compositionend"\n\t\t\tdojoAttachPoint="textbox,focusNode" waiRole="combobox"\n\t\t/></td\n\t\t><td class="dijitReset dijitValidationIconField" width="0%"\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div\n\t\t\t><div class=\'dijitValidationIconText\'>&Chi;</div\n\t\t></td\n\t\t><td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\' width="0%"\n\t\t\tdojoAttachPoint="downArrowNode"\n\t\t\tdojoAttachEvent="onmousedown:_onArrowMouseDown,onmouseup:_onMouse,onmouseenter:_onMouse,onmouseleave:_onMouse"\n\t\t\t><div class="dijitDownArrowButtonInner" waiRole="presentation"\n\t\t\t\t><div class="dijitDownArrowButtonChar">&#9660;</div\n\t\t\t></div\n\t\t></td\t\n\t></tr\n></table>\n',baseClass:"dijitComboBox",_lastDisplayedValue:"",getValue:function(){return dijit.form.TextBox.superclass.getValue.apply(this,arguments)
},setDisplayedValue:function(value){this._lastDisplayedValue=value;
this.setValue(value,true)
},_getCaretPos:function(element){if(typeof (element.selectionStart)=="number"){return element.selectionStart
}else{if(dojo.isIE){var tr=document.selection.createRange().duplicate();
var ntr=element.createTextRange();
tr.move("character",0);
ntr.move("character",0);
try{ntr.setEndPoint("EndToEnd",tr);
return String(ntr.text).replace(/\r/g,"").length
}catch(e){return 0
}}}},_setCaretPos:function(element,location){location=parseInt(location);
this._setSelectedRange(element,location,location)
},_setSelectedRange:function(element,start,end){if(!end){end=element.value.length
}if(element.setSelectionRange){dijit.focus(element);
element.setSelectionRange(start,end)
}else{if(element.createTextRange){var range=element.createTextRange();
with(range){collapse(true);
moveEnd("character",end);
moveStart("character",start);
select()
}}else{element.value=element.value;
element.blur();
dijit.focus(element);
var dist=parseInt(element.value.length)-end;
var tchar=String.fromCharCode(37);
var tcc=tchar.charCodeAt(0);
for(var x=0;
x<dist;
x++){var te=document.createEvent("KeyEvents");
te.initKeyEvent("keypress",true,true,null,false,false,false,false,tcc,tcc);
element.dispatchEvent(te)
}}}},onkeypress:function(evt){if(evt.altKey||(evt.ctrlKey&&evt.charCode!=118)){return 
}var doSearch=false;
this.item=null;
if(this._isShowingNow){this._popupWidget.handleKey(evt)
}switch(evt.keyCode){case dojo.keys.PAGE_DOWN:case dojo.keys.DOWN_ARROW:if(!this._isShowingNow||this._prev_key_esc){this._arrowPressed();
doSearch=true
}else{this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(evt);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.PAGE_UP:case dojo.keys.UP_ARROW:if(this._isShowingNow){this._announceOption(this._popupWidget.getHighlightedOption())
}dojo.stopEvent(evt);
this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
case dojo.keys.ENTER:var highlighted;
if(this._isShowingNow&&(highlighted=this._popupWidget.getHighlightedOption())){if(highlighted==this._popupWidget.nextButton){this._nextSearch(1);
dojo.stopEvent(evt);
break
}else{if(highlighted==this._popupWidget.previousButton){this._nextSearch(-1);
dojo.stopEvent(evt);
break
}}}else{this.setDisplayedValue(this.getDisplayedValue())
}evt.preventDefault();
case dojo.keys.TAB:var newvalue=this.getDisplayedValue();
if(this._popupWidget&&(newvalue==this._popupWidget._messages.previousMessage||newvalue==this._popupWidget._messages.nextMessage)){break
}if(this._isShowingNow){this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._popupWidget.getHighlightedOption()){this._popupWidget.setValue({target:this._popupWidget.getHighlightedOption()},true)
}this._hideResultList()
}break;
case dojo.keys.SPACE:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(this._isShowingNow&&this._popupWidget.getHighlightedOption()){dojo.stopEvent(evt);
this._selectOption();
this._hideResultList()
}else{doSearch=true
}break;
case dojo.keys.ESCAPE:this._prev_key_backspace=false;
this._prev_key_esc=true;
this._hideResultList();
if(this._lastDisplayedValue!=this.getDisplayedValue()){this.setDisplayedValue(this._lastDisplayedValue);
dojo.stopEvent(evt)
}else{this.setValue(this.getValue(),false)
}break;
case dojo.keys.DELETE:case dojo.keys.BACKSPACE:this._prev_key_esc=false;
this._prev_key_backspace=true;
doSearch=true;
break;
case dojo.keys.RIGHT_ARROW:case dojo.keys.LEFT_ARROW:this._prev_key_backspace=false;
this._prev_key_esc=false;
break;
default:this._prev_key_backspace=false;
this._prev_key_esc=false;
if(dojo.isIE||evt.charCode!=0){doSearch=true
}}if(this.searchTimer){clearTimeout(this.searchTimer)
}if(doSearch){this.searchTimer=setTimeout(dojo.hitch(this,this._startSearchFromInput),this.searchDelay)
}},_autoCompleteText:function(text){this._setSelectedRange(this.focusNode,this.focusNode.value.length,this.focusNode.value.length);
if(new RegExp("^"+escape(this.focusNode.value),this.ignoreCase?"i":"").test(escape(text))){var cpos=this._getCaretPos(this.focusNode);
if((cpos+1)>this.focusNode.value.length){this.focusNode.value=text;
this._setSelectedRange(this.focusNode,cpos,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",text)
}}else{this.focusNode.value=text;
this._setSelectedRange(this.focusNode,0,this.focusNode.value.length);
dijit.setWaiState(this.focusNode,"valuenow",text)
}},_openResultList:function(results,dataObject){if(this.disabled||dataObject.query[this.searchAttr]!=this._lastQuery){return 
}this._popupWidget.clearResultList();
if(!results.length){this._hideResultList();
return 
}var zerothvalue=new String(this.store.getValue(results[0],this.searchAttr));
if(zerothvalue&&this.autoComplete&&!this._prev_key_backspace&&(dataObject.query[this.searchAttr]!="*")){this._autoCompleteText(zerothvalue);
dijit.setWaiState(this.focusNode||this.domNode,"valuenow",zerothvalue)
}this._popupWidget.createOptions(results,dataObject,dojo.hitch(this,this._getMenuLabelFromItem));
this._showResultList();
if(dataObject.direction){if(dataObject.direction==1){this._popupWidget.highlightFirstOption()
}else{if(dataObject.direction==-1){this._popupWidget.highlightLastOption()
}}this._announceOption(this._popupWidget.getHighlightedOption())
}},_showResultList:function(){this._hideResultList();
var items=this._popupWidget.getItems(),visibleCount=Math.min(items.length,this.maxListLength);
this._arrowPressed();
this._displayMessage("");
with(this._popupWidget.domNode.style){width="";
height=""
}var best=this.open();
var popupbox=dojo.marginBox(this._popupWidget.domNode);
this._popupWidget.domNode.style.overflow=((best.h==popupbox.h)&&(best.w==popupbox.w))?"hidden":"auto";
var newwidth=best.w;
if(best.h<this._popupWidget.domNode.scrollHeight){newwidth+=16
}dojo.marginBox(this._popupWidget.domNode,{h:best.h,w:Math.max(newwidth,this.domNode.offsetWidth)})
},_hideResultList:function(){if(this._isShowingNow){dijit.popup.close(this._popupWidget);
this._arrowIdle();
this._isShowingNow=false
}},_onBlur:function(){this._hasFocus=false;
this._hasBeenBlurred=true;
this._hideResultList();
this._arrowIdle();
var newvalue=this.getDisplayedValue();
if(this._popupWidget&&(newvalue==this._popupWidget._messages.previousMessage||newvalue==this._popupWidget._messages.nextMessage)){this.setValue(this._lastValueReported,true)
}else{this.setDisplayedValue(newvalue)
}},onfocus:function(evt){this._hasFocus=true;
this._onMouse(evt)
},_announceOption:function(node){if(node==null){return 
}var newValue;
if(node==this._popupWidget.nextButton||node==this._popupWidget.previousButton){newValue=node.innerHTML
}else{newValue=this.store.getValue(node.item,this.searchAttr)
}this.focusNode.value=this.focusNode.value.substring(0,this._getCaretPos(this.focusNode));
this._autoCompleteText(newValue)
},_selectOption:function(evt){var tgt=null;
if(!evt){evt={target:this._popupWidget.getHighlightedOption()}
}if(!evt.target){this.setDisplayedValue(this.getDisplayedValue());
return 
}else{tgt=evt.target
}if(!evt.noHide){this._hideResultList();
this._setCaretPos(this.focusNode,this.store.getValue(tgt.item,this.searchAttr).length)
}this._doSelect(tgt)
},_doSelect:function(tgt){this.item=tgt.item;
this.setValue(this.store.getValue(tgt.item,this.searchAttr),true)
},_onArrowMouseDown:function(evt){if(this.disabled){return 
}dojo.stopEvent(evt);
this.focus();
if(this._isShowingNow){this._hideResultList()
}else{this._startSearch("")
}},_startSearchFromInput:function(){this._startSearch(this.focusNode.value)
},_startSearch:function(key){if(!this._popupWidget){this._popupWidget=new dijit.form._ComboBoxMenu({onChange:dojo.hitch(this,this._selectOption)})
}var query=this.query;
this._lastQuery=query[this.searchAttr]=key+"*";
var dataObject=this.store.fetch({queryOptions:{ignoreCase:this.ignoreCase,deep:true},query:query,onComplete:dojo.hitch(this,"_openResultList"),start:0,count:this.pageSize});
function nextSearch(dataObject,direction){dataObject.start+=dataObject.count*direction;
dataObject.direction=direction;
dataObject.store.fetch(dataObject)
}this._nextSearch=this._popupWidget.onPage=dojo.hitch(this,nextSearch,dataObject)
},_getValueField:function(){return this.searchAttr
},_arrowPressed:function(){if(!this.disabled&&this.hasDownArrow){dojo.addClass(this.downArrowNode,"dijitArrowButtonActive")
}},_arrowIdle:function(){if(!this.disabled&&this.hasDownArrow){dojo.removeClass(this.downArrowNode,"dojoArrowButtonPushed")
}},compositionend:function(evt){this.onkeypress({charCode:-1})
},constructor:function(){this.query={}
},postMixInProperties:function(){if(!this.hasDownArrow){this.baseClass="dijitTextBox"
}if(!this.store){var items=this.srcNodeRef?dojo.query("> option",this.srcNodeRef).map(function(node){node.style.display="none";
return{value:node.getAttribute("value"),name:String(node.innerHTML)}
}):{};
this.store=new dojo.data.ItemFileReadStore({data:{identifier:this._getValueField(),items:items}});
if(items&&items.length&&!this.value){this.value=items[this.srcNodeRef.selectedIndex!=-1?this.srcNodeRef.selectedIndex:0][this._getValueField()]
}}},uninitialize:function(){if(this._popupWidget){this._hideResultList();
this._popupWidget.destroy()
}},_getMenuLabelFromItem:function(item){return{html:false,label:this.store.getValue(item,this.searchAttr)}
},open:function(){this._isShowingNow=true;
return dijit.popup.open({popup:this._popupWidget,around:this.domNode,parent:this})
}});
dojo.declare("dijit.form._ComboBoxMenu",[dijit._Widget,dijit._Templated],{templateString:"<div class='dijitMenu' dojoAttachEvent='onmousedown,onmouseup,onmouseover,onmouseout' tabIndex='-1' style='overflow:\"auto\";'><div class='dijitMenuItem dijitMenuPreviousButton' dojoAttachPoint='previousButton'></div><div class='dijitMenuItem dijitMenuNextButton' dojoAttachPoint='nextButton'></div></div>",_messages:null,postMixInProperties:function(){this._messages=dojo.i18n.getLocalization("dijit.form","ComboBox",this.lang);
this.inherited("postMixInProperties",arguments)
},setValue:function(value){this.value=value;
this.onChange(value)
},onChange:function(value){},onPage:function(direction){},postCreate:function(){this.previousButton.innerHTML=this._messages.previousMessage;
this.nextButton.innerHTML=this._messages.nextMessage;
this.inherited("postCreate",arguments)
},onClose:function(){this._blurOptionNode()
},_createOption:function(item,labelFunc){var labelObject=labelFunc(item);
var menuitem=document.createElement("div");
if(labelObject.html){menuitem.innerHTML=labelObject.label
}else{menuitem.appendChild(document.createTextNode(labelObject.label))
}if(menuitem.innerHTML==""){menuitem.innerHTML="&nbsp;"
}menuitem.item=item;
return menuitem
},createOptions:function(results,dataObject,labelFunc){this.previousButton.style.display=dataObject.start==0?"none":"";
var _this=this;
dojo.forEach(results,function(item){var menuitem=_this._createOption(item,labelFunc);
menuitem.className="dijitMenuItem";
_this.domNode.insertBefore(menuitem,_this.nextButton)
});
this.nextButton.style.display=dataObject.count==results.length?"":"none"
},clearResultList:function(){while(this.domNode.childNodes.length>2){this.domNode.removeChild(this.domNode.childNodes[this.domNode.childNodes.length-2])
}},getItems:function(){return this.domNode.childNodes
},getListLength:function(){return this.domNode.childNodes.length-2
},onmousedown:function(evt){dojo.stopEvent(evt)
},onmouseup:function(evt){if(evt.target===this.domNode){return 
}else{if(evt.target==this.previousButton){this.onPage(-1)
}else{if(evt.target==this.nextButton){this.onPage(1)
}else{var tgt=evt.target;
while(!tgt.item){tgt=tgt.parentNode
}this.setValue({target:tgt},true)
}}}},onmouseover:function(evt){if(evt.target===this.domNode){return 
}var tgt=evt.target;
if(!(tgt==this.previousButton||tgt==this.nextButton)){while(!tgt.item){tgt=tgt.parentNode
}}this._focusOptionNode(tgt)
},onmouseout:function(evt){if(evt.target===this.domNode){return 
}this._blurOptionNode()
},_focusOptionNode:function(node){if(this._highlighted_option!=node){this._blurOptionNode();
this._highlighted_option=node;
dojo.addClass(this._highlighted_option,"dijitMenuItemHover")
}},_blurOptionNode:function(){if(this._highlighted_option){dojo.removeClass(this._highlighted_option,"dijitMenuItemHover");
this._highlighted_option=null
}},_highlightNextOption:function(){if(!this.getHighlightedOption()){this._focusOptionNode(this.domNode.firstChild.style.display=="none"?this.domNode.firstChild.nextSibling:this.domNode.firstChild)
}else{if(this._highlighted_option.nextSibling&&this._highlighted_option.nextSibling.style.display!="none"){this._focusOptionNode(this._highlighted_option.nextSibling)
}}dijit.scrollIntoView(this._highlighted_option)
},highlightFirstOption:function(){this._focusOptionNode(this.domNode.firstChild.nextSibling);
dijit.scrollIntoView(this._highlighted_option)
},highlightLastOption:function(){this._focusOptionNode(this.domNode.lastChild.previousSibling);
dijit.scrollIntoView(this._highlighted_option)
},_highlightPrevOption:function(){if(!this.getHighlightedOption()){this._focusOptionNode(this.domNode.lastChild.style.display=="none"?this.domNode.lastChild.previousSibling:this.domNode.lastChild)
}else{if(this._highlighted_option.previousSibling&&this._highlighted_option.previousSibling.style.display!="none"){this._focusOptionNode(this._highlighted_option.previousSibling)
}}dijit.scrollIntoView(this._highlighted_option)
},_page:function(up){var scrollamount=0;
var oldscroll=this.domNode.scrollTop;
var height=parseInt(dojo.getComputedStyle(this.domNode).height);
if(!this.getHighlightedOption()){this._highlightNextOption()
}while(scrollamount<height){if(up){if(!this.getHighlightedOption().previousSibling||this._highlighted_option.previousSibling.style.display=="none"){break
}this._highlightPrevOption()
}else{if(!this.getHighlightedOption().nextSibling||this._highlighted_option.nextSibling.style.display=="none"){break
}this._highlightNextOption()
}var newscroll=this.domNode.scrollTop;
scrollamount+=(newscroll-oldscroll)*(up?-1:1);
oldscroll=newscroll
}},pageUp:function(){this._page(true)
},pageDown:function(){this._page(false)
},getHighlightedOption:function(){return this._highlighted_option&&this._highlighted_option.parentNode?this._highlighted_option:null
},handleKey:function(evt){switch(evt.keyCode){case dojo.keys.DOWN_ARROW:this._highlightNextOption();
break;
case dojo.keys.PAGE_DOWN:this.pageDown();
break;
case dojo.keys.UP_ARROW:this._highlightPrevOption();
break;
case dojo.keys.PAGE_UP:this.pageUp();
break
}}});
dojo.declare("dijit.form.ComboBox",[dijit.form.ValidationTextBox,dijit.form.ComboBoxMixin],{postMixInProperties:function(){dijit.form.ComboBoxMixin.prototype.postMixInProperties.apply(this,arguments);
dijit.form.ValidationTextBox.prototype.postMixInProperties.apply(this,arguments)
}})
}}});
window.aimluck=window.aimluck||{};
aimluck.namespace=function(C){if(!C||!C.length){return null
}var D=C.split(".");
var B=aimluck;
for(var A=(D[0]=="aimluck")?1:0;
A<D.length;
++A){B[D[A]]=B[D[A]]||{};
B=B[D[A]]
}return B
};
function getObjectById(A){if(document.getElementById){return document.getElementById(A)
}else{if(document.all){return document.all(A)
}else{if(document.layers){return document.layers[A]
}}}}function ew(A){disableButton(A.form);
A.form.action=A.form.action+"?"+A.name+"=1";
A.form.submit()
}function dw(A){if(confirm("\u3053\u306e"+A.form.name+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){disableButton(A.form);
A.form.action=A.form.action+"?"+A.name+"=1";
A.form.submit()
}}function ews(A){disableButton(A.form);
A.form.action=A.form.action+"?"+A.name+"=1";
A.form.submit()
}function dws(A){if(confirm("\u9078\u629e\u3057\u305f"+A.form.name+"\u3092\u3059\u3079\u3066\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){disableButton(A.form);
A.form.action=A.form.action+"?"+A.name+"=1";
A.form.submit()
}}function setHiddenValue(A){if(A.name){var B=document.createElement("input");
B.type="hidden";
B.name=A.name;
B.value=A.value;
A.form.appendChild(B)
}}function disableSubmit(B){var C=B.elements;
for(var A=0;
A<C.length;
A++){if(C[A].type=="submit"){C[A].disabled=true
}}}function disableButton(B){var C=B.elements;
for(var A=0;
A<C.length;
A++){if(C[A].type=="button"){C[A].disabled=true
}}}function check_new_mail(A,B){A.form.action=A.form.action+"?confirmlasttime=true&start="+B;
A.form.submit()
}function createAction(A){A.form.action=A.form.action+"?"+A.name+"=1"
}function verifyCheckBox(D,E,C){var B=0;
var A;
for(A=0;
A<D.elements.length;
A++){if(D.elements[A].checked){B++
}}if(B==0){alert("\u30c1\u30a7\u30c3\u30af\u30dc\u30c3\u30af\u30b9\u3092\uff11\u3064\u4ee5\u4e0a\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
return false
}else{return E(C)
}}function submit_member(A){var B=A.options;
for(i=0;
i<B.length;
i++){B[i].selected=true
}}function add_option(A,C,D,E){if(document.all){var B=document.createElement("OPTION");
B.value=C;
B.text=D;
B.selected=E;
if(A.options.length==1&&A.options[0].value==""){A.options.remove(0)
}A.add(B,A.options.length)
}else{var B=document.createElement("OPTION");
B.value=C;
B.text=D;
B.selected=E;
if(A.options.length==1&&A.options[0].value==""){A.removeChild(A.options[0])
}A.insertBefore(B,A.options[A.options.length])
}}function add_member(E,B){if(document.all){var A=E.options;
var F=B.options;
if(A.length==1&&A[0].value==""){return 
}for(i=0;
i<A.length;
i++){if(!A[i].selected){continue
}var D=false;
for(j=0;
j<F.length;
j++){if(F[j].value==A[i].value){D=true;
break
}}if(D){continue
}var C=document.createElement("OPTION");
C.value=A[i].value;
C.text=A[i].text;
C.selected=true;
if(F.length==1&&F[0].value==""){F.remove(0)
}F.add(C,F.length)
}}else{var A=E.options;
var F=B.options;
if(A.length==1&&A[0].value==""){return 
}for(i=0;
i<A.length;
i++){if(!A[i].selected){continue
}var D=false;
for(j=0;
j<F.length;
j++){if(F[j].value==A[i].value){D=true;
break
}}if(D){continue
}var C=document.createElement("OPTION");
C.value=A[i].value;
C.text=A[i].text;
C.selected=true;
if(B.options.length==1&&B.options[0].value==""){B.removeChild(B.options[0])
}B.insertBefore(C,F[F.length])
}}}function remove_member(A){if(document.all){var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){B.remove(i);
i-=1
}}}else{var B=A.options;
for(i=0;
i<B.length;
i++){if(B[i].selected){A.removeChild(B[i]);
i-=1
}}}if(B.length==0){add_option(A,"","\u3000",false)
}}function doUpOptions10(A){var B=A.options;
for(i=0;
i<B.length;
i++){if(!B[i].selected){continue
}if(i==0){continue
}if(B[i-1].selected){continue
}up_option(A,i,10)
}}function doUpOptions(A){var B=A.options;
for(i=0;
i<B.length;
i++){if(!B[i].selected){continue
}if(i==0){continue
}if(B[i-1].selected){continue
}up_option(A,i,1)
}}function doDownOptions10(A){var B=A.options;
for(i=B.length-1;
i>=0;
i--){if(!B[i].selected){continue
}if(i==B.length-1){continue
}if(B[i+1].selected){continue
}down_option(A,i,10)
}}function doDownOptions(A){var B=A.options;
for(i=B.length-1;
i>=0;
i--){if(!B[i].selected){continue
}if(i==B.length-1){continue
}if(B[i+1].selected){continue
}down_option(A,i,1)
}}function up_option(A,C,D){var B=A.options;
var E=0;
if(C-D>=0){E=C-D
}else{for(i=0;
i<B.length;
i++){if(!B[i].selected){E=i;
break
}}}change_turn_option(A,C,E)
}function down_option(A,C,D){var B=A.options;
var E=0;
if(B.length-1-C-D>=0){E=C+D
}else{for(i=B.length-1;
i>=0;
i--){if(!B[i].selected){E=i;
break
}}}change_turn_option(A,C,E)
}function change_turn_option(A,C,E){var B=A.options;
if(document.all){var D=document.createElement("OPTION");
D.value=B[C].value;
D.text=B[C].text;
D.selected=true;
A.remove(C);
B.add(D,E);
B[E].selected=true
}else{var D=document.createElement("OPTION");
D.value=B[C].value;
D.text=B[C].text;
D.selected=true;
A.removeChild(B[C]);
A.insertBefore(D,B[E]);
B[E].selected=true
}};
aimluck.namespace("utils");
aimluck.utils.createCSS=function(url){if(document.createStyleSheet){document.createStyleSheet(url)
}else{var head=document.getElementsByTagName("head")[0];
var stylesheet=document.createElement("link");
with(stylesheet){rel="stylesheet";
type="text/css";
href=url
}head.appendChild(stylesheet)
}};
aimluck.namespace("utils.form");
aimluck.utils.form.createSelect=function(B,H,C,D,F,E,G,A){dojo.xhrGet({url:C,timeout:5000,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(K,I){var J="";
if(typeof A=="undefined"){J+='<select name="'+B+'">'
}else{J+='<select name="'+B+'" '+A+"/>"
}if(typeof G=="undefined"){J+=""
}else{J+=G
}dojo.forEach(K,function(L){if(typeof L[D]=="undefined"||typeof L[F]=="undefined"){}else{if(L[D]==E){J+="<option value='"+L[D]+"' selected='selected'>"+L[F]+"</option>"
}else{J+="<option value='"+L[D]+"'>"+L[F]+"</option>"
}}});
J+="</select>";
dojo.byId(H).innerHTML=J
}})
};
aimluck.utils.form.switchDisplay=function(A,B){dojo.html.setDisplay(dojo.byId(B),"none");
dojo.html.setDisplay(dojo.byId(A),"")
};
dojo._xdResourceLoaded({depends:[["provide","aimluck.io"]],defineResource:function(A){if(!A._hasResource["aimluck.io"]){A._hasResource["aimluck.io"]=true;
aimluck.namespace("aimluck.io");
A.provide("aimluck.io");
aimluck.io.submit=function(D,B,C,H){aimluck.io.disableForm(D,true);
var G=A.byId(B+C);
if(G){A.style(G,"display","")
}try{A.xhrPost({url:D.action,timeout:30000,form:D,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(I,E){var J="";
if(A.isArray(I)&&I.length>0){if(I[0]=="PermissionError"){J+="<ul>";
J+="<li><span class='caution'>"+I[1]+"</span></li>";
J+="</ul>"
}else{J+="<ul>";
A.forEach(I,function(K){J+="<li><span class='caution'>"+K+"</span></li>"
});
J+="</ul>"
}}H.call(H,J);
G=A.byId(B+C);
if(G){A.style(G,"display","none")
}if(J!=""){aimluck.io.disableForm(D,false)
}},error:function(E){}})
}catch(F){}return false
};
aimluck.io.sendData=function(B,D,E){var C=new Array();
C.callback=E;
aimluck.io.sendRawData(B,D,sendErrorData,C);
return false
};
aimluck.io.sendErrorData=function(D,B){var C="";
if(A.isArray(B.data)&&B.data.length>0){C+="<ul>";
A.forEach(B.data,function(E){C+="<li>"+E+"</li>"
});
C+="</ul>"
}D.callback.call(D.callback,C);
return false
};
aimluck.io.sendRawData=function(C,G,H,F){var B=new Array;
try{A.xhrGet({url:C,method:"POST",encoding:"utf-8",content:G,mimetype:"text/json",sync:true,load:function(I,K,J,E){B.type=I;
B.data=K;
B.event=J;
B.args=E;
B.bool=true;
H.call(H,F,B);
return B
}})
}catch(D){alert("error")
}};
aimluck.io.escapeText=function(B){var C;
if(typeof (A.byId(B).innerText)!="undefined"){C=A.byId(B).innerText
}else{if(typeof (A.byId(B).value)!="undefined"){C=A.byId(B).value
}else{if(typeof (A.byId(B).textContent)!="undefined"){C=A.byId(B).textContent
}}}return C
};
aimluck.io.disableForm=function(D,B){var E=D.elements;
for(var C=0;
C<E.length;
C++){if(E[C].type=="submit"||E[C].type=="button"){E[C].disabled=B
}}};
aimluck.io.actionSubmit=function(B){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=B.form.action+"?"+B.name+"=1";
B.form.submit()
};
aimluck.io.ajaxActionSubmit=function(C,B,D,E,F){aimluck.io.disableForm(C.form,true);
aimluck.io.setHiddenValue(C);
C.form.action=B;
aimluck.io.submit(C.form,D,E,F)
};
aimluck.io.actionSubmitReturn=function(B,C){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=B.form.action+"?"+B.name+"=1&action="+C;
B.form.submit()
};
aimluck.io.deleteSubmit=function(B){if(confirm("\u3053\u306e"+B.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=B.form.action+"?"+B.name+"=1";
B.form.submit()
}};
aimluck.io.ajaxDeleteSubmit=function(C,B,D,E,F){if(confirm("\u3053\u306e"+C.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(C.form,true);
aimluck.io.setHiddenValue(C);
C.form.action=B;
aimluck.io.submit(C.form,D,E,F)
}};
aimluck.io.ajaxEnableSubmit=function(C,B,D,E,F){if(confirm("\u3053\u306e"+C.form._name.value+"\u3092\u6709\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(C.form,true);
aimluck.io.setHiddenValue(C);
C.form.action=B;
aimluck.io.submit(C.form,D,E,F)
}};
aimluck.io.ajaxDisableSubmit=function(C,B,D,E,F){if(confirm("\u3053\u306e"+C.form._name.value+"\u3092\u7121\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(C.form,true);
aimluck.io.setHiddenValue(C);
C.form.action=B;
aimluck.io.submit(C.form,D,E,F)
}};
aimluck.io.deleteSubmitReturn=function(B,C){if(confirm("\u3053\u306e"+B.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=B.form.action+"?"+B.name+"=1&action="+C;
B.form.submit()
}};
aimluck.io.multiDeleteSubmit=function(B){if(confirm("\u9078\u629e\u3057\u305f"+B.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=B.form.action+"?"+B.name+"=1";
B.form.submit()
}};
aimluck.io.ajaxMultiDeleteSubmit=function(C,B,D,E,F){if(confirm("\u9078\u629e\u3057\u305f"+C.form._name.value+"\u3092\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(C.form,true);
aimluck.io.setHiddenValue(C);
C.form.action=B;
aimluck.io.submit(C.form,D,E,F)
}};
aimluck.io.ajaxMultiEnableSubmit=function(C,B,D,E,F){if(confirm("\u9078\u629e\u3057\u305f"+C.form._name.value+"\u3092\u6709\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(C.form,true);
aimluck.io.setHiddenValue(C);
C.form.action=B;
aimluck.io.submit(C.form,D,E,F)
}};
aimluck.io.ajaxMultiDisableSubmit=function(C,B,D,E,F){if(confirm("\u9078\u629e\u3057\u305f"+C.form._name.value+"\u3092\u7121\u52b9\u5316\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")){aimluck.io.disableForm(C.form,true);
aimluck.io.setHiddenValue(C);
C.form.action=B;
aimluck.io.submit(C.form,D,E,F)
}};
aimluck.io.setHiddenValue=function(B){if(B.name){var C=document.createElement("input");
C.type="hidden";
C.name=B.name;
C.value=B.value;
B.form.appendChild(C)
}};
aimluck.io.openDialog=function(C,B,D,E){aimluck.io.disableForm(C.form,true);
aipo.common.showDialog(B,D,E)
};
aimluck.io.checkboxActionSubmit=function(B){aimluck.io.verifyCheckbox(B.form,aimluck.io.actionSubmit,B)
};
aimluck.io.ajaxCheckboxActionSubmit=function(C,B,D,E,F){aimluck.io.ajaxVerifyCheckbox(C.form,aimluck.io.ajaxActionSubmit,C,B,D,E,F)
};
aimluck.io.checkboxDeleteSubmit=function(B){aimluck.io.verifyCheckbox(B.form,aimluck.io.multiDeleteSubmit,B)
};
aimluck.io.ajaxCheckboxDeleteSubmit=function(C,B,D,E,F){aimluck.io.ajaxVerifyCheckbox(C.form,aimluck.io.ajaxMultiDeleteSubmit,C,B,D,E,F)
};
aimluck.io.ajaxCheckboxEnableSubmit=function(C,B,D,E,F){aimluck.io.ajaxVerifyCheckbox(C.form,aimluck.io.ajaxMultiEnableSubmit,C,B,D,E,F)
};
aimluck.io.ajaxCheckboxDisableSubmit=function(C,B,D,E,F){aimluck.io.ajaxVerifyCheckbox(C.form,aimluck.io.ajaxMultiDisableSubmit,C,B,D,E,F)
};
aimluck.io.verifyCheckbox=function(E,F,D){var C=0;
var B;
for(B=0;
B<E.elements.length;
B++){if(E.elements[B].checked){C++
}}if(C==0){alert("\u30c1\u30a7\u30c3\u30af\u30dc\u30c3\u30af\u30b9\u3092\uff11\u3064\u4ee5\u4e0a\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
return false
}else{return F(D)
}};
aimluck.io.ajaxVerifyCheckbox=function(C,F,J,B,I,H,E){var D=0;
var G;
for(G=0;
G<C.elements.length;
G++){if(C.elements[G].checked){D++
}}if(D==0){alert("\u30c1\u30a7\u30c3\u30af\u30dc\u30c3\u30af\u30b9\u3092\uff11\u3064\u4ee5\u4e0a\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
return false
}else{return F(J,B,I,H,E)
}};
aimluck.io.createOptions=function(C,G){var D,F,J,I,B,E,L,K;
if(G.url){B=G.url
}if(G.key){J=G.key
}if(G.value){I=G.value
}if(typeof G.selectedId=="undefined"){}else{D=G.selectedId
}if(typeof G.preOptions=="undefined"){}else{F=G.preOptions
}if(typeof G.indicator=="undefined"){}else{E=G.indicator;
var H=A.byId(E);
if(H){A.style(H,"display","none")
}}if(typeof G.callback=="undefined"){}else{L=G.callback;
if(typeof G.callbackTarget=="undefined"){}else{K=G.callbackTarget
}}A.xhrGet({url:B,timeout:10000,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(O,N){var M=A.byId(C);
M.options.length=0;
if(typeof F=="undefined"){}else{aimluck.io.addOption(M,F.key,F.value,false)
}A.forEach(O,function(P){if(typeof P[J]=="undefined"||typeof P[I]=="undefined"){}else{if(P[J]==D){aimluck.io.addOption(M,P[J],P[I],true)
}else{aimluck.io.addOption(M,P[J],P[I],false)
}}});
if(H){A.style(H,"display","none")
}if(L){L.call(K?K:L,O)
}}})
};
aimluck.io.addOption=function(B,D,E,F){if(document.all){var C=document.createElement("OPTION");
C.value=D;
C.text=E;
C.selected=F;
if(B.options.length==1&&B.options[0].value==""){B.options.remove(0)
}B.add(C,B.options.length)
}else{var C=document.createElement("OPTION");
C.value=D;
C.text=E;
C.selected=F;
if(B.options.length==1&&B.options[0].value==""){B.removeChild(B.options[0])
}B.insertBefore(C,B.options[B.options.length])
}};
aimluck.io.removeOptions=function(B){if(document.all){var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){C.remove(i);
i-=1
}}}else{var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){B.removeChild(C[i]);
i-=1
}}}if(C.length==0){add_option(B,"","\u3000",false)
}};
aimluck.io.removeAllOptions=function(B){if(B.options.length==0){return 
}aimluck.io.selectAllOptions(B);
if(document.all){var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){C.remove(i);
i-=1
}}}else{var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){B.removeChild(C[i]);
i-=1
}}}if(C.length==0){add_option(B,"","\u3000",false)
}};
aimluck.io.selectAllOptions=function(B){var C=B.options;
if(C.length==0){return 
}for(i=0;
i<C.length;
i++){C[i].selected=true
}};
aimluck.io.switchCheckbox=function(C){var B;
if(C.checked){for(i=0;
i<C.form.elements.length;
i++){B=C.form.elements[i];
if(!B.disabled){B.checked=true
}}}else{for(i=0;
i<C.form.elements.length;
i++){B=C.form.elements[i];
if(!B.disabled){B.checked=false
}}}};
aimluck.io.postViewPage=function(D,C,B){aimluck.io.disableForm(D,true);
var E=A.byId(B+C);
if(E){A.style(E,"display","")
}A.xhrPost({url:D.action,timeout:30000,form:D,encoding:"utf-8",handleAs:"text",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(G,F){var H=G;
E=A.byId(B+C);
if(E){A.style(E,"display","none")
}if(H!=""){aimluck.io.disableForm(D,false);
var I=dijit.byId("portlet_"+C);
if(!I){I=new aimluck.widget.Contentpane({},"portlet_"+C)
}if(I){ptConfig[C].reloadUrl=ptConfig[C].initUrl;
I._isDownloaded=true;
I.setContent(H)
}}if(aipo.onloadSmartPhone==null){aipo.onloadSmartPhone()
}},error:function(F){}})
}
}}});
window.aipo=window.aipo||{};
aipo.namespace=function(C){if(!C||!C.length){return null
}var D=C.split(".");
var B=aipo;
for(var A=(D[0]=="aipo")?1:0;
A<D.length;
++A){B[D[A]]=B[D[A]]||{};
B=B[D[A]]
}return B
};
var ptConfig=[];
aipo.onReceiveMessage=function(C,B){if(!C){var A=dijit.byId("modalDialog");
A.hide();
aipo.portletReload(B)
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=C
}};
aipo.getCookie=function(D){var C="";
var F=0;
var E=0;
var A=D+"=";
var B="";
while(F<document.cookie.length){E=F+A.length;
if(document.cookie.substring(F,E)==A){B=document.cookie.indexOf(";",E);
if(B==-1){C=document.cookie.substring(E,document.cookie.length)
}else{C=document.cookie.substring(E,B)
}break
}F=document.cookie.indexOf(" ",F)+1;
if(F==0){break
}}return C
};
aipo.setCookie=function(B,E,D,C){var A=new Date();
A.setTime(A.getTime()+(typeof C!="number"?10*24*60*60*1000:C));
if(typeof D=="undefined"||D==null){document.cookie=B+"="+E+"; expires="+A.toGMTString()+"; path=${context_path}/"
}else{document.cookie=B+"="+E+"; expires="+A.toGMTString()+"; path="+D
}};
aipo.removeCookie=function remove_cookie(B,C){var D;
var A=new Date();
A.setTime(A.getTime()-1);
D=get_cookie(B);
if(typeof C=="undefined"){document.cookie=B+"="+D+"; expires="+A.toGMTString()+"; path=${context_path}/"
}else{document.cookie=B+"="+D+"; expires="+A.toGMTString()+"; path="+C
}};
aipo.portletReload=function(C,B){for(var A in ptConfig){if(A!=B){if(ptConfig[A].group==C){ptConfig[A].reloadFunction.call(ptConfig[A].reloadFunction,A)
}}}};
aipo.reloadPage=function(A){if(typeof ptConfig[A].reloadUrl=="undefined"){aipo.viewPage(ptConfig[A].initUrl,A)
}else{aipo.viewPage(ptConfig[A].reloadUrl,A)
}};
var setMouseListener=function(){aipo.customize.positionInitialize();
dojo.query(".customizeMenuIcon,.menubarOpenButton").forEach(function(B){dojo.connect(B,"onmouseenter",null,function(){dojo.addClass(this,"customizeMenuIconMouseenter")
});
dojo.connect(B,"onmouseleave",null,function(){dojo.removeClass(this,"customizeMenuIconMouseenter")
})
});
var A=dojo.connect(dojo.query("body")[0],"onclick",null,function(){if(dojo.query(".customizeMenuIconMouseenter").length==0){dojo.query("div.menubar").style("display","none")
}});
if(aipo.onloadSmartPhone!=null){aipo.onloadSmartPhone()
}};
aipo.viewPage=function(A,B,D){var C=dijit.byId("portlet_"+B);
if(!C){C=new aimluck.widget.Contentpane({},"portlet_"+B)
}if(C){ptConfig[B].reloadUrl=A;
if(D){for(i=0;
i<D.length;
i++){C.setParam(D[i][0],D[i][1])
}}C.onLoad=dojo.hitch(C.onLoad,setMouseListener);
C.viewPage(A)
}};
aipo.errorTreatment=function(B,A){if(B.error){if(B.error==1){window.location.href=A
}else{return true
}return false
}else{return true
}};
var favicon={change:function(A){this.addLink(A,"icon");
this.addLink(A,"shortcut icon")
},addLink:function(C,B){var A=document.createElement("link");
A.type="image/x-icon";
A.rel=B;
A.href=C;
this.removeLinkIfExists(B);
this.docHead.appendChild(A)
},removeLinkIfExists:function(D){var A=this.docHead.getElementsByTagName("link");
for(var B=0;
B<A.length;
B++){var C=A[B];
if(C.type=="image/x-icon"&&C.rel==D){this.docHead.removeChild(C);
return 
}}},docHead:document.getElementsByTagName("head")[0]};
function CronTask(B,A,C){this.task=B;
this.isDecay=C;
this.interval=A;
this.decayRate=1;
this.decayMultiplier=1.5;
this.maxDecayTime=5*60*1000
}CronTask.prototype={start:function(){this.stop().run();
return this
},stop:function(){if(this.worker){window.clearTimeout(this.worker)
}return this
},run:function(){var A=this;
this.task(function(){A.decayRate=A.isDecay?Math.max(1,A.decayRate/A.decayMultiplier):A.decayRate*A.decayMultiplier;
var B=A.interval*A.decayRate;
if(!A.isDecay){B=(B>=A.maxDecayTime)?A.maxDecayTime:B
}B=Math.floor(B);
A.worker=window.setTimeout(function(){A.run.call(A)
},B)
})
},reset:function(){this.destroy().run();
return this
},destroy:function(){this.stop();
this.decayRate=1;
return this
}};
aipo.userAgent={__userAgent:window.navigator.userAgent.toLowerCase(),isAndroid:function(){return this.__userAgent.indexOf("android")>-1
},isIphone:function(){return this.__userAgent.indexOf("iphone")>-1
},isSmartPhone:function(){return this.isAndroid()||this.isIphone()
}};
aipo.escapeHTML=function(B){var A=function(C){switch(C){case"<":return"&lt;";
case">":return"&gt;";
case"&":return"&amp;";
case"'":return"&#39;";
case'"':return"&quot;"
}return"?"
};
return String(B).replace(/[<>&"']/g,A)
};
dojo._xdResourceLoaded({depends:[["provide","aipo.common"]],defineResource:function(A){if(!A._hasResource["aipo.common"]){A._hasResource["aipo.common"]=true;
A.provide("aipo.common");
aipo.common.showDialog=function(B,D,E){var C=dijit.byId("modalDialog");
A.query(".roundBlockContent").addClass("mb_dialoghide");
A.query("#modalDialog").addClass("mb_dialog");
if(!C){C=new aimluck.widget.Dialog({widgetId:"modalDialog",_portlet_id:D,_callback:E},"modalDialog")
}else{C.setCallback(D,E)
}if(C){C.setHref(B);
C.show()
}};
aipo.common.hideDialog=function(){var B=dijit.byId("modalDialog");
if(B){B.hide()
}}
}}});
dojo._xdResourceLoaded({depends:[["provide","aipo.io"]],defineResource:function(A){if(!A._hasResource["aipo.io"]){A._hasResource["aipo.io"]=true;
A.provide("aipo.io");
aipo.io.loadHtml=function(B,D,C){A.xhrGet({url:B,transport:"ScriptSrcTransport",jsonParamName:"callback",content:D,method:"get",mimetype:"application/json",encoding:"utf-8",load:function(F,H,G,E){A.byId("content-"+C).innerHTML=H.body;
A.html.setVisibility(A.byId("content-"+C),true);
A.html.setDisplay(A.byId("indicator-"+C),false)
},error:function(F,H,G,E){A.byId("content-"+C).innerHTML="\u005b\u30a8\u30e9\u30fc\u005d\u0020\u8aad\u307f\u8fbc\u307f\u304c\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002";
A.html.setVisibility(A.byId("content-"+C),true);
A.html.setDisplay(A.byId("indicator-"+C),false)
},timeout:function(F,H,G,E){A.byId("content-"+C).innerHTML="\u005b\u30a8\u30e9\u30fc\u005d\u0020\u30bf\u30a4\u30e0\u30a2\u30a6\u30c8\u3057\u307e\u3057\u305f\u3002";
A.html.setVisibility(A.byId("content-"+C),true);
A.html.setDisplay(A.byId("indicator-"+C),false)
},timeoutSeconds:10})
}
}}});
dojo._xdResourceLoaded({depends:[["provide","aimluck.dnd.DragMoveObject"],["provide","aimluck.dnd.Draggable"],["require","dojo.dnd.Mover"],["require","dojo.dnd.Moveable"],["require","dojo.parser"],["require","dojo.dnd.Source"]],defineResource:function(A){if(!A._hasResource["aimluck.dnd.DragMoveObject"]){A._hasResource["aimluck.dnd.DragMoveObject"]=true;
A.provide("aimluck.dnd.DragMoveObject");
A.provide("aimluck.dnd.Draggable");
A.require("dojo.dnd.Mover");
A.require("dojo.dnd.Moveable");
A.require("dojo.parser");
A.require("dojo.dnd.Source");
A.declare("aimluck.dnd.DragMoveObject",[A.dnd.Mover],{_pageY:0,_pageX:0,portletId:null,leftTop:null,onFirstMove:function(B){A.dnd.Mover.prototype.onFirstMove.apply(this,arguments)
},onMouseUp:function(B){A.dnd.Mover.prototype.onMouseUp.apply(this,arguments)
},onMouseDown:function(C){var B=this.marginBox;
this.leftTop={l:B.l+C.pageX,t:B.t+C.pageY};
A.dnd.Mover.prototype.onMouseDown.apply(this,arguments)
},onMouseMove:function(C){this._pageX=C.pageX;
this._pageY=C.pageY;
A.dnd.autoScroll(C);
var B=this.marginBox;
this.leftTop={l:B.l+C.pageX,t:B.t+C.pageY}
}});
A.declare("aimluck.dnd.Draggable",A.dnd.Moveable,{DragMoveObject:aimluck.dnd.DragMoveObject,portletId:null,constructor:function(B,C){this.portletId=C.pid
},onMouseDown:function(B){if(this.skip&&A.dnd.isFormElement(B)){return 
}if(this.delay){this.events.push(A.connect(this.handle,"onmousemove",this,"onMouseMove"));
this.events.push(A.connect(this.handle,"onmouseup",this,"onMouseUp"))
}else{dragObj=new this.DragMoveObject(this.node,B,this);
dragObj.dragSource=this;
dragObj.portletId=this.portletId
}dragObj._pageX=B.pageX;
dragObj._pageY=B.pageY;
this._lastX=B.pageX;
this._lastY=B.pageY;
A.stopEvent(B)
}})
}}});
dojo._xdResourceLoaded({depends:[["provide","aimluck.widget.Contentpane"],["require","dijit.layout.ContentPane"]],defineResource:function(A){if(!A._hasResource["aimluck.widget.Contentpane"]){A._hasResource["aimluck.widget.Contentpane"]=true;
A.provide("aimluck.widget.Contentpane");
A.require("dijit.layout.ContentPane");
A.declare("aimluck.widget.Contentpane",[dijit.layout.ContentPane],{loadingMessage:"<div class='indicator'>\u8aad\u307f\u8fbc\u307f\u4e2d...</div>",errorMessage:"",extractContent:false,parseOnLoad:true,refreshOnShow:true,params:new Array(),reloadIds:new Array(),viewPage:function(B){this.href=B;
return this._prepareLoad(true)
},setParam:function(B,C){this.params[B]=C
},setReloadIds:function(B){this.reloadIds=B
},clearParams:function(){this.params=new Array()
},clearReloadIds:function(){this.reloadIds=new Array()
},_downloadExternalContent:function(){this._onUnloadHandler();
var C=this;
var D={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text",content:this.params,headers:{X_REQUESTED_WITH:"XMLHttpRequest"}};
if(A.isObject(this.ioArgs)){A.mixin(D,this.ioArgs)
}var B=this._xhrDfd=(this.ioMethod||A.xhrPost)(D);
B.addCallback(function(E){C.clearParams();
C.clearReloadIds();
try{C.onDownloadEnd.call(C);
C._isDownloaded=true;
C.setContent.call(C,E)
}catch(F){C._onError.call(C,"Content",F)
}delete C._xhrDfd;
return E
});
B.addErrback(function(E){if(!B.cancelled){C._onError.call(C,"Download",E)
}delete C._xhrDfd;
return E
})
}})
}}});
dojo._xdResourceLoaded({depends:[["provide","aimluck.widget.Dialog"],["provide","aimluck.widget.DialogUnderlay"],["provide","aimluck.widget.Timeout"],["require","dijit.Dialog"]],defineResource:function(A){if(!A._hasResource["aimluck.widget.Dialog"]){A._hasResource["aimluck.widget.Dialog"]=true;
A.provide("aimluck.widget.Dialog");
A.provide("aimluck.widget.DialogUnderlay");
A.provide("aimluck.widget.Timeout");
A.require("dijit.Dialog");
A.declare("aimluck.widget.DialogUnderlay",[dijit.DialogUnderlay],{templateString:"<div class=modalDialogUnderlayWrapper id='${id}_underlay'><div class=modalDialogUnderlay dojoAttachPoint='node'></div></div>",layout:function(){var B="";
var D="";
os="";
os.top="";
os.left="";
D.width="";
D.height="";
var C=""
}});
A.declare("aimluck.widget.Timeout",[dijit._Widget,dijit._Templated],{templateString:"<div class=modalDialogUnderlayWrapper id='${id}_underlay'><div class=modalDialogUnderlay dojoAttachPoint='node' redirecturl=\"${redirectUrl}\"></div></div>",redirectUrl:"about:blank",postCreate:function(){window.location.href=this.redirectUrl
}});
A.declare("aimluck.widget.Dialog",[dijit.Dialog],{widgetId:null,loadingMessage:"<div class='indicatorDialog'><div class='indicator'>\u8aad\u307f\u8fbc\u307f\u4e2d...</div></div>",templateString:null,templateString:"<div id='modalDialog' class='modalDialog' dojoattachpoint='wrapper'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>",duration:10,extractContent:false,parseOnLoad:true,refreshOnShow:true,isPositionLock:false,params:new Array(),reloadIds:new Array(),_portlet_id:null,_callback:null,_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new A.dnd.Moveable(this.domNode,{handle:this.titleBar});
var B=this.domNode;
A.connect(this._moveable,"onMoving",function(H,G){var E=dijit.getViewport();
var F=parseInt(A.getComputedStyle(B).width);
var D=parseInt(E.w);
if(G.l<0){G.l=0
}if(G.l+F>D){G.l=D-F
}if(G.t<0){G.t=0
}})
}this._underlay=new aimluck.widget.DialogUnderlay();
var C=this.domNode;
this._fadeIn=A.fx.combine([A.fadeIn({node:C,duration:this.duration}),A.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:A.hitch(this._underlay,"show")})]);
this._fadeOut=A.fx.combine([A.fadeOut({node:C,dialog:this,duration:this.duration,onEnd:function(){C.style.display="none";
if(document.all){this.dialog.fixTmpScroll()
}}}),A.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:A.hitch(this._underlay,"hide")})])
},fixTmpScroll:function(){var B=A.byId("weeklyScrollPane_"+this._portlet_id);
if(B){if(typeof aipo.schedule.tmpScroll=="undefined"){A.byId("weeklyScrollPane_"+this._portlet_id).scrollTop=ptConfig[this._portlet_id].contentScrollTop
}else{A.byId("weeklyScrollPane_"+this._portlet_id).scrollTop=aipo.schedule.tmpScroll
}}},onLoad:function(){this._position();
dijit.Dialog.superclass.onLoad.call(this);
this.isPositionLock=false;
var B=window.navigator.userAgent.toLowerCase();
if(B.indexOf("iphone")>-1||B.indexOf("android")>-1){if(!!document.documentElement.scrollTop){document.documentElement.scrollTop=0
}else{if(!!document.body.scrollTop){document.body.scrollTop=0
}}}var C=A.byId(this.widgetId);
if(C){C.focus();
if(this._callback!=null){this._callback.call(this._callback,this._portlet_id)
}}},setCallback:function(B,C){this._portlet_id=B;
this._callback=C
},setParam:function(B,C){this.params[B]=C
},setReloadIds:function(B){this.reloadIds=B
},clearParams:function(){this.params=new Array()
},clearReloadIds:function(){this.reloadIds=new Array()
},reload:function(B){this.href=B;
this.isPositionLock=true;
this.refresh()
},_position:function(){if(A.hasClass(A.body(),"dojoMove")){return 
}var B=dijit.getViewport();
var D=A.marginBox(this.domNode);
var C=this.domNode.style;
C.left=Math.floor((B.l+(B.w-D.w)/2))+"px";
if(Math.floor((B.t+(B.h-D.h)/2))>0){C.top=Math.floor((B.t+(B.h-D.h)/2))+"px"
}else{C.top=0+"px"
}},layout:function(){if(this.domNode.style.display=="block"){this._underlay.layout()
}},_downloadExternalContent:function(){this._onUnloadHandler();
this._setContent(this.onDownloadStart.call(this));
var C=this;
var D={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text",content:this.params,headers:{X_REQUESTED_WITH:"XMLHttpRequest"}};
if(A.isObject(this.ioArgs)){A.mixin(D,this.ioArgs)
}var B=this._xhrDfd=(this.ioMethod||A.xhrPost)(D);
B.addCallback(function(E){C.clearParams();
C.clearReloadIds();
try{C.onDownloadEnd.call(C);
C._isDownloaded=true;
C.setContent.call(C,E)
}catch(F){C._onError.call(C,"Content",F)
}delete C._xhrDfd;
return E
});
B.addErrback(function(E){if(!B.cancelled){C._onError.call(C,"Download",E)
}delete C._xhrDfd;
return E
})
},hide:function(){dijit.Dialog.prototype.hide.apply(this);
A.query(".mb_dialoghide").removeClass("mb_dialoghide");
A.query("#modalDialog").removeClass("mb_dialog")
}})
}}});
dojo._xdResourceLoaded({depends:[["provide","aimluck.widget.Dropdown"],["require","dijit.form.Button"]],defineResource:function(A){if(!A._hasResource["aimluck.widget.Dropdown"]){A._hasResource["aimluck.widget.Dropdown"]=true;
A.provide("aimluck.widget.Dropdown");
A.require("dijit.form.Button");
A.declare("aimluck.widget.Dropdown",[dijit.form.DropDownButton],{inputWidth:"250px",hiddenId:"",hiddenValue:"",inputId:"",inputValue:"",selectId:"",iconURL:"",iconAlt:"",templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<span class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><span class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"><img src="${iconURL}" alt="${iconAlt}" style="cursor:pointer;cursor:hand;padding-right:2px" align="top" />\n\t</span><select name="${selectId}" id="${selectId}" size="10" multiple="multiple" style="display:none" dojoAttachPoint="selectNode"></select><input type="hidden" id="${hiddenId}" name="${hiddenId}" value="${hiddenValue}" dojoAttachPoint="valueNode" /><span name="${inputId}" id="${inputId}" dojoAttachPoint="inputNode">${inputValue}</span>\n</div></div>\n',_openDropDown:function(){this.inherited(arguments);
var C=window.navigator.userAgent.toLowerCase();
if(C.indexOf("chrome")>-1||(A.isFF&&(A.isFF>=3.6))){var B=this.dropDown.domNode.parentNode;
var D=B.style.top.replace("px","");
top_new=parseInt(D)+window.scrollY;
B.style.top=top_new+"px"
}},_toggleDropDown:function(){if(this.disabled){return 
}dijit.focus(this.popupStateNode);
var D=this.dropDown;
if(!D){return false
}if(!this._opened){if(D.href&&!D.isLoaded){var B=this;
var C=A.connect(D,"onLoad",function(){A.disconnect(C);
B._openDropDown()
});
D._loadCheck(true);
return 
}else{this._openDropDown()
}}else{this._closeDropDown()
}}})
}}});
dojo._xdResourceLoaded({depends:[["provide","aimluck.widget.Menu"],["provide","aimluck.widget.Menuitem"],["provide","aimluck.widget.Menuseparator"],["provide","aimluck.widget.Menubar"],["provide","aimluck.widget.DropDownButton"],["require","dijit.layout.ContentPane"],["require","dijit.Menu"],["require","dijit.Toolbar"],["require","dijit.form.Button"]],defineResource:function(A){if(!A._hasResource["aimluck.widget.Menu"]){A._hasResource["aimluck.widget.Menu"]=true;
A.provide("aimluck.widget.Menu");
A.provide("aimluck.widget.Menuitem");
A.provide("aimluck.widget.Menuseparator");
A.provide("aimluck.widget.Menubar");
A.provide("aimluck.widget.DropDownButton");
A.require("dijit.layout.ContentPane");
A.require("dijit.Menu");
A.require("dijit.Toolbar");
A.require("dijit.form.Button");
A.declare("aimluck.widget.Menuitem",[dijit.MenuItem],{label:"",iconSrc:"",iconClass:"",url:"",templateString:'<tr class="dijitReset dijitMenuItem"dojoAttachEvent="onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick"><td class="dijitReset"><div class="dijitMenuItemIcon ${iconClass} menuItemIcon" dojoAttachPoint="iconNode" ></div></td><td tabIndex="-1" class="dijitReset dijitMenuItemLabel" dojoAttachPoint="containerNode" waiRole="menuitem" nowrap="nowrap"></td><td class="dijitReset" dojoAttachPoint="arrowCell"><div class="dijitMenuExpand" dojoAttachPoint="expand" style="display:none"><span class="dijitInline moz-inline-box dijitArrowNode dijitMenuExpandInner">+</span></div></td></tr>',onClick:function(){location.href=this.url
}});
A.declare("aimluck.widget.MenuButton",[dijit.form.Button],{label:"",iconSrc:"",iconClass:"",url:"",itemClass:"",templateString:'<div class="dijit dijitLeft dijitInline moz-inline-box dijitButton"\n\tdojoAttachEvent="onclick:_onButtonClick,onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse"><div class=\'dijitRight\'><button class="dijitStretch dijitButtonNode dijitButtonContents  ${itemClass}" dojoAttachPoint="focusNode,titleNode"\n\t\t\ttype="${type}" waiRole="button" waiState="labelledby-${id}_label"><div class="dijitInline ${iconClass} menuItemIcon " dojoAttachPoint="iconNode"></div><span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span></button></div></div>\n',onClick:function(){location.href=this.url
}});
A.declare("aimluck.widget.Menu",[dijit.Menu],{templateString:'<table class="popupMenu dijitMenuTable" waiRole="menu" dojoAttachEvent="onkeypress:_onKeyPress"><tbody class="dijitReset" dojoAttachPoint="containerNode"></tbody></table>'});
A.declare("aimluck.widget.Menuseparator",[dijit.MenuSeparator],{templateString:'<tr class="menuSeparator"><td colspan=4><div class="menuSeparatorTop"></div><div class="menuSeparatorBottom"></div></td></tr>'});
A.declare("aimluck.widget.ToolbarSeparator",[dijit.ToolbarSeparator],{templateString:'<div class="dijitInline moz-inline-box">&nbsp;｜&nbsp;</div>',postCreate:function(){A.setSelectable(this.domNode,false)
},isFocusable:function(){return false
}});
A.declare("aimluck.widget.DropDownButton",[dijit.form.DropDownButton],{label:"",iconSrc:"",iconClass:"",templateString:'<div class="dijit dijitLeft dijitInline moz-inline-box"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<button class="dijitStretch dijitButtonNode dijitButtonContents" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><div class="dijitInline ${iconClass} menuItemIcon" dojoAttachPoint="iconNode"></div><span class="dijitButtonText" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label">${label}</span\n\t\t><span class=\'dijitA11yDownArrow\'>&#9660;</span>\n\t</button>\n</div></div>\n'});
A.declare("aimluck.widget.ComboButton",[dijit.form.ComboButton],{url:"",itemClass:"",templateString:'<table class=\'dijit dijitReset dijitInline dijitLeft moz-inline-box ${itemClass} \'\n\tcellspacing=\'0\' cellpadding=\'0\'\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse">\n\t<tr>\n\t\t<td\tclass="dijitStretch dijitButtonContents dijitButtonNode"\n\t\t\ttabIndex="${tabIndex}"\n\t\t\tdojoAttachEvent="ondijitclick:_onButtonClick"  dojoAttachPoint="titleNode"\n\t\t\twaiRole="button" waiState="labelledby-${id}_label">\n\t\t\t<div class="dijitMenuItemIcon ${iconClass} menuItemIcon" dojoAttachPoint="iconNode"></div>\n\t\t\t<span class="dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode">${label}</span>\n\t\t</td>\n\t\t<td class=\'dijitReset dijitRight dijitButtonNode dijitDownArrowButton\'\n\t\t\tdojoAttachPoint="popupStateNode,focusNode"\n\t\t\tdojoAttachEvent="ondijitclick:_onArrowClick, onkeypress:_onKey"\n\t\t\tstateModifier="DownArrow"\n\t\t\ttitle="${optionsTitle}" name="${name}"\n\t\t\twaiRole="button" waiState="haspopup-true"\n\t\t><div waiRole="presentation">&#9660;</div>\n\t</td></tr>\n</table>\n',onClick:function(){location.href=this.url
}});
A.declare("aimluck.widget.Menubar",[dijit.Toolbar],{selectedIndex:-1,templateString:'<div class="tundra"><div class="dijit dijitToolbar" waiRole="toolbar" tabIndex="${tabIndex}" dojoAttachPoint="containerNode"></div></div>',postCreate:function(){dijit.Toolbar.superclass.postCreate.apply(this,arguments);
this.makeMenu(this.items);
this.isShowingNow=true
},makeMenu:function(C){var D=this;
var B=0;
A.forEach(C,function(F){if(F.submenu){var H=new aimluck.widget.Menu({id:F.caption,style:"display: none;"});
A.forEach(F.submenu,function(I){if(I!=null){if(I.caption){H.addChild(new aimluck.widget.Menuitem({label:I.caption,url:I.url,iconClass:I.iconClass}))
}else{H.addChild(new aimluck.widget.Menuseparator())
}}});
var E="";
if(D.selectedIndex==parseInt(B)){E+="menuBarItemSelected"
}var G=new aimluck.widget.ComboButton({label:F.caption,iconClass:F.iconClass,dropDown:H,url:F.url,itemClass:E});
G.addChild(H);
D.addChild(G)
}else{if(F.url){var E="";
if(D.selectedIndex==B){E+="menuBarItemSelected"
}var G=new aimluck.widget.MenuButton({id:F.caption+"_Button"+B,label:F.caption,url:F.url,iconClass:F.iconClass,itemClass:E});
D.addChild(G)
}else{D.addChild(new aimluck.widget.ToolbarSeparator())
}}B++
})
}})
}}});
dojo._xdResourceLoaded({depends:[["provide","aipo.widget.ActivityList"],["require","dijit._Widget"],["require","dijit._Templated"],["require","aimluck.widget.Contentpane"]],defineResource:function(A){if(!A._hasResource["aipo.widget.ActivityList"]){A._hasResource["aipo.widget.ActivityList"]=true;
A.provide("aipo.widget.ActivityList");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.require("aimluck.widget.Contentpane");
A.declare("aipo.widget.ActivityList",[dijit._Widget,dijit._Templated],{widgetId:"",templateString:'<div id="${widgetId}" widgetId="${widgetId}"><div class="activityPopup"><div class="clearfix"><div id="activityListPane" widgetId="activityListPane"></div></div></div></div>\n',postCreate:function(){},reload:function(){var B=dijit.byId("activityListPane");
if(!B){B=new aimluck.widget.Contentpane({},"activityListPane")
}if(window.webkitNotifications){B.viewPage("?template=ActivityListScreen&s=1&p="+window.webkitNotifications.checkPermission())
}else{B.viewPage("?template=ActivityListScreen&s=0")
}}})
}}});
dojo._xdResourceLoaded({depends:[["provide","aipo.widget.GroupSelectList"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(A){if(!A._hasResource["aipo.widget.GroupSelectList"]){A._hasResource["aipo.widget.GroupSelectList"]=true;
A.provide("aipo.widget.GroupSelectList");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.declare("aipo.widget.GroupSelectList",[dijit._Widget,dijit._Templated],{inputWidth:"95%",hiddenId:"",hiddenValue:"",inputId:"",inputValue:"",memberLimit:0,groupSelectId:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",widgetId:"",selectId:"",inputId:"",buttonAddId:"",buttonRemoveId:"",memberFromTitle:"",memberFromId:"",memberToTitle:"",memberToId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",templateString:'<div id="${widgetId}" widgetId="${widgetId}"><table class="none"><tr><td><div id="groupPopupDiv"><div class="outer"><div class="popup"><div class="clearfix"><div class="memberlistToTop">${memberToTitle}</div><div class="memberlistFromTop">${memberFromTitle}</div></div><div class="clearfix"><div class="memberlistToBody"><select size="10" multiple="multiple" style="width:100%" name="${memberToId}" id="${memberToId}"></select></div><div class="memberlistFromBody"><select size="10" multiple="multiple" style="width:100%" name="${memberFromId}" id="${memberFromId}"></select></div></div><div class="clearfix"><div class="memberlistToBottom"><div class="alignright"><input id="${buttonRemoveId}" name="${buttonRemoveId}" type="button" class="button" value="\u3000\u524a\u9664\u3000" dojoAttachEvent="onclick:onMemberRemoveClick"/></div></div><div class="memberlistFromBottom"><div class="alignright"><input id="${buttonAddId}" name="${buttonAddId}" type="button" class="button" value="\u3000\uff1c\u0020\u8ffd\u52a0\u3000" dojoAttachEvent="onclick:onMemberAddClick"/></div></div></div></div></div></div></td></tr></table></div>\n',postCreate:function(){this.id=this.widgetId;
params={url:this.memberFromUrl,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,params)
},addOption:function(B,C,D,E){aimluck.io.addOption(B,C,D,E)
},addOptionSync:function(F,G,H){var C=A.byId(this.memberToId);
var B=A.byId(this.selectId);
if(this.memberLimit!=0&&C.options.length>=this.memberLimit){return 
}if(document.all){var E=document.createElement("OPTION");
E.value=F;
E.text=G;
E.selected=H;
var D=document.createElement("OPTION");
D.value=F;
D.text=G;
D.selected=H;
if(C.options.length==1&&C.options[0].value==""){C.options.remove(0);
B.options.remove(0)
}C.add(E,C.options.length);
B.add(D,B.options.length)
}else{var E=document.createElement("OPTION");
E.value=F;
E.text=G;
E.selected=H;
var D=document.createElement("OPTION");
D.value=F;
D.text=G;
D.selected=H;
if(C.options.length==1&&C.options[0].value==""){C.removeChild(C.options[0]);
B.removeChild(C.options[0])
}C.insertBefore(E,C.options[C.options.length]);
B.insertBefore(D,B.options[B.options.length])
}this.inputMemberSync()
},addMember:function(F,C){if(document.all){var B=F.options;
var G=C.options;
if(B.length==1&&B[0].value==""){return 
}for(i=0;
i<B.length;
i++){if(!B[i].selected){continue
}var E=false;
for(j=0;
j<G.length;
j++){if(G[j].value==B[i].value){E=true;
break
}}if(E){continue
}var D=document.createElement("OPTION");
D.value=B[i].value;
D.text=B[i].text;
D.selected=true;
if(G.length==1&&G[0].value==""){G.remove(0)
}if(this.memberLimit!=0&&C.options.length>=this.memberLimit){return 
}G.add(D,G.length)
}}else{var B=F.options;
var G=C.options;
if(B.length==1&&B[0].value==""){return 
}for(i=0;
i<B.length;
i++){if(!B[i].selected){continue
}var E=false;
for(j=0;
j<G.length;
j++){if(G[j].value==B[i].value){E=true;
break
}}if(E){continue
}var D=document.createElement("OPTION");
D.value=B[i].value;
D.text=B[i].text;
D.selected=true;
if(C.options.length==1&&C.options[0].value==""){C.removeChild(C.options[0])
}if(this.memberLimit!=0&&C.options.length>=this.memberLimit){return 
}C.insertBefore(D,G[G.length])
}}},removeAllMember:function(B){if(document.all){var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){C.remove(i);
i-=1
}}}else{var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){B.removeChild(C[i]);
i-=1
}}}},removeMember:function(B){if(document.all){var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){C.remove(i);
i-=1
}}}else{var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){B.removeChild(C[i]);
i-=1
}}}},removeMemberSync:function(){var D=A.byId(this.memberToId);
var C=A.byId(this.selectId);
if(document.all){var E=D.options;
var B=C.options;
for(i=0;
i<E.length;
i++){if(E[i].selected){E.remove(i);
B.remove(i);
i-=1
}}}else{var E=D.options;
var B=C.options;
for(i=0;
i<E.length;
i++){if(E[i].selected){D.removeChild(E[i]);
C.removeChild(B[i]);
i-=1
}}}},inputMemberSync:function(){var B=A.byId(this.selectId);
var C=A.byId(this.inputId);
var D="";
var E=B.options;
for(i=0;
i<E.length;
i++){if(i!=0){D+=", "
}D+=E[i].text
}C.innerHTML=D
},changeGroup:function(B){var E=B.target.options[B.target.selectedIndex].value;
var C=this.changeGroupUrl+"&groupname="+E;
var D={url:C,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,D)
},onMemberAddClick:function(B){this.addMember(A.byId(this.memberFromId),A.byId(this.memberToId));
this.addMember(A.byId(this.memberFromId),A.byId(this.selectId));
this.inputMemberSync()
},onMemberRemoveClick:function(B){this.removeMemberSync();
this.inputMemberSync()
}})
}}});
dojo._xdResourceLoaded({depends:[["provide","aipo.widget.GroupNormalSelectList"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(A){if(!A._hasResource["aipo.widget.GroupNormalSelectList"]){A._hasResource["aipo.widget.GroupNormalSelectList"]=true;
A.provide("aipo.widget.GroupNormalSelectList");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.declare("aipo.widget.GroupNormalSelectList",[dijit._Widget,dijit._Templated],{inputWidth:"95%",memberLimit:0,changeGroupUrl:"",widgetId:"",buttonAddId:"",buttonRemoveId:"",memberFromTitle:"",memberFromId:"",memberToTitle:"",memberToId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",templateString:'<div id="${widgetId}" widgetId="${widgetId}"><table class="none"><tr><td><div id="groupPopupDiv"><div class="outer"><div class="popup" style="width:335px"><div class="clearfix"><div class="memberlistToTop">${memberToTitle}</div><div class="memberlistFromTop">${memberFromTitle}</div></div><div class="clearfix"><div class="memberlistToBody"><select size="5" multiple="multiple" style="width:100%" name="${memberToId}" id="${memberToId}"></select></div><div class="memberlistFromBody"><select size="5" multiple="multiple" style="width:100%" name="${memberFromId}" id="${memberFromId}"></select></div></div><div class="clearfix"><div class="memberlistToBottom"><div class="alignright"><input id="${buttonRemoveId}" name="${buttonRemoveId}" type="button" class="button" value="\u3000\u524a\u9664\u3000" dojoAttachEvent="onclick:onMemberRemoveClick"/></div></div><div class="memberlistFromBottom"><div class="alignright"><input id="${buttonAddId}" name="${buttonAddId}" type="button" class="button" value="\u3000\uff1c \u8ffd\u52a0\u3000" dojoAttachEvent="onclick:onMemberAddClick"/></div></div></div></div></div></div></td></tr></table></div>\n',postCreate:function(){this.id=this.widgetId;
params={url:this.memberFromUrl,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,params)
},addOption:function(B,C,D,E){aimluck.io.addOption(B,C,D,E)
},addOptionSync:function(D,E,F){var B=A.byId(this.memberToId);
if(this.memberLimit!=0&&B.options.length>=this.memberLimit){return 
}if(document.all){var C=document.createElement("OPTION");
C.value=D;
C.text=E;
C.selected=F;
if(B.options.length==1&&B.options[0].value==""){B.options.remove(0)
}B.add(C,B.options.length)
}else{var C=document.createElement("OPTION");
C.value=D;
C.text=E;
C.selected=F;
if(B.options.length==1&&B.options[0].value==""){B.removeChild(B.options[0])
}B.insertBefore(C,B.options[B.options.length])
}},addMember:function(F,C){if(document.all){var B=F.options;
var G=C.options;
if(B.length==1&&B[0].value==""){return 
}for(i=0;
i<B.length;
i++){if(!B[i].selected){continue
}var E=false;
for(j=0;
j<G.length;
j++){if(G[j].value==B[i].value){E=true;
break
}}if(E){continue
}var D=document.createElement("OPTION");
D.value=B[i].value;
D.text=B[i].text;
D.selected=true;
if(G.length==1&&G[0].value==""){G.remove(0)
}if(this.memberLimit!=0&&C.options.length>=this.memberLimit){return 
}G.add(D,G.length)
}}else{var B=F.options;
var G=C.options;
if(B.length==1&&B[0].value==""){return 
}for(i=0;
i<B.length;
i++){if(!B[i].selected){continue
}var E=false;
for(j=0;
j<G.length;
j++){if(G[j].value==B[i].value){E=true;
break
}}if(E){continue
}var D=document.createElement("OPTION");
D.value=B[i].value;
D.text=B[i].text;
D.selected=true;
if(C.options.length==1&&C.options[0].value==""){C.removeChild(C.options[0])
}if(this.memberLimit!=0&&C.options.length>=this.memberLimit){return 
}C.insertBefore(D,G[G.length])
}}},removeAllMember:function(B){if(document.all){var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){C.remove(i);
i-=1
}}}else{var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){B.removeChild(C[i]);
i-=1
}}}},removeMember:function(B){if(document.all){var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){C.remove(i);
i-=1
}}}else{var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){B.removeChild(C[i]);
i-=1
}}}},removeMemberSync:function(){var B=A.byId(this.memberToId);
if(document.all){var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){C.remove(i);
i-=1
}}}else{var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){B.removeChild(C[i]);
i-=1
}}}},changeGroup:function(B){var E=B.target.options[B.target.selectedIndex].value;
var C=this.changeGroupUrl+"&groupname="+E;
var D={url:C,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,D)
},onMemberAddClick:function(B){this.addMember(A.byId(this.memberFromId),A.byId(this.memberToId))
},onMemberRemoveClick:function(B){this.removeMemberSync()
}})
}}});
dojo._xdResourceLoaded({depends:[["provide","aipo.widget.MemberSelectList"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(A){if(!A._hasResource["aipo.widget.MemberSelectList"]){A._hasResource["aipo.widget.MemberSelectList"]=true;
A.provide("aipo.widget.MemberSelectList");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.declare("aipo.widget.MemberSelectList",[dijit._Widget,dijit._Templated],{widgetId:"",inputWidth:"95%",hiddenId:"",hiddenValue:"",inputId:"",inputValue:"",selectId:"",memberFromId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",memberToTitle:"",memberToId:"",buttonAddId:"",buttonRemoveId:"",memberLimit:0,groupSelectId:"",groupSelectPreOptionKey:"",groupSelectPreOptionValue:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",templateString:'<div id="${widgetId}" widgetId="${widgetId}"><table class="none"><tr><td><div id="memberPopupDiv"><div class="outer"><div class="popup"><div class="clearfix"><div class="memberlistToTop" >${memberToTitle}</div><div class="memberlistFromTop"><select size="1" style="width:100%" name="${groupSelectId}" id="${groupSelectId}" dojoAttachEvent="onchange:changeGroup"></select></div></div><div class="clearfix"><div class="memberlistToBody"><select size="10" multiple="multiple" style="width:100%" name="${memberToId}" id="${memberToId}"></select></div><div class="memberlistFromBody"><select size="10" multiple="multiple" style="width:100%" name="${memberFromId}" id="${memberFromId}"></select></div></div><div class="clearfix"><div class="memberlistToBottom"><div class="alignright"><input id="${buttonRemoveId}" name="${buttonRemoveId}" type="button" class="button" value="\u3000\u524a\u9664\u3000"/ dojoAttachEvent="onclick:onMemberRemoveClick"></div></div><div class="memberlistFromBottom"><div class="alignright"><input id="${buttonAddId}" name="${buttonAddId}" type="button" class="button" value="\u3000\uff1c\u0020\u8ffd\u52a0\u3000"/ dojoAttachEvent="onclick:onMemberAddClick"></div></div></div></div></div></div></td></tr></table></div>\n',postCreate:function(){this.id=this.widgetId;
params={url:this.memberFromUrl,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,params);
params={url:this.memberGroupUrl,key:this.groupSelectOptionKey,value:this.groupSelectOptionValue,preOptions:{key:this.groupSelectPreOptionKey,value:this.groupSelectPreOptionValue}};
aimluck.io.createOptions(this.groupSelectId,params)
},addOption:function(B,C,D,E){aimluck.io.addOption(B,C,D,E)
},addOptionSync:function(F,G,H){var C=A.byId(this.memberToId);
var B=A.byId(this.selectId);
if(this.memberLimit!=0&&C.options.length>=this.memberLimit){return 
}if(document.all){var E=document.createElement("OPTION");
E.value=F;
E.text=G;
E.selected=H;
var D=document.createElement("OPTION");
D.value=F;
D.text=G;
D.selected=H;
if(C.options.length==1&&C.options[0].value==""){C.options.remove(0);
B.options.remove(0)
}C.add(E,C.options.length);
B.add(D,B.options.length)
}else{var E=document.createElement("OPTION");
E.value=F;
E.text=G;
E.selected=H;
var D=document.createElement("OPTION");
D.value=F;
D.text=G;
D.selected=H;
if(C.options.length==1&&C.options[0].value==""){C.removeChild(C.options[0]);
B.removeChild(C.options[0])
}C.insertBefore(E,C.options[C.options.length]);
B.insertBefore(D,B.options[B.options.length])
}this.inputMemberSync()
},addMember:function(F,C){if(document.all){var B=F.options;
var G=C.options;
if(B.length==1&&B[0].value==""){return 
}for(i=0;
i<B.length;
i++){if(!B[i].selected){continue
}var E=false;
for(j=0;
j<G.length;
j++){if(G[j].value==B[i].value){E=true;
break
}}if(E){continue
}var D=document.createElement("OPTION");
D.value=B[i].value;
D.text=B[i].text;
D.selected=true;
if(G.length==1&&G[0].value==""){G.remove(0)
}if(this.memberLimit!=0&&C.options.length>=this.memberLimit){return 
}G.add(D,G.length)
}}else{var B=F.options;
var G=C.options;
if(B.length==1&&B[0].value==""){return 
}for(i=0;
i<B.length;
i++){if(!B[i].selected){continue
}var E=false;
for(j=0;
j<G.length;
j++){if(G[j].value==B[i].value){E=true;
break
}}if(E){continue
}var D=document.createElement("OPTION");
D.value=B[i].value;
D.text=B[i].text;
D.selected=true;
if(C.options.length==1&&C.options[0].value==""){C.removeChild(C.options[0])
}if(this.memberLimit!=0&&C.options.length>=this.memberLimit){return 
}C.insertBefore(D,G[G.length])
}}},removeAllMember:function(B){if(document.all){var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){C.remove(i);
i-=1
}}}else{var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){B.removeChild(C[i]);
i-=1
}}}},removeMember:function(B){if(document.all){var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){C.remove(i);
i-=1
}}}else{var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){B.removeChild(C[i]);
i-=1
}}}},removeMemberSync:function(){var D=A.byId(this.memberToId);
var C=A.byId(this.selectId);
if(document.all){var E=D.options;
var B=C.options;
for(i=0;
i<E.length;
i++){if(E[i].selected){E.remove(i);
B.remove(i);
i-=1
}}}else{var E=D.options;
var B=C.options;
for(i=0;
i<E.length;
i++){if(E[i].selected){D.removeChild(E[i]);
C.removeChild(B[i]);
i-=1
}}}},inputMemberSync:function(){var B=A.byId(this.selectId);
var C=A.byId(this.inputId);
var D="";
var E=B.options;
for(i=0;
i<E.length;
i++){if(i!=0){D+=", "
}D+=E[i].text
}C.innerHTML=D
},changeGroup:function(B){var E=B.target.options[B.target.selectedIndex].value;
var C=this.changeGroupUrl+"&groupname="+E;
var D={url:C,key:this.memberFromOptionKey,value:this.memberFromOptionValue};
aimluck.io.createOptions(this.memberFromId,D)
},onMemberAddClick:function(B){this.addMember(A.byId(this.memberFromId),A.byId(this.memberToId));
this.addMember(A.byId(this.memberFromId),A.byId(this.selectId));
this.inputMemberSync()
},onMemberRemoveClick:function(B){this.removeMemberSync();
this.inputMemberSync()
}})
}}});
dojo._xdResourceLoaded({depends:[["provide","aipo.widget.MemberNormalSelectList"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(A){if(!A._hasResource["aipo.widget.MemberNormalSelectList"]){A._hasResource["aipo.widget.MemberNormalSelectList"]=true;
A.provide("aipo.widget.MemberNormalSelectList");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.declare("aipo.widget.MemberNormalSelectList",[dijit._Widget,dijit._Templated],{widgetId:"",memberFromId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",memberToTitle:"",memberToId:"",buttonAddId:"",buttonRemoveId:"",memberLimit:0,groupSelectId:"",groupSelectPreOptionKey:"",groupSelectPreOptionValue:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",templateString:'<div id="${widgetId}" widgetId="${widgetId}"><table class="none"><tr><td><div id="memberPopupDiv"><div class="outer"><div class="popup"><div class="clearfix"><div class="memberlistToTop" >${memberToTitle}</div><div class="memberlistFromTop"><select size="1" style="width:100%" name="${groupSelectId}" id="${groupSelectId}" dojoAttachEvent="onchange:changeGroup"></select></div></div><div class="clearfix"><div class="memberlistToBody"><select size="5" multiple="multiple" style="width:100%" name="${memberToId}" id="${memberToId}"></select></div><div class="memberlistFromBody"><select size="5" multiple="multiple" style="width:100%" name="${memberFromId}" id="${memberFromId}"></select></div></div><div class="clearfix"><div class="memberlistToBottom"><div class="alignright"><input id="${buttonRemoveId}" name="${buttonRemoveId}" type="button" class="button" value="\u3000\u524a\u9664\u3000"/ dojoAttachEvent="onclick:onMemberRemoveClick"></div></div><div class="memberlistFromBottom"><div style="display: none;" id="${widgetId}-memberlist-indicator" class="indicator alignleft">読み込み中</div><div class="alignright"><input id="${buttonAddId}" name="${buttonAddId}" type="button" class="button" value="\u3000\uff1c\u0020\u8ffd\u52a0\u3000"/ dojoAttachEvent="onclick:onMemberAddClick"></div></div></div></div></div></div></td></tr></table></div>\n',postCreate:function(){this.id=this.widgetId;
params={url:this.memberFromUrl,key:this.memberFromOptionKey,value:this.memberFromOptionValue,indicator:this.widgetId+"-memberlist-indicator"};
aimluck.io.createOptions(this.memberFromId,params);
params={url:this.memberGroupUrl,key:this.groupSelectOptionKey,value:this.groupSelectOptionValue,preOptions:{key:this.groupSelectPreOptionKey,value:this.groupSelectPreOptionValue}};
aimluck.io.createOptions(this.groupSelectId,params)
},addOption:function(B,C,D,E){aimluck.io.addOption(B,C,D,E)
},addOptionSync:function(D,E,F){var B=A.byId(this.memberToId);
if(this.memberLimit!=0&&B.options.length>=this.memberLimit){return 
}if(document.all){var C=document.createElement("OPTION");
C.value=D;
C.text=E;
C.selected=F;
if(B.options.length==1&&B.options[0].value==""){B.options.remove(0)
}B.add(C,B.options.length)
}else{var C=document.createElement("OPTION");
C.value=D;
C.text=E;
C.selected=F;
if(B.options.length==1&&B.options[0].value==""){B.removeChild(B.options[0])
}B.insertBefore(C,B.options[B.options.length])
}},addMember:function(F,C){if(document.all){var B=F.options;
var G=C.options;
if(B.length==1&&B[0].value==""){return 
}for(i=0;
i<B.length;
i++){if(!B[i].selected){continue
}var E=false;
for(j=0;
j<G.length;
j++){if(G[j].value==B[i].value){E=true;
break
}}if(E){continue
}var D=document.createElement("OPTION");
D.value=B[i].value;
D.text=B[i].text;
D.selected=true;
if(G.length==1&&G[0].value==""){G.remove(0)
}if(this.memberLimit!=0&&C.options.length>=this.memberLimit){return 
}G.add(D,G.length)
}}else{var B=F.options;
var G=C.options;
if(B.length==1&&B[0].value==""){return 
}for(i=0;
i<B.length;
i++){if(!B[i].selected){continue
}var E=false;
for(j=0;
j<G.length;
j++){if(G[j].value==B[i].value){E=true;
break
}}if(E){continue
}var D=document.createElement("OPTION");
D.value=B[i].value;
D.text=B[i].text;
D.selected=true;
if(C.options.length==1&&C.options[0].value==""){C.removeChild(C.options[0])
}if(this.memberLimit!=0&&C.options.length>=this.memberLimit){return 
}C.insertBefore(D,G[G.length])
}}},removeAllMember:function(B){if(document.all){var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){C.remove(i);
i-=1
}}}else{var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){B.removeChild(C[i]);
i-=1
}}}},removeMember:function(B){if(document.all){var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){C.remove(i);
i-=1
}}}else{var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){B.removeChild(C[i]);
i-=1
}}}},removeMemberSync:function(){var B=A.byId(this.memberToId);
if(document.all){var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){C.remove(i);
i-=1
}}}else{var C=B.options;
for(i=0;
i<C.length;
i++){if(C[i].selected){B.removeChild(C[i]);
i-=1
}}}},changeGroup:function(B){var E=B.target.options[B.target.selectedIndex].value;
var C=this.changeGroupUrl+"&groupname="+E;
var D={url:C,key:this.memberFromOptionKey,value:this.memberFromOptionValue,indicator:this.widgetId+"-memberlist-indicator"};
aimluck.io.createOptions(this.memberFromId,D)
},onMemberAddClick:function(B){this.addMember(A.byId(this.memberFromId),A.byId(this.memberToId))
},onMemberRemoveClick:function(B){this.removeMemberSync()
}})
}}});
dojo._xdResourceLoaded({depends:[["provide","aipo.workflow.MemberNormalSelectList"],["require","aipo.widget.MemberNormalSelectList"]],defineResource:function(B){if(!B._hasResource["aipo.workflow.MemberNormalSelectList"]){B._hasResource["aipo.workflow.MemberNormalSelectList"]=true;
B.provide("aipo.workflow.MemberNormalSelectList");
B.require("aipo.widget.MemberNormalSelectList");
B.declare("aipo.workflow.MemberNormalSelectList",[aipo.widget.MemberNormalSelectList],{addMember:function(I,M){if(document.all){var N=I.options;
var A=M.options;
if(N.length==1&&N[0].value==""){return 
}for(i=0;
i<N.length;
i++){if(!N[i].selected){continue
}var J=false;
for(j=0;
j<A.length;
j++){if(A[j].value==N[i].value){J=true;
break
}}if(J){continue
}var L=document.createElement("OPTION");
L.value=N[i].value;
L.text=N[i].text;
L.selected=true;
if(A.length==1&&A[0].value==""){A.remove(0)
}if(this.memberLimit!=0&&M.options.length>=this.memberLimit){return 
}var K=document.createElement("OPTION");
K.value=N[i].value;
K.text=(j+1)+". "+N[i].text;
K.selected=true;
A.add(K,A.length)
}}else{var N=I.options;
var A=M.options;
if(N.length==1&&N[0].value==""){return 
}for(i=0;
i<N.length;
i++){if(!N[i].selected){continue
}var J=false;
for(j=0;
j<A.length;
j++){if(A[j].value==N[i].value){J=true;
break
}}if(J){continue
}var L=document.createElement("OPTION");
L.value=N[i].value;
L.text=N[i].text;
L.selected=true;
if(M.options.length==1&&M.options[0].value==""){M.removeChild(M.options[0])
}if(this.memberLimit!=0&&M.options.length>=this.memberLimit){return 
}var K=document.createElement("OPTION");
K.value=N[i].value;
K.text=(j+1)+". "+N[i].text;
K.selected=true;
M.insertBefore(K,A[A.length])
}}},removeMemberSync:function(){var D=B.byId(this.memberToId);
if(document.all){var A=D.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){A.remove(i);
i-=1;
if(i+1<A.length){for(j=i+1;
j<A.length;
j++){if(j<9){A[j].text=A[j].text.slice(3)
}else{A[j].text=A[j].text.slice(4)
}A[j].text=(j+1)+". "+A[j].text
}}}}}else{var A=D.options;
for(i=0;
i<A.length;
i++){if(A[i].selected){D.removeChild(A[i]);
i-=1;
if(i+1<A.length){for(j=i+1;
j<A.length;
j++){if(j<9){A[j].text=A[j].text.slice(3)
}else{A[j].text=A[j].text.slice(4)
}A[j].text=(j+1)+". "+A[j].text
}}}}}}})
}}});
dojo._xdResourceLoaded({depends:[["provide","aipo.widget.DateCalendar"],["require","dijit._Calendar"]],defineResource:function(A){if(!A._hasResource["aipo.widget.DateCalendar"]){A._hasResource["aipo.widget.DateCalendar"]=true;
A.provide("aipo.widget.DateCalendar");
A.require("dijit._Calendar");
A.declare("aipo.widget.DateCalendar",[dijit._Calendar],{dateId:"",callback:function(){},templateString:'<table cellspacing="0" cellpadding="0" class="dijitCalendarContainer">\n\t<thead>\n\t\t<tr class="dijitReset dijitCalendarMonthContainer" valign="top">\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="decrementMonth">\n\t\t\t\t<span class="dijitInline dijitCalendarIncrementControl dijitCalendarDecrease"><span dojoAttachPoint="decreaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarDecreaseInner">-</span></span>\n\t\t\t</th>\n\t\t\t<th class=\'dijitReset\' colspan="5">\n\t\t\t\t<div dojoAttachPoint="monthLabelSpacer" class="dijitCalendarMonthLabelSpacer"></div>\n\t\t\t\t<div dojoAttachPoint="monthLabelNode" class="dijitCalendarMonth"></div>\n\t\t\t</th>\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="incrementMonth">\n\t\t\t\t<div class="dijitInline dijitCalendarIncrementControl dijitCalendarIncrease"><span dojoAttachPoint="increaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarIncreaseInner">+</span></div>\n\t\t\t</th>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<th class="dijitReset dijitCalendarDayLabelTemplate"><span class="dijitCalendarDayLabel"></span></th>\n\t\t</tr>\n\t</thead>\n\t<tbody dojoAttachEvent="onclick: _onDayClick" class="dijitReset dijitCalendarBodyContainer">\n\t\t<tr class="dijitReset dijitCalendarWeekTemplate">\n\t\t\t<td class="dijitReset dijitCalendarDateTemplate"><span class="dijitCalendarDateLabel"></span></td>\n\t\t</tr>\n\t</tbody>\n\t<tfoot class="dijitReset dijitCalendarYearContainer">\n\t\t<tr>\n\t\t\t<td class=\'dijitReset\' valign="top" colspan="7">\n\t\t\t\t<h3 class="dijitCalendarYearLabel">\n\t\t\t\t\t<span dojoAttachPoint="previousYearLabelNode" class="dijitInline dijitCalendarPreviousYear"></span>\n\t\t\t\t\t<span dojoAttachPoint="currentYearLabelNode" class="dijitInline dijitCalendarSelectedYear"></span>\n\t\t\t\t\t<span dojoAttachPoint="nextYearLabelNode" class="dijitInline dijitCalendarNextYear"></span>\n\t\t\t\t</h3>\n\t\t\t</td>\n\t\t</tr>\n\t</tfoot>\n</table>\t\n',postCreate:function(){this.inherited(arguments)
},onChange:function(B){this.onChangeNoCallback(B);
this.callback(B)
},onValueSelected:function(B){this.onChange(B)
},onChangeNoCallback:function(E){var K=E.getFullYear();
var D=1+E.getMonth();
var C=E.getDate();
var B=A.date.locale.getNames("days",this.dayWidth,"standAlone",this.lang);
var J=B[E.getDay()];
var G=A.byId(this.dateId+"_view");
G.innerHTML=K+"\u5e74"+D+"\u6708"+C+"\u65e5\uff08"+J+"\uff09";
var L=A.byId(this.dateId);
L.value=K+"/"+D+"/"+C;
var I=A.byId(this.dateId+"_year");
I.value=K;
var H=A.byId(this.dateId+"_month");
H.value=D;
var F=A.byId(this.dateId+"_day");
F.value=C;
A.byId(this.dateId+"_flag").checked=false
},disabledCalendar:function(D){if(D){var F=A.byId(this.dateId+"_view");
F.innerHTML="---- \u5e74 -- \u6708 -- \u65e5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
var I=A.byId(this.dateId+"_year");
I.value="";
var G=A.byId(this.dateId+"_month");
G.value="";
var E=A.byId(this.dateId+"_day");
E.value="";
this.value="";
if(!A.byId(this.dateId+"_flag").checked){A.byId(this.dateId+"_flag").checked=true
}}else{var L=A.byId(this.dateId);
if((!L.value)||(L.value=="")){this.setValue(new Date())
}else{var K=L.value.split("/");
if(K.length==3){var J=K[0];
var C=K[1]-1;
var H=K[2];
var B=new Date(J,C,H);
this.setValue(B)
}}}},clearDate:function(){this.value=null
}})
}}});
dojo._xdResourceLoaded({depends:[["provide","aipo.widget.DropdownActivityChecker"],["require","aimluck.widget.Dropdown"],["require","aipo.widget.ActivityList"]],defineResource:function(A){if(!A._hasResource["aipo.widget.DropdownActivityChecker"]){A._hasResource["aipo.widget.DropdownActivityChecker"]=true;
A.provide("aipo.widget.DropdownActivityChecker");
A.require("aimluck.widget.Dropdown");
A.require("aipo.widget.ActivityList");
A.declare("aipo.widget.DropdownActivityChecker",[aimluck.widget.Dropdown],{initValue:"",displayCheck:"",iconURL:"",iconAlt:"",iconWidth:"",iconHeight:"",callback:function(){},templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div style="outline:0" class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><div class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"><div id="activitychecker" class="zero counter"></div>お知らせ</div></div></div>\n',postCreate:function(){this.inherited(arguments);
this.dropDown=new aipo.widget.ActivityList({},"activityLiteList")
},_openDropDown:function(){this.inherited(arguments);
this.dropDown.reload()
},onCheckActivity:function(C){var B=A.byId("activitychecker");
if(C>99){B.innerHTML="99+";
A.removeClass("activitychecker","zero")
}else{if(C==0){B.innerHTML=C;
A.addClass("activitychecker","zero")
}else{B.innerHTML=C;
A.removeClass("activitychecker","zero")
}}},onCheckBlank:function(B){}})
}}});
dojo._xdResourceLoaded({depends:[["provide","aipo.widget.DropdownDatepicker"],["require","aimluck.widget.Dropdown"],["require","aipo.widget.DateCalendar"],["require","dojo.date.locale"]],defineResource:function(A){if(!A._hasResource["aipo.widget.DropdownDatepicker"]){A._hasResource["aipo.widget.DropdownDatepicker"]=true;
A.provide("aipo.widget.DropdownDatepicker");
A.require("aimluck.widget.Dropdown");
A.require("aipo.widget.DateCalendar");
A.require("dojo.date.locale");
A.declare("aipo.widget.DropdownDatepicker",[aimluck.widget.Dropdown],{dateId:"",dateValue:"",initValue:"",displayCheck:"",iconURL:"",iconAlt:"",callback:function(){},listWidgetId:"datewidget",templateString:'<div class="dijit dijitLeft dijitInline"><div dojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t style="float:left;"><div class=\'dijitRight\'>\n\t<span class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><span class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"><img src="${iconURL}" alt="${iconAlt}" style="cursor:pointer;cursor:hand;padding-right:2px" align="top" />\n\t</span></div></div><div class="alignleft"><span name="${dateId}_view" id="${dateId}_view" dojoAttachPoint="inputNode" style="vertical-align:middle;background:#ffffff ;border:0px;" autocomplete="off" readonly="readonly"></span><span style="display:${displayCheck}"><input name="${dateId}_check" type="checkbox" value="TRUE" id="${dateId}_flag" dojoAttachEvent="onclick:onCheckBlank" /><label for="${dateId}_flag">\u0020\u6307\u5b9a\u3057\u306a\u3044</label></span><input type="hidden" id="${dateId}" name="${dateId}" value="${dateValue}" dojoAttachPoint="valueNode" /><input type="hidden" id="${dateId}_year" name="${dateId}_year" value="" dojoAttachPoint="valueYearNode" /><input type="hidden" id="${dateId}_month" name="${dateId}_month" value="" dojoAttachPoint="valueMonthNode" /><input type="hidden" id="${dateId}_day" name="${dateId}_day" value="" dojoAttachPoint="valueDayNode" /></div></div>\n',_openDropDown:function(){aimluck.widget.Dropdown.prototype._openDropDown.apply(this);
if(aipo.userAgent.isAndroid()){A.query("input,select,button").forEach(function(C,B){C.disabled=true
})
}},_closeDropDown:function(){aimluck.widget.Dropdown.prototype._closeDropDown.apply(this);
if(aipo.userAgent.isAndroid()){A.query("input,select,button:not(.disabled)").forEach(function(C,B){C.disabled=false
})
}},postCreate:function(){this.inherited(arguments);
var G={widgetId:this.listWidgetId,dateId:this.dateId,callback:this.callback};
this.dropDown=new aipo.widget.DateCalendar(G,this.listWidgetId);
if(this.initValue!=""){var C=this.initValue.split("/");
if(C.length==3){var E=C[0];
var B=C[1]-1;
var D=C[2];
var F=A.byId(this.dateId);
F.value=this.initValue;
this.dropDown.clearDate();
this.dropDown.setValue(new Date(E,B,D))
}}else{this.dropDown.disabledCalendar(true)
}},onCheckBlank:function(B){this.dropDown.disabledCalendar(A.byId(this.dateId+"_flag").checked)
}})
}}});
dojo._xdResourceLoaded({depends:[["provide","aipo.widget.DropdownGrouppicker"],["require","aimluck.widget.Dropdown"],["require","aipo.widget.GroupSelectList"]],defineResource:function(A){if(!A._hasResource["aipo.widget.DropdownGrouppicker"]){A._hasResource["aipo.widget.DropdownGrouppicker"]=true;
A.provide("aipo.widget.DropdownGrouppicker");
A.require("aimluck.widget.Dropdown");
A.require("aipo.widget.GroupSelectList");
A.declare("aipo.widget.DropdownGrouppicker",[aimluck.widget.Dropdown],{inputWidth:"250px",hiddenId:"",hiddenValue:"",iconURL:"",iconAlt:"",selectId:"",inputId:"",inputValue:"",buttonAddId:"",buttonRemoveId:"",memberFromTitle:"",memberFromId:"",memberToTitle:"",memberToId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",groupSelectId:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",listWidgetId:"",templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<span class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><span class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"><img src="${iconURL}" alt="${iconAlt}" style="cursor:pointer;cursor:hand;padding-right:2px" align="top" />\n\t</span><select name="${selectId}" id="${selectId}" size="10" multiple="multiple" style="display:none" dojoAttachPoint="selectNode"></select><input type="hidden" id="${hiddenId}" name="${hiddenId}" value="${hiddenValue}" dojoAttachPoint="valueNode" /><span name="${inputId}" id="${inputId}" dojoAttachPoint="inputNode">${inputValue}</span>\n</div></div>\n',postCreate:function(){var C={widgetId:this.listWidgetId,selectId:this.selectId,inputId:this.inputId,buttonAddId:this.buttonAddId,buttonRemoveId:this.buttonRemoveId,memberFromTitle:this.memberFromTitle,memberFromId:this.memberFromId,memberToTitle:this.memberToTitle,memberToId:this.memberToId,memberFromUrl:this.memberFromUrl,memberFromOptionKey:this.memberFromOptionKey,memberFromOptionValue:this.memberFromOptionValue};
var D=dijit.byId(this.listWidgetId);
if(D){this.dropDown=D;
var B=A.byId(D.selectId);
this.removeAllOptions(B);
B=A.byId(D.memberToId);
this.removeAllOptions(B)
}else{this.dropDown=new aipo.widget.GroupSelectList(C,this.listWidgetId)
}this.inherited(arguments)
},removeAllOptions:function(B){var C;
if(document.all){var D=B.options;
for(C=0;
C<D.length;
C++){D.remove(C);
C-=1
}}else{var D=B.options;
for(C=0;
C<D.length;
C++){B.removeChild(D[C]);
C-=1
}}},addOptionSync:function(F,G,H){var C=A.byId(this.memberToId);
var B=A.byId(this.selectId);
if(this.memberLimit!=0&&C.options.length>=this.memberLimit){return 
}if(document.all){var E=document.createElement("OPTION");
E.value=F;
E.text=G;
E.selected=H;
var D=document.createElement("OPTION");
D.value=F;
D.text=G;
D.selected=H;
if(C.options.length==1&&C.options[0].value==""){C.options.remove(0);
B.options.remove(0)
}C.add(E,C.options.length);
B.add(D,B.options.length)
}else{var E=document.createElement("OPTION");
E.value=F;
E.text=G;
E.selected=H;
var D=document.createElement("OPTION");
D.value=F;
D.text=G;
D.selected=H;
if(C.options.length==1&&C.options[0].value==""){C.removeChild(C.options[0]);
B.removeChild(C.options[0])
}C.insertBefore(E,C.options[C.options.length]);
B.insertBefore(D,B.options[B.options.length])
}this.inputMemberSync()
},inputMemberSync:function(){var C=A.byId(this.selectId);
var D=A.byId(this.inputId);
var F="";
var G=C.options;
var E=0;
var B=G.length;
if(B<=0){return 
}for(E=0;
E<B;
E++){if(E!=0){F+=", "
}F+=G[E].text
}D.innerHTML=F
}})
}}});
dojo._xdResourceLoaded({depends:[["provide","aipo.widget.DropdownMemberpicker"],["require","aimluck.widget.Dropdown"],["require","aipo.widget.MemberSelectList"]],defineResource:function(A){if(!A._hasResource["aipo.widget.DropdownMemberpicker"]){A._hasResource["aipo.widget.DropdownMemberpicker"]=true;
A.provide("aipo.widget.DropdownMemberpicker");
A.require("aimluck.widget.Dropdown");
A.require("aipo.widget.MemberSelectList");
A.declare("aipo.widget.DropdownMemberpicker",[aimluck.widget.Dropdown],{inputWidth:"250px",hiddenId:"",hiddenValue:"",iconURL:"",iconAlt:"",selectId:"",inputId:"",inputValue:"",buttonAddId:"",buttonRemoveId:"",memberFromId:"",memberToTitle:"",memberToId:"",memberFromUrl:"",memberFromOptionKey:"",memberFromOptionValue:"",groupSelectId:"",groupSelectPreOptionKey:"",groupSelectPreOptionValue:"",groupSelectOptionKey:"",groupSelectOptionValue:"",memberGroupUrl:"",changeGroupUrl:"",listWidgetId:"memberlistwidget",templateString:'<div class="dijit dijitLeft dijitInline"\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onmousedown:_onMouse,onclick:_onDropDownClick,onkeydown:_onDropDownKeydown,onblur:_onDropDownBlur,onkeypress:_onKey"\n\t><div class=\'dijitRight\'>\n\t<span class="" type="${type}"\n\t\tdojoAttachPoint="focusNode,titleNode" waiRole="button" waiState="haspopup-true,labelledby-${id}_label"\n\t\t><span class="" \tdojoAttachPoint="containerNode,popupStateNode"\n\t\tid="${id}_label"><img src="${iconURL}" alt="${iconAlt}" style="cursor:pointer;cursor:hand;padding-right:2px" align="top" />\n\t</span><select name="${selectId}" id="${selectId}" size="10" multiple="multiple" style="display:none" dojoAttachPoint="selectNode"></select><input type="hidden" id="${hiddenId}" name="${hiddenId}" value="${hiddenValue}" dojoAttachPoint="valueNode" /><span name="${inputId}" id="${inputId}" dojoAttachPoint="inputNode">${inputValue}</span>\n</div></div>\n',postCreate:function(){var C={widgetId:this.listWidgetId,selectId:this.selectId,inputId:this.inputId,buttonAddId:this.buttonAddId,buttonRemoveId:this.buttonRemoveId,memberFromId:this.memberFromId,memberToTitle:this.memberToTitle,memberToId:this.memberToId,memberFromUrl:this.memberFromUrl,memberFromOptionKey:this.memberFromOptionKey,memberFromOptionValue:this.memberFromOptionValue,groupSelectId:this.groupSelectId,groupSelectPreOptionKey:this.groupSelectPreOptionKey,groupSelectPreOptionValue:this.groupSelectPreOptionValue,groupSelectOptionKey:this.groupSelectOptionKey,groupSelectOptionValue:this.groupSelectOptionValue,memberGroupUrl:this.memberGroupUrl,changeGroupUrl:this.changeGroupUrl};
var D=dijit.byId(this.listWidgetId);
if(D){this.dropDown=D;
var B=A.byId(D.selectId);
this.removeAllOptions(B);
B=A.byId(D.memberToId);
this.removeAllOptions(B)
}else{this.dropDown=new aipo.widget.MemberSelectList(C,this.listWidgetId)
}this.inherited(arguments)
},removeAllOptions:function(B){var C;
if(document.all){var D=B.options;
for(C=0;
C<D.length;
C++){D.remove(C);
C-=1
}}else{var D=B.options;
for(C=0;
C<D.length;
C++){B.removeChild(D[C]);
C-=1
}}},addOptionSync:function(F,G,H){var C=A.byId(this.memberToId);
var B=A.byId(this.selectId);
if(this.memberLimit!=0&&C.options.length>=this.memberLimit){return 
}if(document.all){var E=document.createElement("OPTION");
E.value=F;
E.text=G;
E.selected=H;
var D=document.createElement("OPTION");
D.value=F;
D.text=G;
D.selected=H;
if(C.options.length==1&&C.options[0].value==""){C.options.remove(0);
B.options.remove(0)
}C.add(E,C.options.length);
B.add(D,B.options.length)
}else{var E=document.createElement("OPTION");
E.value=F;
E.text=G;
E.selected=H;
var D=document.createElement("OPTION");
D.value=F;
D.text=G;
D.selected=H;
if(C.options.length==1&&C.options[0].value==""){C.removeChild(C.options[0]);
B.removeChild(C.options[0])
}C.insertBefore(E,C.options[C.options.length]);
B.insertBefore(D,B.options[B.options.length])
}this.inputMemberSync()
},inputMemberSync:function(){var C=A.byId(this.selectId);
var D=A.byId(this.inputId);
var F="";
var G=C.options;
var E=0;
var B=G.length;
if(B<=0){return 
}for(E=0;
E<B;
E++){if(E!=0){F+=", "
}F+=G[E].text
}D.innerHTML=F
}})
}}});
dojo._xdResourceLoaded({depends:[["provide","aipo.widget.ToolTip"],["require","dijit.Tooltip"]],defineResource:function(A){if(!A._hasResource["aipo.widget.ToolTip"]){A._hasResource["aipo.widget.ToolTip"]=true;
A.provide("aipo.widget.ToolTip");
A.require("dijit.Tooltip");
A.declare("aipo.widget._MasterToolTip",[dijit._MasterTooltip],{duration:100,postCreate:function(){A.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode)
},show:function(I,B,H,D){if(this.aroundNode&&this.aroundNode===B){return 
}if(B==null||B=="undefined"){return 
}if(this.domNode==null||this.domNode=="undefined"){return 
}this.containerNode.innerHTML=I;
this.domNode.style.width="150px";
this.domNode.style.top=(this.domNode.offsetTop+1)+"px";
try{var G=this.isLeftToRight()?{BR:"BL",BL:"BR"}:{BL:"BR",BR:"BL"};
var F=dijit.placeOnScreenAroundElement(this.domNode,B,G);
this.domNode.className="dijitTooltip dijitTooltip"+(F.corner=="BL"?"Right":"Left")
}catch(C){this.hide(B);
return 
}if(parseInt(this.domNode.style.left)<1){this.domNode.style.top=-10000+"px"
}else{var E=parseInt(aipo.widget.tmpY)-36;
this.domNode.style.top=E+"px"
}A.style(this.domNode,"opacity",1);
this.isShowingNow=true;
this.aroundNode=B;
if(H){H(this.containerNode,D)
}},hide:function(B){if(this.domNode){this.domNode.zIndex=0
}if(!this.aroundNode||this.aroundNode!==B){return 
}if(this._onDeck){this._onDeck=null;
return 
}this.domNode.style.top=-10000+"px";
A.style(this.domNode,"opacity",0);
this.isShowingNow=false;
this.aroundNode=null
}});
aipo.widget._masterTT=null;
aipo.widget.showTooltip=function(E,B,D,C){if(!aipo.widget._masterTT){aipo.widget._masterTT=new aipo.widget._MasterToolTip()
}return aipo.widget._masterTT.show(E,B,D,C)
};
aipo.widget.hideTooltip=function(B){if(!aipo.widget._masterTT){return 
}return aipo.widget._masterTT.hide(B)
};
A.declare("aipo.widget.ToolTip",[dijit.Tooltip],{origZIndex:0,_portletId:null,_callback:null,constructor:function(C,B,D){this._portletId=B;
this._callback=D
},open:function(B){B=B||this._connectNodes[0];
if(!B){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}aipo.widget.showTooltip(this.label||this.domNode.innerHTML,B,this._callback,this._connectNodes[0]);
this._connectNode=B
},close:function(){aipo.widget.hideTooltip(this._connectNode);
delete this._connectNode;
if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}},_onHover:function(C){if(ptConfig[this._portletId].isTooltipEnable!=true){return 
}if(!this._showTimer){var B=C.target;
aipo.widget.tmpX=C.pageX;
aipo.widget.tmpY=C.pageY;
this._showTimer=setTimeout(A.hitch(this,function(){this.open(B)
}),this.showDelay)
}},_onUnHover:function(B){if(this._focus){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}this.close()
}})
}}});
dojo._xdResourceLoaded({depends:[["provide","aipo.fileupload.widget.FileuploadDialog"],["provide","aipo.fileupload.widget.FileuploadDialogUnderlay"],["require","aimluck.widget.Dialog"]],defineResource:function(B){if(!B._hasResource["aipo.widget.FileuploadDialog"]){B._hasResource["aipo.widget.FileuploadDialog"]=true;
B.provide("aipo.fileupload.widget.FileuploadDialog");
B.provide("aipo.fileupload.widget.FileuploadDialogUnderlay");
B.require("aimluck.widget.Dialog");
B.declare("aipo.fileupload.widget.FileuploadDialogUnderlay",[aimluck.widget.DialogUnderlay],{templateString:"<div class=fileuploadDialogUnderlayWrapper id='${id}_underlay'><div class=fileuploadDialogUnderlay dojoAttachPoint='node'></div></div>"});
B.declare("aipo.fileupload.widget.FileuploadDialog",[aimluck.widget.Dialog],{loadingMessage:"<div class='indicator'>読み込み中...</div>",templateCssString:"fileuploadDialog",templateString:"<div id='fileuploadDialog' class='${templateCssString}' dojoattachpoint='wrapper'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>",_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new B.dnd.Moveable(this.domNode,{handle:this.titleBar})
}this._underlay=new aipo.fileupload.widget.FileuploadDialogUnderlay();
var A=this.domNode;
this._fadeIn=B.fx.combine([B.fadeIn({node:A,duration:this.duration}),B.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:B.hitch(this._underlay,"show")})]);
this._fadeOut=B.fx.combine([B.fadeOut({node:A,duration:this.duration,onEnd:function(){A.style.display="none"
}}),B.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:B.hitch(this._underlay,"hide")})])
}})
}}});
dojo._xdResourceLoaded({depends:[["provide","aipo.fileupload.widget.FileuploadViewDialog"],["provide","aipo.fileupload.widget.FileuploadViewDialogUnderlay"],["require","aimluck.widget.Dialog"]],defineResource:function(B){if(!B._hasResource["aipo.widget.FileuploadViewDialog"]){B._hasResource["aipo.widget.FileuploadViewDialog"]=true;
B.provide("aipo.fileupload.widget.FileuploadViewDialog");
B.provide("aipo.fileupload.widget.FileuploadViewDialogUnderlay");
B.require("aimluck.widget.Dialog");
B.declare("aipo.fileupload.widget.FileuploadViewDialogUnderlay",[aimluck.widget.DialogUnderlay],{templateString:"<div class='fileuploadDialogUnderlayWrapper modalDialogUnderlayWrapper' id='${id}_underlay'><div class='fileuploadViewDialogUnderlay modalDialogUnderlay' dojoAttachPoint='node'></div></div>"});
B.declare("aipo.fileupload.widget.FileuploadViewDialog",[aimluck.widget.Dialog],{loadingMessage:"<div class='indicator'>読み込み中...</div>",templateCssString:"auiPopup imgPopup fileuploadViewDialog",templateString:"<div id='fileuploadViewDialog' class='${templateCssString}' dojoattachpoint='wrapper'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>",_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new B.dnd.Moveable(this.domNode,{handle:this.titleBar})
}this._underlay=new aipo.fileupload.widget.FileuploadViewDialogUnderlay();
var A=this.domNode;
this._fadeIn=B.fx.combine([B.fadeIn({node:A,duration:this.duration}),B.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:B.hitch(this._underlay,"show")})]);
this._fadeOut=B.fx.combine([B.fadeOut({node:A,duration:this.duration,onEnd:function(){A.style.display="none"
}}),B.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:B.hitch(this._underlay,"hide")})])
}})
}}});
var gadgets=gadgets||{};
var shindig=shindig||{};
var osapi=osapi||{};
gadgets.config=function(){var C={};
var D;
return{register:function(B,G,H){var A=C[B];
if(!A){A=[];
C[B]=A
}A.push({validators:G||{},callback:H})
},get:function(A){if(A){return D[A]||{}
}return D
},init:function(T,M){D=T;
for(var B in C){if(C.hasOwnProperty(B)){var A=C[B],P=T[B];
for(var Q=0,R=A.length;
Q<R;
++Q){var O=A[Q];
if(P&&!M){var S=O.validators;
for(var N in S){if(S.hasOwnProperty(N)){if(!S[N](P[N])){throw new Error('Invalid config value "'+P[N]+'" for parameter "'+N+'" in component "'+B+'"')
}}}}if(O.callback){O.callback(T)
}}}}},EnumValidator:function(A){var B=[];
if(arguments.length>1){for(var G=0,H;
(H=arguments[G]);
++G){B.push(H)
}}else{B=A
}return function(F){for(var J=0,E;
(E=B[J]);
++J){if(F===B[J]){return true
}}return false
}
},RegExValidator:function(A){return function(B){return A.test(B)
}
},ExistsValidator:function(A){return typeof A!=="undefined"
},NonEmptyStringValidator:function(A){return typeof A==="string"&&A.length>0
},BooleanValidator:function(A){return typeof A==="boolean"
},LikeValidator:function(A){return function(G){for(var B in A){if(A.hasOwnProperty(B)){var H=A[B];
if(!H(G[B])){return false
}}}return true
}
}}
}();
gadgets.config.isGadget=false;
gadgets.config.isContainer=true;
gadgets.util=function(){function K(B){var A;
var D=B.indexOf("?");
var C=B.indexOf("#");
if(C===-1){A=B.substr(D+1)
}else{A=[B.substr(D+1,C-D-1),"&",B.substr(C+1)].join("")
}return A.split("&")
}var M=null;
var N={};
var O={};
var L=[];
var I={0:false,10:true,13:true,34:true,39:true,60:true,62:true,92:true,8232:true,8233:true};
function P(B,A){return String.fromCharCode(A)
}function J(A){N=A["core.util"]||{}
}if(gadgets.config){gadgets.config.register("core.util",null,J)
}return{getUrlParameters:function(A){var S=typeof A==="undefined";
if(M!==null&&S){return M
}var E={};
var H=K(A||document.location.href);
var C=window.decodeURIComponent?decodeURIComponent:unescape;
for(var F=0,G=H.length;
F<G;
++F){var D=H[F].indexOf("=");
if(D===-1){continue
}var T=H[F].substring(0,D);
var B=H[F].substring(D+1);
B=B.replace(/\+/g," ");
E[T]=C(B)
}if(S){M=E
}return E
},makeClosure:function(A,E,F){var B=[];
for(var C=2,D=arguments.length;
C<D;
++C){B.push(arguments[C])
}return function(){var R=B.slice();
for(var G=0,H=arguments.length;
G<H;
++G){R.push(arguments[G])
}return E.apply(A,R)
}
},makeEnum:function(C){var B,D,A={};
for(B=0;
(D=C[B]);
++B){A[D]=D
}return A
},getFeatureParameters:function(A){return typeof N[A]==="undefined"?null:N[A]
},hasFeature:function(A){return typeof N[A]!=="undefined"
},getServices:function(){return O
},registerOnLoadHandler:function(A){L.push(A)
},runOnLoadHandlers:function(){for(var A=0,B=L.length;
A<B;
++A){L[A]()
}},escape:function(D,F){if(!D){return D
}else{if(typeof D==="string"){return gadgets.util.escapeString(D)
}else{if(typeof D==="array"){for(var A=0,C=D.length;
A<C;
++A){D[A]=gadgets.util.escape(D[A])
}}else{if(typeof D==="object"&&F){var B={};
for(var E in D){if(D.hasOwnProperty(E)){B[gadgets.util.escapeString(E)]=gadgets.util.escape(D[E],true)
}}return B
}}}}return D
},escapeString:function(F){if(!F){return F
}var C=[],A,E;
for(var B=0,D=F.length;
B<D;
++B){A=F.charCodeAt(B);
E=I[A];
if(E===true){C.push("&#",A,";")
}else{if(E!==false){C.push(F.charAt(B))
}}}return C.join("")
},unescapeString:function(A){if(!A){return A
}return A.replace(/&#([0-9]+);/g,P)
},attachBrowserEvent:function(B,C,A,D){if(typeof B.addEventListener!="undefined"){B.addEventListener(C,A,D)
}else{if(typeof B.attachEvent!="undefined"){B.attachEvent("on"+C,A)
}else{gadgets.warn("cannot attachBrowserEvent: "+C)
}}},removeBrowserEvent:function(B,C,A,D){if(B.removeEventListener){B.removeEventListener(C,A,D)
}else{if(B.detachEvent){B.detachEvent("on"+C,A)
}else{gadgets.warn("cannot removeBrowserEvent: "+C)
}}}}
}();
gadgets.util.getUrlParameters();
var tamings___=tamings___||[];
tamings___.push(function(B){caja___.whitelistFuncs([[gadgets.util,"escapeString"],[gadgets.util,"getFeatureParameters"],[gadgets.util,"getUrlParameters"],[gadgets.util,"hasFeature"],[gadgets.util,"registerOnLoadHandler"],[gadgets.util,"unescapeString"]])
});
if(window.JSON&&window.JSON.parse&&window.JSON.stringify){gadgets.json=(function(){var B=/___$/;
return{parse:function(A){try{return window.JSON.parse(A)
}catch(D){return false
}},stringify:function(A){try{return window.JSON.stringify(A,function(C,F){return !B.test(C)?F:null
})
}catch(D){return null
}}}
})()
}else{gadgets.json=function(){function f(n){return n<10?"0"+n:n
}Date.prototype.toJSON=function(){return[this.getUTCFullYear(),"-",f(this.getUTCMonth()+1),"-",f(this.getUTCDate()),"T",f(this.getUTCHours()),":",f(this.getUTCMinutes()),":",f(this.getUTCSeconds()),"Z"].join("")
};
var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
function stringify(value){var a,i,k,l,r=/["\\\x00-\x1f\x7f-\x9f]/g,v;
switch(typeof value){case"string":return r.test(value)?'"'+value.replace(r,function(a){var c=m[a];
if(c){return c
}c=a.charCodeAt();
return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)
})+'"':'"'+value+'"';
case"number":return isFinite(value)?String(value):"null";
case"boolean":case"null":return String(value);
case"object":if(!value){return"null"
}a=[];
if(typeof value.length==="number"&&!value.propertyIsEnumerable("length")){l=value.length;
for(i=0;
i<l;
i+=1){a.push(stringify(value[i])||"null")
}return"["+a.join(",")+"]"
}for(k in value){if(k.match("___$")){continue
}if(value.hasOwnProperty(k)){if(typeof k==="string"){v=stringify(value[k]);
if(v){a.push(stringify(k)+":"+v)
}}}}return"{"+a.join(",")+"}"
}return""
}return{stringify:stringify,parse:function(text){if(/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/b-u]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){return eval("("+text+")")
}return false
}}
}()
}gadgets.json.flatten=function(G){var F={};
if(G===null||G===undefined){return F
}for(var E in G){if(G.hasOwnProperty(E)){var H=G[E];
if(null===H||undefined===H){continue
}F[E]=(typeof H==="string")?H:gadgets.json.stringify(H)
}}return F
};
var tamings___=tamings___||[];
tamings___.push(function(B){___.tamesTo(gadgets.json.stringify,safeJSON.stringify);
___.tamesTo(gadgets.json.parse,safeJSON.parse)
});
shindig.Auth=function(){var authToken=null;
var trusted=null;
function addParamsToToken(urlParams){var args=authToken.split("&");
for(var i=0;
i<args.length;
i++){var nameAndValue=args[i].split("=");
if(nameAndValue.length===2){var name=nameAndValue[0];
var value=nameAndValue[1];
if(value==="$"){value=encodeURIComponent(urlParams[name]);
args[i]=name+"="+value
}}}authToken=args.join("&")
}function init(configuration){var urlParams=gadgets.util.getUrlParameters();
var config=configuration["shindig.auth"]||{};
if(config.authToken){authToken=config.authToken
}else{if(urlParams.st){authToken=urlParams.st
}}if(authToken!==null){addParamsToToken(urlParams)
}if(config.trustedJson){trusted=eval("("+config.trustedJson+")")
}}gadgets.config.register("shindig.auth",null,init);
return{getSecurityToken:function(){return authToken
},updateSecurityToken:function(newToken){authToken=newToken
},getTrustedData:function(){return trusted
}}
};
shindig.auth=new shindig.Auth();
gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.wpm){gadgets.rpctx.wpm=function(){var H,I;
function J(B,A,C){if(typeof window.addEventListener!="undefined"){window.addEventListener(B,A,C)
}else{if(typeof window.attachEvent!="undefined"){window.attachEvent("on"+B,A)
}}}function F(B,A,C){if(window.removeEventListener){window.removeEventListener(B,A,C)
}else{if(window.detachEvent){window.detachEvent("on"+B,A)
}}}function G(B){var A=gadgets.json.parse(B.data);
if(!A||!A.f){return 
}var C=gadgets.rpc.getTargetOrigin(A.f);
if(typeof B.origin!=="undefined"?B.origin!==C:B.domain!==/^.+:\/\/([^:]+).*/.exec(C)[1]){return 
}H(A,B.origin)
}return{getCode:function(){return"wpm"
},isParentVerifiable:function(){return true
},init:function(B,A){H=B;
I=A;
J("message",G,false);
I("..",true);
return true
},setup:function(A,B){I(A,true);
return true
},call:function(D,A,B){var E=gadgets.rpc.getTargetOrigin(D);
var C=gadgets.rpc._getTargetWin(D);
if(E){window.setTimeout(function(){C.postMessage(gadgets.json.stringify(B),E)
},0)
}else{gadgets.error("No relay set (used as window.postMessage targetOrigin), cannot send cross-domain message")
}return true
}}
}()
}gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.flash){gadgets.rpctx.flash=function(){var k="___xpcswf";
var t=null;
var AA=false;
var z=null;
var AN=null;
var p=null;
var AM=100;
var s=50;
var AT=[];
var AL=null;
var AJ=0;
var o="_scr";
var AE="_pnt";
var AB=100;
var u=50;
var x=0;
var AF=null;
var l={};
var AR=window.location.protocol+"//"+window.location.host;
var w="___jsl";
var AG="_fm";
var AC;
function q(){window[w]=window[w]||{};
var B=window[w];
var A=B[AG]={};
AC=w+"."+AG;
return A
}var y=q();
function AK(A,C){var B=function(){A.apply({},arguments)
};
y[C]=y[C]||B;
return AC+"."+C
}function v(A){return A===".."?gadgets.rpc.RPC_ID:A
}function AQ(A){return A===".."?"INNER":"OUTER"
}function AO(A){if(AA){t=A.rpc.commSwf||"/xpc.swf"
}}gadgets.config.register("rpc",null,AO);
function n(){if(p===null&&document.body&&t){var A=t+"?cb="+Math.random()+"&origin="+AR+"&jsl=1";
var B=document.createElement("div");
B.style.height="1px";
B.style.width="1px";
var C='<object height="1" width="1" id="'+k+'" type="application/x-shockwave-flash"><param name="allowScriptAccess" value="always"></param><param name="movie" value="'+A+'"></param><embed type="application/x-shockwave-flash" allowScriptAccess="always" src="'+A+'" height="1" width="1"></embed></object>';
document.body.appendChild(B);
B.innerHTML=C;
p=B.firstChild
}++AJ;
if(AL!==null&&(p!==null||AJ>=s)){window.clearTimeout(AL)
}else{AL=window.setTimeout(n,AM)
}}function AS(){if(l[".."]){return 
}m("..");
x++;
if(x>=u&&AF!==null){window.clearTimeout(AF);
AF=null
}else{AF=window.setTimeout(AS,AB)
}}function AP(){if(p!==null){while(AT.length>0){var A=AT.shift();
var B=A.targetId;
p.setup(A.token,v(B),AQ(B))
}}}function AD(){AP();
if(AL!==null){window.clearTimeout(AL)
}AL=null
}AK(AD,"ready");
function AI(){if(!l[".."]&&AF===null){AF=window.setTimeout(AS,AB)
}}AK(AI,"setupDone");
function AH(A,D,F){var B=gadgets.rpc.getTargetOrigin(A);
var E=gadgets.rpc.getAuthToken(A);
var C="sendMessage_"+v(A)+"_"+E+"_"+AQ(A);
var G=p[C];
G.call(p,gadgets.json.stringify(F),B);
return true
}function r(A,D,E){var C=gadgets.json.parse(A);
var B=C[o];
if(B){AN(B,true);
l[B]=true;
if(B!==".."){m(B,true)
}return 
}window.setTimeout(function(){z(C,D)
},0)
}AK(r,"receiveMessage");
function m(D,A){var C=gadgets.rpc.RPC_ID;
var B={};
B[o]=A?"..":C;
B[AE]=C;
AH(D,C,B)
}return{getCode:function(){return"flash"
},isParentVerifiable:function(){return true
},init:function(A,B){z=A;
AN=B;
AA=true;
return true
},setup:function(A,B){AT.push({token:B,targetId:A});
if(p===null&&AL===null){AL=window.setTimeout(n,AM)
}AP();
return true
},call:AH,_receiveMessage:r,_ready:AD,_setupDone:AI}
}()
}gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.frameElement){gadgets.rpctx.frameElement=function(){var G="__g2c_rpc";
var J="__c2g_rpc";
var H;
var I;
function F(E,A,B){try{if(A!==".."){var L=window.frameElement;
if(typeof L[G]==="function"){if(typeof L[G][J]!=="function"){L[G][J]=function(K){H(gadgets.json.parse(K))
}
}L[G](gadgets.json.stringify(B));
return true
}}else{var C=document.getElementById(E);
if(typeof C[G]==="function"&&typeof C[G][J]==="function"){C[G][J](gadgets.json.stringify(B));
return true
}}}catch(D){}return false
}return{getCode:function(){return"fe"
},isParentVerifiable:function(){return false
},init:function(B,A){H=B;
I=A;
return true
},setup:function(A,E){if(A!==".."){try{var B=document.getElementById(A);
B[G]=function(L){H(gadgets.json.parse(L))
}
}catch(C){return false
}}if(A===".."){I("..",true);
var D=function(){window.setTimeout(function(){gadgets.rpc.call(A,gadgets.rpc.ACK)
},500)
};
gadgets.util.registerOnLoadHandler(D)
}return true
},call:function(C,A,B){return F(C,A,B)
}}
}()
}gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.nix){gadgets.rpctx.nix=function(){var L="GRPC____NIXVBS_wrapper";
var K="GRPC____NIXVBS_get_wrapper";
var S="GRPC____NIXVBS_handle_message";
var M="GRPC____NIXVBS_create_channel";
var N=10;
var O=500;
var P={};
var Q;
var R=0;
function T(){var A=P[".."];
if(A){return 
}if(++R>N){gadgets.warn("Nix transport setup failed, falling back...");
Q("..",false);
return 
}if(!A&&window.opener&&"GetAuthToken" in window.opener){A=window.opener;
if(A.GetAuthToken()==gadgets.rpc.getAuthToken("..")){var B=gadgets.rpc.getAuthToken("..");
A.CreateChannel(window[K]("..",B),B);
P[".."]=A;
window.opener=null;
Q("..",true);
return 
}}window.setTimeout(function(){T()
},O)
}return{getCode:function(){return"nix"
},isParentVerifiable:function(){return false
},init:function(A,D){Q=D;
if(typeof window[K]!=="unknown"){window[S]=function(E){window.setTimeout(function(){A(gadgets.json.parse(E))
},0)
};
window[M]=function(G,E,F){if(gadgets.rpc.getAuthToken(G)===F){P[G]=E;
Q(G,true)
}};
var B="Class "+L+"\n Private m_Intended\nPrivate m_Auth\nPublic Sub SetIntendedName(name)\n If isEmpty(m_Intended) Then\nm_Intended = name\nEnd If\nEnd Sub\nPublic Sub SetAuth(auth)\n If isEmpty(m_Auth) Then\nm_Auth = auth\nEnd If\nEnd Sub\nPublic Sub SendMessage(data)\n "+S+"(data)\nEnd Sub\nPublic Function GetAuthToken()\n GetAuthToken = m_Auth\nEnd Function\nPublic Sub CreateChannel(channel, auth)\n Call "+M+"(m_Intended, channel, auth)\nEnd Sub\nEnd Class\nFunction "+K+"(name, auth)\nDim wrap\nSet wrap = New "+L+"\nwrap.SetIntendedName name\nwrap.SetAuth auth\nSet "+K+" = wrap\nEnd Function";
try{window.execScript(B,"vbscript")
}catch(C){return false
}}return true
},setup:function(C,B){if(C===".."){T();
return true
}try{var E=document.getElementById(C);
var D=window[K](C,B);
E.contentWindow.opener=D
}catch(A){return false
}return true
},call:function(B,C,D){try{if(P[B]){P[B].SendMessage(gadgets.json.stringify(D))
}}catch(A){return false
}return true
}}
}()
}gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.rmr){gadgets.rpctx.rmr=function(){var W=500;
var Y=10;
var V={};
var Q=gadgets.util.getUrlParameters()["parent"];
var O;
var U;
function S(B,D,C,E){var A=function(){document.body.appendChild(B);
B.src="about:blank";
if(E){B.onload=function(){R(E)
}
}B.src=D+"#"+C
};
if(document.body){A()
}else{gadgets.util.registerOnLoadHandler(function(){A()
})
}}function N(B){if(typeof V[B]==="object"){return 
}var A=document.createElement("iframe");
var D=A.style;
D.position="absolute";
D.top="0px";
D.border="0";
D.opacity="0";
D.width="10px";
D.height="1px";
A.id="rmrtransport-"+B;
A.name=A.id;
var C=gadgets.rpc.getRelayUrl(B);
var E=gadgets.rpc.getOrigin(Q);
if(!C){C=E+"/robots.txt"
}V[B]={frame:A,receiveWindow:null,relayUri:C,relayOrigin:E,searchCounter:0,width:10,waiting:true,queue:[],sendId:0,recvId:0,verifySendToken:String(Math.random()),verifyRecvToken:null,originVerified:false};
if(B!==".."){S(A,C,P(B))
}Z(B)
}function Z(C){var A=null;
V[C].searchCounter++;
try{var D=gadgets.rpc._getTargetWin(C);
if(C===".."){A=D.frames["rmrtransport-"+gadgets.rpc.RPC_ID]
}else{A=D.frames["rmrtransport-.."]
}}catch(B){}var E=false;
if(A){E=X(C,A)
}if(!E){if(V[C].searchCounter>Y){return 
}window.setTimeout(function(){Z(C)
},W)
}}function T(G,E,A,B){var F=null;
if(A!==".."){F=V[".."]
}else{F=V[G]
}if(F){if(E!==gadgets.rpc.ACK){F.queue.push(B)
}if(F.waiting||(F.queue.length===0&&!(E===gadgets.rpc.ACK&&B&&B.ackAlone===true))){return true
}if(F.queue.length>0){F.waiting=true
}var H=F.relayUri+"#"+P(G);
try{F.frame.contentWindow.location=H;
var D=F.width==10?20:10;
F.frame.style.width=D+"px";
F.width=D
}catch(C){return false
}}return true
}function P(C){var B=V[C];
var D={id:B.sendId};
if(B){D.d=Array.prototype.slice.call(B.queue,0);
var A={s:gadgets.rpc.ACK,id:B.recvId};
if(!B.originVerified){A.sendToken=B.verifySendToken
}if(B.verifyRecvToken){A.recvToken=B.verifyRecvToken
}D.d.push(A)
}return gadgets.json.stringify(D)
}function R(B){var E=V[B];
var I=E.receiveWindow.location.hash.substring(1);
var A=gadgets.json.parse(decodeURIComponent(I))||{};
var L=A.d||[];
var K=false;
var F=false;
var D=0;
var M=(E.recvId-A.id);
for(var J=0;
J<L.length;
++J){var G=L[J];
if(G.s===gadgets.rpc.ACK){U(B,true);
E.verifyRecvToken=G.sendToken;
if(!E.originVerified&&G.recvToken&&String(G.recvToken)==String(E.verifySendToken)){E.originVerified=true
}if(E.waiting){F=true
}E.waiting=false;
var H=Math.max(0,G.id-E.sendId);
E.queue.splice(0,H);
E.sendId=Math.max(E.sendId,G.id||0);
continue
}K=true;
if(++D<=M){continue
}++E.recvId;
O(G,E.originVerified?E.relayOrigin:undefined)
}if(K||(F&&E.queue.length>0)){var C=(B==="..")?gadgets.rpc.RPC_ID:"..";
T(B,gadgets.rpc.ACK,C,{ackAlone:K})
}}function X(D,A){var E=V[D];
try{var F=false;
F="document" in A;
if(!F){return false
}F=typeof A.document=="object";
if(!F){return false
}var B=A.location.href;
if(B==="about:blank"){return false
}}catch(G){return false
}E.receiveWindow=A;
function C(){R(D)
}if(typeof A.attachEvent==="undefined"){A.onresize=C
}else{A.attachEvent("onresize",C)
}if(D===".."){S(E.frame,E.relayUri,P(D),D)
}else{R(D)
}return true
}return{getCode:function(){return"rmr"
},isParentVerifiable:function(){return true
},init:function(B,A){O=B;
U=A;
return true
},setup:function(A,C){try{N(A)
}catch(B){gadgets.warn("Caught exception setting up RMR: "+B);
return false
}return true
},call:function(C,A,B){return T(C,B.s,A,B)
}}
}()
}gadgets.rpctx=gadgets.rpctx||{};
if(!gadgets.rpctx.ifpc){gadgets.rpctx.ifpc=function(){var J=[];
var M=0;
var N;
var I=2000;
var K={};
function O(B){var D=[];
for(var A=0,C=B.length;
A<C;
++A){D.push(encodeURIComponent(gadgets.json.stringify(B[A])))
}return D.join("&")
}function P(A){var C;
for(var D=J.length-1;
D>=0;
--D){var E=J[D];
try{if(E&&(E.recyclable||E.readyState==="complete")){E.parentNode.removeChild(E);
if(window.ActiveXObject){J[D]=E=null;
J.splice(D,1)
}else{E.recyclable=false;
C=E;
break
}}}catch(B){}}if(!C){C=document.createElement("iframe");
C.style.border=C.style.width=C.style.height="0px";
C.style.visibility="hidden";
C.style.position="absolute";
C.onload=function(){this.recyclable=true
};
J.push(C)
}C.src=A;
window.setTimeout(function(){document.body.appendChild(C)
},0)
}function L(C,A){for(var B=A-1;
B>=0;
--B){if(typeof C[B]==="undefined"){return false
}}return true
}return{getCode:function(){return"ifpc"
},isParentVerifiable:function(){return true
},init:function(B,A){N=A;
N("..",true);
return true
},setup:function(A,B){N(A,true);
return true
},call:function(B,C,D){var U=gadgets.rpc.getRelayUrl(B);
++M;
if(!U){gadgets.warn("No relay file assigned for IFPC");
return false
}var X=null,W=[];
if(D.l){var F=D.a;
X=[U,"#",O([C,M,1,0,O([C,D.s,"","",C].concat(F))])].join("");
W.push(X)
}else{X=[U,"#",B,"&",C,"@",M,"&"].join("");
var A=encodeURIComponent(gadgets.json.stringify(D)),G=I-X.length,E=Math.ceil(A.length/G),H=0,V;
while(A.length>0){V=A.substring(0,G);
A=A.substring(G);
W.push([X,E,"&",H,"&",V].join(""));
H+=1
}}do{P(W.shift())
}while(W.length>0);
return true
},_receiveMessage:function(D,F){var E=D[1],G=parseInt(D[2],10),B=parseInt(D[3],10),A=D[D.length-1],C=G===1;
if(G>1){if(!K[E]){K[E]=[]
}K[E][B]=A;
if(L(K[E],G)){A=K[E].join("");
delete K[E];
C=true
}}if(C){F(gadgets.json.parse(decodeURIComponent(A)))
}}}
}()
}if(!window.gadgets.rpc){gadgets.rpc=function(){var Au="__cb";
var An="";
var Am="__ack";
var Aa=500;
var A0=10;
var Ae="|";
var AM="callback";
var AZ="origin";
var AO="referer";
var AP={};
var Aj={};
var A3={};
var A5={};
var AE=0;
var AU={};
var AT={};
var Ap={};
var Ac={};
var AS={};
var A2={};
var Ab=null;
var AQ=null;
var AD=(window.top!==window.self);
var AL=window.name;
var Ax=function(){};
var Aq=0;
var Ah=1;
var Af=2;
var AH=window.console;
var Ak=AH&&AH.log&&function(A){AH.log(A)
}||function(){};
var Ao=(function(){function A(B){return function(){Ak(B+": call ignored")
}
}return{getCode:function(){return"noop"
},isParentVerifiable:function(){return true
},init:A("init"),setup:A("setup"),call:A("call")}
})();
if(gadgets.util){Ac=gadgets.util.getUrlParameters()
}function Aw(){if(Ac.rpctx=="flash"){return gadgets.rpctx.flash
}if(Ac.rpctx=="rmr"){return gadgets.rpctx.rmr
}return typeof window.postMessage==="function"?gadgets.rpctx.wpm:typeof window.postMessage==="object"?gadgets.rpctx.wpm:window.ActiveXObject?(gadgets.rpctx.flash?gadgets.rpctx.flash:gadgets.rpctx.nix):navigator.userAgent.indexOf("WebKit")>0?gadgets.rpctx.rmr:navigator.product==="Gecko"?gadgets.rpctx.frameElement:gadgets.rpctx.ifpc
}function AV(A,C){if(AS[A]){return 
}var E=Az;
if(!C){E=Ao
}AS[A]=E;
var F=A2[A]||[];
for(var D=0;
D<F.length;
++D){var B=F[D];
B.t=A1(A);
E.call(A,B.f,B)
}A2[A]=[]
}var Ay=false,Al=false;
function As(){if(Al){return 
}function A(){Ay=true
}if(typeof window.addEventListener!="undefined"){window.addEventListener("unload",A,false)
}else{if(typeof window.attachEvent!="undefined"){window.attachEvent("onunload",A)
}}Al=true
}function AW(E,A,D,B,C){if(!A5[A]||A5[A]!==D){gadgets.error("Invalid auth token. "+A5[A]+" vs "+D);
Ax(A,Af)
}C.onunload=function(){if(AT[A]&&!Ay){Ax(A,Ah);
gadgets.rpc.removeReceiver(A)
}};
As();
B=gadgets.json.parse(decodeURIComponent(B))
}function Ag(A,D){if(A&&typeof A.s==="string"&&typeof A.f==="string"&&A.a instanceof Array){if(A5[A.f]){if(A5[A.f]!==A.t){gadgets.error("Invalid auth token. "+A5[A.f]+" vs "+A.t);
Ax(A.f,Af)
}}if(A.s===Am){window.setTimeout(function(){AV(A.f,true)
},0);
return 
}if(A.c){A[AM]=function(F){gadgets.rpc.call(A.f,Au,null,A.c,F)
}
}if(D){var C=AN(D);
A[AZ]=D;
var B=A.r;
if(!B||AN(B)!=C){B=D
}A[AO]=B
}var E=(AP[A.s]||AP[An]).apply(A,A.a);
if(A.c&&typeof E!=="undefined"){gadgets.rpc.call(A.f,Au,null,A.c,E)
}}}function AN(E){if(!E){return""
}E=E.toLowerCase();
if(E.indexOf("//")==0){E=window.location.protocol+E
}if(E.indexOf("://")==-1){E=window.location.protocol+"//"+E
}var D=E.substring(E.indexOf("://")+3);
var G=D.indexOf("/");
if(G!=-1){D=D.substring(0,G)
}var B=E.substring(0,E.indexOf("://"));
var C="";
var A=D.indexOf(":");
if(A!=-1){var F=D.substring(A+1);
D=D.substring(0,A);
if((B==="http"&&F!=="80")||(B==="https"&&F!=="443")){C=":"+F
}}return B+"://"+D+C
}function A4(A,B){return"/"+A+(B?Ae+B:"")
}function AF(A){if(A.charAt(0)=="/"){var C=A.indexOf(Ae);
var B=C>0?A.substring(1,C):A.substring(1);
var D=C>0?A.substring(C+1):null;
return{id:B,origin:D}
}else{return null
}}function AG(A){if(typeof A==="undefined"||A===".."){return window.parent
}var B=AF(A);
if(B){return window.top.frames[B.id]
}A=String(A);
var C=window.frames[A];
if(C){return C
}C=document.getElementById(A);
if(C&&C.contentWindow){return C.contentWindow
}return null
}function Av(A){var B=null;
var D=Ar(A);
if(D){B=D
}else{var C=AF(A);
if(C){B=C.origin
}else{if(A==".."){B=Ac.parent
}else{B=document.getElementById(A).src
}}}return AN(B)
}var Az=Aw();
AP[An]=function(){Ak("Unknown RPC service: "+this.s)
};
AP[Au]=function(B,C){var A=AU[B];
if(A){delete AU[B];
A.call(this,C)
}};
function Ai(A,C){if(AT[A]===true){return 
}if(typeof AT[A]==="undefined"){AT[A]=0
}var B=AG(A);
if(A===".."||B!=null){if(Az.setup(A,C)===true){AT[A]=true;
return 
}}if(AT[A]!==true&&AT[A]++<A0){window.setTimeout(function(){Ai(A,C)
},Aa)
}else{AS[A]=Ao;
AT[A]=true
}}function At(E,B){if(typeof Ap[E]==="undefined"){Ap[E]=false;
var C=Ar(E);
if(AN(C)!==AN(window.location.href)){return false
}var D=AG(E);
try{var A=D.gadgets;
Ap[E]=A.rpc.receiveSameDomain
}catch(F){}}if(typeof Ap[E]==="function"){Ap[E](B);
return true
}return false
}function Ar(A){var B=Aj[A];
if(B&&B.substring(0,1)==="/"){if(B.substring(1,2)==="/"){B=document.location.protocol+B
}else{B=document.location.protocol+"//"+document.location.host+B
}}return B
}function AJ(B,C,A){if(!/http(s)?:\/\/.+/.test(C)){if(C.indexOf("//")==0){C=window.location.protocol+C
}else{if(C.charAt(0)=="/"){C=window.location.protocol+"//"+window.location.host+C
}else{if(C.indexOf("://")==-1){C=window.location.protocol+"//"+C
}}}}Aj[B]=C;
A3[B]=!!A
}function A1(A){return A5[A]
}function Ad(B,A){A=A||"";
A5[B]=String(A);
Ai(B,A)
}function AK(B){var C=B.passReferrer||"";
var A=C.split(":",2);
Ab=A[0]||"none";
AQ=A[1]||"origin"
}function AY(B,C){function A(E){var F=E?E.rpc:{};
var D=String(F.useLegacyProtocol)==="true";
AK(F);
var G=F.parentRelayUrl||"";
G=AN(Ac.parent||C)+G;
AJ("..",G,D);
if(D){Az=gadgets.rpctx.ifpc;
Az.init(Ag,AV)
}Ad("..",B)
}if(!Ac.parent&&C){A({});
return 
}gadgets.config.register("rpc",null,A)
}function AR(F,B,H){if(F.charAt(0)!="/"){if(!gadgets.util){return 
}var C=document.getElementById(F);
if(!C){throw new Error("Cannot set up gadgets.rpc receiver with ID: "+F+", element not found.")
}}var G=C&&C.src;
var E=B||gadgets.rpc.getOrigin(G);
AJ(F,E);
var A=gadgets.util.getUrlParameters(G);
var D=H||A.rpctoken;
Ad(F,D)
}function AX(D,B,A){if(D===".."){var C=A||Ac.rpctoken||Ac.ifpctok||"";
AY(C,B)
}else{AR(D,B,A)
}}function AI(B){if(Ab==="bidir"||(Ab==="c2p"&&B==="..")||(Ab==="p2c"&&B!=="..")){var C=window.location.href;
var A="?";
if(AQ==="query"){A="#"
}else{if(AQ==="hash"){return C
}}var D=C.lastIndexOf(A);
D=D===-1?C.length:D;
return C.substring(0,D)
}return null
}return{config:function(A){if(typeof A.securityCallback==="function"){Ax=A.securityCallback
}},register:function(A,B){if(A===Au||A===Am){throw new Error("Cannot overwrite callback/ack service")
}if(A===An){throw new Error("Cannot overwrite default service: use registerDefault")
}AP[A]=B
},unregister:function(A){if(A===Au||A===Am){throw new Error("Cannot delete callback/ack service")
}if(A===An){throw new Error("Cannot delete default service: use unregisterDefault")
}delete AP[A]
},registerDefault:function(A){AP[An]=A
},unregisterDefault:function(){delete AP[An]
},forceParentVerifiable:function(){if(!Az.isParentVerifiable()){Az=gadgets.rpctx.ifpc
}},call:function(G,E,H,B){G=G||"..";
var A="..";
if(G===".."){A=AL
}else{if(G.charAt(0)=="/"){A=A4(AL,gadgets.rpc.getOrigin(window.location.href))
}}++AE;
if(H){AU[AE]=H
}var C={s:E,f:A,c:H?AE:0,a:Array.prototype.slice.call(arguments,3),t:A5[G],l:A3[G]};
var F=AI(G);
if(F){C.r=F
}if(G!==".."&&AF(G)==null&&!document.getElementById(G)){return 
}if(At(G,C)){return 
}var D=AS[G];
if(!D&&AF(G)!==null){D=Az
}if(!D){if(!A2[G]){A2[G]=[C]
}else{A2[G].push(C)
}return 
}if(A3[G]){D=gadgets.rpctx.ifpc
}if(D.call(G,A,C)===false){AS[G]=Ao;
Az.call(G,A,C)
}},getRelayUrl:Ar,setRelayUrl:AJ,setAuthToken:Ad,setupReceiver:AX,getAuthToken:A1,removeReceiver:function(A){delete Aj[A];
delete A3[A];
delete A5[A];
delete AT[A];
delete Ap[A];
delete AS[A]
},getRelayChannel:function(){return Az.getCode()
},receive:function(A,B){if(A.length>4){Az._receiveMessage(A,Ag)
}else{AW.apply(null,A.concat(B))
}},receiveSameDomain:function(A){A.a=Array.prototype.slice.call(A.a);
window.setTimeout(function(){Ag(A)
},0)
},getOrigin:AN,getTargetOrigin:Av,init:function(){if(Az.init(Ag,AV)===false){Az=Ao
}if(AD){AX("..")
}else{gadgets.config.register("rpc",null,function(A){AK(A.rpc||{})
})
}},_getTargetWin:AG,_parseSiblingId:AF,ACK:Am,RPC_ID:AL||"..",SEC_ERROR_LOAD_TIMEOUT:Aq,SEC_ERROR_FRAME_PHISH:Ah,SEC_ERROR_FORGED_MSG:Af}
}();
gadgets.rpc.init()
}gadgets.io=function(){var config={};
var oauthState;
function makeXhr(){var x;
if(typeof shindig!="undefined"&&shindig.xhrwrapper&&shindig.xhrwrapper.createXHR){return shindig.xhrwrapper.createXHR()
}else{if(typeof ActiveXObject!="undefined"){x=new ActiveXObject("Msxml2.XMLHTTP");
if(!x){x=new ActiveXObject("Microsoft.XMLHTTP")
}return x
}else{if(typeof XMLHttpRequest!="undefined"||window.XMLHttpRequest){return new window.XMLHttpRequest()
}else{throw ("no xhr available")
}}}}function hadError(xobj,callback){if(xobj.readyState!==4){return true
}try{if(xobj.status!==200){var error=(""+xobj.status);
if(xobj.responseText){error=error+" "+xobj.responseText
}callback({errors:[error],rc:xobj.status,text:xobj.responseText});
return true
}}catch(e){callback({errors:[e.number+" Error not specified"],rc:e.number,text:e.description});
return true
}return false
}function processNonProxiedResponse(url,callback,params,xobj){if(hadError(xobj,callback)){return 
}var data={body:xobj.responseText};
callback(transformResponseData(params,data))
}var UNPARSEABLE_CRUFT="throw 1; < don't be evil' >";
function processResponse(url,callback,params,xobj){if(hadError(xobj,callback)){return 
}var txt=xobj.responseText;
var offset=txt.indexOf(UNPARSEABLE_CRUFT)+UNPARSEABLE_CRUFT.length;
if(offset<UNPARSEABLE_CRUFT.length){return 
}txt=txt.substr(offset);
var data=eval("("+txt+")");
data=data[url];
if(data.oauthState){oauthState=data.oauthState
}if(data.st){shindig.auth.updateSecurityToken(data.st)
}callback(transformResponseData(params,data))
}function transformResponseData(params,data){var resp={text:data.body,rc:data.rc||200,headers:data.headers,oauthApprovalUrl:data.oauthApprovalUrl,oauthError:data.oauthError,oauthErrorText:data.oauthErrorText,errors:[]};
if(resp.rc<200||resp.rc>=400){resp.errors=[resp.rc+" Error"]
}else{if(resp.text){if(resp.rc>=300&&resp.rc<400){params.CONTENT_TYPE="TEXT"
}switch(params.CONTENT_TYPE){case"JSON":case"FEED":resp.data=gadgets.json.parse(resp.text);
if(!resp.data){resp.errors.push("500 Failed to parse JSON");
resp.rc=500;
resp.data=null
}break;
case"DOM":var dom;
if(typeof ActiveXObject!="undefined"){dom=new ActiveXObject("Microsoft.XMLDOM");
dom.async=false;
dom.validateOnParse=false;
dom.resolveExternals=false;
if(!dom.loadXML(resp.text)){resp.errors.push("500 Failed to parse XML");
resp.rc=500
}else{resp.data=dom
}}else{var parser=new DOMParser();
dom=parser.parseFromString(resp.text,"text/xml");
if("parsererror"===dom.documentElement.nodeName){resp.errors.push("500 Failed to parse XML");
resp.rc=500
}else{resp.data=dom
}}break;
default:resp.data=resp.text;
break
}}}return resp
}function makeXhrRequest(realUrl,proxyUrl,callback,paramData,method,params,processResponseFunction,opt_contentType){var xhr=makeXhr();
if(proxyUrl.indexOf("//")==0){proxyUrl=document.location.protocol+proxyUrl
}xhr.open(method,proxyUrl,true);
if(callback){xhr.onreadystatechange=gadgets.util.makeClosure(null,processResponseFunction,realUrl,callback,params,xhr)
}if(paramData!==null){xhr.setRequestHeader("Content-Type",opt_contentType||"application/x-www-form-urlencoded");
xhr.send(paramData)
}else{xhr.send(null)
}}function respondWithPreload(postData,params,callback){if(gadgets.io.preloaded_&&postData.httpMethod==="GET"){for(var i=0;
i<gadgets.io.preloaded_.length;
i++){var preload=gadgets.io.preloaded_[i];
if(preload&&(preload.id===postData.url)){delete gadgets.io.preloaded_[i];
if(preload.rc!==200){callback({rc:preload.rc,errors:[preload.rc+" Error"]})
}else{if(preload.oauthState){oauthState=preload.oauthState
}var resp={body:preload.body,rc:preload.rc,headers:preload.headers,oauthApprovalUrl:preload.oauthApprovalUrl,oauthError:preload.oauthError,oauthErrorText:preload.oauthErrorText,errors:[]};
callback(transformResponseData(params,resp))
}return true
}}}return false
}function init(configuration){config=configuration["core.io"]||{}
}var requiredConfig={proxyUrl:new gadgets.config.RegExValidator(/.*%(raw)?url%.*/),jsonProxyUrl:gadgets.config.NonEmptyStringValidator};
gadgets.config.register("core.io",requiredConfig,init);
return{makeRequest:function(url,callback,opt_params){var params=opt_params||{};
var httpMethod=params.METHOD||"GET";
var refreshInterval=params.REFRESH_INTERVAL;
var auth,st;
if(params.AUTHORIZATION&&params.AUTHORIZATION!=="NONE"){auth=params.AUTHORIZATION.toLowerCase();
st=shindig.auth.getSecurityToken()
}else{if(httpMethod==="GET"&&refreshInterval===undefined){refreshInterval=3600
}}var signOwner=true;
if(typeof params.OWNER_SIGNED!=="undefined"){signOwner=params.OWNER_SIGNED
}var signViewer=true;
if(typeof params.VIEWER_SIGNED!=="undefined"){signViewer=params.VIEWER_SIGNED
}var headers=params.HEADERS||{};
if(httpMethod==="POST"&&!headers["Content-Type"]){headers["Content-Type"]="application/x-www-form-urlencoded"
}var urlParams=gadgets.util.getUrlParameters();
var paramData={url:url,httpMethod:httpMethod,headers:gadgets.io.encodeValues(headers,false),postData:params.POST_DATA||"",authz:auth||"",st:st||"",contentType:params.CONTENT_TYPE||"TEXT",numEntries:params.NUM_ENTRIES||"3",getSummaries:!!params.GET_SUMMARIES,signOwner:signOwner,signViewer:signViewer,gadget:urlParams.url,container:urlParams.container||urlParams.synd||"default",bypassSpecCache:gadgets.util.getUrlParameters().nocache||"",getFullHeaders:!!params.GET_FULL_HEADERS};
if(auth==="oauth"||auth==="signed"){if(gadgets.io.oauthReceivedCallbackUrl_){paramData.OAUTH_RECEIVED_CALLBACK=gadgets.io.oauthReceivedCallbackUrl_;
gadgets.io.oauthReceivedCallbackUrl_=null
}paramData.oauthState=oauthState||"";
for(var opt in params){if(params.hasOwnProperty(opt)){if(opt.indexOf("OAUTH_")===0){paramData[opt]=params[opt]
}}}}var proxyUrl=config.jsonProxyUrl.replace("%host%",document.location.host);
if(!respondWithPreload(paramData,params,callback,processResponse)){if(httpMethod==="GET"&&refreshInterval>0){var extraparams="?refresh="+refreshInterval+"&"+gadgets.io.encodeValues(paramData);
makeXhrRequest(url,proxyUrl+extraparams,callback,null,"GET",params,processResponse)
}else{makeXhrRequest(url,proxyUrl,callback,gadgets.io.encodeValues(paramData),"POST",params,processResponse)
}}},makeNonProxiedRequest:function(relativeUrl,callback,opt_params,opt_contentType){var params=opt_params||{};
makeXhrRequest(relativeUrl,relativeUrl,callback,params.POST_DATA,params.METHOD,params,processNonProxiedResponse,opt_contentType)
},clearOAuthState:function(){oauthState=undefined
},encodeValues:function(fields,opt_noEscaping){var escape=!opt_noEscaping;
var buf=[];
var first=false;
for(var i in fields){if(fields.hasOwnProperty(i)&&!/___$/.test(i)){if(!first){first=true
}else{buf.push("&")
}buf.push(escape?encodeURIComponent(i):i);
buf.push("=");
buf.push(escape?encodeURIComponent(fields[i]):fields[i])
}}return buf.join("")
},getProxyUrl:function(url,opt_params){return url
}}
}();
gadgets.io.RequestParameters=gadgets.util.makeEnum(["METHOD","CONTENT_TYPE","POST_DATA","HEADERS","AUTHORIZATION","NUM_ENTRIES","GET_SUMMARIES","GET_FULL_HEADERS","REFRESH_INTERVAL","OAUTH_SERVICE_NAME","OAUTH_USE_TOKEN","OAUTH_TOKEN_NAME","OAUTH_REQUEST_TOKEN","OAUTH_REQUEST_TOKEN_SECRET","OAUTH_RECEIVED_CALLBACK"]);
gadgets.io.MethodType=gadgets.util.makeEnum(["GET","POST","PUT","DELETE","HEAD"]);
gadgets.io.ContentType=gadgets.util.makeEnum(["TEXT","DOM","JSON","FEED"]);
gadgets.io.AuthorizationType=gadgets.util.makeEnum(["NONE","SIGNED","OAUTH"]);
var tamings___=tamings___||[];
tamings___.push(function(B){caja___.whitelistFuncs([[gadgets.io,"encodeValues"],[gadgets.io,"getProxyUrl"],[gadgets.io,"makeRequest"]])
});
gadgets.log=(function(){var M=1;
var I=2;
var L=3;
var O=4;
var N=function(A){P(M,A)
};
gadgets.warn=function(A){P(I,A)
};
gadgets.error=function(A){P(L,A)
};
gadgets.setLogLevel=function(A){J=A
};
function P(A,B){if(A<J||!K){return 
}if(A===I&&K.warn){K.warn(B)
}else{if(A===L&&K.error){K.error(B)
}else{if(K.log){K.log(B)
}}}}N.INFO=M;
N.WARNING=I;
N.NONE=O;
var J=M;
var K=window.console?window.console:window.opera?window.opera.postError:undefined;
return N
})();
var tamings___=tamings___||[];
tamings___.push(function(B){___.grantRead(gadgets.log,"INFO");
___.grantRead(gadgets.log,"WARNING");
___.grantRead(gadgets.log,"ERROR");
___.grantRead(gadgets.log,"NONE");
caja___.whitelistFuncs([[gadgets,"log"],[gadgets,"warn"],[gadgets,"error"],[gadgets,"setLogLevel"]])
});
shindig.uri=(function(){var B=new RegExp("^(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*)(?:\\?([^#]*))?(?:#(.*))?");
return function(a){var h="";
var l="";
var w="";
var r="";
var v=null;
var q="";
var p=null;
var n=window.decodeURIComponent?decodeURIComponent:unescape;
var b=window.encodeURIComponent?encodeURIComponent:escape;
var o=null;
function e(C){if(C.match(B)===null){throw"Malformed URL: "+C
}h=RegExp.$1;
l=RegExp.$2;
w=RegExp.$3;
r=RegExp.$4;
q=RegExp.$5
}function f(E){var F=[];
for(var H=0,D=E.length;
H<D;
++H){var C=E[H][0];
var G=E[H][1];
if(G===undefined){continue
}F.push(b(C)+(G!==null?"="+b(G):""))
}return F.join("&")
}function i(){if(v){r=f(v);
v=null
}return r
}function A(){if(p){q=f(p);
p=null
}return q
}function k(C){v=v||t(r);
return g(v,C)
}function c(C){p=p||t(q);
return g(p,C)
}function x(C,D){v=m(v||t(r),C,D);
return o
}function s(C,D){p=m(p||t(q),C,D);
return o
}function d(){return[h,h!==""?":":"",l!==""?"//":"",l].join("")
}function j(){var C=i();
var D=A();
return[d(),w,C!==""?"?":"",C,D!==""?"#":"",D].join("")
}function t(E){var F=[];
var G=E.split("&");
for(var J=0,D=G.length;
J<D;
++J){var H=G[J].split("=");
var C=H.shift();
var I=null;
if(H.length>0){I=H.join("").replace(/\+/g," ")
}F.push([C,I!=null?n(I):null])
}return F
}function g(D,E){for(var F=0,C=D.length;
F<C;
++F){if(D[F][0]==E){return D[F][1]
}}return undefined
}function m(H,G,I){var E=G;
if(typeof G==="string"){E={};
E[G]=I
}for(var J in E){var F=false;
for(var C=0,D=H.length;
!F&&C<D;
++C){if(H[C][0]==J){H[C][1]=E[J];
F=true
}}if(!F){H.push([J,E[J]])
}}return H
}function u(C,D){C=C||"";
if(C[0]===D){C=C.substr(D.length)
}return C
}if(typeof a==="object"&&typeof a.toString==="function"){e(a.toString())
}else{if(a){e(a)
}}o={getSchema:function(){return h
},getAuthority:function(){return l
},getOrigin:d,getPath:function(){return w
},getQuery:i,getFragment:A,getQP:k,getFP:c,setSchema:function(C){h=C;
return o
},setAuthority:function(C){l=C;
return o
},setPath:function(C){w=(C[0]==="/"?"":"/")+C;
return o
},setQuery:function(C){v=null;
r=u(C,"?");
return o
},setFragment:function(C){p=null;
q=u(C,"#");
return o
},setQP:x,setFP:s,setExistingP:function(D,C){if(k(D,C)!==undefined){x(D,C)
}if(c(D,C)!==undefined){s(D,C)
}return o
},toString:j};
return o
}
})();
(function(){osapi._registerMethod=function(I,J){var H=typeof ___!=="undefined";
if(I=="newBatch"){return 
}var L=I.split(".");
var M=osapi;
for(var N=0;
N<L.length-1;
N++){M[L[N]]=M[L[N]]||{};
M=M[L[N]]
}var K=function(A){var B=osapi.newBatch();
var C={};
C.execute=function(F){var E=H?___.untame(F):F;
var D=H?___.USELESS:this;
B.add(I,this);
B.execute(function(G){if(G.error){E.call(D,G.error)
}else{E.call(D,G[I])
}})
};
if(H){___.markInnocent(C.execute,"execute")
}A=A||{};
A.userId=A.userId||"@viewer";
A.groupId=A.groupId||"@self";
C.method=I;
C.transport=J;
C.rpc=A;
return C
};
if(H&&typeof ___.markInnocent!=="undefined"){___.markInnocent(K,I)
}if(M[L[L.length-1]]){}else{M[L[L.length-1]]=K
}}
})();
(function(){var B=function(){var I={};
var J=[];
var A=function(D,C){if(C&&D){J.push({key:D,request:C})
}return I
};
var G=function(C){var D={method:C.request.method,id:C.key};
if(C.request.rpc){D.params=C.request.rpc
}return D
};
var H=function(T){var S={};
var C={};
var Q=0;
var P=[];
for(var E=0;
E<J.length;
E++){var R=J[E].request.transport;
if(!C[R.name]){P.push(R);
Q++
}C[R.name]=C[R.name]||[];
C[R.name].push(G(J[E]))
}var D=function(K){if(K.error){S.error=K.error
}for(var L=0;
L<J.length;
L++){var M=J[L].key;
var N=K[M];
if(N){if(N.error){S[M]=N
}else{S[M]=N.data||N.result
}}}Q--;
if(Q===0){T(S)
}};
for(var F=0;
F<P.length;
F++){P[F].execute(C[P[F].name],D)
}if(Q==0){window.setTimeout(function(){T(S)
},0)
}};
I.execute=H;
I.add=A;
return I
};
osapi.newBatch=B
})();
(function(){function C(A,B){function I(G){if(G.errors[0]){B({error:{code:G.rc,message:G.text}})
}else{var F=G.result||G.data;
if(F.error){B(F)
}else{var H={};
for(var E=0;
E<F.length;
E++){H[F[E].id]=F[E]
}B(H)
}}}var J={POST_DATA:gadgets.json.stringify(A),CONTENT_TYPE:"JSON",METHOD:"POST",AUTHORIZATION:"SIGNED"};
var L=this.name;
var K=shindig.auth.getSecurityToken();
if(K){L+="?st=";
L+=encodeURIComponent(K)
}gadgets.io.makeNonProxiedRequest(L,I,J,"application/json")
}function D(K){var B=K["osapi.services"];
if(B){for(var L in B){if(B.hasOwnProperty(L)){if(L.indexOf("http")==0||L.indexOf("//")==0){var N=L.replace("%host%",document.location.host);
var A={name:N,execute:C};
var M=B[L];
for(var J=0;
J<M.length;
J++){osapi._registerMethod(M[J],A)
}}}}}}if(gadgets.config){gadgets.config.register("osapi.services",null,D)
}})();
if(gadgets&&gadgets.rpc){(function(){function C(A,B){var F=function(I){if(!I){B({code:500,message:"Container refused the request"})
}else{if(I.error){B(I)
}else{var J={};
for(var E=0;
E<I.length;
E++){J[I[E].id]=I[E]
}B(J)
}}};
gadgets.rpc.call("..","osapi._handleGadgetRpcMethod",F,A)
}function D(B){var Q={name:"gadgets.rpc",execute:C};
var L=B["osapi.services"];
if(L){for(var A in L){if(L.hasOwnProperty(A)){if(A==="gadgets.rpc"){var R=L[A];
for(var O=0;
O<R.length;
O++){osapi._registerMethod(R[O],Q)
}}}}}if(osapi.container&&osapi.container.listMethods){var P=gadgets.util.runOnLoadHandlers;
var N=2;
var M=function(){N--;
if(N==0){P()
}};
gadgets.util.runOnLoadHandlers=M;
osapi.container.listMethods({}).execute(function(E){if(!E.error){for(var F=0;
F<E.length;
F++){if(E[F]!="container.listMethods"){osapi._registerMethod(E[F],Q)
}}}M()
});
window.setTimeout(M,500)
}}if(gadgets.config&&gadgets.config.isGadget){gadgets.config.register("osapi.services",null,D)
}})()
}gadgets.util.registerOnLoadHandler(function(){if(osapi&&osapi.people&&osapi.people.get){osapi.people.getViewer=function(B){B=B||{};
B.userId="@viewer";
B.groupId="@self";
return osapi.people.get(B)
};
osapi.people.getViewerFriends=function(B){B=B||{};
B.userId="@viewer";
B.groupId="@friends";
return osapi.people.get(B)
};
osapi.people.getOwner=function(B){B=B||{};
B.userId="@owner";
B.groupId="@self";
return osapi.people.get(B)
};
osapi.people.getOwnerFriends=function(B){B=B||{};
B.userId="@owner";
B.groupId="@friends";
return osapi.people.get(B)
}
}});
var tamings___=tamings___||[];
tamings___.push(function(C){___.tamesTo(osapi.newBatch,___.markFuncFreeze(function(){var A=osapi.newBatch();
___.markInnocent(A.add,"add");
___.markInnocent(A.execute,"execute");
return ___.tame(A)
}));
C.outers.osapi=___.tame(osapi);
___.grantRead(C.outers,"osapi");
var D=C;
gadgets.util.registerOnLoadHandler(function(){if(osapi&&osapi.people&&osapi.people.get){caja___.whitelistFuncs([[osapi.people,"getViewer"],[osapi.people,"getViewerFriends"],[osapi.people,"getOwner"],[osapi.people,"getOwnerFriends"]]);
D.outers.osapi.people.getViewer=___.tame(osapi.people.getViewer);
D.outers.osapi.people.getViewerFriends=___.tame(osapi.people.getViewerFriends);
D.outers.osapi.people.getOwner=___.tame(osapi.people.getOwner);
D.outers.osapi.people.getOwnerFriends=___.tame(osapi.people.getOwnerFriends)
}})
});
shindig._uri=shindig.uri;
shindig.uri=(function(){var E=shindig._uri;
shindig._uri=null;
function D(A,B){return A.getOrigin()==B.getOrigin()
}function F(I,B){if(I.getSchema()==""){I.setSchema(B.getSchema())
}if(I.getAuthority()==""){I.setAuthority(B.getAuthority())
}var C=I.getPath();
if(C==""||C.charAt(0)!="/"){var A=B.getPath();
var J=A.lastIndexOf("/");
if(J!=-1){A=A.substring(0,J+1)
}I.setPath(B.getPath()+C)
}}return function(B){var A=E(B);
A.hasSameOrigin=function(C){return D(A,C)
};
A.resolve=function(C){return F(A,C)
};
return A
}
})();
Function.prototype.inherits=function(C){function D(){}D.prototype=C.prototype;
this.superClass_=C.prototype;
this.prototype=new D();
this.prototype.constructor=this
};
shindig.cookies={};
shindig.cookies.JsType_={UNDEFINED:"undefined"};
shindig.cookies.isDef=function(B){return typeof B!=shindig.cookies.JsType_.UNDEFINED
};
shindig.cookies.set=function(L,P,Q,M,K){if(/;=/g.test(L)){throw new Error('Invalid cookie name "'+L+'"')
}if(/;/g.test(P)){throw new Error('Invalid cookie value "'+P+'"')
}if(!shindig.cookies.isDef(Q)){Q=-1
}var S=K?";domain="+K:"";
var O=M?";path="+M:"";
var T;
if(Q<0){T=""
}else{if(Q===0){var R=new Date(1970,1,1);
T=";expires="+R.toUTCString()
}else{var N=new Date((new Date).getTime()+Q*1000);
T=";expires="+N.toUTCString()
}}document.cookie=L+"="+P+S+O+T
};
shindig.cookies.get=function(P,K){var L=P+"=";
var N=String(document.cookie);
for(var J=-1;
(J=N.indexOf(L,J+1))>=0;
){var O=J;
while(--O>=0){var M=N.charAt(O);
if(M==";"){O=-1;
break
}}if(O==-1){var I=N.indexOf(";",J);
if(I<0){I=N.length
}return N.substring(J+L.length,I)
}}return K
};
shindig.cookies.remove=function(H,E,G){var F=shindig.cookies.containsKey(H);
shindig.cookies.set(H,"",0,E,G);
return F
};
shindig.cookies.getKeyValues_=function(){var K=String(document.cookie);
var I=K.split(/\s*;\s*/);
var J=[],H=[],M,N;
for(var L=0;
N=I[L];
L++){M=N.indexOf("=");
if(M==-1){J.push("");
H.push(N)
}else{J.push(N.substring(0,M));
H.push(N.substring(M+1))
}}return{keys:J,values:H}
};
shindig.cookies.getKeys=function(){return shindig.cookies.getKeyValues_().keys
};
shindig.cookies.getValues=function(){return shindig.cookies.getKeyValues_().values
};
shindig.cookies.isEmpty=function(){return document.cookie===""
};
shindig.cookies.getCount=function(){var C=String(document.cookie);
if(C===""){return 0
}var D=C.split(/\s*;\s*/);
return D.length
};
shindig.cookies.containsKey=function(D){var C={};
return shindig.cookies.get(D,C)!==C
};
shindig.cookies.containsValue=function(E){var D=shindig.cookies.getKeyValues_().values;
for(var F=0;
F<D.length;
F++){if(D[F]==E){return true
}}return false
};
shindig.cookies.clear=function(){var D=shindig.cookies.getKeyValues_().keys;
for(var C=D.length-1;
C>=0;
C--){shindig.cookies.remove(D[C])
}};
shindig.cookies.MAX_COOKIE_LENGTH=3950;
shindig.errors={};
shindig.errors.SUBCLASS_RESPONSIBILITY="subclass responsibility";
shindig.errors.TO_BE_DONE="to be done";
shindig.callAsyncAndJoin=function(K,H,L){var J=K.length;
var M=[];
for(var N=0;
N<K.length;
N++){var I=function(B){var A=K[B];
if(typeof A==="string"){A=L[A]
}A.call(L,function(C){M[B]=C;
if(--J===0){H(M)
}})
};
I(N)
}};
shindig.Extensible=function(){};
shindig.Extensible.prototype.setDependencies=function(C){for(var D in C){this[D]=C[D]
}};
shindig.Extensible.prototype.getDependencies=function(B){return this[B]
};
shindig.UserPrefStore=function(){};
shindig.UserPrefStore.prototype.getPrefs=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.UserPrefStore.prototype.savePrefs=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.DefaultUserPrefStore=function(){shindig.UserPrefStore.call(this)
};
shindig.DefaultUserPrefStore.inherits(shindig.UserPrefStore);
shindig.DefaultUserPrefStore.prototype.getPrefs=function(B){};
shindig.DefaultUserPrefStore.prototype.savePrefs=function(B){};
shindig.GadgetService=function(){};
shindig.GadgetService.prototype.setHeight=function(D,C){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.GadgetService.prototype.setTitle=function(C,D){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.GadgetService.prototype.setUserPref=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.IfrGadgetService=function(){shindig.GadgetService.call(this);
gadgets.rpc.register("resize_iframe",this.setHeight);
gadgets.rpc.register("set_pref",this.setUserPref);
gadgets.rpc.register("set_title",this.setTitle);
gadgets.rpc.register("requestNavigateTo",this.requestNavigateTo);
gadgets.rpc.register("requestSendMessage",this.requestSendMessage)
};
shindig.IfrGadgetService.inherits(shindig.GadgetService);
shindig.IfrGadgetService.prototype.setHeight=function(C){if(C>shindig.container.maxheight_){C=shindig.container.maxheight_
}var D=document.getElementById(this.f);
if(D){D.style.height=C+"px"
}};
shindig.IfrGadgetService.prototype.setTitle=function(D){var C=document.getElementById(this.f+"_title");
if(C){C.innerHTML=D.replace(/&/g,"&amp;").replace(/</g,"&lt;")
}};
shindig.IfrGadgetService.prototype.setUserPref=function(I,N,L){var J=shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);
var K=shindig.container.getGadget(J);
for(var M=1,H=arguments.length;
M<H;
M+=2){this.userPrefs[arguments[M]].value=arguments[M+1]
}K.saveUserPrefs()
};
shindig.IfrGadgetService.prototype.requestSendMessage=function(E,F,H,G){if(H){window.setTimeout(function(){H(new opensocial.ResponseItem(null,null,opensocial.ResponseItem.Error.NOT_IMPLEMENTED,null))
},0)
}};
shindig.IfrGadgetService.prototype.requestNavigateTo=function(F,H){var G=shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);
var J=shindig.container.gadgetService.getUrlForView(F);
if(H){var I=gadgets.json.stringify(H);
if(I.length>0){J+="&appParams="+encodeURIComponent(I)
}}if(J&&document.location.href.indexOf(J)==-1){document.location.href=J
}};
shindig.IfrGadgetService.prototype.getUrlForView=function(B){if(B==="canvas"){return"/canvas"
}else{if(B==="profile"){return"/profile"
}else{return null
}}};
shindig.IfrGadgetService.prototype.getGadgetIdFromModuleId=function(B){return parseInt(B.match(/_([0-9]+)$/)[1],10)
};
shindig.LayoutManager=function(){};
shindig.LayoutManager.prototype.getGadgetChrome=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.StaticLayoutManager=function(){shindig.LayoutManager.call(this)
};
shindig.StaticLayoutManager.inherits(shindig.LayoutManager);
shindig.StaticLayoutManager.prototype.setGadgetChromeIds=function(B){this.gadgetChromeIds_=B
};
shindig.StaticLayoutManager.prototype.getGadgetChrome=function(D){var C=this.gadgetChromeIds_[D.id];
return C?document.getElementById(C):null
};
shindig.FloatLeftLayoutManager=function(B){shindig.LayoutManager.call(this);
this.layoutRootId_=B
};
shindig.FloatLeftLayoutManager.inherits(shindig.LayoutManager);
shindig.FloatLeftLayoutManager.prototype.getGadgetChrome=function(E){var F=document.getElementById(this.layoutRootId_);
if(F){var D=document.createElement("div");
D.className="gadgets-gadget-chrome";
D.style.cssFloat="left";
F.appendChild(D);
return D
}else{return null
}};
shindig.Gadget=function(D){this.userPrefs={};
if(D){for(var C in D){if(D.hasOwnProperty(C)){this[C]=D[C]
}}}if(!this.secureToken){this.secureToken="john.doe:john.doe:appid:cont:url:0:default"
}};
shindig.Gadget.prototype.getUserPrefs=function(){return this.userPrefs
};
shindig.Gadget.prototype.saveUserPrefs=function(){shindig.container.userPrefStore.savePrefs(this)
};
shindig.Gadget.prototype.getUserPrefValue=function(D){var C=this.userPrefs[D];
return typeof (C.value)!="undefined"&&C.value!=null?C.value:C["default"]
};
shindig.Gadget.prototype.render=function(C){if(C){var D=this;
this.getContent(function(A){C.innerHTML=A;
D.finishRender(C)
})
}};
shindig.Gadget.prototype.getContent=function(B){shindig.callAsyncAndJoin(["getTitleBarContent","getUserPrefsDialogContent","getMainContent"],function(A){B(A.join(""))
},this)
};
shindig.Gadget.prototype.getTitleBarContent=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.Gadget.prototype.getUserPrefsDialogContent=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.Gadget.prototype.getMainContent=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.Gadget.prototype.finishRender=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.Gadget.prototype.getAdditionalParams=function(){return""
};
shindig.BaseIfrGadget=function(B){shindig.Gadget.call(this,B);
this.serverBase_="/gadgets/";
this.queryIfrGadgetType_()
};
shindig.BaseIfrGadget.inherits(shindig.Gadget);
shindig.BaseIfrGadget.prototype.GADGET_IFRAME_PREFIX_="remote_iframe_";
shindig.BaseIfrGadget.prototype.CONTAINER="default";
shindig.BaseIfrGadget.prototype.cssClassGadget="gadgets-gadget";
shindig.BaseIfrGadget.prototype.cssClassTitleBar="gadgets-gadget-title-bar";
shindig.BaseIfrGadget.prototype.cssClassTitle="gadgets-gadget-title";
shindig.BaseIfrGadget.prototype.cssClassTitleButtonBar="gadgets-gadget-title-button-bar";
shindig.BaseIfrGadget.prototype.cssClassGadgetUserPrefsDialog="gadgets-gadget-user-prefs-dialog";
shindig.BaseIfrGadget.prototype.cssClassGadgetUserPrefsDialogActionBar="gadgets-gadget-user-prefs-dialog-action-bar";
shindig.BaseIfrGadget.prototype.cssClassTitleButton="gadgets-gadget-title-button";
shindig.BaseIfrGadget.prototype.cssClassGadgetContent="gadgets-gadget-content";
shindig.BaseIfrGadget.prototype.rpcToken=(2147483647*Math.random())|0;
shindig.BaseIfrGadget.prototype.rpcRelay="../container/rpc_relay.html";
shindig.BaseIfrGadget.prototype.getTitleBarContent=function(C){var D=this.hasViewablePrefs_()?'<a href="#" onclick="shindig.container.getGadget('+this.id+').handleOpenUserPrefsDialog();return false;" class="'+this.cssClassTitleButton+'">settings</a> ':"";
C('<div id="'+this.cssClassTitleBar+"-"+this.id+'" class="'+this.cssClassTitleBar+'"><span id="'+this.getIframeId()+'_title" class="'+this.cssClassTitle+'">'+(this.title?this.title:"Title")+'</span> | <span class="'+this.cssClassTitleButtonBar+'">'+D+'<a href="#" onclick="shindig.container.getGadget('+this.id+').handleToggle();return false;" class="'+this.cssClassTitleButton+'">toggle</a></span></div>')
};
shindig.BaseIfrGadget.prototype.getUserPrefsDialogContent=function(B){B('<div id="'+this.getUserPrefsDialogId()+'" class="'+this.cssClassGadgetUserPrefsDialog+'"></div>')
};
shindig.BaseIfrGadget.prototype.setServerBase=function(B){this.serverBase_=B
};
shindig.BaseIfrGadget.prototype.getServerBase=function(){return this.serverBase_
};
shindig.BaseIfrGadget.prototype.getMainContent=function(C){var D=this;
window.setTimeout(function(){D.getMainContent(C)
},0)
};
shindig.BaseIfrGadget.prototype.getIframeId=function(){return this.GADGET_IFRAME_PREFIX_+this.id
};
shindig.BaseIfrGadget.prototype.getUserPrefsDialogId=function(){return this.getIframeId()+"_userPrefsDialog"
};
shindig.BaseIfrGadget.prototype.getUserPrefsParams=function(){var D="";
for(var C in this.getUserPrefs()){D+="&up_"+encodeURIComponent(C)+"="+encodeURIComponent(this.getUserPrefValue(C))
}return D
};
shindig.BaseIfrGadget.prototype.handleToggle=function(){var F=document.getElementById(this.getIframeId());
if(F){var D=F.parentNode;
var E=D.style.display;
D.style.display=E?"":"none"
}};
shindig.BaseIfrGadget.prototype.hasViewablePrefs_=function(){for(var D in this.getUserPrefs()){var C=this.userPrefs[D];
if(C.type!="hidden"){return true
}}return false
};
shindig.BaseIfrGadget.prototype.handleOpenUserPrefsDialog=function(){if(this.userPrefsDialogContentLoaded){this.showUserPrefsDialog()
}else{var E=this;
var F="ig_callback_"+this.id;
window[F]=function(A){E.userPrefsDialogContentLoaded=true;
E.buildUserPrefsDialog(A);
E.showUserPrefsDialog()
};
var D=document.createElement("script");
D.src="http://www.gmodules.com/ig/gadgetsettings?mid="+this.id+"&output=js"+this.getUserPrefsParams()+"&url="+this.specUrl;
document.body.appendChild(D)
}};
shindig.BaseIfrGadget.prototype.buildUserPrefsDialog=function(C){var D=document.getElementById(this.getUserPrefsDialogId());
D.innerHTML=C+'<div class="'+this.cssClassGadgetUserPrefsDialogActionBar+'"><input type="button" value="Save" onclick="shindig.container.getGadget('+this.id+').handleSaveUserPrefs()"> <input type="button" value="Cancel" onclick="shindig.container.getGadget('+this.id+').handleCancelUserPrefs()"></div>';
D.childNodes[0].style.display=""
};
shindig.BaseIfrGadget.prototype.showUserPrefsDialog=function(C){var D=document.getElementById(this.getUserPrefsDialogId());
D.style.display=(C||C===undefined)?"":"none"
};
shindig.BaseIfrGadget.prototype.hideUserPrefsDialog=function(){this.showUserPrefsDialog(false)
};
shindig.BaseIfrGadget.prototype.handleSaveUserPrefs=function(){this.hideUserPrefsDialog();
var G=document.getElementById("m_"+this.id+"_numfields").value;
for(var J=0;
J<G;
J++){var L=document.getElementById("m_"+this.id+"_"+J);
var H="m_"+this.id+"_up_";
var K=L.name.substring(H.length);
var I=L.value;
this.userPrefs[K].value=I
}this.saveUserPrefs();
this.refresh()
};
shindig.BaseIfrGadget.prototype.handleCancelUserPrefs=function(){this.hideUserPrefsDialog()
};
shindig.BaseIfrGadget.prototype.refresh=function(){var B=this.getIframeId();
document.getElementById(B).src=this.getIframeUrl()
};
shindig.BaseIfrGadget.prototype.queryIfrGadgetType_=function(){var I={context:{country:"default",language:"default",view:"default",container:"default"},gadgets:[{url:this.specUrl,moduleId:1}]};
var J={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify(I)};
var F=this.serverBase_+"metadata?st="+this.secureToken;
gadgets.io.makeNonProxiedRequest(F,H,J,"application/javascript");
var G=this;
function H(B){var A=false;
var L=B.data.gadgets[0].features;
for(var D=0;
D<L.length;
D++){if(L[D]==="pubsub-2"){A=true;
break
}}var C=A?shindig.OAAIfrGadget:shindig.IfrGadget;
for(var E in C){if(C.hasOwnProperty(E)){G[E]=C[E]
}}}};
shindig.IfrGadget={getMainContent:function(C){var D=this.getIframeId();
gadgets.rpc.setRelayUrl(D,this.serverBase_+this.rpcRelay);
gadgets.rpc.setAuthToken(D,this.rpcToken);
C('<div class="'+this.cssClassGadgetContent+'"><iframe id="'+D+'" name="'+D+'" class="'+this.cssClassGadget+'" src="about:blank" frameborder="no" scrolling="no"'+(this.height?' height="'+this.height+'"':"")+(this.width?' width="'+this.width+'"':"")+"></iframe></div>")
},finishRender:function(B){window.frames[this.getIframeId()].location=this.getIframeUrl()
},getIframeUrl:function(){return this.serverBase_+"ifr?container="+this.CONTAINER+"&mid="+this.id+"&nocache="+shindig.container.nocache_+"&country="+shindig.container.country_+"&lang="+shindig.container.language_+"&view="+shindig.container.view_+(this.specVersion?"&v="+this.specVersion:"")+(shindig.container.parentUrl_?"&parent="+encodeURIComponent(shindig.container.parentUrl_):"")+(this.debug?"&debug=1":"")+this.getAdditionalParams()+this.getUserPrefsParams()+(this.secureToken?"&st="+this.secureToken:"")+"&url="+encodeURIComponent(this.specUrl)+"#rpctoken="+this.rpcToken+(this.viewParams?"&view-params="+encodeURIComponent(gadgets.json.stringify(this.viewParams)):"")+(this.hashData?"&"+this.hashData:"")
}};
shindig.OAAIfrGadget={getMainContent:function(B){B('<div id="'+this.cssClassGadgetContent+"-"+this.id+'" class="'+this.cssClassGadgetContent+'"></div>')
},finishRender:function(C){var D={className:this.cssClassGadget,frameborder:"no",scrolling:"no"};
if(this.height){D.height=this.height
}if(this.width){D.width=this.width
}new OpenAjax.hub.IframeContainer(gadgets.pubsub2router.hub,this.getIframeId(),{Container:{onSecurityAlert:function(A,B){gadgets.error("Security error for container "+A.getClientID()+" : "+B);
A.getIframe().src="about:blank"
}},IframeContainer:{parent:document.getElementById(this.cssClassGadgetContent+"-"+this.id),uri:this.getIframeUrl(),tunnelURI:shindig.uri(this.serverBase_+this.rpcRelay).resolve(shindig.uri(window.location.href)),iframeAttrs:D}})
},getIframeUrl:function(){return this.serverBase_+"ifr?container="+this.CONTAINER+"&mid="+this.id+"&nocache="+shindig.container.nocache_+"&country="+shindig.container.country_+"&lang="+shindig.container.language_+"&view="+shindig.container.view_+(this.specVersion?"&v="+this.specVersion:"")+(this.debug?"&debug=1":"")+this.getAdditionalParams()+this.getUserPrefsParams()+(this.secureToken?"&st="+this.secureToken:"")+"&url="+encodeURIComponent(this.specUrl)+(this.viewParams?"&view-params="+encodeURIComponent(gadgets.json.stringify(this.viewParams)):"")+(this.hashData?"#"+this.hashData:"")
}};
shindig.Container=function(){this.gadgets_={};
this.parentUrl_=document.location.href+"://"+document.location.host;
this.country_="ALL";
this.language_="ALL";
this.view_="default";
this.nocache_=1;
this.maxheight_=2147483647
};
shindig.Container.inherits(shindig.Extensible);
shindig.Container.prototype.gadgetClass=shindig.Gadget;
shindig.Container.prototype.userPrefStore=new shindig.DefaultUserPrefStore();
shindig.Container.prototype.gadgetService=new shindig.GadgetService();
shindig.Container.prototype.layoutManager=new shindig.StaticLayoutManager();
shindig.Container.prototype.setParentUrl=function(B){this.parentUrl_=B
};
shindig.Container.prototype.setCountry=function(B){this.country_=B
};
shindig.Container.prototype.setNoCache=function(B){this.nocache_=B
};
shindig.Container.prototype.setLanguage=function(B){this.language_=B
};
shindig.Container.prototype.setView=function(B){this.view_=B
};
shindig.Container.prototype.setMaxHeight=function(B){this.maxheight_=B
};
shindig.Container.prototype.getGadgetKey_=function(B){return"gadget_"+B
};
shindig.Container.prototype.getGadget=function(B){return this.gadgets_[this.getGadgetKey_(B)]
};
shindig.Container.prototype.createGadget=function(B){return new this.gadgetClass(B)
};
shindig.Container.prototype.addGadget=function(B){B.id=this.getNextGadgetInstanceId();
this.gadgets_[this.getGadgetKey_(B.id)]=B
};
shindig.Container.prototype.addGadgets=function(C){for(var D=0;
D<C.length;
D++){this.addGadget(C[D])
}};
shindig.Container.prototype.renderGadgets=function(){for(var B in this.gadgets_){this.renderGadget(this.gadgets_[B])
}};
shindig.Container.prototype.renderGadget=function(B){throw Error(shindig.errors.SUBCLASS_RESPONSIBILITY)
};
shindig.Container.prototype.nextGadgetInstanceId_=0;
shindig.Container.prototype.getNextGadgetInstanceId=function(){return this.nextGadgetInstanceId_++
};
shindig.Container.prototype.refreshGadgets=function(){for(var B in this.gadgets_){this.gadgets_[B].refresh()
}};
shindig.IfrContainer=function(){shindig.Container.call(this)
};
shindig.IfrContainer.inherits(shindig.Container);
shindig.IfrContainer.prototype.gadgetClass=shindig.BaseIfrGadget;
shindig.IfrContainer.prototype.gadgetService=new shindig.IfrGadgetService();
shindig.IfrContainer.prototype.setParentUrl=function(B){if(!B.match(/^http[s]?:\/\//)){B=document.location.href.match(/^[^?#]+\//)[0]+B
}this.parentUrl_=B
};
shindig.IfrContainer.prototype.renderGadget=function(D){var C=this.layoutManager.getGadgetChrome(D);
D.render(C)
};
shindig.container=new shindig.IfrContainer();
if(gadgets&&gadgets.rpc){osapi._handleGadgetRpcMethod=function(M){var Q=new Array(M.length);
var R=0;
var O=this.callback;
var L=function(A,B){B({})
};
for(var J=0;
J<M.length;
J++){var P=osapi;
if(M[J].method.indexOf("_")==-1){var N=M[J].method.split(".");
for(var K=0;
K<N.length;
K++){if(P.hasOwnProperty(N[K])){P=P[N[K]]
}else{P=L;
break
}}}else{P=L
}P(M[J].params,function(A){return function(B){Q[A]={id:M[A].id,data:B};
R++;
if(R==M.length){O(Q)
}}
}(J))
}};
osapi.container={};
osapi.container.listMethods=function(D,E){var F=[];
recurseNames(osapi,"",5,F);
E(F)
};
function recurseNames(K,J,I,L){if(I==0){return 
}for(var H in K){if(K.hasOwnProperty(H)){if(H.indexOf("_")==-1){var G=typeof (K[H]);
if(G=="function"){L.push(J+H)
}else{if(G=="object"){recurseNames(K[H],J+H+".",I-1,L)
}}}}}}gadgets.rpc.register("osapi._handleGadgetRpcMethod",osapi._handleGadgetRpcMethod)
}gadgets.config.init({"shindig.auth":{},osapi:{endPoints:["https://%host%/rpc"]},"osapi.services":{"gadgets.rpc":["container.listMethods"],"https://%host%/rpc":["activities.supportedFields","activities.update","gadgets.metadata","activities.delete","activities.get","appdata.update","http.put","http.post","gadgets.tokenSupportedFields","appdata.get","activities.create","system.listMethods","cache.invalidate","groups.get","people.supportedFields","http.get","http.head","appdata.delete","http.delete","aipo.version","gadgets.token","appdata.create","people.get","gadgets.supportedFields"]},rpc:{parentRelayUrl:"/gadgets/files/container/rpc_relay.html",useLegacyProtocol:false},"core.io":{proxyUrl:"//%host%/gadgets/proxy?container=default&refresh=%refresh%&url=%url%%rewriteMime%",jsonProxyUrl:"//%host%/gadgets/makeRequest"}});
aipo.PortletLayoutManager=function(){shindig.LayoutManager.call(this)
};
aipo.PortletLayoutManager.inherits(shindig.LayoutManager);
aipo.PortletLayoutManager.prototype.getGadgetChrome=function(B){var A="gadget-chrome-"+B.portletId;
return A?document.getElementById(A):null
};
aipo.PsmlUserPrefStore=function(){shindig.UserPrefStore.call(this)
};
aipo.PsmlUserPrefStore.inherits(shindig.UserPrefStore);
aipo.PsmlUserPrefStore.prototype.getPrefs=function(A){};
aipo.PsmlUserPrefStore.prototype.savePrefs=function(A){};
aipo.IfrGadget={getMainContent:function(A){var B=this.getIframeId();
gadgets.rpc.setRelayUrl(B,this.serverBase_+this.rpcRelay);
gadgets.rpc.setAuthToken(B,this.rpcToken);
A('<div class="'+this.cssClassGadgetContent+'"><iframe id="'+B+'" name="'+B+'" class="'+this.cssClassGadget+'" src="about:blank" frameborder="no"'+(this.scrolling?' scrolling="'+this.scrolling+'"':"no")+(this.height?' height="'+this.height+'"':"")+(this.width?' width="'+this.width+'"':"")+"></iframe></div>")
},finishRender:function(A){window.frames[this.getIframeId()].location=this.getIframeUrl()
},getIframeUrl:function(){return this.serverBase_+"ifr?container="+this.CONTAINER+"&mid="+this.id+"&nocache="+aipo.container.nocache_+"&country="+aipo.container.country_+"&lang="+aipo.container.language_+"&view="+aipo.container.view_+(this.specVersion?"&v="+this.specVersion:"")+(shindig.container.parentUrl_?"&parent="+encodeURIComponent(shindig.container.parentUrl_):"")+(this.debug?"&debug=1":"")+this.getAdditionalParams()+this.getUserPrefsParams()+(this.secureToken?"&st="+this.secureToken:"")+"&url="+encodeURIComponent(this.specUrl)+"#rpctoken="+this.rpcToken+(this.viewParams?"&view-params="+encodeURIComponent(gadgets.json.stringify(this.viewParams)):"")+(this.hashData?"&"+this.hashData:"")
}};
aipo.IfrGadgetService=function(){shindig.IfrGadgetService.call(this);
gadgets.rpc.register("set_pref",this.setUserPref);
gadgets.rpc.register("set_title",this.setTitle);
gadgets.rpc.register("requestNavigateTo",this.requestNavigateTo);
gadgets.rpc.register("requestCheckActivity",this.requestCheckActivity);
gadgets.rpc.register("requestCheckTimeline",this.requestCheckTimeline)
};
aipo.IfrGadgetService.inherits(shindig.IfrGadgetService);
aipo.IfrGadgetService.prototype.setUserPref=function(H,B,L){var J=this.f.replace("remote_iframe_","").split("_NN_")[0].replace("-popup","");
var K=null;
for(key in aipo.container.gadgets_){var C=aipo.container.gadgets_[key];
if(J==C.portletId){K=key;
break
}}var E={};
for(var G=1,D=arguments.length;
G<D;
G+=2){E[arguments[G]]=arguments[G+1];
if(K){aipo.container.gadgets_[K].userPrefs[arguments[G]]={};
aipo.container.gadgets_[K].userPrefs[arguments[G]]["value"]=arguments[G+1]
}}var F={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify(E)};
var A="?template=UserPrefUpdateJSONScreen&js_peid="+encodeURIComponent(J);
gadgets.io.makeNonProxiedRequest(A,I,F,"application/javascript");
function I(M){if(M.rc==200){}}};
aipo.IfrGadgetService.prototype.setTitle=function(A){};
aipo.IfrGadgetService.prototype.requestNavigateTo=function(A,E){var C=this.f.replace("remote_iframe_","").split("_NN_")[0].replace("-popup","");
var B="?js_peid="+encodeURIComponent(C);
if(A=="canvas"){B+="&action=controls.Maximize"
}else{if(A=="home"){B+="&action=controls.Restore"
}}if(E){var D=gadgets.json.stringify(E);
if(D.length>0){B+="&appParams="+encodeURIComponent(D)
}}document.location.href=B
};
aipo.activityDesktopNotifyEnable=null;
aipo.IfrGadgetService.prototype.requestDesktopNotifyEnable=function(B){function E(G){if(G.rc==200){var F=G.data;
if(F){aipo.activityDesktopNotifyEnable=F.enable
}}}var D={};
var C={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify(D)};
var A="?template=ActivityNotifyEnableJSONScreen";
if(aipo.activityDesktopNotifyEnable!=null){if(!aipo.activityDesktopNotifyEnable||window.webkitNotifications.checkPermission()!=0){window.webkitNotifications.requestPermission(function(){if(window.webkitNotifications.checkPermission()==0){A+="&enable=T";
gadgets.io.makeNonProxiedRequest(A,E,C,"application/javascript")
}})
}else{A+="&enable=F";
gadgets.io.makeNonProxiedRequest(A,E,C,"application/javascript")
}}else{gadgets.io.makeNonProxiedRequest(A,E,C,"application/javascript")
}};
aipo.activityMax=null;
aipo.IfrGadgetService.prototype.requestCheckActivity=function(A){var D={};
var C={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify(D)};
var B="?template=CheckActivityJSONScreen&isRead="+A;
if(aipo.activityMax){B+="&max="+aipo.activityMax
}gadgets.io.makeNonProxiedRequest(B,E,C,"application/javascript");
function E(J){if(J.rc==200){var K=J.data;
var I=K.unreadCount;
var H={Workflow:"workflow",todo:"todo",Report:"report",Note:"note"};
aipo.activityMax=K.max;
var Q=dijit.byId("activitycheckerContainer");
var L;
if(dojo.byId("messagechecker")!=undefined){L=parseInt(I)+parseInt(dojo.byId("messagechecker").innerHTML)
}else{L=parseInt(I)
}if(!L){document.title=djConfig.siteTitle
}else{if(L>99){document.title="(99+) "+djConfig.siteTitle
}else{document.title="("+L+") "+djConfig.siteTitle
}}if(Q){Q.onCheckActivity(I);
for(key in K.activities){var N=K.activities[key];
var P=N.appId;
var M=H[P];
if(M=="workflow"||M=="todo"||M=="report"||M=="note"){aipo.portletReload(M)
}}}if(aipo.activityDesktopNotifyEnable&&window.webkitNotifications&&window.webkitNotifications.checkPermission()==0){var O=new Array();
for(key in K.activities){var G=K.activities[key];
var F=window.webkitNotifications.createNotification("images/favicon48.png",G.displayName,G.text);
F.show();
F.ondisplay=function(R){setTimeout(function(){R.currentTarget.cancel()
},7*1000)
};
O.push(F)
}}}}};
aipo.IfrGadgetService.prototype.requestCheckTimeline=function(){var A=0;
var B=dojo.byId("getTimelineOnClick").innerHTML;
if(B!="true"){dojo.query("#timelineOuter .elastic").forEach(function(C){if(C.value!=C.defaultValue){A++
}});
if(dojo.byId("modalDialog")!=undefined&&dojo.byId("modalDialog").style.display!="none"){A++
}}if(A==0){aipo.portletReload("timeline")
}else{dojo.query(".newMessage").style("display","")
}};
aipo.IfrContainer=function(){shindig.Container.call(this);
this.context=new Array()
};
aipo.IfrContainer.inherits(shindig.Container);
aipo.IfrContainer.prototype.gadgetClass=shindig.BaseIfrGadget;
aipo.IfrContainer.prototype.gadgetService=new aipo.IfrGadgetService();
aipo.IfrContainer.prototype.setParentUrl=function(A){if(!A.match(/^http[s]?:\/\//)){A=document.location.href.match(/^[^?#]+\//)[0]+A
}this.parentUrl_=A
};
aipo.IfrContainer.prototype.assign=function(A){this.context.push(A)
};
aipo.IfrContainer.prototype.getContext=function(){return this.context
};
aipo.IfrContainer.prototype.addGadget=function(A){this.gadgets_[this.getGadgetKey_(A.id)]=A
};
aipo.IfrContainer.prototype.renderGadget=function(B){var A=this.layoutManager.getGadgetChrome(B);
if(!B.count){B.count=0
}B.count++;
B.render(A)
};
aipo.IfrContainer.prototype.renderGadgets=function(){var B=this.context;
for(var A=0;
A<B.length;
A++){var D=B[A];
var C=this.createGadget(D);
C.setServerBase(D.serverBase);
this.addGadget(C)
}aipo.cron.start()
};
var tmpGadget;
aipo.IfrContainer.prototype.renderGadgetFromContext=function(C){var D=this.createGadget(C);
D.setServerBase(C.serverBase);
D.id=this.getNextGadgetInstanceId();
D.portletId+="-popup";
var B="gadget-chrome-"+D.portletId;
var A=B?document.getElementById(B):null;
if(!D.count){D.count=0
}D.count++;
D.render(A);
tmpGadget=D
};
shindig.BaseIfrGadget.prototype.getIframeId=function(){return this.GADGET_IFRAME_PREFIX_+this.portletId+"_NN_"+this.count
};
shindig.BaseIfrGadget.prototype.queryIfrGadgetType_=function(){var C=this;
var B=aipo.IfrGadget;
for(var A in B){if(B.hasOwnProperty(A)){C[A]=B[A]
}}};
shindig.Gadget.prototype.getContent=function(A){shindig.callAsyncAndJoin(["getMainContent"],function(B){A(B.join(""))
},this)
};
aipo.container=new aipo.IfrContainer();
aipo.container.layoutManager=new aipo.PortletLayoutManager();
aipo.container.userPrefStore=new aipo.PsmlUserPrefStore();
aipo.cron=new CronTask(function(D){var A=aipo.container.context;
var C={CONTENT_TYPE:"JSON",METHOD:"POST",POST_DATA:gadgets.json.stringify(aipo.container.context)};
var B="?template=GadgetsSecurityTokenUpdateJSONScreen&view="+aipo.container.view_;
if(!aipo.cron.isFirst){B+="&update=1"
}function E(I){if(I.rc==200){var J=I.data;
for(var K=0;
K<J.length;
K++){var G=J[K];
var H=aipo.container.gadgets_["gadget_"+G.id];
if(!aipo.cron.isFirst){gadgets.rpc.call("remote_iframe_"+G.portletId+"_NN_"+H.count,"update_security_token",null,G.secureToken);
H.secureToken=G.secureToken
}var N=G.height;
var M=null;
if(G.views){M=G.views[aipo.container.view_];
var F=0;
if(M){F=M.preferredHeight
}else{var L=G.views["default"];
if(L){F=L.preferredHeight
}}}if(N>0){H.height=N
}if(F>0){H.height=F
}H.scrolling=G.scrolling?"true":"no";
if(aipo.cron.isFirst){aipo.container.renderGadget(H)
}}aipo.cron.isFirst=false
}}gadgets.io.makeNonProxiedRequest(B,E,C,"application/javascript");
D()
},30*60*1000,true);
aipo.cron.isFirst=true;
aipo.container.onPopupGadgets=function(){var A=document.getElementById("gadgets-popup-action");
if(A){location.href=A.href
}};
