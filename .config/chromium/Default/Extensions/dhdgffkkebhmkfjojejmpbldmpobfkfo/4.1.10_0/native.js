Registry.require(["promise"],function(){var g=Registry.log,f=Registry.get("promise"),h=null,e=null,l=function(b){try{var d=new XMLHttpRequest;d.open("GET",b,!1);d.send(null);return d.responseText||null}catch(a){}},m=function(b,d,a,c){void 0===c&&(c="manifest.json");return[].concat([h,b,"/",d]).concat(0<=a?["_",a]:[]).concat(["/",c]).join("")},n=function(b,d){for(var a,c=-1;4>c;c++){a=m(b,d,c);try{var e=l(a);if(e&&JSON.parse(e))return c}catch(f){}}g.debug("import: unable to load ",h);return null},
k={setPath:function(b){b?(e=null,h=["file://",b.replace(/^file:\/\//,"").split(rea.runtime.id)[0].replace(/[\\\/]$/,""),"/"].join("")):(e=!1,h=null)},isPathValid:function(){return null!==e?e:e=null!==n(rea.runtime.id,rea.extension.manifest.version)},getAll:function(){var b=f();try{rea.management.getAll(function(d){b.resolve(d)})}catch(d){b.reject()}return b.promise()},getAllUserscripts:function(){return k.getAll().then(function(b){var d=[],a;for(a in b)if(b.hasOwnProperty(a)){var c=b[a];""!=c.homepageUrl||
0!=c.hostPermissions.length||0!=c.permissions.length||c.icons||c.updateUrl||0!=c.isApp||""!=c.optionsUrl||1!=c.mayDisable||(c.icon="chrome://extension-icon/"+c.id+"/48/1",d.push(c))}return d})},getUserscriptByName:function(b){return k.getAllUserscripts().then(function(d){for(var a=0;a<d.length;a++){var c=d[a];if(c.name==b)return c}return f.Breach()})},getUserscriptById:function(b){return k.getAllUserscripts().then(function(d){for(var a=0;a<d.length;a++){var c=d[a];if(c.id==b)return c}return f.Breach()})},
setEnabled:function(b,d){var a=f();try{rea.management.setEnabled(b.id,d,function(){a.resolve()})}catch(c){window.setTimeout(a.reject,1)}return a.promise()},getUserscriptSource:function(b){if(!e)return null;var d=n(b.id,b.version);if(null===d)return!1;var a=null;try{a=JSON.parse(l(m(b.id,b.version,d)))}catch(c){}if(!a)return!1;if(!a.converted_from_user_script)return g.warn("import: ",a,'is not "converted_from_user_script"!'),!1;if(!(a.content_scripts&&a.content_scripts.length&&a.content_scripts[0].js&&
a.content_scripts[0].js.length))return g.warn("import: ",a,"is a strange manifest!"),!1;b=l(m(b.id,b.version,d,a.content_scripts[0].js[0]));return b?b:(g.warn("import: ",a.content_scripts.js[0],"is empty!?"),!1)},uninstall:function(b,d){var a=f();try{rea.management.uninstall(b.id,{},function(){a.resolve()})}catch(c){window.setTimeout(a.reject,1)}return a.promise()}};Registry.register("native","5271",function(){return k})});
