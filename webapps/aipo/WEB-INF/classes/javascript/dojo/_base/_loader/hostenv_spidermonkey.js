if(djConfig.baseUrl){dojo.baseUrl=djConfig.baseUrl
}else{dojo.baseUrl="./"
}dojo._name="spidermonkey";
dojo.isSpidermonkey=true;
dojo.exit=function(B){quit(B)
};
if(typeof print=="function"){console.debug=print
}if(typeof line2pc=="undefined"){throw new Error("attempt to use SpiderMonkey host environment when no 'line2pc' global")
}dojo._spidermonkeyCurrentFile=function(H){var F="";
try{throw Error("whatever")
}catch(I){F=I.stack
}var J=F.match(/[^@]*\.js/gi);
if(!J){throw Error("could not parse stack string: '"+F+"'")
}var G=(typeof H!="undefined"&&H)?J[H+1]:J[J.length-1];
if(!G){throw Error("could not find file name in stack string '"+F+"'")
}return G
};
dojo._loadUri=function(D){var C=load(D);
return 1
};
if(djConfig.modulePaths){for(var param in djConfig.modulePaths){dojo.registerModulePath(param,djConfig.modulePaths[param])
}};